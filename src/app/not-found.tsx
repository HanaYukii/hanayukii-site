import Link from "next/link";
import { hotPosts } from "@/data/posts";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <p className="font-mono text-sm text-primary">404</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight">這裡沒有東西</h1>
      <p className="mt-4 text-text-muted">
        頁面可能被移動或刪掉了。回首頁，或看看這幾篇：
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/"
          className="inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-all hover:brightness-110"
        >
          回首頁
        </Link>
        <Link
          href="/blog"
          className="inline-flex items-center rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-all hover:border-primary hover:text-primary"
        >
          所有文章
        </Link>
      </div>

      <div className="mt-12 border-t border-border pt-6">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.15em] text-primary">
          精選
        </p>
        <div className="divide-y divide-border/50">
          {hotPosts.map((p) => (
            <Link
              key={p.href}
              href={p.href!}
              className="group flex items-baseline justify-between gap-4 py-3"
            >
              <span className="min-w-0 text-sm text-text transition-colors group-hover:text-primary">
                {p.title}
              </span>
              <span className="shrink-0 text-xs text-text-muted">{p.date}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
