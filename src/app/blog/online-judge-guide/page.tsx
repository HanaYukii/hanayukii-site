import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "各大 Online Judge 介紹 | 花雪 HanaYukii",
  description:
    "從台灣的 ZeroJudge、TIOJ 到 Codeforces、AtCoder、LeetCode，主流 OJ 的特色、適合誰、怎麼用。給想入坑競賽程式或不知道往哪邊練的人。",
  openGraph: {
    title: "各大 Online Judge 介紹",
    description:
      "從台灣的 ZeroJudge、TIOJ 到 Codeforces、AtCoder、LeetCode，主流 OJ 的特色、適合誰、怎麼用。",
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

function SubHeading({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <h3 id={id} className="mb-3 mt-8 text-xl font-bold text-text scroll-mt-20">
      {children}
    </h3>
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
        <p className="mb-8 text-sm text-text-muted">2026-04-29</p>
      </FadeIn>

      <div className="prose-custom space-y-4 text-text-muted leading-relaxed [&_strong]:text-text">

        <FadeIn>
          <p>
            整理一下我自己用過、教學會帶到的主流 Online Judge。這個列表參考我以前家教教材的順序，從入門到競賽向都有，後面也補了幾個 slides 原本沒列但值得知道的。
          </p>
          <p>
            適合想入坑 CP，或是已經在練但不知道下一步該去哪的人。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="what-is-oj">什麼是 Online Judge</Heading>
          <p>
            簡單講就是線上幫你執行程式、餵測資、判斷對錯的平台。送出一份 code 之後，OJ 會回一個 verdict：
          </p>
          <ul className="list-inside list-disc space-y-1 text-sm">
            <li><strong>AC</strong> (Accepted) — 過了</li>
            <li><strong>WA</strong> (Wrong Answer) — 答案錯</li>
            <li><strong>TLE</strong> (Time Limit Exceeded) — 超時</li>
            <li><strong>MLE</strong> (Memory Limit Exceeded) — 記憶體超用</li>
            <li><strong>CE</strong> (Compile Error) — 編譯錯誤</li>
            <li><strong>RE</strong> (Runtime Error) — 執行時錯誤</li>
          </ul>
        </FadeIn>

        {/* ── 國內 OJ ── */}
        <FadeIn>
          <Heading id="domestic">國內 OJ</Heading>
          <p>
            台灣 OJ 主要受眾是高中、APCS、TOI 圈的學生。題敘多為中文，對剛學程式的人比較友善。
          </p>
        </FadeIn>

        <FadeIn>
          <SubHeading id="greenjudge">GreenJudge</SubHeading>
          <p>
            最入門的選擇，題敘中文、題目偏重語法實作，比較少演算法思考。如果連 if/else、迴圈都還在熟悉，從這邊開始很適合，能很快累積成就感。
          </p>
        </FadeIn>

        <FadeIn>
          <SubHeading id="zerojudge">ZeroJudge</SubHeading>
          <p>
            題庫最豐富的台灣 OJ，題目從很簡單到中等都有。題目較雜亂，沒有特別整理的順序，但簡單題很多，適合練手感。APCS 考古題也在這邊。
          </p>
        </FadeIn>

        <FadeIn>
          <SubHeading id="tioj">TIOJ</SubHeading>
          <p>
            難度跳一階，大多是競賽題，包含很多 TOI、北市賽、各高中校內賽的題目。比較適合已經有基礎、想往競賽方向練的人。
          </p>
        </FadeIn>

        {/* ── 國外 OJ ── */}
        <FadeIn>
          <Heading id="international">國外 OJ</Heading>
          <p>
            真正想練 CP，這幾個是必備的。
          </p>
        </FadeIn>

        <FadeIn>
          <SubHeading id="codeforces">Codeforces</SubHeading>
          <p>
            全球 CP 社群最大、最重要的平台。每週都有比賽（Div. 1 / Div. 2 / Div. 3 / Educational Round），Rating 系統從綠到紅都有，從入門到頂尖都有題可以做。
          </p>
          <p>
            如果你問我「想認真練 CP 該去哪」，答案就是 Codeforces。Editorial 品質穩定、題目品質高、社群活躍，幾乎是 CP 的代名詞。
          </p>
        </FadeIn>

        <FadeIn>
          <SubHeading id="atcoder">AtCoder</SubHeading>
          <p>
            日本系，題目偏思維跟數學，品質非常高。三個主要比賽系列：
          </p>
          <ul className="list-inside list-disc space-y-1 text-sm">
            <li><strong>ABC</strong> (Beginner Contest) — 適合入門到中階，7 題從很簡單到很難</li>
            <li><strong>ARC</strong> (Regular Contest) — 中階到高階，思維題為主</li>
            <li><strong>AGC</strong> (Grand Contest) — 頂級，題目刁鑽，跑得動的人不多</li>
          </ul>
          <p>
            另外 AtCoder 有一個{" "}
            <a
              href="https://atcoder.jp/contests/dp"
              target="_blank"
              rel="noreferrer"
              className="text-primary underline underline-offset-2 hover:text-primary/80"
            >
              Educational DP Contest
            </a>
            ，26 題涵蓋大部分常見 DP 模式，是練 DP 的經典教材。
          </p>
        </FadeIn>

        <FadeIn>
          <SubHeading id="leetcode">LeetCode</SubHeading>
          <p>
            面試導向。題目偏經典演算法，難度中等，分類清楚還可以按公司 tag 篩選。Weekly Contest + Biweekly Contest 兩場線上賽。
          </p>
          <p>
            LeetCode 跟 CP 是不同方向。CP 重視思維深度跟比賽臨場，LeetCode 重視題型熟練跟手速。準備面試靠它沒問題，但別把它當 CP 在練。
          </p>
        </FadeIn>

        {/* ── 其他值得知道的 ── */}
        <FadeIn>
          <Heading id="others">其他值得知道的</Heading>
          <p>
            這幾個原本 slides 沒列，但都蠻重要：
          </p>
        </FadeIn>

        <FadeIn>
          <SubHeading id="cses">CSES Problem Set</SubHeading>
          <p>
            芬蘭出品的結構化題庫，200 多題分成 Introductory、Sorting、Graph、DP、Range Queries 等主題。如果你想系統性把基礎演算法過一遍，這個比 Codeforces 更適合，題目都是經典練習題型、沒比賽壓力。我自己會推薦給入門到中階學生當主練題庫。
          </p>
        </FadeIn>

        <FadeIn>
          <SubHeading id="usaco">USACO</SubHeading>
          <p>
            美國高中 OI 系統，分 Bronze / Silver / Gold / Platinum 四級。USACO Guide 整理得非常完整，如果想跟著一個有結構的進度練，這是很不錯的選擇。題目本身難度也夠，到 Platinum 等級已經是頂級水準。
          </p>
        </FadeIn>

        <FadeIn>
          <SubHeading id="kattis">Kattis</SubHeading>
          <p>
            ICPC 區域賽常用的 judge。題目風格偏 ICPC（題敘長、輸入輸出格式較複雜）。準備 ICPC 的話會接觸到，平常不太會主動去刷。
          </p>
        </FadeIn>

        <FadeIn>
          <SubHeading id="project-euler">Project Euler</SubHeading>
          <p>
            數學導向題庫，跟一般 CP 風格差很多，更偏純數學跟暴力推導。喜歡數論、組合數學的人會很愛。
          </p>
        </FadeIn>

        <FadeIn>
          <SubHeading id="legacy">SPOJ / UVa（古典 OJ）</SubHeading>
          <p>
            十幾年前的經典 OJ，現在比較少人主練。題目品質參差，但很多經典題跟教材上的解題範例還是會引用 UVa 編號。當作參考性質知道一下就好。
          </p>
        </FadeIn>

        {/* ── 已停辦的 ── */}
        <FadeIn>
          <Heading id="discontinued">已停辦的線上賽</Heading>
          <p>
            這幾個比賽以前都很有名，但都已經沒了：
          </p>
          <ul className="list-inside list-disc space-y-1 text-sm">
            <li><strong>Google Code Jam</strong> — 每年一次的全球比賽，2023 停辦</li>
            <li><strong>Google Kick Start</strong> — 入門到中階定期賽，2023 停辦</li>
            <li><strong>Facebook / Meta Hacker Cup</strong> — 還在但聲量降低</li>
          </ul>
          <p>
            提一下是因為這些比賽當年很多人靠它累積知名度跟拿到 offer，包括我自己也是因為 Kick Start 成績被 Google 邀請過。可惜現在這條路走不通了。
          </p>
        </FadeIn>

        {/* ── 怎麼選 ── */}
        <FadeIn>
          <Heading id="how-to-choose">怎麼選</Heading>
          <p>
            依目標，我大概會這樣建議：
          </p>
          <ul className="list-inside list-disc space-y-2 text-sm">
            <li><strong>剛學程式 / 高中生入門</strong>：GreenJudge → ZeroJudge → AtCoder ABC</li>
            <li><strong>想認真練 CP / ICPC 方向</strong>：Codeforces 是核心，AtCoder ARC/AGC 補思維題，CSES 補基礎，TIOJ 練台灣競賽題</li>
            <li><strong>準備外商面試</strong>：LeetCode 為主，刷分類題 + 打 weekly 維持手感</li>
            <li><strong>純興趣 / 數學味</strong>：AtCoder + Project Euler</li>
          </ul>
          <p>
            我自己的習慣：Codeforces 是日常主練場，AtCoder 補品質高的思維題，LeetCode 偶爾打 weekly 維持手感。其他幾個是教學或補特定主題才會用。
          </p>
        </FadeIn>

      </div>
    </article>
  );
}
