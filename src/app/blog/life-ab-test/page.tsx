import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "如果人生可以 A/B Test | 花雪 HanaYukii",
  description:
    "人過度美化自己沒選的路，也過度合理化已選的路。但真相是你永遠跑不了對照組。",
  openGraph: {
    title: "如果人生可以 A/B Test",
    description:
      "人過度美化自己沒選的路，也過度合理化已選的路。但真相是你永遠跑不了對照組。",
    type: "article",
  },
};

function Heading({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <h2 id={id} className="mb-4 mt-12 text-2xl font-bold text-warm scroll-mt-20">
      {children}
    </h2>
  );
}

export default function LifeAbTest() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <FadeIn>
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-1 text-sm text-text-muted transition-colors hover:text-primary"
        >
          &larr; Back to Blog
        </Link>

        <div className="mb-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-warm/10 px-2.5 py-0.5 text-xs font-medium text-warm">
            Life
          </span>
          <span className="rounded-full bg-warm/10 px-2.5 py-0.5 text-xs font-medium text-warm">
            Personal
          </span>
        </div>
        <h1 className="mb-2 text-4xl font-extrabold tracking-tight">
          如果人生可以 A/B Test
        </h1>
        <p className="mb-8 text-sm text-text-muted">
          Draft
        </p>
      </FadeIn>

      <div className="prose-custom space-y-2 text-text-muted leading-relaxed [&_strong]:text-text">

        {/* ── 沒有對照組 ── */}
        <FadeIn>
          <Heading id="no-control">沒有對照組</Heading>
          <p>
            {/* 人生跟 A/B test 最大的差別：你永遠只能跑一組 */}
            {/* 所有的「如果當初」都是無法驗證的假設 */}
          </p>
        </FadeIn>

        {/* ── 美化沒選的路 ── */}
        <FadeIn>
          <Heading id="glorify-unchosen">美化沒選的路</Heading>
          <p>
            {/* 人會把沒走的路想得特別好 */}
            {/* 「如果當初留在 Google」「如果當初選另一個 offer」 */}
            {/* 但那條路的困難跟失望你也看不到 */}
          </p>
        </FadeIn>

        {/* ── 合理化已選的路 ── */}
        <FadeIn>
          <Heading id="rationalize-chosen">合理化已選的路</Heading>
          <p>
            {/* 沉沒成本讓人合理化自己的選擇 */}
            {/* 「我不後悔」很多時候只是因為沒得比較 */}
            {/* 倖存者偏差：成功的人說不後悔，不代表那條路真的比較好 */}
          </p>
        </FadeIn>

        {/* ── 真正的大節點 ── */}
        <FadeIn>
          <Heading id="key-moments">真正的大節點</Heading>
          <p>
            {/* 其實很多決定的差異沒有想像中大 */}
            {/* 真正影響大的可能就那幾個節點 */}
            {/* 但你在當下根本不知道是哪幾個 */}
          </p>
        </FadeIn>

        {/* ── 自己的幾個假設 ── */}
        <FadeIn>
          <Heading id="my-what-ifs">自己的幾個假設</Heading>
          <p>
            {/* 離開 Google、選新創、打競賽 */}
            {/* 每個都是沒辦法 A/B test 的決定 */}
            {/* 誠實面對：有些選擇可能真的選錯了，但你不會知道 */}
          </p>
        </FadeIn>

        {/* ── 那怎麼辦 ── */}
        <FadeIn>
          <Heading id="so-what">那怎麼辦</Heading>
          <p>
            {/* 不是要得出「所以不要想太多」的結論 */}
            {/* 而是承認不確定性，然後繼續走 */}
            {/* 不需要說服自己每個決定都是對的 */}
          </p>
        </FadeIn>

      </div>
    </article>
  );
}
