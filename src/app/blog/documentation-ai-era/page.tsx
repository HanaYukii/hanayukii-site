import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "寫文件為什麼在 AI 時代更重要 | 花雪 HanaYukii",
  description:
    "大家都討厭寫文件，但 AI 時代文件的價值被放大了。你餵給 AI 的 context 越多，它能幫你的就越多。",
  openGraph: {
    title: "寫文件為什麼在 AI 時代更重要",
    description:
      "大家都討厭寫文件，但 AI 時代文件的價值被放大了。你餵給 AI 的 context 越多，它能幫你的就越多。",
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

export default function DocumentationAiEra() {
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
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            Software Engineering
          </span>
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            AI
          </span>
        </div>
        <h1 className="mb-2 text-4xl font-extrabold tracking-tight">
          寫文件為什麼在 AI 時代更重要
        </h1>
        <p className="mb-8 text-sm text-text-muted">
          Draft
        </p>
      </FadeIn>

      <div className="prose-custom space-y-2 text-text-muted leading-relaxed [&_strong]:text-text">

        {/* ── 大家都討厭寫文件 ── */}
        <FadeIn>
          <Heading id="hate">大家都討厭寫文件</Heading>
          <p>
            {/* 短期沒回報、寫完沒人看、格式煩 */}
            {/* 工程師普遍覺得寫 code 比較重要 */}
            {/* 但文件爛的 codebase 大家都痛苦 */}
          </p>
        </FadeIn>

        {/* ── 傳統的好處還在 ── */}
        <FadeIn>
          <Heading id="traditional">傳統的好處還在</Heading>
          <p>
            {/* 交接、onboard、減少重複溝通 */}
            {/* 好的文件省下的時間遠超過寫它花的時間 */}
            {/* 這些好處不會因為 AI 出現就消失 */}
          </p>
        </FadeIn>

        {/* ── AI 時代的新價值 ── */}
        <FadeIn>
          <Heading id="ai-value">AI 時代的新價值</Heading>
          <p>
            {/* Context 餵越多，AI 產出越好 */}
            {/* 好的文件 = 讓 AI 幫你幹更多事的前提 */}
            {/* 沒文件的 codebase，AI 也救不了 */}
            {/* 以前「沒人看」的文件，現在 AI 會看 */}
          </p>
        </FadeIn>

        {/* ── 寫文件的人有更大槓桿 ── */}
        <FadeIn>
          <Heading id="leverage">寫文件的人有更大槓桿</Heading>
          <p>
            {/* 寫文件的人在 AI 時代反而更有槓桿 */}
            {/* 文件好的專案，AI 輔助的效率差距會更明顯 */}
            {/* 這是一個被低估的競爭優勢 */}
          </p>
        </FadeIn>

        {/* ── 怎麼寫才有用 ── */}
        <FadeIn>
          <Heading id="how">怎麼寫才有用</Heading>
          <p>
            {/* 不是寫越多越好 */}
            {/* 給人看的文件 vs 給 AI 看的文件，格式可能不一樣 */}
            {/* 實際工作中的做法 */}
          </p>
        </FadeIn>

      </div>
    </article>
  );
}
