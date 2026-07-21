#!/usr/bin/env python3
"""Run a bounded, read-only Claude Code delegation."""

from __future__ import annotations

import argparse
from contextlib import nullcontext
import json
import os
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile


if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")


CUSTOM_AUTH_VARS = (
    "ANTHROPIC_API_KEY",
    "ANTHROPIC_AUTH_TOKEN",
    "ANTHROPIC_BASE_URL",
    "ANTHROPIC_CUSTOM_HEADERS",
    "CLAUDE_CODE_OAUTH_TOKEN",
    "CLAUDE_CODE_USE_BEDROCK",
    "CLAUDE_CODE_USE_VERTEX",
    "CLAUDE_CODE_USE_FOUNDRY",
)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Delegate a read-only task to the local Claude Code CLI."
    )
    parser.add_argument("--model", choices=("haiku", "sonnet", "opus"), default="haiku")
    parser.add_argument(
        "--effort",
        choices=("low", "medium", "high", "xhigh", "max"),
        default="low",
    )
    parser.add_argument(
        "--access",
        choices=("none", "repo-read"),
        default="none",
        help="repo-read exposes Read, Glob, and Grep; it is not an OS sandbox.",
    )
    parser.add_argument(
        "--cwd",
        default=os.getcwd(),
        help="Trusted working directory for repo-read mode.",
    )
    parser.add_argument("--max-turns", type=int, default=6)
    parser.add_argument("--timeout-seconds", type=int, default=300)
    parser.add_argument(
        "--allow-api-key",
        "--allow-custom-auth",
        dest="allow_custom_auth",
        action="store_true",
        help="Allow API keys, custom endpoints, or third-party Claude providers.",
    )
    parser.add_argument(
        "--raw-json",
        action="store_true",
        help="Print the complete Claude JSON response instead of only the result.",
    )
    args = parser.parse_args()
    if not 1 <= args.max_turns <= 50:
        parser.error("--max-turns must be between 1 and 50")
    if not 30 <= args.timeout_seconds <= 1800:
        parser.error("--timeout-seconds must be between 30 and 1800")
    return args


def authentication_advice(custom_auth: list[str]) -> str:
    if custom_auth:
        return "Check the configured Claude API key, endpoint, or provider credentials."
    return (
        "Refresh the Claude subscription login with "
        "claude auth login --claudeai, then retry once."
    )


def find_claude() -> str | None:
    wrapper = shutil.which("claude")
    if not wrapper:
        return None
    if os.name == "nt":
        native = (
            Path(wrapper).parent
            / "node_modules"
            / "@anthropic-ai"
            / "claude-code"
            / "bin"
            / "claude.exe"
        )
        if native.is_file():
            return str(native)
    return wrapper


def main() -> int:
    args = parse_args()
    prompt_bytes = sys.stdin.buffer.read()
    try:
        prompt = prompt_bytes.decode("utf-8").strip()
    except UnicodeDecodeError:
        prompt = prompt_bytes.decode(
            sys.stdin.encoding or "utf-8",
            errors="replace",
        ).strip()
    if not prompt:
        print("No prompt was provided.", file=sys.stderr)
        return 2

    requested_cwd = Path(args.cwd).expanduser().resolve()
    if args.access == "repo-read" and not requested_cwd.is_dir():
        print(f"Working directory does not exist: {requested_cwd}", file=sys.stderr)
        return 2

    custom_auth = [name for name in CUSTOM_AUTH_VARS if os.environ.get(name)]
    if custom_auth and not args.allow_custom_auth:
        print(
            "Custom Claude authentication is active through "
            f"{', '.join(custom_auth)}. This may bypass subscription usage or send "
            "traffic to another provider. Remove it or pass --allow-custom-auth "
            "intentionally.",
            file=sys.stderr,
        )
        return 2

    claude = find_claude()
    if not claude:
        print("Claude Code CLI was not found on PATH.", file=sys.stderr)
        return 127

    neutral_directory = (
        tempfile.TemporaryDirectory(prefix="claude-delegate-")
        if args.access == "none"
        else nullcontext(str(requested_cwd))
    )
    with neutral_directory as run_directory:
        command = [
            claude,
            "-p",
            "--model",
            args.model,
            "--effort",
            args.effort,
            "--max-turns",
            str(args.max_turns),
            "--output-format",
            "json",
            "--permission-mode",
            "dontAsk",
            "--no-session-persistence",
            "--no-chrome",
            "--setting-sources",
            "",
            "--settings",
            '{"disableAllHooks":true}',
            "--strict-mcp-config",
        ]
        if args.access == "none":
            command.extend(("--tools", ""))
        else:
            command.extend(("--tools", "Read,Glob,Grep"))

        try:
            completed = subprocess.run(
                command,
                input=prompt,
                cwd=run_directory,
                capture_output=True,
                text=True,
                encoding="utf-8",
                errors="replace",
                timeout=args.timeout_seconds,
                check=False,
            )
        except subprocess.TimeoutExpired:
            print(
                f"Claude delegation timed out after {args.timeout_seconds} seconds.",
                file=sys.stderr,
            )
            return 124

    stdout = completed.stdout.strip()
    stderr = completed.stderr.strip()
    try:
        payload = json.loads(stdout)
    except json.JSONDecodeError:
        if stdout:
            print(stdout)
        if stderr:
            print(stderr, file=sys.stderr)
        if "401" in stdout or "401" in stderr:
            print(authentication_advice(custom_auth), file=sys.stderr)
        elif completed.returncode == 0:
            print("Claude returned non-JSON output.", file=sys.stderr)
        return completed.returncode or 1

    if not isinstance(payload, dict):
        print("Claude returned JSON in an unexpected shape.", file=sys.stderr)
        return 1

    if completed.returncode != 0 or payload.get("is_error"):
        message = payload.get("result") or stdout
        if message:
            print(str(message), file=sys.stderr)
        if stderr:
            print(stderr, file=sys.stderr)
        if payload.get("api_error_status") == 401:
            print(authentication_advice(custom_auth), file=sys.stderr)
        return completed.returncode or 1

    if args.raw_json:
        print(stdout)
    else:
        result = payload.get("result", "")
        if isinstance(result, str):
            print(result)
        else:
            print(json.dumps(result, ensure_ascii=False))
        model_usage = payload.get("modelUsage")
        models = (
            ",".join(model_usage.keys())
            if isinstance(model_usage, dict)
            else "unknown"
        )
        permission_denials = payload.get("permission_denials")
        denials = len(permission_denials) if isinstance(permission_denials, list) else 0
        print(
            "[claude-delegate] "
            f"model={models} turns={payload.get('num_turns', 'unknown')} "
            f"estimated_usd={payload.get('total_cost_usd', 'unknown')} "
            f"permission_denials={denials}",
            file=sys.stderr,
        )
        if stderr:
            print(stderr, file=sys.stderr)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
