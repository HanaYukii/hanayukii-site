import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import ArticleIllustration from "@/components/ArticleIllustration";
import Code from "@/components/CodeBlock";
import { InlineMath } from "@/components/Math";
import { articleMetadata } from "@/lib/seo";
import PostJsonLd from "@/components/PostJsonLd";
import RelatedPosts from "@/components/RelatedPosts";

export const metadata: Metadata = articleMetadata("/blog/abc467g-many-sweets", {
  title: "AtCoder ABC 467 G Many Sweets Problem | 花雪 HanaYukii",
  description:
    "AtCoder ABC 467 G 題解。值域線段樹 + kth-element 式 descent 直接走出「區間吃糖到 ≥ k 最少顆數」；每個 node 自帶離線鋪好的離散化軸與 Fenwick 支援單點改值。附 merge-sort tree + 外層二分為何多一個 log。",
  openGraph: {
    title: "AtCoder ABC 467 G Many Sweets Problem",
    description:
      "值域線段樹 + descent 一趟走出答案；每個 node 自帶離線鋪好的離散化軸，BIT 不用開大。",
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
              { id: "solution", title: "正解：值域線段樹，一趟 descent" },
              { id: "discretize", title: "細節：每個 node 自己的離散化軸" },
              { id: "walkthrough", title: "走一遍" },
              { id: "tle", title: "附註：merge-sort tree + 外層二分為何多一個 log" },
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
            所以要維護的是「區間內、按值分布的 count / sum」，而且要撐得住單點改值。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="solution">正解：值域線段樹，一趟 descent</Heading>
          <p>
            把線段樹開在<strong>值域</strong>上（值離線壓縮）。節點 = 一段值域；
            節點內存「值落在這段的元素<strong>索引</strong>」，配一個 Fenwick 記 count / sum。
            索引在節點內排好序，所以任意 <InlineMath math="[l, r]" /> 的 count / sum 就是
            <code>prefix(r) − prefix(l−1)</code>，<strong>不需要把 [l, r] 拆成線段樹節點</strong>。
          </p>
          <p className="mt-4">
            查詢從根往高值走一趟，邊走邊吃（「區間第 k 小」的老骨架，多存一條 sum）：
          </p>
          <Code lang="text">{`每個 node:一段值域,存「值落在這段的元素索引」+ Fenwick(count, sum)
node 在 [l,r] 的 count/sum = 自己軸上 prefix(r) - prefix(l-1)

query(l, r, k):
    if 根在 [l,r] 的 sum < k: return -1
    node = 根;  need = k;  ans = 0
    while node 不是葉子:
        (cnt, s) = 右子(高值那半) 在 [l,r] 的 count / sum
        if s >= need:  node = 右子              # 答案糖全在高值半,走進去
        else:          ans += cnt; need -= s    # 高值半整包吃掉
                       node = 左子              # 剩下的往低值找
    return ans + ceil(need / node 的值)         # 葉子 = 單一值,補齊剩量

modify(c, x):
    沿舊值的 葉→根 路徑:每個 node 在 c 的位置 (-1, -舊值)
    沿新值的 葉→根 路徑:每個 node 在 c 的位置 (+1, +x)`}</Code>
          <p className="mt-4">
            正確性：進右子的條件是「高值那半的 sum <InlineMath math="\ge" /> need」，
            表示最貪心的吃法根本吃不到左半；反之右半全吃也不夠，就整包收下、剩額丟給左半。
            每一步都跟「由大到小吃」一致。
          </p>
          <p className="mt-4">
            複雜度：每層一次節點查詢（軸上二分定位 + Fenwick 前綴，<InlineMath math="O(\log)" />），
            樹高 <InlineMath math="O(\log)" />，單次查詢 <InlineMath math="O(\log^2 N)" />；
            修改沿兩條葉到根的路徑，也是 <InlineMath math="O(\log^2 N)" />。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="discretize">細節：每個 node 自己的離散化軸</Heading>
          <p>
            直接開會爆：值樹約 <InlineMath math="2(N+Q)" /> 個節點，如果每個節點的 Fenwick 都照完整索引
            <InlineMath math="[1, N]" /> 開，就是 <InlineMath math="4 \times 10^5 \times 10^5" /> 級、
            上百億格，記憶體直接炸。所以<strong>每個 node 要有自己的離散化系統</strong>：
            BIT 只開「會出現在這個 node 的元素」那麼大。
          </p>
          <p className="mt-4">
            哪些元素會碰到哪個 node，可以<strong>離線</strong>先算出來：
            索引 <InlineMath math="c" /> 一生會有的值 = 初始 <InlineMath math="A_c" /> + 之後改到它的所有 <InlineMath math="x" />，
            全部事先讀得到。對每對 (索引, 可能值)，沿該值葉到根的路徑把索引鋪進每個 node 的「軸」；
            軸排序去重後<strong>固定不動</strong>。每對貢獻 <InlineMath math="O(\log)" /> 個 node、配對總數 <InlineMath math="N+Q" />，
            總格數 <InlineMath math="O((N+Q)\log N)" />，幾百萬格而已。
          </p>
          <p className="mt-4">
            軸固定還有一個關鍵好處：<strong>排名不會浮動</strong>。改值只動計數（舊值路徑 −1、新值路徑 +1），
            軸本身不增不減，所以 lower_bound 出來的位置永遠有效，不用擔心「改值之後排序亂掉」。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="walkthrough">走一遍</Heading>
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
          <Heading id="tle">附註：merge-sort tree + 外層二分為何多一個 log</Heading>
          <p>
            最自然的第一版是反過來：以「索引」開線段樹，每個節點存自己那段的值（merge-sort tree），
            要支援改值就把排序陣列換成 Fenwick。查詢時把 <InlineMath math="[l, r]" /> 拆成
            <InlineMath math="O(\log N)" /> 個節點問「值 <InlineMath math="\ge t" /> 的 count / sum」，
            再對門檻 <InlineMath math="t" /> 外層二分，單次 <InlineMath math="O(\log^3 N)" />，TLE。
          </p>
          <p className="mt-4">
            差在外層二分把 count / sum 當黑盒，每 check 一次就從根重拆一次區間，搜尋跟樹結構沒共用。
            index ↔ value 對調之後，「搜答案」本身就是樹上那趟 descent，一個 log 就這樣省掉了。
          </p>
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
              <strong>descent 是一條路，不是 DFS</strong>：每層只進一個 child，
              搜答案跟樹結構共用同一趟。
            </li>
            <li>
              <strong>二分沒有完全消失</strong>：每層還是要在節點的軸上 lower_bound 定位 <InlineMath math="l, r" />，
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
      <RelatedPosts href="/blog/abc467g-many-sweets" />
    </article>
  );
}
