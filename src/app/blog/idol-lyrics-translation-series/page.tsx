import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import PostJsonLd from "@/components/PostJsonLd";
import RelatedPosts from "@/components/RelatedPosts";
import { articleMetadata } from "@/lib/seo";

const href = "/blog/idol-lyrics-translation-series";

export const metadata: Metadata = articleMetadata(href, {
  title: "最近在翻偶像歌詞，結果越寫越多 | 花雪 HanaYukii",
  description:
    "原本只是想替 SWEET STEADY 多留一點中文資料，在 Arena 前列幾首歌整理，結果寫著寫著停不下來，後來連蝦中的也一起寫了。",
  openGraph: {
    title: "最近在翻偶像歌詞，結果越寫越多",
    description:
      "本來只想在 SWEET STEADY Arena 前列幾首歌，最後一路寫了七篇，又接著寫回蝦中。",
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
          最近在翻偶像歌詞，結果越寫越多
        </h1>
        <p className="mb-8 text-sm text-text-muted">2026-08-28</p>
      </FadeIn>

      <div className="prose-custom space-y-4 leading-relaxed text-text-muted [&_strong]:text-text">
        <FadeIn>
          <p>
            八月大半的空閒時間都拿去翻偶像歌詞了。
          </p>
          <p>
            一開始其實就是想推廣 SWEET STEADY。SS
            在中文圈能找到的資料還是不多，我之前也整理過 Wiki。剛好第一次 Arena
            單獨公演快到了，就想說先列幾首想寫的歌，一天整理一首，順便把中文翻譯、成員色、歌割（歌唱分配）和現場 call
            都放在一起，自己去 PIA ARENA MM 前也可以複習。
          </p>
          <p>
            本來真的只打算列幾首，結果寫著寫著就停不下來。舊歌、新歌、MV、Live、Shorts
            一路補，回過神已經寫了七篇。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="sweet-steady">結果變成七篇</Heading>
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
            完整翻譯和歌割目前都放在巴哈。歌割要保留成員色，現場 call
            也會照原樣留著，那邊比較適合排這些東西。這邊就先記一下我八月到底在忙什麼。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="ebichu">然後又寫回蝦中</Heading>
          <p>
            PIA 結束後，我又繞回追了很多年的蝦中。理由其實也差不多：私立恵比寿中学在日本活動了這麼久，在中文圈的知名度還是不高，能找到的中文資料也不多。
          </p>
          <p>
            剛好那時候一直在聽
            <a
              href="https://home.gamer.com.tw/artwork.php?sn=6387976"
              target="_blank"
              rel="noreferrer"
              className={linkClass}
            >
              〈えびチリ、はじめました〉
            </a>
            ，就想說也來整理一篇。本來沒打算寫那麼長，結果背景和梗越補越多，最後也寫到掉了不少眼淚。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="next">接下來就慢慢寫</Heading>
          <p>
            PIA 的倒數已經結束，之後當然不用再一天一首。不過這件事大概還是會繼續做，也不限定哪一團。
          </p>
          <p>
            每首歌能寫的本來就不一樣，不一定每首背後都有那麼多故事。有東西想講就多寫一點，單純可愛、好喊的歌就短短寫完。反正喜歡什麼就慢慢寫什麼。
          </p>
          <p>
            完整翻譯和歌割還是放巴哈。這邊就偶爾記一下最近又寫了什麼。
          </p>
        </FadeIn>
      </div>

      <RelatedPosts href={href} />
    </article>
  );
}
