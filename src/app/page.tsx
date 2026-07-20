import type { Metadata } from "next";
import Link from "next/link";
import { hotPosts, recentPosts } from "@/data/posts";
import Typewriter from "@/components/Typewriter";
import { SITE_URL, AUTHOR } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: AUTHOR,
  url: SITE_URL,
  inLanguage: "zh-TW",
  author: { "@type": "Person", name: AUTHOR, url: `${SITE_URL}/about` },
};

const heroIndex = [
  {
    label: "Algorithms",
    detail: "CP notes",
    color: "text-primary",
    bar: "bg-primary",
  },
  {
    label: "Engineering",
    detail: "C++ / systems / crypto",
    color: "text-sky",
    bar: "bg-sky",
  },
  {
    label: "Essays",
    detail: "career / idol / life",
    color: "text-accent",
    bar: "bg-accent",
  },
];

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      {/* Hero */}
      <section>
        <div className="mx-auto max-w-3xl px-6 pb-16 pt-24 sm:pt-28">
          <h1 className="text-5xl font-bold sm:text-6xl">
            花雪{" "}
            <span className="font-normal italic text-text/50">
              / HanaYukii
            </span>
          </h1>
          <p className="mt-3 text-sm italic text-accent/80">
            <Typewriter text="Starmine, still becoming." />
          </p>

          <div className="mt-10 space-y-3 text-base leading-relaxed text-text-muted sm:text-lg">
            <p>
              After three years at Google, I now work at an AI startup. I still
              solve programming contests for fun and write down whatever else catches my attention.
            </p>
          </div>

          <div
            className="mt-10 max-w-sm border-y border-border/80 py-2 font-mono text-xs"
          >
            {heroIndex.map((item) => (
              <div
                key={item.label}
                className="grid grid-cols-[1rem_1fr] items-center gap-3 py-2 text-text-muted"
              >
                <span className={`h-px w-4 ${item.bar}`} />
                <span>
                  <span className={item.color}>{item.label}</span>{" "}
                  <span className="text-text-muted/70">/ {item.detail}</span>
                </span>
              </div>
            ))}
          </div>
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
              className="group -mx-3 block rounded-lg px-3 py-6 transition-colors duration-200 hover:bg-surface/60"
            >
              <div className="flex items-baseline justify-between gap-4">
                <div className="flex items-baseline gap-3 min-w-0">
                  <span className="shrink-0 font-mono text-sm text-text-muted/60 transition-colors group-hover:text-primary/70">
                    {String(i + 1).padStart(2, "0")} /
                  </span>
                  <h2 className="text-xl font-semibold transition-colors duration-200 group-hover:text-primary">
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
            className="group text-sm text-text-muted transition-colors hover:text-primary"
          >
            View all{" "}
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </div>
        <div className="divide-y divide-border/50">
          {recentPosts.map((post) => (
            <Link
              key={post.title}
              href={post.href!}
              className="group -mx-3 flex items-center justify-between gap-3 rounded-md px-3 py-3 text-sm transition-colors duration-200 hover:bg-surface/60"
            >
              <div className="flex min-w-0 items-center gap-2">
                <span
                  className={`shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-medium ${post.tagStyle}`}
                >
                  {post.tags[0]}
                </span>
                <span className="truncate text-text transition-colors duration-200 group-hover:text-primary">
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
