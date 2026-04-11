import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import Code from "@/components/CodeBlock";

export const metadata: Metadata = {
  title: "系統設計面試的經典注意事項 | 花雪 HanaYukii",
  description:
    "以 Auto-complete 為例，整理系統設計面試中常見的思路跟技術細節。",
  openGraph: {
    title: "系統設計面試的經典注意事項",
    description:
      "以 Auto-complete 為例，整理系統設計面試中常見的思路跟技術細節。",
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

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="mb-3 mt-8 text-lg font-bold">{children}</h3>;
}

export default function SystemDesignFundamentals() {
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
            System Design
          </span>
          <span className="rounded-full bg-sky/10 px-2.5 py-0.5 text-xs font-medium text-sky">
            Interview
          </span>
        </div>

        <h1 className="mb-2 text-3xl font-extrabold leading-tight sm:text-4xl">
          系統設計面試的經典注意事項
        </h1>
        <p className="mb-2 text-sm text-text-muted">2026-04-11</p>
        <p className="mb-8 text-text-muted">
          以「Auto-complete」為案例，整理系統設計面試常見的思路跟技術細節。
        </p>
      </FadeIn>

      {/* ======================== Framework ======================== */}
      <FadeIn delay={0.1}>
        <Heading id="framework">不要直接寫 code</Heading>

        <p className="mb-4 text-text-muted">
          先拆問題，確認範圍：
        </p>

        <ul className="mb-4 space-y-2 text-sm text-text-muted list-disc list-inside">
          <li><strong className="text-text">Functional Requirements</strong> - 組件要做什麼（輸入框、搜尋按鈕、建議清單）</li>
          <li><strong className="text-text">Non-functional Requirements</strong> - 效能、Accessibility、安全性、擴展性</li>
          <li><strong className="text-text">模組化設計</strong> - 拆組件、定義 state，先畫架構再寫 code</li>
        </ul>
      </FadeIn>

      {/* ======================== State ======================== */}
      <FadeIn delay={0.15}>
        <Heading id="state">狀態設計</Heading>

        <Code lang="typescript">{`interface AutoCompleteState {
  searchQuery: string;
  suggestions: { id: string; text: string; priority: number }[];
  loading: boolean;
  error: string | null;
  highlightedIndex: number;   // 鍵盤導覽用
}`}</Code>

        <p className="mb-3 text-text-muted">
          把 loading / error 也放進來，後面討論 debounce、cache 時有共同語言。
        </p>
      </FadeIn>

      {/* ======================== Debounce ======================== */}
      <FadeIn delay={0.2}>
        <Heading id="debounce">Debounce vs Throttle</Heading>

        <p className="mb-3 text-text-muted">
          使用者每打一個字就送請求 = DDoS 自己的 backend。
        </p>

        <p className="mb-3 text-text-muted">
          <strong className="text-text">Debounce</strong>：停止輸入 300ms 後才送。Auto-complete 幾乎都用這個。
        </p>

        <Code lang="typescript">{`function useDebounce(value: string, delay: number) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}`}</Code>

        <p className="mb-3 text-text-muted">
          <strong className="text-text">Throttle</strong>：固定頻率送（如每 500ms），適合 scroll、resize 這種持續觸發的 event。
        </p>
      </FadeIn>

      {/* ======================== Performance ======================== */}
      <FadeIn delay={0.25}>
        <Heading id="performance">渲染效能</Heading>

        <ul className="mb-4 space-y-2 text-sm text-text-muted list-disc list-inside">
          <li><code>React.memo</code> 包 suggestion item，list item 用 <code>id</code> 當 key（不要用 index）</li>
          <li>建議清單太長就用 virtualization（react-window），只 render 可視區域</li>
          <li>注意 INP (Interaction to Next Paint)，main thread 不要被 long task 卡住</li>
        </ul>
      </FadeIn>

      {/* ======================== Cache ======================== */}
      <FadeIn delay={0.3}>
        <Heading id="cache">快取</Heading>

        <ul className="mb-4 space-y-2 text-sm text-text-muted list-disc list-inside">
          <li><strong className="text-text">Client cache</strong> - 前端用 Map 存查過的結果，打回同樣的字直接用 cache</li>
          <li><strong className="text-text">Server cache</strong> - Redis / CDN 快取熱門搜尋（世界盃期間 &quot;world cup&quot; 不用每次打 DB）</li>
          <li><strong className="text-text">LRU 淘汰</strong> - cache 滿了踢掉最久沒用的 entry</li>
        </ul>

        <Code lang="typescript">{`const cache = new Map<string, Suggestion[]>();

async function fetchSuggestions(query: string) {
  if (cache.has(query)) return cache.get(query)!;
  const result = await api.search(query);
  cache.set(query, result);
  return result;
}`}</Code>
      </FadeIn>

      {/* ======================== Accessibility ======================== */}
      <FadeIn delay={0.35}>
        <Heading id="a11y">Accessibility</Heading>

        <ul className="mb-4 space-y-2 text-sm text-text-muted list-disc list-inside">
          <li>建議清單用 <code>&lt;ul&gt;</code> + <code>&lt;li&gt;</code>，不要全是 <code>&lt;div&gt;</code></li>
          <li>Input 加 <code>role=&quot;combobox&quot;</code>，清單加 <code>role=&quot;listbox&quot;</code>，<code>aria-activedescendant</code> 指向目前 highlight 的選項</li>
          <li>上下鍵切換、Enter 選擇、Escape 關閉，確保純鍵盤可操作</li>
        </ul>
      </FadeIn>

      {/* ======================== Race Condition ======================== */}
      <FadeIn delay={0.4}>
        <Heading id="race">Race Condition</Heading>

        <p className="mb-3 text-text-muted">
          快速打字時，先發的請求可能比後發的晚回來。
          用 AbortController 取消過期請求：
        </p>

        <Code lang="typescript">{`const controllerRef = useRef<AbortController>();

async function fetchSuggestions(query: string) {
  controllerRef.current?.abort();
  const controller = new AbortController();
  controllerRef.current = controller;

  const res = await fetch(\`/api/suggestions?q=\${query}\`, {
    signal: controller.signal,
  });
  return res.json();
}`}</Code>
      </FadeIn>

      {/* ======================== Tips ======================== */}
      <FadeIn delay={0.45}>
        <Heading id="tips">面試技巧</Heading>

        <ul className="mb-4 space-y-2 text-sm text-text-muted list-disc list-inside">
          <li>在白板上寫下思路結構，不要只用講的</li>
          <li>主動提出 mobile vs desktop 差異、i18n、error boundary</li>
          <li>即使是前端也要能討論 API 設計（REST vs GraphQL、endpoint 怎麼切）</li>
        </ul>
      </FadeIn>

      <FadeIn delay={0.5}>
        <div className="mt-8 flex flex-wrap gap-2 text-xs">
          {["System Design", "Interview", "Debounce", "Caching", "Accessibility"].map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-surface px-3 py-1 text-text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </FadeIn>
    </article>
  );
}
