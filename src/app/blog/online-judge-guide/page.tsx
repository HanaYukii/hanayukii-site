import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "各大 Online Judge 介紹 | 花雪 HanaYukii",
  description:
    "Codeforces、LeetCode、AtCoder、TIOJ 等主流 OJ 的差異、適合誰、怎麼用。",
  openGraph: {
    title: "各大 Online Judge 介紹",
    description:
      "Codeforces、LeetCode、AtCoder、TIOJ 等主流 OJ 的差異、適合誰、怎麼用。",
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

export default function OnlineJudgeGuide() {
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
          <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
            Competitive Programming
          </span>
        </div>
        <h1 className="mb-2 text-4xl font-extrabold tracking-tight">
          各大 Online Judge 介紹
        </h1>
        <p className="mb-8 text-sm text-text-muted">
          Draft
        </p>
      </FadeIn>

      <div className="prose-custom space-y-2 text-text-muted leading-relaxed [&_strong]:text-text">

        {/* ── Codeforces ── */}
        <FadeIn>
          <Heading id="codeforces">Codeforces</Heading>
          <p>
            {/* 最大的競賽社群、rating 系統、div1/div2/edu */}
            {/* 適合誰：想認真練競賽的人 */}
            {/* 特色：題目品質高、editorial、比賽頻率高 */}
          </p>
        </FadeIn>

        {/* ── LeetCode ── */}
        <FadeIn>
          <Heading id="leetcode">LeetCode</Heading>
          <p>
            {/* 面試導向、weekly/biweekly contest */}
            {/* 適合誰：準備面試、刷題練手感 */}
            {/* 特色：題目分類清楚、公司 tag */}
          </p>
        </FadeIn>

        {/* ── AtCoder ── */}
        <FadeIn>
          <Heading id="atcoder">AtCoder</Heading>
          <p>
            {/* 日本最大 OJ、ABC/ARC/AGC */}
            {/* 適合誰：喜歡數學、思維題 */}
            {/* 特色：題目乾淨、editorial 品質高 */}
          </p>
        </FadeIn>

        {/* ── TIOJ / ZeroJudge ── */}
        <FadeIn>
          <Heading id="tw-oj">TIOJ / ZeroJudge</Heading>
          <p>
            {/* 台灣本地 OJ */}
            {/* 適合誰：高中生、APCS 準備 */}
          </p>
        </FadeIn>

        {/* ── 其他 ── */}
        <FadeIn>
          <Heading id="others">其他</Heading>
          <p>
            {/* SPOJ、UVa、Kattis、DMOJ 等 */}
            {/* Google Code Jam (已停)、Meta Hacker Cup */}
          </p>
        </FadeIn>

        {/* ── 怎麼選 ── */}
        <FadeIn>
          <Heading id="how-to-choose">怎麼選</Heading>
          <p>
            {/* 依目標選：面試 vs 競賽 vs 興趣 */}
            {/* 我自己的使用方式 */}
          </p>
        </FadeIn>

      </div>
    </article>
  );
}
