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
const description = "最近用 Codex 裡的 Astra 6 做偶像影片字幕：轉錄、翻譯、對時、成員色，再到封面與上傳。記一下實際怎麼分工，以及最容易卡住的地方。";

export const metadata: Metadata = articleMetadata(href, {
  title: `${title} | 花雪 HanaYukii`,
  description,
  openGraph: {
    title,
    description,
    type: "article",
    images: [{ url: "/images/astra-subtitles/famien-subtitles.jpg", width: 1920, height: 1080, alt: "FAMIEN 中日雙語成員色字幕成品" }],
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
          <p>最近除了翻偶像歌詞，也開始幫 live 和訪談上字幕。從蝦中、TEAM SHACHI 到 SWEET STEADY，越做越像在經營單人字幕組。主要是在 Codex 裡用 Astra 6，把轉錄、翻譯、對時、字幕排版到輸出的工作接起來，我再邊看邊改。</p>
          <p>最方便的是可以直接講需求。「這句太早出現，往後四秒」「中文再大一點」「這段是紅色」，它就去改檔案、重生預覽。連校對用的小網頁都可以順手做出來。</p>
        </FadeIn>

        <FadeIn>
          <Heading id="workflow">現在大概怎麼做</Heading>
          <p>先把影片準備好。歌曲有完整歌詞就拿來對時間，之前文章整理過的翻譯和歌割也能沿用；訪談則先用 Whisper 跑轉錄，再讓 Astra 6 按上下文修句子、翻成中文。它負責串工具和整理結果，最後用 FFmpeg 把字幕燒進影片。</p>
          <p>接著做一個校對頁，播放器旁邊列日文、中文、時間和人名。我可以邊看畫面邊選成員，標完匯出，再接回字幕檔。剛開始還要一直往下捲才能選，後來就叫它把目前句子的控制項拉到播放器下面。</p>
          <p>成員色是我很想保留的部分：誰唱就上誰的顏色，合唱用全員的處理，句子中間換人也能分段。有官方歌割就直接用，不用每支都從頭認一次。繁體、簡體和純日文版也能從同一份資料輸出。</p>
          <Figure caption="FAMIEN 成品：同一句裡也能依歌割換色，中文一起對應。">
            <Image src="/images/astra-subtitles/famien-subtitles.jpg" alt="えびチリ現場的日文與簡體中文字幕，句內以不同成員色呈現" width={1920} height={1080} sizes="(max-width: 768px) 100vw, 720px" className="h-auto w-full" />
          </Figure>
        </FadeIn>

        <FadeIn>
          <Heading id="review">最麻煩的還是多人講話</Heading>
          <p>輪流發言比較好做，一群人搶話、笑著講、哭著講就很容易出錯。人名、暱稱也常被轉成奇怪的字。可以重跑一次轉錄、拿兩版對照，再看原片字幕和前後文，但兩版一樣也不代表一定對。</p>
          <p>我的日文也沒有好到每句都能校正，所以不會硬留所有內容。聽得清楚、只是不知道誰說的，就先用白色；不確定在講什麼的句子就略過。成員和團體背景我比較熟的部分，再補給它。</p>
          <Figure caption="Respect Stage 的 MC，左上角補團名與發言者，下面保留中日雙語。">
            <Image src="/images/astra-subtitles/respect-mc.jpg" alt="ukka 葵るり發言的字幕成品，左上角標示團體及人名" width={1920} height={1080} sizes="(max-width: 768px) 100vw, 720px" className="h-auto w-full" />
          </Figure>
        </FadeIn>

        <FadeIn>
          <Heading id="presentation">字再大一點，裝飾少一點</Heading>
          <p>後面花不少時間在字體、大小和顯示時間。電腦上看還行的字，放到手機就太小；一閃而過的人名和補充文字，也常要再拉長。這些通常看一版就知道要怎麼改。</p>
          <p>封面也試過很多種。這次 FAMIEN 一開始做得太超現實，後來又試把多人近景拼到遠景上，還是很怪。最後就選原片有舞台、人潮和噴火的遠景，加小一點的歌名。成員雖然小，但比較有那場 live 的感覺。</p>
          <p>目前最滿意的是，之前整理過的歌詞、歌割和排版可以一路接著用。下一支通常只要換素材、對時間，再修現場改詞和 MC。多人綜藝先少做一點，還是先把想看的幾首 live 做完。</p>
          <p className="text-sm">截圖取自本次製作的字幕成品；演出畫面來自 <a className="prose-link" href="https://www.youtube.com/watch?v=Xagr2OZXuwc">FAMIEN 2026 特別編集版</a>與 <a className="prose-link" href="https://www.youtube.com/watch?v=pleH9S-7AKQ">TEAM SHACHI Respect Stage</a>。</p>
        </FadeIn>
      </div>
      <RelatedPosts href={href} />
    </article>
  );
}
