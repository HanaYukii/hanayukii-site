import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import Code from "@/components/CodeBlock";
import { InlineMath } from "@/components/Math";

export const metadata: Metadata = {
  title: "LeetCode 2463 Minimum Total Distance Traveled | 花雪 HanaYukii",
  description:
    "直觀的二維匹配 DP，但轉移的實作不太直觀。每日一題的好題。",
  openGraph: {
    title: "LeetCode 2463 Minimum Total Distance Traveled",
    description:
      "直觀的二維匹配 DP，但轉移的實作不太直觀。每日一題的好題。",
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

export default function Lc2463() {
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
          <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
            DP
          </span>
        </div>
        <h1 className="mb-2 text-4xl font-extrabold tracking-tight">
          LeetCode 2463 Minimum Total Distance Traveled
        </h1>
        <p className="mb-8 text-sm text-text-muted">
          2026-04-15
        </p>
      </FadeIn>

      <div className="prose-custom space-y-2 text-text-muted leading-relaxed [&_strong]:text-text [&_code]:rounded [&_code]:bg-surface [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-primary [&_code]:text-sm">

        {/* ── 題目 ── */}
        <FadeIn>
          <Heading id="problem">題目</Heading>
          <p>
            X 軸上有 <InlineMath math="n" /> 個 robot 跟 <InlineMath math="m" /> 個 factory，每個 factory 有位置跟維修上限。
            把每個 robot 分配到某個 factory 維修，最小化所有 robot 移動距離的總和。
          </p>
          <p className="mt-2">
            <InlineMath math="n, m \le 100" />，<InlineMath math="\sum \text{limit}_j \ge n" />，座標與 limit 值域 <InlineMath math="\le 10^9" />。
          </p>
        </FadeIn>

        {/* ── 做法 ── */}
        <FadeIn>
          <Heading id="approach">做法</Heading>
          <p>
            排序後做二維 DP，<code>dp[i][j]</code> = 前 <InlineMath math="i" /> 個 robot 用前 <InlineMath math="j" /> 個 factory 的最小距離。
            轉移枚舉第 <InlineMath math="j" /> 個 factory 修幾個 robot（0 到 <code>limit[j]</code>），每多修一個就加上對應的距離。
          </p>
          <p className="mt-4">
            其實是直觀的二維匹配 DP，不過轉移的實作蠻不直觀的，是每日一題的實作練習好題。
          </p>
        </FadeIn>

        {/* ── Code ── */}
        <FadeIn>
          <Heading id="code">Code</Heading>
          <Code lang="cpp">{`class Solution {
public:
    long long minimumTotalDistance(vector<int>& rb, vector<vector<int>>& fac) {
        sort(rb.begin(), rb.end());
        sort(fac.begin(), fac.end());
        int n = rb.size();
        int m = fac.size();
        long long dp[n+5][m+5];
        memset(dp, 0x3f, sizeof(dp));
        for (int j = 0; j <= m; j++) {
            dp[0][j] = 0;
        }
        for (int i = 1 ; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                int sum = 0;
                long long cost = 0;
                for (int k = 0; ;k++) {
                    if (i < k) break;
                    if (fac[j-1][1] < k) break;
                    if (k) {
                        cost += abs(rb[i-k] - fac[j-1][0]);
                    }
                    dp[i][j] = min(dp[i][j], dp[i-k][j-1] + cost);
                }
            }
        }
        return dp[n][m];
    }
};`}</Code>
        </FadeIn>

        {/* ── 複雜度 ── */}
        <FadeIn>
          <Heading id="complexity">複雜度</Heading>
          <p>
            時間 <InlineMath math="O(n \cdot m \cdot \text{max\_limit})" />，空間 <InlineMath math="O(n \cdot m)" />。
          </p>
        </FadeIn>

        {/* ── Follow-up ── */}
        <FadeIn>
          <Heading id="followup">Follow-up：DP 空間壓縮</Heading>
          <p>
            轉移只依賴上一層 <InlineMath math="j-1" /> 的值，而且讀的是更小的 index <code>dp[i-k][j-1]</code>。
            跟 0-1 背包壓維的道理一樣，外層迴圈枚舉 factory，內層 <InlineMath math="i" /> 從 <InlineMath math="n" /> 往下掃，
            就能保證讀到的 <code>dp[i-k]</code> 還是上一輪的舊值。
          </p>
          <p className="mt-4">
            空間從 <InlineMath math="O(n \cdot m)" /> 壓到 <InlineMath math="O(n)" />，時間不變。
          </p>
          <Code lang="cpp">{`class Solution {
public:
    long long minimumTotalDistance(vector<int>& rb, vector<vector<int>>& fac) {
        sort(rb.begin(), rb.end());
        sort(fac.begin(), fac.end());
        int n = rb.size();
        int m = fac.size();
        long long dp[n+5];
        memset(dp, 0x3f, sizeof(dp));
        dp[0] = 0;
        for (int j = 0; j < m; j++) {
            for (int i = n; i >= 1; i--) {
                long long cost = 0;
                for (int k = 1; k <= min(i, fac[j][1]); k++) {
                    cost += abs(rb[i-k] - fac[j][0]);
                    dp[i] = min(dp[i], dp[i-k] + cost);
                }
            }
        }
        return dp[n];
    }
};`}</Code>
        </FadeIn>
      </div>

      <FadeIn>
        <div className="mt-12 flex flex-wrap gap-2 text-xs">
          {["Competitive Programming", "DP", "Greedy", "LeetCode Daily"].map((tag) => (
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
