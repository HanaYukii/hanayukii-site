import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export default function Tutoring() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <FadeIn>
        <h1 className="mb-2 text-4xl font-extrabold tracking-tight">
          演算法家教簡歷
        </h1>
        <p className="mb-12 text-text-muted">
          程式競賽 · 演算法 · APCS · 面試準備（<Link href="/blog/cp-career-memoir" className="text-primary hover:underline">競賽經歷</Link>）
        </p>
      </FadeIn>

      {/* 經歷 */}
      <FadeIn>
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">經歷</h2>
          <ul className="space-y-1.5 text-sm text-text-muted">
            <li>交大資工學士 (2016–2020)</li>
            <li>交大資工碩士 (2020–2022)</li>
            <li>Google 軟體工程師 (2022–2025)</li>
            <li>AI 新創 Tech Lead (2025–)</li>
          </ul>
        </section>
      </FadeIn>

      {/* 教學經歷 */}
      <FadeIn>
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">教學經歷</h2>
          <ul className="space-y-1.5 text-sm text-text-muted">
            <li>7 年以上程式競賽家教經驗，指導過數十位學生</li>
            <li>涵蓋高中競賽 (TOI、NPSC、學科能力競賽)、程式檢定 (APCS、CPE)、面試準備</li>
            <li>108 演算法概論助教</li>
            <li>110 競技程式設計助教、圖論助教</li>
            <li>2020 PCCA Winter Camp 總召 / 講師</li>
            <li>演算法海牛助教 (2021–2024)</li>
          </ul>
        </section>
      </FadeIn>

      {/* 學生成果 */}
      <FadeIn>
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">學生成果</h2>
          <ul className="space-y-1.5 text-sm text-text-muted">
            <li>入選 TOI 國手選訓營</li>
            <li>特殊選才錄取清大、交大</li>
            <li>考上台大資工</li>
            <li>ICPC Gold Medal</li>
            <li>申請上 CMU</li>
            <li>Google intern / 正職 offer</li>
            <li>Microsoft 正職 offer</li>
          </ul>
          <p className="mt-4 text-xs text-text-muted/60">
            * 這些成績很大程度取決於學生本身的優秀，家教只是輔助。進步也需要大量時間練習。
          </p>
        </section>
      </FadeIn>

      {/* Contact */}
      <FadeIn>
        <section className="rounded-xl border border-border bg-surface/40 p-6 backdrop-blur-sm text-center">
          <p className="mb-4 text-sm text-text-muted">
            有興趣的話聊聊你目前的程度跟目標，我可以很快判斷適不適合、怎麼安排。
          </p>
          <a
            href="mailto:islu245777@gmail.com"
            className="inline-block rounded-lg border border-primary px-5 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
          >
            islu245777@gmail.com
          </a>
        </section>
      </FadeIn>
    </div>
  );
}
