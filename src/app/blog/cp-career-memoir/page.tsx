import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "多年後的程式競賽選手生涯回憶錄 | 花雪 HanaYukii",
  description:
    "從計概作業太難開始刷題，到 ICPC Gold。你永遠不知道，你的興趣可以把你帶得多遠。",
  openGraph: {
    title: "多年後的程式競賽選手生涯回憶錄",
    description:
      "從計概作業太難開始刷題，到 ICPC Gold。你永遠不知道，你的興趣可以把你帶得多遠。",
    type: "article",
    images: ["/images/icpc-gold-award.jpg"],
  },
};

function Heading({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <h2 id={id} className="mb-4 mt-12 text-2xl font-bold text-warm scroll-mt-20">
      {children}
    </h2>
  );
}

export default function CpCareerMemoir() {
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
            Competitive Programming
          </span>
          <span className="rounded-full bg-warm/10 px-2.5 py-0.5 text-xs font-medium text-warm">
            Personal
          </span>
        </div>
        <h1 className="mb-2 text-3xl font-extrabold leading-tight sm:text-4xl">
          多年後的程式競賽選手生涯回憶錄
        </h1>
        <p className="mb-2 text-sm text-text-muted">持續優化中</p>
        <p className="mb-8 text-text-muted">
          你永遠不知道，你的興趣可以把你帶得多遠。但有時候，你會停在離目標只差一點的地方。
        </p>
      </FadeIn>

      <div className="prose-custom space-y-4 text-text-muted leading-relaxed [&_strong]:text-text">

        {/* ── 高中 ── */}
        <FadeIn>
          <Heading id="high-school">高中：錯過的起跑線</Heading>
          <div className="space-y-4">
            <p>
              高中過得很混，大部分時間都在打遊戲。完全沒接觸過程式競賽，甚至不知道有這個世界。
              但數學的成績還是持續維持得不錯。
              現在回想，如果高中就接觸到，可能走到的高度完全不一樣。
            </p>
          </div>
        </FadeIn>

        {/* ── 啟蒙 ── */}
        <FadeIn>
          <Heading id="start">大一：啟蒙</Heading>
          <div className="space-y-4">
            <p>
              大一時可以說是程式新手，完全不懂演算法，第一次看到正確但超時是滿頭問號的。
              計概剛好選到一個最難的老師，作業很難，想去刷題精進自己。
              我相信很有可能沒選到這堂課的話，整個發展會有巨大的變化。結果一刷就停不下來，慢慢變成興趣，也在大學後續幾年再變成生活的重心。
            </p>
            <p>
              大一上結束後，期末考程式設計就到了幾乎滿分的程度，而那門課的難度依然很高。
              大學很偏科，演算法相關的課幾乎都修到滿分，其他基礎學科就普普中上，沒有太認真顧。
            </p>
          </div>
        </FadeIn>

        {/* ── 練習日常 ── */}
        <FadeIn>
          <Heading id="training">練習日常</Heading>
          <div className="space-y-4">
            <p>
              早期主要就是大一下開始上程式競賽課、寫課程作業，偶爾在 ZeroJudge 上找幾題來寫寫。
              有時候就是在宿舍有事沒事找幾題玩玩，過程中也得到很多成就感。
            </p>
            <p>
              後期就不一樣了，幾乎參與所有主流 online judge 的線上賽——Codeforces、AtCoder，再加上 Codeforces Gym 上的競賽套題。
              世界級的線上演算法大賽也幾乎都會參加，Meta Hacker Cup、Google Code Jam / Kick Start 等等。
              各平台加起來總題數應該有突破 5000 題，但只參加比賽的話，常常累積的都是前面的簡單題。事後回想，其實應該更有策略地練，會進步得更有效率。
            </p>
            <p>
              交大的練習環境跟社群真的很好，有很多一起在進步的人和隊伍。
              雖然已經多年沒接觸了，但那段日子真的很懷念。
            </p>
          </div>
        </FadeIn>

        {/* ── 大二 ── */}
        <FadeIn>
          <Heading id="sophomore">大二到大三：持續練習</Heading>
          <div className="space-y-4">
            <p>
              陸續把競程二、三修完，也是在這時候開始練 Codeforces。持續練習題目，進步不少，沒有太多特別的事件，就是穩定地在往上爬。
            </p>
          </div>
        </FadeIn>

        {/* ── 素人起步 ── */}
        <FadeIn>
          <Heading id="underdog">素人起步</Heading>
          <div className="space-y-4">
            <p>
              交大比較容易素人出身，而台大幾乎都是高中就嶄露頭角的選手。
              大一競賽課就拿到以新人來說很不錯的表現，但當時還是遠遠比不上那些有多年經驗的人，像是交大代表隊每周練習的那些人。
            </p>
          </div>
        </FadeIn>

        {/* ── 大三 ── */}
        <FadeIn>
          <Heading id="first-icpc">大三：第一次 ICPC</Heading>
          <div className="space-y-4">
            <p>
              大三第一次參加 ICPC，當時能參加就覺得是很大的成就了。
              那時候 CF 練到了 Candidate Master（紫），兩個隊友也是 Expert（藍）的程度，但當時仍然是硬實力非常不足的隊伍。
              隊伍的投入程度沒有到最高，但還是拿到了區賽 Bronze Medal 跟 NCPC 代表隊（交大前六）。
            </p>
          </div>
        </FadeIn>

        {/* ── 大四 ── */}
        <FadeIn>
          <Heading id="senior">大四：Silver</Heading>
          <div className="space-y-4">
            <p>
              大四已經爬到穩定 Master（橙），也得到了橙名隊友。
              換了隊伍，隊友也都是大學才開始練的，但大家的投入程度比大三高很多。
              自己比較不喜歡背東西，所以很多模板都不太熟，像幾何、flow、矩陣乘法、數學題這些 topic，得利於有隊友幫我補足。
              我在隊伍中算是 code 寫比較多的，比較擅長的 topic 是圖論、DP、資料結構這些。
              當時被認為是交大第二隊，因為 hank 的隊伍是輾壓級的存在。
              那年其實沒有太把 World Finals 當目標，只希望盡量打好。
              2019 校內賽拿到第二，NCPC Rank 3。
              練著練著，開始覺得 World Finals 好像不是不可能。
              離 WF 還很遠，但覺得好像真的是有機會的現實了。
            </p>
            <p>
              同年也去了新加坡，參加俄羅斯團隊辦的頂級集訓營。
              那邊很多世界級的隊伍，我們算後段班，但跟著練還是進步很多。
            </p>
            <p>
              兩場區賽（印尼、台北）表現都有點失常，不如預期，但還是拿到了 Silver Medal。
              主要是心態問題，比賽時過於緊張，加上硬實力還是不夠。
              印尼那場比較印象深刻，自己幾乎整場卡在一題，覺得可以做出來，差點推出線段樹搭矩陣乘法，但最後還是沒做出來，沒看過這兩個東西的搭配，也是基本功不夠。
              Codeforces rating 成長得不錯了，但競賽模板題型該練得更多。
            </p>
            <p>
              也差不多是大四開始接觸一些家教，因為這個圈子介紹得到的機會蠻多的。
              陸續碰到了很多優秀的高中學生，很多現在看來也發展得不錯。
              教學也是更激勵自己認真教學相長的一環，而且練習量非常大，當時幾乎一直都有最新的東西可以教。
            </p>
          </div>
        </FadeIn>

        {/* ── 碩一 ── */}
        <FadeIn>
          <Heading id="gold">碩一：Gold 與最大的遺憾</Heading>
          <div className="space-y-4">
            <p>
              碩一，2020 校內賽第一，NCPC Rank 3，連續兩年拿到比賽獎金。區賽台北拿到 Gold Medal（Top 10）。
              我們常常測機很認真，好幾次拿測機第一，印尼也是（完全不重要）。
            </p>
            <p>
              那年跟後來進 World Finals 的學弟隊，練習來來回回，我覺得大概四六開小輸，但伯仲之間，是真的有得打的。
              我們前期打得很好，整場都在金牌線上沒掉出過，最高到第二。
              我們一直是手速上很有優勢的隊伍，也因此在 NCPC 這種相對簡單題目多的比賽特別有優勢。不過難點一直是實力不夠強，難題做出來的把握度不夠高。
              賽中有重大失誤——有一題看錯題目，有自信 code 是對的卻一直找不到問題，過了很久才發現。
              前一天失眠，比賽時又很緊張，後半段感覺思考能力完全不在線。數位 DP 是我擅長的 topic 之一，但賽中那題怎麼都想不出來。
              又因為看記分板，另一題區間 DP 通過的人比較多，我們花了太多時間在上面，最後也沒做出來。那題區間 DP 我賽後想很久，也覺得自己確實做不出來。
              但數位 DP 那題，我很有信心正常狀態的自己絕對做得出來。但那場比賽，我就是做不出來，也沒有花太多時間在它上面。
            </p>
            <p>
              最後差了一點 penalty，沒能進 World Finals。
              他們那年就打贏我們進了 WF，之後又再進了一次。
              學弟隊伍後續幾年的練習又到了更高的高度，他們高中有比較紮實的基本功。
              而交大近年似乎也比較是高中有經驗的人在打了，我們算是剛好吃到一波素人也有空間的紅利。
            </p>
            <p>
              超齡了，沒有下一次了。
              比賽剛結束的時候覺得沒什麼，不過後遺症真的很強，也是人生至今非常大的遺憾。
              不過交大真的有非常多空間，在一校只能有一隊晉級的條件下，台大存在更多這樣的失敗跟遺憾。
            </p>
            <p>
              我會認為，如果當時要準備 WF，以那時候的動力，應該很快就有機會上紅名，整體也會對自己更有自信、更積極地進步。
              但過程中也完全認知到天賦的差距。我自認小時候數學天賦不錯，一路上表現特別好的也是數學相關的東西，努力也可以補很多，但認為跟那些真正頂尖有實力的人，還是有一段差距。
            </p>
            <div className="my-4 grid gap-4 sm:grid-cols-2">
              <Image
                src="/images/icpc-practice-scoreboard.jpg"
                alt="測機記分板 — NCTU_Capooooooo 第一名"
                width={600}
                height={450}
                className="rounded-lg border border-border"
              />
              <Image
                src="/images/icpc-team-sign.jpg"
                alt="2020 ICPC Asia Taipei-Hsinchu Site — NCTU_Capooooooo"
                width={600}
                height={450}
                className="rounded-lg border border-border"
              />
            </div>
            <div className="my-4 grid gap-4 sm:grid-cols-2">
              <Image
                src="/images/ncpc-balloons.jpg"
                alt="NCPC 氣球牆"
                width={600}
                height={450}
                className="rounded-lg border border-border"
              />
              <Image
                src="/images/ncpc-contest.jpg"
                alt="NCPC 比賽現場"
                width={600}
                height={450}
                className="rounded-lg border border-border"
              />
            </div>
            <div className="my-4">
              <Image
                src="/images/icpc-gold-award.jpg"
                alt="ICPC Gold Award"
                width={600}
                height={800}
                className="mx-auto rounded-lg border border-border"
              />
            </div>
            {/* TODO: 補更多比賽細節 */}
          </div>
        </FadeIn>

        {/* ── Codeforces ── */}
        <FadeIn>
          <Heading id="codeforces">Codeforces</Heading>
          <div className="space-y-4">
            <p>
              Codeforces：International Master（max 2347），累積解題 3000+。
            </p>
            <div className="space-y-4">
              <Image
                src="/images/cf-rating.png"
                alt="Codeforces profile — International Master, max rating 2347"
                width={800}
                height={600}
                className="rounded-lg border border-border"
              />
              <Image
                src="/images/cf-stats.png"
                alt="Codeforces stats — 3234 problems solved"
                width={800}
                height={900}
                className="rounded-lg border border-border"
              />
            </div>
          </div>
        </FadeIn>

        {/* ── 研究所後期 ── */}
        <FadeIn>
          <Heading id="post-grad">研究所後期</Heading>
          <div className="space-y-4">
            <p>
              沒有打進 WF 的挫折很大，後續也沒有理由繼續高強度練習了。
              又經歷了一段沉迷遊戲的時間，整個人停了下來。
              研究所後期碰上疫情，步調更慢了，幾乎就再也很少打開那幾個競賽 OJ，頂多偶爾打打 LeetCode 賽。
              就這樣，那個階段結束了。回頭看，這也許是影響未來幾年人生走向的一大槓桿。
            </p>
            <p>
              但靠著之前累積的底子，面試 Google 的時候算是輕鬆就上了，某種程度的降維打擊。
              當時刷題的時候也並不知道這跟面試這麼相關。
              這幾年練的東西，留下了很多可以長久使用的實力。
              而在 Google 的故事，過得很不順利——那又是{" "}
              <Link href="/blog/leaving-google" className="text-primary underline underline-offset-2 hover:text-primary/80">
                另一個故事
              </Link>
              了。
            </p>
          </div>
        </FadeIn>

        {/* ── 結語 ── */}
        <FadeIn>
          <Heading id="epilogue">結語</Heading>
          <div className="space-y-4">
            <p>
              回頭看，我的人生感覺好幾次在走歪、拉回之間反覆橫跳。
              小學國中成績很好，進了不錯的高中，然後有點混，又因為程式競賽拉回來，接著又停下來，後來進了 Google 卻不順利，到現在的盡力補救。
              希望現在是個拉回的階段。剛好在調整期可以把競賽練習撿回來，加上工作上也再度用到演算法。
              雖然 AI 改變了很多生態，但我希望屬於我的高光時刻，很快再度到來。
              而這段回顧後，也確實發現自己現在經歷了一些社會打磨，多出太多無中生有的煩惱。
              這也是跟自己和解的一部分，努力把自己調整到舒適、適合自己的狀態。回歸自身最重要。
            </p>
            <p>
              你永遠不知道，你的興趣可以把你帶得多遠。而人生總是由不斷的小槓桿堆積，感謝每個機遇。
            </p>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="mt-8 flex flex-wrap gap-2 text-xs">
            {["Competitive Programming", "ICPC", "NCPC", "Codeforces", "回憶"].map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-surface px-3 py-1 text-text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </article>
  );
}
