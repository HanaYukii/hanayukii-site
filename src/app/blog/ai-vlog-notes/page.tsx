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
      <p className="mb-6 leading-relaxed text-text-muted">這次去新加坡看 F1，就是想刻意隨便錄各種素材，看看交給 AI 之後能剪出怎樣的作品。賽車、演唱會、吃飯、走路和沿途風景都拍一些，沒有先安排腳本。素材很普通，有些甚至拍得不太好，但最後剪出來的成品比預期好不少。</p>
      <p className="leading-relaxed text-text-muted">其實沒做什麼特別操作。主要就是準備好素材，說大概想要什麼，看完初版再補幾句意見。選片、裁切、字卡和輸出，大部分都讓它處理。</p>
      <figure className="mx-auto my-8 max-w-xs">
        <Image src="/images/ai-vlog/singapore-cover.jpg" width={1080} height={1920} alt="用現場主直道夜景照片製作的新加坡 F1 一週封面" sizes="320px" className="h-auto w-full rounded-xl border border-border" />
        <figcaption className="mt-2 text-sm text-text-muted">整週旅行版的封面，用現場照片調色、加字。</figcaption>
      </figure>
    </FadeIn>
    <div className="space-y-4 leading-relaxed text-text-muted [&_p+p]:mt-4 [&_strong]:text-text">
      <FadeIn>
        <Heading id="two-edits">單場精華和整週旅行，分開做</Heading>
        <p>Codex 先整理 F1 現場素材，做衝刺賽、排位賽等單場精華；Claude 後來把整週照片和影片放在一起，做旅行版。兩邊處理的範圍不同，不是拿同一道題比較誰剪得比較好。</p>
      </FadeIn>
      <FadeIn>
        <Heading id="materials">先讓它拿得到素材</Heading>
        <p>素材原本在手機和「照片」App 裡，這次有碰到同步和讀取權限的問題。先確認原檔下載好了、能播放，再匯出副本拿來剪。素材清單、預覽圖和時間軸都讓 AI 整理。</p>
        <p>起手要求可以整理成這樣，不是原對話逐字引用：</p>
        <blockquote className="my-4 space-y-2 border-l-2 border-primary pl-4">
          <p>這個資料夾是旅行的照片和影片，先幫我看有哪些內容。先做一支單場精華，照片也可以穿插。</p>
          <p>保留現場聲音，字卡用簡單描述，不要宣傳口吻。原始檔不要改，先輸出一版讓我看。</p>
        </blockquote>
      </FadeIn>
      <FadeIn>
        <Heading id="versions">先有一版，再看要留什麼</Heading>
        <p>整週旅行版試了照日期的完整版、短一點的精華版，以及把賽車、城市和美食分開的主題版。最後選 DAY 1–7 的順序，想保留的片段再拉長，成品約兩分二十二秒。</p>
        <p>沒錄影的早餐、飲料和店家，就穿插照片。AI 加了緩慢推近或平移，接回影片時不會一直像在翻相簿。</p>
      </FadeIn>
      <FadeIn>
        <Heading id="feedback">補上畫面看不出來的事</Heading>
        <p>比較需要自己講的，是當時發生了什麼。像西瓜汁那張，補一句「會場很人氣的西瓜汁，10 SGD」；Pit Lane 的畫面，補上是運氣好抽到參觀資格。這些不是看一張照片就能知道的。</p>
        <p>修改也不用翻成剪輯術語。說哪段想留久一點、哪句字卡太像廣告、哪裡有自己的說話聲不想放進去，就能接著改。店名和價格則盡量對照招牌，不能確認的不要硬補。</p>
        <p>有一段想保留走上賽道的畫面，但拿掉自己的講話聲。最後畫面不變，改用同一支影片後面沒講話的人群聲，不用整段靜音。</p>
      </FadeIn>
      <FadeIn>
        <Heading id="implementation">背後是腳本，不是手動拉時間軸</Heading>
        <p>兩邊都用 Python 記錄選段、長度和字卡，再呼叫 FFmpeg 處理影音。腳本也是 AI 寫的，裁切、音量和轉場不用自己逐個調參數。</p>
        <p>輸出完還是要看：字有沒有擋到主體、節奏會不會太快、聲音是否忽大忽小、字卡有沒有寫錯。大部分修改就是「這段再長一點」「這句簡單一點」，有了初版才比較好說。</p>
      </FadeIn>
    </div>
    <RelatedPosts href={href} />
  </article>;
}
