import type { Metadata } from "next";
import Link from "next/link";
import { hotPosts, recentPosts } from "@/data/posts";
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

const credentials = [
  {
    label: "Current",
    value: "Senior Staff Engineer",
    detail: "AI startup",
  },
  {
    label: "Previously",
    value: "Software Engineer",
    detail: "Google Cloud · 3 years",
  },
  {
    label: "Competitive Programming",
    value: "ICPC Regional Gold",
    detail: "Codeforces 2300+",
  },
];

const selectedWork = [
  {
    period: "2026 –",
    title: "Jabiko",
    description:
      "我做的 JLPT 自習網站，從動詞變化一路練到 N1 文法，答錯的題目會自動排進複習。",
    tags: ["Product", "Japanese", "Frontend"],
    links: [
      { label: "開啟網站", href: "https://jabiko.pages.dev/" },
      { label: "開發筆記", href: "/blog/jabiko-jlpt-app" },
    ],
  },
  {
    period: "2024 –",
    title: "Polkadot JAM Protocol",
    description:
      "Web3 Foundation JAM contest 參賽隊的核心 repo 成員（95★），主要負責協定實作與文件。",
    tags: ["Rust", "Web3", "Protocol"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/New-JAMneration/JAM-Protocol",
      },
    ],
  },
  {
    period: "2016 –",
    title: "Competitive Programming",
    description:
      "ICPC Taipei Regional Gold，Codeforces International Master；持續整理競賽題解與演算法筆記。",
    tags: ["Algorithms", "C++", "ICPC"],
    links: [
      {
        label: "Codeforces",
        href: "https://codeforces.com/profile/HanaYukii",
      },
      {
        label: "Solutions",
        href: "https://github.com/HanaYukii/Competitive-Programming",
      },
    ],
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
        <div className="mx-auto max-w-4xl px-6 pb-20 pt-24 sm:pt-28">
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
            <p className="max-w-3xl">
              競賽程式出身，在 Google 待過三年，現在在一間 AI 新創。
              這裡主要寫技術文章，偶爾也寫偶像現場和隨筆，topic 會隨心所欲跳來跳去。
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 font-semibold text-bg transition-[filter] hover:brightness-110"
            >
              看精選作品
              <span aria-hidden="true">↓</span>
            </a>
            <Link
              href="/about"
              className="font-medium text-text-muted transition-colors hover:text-primary"
            >
              關於我 <span aria-hidden="true">→</span>
            </Link>
            <a
              href="https://calendly.com/islu245777/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-text-muted transition-colors hover:text-primary"
            >
              預約 1:1 <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="mt-10 grid border-y border-border/80 sm:grid-cols-3 sm:divide-x sm:divide-border/80">
            {credentials.map((item) => (
              <div
                key={item.label}
                className="border-b border-border/80 py-4 last:border-b-0 sm:border-b-0 sm:px-5 sm:first:pl-0 sm:last:pr-0"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted/65">
                  {item.label}
                </p>
                <p className="mt-2 text-sm font-semibold text-text">
                  {item.value}
                </p>
                <p className="mt-1 text-xs text-text-muted">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Selected work */}
      <section id="work" className="mx-auto max-w-4xl scroll-mt-28 px-6 pb-20">
        <div className="mb-7 flex items-baseline justify-between gap-4">
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-primary">
            /SELECTED WORK
          </p>
          <Link
            href="/about"
            className="text-sm text-text-muted transition-colors hover:text-primary"
          >
            More about me <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="border-y border-border">
          {selectedWork.map((work, i) => (
            <article
              key={work.title}
              className="grid gap-4 border-b border-border px-0 py-7 last:border-b-0 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-7"
            >
              <div className="flex items-baseline justify-between gap-4 sm:block">
                <span className="font-mono text-xs text-text-muted/60">
                  {String(i + 1).padStart(2, "0")} /
                </span>
                <span className="font-mono text-[10px] text-text-muted sm:mt-2 sm:block">
                  {work.period}
                </span>
              </div>
              <div className="min-w-0">
                <h2 className="text-xl font-semibold text-text">
                  {work.title}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-muted">
                  {work.description}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                  <div className="flex flex-wrap gap-2">
                    {work.tags.map((tag) => (
                      <span
                        key={tag}
                        className="tag text-[10px] font-medium text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs">
                    {work.links.map((link) =>
                      link.href.startsWith("/") ? (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="font-medium text-text-muted transition-colors hover:text-primary"
                        >
                          {link.label} <span aria-hidden="true">→</span>
                        </Link>
                      ) : (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-text-muted transition-colors hover:text-primary"
                        >
                          {link.label} <span aria-hidden="true">↗</span>
                        </a>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-4xl px-6 pb-16">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.15em] text-primary">
          /FEATURED WRITING
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
                    className={`tag text-[11px] font-medium ${post.tagStyle}`}
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
      <section className="mx-auto max-w-4xl px-6 pb-24">
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
          {recentPosts.slice(0, 10).map((post) => (
            <Link
              key={post.title}
              href={post.href!}
              className="group -mx-3 flex items-center justify-between gap-3 rounded-md px-3 py-3 text-sm transition-colors duration-200 hover:bg-surface/60"
            >
              <div className="flex min-w-0 items-center gap-2">
                <span
                  className={`tag shrink-0 text-[10px] font-medium ${post.tagStyle}`}
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
