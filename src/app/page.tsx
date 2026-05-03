import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { hotPosts, recentPosts } from "@/data/posts";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section>
        <div className="mx-auto max-w-4xl px-6 py-20 sm:py-24">
          <FadeIn>
            <h1 className="mb-2 text-4xl font-bold tracking-tight sm:text-5xl">
              花雪{" "}
              <span className="font-normal text-text/60">/ HanaYukii</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.05}>
            <p className="mb-5 text-sm italic text-accent/80">
              Starmine, still becoming.
            </p>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="mb-6 h-px w-12 bg-border" />
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mb-8 space-y-2 text-base leading-relaxed text-text-muted sm:text-lg">
              <p>Ex-Google engineer, now Tech Lead at an AI startup.</p>
              <p>Competitive programmer at heart, Web3 protocol contributor on the side.</p>
              <p>這邊隨興寫自己喜歡的 topic — 演算法、C++、職涯、偶像、F1、日本旅遊。</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex gap-6 text-sm">
              <Link
                href="/blog"
                className="font-medium text-primary transition-colors hover:text-primary/80"
              >
                Read blog &rarr;
              </Link>
              <Link
                href="/about"
                className="font-medium text-text-muted transition-colors hover:text-text"
              >
                About &rarr;
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Hot Posts */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <FadeIn>
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Hot Posts</h2>
            <Link
              href="/blog"
              className="text-sm font-medium text-primary hover:underline"
            >
              View all &rarr;
            </Link>
          </div>
        </FadeIn>
        <div className="grid gap-6 sm:grid-cols-2">
          {hotPosts.map((post, i) => (
            <FadeIn key={post.title} delay={i * 0.1}>
              <Link href={post.href!}>
                <article className="rounded-xl border border-border bg-surface/40 p-6 transition-all hover:border-primary/30 hover:bg-surface-hover cursor-pointer">
                  <div className="mb-3 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${post.tagStyle}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="mb-1 text-lg font-semibold">{post.title}</h3>
                  <p className="text-sm text-text-muted">{post.date}</p>
                </article>
              </Link>
            </FadeIn>
          ))}
        </div>

        {/* Recent Posts compact list */}
        <FadeIn delay={0.3}>
          <h3 className="mb-3 mt-10 text-sm font-semibold text-text-muted uppercase tracking-wider">Recent Posts</h3>
          <div className="space-y-0 divide-y divide-border/30">
            {recentPosts.map((post) => (
              <Link key={post.title} href={post.href!}>
                <div className="flex items-center justify-between py-2 transition-colors hover:text-primary">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={`shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-medium ${post.tagStyle}`}>
                      {post.tags[0]}
                    </span>
                    <span className="truncate text-xs font-medium">{post.title}</span>
                  </div>
                  <span className="shrink-0 pl-3 text-[10px] text-text-muted">{post.date}</span>
                </div>
              </Link>
            ))}
          </div>
        </FadeIn>
      </section>
    </>
  );
}
