import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import Code from "@/components/CodeBlock";
import { articleMetadata } from "@/lib/seo";
import PostJsonLd from "@/components/PostJsonLd";
import RelatedPosts from "@/components/RelatedPosts";

export const metadata: Metadata = articleMetadata("/blog/codex-call-claude", {
  title: "讓 Codex 呼叫 Claude Code | 花雪 HanaYukii",
  description:
    "用 claude -p 把獨立的讀 code、查錯與 code review 交給 Claude Code，再做成 Codex skill 視情況自動委派。",
  openGraph: {
    title: "讓 Codex 呼叫 Claude Code",
    description:
      "用 claude -p 和 user-scope skill，讓 Codex 把適合的唯讀任務交給 Claude Code。",
    type: "article",
  },
});

function Heading({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <h2 id={id} className="mb-4 mt-12 scroll-mt-20 text-2xl font-bold text-warm">
      {children}
    </h2>
  );
}

export default function CodexCallClaude() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <PostJsonLd href="/blog/codex-call-claude" />
      <FadeIn>
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-1 text-sm text-text-muted transition-colors hover:text-primary"
        >
          &larr; Back to Blog
        </Link>

        <div className="mb-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-sky/10 px-2.5 py-0.5 text-xs font-medium text-sky">
            AI
          </span>
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            Tooling
          </span>
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight">
          讓 Codex 呼叫 Claude Code
        </h1>
        <p className="mb-8 text-text-muted">
          前一篇寫的是「
          <Link href="/blog/claude-call-codex" className="prose-link">
            讓 Claude Code 呼叫 Codex
          </Link>
          」。現在我自己大多待在 Codex，手上又有每月 200 美元的 Claude Max
          方案，就也想把方向反過來：遇到獨立的讀 code、查錯或 review，交給
          Claude 跑完，再把精簡結果帶回 Codex 判斷和收尾。
        </p>
      </FadeIn>

      <div className="prose-custom space-y-2 leading-relaxed text-text-muted [&_code]:rounded [&_code]:bg-surface [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_code]:text-primary [&_strong]:text-text">
        <FadeIn>
          <Heading id="headless">正確入口是 claude -p</Heading>
          <p>
            我原本在上一篇末尾寫成 <code>claude mcp serve</code>，這裡先更正。
            Anthropic 的
            <a
              href="https://code.claude.com/docs/en/mcp#use-claude-code-as-an-mcp-server"
              target="_blank"
              rel="noopener noreferrer"
              className="prose-link"
            >
              MCP 說明
            </a>
            寫得很清楚：它暴露的是 Claude Code 的 Read、Edit、LS 等 tools，並不會替
            MCP client 跑一輪 Claude 模型。真的要把 task 交給 Claude，直接用
            <a
              href="https://code.claude.com/docs/en/headless"
              target="_blank"
              rel="noopener noreferrer"
              className="prose-link"
            >
              非互動模式
            </a>
            <code>claude -p</code> 就好。
          </p>
          <Code lang="powershell">{`claude -p "請檢查這個 repo 的實作，只回傳具體問題、檔案與行號，不要修改檔案。" \`
  --model sonnet \`
  --effort low \`
  --tools "Read,Glob,Grep" \`
  --permission-mode dontAsk \`
  --no-session-persistence \`
  --output-format json`}</Code>
          <p>
            <code>dontAsk</code> 讓超出權限的操作直接被拒絕，不會在背景等人回答；JSON
            則方便 Codex 只取最後結果。完整參數可以看
            <a
              href="https://code.claude.com/docs/en/cli-usage"
              target="_blank"
              rel="noopener noreferrer"
              className="prose-link"
            >
              Claude Code CLI 文件
            </a>
            。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="skill">做成 Codex skill</Heading>
          <p>
            我把這段包成一個 user-scope 的 Codex skill，原始碼放在
            <a
              href="https://github.com/HanaYukii/hanayukii-site/tree/master/codex-skills/delegate-to-claude"
              target="_blank"
              rel="noopener noreferrer"
              className="prose-link"
            >
              delegate-to-claude
            </a>
            。裝在 <code>$HOME/.agents/skills</code> 後，Codex 可以依 skill 的描述
            隱式觸發，不需要每次重打一整串命令；這也是
            <a
              href="https://developers.openai.com/codex/skills/"
              target="_blank"
              rel="noopener noreferrer"
              className="prose-link"
            >
              官方支援的 skill 路徑
            </a>
            。
          </p>
          <p>
            它不是 Codex 的 native subagent，只是從 skill 裡啟動外部 Claude CLI，拿回
            一份結果，再由 Codex 驗證。這個差別其實滿重要：兩邊不共享對話狀態，也不該同時
            改同一批檔案。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="read-only">先只開讀取權限</Heading>
          <p>
            目前 skill 只允許 Read、Glob、Grep。原生 Windows 下這些讀取工具不是
            path-bound，所以只會用在可信任、沒有敏感內容的 repo，而且讀取前會先確認是否同意
            把程式碼送到 Anthropic。我主要會派完整一點的 code review、讀陌生 module、找
            failing test 的可能原因，或請另一個模型給 second opinion；修改和最後驗證仍留在
            Codex。
          </p>
          <p>
            我刻意沒有開 Edit 或 Bash。Claude Code 的
            <a
              href="https://code.claude.com/docs/en/sandboxing"
              target="_blank"
              rel="noopener noreferrer"
              className="prose-link"
            >
              OS-level sandbox
            </a>
            目前只支援 macOS 和 Linux。真的需要 Claude 動手時，我會另外準備隔離的
            worktree，而不是讓兩個 agent 搶同一份 working tree。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="test">實際跑了一次</Heading>
          <p>
            設定時先遇到一個小坑：<code>claude auth status</code> 明明顯示 Max，第一次
            <code>claude -p</code> 卻回 401。重新跑
            <code>claude auth login --claudeai</code> 後就正常了，應該只是本機快取的訂閱
            credential 過期。登入方式可以查
            <a
              href="https://code.claude.com/docs/en/authentication"
              target="_blank"
              rel="noopener noreferrer"
              className="prose-link"
            >
              官方認證文件
            </a>
            。
          </p>
          <p>
            synthetic repo 測試則正確讀出 Next.js、pnpm 與 build/test 指令，
            過程沒有 permission denial。最初載入一般設定直接跑 <code>claude -p</code>，
            最小的 Haiku 測試建立了 9,632 個 cache tokens；收緊 wrapper、關掉一般設定、
            hooks、MCP 和 Chrome integration 後仍有 6,082 個。所以一句話能回答的小題不值得
            特別派，整段 review、查錯或需要讀一批檔案時才比較合理。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="billing">額度怎麼算</Heading>
          <p>
            如果環境裡有 <code>ANTHROPIC_API_KEY</code>，Claude Code 會優先走 API
            計費；我的 wrapper 偵測到時會先拒絕，避免以為在吃 Max 額度，結果另外收到 API
            帳單。沒有 API key 時就沿用本機的 Claude 訂閱登入。
          </p>
          <p>
            Anthropic 在 2026 年 7 月原本打算把 Agent SDK（包含 <code>claude -p</code>）
            從訂閱額度拆出去，後來
            <a
              href="https://support.claude.com/en/articles/15036540-use-the-claude-agent-sdk-with-your-claude-plan"
              target="_blank"
              rel="noopener noreferrer"
              className="prose-link"
            >
              暫停了這項變更
            </a>
            ，目前仍可使用方案內額度。JSON 裡的 <code>total_cost_usd</code> 是這次用量的
            估算，不代表 Max 帳號又被加收一筆。
          </p>
          <p>
            這套做法比較像把一部分工作移到 Claude 的額度，不是讓 token 消失；Claude 回傳的
            內容最後仍會進 Codex context。所以我會把 task 切得完整一點，也要求只回結論、檔案
            和行號。這樣才真的有派出去的意義。
          </p>
        </FadeIn>
      </div>

      <RelatedPosts href="/blog/codex-call-claude" />
    </article>
  );
}
