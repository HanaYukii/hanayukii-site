import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import PostJsonLd from "@/components/PostJsonLd";
import RelatedPosts from "@/components/RelatedPosts";
import { articleMetadata } from "@/lib/seo";
import styles from "./page.module.css";

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

type MemberColor = {
  light: string;
  dark: string;
};

const memberColors = {
  red: { light: "#dc2626", dark: "#f87171" },
  yuzuki: { light: "#9333ea", dark: "#c084fc" },
  ruri: { light: "#7c3aed", dark: "#a78bfa" },
  suu: { light: "#0369a1", dark: "#38bdf8" },
  kizukiNao: { light: "#a16207", dark: "#facc15" },
  luna: { light: "#4d7c0f", dark: "#a3e635" },
  pink: { light: "#be185d", dark: "#f472b6" },
  shachiNao: { light: "#1d4ed8", dark: "#60a5fa" },
  emma: { light: "#c2410c", dark: "#fb923c" },
} satisfies Record<string, MemberColor>;

function MemberName({
  color,
  children,
}: {
  color: MemberColor;
  children: React.ReactNode;
}) {
  return (
    <span
      className={styles.memberName}
      style={
        {
          "--member-color-light": color.light,
          "--member-color-dark": color.dark,
        } as React.CSSProperties
      }
    >
      {children}
    </span>
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
            又快到 TIF 的季節。最近這一個月突然很喜歡 SWEET STEADY，也開始認真看今年
            HOT STAGE 的時程，就把去年在 SMILE GARDEN 的 TEAM SHACHI Respect
            Stage 拿來再看了一次。
          </p>
          <p>
            去年 TIF 那幾天我其實也在日本，但比較熟的只有蝦中。她們排在早上，只為了那一場特地過去又覺得有點麻煩，最後就沒去
            TIF。那時我還沒重新聽 SHACHI，對她們的印象差不多只有「今年要解散了」。
          </p>
          <p>
            後來因為 ukka 又把 SHACHI 聽回來，年底也去了〈俺のえびシャチライブ
            ～THE FINAL～〉。SHACHI 解散後找影片時，才偶然發現原來她們去年的 TIF
            除了自己的 HOT STAGE，後面還有這場 Respect Stage。
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
            respect」的特別企劃。她們先唱〈翔け抜けてスターマイン〉，接著由後輩和一路有所交集的偶像輪流上台，一團唱一首
            SHACHI 的歌。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading>同一天，還有她們自己的 HOT STAGE</Heading>
          <p>
            Respect Stage 並不是 SHACHI 當天唯一的演出。照
            <a
              href="https://official.idolfes.com/files/57/tif2025/assets/img/timetable/pdf/day1_202508030020.pdf"
              target="_blank"
              rel="noreferrer"
              className={`mx-1 ${linkClass}`}
            >
              當天的時間表
            </a>
            ，她們先在 16:10～16:40 完成自己的 HOT STAGE，17:15
            才到 SMILE GARDEN 進行 Respect Stage。前一場從〈翔け抜けてスターマイン〉開始，中間把〈恋人はスナイパー〉、〈トリプルセブン〉等六首歌接成
            <a
              href="https://thetv.jp/news/detail/1282712/"
              target="_blank"
              rel="noreferrer"
              className={`mx-1 ${linkClass}`}
            >
              TIF 特別 medley
            </a>
            ，最後還是用〈沸き曲〉收尾。
          </p>
          <p>
            我很喜歡這個順序。先讓她們把自己的最後一場 HOT STAGE 唱完，35
            分鐘後再到 SMILE GARDEN，和一路認識的後輩一起唱。SHACHI 從 2012 年就開始上
            TIF，最後幾年未必是最熱門的名字，但同一天能有自己的 HOT STAGE 和一場
            Respect Stage，也看得出她們在這個祭典裡累積的位置。台上那些關係也不是最後一年才突然湊出來的。
          </p>
          <p>
            所以現在回來看這個下午，還是會覺得有點可惜：如果早幾個月認真聽，說不定那天就去了。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading>Respect Stage 的七首歌</Heading>
          <ul className="my-6 space-y-4 rounded-xl border border-border bg-surface/40 p-5 text-sm sm:p-6">
            <li>
              <strong>ばってん少女隊｜〈カントリーガール〉</strong>
              <p className="mt-1">
                還沒有太多原創曲時，她們就唱過這首。
                <MemberName color={memberColors.red}>上田理子</MemberName>把 SHACHI
                叫作「憧れの大お姉さん」；對她們來說，這首也和出道初期連在一起。
              </p>
            </li>
            <li>
              <strong>AMEFURASSHI｜〈いいくらし〉</strong>
              <p className="mt-1">
                <MemberName color={memberColors.red}>愛来</MemberName>講起遠征時在飯店開女子會，順便吐槽
                <MemberName color={memberColors.yuzuki}>大黒柚姫</MemberName>其實很常看後輩團。這組最有朋友聚會的感覺，正經感言講沒多久就開始互虧。
              </p>
            </li>
            <li>
              <strong>ukka｜〈エンジョイ人生〉</strong>
              <p className="mt-1">
                這首明亮、積極的歌本來就很適合她們。那一天，她們就像平常一樣笑著唱完；後來才更認真認識
                ukka 的我，如今很難再把它當成一首普通的翻唱。
              </p>
            </li>
            <li>
              <strong>TIFアイドル連合｜〈恋人はスナイパー〉</strong>
              <p className="mt-1">
                11 人來自不同團體，其中也有高嶺のなでしこ的<MemberName color={memberColors.suu}>涼海すう</MemberName>和
                <MemberName color={memberColors.kizukiNao}>城月菜央</MemberName>。高貓雖然不在星塵，兩團卻也曾互稱「非官方姐妹團」。去年高貓在幕張舉辦三周年公演、SHACHI
                舉辦最終公演時，兩邊也互相送了花籃。
              </p>
            </li>
            <li>
              <strong>LumiUnion｜〈アサガオ〉</strong>
              <p className="mt-1">
                由<MemberName color={memberColors.luna}>内藤るな</MemberName>
                代表發言。她們選了氣氛比較柔和的〈アサガオ〉。放在幾首一路往前衝的歌中間，現場也稍微慢了下來。
              </p>
            </li>
            <li>
              <strong>
                いぎなり東北産｜〈ULTRA 超 MIRACLE SUPER VERY POWER BALL〉
              </strong>
              <p className="mt-1">
                <MemberName color={memberColors.pink}>橘花怜</MemberName>
                回憶，成員們還是小學生、什麼都不懂的時候，就曾替 SHACHI
                伴舞。是前輩的舞台讓她們在演藝圈裡看見夢想，講著講著也哭了。這首又是我
                2016、2017 年最熟的那批 SHACHI 歌之一。
              </p>
            </li>
            <li>
              <strong>超ときめき♡宣伝部｜〈抱きしめてアンセム〉</strong>
              <p className="mt-1">
                <MemberName color={memberColors.pink}>小泉遥香</MemberName>
                提到，自己是受
                <MemberName color={memberColors.shachiNao}>咲良菜緒</MemberName>
                影響才開始接觸搖滾，也想把那股「熱血魂」留下來。一邊哭、一邊被旁邊的人吐槽，反而很像她們平常相處的樣子。
              </p>
            </li>
          </ul>
        </FadeIn>

        <FadeIn>
          <p>
            另外，看到
            TIFアイドル連合的名單時，我也想過，如果蝦中派妹組來參加，應該會很不錯。讓新一代成員以後輩身分向前輩致意，本來就很適合。而且
            <MemberName color={memberColors.emma}>桜井えま</MemberName>
            以前還說過，自己在研究生時期的第一次舞台，就是替 SHACHI
            伴舞。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading>ukka 的〈エンジョイ人生〉</Heading>
          <p>
            對很多中小型團體來說，TIF
            幾乎就是一年裡最大的一場活動。當時大家只知道這是 SHACHI 最後一次 TIF。看 ukka
            唱〈エンジョイ人生〉時，只覺得這首很適合她們；
            <MemberName color={memberColors.ruri}>葵るり</MemberName>也說，自己曾被歌詞裡積極向前的心情鼓勵。當時看完，也只會期待這個團接下來越來越好。
          </p>
          <p>
            數個月後，ukka 宣布解散。回頭才知道，這場同樣成了她們最後一次 TIF。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading>最後的〈沸き曲〉</Heading>
          <p>
            最後所有人一起唱〈沸き曲〉。這首算是 SHACHI
            後期最有代表性的一首。歌裡固定有一段選擇題，每場的題目都不一樣，也是現場的一大樂趣。這一天問的是「今天台上總共有幾位偶像」。
          </p>
          <p>
            SHACHI 沒有特別把 live
            改成沉重的送別式：該出題就出題，該一起喊就一起喊，五十多人擠在台上，畫面還是亂七八糟。這反而最像她們。
          </p>
          <p>
            大家前面輪流說自己受到 SHACHI 什麼影響，最後 SHACHI
            再回一句，正因為一路被大家這樣看著，才成為現在的她們。講到這裡其實就夠了。
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
                className={linkClass}
              >
                宣布將在 2027 年春季左右活動終了
              </a>
              。如果時間不變，這次大概就是她們最後一次 TIF；目前排在{" "}
              <a
                href="https://official.idolfes.com/s/tif2026/page/timetable"
                target="_blank"
                rel="noreferrer"
                className={linkClass}
              >
                7 月 31 日 20:10～20:40 的 HOT STAGE
              </a>
              ，也是第一天主舞台壓軸。
            </p>
            <p>
              目前沒有看到類似 Respect Stage 的企劃，不過 HOT STAGE
              壓軸本身已經是很高的安排。SHACHI 的最後一次
              TIF，是回頭整理十多年來和後輩累積的關係；把 HOT STAGE 最後 30
              分鐘直接交給現在的とき宣，或許也更適合她們。
            </p>
            <p className="pt-3">
              延伸：{" "}
              <Link href="/blog/ukka-final-chapter" className={linkClass}>
                ukka Final Chapter
              </Link>
              <span> · </span>
              <Link href="/blog/idol-2025" className={linkClass}>
                2025 偶像現場回顧
              </Link>
              <span> · </span>
              <Link href="/blog/shachi-harebare" className={linkClass}>
                TEAM SHACHI 最終曲〈晴れ晴れ〉
              </Link>
            </p>
          </div>
        </FadeIn>
      </div>
      <RelatedPosts href="/blog/tif-2025-shachi-respect-stage" />
    </article>
  );
}
