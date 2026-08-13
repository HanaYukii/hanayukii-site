/**
 * 文章插圖的統一外框。
 *
 * 兩條規則，寫在這裡免得以後忘記：
 *  1. caption 要是一個完整的主張句（「圖 N：X 比 Y 少了一個 log」），
 *     不是標籤（「圖 N：架構圖」）。圖被略過時讀者仍然拿得到那句話。
 *  2. 圖是內容不是裝飾，所以不加 aria-hidden；真正純裝飾的東西
 *     用 ArticleIllustration，不要用這個。
 */
export default function Figure({
  caption,
  children,
}: {
  caption: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <figure className="my-8">
      <div className="overflow-x-auto border border-border bg-[var(--illustration-surface)]">
        {children}
      </div>
      <figcaption className="mt-2 text-center text-xs text-text-muted">
        {caption}
      </figcaption>
    </figure>
  );
}
