import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { articleMetadata } from "@/lib/seo";
import PostJsonLd from "@/components/PostJsonLd";

export const metadata: Metadata = articleMetadata("/blog/shachi-harebare", {
  title: "在晴朗的風裡翻頁 — TEAM SHACHI 最終曲「晴れ晴れ」 | 花雪 HanaYukii",
  description:
    "youth case 寫給 TEAM SHACHI 的畢業曲〈晴れ晴れ〉。歌詞意境很美：寫給曾經一起走過一段路的人。",
  openGraph: {
    title: "在晴朗的風裡翻頁 — TEAM SHACHI 最終曲「晴れ晴れ」",
    description: "youth case 寫給 TEAM SHACHI 的畢業曲〈晴れ晴れ〉。",
    type: "article",
  },
});

const verses: { ja: string; zh: string }[] = [
  {
    ja: `そよ風が木漏れ日を揺らした
舞い踊るように季節は動き出すよ
それぞれの想い出いっぱい抱えて
どんな未来が待ってるかワクワクするんだ`,
    zh: `微風吹動了樹影間灑落的日光
季節也像跳著舞一樣開始流轉
懷抱著各自滿滿的回憶
想著會有怎樣的未來在等待，心就雀躍不已`,
  },
  {
    ja: `土砂降りな雨に打たれた日も
君がいれば無邪気に笑えたんだよ
鳴り止まない胸の音がするよ`,
    zh: `即使是被驟雨拍打的日子
只要有你在，就能天真地笑出來
胸口裡響著停不下來的聲音`,
  },
  {
    ja: `聞こえてるでしょう？扉を開けよう
何が起きても大丈夫だよ
世界が変わり続けても
終わらない夢を見てる
まだ知らない自分に会いたいから`,
    zh: `你聽見了吧？把門打開吧
無論發生什麼事，都沒關係
即使世界不停改變
我們仍望著不會結束的夢
因為還想遇見那個未知的自己`,
  },
  {
    ja: `君と僕の新しい物語をはじめよう
会えなくても　寂しくても
それでも地球は回ってゆく
ちょっとだけ泣いちゃっても　今日は晴れ晴れ
笑顔でまた会えますように
駆け出してゆく`,
    zh: `讓我們開始屬於你和我的全新故事吧
即使無法相見，即使感到寂寞
地球仍會繼續轉動
就算忍不住掉了一點眼淚，今天的心也會放晴
願我們能帶著笑容再次相遇
向前奔跑而去`,
  },
  {
    ja: `懐かしい声が聞こえた気がした
きっとどこかで君もがんばってるのかな？
軽やかに足音を鳴らして
デコボコくねった道もワクワクするんだ`,
    zh: `總覺得，好像聽見了令人懷念的聲音
你一定也正在某個地方努力著吧？
輕快地踏出腳步聲
就連彎彎曲曲、起伏不平的道路，也讓人滿心期待`,
  },
  {
    ja: `星のない夜空に迷った時も
君がくれた光で進めるんだよ
そしてまた虹は架かってゆくよ`,
    zh: `即使迷失在沒有星星的夜裡
你給我的光，也會帶我繼續前行
然後那道彩虹一定會再次架起`,
  },
  {
    ja: `ほら見えるでしょう？追いかけていよう
どこにいても約束だよ
もしも出会っていなければ
生まれなかった夢を見てる
きっとこれを奇跡と呼ぶから`,
    zh: `你看見了吧？那就繼續追逐吧
不論身在何處，這都是我們的約定
如果當初沒有與你相遇
我就不會看見這個原本不會誕生的夢
所以我一定會把它稱作奇蹟`,
  },
  {
    ja: `君と僕が過ごした　この青空の真下
離れてても　切なくても
いつでも自由に飛び跳ねる
そっと手を振るけど　ずっと晴れ晴れ
この気持ち忘れないように
抱きしめてく`,
    zh: `你和我曾一同度過的，這片青空之下
即使分離，即使難以割捨
無論何時都能自由地跳起、飛出去
雖然輕輕揮手道別，心卻始終晴朗
為了不忘記這份心情
將它緊緊擁入懷中`,
  },
  {
    ja: `ずっと一緒にいたんだ　僕らの旅
これからどこへだってゆけるさ
「ありがとう」と「さよなら」を何度も繰り返して　前へ`,
    zh: `我們曾一直在一起，這是屬於我們的旅程
從今以後，無論哪裡都能前往
一次又一次重複著「謝謝」與「再見」，繼續向前`,
  },
  {
    ja: `君と僕が初めて出会えたあの時から
一瞬でも　永遠でも
愛を込めて`,
    zh: `自從你和我最初相遇的那一刻起
無論是一瞬間，還是直到永遠
都灌注著滿滿的愛`,
  },
  {
    ja: `君と僕の新しい物語をはじめよう
会えなくても　寂しくても
それでも地球は回ってゆく
ちょっとだけ泣いちゃっても　今日は晴れ晴れ
笑顔でまた会えますように
いっせいのせいで
胸を張って
今みんなで
駆け出してゆく`,
    zh: `讓我們開始屬於你和我的全新故事吧
即使無法相見，即使感到寂寞
地球仍會繼續轉動
就算忍不住掉了一點眼淚，今天的心也會放晴
願我們能帶著笑容再次相遇
數著一、二，預備
挺起胸膛
現在，大家一起
向前奔跑而去`,
  },
];

export default function ShachiHarebare() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <PostJsonLd href="/blog/shachi-harebare" />
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
            Live
          </span>
          <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
            Life
          </span>
        </div>
        <h1 className="mb-3 text-3xl font-bold leading-tight sm:text-4xl">
          在晴朗的風裡翻頁 — TEAM SHACHI 最終曲「晴れ晴れ」
        </h1>
        <p className="mb-3 text-base italic text-accent/80">
          寫給曾經一起走過一段路的人。
        </p>
        <p className="mb-8 text-sm text-text-muted">2026-05-27</p>
      </FadeIn>

      <FadeIn>
        <div className="mb-12 aspect-video w-full overflow-hidden rounded-xl border border-border">
          <iframe
            src="https://www.youtube.com/embed/zRD6gvRLO1w"
            title="TEAM SHACHI「晴れ晴れ / HAREBARE」Official Music Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            className="h-full w-full"
          />
        </div>
      </FadeIn>

      {/* 心得 */}
      <FadeIn>
        <div className="prose-custom mb-16 space-y-4 leading-relaxed text-text-muted [&_strong]:text-text">
          <p>
            〈晴れ晴れ〉是 youth case 寫給 TEAM SHACHI 的畢業曲，收在最終單曲裡。
          </p>
          <p>
            先說「晴れ晴れ（はればれ）」這個詞。它不是單純的「晴天」，
            比較接近雨過天晴、如釋重負——是經歷過一些事情之後，
            終於能夠坦然往前走的心情。
          </p>
          <p>
            第一次讀歌詞就很喜歡。後來認真看了幾遍，覺得它其實可以有很多種解讀；
            但對我來說，它比較像是在寫一個曾經一起走過一段路、很重要的人。
          </p>
          <p>
            那段路有過晴天，也有過淋雨和迷路的時候。但回頭看時，
            那些日子都成了珍貴的回憶。
          </p>
          <p>
            它寫的不只是離別，而是離別之後：
            即使見不到面，還是相信對方正在某個地方努力著。
          </p>
          <p>所以這裡的再見不是切斷，而是一種更安靜的陪伴。</p>

          <p>
            有好多段都特別打動。也特別喜歡這首裡那種跨越時間、跨越空間的感覺。
          </p>
          <blockquote className="my-2 rounded-r-lg border-l-2 border-warm/40 bg-surface/40 px-4 py-3">
            <p className="text-text">まだ知らない自分に会いたいから</p>
            <p className="text-text">君と僕の新しい物語をはじめよう</p>
            <p className="mt-1 text-sm text-text-muted">
              因為還想遇見那個還不知道的自己——讓我們開始屬於你和我的新故事吧。
            </p>
          </blockquote>
          <p>
            它沒有只往回看。一邊告別，也一邊往前開了一扇門：
            去遇見還不知道的自己，開始新的故事。
          </p>
          <blockquote className="my-2 rounded-r-lg border-l-2 border-warm/40 bg-surface/40 px-4 py-3">
            <p className="text-text">会えなくても　寂しくても</p>
            <p className="text-text">それでも地球は回ってゆく</p>
            <p className="mt-1 text-sm text-text-muted">
              即使見不到、即使寂寞，世界仍會繼續轉動。
            </p>
          </blockquote>
          <p>
            不是「以後就會忘記」那種安慰，而是：人不在身邊了，
            那段一起走過的時間還在。
          </p>

          <blockquote className="my-2 rounded-r-lg border-l-2 border-warm/40 bg-surface/40 px-4 py-3">
            <p className="text-text">懐かしい声が聞こえた気がした</p>
            <p className="text-text">君もどこかで頑張ってるんだろう</p>
            <p className="mt-1 text-sm text-text-muted">
              彷彿聽見了令人懷念的聲音，你一定也在某個地方努力著吧。
            </p>
          </blockquote>
          <p>
            不是「我們還能一直聯絡」，
            而是更遠、更安靜的信任：看不見對方，也相信你還在你的路上努力著。
          </p>

          <blockquote className="my-2 rounded-r-lg border-l-2 border-warm/40 bg-surface/40 px-4 py-3">
            <p className="text-text">もしも出会っていなければ</p>
            <p className="text-text">生まれなかった夢を見てる</p>
            <p className="text-text">きっとこれを奇跡と呼ぶから</p>
            <p className="mt-1 text-sm text-text-muted">
              如果沒有遇見你，我不會做這樣的夢——大概這就叫奇蹟吧。
            </p>
          </blockquote>
          <p>
            不只是「遇見你很開心」，而是如果沒有這場相遇，
            可能不會做這樣的夢，也不會走到現在這條路。
          </p>

          <blockquote className="my-2 rounded-r-lg border-l-2 border-warm/40 bg-surface/40 px-4 py-3">
            <p className="text-text">
              「ありがとう」と「さよなら」を何度も繰り返して　前へ
            </p>
            <p className="mt-1 text-sm text-text-muted">
              一次又一次地說著「謝謝」與「再見」，然後繼續往前。
            </p>
          </blockquote>
          <p>
            以前覺得這只是句常見的歌詞，經歷多了才慢慢懂：
            人生好像就是不斷遇見一些人、再跟一些人道別，
            帶著每個階段留下的軌跡跟回憶，把它們當成珍貴的寶物，繼續往前。
          </p>
          <p>到了最後，還能用這麼棒的一首歌收尾，真的是很幸福的結局。</p>

        </div>
      </FadeIn>

      {/* 歌詞對照 */}
      <FadeIn>
        <p className="mb-8 mt-4 border-t border-border/30 pt-8 font-mono text-xs uppercase tracking-[0.15em] text-primary">
          / 歌詞對照
        </p>
      </FadeIn>
      <div className="space-y-8">
        {verses.map((v, i) => (
          <FadeIn key={i}>
            <div className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
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

      <FadeIn>
        <div className="mt-16 border-t border-border/30 pt-6 text-sm text-text-muted">
          相關：
          <Link
            href="/blog/ukka-final-chapter"
            className="ml-1 text-primary hover:underline"
          >
            ukka Final Chapter
          </Link>
          {" · "}
          <Link href="/blog/idol-2025" className="text-primary hover:underline">
            2025 偶像現場全紀錄
          </Link>
        </div>
      </FadeIn>
    </article>
  );
}
