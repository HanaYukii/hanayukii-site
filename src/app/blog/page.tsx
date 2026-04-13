import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { posts } from "@/data/posts";

export default function Blog() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <FadeIn>
        <h1 className="mb-2 text-4xl font-extrabold tracking-tight">Blog</h1>
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
