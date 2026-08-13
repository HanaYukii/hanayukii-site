import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import Code from "@/components/CodeBlock";
import { InlineMath, BlockMath } from "@/components/Math";
import { articleMetadata } from "@/lib/seo";
import PostJsonLd from "@/components/PostJsonLd";
import RelatedPosts from "@/components/RelatedPosts";

export const metadata: Metadata = articleMetadata("/blog/llm-text-watermark", {
  title: "Claude 文字浮水印：從 token sampling 理解原理 | 花雪 HanaYukii",
  description:
    "Anthropic 尚未公開 Claude 文字浮水印的演算法。從經典 green list 方法出發，整理 secret 如何控制 token sampling、detector 如何累積統計訊號，以及局部修改為什麼不一定會洗掉浮水印。",
  openGraph: {
    title: "Claude 文字浮水印：從 token sampling 理解原理",
    description:
      "浮水印不靠隱藏字元，而是靠 token sampling 的微小偏差。從 green list、z-score 到 sliding window。",
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
    <div className="my-4 rounded-xl border border-primary/40 bg-primary/10 px-4 py-3 text-sm">
      <span className="mr-2 inline-flex rounded-md bg-primary px-2 py-1 font-mono text-[11px] font-bold tracking-wider text-bg">
        已公開
      </span>
      {children}
    </div>
  );
}

function Guess({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-4 rounded-xl border border-dashed border-warm/50 bg-warm/10 px-4 py-3 text-sm">
      <span className="mr-2 inline-flex rounded-md bg-warm px-2 py-1 font-mono text-[11px] font-bold tracking-wider text-bg">
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

function Figure({
  caption,
  children,
}: {
  caption: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <figure className="my-8">
      <div className="overflow-x-auto rounded-xl border border-border bg-[var(--illustration-surface)]">
        {children}
      </div>
      <figcaption className="mt-2 text-center text-xs text-text-muted">
        {caption}
      </figcaption>
    </figure>
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

/* 圖 2：一個 token 怎麼被偏 */
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
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            AI
          </span>
          <span className="rounded-full bg-sky/10 px-2.5 py-0.5 text-xs font-medium text-sky">
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
            中間改一個字，後面的 hash 不會全部亂掉嗎？答案都跟 token sampling 的統計有關。
          </p>
        </FadeIn>

        <FadeIn>
          <div className="rounded-2xl border-2 border-primary/40 bg-primary/10 p-6 shadow-sm">
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
          <div className="mt-8 rounded-xl border border-border bg-surface/40 p-6">
            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-text-muted">
              本文路線
            </p>
            <div className="space-y-2">
              {[
                { id: "facts", title: "Anthropic 公開了什麼、沒公開什麼" },
                { id: "where", title: "訊號不在字裡，在選字裡" },
                { id: "bias", title: "一個 token 怎麼被偏" },
                { id: "detect", title: "Detector 在算什麼" },
                { id: "resync", title: "為什麼改幾個字不會整篇失效" },
                { id: "quality", title: "偏一點，品質會掉嗎" },
                { id: "length", title: "長度、門檻與誤判" },
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
            Anthropic 公開了產品行為，沒有公開演算法。下文提到 green list、PRF 與 sliding window 時，
            講的是已有論文裡的做法，不是 Claude 的實作細節。
          </p>
          <Fact>Anthropic 官方文件確認的內容。</Fact>
          <Guess>論文中的已知方法，或由公開資訊延伸出的推測。</Guess>
          <Fact>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>
                Claude 的純文字使用 watermark；產生的 <code>.svg</code>、<code>.png</code>、<code>.jpg</code>{" "}
                則附上 C2PA 簽章 metadata。兩者不是同一套機制。
              </li>
              <li>
                2026-08-02 之後推出的 Claude 模型上線即支援，先前的模型陸續補上。
              </li>
              <li>
                標記做在<strong>模型層</strong>，涵蓋 API、Claude、Claude Code、Claude Cowork、Claude Tag，
                以及雲端平台上的 Claude。
              </li>
              <li>
                浮水印「是文字的一部分」，所以<strong>複製貼上會保留</strong>，也可能撐過部分編輯。
                官方沒有保證能承受多少修改。
              </li>
              <li>
                驗到浮水印只代表內容<strong>可能被 Claude 處理過</strong>。拿 Claude 潤稿的人仍是原作者；
                沒驗到也不能反推內容一定由人寫成。
              </li>
              <li>
                太短的文字不會有可靠訊號。官方沒有給具體字數門檻。
              </li>
              <li>
                Anthropic 正在準備第三方偵測方式。<strong>截至 2026-08-13，演算法與公開 detector 都還沒釋出。</strong>
              </li>
            </ul>
          </Fact>
          <p>
            多家媒體把上線時點連到歐盟 AI Act 的透明度義務；Anthropic 官方只寫合規與透明度承諾。
            能確定的大致到這裡。接下來從經典演算法反推一套可行的設計。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="where">訊號不在字裡，在選字裡</Heading>
          <p>
            這裡談的不是 zero-width space，也不是檔案 metadata。那些方法都依賴額外載體，
            清成純文字或重新排版就可能消失。統計式 watermark 直接利用生成時的選字，
            因此畫面上看不到多出來的內容。
          </p>

          <Figure caption="圖 1：兩種完全不同的做法。左邊靠額外的載體，右邊靠文字本身的統計結構。">
            <FigWhere />
          </Figure>

          <p>幾種常被叫作「AI 浮水印」的技術差很多：</p>

          <div className="my-6 overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="bg-surface/60 text-left">
                  <th className="border-b border-border px-4 py-3 font-bold text-text">技術</th>
                  <th className="border-b border-border px-4 py-3 font-bold text-text">訊號在哪</th>
                  <th className="border-b border-border px-4 py-3 font-bold text-text">純文字複製後</th>
                  <th className="border-b border-border px-4 py-3 font-bold text-text">需要 secret</th>
                  <th className="border-b border-border px-4 py-3 font-bold text-text">能證明什麼</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-b border-border px-4 py-3 font-medium text-text">統計式文字 watermark</td>
                  <td className="border-b border-border px-4 py-3">token 選擇的統計分布</td>
                  <td className="border-b border-border px-4 py-3 text-primary">還在</td>
                  <td className="border-b border-border px-4 py-3">要（產生端與偵測端共用）</td>
                  <td className="border-b border-border px-4 py-3">這段文字很可能經過該系統產生或處理</td>
                </tr>
                <tr>
                  <td className="border-b border-border px-4 py-3 font-medium text-text">隱藏字元</td>
                  <td className="border-b border-border px-4 py-3">多插入的不可見碼位</td>
                  <td className="border-b border-border px-4 py-3 text-warm">看情況，很脆弱</td>
                  <td className="border-b border-border px-4 py-3">不一定</td>
                  <td className="border-b border-border px-4 py-3">有人在這串字裡插了東西</td>
                </tr>
                <tr>
                  <td className="border-b border-border px-4 py-3 font-medium text-text">檔案 metadata</td>
                  <td className="border-b border-border px-4 py-3">檔案標頭欄位</td>
                  <td className="border-b border-border px-4 py-3 text-warm">沒了</td>
                  <td className="border-b border-border px-4 py-3">不用</td>
                  <td className="border-b border-border px-4 py-3">檔案自稱來自哪裡</td>
                </tr>
                <tr>
                  <td className="border-b border-border px-4 py-3 font-medium text-text">C2PA 簽章</td>
                  <td className="border-b border-border px-4 py-3">附在檔案上的 manifest，用 hash 綁定 bytes</td>
                  <td className="border-b border-border px-4 py-3 text-warm">不適用（純文字沒檔案可綁）</td>
                  <td className="border-b border-border px-4 py-3">要私鑰</td>
                  <td className="border-b border-border px-4 py-3">這個檔案確實由某方簽發，且 bytes 未被竄改</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-text">AI detector</td>
                  <td className="px-4 py-3">沒有訊號，靠文風分類器猜</td>
                  <td className="px-4 py-3">不適用</td>
                  <td className="px-4 py-3">不用</td>
                  <td className="px-4 py-3">看起來像 AI 寫的（誤判率高）</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            C2PA 對檔案 bytes 做 hash，再用私鑰簽 manifest；它驗的是來源與檔案是否被改過。
            一般 AI detector 沒有預先埋入的訊號，只能從文風猜來源。統計式 watermark 則需要生成端配合，
            能跨過純文字複製，但提供的仍是統計判斷，不是簽章。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="bias">一個 token 怎麼被偏</Heading>
          <p>
            LLM 每一步先替候選 token 算 logit，再用 softmax 轉成機率：
          </p>
          <BlockMath math="p_i = \frac{e^{z_i/T}}{\sum_j e^{z_j/T}}" />
          <p>
            分數高的 token 比較容易被抽到，溫度 <InlineMath math="T" /> 控制分布有多集中。
            Watermark 可以在 softmax 前替一部分候選加分。
          </p>

          <SubHeading>拿 green list 當例子</SubHeading>
          <Guess>
            以下採用 Kirchenbauer 等人 2023 年的 green list 方法。Claude 是否使用這套做法仍未知。
          </Guess>
          <p>
            每一步先把 secret <InlineMath math="K" /> 和目前的 context <InlineMath math="c_t" /> 送進 PRF：
          </p>
          <BlockMath math="s_t = \mathrm{PRF}_K(c_t)" />
          <p>
            同一組 secret 與 context 會得到相同的 <InlineMath math="s_t" />；
            不知道 secret 的人則難以預測結果。
          </p>
          <p>
            接著用 <InlineMath math="s_t" /> 把詞表切出一組 green list <InlineMath math="G_t" />，
            讓其中的 token 各拿到 <InlineMath math="\delta" /> 分：
          </p>
          <BlockMath math="z'_i = z_i + \delta \cdot \mathbf{1}[i \in G_t]" />
          <p>
            <InlineMath math="\mathbf{1}[i \in G_t]" /> 在 token 屬於 green list 時為 1，否則為 0。
            Red token 仍然可以被抽到；若它原本遙遙領先，這點 bonus 通常不會改變結果。
          </p>

          <Figure caption="圖 2：secret 與最近幾個 token 決定這一步的 green list，green 候選各加 δ 再重新 softmax。數字是 toy example。">
            <FigBias />
          </Figure>

          <p>
            Context 每前進一步，green list 也跟著換。外界不會看到某幾個詞固定被偏好。
          </p>

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
          <Heading id="detect">Detector 在算什麼</Heading>
          <p>
            偵測端拿同一把 key，把文章重新 tokenize，逐位置重算一次 green list，數命中幾個：
          </p>
          <Code lang="python">{`# toy watermark — 偵測端
hits = total = 0
for t in range(k, len(toks)):
    s = PRF(K, toks[t-k:t])
    G = green_set(s, vocab_size, gamma)
    total += 1
    hits  += (toks[t] in G)

z = (hits - gamma*total) / sqrt(total * gamma * (1-gamma))`}</Code>
          <p>
            Detector 只重建每一步的 green list，再檢查實際 token 是否命中。若文章沒有 watermark，
            每個位置命中的基準機率是 <InlineMath math="\gamma" />：
          </p>
          <BlockMath math="G \sim \mathrm{Binomial}(N, \gamma)" />
          <p>把實際命中數 <InlineMath math="G" /> 與基準比較：</p>
          <BlockMath math="z = \frac{G - \gamma N}{\sqrt{N\gamma(1-\gamma)}}" />
          <p>式子裡各項的意義：</p>
          <ul className="my-3 list-disc space-y-1.5 pl-5">
            <li>
              <InlineMath math="\gamma N" />：沒有 watermark 時，預期命中幾個。
            </li>
            <li>
              分子 <InlineMath math="G - \gamma N" />：實際比預期多命中了幾個。
            </li>
            <li>
              分母 <InlineMath math="\sqrt{N\gamma(1-\gamma)}" />：隨機命中數的標準差。
            </li>
            <li>
              z-score：實際命中數離預期有幾個標準差。
            </li>
          </ul>
          <p>
            假設 <InlineMath math="\gamma = 0.5" />，共有 1000 個可計分位置。隨機文字預期命中 500，
            標準差是 <InlineMath math="\sqrt{1000 \times 0.25} \approx 15.8" />。若實際命中 570：
          </p>
          <BlockMath math="z = \frac{570 - 500}{15.8} \approx 4.4" />
          <p>
            一個 token 命中毫無意義；1000 個位置多出 70 次命中，才形成可用的證據。
          </p>
          <Figure caption="圖 3：detector 不讀取隱藏資料，而是逐位置重建 secret pattern、數命中，再把與隨機基準的差距換成 z-score。10 個 token 只是流程示意。">
            <FigDetector />
          </Figure>
          <Guess>
            以上是示意數字。Claude 的 <InlineMath math="\gamma" />、<InlineMath math="\delta" />、
            context 長度與檢定方式都未公開。
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
            <InlineMath math="k" /> 越小，重新同步越快；但 context 太短會讓同一組 window 頻繁重複，
            green list 的切法跟著重複，「每個位置獨立」這個統計假設就開始失真。
            <InlineMath math="k = 1" /> 就是這個問題的極端。
          </p>
          <Guess>
            其他論文還會疊加多組 window、加入冗餘編碼，或改用 tournament sampling。
            Claude 採用哪一類方法仍未知。
          </Guess>
        </FadeIn>

        <FadeIn>
          <Heading id="quality">偏一點，品質會掉嗎</Heading>
          <p>設原始輸出分布是 <InlineMath math="P" />、加上 watermark 後是{" "}
            <InlineMath math="Q" />。如果
          </p>
          <BlockMath math="P = Q" />
          <p>
            只看輸出文字的 detector 就沒有資訊可用。因此可偵測的 watermark 必須讓{" "}
            <InlineMath math="P \neq Q" />，差別只在分布被推了多遠。
          </p>
          <p>
            實作上希望每一步只移動一點，單看一句話感覺不出差異；
            detector 則靠長序列把這些小差距累積起來。
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
            程式碼、算式、JSON、URL 與逐字引用都有大量受限制的 token，可介入的位置往往比自然語言少。
            因此後面公式裡的 <InlineMath math="N" /> 指的是「可計分位置」，不是 token 總數。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="length">長度、門檻與誤判</Heading>
          <p>
            把上一節的 <InlineMath math="N" /> 定義成「可計分的位置數」。
            每個位置貢獻一點點偏差，那麼
          </p>
          <BlockMath math="\text{signal} \propto N, \qquad \text{noise} \propto \sqrt{N} \quad \Longrightarrow \quad \text{SNR} \propto \sqrt{N}" />
          <p>
            長度增加 100 倍，訊噪比約增加 10 倍。訊號和隨機波動都會變大，
            但訊號累積得比較快。
          </p>
          <p>
            延續前面的示意設定：<InlineMath math="\gamma = 0.5" />，watermark 把命中率從 50% 推到 55%。
          </p>
          <BlockMath math="z = \frac{0.55N - 0.5N}{\sqrt{0.25N}} = 0.1\sqrt{N}" />

          <Figure caption="圖 6：同樣的每步偏差，z-score 隨 √N 成長。橫軸是可計分位置數，不是總字數。數字為 toy 設定。">
            <FigAccumulate />
          </Figure>

          <p>代入不同長度：</p>
          <Code lang="text">{`N =   20   →  z ≈ 0.45    幾乎沒有判斷力
N =  100   →  z ≈ 1.0     仍在常見波動內
N =  400   →  z ≈ 2.0     有訊號，但不足以單獨判定
N = 1000   →  z ≈ 3.2     訊號開始明顯
N = 4000   →  z ≈ 6.3     在理想模型下很強`}</Code>
          <Guess>
            這是理想化模型，不是 Claude 的門檻。Anthropic 沒有公布最低長度。
          </Guess>

          <SubHeading>門檻怎麼定，誤判怎麼算</SubHeading>
          <p>
            Detector 需要選一個門檻 <InlineMath math="z^*" />。門檻以下當作沒有訊號，以上才判為命中：
          </p>
          <ul className="my-3 list-disc space-y-1.5 pl-5">
            <li>
              <strong>False positive</strong>：人寫的文章被判成有 watermark。
              在常態近似下，<InlineMath math="z^* = 4" /> 對應單尾機率約{" "}
              <InlineMath math="3 \times 10^{-5}" />，<InlineMath math="z^* = 5" /> 約{" "}
              <InlineMath math="3 \times 10^{-7}" />。
            </li>
            <li>
              <strong>False negative</strong>：有 watermark 卻沒驗出來。
              文章太短、可計分位置太少、被改寫過，都會落在這一類。
            </li>
          </ul>
          <p>
            門檻提高會減少 false positive，同時增加 false negative。大量掃描文件時還要考慮多重比較：
            <InlineMath math="3 \times 10^{-5}" /> 乘上一百萬份，期望值就是幾十次誤判。
          </p>
          <p>
            上面的二項分布還假設各位置獨立，但自然語言會重複。
            同一個片語出現兩次，window 一樣、green list 就一樣，兩次命中並不是獨立事件，
            z-score 可能因此被高估。常見處理方式是先把重複 window 去重。
          </p>
          <p>
            所以 detector 回答的是「這段文字符合某套 secret pattern 到不像巧合嗎」，
            不是「作者是誰」。這也是官方只說內容可能被 Claude 處理過的原因。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="attack">編輯會留下多少訊號</Heading>

          <Figure caption="圖 7：三種處理方式對 evidence 的影響。前兩種只是少掉一些命中位置，第三種是整排重新 sample。">
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
          <p>
            公開 detector 還有另一個問題：它可能變成攻擊者的 oracle。反覆修改文字並查詢分數，
            就能逐步找到低於門檻的版本。第三方可驗證與防規避之間本來就有衝突。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="tradeoff">三個一起拉扯的量</Heading>
          <p>Watermark 的參數最後都在調整三件事：</p>

          <Figure caption="圖 8：提高 watermark 強度通常會增加可偵測性與耐改性，也會拉大輸出分布的偏移。">
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
          <p>
            SynthID-Text 等後續方法改用 tournament sampling，目的之一就是降低分布扭曲。
            訊號如何嵌入、如何檢定，也因此比 green list 例子複雜。
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
            {["LLM Watermark", "PRF", "Statistical Detection", "C2PA", "Anthropic"].map((tag) => (
              <span key={tag} className="rounded-full bg-surface px-3 py-1 text-text-muted">
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
