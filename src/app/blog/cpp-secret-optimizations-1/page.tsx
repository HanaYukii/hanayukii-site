import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import Code from "@/components/CodeBlock";

export const metadata: Metadata = {
  title: "C++ 你不知道的優化（上）：SSO 與 Copy Elision | 花雪 HanaYukii",
  description:
    "std::string 不一定用 heap？return 時加 std::move 反而更慢？拆解編譯器與標準庫在背後做的事。",
  openGraph: {
    title: "C++ 你不知道的優化（上）：SSO 與 Copy Elision",
    description:
      "std::string 不一定用 heap？return 時加 std::move 反而更慢？拆解編譯器與標準庫在背後做的事。",
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


function QuizBox({
  question,
  options,
  answer,
  explanation,
}: {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}) {
  return (
    <div className="my-6 rounded-xl border border-warm/30 bg-warm/5 p-6">
      <p className="mb-3 text-sm font-bold text-warm uppercase tracking-wider">
        Quiz
      </p>
      <p className="mb-3 font-bold text-text">{question}</p>
      <ul className="mb-4 list-inside space-y-1 pl-2 text-sm">
        {options.map((opt, i) => (
          <li key={i}>{opt}</li>
        ))}
      </ul>
      <details className="group cursor-pointer">
        <summary className="text-sm font-medium text-primary hover:underline">
          Show Answer
        </summary>
        <div className="mt-2 rounded-lg bg-surface/60 p-3 text-sm">
          <p className="font-bold text-text">{answer}</p>
          <p className="mt-1 text-text-muted">{explanation}</p>
        </div>
      </details>
    </div>
  );
}

export default function CppSecretOptimizations1() {
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
            Memory
          </span>
        </div>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight">
          C++ 你不知道的優化（上）：SSO 與 Copy Elision
        </h1>
        <p className="mb-2 text-sm text-text-muted">2026-03-31</p>
        <p className="mb-8 text-text-muted">
          你以為 <code>std::string</code> 一定會 <code>new</code>？你以為 <code>return</code> 一定會複製？
          編譯器在背後做的事比你想的還多 - 這篇帶你看兩個最常見的隱藏優化。
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        {/* TOC */}
        <nav className="mb-12 rounded-xl border border-border bg-surface/40 p-6 backdrop-blur-sm">
          <p className="mb-3 text-sm font-bold text-text-muted uppercase tracking-wider">
            Agenda
          </p>
          <div className="space-y-2">
            {[
              { id: "item1", title: "SSO - std::string 不一定用 heap" },
              { id: "item2", title: "Copy Elision / NRVO - 省掉看不見的複製" },
            ].map((item, i) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors hover:bg-surface-hover"
              >
                <span>
                  <span className="text-text-muted mr-2">{i + 1}.</span>
                  <code className="text-primary">{item.title}</code>
                </span>
              </a>
            ))}
          </div>
        </nav>
      </FadeIn>

      <div className="prose-custom space-y-2 text-text-muted leading-relaxed [&_strong]:text-text [&_code]:rounded [&_code]:bg-surface [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-primary [&_code]:text-sm">
        {/* ============ Item 1: SSO ============ */}
        <FadeIn>
          <Heading id="item1">
            Item 1 - SSO：<code>std::string</code> 不一定用 heap
          </Heading>

          <p>
            大部分人對 <code>std::string</code> 的心智模型是：建構時 <code>new</code> 一塊
            heap 記憶體，解構時 <code>delete</code>。但如果字串很短，標準庫實作會把內容直接塞在
            string 物件本身裡面 - 完全不碰 heap。這就是{" "}
            <strong>Small String Optimization（SSO）</strong>。
          </p>

          <SubHeading>SSO 的運作機制</SubHeading>
          <p>
            核心想法是用 <strong>union</strong>：string 物件內部有一塊固定大小的 buffer。
            當字串長度小於這個 buffer 時，內容直接存在 stack 上的物件裡；超過了才去 heap 分配。
          </p>
          <Code lang="cpp">{`// 簡化的概念模型（非實際實作）
class string {
  union {
    struct {               // 長字串模式
      char* ptr;           // 指向 heap
      size_t size;
      size_t capacity;
    } long_;
    struct {               // 短字串模式（SSO）
      char buf[24];        // 內嵌 buffer
      uint8_t remaining;   // 剩餘可用空間
    } short_;
  };
};`}</Code>

          <SubHeading>各編譯器的 SSO 閾值</SubHeading>
          <div className="my-4 overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-surface/60">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-text">
                    實作
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-text">
                    SSO 閾值（含 null terminator）
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-text">
                    sizeof(string)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="px-4 py-2">GCC libstdc++</td>
                  <td className="px-4 py-2 font-bold text-primary">15 bytes</td>
                  <td className="px-4 py-2">32</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-2">Clang libc++</td>
                  <td className="px-4 py-2 font-bold text-primary">22 bytes</td>
                  <td className="px-4 py-2">24</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">MSVC STL</td>
                  <td className="px-4 py-2 font-bold text-primary">15 bytes</td>
                  <td className="px-4 py-2">32</td>
                </tr>
              </tbody>
            </table>
          </div>

          <SubHeading>記憶體佈局圖</SubHeading>
          <Code>{`=== 短字串（SSO 模式）===

std::string s = "hello";

┌─────────────────────────────────┐
│  string 物件（stack 上，32 bytes） │
│  ┌─────────────────────────────┐ │
│  │ h │ e │ l │ l │ o │\\0│   │  │ │  ← 直接存在物件內部
│  │   （剩餘空間未使用）          │ │
│  └─────────────────────────────┘ │
└─────────────────────────────────┘
  ✅ 不碰 heap，不呼叫 allocator


=== 長字串（heap 模式）===

std::string s = "this is a somewhat longer string for testing";

┌─────────────────────────────────┐
│  string 物件（stack 上，32 bytes） │
│  ┌─────────────────────────────┐ │
│  │ ptr ──────────────────────┐ │ │
│  │ size = 45                 │ │ │
│  │ capacity = 64             │ │ │
│  └───────────────────────────┘ │ │
└──────────────────────────────┘ │ │
                                 ↓
                    ┌────────────────────────┐
                    │ heap 記憶體              │
                    │ "this is a somewhat..." │
                    └────────────────────────┘
  ❌ 需要 malloc + free`}</Code>

          <SubHeading>如何驗證 SSO？</SubHeading>
          <p>
            比較 string 物件的位址和其內部 data 指標的距離 - 如果 data 指向物件本身的範圍內，
            就是 SSO。
          </p>
          <Code lang="cpp">{`#include <iostream>
#include <string>

void check_sso(const std::string& s) {
    const void* obj_addr = &s;
    const void* data_addr = s.data();

    // 如果 data 指標落在物件本身的記憶體範圍內 → SSO
    auto diff = reinterpret_cast<uintptr_t>(data_addr)
              - reinterpret_cast<uintptr_t>(obj_addr);

    bool is_sso = diff < sizeof(std::string);

    std::cout << "\"" << s << "\" (" << s.size() << " bytes): "
              << (is_sso ? "SSO ✅" : "Heap ❌") << std::endl;
}

int main() {
    check_sso("hello");                                    // SSO ✅
    check_sso("12345678901234");                           // SSO ✅ (14 chars, < 15)
    check_sso("this is a somewhat longer string");         // Heap ❌
    check_sso("");                                         // SSO ✅
}`}</Code>

          <SubHeading>
            為什麼 <code>std::vector</code> 沒有 SSO？
          </SubHeading>
          <p>
            你可能會想：既然 string 可以做 SSO，為什麼 <code>vector</code> 不做 Small Vector
            Optimization？
          </p>
          <ul className="list-inside list-disc space-y-1 pl-2">
            <li>
              <code>sizeof(std::vector)</code> = <strong>24 bytes</strong>（pointer + size + capacity）
            </li>
            <li>
              <code>sizeof(std::string)</code> = <strong>32 bytes</strong>（多出的 8 bytes 正是 SSO buffer 的空間）
            </li>
            <li>
              string 的使用場景中短字串佔絕大多數（key、name、label...），值得多花 8 bytes
            </li>
            <li>
              vector 的element type不固定（<code>vector&lt;int&gt;</code> vs <code>vector&lt;Widget&gt;</code>），
              很難決定 buffer 要多大
            </li>
          </ul>
          <Callout>
            Boost 和 LLVM 提供了 <code>small_vector</code>，讓你自己指定 inline capacity。
            標準庫選擇不做這件事，是一個刻意的設計取捨。
          </Callout>

          <SubHeading>效能影響與陷阱</SubHeading>
          <p>
            SSO 在短字串密集的場景下效果顯著 - 例如 JSON parsing、symbol table、config
            處理。但有一個需要注意的地方：<strong>效能懸崖（performance cliff）</strong>。
          </p>
          <Code>{`字串長度:  10   12   14   15   16   18   20
           ──────────────────────────────────
GCC:       SSO  SSO  SSO  SSO  heap heap heap
                                ↑
                          效能懸崖：多 1 byte 就觸發 heap allocation`}</Code>
          <p>
            如果你的 key 長度剛好在閾值附近，微小的長度變化會導致不成比例的效能差異。
            了解你的編譯器的 SSO 閾值，在設計 key 命名時可以有意識地控制長度。
          </p>

          <QuizBox
            question="下列哪一個字串會觸發 heap allocation？（假設 GCC libstdc++，SSO 閾值 15 bytes）"
            options={[
              'A. std::string a = "hello";',
              'B. std::string b = "this is a somewhat longer string for testing";',
              'C. std::string c = "";',
              'D. std::string d = "12345678901234";',
            ]}
            answer="答案：B"
            explanation={
              'A 是 5 bytes、C 是 0 bytes、D 是 14 bytes - 都在 SSO 閾值（15 bytes）以內。' +
              'B 遠超 15 bytes，必須走 heap allocation。'
            }
          />
        </FadeIn>

        {/* ============ Item 2: Copy Elision / NRVO ============ */}
        <FadeIn>
          <Heading id="item2">
            Item 2 - Copy Elision / NRVO：省掉看不見的複製
          </Heading>

          <p>
            當函數 return 一個物件時，直覺上你會想：函數內部建構一個 local 物件，return
            時複製（或搬移）到外面。但編譯器其實可以把這次複製完全省略 - 這就是{" "}
            <strong>Copy Elision</strong>，其中最常見的形式叫{" "}
            <strong>NRVO（Named Return Value Optimization）</strong>。
          </p>

          <SubHeading>Hidden Pointer 機制</SubHeading>
          <p>
            編譯器在背後偷偷改了函數的呼叫方式：caller 把 return value 的目標位址當作隱藏參數傳給
            callee，callee 直接在那個位址上建構物件。
          </p>
          <Code>{`=== 你寫的 code ===

std::vector<int> make_vec() {
    std::vector<int> v = {1, 2, 3};
    return v;
}
auto result = make_vec();


=== 編譯器實際做的事（概念模型）===

void make_vec(std::vector<int>* __result) {   // ← hidden pointer
    new (__result) std::vector<int>{1, 2, 3}; // ← 直接在 caller 的空間建構
    // 不需要複製！不需要搬移！
}

std::vector<int> result;          // ← 預留空間
make_vec(&result);                // ← 把位址傳進去`}</Code>
          <Callout>
            NRVO 的結果：物件只建構一次，直接建構在最終目的地。
            沒有 copy constructor、沒有 move constructor、沒有臨時物件。
          </Callout>

          <SubHeading>用自訂 struct 驗證</SubHeading>
          <p>
            透過在 constructor / destructor 加上 print，可以清楚看到 NRVO 是否生效。
          </p>
          <Code lang="cpp">{`#include <iostream>

struct Obj {
    Obj()                    { std::cout << "建構\\n"; }
    Obj(const Obj&)          { std::cout << "複製建構\\n"; }
    Obj(Obj&&)               { std::cout << "搬移建構\\n"; }
    ~Obj()                   { std::cout << "解構\\n"; }
};

Obj make() {
    Obj o;
    return o;   // NRVO：直接在 caller 空間建構
}

int main() {
    Obj x = make();
}

// 輸出（NRVO 生效時）：
// 建構       ← 只有一次！
// 解構       ← 只有一次！`}</Code>

          <SubHeading>
            <code>return std::move(v)</code> - 最常見的 anti-pattern
          </SubHeading>
          <p>
            很多人以為加上 <code>std::move</code> 會更快。
            <strong>恰恰相反：它會破壞 NRVO，讓效能變差。</strong>
          </p>
          <Code lang="cpp">{`// ❌ 破壞 NRVO！
std::vector<int> make_vec() {
    std::vector<int> v = {1, 2, 3};
    return std::move(v);   // 編譯器無法做 NRVO → 強制 move construct
}

// ✅ 正確做法：直接 return
std::vector<int> make_vec() {
    std::vector<int> v = {1, 2, 3};
    return v;              // 編譯器做 NRVO → 零複製零搬移
}`}</Code>
          <p>為什麼？</p>
          <ul className="list-inside list-disc space-y-1 pl-2">
            <li>
              <code>return v;</code> → 編譯器看到 named local variable，啟動 NRVO → 零成本
            </li>
            <li>
              <code>return std::move(v);</code> → expression type 變成 rvalue reference，
              NRVO 條件不成立 → 退化成 move construction
            </li>
          </ul>
          <Callout>
            <code>return std::move(x)</code> 幾乎永遠是錯的。
            直接 <code>return x;</code> 讓編譯器幫你決定 - 它比你聰明。
          </Callout>

          <SubHeading>NRVO 失敗的情況</SubHeading>
          <p>
            NRVO 不是萬能的。以下幾種情況編譯器<strong>無法</strong>做 NRVO：
          </p>

          <p className="mt-4 font-bold text-text">1. 多個 return 路徑使用不同 local 變數</p>
          <Code lang="cpp">{`// ❌ NRVO 失敗：編譯器不知道要在 caller 空間建構 a 還是 b
Obj make(bool flag) {
    Obj a, b;
    if (flag) return a;
    return b;
}`}</Code>

          <p className="mt-4 font-bold text-text">2. 回傳函數參數</p>
          <Code lang="cpp">{`// ❌ NRVO 失敗：參數的生命週期由 caller 管理，不在 callee 控制範圍
Obj process(Obj input) {
    // ... 做一些處理
    return input;    // input 是參數，不是 local variable
}`}</Code>

          <p className="mt-4 font-bold text-text">
            3. <code>return std::move(x)</code>
          </p>
          <Code lang="cpp">{`// ❌ NRVO 失敗：std::move 改變了表達式的 value category
Obj make() {
    Obj o;
    return std::move(o);   // 變成 rvalue → NRVO 條件不成立
}`}</Code>

          <p className="mt-4 font-bold text-text">4. 三元運算子中的不同變數</p>
          <Code lang="cpp">{`// ❌ NRVO 失敗：和多 return 路徑同理
Obj make(bool flag) {
    Obj a, b;
    return flag ? a : b;
}`}</Code>

          <SubHeading>C++17 強制 Copy Elision</SubHeading>
          <p>
            C++17 規定：回傳<strong>臨時物件（prvalue）</strong>時，copy elision 是強制的，
            不是優化，而是語言保證。
          </p>
          <Code lang="cpp">{`Obj make() {
    return Obj{};   // C++17 起：保證不會複製或搬移
}

// 等價於直接在 caller 空間建構 Obj{}
Obj x = make();     // 保證只有一次建構`}</Code>
          <p>
            注意區分：回傳<strong>臨時物件</strong>（C++17 強制省略）vs 回傳{" "}
            <strong>named local variable</strong>（NRVO，非強制但幾乎所有編譯器都做）。
          </p>

          <SubHeading>正確 vs 錯誤模式速查</SubHeading>
          <div className="my-4 overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-surface/60">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-text">
                    寫法
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-text">
                    NRVO / Copy Elision
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-text">
                    實際成本
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="px-4 py-2">
                    <code>return v;</code>
                  </td>
                  <td className="px-4 py-2 font-bold text-primary">NRVO</td>
                  <td className="px-4 py-2">零（直接建構在 caller）</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-2">
                    <code>{"return Obj{};"}</code>
                  </td>
                  <td className="px-4 py-2 font-bold text-primary">C++17 強制省略</td>
                  <td className="px-4 py-2">零（語言保證）</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-2">
                    <code>return std::move(v);</code>
                  </td>
                  <td className="px-4 py-2 text-warm">NRVO 失敗</td>
                  <td className="px-4 py-2">move construction</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-2">
                    <code>{"return {a, b, c};"}</code>
                  </td>
                  <td className="px-4 py-2 font-bold text-primary">C++17 強制省略</td>
                  <td className="px-4 py-2">零（braced-init-list）</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">
                    <code>return flag ? a : b;</code>
                  </td>
                  <td className="px-4 py-2 text-warm">NRVO 失敗</td>
                  <td className="px-4 py-2">copy 或 move</td>
                </tr>
              </tbody>
            </table>
          </div>

          <QuizBox
            question="下列哪個 return 方式最快？"
            options={[
              "A. Obj f1() { Obj v; return v; }",
              "B. Obj f2() { Obj v; return std::move(v); }",
              "C. Obj f3() { return Obj{}; }",
              "D. std::vector<int> f4() { return {1, 2, 3}; }",
            ]}
            answer="答案：A、C、D 都是最快的（零複製），B 最慢"
            explanation={
              "A 觸發 NRVO - 零成本。C 是回傳臨時物件（C++17 強制 copy elision）- 零成本。" +
              "D 是 braced-init-list，同樣享受 copy elision - 零成本。" +
              "B 使用 std::move 破壞了 NRVO，強制執行一次 move construction，反而最慢。"
            }
          />
        </FadeIn>

        {/* ============ Summary ============ */}
        <FadeIn>
          <Heading id="summary">總結</Heading>
          <div className="my-4 overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-surface/60">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-text">
                    優化
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-text">
                    機制
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-text">
                    你需要做的事
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="px-4 py-2">
                    <code>SSO</code>
                  </td>
                  <td className="px-4 py-2">短字串存在物件內部，不碰 heap</td>
                  <td className="px-4 py-2">了解閾值、控制 key 長度</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">
                    <code>NRVO / Copy Elision</code>
                  </td>
                  <td className="px-4 py-2">
                    Hidden pointer，直接在 caller 空間建構
                  </td>
                  <td className="px-4 py-2">
                    不要寫 <code>return std::move(x)</code>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 rounded-xl border border-primary/30 bg-primary/5 p-6 text-center">
            <p className="text-lg font-bold text-text">核心觀念</p>
            <p className="mt-2 text-base">
              不要和編譯器搶工作 - <strong className="text-primary">最好的優化是你什麼都不做，讓編譯器幫你做。</strong>
            </p>
          </div>

          {/* Next part link */}
          <div className="mt-12 rounded-xl border border-border bg-surface/40 p-6">
            <p className="mb-2 text-sm text-text-muted">本文是 C++ 你不知道的優化系列的上篇。</p>
            <Link
              href="/blog/cpp-secret-optimizations-2"
              className="inline-flex items-center gap-1 font-bold text-primary transition-colors hover:underline"
            >
              下篇：Struct Padding、Vtable 與 Smart Pointer &rarr;
            </Link>
          </div>
        </FadeIn>
      </div>
    </article>
  );
}
