import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import PostJsonLd from "@/components/PostJsonLd";
import RelatedPosts from "@/components/RelatedPosts";
import { articleMetadata } from "@/lib/seo";

const href = "/blog/idol-lyrics-translation-series";

export const metadata: Metadata = articleMetadata(href, {
  title: "最近在做偶像歌詞翻譯和歌曲整理 | 花雪 HanaYukii",
  description:
    "從 SWEET STEADY 首次 Arena 公演前的一日一曲開始，慢慢把喜歡的偶像歌、歌割、日文小梗和現場片段整理下來。",
  openGraph: {
    title: "最近在做偶像歌詞翻譯和歌曲整理",
    description:
      "Arena 倒數的一日一曲，後來慢慢變成一個會繼續寫下去的偶像歌曲整理系列。",
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
          最近在做偶像歌詞翻譯和歌曲整理
        </h1>
        <p className="mb-8 text-sm text-text-muted">2026-08-28</p>
      </FadeIn>

      <div className="prose-custom space-y-4 leading-relaxed text-text-muted [&_strong]:text-text">
        <FadeIn>
          <p>
            八月大半的空閒時間都拿去翻偶像歌詞了。
          </p>
          <p>
            一開始只是因為 SWEET STEADY 第一次 Arena
            單獨公演快到了，想說一天整理一首，順便把中文翻譯、成員色、歌割（歌唱分配）和現場 call
            放在一起，自己去 PIA ARENA MM 前也比較方便複習。
          </p>
          <p>
            結果寫著寫著就停不下來。舊歌、新歌、MV、Live、Shorts 一路補，Arena
            結束後又繞回追了很多年的私立恵比寿中学，寫了〈えびチリ、はじめました〉。現在看來，應該也不會只停在這兩團。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="beyond-translation">逐字翻譯反而不是最麻煩的</Heading>
          <p>
            實際做下去才發現，最容易卡住的都是那些中文一翻就不見的東西。誰唱哪句、call
            要不要留原文、名字怎麼藏在音節裡，甚至 MV 裡一個動作到底有沒有在接歌詞的梗。
          </p>
          <p>
            像〈YAKIMOCHI〉把「イヤ」的尾音接到「きもち」，變成「やきもち」；副歌還讓成員一人唱一次「イヤ」。〈Melodies〉則把七個人的名字全藏進歌詞，而且都由本人唱出來。這些只看中文譯文很難察覺，所以我會把歌割、訪談或影像一起放進文章。
          </p>
          <p>
            call 也不一定要翻。現場真的會喊的「はい」、HEY、NaNaNaNa，保留原文反而比較實用。翻譯不是每個詞都換成中文，而是決定哪些聲音應該原樣留下。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="different-songs">有梗就挖，沒有也不用硬寫</Heading>
          <p>
            寫到後來，也慢慢懶得每首都硬分析了。〈Melodies〉有名字、花束和二周年，一堆東西可以拆；〈DASH!!!〉就真的只是很可愛、很好喊，放在夏天現場一定很熱鬧。那就短短寫完也沒關係。
          </p>
          <p>
            有明顯的文字遊戲就解釋，有適合的 MV
            畫面就放一兩張。沒有的話，也不用每首歌都硬找一個深層意義。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="sweet-steady">先從 SWEET STEADY 開始</Heading>
          <ul className="my-6 list-disc space-y-3 border-y border-border py-5 pl-5">
            {sweetSteadyPosts.map((post) => (
              <li key={post.url}>
                <a
                  href={post.url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-text transition-colors hover:text-accent"
                >
                  〈{post.title}〉
                </a>
                ：{post.note}
              </li>
            ))}
          </ul>
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
          <Heading id="next">接下來就慢慢寫</Heading>
          <p>
            PIA 的倒數已經結束，之後當然不用再一天一首。不過這件事大概會繼續做下去，也不限定哪一團。遇到自己喜歡的歌，就把中文翻譯、歌割、歌詞裡的梗，或一些想留下來的現場和 MV 片段整理起來。
          </p>
          <p>
            有些可能只是完整歌詞翻譯，有些會像〈えびチリ〉一樣一路寫成歌曲整理文。反正喜歡什麼就慢慢寫什麼。
          </p>
          <p>
            完整翻譯和歌割目前還是放巴哈；這邊就偶爾記一些整理過程、日文筆記，還有翻完以後才發現的東西。
          </p>
        </FadeIn>
      </div>

      <RelatedPosts href={href} />
    </article>
  );
}
