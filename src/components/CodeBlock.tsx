"use client";

import { Highlight, themes } from "prism-react-renderer";

export default function CodeBlock({
  children,
  lang = "",
}: {
  children: string;
  lang?: string;
}) {
  const language = lang === "x86asm" ? "nasm" : lang || "cpp";

  return (
    <div className="group relative my-4 overflow-hidden rounded-lg border border-border bg-[#0d1117]">
      {lang && (
        <div className="border-b border-border px-4 py-1.5 text-xs text-text-muted">
          {lang}
        </div>
      )}
      <Highlight theme={themes.nightOwl} code={children.trim()} language={language}>
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
