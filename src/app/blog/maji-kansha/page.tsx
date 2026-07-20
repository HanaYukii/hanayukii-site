import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { articleMetadata } from "@/lib/seo";
import PostJsonLd from "@/components/PostJsonLd";
import RelatedPosts from "@/components/RelatedPosts";

export const metadata: Metadata = articleMetadata("/blog/maji-kansha", {
  title: "TEAM SHACHI —「マジ感謝」歌詞翻譯 | 花雪 HanaYukii",
  description: "TEAM SHACHI「マジ感謝」歌詞翻譯與心得。",
  openGraph: {
    title: "TEAM SHACHI —「マジ感謝」歌詞翻譯",
    description: "TEAM SHACHI「マジ感謝」歌詞翻譯與心得。",
    type: "article",
  },
});

const verses: { ja: string; zh: string }[] = [
  {
    ja: `放課後みんなで語った
くだらない話笑った
みんなでかわした誓いが
迷いを消した
マジ感謝`,
    zh: `放學後大家一起聊天
笑著說那些無聊的話題
大家一起許下的誓言
消除了我的迷惘
真的非常感謝`,
  },
  {
    ja: `成長していると実感
的中しそうなこの予感
たまに間違って混乱
でも忘れずいつも
マジ感謝`,
    zh: `能夠感受到自己正在成長
這份預感似乎就快成真
偶爾也會犯錯陷入混亂
但始終沒有忘記
真的非常感謝`,
  },
  {
    ja: `（どうしたの　暗い顔して
落ち込まないで　前だけみて）
君の存在にマジ感謝`,
    zh: `（怎麼了？怎麼一臉沮喪
別灰心了，只要向前看）
真的很感謝有你的存在`,
  },
  {
    ja: `（どうしたの　暗い顔して
落ち込まないで　前だけみて）
どれだけ離れてても
いつでも君を思うから`,
    zh: `（怎麼了？怎麼一臉沮喪
別灰心了，只要向前看）
無論相隔多遠
我都會一直想著你`,
  },
  {
    ja: `お願いをきいて
強くなんてならないで
寂しいだろ頼ってよ
何度も　何度も　何度も
君を呼ぶ`,
    zh: `拜託你答應我
不要勉強自己變得堅強
寂寞的時候就依靠我吧
一次又一次
一次又一次
一次又一次地呼喚著你`,
  },
  {
    ja: `君が泣いた
思い出す
あの時のあの言葉
出会えてよかった
本当にマジ感謝`,
    zh: `當你哭泣的時候
我想起了
那時候說過的那句話
能夠與你相遇
真的真的非常感謝`,
  },
  {
    ja: `帰りに立ち寄るあの店
笑うと鼻かくその癖
旅行でも行こうみんなで
しつこいくらい
マジ感謝`,
    zh: `回家路上總會去的那家店
還有你一笑就摸鼻子的習慣
大家一起去旅行吧
雖然說到有點煩人了
但還是非常感謝`,
  },
  {
    ja: `君と何度も割れた意見
いろんな事共に体験
何でも言い合える関係
断ち切れないままだ
マダ感謝`,
    zh: `和你曾無數次意見相左
一起經歷了各種事情
成為了什麼都能坦白說的關係
這份羈絆至今仍無法斷開
直到現在依然感謝`,
  },
  {
    ja: `（なにもかも違うこの街
新しく出会う友達）
支えてくれる人
マジ感謝`,
    zh: `（來到這座一切都不同的城市
認識了新的朋友）
那些支持著我的人
真的非常感謝`,
  },
  {
    ja: `（なにもかも違うこの街
新しく出会う友達）
振り返らずにすすめ
出会いと別れ繰り返し
大きくなるんだ`,
    zh: `（來到這座一切都不同的城市
認識了新的朋友）
不要回頭繼續前進
在相遇與離別中不斷循環
然後慢慢成長`,
  },
  {
    ja: `不安と期待割合は
9対1
ビビるなと何度も　何度も　何度も
励まして`,
    zh: `不安與期待的比例
大概是九比一
不要害怕
你一次又一次
一次又一次
一次又一次地鼓勵著我`,
  },
  {
    ja: `心からのありがとう
伝えきれないこの思い
必ず届けにゆくから
待ってて`,
    zh: `發自內心的謝謝
這份心意無法完全表達
總有一天我一定會親自傳達給你
請等著我`,
  },
  {
    ja: `どれくらい「ありがとう」
伝えても足りないみたいだ
心からあふれてくる感謝`,
    zh: `不管說了多少次「謝謝」
似乎都還遠遠不夠
感謝的心情不斷從心底湧現`,
  },
  {
    ja: `マジで感謝　マジ感謝
マジで感謝　マジ感謝
マジ感謝　マジ感謝
マジでマジでマジ感謝`,
    zh: `真的感謝你　真的感謝
真的感謝你　真的感謝
真的感謝　真的感謝
真的真的真的感謝`,
  },
  {
    ja: `マジで感謝　マジ感謝
マジで感謝　マジ感謝
マジ感謝　マジマジ感謝`,
    zh: `真的感謝你　真的感謝
真的感謝你　真的感謝
真的感謝　超級感謝`,
  },
  {
    ja: `マジ感謝　マジで感謝
マダ感謝
もっともっとマジ感謝`,
    zh: `真的感謝　真的感謝
依然感謝
更加更加地感謝`,
  },
  {
    ja: `マジ感謝　マジ感謝
マジでマジでマジ感謝`,
    zh: `真的感謝　真的感謝
真的真的真的感謝`,
  },
  {
    ja: `マジで感謝　マジ感謝
マジで感謝　マジ感謝
大声でマジマジ感謝
ありがとう`,
    zh: `真的感謝你　真的感謝
真的感謝你　真的感謝
大聲喊出超級感謝
謝謝你`,
  },
];

export default function MajiKansha() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <PostJsonLd href="/blog/maji-kansha" />
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
          TEAM SHACHI —「マジ感謝」歌詞翻譯
        </h1>
        <p className="mb-3 text-base italic text-accent/80">
          即使結束了，能相遇過就值得說一萬次 ありがとう。
        </p>
        <p className="mb-8 text-sm text-text-muted">2026-05-25</p>
      </FadeIn>

      <FadeIn>
        <div className="mb-12 aspect-video w-full overflow-hidden rounded-xl border border-border">
          <iframe
            src="https://www.youtube.com/embed/jBgRsToJGBM?start=6801"
            title="マジ感謝 — TEAM SHACHI 最終SHOW ~晴れ晴れ~ (名古屋城)"
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
          <p>最近一直在看 ukka 解散後的 Blog，反而覺得這首歌現在聽特別有感。</p>
          <p>
            現在聽，最有感的還是那句：即使結束了、即使大家走上不同的路，
            能夠相遇過這件事本身，就值得說一萬次 ありがとう。
          </p>
          <p>難怪這首歌在每一場 Live 都少不了。</p>
        </div>
      </FadeIn>

      {/* 歌詞對照（verses 填好後自動顯示） */}
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

      <FadeIn>
        <div className="mt-16 border-t border-border/30 pt-6 text-sm text-text-muted">
          相關：
          <Link
            href="/blog/ukka-final-chapter"
            className="prose-link"
          >
            ukka Final Chapter
          </Link>
          {" · "}
          <Link href="/blog/idol-2025" className="prose-link">
            2025 偶像現場全紀錄
          </Link>
        </div>
      </FadeIn>
      <RelatedPosts href="/blog/maji-kansha" />
    </article>
  );
}
