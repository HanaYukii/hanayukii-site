import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import Figure from "@/components/Figure";
import Code from "@/components/CodeBlock";
import { InlineMath, BlockMath } from "@/components/Math";
import { articleMetadata } from "@/lib/seo";
import PostJsonLd from "@/components/PostJsonLd";
import RelatedPosts from "@/components/RelatedPosts";

export const metadata: Metadata = articleMetadata("/blog/llm-text-watermark", {
  title: "Claude 文字浮水印：從 token sampling 理解原理 | 花雪 HanaYukii",
  description:
    "先從 LLM 如何替下一個 token 分配機率講起，再用 green / red list 的簡單例子解釋文字浮水印如何留下統計訊號，以及局部修改為什麼不一定會洗掉它。",
  openGraph: {
    title: "Claude 文字浮水印：從 token sampling 理解原理",
    description:
      "LLM 每次替候選 token 算機率；watermark 只要偷偷偏一點，長文裡就會累積成可辨識的統計訊號。",
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

function Fact({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-4 border-l-2 border-primary bg-primary/5 px-4 py-3 text-sm">
      <span className="mr-2 font-mono text-[11px] font-bold tracking-wider text-primary">
        已公開
      </span>
      {children}
    </div>
  );
}

function Guess({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-4 border-l-2 border-dashed border-warm/60 bg-warm/5 px-4 py-3 text-sm">
      <span className="mr-2 font-mono text-[11px] font-bold tracking-wider text-warm">
        推測
      </span>
      {children}
    </div>
  );
}

function QuickAnswer({
  number,
  question,
  children,
}: {
  number: number;
  question: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-x-3 border-t border-primary/20 py-5 first:border-t-0 first:pt-0 last:pb-0">
      <span className="mt-0.5 flex h-7 min-w-7 items-center justify-center rounded-md bg-primary px-1.5 font-mono text-xs font-bold text-bg">
        Q{number}
      </span>
      <div>
        <h3 className="mb-2 text-lg font-bold text-text">{question}</h3>
        <div className="text-text-muted">{children}</div>
      </div>
    </div>
  );
}

function GlossaryItem({
  term,
  children,
}: {
  term: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-sky/25 bg-surface/70 p-4">
      <p className="mb-1.5 font-mono text-sm font-bold text-sky">{term}</p>
      <p className="text-sm leading-relaxed text-text-muted">{children}</p>
    </div>
  );
}

const ink = "var(--illustration-ink)";
const muted = "var(--illustration-muted)";
const border = "var(--illustration-border)";
const surfaceAlt = "var(--illustration-surface-alt)";
const green = "var(--illustration-accent)";
const greenSoft = "var(--illustration-accent-soft)";
const greenWash = "var(--illustration-accent-wash)";
const red = "var(--illustration-warm)";
const redSoft = "var(--illustration-warm-soft)";
const sky = "var(--illustration-sky)";
const ghost = "var(--illustration-ghost)";

const mono = "var(--font-mono), monospace";

/* 圖 1：訊號藏在哪裡 */
function FigWhere() {
  const chars = ["今", "天", "天", "氣", "很", "好"];
  return (
    <svg viewBox="0 0 720 286" className="block h-auto w-full min-w-[600px]">
      <rect x="24" y="40" width="320" height="216" rx="16" fill={surfaceAlt} stroke={border} strokeWidth="1.5" />
      <rect x="376" y="40" width="320" height="216" rx="16" fill={greenWash} stroke={border} strokeWidth="1.5" />

      <text x="44" y="26" fontSize="14" fontWeight="700" fill={ink}>
        做法 A：把額外的東西塞進去
      </text>
      <text x="396" y="26" fontSize="14" fontWeight="700" fill={ink}>
        做法 B：訊號在「選了哪個 token」
      </text>

      {chars.map((c, i) => (
        <g key={`a-${i}`}>
          <rect x={49 + i * 46} y="74" width="40" height="40" rx="8" fill="var(--illustration-paper)" stroke={border} />
          <text x={69 + i * 46} y="101" fontSize="17" textAnchor="middle" fill={ink}>
            {c}
          </text>
        </g>
      ))}
      {[0, 1, 2, 3, 4].map((i) => (
        <line
          key={`zw-${i}`}
          x1={92 + i * 46}
          y1="72"
          x2={92 + i * 46}
          y2="116"
          stroke={red}
          strokeWidth="2"
          strokeDasharray="3 3"
        />
      ))}
      <text x="49" y="142" fontSize="12.5" fill={muted}>
        字與字之間多了看不見的字元，
      </text>
      <text x="49" y="162" fontSize="12.5" fill={muted}>
        或訊號放在檔案 metadata 裡
      </text>
      <path d="M184 176 L184 194" fill="none" stroke={muted} strokeWidth="1.5" strokeDasharray="5 5" />
      <path d="M178 190 L184 198 L190 190" fill="none" stroke={muted} strokeWidth="1.5" />
      <text x="184" y="220" fontSize="13.5" textAnchor="middle" fill={red} fontWeight="600">
        複製成純文字、重新排版
      </text>
      <text x="184" y="242" fontSize="13.5" textAnchor="middle" fill={red} fontWeight="600">
        → 訊號跟著消失
      </text>

      {chars.map((c, i) => {
        const hit = i === 0 || i === 2 || i === 3 || i === 5;
        return (
          <g key={`b-${i}`}>
            <rect
              x={401 + i * 46}
              y="74"
              width="40"
              height="40"
              rx="8"
              fill={hit ? greenSoft : "var(--illustration-paper)"}
              stroke={hit ? green : border}
              strokeWidth={hit ? 1.8 : 1}
            />
            <text x={421 + i * 46} y="101" fontSize="17" textAnchor="middle" fill={ink}>
              {c}
            </text>
          </g>
        );
      })}
      <text x="401" y="142" fontSize="12.5" fill={muted}>
        每個字都是正常的字，一個都沒多
      </text>
      <text x="401" y="162" fontSize="12.5" fill={muted}>
        但落在祕密偏好集合裡的比例偏高
      </text>
      <path d="M536 176 L536 196" fill="none" stroke={muted} strokeWidth="1.5" strokeDasharray="5 5" />
      <path d="M530 190 L536 198 L542 190" fill="none" stroke={muted} strokeWidth="1.5" />
      <text x="536" y="220" fontSize="13.5" textAnchor="middle" fill={green} fontWeight="600">
        複製貼上文字一模一樣
      </text>
      <text x="536" y="242" fontSize="13.5" textAnchor="middle" fill={green} fontWeight="600">
        → 訊號還在
      </text>
    </svg>
  );
}

/* 一般 LLM 如何選下一個 token */
function FigSampling() {
  const rows = [
    { token: "有效", p: 31, color: green },
    { token: "實用", p: 28, color: sky },
    { token: "有用", p: 24, color: muted },
    { token: "強大", p: 10, color: red },
  ];

  return (
    <svg viewBox="0 0 760 310" className="block h-auto w-full min-w-[640px]">
      <text x="32" y="31" fontSize="14" fontWeight="700" fill={ink}>
        LLM 不是先寫好整句，而是每次選一個 token
      </text>

      <rect x="32" y="62" width="190" height="82" rx="14" fill={surfaceAlt} stroke={border} strokeWidth="1.5" />
      <text x="127" y="91" textAnchor="middle" fontSize="12" fill={muted}>目前的文字</text>
      <text x="127" y="121" textAnchor="middle" fontSize="16" fontWeight="700" fill={ink}>「這個方法很 ___」</text>

      <path d="M232 103 L270 103" fill="none" stroke={muted} strokeWidth="1.8" />
      <path d="M264 97 L272 103 L264 109" fill="none" stroke={muted} strokeWidth="1.8" />

      <rect x="282" y="50" width="268" height="206" rx="16" fill={greenWash} stroke={green} strokeWidth="1.5" />
      <text x="302" y="79" fontSize="13.5" fontWeight="700" fill={ink}>下一個 token 的機率</text>
      {rows.map((row, i) => (
        <g key={row.token}>
          <text x="302" y={115 + i * 36} fontSize="13.5" fill={ink}>{row.token}</text>
          <rect x="356" y={104 + i * 36} width="132" height="14" rx="7" fill={ghost} />
          <rect x="356" y={104 + i * 36} width={row.p * 4} height="14" rx="7" fill={row.color} fillOpacity="0.85" />
          <text x="522" y={115 + i * 36} textAnchor="end" fontSize="12" fill={muted} fontFamily={mono}>{row.p}%</text>
        </g>
      ))}
      <text x="302" y="239" fontSize="11.5" fill={muted}>其餘 token 合計 7%</text>

      <path d="M560 153 L598 153" fill="none" stroke={green} strokeWidth="1.8" />
      <path d="M592 147 L600 153 L592 159" fill="none" stroke={green} strokeWidth="1.8" />

      <rect x="610" y="105" width="118" height="96" rx="16" fill={greenSoft} stroke={green} strokeWidth="1.8" />
      <text x="669" y="132" textAnchor="middle" fontSize="12" fill={muted}>抽到</text>
      <text x="669" y="165" textAnchor="middle" fontSize="21" fontWeight="700" fill={ink}>有效</text>
      <text x="669" y="187" textAnchor="middle" fontSize="11.5" fill={green}>接回文字，繼續下一輪</text>

      <text x="380" y="288" textAnchor="middle" fontSize="12" fill={muted}>
        31% 不是必選；只是抽到「有效」的機會最高
      </text>
    </svg>
  );
}

/* 一個 token 怎麼被 watermark 偏 */
function FigBias() {
  const before = [
    { t: "有效", p: 31, hit: true },
    { t: "實用", p: 28, hit: false },
    { t: "有用", p: 24, hit: true },
    { t: "強大", p: 10, hit: false },
  ];
  const after = [
    { t: "有效", p: 33, hit: true },
    { t: "實用", p: 26, hit: false },
    { t: "有用", p: 25, hit: true },
    { t: "強大", p: 9, hit: false },
  ];
  const scale = 120 / 33;

  const panel = (rows: typeof before, x0: number, title: string, tint: string) => (
    <>
      <rect x={x0} y="120" width="260" height="190" rx="16" fill={tint} stroke={border} strokeWidth="1.5" />
      <text x={x0 + 20} y="148" fontSize="13.5" fontWeight="700" fill={ink}>
        {title}
      </text>
      {rows.map((r, i) => (
        <g key={`${title}-${r.t}`}>
          <text x={x0 + 20} y={182 + i * 30} fontSize="14" fill={ink}>
            {r.t}
          </text>
          <rect
            x={x0 + 76}
            y={172 + i * 30}
            width={r.p * scale}
            height="13"
            rx="6.5"
            fill={r.hit ? green : muted}
            fillOpacity={r.hit ? 0.85 : 0.45}
          />
          <text x={x0 + 244} y={182 + i * 30} fontSize="13" textAnchor="end" fill={muted} fontFamily={mono}>
            {r.p}%
          </text>
        </g>
      ))}
    </>
  );

  return (
    <svg viewBox="0 0 720 356" className="block h-auto w-full min-w-[600px]">
      {panel(before, 24, "原始機率分布", surfaceAlt)}
      {panel(after, 436, "加上 watermark bias", greenWash)}

      <rect x="300" y="20" width="120" height="30" rx="8" fill={surfaceAlt} stroke={border} />
      <text x="360" y="40" fontSize="12.5" textAnchor="middle" fill={ink} fontFamily={mono}>
        secret K
      </text>
      <rect x="286" y="60" width="148" height="30" rx="8" fill={surfaceAlt} stroke={border} />
      <text x="360" y="80" fontSize="12.5" textAnchor="middle" fill={ink}>
        最近 k 個 token
      </text>
      <path d="M360 90 L360 108" fill="none" stroke={muted} strokeWidth="1.5" />
      <path d="M354 102 L360 110 L366 102" fill="none" stroke={muted} strokeWidth="1.5" />

      <rect x="286" y="110" width="148" height="34" rx="8" fill="var(--illustration-sky-wash)" stroke={sky} strokeWidth="1.5" />
      <text x="360" y="132" fontSize="13" textAnchor="middle" fill={ink} fontFamily={mono}>
        PRF / keyed hash
      </text>
      <path d="M360 144 L360 162" fill="none" stroke={muted} strokeWidth="1.5" />
      <path d="M354 156 L360 164 L366 156" fill="none" stroke={muted} strokeWidth="1.5" />

      <rect x="286" y="164" width="148" height="34" rx="8" fill={greenSoft} stroke={green} strokeWidth="1.5" />
      <text x="360" y="186" fontSize="13" textAnchor="middle" fill={ink}>
        這一步的 green list
      </text>
      <path d="M360 198 L360 218" fill="none" stroke={green} strokeWidth="1.5" />
      <path d="M354 212 L360 220 L366 212" fill="none" stroke={green} strokeWidth="1.5" />

      <circle cx="360" cy="244" r="24" fill={greenSoft} stroke={green} strokeWidth="2" />
      <text x="360" y="250" fontSize="15" textAnchor="middle" fill={ink} fontFamily={mono}>
        +δ
      </text>
      <path d="M284 244 L330 244" fill="none" stroke={muted} strokeWidth="1.8" />
      <path d="M324 238 L332 244 L324 250" fill="none" stroke={muted} strokeWidth="1.8" />
      <path d="M384 244 L430 244" fill="none" stroke={green} strokeWidth="1.8" />
      <path d="M424 238 L432 244 L424 250" fill="none" stroke={green} strokeWidth="1.8" />

      <text x="360" y="336" fontSize="12" textAnchor="middle" fill={muted}>
        綠色 = 這一步落在 green list 的候選；沒有任何候選被禁止，只是分數差了一點
      </text>
    </svg>
  );
}

/* 圖 3：detector 如何把 token 命中聚合成統計證據 */
function FigDetector() {
  const tokens = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const hits = [true, false, true, true, false, true, true, false, true, true];
  const x0 = 44;
  const step = 66;

  return (
    <svg viewBox="0 0 760 344" className="block h-auto w-full min-w-[640px]">
      <text x="28" y="28" fontSize="14" fontWeight="700" fill={ink}>
        Detector 用同一把 key，逐位置重建「當時偏好哪些 token」
      </text>
      <text x="28" y="49" fontSize="12.5" fill={muted}>
        單一位置只是一次擲硬幣；重點是整段命中比例是否異常
      </text>

      {tokens.map((token, i) => (
        <g key={token}>
          <rect
            x={x0 + i * step}
            y="76"
            width="50"
            height="42"
            rx="9"
            fill={hits[i] ? greenSoft : surfaceAlt}
            stroke={hits[i] ? green : border}
            strokeWidth={hits[i] ? 1.8 : 1.2}
          />
          <text
            x={x0 + i * step + 25}
            y="103"
            textAnchor="middle"
            fontSize="16"
            fontFamily={mono}
            fontWeight="700"
            fill={ink}
          >
            {token}
          </text>
          <text
            x={x0 + i * step + 25}
            y="139"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={hits[i] ? green : red}
          >
            {hits[i] ? "命中" : "未中"}
          </text>
        </g>
      ))}

      <path d="M380 153 L380 177" fill="none" stroke={muted} strokeWidth="1.6" />
      <path d="M374 171 L380 179 L386 171" fill="none" stroke={muted} strokeWidth="1.6" />

      <rect x="34" y="184" width="210" height="118" rx="15" fill={surfaceAlt} stroke={border} strokeWidth="1.3" />
      <text x="54" y="211" fontSize="12" fill={muted} fontFamily={mono}>null hypothesis</text>
      <text x="54" y="239" fontSize="15" fontWeight="700" fill={ink}>正常預期：5 / 10</text>
      <rect x="54" y="258" width="160" height="12" rx="6" fill={ghost} />
      <rect x="54" y="258" width="80" height="12" rx="6" fill={muted} fillOpacity="0.5" />
      <text x="54" y="289" fontSize="12" fill={muted}>green baseline γ = 0.5</text>

      <rect x="275" y="184" width="210" height="118" rx="15" fill={greenWash} stroke={green} strokeWidth="1.5" />
      <text x="295" y="211" fontSize="12" fill={green} fontFamily={mono}>observed</text>
      <text x="295" y="239" fontSize="15" fontWeight="700" fill={ink}>實際命中：7 / 10</text>
      <rect x="295" y="258" width="160" height="12" rx="6" fill={ghost} />
      <rect x="295" y="258" width="112" height="12" rx="6" fill={green} fillOpacity="0.85" />
      <text x="295" y="289" fontSize="12" fill={muted}>多出的命中 = watermark evidence</text>

      <path d="M495 243 L525 243" fill="none" stroke={green} strokeWidth="1.8" />
      <path d="M519 237 L527 243 L519 249" fill="none" stroke={green} strokeWidth="1.8" />
      <rect x="535" y="202" width="190" height="82" rx="15" fill="var(--illustration-sky-wash)" stroke={sky} strokeWidth="1.5" />
      <text x="630" y="231" textAnchor="middle" fontSize="13" fontWeight="700" fill={ink}>換成 z-score</text>
      <text x="630" y="258" textAnchor="middle" fontSize="12.5" fill={muted}>離隨機預期有幾個標準差？</text>

      <text x="380" y="329" textAnchor="middle" fontSize="11.5" fill={muted}>
        10 個 token 只是畫法示意；真實偵測需要更長文字才能建立可靠統計訊號
      </text>
    </svg>
  );
}

/* 圖 4：full-prefix hash vs sliding window */
function FigResync() {
  const seq = ["A", "B", "X", "D", "E", "F", "G", "H", "I"];
  const x0 = 115;
  const step = 62;

  const row = (y: number, marks: ("none" | "bad" | "ok")[]) => (
    <>
      {seq.map((s, i) => {
        const edited = i === 2;
        return (
          <g key={`${y}-${i}`}>
            <rect
              x={x0 + i * step}
              y={y}
              width="54"
              height="40"
              rx="8"
              fill={edited ? redSoft : surfaceAlt}
              stroke={edited ? red : border}
              strokeWidth={edited ? 1.8 : 1.2}
            />
            <text
              x={x0 + i * step + 27}
              y={y + 26}
              fontSize="16"
              textAnchor="middle"
              fill={ink}
              fontFamily={mono}
              fontWeight={edited ? 700 : 400}
            >
              {s}
            </text>
          </g>
        );
      })}
      {marks.map((m, i) => (
        <text
          key={`m-${y}-${i}`}
          x={x0 + i * step + 27}
          y={y + 68}
          fontSize={m === "none" ? "15" : "16"}
          textAnchor="middle"
          fill={m === "bad" ? red : m === "ok" ? green : muted}
          fontWeight="700"
        >
          {m === "bad" ? "✗" : m === "ok" ? "✓" : "·"}
        </text>
      ))}
    </>
  );

  return (
    <svg viewBox="0 0 780 392" className="block h-auto w-full min-w-[660px]">
      <text x="28" y="30" fontSize="14" fontWeight="700" fill={ink}>
        (a) 每一步都 hash 整個前綴
      </text>
      <text x="28" y="50" fontSize="12.5" fill={muted} fontFamily={mono}>
        state_t = H(K, x_1 … x_t-1)
      </text>
      {row(66, ["none", "none", "none", "bad", "bad", "bad", "bad", "bad", "bad"])}
      <text x="28" y="168" fontSize="12.5" fill={red}>
        X 之後每一步的 hash 輸入都不一樣了 → 後面整段對不上
      </text>

      <line x1="28" y1="192" x2="752" y2="192" stroke={border} strokeWidth="1" strokeDasharray="4 6" />

      <text x="28" y="224" fontSize="14" fontWeight="700" fill={ink}>
        (b) 只看最近 3 個 token
      </text>
      <text x="28" y="244" fontSize="12.5" fill={muted} fontFamily={mono}>
        state_t = H(K, x_t-3 … x_t-1)
      </text>
      {row(260, ["none", "none", "none", "bad", "bad", "bad", "ok", "ok", "ok"])}

      <path d="M301 340 L301 350 L479 350 L479 340" fill="none" stroke={red} strokeWidth="1.5" />
      <text x="390" y="370" fontSize="12" textAnchor="middle" fill={red}>
        X 還在 window 內
      </text>
      <path d="M487 340 L487 350 L665 350 L665 340" fill="none" stroke={green} strokeWidth="1.5" />
      <text x="576" y="370" fontSize="12" textAnchor="middle" fill={green}>
        X 滑出 window → 重新同步
      </text>

      <text x="752" y="30" fontSize="11.5" textAnchor="end" fill={muted}>
        · 沒有完整 window，不計分
      </text>
    </svg>
  );
}

/* 圖 5：高 entropy 才有空間留下訊號 */
function FigEntropy() {
  const high = [
    { t: "有效", p: 27, hit: true },
    { t: "實用", p: 25, hit: false },
    { t: "有趣", p: 21, hit: true },
    { t: "強大", p: 18, hit: false },
  ];
  const low = [
    { t: "2", p: 99.9 },
    { t: "3", p: 0.05 },
    { t: "其他", p: 0.01 },
  ];

  return (
    <svg viewBox="0 0 720 334" className="block h-auto w-full min-w-[600px]">
      <rect x="24" y="42" width="324" height="254" rx="16" fill={greenWash} stroke={green} strokeWidth="1.5" />
      <text x="44" y="28" fontSize="14" fontWeight="700" fill={ink}>高 entropy：模型本來就在猶豫</text>
      <text x="44" y="70" fontSize="13" fill={muted}>「這是一個非常 ___ 的方法」</text>
      {high.map((r, i) => (
        <g key={r.t}>
          <text x="44" y={112 + i * 38} fontSize="13.5" fill={ink}>{r.t}</text>
          <rect x="98" y={101 + i * 38} width="170" height="14" rx="7" fill={ghost} />
          <rect
            x="98"
            y={101 + i * 38}
            width={r.p * 5}
            height="14"
            rx="7"
            fill={r.hit ? green : muted}
            fillOpacity={r.hit ? 0.9 : 0.48}
          />
          <text x="281" y={112 + i * 38} fontSize="12" fill={muted} fontFamily={mono}>{r.p}%</text>
          {r.hit && <text x="316" y={112 + i * 38} textAnchor="end" fontSize="12" fill={green}>+δ</text>}
        </g>
      ))}
      <rect x="62" y="264" width="248" height="24" rx="12" fill={greenSoft} />
      <text x="186" y="281" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={green}>
        多個近似答案 → 適合微調
      </text>

      <rect x="372" y="42" width="324" height="254" rx="16" fill={surfaceAlt} stroke={border} strokeWidth="1.5" />
      <text x="392" y="28" fontSize="14" fontWeight="700" fill={ink}>低 entropy：幾乎只有一個答案</text>
      <text x="392" y="70" fontSize="13" fill={muted}>「1 + 1 = ___」</text>
      {low.map((r, i) => (
        <g key={r.t}>
          <text x="392" y={112 + i * 44} fontSize="13.5" fill={ink}>{r.t}</text>
          <rect x="446" y={101 + i * 44} width="190" height="14" rx="7" fill={ghost} />
          <rect
            x="446"
            y={101 + i * 44}
            width={Math.max(2, r.p * 1.9)}
            height="14"
            rx="7"
            fill={i === 0 ? sky : muted}
            fillOpacity={i === 0 ? 0.85 : 0.45}
          />
          <text x="674" y={112 + i * 44} textAnchor="end" fontSize="12" fill={muted} fontFamily={mono}>{r.p}%</text>
        </g>
      ))}
      <rect x="410" y="240" width="248" height="48" rx="12" fill={redSoft} />
      <text x="534" y="260" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={red}>跳過，不施加 watermark</text>
      <text x="534" y="278" textAnchor="middle" fontSize="11.5" fill={muted}>硬偏只會把正確答案弄壞</text>

      <text x="360" y="322" textAnchor="middle" fontSize="11.5" fill={muted}>
        watermark 的空間來自「多個答案本來就差不多合理」
      </text>
    </svg>
  );
}

/* 圖 6：統計證據隨長度累積 */
function FigAccumulate() {
  const xOf = (n: number) => 90 + (560 * n) / 2000;
  const yOf = (z: number) => 290 - 46 * z;
  const ns = [0, 50, 100, 200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000];
  const pts = ns.map((n) => `${xOf(n).toFixed(1)},${yOf(0.1 * Math.sqrt(n)).toFixed(1)}`).join(" ");

  return (
    <svg viewBox="0 0 700 344" className="block h-auto w-full min-w-[560px]">
      <rect x="90" y={yOf(5)} width="560" height={yOf(4) - yOf(5)} fill={greenSoft} />

      {[0, 1, 2, 3, 4, 5].map((z) => (
        <g key={`gy-${z}`}>
          <line x1="90" y1={yOf(z)} x2="650" y2={yOf(z)} stroke={border} strokeWidth="1" strokeOpacity="0.6" />
          <text x="78" y={yOf(z) + 4} fontSize="12" textAnchor="end" fill={muted} fontFamily={mono}>
            {z}
          </text>
        </g>
      ))}
      {[0, 500, 1000, 1500, 2000].map((n) => (
        <text key={`gx-${n}`} x={xOf(n)} y="312" fontSize="12" textAnchor="middle" fill={muted} fontFamily={mono}>
          {n}
        </text>
      ))}

      <line x1="90" y1="290" x2="650" y2="290" stroke={muted} strokeWidth="1.5" />
      <line x1="90" y1="52" x2="90" y2="290" stroke={muted} strokeWidth="1.5" />
      <text x="370" y="334" fontSize="12.5" textAnchor="middle" fill={ink}>
        可計分的 token 數 N
      </text>
      <text x="44" y="46" fontSize="12.5" fill={ink}>
        z
      </text>

      <line x1="90" y1={yOf(4)} x2="650" y2={yOf(4)} stroke={red} strokeWidth="1.5" strokeDasharray="6 6" />
      <text x="98" y={yOf(4) - 8} fontSize="12" fill={red}>
        判定門檻（示意）
      </text>

      <polyline points={pts} fill="none" stroke={green} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {[100, 400, 1000, 1600].map((n) => (
        <circle key={`p-${n}`} cx={xOf(n)} cy={yOf(0.1 * Math.sqrt(n))} r="4.5" fill={green} />
      ))}
      <line x1={xOf(1600)} y1={yOf(4)} x2={xOf(1600)} y2="290" stroke={green} strokeWidth="1" strokeDasharray="4 5" />

      <text x="640" y="272" fontSize="12" textAnchor="end" fill={muted} fontFamily={mono}>
        z = 0.1·√N
      </text>
      <text x="640" y="254" fontSize="11.5" textAnchor="end" fill={muted}>
        toy 設定：γ = 0.5、命中率 55%
      </text>
    </svg>
  );
}

/* 圖 7：三種修改對 evidence 的影響 */
function FigAttack() {
  const rows: { label: string; marks: ("ok" | "bad" | "gone")[]; note: string; tone: string }[] = [
    {
      label: "原文複製",
      marks: Array<"ok">(16).fill("ok"),
      note: "z 幾乎不變",
      tone: green,
    },
    {
      label: "局部修改",
      marks: ["ok", "ok", "ok", "bad", "bad", "ok", "ok", "ok", "bad", "ok", "ok", "bad", "ok", "ok", "ok", "ok"],
      note: "z 下降，通常還在",
      tone: ink,
    },
    {
      label: "整篇改寫",
      marks: ["gone", "ok", "gone", "gone", "ok", "gone", "gone", "gone", "ok", "gone", "gone", "gone", "gone", "ok", "gone", "gone"],
      note: "z 掉回雜訊",
      tone: red,
    },
  ];

  return (
    <svg viewBox="0 0 700 300" className="block h-auto w-full min-w-[560px]">
      {rows.map((r, ri) => {
        const y = 60 + ri * 74;
        return (
          <g key={r.label}>
            <text x="24" y={y + 5} fontSize="14" fill={ink}>
              {r.label}
            </text>
            {r.marks.map((m, i) =>
              m === "gone" ? (
                <circle key={`${ri}-${i}`} cx={150 + i * 26} cy={y} r="6.5" fill="none" stroke={muted} strokeWidth="1.5" strokeDasharray="2.5 2.5" />
              ) : m === "bad" ? (
                <g key={`${ri}-${i}`} stroke={red} strokeWidth="2.2" strokeLinecap="round">
                  <line x1={145 + i * 26} y1={y - 5} x2={155 + i * 26} y2={y + 5} />
                  <line x1={145 + i * 26} y1={y + 5} x2={155 + i * 26} y2={y - 5} />
                </g>
              ) : (
                <circle key={`${ri}-${i}`} cx={150 + i * 26} cy={y} r="6.5" fill={green} />
              )
            )}
            <text x="676" y={y + 5} fontSize="13" textAnchor="end" fill={r.tone} fontWeight="600">
              {r.note}
            </text>
          </g>
        );
      })}

      <line x1="24" y1="252" x2="676" y2="252" stroke={border} strokeWidth="1" />
      <circle cx="156" cy="276" r="6.5" fill={green} />
      <text x="172" y="281" fontSize="12" fill={muted}>
        命中的位置
      </text>
      <g stroke={red} strokeWidth="2.2" strokeLinecap="round">
        <line x1="285" y1="271" x2="295" y2="281" />
        <line x1="285" y1="281" x2="295" y2="271" />
      </g>
      <text x="306" y="281" fontSize="12" fill={muted}>
        被改動破壞
      </text>
      <circle cx="430" cy="276" r="6.5" fill="none" stroke={muted} strokeWidth="1.5" strokeDasharray="2.5 2.5" />
      <text x="446" y="281" fontSize="12" fill={muted}>
        重新 sample 過，等同隨機
      </text>
    </svg>
  );
}

/* 圖 8：三角 trade-off */
function FigTradeoff() {
  return (
    <svg viewBox="0 0 620 372" className="block h-auto w-full min-w-[460px]">
      <polygon points="310,68 110,300 510,300" fill={greenWash} stroke={border} strokeWidth="1.5" />

      <text x="310" y="46" fontSize="14" fontWeight="700" textAnchor="middle" fill={ink}>
        Detectability
      </text>
      <text x="310" y="30" fontSize="11.5" textAnchor="middle" fill={muted}>
        短文也驗得出來嗎
      </text>

      <text x="102" y="326" fontSize="14" fontWeight="700" textAnchor="middle" fill={ink}>
        Robustness
      </text>
      <text x="102" y="344" fontSize="11.5" textAnchor="middle" fill={muted}>
        被改過還剩多少訊號
      </text>

      <text x="518" y="326" fontSize="14" fontWeight="700" textAnchor="middle" fill={ink}>
        Quality
      </text>
      <text x="518" y="344" fontSize="11.5" textAnchor="middle" fill={muted}>
        用詞被拉走多少
      </text>

      <circle cx="228" cy="196" r="7" fill={red} />
      <text x="228" y="180" fontSize="13.5" textAnchor="middle" fill={red} fontWeight="700" fontFamily={mono}>
        δ 大
      </text>
      <circle cx="404" cy="258" r="7" fill={sky} />
      <text x="404" y="242" fontSize="13.5" textAnchor="middle" fill={sky} fontWeight="700" fontFamily={mono}>
        δ 小
      </text>

      <line x1="228" y1="196" x2="404" y2="258" stroke={muted} strokeWidth="1.2" strokeDasharray="5 6" />
      <text x="316" y="238" fontSize="11.5" textAnchor="middle" fill={muted}>
        調 δ 只是在同一條線上移動
      </text>
    </svg>
  );
}

export default function LlmTextWatermark() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <PostJsonLd href="/blog/llm-text-watermark" />
      <FadeIn>
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-1 text-sm text-text-muted transition-colors hover:text-primary"
        >
          &larr; Back to Blog
        </Link>

        <div className="mb-4 flex flex-wrap gap-2">
          <span className="tag text-xs font-medium text-primary">
            AI
          </span>
          <span className="tag text-xs font-medium text-sky">
            Algorithm
          </span>
        </div>
        <h1 className="mb-2 text-4xl font-bold">
          Claude 文字浮水印：從 token sampling 理解原理
        </h1>
        <p className="mb-8 text-sm text-text-muted">2026-08-13</p>
      </FadeIn>

      <div className="prose-custom space-y-2 text-text-muted leading-relaxed [&_strong]:text-text [&_code]:rounded [&_code]:bg-surface [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-primary [&_code]:text-sm">
        <FadeIn>
          <p className="mb-8 text-lg leading-relaxed text-text">
            看到公告時，我先想到兩個問題：文字裡沒有多出任何東西，detector 到底在驗什麼？
            中間改一個字，後面的 hash 不會全部亂掉嗎？答案都跟模型每次怎麼選下一個 token 有關。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="where">先看 LLM 平常怎麼選下一個 token</Heading>
          <p>
            LLM 不是先想好整篇文章再打出來。它每次只做一件事：根據目前文字，
            替「下一個 token」列出一組機率，抽一個接上去，再重複同樣流程。
          </p>
          <p>例如目前寫到：</p>
          <Code lang="text">{"這個方法很 ___\n\n有效    31%\n實用    28%\n有用    24%\n強大    10%\n其他     7%"}</Code>
          <p>
            這些數字代表候選的相對可能性。31% 的「有效」不是必選；
            「實用」與「有用」也都可能被抽到。模型抽完一個 token，
            就把它接回句子，重新計算下一輪機率。
          </p>

          <Figure caption="圖 1：LLM 每次根據目前文字算出下一個 token 的機率，抽一個接上，再繼續下一輪。數字只是示意。">
            <FigSampling />
          </Figure>

          <p>
            模型內部先產生一組分數（logits），softmax 再把分數換成機率。
            理解 watermark 不需要推 softmax；只要知道<strong>分數稍微變動，抽到各 token 的機率就會跟著變</strong>。
          </p>
        </FadeIn>

        <FadeIn>
          <div className="border-y border-primary/40 py-6">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px flex-1 bg-primary/30" />
              <div className="text-center">
                <p className="font-bold text-primary">常見問題先回答</p>
                <p className="mt-0.5 text-xs text-text-muted">先處理幾個最容易誤會的地方</p>
              </div>
              <span className="h-px flex-1 bg-primary/30" />
            </div>

            <QuickAnswer number={1} question="浮水印是偷偷在文字裡加字元嗎？">
              <p>
                不是。文字本身完全正常，訊號藏在<strong>模型選了哪些 token</strong>的統計裡。
                因此複製成純文字之後仍可能驗得到。
              </p>
            </QuickAnswer>

            <QuickAnswer number={2} question="為什麼現在外界還驗不了？">
              <p>
                Anthropic 尚未公開 detector；一種典型設計會用 secret 決定每一步偏好的 token，
                偵測時再用同一套規則回頭計分。這跟加密無關，內容從頭到尾都看得懂。
              </p>
            </QuickAnswer>

            <QuickAnswer number={3} question="手動改幾個字，不就把 hash 全打亂了？">
              <p>
                如果 hash 的輸入是完整前綴，會。但只看最近幾個 token 時，修改造成的錯位會在滑出窗口後結束；
                其他位置累積的證據仍然有效。
              </p>
            </QuickAnswer>

            <QuickAnswer number={4} question="改 sampling 機率不會傷品質嗎？">
              <p>
                會有代價，只是可以很小。模型若本來就在「有效／實用／有用」之間猶豫，稍微偏向其中幾個通常不影響意思；
                <code>1 + 1 =</code> 這種答案固定的位置就不適合介入。
              </p>
            </QuickAnswer>

            <QuickAnswer number={5} question="所以文章要夠長？">
              <p>
                通常要。單一 token 幾乎沒有判斷力；把許多微弱偏差加總後，才看得出它不像隨機波動。
                Anthropic 目前沒有公布最低長度。
              </p>
            </QuickAnswer>
          </div>
        </FadeIn>

        <FadeIn delay={0.06}>
          <section className="mt-8 rounded-xl border border-sky/35 bg-sky/5 p-6">
            <h2 className="text-xl font-bold text-text">先認識幾個會出現的詞</h2>
            <p className="mb-5 mt-1 text-sm text-text-muted">後面只會用到這六個概念。</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <GlossaryItem term="Token">
                LLM 取樣的單位，不一定等於一個中文字或一個英文單字。
              </GlossaryItem>
              <GlossaryItem term="Logit / Softmax">
                Logit 是候選 token 的原始分數；softmax 把分數轉成機率。
              </GlossaryItem>
              <GlossaryItem term="Entropy">
                模型的猶豫程度。候選越平均，entropy 越高；答案越固定，entropy 越低。
              </GlossaryItem>
              <GlossaryItem term="Secret / PRF">
                PRF 可以先當成帶 secret 的 hash；知道 secret 才能重現同一組偽隨機規則。
              </GlossaryItem>
              <GlossaryItem term="Green list">
                經典示意演算法裡，每一步得到額外分數的 token 集合。
              </GlossaryItem>
              <GlossaryItem term="z-score">
                實際命中數離隨機預期有幾個標準差。數字越大，越不像巧合。
              </GlossaryItem>
            </div>
          </section>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mt-8 border-y border-border py-6">
            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-text-muted">
              本文路線
            </p>
            <div className="space-y-2">
              {[
                { id: "where", title: "LLM 平常怎麼選下一個 token" },
                { id: "facts", title: "Anthropic 公開了什麼、沒公開什麼" },
                { id: "bias", title: "Green / red 如何偷偷改變機率" },
                { id: "detect", title: "很多次小偏差，最後就會離群" },
                { id: "resync", title: "為什麼改幾個字不會整篇失效" },
                { id: "quality", title: "偏一點，品質會掉嗎" },
                { id: "length", title: "為什麼文字要夠長" },
                { id: "attack", title: "編輯會留下多少訊號" },
                { id: "tradeoff", title: "三個一起拉扯的量" },
                { id: "refs", title: "參考" },
              ].map((item, i) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="flex items-center rounded-lg px-3 py-2 text-sm transition-colors hover:bg-surface-hover"
                >
                  <span className="text-text-muted mr-2">{i + 1}.</span>
                  <span className="text-primary">{item.title}</span>
                </a>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <Heading id="facts">Anthropic 公開了什麼、沒公開什麼</Heading>
          <p>
            Anthropic 公開的是功能與限制，沒有公開演算法。先把能確定的事情縮成三點：
          </p>
          <Fact>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>
                文字標記做在模型層，所以不同 Claude 產品與 API 產生的內容都能帶上 watermark。
              </li>
              <li>
                複製貼上會保留訊號，也可能撐過部分編輯；太短、大幅改寫或翻譯後則可能驗不到。
              </li>
              <li>
                驗到只代表內容<strong>可能被 Claude 處理過</strong>，不代表 Claude 是作者。
                截至 2026-08-13，公開 detector 與演算法細節都還沒釋出。
              </li>
            </ul>
          </Fact>
          <Guess>下面的 green list 與 sliding window 來自既有研究，是理解用的模型，不是 Claude 的實作說明。</Guess>
        </FadeIn>

        <FadeIn>
          <Heading id="bias">Green / red 如何偷偷改變機率</Heading>
          <Guess>
            這裡用 2023 年論文中的 green list 方法解釋。它很好懂，但不代表 Claude 採用同一套演算法。
          </Guess>
          <p>
            一個最簡單的做法，是在每一輪把候選 token 偷偷分成兩組：
          </p>
          <ul className="my-3 list-disc space-y-1.5 pl-5">
            <li><strong>Green list</strong>：多拿一點分數，機率稍微提高。</li>
            <li><strong>Red list</strong>：分數不變，仍然可以被抽到。</li>
          </ul>
          <p>
            假設這一輪「有效」與「有用」被分到 green，其餘在 red。原本 31%、28%、24%、10%
            的分布，可能變成 33%、26%、25%、9%。沒有 token 被禁止，也沒有硬指定答案；
            只是 green 被抽到的機會合計高了一點。
          </p>

          <Figure caption="圖 2：secret 與目前的 context 決定這一輪的 green list；green 候選拿到一點 bonus，再重新換算機率。數字只是示意。">
            <FigBias />
          </Figure>

          <p>
            哪些 token 是 green，由 secret 和目前的 context 經過 hash-like 規則決定。
            Context 每前進一步，分組也跟著換，因此不是某幾個詞永遠比較常出現。
          </p>
          <p>
            用 logit 寫就是下面這行；<InlineMath math="\delta" /> 代表給 green token 的小額 bonus：
          </p>
          <BlockMath math="z'_i = z_i + \delta \cdot \mathbf{1}[i \in G_t]" />

          <p>產生端大概十行：</p>
          <Code lang="python">{`# toy watermark — 產生端
ctx = prompt_tokens
for _ in range(max_new_tokens):
    logits = model(ctx)                      # 原始 logits
    s      = PRF(K, ctx[-k:])                # 只餵最近 k 個 token
    G      = green_set(s, vocab_size, gamma) # 偽隨機挑出 gamma 比例的詞表
    logits[G] += delta                       # green 的各加一點分數
    tok = sample(softmax(logits / T))        # 照常 sampling
    ctx.append(tok)`}</Code>
          <p>
            實際多出的工作只有算 <code>G</code> 與調整 logits。這類方法可以放在模型的 decoding 階段，
            上層產品不必各自實作。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="detect">很多次小偏差，最後就會離群</Heading>
          <p>
            假設正常情況下，每個 token 落進 green list 的機率是 50%。
            Watermark 沒有讓它變成 100%，可能只推到 55%。
          </p>
          <p>
            只看 20 個 token，正常大約命中 10 次，watermark 大約 11 次，根本分不出來。
            換成 1000 個 token，正常約 500 次，watermark 約 550 次，差距就比較難用運氣解釋。
          </p>
          <p>
            Detector 知道 secret，可以把每一步的 green / red 分組重建出來，然後一路數：
            實際 token 落在 green 的比例，是否高得不正常？
          </p>
          <Figure caption="圖 3：detector 用同一把 secret 重建每一輪的分組，再把 green 命中率和正常預期比較。10 個 token 只是流程示意。">
            <FigDetector />
          </Figure>
          <p>
            實作上常把差距換成 z-score，也就是「離正常值有幾個標準差」。
            文章越長，這個統計判斷通常越穩；短句幾乎沒有辨識力。
          </p>
          <Guess>
            50% 與 55% 都是為了說明而設的數字。Claude 實際怎麼分組、偏多少、門檻多高，都沒有公開。
          </Guess>
        </FadeIn>

        <FadeIn>
          <Heading id="resync">為什麼改幾個字不會整篇失效</Heading>
          <p>
            我一開始卡在這裡：中間改掉一個 token，後面的 hash 輸入不是會全部改變嗎？
          </p>
          <p>如果 context 取整個前綴，這個擔心完全正確：</p>
          <BlockMath math="s_t = H(K, x_1, x_2, \ldots, x_{t-1})" />
          <p>
            Hash 的雪崩效應讓輸入稍有變化，輸出就完全不同。改掉第 3 個 token，
            第 4 個之後每一步重算出來的 green list 都跟當初生成時不一樣，命中率直接掉回{" "}
            <InlineMath math="\gamma" />。
          </p>
          <p>
            一種改法是<strong>只看最近 k 個 token</strong>：
          </p>
          <BlockMath math="s_t = H(K, x_{t-k}, \ldots, x_{t-1})" />

          <Figure caption="圖 4：同一個修改，兩種 context 取法的差別。k=3 時只有三個位置受影響，之後自動重新同步。">
            <FigResync />
          </Figure>

          <p>
            拿 <InlineMath math="k = 3" /> 走一遍。原本是 <code>A B C D E F G H I</code>，
            把 C 改成 X：
          </p>
          <ul className="my-3 list-disc space-y-1.5 pl-5">
            <li>
              位置 D 的 window 是 <code>{"{A, B, X}"}</code> → 含 X，算出來的 green list 錯了。
            </li>
            <li>
              E 的 window 是 <code>{"{B, X, D}"}</code>、F 的是 <code>{"{X, D, E}"}</code> → 一樣受影響。
            </li>
            <li>
              G 的 window 是 <code>{"{D, E, F}"}</code> → <strong>X 已經滑出去了</strong>，
              跟生成時完全一致，命中判斷恢復正常。
            </li>
          </ul>
          <p>
            修改影響接下來 <InlineMath math="k" /> 個位置；舊 token 滑出窗口後，detector 便重新對齊。
            這就是 self-synchronization。
          </p>
          <p>
            真實方法還可以疊加多組 window 或加入冗餘，讓局部修改更難一次破壞全部訊號；
            這裡不再往下展開。
          </p>
          <Guess>
            Local context 是一種典型可行設計，不是 Anthropic 已確認的實作。
          </Guess>
        </FadeIn>

        <FadeIn>
          <Heading id="quality">偏一點，品質會掉嗎</Heading>
          <p>
            機率完全不變，detector 就不可能只看輸出分辨兩者。因此 watermark 一定會動到生成分布，
            問題只是能不能把改動放在不太影響內容的地方。
          </p>

          <SubHeading>挑模型本來就猶豫的位置</SubHeading>
          <p>例如下一個 token 有幾個相近的候選：</p>
          <Code lang="text">{`「這是一個非常 ___ 的方法」
  有效  27%
  實用  25%
  有趣  21%
  強大  18%
  ...`}</Code>
          <p>
            四個詞都通順。這種高 entropy 的位置，挪動幾個百分點通常不會改變句意。
          </p>
          <p>但有些位置只有一個答案：</p>
          <Code lang="text">{`「1 + 1 =」
  2      99.99%
  其他    0.01%`}</Code>
          <p>
            這種低 entropy 的位置幾乎沒有操作空間，合理做法是跳過，不介入也不計分。
          </p>
          <Figure caption="圖 5：高 entropy 的位置有多個近似答案，可以用很小的偏差留下訊號；低 entropy 的位置應直接跳過。機率是 toy example。">
            <FigEntropy />
          </Figure>
          <p>
            程式碼、算式、JSON、URL 與逐字引用都有大量固定答案，可介入的位置通常比自然語言少。
            這也是為什麼不是每個 token 都適合留下 watermark。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="length">為什麼文字要夠長</Heading>
          <Guess>
            Anthropic 只說太短的文字沒有可靠訊號，沒有公布最低 token 數。
          </Guess>
          <p>
            原因就是前面的 50% 與 55%：短句裡只差一兩次命中，很容易只是運氣；
            長文裡多出幾十次命中，才會逐漸離開正常波動範圍。
          </p>
          <ul className="my-3 list-disc space-y-1.5 pl-5">
            <li>
              <strong>門檻設低</strong>：短文比較容易驗出，但也更容易把正常文字誤判成 watermark。
            </li>
            <li>
              <strong>門檻設高</strong>：誤判較少，但需要更長文字，編輯後也更容易掉到門檻以下。
            </li>
          </ul>
          <p>
            Detector 最後仍然只是統計判斷。它可以說「這段文字的 green 命中率高得不太像巧合」，
            不能證明作者是誰。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="attack">編輯會留下多少訊號</Heading>

          <Figure caption="圖 6：複製不改變 token；局部編輯只破壞部分位置；整篇改寫會重新 sample 大量 token。">
            <FigAttack />
          </Figure>

          <SubHeading>複製貼上</SubHeading>
          <p>
            Token 序列沒有變，計分結果原則上也不變。Anthropic 已明確確認這點。
          </p>

          <SubHeading>局部修改</SubHeading>
          <p>
            若使用長度 <InlineMath math="k" /> 的滑動窗口，每處 token 替換會直接影響附近約{" "}
            <InlineMath math="k" /> 個位置。刪除、插入和移動句子則還會改變 token 對齊，影響範圍更難估。
          </p>
          <p>
            只要大部分原序列保留，剩餘位置仍可提供證據；是否還過門檻取決於原文長度、修改位置與 detector 設計。
          </p>

          <SubHeading>整篇改寫、翻譯、丟給另一個模型重寫</SubHeading>
          <p>
            這類操作會重新 sample 大量 token。新序列沒有遵循原本的 secret pattern，
            留下的訊號主要來自未被改寫的片段。
          </p>
          <p>
            官方將大幅編輯、改寫、翻譯與混合列為可能驗不到的情況，沒有提供修改比例或成功率。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="tradeoff">三個一起拉扯的量</Heading>
          <p>Watermark 的參數最後都在調整三件事：</p>

          <Figure caption="圖 7：偏得越強通常越好驗、越耐修改，但生成品質也越可能受到影響。">
            <FigTradeoff />
          </Figure>

          <ul className="my-3 list-disc space-y-1.5 pl-5">
            <li>
              <strong>Detectability</strong>：多短的文章驗得出來。
            </li>
            <li>
              <strong>Robustness</strong>：被改過之後還剩多少證據。
            </li>
            <li>
              <strong>Quality</strong>：為了 watermark，輸出分布被拉走多少。
            </li>
          </ul>
          <p>
            在 green list 例子中，<InlineMath math="\delta" /> 越大，命中率越高，短文較容易過門檻，
            被改掉一部分後也可能保留訊號；但生成分布會離原模型更遠。<InlineMath math="\delta" /> 越小，
            對輸出的影響越低，代價是需要更長的文字。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="closing">我目前的理解</Heading>
          <p>
            我現在會把文字浮水印想成一套帶 secret 的抽樣規則。模型遇到幾個都合理的 token 時，
            對其中一部分稍微加權；detector 用同一把 secret 重建規則，再看整段文字命中了多少次。
          </p>
          <p>
            單次選擇看不出異常，累積到長文才有判斷力。局部編輯會損失部分命中，整篇重寫則可能讓訊號消失。
            即使驗到，也只能說文字可能經過該系統，不能證明作者身分。
          </p>
          <Guess>
            Green list、sliding window 與本文中的參數都只是理解用的模型，不是 Claude 實作的逆向結果。
            Anthropic 公開技術文件後再回來核對。
          </Guess>
        </FadeIn>

        <FadeIn>
          <Heading id="refs">參考</Heading>
          <ul className="my-3 list-disc space-y-2 pl-5">
            <li>
              <a
                href="https://support.claude.com/en/articles/16266773-how-claude-marks-ai-generated-content"
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                How Claude marks AI-generated content
              </a>
              {" "}— Anthropic 官方說明，本文第一節的事實來源。
            </li>
            <li>
              <a
                href="https://proceedings.mlr.press/v202/kirchenbauer23a.html"
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                A Watermark for Large Language Models
              </a>
              {" "}(Kirchenbauer et al., ICML 2023) — green list、<InlineMath math="\delta" /> bias、z-score 檢定的原始論文。
            </li>
            <li>
              <a
                href="https://www.nature.com/articles/s41586-024-08025-4"
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                Scalable watermarking for identifying large language model outputs
              </a>
              {" "}(Dathathri et al., Nature 2024) — SynthID-Text 與 tournament sampling，Gemini 的實際部署經驗。
            </li>
            <li>
              <a
                href="https://github.com/google-deepmind/synthid-text"
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                google-deepmind/synthid-text
              </a>
              {" "}— 上面那篇的參考實作，想直接讀 code 的話從這裡開始。
            </li>
            <li>
              <a
                href="https://arxiv.org/abs/2312.07913"
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                A Survey of Text Watermarking in the Era of Large Language Models
              </a>
              {" "}— 想看全景的話，這篇 survey 把各家做法的分類整理得不錯。
            </li>
          </ul>
        </FadeIn>

        <FadeIn>
          <div className="mt-12 flex flex-wrap gap-2 text-xs">
            {["LLM Watermark", "Token Sampling", "PRF", "Statistical Detection", "Anthropic"].map((tag) => (
              <span key={tag} className="tag text-text-muted">
                {tag}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>

      <RelatedPosts href="/blog/llm-text-watermark" />
    </article>
  );
}
