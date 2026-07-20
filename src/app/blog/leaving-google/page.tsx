import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { articleMetadata } from "@/lib/seo";
import PostJsonLd from "@/components/PostJsonLd";
import RelatedPosts from "@/components/RelatedPosts";

export const metadata: Metadata = articleMetadata("/blog/leaving-google", {
  title: "離開 Google 半年後的轉職紀錄 | 花雪 HanaYukii",
  description:
    "在 Google Cloud 待了三年後裸辭。工作量不算大，但內容跟期待的落差越來越大，最後決定去早期 AI 新創。",
  openGraph: {
    title: "離開 Google 半年後的轉職紀錄",
    description:
      "在 Google Cloud 待了三年後裸辭，休息一段時間，再去早期 AI 新創。",
    type: "article",
  },
});

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
      <PostJsonLd href="/blog/leaving-google" />
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
        <h1 className="mb-2 text-3xl font-bold leading-tight sm:text-4xl">
          離開 Google 半年後的轉職紀錄
        </h1>
        <p className="mb-2 text-sm text-text-muted">2026-04-06</p>
        <blockquote className="mb-8 border-l-2 border-primary pl-4 text-text-muted italic">
          這篇純粹回顧這幾年，無意批評任何人——遇到的人幾乎都很好，只是這個環境不適合當時的我。
        </blockquote>
      </FadeIn>

      <FadeIn delay={0.1}>
        <nav className="mb-12 rounded-xl border border-border bg-surface/40 p-6">
          <p className="mb-3 text-sm font-bold text-text-muted uppercase tracking-wider">
            Agenda
          </p>
          <div className="space-y-2">
            {[
              { id: "background", title: "背景" },
              { id: "why-leave", title: "在 Google 的日子" },
              { id: "accumulated", title: "遇到的幾個坎" },
              { id: "explore-options", title: "往外找機會" },
              { id: "final-decision", title: "下決定" },
              { id: "interviews", title: "Next Step" },
              { id: "decision", title: "近期發展" },
              { id: "reflection", title: "離開之後" },
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
              一直以來的優勢在邏輯、數學與頂級的實作能力，
              ICPC Gold、Codeforces IM、LeetCode rating 台灣前幾名，
              也因為 Kick Start 成績被 Google 邀請參加 101 線下活動並面試，打進過兩次 Code Jam Round 3。
              更多資訊可以參考
              <Link href="/blog/cp-career-memoir" className="prose-link">
                程式競賽生涯回憶錄
              </Link>
              。
            </p>
            <p>
              面試時間大概是離畢業還有 8 個月以上，當時是大徵才的時代，面試強度本來就不高，以我的背景更是降維打擊，大多數題目我都能在第一時間找到解法，
              甚至有一題還和面試官討論了解答外更簡潔的 0-1 BFS 作法。
              這也是我後續有底氣裸辭的本錢。
              即使到了 2026 的現在，環境更硬，但靠當初培養的硬實力，不特別練，想再回去應該依然不是大問題。
            </p>
            <p>
              但當時 team match 沒有很順利，拖了很久，也讓人有點恐慌。
              對 new grad 來說，較難評估這類工作與自己長遠目標的契合度，也缺乏比較好的對象可以諮詢，但確實是幾個 match 過的選項中相對不喜歡的。
              當時 recruiter 表示這是目前唯一的選項，不接的話可能要等很久，很難判斷該不該堅持，最後就接了。
              現在走過之後的體會，應該更堅持自己的選擇。離畢業根本還有很充裕的時間，完全有資本繼續等。而我這三年的痛苦，就這樣成了 recruiter 的業績。
            </p>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="my-4 grid gap-4 sm:grid-cols-2">
            <Image src="/images/google-bayview.jpg" alt="Google Bay View campus" width={600} height={400} className="rounded-lg border border-border" />
            <Image src="/images/google-g-night.jpg" alt="Google G logo at night" width={600} height={400} className="rounded-lg border border-border" />
          </div>
        </FadeIn>

        <FadeIn>
          <div className="mb-8 rounded-xl border border-primary/30 bg-primary/5 p-4">
            <p className="text-sm text-text-muted">
              <span className="font-bold text-primary">TL;DR：</span>
              有不少人以為我還在待業，或是轉去量化了。實際上目前在一家 AI 新創，負責重要的技術工作，做的事情跟演算法和 AI 都有關。公司細節因為還在 early stage 暫時先不公開，時機合適會再分享，也有機會公開招募。
            </p>
          </div>
        </FadeIn>

        {/* ============ 為什麼離開 ============ */}
        <FadeIn>
          <Heading id="why-leave">在 Google 的日子</Heading>
          <div className="space-y-4">
            <p>
              這三年最大的問題，就是<strong>沒有舞台</strong>。
            </p>
            <p>
              部門本身很重要，做的是大規模基礎設施——但那是部門的價值，跟我能不能成長是兩回事。我待的 team 偏 DevOps 性質，feature task 非常少，日常就是 toil、on-call、ticket、config，真正在寫 code、甚至連碰 code 的時間都很少。這種工作對系統穩定性很關鍵，但跟我想追求的實力培養、技術成長，完全沾不上邊。
            </p>
            <p>
              我的強項一直是 problem solving、邏輯與程式設計；多年競賽練出的直覺和深度，跟面試前臨時刷題完全是兩個層次。但在一個吃 domain 經驗、零演算法、連 code 都碰得很少的環境，這些根本派不上用場。早五年進這個組，當時還有大量 feature 設計、快速迭代開發，我相信有的是舞台——偏偏我進的，正是它轉維運、transfer 來台灣、資深人全在海外的時期。
            </p>
            <p>
              內部轉組也想過，想找個能真正碰技術的位置，但還沒升上去能選的有限，又得放棄手上幾個 project 的累積，也賭不準轉過去就一定更好，最後沒走。
            </p>
            <p>
              時間久了，工作是上手了，處理過不少 task 和 project，在 team 上也算資深。但很少碰 code 和軟體技術這件事從頭到尾沒變——到離開，我連 C++ readability 都還沒拿到。對一個長年寫大量 C++ 的人，這荒謬至極；這東西在很多 team，半年就該到手了。
            </p>
            <p>
              軟體技術碰得少，這裡累積的技能延展性也差，幾乎只有做同領域才帶得走；那些 domain knowledge，以後大概也不會再用。這三年，我自己覺得比較像人生按了暫停鍵。
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
          <Heading id="accumulated">遇到的幾個坎</Heading>
          <div className="space-y-4">
            <ul className="list-inside list-disc space-y-3 text-sm">
              <li>
                <strong>成就感逐漸減少</strong>：幾年裡參與了兩代 server 的 POC，也交付過長期運行的 test infra，確實累積了不少經驗。但隨著工作重心慢慢轉向維運與協調，我越來越難從日常任務中得到原本期待的成就感。
              </li>
              <li>
                <strong>跨時區協作</strong>：許多合作對象都在海外，時差讓討論與決策需要更長的往返。這不是誰的問題，只是團隊的工作方式和我當時想要的節奏不太一致；我開始期待能更靠近產品與使用者，也能更快把想法做成結果的環境。
              </li>
              <li>
                <strong>Domain Knowledge</strong>：需要大量 domain knowledge，很多東西只能靠經驗慢慢背，而我確定自己未來不會走這個領域，沒有心去補足這部分知識。
              </li>
              <li>
                <strong>Team 變動較多</strong>：團隊成員與分工幾次調整後，留下來的人需要承接更多維運工作。
                這些變化讓我重新思考，自己下一階段想把時間投入在哪一類問題上。
              </li>
              <li>
                <strong>心理狀態</strong>：長期做不喜歡也不適合的事情，覺得沒有成就感、沒有自己認可的成長，也對自己的定位有些動搖。
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
          <Heading id="explore-options">往外找機會</Heading>
          <div className="space-y-4">
            <p>
              越來越覺得工作上沒在成長的那段時間，因緣際會接觸到 Web3 開源生態，
              特別是 JAM Protocol 這個方向，前後參與了一段時間。
              過程中跟一群很強的人合作過，也有從頂級大企業出來的，也有在海外小公司領高薪的，技術成長比之前多太多了，也才發現自己還有很大的成長空間，不該繼續原地踏步。
            </p>
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
          </div>
        </FadeIn>

        <FadeIn>
          <Heading id="final-decision">下決定</Heading>
          <div className="space-y-4">
            <p>
              長期累積的東西到這時候一起爆發了。工作量其實不大，但我確實 burnout 了。
              夏天在日本 WFA 了一陣子想調整。
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
              決定離開前，我和團隊及身邊的人談過很多次。有人提醒我，
              覺得人生卡住時，可以認真看看不同的機會；也有人建議我先了解公司內部的選項。
            </p>
            <p>
              我很感謝大家願意陪我把各種可能性攤開來談。
              聊完之後，我還是覺得單純換專案或 team 不夠。
              我想試的是工作方式完全不一樣、自己也能負責更多事情的地方。
            </p>
            <p>
              所以最後還是往公司外找。沒有哪一件事或哪一個人直接造成這個決定，
              單純是累積了一段時間後，我想換一種生活和工作方式。
              如果未來有機會再合作，我依然會很珍惜；只是當下的我想先去一個更早期、變化也更快的環境試一次。
            </p>
            <p>
              在 FAMIEN2025 富士山山中湖的 live，一邊看演出一邊想著自己的事，live 很享受，但心裡也想了很多。最後在那裡下了決定。
            </p>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="space-y-4">
            <p>
              加上也想給自己一段喘息的時間，隔週就提出辭職，雖然手上有選項，但沒有確定 next step 就離開了。
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
            這幾家面下來，拿到一些 offer，但經過蠻長一段時間的多方綜合考慮，最終還是去了一開始就有的新創。
            一大原因是我想先給自己一個能穩下來、彈性也高的環境，而且新創給的條件不錯，TC 跟我預期隔年留在 Google 的數字有競爭力，bonus 和股權更是有潛在的 upside。跟熟人合作也更有彈性。
            C++ low-level 知識當時確實有不足的地方，這也是後來花時間補強的方向。
          </p>
          <p>
            不過其中兩場後來整理成了{" "}
            <Link href="/blog/cpp-interview-performance-analysis" className="prose-link">
              C++ 效能面試
            </Link>
            {" "}和{" "}
            <Link href="/blog/cpp-inplace-vector" className="prose-link">
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
          <div className="space-y-4">
          <p>
            確定 next step 後，決定年初再上班，也當是新的一年、嶄新的開始。中間在日本玩了一個多月，
            除了旅遊也看了多場 live，去了不少沒去過的地方，累積了不少嶄新的體驗。
          </p>
          <p>
            其中最深刻的是{" "}
            <Link href="/blog/idol-2025" className="prose-link">
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
            那些卡住的情緒，現在回想起來還是很有感觸。
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
              等之後比較可以公開了，會再寫一篇分享新創生活，甚至 hiring。
            </p>
            <p>
              事後半年走過之後的體會，這份工作完全給了我當時想要的東西，也完全找回了野心與自信：
            </p>
            <ul className="list-inside list-disc space-y-2 text-sm">
              <li>有機會從零建不少系統與 infra，參與面向比以前廣很多，也補足了大量技術</li>
              <li>演算法、邏輯、數學這些長處，終於都派得上用場</li>
              <li>更完整的責任範圍，讓我有更多參與討論與做決策的機會</li>
              <li>AI 工具的使用自由度更大</li>
              <li>整體上更多自由度與空間</li>
            </ul>
            <p>
              新創當然有失敗的風險，但能以早期員工的身分加入一家資金充足的新創，這種機會太難得，不抓會後悔。
              我也清楚兩邊的取捨：在大公司，就算只是 toil，維護的也是一套撐起龐大營收的系統，貢獻在數字上看得見；新創做了很多事，短期內卻未必有具體的現金流可以指。
              但對我來說，重點就是把這邊的東西做好，同時認真把整體硬實力練扎實，應對未來的新挑戰。
            </p>
          </div>
        </FadeIn>

        {/* ============ 離開之後 ============ */}
        <FadeIn>
          <Heading id="reflection">離開之後</Heading>
          <div className="space-y-4">
            <p>
              離開後，原本那些不甘心確實推了我一把。
            </p>
            <p>
              繼續待著的生活很安穩、收入也不錯，但我還是想試試看自己能走多遠。
            </p>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="space-y-4">
            <p>
              離開後的日子很充實——演算法、C++、AI、家教、日文 N1、運動，還做了這個個人網站、還有眾多 AI 專案；Codeforces 也撿回來認真打，紅名是學生時期沒拿到的目標，這次想慢慢把它補上。
            </p>
            <p>
              這陣子也重新補基本功，想看看自己在 AI 這波能走到哪裡。目標很直接：把能力練到對下一份工作、甚至未來要不要創業都有選擇。近期科技業雖然冷，我還是持續收到 LinkedIn 的邀請，至少代表市場還願意看我的經歷。目前也還負荷得來，所以 side project 和合作機會都保持 open。
            </p>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="space-y-4">
            <p>
              工作內容雖然不適合我，三年裡還是留下不少回憶：
              到灣區出差、使用各國頂級辦公室跟福利、跟頂尖的人合作、
              跟多家 big name 公司作為客戶端的合作經驗，也大幅提升了英文能力。
              未來也可能還有新的合作機會。
            </p>
            <p>
              事後看，我確實很懷念 Google 的福利，卻沒有懷念過工作內容。未來如果又遇到真的適合我的 team，我也不排斥回去；至於現在這份會待多久，就先走一步算一步。
            </p>
            <p>
              至少現在，工作的熱情和 motivation 都回來了。
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
      <RelatedPosts href="/blog/leaving-google" />
    </article>
  );
}
