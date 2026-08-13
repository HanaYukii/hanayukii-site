import { ReactNode } from "react";

/**
 * 曾經是 whileInView 的淡入動畫，現在是一個普通的 div。
 *
 * 保留這個元件而不是把 415 個呼叫點拆掉，是因為它 render 出來的 div
 * 是真的 DOM 節點，很多都是 space-y-* 容器的直接子元素——拆掉會改變
 * 間距結構。保留節點、拿掉動畫，版面完全不動，順便讓每篇文章的
 * client bundle 少掉 framer-motion。
 *
 * `delay` 還留在型別裡讓既有呼叫點不用改，但不再有作用。
 */
export default function FadeIn({
  children,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}
