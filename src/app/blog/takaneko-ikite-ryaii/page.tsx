import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "高嶺のなでしこ — 生きてりゃいい 歌詞翻譯 | 花雪 HanaYukii",
  description:
    "高嶺のなでしこ「生きてりゃいい」歌詞翻譯。エースコック はるさめキャンペーン。",
  openGraph: {
    title: "高嶺のなでしこ — 生きてりゃいい 歌詞翻譯",
    description:
      "高嶺のなでしこ「生きてりゃいい」歌詞翻譯。エースコック はるさめキャンペーン。",
    type: "article",
  },
};

const verses: { ja: string; zh: string }[] = [
  {
    ja: `(Yeah)
(Yeah)`,
    zh: `(Yeah)
(Yeah)`,
  },
  {
    ja: `ちきちきぱーちきちきぱーぱー
ミスしちゃったっていい
完璧って無理！
矛盾こそ人間の証
期待しちゃっていい
エビデンスなし！
それくらいの気持ちでちょうどいい`,
    zh: `ちきちきぱーちきちきぱーぱー
犯錯也沒關係
完美？根本不可能！
矛盾才是身為人的證明
有期待也沒關係
沒什麼根據也沒關係！
帶著這種心態剛剛好`,
  },
  {
    ja: `日本という島国には
アイドルという文化があります
(あるのです)
力合わせましょ
諸行無常？いや、愛、永久でしょ！！
盛り上げます
心、温めます`,
    zh: `在日本這個島國
有所謂「偶像」這個文化
(是真的有喔)
齊心協力吧
諸行無常？不對，愛 才是永恆的吧！！
我們會炒熱氣氛
我們會溫暖大家的心`,
  },
  {
    ja: `元気出そうぜ！
(Yeah)
怒られたって笑われたって
生きてりゃいい
上を向こうぜ！
(Yeah)
涙出たってグッと踏んばって
生きてりゃいい
今日は良い日になる
ハッピー！`,
    zh: `打起精神來吧！
(Yeah)
就算被罵 就算被笑
只要活著就好
抬起頭來吧！
(Yeah)
就算流淚 也咬牙撐住
只要活著就好
今天會是好的一天
Happy！`,
  },
  {
    ja: `(Yeah)
(Yeah)
楽しんじゃっていい！
(いい)
暇潰しでいい！
(いい)
それくらいの気持ちでちょうどいい`,
    zh: `(Yeah)
(Yeah)
盡情玩樂也沒關係！
(沒關係)
打發時間也沒關係！
(沒關係)
帶著這種心態剛剛好`,
  },
  {
    ja: `総理大臣じゃないから
政治のことは分からないけど
(けどね？)
力合わせましょ
日本盛り上げて旗掲げ
歌いましょう
世界、照らしましょう`,
    zh: `反正我們又不是總理大臣
政治的事我不懂
(對吧？)
齊心協力吧
讓日本熱鬧起來 高高舉旗
一起唱歌吧
一起照亮世界吧`,
  },
  {
    ja: `大丈夫だぜ！
(Yeah)
転んじゃったって手を取り合って
生きてりゃいい
力抜こうぜ！
(Yeah)
寄り道だって必要だって
生きてりゃいい
今日は良い日になる
ハッピー！`,
    zh: `沒問題的啦！
(Yeah)
就算跌倒了 也手牽手
只要活著就好
放輕鬆點吧！
(Yeah)
繞點遠路也是必要的
只要活著就好
今天會是好的一天
Happy！`,
  },
  {
    ja: `誰かの為にあれ
優しい君であれ
さすれば優しい世界が見えるでしょう
応援しましょう`,
    zh: `成為某個人的力量吧
願你始終溫柔
這樣的話 你就會看見溫柔的世界
一起為彼此應援吧`,
  },
  {
    ja: `元気出そうぜ！
(Yeah)
怒られたって笑われたって
生きてりゃいい
上を向こうぜ！
(Yeah)
涙出たってグッと踏んばって
生きてりゃいい
今日は良い日になる
ハッピー！`,
    zh: `打起精神來吧！
(Yeah)
就算被罵 就算被笑
只要活著就好
抬起頭來吧！
(Yeah)
就算流淚 也咬牙撐住
只要活著就好
今天會是好的一天
Happy！`,
  },
  {
    ja: `Lalala…
(Yeah)
Lalala…
(Yeah)`,
    zh: `Lalala…
(Yeah)
Lalala…
(Yeah)`,
  },
];

export default function IkiteRyaii() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
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
            takaneko
          </span>
        </div>
        <h1 className="mb-2 text-3xl font-bold leading-tight sm:text-4xl">
          高嶺のなでしこ — 生きてりゃいい 歌詞翻譯
        </h1>
        <p className="mb-2 text-base text-text-muted leading-relaxed">
          高嶺のなでしこ × エースコック はるさめキャンペーン
          <br />
          作詞・作曲：shito・中西／編曲：HoneyWorks／発売：2026-05-13
        </p>
        <p className="mb-6 text-sm text-text-muted">2026-05-14</p>

        <div className="mb-12 aspect-video w-full overflow-hidden rounded-xl border border-border">
          <iframe
            src="https://www.youtube.com/embed/957yJCyB-tk"
            title="生きてりゃいい — 高嶺のなでしこ"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      </FadeIn>

      <FadeIn>
        <div className="prose-custom mb-16 space-y-4 leading-relaxed text-text-muted [&_strong]:text-text">
          <p>
            高嶺のなでしこ 2026 年 5 月 13 日新曲。整體實在超級可愛，聽起來很舒服，放著當背景、心情自然就很好，對未來充滿希望 :)。有點戀愛幸運餅乾的感覺。
          </p>
          <p>
            「スープはるさめ マーラーニャン」（成員們「現在最想吃的味道」→ 麻辣湯口味）期間限定發售。
          </p>
          <div className="mx-auto my-2 max-w-sm">
            <Image
              src="/images/takaneko-marayang.jpg"
              alt="エースコック × 高嶺のなでしこ コラボ「スープはるさめ マーラーニャン」"
              width={900}
              height={1200}
              className="w-full rounded-lg border border-border"
            />
          </div>
          <p>
            歌詞核心是個樸素的、可以套用在大眾的人生觀——不用完美。犯錯也可以、完美不可能、人本來就矛盾、活著就已經很好了。
          </p>
          <p>
            雖然有點躺平文化的味道，但在這個卷卷的社會裡，偶爾躺平一下還是很棒的。
          </p>
          <p>
            這首歌實在太可愛療癒，讓我對她們的好感度又大增了。
          </p>
        </div>
      </FadeIn>

      <div className="space-y-10">
        {verses.map((v, i) => (
          <FadeIn key={i}>
            <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
              <p className="whitespace-pre-line leading-relaxed text-text">
                {v.ja}
              </p>
              <p className="whitespace-pre-line leading-relaxed text-text-muted">
                {v.zh}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </article>
  );
}
