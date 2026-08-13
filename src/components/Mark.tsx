/**
 * 站徽：三條線在 60 度交叉成六向星，中心一個點。
 *
 * 六方對稱是雪的結晶，星芒是 Starmine——花雪跟 tagline 剛好在同一個記號裡。
 * 它本來就存在（src/app/icon.svg），只是一直只活在瀏覽器分頁籤上。
 *
 * 線用 currentColor，所以顏色由外面的 text-* 決定，兩個主題都成立。
 */
export default function Mark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <g stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
        <line x1="16" y1="6" x2="16" y2="26" />
        <line x1="24.66" y1="11" x2="7.34" y2="21" />
        <line x1="7.34" y1="11" x2="24.66" y2="21" />
      </g>
      <circle cx="16" cy="16" r="2.6" fill="var(--color-primary)" />
    </svg>
  );
}
