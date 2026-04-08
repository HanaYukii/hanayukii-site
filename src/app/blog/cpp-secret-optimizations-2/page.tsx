import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import Code from "@/components/CodeBlock";

export const metadata: Metadata = {
  title: "C++ 你不知道的優化（下）：Struct Padding、Vtable 與 Smart Pointer | 花雪 HanaYukii",
  description:
    "sizeof 不是你想的那樣、virtual 讓物件膨脹 4 倍、shared_ptr 的隱藏原子操作代價。",
  openGraph: {
    title: "C++ 你不知道的優化（下）：Struct Padding、Vtable 與 Smart Pointer",
    description:
      "sizeof 不是你想的那樣、virtual 讓物件膨脹 4 倍、shared_ptr 的隱藏原子操作代價。",
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
    <div className="my-6 rounded-xl border border-warm/30 bg-warm/5 p-5">
      <p className="mb-3 text-sm font-bold text-warm">Quiz</p>
      <p className="mb-3 font-medium text-text">{question}</p>
      <ul className="mb-3 list-inside space-y-1 pl-2 text-sm">
        {options.map((opt, i) => (
          <li key={i}>{opt}</li>
        ))}
      </ul>
      <details className="group">
        <summary className="cursor-pointer text-sm font-medium text-primary hover:underline">
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

export default function CppSecretOptimizations2() {
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
          C++ 你不知道的優化（下）：Struct Padding、Vtable 與 Smart Pointer
        </h1>
        <p className="mb-4 text-text-muted">
          深入記憶體佈局與object model - 理解 struct padding 如何浪費空間、virtual
          function 的真實代價、以及 smart pointer 不為人知的隱藏成本。
        </p>
        <p className="mb-8 text-sm text-text-muted">2026-03-31</p>

        {/* Part 1 link */}
        <Link
          href="/blog/cpp-secret-optimizations-1"
          className="mb-8 inline-flex items-center gap-1 rounded-lg border border-border bg-surface/40 px-4 py-2 text-sm text-text-muted transition-colors hover:border-primary hover:text-primary"
        >
          &larr; 上篇：SSO 與 Copy Elision
        </Link>
      </FadeIn>

      <FadeIn delay={0.1}>
        {/* TOC */}
        <nav className="mb-12 rounded-xl border border-border bg-surface/40 p-6 backdrop-blur-sm">
          <p className="mb-3 text-sm font-bold text-text-muted uppercase tracking-wider">
            Agenda
          </p>
          <div className="space-y-2">
            {[
              { id: "item3", title: "Struct Padding & Alignment - sizeof 不是你想的那樣" },
              { id: "item4", title: "Vtable - virtual function 的真實代價" },
              { id: "item5", title: "Smart Pointer 的隱藏成本" },
            ].map((item, i) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors hover:bg-surface-hover"
              >
                <span>
                  <span className="text-text-muted mr-2">{i + 3}.</span>
                  <code className="text-primary">{item.title}</code>
                </span>
              </a>
            ))}
          </div>
        </nav>
      </FadeIn>

      <div className="prose-custom space-y-2 text-text-muted leading-relaxed [&_strong]:text-text [&_code]:rounded [&_code]:bg-surface [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-primary [&_code]:text-sm">
        {/* ============ Item 3 ============ */}
        <FadeIn>
          <Heading id="item3">
            Item 3 - Struct Padding & Alignment - <code>sizeof</code>{" "}
            不是你想的那樣
          </Heading>

          <SubHeading>CPU 的自然對齊要求</SubHeading>
          <p>
            CPU 存取記憶體時有一個基本規則：<strong>N-byte 的 type 必須從 N 的倍數地址開始</strong>。
            例如 <code>int</code>（4 bytes）必須放在 4 的倍數地址，<code>double</code>（8 bytes）
            必須放在 8 的倍數地址。如果不滿足這個條件，編譯器會自動插入{" "}
            <strong>padding bytes</strong> 來對齊。
          </p>
          <p>
            這意味著 <code>sizeof</code> 的結果往往比你直覺計算的「所有欄位大小總和」更大。
          </p>

          <SubHeading>記憶體佈局比較</SubHeading>
          <p>
            同樣的三個欄位，排列順序不同，<code>sizeof</code> 可以差很多：
          </p>
          <Code lang="cpp">{`// ❌ Bad：char a, double b, char c
struct Bad {
  char   a;   // 1 byte
  double b;   // 8 bytes
  char   c;   // 1 byte
};
// sizeof(Bad) = 24`}</Code>
          <Code>{`Bad 的記憶體佈局（每格 = 1 byte）：

地址:  0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20 21 22 23
     [a][  padding (7 bytes)  ][      double b (8 bytes)      ][c][  pad (7)  ]

a 佔 1 byte → 為了讓 double b 對齊到 8 的倍數，插入 7 bytes padding
c 佔 1 byte → struct 整體大小必須是最大對齊值（8）的倍數，再補 7 bytes`}</Code>

          <Code lang="cpp">{`// ✅ Good：double b, char a, char c
struct Good {
  double b;   // 8 bytes
  char   a;   // 1 byte
  char   c;   // 1 byte
};
// sizeof(Good) = 16`}</Code>
          <Code>{`Good 的記憶體佈局：

地址:  0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15
     [      double b (8 bytes)      ][a][c][ pad (6) ]

b 已經對齊 → a, c 連續放 → 尾部補 6 bytes → 總共 16 bytes`}</Code>
          <p>
            同樣的欄位，只是換了順序，就從 <strong>24 bytes 降到 16 bytes</strong>，省了 33% 的空間。
          </p>

          <SubHeading>用 sizeof 和 offsetof 驗證</SubHeading>
          <Code lang="cpp">{`#include <cstddef>
#include <cstdio>

struct Bad  { char a; double b; char c; };
struct Good { double b; char a; char c; };

int main() {
  printf("sizeof(Bad)  = %zu\\n", sizeof(Bad));   // 24
  printf("sizeof(Good) = %zu\\n", sizeof(Good));  // 16

  printf("Bad::a  offset = %zu\\n", offsetof(Bad, a));   // 0
  printf("Bad::b  offset = %zu\\n", offsetof(Bad, b));   // 8
  printf("Bad::c  offset = %zu\\n", offsetof(Bad, c));   // 16

  printf("Good::b offset = %zu\\n", offsetof(Good, b));  // 0
  printf("Good::a offset = %zu\\n", offsetof(Good, a));  // 8
  printf("Good::c offset = %zu\\n", offsetof(Good, c));  // 9
}`}</Code>

          <SubHeading>經驗法則</SubHeading>
          <Callout>
            把較大的欄位放前面，較小的放後面。讓編譯器需要插入的 padding 最少。
          </Callout>

          <SubHeading>
            <code>#pragma pack(1)</code> 的取捨
          </SubHeading>
          <p>
            你可以用 <code>#pragma pack(1)</code> 強制取消所有 padding：
          </p>
          <Code lang="cpp">{`#pragma pack(push, 1)
struct Packed {
  char   a;   // offset 0
  double b;   // offset 1（未對齊！）
  char   c;   // offset 9
};
#pragma pack(pop)
// sizeof(Packed) = 10`}</Code>
          <p>
            看起來省了空間，但代價不小：
          </p>
          <ul className="list-inside list-disc space-y-1 pl-2">
            <li>
              <strong>x86</strong>：未對齊存取會產生效能懲罰（可能需要兩次記憶體存取）
            </li>
            <li>
              <strong>ARM</strong>：某些 ARM 架構會直接產生 <strong>bus fault</strong>（程式 crash）
            </li>
            <li>
              網路協議、檔案格式等需要精確控制佈局時才適合使用
            </li>
          </ul>

          <SubHeading>編譯器警告</SubHeading>
          <p>
            使用 <code>-Wpadded</code> flag，編譯器會在插入 padding 時發出警告，
            幫助你發現可以優化的 struct：
          </p>
          <Code lang="bash">{`g++ -Wpadded main.cpp
# warning: padding struct 'Bad' with 7 bytes to align 'b'`}</Code>

          <QuizBox
            question="Q3：以下兩個 struct 的 sizeof 分別是多少？（假設 x86-64）"
            options={[
              "A. struct A { char x; int y; char z; };",
              "B. struct B { int y; char x; char z; };",
              "",
              "(a) A=6, B=6",
              "(b) A=12, B=8",
              "(c) A=8, B=8",
              "(d) A=12, B=12",
            ]}
            answer="(b) A=12, B=8"
            explanation="struct A：char(1) + pad(3) + int(4) + char(1) + pad(3) = 12。struct B：int(4) + char(1) + char(1) + pad(2) = 8。把 int 放前面省了 4 bytes。"
          />
        </FadeIn>

        {/* ============ Item 4 ============ */}
        <FadeIn>
          <Heading id="item4">
            Item 4 - Vtable - <code>virtual</code> function 的真實代價
          </Heading>

          <SubHeading>加一個 virtual 會怎樣？</SubHeading>
          <Code lang="cpp">{`struct NoVirtual {
  int x;
};
// sizeof(NoVirtual) = 4

struct WithVirtual {
  int x;
  virtual void foo() {}
};
// sizeof(WithVirtual) = 16`}</Code>
          <p>
            只是加了一個 <code>virtual</code>，<code>sizeof</code> 就從{" "}
            <strong>4 跳到 16</strong>。多出來的空間是：vptr（8 bytes）+ int（4 bytes）+ padding（4 bytes）= 16 bytes。
          </p>

          <SubHeading>Vtable 機制</SubHeading>
          <p>
            當 class 有 virtual function 時，編譯器會做兩件事：
          </p>
          <ul className="list-inside list-disc space-y-1 pl-2">
            <li>
              生成一張 <strong>vtable</strong>（virtual table）- 一個 function pointer 的陣列，存放在 read-only data section
            </li>
            <li>
              在每個物件開頭插入一個 <strong>vptr</strong>（8 bytes）- 指向該 class 的 vtable
            </li>
          </ul>
          <Code>{`記憶體佈局：

物件 (WithVirtual)              Vtable（.rodata section）
+------------------+           +-------------------+
| vptr (8 bytes) --|---------->| &WithVirtual::foo |
+------------------+           +-------------------+
| int x  (4 bytes) |
+------------------+
| padding (4 bytes)|
+------------------+
  sizeof = 16

繼承時：
Derived 物件                    Derived Vtable
+------------------+           +-------------------+
| vptr (8 bytes) --|---------->| &Derived::foo     |  ← override 版本
+------------------+           +-------------------+
| int x  (4 bytes) |
+------------------+
| padding (4 bytes)|
+------------------+`}</Code>

          <SubHeading>Virtual Call 的過程</SubHeading>
          <p>
            每次呼叫 virtual function，CPU 需要：
          </p>
          <Code>{`obj->foo();

1. 讀取 obj 的 vptr          → 第 1 次 memory indirection
2. 用 index 查 vtable         → 第 2 次 memory indirection
3. 呼叫 function pointer      → 實際跳轉

相比之下，non-virtual call：
obj->bar();                   → 直接跳轉到固定地址（編譯期已知）`}</Code>

          <SubHeading>真正的代價：失去 inline 機會</SubHeading>
          <p>
            兩次額外的 memory indirection 本身不算太慢。
            真正的效能殺手是：<strong>編譯器無法 inline virtual function</strong>。
          </p>
          <p>
            Non-virtual function 在編譯期就知道要呼叫哪個函數，編譯器可以把函數體直接嵌入呼叫處（inline），
            省去函數呼叫的 overhead。Virtual function 要到 runtime 才知道呼叫哪個版本，
            編譯器無法做這個優化。
          </p>
          <Callout>
            在 hot loop 中，inline 與否的差距可達 <strong>5-10 倍</strong>。
            代價不在 indirection 本身，而在失去 inline 優化的機會。
          </Callout>

          <SubHeading>
            Devirtualization：用 <code>final</code> 拿回效能
          </SubHeading>
          <Code lang="cpp">{`class Base {
public:
  virtual void process() = 0;
};

class Impl final : public Base {  // ← final：不會再被繼承
public:
  void process() override { /* ... */ }
};

void hot_loop(Impl& impl) {
  for (int i = 0; i < 1000000; ++i) {
    impl.process();  // 編譯器知道 Impl 是 final → 可以 devirtualize → 可以 inline
  }
}`}</Code>
          <p>
            <code>final</code> 告訴編譯器「這個 class 不會再被繼承」，
            所以 virtual call 可以被還原為 direct call，重新獲得 inline 的機會。
            LTO（Link-Time Optimization）也能在某些情況下做到類似效果。
          </p>

          <SubHeading>CRTP：靜態多型的替代方案</SubHeading>
          <Code lang="cpp">{`// Curiously Recurring Template Pattern
template <typename Derived>
class Base {
public:
  void interface() {
    static_cast<Derived*>(this)->implementation();  // 編譯期決定呼叫哪個版本
  }
};

class Impl : public Base<Impl> {
public:
  void implementation() { /* ... */ }  // 不需要 virtual，可以 inline
};`}</Code>
          <p>
            CRTP 讓你在不使用 <code>virtual</code> 的情況下實現多型行為。
            所有 dispatch 在編譯期完成，零 runtime 成本。
            缺點是語法較複雜，且無法做到 runtime 多型（例如異質容器）。
          </p>

          <Callout>
            <code>std::function</code> 內部也使用類似 vtable 的{" "}
            <strong>type erasure</strong> 機制，有類似的 overhead。
            如果只在編譯期知道 callable 的 type，用 template 參數代替 <code>std::function</code>。
          </Callout>

          <QuizBox
            question="Q4：以下兩個 struct 的 sizeof 分別是多少？（x86-64）"
            options={[
              "A. struct Plain { int x; };",
              "B. struct Virtual { int x; virtual void foo() {} };",
              "",
              "(a) 4, 8",
              "(b) 4, 12",
              "(c) 4, 16",
              "(d) 8, 16",
            ]}
            answer="(c) 4, 16"
            explanation="Plain 只有 int，sizeof = 4。Virtual 加了 virtual → 編譯器插入 vptr（8 bytes），加上 int（4 bytes）+ padding（4 bytes），sizeof = 16。"
          />
        </FadeIn>

        {/* ============ Item 5 ============ */}
        <FadeIn>
          <Heading id="item5">
            Item 5 - Smart Pointer 的隱藏成本
          </Heading>

          <SubHeading>
            <code>unique_ptr</code>：真正的零成本抽象
          </SubHeading>
          <p>
            <code>std::unique_ptr</code> 是 C++ 中少見的「名副其實」的零成本抽象：
          </p>
          <Code lang="cpp">{`#include <memory>

printf("sizeof(int*)              = %zu\\n", sizeof(int*));               // 8
printf("sizeof(unique_ptr<int>)   = %zu\\n", sizeof(std::unique_ptr<int>)); // 8
printf("sizeof(shared_ptr<int>)   = %zu\\n", sizeof(std::shared_ptr<int>)); // 16`}</Code>
          <p>
            <code>unique_ptr</code> 的 <code>sizeof</code> 跟 raw pointer 完全一樣 - 8 bytes。
            沒有 control block，沒有 reference counting，編譯器可以把它優化到跟 raw pointer 一模一樣的機器碼。
          </p>
          <Code>{`unique_ptr<Widget> 的記憶體佈局：

+-----------------+
| raw pointer (8B)|          ← 就只有一個指標，沒有任何額外開銷
+-----------------+
  sizeof = 8`}</Code>

          <SubHeading>
            <code>shared_ptr</code>：隱藏的 Control Block
          </SubHeading>
          <p>
            <code>shared_ptr</code> 就不同了。每個 <code>shared_ptr</code>{" "}
            佔 16 bytes（兩個指標），而且背後還有一個隱藏的 control block：
          </p>
          <Code>{`shared_ptr<Widget> 的記憶體佈局：

shared_ptr 物件本身 (16B)         Control Block（heap 上）
+--------------------+           +-------------------+
| ptr to Widget (8B) |           | strong_count (4B) |  ← atomic
+--------------------+           | weak_count   (4B) |  ← atomic
| ptr to control (8B)|---------→| deleter           |
+--------------------+           | allocator         |
  sizeof = 16                    +-------------------+
                                        |
                                        v
                                 +-------------------+
                                 | Widget 物件本身    |
                                 +-------------------+`}</Code>
          <p>
            每次 copy 一個 <code>shared_ptr</code>，都要對 <code>strong_count</code>{" "}
            做 <strong>atomic increment</strong>；每次 destroy 都要做{" "}
            <strong>atomic decrement</strong>。
          </p>

          <SubHeading>為什麼 atomic 很慢？</SubHeading>
          <p>
            Atomic 操作不是普通的加減法。在 x86 上，<code>atomic increment</code>{" "}
            會生成 <code>LOCK ADD</code> 指令，這條指令做了這些事：
          </p>
          <ul className="list-inside list-disc space-y-1 pl-2">
            <li>鎖住 cache line（其他 core 不能同時存取）</li>
            <li>執行 cache coherence protocol（通知所有 core）</li>
            <li>加上 memory barrier（防止指令重排）</li>
          </ul>
          <Code>{`效能比較：

普通 increment:     ~1 cycle
Atomic (no contention): ~10-20 cycles       ← 2-10x 慢
Atomic (contention):    ~100-1000+ cycles   ← 100x+ 慢

Single-threaded 場景下，atomic 仍然有 2-10x 的 overhead，
因為 LOCK 指令本身就有固定成本。`}</Code>

          <SubHeading>避免不必要的 atomic：傳 const reference</SubHeading>
          <Code lang="cpp">{`// ❌ 每次呼叫都 copy shared_ptr → atomic inc/dec
void process(std::shared_ptr<Widget> w) {
  w->doSomething();
}

// ✅ 傳 const reference → 零 atomic 操作
void process(const std::shared_ptr<Widget>& w) {
  w->doSomething();
}`}</Code>
          <Callout>
            如果函數不需要延長物件的生命週期（不需要保存一份 shared_ptr），
            就傳 <code>const reference</code>，避免無謂的 atomic 操作。
          </Callout>

          <SubHeading>
            <code>make_shared</code> vs <code>shared_ptr(new T)</code>
          </SubHeading>
          <Code lang="cpp">{`// ❌ 兩次 heap allocation
auto p = std::shared_ptr<Widget>(new Widget());

// ✅ 一次 heap allocation
auto p = std::make_shared<Widget>();`}</Code>
          <Code>{`shared_ptr(new T) - 兩次 allocation：

Heap allocation 1:          Heap allocation 2:
+-------------------+       +-------------------+
| Widget 物件        |       | Control Block     |
+-------------------+       +-------------------+

make_shared<T>() - 一次 allocation：

Heap allocation 1（連續記憶體）:
+-------------------+-------------------+
| Control Block     | Widget 物件        |
+-------------------+-------------------+

好處：
1. 少一次 heap allocation（heap allocation 很貴，通常 50-100ns）
2. 更好的 cache locality（control block 和物件相鄰）
3. 異常安全（C++17 前 shared_ptr(new T) 可能 leak）`}</Code>

          <SubHeading>決策樹</SubHeading>
          <div className="my-4 rounded-lg border border-border bg-surface/40 p-4">
            <Code>{`需要共享所有權嗎？
│
├── 是 → shared_ptr（搭配 make_shared）
│         └── 傳遞時盡量用 const reference
│
└── 否 → unique_ptr ✅
          └── 零成本，跟 raw pointer 一樣快`}</Code>
          </div>

          <QuizBox
            question="Q5：以下關於 smart pointer 的敘述，哪一個是「錯誤」的？"
            options={[
              "A. unique_ptr 的 sizeof 跟 raw pointer 一樣",
              "B. shared_ptr 的 reference count 使用 atomic 操作",
              "C. make_shared 比 shared_ptr(new T) 多做一次 heap allocation",
              "D. 傳 const shared_ptr& 可以避免 atomic increment",
            ]}
            answer="(C) 是錯誤的"
            explanation="正好相反：make_shared 把 control block 和物件合併在一次 allocation 中，比 shared_ptr(new T) 少一次 heap allocation。"
          />
        </FadeIn>

        {/* ============ Bonus Quiz ============ */}
        <FadeIn>
          <Heading id="bonus">Bonus - 綜合題</Heading>

          <QuizBox
            question="以下 Config struct 有三個效能問題，你能全部找出來嗎？"
            options={[
              "struct Config {",
              "  char flag;",
              "  double weight;",
              "  char mode;",
              "  virtual void validate() {}",
              "  std::shared_ptr<Logger> logger;",
              "};",
              "",
              "void init(std::shared_ptr<Logger> logger) {",
              "  // ...",
              "}",
            ]}
            answer="三個問題："
            explanation={
              "1. Struct Padding：char, double, char 的排列浪費大量 padding。應該把 double 放前面：double weight; char flag; char mode;\n" +
              "2. Vtable：virtual validate() 讓每個 Config 物件多了 8 bytes 的 vptr。如果不需要多型，移除 virtual；如果需要，考慮 CRTP 或 final。\n" +
              "3. Smart Pointer：init() 以 value 傳入 shared_ptr<Logger>，每次呼叫都做 atomic inc/dec。應改為 const std::shared_ptr<Logger>& logger。"
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
                    主題
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-text">
                    關鍵要點
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-text">
                    行動建議
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  [
                    "Struct Padding",
                    "欄位排列影響 sizeof",
                    "大的放前面，用 -Wpadded 檢查",
                  ],
                  [
                    "Vtable",
                    "virtual 代價在於失去 inline",
                    "用 final、CRTP 或移除不必要的 virtual",
                  ],
                  [
                    "Smart Pointer",
                    "shared_ptr 的 atomic 有隱藏成本",
                    "優先 unique_ptr，傳 const ref，用 make_shared",
                  ],
                ].map(([topic, point, action], i) => (
                  <tr
                    key={i}
                    className={i < 2 ? "border-b border-border" : ""}
                  >
                    <td className="px-4 py-2">
                      <code>{topic}</code>
                    </td>
                    <td className="px-4 py-2">{point}</td>
                    <td className="px-4 py-2 font-bold text-primary">
                      {action}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 rounded-xl border border-primary/30 bg-primary/5 p-6 text-center">
            <p className="text-lg font-bold text-text">核心觀念</p>
            <p className="mt-2 text-base">
              理解記憶體佈局與object model，才能寫出{" "}
              <strong className="text-primary">
                對 CPU 友善的高效 C++ 程式。
              </strong>
            </p>
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              href="/blog/cpp-secret-optimizations-1"
              className="inline-flex items-center gap-1 rounded-lg border border-border px-4 py-2 text-sm text-text-muted transition-colors hover:border-primary hover:text-primary"
            >
              &larr; 上篇：SSO 與 Copy Elision
            </Link>
          </div>
        </FadeIn>
      </div>
    </article>
  );
}
