import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { posts } from "@/data/posts";

export default function Blog() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <FadeIn>
        <div className="mb-2 flex items-center gap-3">
          <h1 className="text-4xl font-extrabold tracking-tight">Blog</h1>
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
        <p className="mb-10 text-text-muted">
          Mostly technical writing, with a few career posts and other things I
          ended up caring enough to write down.
        </p>
      </FadeIn>

      <div className="space-y-4">
        {posts.map((post, i) => {
          const content = (
            <>
              <div className="mb-3 flex gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${post.tagStyle}`}
                  >
                    {tag}
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
                  <article className="rounded-xl border border-border bg-surface/40 p-6 backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-surface-hover">
                    {content}
                  </article>
                </Link>
              ) : (
                <article className="rounded-xl border border-border bg-surface/40 p-6 backdrop-blur-sm opacity-70">
                  {content}
                </article>
              )}
            </FadeIn>
          );
        })}
      </div>
    </div>
  );
}
