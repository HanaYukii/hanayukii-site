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
            簡單講就是線上幫你執行程式、餵測資、判斷對錯的平台。測試資料會有公開的範例跟隱藏的，公開的讓你知道輸入輸出長怎樣，隱藏的拿來真正評分，這樣你才不能寫死答案。
          </p>
          <p>
            送出一份 code 之後，OJ 會回一個 verdict。verdict 會隨著不同 OJ 有小差別，但主要就這幾種：
          </p>
          <ul className="list-inside list-disc space-y-2 text-sm">
            <li>
              <strong>AC</strong> (Accepted) — 過了。你的程式在所有測試資料都跑出正確答案、也沒超時、沒爆記憶體。
            </li>
            <li>
              <strong>WA</strong> (Wrong Answer) — 答案錯。你的程式輸出在部分測試資料沒有對上平台預期的正確答案。
            </li>
            <li>
              <strong>TLE</strong> (Time Limit Exceeded) — 超時。程式執行時間超過題目限制（常見是 1 ~ 2 秒），通常代表你的演算法複雜度不夠好。
            </li>
            <li>
              <strong>MLE</strong> (Memory Limit Exceeded) — 記憶體超用。程式佔用的記憶體超過題目限制（常見 256 MB），通常是開了過大的陣列或無限遞迴。
            </li>
            <li>
              <strong>CE</strong> (Compile Error) — 編譯錯誤。程式根本無法被編譯，通常是語法錯誤、忘記 include header 之類的。
            </li>
            <li>
              <strong>RE</strong> (Runtime Error) — 執行時錯誤。程式跑到一半崩潰，常見原因是陣列 out of bound、除以零、stack overflow。
            </li>
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
          <p>
            TIOJ 偶爾會有系統狀態或 submission 速度不穩定的問題，當作競賽題庫使用會比當作新手主練場更適合。
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
            全球 CP 社群最大、最重要的平台。幾乎每週都有比賽，常見類型包含 Div. 1 / Div. 2 / Div. 3 / Div. 4 / Educational Round 等，Rating 系統從綠到紅都有，從入門到頂尖都有題可以做。
          </p>
          <p>
            認真練 CP 就 Codeforces，沒什麼好挑。題目品質、editorial、社群活躍度都非常強，幾乎是現代 CP 最重要的主戰場。
          </p>
        </FadeIn>

        <FadeIn>
          <SubHeading id="atcoder">AtCoder</SubHeading>
          <p>
            日本系，題目偏思維跟數學，品質非常高。三個主要比賽系列：
          </p>
          <ul className="list-inside list-disc space-y-1 text-sm">
            <li><strong>ABC</strong> (Beginner Contest) — 適合入門到中階，通常約 7 題，從很簡單一路到需要完整演算法思考的題目。後段題（E/F/G 等）模板偏多、經典技巧覆蓋廣，學到的東西很容易套到其他題</li>
            <li><strong>ARC</strong> (Regular Contest) — 中階到高階，傳統上偏思維題；2026 起 ARC 主要回到 rated 1200–2799 的格式，另外也有 ARC++ / ARC-- 這類分級版本</li>
            <li><strong>AGC</strong> (Grand Contest) — AtCoder 最高難度系列，題目通常非常重思維與構造</li>
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
            面試導向。題目偏經典演算法，難度中等，分類清楚，也有公司 tag、題單等面試導向資源（部分功能需要 Premium）。Weekly Contest + Biweekly Contest 兩場線上賽。
          </p>
          <p>
            LeetCode 跟 CP 是不同方向。CP 重視思維深度跟比賽臨場，LeetCode 重視題型熟練跟手速。當然 LeetCode Contest 高分段也很競技，但主流使用情境還是面試準備。
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
            芬蘭出品的結構化題庫，收錄數百題，分成 Introductory、Sorting and Searching、Graph Algorithms、DP、Range Queries、Tree Algorithms、Mathematics 等主題。裡面包含大量模板題跟經典技巧的硬用，強烈推薦認真練 CP 的人要刷過一輪，把基本工具吃進來。
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
            很多 ICPC 訓練、部分區域賽跟校內賽會使用或參考的平台。題目風格偏 ICPC：題敘較長、輸入輸出格式細節多、實作與邊界條件很重要。準備 ICPC 的話會接觸到，平常不太會主動去刷。
          </p>
        </FadeIn>

        <FadeIn>
          <SubHeading id="project-euler">Project Euler</SubHeading>
          <p>
            數學導向題庫，跟一般 CP 風格差很多，更偏數學觀察、公式推導與寫小程式驗證想法。喜歡數論、組合數學的人會很愛。
          </p>
        </FadeIn>

        <FadeIn>
          <SubHeading id="legacy">SPOJ / UVa（古典 OJ）</SubHeading>
          <p>
            十幾年前的經典 OJ，題庫年代久、風格不一，現在比較不像主流日常練習場。但很多經典題跟教材上的解題範例還是會引用 UVa 編號。當作參考性質知道一下就好。
          </p>
        </FadeIn>

        <FadeIn>
          <SubHeading id="chinese-oj">中國 OJ</SubHeading>
          <p>
            POJ（北京大學）跟 HDU（杭州電子科技大學）是 2000 年代到 2010 年代初中國 ACM 圈的兩大主流 OJ，當時很多經典訓練題都從這兩家來，台灣這邊 ICPC 訓練老一輩的人也常用。現在活躍度大幅下降，比較像 archive，但<strong>如果是競賽向</strong>，題庫深、經典題多，特定主題的硬訓練（圖論、字串、數論專題等）還是很值得刷。ZOJ（浙江大學）那時也很有名，後來常掛掉，狀態時好時壞。
          </p>
          <p>
            現在中國這邊比較活躍的是<strong>洛谷</strong>（中國 OI 主流訓練平台，題庫整理得不錯，偏中學競賽向，題解資源也豐富）跟<strong>牛客</strong>（CP + 面試題混合，類似中國版的 LeetCode + Codeforces）。
          </p>
        </FadeIn>

        <FadeIn>
          <SubHeading id="vjudge">Vjudge</SubHeading>
          <p>
            嚴格說 Vjudge 不是 OJ，是一個 virtual judge，它把 POJ、HDU、ZOJ、Codeforces、AtCoder、UVa、SPOJ 等十幾個 OJ 的題目聚合在一起，可以透過同一個介面整理跟提交多個 OJ 的題目。
          </p>
          <p>
            最大的價值是組訓練 contest：可以混合不同 OJ 的題目開私人比賽，這在 ICPC team 訓練時超實用。我們以前也是用 Vjudge 開模擬賽。如果想刷中國系 OJ 的題目，從 Vjudge 進來體驗會比直接用 POJ 的網頁好太多。
          </p>
        </FadeIn>

        {/* ── 已停辦的 ── */}
        <FadeIn>
          <Heading id="discontinued">已停辦的線上賽</Heading>
          <p>
            這幾個比賽以前都很有名，但都已經沒了：
          </p>
          <ul className="list-inside list-disc space-y-1 text-sm">
            <li><strong>Google Code Jam / Kick Start / Hash Code</strong> — Google Coding Competitions 系列，2023 年正式收尾並停辦</li>
            <li><strong>Meta Hacker Cup</strong> — 近年仍有舉辦紀錄，但聲量與穩定感已不如 Google Code Jam / Facebook Hacker Cup 黃金時期</li>
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
            <li><strong>想認真練 CP / ICPC 方向</strong>：Codeforces 是核心，AtCoder ABC 後段題模板多、技巧好套用，ARC/AGC 補思維深度，CSES 補基礎，TIOJ 練台灣競賽題</li>
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
