import type { Metadata } from "next";
import Image from "next/image";
import ArticleHeader from "@/components/ArticleHeader";
import FadeIn from "@/components/FadeIn";
import PostJsonLd from "@/components/PostJsonLd";
import RelatedPosts from "@/components/RelatedPosts";
import { articleMetadata } from "@/lib/seo";

const href = "/blog/sorachi-guide";
export const metadata: Metadata = articleMetadata(href, {
  title: "SoraChi：日文入門與使用說明 | 花雪 HanaYukii",
  description: "SoraChi 的五十音、基礎句型、旅遊常用語與練習怎麼用，以及如何保存學習進度。給零基礎、想學一點旅遊日文的人。",
  openGraph: { images: [{ url: "/images/sorachi/home-current.jpg", width: 1280, height: 1428, alt: "SoraChi 首頁與四個學習入口" }] },
});

function Heading({ id, children }: { id: string; children: React.ReactNode }) {
  return <h2 id={id} className="mb-4 mt-12 scroll-mt-20 text-2xl font-bold text-warm">{children}</h2>;
}

function Screenshot({ name, format = "png", height, alt, children }: { name: string; format?: "png" | "jpg"; height: number; alt: string; children: React.ReactNode }) {
  return <figure className="my-6">
    <a href={`/images/sorachi/${name}.${format}`} target="_blank" rel="noreferrer" aria-label={`${alt}，開啟原圖`}>
      <Image src={`/images/sorachi/${name}.${format}`} width={1280} height={height} alt={alt} sizes="(max-width: 768px) calc(100vw - 48px), 720px" className="h-auto w-full rounded-xl border border-border" />
    </a>
    <figcaption className="mt-2 text-sm leading-relaxed">{children}（點圖可放大）</figcaption>
  </figure>;
}

export default function SorachiGuide() {
  return <article className="mx-auto max-w-3xl px-6 py-16">
    <PostJsonLd href={href} />
    <FadeIn>
      <ArticleHeader href={href} />
      <p className="mb-6 leading-relaxed text-text-muted">之前做了 Jabiko，但零基礎的朋友試了之後，覺得還是用不了。想到應該不少人也有類似的需求：想從頭學一點日文，或是去日本玩時看得懂、說得出幾個常用詞，不一定是為了考試。所以另外做了 SoraChi，從五十音和基礎句型開始，也能直接查旅遊常用語。</p>
      <a href="https://sorachi.app/" className="text-primary underline underline-offset-4">開啟 SoraChi →</a>
      <Screenshot name="home-current" format="jpg" height={1428} alt="SoraChi 首頁：四隻雲朵吉祥物分別搭配五十音、基礎句型、旅遊常用語與基礎刷題">首頁把幾種用途分開，不用照固定順序走。</Screenshot>
    </FadeIn>
    <div className="space-y-4 leading-relaxed text-text-muted [&_strong]:text-text [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4">
      <FadeIn>
        <Heading id="start">第一次用，從哪裡開始？</Heading>
        <ul className="list-disc space-y-2 pl-6">
          <li><strong>還不認識日文字：</strong>進「五十音」，選平假名，從「あ行」開始。一組一組學，不用先背完整張表。</li>
          <li><strong>想知道句子怎麼組：</strong>進「基礎句型」，從第一課往下看。例句附讀音和中文，還沒背熟五十音也可以先試試。</li>
          <li><strong>快要去日本玩：</strong>直接進「旅遊常用語」，找點餐、付款、交通等情境，不必先上完課。</li>
        </ul>
      </FadeIn>
      <FadeIn>
        <Heading id="kana">五十音：看字、聽讀音，再練習</Heading>
        <p>點進一組字，先看字卡和記憶提示，按喇叭聽讀音，再換下一張。基本字之後還有濁音、拗音，以及促音和長音的小課。</p>
        <Screenshot name="kana" height={1282} alt="拗音しゃ字卡，附 sha 讀音、記憶提示與しゃしん例字">例如「しゃ」不是把「し」「や」分開念；提示會說明小字的作用，再用單字聽一次。</Screenshot>
        <p>看完可以做選擇題。之後回到五十音表，用「複習學過的字」做一小輪複習，答錯的字會優先出現。首頁的「五十音隨機練習」則是另一個入口：每輪五題，從基本內容練起，不記成績。</p>
      </FadeIn>
      <FadeIn>
        <Heading id="grammar">基礎句型：先看例句，再選要不要做題</Heading>
        <p>第一次建議照順序看，從介紹自己、問問題，慢慢到時間、地點和動作。每課把例句與學習重點分開，有需要再展開補充說明，不用一次讀完所有細節。</p>
        <Screenshot name="grammar-current" format="jpg" height={1255} alt="疑問句教學：学生ですか，完整例句附漢字標音，再拆解詞語並說明か的用法">先看「学生ですか。」的完整例句與讀音，再看單字和句尾「か」的作用。</Screenshot>
        <p>看完說明可以直接完成，也可以做練習確認懂了沒；答錯時能回看說明。之後可接著上次的課繼續，學過幾課後再用小複習，把不同課的題目混著練。</p>
      </FadeIn>
      <FadeIn>
        <Heading id="travel">旅遊常用語：先找情境，記關鍵字</Heading>
        <p>選情境，或用搜尋找需要的內容。每張卡先放關鍵字、讀音與意思，需要完整句子時再展開，不必一開始就背長句。</p>
        <p>例如已經選好飲料，店員在確認冷熱時，回答「ホット」（熱的）或「アイス」（冰的）就能表達需求。先看清楚卡片寫的使用情境，再搭配語音練習。</p>
        <p>常用的卡片可以收藏到「我的常用語」，出發前先整理好。這裡是查閱工具，閱讀和收藏都不計分。</p>
      </FadeIn>
      <FadeIn>
        <Heading id="practice">想多練一點，再用基礎刷題</Heading>
        <p>首頁另有「基礎刷題」，可以拿來練本站提到的日文基礎。想準備檢定也能用，但目前不是完整的 N5／N4 教材；只是想學旅遊日文的話，不用把題目全做完。</p>
      </FadeIn>
      <FadeIn>
        <Heading id="progress">進度、語音與備份</Heading>
        <p><strong>不用登入也能使用，進度會先保存在目前的瀏覽器。</strong>換手機、換瀏覽器或清除網站資料前，先到頁尾「學習紀錄」按「下載備份」，再到另一個裝置選「從備份檔還原」。進度、收藏與設定都會一起備份。</p>
        <p className="mt-4">也可以用 Google 登入，使用手動雲端備份。登入後，訪客紀錄和帳號紀錄分開保存；想沿用原本的進度，到「我的帳號」選「帶入這台裝置的訪客進度」。接著查看雲端備份，有舊備份就先帶入，再按「儲存目前進度到雲端」。換裝置後也在帳號頁帶入，<strong>目前不會自動同步</strong>。</p>
        <p className="mt-4">語音使用裝置內建的合成語音，不是真人錄音，所以不同手機或電腦聽起來可能不同。播放速度可以調整，設定也會記住。</p>
        <p className="mt-4">如果之前用過 GitHub Pages 舊網址，要先用原本的瀏覽器到舊站下載備份，再到 sorachi.app 還原；換網址不會自動帶過來。</p>
      </FadeIn>
      <FadeIn>
        <Heading id="feedback">有看不懂的地方，歡迎回報</Heading>
        <p>各區頁首和頁尾都有「問題與建議」。填寫內容、完成驗證後就能直接送出，不用登入；回報只供網站管理者處理，不會公開。希望收到回覆時再填聯絡方式，也請避免填入密碼或其他敏感資料。</p>
        <p className="mt-4">還在慢慢補內容。如果哪個說明對零基礎來說跳太快，或旅行時想查的詞找不到，都可以提出來。</p>
        <p className="mt-4">想看網站怎麼做，也另外寫了 <a href="/blog/sorachi-dev-notes">SoraChi 製作筆記</a>。</p>
        <p className="mt-4"><a href="https://sorachi.app/">到 SoraChi 試試看 →</a></p>
      </FadeIn>
    </div>
    <RelatedPosts href={href} />
  </article>;
}
