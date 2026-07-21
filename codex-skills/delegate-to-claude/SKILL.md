---
name: delegate-to-claude
description: Delegate bounded, independent, read-only research, repository inspection, code review, failure analysis, or second-opinion tasks to the local Claude Code CLI. Use when the user explicitly asks Codex to call Claude, or has authorized external-model delegation for the current nonsensitive task. Before repository inspection, obtain explicit approval to send repository contents to Anthropic. Do not use for secrets, external actions, or shared-file edits.
---

# Delegate to Claude

Use the local Claude Code CLI as an external, non-interactive worker. Claude is not a native Codex subagent: it returns one result that Codex must verify and synthesize.

## Decide Whether to Delegate

Delegate only when all of these are true:

- The task is bounded and can be understood from a short prompt plus the current repository.
- The useful output is a compact review, diagnosis, summary, draft, or second opinion.
- Claude can work read-only without coordinating live edits with Codex.
- The user has authorized sending the requested context to Anthropic.

Good candidates include reading unfamiliar code, reviewing a diff, proposing likely causes for a failure, comparing a few approaches, or drafting a concise alternative.

Do not delegate secrets, sensitive or untrusted repositories, private data the user did not authorize sending, external writes, account actions, or work that requires Claude and Codex to edit the same files. Do not delegate a small inspection Codex can finish in one pass; Claude Code has meaningful startup context overhead. Keep implementation and final verification in Codex unless the user explicitly requests another workflow.

## Call Claude

Tell the user in commentary before making the external Claude call. Commentary is not consent: for repository access, state that code will be sent to Anthropic and obtain explicit approval first. Choose the smallest suitable model:

- `haiku`: quick scans, summaries, and simple second opinions.
- `sonnet`: code review, debugging, and analysis that needs more judgment.
- `opus`: only when the user explicitly requests it or the task clearly warrants the extra usage.

For repository inspection, send the prompt over UTF-8 stdin so it does not appear in the child process command line:

```powershell
$prompt = @"
Inspect this repository for the reported issue. Return only concrete findings,
supporting file paths and line numbers, remaining uncertainty, and no edits.
"@
$OutputEncoding = [Console]::OutputEncoding = [System.Text.UTF8Encoding]::new($false)
$prompt | python "$env:USERPROFILE\.agents\skills\delegate-to-claude\scripts\delegate.py" `
  --access repo-read --model sonnet --cwd "$PWD"
```

For reasoning that needs no repository access, use `--access none`. This runs Claude in a neutral temporary directory with no tools, project settings, hooks, Chrome integration, or configured MCP servers. It may still use account-level policy imposed by Anthropic.

The wrapper uses `claude -p`, JSON output, `dontAsk`, no session persistence, a six-turn default, a five-minute timeout, and a restricted tool list. By default it prints Claude's result plus one short diagnostic line; use `--raw-json` only when full usage metadata is needed. It refuses common API-key, custom-endpoint, Bedrock, Vertex, and Foundry environments unless `--allow-custom-auth` is supplied.

## Handle the Result

Read the returned `result`, then verify consequential claims with local evidence. Give the user a concise synthesis instead of pasting Claude's full response. Treat token usage as shifted to Claude, not eliminated; Claude's reply still enters the Codex context.

If the wrapper reports a 401 while `claude auth status` says logged in, the cached subscription credential is stale. Ask the user to run `claude auth login --claudeai`, then retry once. Do not log the user out or change authentication providers automatically.

## Safety Limits

- Keep `--access repo-read` limited to `Read`, `Glob`, and `Grep`. This is read-only but not repository-bounded: on native Windows there is no OS-level filesystem sandbox, so use it only with an explicitly approved, trusted, nonsensitive repository and verify Claude's result.
- Never add `--dangerously-skip-permissions` or `bypassPermissions`.
- Do not use `--bare` with a Claude subscription; it bypasses OAuth and the local keychain.
- On native Windows, Claude Code lacks OS-level sandboxing. Do not expand this wrapper to file writes without an isolated worktree or another sandboxed environment.
