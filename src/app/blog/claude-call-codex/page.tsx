import ArticleHeader from "@/components/ArticleHeader";
import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import Code from "@/components/CodeBlock";
import { articleMetadata } from "@/lib/seo";
import PostJsonLd from "@/components/PostJsonLd";
import RelatedPosts from "@/components/RelatedPosts";

export const metadata: Metadata = articleMetadata("/blog/claude-call-codex", {
  title: "讓 Claude Code 呼叫 Codex | 花雪 HanaYukii",
  description:
    "用官方外掛在 Claude Code 裡呼叫 Codex：安裝、review、任務委派與額度注意事項。",
  openGraph: {
    title: "讓 Claude Code 呼叫 Codex",
    description:
      "codex-plugin-cc 安裝、登入、設定與用法，附費用說明。",
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

export default function ClaudeCallCodex() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <PostJsonLd href="/blog/claude-call-codex" />
      <FadeIn>
        <ArticleHeader href="/blog/claude-call-codex" />
        <p className="mb-8 text-text-muted">
          在 Claude Code 裡用 OpenAI 官方的{" "}
          <a href="https://github.com/openai/codex-plugin-cc" className="prose-link">codex-plugin-cc</a>
          ，就能叫 Codex review、查 bug 或接手修改。Claude 負責主要工作，需要另一個模型檢查時再交出去。
        </p>
      </FadeIn>
      <div className="prose-custom space-y-2 leading-relaxed text-text-muted">
        <FadeIn>
          <Heading id="prereq">準備環境</Heading>
          <p>
            先裝好 Claude Code、Node.js 18.18 以上，以及能使用 Codex CLI 的帳號或 OpenAI API key。
            Free／Go 有 Codex 功能不代表所有入口都能用，CLI 資格請看{" "}
            <a href="https://learn.chatgpt.com/docs/pricing" className="prose-link">目前方案說明</a>。
          </p>
          <Heading id="install">安裝外掛</Heading>
          <p>以下在 Claude Code 裡逐行輸入：</p>
          <Code lang="text">{" /plugin marketplace add openai/codex-plugin-cc\n/plugin install codex@openai-codex\n/reload-plugins\n/codex:setup".trim()}</Code>
          <p>setup 會檢查 Codex CLI。若找不到，可以在終端機手動安裝：</p>
          <Code lang="bash">{"npm install -g @openai/codex"}</Code>
          <Heading id="login">登入 Codex</Heading>
          <p>外掛沿用本機 Codex 登入。還沒登入的話，在終端機執行：</p>
          <Code lang="bash">{"codex login"}</Code>
          <p>使用 API key 時，改用 <code>codex login --with-api-key</code> 從標準輸入讀入金鑰，不要把金鑰貼進對話或提交進 repo。</p>
        </FadeIn>
        <FadeIn>
          <Heading id="usage">呼叫範例</Heading>
          <p>檢查目前修改，放到背景跑：</p>
          <Code lang="text">{"/codex:review --background\n/codex:status\n/codex:result"}</Code>
          <p>檢查分支相對於 main 的變更，或指定想挑戰的設計：</p>
          <Code lang="text">{"/codex:review --base main\n/codex:adversarial-review --base main 檢查快取失效與重試設計"}</Code>
          <p>
            這兩種 review 都是唯讀。一般 review 不接受自訂重點；要指定風險或質疑設計，才用 adversarial review。
          </p>
          <p>需要動手查錯、試修或接續上次任務，用 rescue：</p>
          <Code lang="text">{"/codex:rescue 找出測試失敗原因，做最小修改並驗證\n/codex:rescue --resume 接著處理上一輪發現的問題"}</Code>
          <p>
            也可以直接對 Claude 說「請 Codex review 這份 diff」。委派修改時，別讓兩邊同時改同一批檔案；
            背景工作可用 <code>/codex:cancel</code> 取消。
          </p>
          <p>
            若想整段換到 Codex 繼續，用 <code>/codex:transfer</code>。
            它會匯入目前對話並給出 <code>codex resume</code> 指令；需要支援 session import 的 Codex 版本。
            這是移交對話，不是請 Codex 做完後回報。
          </p>
        </FadeIn>
        <FadeIn>
          <Heading id="config">模型先用預設</Heading>
          <p>
            不必先改設定檔。需要固定模型時，再從{" "}
            <a href="https://learn.chatgpt.com/docs/models" className="prose-link">帳號與使用介面支援的模型</a>
            選擇。舊範例的 <code>gpt-5.4-mini</code> 已退出 ChatGPT 登入的 Codex，不要再直接照抄；
            API key 的模型供應另計。
          </p>
          <Heading id="cost">額度與費用</Heading>
          <p>
            Claude 和 Codex 分別計算用量。Codex 用 ChatGPT 登入時走方案額度，用 API key 時走 OpenAI API 計費，
            兩者分開。不要只憑「輕度／重度」決定哪種划算，先看自己的額度與任務量。
          </p>
          <p>
            方案與可用入口以 <a href="https://learn.chatgpt.com/docs/pricing" className="prose-link">官方定價頁</a> 為準；
            外掛最新指令看 <a href="https://github.com/openai/codex-plugin-cc" className="prose-link">README</a>。
          </p>
          <Heading id="reverse">反過來呼叫 Claude</Heading>
          <p>
            Codex 委派給 Claude 模型要用 <code>claude -p</code>，不是只暴露工具的 <code>claude mcp serve</code>。
            範例與權限設定放在〈<Link href="/blog/codex-call-claude" className="prose-link">讓 Codex 呼叫 Claude Code</Link>〉。
          </p>
          <p className="mt-6 text-sm text-text-muted">2026-10-15 依官方文件更新；本次未重新執行模型互呼測試。</p>
        </FadeIn>
      </div>
      <RelatedPosts href="/blog/claude-call-codex" />
    </article>
  );
}
