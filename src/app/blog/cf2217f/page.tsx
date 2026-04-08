import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import Code from "@/components/CodeBlock";
import { InlineMath, BlockMath } from "@/components/Math";

export const metadata: Metadata = {
  title: "CF2217F — Nim, XOR 與 Digit DP 的一次融合 | 花雪 HanaYukii",
  description:
    "Codeforces 2217F 題解。把區間博弈轉成 Nim，再用 XOR + 加法恆等式拆解 counting，最後用 Digit DP 收尾。",
  openGraph: {
    title: "CF2217F — Nim, XOR 與 Digit DP 的一次融合",
    description:
      "把區間博弈轉成 Nim，再用 XOR + 加法恆等式拆解 counting，最後用 Digit DP 收尾。",
    type: "article",
  },
};

function Heading({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <h2 id={id} className="mb-4 mt-12 text-2xl font-bold scroll-mt-20">
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

export default function CF2217F() {
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
          <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
            Competitive Programming
          </span>
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            Game Theory
          </span>
          <span className="rounded-full bg-sky/10 px-2.5 py-0.5 text-xs font-medium text-sky">
            Digit DP
          </span>
        </div>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight">
          CF2217F — Nim, XOR 與 Digit DP
        </h1>
        <p className="mb-2 text-text-muted">
          這題一開始看起來像是「機率 + 區間」問題，但核心其實是把遊戲轉成 Nim，然後做 XOR 分佈的 counting。
        </p>
        <p className="mb-8 text-sm text-text-muted">
          2026-04-08 ·{" "}
          <a
            href="https://codeforces.com/contest/2217/problem/F"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Problem Link
          </a>
        </p>
      </FadeIn>

      {/* TOC */}
      <FadeIn delay={0.1}>
        <nav className="mb-12 rounded-xl border border-border bg-surface/40 p-6 backdrop-blur-sm">
          <p className="mb-3 text-sm font-bold text-text-muted uppercase tracking-wider">
            目錄
          </p>
          <div className="space-y-2">
            {[
              { id: "problem", title: "問題重述" },
              { id: "nim", title: "Step 1：轉成 XOR 問題" },
              { id: "counting", title: "Step 2：定義 counting 問題" },
              { id: "algebra", title: "Step 3：關鍵代數轉換" },
              { id: "digitdp", title: "Step 4：Digit DP" },
              { id: "merge", title: "Step 5：合併與枚舉" },
              { id: "code", title: "完整 Code" },
              { id: "takeaway", title: "Takeaway" },
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

        {/* ── 問題重述 ── */}
        <FadeIn>
          <Heading id="problem">問題重述</Heading>
          <p>
            Alice 和 Bob 各自有一個區間：
          </p>
          <ul className="ml-6 list-disc space-y-1 mt-2">
            <li>Alice 選 <InlineMath math="[l_1, r_1] \subseteq [1, x_1]" /></li>
            <li>Bob 的 <InlineMath math="[l_2, r_2] \subseteq [1, x_2]" /> 是<strong>均勻隨機</strong></li>
          </ul>
          <p className="mt-4">
            每回合選一個區間，把 <InlineMath math="l" /> 縮小或把 <InlineMath math="r" /> 放大，不能動的人輸。Alice 先手。
          </p>

          <Callout>
            觀察：這其實是 4 堆 Nim。堆的大小分別是 <InlineMath math="l_1-1,\ x_1-r_1,\ l_2-1,\ x_2-r_2" />，每堆代表「這個方向還能擴展多少次」。
          </Callout>

          <p>
            Nim 的結論：<strong>先手贏 ⟺ 四堆 XOR ≠ 0</strong>。
          </p>
          <p>
            Alice 要選 <InlineMath math="[l_1, r_1]" /> 來最大化贏的機率。
          </p>
        </FadeIn>

        {/* ── Step 1 ── */}
        <FadeIn>
          <Heading id="nim">Step 1：轉成 XOR 問題</Heading>
          <p>令：</p>
          <BlockMath math="a = l_1-1, \quad b = x_1-r_1 \quad(\text{Alice 控制})" />
          <BlockMath math="c = l_2-1, \quad d = x_2-r_2 \quad(\text{Bob 隨機})" />
          <p>
            Alice 輸 ⟺ <InlineMath math="a \oplus b \oplus c \oplus d = 0" /> ⟺ <InlineMath math="c \oplus d = a \oplus b" />。
          </p>
          <p>
            令 <InlineMath math="s = a \oplus b" />，Alice 的策略就是<strong>選一個 <InlineMath math="s" />，讓 Bob 滿足 <InlineMath math="c \oplus d = s" /> 的機率最小</strong>。
          </p>
        </FadeIn>

        {/* ── Step 2 ── */}
        <FadeIn>
          <Heading id="counting">Step 2：定義 counting 問題</Heading>
          <p>
            Bob 的合法範圍：<InlineMath math="c \ge 0,\ d \ge 0,\ c + d \le x_2 - 1" />。定義：
          </p>
          <BlockMath math="f(s) = \left|\{(c, d) : c + d \le x_2 - 1,\; c \oplus d = s\}\right|" />
          <p>
            Alice 要在 <InlineMath math="s \in [0, x_1-1]" /> 中找到 <InlineMath math="f(s)" /> 最小的那個。
          </p>
        </FadeIn>

        {/* ── Step 3 ── */}
        <FadeIn>
          <Heading id="algebra">Step 3：關鍵代數轉換</Heading>
          <p>利用經典恆等式：</p>
          <BlockMath math="c + d = (c \oplus d) + 2 \cdot (c \mathbin{\&} d)" />
          <p>
            令 <InlineMath math="t = c \mathbin{\&} d" />，則 <InlineMath math="c + d = s + 2t" />，條件變成：
          </p>
          <BlockMath math="t \le \frac{x_2 - 1 - s}{2} = M, \qquad t \mathbin{\&} s = 0" />
          <p>
            第二個條件的原因：XOR 為 1 的 bit 代表 c 和 d 恰好一個是 1，AND 不可能同時也是 1。
          </p>

          <SubHeading>每個 t 對應幾組 (c, d)？</SubHeading>
          <p>固定 <InlineMath math="t" /> 和 <InlineMath math="s" /> 後，逐 bit 看：</p>
          <div className="my-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-3 pr-4 font-semibold"><InlineMath math="s" /> 的 bit</th>
                  <th className="pb-3 pr-4 font-semibold"><InlineMath math="t" /> 的 bit</th>
                  <th className="pb-3 pr-4 font-semibold"><InlineMath math="c, d" /> 的選擇</th>
                  <th className="pb-3 font-semibold">方案數</th>
                </tr>
              </thead>
              <tbody className="text-text-muted">
                <tr className="border-b border-border/50">
                  <td className="py-2.5 pr-4">1</td>
                  <td className="py-2.5 pr-4">0（必須）</td>
                  <td className="py-2.5 pr-4">(1,0) 或 (0,1)</td>
                  <td className="py-2.5 font-bold text-text">2</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2.5 pr-4">0</td>
                  <td className="py-2.5 pr-4">0</td>
                  <td className="py-2.5 pr-4">(0,0)</td>
                  <td className="py-2.5">1</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4">0</td>
                  <td className="py-2.5 pr-4">1</td>
                  <td className="py-2.5 pr-4">(1,1)</td>
                  <td className="py-2.5">1</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            <InlineMath math="s" /> 中有 <InlineMath math="\text{popcount}(s)" /> 個 1-bit，每個貢獻 2 種選擇，所以：
          </p>
          <BlockMath math="\text{每個 } t \text{ 對應的 } (c,d) \text{ 數} = 2^{\text{popcount}(s)}" />
        </FadeIn>

        {/* ── Step 4 ── */}
        <FadeIn>
          <Heading id="digitdp">Step 4：Digit DP</Heading>
          <p>
            現在需要數「只用 <InlineMath math="s" /> 的 0-bits 組成的數字中，<InlineMath math="\le M" /> 的有幾個」：
          </p>
          <BlockMath math="g(s) = \left|\{t \ge 0 : t \mathbin{\&} s = 0,\; t \le M\}\right|" />
          <p>這就是標準的 Digit DP。從最高位到最低位掃：</p>
          <ul className="ml-6 list-disc space-y-2 mt-2">
            <li>
              <strong>遇到 <InlineMath math="s" /> 的 1-bit</strong>：<InlineMath math="t" /> 必須放 0。
              如果 <InlineMath math="M" /> 這位是 1，<InlineMath math="t" /> 已經比 <InlineMath math="M" /> 小了，後面的 free bits 全部自由 → 加上 <InlineMath math="2^{\text{free\_below}}" />。
            </li>
            <li>
              <strong>遇到 <InlineMath math="s" /> 的 0-bit</strong>（free bit）：<InlineMath math="t" /> 可以放 0 或 1。
              如果還在 tight 且 <InlineMath math="M" /> 這位是 1 → 放 0 的分支不再 tight → 加上 <InlineMath math="2^{\text{free\_below}}" />，放 1 繼續 tight。
            </li>
          </ul>
          <p className="mt-4">每個 <InlineMath math="s" /> 花 <InlineMath math="O(20)" /> 時間。</p>
        </FadeIn>

        {/* ── Step 5 ── */}
        <FadeIn>
          <Heading id="merge">Step 5：合併與枚舉</Heading>
          <p>合併起來：</p>
          <BlockMath math="f(s) = 2^{\,\text{popcount}(s)} \cdot g(s)" />
          <p>
            遍歷所有 <InlineMath math="s \in [0, x_1-1]" />，取 <InlineMath math="f(s)" /> 最小的。
            構造 Alice 的區間：取 <InlineMath math="a = s,\ b = 0" />，也就是 <InlineMath math="[l_1, r_1] = [s+1, x_1]" />。
          </p>

          <SubHeading>Special Case</SubHeading>
          <p>
            如果 <InlineMath math="x_1 > x_2" />，可以選 <InlineMath math="s \ge x_2" />。
            此時 <InlineMath math="c \oplus d \le c + d \le x_2 - 1 < s" />，
            Bob 不可能匹配 → <strong>Alice 必勝</strong>，直接輸出 <InlineMath math="[x_2 + 1, x_1]" />。
          </p>

          <SubHeading>複雜度</SubHeading>
          <BlockMath math="O\!\left(\min(x_1, x_2) \cdot \log x_2\right)" />
        </FadeIn>

        {/* ── Code ── */}
        <FadeIn>
          <Heading id="code">完整 Code</Heading>
          <Code language="cpp">{`#include <bits/stdc++.h>
using namespace std;

long long digit(int mask, int lim) {
    if (lim < 0) {
        return 0;
    }
    long long res = 0;
    bool flag = 1;
    for (int b = 19; b >= 0; b--) {
        bool m = (mask >> b) & 1;
        bool l = (lim >> b) & 1;
        if (flag && l) {
            int cnt = 0;
            for (int i = b - 1; i >= 0; i--) {
                if (!((mask >> i) & 1)) {
                    cnt++;
                }
            }
            res += 1LL << cnt;
            if (m) {
                flag = 0;
            }
        }
    }
    if (flag) {
        res++;
    }
    return res;
}

void solve() {
    int x1, x2;
    cin >> x1 >> x2;
    if (x1 > x2) {
        cout << x2 + 1 << " " << x1 << "\\n";
        return;
    }
    int ans = 0;
    long long mn = 2e18;
    for (int i = 0; i < x1; i++) {
        long long sum = 0;
        if (i < x2) {
            int mx = (x2 - i - 1) / 2;
            sum = digit(i, mx) * (1LL << __builtin_popcount(i));
        }
        if (sum < mn) {
            mn = sum;
            ans = i;
            if (!sum) {
                break;
            }
        }
    }
    cout << ans + 1 << " " << x1 << "\\n";
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    int t;
    cin >> t;
    while (t--) {
        solve();
    }
}`}</Code>
        </FadeIn>

        {/* ── Takeaway ── */}
        <FadeIn>
          <Heading id="takeaway">Takeaway</Heading>
          <p>這題融合了三個經典技巧：</p>
          <ol className="ml-6 list-decimal space-y-1 mt-2">
            <li><strong>Nim 遊戲</strong> → XOR 決定勝負</li>
            <li><strong>XOR + 加法轉換</strong>：<InlineMath math="a + b = (a \oplus b) + 2(a \mathbin{\&} b)" /></li>
            <li><strong>Digit DP</strong>：在 bitmask 限制下做 counting</li>
          </ol>
          <Callout>
            看到 XOR + sum constraint + pair counting 的組合，優先嘗試把 <InlineMath math="(c, d)" /> 拆成 <InlineMath math="(c \oplus d,\; c \mathbin{\&} d)" />。這個轉換讓 sum 和 XOR 的耦合被解開，剩下的就是標準的 counting 問題。
          </Callout>
        </FadeIn>
      </div>

      <FadeIn>
        <div className="mt-12 flex flex-wrap gap-2 text-xs">
          {["Codeforces", "Nim", "XOR", "Digit DP", "Game Theory", "Competitive Programming"].map((tag) => (
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
