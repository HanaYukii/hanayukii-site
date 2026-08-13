"use client";

import { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";

/**
 * 語法色不吃 prism-react-renderer 的 inline style，只取它算出來的
 * token className，顏色全部在 globals.css 的 .code-block 區塊裡用
 * CSS 變數定義。這樣兩個主題各自成立、切換不用 JS、也不會有
 * hydration 之前先閃一下深色的問題。
 */
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
    <div className="code-block group relative my-4 overflow-hidden rounded-lg border">
      {lang && <div className="code-block-lang px-4 py-1.5 text-xs">{lang}</div>}
      <button
        type="button"
        onClick={copy}
        aria-label="Copy code"
        className="code-block-copy absolute right-2 top-1 rounded-md px-2 py-0.5 font-mono text-[11px] opacity-0 transition-[opacity,background-color,color] duration-200 focus-visible:opacity-100 group-hover:opacity-100"
      >
        {copied ? "copied!" : "copy"}
      </button>
      <Highlight theme={themes.nightOwl} code={code} language={language}>
        {({ tokens, getLineProps, getTokenProps }) => (
          <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
            <code>
              {tokens.map((line, i) => (
                <div key={i} className={getLineProps({ line }).className}>
                  {line.map((token, key) => {
                    const props = getTokenProps({ token });
                    return (
                      <span key={key} className={props.className}>
                        {props.children}
                      </span>
                    );
                  })}
                </div>
              ))}
            </code>
          </pre>
        )}
      </Highlight>
    </div>
  );
}
