import type { Metadata } from "next";
import Image from "next/image";
import ArticleHeader from "@/components/ArticleHeader";
import FadeIn from "@/components/FadeIn";
import PostJsonLd from "@/components/PostJsonLd";
import RelatedPosts from "@/components/RelatedPosts";
import { articleMetadata } from "@/lib/seo";

const href = "/blog/ai-vlog-notes";
export const metadata: Metadata = articleMetadata(href, {
  title: "用 AI 剪新加坡旅行 Vlog | 花雪 HanaYukii",
  description: "準備好素材，讓 Claude、Codex 整理 F1 精華與整週旅行 Vlog。從初版、字卡和聲音調整，記錄一次實際剪輯過程。",
  openGraph: { images: [{ url: "/images/ai-vlog/singapore-cover.jpg", width: 1080, height: 1920, alt: "新加坡 F1 一週影片封面" }] },
});

function Heading({ id, children }: { id: string; children: React.ReactNode }) {
  return <h2 id={id} className="mb-4 mt-12 scroll-mt-20 text-2xl font-bold text-warm">{children}</h2>;
}

export default function AiVlogNotes() {
  return <article className="mx-auto max-w-3xl px-6 py-16">
    <PostJsonLd href={href} />
    <FadeIn>
      <ArticleHeader href={href} />
      <p className="mb-6 leading-relaxed text-text-muted">去新加坡看 F1，手機裡多了一堆照片和影片。拍得很隨意，有賽車、演唱會，也有吃飯、走路和沿途風景。想剪成 Vlog，但沒有特別研究剪輯軟體，就試著把素材交給 AI 做。</p>
      <p className="leading-relaxed text-text-muted">其實沒做什麼特別操作。主要就是準備好素材，說大概想要什麼，看完初版再補幾句意見。選片、裁切、字卡和輸出，大部分都讓它處理。</p>
      <figure className="mx-auto my-8 max-w-xs">
        <Image src="/images/ai-vlog/singapore-cover.jpg" width={1080} height={1920} alt="用現場主直道夜景照片製作的新加坡 F1 一週封面" sizes="320px" className="h-auto w-full rounded-xl border border-border" />
        <figcaption className="mt-2 text-sm text-text-muted">整週旅行版的封面，用現場照片調色、加字。</figcaption>
      </figure>
    </FadeIn>
    <div className="space-y-4 leading-relaxed text-text-muted [&_p+p]:mt-4 [&_strong]:text-text">
      <FadeIn>
        <Heading id="two-edits">單場精華和整週旅行，分開做</Heading>
        <p>這次有兩邊的工作紀錄。Codex 先整理 F1 現場素材，做衝刺賽、排位賽等單場精華；Claude 後來把整週照片和影片放在一起，做旅行版。兩邊處理的範圍不同，不是拿同一道題比較誰剪得比較好。</p>
        <p>一開始也不用把整週的故事都想好。先挑一場做出來，比較容易知道喜不喜歡這個節奏，再決定整趟旅行怎麼串。</p>
      </FadeIn>
      <FadeIn>
        <Heading id="materials">先讓它拿得到素材</Heading>
        <p>素材原本在手機和「照片」App 裡。這次實際有碰到同步和讀取權限的問題，所以要先確認原檔真的在電腦上，能匯出、能播放，再讓 AI 盤點。看得到縮圖，不代表影片原檔已經下載好了。</p>
        <p>原始檔保留，匯出的副本拿來剪。接下來的素材清單、預覽圖和時間軸，都是 AI 整理的，不需要先手動替每個檔案寫好說明。</p>
        <p>如果要重做一次，起手要求大概可以整理成這樣，不是當時逐字貼上的提示詞：</p>
        <blockquote className="my-4 space-y-2 border-l-2 border-primary pl-4">
          <p>這個資料夾是旅行的照片和影片，先幫我看有哪些內容。先做一支單場精華，照片也可以穿插。</p>
          <p>保留現場聲音，字卡用簡單描述，不要宣傳口吻。原始檔不要改，先輸出一版讓我看。</p>
        </blockquote>
      </FadeIn>
      <FadeIn>
        <Heading id="versions">先有一版，再看要留什麼</Heading>
        <p>整週旅行版試了三種排法：照每天順序的完整版、同樣照日期但短一點的精華版，以及把賽車、城市和美食分開的主題版。</p>
        <p>主題版方便一口氣看完賽車，但比較看不出每天去了哪裡。最後沿著 DAY 1–7 的版本繼續改，再把想保留的片段拉長。最終約兩分二十二秒，混用了影片和照片。</p>
        <p>照片不只是補空白，也有早餐、飲料、店家和旅途中沒錄影的地方。AI 幫照片加了緩慢推近或平移，接回影片時就不會一直像在翻相簿。</p>
      </FadeIn>
      <FadeIn>
        <Heading id="feedback">補上畫面看不出來的事</Heading>
        <p>比較需要自己講的，是當時發生了什麼。像西瓜汁那張，補一句「會場很人氣的西瓜汁，10 SGD」；Pit Lane 的畫面，補上是運氣好抽到參觀資格。這些不是看一張照片就能知道的。</p>
        <p>修改也不用翻成剪輯術語。說哪段想留久一點、哪句字卡太像廣告、哪裡有自己的說話聲不想放進去，就能接著改。店名和價格則盡量對照招牌，不能確認的不要硬補。</p>
        <p>其中一段想保留走上賽道的畫面，但拿掉開頭自己的講話聲。最後的做法是畫面不變，改用同一支影片後面沒講話的人群聲。不是把整段靜音，也不是把所有現場人聲一起消掉。</p>
      </FadeIn>
      <FadeIn>
        <Heading id="implementation">背後是腳本，不是手動拉時間軸</Heading>
        <p>看留下來的檔案，兩邊都用 Python 整理剪輯計畫，再呼叫 FFmpeg 處理影音。每個片段記錄來源、從第幾秒開始、留多久、放什麼字卡，再依順序輸出。這些腳本也是 AI 寫的。</p>
        <p>因此改一句字卡或多留幾秒，不用自己重新剪一次。手機 HDR 影片轉成 SDR、直式畫面的裁切、音量與轉場，也是在這層處理。知道它有留下剪輯計畫就夠了，這次並沒有逐個調那些參數。</p>
        <p>不過輸出完還是要看。尤其是字有沒有壓到主體、照片停得夠不夠久、聲音接起來會不會突然變大，以及字卡是不是把沒拍到的事情寫得像拍到了。</p>
      </FadeIn>
      <FadeIn>
        <Heading id="next-time">下次大概還是這樣做</Heading>
        <p>不用先準備一份很完整的剪輯企劃。把素材放好，先說想剪單場還是整趟旅行，讓它出一版，再補上只有自己知道的細節。</p>
        <p>這次花在對話上的內容，多半也是「這段再長一點」「這句簡單一點」這種小修改。有了初版，才比較知道還想留下哪些東西。</p>
      </FadeIn>
    </div>
    <RelatedPosts href={href} />
  </article>;
}
