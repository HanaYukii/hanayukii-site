import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "什麼叫做強 | 花雪 HanaYukii",
  description:
    "CP 的強、工程的強、職場的強，不同維度的定義跟我自己的體會。",
  openGraph: {
    title: "什麼叫做強",
    description:
      "CP 的強、工程的強、職場的強，不同維度的定義跟我自己的體會。",
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

export default function WhatIsStrong() {
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
            Career
          </span>
          <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
            Personal
          </span>
        </div>
        <h1 className="mb-2 text-4xl font-extrabold tracking-tight">
          什麼叫做強
        </h1>
        <p className="mb-8 text-sm text-text-muted">
          Draft
        </p>
      </FadeIn>

      <div className="prose-custom space-y-2 text-text-muted leading-relaxed [&_strong]:text-text">

        {/* ── 起點 ── */}
        <FadeIn>
          <Heading id="intro">起點</Heading>
          <p>
            {/* 從離開 Google 那篇的「什麼叫做強」延伸 */}
            {/* Problem solving 的強 vs domain knowledge 的強 vs 做事的強 */}
          </p>
        </FadeIn>

        {/* ── CP 的強 ── */}
        <FadeIn>
          <Heading id="cp">CP 的強</Heading>
          <p>
            {/* 競賽訓練帶來的直覺、深度、速度 */}
            {/* 跟短期刷題的差距 */}
            {/* 但也有盲點：不代表工程能力強 */}
          </p>
        </FadeIn>

        {/* ── 工程的強 ── */}
        <FadeIn>
          <Heading id="engineering">工程的強</Heading>
          <p>
            {/* 系統設計、架構、可維護性 */}
            {/* 在 Google 學到跟沒學到的 */}
            {/* 在新創補回來的 */}
          </p>
        </FadeIn>

        {/* ── 職場的強 ── */}
        <FadeIn>
          <Heading id="workplace">職場的強</Heading>
          <p>
            {/* Impact story、能見度、政治 */}
            {/* 技術強不等於職場強 */}
            {/* 環境適配的重要性 */}
          </p>
        </FadeIn>

        {/* ── 當下的體會 ── */}
        <FadeIn>
          <Heading id="now">當下的體會</Heading>
          <p>
            {/* 現在怎麼定義自己的強 */}
            {/* 野心、方向、持續進步 */}
          </p>
        </FadeIn>

      </div>
    </article>
  );
}
