import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import PostJsonLd from "@/components/PostJsonLd";
import RelatedPosts from "@/components/RelatedPosts";
import { articleMetadata } from "@/lib/seo";

const href = "/blog/idol-lyrics-translation-series";

export const metadata: Metadata = articleMetadata(href, {
  title: "八月翻的偶像歌詞 | 花雪 HanaYukii",
  description:
    "趕在 SWEET STEADY 第一次 Arena 公演前一天翻一首，把中文翻譯、成員色、歌割和現場 call 整理成七篇，公演結束後又寫了一篇蝦中。",
  openGraph: {
    title: "八月翻的偶像歌詞",
    description:
      "趕在 SWEET STEADY 第一次 Arena 公演前一天翻一首，寫成七篇，公演結束後又補了一篇蝦中。",
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
    url: "https://home.gamer.com.tw/artwork.php?sn=6381010",
  },
  {
    title: "ファンファーレ",
    url: "https://home.gamer.com.tw/artwork.php?sn=6381502",
  },
  {
    title: "始まりの合図",
    url: "https://home.gamer.com.tw/artwork.php?sn=6382069",
  },
  {
    title: "Melodies",
    url: "https://home.gamer.com.tw/artwork.php?sn=6382641",
  },
  {
    title: "DASH!!!",
    url: "https://home.gamer.com.tw/artwork.php?sn=6382821",
  },
  {
    title: "YAKIMOCHI",
    url: "https://home.gamer.com.tw/artwork.php?sn=6383879",
  },
  {
    title: "ちょーだいHAPPY!",
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
          八月翻的偶像歌詞
        </h1>
        <p className="mb-8 text-sm text-text-muted">2026-08-28</p>
      </FadeIn>

      <div className="prose-custom space-y-4 leading-relaxed text-text-muted [&_strong]:text-text">
        <FadeIn>
          <p>
            八月花了一些時間整理推廣資源。
          </p>
          <p>
            SWEET STEADY 是最近才開始追的團，中文圈能找到的資料還很少，之前也順手整理過
            Wiki。剛好第一次 Arena 單獨公演快到了，就想說一天翻一首，把中文翻譯、成員色、歌割（歌唱分配）和現場
            call 放在同一篇，自己去 PIA ARENA MM 之前也可以拿來複習。
          </p>
          <p>
            本來只列了幾首，後來舊歌、新歌、MV、Live、Shorts 一路補下去，寫完是七篇。
          </p>
          <p>
            整理的時候要一首一首去查背景，比單純在聽的時候多知道很多，也常常查著查著自己就先被打動了。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="sweet-steady">SWEET STEADY 的七篇</Heading>
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
              </li>
            ))}
          </ul>
          <p>
            完整翻譯和歌割都放在巴哈。歌割要標成員色，現場 call
            也照原樣留著，那邊排版比較好處理。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="ebichu">蝦中</Heading>
          <p>
            公演結束後又繞回追了很多年的蝦中。理由差不多：私立恵比寿中学在日本活動十幾年，中文圈的知名度還是不高，資料一樣少。
          </p>
          <p>
            那陣子一直在聽
            <a
              href="https://home.gamer.com.tw/artwork.php?sn=6387976"
              target="_blank"
              rel="noreferrer"
              className={linkClass}
            >
              〈えびチリ、はじめました〉
            </a>
            ，就從這首開始。原本想寫短一點，背景和梗補一補還是變得很長。這篇也花了不少眼淚寫。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="next">接下來</Heading>
          <p>
            一天一首是為了趕在公演前寫完，之後不用這樣。不過這件事應該還是會繼續做，也不限定哪一團。
          </p>
          <p>
            現在用 AI{" "}
            <Link href="/blog/video-to-article-workflow" className={linkClass}>
              抓字幕、整理逐字稿
            </Link>
            、剪片都很快，做這種推廣用的資源成本比以前低很多，弄起來也蠻有趣的。之後不一定只寫文章。
          </p>
          <p>
            每首歌能寫的本來就不一樣。有背景想講就多寫一點，單純可愛、好喊的歌就短短一篇。
          </p>
          <p>
            八月也去了不少現場，零星的紀錄先發在 Threads，之後再整理成文章。跑場的部分先休息到十二月。
          </p>
        </FadeIn>
      </div>

      <RelatedPosts href={href} />
    </article>
  );
}
