import ArticleHeader from "@/components/ArticleHeader";
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
    "用 claude -p 與 Codex skill 委派讀 code、查錯與 review，整理權限限制和額度注意事項。",
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
        <ArticleHeader href="/blog/codex-call-claude" />
        <p className="mb-8 text-text-muted">
          在 Codex 工作時，可以把獨立的讀 code、查錯或 review 交給 Claude Code，
          再把結果帶回來驗證。反方向的設定見〈<Link href="/blog/claude-call-codex" className="prose-link">讓 Claude Code 呼叫 Codex</Link>〉。
        </p>
      </FadeIn>
      <div className="prose-custom space-y-2 leading-relaxed text-text-muted">
        <FadeIn>
          <Heading id="headless">用 claude -p 呼叫模型</Heading>
          <p>
            先裝好 Claude Code 並完成登入。<code>claude -p</code> 會執行任務後結束；
            <a href="https://code.claude.com/docs/en/mcp#use-claude-code-as-an-mcp-server" className="prose-link">claude mcp serve</a>
            只提供工具，不會替 Codex 呼叫 Claude 模型。
          </p>
          <p>在已同意將程式碼送到 Anthropic 的可信任 repo 裡執行。以下是 PowerShell 寫法：</p>
          <Code lang="powershell">{[
            'claude -p "檢查這個 repo，只回報具體問題、檔案與行號，不要修改檔案。"',
            '  --model sonnet',
            '  --tools "Read,Glob,Grep"',
            '  --disallowedTools "mcp__*"',
            '  --strict-mcp-config',
            '  --setting-sources ""',
            '  --settings \'{"disableAllHooks":true}\'',
            '  --no-chrome',
            '  --permission-mode dontAsk',
            '  --no-session-persistence',
            '  --output-format json',
          ].join(" " + String.fromCharCode(96) + "\n")}</Code>
          <p>
            <code>dontAsk</code> 會拒絕需要詢問的操作，JSON 方便取出結果。
            <code>--tools</code> 只限制內建工具，因此另外禁止 MCP 工具，並關掉一般設定來源、hooks 與 Chrome 整合。
            參數詳見 <a href="https://code.claude.com/docs/en/cli-reference" className="prose-link">CLI 文件</a>。
          </p>
        </FadeIn>
        <FadeIn>
          <Heading id="skill">常用就包成 skill</Heading>
          <p>
            現成的 <a href="https://github.com/HanaYukii/hanayukii-site/tree/master/codex-skills/delegate-to-claude" className="prose-link">delegate-to-claude</a>
            包含 Python wrapper。將整個資料夾放到 <code>$HOME/.agents/skills/delegate-to-claude</code>，
            保留 <code>SKILL.md</code> 與 <code>scripts</code>；需要本機 Python 3 和 Claude Code CLI。
          </p>
          <p>
            裝好後可以對 Codex 說：「用 delegate-to-claude 檢查這份修改，已同意將這個 repo 的程式碼送到 Anthropic，只回報問題，不修改。」
            路徑與載入方式見 <a href="https://learn.chatgpt.com/docs/build-skills" className="prose-link">Codex skill 文件</a>。
          </p>
          <p>
            wrapper 另有執行逾時、回合上限和常見自訂認證環境檢查。
            它啟動的是外部 CLI，不是 Codex 原生 subagent；不會自動共享這邊的對話，任務要交代清楚。
          </p>
          <Heading id="read-only">唯讀不等於隔離</Heading>
          <p>
            Read、Glob、Grep 不會把檔案存取範圍鎖在 repo 裡。只用於可信任、沒有敏感內容的工作，
            不要把工具白名單當成安全沙箱，也不要讓兩邊同時修改同一批檔案。
          </p>
          <p>
            Claude 的 <a href="https://code.claude.com/docs/en/sandboxing" className="prose-link">Bash sandbox</a>
            支援 macOS、Linux、WSL2，不支援原生 Windows；檔案工具、MCP 和 hooks 不在這個 sandbox 裡。
            worktree 能分開工作檔案，但不是安全隔離。
          </p>
        </FadeIn>
        <FadeIn>
          <Heading id="test">結果仍要檢查</Heading>
          <p>
            適合交出去的是一段完整 review、陌生模組或失敗原因分析，不是每個小問題都多叫一次。
            要求只回結論、檔案與行號，再由 Codex 核對；Claude 的回覆仍會占用 Codex context。
          </p>
          <p>
            先前曾用測試 repo 跑通，但當時的 token 數不代表現在的固定成本。
            登入有問題時先用 <code>claude auth status</code> 檢查，再依{" "}
            <a href="https://code.claude.com/docs/en/authentication" className="prose-link">認證文件</a>
            處理，不要把所有 401 都當成憑證過期。
          </p>
          <Heading id="billing">確認走哪種額度</Heading>
          <p>
            訂閱登入與 API 認證是不同路徑。<code>claude -p</code> 在有 <code>ANTHROPIC_API_KEY</code> 時會採用 API key，
            但還有優先級更高的雲端供應商或 gateway 設定；沒有這個變數，也不保證一定走訂閱。
            wrapper 會拒絕多種常見自訂認證環境，仍應確認實際登入與計費來源。
          </p>
          <p>
            依 <a href="https://support.claude.com/en/articles/15036540-use-the-claude-agent-sdk-with-your-claude-plan" className="prose-link">2026-10-07 官方更新</a>，
            Agent SDK 與 <code>claude -p</code> 仍可使用訂閱額度；Max／Team 另有每月 API credits。
            申領與使用條件看 <a href="https://support.claude.com/en/articles/17154008-monthly-api-credits-for-max-and-team-plans" className="prose-link">API credits 說明</a>，
            不要把訂閱額度和 API credits 當成同一份。
          </p>
          <p className="mt-6 text-sm text-text-muted">2026-10-15 依官方文件更新；本次未重新執行模型互呼測試。</p>
        </FadeIn>
      </div>
      <RelatedPosts href="/blog/codex-call-claude" />
    </article>
  );
}
