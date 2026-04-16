import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "離開 Google 半年後的轉職紀錄 | 花雪 HanaYukii",
  description:
    "在 Google Cloud 待了三年，我最後選擇裸辭。不是因為壓力太大，甚至可以說是輕鬆的。但工作內容跟期待的落差越來越大。",
  openGraph: {
    title: "離開 Google 半年後的轉職紀錄",
    description:
      "在 Google Cloud 待了三年，我最後選擇裸辭。不是因為壓力太大，甚至可以說是輕鬆的。",
    type: "article",
  },
};

function Heading({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <h2 id={id} className="mb-4 mt-12 text-2xl font-bold text-warm scroll-mt-20">
      {children}
    </h2>
  );
}

export default function LeavingGoogle() {
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
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            Career
          </span>
          <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
            Personal
          </span>
        </div>
        <h1 className="mb-2 text-3xl font-extrabold leading-tight sm:text-4xl">
          離開 Google 半年後的轉職紀錄
        </h1>
        <p className="mb-2 text-sm text-text-muted">2026-04-06</p>
        <p className="mb-8 text-text-muted">
          一直從大學就 Google 當 dream job 在看的，沒想到三年就裸辭了。
          <br />
          不是因為壓力大，甚至可以說算輕鬆，但感覺自己停下來了。
          <br />
          畢竟是第一份工作、又是頂級企業，感受特別多。也許類似的故事在科技業到處都在發生吧。
        </p>
        <blockquote className="mb-8 border-l-2 border-primary pl-4 text-text-muted italic">
          這篇無意批評公司、團隊或任何人，遇到的人幾乎都非常好。純粹是回顧這幾年的經歷，核心想表達的是這個環境不適合當時的我。
          <br />
          會想寫這篇主要是：希望能給類似背景的人一些啟發、剛好最近弄了這個個人網站、也有很多新的體會想給自己留個紀錄。
        </blockquote>
      </FadeIn>

      <FadeIn delay={0.1}>
        <nav className="mb-12 rounded-xl border border-border bg-surface/40 p-6 backdrop-blur-sm">
          <p className="mb-3 text-sm font-bold text-text-muted uppercase tracking-wider">
            Agenda
          </p>
          <div className="space-y-2">
            {[
              { id: "background", title: "背景" },
              { id: "why-leave", title: "在 Google 的日子" },
              { id: "accumulated", title: "一路上遇到的大坎" },
              { id: "jam-protocol", title: "Side Story: JAM Protocol" },
              { id: "explore-options", title: "開始看外面的世界" },
              { id: "final-decision", title: "最後的掙扎" },
              { id: "interviews", title: "Next Step" },
              { id: "rest", title: "Side Story: 短暫的休息" },
              { id: "decision", title: "近期發展" },
              { id: "reflection", title: "走過之後的體會" },
              { id: "final-words", title: "寫在最後" },
            ].map((item, i) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="flex items-center rounded-lg px-3 py-2 text-sm transition-colors hover:bg-surface-hover"
              >
                <span className="text-text-muted mr-2">{i + 1}.</span>
                <code className="text-primary">{item.title}</code>
              </a>
            ))}
          </div>
        </nav>
      </FadeIn>

      <div className="prose-custom space-y-4 text-text-muted leading-relaxed [&_strong]:text-text">

        {/* ============ 背景 ============ */}
        <FadeIn>
          <Heading id="background">背景</Heading>
          <div className="space-y-4">
            <p>
              當初拿到 Google offer 的時候是真的當 dream job 在看的，
              完全沒想到會只待三年，而且還是用裸辭的方式離開。
            </p>
            <p>
              當時主要的優勢在演算法與 problem solving，
              ICPC Gold、Codeforces IM、LeetCode rating 台灣前幾名，
              也因為 Kick Start 成績被 Google 邀請參加 101 線下活動並面試，打進過兩次 Code Jam Round 3。
              更多資訊可以參考
              <Link href="/blog/cp-career-memoir" className="text-primary underline underline-offset-2 hover:text-primary/80">
                程式競賽生涯回憶錄
              </Link>
              。
            </p>
            <p>
              面試時間大概是離畢業還有 8 個月以上，以我的背景來說面試基本上是降維打擊，大多數題目都能在第一時間找到解法，
              甚至有一題還和面試官討論了解答外更簡潔的 0-1 BFS 作法，他也說學到新東西了。
            </p>
            <p>
              但 team match 沒有很順利，拖了很久，也讓人有點恐慌。
              對 new grad 來說，較難評估這類工作與自己長遠目標的契合度，但確實是幾個 match 過的選項中相對不喜歡的。
              當時 recruiter 表示這是目前唯一的選項，不接的話可能要等很久，很難判斷該不該堅持，最後就接了。
              現在走過之後的體會，應該更堅持自己的選擇。離畢業根本還有很充裕的時間，完全有資本繼續等。
            </p>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="my-4 grid gap-4 sm:grid-cols-2">
            <Image src="/images/google-bayview.jpg" alt="Google Bay View campus" width={600} height={400} className="rounded-lg border border-border" />
            <Image src="/images/google-g-night.jpg" alt="Google G logo at night" width={600} height={400} className="rounded-lg border border-border" />
          </div>
        </FadeIn>

        {/* ============ 為什麼離開 ============ */}
        <FadeIn>
          <Heading id="why-leave">在 Google 的日子</Heading>
          <div className="space-y-4">
            <p>
              部門做的事情很重要，和大規模基礎設施高度相關，在 AI 時代更是如此。
            </p>
            <p>
              我待的 team 比較接近 DevOps 性質，屬於 feature 的 task 非常少。
              日常大部分是 toil、on-call debug、處理 ticket 和 config 調整，真正在寫 code 的時間很少。
              這類工作對系統穩定性很關鍵，但跟我想強化的工程能力方向不太一致。
            </p>
            <p>
              什麼叫做強？我自認專長在 problem solving、邏輯跟程式設計，有超出大多數人的實力，但在一個 domain 經驗為主、偏維運的環境裡，這些完全佔不到優勢。
              如果五年前進這個組，我相信有很多舞台。不過我就是進在一個轉成維運、transfer 來台灣、資深人都在海外的時期。
            </p>
            <p>
              我不覺得一定要做演算法更相關的事情，但至少希望能多寫一些 code、
              學 C++ low-level、design pattern、參與更多實際開發。
              但在這個 team 裡這些機會很少。
              內部轉 team 也想過，但還沒升上去能選的很有限，
              也要放棄本來在 team 的數個 project 的貢獻，沒辦法確定轉過去就一定比較好，最後沒走成。
            </p>
            <p>
              經過了時間，工作也算是上手了，處理了很多 task 跟幾個 project，也算 team 上相對年資長的。
              但一直以來都很少碰到 code 跟軟體技術，這點始終沒有改變，到離開都還拿不到 readability。
            </p>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="my-4 grid gap-4 sm:grid-cols-2">
            <Image src="/images/google-halloween.jpg" alt="Google office Halloween decoration" width={600} height={400} className="rounded-lg border border-border" />
            <Image src="/images/google-celebration.jpg" alt="Google office celebration" width={600} height={400} className="rounded-lg border border-border" />
          </div>
        </FadeIn>

        <FadeIn>
          <Heading id="accumulated">一路上遇到的大坎</Heading>
          <div className="space-y-4">
            <ul className="list-inside list-disc space-y-3 text-sm">
              <li>
                <strong>升遷不順</strong>：累積的 task 量非常多，但 promote 單看量不夠，需要 impact story。
                維護型的 team 相對較難累積明確的 impact story，也沒有自己認可的 impact，升遷不順也會影響投入的動力。
                以常聽到的標準，完成兩個主要 project 就有機會升，這個在第一次提的時候其實已經達成了——每一代 server 會有很多 team 參與，每個 team 會有負責 project 的 POC，而我就是我們這邊的，完整參與了兩代，data center 裡跑著不少機器。
                而可惜的是，這兩個 project 的主要 owner 都在美國，對能見度是一個重傷。
                另一個貢獻是一個目前仍 nightly 在跑的 test infra，也不只是默默地跟 project 而已。
              </li>
              <li>
                <strong>主管更換與空窗</strong>：三年出頭換了三任，
                中間也經歷了主管離開、由部門內資深 IC 代理主管的一大段空窗期。
                代理的 IC 也在海外，加上資深人員大多也在美國，時差問題讓很多疑問沒辦法及時處理。
                離開前剛來的主管反而是最好的，蠻可惜沒機會繼續合作。
              </li>
              <li>
                <strong>Domain Knowledge</strong>：需要大量 domain knowledge，很多東西只能靠經驗慢慢背，偏偏自己對這些硬體領域又實在提不起興趣。
              </li>
              <li>
                <strong>Team 流動性高</strong>：轉 team 的人不少，雖然不確定背後原因是不是也不喜歡這裡的工作，
                但留下來的人要接更多 toil，壓力會累積。
              </li>
              <li>
                <strong>心理狀態</strong>：長期做不喜歡也不適合的事情，覺得沒有成就感、沒有 impact、沒有自己認可的成長。
                自信被消磨了很多，到後期甚至會開始懷疑，自己還有沒有在做一個工程師該做的事情。
              </li>
            </ul>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="my-4 grid gap-4 sm:grid-cols-2">
            <Image src="/images/google-dino-runner.jpg" alt="Google Dino Runner board game" width={600} height={400} className="rounded-lg border border-border" />
            <Image src="/images/google-domino.jpg" alt="Google logo domino art" width={600} height={400} className="rounded-lg border border-border" />
          </div>
        </FadeIn>

        <FadeIn>
          <Heading id="jam-protocol">Side Story: JAM Protocol</Heading>
          <div className="space-y-4">
            <p>
              越來越覺得工作上沒在成長的那段時間，因緣際會接觸到 Web3 開源生態，
              特別是 JAM Protocol 這個方向，前後參與了一段時間。
              過程中跟一群很強的人合作過，也有從頂級大企業出來的，也有在海外小公司領高薪的，技術成長比之前多太多了，也才發現自己還有很大的成長空間，不該繼續原地踏步。
            </p>
            <p>
              厲害的人跟好的機會不是只有大公司裡才有。這段經歷讓我更確定往外走的方向。
            </p>
          </div>
        </FadeIn>

        <FadeIn>
          <Heading id="explore-options">開始看外面的世界</Heading>
          <div className="space-y-4">
            <p>
              其實早就計畫好，升上去之後馬上找內轉海外的機會。無奈被 block 沒辦法進行，但客觀來說，要發展得快還是得跳槽。
            </p>
            <p>
              同一時期也開始認真 explore 外面的圈子。
              首先是發現量化交易這個領域，原來還有這種高密度 CP 人才集中的地方，覺得自己的背景在這裡可能更能發揮。
              加上對 Web3 持續有興趣，也看了不少交易所和 protocol 相關的職缺。
            </p>
            <p>
              這些職缺很多在新加坡，本身也對金融有興趣，也把往新加坡發展當成一大選項。
              另外也同時獲得我現在所在國內 AI 新創的邀請。
            </p>
            <p>
              綜合這幾點，離開從一個模糊的念頭，變成了我認真在規劃的事。
            </p>
          </div>
        </FadeIn>

        <FadeIn>
          <Heading id="final-decision">最後的掙扎</Heading>
          <div className="space-y-4">
            <p>
              長期累積的東西到這時候已經爆發了。絕對不是工作內容量上的累，但確實進入了 burnout 的狀態。
              夏天在日本 WFA 了一陣子想調整，但整個人狀態很差。
              從 GitHub 的 contribution graph 也看得出來，那段時間連開源都幾乎沒有動力碰。
            </p>
            <p className="my-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/github-contributions.png"
                alt="GitHub contribution graph — 夏天幾乎空白"
                className="rounded-lg border border-border"
              />
            </p>
            <p>
              決定離開前，跟主管多次溝通。他分享了自己的經驗：
              遇到人生卡住的時候他會認真去找新的機會。他也有推薦我在內部找。
            </p>
            <p>
              主管對我真的很不錯，就算我曾多次表示想離開了，他還是願意幫我提 promote。
              Promotion package 也準備了，也拿到數個資深 IC 支持。前一次是過度自信，覺得累積的 project 夠了，這次準備得更徹底充分。
            </p>
            <p>
              但在 Google 的制度下一切都不好說，最終沒有提也是因為不想為難主管跟 team，
              因為我內心早就決定不管有沒有過我都要走了，而且應該是公司外的機會。
              就算要回歸也應該不會是短期內，升不升對我來說不會有太大影響。
            </p>
            <p>
              在 FAMIEN2025 富士山山中湖的 live，一邊看演出一邊想著自己的事，live 很享受，但心裡也想了很多。最後在那裡下了決定。
            </p>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="space-y-4">
            <p>
              加上心理狀態確實需要休息，隔週就提出辭職，雖然手上有選項，但沒有確定 next step 就離開了。
            </p>
          </div>
        </FadeIn>

        {/* ============ 面試過程 ============ */}
        <FadeIn>
          <Heading id="interviews">Next Step</Heading>
          <div className="space-y-4">
          <p>
            找 next step 的方向很明確：要有成長空間、能發揮技術的中小型團隊。
            手上已經有 AI 新創的選項，同時我對出國也有一些憧憬，所以陸續面了幾家新加坡的 Crypto 交易所和量化交易公司。
            面試內容跟一般 backend 面試不太一樣，有算法題但也有更多 low-level 的東西：
            low-level、modern C++、OS 等等知識點。
          </p>
          <p>
            最想去的就算是公認最頂級的那幾家量化都沒有拿到，有一些其他 offer，但經過蠻長一段時間的多方綜合考慮，最終還是去了一開始就有的新創。
            一大原因是覺得自己的心態還在需要調適的階段，而且新創給的條件不錯，TC 跟我預期隔年留在 Google 的數字有競爭力，bonus 和股權更是有潛在的 upside。跟熟人合作也更有彈性。
            C++ low-level 知識當時確實有不足的地方，這也是後來花時間補強的方向。
            我也在想，真的去了頂級量化，以當下的狀態也許會有更大的壓力把我壓垮，不一定更好。
          </p>
          <p>
            不過其中兩場後來整理成了{" "}
            <Link href="/blog/cpp-interview-performance-analysis" className="text-primary hover:underline">
              C++ 效能面試
            </Link>
            {" "}和{" "}
            <Link href="/blog/cpp-inplace-vector" className="text-primary hover:underline">
              手寫 inplace_vector
            </Link>
            。這段準備的經驗讓我對 C++ 的理解加深很多，更認識 modern C++。這些我相信未來都還有機會用上。
          </p>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="my-4 grid gap-4 sm:grid-cols-2">
            <Image src="/images/google-city-view.jpg" alt="City view" width={600} height={400} className="rounded-lg border border-border" />
            <Image src="/images/google-singapore.jpg" alt="Google Singapore entrance" width={600} height={400} className="rounded-lg border border-border" />
          </div>
        </FadeIn>

        <FadeIn>
          <div className="my-4 grid gap-4 sm:grid-cols-2">
            <Image src="/images/google-japan-food.jpg" alt="Google Japan office food" width={600} height={400} className="rounded-lg border border-border" />
            <Image src="/images/google-japan-cielo.jpg" alt="Google Japan CIELO cafe" width={600} height={400} className="rounded-lg border border-border" />
          </div>
        </FadeIn>

        <FadeIn>
          <Heading id="rest">Side Story: 短暫的休息</Heading>
          <div className="space-y-4">
          <p>
            確定 next step 後，決定年初再上班，也當是新的一年、嶄新的開始。中間在日本玩了一個多月，
            除了旅遊也看了多場 live，去了不少沒去過的地方，累積了不少嶄新的體驗。
          </p>
          <p>
            其中最深刻的是{" "}
            <Link href="/blog/idol-2025" className="text-primary hover:underline">
              TEAM SHACHI 的 final live
            </Link>
            。
          </p>
          <p>
            很慶幸可以在她們解散前，再度認識並喜歡上這個多年前曾經喜歡的團體，而且也看到她們的狀態依然很棒，同時也聽到了很多懷念的歌，連結了學生時代的回憶。
          </p>
          <p>
            台上是她們的終點，台下的我也剛好在跟過去的一個階段告別。
            這種跨時空的回憶連結，總是特別容易戳到我的點。
            很多不甘心、很多卡住的情緒，至今每次回想起來也總是讓我眼眶濕潤。
          </p>
          </div>
        </FadeIn>

        {/* ============ 最後的選擇 ============ */}
        <FadeIn>
          <Heading id="decision">近期發展</Heading>
          <div className="space-y-4">
            <p>
              這家新創目前還在 early stage，細節不方便多說。
              但擔任了重要的技術職位，做的事情跟演算法和 AI 都有關。
            </p>
            <p>
              事後半年走過之後的體會，這份工作完全給了我當時想要的東西，也完全找回了野心與自信：
            </p>
            <ul className="list-inside list-disc space-y-2 text-sm">
              <li>有機會從零開始建系統，參與的面向比以前廣很多</li>
              <li>每天都在寫 code，產出密度跟過去完全不同</li>
              <li>技術選型、開發流程都有空間參與和影響</li>
              <li>AI 工具的使用自由度更大</li>
            </ul>
            <p>
              當然新創永遠有失敗的可能，但能作為早期員工加入一家資金充足的新創，這種機會實在太難得了，我覺得我必須抓住。
              現實也是，在大公司處理 toil 可能就默默幫公司的 fleet 間接增加大量收入，而新創做了很多事，短時間也還沒辦法看到具體的現金流。
              但對我來說，成長的密度跟做事的感覺完全不同。
            </p>
          </div>
        </FadeIn>

        {/* ============ 走過之後的體會 ============ */}
        <FadeIn>
          <Heading id="reflection">走過之後的體會</Heading>
          <div className="space-y-4">
            <p>
              從結果看有很多不甘心。但走過之後才知道，那些不甘心反而是推自己往前走的力量。
            </p>
            <p>
              穩穩待著的話，其實可以預見一個很穩定、收入還不錯的未來。但自己就是不甘心只走這條線，骨子裡的 ego 還是想把人生的 variance 拉高一點。
            </p>
            <p>
              離開 Google 這個決定，不能說完全沒有懷疑，也許多年後才會知道答案。
            </p>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="space-y-4">
            <ul className="list-inside list-disc space-y-3 text-sm">
              <li>
                <strong>Team 比公司重要</strong>：MAG7 等頂級巨頭都很大，有好 team 也有不適合的 team，
                分到哪裡是緣分、選擇、也是運氣。我的 match 不太理想，也跟自己當時的判斷有關。
                小小的決定會帶來很大的槓桿，有點像選系沒選好、後來想轉系的感覺。
              </li>
              <li>
                <strong>多探索機會</strong>：多探索不同的機會，每次都會帶來意想不到的收穫。
                準備量化面試補了 C++ low-level，參與開源學到了 Go 和 Rust，探索 Web3 和 AI 新創讓我看到更多可能性。這些經驗全都不會浪費。
              </li>
              <li>
                <strong>意識個人狀態</strong>：工作上感覺不對的時候就該認真面對，不要等。
                同期進 Google 的類似背景同儕有人很早就果斷換了，我覺得那種對自己狀態的敏感度很重要。
                長期的影響比想像中深，現在還在慢慢調整。
              </li>
              <li>
                <strong>少比較</strong>：這個圈子有不少比較的氛圍：股價、TC、升遷，永遠比不完。
                待久了確實深受影響，徒增很多不必要的焦慮。離開之後也在慢慢調整，試著把注意力放回自己身上。
              </li>
              <li>
                <strong>職場現實</strong>：大公司人來人往，升完再走根本沒人會多想，這也完全是非常多人在做的事。當時太在乎人情世故反而虧了自己，該拿的東西還是要先拿，尤其是在一切準備完成只需要多等幾個月的情況下。
              </li>
            </ul>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="space-y-4">
            <p>
              離開之後的日子很充實 — 同時在跑演算法、C++、家教、AI、學日文報名了 N1、多運動，也做了這個個人網站。
            </p>
            <p>
              Codeforces 也撿回來認真打了，紅名是學生時期沒能達成的目標，現在重新給自己設的。
            </p>
            <p>
              對我來說多線發展不是分心，是在能應付的範圍內盡可能探索更多可能。演算法、AI、Web3、教學，每條線都讓我從不同角度理解問題。這也正是在 AI 時代才做得到的 leverage。也一直 open to 有趣的 side project 跟合作。
            </p>
            <p>
              也在導正自己長期以來的缺點，讓自己的生活跟心態都慢慢走向更好的地方。
            </p>
          </div>
        </FadeIn>

        <FadeIn>
          <Heading id="final-words">寫在最後</Heading>
          <div className="space-y-4">
            <p>
              離開的過程中，也經歷了一段對失去大公司光環的衝擊，好像少了什麼能證明自己的東西。
              後來慢慢意識到，自己過去太習慣用外在標籤來確認價值，像是公司名、title、升遷進度。
            </p>
            <p>
              像 Jane Street 這種等級的公司，我甚至是去年才第一次聽到。世界上最頂級的地方也未必有大眾知名度，反過來說，在一間沒什麼名氣的公司也不代表什麼。想通這點之後比較能跟自己和解了。
              比較心態不會一天消失，但至少現在可以確信，是走在進步的路上。
            </p>
            <p>
              這段經驗雖然有很多不美滿的地方，總體來說還是有不少不錯的經歷：
              到灣區出差、使用各國頂級辦公室跟福利、跟頂尖的人合作、
              跟多家 big name 公司作為客戶端的合作經驗，也大幅提升了英文能力。
              未來也可能還有新的合作機會。
              走過之後，這段經歷讓我更認識自己，也更清楚自己要什麼。
            </p>
            <p>
              近期從外界消息聽說原本的 org 在台灣擴編，發展得不錯。有種倒在黎明前的感覺，難免會想如果做了不同選擇結果會不會不一樣。當時 org 在台灣很多東西都還在發展初期，有不少這篇沒細提的問題，也許就是在不對的時機點進去了。但人生很多經驗就是差那麼一點，既然做了決定就對它負責。
            </p>
            <p>
              感謝這一路上遇到的人。聽我訴苦的、給我方向的、一直以來的 role model，都謝謝你們。
            </p>
            <p className="mt-6 text-center text-lg font-medium text-primary/80 italic">
              Starmine, still becoming.
            </p>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="mt-8 flex flex-wrap gap-2 text-xs">
            {["Career", "Google", "轉職", "裸辭", "新創", "HFT", "面試"].map((tag) => (
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
