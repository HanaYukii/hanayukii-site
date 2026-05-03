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
                Competitive programmer at heart, Web3 protocol contributor on
                the side.
              </p>
              <p>
                這邊隨興寫自己喜歡的 topic — 演算法、C++、職涯、偶像、F1、日本旅遊。
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-3xl px-6 pb-16">
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
          Featured
        </p>
        <div className="divide-y divide-border">
          {hotPosts.map((post) => (
            <Link
              key={post.title}
              href={post.href!}
              className="group block py-6"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-xl font-semibold transition-colors group-hover:text-primary">
                  {post.title}
                </h2>
                <span className="shrink-0 text-xs text-text-muted">
                  {post.date}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                {post.summary}
              </p>
              <div className="mt-3 flex flex-wrap gap-x-3 text-xs text-text-muted">
                {post.tags.map((tag, i) => (
                  <span key={tag} className="flex items-center">
                    {tag}
                    {i < post.tags.length - 1 && (
                      <span className="ml-3 text-text/30">·</span>
                    )}
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
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
            Recent
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
              className="group flex items-baseline justify-between gap-4 py-3 text-sm"
            >
              <span className="truncate text-text transition-colors group-hover:text-primary">
                {post.title}
              </span>
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
