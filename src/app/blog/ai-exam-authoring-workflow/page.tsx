import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import Code from "@/components/CodeBlock";
import { articleMetadata } from "@/lib/seo";
import PostJsonLd from "@/components/PostJsonLd";

export const metadata: Metadata = articleMetadata("/blog/ai-exam-authoring-workflow", {
  title: "用 multi agent AI 出 JLPT 考題：交叉審查與品質閘 | 花雪 HanaYukii",
  description:
    "用 subagent + Codex 兩個 AI 代理平行出題再交叉互審，搭配 lint／dry-run／讀音驗證等自動品質閘，幫 JLPT 題庫大量出題又不出近義雙解。",
  openGraph: {
    title: "用 multi agent AI 出 JLPT 考題：交叉審查與品質閘",
    description:
      "multi agent 平行出題＋交叉互審＋把品質規則編碼成自動閘，把 AI 出題變成可維護的流程。",
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

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="mb-3 mt-8 text-lg font-bold">{children}</h3>;
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-4 border-l-2 border-primary pl-4 text-text-muted italic">
      {children}
    </blockquote>
  );
}

export default function AiExamAuthoringWorkflow() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <PostJsonLd href="/blog/ai-exam-authoring-workflow" />
      <FadeIn>
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-1 text-sm text-text-muted transition-colors hover:text-primary"
        >
          &larr; Back to Blog
        </Link>

        <div className="mb-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            AI
          </span>
          <span className="rounded-full bg-sky/10 px-2.5 py-0.5 text-xs font-medium text-sky">
            Software Engineering
          </span>
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight">
          用 multi agent AI 出 JLPT 考題：交叉審查與品質閘
        </h1>
        <p className="mb-8 text-text-muted">
          我在維護一個 JLPT（日本語能力試驗）學習網站{" "}
          <Link href="/blog/jabiko-jlpt-app" className="text-primary hover:underline">Jabiko</Link>
          ，題庫一直在長。
          寫前端不是難處，真正卡住的是「持續出高品質的考題」。
        </p>
      </FadeIn>

      <FadeIn delay={0.05}>
        <nav className="mb-12 rounded-xl border border-border bg-surface/40 p-6">
          <p className="mb-3 text-sm font-bold text-text-muted uppercase tracking-wider">
            Agenda
          </p>
          <div className="space-y-2">
            {[
              { id: "problem", title: "待解決問題" },
              { id: "cross-validation", title: "multi agent 交叉驗證" },
              { id: "prompt-engineering", title: "把命題知識寫進 prompt" },
              { id: "quality-as-code", title: "品質規則編碼成自動閘" },
              { id: "toolchain", title: "Claude Code 配 Codex CLI" },
              { id: "sustainability", title: "讓加題變成可持續的 loop" },
              { id: "results", title: "成果" },
              { id: "takeaways", title: "小結" },
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

      <div className="prose-custom space-y-2 text-text-muted leading-relaxed [&_strong]:text-text [&_code]:rounded [&_code]:bg-surface [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-primary [&_code]:text-sm">
        {/* ============ 難在哪 ============ */}
        <FadeIn>
          <Heading id="problem">待解決問題</Heading>
          <p>
            出一題 JLPT 文法選擇，要正解唯一、四個選項都像、又真的考得到語意，其實很容易翻車。
            最常壞在三個地方：
          </p>
          <ul className="my-4 list-inside list-disc space-y-2">
            <li>
              <strong>近義雙解</strong>：日文很多文法意思很近。要考「ようだ」，
              干擾項放了「ごとし」——兩個都解釋得通，題目就有兩個答案。
            </li>
            <li>
              <strong>接續秒殺</strong>：很多文法接續形不一樣。如果四個選項裡只有正解接得上題幹，
              學生光看接續就選對了，根本沒考到語意。
            </li>
            <li>
              <strong>答案洩漏</strong>：提示寫太白，或題幹某個詞本身就暗示了答案。
            </li>
          </ul>
          <p>
            這三種，一個模型自己出、自己看，很難全抓出來——盲點是一致的，整批一起漏。
          </p>
        </FadeIn>

        {/* ============ multi agent 交叉驗證 ============ */}
        <FadeIn>
          <Heading id="cross-validation">multi agent 交叉驗證</Heading>
          <p>我的做法是讓兩個不同來源的 AI 代理平行出題、再互相審：</p>
          <ul className="my-4 list-inside list-disc space-y-2">
            <li>
              <strong>出題</strong>：subagent（Claude）和 codex（OpenAI 的 CLI）
              針對同一批文法點各自出題，每個點各出兩題。
            </li>
            <li>
              <strong>交叉判</strong>：讓 codex 去審 subagent 出的題、subagent 去審 codex 出的題，
              專盯近義雙解、接續秒殺、不自然。
            </li>
            <li>
              <strong>終審</strong>：再用一個 subagent 對整批做最後掃描，零雙解才放行。
            </li>
          </ul>
          <SubHeading>異質模型互審才補得起來</SubHeading>
          <p>
            最有感的觀察是：codex 屢屢比 subagent 多抓出五、六個近義雙解。
            同一個模型自己出、自己審，盲點一致，很容易整批漏掉；
            換一個不同來源的模型來審，才補得起來。
          </p>
          <p>
            每一輪的 subagent 出題、codex 出題、互審結果，都各自存成 JSON 留著。
            要回頭查哪一題被誰打槍、為什麼，稽核痕跡都在。
          </p>
        </FadeIn>

        {/* ============ 把命題知識寫進 prompt ============ */}
        <FadeIn>
          <Heading id="prompt-engineering">把命題知識寫進 prompt</Heading>
          <p>
            光靠互審還不夠。能在第一輪就避掉的，我直接寫進出題 prompt：
          </p>
          <ul className="my-4 list-inside list-disc space-y-2">
            <li>
              <strong>禁近義當干擾</strong>：明令不准拿近義詞當干擾項；
              干擾要用語意明確相反的（否定意志、反問、徒勞、讓步反向）。
            </li>
            <li>
              <strong>防接續秒殺</strong>：把完整述語放進選項，逼學生靠語意辨別，而不是靠接續形猜。
            </li>
            <li>
              <strong>語境鎖定</strong>：加主語、受詞助詞、轉折副詞，把正解逼成唯一。
              比如 ようにする 對 ようになる，用「が、つい…てしまう（努力卻沒做到）」鎖住；
              てくる 對 ていく，用時間副詞（「これから何十年もかけて」）鎖方向。
            </li>
            <li>
              <strong>雙解對參考表</strong>：整理一張常會撞的近義對
              （ごとし≈ようだ、に堪える≈に足る、ともなると≈となると…）丟給模型，出題時先避開。
            </li>
          </ul>
        </FadeIn>

        {/* ============ 品質規則編碼成自動閘 ============ */}
        <FadeIn>
          <Heading id="quality-as-code">品質規則編碼成自動閘</Heading>
          <p>有些規則是死的，那就不該靠 AI 自律，直接寫成程式擋下來：</p>
          <ul className="my-4 list-inside list-disc space-y-2">
            <li>
              <strong>lint</strong>：一組測試把硬規則檢查掉——提示不能和詞義共用太長的片段、
              選項剛好四個且不重複、正解必須在選項裡、漢字読み 的選項要全是假名、每題 id 全庫唯一。
            </li>
            <li>
              <strong>匯入器 + dry-run</strong>：題目進庫前先用匯入器的 dry-run 預檢
              JSON 格式、必填欄位、級別合不合法。
            </li>
            <li>
              <strong>讀音驗證</strong>：漢字読み 的答案，用 kuromoji 做形態分析客觀驗一次讀音，不靠人眼。
            </li>
            <li>
              <strong>drift guard</strong>：首頁的題數是硬編碼的（為了首頁輕量）。
              我寫了一個測試，題庫一變、那個數字沒同步，CI 就直接爆紅。
            </li>
          </ul>
          <Callout>
            規則寫成 lint 跟 test 之後，review 只要看有沒有過閘，不用每題用人眼盯，AI 出的題才好放量。
            這其實跟「<Link href="/blog/documentation-ai-era" className="text-primary hover:underline">文件在 AI 時代的價值</Link>」
            是同一件事：把 review 標準寫成模型看得到的輸入。
          </Callout>
        </FadeIn>

        {/* ============ Claude Code 配 Codex CLI ============ */}
        <FadeIn>
          <Heading id="toolchain">Claude Code 配 Codex CLI</Heading>
          <p>
            工具上是 Claude Code 主導、Codex CLI 當第二意見。在 Windows 上叫 codex 有兩個坑：
            cwd 不是 git repo 要加 <code>--skip-git-repo-check</code>；
            stdin 要關掉，不然它會卡在那邊等輸入。
          </p>
          <Code lang="bash">{`# Windows 上 cwd 非 git repo 要加 --skip-git-repo-check；stdin 要關掉否則會卡住
codex exec --skip-git-repo-check "$(cat prompt.txt)" < /dev/null`}</Code>
          <p>
            兩邊都輸出結構化 JSON，格式一致才好機器比對；codex 偶爾用日文寫解說，整併時統一轉繁中。
            「多一顆引擎當 second source」這個做法，我在
            「<Link href="/blog/claude-call-codex" className="text-primary hover:underline">讓 Claude Code 呼叫 Codex</Link>」
            寫得更細。
          </p>
        </FadeIn>

        {/* ============ 讓加題變成可持續的 loop ============ */}
        <FadeIn>
          <Heading id="sustainability">讓加題變成可持續的 loop</Heading>
          <p>我不想把出題當成一次性的大工程，而是讓它變成可以一直跑的 loop：</p>
          <ul className="my-4 list-inside list-disc space-y-2">
            <li>
              <strong>拆批</strong>：GitHub 上開一個父議題，底下拆 N1、N2、N3 子議題，
              每批大概八題、一批一個 PR。批小，審起來快、出錯也好回。
            </li>
            <li>
              <strong>memory 接力</strong>：用持久化的 memory 記住 loop 的狀態——
              進度、候選清單、已經覆蓋過的等價變體，跨 session 也能接著跑。
            </li>
            <li>
              <strong>踩過的坑</strong>：別開那種「沒有上限的背景 CI 等待迴圈」。
              PR 合併、分支刪掉之後，查詢回空，迴圈條件永遠不成立，就變成殭屍程序在那邊空轉。
              要嘛用有上限的輪詢，要嘛直接查一次就好。
            </li>
          </ul>
        </FadeIn>

        {/* ============ 成果 ============ */}
        <FadeIn>
          <Heading id="results">成果</Heading>
          <p>
            到寫這篇的時候，綜合題九百多題、N1 文法點兩百多個，而且還在加；
            文法 coverage 跨 N1、N2、N3 三級，分多批補完。
            數字不是重點——流程跑順之後，加題從「一次性硬幹」變成「有空就推一批」。
          </p>
        </FadeIn>

        {/* ============ 小結 ============ */}
        <FadeIn>
          <Heading id="takeaways">小結</Heading>
          <p>整理一下實際用到的幾個做法：</p>
          <ul className="my-4 list-inside list-disc space-y-2">
            <li>異質的 multi agent 交叉驗證，比單一模型自審強——盲點不一致，才補得起來。</li>
            <li>能寫死的規則就寫成 lint 跟 test，AI 出的題才放得了量，review 也少盯很多。</li>
            <li>prompt 裡明列「禁用項＋反例參考表」，第一輪就少踩雷，返工少很多。</li>
            <li>用 issue 拆批、memory 接力，讓加題能一直跑下去，不用每次重開上下文。</li>
          </ul>
        </FadeIn>
      </div>
    </article>
  );
}
