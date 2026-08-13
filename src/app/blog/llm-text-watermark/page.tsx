import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import Code from "@/components/CodeBlock";
import { InlineMath, BlockMath } from "@/components/Math";
import { articleMetadata } from "@/lib/seo";
import PostJsonLd from "@/components/PostJsonLd";
import RelatedPosts from "@/components/RelatedPosts";

export const metadata: Metadata = articleMetadata("/blog/llm-text-watermark", {
  title: "Claude 加了文字浮水印，演算法可能怎麼做 | 花雪 HanaYukii",
  description:
    "Anthropic 從 2026-08-02 起在 Claude 的輸出裡嵌文字浮水印，但沒有公開演算法。這篇分三層寫：官方確認了什麼、學界既有的 LLM watermark 怎麼做、以及據此可以合理推測到哪裡。含 green list、z-score 偵測、sliding window 重新同步與三角 trade-off 的圖解。",
  openGraph: {
    title: "Claude 加了文字浮水印，演算法可能怎麼做",
    description:
      "訊號不在字裡，在「選了哪些 token」的統計裡。從 green list、PRF、z-score 到局部修改為何不致命。",
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
    <div className="my-4 rounded-lg border-l-2 border-primary bg-primary/5 px-4 py-3 text-sm">
      <span className="mr-2 font-mono text-xs font-bold uppercase tracking-wider text-primary">
        已公開
      </span>
      {children}
    </div>
  );
}

function Guess({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-4 rounded-lg border-l-2 border-dashed border-warm/40 bg-warm/5 px-4 py-3 text-sm">
      <span className="mr-2 font-mono text-xs font-bold uppercase tracking-wider text-warm">
        推測
      </span>
      {children}
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
        <h1 className="mb-2 text-4xl font-bold tracking-tight">
          Claude 加了文字浮水印，演算法可能怎麼做
        </h1>
        <p className="mb-8 text-sm text-text-muted">2026-08-13</p>
      </FadeIn>

      <div className="prose-custom space-y-2 text-text-muted leading-relaxed [&_strong]:text-text [&_code]:rounded [&_code]:bg-surface [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-primary [&_code]:text-sm">
        <FadeIn>
          <div className="rounded-xl border border-border bg-surface/40 p-6">
            <p className="mb-4 text-sm font-bold uppercase tracking-wider text-text-muted">
              TL;DR
            </p>

            <SubHeading>浮水印是偷偷在文字裡加字元嗎？</SubHeading>
            <p>
              不是。這類 watermark 不多塞任何字元，也不靠 metadata。輸出的每個字都是正常的字，
              訊號在<strong>「模型選了哪些 token」的統計分布</strong>裡。所以純文字複製貼上，訊號跟著走。
            </p>

            <SubHeading>為什麼目前只有 Anthropic 驗得出來？</SubHeading>
            <p>
              因為決定「偏好哪些 token」的那把 secret 只有它有。這不是加密——內容照樣看得懂、沒有任何東西被藏起來；
              比較像是拿著同一把 key 把生成過程重跑一次，檢查這篇文章符合那套偏好的比例是不是異常高。
              Anthropic 說會開放第三方偵測，但截至寫這篇時，公開的偵測工具和演算法細節都還沒出來。
            </p>

            <SubHeading>手動改幾個字，不就把 hash 全打亂了？</SubHeading>
            <p>
              如果每一步都拿整個前綴去 hash，確實會——改一個 token，後面全部 desync。
              所以實務上的設計不會把命運綁在無限長的前綴上，而是只看最近幾個 token，
              並把訊號分散到大量位置。改一個字只毀掉附近幾個位置，過幾個 token 就重新同步。
            </p>

            <SubHeading>改 sampling 機率不會傷品質嗎？</SubHeading>
            <p>
              一定有 trade-off，但不代表看得出來。關鍵是<strong>只在模型本來就猶豫的地方偏</strong>：
              「有效 / 實用 / 有用」三選一時偏個兩三個百分點，讀起來沒差；
              <code>1 + 1 =</code> 這種只有一個答案的位置就不該碰。
            </p>

            <SubHeading>所以文章要夠長？</SubHeading>
            <p>
              對。每個位置只帶一點點證據，訊號隨 <InlineMath math="N" /> 累積、雜訊只隨{" "}
              <InlineMath math="\sqrt{N}" /> 累積，所以可信度大致按{" "}
              <InlineMath math="\sqrt{N}" /> 成長。十幾個 token 幾乎沒有統計能力，上千個才談得上證據。
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mt-8 rounded-xl border border-border bg-surface/40 p-6">
            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-text-muted">
              Agenda
            </p>
            <div className="space-y-2">
              {[
                { id: "facts", title: "Anthropic 公開了什麼、沒公開什麼" },
                { id: "where", title: "訊號不在字裡，在選字裡" },
                { id: "bias", title: "一個 token 怎麼被偏" },
                { id: "detect", title: "Detector 在算什麼" },
                { id: "resync", title: "為什麼改幾個字不會整篇失效" },
                { id: "quality", title: "為什麼微調機率不一定傷品質" },
                { id: "length", title: "長度、門檻與誤判" },
                { id: "attack", title: "什麼才真的洗得掉" },
                { id: "tradeoff", title: "三角 trade-off" },
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
            這篇的切入點是 Claude 新加的文字浮水印，但演算法本身 Anthropic 沒有公開。
            為了不把論文裡的做法講成「Claude 就是這樣做」，全文分三層，並且會用標籤標出來：
          </p>
          <Fact>Anthropic 官方文件確認的內容。</Fact>
          <Guess>學界既有做法，以及據此對 Claude 的合理推測——不是逆向工程的結論。</Guess>
          <p>沒有標籤的段落就是 LLM watermark 這個領域的公開常識。先把已知事實列清楚：</p>
          <Fact>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>
                Claude 用<strong>兩套互補</strong>的標記：文字走 watermark，
                產生的 <code>.svg</code> / <code>.png</code> / <code>.jpg</code> 檔案走 C2PA 簽章 metadata。
                這是兩件不同的事，後面會說差在哪。
              </li>
              <li>
                2026-08-02 之後推出的 Claude 模型上線即支援，先前的模型陸續補上。
              </li>
              <li>
                標記做在<strong>模型層</strong>，所以 API、Claude、Claude Code、Claude Cowork、Claude Tag，
                以及 AWS / Google Cloud / Microsoft Foundry 上的 Claude 都涵蓋，全球一致。
              </li>
              <li>
                官方措辭是浮水印「是文字的一部分」，所以<strong>複製貼上會跟著走</strong>，
                而且「<strong>可能</strong>撐過一些編輯」（may persist through some editing）——用的是可能，不是保證。
              </li>
              <li>
                驗到浮水印只代表這段內容<strong>可能被 Claude 處理過</strong>，不代表 Claude 是作者——
                因為很多人拿 Claude 潤稿、翻譯、改寫自己的文章。反過來，沒驗到也不代表不是 AI 寫的。
              </li>
              <li>
                太短的文字不會有可靠訊號。官方沒有給具體字數門檻。
              </li>
              <li>
                Anthropic 說正在讓使用者與第三方能夠偵測，細節「之後的技術文件會說明」。
                <strong>截至 2026-08-13，演算法與公開偵測工具都還沒釋出。</strong>
              </li>
            </ul>
          </Fact>
          <p>
            動機方面，多家媒體報導與歐盟 AI Act 的透明度義務有關；Anthropic 自己的說法比較泛，
            提到的是合規與透明度承諾。
          </p>
          <p>
            剩下的就是這篇要談的：<strong>在這些約束下，演算法可以怎麼設計。</strong>
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="where">訊號不在字裡，在選字裡</Heading>
          <p>
            先排掉幾個容易混在一起的東西。「AI 浮水印」常被想成在文字裡塞看不見的字元（zero-width space 之類），
            或是在檔案裡寫 metadata。這兩種都有人做，但都不是 Claude 文字浮水印的路子——
            官方明說浮水印「是文字的一部分」，而塞字元跟 metadata 都會被純文字複製、重新排版洗掉。
          </p>

          <Figure caption="圖 1：兩種完全不同的做法。左邊靠額外的載體，右邊靠文字本身的統計結構。">
            <FigWhere />
          </Figure>

          <p>四個常被混為一談的技術，攤開來看：</p>

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
            最後兩列特別容易被混淆。<strong>C2PA 是密碼學簽章</strong>：對檔案 bytes 做 hash、寫進 manifest、
            用私鑰簽名，驗證時重新 hash 再驗簽。它能給出「未被竄改」這種強保證，但前提是有檔案、而且 metadata 沒被剝掉。
            <strong>AI detector 則完全沒有訊號可言</strong>，它只是個文風分類器，說的是「這看起來像 AI 寫的」。
            統計式 watermark 夾在中間：沒有簽章那麼強的保證，但只要文字還在就跟著走。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="bias">一個 token 怎麼被偏</Heading>
          <p>
            LLM 生成時，每一步會對詞表裡每個候選 token 給一個未正規化的分數（logit），再過 softmax 變成機率：
          </p>
          <BlockMath math="p_i = \frac{e^{z_i/T}}{\sum_j e^{z_j/T}}" />
          <p>
            白話說就是「分數高的機率大，但不是贏者全拿」，溫度 <InlineMath math="T" /> 控制拉開的程度。
            接下來只需要記得一件事：<strong>watermark 最自然的插入點，就是在 softmax 之前動 logit。</strong>
          </p>

          <SubHeading>經典做法：green list</SubHeading>
          <Guess>
            以下是 Kirchenbauer 等人 2023 年那篇論文的做法，也是這個領域最好懂的模型。
            <strong>不代表 Claude 採用了它</strong>，只是用來建立直覺。
          </Guess>
          <p>
            持有 secret key <InlineMath math="K" /> 的一方，在每一步先算一個偽隨機狀態：
          </p>
          <BlockMath math="s_t = \mathrm{PRF}_K(c_t)" />
          <p>
            <InlineMath math="\mathrm{PRF}" />（偽隨機函數）可以先當成「帶 key 的 hash」：
            沒有 key 的人看輸出像亂數，知道 key 的人可以穩定重現同一個結果。
            <InlineMath math="c_t" /> 是這一步用到的 context——選什麼很關鍵，第五節整節在談這件事。
          </p>
          <p>
            用 <InlineMath math="s_t" /> 當種子，把整個詞表偽隨機切成兩半：green list{" "}
            <InlineMath math="G_t" />（比例 <InlineMath math="\gamma" />）和其餘的 red list。
            然後給 green 的 token 一點分數：
          </p>
          <BlockMath math="z'_i = z_i + \delta \cdot \mathbf{1}[i \in G_t]" />
          <p>
            <InlineMath math="\mathbf{1}[\cdot]" /> 是 indicator：在 green list 裡就是 1，否則 0。
            所以整條式子只是說「green 的加 <InlineMath math="\delta" />，其他不動」，再重新 softmax。
          </p>
          <p>
            要強調的是：<strong>red token 沒有被禁止</strong>。如果某個 red token 原本機率 90%，
            加了 <InlineMath math="\delta" /> 的競爭者也很難翻盤——它照樣會被選中。
            這正是品質不會崩掉的原因。
          </p>

          <Figure caption="圖 2：secret 與最近幾個 token 決定這一步的 green list，green 候選各加 δ 再重新 softmax。數字是 toy example。">
            <FigBias />
          </Figure>

          <p>
            注意每一步的 green list 都不一樣——context 換了，PRF 輸出就換了，切法也跟著換。
            所以不存在「某些詞永遠被偏好」這種可以直接觀察出來的模式。
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
            除了兩行，其餘跟一般的 decode loop 一樣。這也是為什麼這類方法可以做在模型層、
            不必動上層產品——跟官方說的「標記做在模型層，所有產品都涵蓋」是吻合的。
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
            這裡沒有「解密」任何東西，只是重跑一次規則再數數。統計上要問的是：
            如果這篇文章跟 watermark 無關，命中數會長什麼樣？
            那就是每個位置獨立以機率 <InlineMath math="\gamma" /> 命中，也就是
          </p>
          <BlockMath math="G \sim \mathrm{Binomial}(N, \gamma)" />
          <p>
            拿實際命中數跟這個基準比，換算成 z-score：
          </p>
          <BlockMath math="z = \frac{G - \gamma N}{\sqrt{N\gamma(1-\gamma)}}" />
          <p>逐項拆開來看，這條式子其實沒什麼玄機：</p>
          <ul className="my-3 list-disc space-y-1.5 pl-5">
            <li>
              <InlineMath math="\gamma N" />：沒有 watermark 時，預期命中幾個。
            </li>
            <li>
              分子 <InlineMath math="G - \gamma N" />：實際比預期多命中了幾個。
            </li>
            <li>
              分母 <InlineMath math="\sqrt{N\gamma(1-\gamma)}" />：純靠運氣的話，命中數本來就會上下晃動，
              這是晃動的標準差。
            </li>
            <li>
              整體：<strong>多出來的部分，相當於幾個標準差</strong>。
            </li>
          </ul>
          <p>
            舉個 toy example。<InlineMath math="\gamma = 0.5" />、1000 個可計分位置，
            一篇沒被 watermark 的文章預期命中 500，標準差{" "}
            <InlineMath math="\sqrt{1000 \times 0.25} \approx 15.8" />。也就是說 470～530 都很正常。
            如果實際數到 570：
          </p>
          <BlockMath math="z = \frac{570 - 500}{15.8} \approx 4.4" />
          <p>
            單看任何一個 token 都證明不了什麼——它落在 green list 的機率本來就有一半。
            但 1000 個位置一起看，多出 70 個命中就不像是運氣了。
          </p>
          <Figure caption="圖 3：detector 不讀取隱藏資料，而是逐位置重建 secret pattern、數命中，再把與隨機基準的差距換成 z-score。10 個 token 只是流程示意。">
            <FigDetector />
          </Figure>
          <Guess>
            上面每個數字都是為了算給你看而編的，不是 Claude 的實際參數或效能。
            真實系統的 <InlineMath math="\gamma" />、<InlineMath math="\delta" />、
            context 長度、甚至是不是用 green list 這條路，都未公開。
          </Guess>
        </FadeIn>

        <FadeIn>
          <Heading id="resync">為什麼改幾個字不會整篇失效</Heading>
          <p>
            這是我一開始最卡的地方。既然每一步的 green list 由 hash 決定，那把中間某個 token 改掉，
            後面所有 hash 輸入不就全變了嗎？
          </p>
          <p>如果 context 取整個前綴，這個擔心完全正確：</p>
          <BlockMath math="s_t = H(K, x_1, x_2, \ldots, x_{t-1})" />
          <p>
            hash 的雪崩效應保證輸入差一個 bit、輸出就完全不同。所以改掉第 3 個 token，
            第 4 個之後每一步重算出來的 green list 都跟當初生成時不一樣，命中率直接掉回{" "}
            <InlineMath math="\gamma" />。整篇的證據從修改點開始歸零。
          </p>
          <p>
            所以 robust 的設計不會把命運綁在無限長的前綴上。最容易理解的改法是<strong>只看最近 k 個 token</strong>：
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
            一次修改的破壞半徑就是 <InlineMath math="k" />，不是「到文章結尾」。
            這就是 self-synchronization：不需要任何額外的同步機制，
            單純因為 context 是滑動窗口，錯誤自己會滑出去。
          </p>
          <p>
            代價也很明顯：<InlineMath math="k" /> 越小越耐改，但 context 太短會讓同一組 window 頻繁重複，
            green list 的切法跟著重複，「每個位置獨立」這個統計假設就開始失真。
            <InlineMath math="k = 1" /> 是最耐改的極端，也是統計上最不乾淨的極端。
          </p>
          <Guess>
            這個方向還有更進階的做法：多組 window 疊加、把訊號做成有冗餘的編碼、
            改用不動到期望分布的 sampling（Google 的 SynthID-Text 就是走 tournament sampling 這條路）。
            Claude 用的是哪一種、或哪幾種的組合，目前無從得知。
          </Guess>
        </FadeIn>

        <FadeIn>
          <Heading id="quality">為什麼微調機率不一定傷品質</Heading>
          <p>先講一個沒得繞過的事實。設原始輸出分布是 <InlineMath math="P" />、加了 watermark 之後是{" "}
            <InlineMath math="Q" />。如果
          </p>
          <BlockMath math="P = Q" />
          <p>
            那麼一個只看得到輸出文字的 detector，<strong>理論上不可能</strong>區分兩者——
            它拿到的樣本來自同一個分布，沒有任何資訊可用。所以想要可偵測，就必須{" "}
            <InlineMath math="P \neq Q" />。「完全零影響又能可靠偵測」是矛盾的。
          </p>
          <p>
            真正的工程問題因此不是「怎麼做到零影響」，而是：
            <strong>怎麼讓單步的 <InlineMath math="P" /> 與 <InlineMath math="Q" /> 差距小到讀不出來，
            但幾百上千步累積後統計上分得開。</strong>
            衡量那個差距常用 KL divergence <InlineMath math="D_{\mathrm{KL}}(Q \,\|\, P)" />，
            直覺就是「兩個分布差多遠」，這裡不需要展開。
          </p>

          <SubHeading>把 bias 放在模型本來就猶豫的地方</SubHeading>
          <p>關鍵在於分布形狀差很多。有些位置模型本來就沒主見：</p>
          <Code lang="text">{`「這是一個非常 ___ 的方法」
  有效  27%
  實用  25%
  有趣  21%
  強大  18%
  ...`}</Code>
          <p>
            四個都合理，換哪個都不影響句子品質。這種位置（高 entropy，也就是不確定性大）
            偏個兩三個百分點，讀者不可能察覺。
          </p>
          <p>但有些位置只有一個答案：</p>
          <Code lang="text">{`「1 + 1 =」
  2      99.99%
  其他    0.01%`}</Code>
          <p>
            這裡任何有意義的 bias 都是在把正確答案換掉。所以合理的設計會<strong>看分布的形狀決定要不要動手</strong>：
            低 entropy 的位置放過，不計分也不干預。
          </p>
          <Figure caption="圖 5：高 entropy 的位置有多個近似答案，可以用很小的偏差留下訊號；低 entropy 的位置應直接跳過。機率是 toy example。">
            <FigEntropy />
          </Figure>
          <p>這對幾類輸出特別重要，因為它們幾乎整段都是低 entropy：</p>
          <ul className="my-3 list-disc space-y-1.5 pl-5">
            <li>
              <strong>程式碼</strong>：變數名、關鍵字、括號結構，改一個 token 就是 bug。
            </li>
            <li>
              <strong>數學與計算</strong>：答案唯一。
            </li>
            <li>
              <strong>JSON / URL / 結構化輸出</strong>：格式錯了就不能用。
            </li>
            <li>
              <strong>逐字引用、專有名詞、事實性答案</strong>：改掉就是錯的。
            </li>
          </ul>
          <p>
            反過來說，這也直接解釋了官方那句「太短的文字沒有可靠訊號」：
            一段文字裡真正能承載 watermark 的，只有高 entropy 的那些位置。
            一段幾乎全是程式碼的回覆，可計分的位置可能少到根本驗不出來——
            這裡的 <InlineMath math="N" /> 從來就不等於 token 總數。
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
            白話說：<strong>文章長 100 倍，辨識能力大概只強 10 倍。</strong>
            證據會一直累積，隨機波動也會，只是波動長得比較慢。
          </p>
          <p>
            延續前面的 toy 設定（<InlineMath math="\gamma = 0.5" />，watermark 把命中率從 50% 推到 55%），
            z-score 剛好有個很乾淨的形式：
          </p>
          <BlockMath math="z = \frac{0.55N - 0.5N}{\sqrt{0.25N}} = 0.1\sqrt{N}" />

          <Figure caption="圖 6：同樣的每步偏差，z-score 隨 √N 成長。橫軸是可計分位置數，不是總字數。數字為 toy 設定。">
            <FigAccumulate />
          </Figure>

          <p>代進幾個長度：</p>
          <Code lang="text">{`N =   20   →  z ≈ 0.45    什麼都證明不了
N =  100   →  z ≈ 1.0     還在雜訊範圍內
N =  400   →  z ≈ 2.0     有點意思，但遠遠不夠
N = 1000   →  z ≈ 3.2     開始像回事
N = 4000   →  z ≈ 6.3     幾乎不可能是巧合`}</Code>
          <Guess>
            這張表是上面那條式子的直接代入，用來感受 <InlineMath math="\sqrt{N}" /> 的形狀，
            不是 Claude 的門檻。官方沒有公布任何長度數字。
          </Guess>

          <SubHeading>門檻怎麼定，誤判怎麼算</SubHeading>
          <p>
            偵測就是選一個門檻 <InlineMath math="z^*" />，超過就判「有 watermark」。兩種錯誤方向相反：
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
            門檻拉高，false positive 變少但 false negative 變多，反之亦然。這裡沒有兩全的選項。
            而且真實場景是「拿去掃幾百萬份文件」，那個看起來很小的{" "}
            <InlineMath math="3 \times 10^{-5}" /> 乘上一百萬份就是幾十份冤枉——
            所以實務門檻通常訂得比直覺高很多。
          </p>
          <p>
            還有一個容易被忽略的坑：上面整套推導假設每個位置獨立，但自然語言會重複。
            同一個片語出現兩次，window 一樣、green list 就一樣，兩次命中並不是獨立事件，
            這會讓 z-score 被高估。實作上通常要對重複的 window 去重之後再算，
            論文裡也是這樣處理的。
          </p>
          <p>
            這一節的結論，也正好對上官方那句「驗到浮水印只代表可能被 Claude 處理過」：
            這是統計證據，不是簽章。它給的是「這篇文章符合某套祕密偏好到不太可能是巧合」，
            而不是「這篇文章由誰產生」的密碼學證明。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="attack">什麼才真的洗得掉</Heading>

          <Figure caption="圖 7：三種處理方式對 evidence 的影響。前兩種只是少掉一些命中位置，第三種是整排重新 sample。">
            <FigAttack />
          </Figure>

          <SubHeading>複製貼上</SubHeading>
          <p>
            文字完全沒變，可計分位置一個不少，z-score 原則上一樣。這是統計式 watermark 相對於 metadata 的主要優勢，
            也是官方明確講的行為。
          </p>

          <SubHeading>局部修改</SubHeading>
          <p>
            改幾個詞、刪一兩句、調換段落。如果 context 是滑動窗口，
            每處修改大約毀掉 <InlineMath math="k" /> 個位置的證據，其餘不受影響。
            2000 個位置裡毀掉 60 個，z 會掉但不會歸零。
          </p>
          <p>
            不過有個工程細節值得一提：detector 必須重新 tokenize。
            編輯過的文字切出來的 token 邊界可能跟原本不同，這種 misalignment 造成的損失
            比「被改掉的字數」本身更難預測。
          </p>

          <SubHeading>整篇改寫、翻譯、丟給另一個模型重寫</SubHeading>
          <p>
            這是本質上不同的攻擊。前兩者是<strong>保留大部分原 token 序列</strong>，
            這一種是讓另一個模型從頭 sample 一遍——新的 token 沒有經過原本的 green list 偏好，
            命中率就是 <InlineMath math="\gamma" />。剩下的訊號只來自碰巧沒被改掉的片段。
          </p>
          <p>
            官方對這點的說法也很保留，只說「可能撐過一些編輯」，
            並列出「大幅編輯、改寫、翻譯、混合」是驗不出來的情況之一。沒有給任何比例數字，
            我這裡也不編一個。
          </p>
          <p>
            順帶一提，這個領域有個結構性難題：一旦公開偵測工具，
            想洗掉浮水印的人就有了 oracle——反覆微調直到分數低於門檻即可。
            這是「開放第三方驗證」與「防規避」之間的真實矛盾，也可能是 Anthropic 的偵測工具
            還沒直接公開的原因之一。<span className="text-text-muted">（這句是我的推測。）</span>
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="tradeoff">三角 trade-off</Heading>
          <p>整篇最後會收斂到三個量互相拉扯：</p>

          <Figure caption="圖 8：δ 只是在這條線上滑動——把偵測與耐改推高，就得吐出品質。">
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
            用 <InlineMath math="\delta" /> 當旋鈕就看得很清楚。<InlineMath math="\delta" /> 調大，
            每步命中率提高，短文就能累積到門檻，改掉一部分也還撐得住；代價是模型越來越常放棄它原本最想選的詞，
            用字開始被拉走。<InlineMath math="\delta" /> 調小，品質幾乎不受影響，
            但需要更長的文章才驗得出來，而且稍微改一改就掉到門檻以下。
          </p>
          <p>
            這也是為什麼近年研究往「不動到期望分布」的方向走——
            例如 SynthID-Text 的 tournament sampling，在期望上不改變輸出分布，
            等於試圖把品質那一角從這個三角裡拿掉。代價是演算法複雜不少。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="closing">收尾</Heading>
          <p>
            真正巧妙的地方不是「把一串祕密資料藏進文字」。
            而是：<strong>在大量原本就幾乎等價的 token 選擇裡，按照只有 watermark 持有者知道的微弱偏好去 sampling；
            任何單一次選擇都看不出異常，但幾百上千次累積之後，
            知道 secret 的人可以看到統計上異常一致的 pattern。</strong>
          </p>
          <p>
            這也決定了它的能力邊界：它是統計證據不是簽章，需要長度，
            怕整篇改寫，而且只能說「這段文字可能經過某個系統」，不能說「這是誰寫的」。
            官方文件其實把這幾點都寫得很清楚，只是容易被「隱形浮水印」這個詞蓋過去。
          </p>
          <Guess>
            最後再說一次：除了第一節列的官方事實，這篇描述的是 LLM watermark 這個領域
            為什麼可行的核心演算法模型，<strong>不是對 Claude 私有實作的逆向確認</strong>。
            Anthropic 說會出技術文件，等真的出來，這篇該改的地方我再回來改。
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
