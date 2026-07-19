import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import PostJsonLd from "@/components/PostJsonLd";
import { articleMetadata } from "@/lib/seo";

export const metadata: Metadata = articleMetadata(
  "/blog/tif-2025-shachi-respect-stage",
  {
    title:
      "又快到 TIF 的季節，重看去年的 TEAM SHACHI Respect Stage | 花雪 HanaYukii",
    description:
      "重看 TEAM SHACHI 最後一次登上 TIF 的 Respect Stage：一團一首歌、後輩的眼淚，以及後來才知道也是最後一次 TIF 的 ukka。",
    openGraph: {
      title: "又快到 TIF 的季節，重看去年的 TEAM SHACHI Respect Stage",
      description:
        "從後輩翻唱、熟人間的吐槽，到後來才知道也是最後一次 TIF 的 ukka：重看 TEAM SHACHI 最後一次 TIF。",
      type: "article",
    },
  },
);

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 mt-10 text-2xl font-bold text-warm">{children}</h2>
  );
}

const linkClass =
  "text-primary underline underline-offset-2 hover:text-primary/80";

export default function Tif2025ShachiRespectStage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <PostJsonLd href="/blog/tif-2025-shachi-respect-stage" />

      <FadeIn>
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-1 text-sm text-text-muted transition-colors hover:text-primary"
        >
          &larr; Back to Blog
        </Link>

        <div className="mb-4 flex flex-wrap gap-2">
          {["Idol", "TIF", "TEAM SHACHI"].map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="mb-3 text-3xl font-bold leading-tight sm:text-4xl">
          又快到 TIF 的季節，重看去年的 TEAM SHACHI Respect Stage
        </h1>
        <p className="mb-3 text-base italic text-accent/80">
          一團一首，有眼淚，也有一堆熟人才會有的吐槽。
        </p>
        <p className="mb-8 text-sm text-text-muted">2026-07-19</p>
      </FadeIn>

      <FadeIn>
        <div className="mb-10 aspect-video w-full overflow-hidden rounded-xl border border-border">
          <iframe
            src="https://www.youtube.com/embed/pleH9S-7AKQ"
            title="TEAM SHACHI Respect Stage — TIF 2025 Smile Garden"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            className="h-full w-full"
          />
        </div>
      </FadeIn>

      <div className="prose-custom space-y-4 leading-relaxed text-text-muted [&_strong]:text-text">
        <FadeIn>
          <p>
            又快到 TIF 的季節。開始看今年的名單和時程時，也想起去年在 SMILE
            GARDEN 的 TEAM SHACHI Respect Stage，就拿來再看了一次。
          </p>
          <p>
            去年重新開始看蝦中，後來又因為 ukka 聽回 SHACHI，年底也去了
            〈俺のえびシャチライブ ～THE FINAL～〉。回頭看，Respect Stage
            剛好落在我重新聽 SHACHI、但還沒親自看 THE FINAL 的那段時間。
          </p>
          <p>
            這也是 SHACHI 自 2012 年首次登上 TIF
            以來，最後一次站在這個祭典的舞台。
            <a
              href="https://official.idolfes.com/s/tif2025/news/detail/10076?ima=0000&link=ROBO004"
              target="_blank"
              rel="noreferrer"
              className={`mx-1 ${linkClass}`}
            >
              TIF 官方
            </a>
            把 Respect Stage 定位成「向從 2012 年起支撐 TIF 的 TEAM SHACHI 表達
            respect」的特別企劃。她們先唱〈翔け抜けてスターマイン〉，
            接著由後輩和一路有所交集的偶像輪流上台，一團唱一首 SHACHI 的歌。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading>Respect Stage 的七首歌</Heading>
          <ul className="my-6 space-y-4 rounded-xl border border-border bg-surface/40 p-5 text-sm sm:p-6">
            <li>
              <strong>ばってん少女隊｜〈カントリーガール〉</strong>
              <p className="mt-1">
                還沒有太多原創曲時，她們就唱過這首。上田理子把 SHACHI
                叫作「憧れの大お姉さん」；對她們來說，這首也和出道初期連在一起。
              </p>
            </li>
            <li>
              <strong>AMEFURASSHI｜〈いいくらし〉</strong>
              <p className="mt-1">
                愛来講起遠征時在飯店開女子會，順便吐槽大黒柚姫其實很常看後輩團。
                這組最有朋友聚會的感覺，正經感言講沒多久就開始互虧。
              </p>
            </li>
            <li>
              <strong>ukka｜〈エンジョイ人生〉</strong>
              <p className="mt-1">
                葵るり說，自己曾被這首歌積極向前的歌詞鼓勵。那一天，她們只是像平常一樣
                笑著唱完；後來才更認真認識 ukka
                的我，如今已經很難再把它當成一首普通的翻唱。
              </p>
            </li>
            <li>
              <strong>TIFアイドル連合｜〈恋人はスナイパー〉</strong>
              <p className="mt-1">
                11 人來自不同團體，其中也有高嶺のなでしこ的涼海すう和城月菜央。
                高貓雖然不在星塵，和 SHACHI 卻一直像姐妹團一樣。
                去年高貓在幕張辦三周年公演、SHACHI
                舉辦最終公演時，兩邊也互相送了花籃。
              </p>
            </li>
            <li>
              <strong>LumiUnion｜〈アサガオ〉</strong>
              <p className="mt-1">
                由内藤るな代表發言。她們選了氣氛比較柔和的〈アサガオ〉，放在前後幾首
                一路往前衝的歌中間，這一段也讓現場稍微慢了下來。
              </p>
            </li>
            <li>
              <strong>
                いぎなり東北産｜〈ULTRA 超 MIRACLE SUPER VERY POWER BALL〉
              </strong>
              <p className="mt-1">
                橘花怜回憶，成員們還是小學生、什麼都不懂的時候，就曾替 SHACHI
                伴舞。
                是前輩的舞台讓她們在演藝圈裡看見夢想，講著講著也哭了。這首又是我
                2016、2017 年最熟的那批 SHACHI 歌之一。
              </p>
            </li>
            <li>
              <strong>超ときめき♡宣伝部｜〈抱きしめてアンセム〉</strong>
              <p className="mt-1">
                小泉遥香提到，自己是受咲良菜緒影響才開始接觸搖滾，也想把那股「熱血魂」留下來。
                一邊哭、一邊被旁邊的人吐槽，反而很像她們平常相處的樣子。
              </p>
            </li>
          </ul>
        </FadeIn>

        <FadeIn>
          <p>
            另外，看到
            TIFアイドル連合的名單時，我也有想過，如果蝦中派妹組來參加，
            應該會蠻不錯。桜井えま以前也說過，自己還在研究生時期，第一次站上舞台就是替
            SHACHI 伴舞。而且妹組本來就很尊敬
            SHACHI，作為後輩來參加這一場也很適合。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading>ukka 的〈エンジョイ人生〉</Heading>
          <p>
            當時大家只知道這是 SHACHI 最後一次 TIF。看 ukka
            唱〈エンジョイ人生〉時，只覺得這首很適合她們，也期待這個團接下來會越來越好。
          </p>
          <p>
            數個月後，ukka 宣布解散。回頭才知道，這場同樣成了她們最後一次 TIF。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading>最後的〈沸き曲〉</Heading>
          <p>
            最後所有人一起唱〈沸き曲〉。這首歌原本就有固定的問答環節，
            這一天的題目則換成了「今天台上總共有幾位偶像」。這不是為最後一次 TIF
            臨時加上的綜藝橋段；到了最後，她們仍照原本的方式，把熟悉的〈沸き曲〉唱完。
          </p>
          <p>
            SHACHI 沒有特別把 live
            改成沉重的送別式：該出題就出題，該一起喊就一起喊，
            五十多人擠在台上，畫面還是亂七八糟。這反而最像她們。
          </p>
          <p>
            大家前面輪流說自己受到 SHACHI 什麼影響，最後 SHACHI 再回一句，
            正因為一路被大家這樣看著，才成為現在的她們。講到這裡其實就夠了。
          </p>
          <p>
            今年 TIF 又要到了，我只是想在新一年的行程開始前，先把去年的這 35
            分鐘再記一次。
          </p>
        </FadeIn>

        <FadeIn>
          <div className="mt-10 space-y-3 border-t border-border/40 pt-6 text-sm">
            <p>
              順帶一提，今年的とき宣已經
              <a
                href="https://toki-sen.com/contents/1088152?tag=all"
                target="_blank"
                rel="noreferrer"
                className={`mx-1 ${linkClass}`}
              >
                宣布將在 2027 年春季左右活動終了
              </a>
              。如果時間不變，這次大概就是她們最後一次 TIF；目前排在
              <a
                href="https://official.idolfes.com/s/tif2026/page/timetable"
                target="_blank"
                rel="noreferrer"
                className={`mx-1 ${linkClass}`}
              >
                7 月 31 日 20:10～20:40 的 HOT STAGE
              </a>
              ，也是第一天主舞台壓軸。
            </p>
            <p>
              目前沒有看到類似 Respect Stage 的企劃，不過 HOT STAGE
              壓軸本身已經是很高的安排。
            </p>
            <p className="pt-3">
              延伸：
              <Link
                href="/blog/ukka-final-chapter"
                className={`ml-1 ${linkClass}`}
              >
                ukka Final Chapter
              </Link>
              <span className="mx-2">·</span>
              <Link href="/blog/idol-2025" className={linkClass}>
                2025 偶像現場回顧
              </Link>
              <span className="mx-2">·</span>
              <Link href="/blog/shachi-harebare" className={linkClass}>
                TEAM SHACHI 最終曲〈晴れ晴れ〉
              </Link>
            </p>
          </div>
        </FadeIn>
      </div>
    </article>
  );
}
