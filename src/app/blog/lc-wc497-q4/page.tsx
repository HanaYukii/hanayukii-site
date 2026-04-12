import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import Code from "@/components/CodeBlock";
import { InlineMath, BlockMath } from "@/components/Math";

export const metadata: Metadata = {
  title: "LeetCode Weekly Contest 497 Q4 Good Subsequence Queries | 花雪 HanaYukii",
  description:
    "LeetCode Weekly Contest 497 Q4 題解。Segment Tree 維護 GCD + 分 case 討論。",
  openGraph: {
    title: "LeetCode Weekly Contest 497 Q4 Good Subsequence Queries",
    description:
      "LeetCode Weekly Contest 497 Q4 題解。Segment Tree 維護 GCD + 分 case 討論。",
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

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-4 border-l-2 border-primary pl-4 text-text-muted italic">
      {children}
    </blockquote>
  );
}

export default function LcWc497Q4() {
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
            Number Theory
          </span>
          <span className="rounded-full bg-sky/10 px-2.5 py-0.5 text-xs font-medium text-sky">
            Segment Tree
          </span>
        </div>
        <h1 className="mb-2 text-4xl font-extrabold tracking-tight">
          LeetCode Weekly Contest 497 Q4 Good Subsequence Queries
        </h1>
        <p className="mb-8 text-sm text-text-muted">
          2026-04-12
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
              { id: "transform", title: "Step 1：轉化" },
              { id: "cases", title: "Step 2：五個 Case" },
              { id: "case5", title: "Step 3：Case 5 的處理" },
              { id: "code", title: "完整 Code" },
              { id: "flow", title: "解法 Flow" },
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
            給你一個陣列 <code>nums</code>（長度 <InlineMath math="n" />）、整數 <InlineMath math="p" />、一堆更新 <code>queries</code>。
          </p>
          <p className="mt-4">
            每次 query 改一個元素之後問：
          </p>
          <Callout>
            能不能從 nums 裡面挑一些元素（不能全選），讓 GCD 剛好等於 <InlineMath math="p" />？
          </Callout>
          <p>
            回傳能的 query 數量。
          </p>
        </FadeIn>

        {/* ── Step 1：轉化 ── */}
        <FadeIn>
          <Heading id="transform">Step 1：轉化</Heading>
          <p>GCD 剛好等於 <InlineMath math="p" /> 其實就是：</p>
          <ol className="ml-6 list-decimal space-y-1 mt-2">
            <li>選的元素全部被 <InlineMath math="p" /> 整除</li>
            <li>除以 <InlineMath math="p" /> 之後 GCD = 1</li>
          </ol>
          <p className="mt-4">
            設 <InlineMath math="\text{val}[i] = \text{nums}[i] / p" />（不整除就設 0），
            <InlineMath math="\text{tot}" /> = 非零 val 的個數，
            <InlineMath math="g = \gcd(\text{所有 val})" />。
          </p>
          <p className="mt-2">
            問題就變成：<strong>vals 裡面有沒有大小 1 到 n-1 的子集 GCD = 1？</strong>
          </p>
        </FadeIn>

        {/* ── Step 2：五個 Case ── */}
        <FadeIn>
          <Heading id="cases">Step 2：五個 Case</Heading>
          <div className="my-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-3 pr-4 font-semibold">Case</th>
                  <th className="pb-3 pr-4 font-semibold">條件</th>
                  <th className="pb-3 pr-4 font-semibold">結論</th>
                  <th className="pb-3 font-semibold">原因</th>
                </tr>
              </thead>
              <tbody className="text-text-muted">
                <tr className="border-b border-border/50">
                  <td className="py-2.5 pr-4">1</td>
                  <td className="py-2.5 pr-4"><InlineMath math="\text{tot} = 0" /></td>
                  <td className="py-2.5 pr-4 font-bold">NO</td>
                  <td className="py-2.5">沒有 <InlineMath math="p" /> 的倍數</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2.5 pr-4">2</td>
                  <td className="py-2.5 pr-4"><InlineMath math="g > 1" /></td>
                  <td className="py-2.5 pr-4 font-bold">NO</td>
                  <td className="py-2.5">任何子集 <InlineMath math="\gcd \ge g > 1" /></td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2.5 pr-4">3</td>
                  <td className="py-2.5 pr-4"><InlineMath math="g = 1,\ \text{tot} < n" /></td>
                  <td className="py-2.5 pr-4 font-bold text-primary">YES</td>
                  <td className="py-2.5">全選非零 vals，長度 <InlineMath math="\text{tot} < n" /></td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2.5 pr-4">4</td>
                  <td className="py-2.5 pr-4"><InlineMath math="g = 1,\ \text{tot} = n,\ \exists\, \text{val} = 1" /></td>
                  <td className="py-2.5 pr-4 font-bold text-primary">YES</td>
                  <td className="py-2.5">單選 val=1 的元素，長度 1</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4">5</td>
                  <td className="py-2.5 pr-4"><InlineMath math="g = 1,\ \text{tot} = n,\ \text{no val} = 1" /></td>
                  <td className="py-2.5 pr-4 font-bold text-warm">要檢查</td>
                  <td className="py-2.5">全選長度 = n 不合法</td>
                </tr>
              </tbody>
            </table>
          </div>
        </FadeIn>

        {/* ── Step 3：Case 5 ── */}
        <FadeIn>
          <Heading id="case5">Step 3：Case 5 的處理</Heading>
          <p>
            剩下的 case：所有 val 都 &gt; 1、沒有 val = 1、整體 GCD = 1。能不能拿掉一個讓 GCD 還是 1？
          </p>
          <p className="mt-4">
            有重複的 val 就直接 YES，同一個值不可能只有一個缺席。
            要相異的話最多 6 個（質數連乘長很快，7 個就超題目值域了），直接暴力枚舉算去掉一個的 GCD 就好。
          </p>
          <p className="mt-4">
            實作上用 Segment Tree 維護全局 GCD，再另外動態記 <code>tot</code>（<InlineMath math="p" /> 的倍數數量）跟 <code>c1</code>（val = 1 的數量），
            這樣前面幾個 case 都能 <InlineMath math="O(1)" /> 判掉。每次 query <InlineMath math="O(\log n)" />，總共 <InlineMath math="O(q \cdot \log n)" />。
          </p>
        </FadeIn>

        {/* ── Code ── */}
        <FadeIn>
          <Heading id="code">完整 Code</Heading>
          <Code lang="cpp">{`class Solution {
public:
    vector<int> val;
    vector<int> tree;

    void build(int x, int l, int r) {
        if (l == r) {
            tree[x] = val[l];
            return;
        }
        int mid = (l + r) / 2;
        build(x << 1, l, mid);
        build(x << 1 | 1, mid + 1, r);
        tree[x] = __gcd(tree[x << 1], tree[x << 1 | 1]);
    }

    void update(int x, int l, int r, int idx) {
        if (l == r) {
            tree[x] = val[idx];
            return;
        }
        int mid = (l + r) / 2;
        if (idx <= mid) {
            update(x << 1, l, mid, idx);
        } else {
            update(x << 1 | 1, mid + 1, r, idx);
        }
        tree[x] = __gcd(tree[x << 1], tree[x << 1 | 1]);
    }

    int countGoodSubseq(vector<int>& nums, int p, vector<vector<int>>& q) {
        int n = nums.size();
        val.resize(n + 5);
        tree.resize(n * 4 + 50);
        int c1 = 0;
        int tot = 0;

        for (int i = 0; i < n; i++) {
            if (nums[i] % p != 0) {
                val[i] = 0;
            } else {
                val[i] = nums[i] / p;
                if (val[i] == 1) c1++;
                tot++;
            }
        }
        build(1, 0, n - 1);

        int ans = 0;
        for (auto& i : q) {
            int idx = i[0];
            int v = i[1];

            // 更新計數器
            if (val[idx] > 0) tot--;
            if (val[idx] == 1) c1--;

            if (v % p) {
                v = 0;
            } else {
                v /= p;
            }
            val[idx] = v;

            if (val[idx] > 0) tot++;
            if (val[idx] == 1) c1++;

            update(1, 0, n - 1, idx);

            // Case 2: 整體 GCD > 1
            int Gcd = tree[1];
            if (Gcd != 1) continue;

            // Case 1: 沒有 p 的倍數
            if (tot == 0) continue;

            // Case 3: 不是全部都是 p 的倍數
            if (tot < n) {
                ans++;
            }
            // Case 4: 有 val = 1 的元素
            else if (c1) {
                ans++;
            }
            // Case 5, n >= 7: 質數連乘超值域
            else if (n >= 7) {
                ans++;
            }
            // Case 5, n <= 6: 暴力枚舉
            else {
                for (int i = 0; i < n; i++) {
                    int g = 0;
                    for (int j = 0; j < n; j++) {
                        if (j != i) {
                            g = __gcd(g, val[j]);
                        }
                    }
                    if (g == 1) {
                        ans++;
                        break;
                    }
                }
            }
        }
        return ans;
    }
};`}</Code>
        </FadeIn>

        {/* ── 解法 Flow ── */}
        <FadeIn>
          <Heading id="flow">解法 Flow</Heading>
          <div className="my-4 flex flex-col items-center gap-2 text-sm">
            <div className="rounded-lg border border-border bg-surface/60 px-4 py-2 text-center">
              <InlineMath math="\gcd = p" /> → 除以 <InlineMath math="p" /> 變成子集 <InlineMath math="\gcd = 1" />
            </div>
            <span className="text-text-muted">↓</span>
            <div className="rounded-lg border border-border bg-surface/60 px-4 py-2 text-center">
              Segment Tree 維護 GCD，<code>tot</code> / <code>c1</code> 快速判 Case 1-4
            </div>
            <span className="text-text-muted">↓</span>
            <div className="rounded-lg border border-border bg-surface/60 px-4 py-2 text-center">
              Case 5：質數連乘長很快 → <InlineMath math="n \ge 7" /> 直接 YES
            </div>
            <span className="text-text-muted">↓</span>
            <div className="rounded-lg border border-border bg-surface/60 px-4 py-2 text-center">
              <InlineMath math="n \le 6" />：暴力 <InlineMath math="O(n^2)" />
            </div>
          </div>
        </FadeIn>
      </div>

      <FadeIn>
        <div className="mt-12 flex flex-wrap gap-2 text-xs">
          {["LeetCode", "Segment Tree", "GCD", "Number Theory", "Competitive Programming"].map((tag) => (
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
