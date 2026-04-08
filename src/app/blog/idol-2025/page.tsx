import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "2025 偶像現場全紀錄 | 花雪 HanaYukii",
  description:
    "意外回歸星塵的一年，感謝各種現場的相遇與告別。從桃草到蝦中、從虎魚組到高嶺のなでしこ，2025 年的偶像現場紀錄。",
  openGraph: {
    title: "2025 偶像現場全紀錄",
    description:
      "意外回歸星塵的一年，感謝各種現場的相遇與告別。2025 年的偶像現場紀錄。",
    type: "article",
  },
};

function Heading({ date, children, id }: { date?: string; children: React.ReactNode; id: string }) {
  return (
    <div className="mb-4 mt-12 scroll-mt-20 border-t border-border/30 pt-8" id={id}>
      {date && (
        <span className="mb-2 inline-block rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
          {date}
        </span>
      )}
      <h2 className="text-2xl font-bold">
        {children}
      </h2>
    </div>
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
          2025 偶像現場全紀錄
        </h1>
        <p className="mb-2 text-lg text-text-muted">
          意外回歸星塵的一年
        </p>
        <p className="mb-8 text-sm text-text-muted">2026-04-08</p>
      </FadeIn>

      {/* ── 前言 ── */}
      <FadeIn>
        <div className="space-y-4">
          <p>
            以為自己早在 2017 就退坑偶像了，沒想到 2025 因為一連串意外的契機，變成了特別精彩的一年。
          </p>
          <p>
            最精彩的大概還是えびちゅう睽違十年的 SSA，情緒最滿的是走到 TEAM SHACHI 的 final live。
            夏天的野外場是最快樂的記憶，SASUKE 則是如果明年還有一定要再去。
          </p>
          <p>
            感謝各種現場的相遇與告別，期待新的故事。
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
                  <td className="py-2.5 pr-4">TEAM SHACHI 最終SHOW ~晴れ晴れ~</td>
                  <td className="py-2.5 whitespace-nowrap">名古屋城 二之丸広場</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2.5 pr-4 whitespace-nowrap">12/12</td>
                  <td className="py-2.5 pr-4">えびちゅう 秋の5都市キャラバンツアー ~Magic 1 Hour~ in 愛知</td>
                  <td className="py-2.5 whitespace-nowrap">COMTEC PORTBASE</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2.5 pr-4 whitespace-nowrap">11/30</td>
                  <td className="py-2.5 pr-4">俺のえびシャチライブ ~THE FINAL~</td>
                  <td className="py-2.5 whitespace-nowrap">パシフィコ横浜 国立大ホール</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2.5 pr-4 whitespace-nowrap">11/29</td>
                  <td className="py-2.5 pr-4">夏川椎菜 as mona 2nd ワンマンライブ 君を幸せにするのはわたし</td>
                  <td className="py-2.5 whitespace-nowrap">TACHIKAWA STAGE GARDEN</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2.5 pr-4 whitespace-nowrap">10/10-11</td>
                  <td className="py-2.5 pr-4">IDOL KINGDOM TAIPEI 2025</td>
                  <td className="py-2.5 whitespace-nowrap">統一時代百貨夢廣場</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2.5 pr-4 whitespace-nowrap">09/07</td>
                  <td className="py-2.5 pr-4">高嶺のなでしこ 3rd ANNIVERSARY CONCERT「A Wonderful Encounter」</td>
                  <td className="py-2.5 whitespace-nowrap">幕張メッセ</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2.5 pr-4 whitespace-nowrap">09/02</td>
                  <td className="py-2.5 pr-4">桜井えま 生誕ソロライブ「はにーえまいる~沼3~」</td>
                  <td className="py-2.5 whitespace-nowrap">KT Zepp Yokohama</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2.5 pr-4 whitespace-nowrap">08/16-17</td>
                  <td className="py-2.5 pr-4">FAMIEN 2025</td>
                  <td className="py-2.5 whitespace-nowrap">山中湖交流プラザ きらら</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2.5 pr-4 whitespace-nowrap">08/13</td>
                  <td className="py-2.5 pr-4">SASUKEアイドル予選会2025 ー出場権争奪バトルー</td>
                  <td className="py-2.5 whitespace-nowrap">LaLa arena TOKYO-BAY</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2.5 pr-4 whitespace-nowrap">08/09</td>
                  <td className="py-2.5 pr-4">LuckyFes&apos;25</td>
                  <td className="py-2.5 whitespace-nowrap">国営ひたち海浜公園</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2.5 pr-4 whitespace-nowrap">08/02-03</td>
                  <td className="py-2.5 pr-4">ももクロ夏のバカ騒ぎ2025 in 横浜スタジアム</td>
                  <td className="py-2.5 whitespace-nowrap">横浜スタジアム</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2.5 pr-4 whitespace-nowrap">07/05-06</td>
                  <td className="py-2.5 pr-4">TAIPEI CITY IDOL EXPO 2025</td>
                  <td className="py-2.5 whitespace-nowrap">Zepp New Taipei</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2.5 pr-4 whitespace-nowrap">06/28-29</td>
                  <td className="py-2.5 pr-4">えびちゅう 小林歌穂 卒業式「ぽ~EVER」/ 新体制始業式「GOLDEN EIGHT」</td>
                  <td className="py-2.5 whitespace-nowrap">幕張メッセ</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2.5 pr-4 whitespace-nowrap">03/20</td>
                  <td className="py-2.5 pr-4">えびちゅう 15th Anniversary 大学芸会2025 ~LOVE&amp;BRAVE~</td>
                  <td className="py-2.5 whitespace-nowrap">さいたまスーパーアリーナ</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 whitespace-nowrap">03/02</td>
                  <td className="py-2.5 pr-4">TrySail 10周年出航ライブ &quot;FlagShip&quot; in 日本武道館</td>
                  <td className="py-2.5 whitespace-nowrap">日本武道館</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </FadeIn>

      {/* ── TrySail ── */}
      <FadeIn>
        <Heading id="trysail" date="03/02">TrySail &quot;FlagShip&quot; <span className="text-lg font-normal text-text/60">@ 日本武道館</span></Heading>
        <div className="space-y-4">
          <p>
            今年第一場，TrySail 十周年。沒有特別多的記憶，不過就是一場不錯的 live 吧。
            也是第一次去武道館，今年應該還會找機會去看她們。
          </p>
        </div>
      </FadeIn>

      {/* ── えびちゅう SSA ── */}
      <FadeIn>
        <Heading id="ebichu-ssa" date="03/20">えびちゅう 大学芸会2025 ~LOVE&amp;BRAVE~ <span className="text-lg font-normal text-text/60">@ さいたまスーパーアリーナ</span></Heading>
        <div className="space-y-4">
          <p>
            開場的聲光效果還有 overture 就讓人鳥肌感動，最後時刻滿場真的很棒。
            睽違十年再上 SSA，很多畫面都跟當年對照起來，歌單整個很神，各種橋段非常精彩。
            從頭到尾情緒一直是拉滿的狀態，本來出了點小意外差點放掉這場，慶幸最後還是有去。
          </p>
        </div>
      </FadeIn>

      {/* ── えびちゅう 卒業式 ── */}
      <FadeIn>
        <Heading id="ebichu-graduation" date="06/28-29">小林歌穂 卒業式「ぽ~EVER」/ 新体制始業式「GOLDEN EIGHT」<span className="text-lg font-normal text-text/60">@ 幕張メッセ</span></Heading>
        <div className="space-y-4">
          <p>
            超感動幸福的卒業 live，運營的用心和成員的愛都太真實了。
            各個回憶短片都勾起回憶，不知不覺跟她們走過了好長的歷史，也認識了新朋友。
          </p>
          <p>
            朋友第一階段 FC 就抽到了，本來有點絕望準備看轉播了，
            結果最後有抽到視野不良席。更巧的是朋友就在隔壁區隔壁排前一格的位子，超級巧。
            本來還覺得可能拿不到彩帶，沒想到出口直接有 staff 再發，彩帶好漂亮。
          </p>
          <p>
            第二天的新體制也令人期待，很愛金八的氛圍，歌單也有很多好聽的歌。
          </p>
          <p>
            雖然陸續推了不少，不過還是覺得現在推えびちゅう是最開心的一段。
            2014 就認識，不過 2024 才重新因為えま開始認真推的，應該還會繼續推下去蠻久的吧。
          </p>
        </div>
      </FadeIn>

      {/* ── IDOL EXPO ── */}
      <FadeIn>
        <Heading id="idol-expo" date="07/05-06">TAIPEI CITY IDOL EXPO 2025 <span className="text-lg font-normal text-text/60">@ Zepp New Taipei</span></Heading>
        <div className="space-y-4">
          <p>
            這種拼盤場距離真的近的不可思議，えま顏值實在太高了。
            因為えびちゅう也有機會來看看地偶。
            兩天都在差不多的位子看えま，可惜蝦中不能拍照，希望她們難得來台灣玩的愉快。
            後來也去找了えま曬的鴨子娃娃的同系列產品，可惜沒買到同一隻。
          </p>
        </div>
      </FadeIn>

      {/* ── ももクロ夏バカ ── */}
      <FadeIn>
        <Heading id="momoclo" date="08/02-03">ももクロ夏のバカ騒ぎ2025 <span className="text-lg font-normal text-text/60">@ 横浜スタジアム</span></Heading>
        <div className="space-y-4">
          <p>
            日本夏日第一場。兩天前才決定要來的，心血來潮就來了。
            2018 隨著ももか退團後退坑，第一次回來看她們的 live。
          </p>
          <p>
            兩天都是買當日券，也都是在蛋頂最後一排，不過真的是很棒的整體視野。
            雖然超級久沒 follow 也沒什麼在聽新歌，意外的還是認識絕大部分的歌，詩織依然還是很可愛。
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
        <Heading id="luckyfes" date="08/09">LuckyFes&apos;25 <span className="text-lg font-normal text-text/60">@ 国営ひたち海浜公園</span></Heading>
        <div className="space-y-4">
          <p>
            第一次來夏日野外拼盤 fes，大草原夏日感好愛。
            剛進場就聽到熟悉的高貓的歌，身為長年 HoneyWorks 粉絲當時還沒入高貓坑，不過後來入坑又是另一段故事了。
          </p>
          <p>
            蝦中這場的歌單很棒，唱了好多首，也還不錯有卡到蠻前面的位置。
            最近見的頻率好高，夏天野外場太愛了。
            另外也看到了 FRUITS ZIPPER、氣志團、Cutie Street 等等，難得的體驗。
          </p>
        </div>
      </FadeIn>

      {/* ── SASUKE ── */}
      <FadeIn>
        <Heading id="sasuke" date="08/13">SASUKEアイドル予選会2025 <span className="text-lg font-normal text-text/60">@ LaLa arena TOKYO-BAY</span></Heading>
        <div className="space-y-4">
          <p>
            整個節目很精彩，結局也很感動。坐在蝦中應援席，不過現在看來更推的應該是涼海すう跟結城りな。
          </p>
          <p>
            結城りな去年太可惜，少參加了一項還只以些微差距拿了第二名，製作單位又把特別名額發給別人了一定很不甘心。
            今年終於成功雪恥，可惜 ukka 要解散了，真的好希望還能在 SASUKE 看到她。
            也是後續關注 =LOVE 的契機，認識了好多新偶像。
          </p>
          <p>
            從這裡認識了涼海すう，她表現很好出了好多風頭，
            對鏡頭展現充滿活力的一面超喜歡，而且短髮小小隻超級可愛。
            開始更加關注跟喜歡高嶺のなでしこ，期待今年的 SASUKE。
          </p>
        </div>
      </FadeIn>

      {/* ── FAMIEN ── */}
      <FadeIn>
        <Heading id="famien" date="08/16-17">FAMIEN 2025 <span className="text-lg font-normal text-text/60">@ 山中湖交流プラザ きらら</span></Heading>
        <div className="space-y-4">
          <p>
            第二年來遠足，交通難度 S 級的 Fes。
            歌單好愛，煙火好美，えま好可愛。
            富士山山中湖的野外 live，夏天就是要這樣。
            交通很累，但富士山下的夏日現場就是值得。
          </p>
        </div>
      </FadeIn>

      {/* ── えま生誕 ── */}
      <FadeIn>
        <Heading id="ema-birthday" date="09/02">桜井えま 生誕ソロライブ「はにーえまいる~沼3~」<span className="text-lg font-normal text-text/60">@ KT Zepp Yokohama</span></Heading>
        <div className="space-y-4">
          <p>
            えま的生誕祭，沒什麼特別記憶，不過えま很可愛。
            出的周邊有えま的聲音，還有她自己畫的圓臉えま，很可愛。
          </p>
        </div>
      </FadeIn>

      {/* ── たかねこ ── */}
      <FadeIn>
        <Heading id="takaneko" date="09/07">高嶺のなでしこ 3rd ANNIVERSARY「A Wonderful Encounter」<span className="text-lg font-normal text-text/60">@ 幕張メッセ</span></Heading>
        <div className="space-y-4">
          <p>
            因為 LuckyFes 和 SASUKE アイドル予選会，才有契機再次注意到たかねこ。
            作為 HoneyWorks 還有 TrySail 的長期粉絲，也聽過不少她們的歌，不過今年才正式注意到她們。
            感覺誕生很久了，沒想到去年才主流出道。
          </p>
          <p>
            剛好有搭到えま生誕可以第一次參加她們的 one-man live，各種氛圍都好可愛。
            我臉盲還不會認成員，這場只認得出 momona 跟すう。
            整場氛圍很完整，曲風也正中我喜歡的那種可愛又帶點青春感的路線，結果回去後就一路加推到東山了。
          </p>
        </div>
      </FadeIn>

      {/* ── IDOL KINGDOM ── */}
      <FadeIn>
        <Heading id="idol-kingdom" date="10/10-11">IDOL KINGDOM TAIPEI 2025 <span className="text-lg font-normal text-text/60">@ 統一時代百貨夢廣場</span></Heading>
        <div className="space-y-4">
          <p>
            第一天在後台拿著すう的扇子揮手，跟即將登場的高嶺のなでしこ打招呼，すう真的好小隻。
          </p>
          <p>
            第二天進場繼續拿すう的扇子，也得到她好多飯撒，舞台上真的好可愛，魅力超高。
            也看到了 ukka，蠻後悔沒有去 ukka 的特典會的。
          </p>
        </div>
      </FadeIn>

      {/* ── mona ── */}
      <FadeIn>
        <Heading id="mona" date="11/29">夏川椎菜 as mona 2nd「君を幸せにするのはわたし」<span className="text-lg font-normal text-text/60">@ TACHIKAWA STAGE GARDEN</span></Heading>
        <div className="space-y-4">
          <p>
            因為高嶺のなでしこ開始聽了很多 HoneyWorks，剛好可以搭到場來 mona 的現場。
            就是很有 mona 感覺的一場歡樂輕鬆的表演。
            各種有趣的契機串起來的結果，於是我在 TrySail 改主推夏川了。
          </p>
        </div>
      </FadeIn>

      {/* ── 俺のえびシャチ ── */}
      <FadeIn>
        <Heading id="ebishachi" date="11/30">俺のえびシャチライブ ~THE FINAL~ <span className="text-lg font-normal text-text/60">@ パシフィコ横浜 国立大ホール</span></Heading>
        <div className="space-y-4">
          <p>
            跟虎魚組的緣分，其實還是當年推桃草的時候，順帶也會關注到蝦中跟虎魚。
            當年聽了很多歌，覺得很多首都非常喜歡，不過還是學生沒有這麼多機會可以遠征參加場，
            好像也有來過台灣，不過也沒有見過。
          </p>
          <p>
            這次真的是因為蝦中才有第一次初見虎魚的機會。
            えびちゅう和 TEAM SHACHI 十一年久違的 two-man live，很多感動的元素。
            整場的歌單滿滿的經典冷門老歌，完全是當年偶像戰國時代的主旋律，
            也真的出現一堆古早時代的歌。也算跟著她們一起長大，這種感時傷勢總是讓我特別有感。
          </p>
          <p>
            如今即將走向終點，因為今天的感動也讓我決定去她們的 final live 見證最後。
            也可惜沒有更早更多認識她們一點。
          </p>
        </div>
      </FadeIn>

      {/* ── えびちゅう Road to K ── */}
      <FadeIn>
        <Heading id="ebichu-road" date="12/12">えびちゅう ~Magic 1 Hour~ in 愛知 <span className="text-lg font-normal text-text/60">@ COMTEC PORTBASE</span></Heading>
        <div className="space-y-4">
          <p>
            剛好在跑半個日本旅遊，因為隔天有虎魚的 final live 也提早來名古屋，
            剛好有機會來蝦中的 Road to Kアリーナ 巡迴的名古屋場。
            即使最後才買票，位置還是很前面看得很清楚，小場的快樂，不過只有一小時很快就結束了。
            這系列周邊很多都很可愛。
          </p>
          <p>
            聽到稀有的梅跟ハッピーエンドとそれから，還有攝可時間，蝦中有來真好。
          </p>
        </div>
      </FadeIn>

      {/* ── TEAM SHACHI Final ── */}
      <FadeIn>
        <Heading id="shachi-final" date="12/13">TEAM SHACHI 最終SHOW ~晴れ晴れ~ <span className="text-lg font-normal text-text/60">@ 名古屋城 二之丸広場</span></Heading>
        <div className="space-y-4">
          <p>
            名古屋城，虎魚組 TEAM SHACHI 的 Final Live。
            這麼冷的天氣的戶外 live，很難想像她們居然穿著那樣的偶像服表演。
          </p>
          <p>
            開場那句「人生50年、偶像13年8ヶ月」一下就把情緒拉滿。
            13 年 8 個月，足夠讓一個偶像團體經歷各種階段，也足夠讓聽歌的人在人生裡走過好多旅程。
          </p>
          <p>
            雖然已經很久沒關注了，當年在 2016、17 年前後，她們的很多歌都是一直 loop 陪伴讀書等等時光的愛歌，
            時間不算長，也是對應著一段很重要的回憶。
            能來這場 Final Live，其實也是很巧的緣分。
            剛好這段時間，自己也面臨重啟與準備開始新的挑戰，所以有許多歌詞跟情境都特別觸動。
          </p>
          <p>
            在寫文章的當下剛好是 4/7 虎魚的結成日，官方公開了完整的 live 影片，
            跟著眾多聊天室觀眾一起回顧真的感動又開心。
          </p>
          <p>
            驚喜的是最後マジ感謝的繞場，staff 把高台放在隔壁走道的正前方，
            從第二排真的是超近距離看著她們，太難得了。
          </p>
          <p>
            ほのか在恋人はスナイパー的手指金鯱，超鳥肌，氣場全開。
          </p>
          <p>
            最終單曲的兩首歌晴れ晴れ還有翔け抜けてスターマイン，
            歌詞旋律都超有感，我超愛，可惜沒有更多機會流傳下去了。
          </p>
          <blockquote className="border-l-2 border-warm/40 bg-surface/40 rounded-r-lg px-4 py-3 text-text-muted">
            <p className="mb-2">
              最後ほのか的 MC：如果曾經在某個人的人生裡，成為過某種存在，那就已經很滿足了。
              當偶像一般認為要 CD 賣得好、可以上節目是很好的成就，
              但是在最後大家這樣來送我，就是最幸福的。
            </p>
            <p>
              希望大家多年後回到名古屋的時候，可以想起來當年在名古屋玩得很開心。感動落淚。
            </p>
          </blockquote>
          <blockquote className="border-l-2 border-accent/40 bg-surface/40 rounded-r-lg px-4 py-3 italic text-text-muted">
            会えなくても 寂しくても<br />
            それでも地球は回ってゆく<br />
            君と僕の新しい物語をはじめよう
          </blockquote>
          <p>
            最後的畫面，四個成員站在海島邊，化作虎鯨回到大海。
          </p>
          <p>
            感謝在年尾收到這份重要的禮物。帶著這些歌、這些現場，還有那些告別與相遇的心情，我也要慢慢走向下一段旅程了。
          </p>
          <p>
            完整 live：<a href="https://www.youtube.com/watch?v=jBgRsToJGBM" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">YouTube</a>
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
            雖然很多偶像都很棒，但真的有特別情感的，還是那些跟了很多年的團。
            那種從學生時代一路聽到現在的歌，現場響起來的時候，感受完全不一樣。
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
        <p className="mt-8 text-sm text-text-muted">
          完整參戰紀錄：<a href="https://www.eventernote.com/users/HanaYukii/events" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">eventernote</a>
        </p>
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
