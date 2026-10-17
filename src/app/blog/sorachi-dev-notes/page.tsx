import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ArticleHeader from "@/components/ArticleHeader";
import Code from "@/components/CodeBlock";
import FadeIn from "@/components/FadeIn";
import PostJsonLd from "@/components/PostJsonLd";
import RelatedPosts from "@/components/RelatedPosts";
import { articleMetadata } from "@/lib/seo";

const href = "/blog/sorachi-dev-notes";
export const metadata: Metadata = articleMetadata(href, {
  title: "SoraChi 製作筆記 | 花雪 HanaYukii",
  description: "有了 Jabiko 的經驗，再做 SoraChi 順了很多。記錄零基礎教材、雲朵角色與介面、本機進度、Google 登入和私人回報的幾個設計決定。",
  openGraph: { images: [{ url: "/images/sorachi/home-compact-20261018.jpg", width: 1280, height: 684, alt: "SoraChi 首頁與雲朵角色" }] },
});

function Heading({ id, children }: { id: string; children: React.ReactNode }) {
  return <h2 id={id} className="mb-4 mt-12 scroll-mt-20 text-2xl font-bold text-warm">{children}</h2>;
}

export default function SorachiDevNotes() {
  return <article className="mx-auto max-w-3xl px-6 py-16">
    <PostJsonLd href={href} />
    <FadeIn>
      <ArticleHeader href={href} />
      <p className="mb-6 leading-relaxed text-text-muted">做過 Jabiko 之後，再做 SoraChi 順了很多。題目怎麼整理、進度怎麼存、回報怎麼收，都已經碰過一輪。這次反而花比較多時間改教材和畫面，尤其是那些學過日文才看得懂的說明。</p>
      <p className="leading-relaxed text-text-muted">Jabiko 原本是為了自己準備日檢做的，但零基礎的朋友試了之後，還是用不了，所以另外做了從五十音開始的 SoraChi。也想到很多人只是去日本玩時想懂一點日文，就把點餐、付款、搭車會用到的詞另外整理，隨時都能查。</p>
    </FadeIn>
    <div className="space-y-4 leading-relaxed text-text-muted [&_p+p]:mt-4 [&_strong]:text-text [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4">
      <FadeIn>
        <Heading id="interface">首頁和雲朵角色</Heading>
        <p>首頁最後保留四張大圖：五十音、基礎句型、旅遊常用語和基礎刷題。每區用同一個雲朵角色搭配不同道具，再用淡紫、水色和杏橘區分。角色由 AI 生成，確定主角之後再以它為參考做變化；輸出成不同尺寸的 WebP，讓首頁和小圖示各取合適的圖片。</p>
        <figure className="my-6">
          <Image src="/images/sorachi/home-compact-20261018.jpg" width={1280} height={684} alt="SoraChi 首頁，四個入口各有一張雲朵角色插圖與操作按鈕" sizes="(max-width: 768px) calc(100vw - 48px), 720px" className="h-auto w-full rounded-xl border border-border" />
          <figcaption className="mt-2 text-sm">桌面把角色和文字並排，四個入口能一起看見。</figcaption>
        </figure>
        <p>這裡改過幾次。一開始「開始學五十音」會直接進五題模式，按返回卻到五十音表，入口名稱和實際動作對不上。後來把看教材、隨機進一課、練題目分開，按鈕直接寫會發生什麼事。旅遊區則維持隨時能查，不要求完成課程，也不計分。</p>
      </FadeIn>
      <FadeIn>
        <Heading id="content">先給完整例句，再拆開看</Heading>
        <p>有次把「我」「學生」拆成單字卡，外框卻寫「例句與意思」，看起來就像漏了句子裡的「は」「です」。後來改成先放完整句子，再拆開看單字和用法。單字、句型、動詞變化也分別標清楚，才不會混在一起。</p>
        <p>教材放在 <code>content.js</code>，顯示方式另外用 <code>lessonPresentation</code> 記錄。漢字與假名標音逐句整理，用網頁原生的 <code>ruby</code> 顯示；羅馬字和中文仍保留。畫面呈現漢字，朗讀沿用核對過的讀音，避免為了調整排版，同時改到題目或學習紀錄的版本。</p>
        <figure className="my-6">
          <Image src="/images/sorachi/grammar-20261018.jpg" width={1280} height={1240} alt="SoraChi 疑問句課：例句、詞語拆解和學習重點分區呈現" sizes="(max-width: 768px) calc(100vw - 48px), 720px" className="h-auto w-full rounded-xl border border-border" />
          <figcaption className="mt-2 text-sm">例句放一邊，說明放另一邊。</figcaption>
        </figure>
        <p>每課會列出前面要先學哪些課，以及這課新教的詞。檢查程式會找出題目用了哪些還沒教的詞，加題時比較不容易漏掉。不過日文自然不自然、說明是不是跳太快，還是得逐題看。五十音的例字也補了中文和讀音，不然看得懂字，也不一定知道那個詞是什麼。</p>
      </FadeIn>
      <FadeIn>
        <Heading id="reuse">沿用 Jabiko 的經驗</Heading>
        <p>Jabiko 使用 React、TypeScript 和 Vite；SoraChi 目前保留純 HTML、CSS 和 JavaScript，直接由 GitHub Pages 提供。沒有把整個 Jabiko 搬過來，主要參考它把題池與畫面狀態分開、固定當次題序，以及檢查資料再匯入的做法。</p>
        <p>例如基礎刷題的題池和狀態轉移放在 <code>drill.js</code>，畫面只負責顯示和接收操作。重新整理後應該還是同一題、同一組選項；題庫新增題目時，也不該打亂正在做的一輪。每題有固定 ID 和內容版本，題目真的改了，才處理受影響的進行中練習。</p>
        <p>目前刷題共有 230 題，一部分改寫自 Jabiko 的基礎自撰題，其他另外補。挑題時會對照 SoraChi 已經教過什麼，N5、N4 題庫裡超出範圍的就先不放。</p>
      </FadeIn>
      <FadeIn>
        <Heading id="storage">進度、登入和回報</Heading>
        <p>最早只用瀏覽器保存進度，後來加了備份檔、損壞資料救援和不同分頁同時操作的保護。搬到 <a href="https://sorachi.app/">sorachi.app</a> 時，舊網址的資料不會跟過來，所以保留舊站，讓使用者先下載備份，再到新站還原。</p>
        <p>有了正式網域才接上 Google 登入。後端選擇 Jabiko 已用過的 Supabase，但用 SoraChi 自己的專案與憑證。訪客和各帳號的本機資料分開放：</p>
        <Code lang="text">{`訪客          sorachi:data:v2
帳號          sorachi:acct:<user id>:v1`}</Code>
        <p>登入後不會直接把訪客紀錄算進帳號，也不會馬上上傳。目前要手動儲存或帶入雲端備份；如果另一台裝置已經存了新版，伺服器會擋下舊版本，不讓它直接蓋過去。資料庫也限制每個帳號只能讀自己的備份。</p>
        <p>回報同樣參考 Jabiko 的私人意見箱概念，各區都留入口，不用另外找 GitHub。SoraChi 的回報先經過 Cloudflare Turnstile 驗證，再由後端存入私人資料表；使用者無法透過網站讀取其他人的回報。附帶資訊只放所在頁面與教材版本，不送出作答內容或整份學習紀錄。</p>
      </FadeIn>
      <FadeIn>
        <Heading id="verification">測試時遇到的問題</Heading>
        <p>之前在 Jabiko 整理過 <Link href="/blog/ai-exam-authoring-workflow">AI 出題與互相審查的流程</Link>，這次也把問題拆成 issue，交給 Claude 和 Codex 實作、review。收到建議後，先看程式、試著重現，再決定怎麼改；能自動檢查的就補成測試。</p>
        <p>備份合併就是一個例子：清除練習後，匯入舊備份不應讓未完成的練習復活。這類問題不能只看「匯入成功」，要測兩個方向的合併，再重新載入確認。題目版本改動、儲存失敗和跨分頁衝突也各自留下回歸測試。</p>
        <p>發佈前跑教材檢查和 Node 測試，推送後等同一份提交的持續整合（CI）檢查通過，再部署。部署程式還會比對線上檔案，確認實際送出去的是這一版。登入和回報則另外在正式網域走完整流程：Google 授權、回到帳號頁、儲存並讀回備份，以及送出一筆標示為測試的回報。</p>
        <p>做過 Jabiko 之後，很多地方不用再摸一次，才有時間慢慢調例句、按鈕和讀音這些小地方。教材就接著慢慢補。</p>
        <p className="mt-6">各個入口的操作方式整理在 <Link href="/blog/sorachi-guide">SoraChi：日文入門與使用說明</Link>，也可以直接 <a href="https://sorachi.app/">打開網站</a> 試試。</p>
      </FadeIn>
    </div>
    <RelatedPosts href={href} />
  </article>;
}
