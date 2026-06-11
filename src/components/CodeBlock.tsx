"use client";

import { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";

export default function CodeBlock({
  children,
  lang = "",
}: {
  children: string;
  lang?: string;
}) {
  const language = lang === "x86asm" ? "nasm" : lang || "cpp";
  const code = children.trim();
  const [copied, setCopied] = useState(false);

  const copy = () => {
    const flash = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    };
    navigator.clipboard.writeText(code).then(flash, () => {
      // clipboard API 不可用時退回舊招
      const ta = document.createElement("textarea");
      ta.value = code;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        if (document.execCommand("copy")) flash();
      } finally {
        ta.remove();
      }
    });
  };

  return (
    <div className="group relative my-4 overflow-hidden rounded-lg border border-border bg-[#0d1117]">
      {lang && (
        <div className="border-b border-border px-4 py-1.5 text-xs text-text-muted">
          {lang}
        </div>
      )}
      <button
        type="button"
        onClick={copy}
        aria-label="Copy code"
        className="absolute right-2 top-1 rounded-md bg-white/10 px-2 py-0.5 font-mono text-[11px] text-zinc-300 opacity-0 transition-[opacity,background-color] duration-200 hover:bg-white/20 hover:text-white focus-visible:opacity-100 group-hover:opacity-100"
      >
        {copied ? "copied!" : "copy"}
      </button>
      <Highlight theme={themes.nightOwl} code={code} language={language}>
        {({ tokens, getLineProps, getTokenProps }) => (
          <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
            <code>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </code>
          </pre>
        )}
      </Highlight>
    </div>
  );
}
