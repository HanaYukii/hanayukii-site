import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { hotPosts, recentPosts } from "@/data/posts";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section>
        <div className="mx-auto max-w-3xl px-6 pb-16 pt-24 sm:pt-28">
          <FadeIn>
            <h1 className="text-5xl font-bold sm:text-6xl">
              花雪{" "}
              <span className="font-normal italic text-text/50">
                / HanaYukii
              </span>
            </h1>
            <p className="mt-3 text-sm italic text-accent/80">
              Starmine, still becoming.
            </p>

            <div className="mt-10 space-y-3 text-base leading-relaxed text-text-muted sm:text-lg">
              <p>Ex-Google engineer, now Tech Lead at an AI startup.</p>
              <p>
                這邊隨興寫自己喜歡的 topic — 演算法、C++、職涯、偶像、F1、日本旅遊。
              </p>
            </div>

            {/* Status indicators */}
            <div
              aria-hidden="true"
              className="mt-10 max-w-xs space-y-3 font-mono text-xs"
            >
              <div className="flex items-center justify-between border-b border-border pb-2">
                <span className="text-text-muted">algorithms</span>
                <span className="text-primary">fun</span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-2">
                <span className="text-text-muted">engineering</span>
                <span className="text-sky">craft</span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-2">
                <span className="text-text-muted">writing</span>
                <span className="text-accent">habit</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-3xl px-6 pb-16">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.15em] text-primary">
          /FEATURED
        </p>
        <div className="divide-y divide-border">
          {hotPosts.map((post, i) => (
            <Link
              key={post.title}
              href={post.href!}
              className="group block py-6"
            >
              <div className="flex items-baseline justify-between gap-4">
                <div className="flex items-baseline gap-3 min-w-0">
                  <span className="shrink-0 font-mono text-sm text-text-muted/60">
                    {String(i + 1).padStart(2, "0")} /
                  </span>
                  <h2 className="text-xl font-semibold transition-colors group-hover:text-primary">
                    {post.title}
                  </h2>
                </div>
                <span className="shrink-0 text-xs text-text-muted">
                  {post.date}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                {post.summary}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${post.tagStyle}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent */}
      <section className="mx-auto max-w-3xl px-6 pb-24">
        <div className="mb-6 flex items-center justify-between">
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-primary">
            /RECENT
          </p>
          <Link
            href="/blog"
            className="text-sm text-text-muted transition-colors hover:text-primary"
          >
            View all &rarr;
          </Link>
        </div>
        <div className="divide-y divide-border/50">
          {recentPosts.map((post) => (
            <Link
              key={post.title}
              href={post.href!}
              className="group flex items-center justify-between gap-3 py-3 text-sm"
            >
              <div className="flex min-w-0 items-center gap-2">
                <span
                  className={`shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-medium ${post.tagStyle}`}
                >
                  {post.tags[0]}
                </span>
                <span className="truncate text-text transition-colors group-hover:text-primary">
                  {post.title}
                </span>
              </div>
              <span className="shrink-0 text-xs text-text-muted">
                {post.date}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
