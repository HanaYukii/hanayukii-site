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
  searchParams: Promise<{ tag?: string }>;
}) {
  const params = await searchParams;
  const tag = params?.tag;
  const filteredPosts = tag
    ? posts.filter((p) => p.tags.includes(tag))
    : posts;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <FadeIn>
        <div className="mb-2 flex items-center gap-3">
          <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
          <a
            href="/feed.xml"
            target="_blank"
            rel="noopener noreferrer"
            title="RSS Feed"
            className="text-text-muted transition-colors hover:text-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <circle cx="6.18" cy="17.82" r="2.18" />
              <path d="M4 4.44v2.83c7.03 0 12.73 5.7 12.73 12.73h2.83c0-8.59-6.97-15.56-15.56-15.56zm0 5.66v2.83c3.9 0 7.07 3.17 7.07 7.07h2.83c0-5.47-4.43-9.9-9.9-9.9z" />
            </svg>
          </a>
        </div>
        <p className="mb-10 text-text-muted">
          大多是技術筆記，偶爾也寫職涯、偶像，或最近剛好一直在想的事。
        </p>

        {tag && (
          <div className="mb-8 flex items-center gap-3 border-b border-border pb-4 text-sm">
            <span className="text-text-muted">Filtered by tag:</span>
            <span className="font-medium text-primary">{tag}</span>
            <span className="text-text/30">·</span>
            <span className="text-text-muted">
              {filteredPosts.length} post
              {filteredPosts.length === 1 ? "" : "s"}
            </span>
            <Link
              href="/blog"
              className="ml-auto text-text-muted transition-colors hover:text-text"
            >
              Clear &times;
            </Link>
          </div>
        )}
      </FadeIn>

      <div className="divide-y divide-border">
        {filteredPosts.map((post) => {
          const content = (
            <>
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-xl font-semibold transition-colors group-hover:text-primary">
                  {post.title}
                </h2>
                <span className="shrink-0 text-xs text-text-muted">
                  {post.date || "Draft"}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                {post.summary}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {post.tags.map((t) => (
                  <span
                    key={t}
                    className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${post.tagStyle}`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </>
          );

          return post.href ? (
            <Link
              key={post.title}
              href={post.href}
              className="group -mx-3 block rounded-lg px-3 py-6 transition-colors duration-200 hover:bg-surface/60"
            >
              {content}
            </Link>
          ) : (
            <div key={post.title} className="block py-6 opacity-50">
              {content}
            </div>
          );
        })}

        {filteredPosts.length === 0 && tag && (
          <div className="py-10 text-center text-text-muted">
            <p className="mb-3">這個標籤下還沒有文章。</p>
            <Link
              href="/blog"
              className="text-sm text-primary hover:underline"
            >
              看所有文章 &rarr;
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
