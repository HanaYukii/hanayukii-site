import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { posts } from "@/data/posts";
import { SITE_URL, AUTHOR } from "@/lib/seo";

const DESCRIPTION =
  "C++、演算法與競賽程式、Web3、職涯隨筆與偶像現場——花雪 HanaYukii 的文章。";

export const metadata: Metadata = {
  title: "Blog | 花雪 HanaYukii",
  description: DESCRIPTION,
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog | 花雪 HanaYukii",
    description: DESCRIPTION,
    url: "/blog",
    type: "website",
  },
};

const blogJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "花雪 HanaYukii — Blog",
  url: `${SITE_URL}/blog`,
  inLanguage: "zh-TW",
  author: { "@type": "Person", name: AUTHOR, url: `${SITE_URL}/about` },
  blogPost: posts
    .filter((p) => p.href)
    .map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${SITE_URL}${p.href}`,
      datePublished: new Date(p.date).toISOString(),
    })),
};

export default async function Blog({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string | string[] }>;
}) {
  const params = await searchParams;
  const tag = (Array.isArray(params.tag) ? params.tag[0] : params.tag) || "";
  const published = posts.filter((post) => post.href);
  const tags = [...new Set(published.flatMap((post) => post.tags))].sort();
  const commonTags = ["C++", "AI", "Competitive Programming", "Idol", "Career"];
  const filteredPosts = tag ? published.filter((post) => post.tags.includes(tag)) : published;

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }} />
      <FadeIn>
        <div className="mb-3 flex items-center justify-between gap-3">
          <h1 className="text-4xl font-bold">文章</h1>
          <a href="/feed.xml" className="site-control text-text-muted hover:text-primary" aria-label="訂閱 RSS">RSS ↗</a>
        </div>
        <p className="mb-6 text-text-muted">大多是技術筆記，偶爾寫職涯、偶像，或最近在想的事。</p>
        <nav aria-label="文章分類" className="flex flex-wrap gap-2">
          {["", ...commonTags].map((item) => (
            <Link key={item} href={item ? `/blog?tag=${encodeURIComponent(item)}` : "/blog"}
              aria-current={tag === item ? "page" : undefined} className="site-control filter-link">
              {item || "全部"}
            </Link>
          ))}
        </nav>
        <details className="mt-3 text-sm text-text-muted" key={tag}>
          <summary className="site-control cursor-pointer justify-start">更多分類 ＋</summary>
          <form action="/blog" method="get" className="mt-2 flex flex-wrap items-center gap-2">
            <label htmlFor="blog-tag">分類</label>
            <select id="blog-tag" name="tag" defaultValue={tag} className="site-control min-w-0 max-w-full border border-border bg-surface px-3 text-text">
              <option value="">全部</option>
              {tag && !tags.includes(tag) && <option value={tag}>{tag}</option>}
              {tags.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
            <button type="submit" className="site-control filter-link">顯示</button>
          </form>
        </details>
        <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-border pb-3 text-sm text-text-muted">
          <p>{tag || "全部文章"} · {filteredPosts.length} 篇</p>
          {tag && <Link href="/blog" className="site-control text-primary hover:underline">清除分類 ×</Link>}
        </div>
      </FadeIn>
      <div className="divide-y divide-border">
        {filteredPosts.map((post) => (
          <article key={post.href} className="py-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-5">
              <h2 className="min-w-0 text-xl font-semibold leading-snug">
                <Link href={post.href!} className="hover:text-primary">{post.title}</Link>
              </h2>
              <time dateTime={post.date} className="shrink-0 text-sm tabular-nums text-text-muted">{post.date}</time>
            </div>
            <p className="mt-2 text-[15px] leading-relaxed text-text-muted">{post.summary}</p>
            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
              {post.tags.map((item) => (
                <Link key={item} href={`/blog?tag=${encodeURIComponent(item)}`} className="inline-flex min-h-8 items-center text-sm text-primary hover:underline">{item}</Link>
              ))}
            </div>
          </article>
        ))}
        {filteredPosts.length === 0 && (
          <div className="py-10 text-text-muted">
            <p className="mb-3">這個分類還沒有公開文章。</p>
            <Link href="/blog" className="site-control text-primary hover:underline">看所有文章 →</Link>
          </div>
        )}
      </div>
    </div>
  );
}
