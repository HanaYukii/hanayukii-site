import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "2025 偶像活動參戰總結 | 花雪 HanaYukii",
  description:
    "意外回歸星塵的一年，感謝各種現場的相遇與告別。從桃草到蝦中、從虎魚組到高嶺のなでしこ，2025 年的偶像現場紀錄。",
  openGraph: {
    title: "2025 偶像活動參戰總結",
    description:
      "意外回歸星塵的一年，感謝各種現場的相遇與告別。2025 年的偶像現場紀錄。",
    type: "article",
  },
};

function Heading({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <h2 id={id} className="mb-4 mt-12 text-2xl font-bold scroll-mt-20">
      {children}
    </h2>
  );
}

export default function Idol2025() {
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
          <span className="rounded-full bg-warm/10 px-2.5 py-0.5 text-xs font-medium text-warm">
            Life
          </span>
          <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
            Idol
          </span>
        </div>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight">
          2025 偶像活動參戰總結
        </h1>
        <p className="mb-2 text-lg text-text-muted">
          意外回歸星塵的一年
        </p>
        <p className="mb-8 text-sm text-text-muted">2025-12-18</p>
      </FadeIn>

      {/* ── 前言 ── */}
      <FadeIn>
        <div className="space-y-4">
          <p>
            以為 2017 就退坑星塵了，沒想到 2025 又把桃草、虎魚、蝦中看了一遍，還認識了一堆新的偶像。
            感謝各種現場的相遇與告別，不知明年是否還有這麼多機會，期待新的故事。
          </p>
        </div>
      </FadeIn>

      {/* ── 時間線 ── */}
      <FadeIn>
        <Heading id="timeline">2025 參戰時間線</Heading>
        <div className="space-y-1">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-3 pr-4 font-semibold whitespace-nowrap">日期</th>
                  <th className="pb-3 pr-4 font-semibold">活動</th>
                  <th className="pb-3 font-semibold">會場</th>
                </tr>
              </thead>
              <tbody className="text-text-muted">
                <tr className="border-b border-border/50">
                  <td className="py-2.5 pr-4 whitespace-nowrap">12/13</td>
                  <td className="py-2.5 pr-4">TEAM SHACHI 最終SHOW 晴れ晴れ</td>
                  <td className="py-2.5 whitespace-nowrap">名古屋城 二之丸廣場</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2.5 pr-4 whitespace-nowrap">12/12</td>
                  <td className="py-2.5 pr-4">えびちゅう Road to Kアリーナ</td>
                  <td className="py-2.5 whitespace-nowrap">COMTEC PORTBASE</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2.5 pr-4 whitespace-nowrap">11/30</td>
                  <td className="py-2.5 pr-4">俺のえびシャチ</td>
                  <td className="py-2.5 whitespace-nowrap">パシフィコ横浜</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2.5 pr-4 whitespace-nowrap">11/29</td>
                  <td className="py-2.5 pr-4">夏川椎菜 as mona 2nd</td>
                  <td className="py-2.5 whitespace-nowrap">立川ステージガーデン</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2.5 pr-4 whitespace-nowrap">09/07</td>
                  <td className="py-2.5 pr-4">高嶺のなでしこ 3周年</td>
                  <td className="py-2.5 whitespace-nowrap">幕張メッセ</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2.5 pr-4 whitespace-nowrap">09/02</td>
                  <td className="py-2.5 pr-4">桜井えま 3rd 生誕祭</td>
                  <td className="py-2.5 whitespace-nowrap">Zepp 横浜</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2.5 pr-4 whitespace-nowrap">08/16-17</td>
                  <td className="py-2.5 pr-4">FAMIEN 2025</td>
                  <td className="py-2.5 whitespace-nowrap">山中湖きらら</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2.5 pr-4 whitespace-nowrap">08/13</td>
                  <td className="py-2.5 pr-4">SASUKEアイドル予選会 2025</td>
                  <td className="py-2.5 whitespace-nowrap">LaLa arena 東京灣</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2.5 pr-4 whitespace-nowrap">08/09</td>
                  <td className="py-2.5 pr-4">LuckyFes 25</td>
                  <td className="py-2.5 whitespace-nowrap">ひたち海浜公園</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2.5 pr-4 whitespace-nowrap">08/02-03</td>
                  <td className="py-2.5 pr-4">ももクロ夏のバカ騒ぎ 2025</td>
                  <td className="py-2.5 whitespace-nowrap">横浜スタジアム</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2.5 pr-4 whitespace-nowrap">07/05-06</td>
                  <td className="py-2.5 pr-4">IDOL EXPO</td>
                  <td className="py-2.5 whitespace-nowrap">Zepp New Taipei</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2.5 pr-4 whitespace-nowrap">06/28-29</td>
                  <td className="py-2.5 pr-4">えびちゅう 小林歌穂 卒業式 / 新体制始業式</td>
                  <td className="py-2.5 whitespace-nowrap">幕張メッセ</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2.5 pr-4 whitespace-nowrap">03/20</td>
                  <td className="py-2.5 pr-4">えびちゅう 15周年 大学芸会</td>
                  <td className="py-2.5 whitespace-nowrap">SSA</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 whitespace-nowrap">03/02</td>
                  <td className="py-2.5 pr-4">TrySail 10周年</td>
                  <td className="py-2.5 whitespace-nowrap">日本武道館</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </FadeIn>

      {/* ── TrySail ── */}
      <FadeIn>
        <Heading id="trysail">03/02 TrySail 10周年 @ 日本武道館</Heading>
        <div className="space-y-4">
          <p>
            今年第一場，TrySail 十周年。
          </p>
        </div>
      </FadeIn>

      {/* ── えびちゅう SSA ── */}
      <FadeIn>
        <Heading id="ebichu-ssa">03/20 えびちゅう 15周年 大学芸会 @ SSA</Heading>
        <div className="space-y-4">
          <p>
            蝦中 15 周年。SSA 的規模感跟歷史感都很不一樣。
          </p>
        </div>
      </FadeIn>

      {/* ── えびちゅう 卒業式 ── */}
      <FadeIn>
        <Heading id="ebichu-graduation">06/28-29 えびちゅう 小林歌穂 卒業式 / 新体制始業式 @ 幕張メッセ</Heading>
        <div className="space-y-4">
          <p>
            超感動幸福的卒業 live，運營的用心和成員的愛都太真實了。
            各個回憶短片都勾起回憶，不知不覺跟她們走過了好長的歷史，也認識了新朋友。
          </p>
          <p>
            本來覺得抽不到票了，最後一階段視野不良席才終於抽到，結果直接變神席。
            本來還覺得可能拿不到彩帶，沒想到出口直接有 staff 再發，彩帶好漂亮。
          </p>
          <p>
            雖然陸續推了不少，不過還是覺得現在推えびちゅう是最開心的一段。
            2014 就認識，不過 2024 才重新因為えま開始認真推的，應該還會繼續推下去蠻久的吧。
          </p>
        </div>
      </FadeIn>

      {/* ── IDOL EXPO ── */}
      <FadeIn>
        <Heading id="idol-expo">07/05-06 IDOL EXPO @ Zepp New Taipei</Heading>
        <div className="space-y-4">
          <p>
            這種拼盤場距離真的近的不可思議。えま顏值實在太高了。
            因為えびちゅう也有機會來看看地偶。
            兩天都在差不多的位子看えま，可惜蝦中不能拍照，希望她們難得來台灣玩的愉快。
          </p>
        </div>
      </FadeIn>

      {/* ── ももクロ夏バカ ── */}
      <FadeIn>
        <Heading id="momoclo">08/02-03 ももクロ夏のバカ騒ぎ 2025 @ 横浜スタジアム</Heading>
        <div className="space-y-4">
          <p>
            日本夏日第一場。兩天前才決定要來的，心血來潮就來了。
            2018 隨著ももか退團後退坑，第一次回來看她們的 live。
          </p>
          <p>
            好久沒來這種大場了，整場很有一貫的祭典熱鬧夏日感。
            還是很多很愛的歌，有聽到最愛的 Hanabi，覺得有來真好。
            Day2 又聽到了 Hanabi，最後也聽到了特別期待的キミノアト，想起 2015 年的桃神祭。
          </p>
          <p>
            感時傷勢，現在自我介紹最年少已經 29 歲了。
            感謝她們還在發光發熱，還在唱那些熟悉的經典。
          </p>
        </div>
      </FadeIn>

      {/* ── LuckyFes ── */}
      <FadeIn>
        <Heading id="luckyfes">08/09 LuckyFes 25 @ ひたち海浜公園</Heading>
        <div className="space-y-4">
          <p>
            還是最愛蝦中，最近見的頻率好高，夏天野外場太愛了。
            初見 FRUITS ZIPPER，好強，不愧是可以上東蛋的團。
          </p>
        </div>
      </FadeIn>

      {/* ── SASUKE ── */}
      <FadeIn>
        <Heading id="sasuke">08/13 SASUKEアイドル予選会 2025 @ LaLa arena 東京灣</Heading>
        <div className="space-y-4">
          <p>
            整個節目很精彩，結局也很感動，認識了好多新偶像。
            從這裡認識了涼海すう，開始更加關注跟喜歡高嶺のなでしこ，並且認識了更多的偶像。
          </p>
        </div>
      </FadeIn>

      {/* ── FAMIEN ── */}
      <FadeIn>
        <Heading id="famien">08/16-17 FAMIEN 2025 @ 山中湖きらら</Heading>
        <div className="space-y-4">
          <p>
            第二年來遠足，交通難度 S 級的 Fes。
            歌單好愛，煙火好美，えま好可愛。
            富士山山中湖的野外 live，夏天就是要這樣。
          </p>
        </div>
      </FadeIn>

      {/* ── えま生誕 ── */}
      <FadeIn>
        <Heading id="ema-birthday">09/02 桜井えま 3rd 生誕祭 @ Zepp 横浜</Heading>
        <div className="space-y-4">
          <p>
            えま的生誕祭。
          </p>
        </div>
      </FadeIn>

      {/* ── たかねこ ── */}
      <FadeIn>
        <Heading id="takaneko">09/07 高嶺のなでしこ 3周年 @ 幕張メッセ</Heading>
        <div className="space-y-4">
          <p>
            因為 LuckyFes 和 SASUKE アイドル予選会，才有契機再次注意到たかねこ。
            作為 HoneyWorks 的支持者，也聽過不少歌，感覺她們誕生很久了，沒想到去年才主流出道。
          </p>
          <p>
            剛好有搭到場可以第一次參加她們的 one-man live，各種氛圍都好可愛。
            すう太可愛了。加推無誤。
          </p>
        </div>
      </FadeIn>

      {/* ── mona ── */}
      <FadeIn>
        <Heading id="mona">11/29 夏川椎菜 as mona 2nd @ 立川ステージガーデン</Heading>
        <div className="space-y-4">
          <p>
            因為高嶺のなでしこ開始聽了很多 HoneyWorks，最後走到 mona 的現場。
            各種有趣的契機串起來的結果。
          </p>
        </div>
      </FadeIn>

      {/* ── 俺のえびシャチ ── */}
      <FadeIn>
        <Heading id="ebishachi">11/30 俺のえびシャチ @ パシフィコ横浜</Heading>
        <div className="space-y-4">
          <p>
            えびちゅう和 TEAM SHACHI 十一年久違的 two-man live，很多感動的元素。
            也真的出現一堆古早時代的歌，都不認識了。
            也算跟著她們一起長大，這種感時傷勢總是讓我特別有感。
          </p>
          <p>
            虎魚解散前初見，期待有很多經典老歌。
            兩週後再去看解散 live。
          </p>
        </div>
      </FadeIn>

      {/* ── えびちゅう Road to K ── */}
      <FadeIn>
        <Heading id="ebichu-road">12/12 えびちゅう Road to Kアリーナ @ COMTEC PORTBASE</Heading>
        <div className="space-y-4">
          <p>
            名古屋場。蝦中有來真好，聽到稀有的梅跟ハッピーエンドとそれから，還有攝可時間。
          </p>
        </div>
      </FadeIn>

      {/* ── TEAM SHACHI Final ── */}
      <FadeIn>
        <Heading id="shachi-final">12/13 TEAM SHACHI 最終SHOW 晴れ晴れ @ 名古屋城 二之丸廣場</Heading>
        <div className="space-y-4">
          <p>
            名古屋城，虎魚組 TEAM SHACHI 的 Final Live。
            這麼冷的天氣的戶外 live 真是辛苦成員了。
          </p>
          <p>
            開場，人生 50 年，偶像 13 年 8 個月。
            足夠讓一個偶像團體經歷各種階段，也足夠讓聽歌的人在人生中走過好多旅程。
          </p>
          <p>
            雖然沒有一直追，在 2016、17 年前後，她們的很多歌都是一直 loop 的愛歌，
            時間不算長，也是對應著一段回憶。
            能來這場 Final Live，其實也是很巧的緣分，完全出乎預料。
            剛好這段時間，自己也面臨重啟與準備開始新的挑戰，所以有許多歌詞跟情境都特別觸動。
          </p>
          <p>
            另外最驚喜的是場間 staff 把高台放在隔壁走道的正前方，
            從第二排看距離近的不真實。
          </p>
          <p>
            最後ほのか的 MC：如果曾經在某個人的人生裡，成為過某種存在，那就已經很滿足了。
          </p>
          <p className="text-text-muted italic">
            会えなくても 寂しくても<br />
            それでも地球は回ってゆく<br />
            君と僕の新しい物語をはじめよう
          </p>
          <p>
            感謝在年尾得到了一份重要的禮物。
          </p>
        </div>
      </FadeIn>

      {/* ── 回顧 ── */}
      <FadeIn>
        <Heading id="reflection">回頭看</Heading>
        <div className="space-y-4">
          <p>
            回頭看，有很多有趣的契機。
          </p>
          <p>
            從 SASUKE アイドル予選会認識了涼海すう，開始更加關注跟喜歡高嶺のなでしこ，並且認識了更多的偶像。
            因為えびちゅう和高嶺のなでしこ，又有機會再見到 TEAM SHACHI，並走到她們的最後。
            也因為高嶺のなでしこ，開始聽了很多 HoneyWorks，最後去到 mona 的現場。
          </p>
          <p>
            人生也充滿各種有趣的契機，今年也遇到了不少不管是快樂的或痛苦的，
            不知道未來還有沒有這麼多的機會參與現場，希望新的挑戰一切順利。
          </p>
          <p className="mt-8 text-lg font-semibold text-text">
            2026 もよろしく。
          </p>
        </div>
      </FadeIn>

      <FadeIn>
        <div className="mt-8 flex flex-wrap gap-2 text-xs">
          {["Idol", "Life", "えびちゅう", "TEAM SHACHI", "高嶺のなでしこ", "ももクロ", "Live"].map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-surface px-3 py-1 text-text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </FadeIn>
    </article>
  );
}
