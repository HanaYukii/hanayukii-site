import type { Metadata } from "next";
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
          在 Google Cloud 待了三年，我最後選擇裸辭。
          <br />
          不是因為壓力太大，甚至可以說是輕鬆的。
          <br />
          但工作內容跟期待的落差越來越大，感覺自己不再成長、停下來了。
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <nav className="mb-12 rounded-xl border border-border bg-surface/40 p-6 backdrop-blur-sm">
          <p className="mb-3 text-sm font-bold text-text-muted uppercase tracking-wider">
            Agenda
          </p>
          <div className="space-y-2">
            {[
              { id: "background", title: "背景" },
              { id: "why-leave", title: "為什麼離開" },
              { id: "interviews", title: "Next Step" },
              { id: "decision", title: "最後的選擇" },
              { id: "reflection", title: "回頭看" },
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
              我在 Google Cloud 做了大概三年出頭，工作內容偏 infra。
            </p>
            <p>
              當時主要的優勢在演算法與 problem solving，
              ICPC Gold、Codeforces IM、LeetCode rating 台灣前幾名，
              也因為 Kick Start 成績被 Google 邀請參加 101 線下活動並面試，打進過兩次 Code Jam Round 3。
              面試過程相對順利，大多數題目都能在第一時間找到解法，
              甚至有一題還和面試官討論了解答外更簡潔的 0-1 BFS 作法，他也說學到新東西了。
            </p>
            <p>
              當初拿到 Google offer 的時候是真的當 dream job 在看的，
              完全沒想到會只待三年，而且還是用裸辭的方式離開。
            </p>
            <p>
              當時 team match 沒有很順利，拖了很久，也讓人有點恐慌。
              對 new grad 來說，較難評估這類工作與自己長遠目標的契合度，但確實是幾個 match 過的選項中相對不喜歡的。
              當時 recruiter 表示這是目前唯一的選項，不接的話可能要等很久，很難判斷該不該堅持，最後就接了。
              現在回頭看，應該更堅持自己的選擇。離畢業根本還有很充裕的時間，完全有資本繼續等。
            </p>
            <p>
              會有這麼多感受，也是因為這是 new grad 的第一份工作，而且是在世界頂級企業。
              我相信類似的故事在很多地方都在發生，甚至可能是大企業的常態。
              但也缺乏實際的比較對象，不知道在其他地方的情況可能該是如何。也許只是自己太任性、太多 ego。
            </p>
          </div>
        </FadeIn>

        {/* ============ 為什麼離開 ============ */}
        <FadeIn>
          <Heading id="why-leave">為什麼離開</Heading>
          <div className="space-y-4">
            <p>
              我離開不是因為公司不好。
              部門做的事情很重要，和大規模基礎設施高度相關，在 AI 時代更是如此。
              但對當時的我來說，這樣的工作型態跟期待有很大的落差。
              認識了很厲害的同事，也學到了大公司的工程文化，這些在其他地方不一定學得到，
              只是成長的方向跟速度都不是自己想要的。
            </p>
            <p>
              我待的 team 本質上是維護型的。日常工作大部分是 toil、on-call debug、處理 ticket，
              就算是 project 很多也是 config 的調整，真正在寫 code 的時間非常少，更不可能用到任何演算法。
              而且需要不少 domain knowledge，很多東西需要長期累積的職場經驗才能處理，
              當年又沒有 AI 可以幫忙，對當時還是 new grad 的我來說，適應成本很高。
            </p>
            <p>
              我一直想做一些跟演算法更相關的事情，或者至少能多寫一些 code、
              學 C++ low-level、design pattern、參與更多實際開發。
              但在這個 team 裡這些機會很少，真的說學到的經驗可能就是生 design doc 吧。
              內部轉 team 也想過，但還沒升上去能選的很有限，
              也要放棄本來在 team 累積的貢獻，沒辦法確定轉過去就一定比較好，最後沒走成。
            </p>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="space-y-4">
            <p>
              經過了時間，工作也算是上手了，處理了很多 task 跟幾個 project，也算 team 上相對年資長的。
              但一直以來都很少碰到 code 跟軟體技術，這點始終沒有改變。
            </p>
            <p>
              除了工作內容，還有幾個一直累積的問題：
            </p>
            <ul className="list-inside list-disc space-y-3 text-sm">
              <li>
                <strong>升遷不順</strong>：累積的 task 量非常多，但 promote 單看量不夠，需要 impact story。
                維護型的 team 很難有 impact story 可以講，升不上去就更不想努力，惡性循環。
              </li>
              <li>
                <strong>主管一直換</strong>：因應組織調整，三年出頭換了三任，每次都要重新建立信任，升遷支持也不穩定。
                中間還經歷了主管離開、由部門內資深 IC 代理主管的一大段空窗期。
                代理的 IC 也在灣區，加上資深人員大多也在美國，時差問題讓很多疑問沒辦法及時處理。
                離開前剛來的主管反而是最好的，蠻可惜沒機會繼續合作。
              </li>
              <li>
                <strong>Team 流動性高</strong>：轉 team 的人不少，雖然不確定背後原因是不是也不喜歡這裡的工作，
                但留下來的人要接更多 toil，惡性循環。
              </li>
              <li>
                <strong>心理狀態</strong>：長期做不喜歡也不適合的事情，覺得沒有成就感、沒有 impact、沒有學到東西。
                自信被消磨了很多，到後期我開始覺得自己不像一個工程師了。
              </li>
            </ul>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="space-y-4">
            <p>
              決定離開前，跟主管多次溝通，他分享了自己的經驗：
              遇到人生卡住的時候他會認真去找新的機會。
              他也有推薦我在內部找，但我覺得自己是真的停下來了。
              主管對我真的很不錯，就算我曾多次表示想離開了，他還是願意幫我提 promote。
              Promotion package 也準備得差不多了，拿到了不少支持，但一切都不好說。
            </p>
            <p>
              為了在工作之外尋求成長，我也參與了開源專案。
              但夏天在日本 WFA 了一陣子想調整狀態，心態已經有嚴重問題了。
              從 GitHub 的 contribution graph 也看得出來，那段時間連這些都幾乎沒有動力碰，整體狀態很差。
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
              在私立恵比寿中学 FAMIEN2025 富士山山中湖的野外 live 我想了一整場，最後下了決定。
              也諮詢了不少前輩，都認為這是當下最好的選擇。
            </p>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="space-y-4">
            <p>
              不是 team 對不起我，是我跟這個位置不適合。
              面試的門檻很高，但進來之後日常做的事情跟那個門檻完全不成比例。
            </p>
            <p className="my-4 text-lg font-semibold text-text">
              一直以來都這麼認為：自己的技能背景，跟工作內容很不匹配。
              如果不是頂級企業的待遇和光環，應該早就離開了。
            </p>
            <p>
              我需要的是能用到所長、持續成長的環境，而這個位置給不了。
              加上心理狀態確實需要休息，我想喘口氣、轉換跑道、看看不同的世界。
              最後決定裸辭，雖然手上有選項，但沒有確定 next step 就離開了。
            </p>
            <p>
            </p>
            <p className="my-4 text-lg font-semibold text-text">
              不是不努力，而是努力的方向不對。
              後半年的經歷也證明，離開之後整個人完全動起來了。
              現在已經能以 tech lead 的角色獨立做決策與帶團隊，用腦袋搭配 AI 做高效率的產出。
            </p>
          </div>
        </FadeIn>

        {/* ============ 面試過程 ============ */}
        <FadeIn>
          <Heading id="interviews">Next Step</Heading>
          <div className="space-y-4">
          <p>
            裸辭之後不到一個月就決定了 next step，同時也還在進行多個 HFT 面試。
            決定年初再上班，確認好之後去日本晃了蠻久，見證了很多 live。
          </p>
          <p>
            尤其是 TEAM SHACHI 的 final live。
          </p>
          <p>
            那場我其實不是單純在看演出，而是一路在回想自己這幾年的狀態。
            台上是她們的終點，台下的我也剛好在跟過去的自己告別。
            很多不甘心、很多卡住的情緒，好像就在那幾個小時裡強烈的爆發了，至今每次回想起來也總是讓我眼眶濕潤。
          </p>
          <p>
            那段時間剛離開 Google，很多事情還沒完全落定，
            但在那個現場，我第一次很明確地感覺到，這一段真的結束了。
          </p>
          <p>
            從 Google 出來之後，如果沒有明顯成長空間的選項，我暫時不會考慮。
            選項有 Web3 也有 HFT，HFT 一定是一大選項。
          </p>

          <div className="my-6 space-y-4">
            <div className="rounded-xl border border-border bg-surface/40 p-6 backdrop-blur-sm">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-lg">🇸🇬</span>
                <h3 className="text-lg font-bold">新加坡量化公司</h3>
              </div>
              <p className="text-sm">
                我對出國有一些憧憬，所以陸續面了幾家新加坡的 Crypto / HFT 量化公司。
                面試內容跟一般 backend 面試不太一樣，更著重 C++ low-level：
                move semantics、memory layout、lambda capture 這些。
              </p>
              <p className="mt-2 text-sm">
                HFT 的都沒有拿到，有拿到一些 Web3 小型團隊的 offer，但待遇和方向都不太符合預期。
                C++ low-level 知識當時確實有不足的地方，這也是後來花時間補強的方向。
              </p>
              <p className="mt-2 text-sm">
                其實面了不只這些，還有很多場沒紀錄上去的。
                也有一些覺得總體都答得很好，但就無聲了的。
                當時也在調整心態，面試狀態不算最佳。
              </p>
              <p className="mt-2 text-sm">
                不過其中兩場後來整理成了{" "}
                <Link href="/blog/cpp-interview-performance-analysis" className="text-primary hover:underline">
                  C++ 效能面試
                </Link>
                {" "}和{" "}
                <Link href="/blog/cpp-inplace-vector" className="text-primary hover:underline">
                  手寫 inplace_vector
                </Link>
                ，算是把當初不會的東西補回來了。
              </p>
            </div>

            <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 backdrop-blur-sm">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-lg">🏢</span>
                <h3 className="text-lg font-bold">AI 新創</h3>
              </div>
              <p className="text-sm">
                在離開 Google 之前就有一家 AI 新創主動找上我，
                看中我的演算法背景，邀請我加入帶技術團隊。
                給的條件和 title 都比 Google 好不少。
              </p>
              <p className="mt-2 text-sm">
                最重要的是：工作內容是真的在寫 code、做研發、解演算法問題。
                同時換了一個角色也要學會開 ticket、寫文件、做 project planning，
                這些以前在 Google 都是 tech lead 在做的事。
              </p>
              <p className="mt-2 text-sm">
                說到 tech lead，之前 team 上的 TL 我其實很敬重，
                也是我在的期間 team 上唯一 promote 成功的案例。
              </p>
            </div>
          </div>
          </div>
        </FadeIn>

        {/* ============ 最後的選擇 ============ */}
        <FadeIn>
          <Heading id="decision">最後的選擇</Heading>
          <div className="space-y-4">
            <p>
              新加坡的量化沒拿到，出國這條路暫時沒走成。
              但 AI 新創的 offer 當時本來就是我比較想去的方向，
              就算有拿到量化，我覺得待遇跟機會都不一定比較好：
            </p>
            <ul className="list-inside list-disc space-y-2 text-sm">
              <li>能用到演算法背景</li>
              <li>有實際的開發工作，不是維護 toil</li>
              <li>新創節奏快，能學到更多東西</li>
              <li>待遇不一定比留在 Google 升遷好，可能略贏或略輸，但成長空間和主導權完全不同</li>
            </ul>
            <p>
              所以就去了這家 AI 新創，現在做 Tech Lead，
              做的事情跟演算法和 AI 都有關，終於在工作中能用到自己的背景了。
            </p>
            <p>
              事後半年回頭看，這份工作完全給了我當時想要的東西：
            </p>
            <ul className="list-inside list-disc space-y-2 text-sm">
              <li>有巨大的 impact，帶團隊做事</li>
              <li>持續學到大量技術，成長速度跟過去完全不同</li>
              <li>每天都在用演算法、寫非常多 code</li>
              <li>非常多的空間可以發揮，不會改點小東西一直被 block</li>
              <li>有無限制的 AI 使用空間</li>
              <li>職位上去了，做事也可以更有自己的主張</li>
            </ul>
            <p>
              當然還是有可能遇到無法解決的技術瓶頸、最後失敗收場。
              但這是一家資金充足的新創，能得到這樣的機會和待遇，
              一定是一段很難得的經驗。
              我也會在這段時間全面性地增進自己、多方發展，迎接下一階段的挑戰。
            </p>
          </div>
        </FadeIn>

        {/* ============ 回頭看 ============ */}
        <FadeIn>
          <Heading id="reflection">回頭看</Heading>
          <div className="space-y-4">
            <p>
              離開 Google 這個決定，不能說完全沒有懷疑，也許多年後才會知道答案。
            </p>
            <p>
              離開半年回頭看，我覺得正走在人生重啟的路上，明顯感受到持續的學習進步，跟大量的產出。
            </p>
            <p className="my-6 text-lg font-semibold text-text">
              在新創半年，累積了大量的 code、決策經驗和實際 impact，
              加上自己的各種 side project，
              終於感受到持續產出和成長的節奏，密度是過去很難想像的。
            </p>
            <p>
              也歸功於 AI 的爆發，讓學習曲線整個拉上去，
              現在能做到的事情跟過去完全不是同一個量級。
            </p>
            <p>
              這幾個月也剛好離開後 RSU 大爆噴、遇到 crypto 大回調，不過這就是人生考驗吧。
              我相信這段經驗讓我學到很多課，準備好迎向未來的 upswing。
            </p>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="space-y-4">
            <p>
              幾個體會：
            </p>
            <ul className="list-inside list-disc space-y-3 text-sm">
              <li>
                <strong>Team 比公司重要</strong>：Google 很大，有很多 team 很好，
                但你到哪個 team 很大程度是緣分。我運氣不好，
                team match 沒有很好，可能也跟自己當時的選擇有關。
                以前也聽過一些類似的情境，有點像選系沒選好辛苦轉系的感覺吧。
              </li>
              <li>
                <strong>面試失敗不虧</strong>：量化公司的面試雖然沒過，
                但逼我去補了很多 C++ low-level 的知識，這些後來都用得上。
              </li>
              <li>
                <strong>心理健康最重要</strong>：撐到不行才走其實已經太晚了，
                如果早點行動可能不用走到裸辭這一步。
                同儕有人覺得不適合，早早跳去微軟，我也很佩服這樣的果斷。
                而心理狀態也還在持續調適中，長期缺乏成就感和成長感對心理的影響是很深的，
                希望能持續調整，找到自己舒適的狀態。
              </li>
            </ul>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="space-y-4">
            <p>
              大公司或多或少都有這樣的情況，人都會看到自己沒有的。
              只是我還在職涯初期，需要的是成長跟成就感，不想這麼早進入養老模式。
              福利和穩定性確實是新創比不上的，但重點還是 team 和做的事情。
            </p>
            <p>
              離開之後，同時也參與了 Web3 project，重啟演算法競賽把 Codeforces 撿回來打，
              紅名不只是期待，是我認真努力的目標。
              也用 AI 寫各種小工具和 side project，這個時代能做的事情比以前多太多了。
            </p>
            <p className="mt-8 text-lg font-semibold text-text">
              如果再讓我選一次，我還是會離開，但回去大企業也完全可能是未來的選項。
            </p>
            <p>
              只是可能會更早走，更認真找 next step。
              也深深認知到，對自己的整體都該更積極。
              也是有看到他人的經驗，勇於放棄沉沒成本，為了自己積極努力，不管是轉 team 或換公司。
              在內部慢慢等不確定的升遷，不如跳槽爭取更好的機會，而我又不缺面試的能力。
              相信這也是很多大科技公司人的想法。
            </p>
            <p>
              這段經驗雖然有很多不美滿的地方，總體來說還是有不少不錯的經歷：
              到灣區出差、使用各國頂級辦公室跟福利、跟頂尖的人合作、
              跨公司跟 vendor 的溝通經驗，也大幅提升了英文能力。
              未來也可能還有新的合作機會。
              回頭看，這段經歷不是繞路，而是讓我更快找到適合自己的方向，也是非常好的更認識自己的契機。
            </p>
            <p>
              留下來的話，還有 RSU 漲幅、薪資成長，內部也許也會有更好的機會。
              但不走的話，可能就不會有這段進步和轉變。
              也慶幸離開後能獲得待遇不錯的選項，不至於在這部分過度糾結，但福利肯定是沒得比的。
              畢竟是畢業後的第一份工作、又是世界頂級企業，說不清哪個比較好。
            </p>
            <p>
              相信自己可以持續保持競爭力，應對未來的挑戰。
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
