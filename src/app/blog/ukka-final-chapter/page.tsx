import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "ukka Final Chapter | 花雪 HanaYukii",
  description:
    "看完 ukka Final Chapter 後的感想。很多老粉懷念的是過去十年，而我捨不得的是這一年才剛開始發生的故事。",
  openGraph: {
    title: "ukka Final Chapter",
    description:
      "看完 ukka Final Chapter 後的感想。",
    type: "article",
  },
};

const C = {
  emma: "#F4A03B", // 桜井えま
  rina: "#E53935", // 結城りな
  suu: "#38BDF8", //  涼海すう
  ruri: "#A78BFA", // 葵るり（紫）
};

function M({ color, children }: { color: string; children: React.ReactNode }) {
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

export default function UkkaFinalChapter() {
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
            Live
          </span>
          <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
            Life
          </span>
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight">
          ukka Final Chapter
        </h1>
        <p className="mb-8 text-sm text-text-muted">2026-05-25</p>
      </FadeIn>

      <FadeIn>
        <section className="space-y-4 leading-relaxed text-text-muted">
          <p>
            看完 ukka（蝦中的妹團）Final Chapter，
            最強烈的感受其實不是難過，是不甘心。
          </p>
          <p>
            不是單純捨不得。更像是能感覺到她們其實還想繼續。
          </p>
          <p>
            從 MC、blog 到 live 結束後的發文，都看得出來那種
            「還想繼續」、「還想去更大的地方」、「只是力量還不夠」的情緒。
          </p>
          <p>
            跟去年看 TEAM SHACHI Final 完全是兩種感覺。
            但 SHACHI 不是這篇的主角，我想先說 ukka 的故事。
          </p>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="mt-8 space-y-4 leading-relaxed text-text-muted">
          <p>
            超とき宣（超ときめき♡宣伝部）有一首〈画面越しのエンジェル〉，
            唱著「永永永遠のエンジェル、令令令和にときめいて」。
            底下有一則留言我印象很深：
            「令和にときめいてるのは平成から頑張ってきたからだよね」。
          </p>
          <p>
            我第一個想到的卻是：ukka 不也是從平成一路努力過來的嗎？
          </p>
          <p>
            とき宣 跟 ukka 同屬 Stardust、2015 年同期出道（ukka 當年還叫 桜エビ〜ず），
            一起從平成走到令和，最後卻迎來完全不同的結局。
            一個終於迎來 ときめき 的時刻，一個卻要走到終點了。
          </p>
        </section>
      </FadeIn>

      {/* 入口 · アイドル予選会と結城りな */}
      <FadeIn>
        <SectionHeading id="entry">入口 · アイドル予選会と結城りな</SectionHeading>
      </FadeIn>

      <FadeIn>
        <section className="space-y-4 leading-relaxed text-text-muted">
          <p>
            最早接觸 ukka 其實是 2025/8 FAMIEN 前幾天的 アイドル予選会。
          </p>
          <p>
            前一年看過片段就覺得這活動很有趣，所以這次直接跑去現場。
            其實去之前就很想看 <M color={C.rina}>りな</M> 奪冠，前一年她太可惜了；
            蝦中派出的風見也想看看。
          </p>
          <p>
            雖然坐在蝦中應援席，不過風見個人不怎麼推；
            她前期就被拉開，中後期心裡其實都在幫{" "}
            <M color={C.rina}>結城りな</M> 加油。
          </p>
          <p>
            到後段整個應援席其實也都在幫{" "}
            <M color={C.rina}>りな</M> 加油。
            兩團是姐妹團，應援席就在隔壁，粉絲互相加油。
            風見跟 <M color={C.rina}>りな</M> 在比賽裡還有兩個項目直接對上，
            都是 <M color={C.rina}>りな</M> 贏。
            到後來甚至有種全場都想看 <M color={C.rina}>りな</M> 贏一次的氣氛。
          </p>
          <p>
            前一年 <M color={C.rina}>りな</M>{" "}
            長跑完太累、過呼吸需要休息，放棄了一個項目。
            照總成績算其實是實質第一，連敢鬥賞也沒發給她。
            所以這次真的很希望她能雪恥。
          </p>
          <p>
            看到她真的拿下冠軍、帶著獎盃繞場跑的那一刻，
            比自己預期還要感動很多。
          </p>

          <div className="mt-2 aspect-video w-full overflow-hidden rounded-xl border border-border">
            <iframe
              src="https://www.youtube.com/embed/Jvay5W0wsGM"
              title="SASUKE アイドル予選会 2025 — final 3 (大信田美月 / 涼海すう / 結城りな)"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              className="h-full w-full"
            />
          </div>

          <p>
            大概就是從這場開始，我才真的開始追 ukka。
          </p>
          <p>
            （同場還有 <M color={C.suu}>涼海すう</M>，整場表現都很突出，又超級可愛，
            也是那時候認識的，開啟了我推高貓的契機。雖然最後一關可能因為身高吃虧、
            加上太謹慎，最後甚至沒能進前三。）
          </p>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="space-y-4 leading-relaxed text-text-muted">
          <p>
            予選会之後，看她在 SASUKE 跟 KUNOICHI 上的表現，越看越喜歡。
          </p>
          <p>
            後來常常在留言看到類似的話：
            「結城りなさんのSASUKEとKUNOICHIでの活躍でukkaを知りました」
            ——看來不只我這樣。
          </p>
          <p>
            一開始是被她的表現吸引，後來才發現讓人喜歡的地方遠不只這些。
          </p>
          <p>
            學業跟偶像活動都兼顧得很好，明明是比較後期加入的成員，
            卻總給人一種很可靠的感覺；不管是節目、訪談還是現場，
            都能感受到那種很自然的親和力。
          </p>
          <p>看得越久，越會想替她加油。</p>
          <p>
            後面又看了幾次拼盤，包括台灣的一場。
            當年剛好出了些事、心情打擊滿大的，
            沒去到 ukka 的特典会有點遺憾。
          </p>
          <p>還是一點一點累積對 ukka 的感情。</p>
          <p>說真的，沒有 <M color={C.rina}>りな</M>，我大概不會這麼快開始注意 ukka。</p>
          <p>
            那場預選会，<M color={C.rina}>りな</M> 的應援成員裡其實就有{" "}
            <M color={C.ruri}>葵るり</M>。當時我對 ukka 幾乎一無所知，
            只知道她站在旁邊幫 <M color={C.rina}>りな</M> 加油，
            不知道兩人是四年半前一起加入的同期，從那時候一起走到現在。
          </p>
          <p>
            後來補 blog、看訪談才慢慢拼起來。再回頭看那場預選会，
            看到的就不只是一場比賽了。
          </p>
          <p>
            跟朋友也更常聊到 ukka，期待明年再找機會多看幾場。
          </p>
        </section>
      </FadeIn>

      {/* 解散発表 · Aonity */}
      <FadeIn>
        <SectionHeading id="aonity">解散発表 · Aonity</SectionHeading>
      </FadeIn>

      <FadeIn>
        <section className="space-y-4 leading-relaxed text-text-muted">
          <p>2025/12/28，宣布解散。</p>
          <p>
            同一天 AMEFURASSHI、Lumi Union 也一起發表解散。
            Stardust 的女子偶像部門，一下少了一大半。
          </p>
          <p>
            幾天後 12/31，武道館的 ももいろ歌合戦，她們唱了〈Aonity〉。
          </p>

          <div className="mt-2 aspect-video w-full overflow-hidden rounded-xl border border-border">
            <iframe
              src="https://www.youtube.com/embed/2Xy2LZ8oLOQ"
              title="ukka 「Aonity」 LIVE @ ももいろ歌合戦 武道館 (2025/12/31)"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              className="h-full w-full"
            />
          </div>

          <p>
            〈Aonity〉是 8 月才出的新歌，10 週年專輯《青春小節〜約束と衝動〜》的先行曲。
          </p>
          <p>
            它出的時候，誰也不會把它當成告別曲。那是一首寫給未來的歌。
            偏偏幾個月後就宣布解散，它於是變成了告別曲。
            現在回頭再聽，很多原本寫給未來的歌詞，都變得像是在告別。
          </p>
          <p>
            或許這也是為什麼 Final 之後，我反而更常回去聽它。
            要選一首我最喜歡的 ukka 歌，我會選〈Aonity〉。
          </p>
        </section>
      </FadeIn>

      {/* えま、りな、えびukka */}
      <FadeIn>
        <SectionHeading id="ebi-ukka">
          <M color={C.emma}>えま</M>、<M color={C.rina}>りな</M>、えびukka
        </SectionHeading>
      </FadeIn>

      <FadeIn>
        <section className="space-y-4 leading-relaxed text-text-muted">
          <p>
            蝦中跟 ukka 睽違 8 年的 two-man live，也是最後一次。2026/5/12，
            Final Chapter 前 12 天。
          </p>
          <p>
            去年太喜歡 えびシャチ（蝦中 × 虎魚組）了，
            覺得這場 えびukka 也該去一下，不該留遺憾。
          </p>
          <p>
            <M color={C.emma}>えま</M> 跟 <M color={C.rina}>りな</M>{" "}
            本來就有交情，<M color={C.emma}>えま</M> blog 寫過幾次跟{" "}
            <M color={C.rina}>りな</M> 吃飯。
            「她們關係好」這件事我早就知道——
            但其實兩人也只有在這場真正同台過。
          </p>
          <p>
            本來只知道兩人感情好，現場看了才發現，
            台上台下那些小互動真的很可愛。
          </p>
        </section>
      </FadeIn>

      {/* Final Chapter */}
      <FadeIn>
        <SectionHeading id="final">Final Chapter</SectionHeading>
      </FadeIn>

      <FadeIn>
        <section className="space-y-4 leading-relaxed text-text-muted">
          <p>2026/5/24。</p>
          <p>
            整場很多催淚回顧橋段。
            但對我來說，最有感的反而是：
          </p>
          <p className="text-text">
            突然意識到，我自己認識的 ukka，已經是最後一章了。
          </p>
          <p>
            不是她們沒努力，也不是失去了熱情。
            正因為都還想繼續往前，才更讓人不甘心。
          </p>
        </section>
      </FadeIn>

      {/* 新歌跟老歌 */}
      <FadeIn>
        <SectionHeading id="songs">新歌跟老歌</SectionHeading>
      </FadeIn>

      <FadeIn>
        <section className="space-y-4 leading-relaxed text-text-muted">
          <p>有件很有趣的事。</p>
          <p>我熟的 ukka 幾乎都是新歌。</p>
          <p>
            Final 那天很多人在老歌前奏一下就開始歡呼，
            我反而常常是第一次認真現場聽到。
            〈Re:RAY〉、〈Aonity〉這些歌，才是我腦海裡最先浮現的 ukka。
            最喜歡的是〈Aonity〉。
          </p>
          <p>
            去年看 SHACHI 完全相反。熟的幾乎都是老歌。
            每首歌都會連到某個年代、某段回憶、某場演唱會。
            雖然當年沒什麼機會衝現場，不過也都是滿滿回憶。
          </p>
          <p>
            像〈ULTRA 超 MIRACLE SUPER VERY POWER BALL〉、〈抱きしめてアンセム〉
            這些老歌就是熟、很愛的那種。新歌〈沸き曲〉也超喜歡。
          </p>
          <p>
            有趣的是，〈Re:RAY〉跟 SHACHI 的〈晴れ晴れ〉剛好都是 youth case 寫的，
            發行只差一週，後來也都成了象徵各自團體走到終點的那首歌。
            連歌詞意境都有點像，都在唱一路走過的那段長長的歷史。
          </p>
          <p>
            單看歌，我未必說得出哪首比較好。但對我來說，〈晴れ晴れ〉還是更有感觸。
          </p>
          <p>
            或許不是因為歌本身，而是因為我陪 SHACHI 走過更長的時間。
            聽〈晴れ晴れ〉，腦中會浮現 チームしゃちほこ 時代、武道館、橫濱 Arena、
            名古屋城 Final 那些畫面。
          </p>
          <p className="text-text">
            很多人透過〈Re:RAY〉回顧十年。而我聽〈Re:RAY〉的時候，卻還在認識這十年。
          </p>
        </section>
      </FadeIn>

      {/* 兩種遺憾 */}
      <FadeIn>
        <SectionHeading id="comparison">兩種遺憾</SectionHeading>
      </FadeIn>

      <FadeIn>
        <section className="space-y-4 leading-relaxed text-text-muted">
          <p>
            SHACHI 站過武道館（兩次）、橫濱 Arena、日本ガイシホール，
            最後在名古屋城辦戶外 Final。看過很多風景。
          </p>
          <p>
            那場 Final 更像是「我們一起走到了終點」。
            成員的致詞雖感傷，但沒有不甘心、想繼續的感覺。
          </p>
          <p>
            ukka 給我的感覺則是「好像才剛找到方向」。
          </p>
          <p>兩種遺憾完全不一樣。</p>
        </section>
      </FadeIn>

      {/* 沒有答案 */}
      <FadeIn>
        <SectionHeading id="closing">沒有答案</SectionHeading>
      </FadeIn>

      <FadeIn>
        <section className="space-y-4 leading-relaxed text-text-muted">
          <p>如果再多一年呢？</p>
          <p>如果 えびukka 早幾年實現呢？</p>
          <p>如果 アイドル予選会 再成功一點呢？</p>
          <p>
            Final 結束後看留言、看 blog、看訪談，
            好像每個人心裡都有自己的一個 if。
          </p>
          <p>這些問題永遠不會有答案。</p>
          <p>
            回頭看，剛認識 ukka 的那段時間，剛好也是自己狀態很差的時候。
            現在好多了，看這些的角度，可能也不太一樣了。
          </p>
          <p>
            去年年底宣布解散前，我還跟朋友聊到 ukka，
            說明年想找機會多看幾場。沒想到那時候已經離結尾不遠了。
          </p>
          <p>
            不過最後有件事讓我滿開心的：<M color={C.rina}>りな</M> 跟{" "}
            <M color={C.ruri}>るり</M> 都沒有退所。
          </p>
          <p>
            我是因為 <M color={C.rina}>りな</M> 才開始注意 ukka 的。而{" "}
            <M color={C.ruri}>るり</M>，是認識之後才慢慢喜歡上、
            到 Final 結束後反而最常想起的一個。
          </p>
          <p>
            至少現在，還不用把這次當成最後一次見面。
            要是哪天又有新的舞台、新的故事，我大概還是會想去看。
          </p>
          <p>ukka 的故事可惜是結束了。但還好，有些人的故事還會繼續。</p>
        </section>
      </FadeIn>

      {/* 附錄: 場次 */}
      <FadeIn>
        <div className="mt-12 rounded-xl border border-border bg-surface/30 px-6 py-5">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.15em] text-primary">
            / 附錄 · 場次
          </p>
          <ul className="space-y-2 text-sm text-text-muted">
            <li>
              <span className="inline-block w-36 text-text-muted/70">
                2025/8/13
              </span>
              SASUKE アイドル予選会 2025 @ LaLa arena TOKYO-BAY
            </li>
            <li>
              <span className="inline-block w-36 text-text-muted/70">
                2025/10/10–11
              </span>
              IDOL KINGDOM TAIPEI 2025（拼盤）@ 統一時代百貨夢廣場
            </li>
            <li>
              <span className="inline-block w-36 text-text-muted/70">
                2026/1/10
              </span>
              フリーライブ @ クイーンズスクエア横浜
            </li>
            <li>
              <span className="inline-block w-36 text-text-muted/70">
                2026/5/9
              </span>
              ワンマン「Spread Your WINGS」@ Lives NAGOYA
            </li>
            <li>
              <span className="inline-block w-36 text-text-muted/70">
                2026/5/12
              </span>
              私立恵比寿中学 × ukka ツーマン @ Zepp Haneda
            </li>
            <li>
              <span className="inline-block w-36 text-text-muted/70">
                2026/5/24
              </span>
              ukka ラストライブ「Final Chapter」 @ Kanadevia Hall
            </li>
          </ul>
        </div>
      </FadeIn>

      <FadeIn>
        <div className="mt-12 border-t border-border/30 pt-6 text-sm text-text-muted">
          相關：
          <Link
            href="/blog/oshi-list"
            className="ml-1 text-primary hover:underline"
          >
            推し清單
          </Link>
          {" · "}
          <Link
            href="/blog/idol-2025"
            className="text-primary hover:underline"
          >
            2025 偶像現場全紀錄
          </Link>
        </div>
      </FadeIn>
    </article>
  );
}
