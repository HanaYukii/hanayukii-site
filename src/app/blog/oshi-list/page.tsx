import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { articleMetadata } from "@/lib/seo";
import PostJsonLd from "@/components/PostJsonLd";
import RelatedPosts from "@/components/RelatedPosts";

export const metadata: Metadata = articleMetadata("/blog/oshi-list", {
  title: "推し清單 | 花雪 HanaYukii",
  description:
    "從 Stardust 起點，到現在主要在追、已解散的推、以前喜歡偶爾看、觀望中的團。",
  openGraph: {
    title: "推し清單",
    description:
      "從 Stardust 起點，到現在主要在追、已解散的推、以前喜歡偶爾看、觀望中的團。",
    type: "article",
  },
});

// 成員代表色（メンバーカラー）
const C = {
  emma: "#F4A03B", //   桜井えま   - ハニーオレンジ
  yuuna: "#CDB18D", //  仲村悠菜   - ミルクティー
  suu: "#38BDF8", //    涼海すう   - 水色
  erisa: "#F4845F", //  東山恵里沙 - オレンジ
  shiina: "#FBBF24", // 夏川椎菜   - 黄
  momo: "#F472B6", //   麻倉もも   - 桃
  yaen: "#AFDFE4", //   蔡亞恩     - 水藍
  nao: "#5B9BD5", //    咲良菜緒   - ドラゴンズブルー
  rina: "#E53935", //   結城りな   - 紅
  momoka: "#4CAF50", // 有安杏果   - 緑
  aiai: "#A5D6A7", //   ぁぃぁぃ   - 淺綠
};

function M({
  color,
  children,
}: {
  color: string;
  children: React.ReactNode;
}) {
  return <span style={{ color }}>{children}</span>;
}

function SectionHeading({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <h2
      id={id}
      className="mt-12 mb-4 scroll-mt-20 border-t border-border/30 pt-8 text-2xl font-bold text-warm"
    >
      {children}
    </h2>
  );
}

export default function OshiList() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <PostJsonLd href="/blog/oshi-list" />
      <FadeIn>
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-1 text-sm text-text-muted transition-colors hover:text-primary"
        >
          &larr; Back to Blog
        </Link>

        <div className="mb-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
            Idol
          </span>
          <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
            Life
          </span>
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight">推し清單</h1>
        <p className="mb-3 text-base italic text-accent/80">
          寫在剛看完 ukka 解散 live 的今天。
        </p>
        <p className="mb-8 text-sm text-text-muted">2026-05-25</p>
      </FadeIn>

      {/* Stardust 起點 */}
      <FadeIn>
        <SectionHeading id="stardust-origin">Stardust 起點</SectionHeading>
      </FadeIn>

      <FadeIn>
        <section className="space-y-4 leading-relaxed text-text-muted">
          <p>
            其實更早是因為守護甜心認識 Buono!。後來 Buono! 參加指原莉乃プロデュース的
            「第一回ゆび祭り～アイドル臨時総会～」，現場被 ももクロ 的表演震撼到，
            2013 才從桃草入坑 Stardust。蝦中是 2014 認識，2016–17 桃草主推那段時間，
            蝦中跟虎魚也都聽了很多。2018{" "}
            <M color={C.momoka}>ももか</M>{" "}
            卒業後從桃草退坑，2020 還聽了不少蝦中、看了{" "}
            <M color={C.aiai}>ぁぃぁぃ</M> 的卒業 live 影片
            （多年後她又在新團努力，最近也主流出道了）。
          </p>
          <p>
            中間沉寂好幾年。2024 被{" "}
            <M color={C.emma}>えま</M>{" "}
            的 family complex 開場拉回蝦中，2025 又透過 SASUKE 連到高嶺のなでしこ、ukka，
            也再見到 TEAM SHACHI 趕上她們的 Final。慢慢就變回 Stardust DD。
          </p>
        </section>
      </FadeIn>

      {/* 現在主要在追 */}
      <FadeIn>
        <SectionHeading id="current">現在主要在追</SectionHeading>
      </FadeIn>

      <FadeIn>
        <section className="space-y-3">
          <h3 className="text-xl font-semibold">
            私立恵比寿中学（えびちゅう / 蝦中）
          </h3>
          <p className="leading-relaxed text-text-muted">
            2024 被 <M color={C.emma}>えま</M> 的 family complex 開場震撼到重新回坑。
            中間其實一直有聽歌、很多都很喜歡，只是沒真正認真關注，
            想去看現場的時候又碰到疫情。
          </p>

          <div className="mt-2 aspect-video w-full overflow-hidden rounded-xl border border-border">
            <iframe
              src="https://www.youtube.com/embed/y2LaJ6UbUuc"
              title="family complex — 桜井えま (えびちゅう)"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              className="h-full w-full"
            />
          </div>

          <p className="text-sm text-text-muted">
            <span className="text-text">主推：</span>
            <M color={C.emma}>桜井えま</M>
          </p>
          <p className="text-sm text-text-muted">
            <span className="text-text">副推：</span>
            <M color={C.yuuna}>仲村悠菜</M>
          </p>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="mt-8 space-y-3">
          <h3 className="text-xl font-semibold">
            高嶺のなでしこ（たかねこ / 高貓）
          </h3>
          <p className="leading-relaxed text-text-muted">
            作為 HoneyWorks 粉絲很早就知道她們，但一直沒特別關注，只認得 momona。
            看完 SASUKE アイドル予選会後追了一堆{" "}
            <M color={C.suu}>涼海すう</M> 的資源，被超級可愛的{" "}
            <M color={C.suu}>すう</M> 拉進坑。
          </p>
          <p className="text-sm text-text-muted">
            <span className="text-text">主推：</span>
            <M color={C.suu}>涼海すう</M>
          </p>
          <p className="text-sm text-text-muted">
            <span className="text-text">副推：</span>
            <M color={C.erisa}>東山恵里沙</M>
          </p>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="mt-8 space-y-3">
          <h3 className="text-xl font-semibold">TrySail</h3>
          <p className="leading-relaxed text-text-muted">
            學生時期推 <M color={C.momo}>麻倉もも</M>。後來一段時間沒在看，
            最近因為 <M color={C.shiina}>mona</M> 跟 HoneyWorks 重新關注。
          </p>
          <p className="text-sm text-text-muted">
            <span className="text-text">主推：</span>
            <M color={C.shiina}>夏川椎菜</M>
          </p>
        </section>
      </FadeIn>

      {/* 已解散的推 */}
      <FadeIn>
        <SectionHeading id="disbanded">已解散的推</SectionHeading>
      </FadeIn>

      <FadeIn>
        <section className="space-y-3">
          <h3 className="text-xl font-semibold">TEAM SHACHI（旧 チームしゃちほこ / 虎魚組）</h3>
          <p className="leading-relaxed text-text-muted">
            2016–17 一直 loop 的團。2025/12 解散，能在解散前再次認識喜歡她們，
            見證到幾場 live 真的很棒。
          </p>
          <p className="text-sm text-text-muted">
            <span className="text-text">主推：</span>
            <M color={C.nao}>咲良菜緒</M>
          </p>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="mt-8 space-y-3">
          <h3 className="text-xl font-semibold">ukka（旧 桜エビ〜ず）</h3>
          <p className="leading-relaxed text-text-muted">
            蝦中唯一的官方妹團。從 SASUKE アイドル予選会跟{" "}
            <M color={C.emma}>えま</M> 的 blog 認識{" "}
            <M color={C.rina}>りな</M>。
            雖然認識不到一年，包含拼盤共看了 7 次現場，台灣也碰到一次。
            趕上 Final Chapter 真的算很幸運。
            希望以後還有機會見到 <M color={C.rina}>りな</M>。
          </p>
          <p className="text-sm text-text-muted">
            <span className="text-text">主推：</span>
            <M color={C.rina}>結城りな</M>
          </p>
        </section>
      </FadeIn>

      {/* 以前很喜歡，現在偶爾看 */}
      <FadeIn>
        <SectionHeading id="past-fav">以前很喜歡，現在偶爾看</SectionHeading>
      </FadeIn>

      <FadeIn>
        <section className="space-y-3">
          <h3 className="text-xl font-semibold">
            ももいろクローバーZ（ももクロ / 桃草）
          </h3>
          <p className="leading-relaxed text-text-muted">
            2013 認識，學生時代主推。2018{" "}
            <M color={C.momoka}>ももか</M> 卒業後退坑。
            2025 心血來潮回去看了一場夏のバカ騒ぎ，發現 90% 的歌還記得。現在偶爾留意。
          </p>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="mt-8 space-y-3">
          <h3 className="text-xl font-semibold">TPE48（AKB48 TEAM TP）</h3>
          <p className="leading-relaxed text-text-muted">
            從出道一直持續關注，偶爾會去看公演。
          </p>
          <p className="text-sm text-text-muted">
            <span className="text-text">主推：</span>
            <M color={C.yaen}>蔡亞恩</M>
          </p>
        </section>
      </FadeIn>

      {/* 觀望中 */}
      <FadeIn>
        <SectionHeading id="watching">觀望中</SectionHeading>
      </FadeIn>

      <FadeIn>
        <ul className="list-disc space-y-3 pl-6 text-text-muted leading-relaxed">
          <li>
            <span className="font-semibold text-text">=LOVE</span> —
            早期出來就有微關注、一直有在聽歌。〈制服のクリスマス〉、〈あの子コンプレックス〉
            到最近的〈劇薬中毒〉都很愛，2025–26 還上了國立。
          </li>
          <li>
            <span className="font-semibold text-text">僕が見たかった青空</span> —
            從 SASUKE アイドル予選会注意到，幾個成員蠻可愛，曲風也還可以。
          </li>
          <li>
            <span className="font-semibold text-text">日向坂46</span> —
            幾個成員很可愛。
          </li>
        </ul>
      </FadeIn>

      {/* 相關 */}
      <FadeIn>
        <SectionHeading id="related">相關</SectionHeading>
      </FadeIn>

      <FadeIn>
        <ul className="list-disc space-y-2 pl-6 text-text-muted">
          <li>
            <Link
              href="/blog/idol-2025"
              className="prose-link"
            >
              2025 偶像現場全紀錄
            </Link>
          </li>
          <li>
            <Link
              href="/blog/takaneko-ikite-ryaii"
              className="prose-link"
            >
              高嶺のなでしこ — 生きてりゃいい 歌詞翻譯
            </Link>
          </li>
        </ul>

        <p className="mt-8 text-sm text-text-muted">
          完整參戰紀錄：
          <a
            href="https://www.eventernote.com/users/HanaYukii/events"
            target="_blank"
            rel="noopener noreferrer"
            className="prose-link"
          >
            eventernote
          </a>
        </p>
      </FadeIn>
      <RelatedPosts href="/blog/oshi-list" />
    </article>
  );
}
