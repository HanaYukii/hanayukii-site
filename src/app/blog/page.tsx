import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { posts } from "@/data/posts";

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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <circle cx="6.18" cy="17.82" r="2.18" />
              <path d="M4 4.44v2.83c7.03 0 12.73 5.7 12.73 12.73h2.83c0-8.59-6.97-15.56-15.56-15.56zm0 5.66v2.83c3.9 0 7.07 3.17 7.07 7.07h2.83c0-5.47-4.43-9.9-9.9-9.9z" />
            </svg>
          </a>
        </div>
        <p className="mb-6 text-text-muted">
          Mostly technical writing, with a few career posts and other things I
          ended up caring enough to write down.
        </p>

        {tag && (
          <div className="mb-8 flex items-center gap-3 rounded-lg border border-border bg-surface/40 px-4 py-3 text-sm">
            <span className="text-text-muted">Filtered by tag:</span>
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              {tag}
            </span>
            <span className="text-text-muted">·</span>
            <span className="text-text-muted">
              {filteredPosts.length} post{filteredPosts.length === 1 ? "" : "s"}
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

      <div className="space-y-4">
        {filteredPosts.map((post, i) => {
          const content = (
            <>
              <div className="mb-3 flex gap-2">
                {post.tags.map((t) => (
                  <span
                    key={t}
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${post.tagStyle}`}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <h2 className="mb-2 text-xl font-bold">{post.title}</h2>
              <p className="mb-2 text-sm leading-relaxed text-text-muted">
                {post.summary}
              </p>
              <p className="text-xs text-text-muted">{post.date}</p>
            </>
          );

          return (
            <FadeIn key={post.title} delay={i * 0.1}>
              {post.href ? (
                <Link href={post.href}>
                  <article className="rounded-xl border border-border bg-surface/40 p-6 transition-all hover:border-primary/40 hover:bg-surface-hover">
                    {content}
                  </article>
                </Link>
              ) : (
                <article className="rounded-xl border border-border bg-surface/40 p-6 opacity-70">
                  {content}
                </article>
              )}
            </FadeIn>
          );
        })}

        {filteredPosts.length === 0 && tag && (
          <div className="rounded-xl border border-border bg-surface/40 p-8 text-center text-text-muted">
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
