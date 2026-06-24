import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import Image from "next/image";

// 各 feature 下面的 <Image> 指向 public/images/jabiko-*.png。
// 圖片補進 public/images/ 後即顯示；width/height 待依實際截圖尺寸再調整。

export const metadata: Metadata = {
  title: "Jabiko：JLPT 自習網站 | 花雪 HanaYukii",
  description:
    "一個 JLPT 自習網站，從基礎變化到 N1 備考、會自動盯錯題複習；介紹主要的練習模式與功能特色。",
  openGraph: {
    title: "Jabiko：JLPT 自習網站",
    description:
      "從基礎變化到 N1 備考、會自動盯錯題複習的 JLPT 自習網站：主要功能與特色介紹。",
    type: "article",
  },
};

function Heading({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <h2 id={id} className="mb-4 mt-12 scroll-mt-20 text-2xl font-bold text-warm">
      {children}
    </h2>
  );
}

export default function JabikoJlptApp() {
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
            AI
          </span>
          <span className="rounded-full bg-sky/10 px-2.5 py-0.5 text-xs font-medium text-sky">
            Frontend
          </span>
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight">
          Jabiko：JLPT 自習網站
        </h1>
        <p className="mb-8 text-text-muted">
          Jabiko 是我和朋友一起做的一個 JLPT（日本語能力試驗）自習網站，
          從動詞變化這種基礎，一路練到 N1 的文法與漢字讀音。
          打開網頁就能用，不用註冊，進度存在瀏覽器本機；想跨裝置的話，用 Google 登入就能同步。
        </p>
        <Image
          src="/images/jabiko-home.png"
          alt="Jabiko 首頁"
          width={3072}
          height={1488}
          className="h-auto w-full rounded-lg border border-border"
        />
      </FadeIn>

      <div className="prose-custom space-y-2 leading-relaxed text-text-muted [&_code]:rounded [&_code]:bg-surface [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_code]:text-primary [&_strong]:text-text">
        {/* ============ 為什麼做這個 ============ */}
        <FadeIn>
          <Heading id="why">為什麼做這個</Heading>
          <p>
            會做這個，是因為我自己要考 N1、一個朋友要考 N2，乾脆一起弄了一個來用。
          </p>
          <p>
            我學各種東西都習慣從刷題裡學，所以做的時候重心一直放在題庫——
            題目跟解說的品質我最先顧：提示做成可以開關的、解說會逐個選項拆給你看，
            目前自己是覺得做得還不錯。規則速查表也有了，系統性的分章教材會再慢慢補。
            題庫怎麼用 AI 大量出題又控制品質，我另外整理成
            <Link href="/blog/ai-exam-authoring-workflow" className="text-primary hover:underline">
              一篇技術文
            </Link>
            。
          </p>
        </FadeIn>

        {/* ============ 首頁總覽 ============ */}
        <FadeIn>
          <Image
            src="/images/jabiko-home-full.png"
            alt="Jabiko 首頁主畫面：練習入口、各模式與使用狀況"
            width={3072}
            height={3092}
            className="my-2 h-auto w-full rounded-lg border border-border"
          />
        </FadeIn>

        {/* ============ 今日練習 ============ */}
        <FadeIn>
          <Heading id="today">今日練習</Heading>
          <p>
            首頁最上面就是一個「開始今日練習」。點下去，它會先把之前答錯、該複習的題目清一輪，
            再混一些文法、語順、漢字讀音的新題進來，湊成一回合——
            「今天該練什麼」不用自己想，打開點一下就開始。
          </p>
          {/* 截圖：今日練習一鍵開始 / 一回合進行中的畫面 */}
          <Image
            src="/images/jabiko-today.png"
            alt="今日練習畫面"
            width={912}
            height={962}
            className="my-5 h-auto w-full rounded-lg border border-border"
          />
        </FadeIn>

        {/* ============ 弱點複習 ============ */}
        <FadeIn>
          <Heading id="srs">弱點複習</Heading>
          <p>
            錯題不用自己記。每次作答都會記錄，答錯的題自動進「弱點複習」，撈到期、最久沒碰的先還你。
            答對一次，就把它下次再出現的間隔往後拉（1、3、7、到 14 天，愈記得愈久才考一次）；
            要是又錯，就打回原點重來——真的記熟了才會慢慢淡出。
            每一輪是有限回合，練完給一張小戰報：清掉幾題、還剩幾題。
          </p>
          {/* 截圖：弱點複習清單 / 練習結束的戰報畫面 */}
          <Image
            src="/images/jabiko-srs.png"
            alt="弱點複習／戰報畫面"
            width={912}
            height={962}
            className="my-5 h-auto w-full rounded-lg border border-border"
          />
        </FadeIn>

        {/* ============ 練習模式 ============ */}
        <FadeIn>
          <Heading id="modes">練習模式</Heading>
          <p>
            練習模式照目的分了幾種。打底有「基礎變化」
            （練動詞、形容詞的變化，可以挑詞類、變化目標等條件，題庫大小即時重算）、
            「句中填空」、「句型練習」；備考有「綜合考題庫」，
            以及照範圍分好的「N1 備考（N1+N2）」「N2 備考（N2+N3）」「N4 備考（N4+N5）」；
            另外有「單字讀音」，專練 N1、N2 的漢字読み。題量還在加，到檢定前會一直更新。
          </p>
          {/* 截圖：練習模式選單 / 基礎變化的多維篩選畫面 */}
          <Image
            src="/images/jabiko-modes.png"
            alt="練習模式選單／基礎變化篩選畫面"
            width={1830}
            height={1140}
            className="my-5 h-auto w-full rounded-lg border border-border"
          />
        </FadeIn>

        {/* ============ 漢字音讀查詢 ============ */}
        <FadeIn>
          <Heading id="kanji-lookup">漢字音讀查詢</Heading>
          <p>
            漢字讀音最容易在濁音、長短音上栽跟頭。除了「單字讀音」的刷題，另外有一個查詢工具：
            照等級或關鍵字找漢字，點開卡片會列出它的音讀和真實例詞，旁邊的按鈕還能點來聽讀音。
            某個字到底長音還是短音、有沒有濁，查一下、聽一下就清楚了。
          </p>
          {/* 截圖：漢字音讀查詢卡片畫面 */}
          <Image
            src="/images/jabiko-kanji.png"
            alt="漢字音讀查詢卡片畫面"
            width={2244}
            height={1119}
            className="my-5 h-auto w-full rounded-lg border border-border"
          />
        </FadeIn>

        {/* ============ 作答輔助 ============ */}
        <FadeIn>
          <Heading id="answering">作答輔助</Heading>
          <p>
            作答前如果不確定，可以開「提示」——它給情境但不會漏答案；
            送出後會看到解說：正解、四個選項各自的差異、日文加繁中例句，還有 JLPT 等級。
            題目的日文句子旁邊有個發音鈕，想聽怎麼唸點一下就讀給你聽，順便練個耳朵。
            鍵盤 1–4 選答、Enter 下一題，深色淺色都有。
          </p>
          {/* 截圖：作答中開提示 / 作答後展開解說的畫面 */}
          <Image
            src="/images/jabiko-answer.png"
            alt="提示／解說畫面"
            width={912}
            height={1331}
            className="my-5 h-auto w-full rounded-lg border border-border"
          />
        </FadeIn>

        {/* ============ 小結 ============ */}
        <FadeIn>
          <Heading id="wrap">小結</Heading>
          <p>
            網站在{" "}
            <a
              href="https://jabiko.pages.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2 hover:text-primary/80"
            >
              jabiko.pages.dev
            </a>
            ，打開就能練。
            用了覺得哪裡怪、或想要什麼功能，都歡迎跟我說。
          </p>
          <p>
            Jabiko 就是個會自己幫你盯錯題的 JLPT 自習室，每天開來點一下就有得練。
          </p>
        </FadeIn>
      </div>
    </article>
  );
}
