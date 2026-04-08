import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "離開 Google 的轉職紀錄 | 花雪 HanaYukii",
  description:
    "在 Google Cloud 待了三年，我最後選擇裸辭。不是因為壓力太大，而是因為太輕鬆，輕鬆到開始懷疑自己是不是工程師。",
  openGraph: {
    title: "離開 Google 的轉職紀錄",
    description:
      "在 Google Cloud 待了三年，我最後選擇裸辭。不是因為壓力太大，而是因為太輕鬆。",
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
          離開 Google 的轉職紀錄
        </h1>
        <p className="mb-2 text-sm text-text-muted">2026-04-06</p>
        <p className="mb-8 text-text-muted">
          在 Google Cloud 待了三年，我最後選擇裸辭。
          <br />
          不是因為壓力太大，而是因為太輕鬆，輕鬆到我開始懷疑自己是不是工程師。
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
              我在 Google Cloud 做了大概三年出頭，team 是做 infrastructure monitoring
              相關的，工作內容偏 infra / DevOps。
            </p>
            <p>
              進 Google 之前我的背景是演算法競賽，ICPC Gold、Codeforces IM，
              LeetCode rating 當年也是台灣前幾名，雖然現在久沒打了還是維持一定水準。
              算是對演算法和 problem solving 比較有信心。
              當年也是因為 Kick Start 被 Google 邀請參與 101 線下活動並邀請面試的，也打進過兩次 Google Code Jam Round 3。
              演算法實力雖然不是最頂的那群，不過也是非常有實力了。
              當年面試基本上聽到題目就知道怎麼做了。
            </p>
            <p>
              當初拿到 Google offer 的時候是真的當 dream job 在看的，
              完全沒想到會只待三年，而且還是用裸辭的方式離開。
            </p>
            <p>
              說實話這個 team 一開始 match 的時候我就不太想去。
              但當時 recruiter 跟我說主管對我特別有興趣，
              而且目前只有這個選項，不接的話要繼續等很久，可能等不到 team。
              身為 new grad 也不太懂怎麼評估，就被說服了。
              當時沒有太多經驗評估 team match，現在回頭看，其實應該更堅持自己的選擇。
            </p>
          </div>
        </FadeIn>

        {/* ============ 為什麼離開 ============ */}
        <FadeIn>
          <Heading id="why-leave">為什麼離開</Heading>
          <div className="space-y-4">
            <p>
              我離開不是因為 Google 不好，而是因為這個 team。
              做得很悶，悶到心理出問題。
            </p>
            <p>
              我待的 team 本質上是維護型的。日常工作大部分是 toil、on-call debug、處理 ticket，
              就算是 project 很多也是 config 的調整，真正在寫 code 的時間非常少，更不可能用到任何演算法。
              而且需要很多硬體相關的 domain knowledge，當年又沒有 AI 可以幫忙，學起來非常痛苦。
            </p>
            <p>
              我一直想做一些跟演算法更相關的事情，或者至少能多寫一些 code、
              學 C++ low-level、design pattern、參與更多實際開發。
              但在這個 team 裡這些機會很少，真的說學到的經驗可能就是生 design doc 吧。
              內部轉 team 也想過，但卡在升遷狀態下能選的很有限，
              加上已經投入了一些 project 的沉沒成本，也沒辦法確定轉過去就一定比較好，最後沒走成。
            </p>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="space-y-4">
            <p>
              除了工作內容，還有幾個一直累積的問題：
            </p>
            <ul className="list-inside list-disc space-y-3 text-sm">
              <li>
                <strong>升遷不順</strong>：維護型的 team 很難有 impact story 可以講。
                升不上去就更不想努力，更不想努力就更難升，惡性循環。
              </li>
              <li>
                <strong>主管一直換</strong>：三年出頭換了好幾任，中間還有空窗期由 IC 代理。
                唯一一次 promote 是由當時代理的 IC 幫忙推的，
                但畢竟不是正式主管，能幫的有限。
                離開前剛來的主管反而是最好的，蠻可惜沒機會繼續合作。
              </li>
              <li>
                <strong>Team 流動性高</strong>：同部門轉 team 的人很多，
                留下來的人要接更多 toil，惡性循環。
              </li>
              <li>
                <strong>心理狀態</strong>：長期做不喜歡的事情，覺得沒有成就感、沒有 impact、沒有學到東西，
                到後期我開始覺得自己不像一個工程師了。
              </li>
            </ul>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="space-y-4">
            <p>
              當然 Google 也不是全都不好。三年出頭裡認識了一些很厲害的同事，
              也學到了大公司的工程文化：嚴謹的 code review、design doc 流程、
              production 等級的 oncall 制度，這些東西在其他地方不一定學得到。
              說實話在 Google 工作步調不快，福利也是真的好。
              但這也正是問題所在，太舒適了反而讓人停下來，成長速度慢到幾乎感覺不到。
            </p>
            <p>
              離開前跟主管多次溝通，他分享了自己的經驗：
              他覺得自己停不下來，所以也會一直換工作，遇到人生卡住的時候他會認真去找新的機會。
              雖然他也有推薦我在內部找，就算我要離開他還是願意幫我推 promote。
            </p>
            <p>
              而我回他：我現在的狀態，我真的覺得自己是停下來了。
              後半年的經歷也證明，離開之後我整個人完全動起來了。
            </p>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="space-y-4">
            <p>
              說實話，離開的時候工作已經蠻上手了，promote package 也都準備好了。
              有了正式主管的全力 support，加上拿到了不少 peer feedback，
              也是比較認真的準備，蠻高機率那個 cycle 可以過，但一切都不好說。
            </p>
            <p>
              夏天在日本 WFA 了一陣子想調整狀態，但心態已經有嚴重問題了。
              Package 弄好之後我反而確定了：我要離開了。
              在私立恵比寿中学 FAMIEN2025 富士山山中湖的野外 live 我想了一整場，最後下了決定。
              也諮詢了不少前輩，都認為這是當下最好的選擇。
            </p>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="space-y-4">
            <p>
              不是公司對不起我，是我們不適合。
              我需要的是能用到所長、有 impact、得到成就感並持續成長的環境，而大公司比較給不了。
              絕大部分 ticket 根本就是講幾句話就轉走的那種。
            </p>
            <p className="my-4 text-lg font-semibold text-text">
              自己的技能背景，跟當時的工作內容其實很不匹配。
            </p>
            <p>
              一直很糾結要不要等 promote 結束再提，因為主管對我真的很不錯，
              就算我要離開還是願意幫我提 promote。
              覺得早該 promote 了，也許平行時空人在矽谷了，
              但沒有如果，也不確定那樣會不會快樂。
            </p>
            <p>
              我認為要找同等甚至更高的職位是有機會的，
              加上當時心理狀態確實需要休息，
              我想喘口氣、轉換跑道、看看不同的世界。
              最後決定裸辭，沒有確定 next step 就離開了。
            </p>
            <p>
              到最後我才發現，我不是不努力，而是努力的方向不對。
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
            很多不甘心、很多卡住的情緒，好像就在那幾個小時裡強烈的爆發了。
          </p>
          <p>
            那段時間剛離開 Google，很多事情還沒完全落定，
            但在那個現場，我第一次很明確地感覺到，這一段真的結束了。
          </p>
          <p>
            從 Google 出來之後我暫時不會再考慮大公司，
            基本上不打算考慮太次的選項，沒有往上爬的感覺不考慮。
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
                老實說我的 C++ low-level 知識當時確實不夠，面試的時候很多題都答不上來。
              </p>
              <p className="mt-2 text-sm">
                其實面了不只這些，還有很多場沒紀錄上去的。
                也有一些覺得總體都答得很好，但就無聲了的。
                加上當時心理狀態也不太好，覺得在 Google 的三年成長方向跟自己期待的有落差，
                面試表現可能沒有到最佳狀態。
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
                其實在離開 Google 大約半年前，這家 AI 新創的創辦人就找上我了。
                他本來就知道我的演算法成就，剛好需要演算法人才。
                一開始是在討論兼職或承攬的形式合作，
                後來聊著聊著變成正式邀請我加入當 tech lead，
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
              <li>薪資算上 RSU 漲幅不一定比 Google 好，但這邊也有成長空間，做起來股權的增長更是不同級別</li>
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
              <li>持續學到大量技術，我認真覺得這半年技術水平上升幅度比在 Google 三年還多</li>
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
              離開半年回頭看，我覺得我的人生完全重啟了。
            </p>
            <p className="my-6 text-lg font-semibold text-text">
              在新創半年，我寫的 code、做的決策、帶的 impact，
              已經遠遠超過我在 Google 三年的總和。
            </p>
            <p>
              也歸功於 AI 的爆發，讓學習曲線整個拉上去，
              現在能做到的事情跟在 Google 的時候完全不是同一個量級。
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
              </li>
              <li>
                <strong>維護型 team 對職涯發展不利</strong>：沒有 project、沒有 impact、
                升遷困難，而且技術不會成長。
              </li>
              <li>
                <strong>面試失敗不虧</strong>：量化公司的面試雖然沒過，
                但逼我去補了很多 C++ low-level 的知識，這些後來都用得上。
              </li>
              <li>
                <strong>心理健康最重要</strong>：撐到不行才走其實已經太晚了，
                如果早點行動可能不用走到裸辭這一步。
                同儕有人覺得不適合，早早跳去微軟，我也很佩服這樣的果斷。
              </li>
              <li>
                <strong>給 New Grad 的建議</strong>：match team 的時候一定要問清楚日常工作內容。
                幾個判斷 team 是維護型還是開發型的指標：
                團隊日常是在處理 ticket / oncall 還是在開發新功能？
                有沒有正在進行的 project 和明確的 roadmap？
                團隊成員的流動率高不高？
                如果答案都指向維護，寧可繼續等下一個 team，不要被 recruiter 的話術說服。
              </li>
            </ul>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="space-y-4">
            <p>
              大公司或多或少都有這樣的情況，人都會看到自己沒有的。
              只是我覺得自己還處於職涯初期，還需要獲得成長跟成就感，不想這麼早進入養老模式。
            </p>
            <p>
              不過福利和穩定性確實是新創比不上的，
              未來應該也還有機會回去大廠，我也會認真考慮。
              重點還是 team 和做的事情，不是公司大小。
            </p>
            <p>
              現在不只做新創，也參與了 Web3 project，
              重啟演算法競賽把 Codeforces 撿回來打，
              紅名不只是期待，是我認真努力的目標。
            </p>
            <p>
              平常也用 AI 寫各種小工具，
              因為 AI 實在太強了，我也自認是 AI 用得很好的人，
              也期待能找到更多有趣的 side project 可以參加。
            </p>
            <p className="mt-8 text-lg font-semibold text-text">
              如果再讓我選一次，我還是會離開。
            </p>
            <p>
              只是可能會更早走，更認真找 next step。
              也深深認知到，對自己的整體都該更積極。
            </p>
            <p>
              回頭看，這段經歷不是繞路，而是讓我更快找到適合自己的方向，也是非常好的更認識自己的契機。
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
