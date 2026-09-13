import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import Figure from "@/components/Figure";
import PostJsonLd from "@/components/PostJsonLd";
import RelatedPosts from "@/components/RelatedPosts";
import { articleMetadata } from "@/lib/seo";

const href = "/blog/astra-6-subtitle-workflow";
const title = "用 Astra 6 當單人字幕組";
const description = "受同好 UP 主鼓勵，用 Astra 6 幫自己喜歡的 live 上字幕。AI 自動處理大部分流程，人工標色、審稿與校對，還有一起做出來的歌割校對介面。";

export const metadata: Metadata = articleMetadata(href, {
  title: `${title} | 花雪 HanaYukii`,
  description,
  openGraph: {
    title,
    description,
    type: "article",
    images: [{ url: "/images/astra-subtitles/sweet-steady-live.jpg", width: 1920, height: 1080, alt: "SWEET STEADY 中日雙語成員色字幕成品" }],
  },
});

function Heading({ children, id }: { children: React.ReactNode; id: string }) {
  return <h2 id={id} className="mb-4 mt-12 scroll-mt-20 text-2xl font-bold text-warm">{children}</h2>;
}

export default function AstraSubtitleWorkflow() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <PostJsonLd href={href} />
      <FadeIn>
        <Link href="/blog" className="mb-8 inline-flex items-center gap-1 text-sm text-text-muted transition-colors hover:text-primary">&larr; Back to Blog</Link>
        <div className="mb-4 flex flex-wrap gap-2">
          {["AI", "Idol", "Translation"].map(tag => <span key={tag} className="tag text-xs font-medium text-primary">{tag}</span>)}
        </div>
        <h1 className="mb-3 text-3xl font-bold leading-tight sm:text-4xl">{title}</h1>
        <p className="mb-8 text-sm text-text-muted">2026-09-13</p>
      </FadeIn>

      <div className="prose-custom space-y-4 text-text-muted leading-relaxed [&_strong]:text-text">
        <FadeIn>
          <p>最近除了翻偶像歌詞，也受到同好 UP 主鼓勵，開始幫 live 和訪談上字幕。主要還是做自己喜歡的部分，從蝦中、TEAM SHACHI 到 SWEET STEADY，把想重看的片段做成中日雙語。</p>
          <p>前面用 Sol 5.6 也有在做，換到 Astra 6 後，我的體感是聰明很多、快很多，整個工作流也更順。現在有一些基礎知識，做單人字幕組真的很容易。不過想把品質拉上去，反覆審稿、調整和重做，也蠻燒 token 的。</p>
        </FadeIn>

        <FadeIn>
          <Heading id="workflow">大部分流程都可以交給 AI</Heading>
          <p>準備好影片後，轉錄、翻譯、對時間、字幕排版到輸出，大部分都可以自動化。歌曲有完整歌詞就直接拿來對時；訪談轉錄完，也能讓 AI 根據上下文先修一輪。之前文章整理過的翻譯和歌割，都可以繼續沿用。</p>
          <p>人工主要在標色、審稿和校對。我會補人名、團體背景、現場改詞，再看字幕有沒有太早出現、字太小或停留太短。繁體、簡體和純日文版則從同一份資料輸出。</p>
          <Figure caption="SWEET STEADY〈ファンファーレ〉的成品，中日字幕一起套用成員色。">
            <Image src="/images/astra-subtitles/sweet-steady-live.jpg" alt="SWEET STEADY 成員演唱時，畫面下方顯示紫色中日字幕" width={1920} height={1080} sizes="(max-width: 768px) 100vw, 720px" className="h-auto w-full" />
          </Figure>
        </FadeIn>

        <FadeIn>
          <Heading id="review-page">連歌割校對介面也一起做</Heading>
          <p>最讓我驚艷的是審核頁。它會直接做一個能操作的校對網頁。播放器旁邊列出每句日文、中文、時間和成員，點句子就能跳到對應片段，邊聽邊選人，也能複選合唱、修改文字或略過不確定的句子。</p>
          <p>AI 先填好初步判斷，我再修正，標完匯出就能接回字幕製作。像「這句是藍紫」「副歌是全員」，不必自己進字幕檔逐行改。這套介面和標記資料也有留下來，下一首還能接著用。</p>
          <p>隨著前面幾支作品累積下來，AI 也持續調整整套流程。有些優化我根本沒想到，它就先做出來了，不用每次重新交代一遍。這是這幾天用下來特別有感的地方。</p>
        </FadeIn>

        <FadeIn>
          <Heading id="quality">想做好，還是得仔細看</Heading>
          <p>多人搶話、笑著講或哭著講，轉錄還是比較容易錯，人名和暱稱也常需要修。可以讓 AI 做兩次轉錄、對照上下文初修，之後人工再仔細聽、逐句校對，品質還能往上拉。</p>
          <p>我的日文也沒有好到每句都能確認。聽得清楚、只是不知道誰說的，就先用白色；內容真的不確定，就不硬補。自己熟悉的成員和演出背景，在這裡很有幫助。</p>
          <Figure caption="TEAM SHACHI〈晴れ晴れ〉，保留完整演出畫面，在下方放雙語字幕。">
            <Image src="/images/astra-subtitles/harebare-live.jpg" alt="TEAM SHACHI 四位成員搭肩演唱晴れ晴れ，舞台下方顯示雙語字幕" width={1920} height={1080} sizes="(max-width: 768px) 100vw, 720px" className="h-auto w-full" />
          </Figure>
          <p>字體、版面和封面也會來回試幾版。需求可以直接講，「中文再大一點」「這句晚四秒」，讓它改完再看。現在就先把自己喜歡的幾首 live 慢慢做完。</p>
          <p className="text-sm">截圖取自本次製作的字幕成品；演出畫面來自 <a className="prose-link" href="https://www.youtube.com/watch?v=TMiP2m4xPh4">SWEET STEADY TIF2026 HOT STAGE</a>與 <a className="prose-link" href="https://www.youtube.com/watch?v=jBgRsToJGBM">TEAM SHACHI 最終SHOW</a>。</p>
        </FadeIn>
      </div>
      <RelatedPosts href={href} />
    </article>
  );
}
