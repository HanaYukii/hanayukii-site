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
          從動詞變化這種基礎，一路練到 N1 的文法與漢字讀音。打開{" "}
          <a
            href="https://jabiko.pages.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-2 hover:text-primary/80"
          >
            jabiko.pages.dev
          </a>{" "}
          就能用，不用註冊，進度存在瀏覽器本機；想跨裝置的話，用 Google 登入就能同步。
          介面深色淺色都有，挑順眼的用。
        </p>
        <Image
          src="/images/jabiko-home.png"
          alt="Jabiko 首頁"
          width={3072}
          height={1488}
          className="h-auto w-full rounded-lg border border-border"
        />
      </FadeIn>

      <FadeIn delay={0.1}>
        <nav className="my-10 rounded-xl border border-border bg-surface/40 p-5">
          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-text-muted">
            功能一覽
          </p>
          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
            {[
              { id: "home", title: "首頁總覽" },
              { id: "today", title: "今日練習" },
              { id: "srs", title: "弱點複習" },
              { id: "learn", title: "分章學習" },
              { id: "answering", title: "答題輔助" },
              { id: "modes", title: "練習模式" },
              { id: "rules", title: "規則速查表" },
              { id: "kanji-lookup", title: "漢字音讀查詢" },
            ].map((item, i) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-text transition-colors hover:bg-surface-hover hover:text-primary"
              >
                <span className="text-text-muted">{i + 1}.</span>
                {item.title}
              </a>
            ))}
          </div>
        </nav>
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
            題目跟解說的品質我最先顧：提示做成可以開關的、解說會逐個選項拆給你看。
            規則速查表也有了，系統性的分章教材會再慢慢補。
            題庫怎麼用 AI 大量出題又控制品質，我另外整理成
            <Link href="/blog/ai-exam-authoring-workflow" className="text-primary hover:underline">
              一篇技術文
            </Link>
            。
          </p>
        </FadeIn>

        {/* ============ 首頁總覽 ============ */}
        <FadeIn>
          <Heading id="home">首頁總覽</Heading>
          <Image
            src="/images/jabiko-home-full.png"
            alt="Jabiko 首頁主畫面：練習入口、各模式與使用狀況"
            width={3072}
            height={3092}
            className="my-2 h-auto w-full rounded-lg border border-border"
          />
          <p className="mt-4">
            第一次打開可以先選程度——初級（N4・N5）、中級（N2・N3）、高級（N1・N2），
            今日練習和各題庫就照這個難度給題，之後隨時能改。
          </p>
          <Image
            src="/images/jabiko-level.png"
            alt="首頁的「選擇你的程度」：初級／中級／高級"
            width={1400}
            height={164}
            className="my-4 h-auto w-full rounded-lg border border-border"
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
            錯題不用自己記。答錯的自動進「弱點複習」，到期、最久沒碰的先還你；答對一次就把下次間隔
            往後拉（1、3、7、到 14 天），又錯就打回原點——真的記熟了才慢慢淡出。練完給一張小戰報。
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

        {/* ============ 分章學習 ============ */}
        <FadeIn>
          <Heading id="learn">分章學習</Heading>
          <p>
            不想自己亂抓題目的話，「學習」這頁把內容拆成一章一章：左邊挑一章，
            右邊就列那章的規則、例子跟最容易踩的陷阱，看完直接點按鈕進對應的練習。
            目前先把動詞、形容詞變化這些打底的做成章節，備考範圍的之後再補。
          </p>
          <Image
            src="/images/jabiko-learn-dark.png"
            alt="分章學習：左邊章節索引，右邊單章的規則、例子與陷阱"
            width={2048}
            height={2955}
            className="my-5 h-auto w-full rounded-lg border border-border"
          />
        </FadeIn>

        {/* ============ 答題輔助 ============ */}
        <FadeIn>
          <Heading id="answering">答題輔助</Heading>
          <p>
            答題時有幾個可以自己開關的輔助。漢字太多讀不動，就開「顯示註音」，漢字上方會標假名——
            預設關（跟真實考試一樣），讀音題則永遠不標，不然等於送答案。
          </p>
          <Image
            src="/images/jabiko-furigana-off.png"
            alt="關閉註音：題目維持純漢字"
            width={1214}
            height={1108}
            className="my-3 h-auto w-full rounded-lg border border-border"
          />
          <Image
            src="/images/jabiko-furigana-on.png"
            alt="開啟註音：漢字上方標假名"
            width={1214}
            height={1122}
            className="my-3 h-auto w-full rounded-lg border border-border"
          />
          <p>
            作答前不確定，按「提示」給你情境、但不會漏答案。漢字和例句旁邊都有發音鈕（🔊）點了唸給你聽；
            鍵盤 1–4 選答、Enter 下一題。
          </p>
          <Image
            src="/images/jabiko-hint.png"
            alt="打開提示：給情境但不漏答案"
            width={1214}
            height={1216}
            className="my-5 h-auto w-full rounded-lg border border-border"
          />
          <p>
            答完每題都有完整解析——正解、四個選項各自差在哪、日文加繁中例句，還標了 JLPT 等級；
            文法題再點一下能展開完整的文法說明。錯的題直接從解析學起來，不用另外查。
          </p>
          <Image
            src="/images/jabiko-answer-fb-dark.png"
            alt="答完展開的完整解析：正解、逐選項說明、例句與等級"
            width={1214}
            height={1570}
            className="my-5 h-auto w-full rounded-lg border border-border"
          />
        </FadeIn>

        {/* ============ 練習模式 ============ */}
        <FadeIn>
          <Heading id="modes">練習模式</Heading>
          <p>
            模式照目的分了幾種：打底的「基礎變化」（可挑詞類、變化目標，題庫大小即時重算）、
            「句中填空」、「句型練習」；備考的「綜合考題庫」和照範圍分的「N1／N2／N4 備考」；
            還有專練漢字読み的「單字讀音」。
          </p>
          <Image
            src="/images/jabiko-modes.png"
            alt="練習模式選單／基礎變化篩選畫面"
            width={1830}
            height={1140}
            className="my-5 h-auto w-full rounded-lg border border-border"
          />
          <p className="mt-4">每組要練幾題自己決定——10、20、30、50，或「全部」。</p>
          <Image
            src="/images/jabiko-session.png"
            alt="每組題數：10／20／30／50／全部"
            width={484}
            height={352}
            className="my-4 h-auto w-[280px] max-w-full rounded-lg border border-border"
          />
        </FadeIn>

        {/* ============ 規則速查表 ============ */}
        <FadeIn>
          <Heading id="rules">規則速查表</Heading>
          <p>
            只想查規則、不想進練習的話，「規則」這頁把動詞變化、ます／て形、各種接續都整理成表，
            一頁掃過去就好。
          </p>
          <Image
            src="/images/jabiko-rules.png"
            alt="規則速查表：動詞變化等整理成表"
            width={2048}
            height={1573}
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
            ，打開就能練，完全免費。想常用的話，瀏覽器選「加入主畫面」就能裝到手機，離線也能練。
          </p>
          <p>
            題庫和功能到考試前都會持續加、持續修。用了覺得哪裡怪、或想要什麼功能，都歡迎跟我說。
          </p>
        </FadeIn>
      </div>
    </article>
  );
}
