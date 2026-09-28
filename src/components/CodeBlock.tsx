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
    const fallback = () => {
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
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(code).then(flash, fallback);
    } else {
      fallback();
    }
  };

  return (
    <div className="code-block group relative my-4 overflow-hidden rounded-lg border">
      <div className="code-block-lang flex min-h-11 items-center justify-between gap-3 px-4">
        <span className="text-sm">{lang || "code"}</span>
        <button
          type="button"
          onClick={copy}
          aria-label="複製程式碼"
          className="site-control code-block-copy px-3"
        >
          <span aria-live="polite">{copied ? "已複製" : "複製"}</span>
        </button>
      </div>
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
