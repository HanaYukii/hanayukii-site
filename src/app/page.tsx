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

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <section className="mx-auto max-w-4xl px-6 pb-10 pt-12 sm:pt-16">
        <h1 className="text-4xl font-bold sm:text-5xl">
          花雪 <span className="font-normal italic text-text/50">/ HanaYukii</span>
        </h1>
        <p className="mt-3 text-sm italic text-accent/80">Starmine, still becoming.</p>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-text-muted">
          競賽程式出身，在 Google 待過三年，現在在 AI 新創做 Senior Staff Engineer。
          寫 C++、AI 工具，也寫偶像現場和翻譯。
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
          <Link href="/blog" className="font-semibold text-primary transition-colors hover:text-text">
            看文章 <span aria-hidden="true">→</span>
          </Link>
          <Link href="/about" className="text-text-muted transition-colors hover:text-primary">關於</Link>
          <a href="https://calendly.com/islu245777/30min" target="_blank" rel="noopener noreferrer" className="text-text-muted transition-colors hover:text-primary">
            預約 1:1 <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-10" aria-labelledby="featured-heading">
        <h2 id="featured-heading" className="mb-4 text-sm font-semibold text-primary">先看這幾篇</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {hotPosts.map((post) => (
            <Link key={post.href} href={post.href!} className="group rounded-lg border border-border p-5 transition-colors hover:border-primary/50 hover:bg-surface/60">
              <p className="mb-3 text-xs text-text-muted">{post.tags[0]}</p>
              <h3 className="text-lg font-semibold leading-snug transition-colors group-hover:text-primary">{post.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">{post.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-10" aria-labelledby="recent-heading">
        <div className="mb-3 flex items-center justify-between gap-4">
          <h2 id="recent-heading" className="text-sm font-semibold text-primary">最近寫的</h2>
          <Link href="/blog" className="text-sm text-text-muted transition-colors hover:text-primary">全部文章 <span aria-hidden="true">→</span></Link>
        </div>
        <div className="divide-y divide-border/50 border-y border-border/50">
          {recentPosts.slice(0, 4).map((post) => (
            <Link key={post.href} href={post.href!} className="group flex flex-col gap-1 py-3 text-sm sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
              <h3 className="min-w-0 leading-relaxed text-text transition-colors group-hover:text-primary">{post.title}</h3>
              <time dateTime={post.date} className="shrink-0 text-xs text-text-muted">{post.date}</time>
            </Link>
          ))}
        </div>
      </section>

      <section id="work" className="mx-auto max-w-4xl scroll-mt-24 px-6 pb-12" aria-labelledby="work-heading">
        <h2 id="work-heading" className="mb-3 text-sm font-semibold text-primary">做過的東西</h2>
        <div className="space-y-3 text-sm leading-relaxed text-text-muted">
          <p>
            <a className="prose-link" href="https://github.com/New-JAMneration/JAM-Protocol" target="_blank" rel="noopener noreferrer">JAM Protocol ↗</a>
            <span className="ml-2">參與協定實作與文件。</span>
          </p>
          <p>
            <a className="prose-link" href="https://github.com/HanaYukii/Competitive-Programming" target="_blank" rel="noopener noreferrer">競賽題解 ↗</a>
            <span className="ml-2">ICPC 區域賽金牌，Codeforces International Master。</span>
          </p>
          <p>
            <Link className="prose-link" href="/blog/jabiko-jlpt-app">Jabiko 開發筆記 →</Link>
            <span className="ml-2">JLPT 自習網站。</span>
          </p>
        </div>
      </section>
    </>
  );
}
