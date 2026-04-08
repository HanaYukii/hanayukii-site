import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import Code from "@/components/CodeBlock";

export const metadata: Metadata = {
  title: "聊聊 C++ 編譯期能做的事 | 花雪 HanaYukii",
  description:
    "這篇不想列語法大全，只想講幾個真的常用、而且能把 runtime 成本直接搬去編譯期的技巧。",
  openGraph: {
    title: "聊聊 C++ 編譯期能做的事",
    description:
      "幾個真的常用、而且能把 runtime 成本直接搬去編譯期的 C++ 技巧。",
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

export default function CppCompileTimeOptimization() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <FadeIn>
        {/* Back link */}
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-1 text-sm text-text-muted transition-colors hover:text-primary"
        >
          &larr; Back to Blog
        </Link>

        {/* Header */}
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-sky/10 px-2.5 py-0.5 text-xs font-medium text-sky">
            C++
          </span>
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            Performance
          </span>
          <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
            Compile-time
          </span>
        </div>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight">
          聊聊 C++ 編譯期能做的事
        </h1>
        <p className="mb-8 text-text-muted">
          我自己在意的不是語法炫不炫，而是哪些東西真的值得提早到編譯期做。
          這篇挑五個我覺得最常用、也最有感的點來講。
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        {/* TOC */}
        <nav className="mb-12 rounded-xl border border-border bg-surface/40 p-6 backdrop-blur-sm">
          <p className="mb-3 text-sm font-bold text-text-muted uppercase tracking-wider">
            這篇會用到的五個小工具
          </p>
          <div className="space-y-2">
            {[
              { id: "item1", title: "先分清楚：constexpr、const、#define" },
              { id: "item2", title: "constexpr 函數到底幫你省了什麼" },
              { id: "item3", title: "用 static_assert 把 bug 擋在編譯期" },
              { id: "item4", title: "if constexpr / requires 真正好用的地方" },
              { id: "item5", title: "用 IIFE 生成查表（LUT）" },
            ].map((item, i) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="flex items-center rounded-lg px-3 py-2 text-sm transition-colors hover:bg-surface-hover"
              >
                <span className="text-text-muted mr-2">{i + 1}.</span>
                <code className="text-primary">{item.title}</code>
              </a>
            ))}
          </div>
        </nav>
      </FadeIn>

      <div className="prose-custom space-y-2 text-text-muted leading-relaxed [&_strong]:text-text [&_code]:rounded [&_code]:bg-surface [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-primary [&_code]:text-sm">
        {/* ============ Item 1 ============ */}
        <FadeIn>
          <Heading id="item1">
            先分清楚：<code>constexpr</code>、<code>const</code>、<code>#define</code>
          </Heading>

          <SubHeading>三者的差異</SubHeading>
          <Code lang="cpp">{`#define kWL_COST 1.0              // ❌ 預處理器替換，無 type、無 scope
const double kWL_COST = 1.0;      // ⚠ 有 type，但不保證編譯期可用
constexpr double kWL_COST = 1.0;  // ✅ 有 type、有 scope、編譯期求值`}</Code>

          <SubHeading>
            為什麼 <code>const</code> 不夠？
          </SubHeading>
          <Code lang="cpp">{`const int x = rand();  // ← 合法！const 只保證「不可修改」，不保證編譯期已知
constexpr int y = 42;  // ← 保證編譯期確定值`}</Code>
          <p>
            <code>constexpr</code> 才能用在：<code>if constexpr</code>、template
            non-type parameter、<code>static_assert</code>
          </p>

          <SubHeading>Repo 實例</SubHeading>
          <Code lang="cpp">{`// src/utils/config.hpp
constexpr double kWL_COST = 1.0;
constexpr double kVIA_COST = 1.0;
constexpr size_t kMAX_BBOX_PADDING = 20;
constexpr bool kBUDGET_REWARD = true;`}</Code>
          <p>
            唯一用 <code>#define</code> 的地方 - 必須做{" "}
            <code>#if</code> 條件編譯：
          </p>
          <Code lang="cpp">{`#define GRAPH_FOURIER_FEATURE 1   // 需要 #if，constexpr 做不到`}</Code>

          <SubHeading>編譯產物對比</SubHeading>
          <Code lang="x86asm">{`=== const double COST = 1.0; (-O0) ===

f(x):
    load  COST → reg        ← 從記憶體讀取（可能 cache miss）
    mul   x, reg
    ret

=== constexpr double COST = 1.0; (-O0) ===

f(x):
    mul   x, 1.0            ← 值直接嵌入指令，零記憶體存取
    ret`}</Code>
          <Callout>
            <code>const</code> 的值存在記憶體，用時要 load；
            <code>constexpr</code> 的值直接嵌進指令。
          </Callout>
        </FadeIn>

        {/* ============ Item 2 ============ */}
        <FadeIn>
          <Heading id="item2">
            <code>constexpr</code> 函數到底幫你省了什麼
          </Heading>

          <SubHeading>核心特性</SubHeading>
          <ul className="list-inside list-disc space-y-1 pl-2">
            <li>
              所有參數都是編譯期已知 → 整個函數在編譯期求值，結果變 constant
            </li>
            <li>參數是 runtime 值 → 退化為普通函數，沒有額外成本</li>
            <li>
              同一份 source code，<strong>完全不同的機器碼</strong>
            </li>
          </ul>

          <SubHeading>Repo 實例 - Sorting Network</SubHeading>
          <Code lang="cpp">{`// src/utils/math.hpp
template <typename T>
inline constexpr std::pair<T, T> TwoMedians(T a, T b, T c, T d) {
  if (a > b) std::swap(a, b);
  if (c > d) std::swap(c, d);
  if (a > c) std::swap(a, c);
  if (b > d) std::swap(b, d);
  if (b > c) std::swap(b, c);
  return {b, c};
}`}</Code>
          <p>
            為什麼適合 <code>constexpr</code>？- 只有比較和 swap，no heap
            allocation、no I/O
          </p>

          <SubHeading>Repo 實例 - Bitwise 方向反轉</SubHeading>
          <Code lang="cpp">{`// src/utils/direction.hpp
constexpr AxialDir ReverseDir(AxialDir dir) {
  constexpr uint32_t hor_mask = AxialDir::kLeft | AxialDir::kRight;   // 0b0011
  constexpr uint32_t ver_mask = AxialDir::kTop | AxialDir::kBottom;   // 0b1100
  uint32_t dir_val = static_cast<uint32_t>(dir);
  return static_cast<AxialDir>(
      dir_val ^ ((dir_val & hor_mask) ? hor_mask : ver_mask));
}`}</Code>
          <p>
            <code>ReverseDir(kLeft)</code> 在編譯期直接展開為{" "}
            <code>kRight</code>，不產生任何指令。
          </p>

          <SubHeading>編譯產物對比</SubHeading>
          <Code lang="x86asm">{`=== 編譯期：constexpr auto result = TwoMedians(3, 1, 4, 2); ===

result.first  = 2        ← 直接寫常數，函數體完全消失
result.second = 3        ← 沒有任何比較指令

=== Runtime：auto result = TwoMedians(a, 1, 4, 2); ===

if a > 1:  swap(a, 1)    ← 生成 5 組比較 + 交換
if 4 > 2:  swap(4, 2)
if a > 4:  swap(a, 4)
...`}</Code>
        </FadeIn>

        {/* ============ Item 3 ============ */}
        <FadeIn>
          <Heading id="item3">
            用 <code>static_assert</code> 把 bug 擋在編譯期
          </Heading>

          <SubHeading>三種 Assert 的比較</SubHeading>
          <div className="my-4 overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-surface/60">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-text">
                    方式
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-text">
                    時機
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-text">
                    生產環境
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-text">
                    成本
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="px-4 py-2">
                    <code>static_assert</code>
                  </td>
                  <td className="px-4 py-2">編譯期</td>
                  <td className="px-4 py-2">不可能出錯（build 不過）</td>
                  <td className="px-4 py-2 font-bold text-primary">零</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-2">
                    <code>assert</code>
                  </td>
                  <td className="px-4 py-2">Runtime (debug)</td>
                  <td className="px-4 py-2">Release 可能被關掉</td>
                  <td className="px-4 py-2">Debug only</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">
                    <code>throw / .at()</code>
                  </td>
                  <td className="px-4 py-2">Runtime (always)</td>
                  <td className="px-4 py-2">會觸發</td>
                  <td className="px-4 py-2">每次都檢查</td>
                </tr>
              </tbody>
            </table>
          </div>

          <SubHeading>Repo 實例 - LUT 大小保護</SubHeading>
          <Code lang="cpp">{`// src/utils/fast_sincos.hpp
static constexpr size_t TABLE_SIZE = 4096;
static_assert((TABLE_SIZE & (TABLE_SIZE - 1)) == 0,
              "TABLE_SIZE must be a power of 2 for bitmask optimization");`}</Code>
          <p>
            後面用 <code>& (TABLE_SIZE - 1)</code> 取餘數 - 如果改成 4000 就{" "}
            <strong>build 不過</strong>。
          </p>

          <SubHeading>Repo 實例 - STL Concept 檢查</SubHeading>
          <Code lang="cpp">{`// src/layer/dir_layer.hpp
static_assert(std::bidirectional_iterator<iterator>);`}</Code>
          <p>
            少實作 <code>operator--</code> → 編譯期直接報錯，不會到 runtime
            才發現不能用 <code>std::prev()</code>。
          </p>

          <SubHeading>編譯產物對比</SubHeading>
          <Code lang="x86asm">{`=== static_assert((4096 & 4095) == 0, "..."); ===

; 輸出：（什麼都沒有）
; 完全不產生任何機器碼，只在編譯階段做檢查

=== runtime assert((TABLE_SIZE & (TABLE_SIZE - 1)) == 0); ===

    load  TABLE_SIZE → reg
    sub   reg, 1
    and   reg, TABLE_SIZE
    cmp   reg, 0
    jne   crash              ← 每次 runtime 都要花幾條指令`}</Code>
        </FadeIn>

        {/* ============ Item 4 ============ */}
        <FadeIn>
          <Heading id="item4">
            <code>if constexpr</code> + <code>requires</code> 真正好用的地方
          </Heading>

          <SubHeading>先理解問題</SubHeading>
          <p>你想寫一個泛型函數，同時處理兩種容器：</p>
          <Code>{`std::map<int, int> 的元素  →  pair<int,int>  →  取 .first
std::set<int>      的元素  →  int            →  直接回傳`}</Code>

          <SubHeading>
            為什麼普通 <code>if</code> 不行？
          </SubHeading>
          <Code lang="cpp">{`auto get_key = [](const auto& elem) {
  if (/* 某條件 */) {
    return elem.first;   // ← int 沒有 .first！
  } else {
    return elem;
  }
};`}</Code>
          <p>
            你可能覺得：set 不會走 if 分支，那就沒問題吧？
          </p>
          <p>
            <strong>錯。</strong> C++
            規則：<strong>
              兩個分支都必須能編譯，即使 runtime 永遠走不到。
            </strong>
          </p>
          <Code lang="text">{`error: 'int' has no member named 'first'`}</Code>

          <SubHeading>
            <code>if constexpr</code> 在做什麼？
          </SubHeading>
          <Code lang="cpp">{`auto get_key = [](const auto& elem) {
  if constexpr (requires { elem.first; }) {
    return elem.first;     // 只有 pair type才會生成這段
  } else {
    return elem;           // 只有非 pair type才會生成這段
  }
};`}</Code>
          <p>
            <code>requires {"{ elem.first; }"}</code> = 編譯期語法測試：這個type能不能寫{" "}
            <code>elem.first</code>？
          </p>

          <SubHeading>
            普通 <code>if</code> vs <code>if constexpr</code> 的處理流程
          </SubHeading>
          <Code>{`普通 if：

    template instantiation
           ↓
    兩條分支都生成          ← 兩邊都要能編譯
           ↓
    type檢查（兩邊都查）
           ↓
    runtime 選一條

if constexpr：

    template instantiation
           ↓
    編譯期判斷條件
           ↓
    只保留 true 的分支      ← false 分支直接丟棄（discarded statement）
           ↓
    另一條根本不存在         ← 連type檢查都不做`}</Code>

          <SubHeading>實際 instantiation 結果</SubHeading>
          <Code lang="cpp">{`// 對 std::map<int,int> 呼叫時，編譯器生成：
get_key(elem):
    return elem.first;       // else 分支完全不存在

// 對 std::set<int> 呼叫時，編譯器生成：
get_key(elem):
    return elem;             // if 分支完全不存在`}</Code>
          <Callout>
            同一份 source code → 編譯器根據type生成完全不同的版本，零 runtime 成本。
          </Callout>

          <SubHeading>以前怎麼做？- C++11 SFINAE</SubHeading>
          <Code lang="cpp">{`// 需要寫兩個 overload + decltype + SFINAE fallback
template<typename T>
auto get_key(const T& elem) -> decltype(elem.first) { return elem.first; }

template<typename T>
auto get_key(const T& elem) -> /* SFINAE fallback */ { return elem; }`}</Code>
          <p>
            C++20 <code>if constexpr</code> + <code>requires</code> - 一個
            lambda 搞定：
          </p>
          <Code lang="cpp">{`auto get_key = [](const auto& elem) {
  if constexpr (requires { elem.first; }) {
    return elem.first;
  } else {
    return elem;
  }
};`}</Code>
          <Callout>
            <code>if constexpr</code> =
            模板世界的 dead code elimination，不是 runtime
            分支，而是<strong>type導向的編譯期剪枝</strong>。
          </Callout>
        </FadeIn>

        {/* ============ Item 5 ============ */}
        <FadeIn>
          <Heading id="item5">
            用 <code>static inline</code> + IIFE 生成查表（LUT）
          </Heading>

          <SubHeading>這段 code 在做什麼？</SubHeading>
          <Code lang="cpp">{`static inline std::array<double, 4096> sin_table_ = []() {
  std::array<double, 4096> table;
  for (size_t i = 0; i < 4096; ++i) {
    table[i] = std::sin(2 * std::numbers::pi * i / 4096);
  }
  return table;
}();   // ← 注意這個 ()`}</Code>
          <p>拆開看兩件事：</p>
          <Code>{`A.  []() { ... }     ← 定義一個 lambda
B.  ()                ← 立刻呼叫它（IIFE）`}</Code>

          <SubHeading>
            為什麼要 <code>static inline</code>？
          </SubHeading>
          <p>
            如果在 header 裡直接寫全域變數 - 每個 .cpp include 都產生一份定義
            → ODR violation → linker 爆炸。
          </p>
          <Code lang="cpp">{`// ❌ 傳統做法：很麻煩
// header.hpp
extern std::array<double, 4096> sin_table_;   // 宣告
// impl.cpp
std::array<double, 4096> sin_table_ = ...;    // 定義（破壞 header-only）

// ✅ C++17 解法：
static inline std::array<double, 4096> sin_table_ = ...;`}</Code>
          <p>
            <code>inline</code> 變數 = 多個 TU 可以定義，linker
            幫你合併成同一份。跟 <code>inline</code> function 同概念。
          </p>

          <SubHeading>查表 vs 每次計算</SubHeading>
          <Code lang="x86asm">{`=== LUT 查表：FastSin(angle) ===

    index = angle * (4096 / 2π)       ← 1 次乘法
    index = index & 4095              ← 1 次 AND（1 cycle）
    return sin_table_[index]          ← 1 次 memory load
    ; 總共 ~3 條指令

=== 每次呼叫 std::sin(angle) ===

    ; 內部做 argument reduction + polynomial approximation
    ; ~50-100 條指令，多次乘法、加法、分支
    ; 慢 10~20 倍`}</Code>

          <SubHeading>
            為什麼用 <code>& 4095</code> 而不是 <code>% 4096</code>？
          </SubHeading>
          <Code>{`index % 4096   →  div 指令   ← ~20-30 cycle
index & 4095   →  and 指令   ← 1 cycle`}</Code>
          <p>
            因為 <code>4096 = 2^12</code>，所以{" "}
            <code>4095 = 0b111111111111</code>。前提是 4096 必須是 2 的冪 →
            所以 Item 3 才有 <code>static_assert</code> 保護。
          </p>

          <SubHeading>Cache 行為：為什麼 4096 剛好？</SubHeading>
          <Code>{`4096 entries × 8 bytes (double) = 32 KB`}</Code>
          <p>
            32 KB ≈ 很多 CPU 的 <strong>L1 data cache</strong> 大小。表小到可以全部放進
            L1 → memory load 很快（~4 cycle）。如果開 1M table → cache miss →
            反而變慢。
          </p>
          <Callout>
            工程判斷：LUT 適合高頻熱路徑 + 允許精度誤差 + 輸入範圍固定。
          </Callout>

          <SubHeading>進階：C++20 真正的編譯期 LUT</SubHeading>
          <Code lang="cpp">{`static constexpr auto sin_table_ = []() constexpr {
  std::array<double, 4096> table{};
  for (size_t i = 0; i < 4096; ++i) {
    table[i] = /* constexpr sin implementation */;
  }
  return table;
}();`}</Code>
          <p>
            整個 table 放進 <code>.rodata</code> section，完全沒有 runtime
            initialization。但 <code>std::sin</code> 不是{" "}
            <code>constexpr</code>（標準未規定），所以目前用{" "}
            <code>inline</code> 版本。
          </p>

          <SubHeading>這段 LUT 實作其實只靠三件事</SubHeading>
          <div className="my-4 overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-surface/60">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-text">
                    技術
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-text">
                    解決什麼問題
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="px-4 py-2">
                    <code>inline</code> variable
                  </td>
                  <td className="px-4 py-2">
                    Header-only 全域變數不違反 ODR
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-2">
                    IIFE <code>{"[](){}()"}</code>
                  </td>
                  <td className="px-4 py-2">初始化邏輯乾淨寫在一行</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">LUT 查表</td>
                  <td className="px-4 py-2">
                    用空間換時間 - 把 expensive 計算換成 cheap memory load
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </FadeIn>

        {/* ============ Summary ============ */}
        <FadeIn>
          <Heading id="summary">我自己最常用的幾個點</Heading>
          <div className="space-y-4">
            <p>
              我平常不會為了「看起來很 compile-time」硬寫一堆 template trick。
              真正常用的通常就這幾種：<code>constexpr</code> 常數、
              <code>constexpr</code> 小函數、<code>static_assert</code>，
              還有 <code>if constexpr</code> / <code>requires</code> 這種能直接把分支剪掉的工具。
            </p>
            <ul className="list-inside list-disc space-y-2 text-sm">
              <li>常數和純計算，能前移就前移。</li>
              <li>type、size、invariant 這種錯誤，盡量在 build 時就擋掉。</li>
              <li>generic code 真的分型別走不同邏輯時，再用 <code>if constexpr</code>。</li>
              <li>固定範圍、又很常查的 expensive 計算，才值得做 LUT。</li>
            </ul>
            <p>
              重點不是語法炫，而是把不必留到 runtime 的工作提前做掉。
            </p>
          </div>
        </FadeIn>
      </div>
    </article>
  );
}
