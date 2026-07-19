import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { posts } from "@/data/posts";

// 文末「延伸閱讀」：用共同 tag 自動挑同主題的文章（最多 3 篇，共同 tag 多的優先、
// 平手看新舊）。沒有任何同主題文章就不顯示。放在每篇文章的 <article> 內最底部。
export default function RelatedPosts({ href }: { href: string }) {
  const current = posts.find((p) => p.href === href);
  if (!current) return null;

  const related = posts
    .filter((p) => p.href && p.href !== href)
    .map((p) => ({
      post: p,
      shared: p.tags.filter((t) => current.tags.includes(t)).length,
    }))
    .filter((x) => x.shared > 0)
    .sort((a, b) => b.shared - a.shared || b.post.date.localeCompare(a.post.date))
    .slice(0, 3)
    .map((x) => x.post);

  if (related.length === 0) return null;

  return (
    <FadeIn>
      <div className="mt-16 border-t border-border pt-8">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.15em] text-primary">
          延伸閱讀
        </p>
        <div className="divide-y divide-border/50">
          {related.map((p) => (
            <Link
              key={p.href}
              href={p.href!}
              className="group flex items-baseline justify-between gap-4 py-3"
            >
              <span className="min-w-0 text-sm text-text transition-colors group-hover:text-primary">
                {p.title}
              </span>
              <span className="shrink-0 text-xs text-text-muted">{p.date}</span>
            </Link>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}
