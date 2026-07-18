import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import ArticleIllustration from "@/components/ArticleIllustration";
import Code from "@/components/CodeBlock";
import { InlineMath } from "@/components/Math";
import { articleMetadata } from "@/lib/seo";
import PostJsonLd from "@/components/PostJsonLd";

export const metadata: Metadata = articleMetadata("/blog/abc467g-many-sweets", {
  title: "AtCoder ABC 467 G Many Sweets Problem | 花雪 HanaYukii",
  description:
    "AtCoder ABC 467 G 題解。帶單點修改的「區間吃糖到 ≥ k 最少顆數」：merge-sort tree 每節點掛 Fenwick 支援改值，再把 index / value 對調、用 kth-element 式 descent 省掉外層二分的 log。",
  openGraph: {
    title: "AtCoder ABC 467 G Many Sweets Problem",
    description:
      "merge-sort tree 掛 Fenwick 支援修改，再把 index / value 對調、用 descent 省掉外層二分。",
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

export default function Abc467gManySweets() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <PostJsonLd href="/blog/abc467g-many-sweets" />
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
            Fenwick Tree
          </span>
        </div>
        <h1 className="mb-2 text-4xl font-bold tracking-tight">
          AtCoder ABC 467 G Many Sweets Problem
        </h1>
        <p className="mb-8 text-sm text-text-muted">2026-07-19</p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <nav className="mb-12 rounded-xl border border-border bg-surface/40 p-6">
          <p className="mb-3 text-sm font-bold text-text-muted uppercase tracking-wider">
            Agenda
          </p>
          <div className="space-y-2">
            {[
              { id: "problem", title: "問題重述" },
              { id: "greedy", title: "子問題：由大到小吃" },
              { id: "msort", title: "Merge-sort tree（靜態版）" },
              { id: "fenwick", title: "支援修改：每個節點掛一個 Fenwick" },
              { id: "tle", title: "TLE 版：外層再二分一個 log" },
              { id: "descent", title: "AC 版：index ↔ value 對調 + descent" },
              { id: "pitfalls", title: "幾個容易誤解的點" },
              { id: "code", title: "完整 Code" },
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
            正整數陣列 <InlineMath math="A" />（長 <InlineMath math="N" />，甜度）。
            <InlineMath math="Q" /> 次查詢 <code>c x l r k</code>：先把 <InlineMath math="A_c" /> 改成 <InlineMath math="x" />，
            然後回答子問題：區間 <InlineMath math="[l, r]" /> 裡的糖果，要吃到總甜度 <InlineMath math="\ge k" />，
            最少吃幾顆；整段全吃也湊不到就輸出 <InlineMath math="-1" />。
          </p>
          <Callout>
            <InlineMath math="N, Q \le 10^5" />、值 <InlineMath math="\le 10^9" />、<InlineMath math="k \le 10^{15}" />。
            配分 625，ABC 壓軸。
          </Callout>
        </FadeIn>

        <FadeIn>
          <Heading id="greedy">子問題：由大到小吃</Heading>
          <p>
            固定 <InlineMath math="[l, r]" /> 跟 <InlineMath math="k" />：想吃最少顆，當然挑最甜的先吃。
            把區間內的值由大到小排，答案就是前綴和第一次 <InlineMath math="\ge k" /> 的位置。
          </p>
          <p className="mt-4">
            所以真正需要的操作是：<strong>「區間 <InlineMath math="[l, r]" /> 內，值 <InlineMath math="\ge t" /> 的有幾顆、總甜度多少」</strong>。
            有這個就能對門檻 <InlineMath math="t" /> 二分出答案。帶單點修改、按區間、按值統計，正是 merge-sort tree 的場景。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="msort">Merge-sort tree（靜態版）</Heading>
          <p>
            以「索引」開線段樹，每個節點把自己那段的值<strong>排序後存起來</strong>，再帶前綴和。
            查 <InlineMath math="[l, r]" /> 內值 <InlineMath math="\ge t" /> 的 count / sum：
            把 <InlineMath math="[l, r]" /> 拆成 <InlineMath math="O(\log N)" /> 個節點，
            每個節點內對 <InlineMath math="t" /> 二分拿後綴，相加。單次 <InlineMath math="O(\log^2 N)" />。
          </p>
          <p className="mt-4">
            空間：每個元素出現在 <InlineMath math="O(\log N)" /> 個節點的排序陣列裡，共 <InlineMath math="O(N \log N)" />。
            沒有修改的話，到這裡就夠用了。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="fenwick">支援修改：每個節點掛一個 Fenwick</Heading>
          <p>
            麻煩在排序陣列是<strong>靜態</strong>的。<InlineMath math="A_c" /> 一改值，含 <InlineMath math="c" /> 的
            <InlineMath math="O(\log N)" /> 個節點全要重排，vector 重排一次 <InlineMath math="O(N)" />，直接爆。
          </p>
          <p className="mt-4">
            解法是把每個節點的「排序陣列 + 前綴和」換成一個 <strong>Fenwick，以值當索引</strong>
            （值域離線壓縮：初始的 <InlineMath math="A" /> 加上所有查詢的 <InlineMath math="x" />）。
            改值 = 在含 <InlineMath math="c" /> 的每個節點做「舊值格 −1、新值格 +1」，不用重排；
            查詢照樣是每個節點一個前綴。
          </p>
          <p className="mt-4">
            「每個節點掛一個 BIT」聽起來很肥，其實每個 BIT 只涵蓋<strong>會出現在這個節點的值</strong>，
            總空間還是 <InlineMath math="O((N+Q)\log N)" />：每個 (位置, 可能值) 配對出現在 <InlineMath math="O(\log N)" /> 個節點，配對總數 <InlineMath math="N+Q" />。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="tle">TLE 版：外層再二分一個 log</Heading>
          <p>
            有了「區間內值 <InlineMath math="\ge t" /> 的 count / sum」這個黑盒，最直覺的用法：
            對門檻 <InlineMath math="t" /> 二分，找到吃到哪個值為止。
            每次 check <InlineMath math="O(\log^2 N)" />，外層再一個 log，
            單次查詢 <InlineMath math="O(\log^3 N)" />。<InlineMath math="Q = 10^5" /> 就 TLE 了。
          </p>
          <p className="mt-4">
            問題出在：count / sum 被當黑盒，外層二分每 check 一次，就從根重新拆一次區間。
            <strong>外層的搜尋跟內層的樹結構完全沒共用</strong>。這一個 log 就是接下來要省的。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="descent">AC 版：index ↔ value 對調 + descent</Heading>
          <p>
            這是「區間第 k 小」的老骨架：把線段樹改開在<strong>值域</strong>上。
            節點 = 一段值域；節點內存的是「值落在這段的元素<strong>索引</strong>」，
            索引軸離線鋪好、固定不動，配一個 Fenwick 記 count / sum。
          </p>
          <p className="mt-4">
            對調之後有個關鍵差別：<InlineMath math="[l, r]" /> 對每個值域節點來說，
            就是「索引落在 <InlineMath math="[l, r]" /> 的那些元素」。索引在節點內排好序，
            用 Fenwick 做 <code>prefix(r) − prefix(l−1)</code> 就拿到任意區間的 count / sum，
            <strong>完全不需要拆區間</strong>。
          </p>
          <SubHeading>查詢：從根往高值走一趟</SubHeading>
          <p>
            外層二分改成一條 root → leaf 的 descent。設剩餘需求 need（初始 <InlineMath math="k" />）：
          </p>
          <ul className="ml-6 mt-2 list-disc space-y-1">
            <li>看右子（高值那半）在 <InlineMath math="[l, r]" /> 的 sum：<InlineMath math="\ge" /> need 就走進去（答案糖全在裡面）</li>
            <li>不夠就整半吃掉：ans += count、need −= sum，改走左子找剩下的</li>
            <li>走到葉子（單一值 <InlineMath math="v" />）：ans += <InlineMath math="\lceil \text{need}/v \rceil" /></li>
          </ul>
          <p className="mt-4">
            每層一次節點查詢（軸上二分定位 + Fenwick 前綴，<InlineMath math="O(\log)" />），
            樹高 <InlineMath math="O(\log)" />，單次查詢 <InlineMath math="O(\log^2 N)" />。
            修改也是沿舊值、新值兩條葉到根的路徑各做一次加減，<InlineMath math="O(\log^2 N)" />。
          </p>
          <SubHeading>走一遍</SubHeading>
          <p>
            區間內是 <InlineMath math="\{7, 7, 5, 3, 2, 2\}" />、<InlineMath math="k = 17" />。由大到小驗：7 + 7 = 14，再吃 5 到 19，共 3 顆。descent 的走法：
          </p>
          <ul className="ml-6 mt-2 list-disc space-y-1">
            <li>根（值域 2..7）sum = 26 <InlineMath math="\ge" /> 17，有解</li>
            <li>右半（5..7）sum = 7+7+5 = 19 <InlineMath math="\ge" /> 17 → 進去</li>
            <li>再右半（7）sum = 14 &lt; 17 → 全吃：ans = 2、need = 3，走左</li>
            <li>葉（5）：<InlineMath math="\lceil 3/5 \rceil = 1" /> → ans = 3 ✓</li>
          </ul>
        </FadeIn>

        <FadeIn>
          <Heading id="pitfalls">幾個容易誤解的點</Heading>
          <p>
            這題我在 merge-sort tree 跟 descent 之間卡了不少來回，整理當時的誤解：
          </p>
          <ul className="ml-6 mt-2 list-disc space-y-2">
            <li>
              <strong>AC 只有一棵樹</strong>：就是把 merge-sort tree 的軸對調（軸 = 值、節點內容 = 索引），
              不是「索引樹 + 值樹」兩棵。
            </li>
            <li>
              <strong>「節點要完全落入查詢區間才能用」只屬於索引樹</strong>。
              值樹裡 <InlineMath math="[l, r]" /> 不對應任何節點，每個節點自己前綴相減就能拿任意區間，這正是不用拆區間的原因。
            </li>
            <li>
              <strong>descent 是一條路，不是 DFS</strong>：每層只進一個 child。
              它取代的是「外層對門檻二分」，搜答案跟樹結構共用同一趟，這就是省掉一個 log 的地方。
            </li>
            <li>
              <strong>二分沒有完全消失</strong>：每層還是要在節點的索引軸上 lower_bound 定位 <InlineMath math="l, r" />，
              但那是查座標，不是搜答案。
            </li>
            <li>
              <strong>想先練純版</strong>：靜態「區間第 k 小」就是同一個骨架。
              這題只是在它上面加 Fenwick 支援改值、多存 sum、把「找第 k 個」換成「吃到 <InlineMath math="\ge k" />」。
            </li>
          </ul>
        </FadeIn>

        <FadeIn>
          <Heading id="code">完整 Code</Heading>
          <p>
            離線鋪軸的部分：每個索引「可能」的值 = 初始值 + 會改到它的查詢 x，
            每對 (索引, 值) 沿值的路徑鋪進節點軸，之後軸固定、只動 Fenwick 計數。
          </p>
          <Code lang="cpp">{`// G - Many Sweets Problem   (AC, O((N+Q) log^2 N))
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int N, Q, M, SZ;
vector<ll> A, vals;               // A: 當前值;vals: 壓縮後的值(升序)
vector<int> curId;                // 每個索引「目前」的值 id
vector<vector<int>> axis;         // axis[k] = 值節點 k 內「可能出現的索引」(排序、固定)
vector<vector<ll>> bcnt, bsum;    // 節點 k 的 Fenwick(在索引軸上):count / sum

int idOf(ll v) { return lower_bound(vals.begin(), vals.end(), v) - vals.begin(); }

// 節點 k 的 Fenwick:在軸位置 pos(0-indexed)加 (dc, ds)
void fadd(int k, int pos, ll dc, ll ds) {
    for (int i = pos + 1; i <= (int)axis[k].size(); i += i & (-i)) {
        bcnt[k][i] += dc;
        bsum[k][i] += ds;
    }
}
pair<ll, ll> fpre(int k, int pos) {  // 前綴 [0..pos]
    ll c = 0, s = 0;
    for (int i = pos + 1; i > 0; i -= i & (-i)) { c += bcnt[k][i]; s += bsum[k][i]; }
    return {c, s};
}
// 節點 k 裡,索引落在 [l,r] 的 (count, sum)
pair<ll, ll> qnode(int k, int l, int r) {
    auto &ax = axis[k];
    int a = lower_bound(ax.begin(), ax.end(), l) - ax.begin();
    int b = (int)(upper_bound(ax.begin(), ax.end(), r) - ax.begin()) - 1;
    if (a > b) return {0, 0};
    auto pb = fpre(k, b);
    if (a == 0) return pb;
    auto pa = fpre(k, a - 1);
    return {pb.first - pa.first, pb.second - pa.second};
}
int posOf(int k, int c) { return lower_bound(axis[k].begin(), axis[k].end(), c) - axis[k].begin(); }
// 沿「值 id」的路徑(葉→根)對每個節點的 Fenwick 加減 = 元素 c 進 / 出這個值
void modify(int c, int vid, ll dc, ll ds) {
    for (int k = SZ + vid; k >= 1; k >>= 1) fadd(k, posOf(k, c), dc, ds);
}

int main() {
    scanf("%d %d", &N, &Q);
    A.resize(N);
    curId.resize(N);
    for (auto &x : A) scanf("%lld", &x);

    vector<array<ll, 5>> qs(Q);  // {c, x, l, r, k},c/l/r 轉 0-indexed
    for (int j = 0; j < Q; j++) {
        ll c, x, l, r, k;
        scanf("%lld %lld %lld %lld %lld", &c, &x, &l, &r, &k);
        qs[j] = {c - 1, x, l - 1, r - 1, k};
    }

    // 離線壓縮值:初始 A + 所有 query 的 x
    for (int i = 0; i < N; i++) vals.push_back(A[i]);
    for (int j = 0; j < Q; j++) vals.push_back(qs[j][1]);
    sort(vals.begin(), vals.end());
    vals.erase(unique(vals.begin(), vals.end()), vals.end());
    M = vals.size();
    SZ = 1;
    while (SZ < M) SZ <<= 1;
    axis.assign(2 * SZ, {});

    // 每個索引「可能」變成的值 id = 初始值 + 會改到它的 query x
    vector<vector<int>> poss(N);
    for (int i = 0; i < N; i++) poss[i].push_back(idOf(A[i]));
    for (int j = 0; j < Q; j++) poss[qs[j][0]].push_back(idOf(qs[j][1]));
    // 鋪索引軸:每個 (索引 c, 可能值 id) 加到 id 路徑上的所有節點
    for (int c = 0; c < N; c++) {
        sort(poss[c].begin(), poss[c].end());
        poss[c].erase(unique(poss[c].begin(), poss[c].end()), poss[c].end());
        for (int vid : poss[c])
            for (int k = SZ + vid; k >= 1; k >>= 1) axis[k].push_back(c);
    }
    bcnt.assign(2 * SZ, {});
    bsum.assign(2 * SZ, {});
    for (int k = 1; k < 2 * SZ; k++) {
        sort(axis[k].begin(), axis[k].end());
        axis[k].erase(unique(axis[k].begin(), axis[k].end()), axis[k].end());
        bcnt[k].assign(axis[k].size() + 1, 0);
        bsum[k].assign(axis[k].size() + 1, 0);
    }
    // 放入初始元素(每個放到它初始值的路徑)
    for (int c = 0; c < N; c++) {
        int vid = idOf(A[c]);
        curId[c] = vid;
        modify(c, vid, +1, +vals[vid]);
    }

    string out;
    for (int j = 0; j < Q; j++) {
        int c = qs[j][0];
        ll x = qs[j][1];
        int l = qs[j][2], r = qs[j][3];
        ll k = qs[j][4];

        // 1) 改 A_c = x:舊值搬走、新值放入
        int nid = idOf(x);
        if (nid != curId[c]) {
            modify(c, curId[c], -1, -vals[curId[c]]);
            modify(c, nid, +1, +vals[nid]);
            curId[c] = nid;
        }
        A[c] = x;

        // 2) 湊不到 k → -1
        auto tot = qnode(1, l, r);
        if (tot.second < k) { out += "-1\\n"; continue; }

        // 3) 從根往「高值」走一趟:高值那半總和夠 k 就進去,不夠就全吃再往低值找
        int node = 1;
        ll need = k, ans = 0;
        while (node < SZ) {
            int rc = 2 * node + 1;                 // 右子 = 高值那半
            auto rq = qnode(rc, l, r);
            if (rq.second >= need) {
                node = rc;                          // 夠 → 進高值半(還沒吃)
            } else {
                ans += rq.first;                    // 不夠 → 高值那半全吃
                need -= rq.second;
                node = 2 * node;                    // 往低值半找剩下的
            }
        }
        ll v = vals[node - SZ];                     // 走到葉子的那個值
        ans += (need + v - 1) / v;                  // 剩下用值 v,吃 ceil(need / v) 顆
        out += to_string(ans);
        out += '\\n';
    }
    printf("%s", out.c_str());
    return 0;
}`}</Code>
          <p className="mt-4">
            整體 <InlineMath math="O((N+Q)\log^2 N)" /> 時間、<InlineMath math="O((N+Q)\log N)" /> 空間。
            真卡常的話，把 <code>vector&lt;vector&lt;&gt;&gt;</code> 攤平成 CSR 還有空間。
          </p>
        </FadeIn>

        <FadeIn>
          <div className="mt-12 flex flex-wrap gap-2 text-xs">
            {["AtCoder", "Merge-sort Tree", "Fenwick Tree", "Segment Tree on Values", "Competitive Programming"].map((tag) => (
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
