import { posts } from "@/data/posts";

/**
 * 文章頁首那一行 meta：寫下的日期、事情發生的日期、原題／原場次連結。
 *
 * 全部從 posts.ts 讀，文章檔裡不再手寫日期字串——原本 cf2217f 是唯一
 * 一篇手刻原題連結的，那種東西應該在資料層而不是散在 JSX 裡。
 */
export default function PostMeta({ href }: { href: string }) {
  const post = posts.find((p) => p.href === href);
  if (!post) return null;

  return (
    <p className="mb-8 text-sm text-text-muted">
      <time dateTime={post.date}>{post.date}</time>
      {post.occurred && (
        <>
          {" · 發生於 "}
          <time dateTime={post.occurred}>{post.occurred}</time>
        </>
      )}
      {post.source && (
        <>
          {" · "}
          <a
            href={post.source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="prose-link"
          >
            {post.source.id}
          </a>
        </>
      )}
    </p>
  );
}
