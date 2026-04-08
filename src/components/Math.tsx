"use client";

import katex from "katex";
import "katex/dist/katex.min.css";

export function InlineMath({ math }: { math: string }) {
  const html = katex.renderToString(math, { throwOnError: false });
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

export function BlockMath({ math }: { math: string }) {
  const html = katex.renderToString(math, {
    throwOnError: false,
    displayMode: true,
  });
  return <div dangerouslySetInnerHTML={{ __html: html }} className="my-4 overflow-x-auto" />;
}
