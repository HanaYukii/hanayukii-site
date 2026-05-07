import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import ArticleIllustration from "@/components/ArticleIllustration";

export const metadata: Metadata = {
  title: "文件是 AI 時代的隱藏槓桿 | 花雪 HanaYukii",
  description:
    "以前文件常常像成本；現在它可能是讓 AI、團隊、未來的自己都更快進入 context 的介面。AI 時代不是讓文件變得不重要，而是讓文件的價值被放大。",
  openGraph: {
    title: "文件是 AI 時代的隱藏槓桿",
    description:
      "AI 時代不是讓文件變得不重要，而是讓文件的價值被放大。寫得越清楚，人跟 AI 都越容易正確呼叫它。",
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

export default function DocumentationAiEra() {
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
            Software Engineering
          </span>
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            AI
          </span>
        </div>
        <h1 className="mb-2 text-3xl font-bold leading-tight sm:text-4xl">
          文件是 AI 時代的隱藏槓桿
        </h1>
        <p className="mb-2 text-base text-text-muted leading-relaxed">
          以前文件常常像成本；現在它可能是讓 AI、團隊、未來的自己都更快進入 context 的介面。
        </p>
        <p className="mb-8 text-sm text-text-muted">2026-05-03</p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <nav className="mb-12 rounded-xl border border-border bg-surface/40 p-6">
          <p className="mb-3 text-sm font-bold text-text-muted uppercase tracking-wider">
            Agenda
          </p>
          <div className="space-y-2">
            {[
              { id: "why-hated", title: "以前文件 ROI 很差，所以大家討厭寫" },
              { id: "concretization", title: "文件是想法的具象化" },
              { id: "for-ai", title: "文件是給 AI 看的 context" },
              { id: "onboarding", title: "Onboarding：給新人、給未來的自己、也給 AI" },
              { id: "approval", title: "文件作為 approval：讓事情有底氣往前走" },
              { id: "iteration", title: "AI 讓文件快速迭代，但別什麼都怪 AI" },
              { id: "review", title: "AI review 跟測試：留個伏筆" },
              { id: "leverage", title: "結語：隱藏槓桿" },
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

        <FadeIn>
          <p>
            最近又有好幾個場合討論到 Design Doc，把現在的看法整理一下。主要還是圍繞 AI 的場景。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="why-hated">以前文件 ROI 很差，所以大家討厭寫</Heading>
          <p>
            工程師討厭寫文件其實很合理。寫 code 有具體可見的 output、test 跑過、merge 進去都會留下正向的回饋與紀錄；寫文件常常像是另一種行政成本。寫很久，沒人看；寫完，過兩週就過期；最後還被笑說只是拿來交差給 PM 用。
          </p>
          <p>
            但 AI 出現後，這件事有點變了。以前文件可能真的沒人看，現在至少 AI 會看。
          </p>
          <p>
            這不是說文件突然變神聖，是文件的 ROI 變了：寫文件的成本下降，文件能產生的價值上升。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="concretization">文件是想法的具象化</Heading>
          <p>
            文件不是把想好的東西打字出來而已。很多時候，是寫下來之後，才發現自己其實還沒想清楚。
          </p>
          <p>
            腦中的設計通常很模糊。一旦要寫成文件，就會被迫說清楚：問題是什麼、goal / non-goal 在哪、有哪些方案、trade-off 是什麼、哪些事情還沒決定。設計討論完整再開始動工，整體效率反而比較高。
          </p>
          <p>
            <strong>文件不是想法的附屬品，而是想法成形的過程。</strong>這層價值跟 AI 無關，但常常被忽略。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="for-ai">文件是給 AI 看的 context</Heading>
          <p>
            AI 很吃 context。給它越多正確 context，它越像 teammate；什麼都不給，它就只是一個很會猜的陌生人。
          </p>
          <p>
            <strong>AI 看得懂 code，不代表它看得懂 codebase。</strong>它知道語法、知道常見 pattern，但不知道：這個 module 的責任邊界、哪些 invariant 不能破壞、哪些地方是歷史包袱、哪些 command 才是正確跑法、哪些 corner case 以前踩過雷、哪些實作看起來醜，但其實是刻意保守。
          </p>
          <p>
            很多時候，叫 AI 寫 code 不難；真正卡的是叫它在一個 codebase 裡正確地跑起來、測起來、改起來。README、build 指令、test command 這些看似平凡的文件，會直接影響 AI 能不能有效率地了解 codebase 並正確做事。沒寫清楚，它就會開始猜。猜對很神，猜錯就很浪費時間。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="onboarding">Onboarding：給新人、給未來的自己、也給 AI</Heading>
          <p>
            文件最常被提到的價值是 onboarding。這件事在 AI 時代沒有消失，反而更重要。
          </p>
          <p>
            幾個月後回來看一段 code，常常不是真的看不懂 code，而是忘了當初為什麼這樣做。當時的限制、討論、替代方案、踩過的坑，如果沒有留下來，就只能重新考古。
          </p>
          <p>
            文件在這裡的價值是保存 context：給新人看，是 onboarding；給自己看，是恢復記憶；給 AI 看，是讓工具接上脈絡。<strong>文件不是只給別人看的；很多時候，它是寫給三個月後已經忘光的自己看的。</strong>
          </p>
          <p>
            AI 加進來之後，這份 context 又多了一個使用者。以前文件可以幫人少問一次問題；現在文件也可以讓 AI 少猜一次答案。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="approval">文件作為 approval：讓事情有底氣往前走</Heading>
          <p>
            在 level 層級比較明確、stakeholder 比較多的環境（Google 這類大公司就很典型），文件還有一個很現實的作用：它是 alignment 跟 approval 的載體。
          </p>
          <p>
            真正痛苦的常常不是「不會做」。是方向沒人明確 approve、proposal review 拖很久、上面沒正式否決也不給明確同意；下面已經被期待要推進、做到一半方向被翻案、最後變成做白工。
          </p>
          <p>
            <strong>文件讓「我覺得應該這樣做」，變成「我們同意先這樣做」。</strong>
          </p>
          <p>
            以前寫 proposal、整理討論、回 reviewer comment 都很花時間。AI 之後，這些成本下降很多。在複雜組織裡，先把方向寫清楚、拿到 review 跟 approve，做事比較有底氣。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="iteration">AI 讓文件快速迭代，但別什麼都怪 AI</Heading>
          <p>
            AI 寫文件很快，所以文件不再像以前那種一次性交付。可以先丟粗糙想法，讓 AI 幫忙整理成 draft，再來回修：補缺少章節、改語氣、整合 reviewer feedback、產生 PR description / test plan / decision log。
          </p>
          <p>
            但 AI 也很容易天馬行空。<strong>AI 很擅長把東西寫得「像一份文件」，但不代表它真的理解你的決策。</strong>如果 prompt 裡沒說清楚哪些是已決定、哪些只是猜測、哪些不能亂補，它就會把假設寫得像結論。
          </p>
          <p>
            所以 Superpowers 這類工具、或更廣義的 prompt template、context management 就變得有用。它們不是魔法，是讓常用的文件結構、語氣要求、review checklist、專案 context 可以被重用，降低 AI 亂跑的機率。
          </p>
          <p>
            <strong>AI 寫歪的時候，幾乎都不是 AI 的問題，自己的 prompt 品質要負更大責任。Prompt 也是一種臨時文件，寫得模糊，輸出自然也會模糊。</strong>
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="review">AI review 跟測試：留個伏筆</Heading>
          <p>
            同樣的邏輯也可以放到 AI code review。只叫 AI「幫我 review code」通常不夠。比較好的方式是把人類 review 會看的點拆開：correctness、edge cases、performance、error handling、test coverage、maintainability，讓 AI 分別檢查，多跑幾輪，搭配不同工具。
          </p>
          <p>
            這些 checklist 本身也是文件。把團隊在意的標準寫下來，AI 才知道要用什麼角度 review。
          </p>
          <p>
            <strong>文件提供 context，review 提供檢查，測試提供底線。</strong>
          </p>
          <p>
            AI review code 的流程其實可以另外寫一篇，會牽涉到 prompt、多工具、多輪檢查跟測試怎麼串起來。這篇先暫停在這裡。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="leverage">結語：隱藏槓桿</Heading>
          <p>
            AI 時代不是讓文件變得不重要，而是讓文件的價值被放大。它不只是給 PM 看、給新人看、給未來的自己看；也開始變成給 AI 看的 context。
          </p>
          <p>
            寫文件不是為了留下漂亮文字，而是為了留下可以被重用的思考。好文件讓人更快進入狀況，讓 AI 更少猜錯，也讓複雜組織裡的決策更有依據。
          </p>
          <p>
            文件用得好、理解得好，現在能比過去發揮更大的槓桿，但也是大學問。<strong>寫得越清楚，人跟 AI 都越容易正確呼叫它。</strong>
          </p>
        </FadeIn>

      </div>

      <FadeIn delay={0.08}>
        <ArticleIllustration variant="docs" className="mt-16" />
      </FadeIn>
    </article>
  );
}
