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
            {/* 不同環境對「強」的定義完全不同 */}
          </p>
        </FadeIn>

        {/* ── 計分牌 ── */}
        <FadeIn>
          <Heading id="scoreboard">把錢當計分牌</Heading>
          <p>
            {/* 計分牌的定義：衡量「強」的方式 */}
            {/* 不同領域有不同的計分牌 */}
            {/* 錢作為計分牌：不是貪，是市場對你的客觀定價 */}
            {/* 但計分牌會誤導：遊戲規則不同，分數就不同 */}
          </p>
        </FadeIn>

        {/* ── CP 的強 ── */}
        <FadeIn>
          <Heading id="cp">CP 的計分牌</Heading>
          <p>
            {/* rating、排名，最純粹也最殘酷 */}
            {/* 競賽訓練帶來的直覺、深度、速度 */}
            {/* 跟短期刷題的差距：不同層次 */}
            {/* 但也有盲點：不代表工程能力強 */}
          </p>
        </FadeIn>

        {/* ── 工程的強 ── */}
        <FadeIn>
          <Heading id="engineering">工程的計分牌</Heading>
          <p>
            {/* 產出、系統規模、code quality，但很難量化 */}
            {/* 在 Google 學到跟沒學到的 */}
            {/* 在新創補回來的：從零建系統才真正看得出實力 */}
          </p>
        </FadeIn>

        {/* ── 職場的強 ── */}
        <FadeIn>
          <Heading id="workplace">職場的計分牌</Heading>
          <p>
            {/* TC、title、升遷速度 */}
            {/* 跟「真正的強」常常脫鉤 */}
            {/* Impact story、能見度、政治 */}
            {/* Google 的落差：problem solving 很強但計分牌卡住，因為遊戲規則不同 */}
          </p>
        </FadeIn>

        {/* ── 影響力的計分牌 ── */}
        <FadeIn>
          <Heading id="influence">影響力的計分牌</Heading>
          <p>
            {/* 銷售、轉換率、包裝也是一種計分牌 */}
            {/* 連結 RESET 那篇：影響力設計背後的計分邏輯 */}
            {/* 不同遊戲的「強」看的東西完全不同 */}
          </p>
        </FadeIn>

        {/* ── 企業家的計分牌 ── */}
        <FadeIn>
          <Heading id="entrepreneur">企業家的計分牌</Heading>
          <p>
            {/* 成功的企業家看的又是另一套：商業判斷、執行力、資源整合 */}
            {/* 不侷限在工程師視角，跳出技術圈看「強」的定義 */}
            {/* 觀察身邊成功的人，他們的計分牌跟工程師完全不同 */}
          </p>
        </FadeIn>

        {/* ── 不只是技術 ── */}
        <FadeIn>
          <Heading id="beyond-tech">不只是技術</Heading>
          <p>
            {/* 社交能力、溝通、人脈經營，也都是計分牌 */}
            {/* 很多面向的「強」是工程師容易忽略的 */}
            {/* 每個維度都有自己的計分方式，沒有哪個比較高級 */}
          </p>
        </FadeIn>

        {/* ── 當下的體會 ── */}
        <FadeIn>
          <Heading id="now">當下的體會</Heading>
          <p>
            {/* 現在怎麼定義自己的強 */}
            {/* 選對計分牌比拼命刷分重要 */}
            {/* 野心、方向、持續進步 */}
            {/* 但也許，過得舒適、在一個自己很喜歡的狀態，才是在所有計分牌之上、更重要的計分牌 */}
          </p>
        </FadeIn>

      </div>
    </article>
  );
}
