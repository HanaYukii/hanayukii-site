import Link from "next/link";
import { getPostByHref } from "@/lib/seo";
import PostMeta from "@/components/PostMeta";

export default function ArticleHeader({ href }: { href: string }) {
  const post = getPostByHref(href);
  if (!post) return null;
  return (
    <header className="article-header">
      <Link href="/blog" className="site-control mb-5 text-text-muted hover:text-primary">
        <span aria-hidden="true">←</span> 所有文章
      </Link>
      <div className="mb-3 flex flex-wrap gap-x-3 gap-y-1" aria-label="文章分類">
        {post.tags.map((tag) => (
          <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`} className="tag inline-flex min-h-8 items-center text-sm text-primary hover:underline">{tag}</Link>
        ))}
      </div>
      <h1 className="mb-4 break-words text-3xl font-bold leading-tight sm:text-4xl">{post.title}</h1>
      <PostMeta href={href} />
    </header>
  );
}
