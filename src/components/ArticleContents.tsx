import type { ReactNode } from "react";

export default function ArticleContents({ children }: { children: ReactNode }) {
  return (
    <details className="article-contents my-6 border-y border-border">
      <summary className="cursor-pointer py-4 text-base font-medium text-text">
        段落目錄
        <span className="contents-hint ml-3 text-sm font-normal text-text-muted" aria-hidden="true" />
      </summary>
      <nav aria-label="段落目錄" className="pb-4">{children}</nav>
    </details>
  );
}
