import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import PostJsonLd from "@/components/PostJsonLd";
import RelatedPosts from "@/components/RelatedPosts";
import { articleMetadata } from "@/lib/seo";

const href = "/blog/idol-lyrics-translation-series";

export const metadata: Metadata = articleMetadata(href, {
  title: "最近在整理偶像歌詞：從 SWEET STEADY 到蝦中 | 花雪 HanaYukii",
  description:
    "從 SWEET STEADY 首次 Arena 公演前的一日一曲，到私立恵比寿中学的原點回歸夏日歌：最近這批中文歌詞翻譯怎麼開始，以及歌割、成員色與日文諧音為什麼比逐句翻譯更花時間。",
  openGraph: {
    title: "最近在整理偶像歌詞：從 SWEET STEADY 到蝦中",
    description:
      "Arena 倒數的一日一曲，最後一路整理成中文翻譯、歌割、成員色與日文小梗都放進去的系列。",
    type: "article",
  },
});

function Heading({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <h2 id={id} className="mb-4 mt-12 scroll-mt-20 text-2xl font-bold text-warm">
      {children}
    </h2>
  );
}

const linkClass = "prose-link";

const sweetSteadyPosts = [
  {
    title: "SWEET STEP",
    note: "從最核心的代表曲開始，也整理了 1、2、3 後突然開跳的 Shorts。",
    url: "https://home.gamer.com.tw/artwork.php?sn=6381010",
  },
  {
    title: "ファンファーレ",
    note: "眼淚、花束與繼續往前走，後來也和二周年現場連在一起。",
    url: "https://home.gamer.com.tw/artwork.php?sn=6381502",
  },
  {
    title: "始まりの合図",
    note: "回頭看出道初期，也補了一些 MV 裡很有早期感的畫面。",
    url: "https://home.gamer.com.tw/artwork.php?sn=6382069",
  },
  {
    title: "Melodies",
    note: "二周年曲。七個人的名字藏在歌詞裡，也是整個系列拆得最細的一篇。",
    url: "https://home.gamer.com.tw/artwork.php?sn=6382641",
  },
  {
    title: "DASH!!!",
    note: "很適合夏天音樂祭的全速熱鬧曲，文章也故意寫得短一點。",
    url: "https://home.gamer.com.tw/artwork.php?sn=6382821",
  },
  {
    title: "YAKIMOCHI",
    note: "從每個人各唱一次的「イヤ」，一路接到やきもち的諧音與編舞。",
    url: "https://home.gamer.com.tw/artwork.php?sn=6383879",
  },
  {
    title: "ちょーだいHAPPY!",
    note: "Arena 前四天才公開的新歌，七個人的名字又一次落在本人唱的段落。",
    url: "https://home.gamer.com.tw/artwork.php?sn=6386344",
  },
];

export default function IdolLyricsTranslationSeries() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <PostJsonLd href={href} />

      <FadeIn>
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-1 text-sm text-text-muted transition-colors hover:text-primary"
        >
          &larr; Back to Blog
        </Link>

        <div className="mb-4 flex flex-wrap gap-2">
          {["Idol", "Japanese", "Translation"].map((tag) => (
            <span key={tag} className="tag text-xs font-medium text-accent">
              {tag}
            </span>
          ))}
        </div>

        <h1 className="mb-3 text-3xl font-bold leading-tight sm:text-4xl">
          最近在整理偶像歌詞：從 SWEET STEADY 到蝦中
        </h1>
        <p className="mb-8 text-sm text-text-muted">2026-08-28</p>
      </FadeIn>

      <div className="prose-custom space-y-4 leading-relaxed text-text-muted [&_strong]:text-text">
        <FadeIn>
          <p>
            八月大半的空閒時間都在翻偶像歌詞。起點很單純：SWEET STEADY
            第一次 Arena 單獨公演前，想做一個倒數整理，一天一首，把中文翻譯、成員色、歌唱分配和現場 call
            放在同一頁。至少到了 PIA ARENA MM 前，自己要複習也方便。
          </p>
          <p>
            原本以為只會是幾篇短文，結果一路補了舊歌、新歌、MV、Live 和官方 Shorts。Arena
            結束後，又拐回追了很多年的私立恵比寿中学，寫了一篇〈えびチリ、はじめました〉。現在回頭看，已經很像一個小型資料庫了。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="beyond-translation">最花時間的不是逐字翻譯</Heading>
          <p>
            真正難處理的，通常是那些換成中文就會消失的東西：誰唱哪一句、call
            到底該不該翻、名字怎麼藏在跨句的音節裡，還有歌詞、MV 動作和日文諧音怎麼接在一起。
          </p>
          <p>
            像〈YAKIMOCHI〉把「イヤ」的尾音接到「きもち」，變成「やきもち」；副歌還讓成員一人唱一次「イヤ」。〈Melodies〉則把七個人的名字全藏進歌詞，而且都由本人唱出來。這些只看中文譯文很難察覺，所以我會把歌割、訪談或影像一起放進文章。
          </p>
          <p>
            call 也不一定要翻。現場真的會喊的「はい」、HEY、NaNaNaNa，保留原文反而比較實用。翻譯不是每個詞都換成中文，而是決定哪些聲音應該原樣留下。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="different-songs">每首歌不必寫成同一種文章</Heading>
          <p>
            這批整理做到後來，我反而更確定不必每首都硬寫成歌詞研究。〈Melodies〉有名字、花束和二周年的脈絡，值得拆得很細；〈DASH!!!〉就是可愛、好喊、很有夏季音樂祭感，短短寫完反而更像那首歌。
          </p>
          <p>
            我現在比較喜歡讓文章跟著歌走。有明顯的文字遊戲就解釋，有適合的 MV
            畫面就放一兩張；如果只是現場會很開心，也不用硬替它補出一套很深的意思。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="sweet-steady">SWEET STEADY 系列</Heading>
          <div className="my-6 divide-y divide-border/60 rounded-xl border border-border bg-surface/30 px-5">
            {sweetSteadyPosts.map((post) => (
              <a
                key={post.url}
                href={post.url}
                target="_blank"
                rel="noreferrer"
                className="block py-4 transition-colors hover:text-accent"
              >
                <strong className="text-text">〈{post.title}〉</strong>
                <span className="mt-1 block text-sm text-text-muted">{post.note}</span>
              </a>
            ))}
          </div>
          <p>
            完整歌詞、成員色與影片都先放在巴哈。那邊的編輯器比較適合保留歌割顏色，也方便把同一首歌的 MV、Live 和 Shorts 排在一起。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="ebichu">後來又回到蝦中</Heading>
          <p>
            SWEET STEADY 系列暫告一段落後，下一篇寫的是私立恵比寿中学的
            <a
              href="https://home.gamer.com.tw/artwork.php?sn=6387976"
              target="_blank"
              rel="noreferrer"
              className={linkClass}
            >
              〈えびチリ、はじめました〉
            </a>
            。乍聽是一首意義不明的町中華電波歌，挖下去卻塞滿蝦中的團體歷史、世代傳承和老粉才會笑出來的小梗。
          </p>
          <p>
            那篇寫了很久，也花了不少眼淚。歌詞裡一邊唱著流行繞了一圈又回來，一邊說老店還有不變的味道；對隔了很多年才重新回去看蝦中的我來說，很難只把它當成一道蝦料理的歌。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="next">接下來</Heading>
          <p>
            PIA 的倒數已經結束，不需要再逼自己一天一首。不過只要遇到一首歌，裡面有值得替中文讀者留下來的文字遊戲、成員故事或現場片段，我應該還是會繼續整理。
          </p>
          <p>
            巴哈繼續放完整翻譯與歌割；這裡則偶爾記錄整理過程、日文筆記，以及那些翻完以後才發現原來藏得很深的地方。
          </p>
        </FadeIn>
      </div>

      <RelatedPosts href={href} />
    </article>
  );
}
