import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import Code from "@/components/CodeBlock";

export const metadata: Metadata = {
  title: "讓 Claude Code 呼叫 Codex | 花雪 HanaYukii",
  description:
    "用官方的 codex-plugin-cc，在 Claude Code 裡直接叫 Codex 做 code review、對抗式審查、或把卡住的任務丟給它。完整安裝步驟、登入認證、設定，以及費用怎麼算。",
  openGraph: {
    title: "讓 Claude Code 呼叫 Codex",
    description:
      "codex-plugin-cc 安裝、登入、設定與用法，附費用說明。",
    type: "article",
  },
};

function Heading({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <h2 id={id} className="mb-4 mt-12 scroll-mt-20 text-2xl font-bold text-warm">
      {children}
    </h2>
  );
}

export default function ClaudeCallCodex() {
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
          <span className="rounded-full bg-sky/10 px-2.5 py-0.5 text-xs font-medium text-sky">
            AI
          </span>
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            Tooling
          </span>
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight">
          讓 Claude Code 呼叫 Codex
        </h1>
        <p className="mb-8 text-text-muted">
          OpenAI 官方出了一個 Claude Code 外掛{" "}
          <a
            href="https://github.com/openai/codex-plugin-cc"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            codex-plugin-cc
          </a>
          ，裝了之後可以在同一個 Claude Code session 裡直接叫 Codex 來做 code
          review、對抗式審查，或把卡住的任務整包丟給它（rescue）。等於 Claude
          主導、Codex 當第二顆腦。
        </p>
      </FadeIn>

      <div className="prose-custom space-y-2 leading-relaxed text-text-muted [&_code]:rounded [&_code]:bg-surface [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_code]:text-primary [&_strong]:text-text">
        {/* 最省事裝法 */}
        <FadeIn>
          <div className="my-2 rounded-r-lg border-l-2 border-warm/40 bg-surface/40 px-4 py-3">
            <p>
              <strong>最省事的方法</strong>：把這個 repo 連結{" "}
              <a
                href="https://github.com/openai/codex-plugin-cc"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                openai/codex-plugin-cc
              </a>{" "}
              丟給 Claude Code，請它讀 README 帶你裝——能自動跑的（裝 Codex CLI、檢查環境）它會幫你跑，
              <code>/plugin</code> 那幾行 slash command 還是你自己貼。想完全照著做，看下面手動流程。
            </p>
          </div>
        </FadeIn>

        {/* 前置 */}
        <FadeIn>
          <Heading id="prereq">先準備兩樣東西</Heading>
          <ul className="my-3 list-disc space-y-2 pl-6">
            <li>
              <strong>Node.js 18.18 或更新</strong>（<code>node -v</code> 檢查）。
            </li>
            <li>
              <strong>一個能用 Codex 的帳號</strong>：ChatGPT 帳號（Free
              或付費方案都行）或 OpenAI API key。怎麼付看{" "}
              <a href="#cost" className="text-primary hover:underline">
                最後一段
              </a>
              。
            </li>
          </ul>
        </FadeIn>

        {/* 安裝 */}
        <FadeIn>
          <Heading id="install">安裝（四行指令）</Heading>
          <p>
            下面四行都是在 <strong>Claude Code 裡</strong>輸入的 slash
            command，一行一行貼：
          </p>

          <p className="mt-4">
            <strong>1.</strong> 加入官方外掛市集：
          </p>
          <Code lang="text">{`/plugin marketplace add openai/codex-plugin-cc`}</Code>
          <p>
            <strong>2.</strong> 安裝外掛：
          </p>
          <Code lang="text">{`/plugin install codex@openai-codex`}</Code>
          <p>
            <strong>3.</strong> 重新載入外掛讓指令生效：
          </p>
          <Code lang="text">{`/reload-plugins`}</Code>

          <p>
            <strong>4.</strong> 跑設定精靈，它會檢查 Codex CLI 在不在：
          </p>
          <Code lang="text">{`/codex:setup`}</Code>
          <p>
            如果 <code>/codex:setup</code> 說找不到 Codex CLI，手動裝一次再回來：
          </p>
          <Code lang="bash">{`npm install -g @openai/codex`}</Code>
        </FadeIn>

        {/* 登入 */}
        <FadeIn>
          <Heading id="login">登入 Codex</Heading>
          <p>
            外掛沿用你本機的 Codex 登入：用過就自動接上，沒有就登入一次（
            <code>!</code> 開頭是跑 shell 指令）：
          </p>
          <Code lang="bash">{`!codex login`}</Code>
          <p>
            會讓你選 <strong>ChatGPT 帳號</strong>（走方案內含額度）或{" "}
            <strong>API key</strong>（走 API 按量計費）——兩條路的差別在最後一段。
          </p>
        </FadeIn>

        {/* 設定 */}
        <FadeIn>
          <Heading id="config">（選用）調設定</Heading>
          <p>
            想固定用哪個模型、推理多深，在使用者層級的{" "}
            <code>~/.codex/config.toml</code> 或專案根目錄的{" "}
            <code>.codex/config.toml</code> 寫：
          </p>
          <Code lang="toml">{`model = "gpt-5.4-mini"
model_reasoning_effort = "high"`}</Code>
          <p>不寫也能用，外掛會走預設值。</p>
        </FadeIn>

        {/* 用法 */}
        <FadeIn>
          <Heading id="usage">怎麼用：用講的就好</Heading>
          <p>
            裝好後不一定要記指令，直接用講的就行：叫 Claude 開個 subagent
            把工作委派給 Codex——例如「開個 subagent 讓 Codex review 這份
            diff」，或丟個 task 過去（code review、查 failing test、試修 bug
            之類）。等於多一顆引擎當 <strong>second source</strong>，跟 Claude
            自己的結果對照。
          </p>
          <p>想要明確指令，也可以直接打：</p>
          <ul className="my-3 list-disc space-y-2 pl-6">
            <li>
              <code>/codex:review</code> — 標準 code review
            </li>
            <li>
              <code>/codex:adversarial-review</code> — 對抗式審查，挑得更兇
            </li>
            <li>
              <code>/codex:rescue</code> — 把一個任務整包委派給 Codex
            </li>
            <li>
              <code>/codex:status</code>、<code>/codex:result</code>、{" "}
              <code>/codex:cancel</code> — 看進度、拿結果、取消背景工作
            </li>
          </ul>
        </FadeIn>

        {/* 費用 */}
        <FadeIn>
          <Heading id="cost">費用怎麼算（怎麼付）</Heading>
          <p>
            Codex <strong>沒有獨立訂閱</strong>，付費走兩條路，登入時選哪種就走哪種：
          </p>

          <p className="mt-4">
            <strong>A. 用 ChatGPT 帳號（方案內含額度）</strong>
          </p>
          <p>
            Codex 已內含在每個 ChatGPT 方案裡（含 Free），不用另外買。輕度用 Plus
            （$20）通常就夠，Pro（$100 起）額度高很多。額度依模型與任務大小變動，
            最新以官方定價頁為準。
          </p>

          <p className="mt-4">
            <strong>B. 用 API key（按 token 計費）</strong>
          </p>
          <p>
            登入時改用 OpenAI API key，用量就走 OpenAI Platform 帳戶、按標準 API
            token 計費，<strong>跟 ChatGPT 方案的額度分開</strong>。重度使用、
            或想要可控、可報帳的帳單時選這個。
          </p>

          <p className="mt-4">
            <strong>輕用挑 ChatGPT Plus 吃內含額度，重用或要帳單透明就用 API key</strong>。
            最新價格以{" "}
            <a
              href="https://developers.openai.com/codex/pricing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              官方定價頁
            </a>{" "}
            為準。
          </p>
        </FadeIn>

        {/* 反過來 */}
        <FadeIn>
          <Heading id="reverse">反過來：讓 Codex 呼叫 Claude</Heading>
          <p>
            沒有像 codex-plugin-cc 那樣的單一官方外掛，但反過來也做得到：Claude Code
            可以用 <code>claude mcp serve</code> 跑成一個 stdio MCP server，Codex
            把它註冊成 MCP server 就能呼叫。在 Codex 的設定檔（
            <code>~/.codex/config.toml</code> 或專案的 <code>.codex/config.toml</code>）加：
          </p>
          <Code lang="toml">{`[mcp_servers.claude]
command = "claude"
args = ["mcp", "serve"]`}</Code>
          <p>
            重啟 Codex 後用 <code>/mcp</code> 確認接上，能用的能力以 Claude Code
            MCP server 實際暴露的 tools 為準。Codex 自己也有官方 Subagents、
            社群也有 claude-codex-bridge 之類的橋接，想更進階再看。
          </p>
        </FadeIn>

      </div>
    </article>
  );
}
