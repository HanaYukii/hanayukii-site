import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import ArticleIllustration from "@/components/ArticleIllustration";
import Code from "@/components/CodeBlock";
import { InlineMath, BlockMath } from "@/components/Math";
import { articleMetadata } from "@/lib/seo";
import PostJsonLd from "@/components/PostJsonLd";

export const metadata: Metadata = articleMetadata("/blog/abc456f-plan-holidays", {
  title: "AtCoder ABC 456 F Plan Holidays | 花雪 HanaYukii",
  description:
    "AtCoder ABC 456 F 題解。把買假日問題轉成最大不相鄰省略和，並用線段樹的「左右端狀態相依」模式維護動態查詢。順帶整理 max subarray sum 同模式的對照。",
  openGraph: {
    title: "AtCoder ABC 456 F Plan Holidays",
    description:
      "AtCoder ABC 456 F 題解。最大不相鄰省略和 + 線段樹「左右端狀態相依」合併模式。",
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

export default function Abc456fPlanHolidays() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <PostJsonLd href="/blog/abc456f-plan-holidays" />
      <FadeIn>
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-1 text-sm text-text-muted transition-colors hover:text-primary"
        >
          &larr; Back to Blog
        </Link>

        <div className="mb-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
            Competitive Programming
          </span>
          <span className="rounded-full bg-sky/10 px-2.5 py-0.5 text-xs font-medium text-sky">
            Segment Tree
          </span>
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            DP
          </span>
        </div>
        <h1 className="mb-2 text-4xl font-bold tracking-tight">
          AtCoder ABC 456 F Plan Holidays
        </h1>
        <p className="mb-8 text-sm text-text-muted">2026-05-03</p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <nav className="mb-12 rounded-xl border border-border bg-surface/40 p-6">
          <p className="mb-3 text-sm font-bold text-text-muted uppercase tracking-wider">
            Agenda
          </p>
          <div className="space-y-2">
            {[
              { id: "problem", title: "問題重述" },
              { id: "free-rule", title: "Step 1：免費規則的轉化" },
              { id: "indep-sum", title: "Step 2：化為最大不相鄰省略和" },
              { id: "two-lengths", title: "Step 3：為什麼只需檢查 L = K 跟 L = K + 1" },
              { id: "segtree", title: "Step 4：線段樹維護最大不相鄰選和" },
              { id: "pattern", title: "延伸：線段樹「左右端狀態相依」合併模式" },
              { id: "code", title: "完整 Code" },
              { id: "more", title: "延伸練習" },
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
        </nav>
      </FadeIn>

      <div className="prose-custom space-y-2 text-text-muted leading-relaxed [&_strong]:text-text [&_code]:rounded [&_code]:bg-surface [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-primary [&_code]:text-sm">

        <FadeIn>
          <Heading id="problem">問題重述</Heading>
          <p>
            <InlineMath math="N" /> 天的排程，每天初始非假日。可以重複下面的操作：
          </p>
          <ol className="ml-6 mt-2 list-decimal space-y-1">
            <li>花 <InlineMath math="A_i" /> 元把第 <InlineMath math="i" /> 天設為假日（任何位置都行）</li>
            <li>若第 <InlineMath math="i-1" /> 跟 <InlineMath math="i+1" /> 都是假日，可以免費把第 <InlineMath math="i" /> 天設為假日（<InlineMath math="i \in [2, N-1]" />）</li>
          </ol>
          <p className="mt-4">
            目標：做出至少 <InlineMath math="K" /> 天連續假日，最小化總成本。
          </p>
          <Callout>
            限制 <InlineMath math="N \le 2 \times 10^5" />、<InlineMath math="K \le N" />、<InlineMath math="A_i \le 10^9" />。
          </Callout>
        </FadeIn>

        <FadeIn>
          <Heading id="free-rule">Step 1：免費規則的轉化</Heading>
          <p>
            免費規則只要相鄰兩個假日中間隔一格，那個空格就會被填滿。
            所以如果你買的天數是集合 <InlineMath math="S" />，<strong>只要 S 中相鄰元素差距不超過 2</strong>，中間所有空格就會被自動補成假日。
          </p>
          <p className="mt-4">
            把 <InlineMath math="S" /> 排序之後設 <InlineMath math="s_1 < s_2 < \dots < s_m" />，免費規則的等價條件是：
          </p>
          <BlockMath math="s_{j+1} - s_j \le 2 \quad \forall j" />
          <p className="mt-2">
            最終覆蓋的範圍會是 <InlineMath math="[s_1, s_m]" />，連續假日長度為 <InlineMath math="s_m - s_1 + 1" />。
          </p>
          <p className="mt-4">
            問題等價成：
          </p>
          <Callout>
            選一個位置集合 <InlineMath math="S = \{s_1 < \dots < s_m\}" />，
            滿足 <InlineMath math="s_{j+1} - s_j \le 2" /> 且 <InlineMath math="s_m - s_1 + 1 \ge K" />，
            最小化 <InlineMath math="\sum_{i \in S} A_i" />。
          </Callout>
        </FadeIn>

        <FadeIn>
          <Heading id="indep-sum">Step 2：化為最大不相鄰省略和</Heading>
          <p>
            假設最終覆蓋區間是 <InlineMath math="[s, e]" />，長度 <InlineMath math="L = e - s + 1" />。
            兩端 <InlineMath math="s" /> 跟 <InlineMath math="e" /> 一定要買（否則覆蓋會更短）。
          </p>
          <p className="mt-4">
            中間 <InlineMath math="[s+1, e-1]" /> 的位置中，可以「不買」的條件是：
            <strong>不買的位置之間不能相鄰</strong>（否則差距 &gt; 2，違反免費規則）。
          </p>
          <p className="mt-4">
            換句話說，「不買」的集合是區間 <InlineMath math="[s+1, e-1]" /> 中的<strong>獨立集</strong>（任兩個不相鄰）。
            要最小化買的總和，就是最大化省下來的金額。
          </p>
          <BlockMath math="\text{cost}(s, e) = \sum_{i = s}^{e} A_i - \mathrm{MNAS}(A[s+1 \dots e-1])" />
          <p className="mt-2">
            其中 <InlineMath math="\mathrm{MNAS}" /> 表示「最大不相鄰選和」（Max Non-Adjacent Sum）。
          </p>
          <SubHeading>具體驗證</SubHeading>
          <p>用 Sample 1 試試：<InlineMath math="N=5,\ K=2,\ A=[3,1,4,1,5]" />。</p>
          <div className="my-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-3 pr-4 font-semibold">區間 [s, e]</th>
                  <th className="pb-3 pr-4 font-semibold">總和</th>
                  <th className="pb-3 pr-4 font-semibold">中間 MNAS</th>
                  <th className="pb-3 font-semibold">cost</th>
                </tr>
              </thead>
              <tbody className="text-text-muted">
                <tr className="border-b border-border/50">
                  <td className="py-2.5 pr-4">[1, 2] L=2</td>
                  <td className="py-2.5 pr-4">3+1=4</td>
                  <td className="py-2.5 pr-4">空，0</td>
                  <td className="py-2.5">4</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2.5 pr-4">[2, 3] L=2</td>
                  <td className="py-2.5 pr-4">1+4=5</td>
                  <td className="py-2.5 pr-4">空，0</td>
                  <td className="py-2.5">5</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2.5 pr-4">[1, 3] L=3</td>
                  <td className="py-2.5 pr-4">3+1+4=8</td>
                  <td className="py-2.5 pr-4">{`A[2]=1`}</td>
                  <td className="py-2.5">8 - 1 = 7</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-semibold text-primary">[2, 4] L=3</td>
                  <td className="py-2.5 pr-4">1+4+1=6</td>
                  <td className="py-2.5 pr-4">{`A[3]=4`}</td>
                  <td className="py-2.5 font-semibold">6 - 4 = 2 ✓</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            最佳解 cost = 2，跟答案一致。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="two-lengths">Step 3：為什麼只需檢查 L = K 跟 L = K + 1</Heading>
          <p>
            直覺上，越短的區間 <InlineMath math="L" /> 越省（買的東西少）；但 <InlineMath math="L = K + 1" /> 比 <InlineMath math="L = K" /> 多一格之後，
            中間可以多省一個 <InlineMath math="A_i" />，未必比較貴。
          </p>
          <SubHeading>反例：L = K + 1 可以嚴格比較好</SubHeading>
          <p>
            <InlineMath math="A = [10, 100, 100, 100, 10],\ K = 4" />。
          </p>
          <ul className="ml-6 mt-2 list-disc space-y-1">
            <li><strong>L = K = 4</strong>：最佳區間 [1, 4]，cost = (10+100+100+100) − max(MNAS of [100, 100]) = 310 − 100 = <strong>210</strong></li>
            <li><strong>L = K + 1 = 5</strong>：區間 [1, 5]，可以買 {`{1, 3, 5}`}，cost = (10+100+100+100+10) − max(MNAS of [100, 100, 100]) = 320 − 200 = <strong>120</strong> ✓</li>
          </ul>
          <p className="mt-4">
            <InlineMath math="L = K + 1" /> 因為兩端都比較便宜（10），多花一格買端點反而換來中間能省掉更多 100，淨效益是賺的。
          </p>
          <SubHeading>L &gt; K + 1 為什麼永遠不必查</SubHeading>
          <p>
            要證明：對任何 <InlineMath math="L \ge K + 2" />，都可以從某一端拿掉一個位置，
            得到一個覆蓋長度仍 <InlineMath math="\ge K" /> 的解，而且 cost 沒變大。
          </p>
          <p className="mt-4">
            假設最佳解的 <InlineMath math="S" /> 落在 <InlineMath math="[s, e]" />，<InlineMath math="e - s + 1 \ge K + 2" />。
            考慮端點 <InlineMath math="s" /> 跟 <InlineMath math="e" />：
          </p>
          <ul className="ml-6 mt-2 list-disc space-y-1">
            <li>如果端點旁邊（<InlineMath math="s+1" /> 或 <InlineMath math="e-1" />）也買了 → 直接拿掉端點，差距還是 1，新解仍合法且少了一筆</li>
            <li>如果端點旁邊沒買（差距是 2）→ 拿掉端點之後，新端點是 <InlineMath math="s+2" /> 或 <InlineMath math="e-2" />，覆蓋長度減少 2，但仍 <InlineMath math="\ge K" /></li>
          </ul>
          <p className="mt-4">
            兩種情況下都得到不更糟的解。所以最佳解一定可以縮到 <InlineMath math="L \in \{K, K+1\}" />。
          </p>
          <Callout>
            只需要對所有 <InlineMath math="[s, e]" /> 滿足 <InlineMath math="e - s + 1 \in \{K, K+1\}" /> 的窗口，計算 cost 取 min。
          </Callout>
        </FadeIn>

        <FadeIn>
          <Heading id="segtree">Step 4：線段樹維護最大不相鄰選和</Heading>
          <p>
            滑動窗口枚舉 <InlineMath math="[s, e]" /> 之後，每個窗口要對中間區間 <InlineMath math="[s+1, e-1]" /> 求 MNAS。
            區間查詢 + 點修改（這題其實沒有更新，所以也可以靜態處理；但用線段樹寫法更通用、更好擴充）就是線段樹的標準場景。
          </p>
          <SubHeading>節點存什麼</SubHeading>
          <p>
            節點上要存的不只是「答案」，還要存「合併兩段時用得到的銜接資訊」。
            最大不相鄰選和的銜接資訊是：<strong>左端、右端各自有沒有被選</strong>。
            所以節點需要 4 個值，對應 (左端 e/i) × (右端 e/i) 的 4 種組合：
          </p>
          <Code lang="cpp">{`struct Node {
    long long ee, ei, ie, ii;
    // ee: 左端排除、右端排除 的最大選和
    // ei: 左端排除、右端選入
    // ie: 左端選入、右端排除
    // ii: 左端選入、右端選入
};`}</Code>
          <SubHeading>葉子節點</SubHeading>
          <p>
            單一個位置 <InlineMath math="A_i" />：
          </p>
          <ul className="ml-6 mt-2 list-disc space-y-1">
            <li>左右都「排除」：選和 = 0（什麼也沒選）</li>
            <li>左右都「選入」：選和 = <InlineMath math="A_i" />（同一個點當左右端）</li>
            <li>左排右選 / 左選右排：對單點來說不合法，設 −∞ 表示無效</li>
          </ul>
          <SubHeading>合併（pushup）</SubHeading>
          <p>
            合併左段 L 跟右段 R 時，新節點的 4 個狀態都要列舉左段右端跟右段左端的搭配。
            <strong>關鍵約束</strong>：左段右端「選」+ 右段左端「選」是不合法的（兩個相鄰位置都被選）。
          </p>
          <Code lang="cpp">{`// 合併左段 L 跟右段 R
// 新左端 = L 的左端，新右端 = R 的右端
// 中間：L.right ⊕ R.left 不能同時 'i'（兩個都選 = 相鄰違規）

S combine(S L, S R) {
    S r;
    // 新節點左端排除：L 的左端排除
    r.ee = max({L.ee + R.ee, L.ee + R.ie, L.ei + R.ee});
    r.ei = max({L.ee + R.ei, L.ee + R.ii, L.ei + R.ei});
    r.ie = max({L.ie + R.ee, L.ie + R.ie, L.ii + R.ee});
    r.ii = max({L.ie + R.ei, L.ie + R.ii, L.ii + R.ei});
    // 注意：所有 r.* 都「沒有」L.right=i + R.left=i 的組合
    return r;
}`}</Code>
          <SubHeading>查詢答案</SubHeading>
          <p>
            對區間 <InlineMath math="[l, r]" /> 查 MNAS：合併出來的節點裡取 4 個值的最大值，因為兩端都允許自由選擇。
          </p>
          <BlockMath math="\mathrm{MNAS}(l, r) = \max(\text{ee},\ \text{ei},\ \text{ie},\ \text{ii})" />
          <p className="mt-4">
            時間：建樹 <InlineMath math="O(N)" />、單次區間查詢 <InlineMath math="O(\log N)" />、共 <InlineMath math="O(N \log N)" />。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="pattern">延伸：線段樹「左右端狀態相依」合併模式</Heading>
          <p>
            這題本質上是線段樹的一個經典模式：<strong>節點除了存區間答案，還要存兩端的銜接狀態，pushup 時根據兩段交界處的合法性合併</strong>。
            這個模式涵蓋了一系列題目，最常見的就是「動態最大連續子陣列和」（Max Subarray Sum with point updates）。
          </p>
          <SubHeading>對照例：Max Subarray Sum</SubHeading>
          <p>
            這是一個經典題目：給一個數列 <InlineMath math="A" />，支援單點修改 + 區間查詢區間內的最大子段和。
            線段樹節點存 4 個值：
          </p>
          <Code lang="cpp">{`struct Node {
    long long sum;  // 區間總和
    long long ls;   // 區間最大前綴和
    long long rs;   // 區間最大後綴和
    long long mx;   // 區間最大子段和
};`}</Code>
          <p className="mt-4">
            <strong>合併邏輯</strong>：
          </p>
          <Code lang="cpp">{`void pushup(Node& p, Node L, Node R) {
    p.sum = L.sum + R.sum;
    p.ls  = max(L.ls, L.sum + R.ls);    // 新前綴：留在 L，或跨到 R
    p.rs  = max(R.rs, R.sum + L.rs);    // 新後綴：留在 R，或跨到 L
    p.mx  = max({L.mx, R.mx, L.rs + R.ls});  // 新答案：在 L、在 R、跨界
}`}</Code>
          <SubHeading>兩種題目的共通結構</SubHeading>
          <div className="my-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-3 pr-4 font-semibold">問題</th>
                  <th className="pb-3 pr-4 font-semibold">節點欄位</th>
                  <th className="pb-3 font-semibold">交界 logic</th>
                </tr>
              </thead>
              <tbody className="text-text-muted">
                <tr className="border-b border-border/50">
                  <td className="py-2.5 pr-4">Max Subarray Sum</td>
                  <td className="py-2.5 pr-4">sum / ls / rs / mx（4 欄）</td>
                  <td className="py-2.5">L 後綴 + R 前綴可以「黏合」成跨界子段</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4">Max Non-Adjacent Sum</td>
                  <td className="py-2.5 pr-4">ee / ei / ie / ii（4 狀態）</td>
                  <td className="py-2.5">L 右端 「選」 跟 R 左端 「選」 互斥</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            兩者的核心都是「<strong>分治合併 + 邊界狀態</strong>」。
            節點不只存答案，還存 boundary info；pushup 時根據合併規則處理交界處。
          </p>
          <SubHeading>怎麼判斷一道題該用這套</SubHeading>
          <p>
            通常題目滿足下面條件就值得想一想：
          </p>
          <ul className="ml-6 mt-2 list-disc space-y-1">
            <li>區間查詢的是某種「最佳化」量（最大子段和、最大不相鄰和、最長連續同色等）</li>
            <li>合併兩段答案時，跨界的部分需要兩端的局部資訊</li>
            <li>支援點修改（不然其實 prefix sum / 一次 DP 就夠了）</li>
          </ul>
          <p className="mt-4">
            滿足這三點，幾乎就是線段樹「左右端狀態相依」模式的場景。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="code">完整 Code</Heading>
          <Code lang="cpp">{`#include <bits/stdc++.h>
using namespace std;

const long long NEG_INF = LLONG_MIN / 4;

struct Node {
    long long ee, ei, ie, ii;
};

Node make_leaf(long long a) {
    Node r;
    r.ee = 0;          // 不選
    r.ii = a;          // 選
    r.ei = NEG_INF;    // 單點不能左排右選
    r.ie = NEG_INF;
    return r;
}

Node combine(Node L, Node R) {
    Node r;
    r.ee = max({L.ee + R.ee, L.ee + R.ie, L.ei + R.ee});
    r.ei = max({L.ee + R.ei, L.ee + R.ii, L.ei + R.ei});
    r.ie = max({L.ie + R.ee, L.ie + R.ie, L.ii + R.ee});
    r.ii = max({L.ie + R.ei, L.ie + R.ii, L.ii + R.ei});
    return r;
}

const Node EMPTY = {0, NEG_INF, NEG_INF, NEG_INF};

int n;
vector<Node> seg;
vector<long long> A;

void build(int x, int l, int r) {
    if (l == r) {
        seg[x] = make_leaf(A[l]);
        return;
    }
    int m = (l + r) / 2;
    build(x * 2, l, m);
    build(x * 2 + 1, m + 1, r);
    seg[x] = combine(seg[x * 2], seg[x * 2 + 1]);
}

Node query(int x, int l, int r, int ql, int qr) {
    if (qr < l || r < ql) return EMPTY;
    if (ql <= l && r <= qr) return seg[x];
    int m = (l + r) / 2;
    return combine(query(x * 2, l, m, ql, qr),
                   query(x * 2 + 1, m + 1, r, ql, qr));
}

long long mnas(int l, int r) {
    if (l > r) return 0;
    Node q = query(1, 0, n - 1, l, r);
    return max({q.ee, q.ei, q.ie, q.ii});
}

int main() {
    int K;
    cin >> n >> K;
    A.resize(n);
    vector<long long> pref(n + 1, 0);
    for (int i = 0; i < n; i++) {
        cin >> A[i];
        pref[i + 1] = pref[i] + A[i];
    }
    seg.assign(4 * n, EMPTY);
    build(1, 0, n - 1);

    auto sum_range = [&](int l, int r) {
        return pref[r + 1] - pref[l];
    };

    long long ans = LLONG_MAX;
    for (int L : {K, K + 1}) {
        if (L > n) continue;
        for (int s = 0; s + L - 1 < n; s++) {
            int e = s + L - 1;
            long long total = sum_range(s, e);
            long long save = mnas(s + 1, e - 1);  // 中間最大可省
            ans = min(ans, total - save);
        }
    }
    cout << ans << "\\n";
    return 0;
}`}</Code>
          <SubHeading>Sample 驗證</SubHeading>
          <ul className="ml-6 mt-2 list-disc space-y-1">
            <li>Sample 1: <InlineMath math="N=5,\ K=2,\ A=[3,1,4,1,5]" /> → 答案 <strong>2</strong></li>
            <li>Sample 2: <InlineMath math="N=6,\ K=4,\ A=[24,3,22,39,4,29]" /> → 答案 <strong>29</strong></li>
          </ul>
          <p className="mt-4">
            兩個 sample 都會通過。整體複雜度 <InlineMath math="O(N \log N)" />，<InlineMath math="N \le 2 \times 10^5" /> 完全夠用。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="more">延伸練習</Heading>
          <p>
            「線段樹左右端狀態相依」這個模式在 CP 中相當常見，整理一些值得練的題型：
          </p>
          <ul className="ml-6 mt-2 list-disc space-y-1">
            <li><strong>Max Subarray Sum with point updates</strong>：經典題，4 欄節點（sum / ls / rs / mx）</li>
            <li><strong>Max Non-Adjacent Sum with updates</strong>：本題、Codeforces 上不少變形題</li>
            <li><strong>區間最長連續相同字元</strong>：節點存 (左端字元、左端長度、右端字元、右端長度、區間答案)</li>
            <li><strong>區間異或/AND/OR/GCD</strong>：合併邏輯較單純（單值傳遞），但仍是同一個分治框架</li>
            <li><strong>區間最大子段平方和、最大子段乘積</strong>：節點要記正最大、負最小，pushup 時取 4 種搭配</li>
            <li><strong>區間最長同色括號 / 最大合法括號子序列</strong>：節點存未匹配左、未匹配右、答案</li>
          </ul>
          <p className="mt-4">
            掌握這個 pattern 之後，不少看起來很難的區間最佳化題其實都是同一套：<strong>node 要存什麼 boundary info、pushup 要怎麼合併合法跨界</strong>。
            把這兩件事想清楚就解一半了。
          </p>
        </FadeIn>

        <FadeIn>
          <div className="mt-12 flex flex-wrap gap-2 text-xs">
            {["AtCoder", "Segment Tree", "DP", "Max Non-Adjacent Sum", "Competitive Programming"].map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-surface px-3 py-1 text-text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>

      <FadeIn delay={0.08}>
        <ArticleIllustration variant="contest" className="mt-16" />
      </FadeIn>
    </article>
  );
}
