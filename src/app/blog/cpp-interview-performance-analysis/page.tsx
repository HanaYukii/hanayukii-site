import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import Code from "@/components/CodeBlock";

export const metadata: Metadata = {
  title: "我在 Crypto/HFT 公司的 C++ 效能面試 | 花雪 HanaYukii",
  description:
    "這場 Crypto / HFT C++ 面試幾乎不問 LeetCode，六題都在問 copy、move、allocation 和資料結構取捨。",
  openGraph: {
    title: "我在 Crypto/HFT 公司的 C++ 效能面試",
    description:
      "這場 Crypto / HFT C++ 面試幾乎不問 LeetCode，六題都在問 copy、move、allocation 和資料結構取捨。",
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


function VerdictBox({
  verdict,
  children,
}: {
  verdict: "fastest" | "good" | "bad" | "dangerous";
  children: React.ReactNode;
}) {
  const styles = {
    fastest: "border-primary/30 bg-primary/5",
    good: "border-sky/30 bg-sky/5",
    bad: "border-warm/30 bg-warm/5",
    dangerous: "border-accent/30 bg-accent/5",
  };
  const labels = {
    fastest: "Fastest",
    good: "OK",
    bad: "Slower",
    dangerous: "Dangerous",
  };
  const labelColors = {
    fastest: "text-primary",
    good: "text-sky",
    bad: "text-warm",
    dangerous: "text-accent",
  };
  return (
    <div className={`my-3 rounded-lg border p-4 ${styles[verdict]}`}>
      <span className={`text-xs font-bold uppercase ${labelColors[verdict]}`}>
        {labels[verdict]}
      </span>
      <div className="mt-1 text-sm text-text-muted">{children}</div>
    </div>
  );
}

export default function CppInterviewPerformanceAnalysis() {
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
          <span className="rounded-full bg-warm/10 px-2.5 py-0.5 text-xs font-medium text-warm">
            Interview
          </span>
        </div>

        <h1 className="mb-2 text-3xl font-extrabold leading-tight sm:text-4xl">
          我在 Crypto/HFT 公司的 C++ 效能面試
        </h1>
        <p className="mb-2 text-sm text-text-muted">2026-03-31</p>
        <p className="mb-8 text-text-muted">
          這場面試最有意思的地方，是它幾乎不問演算法，
          而是一直追問每一種寫法背後到底會發生幾次 copy、move、allocation。
          題目經過改寫，分析是我事後整理的。
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        {/* TOC */}
        <nav className="mb-12 rounded-lg border border-border bg-surface p-6">
          <h2 className="mb-4 text-lg font-bold">這場面試怎麼出題</h2>
          <ol className="space-y-2 text-sm">
            <li>
              <a href="#q1" className="text-text-muted hover:text-primary transition-colors">
                第一題：建構子參數怎麼接
              </a>
            </li>
            <li>
              <a href="#q2" className="text-text-muted hover:text-primary transition-colors">
                第二題：Lambda 捕獲模式
              </a>
            </li>
            <li>
              <a href="#q3" className="text-text-muted hover:text-primary transition-colors">
                第三題：Class 裡的 Lambda
              </a>
            </li>
            <li>
              <a href="#q4" className="text-text-muted hover:text-primary transition-colors">
                第四題：Pointer 參數 vs Value 參數
              </a>
            </li>
            <li>
              <a href="#q5" className="text-text-muted hover:text-primary transition-colors">
                第五題：SSO 底層實作
              </a>
            </li>
            <li>
              <a href="#q6" className="text-text-muted hover:text-primary transition-colors">
                第六題：Order Book 設計
              </a>
            </li>
          </ol>
        </nav>
      </FadeIn>

      {/* ======================== Q1 ======================== */}
      <FadeIn delay={0.15}>
        <Heading id="q1">第一題：建構子參數怎麼接</Heading>
        <p className="mb-4 text-text-muted">
          有一個 struct，成員是 <code className="text-primary">std::string</code>，建構子需要把外部傳入的字串存下來。
          比較以下三種寫法的效能差異：
        </p>

        <Code lang="cpp">{`// 寫法 A：pass by value + move
struct Widget {
    std::string name;
    Widget(std::string n) : name{std::move(n)} {}
};

// 寫法 B：pass by string_view
struct Widget {
    std::string name;
    Widget(std::string_view n) : name{n} {}
};

// 寫法 C：pass by const reference
struct Widget {
    std::string name;
    Widget(const std::string& n) : name{n} {}
};`}</Code>

        <SubHeading>分析</SubHeading>

        <p className="mb-3 text-text-muted">
          三種寫法各有不同的 copy / move 成本，且會因 caller 傳的是 lvalue 還是 rvalue 而改變：
        </p>

        <div className="my-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="pb-2 pr-4 font-medium text-text">傳入</th>
                <th className="pb-2 pr-4 font-medium text-text">A: value + move</th>
                <th className="pb-2 pr-4 font-medium text-text">B: string_view</th>
                <th className="pb-2 font-medium text-text">C: const ref</th>
              </tr>
            </thead>
            <tbody className="text-text-muted">
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-medium">lvalue string</td>
                <td className="py-2 pr-4">1 copy + 1 move</td>
                <td className="py-2 pr-4">1 copy</td>
                <td className="py-2">1 copy</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-medium">rvalue string</td>
                <td className="py-2 pr-4">2 moves</td>
                <td className="py-2 pr-4">1 copy</td>
                <td className="py-2">1 copy</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-medium">string literal</td>
                <td className="py-2 pr-4">1 construct + 1 move</td>
                <td className="py-2 pr-4">1 construct</td>
                <td className="py-2">1 construct (temp) + 1 copy</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-medium">const char*</td>
                <td className="py-2 pr-4">1 construct + 1 move</td>
                <td className="py-2 pr-4">1 construct</td>
                <td className="py-2">1 construct (temp) + 1 copy</td>
              </tr>
            </tbody>
          </table>
        </div>

        <VerdictBox verdict="fastest">
          <strong>B (string_view)</strong> - 在所有情境下都只做一次 string construction（從 view 建構），沒有多餘的 move 或 copy。
          string_view 本身只是 pointer + length，建構零成本。
        </VerdictBox>

        <VerdictBox verdict="good">
          <strong>A (value + move)</strong> - rvalue 情境下接近零成本（兩次 move 幾乎免費），
          但 lvalue 情境多了一次 copy。這是 Modern C++ 常見推薦的 &ldquo;sink parameter&rdquo; 模式。
        </VerdictBox>

        <VerdictBox verdict="bad">
          <strong>C (const ref)</strong> - lvalue 時跟 B 一樣（1 copy），但 rvalue / literal 時無法利用 move，
          永遠是 copy。對 string literal 還多一次隱式 temp construction。
        </VerdictBox>

        <Callout>
          實務上如果這個 constructor 只有一個 string 參數，A 是最平衡的選擇 - 程式碼簡單且 rvalue 效能最佳。
          B 是效能最好的選擇，但 caller 必須知道傳的是 view（不能假設 ownership transfer）。
          如果 caller 幾乎都傳 lvalue（例如從 config 讀值），B 和 C 效能相同。
        </Callout>
      </FadeIn>

      {/* ======================== Q2 ======================== */}
      <FadeIn delay={0.2}>
        <Heading id="q2">第二題：Lambda 捕獲模式</Heading>
        <p className="mb-4 text-text-muted">
          以下四種 lambda 寫法，分析各自的效能與正確性：
        </p>

        <Code lang="cpp">{`void process(std::string_view msg) {
    // 寫法 0：static + capture by reference
    static const auto fn0 = [&]() {
        std::cout << msg << "\\n";
    };
    fn0();
}

void process(std::string_view msg) {
    // 寫法 1：non-static + capture by reference
    const auto fn1 = [&]() {
        std::cout << msg << "\\n";
    };
    fn1();
}

void process(std::string_view msg) {
    // 寫法 2：static constexpr + parameter
    static constexpr auto fn2 = [](std::string_view s) {
        std::cout << s << "\\n";
    };
    fn2(msg);
}

void process(std::string_view msg) {
    // 寫法 3：non-static + parameter
    const auto fn3 = [](std::string_view s) {
        std::cout << s << "\\n";
    };
    fn3(msg);
}`}</Code>

        <SubHeading>逐一拆解</SubHeading>

        <VerdictBox verdict="dangerous">
          <strong>寫法 0：static + [&amp;]</strong> - <span className="text-accent font-bold">Undefined Behavior!</span>
          <br />
          <code>static</code> 意味著 lambda 物件只初始化一次。第一次呼叫時 <code>[&amp;]</code> 捕獲的是
          第一次 <code>msg</code> 的 reference。之後每次呼叫，<code>msg</code> 的位址不同，但 lambda 仍然持有第一次的 reference
          - 這是一個 dangling reference。<strong>這是最嚴重的 bug。</strong>
        </VerdictBox>

        <VerdictBox verdict="good">
          <strong>寫法 1：non-static + [&amp;]</strong> - 安全且高效。
          <br />
          每次呼叫都重新建構 lambda（捕獲當前的 <code>msg</code>），reference 永遠有效。
          Lambda 物件在 stack 上，compiler 幾乎一定會 inline。
        </VerdictBox>

        <VerdictBox verdict="fastest">
          <strong>寫法 2：static constexpr + parameter</strong> - 最快且最安全。
          <br />
          Stateless lambda（no capture），compiler 可以當成普通 function pointer。
          <code>constexpr</code> 保證編譯期初始化，<code>static</code> 只是一個 hint（stateless lambda 沒有 state 可以 init）。
          不依賴任何外部 reference，完全沒有 lifetime 問題。
        </VerdictBox>

        <VerdictBox verdict="good">
          <strong>寫法 3：non-static + parameter</strong> - 安全，效能與寫法 2 幾乎相同。
          <br />
          也是 stateless lambda，compiler 同樣會 inline。跟寫法 2 的差異在理論上可以忽略 -
          少了 <code>static</code> 但 stateless lambda 本身就沒有初始化成本。
        </VerdictBox>

        <Callout>
          關鍵教訓：<code>static</code> + capture by reference 是一個非常隱蔽的 bug。
          面試官特別想看你能不能一眼看出寫法 0 是 UB。
          在 hot path 上，stateless lambda（寫法 2/3）是首選 - compiler 會完全 inline 成 function call。
        </Callout>
      </FadeIn>

      {/* ======================== Q3 ======================== */}
      <FadeIn delay={0.25}>
        <Heading id="q3">第三題：Class 裡的 Lambda</Heading>
        <p className="mb-4 text-text-muted">
          把 lambda 放在 class method 裡，比較 <code>[this]</code> 捕獲 vs 直接傳參數：
        </p>

        <Code lang="cpp">{`class Handler {
    std::string data;
public:
    // 寫法 0：static + [this]
    void run0() {
        static const auto fn = [this]() {
            std::cout << data << "\\n";
        };
        fn();
    }

    // 寫法 1：non-static + [this]
    void run1() {
        const auto fn = [this]() {
            std::cout << data << "\\n";
        };
        fn();
    }

    // 寫法 2：static constexpr + string_view parameter
    void run2() {
        static constexpr auto fn = [](std::string_view s) {
            std::cout << s << "\\n";
        };
        fn(data);  // string → string_view 隱式轉換
    }

    // 寫法 3：non-static + const string& parameter
    void run3() {
        const auto fn = [](const std::string& s) {
            std::cout << s << "\\n";
        };
        fn(data);
    }
};`}</Code>

        <SubHeading>分析</SubHeading>

        <VerdictBox verdict="dangerous">
          <strong>寫法 0：static + [this]</strong> - 跟 Q2 一樣的問題，更危險。
          <br />
          <code>static</code> lambda 只初始化一次，<code>this</code> pointer 被永久固定。
          如果 Handler 物件被 move、destroy、或不同 instance 呼叫 <code>run0()</code>，
          lambda 裡的 <code>this</code> 指向的是第一個 instance 的位址 - dangling pointer，UB。
          {" "}
          <br />
          編譯器實際上會把 <code>[this]</code> 展開成類似
          <code>{" struct { Handler* thiz; void operator()() { ... thiz->data ... } }"}</code>，
          而 <code>static</code> 讓這個 pointer 永遠不更新。
        </VerdictBox>

        <VerdictBox verdict="good">
          <strong>寫法 1：non-static + [this]</strong> - 安全。
          每次呼叫都重新捕獲當前的 <code>this</code>，compile 後基本等同 inline function call。
          唯一風險是如果 lambda 被存起來傳到外部（escape），<code>this</code> 可能 dangle - 但在 method 內直接呼叫沒問題。
        </VerdictBox>

        <VerdictBox verdict="fastest">
          <strong>寫法 2：static constexpr + string_view</strong> - 最快且最安全。
          Stateless lambda，不依賴任何 instance。<code>string_view</code> 傳遞只是 pointer + size，零 copy。
        </VerdictBox>

        <VerdictBox verdict="good">
          <strong>寫法 3：non-static + const string&amp;</strong> - 安全，效能接近寫法 2。
          也是 stateless lambda。<code>const string&amp;</code> 和 <code>string_view</code> 在這個場景下效能幾乎一樣，
          因為都只傳 reference / pointer，不做 copy。
        </VerdictBox>

        <Callout>
          Pattern：在 class method 裡的 lambda，<strong>能不 capture 就不 capture</strong>。
          改用 parameter 傳入需要的資料，lambda 就是 stateless 的，
          compiler 優化空間最大，也不會有 lifetime 問題。
        </Callout>
      </FadeIn>

      {/* ======================== Q4 ======================== */}
      <FadeIn delay={0.3}>
        <Heading id="q4">第四題：Pointer 參數 vs Value 參數</Heading>
        <p className="mb-4 text-text-muted">
          函式需要對兩個字串做複雜操作，比較 pointer 和 value 傳遞：
        </p>

        <Code lang="cpp">{`// 寫法 A：第二個參數用 pointer
void transform(std::string x, std::string* y) {
    // 對 x 和 *y 做複雜操作
}

// 寫法 B：兩個都 pass by value
void transform(std::string x, std::string y) {
    // 對 x 和 y 做複雜操作
}`}</Code>

        <SubHeading>差異分析</SubHeading>

        <div className="my-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="pb-2 pr-4 font-medium text-text">面向</th>
                <th className="pb-2 pr-4 font-medium text-text">A: string*</th>
                <th className="pb-2 font-medium text-text">B: string value</th>
              </tr>
            </thead>
            <tbody className="text-text-muted">
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-medium">Copy 成本</td>
                <td className="py-2 pr-4">y 不 copy（只傳 8B pointer）</td>
                <td className="py-2">y 會被 copy（可能 heap alloc）</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-medium">Null safety</td>
                <td className="py-2 pr-4">y 可能是 nullptr - 需要檢查</td>
                <td className="py-2">不可能是 null</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-medium">Aliasing</td>
                <td className="py-2 pr-4">*y 可能 alias x（同一物件）</td>
                <td className="py-2">x 和 y 獨立，不會 alias</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-medium">副作用</td>
                <td className="py-2 pr-4">可以修改 caller 的原始字串</td>
                <td className="py-2">修改不影響 caller</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-medium">Compiler 優化</td>
                <td className="py-2 pr-4">pointer aliasing 限制優化</td>
                <td className="py-2">value 獨立，optimizer 更自由</td>
              </tr>
            </tbody>
          </table>
        </div>

        <VerdictBox verdict="fastest">
          <strong>A (pointer)</strong> - 如果函式只需要讀取 y，pointer 省去了整個 copy。
          這在 HFT 場景很重要 - 一次 string copy 可能觸發 heap allocation，
          而 heap allocation 是 latency spike 的主要來源之一。
        </VerdictBox>

        <VerdictBox verdict="good">
          <strong>B (value)</strong> - 更安全、語意更清楚、compiler 可以更自由地優化。
          如果函式需要修改自己的副本，或 caller 傳的是 rvalue（move 進來零成本），B 更合理。
        </VerdictBox>

        <Callout>
          面試的重點不是選哪個 &ldquo;對&rdquo;，而是能不能完整列出差異：
          copy cost、null safety、aliasing、side effects、optimizer freedom。
          在 HFT context 下，答案傾向 pointer（或 reference） - 因為 zero-copy 至上。
        </Callout>
      </FadeIn>

      {/* ======================== Q5 ======================== */}
      <FadeIn delay={0.35}>
        <Heading id="q5">第五題：SSO 底層實作</Heading>
        <p className="mb-4 text-text-muted">
          &ldquo;std::string 底層怎麼實作 Small String Optimization?&rdquo;
        </p>

        <SubHeading>核心：union - 同一塊記憶體，兩種用途</SubHeading>

        <p className="mb-3 text-text-muted">
          std::string 物件內部有一塊固定大小的 union。當字串長度小於閾值，字元直接存在物件內部（stack / static 上）；
          超過閾值才 malloc heap 空間：
        </p>

        <Code lang="cpp">{`// 簡化版 std::string 結構（以 GCC libstdc++ 為概念）
class basic_string {
    size_t _size;

    union {
        // 短字串模式：字元直接存在 16 bytes 裡
        char _short_buf[16];       // 15 chars + \\0

        // 長字串模式：pointer + capacity
        struct {
            size_t _capacity;
            char*  _ptr;           // → heap
        } _long;
    };
    // sizeof ≈ 8 (size) + 16 (union) = 24~32（因 alignment）
};`}</Code>

        <Code lang="text">{`string 物件固定 32 bytes（64-bit, GCC）
┌────────┬────────────────────────┐
│  size  │        union           │
│  (8B)  │        (16B)           │
│        ├─ 短字串模式 ───────────┤
│        │  char buf[16]          │  ← 字元直接存這裡
│        ├─ 長字串模式 ───────────┤
│        │  capacity(8B) + ptr(8B)│  ← ptr 指向 heap
└────────┴────────────────────────┘
         ↑ 同一塊記憶體，兩種解讀方式

SSO 閾值（常見 64-bit 實作）：
  GCC libstdc++: ~15 bytes
  Clang libc++:  ~22 bytes
  MSVC:          ~15 bytes`}</Code>

        <SubHeading>SSO 的代價</SubHeading>

        <p className="mb-3 text-text-muted">
          SSO 不是免費的 - <code>sizeof(std::string)</code> 通常是 32 bytes（比 <code>sizeof(std::vector)</code> 的 24 bytes 大），
          因為 union 要容納 inline buffer。這是用「更大的物件」換「更少的 heap allocation」。
        </p>

        <Callout>
          這題是前面 Q1 的延伸 - 如果你知道 SSO，就能更精確地分析 string 傳遞的成本：
          短字串（≤ 15 bytes）的 copy 不走 heap，成本就是 memcpy 32 bytes（stack 上），
          遠比長字串的 malloc + memcpy 便宜。
        </Callout>
      </FadeIn>

      {/* ======================== Q6 ======================== */}
      <FadeIn delay={0.4}>
        <Heading id="q6">第六題：Order Book 資料結構設計</Heading>
        <p className="mb-4 text-text-muted">
          最後一題是系統設計。需求是實作一個 Order Book（訂單簿），支援高精度價格和兩種更新模式。
        </p>

        <SubHeading>需求</SubHeading>

        <Code lang="text">{`Order Book 結構：
price      quantity
130.000    1          ← 最高 bid
119.000    1
118.000    1
...
111.000    99
110.000    100        ← best bid
------------------------------
109.000    99         ← best ask
108.000    94
...
90.000     3          ← 最低 ask

限制條件：
  - price precision: 18 位小數
  - minimum tick size: 已知（如 0.5）
  - 兩種更新模式：
    Case 1: Snapshot - 一次收到完整 N 層報價，全部覆蓋
    Case 2: Delta    - 只收到有變動的 level
      bid: [ { price: 111, qty: 0 }, { price: 111.5, qty: 60 } ]
      ask: [ { price: 90, qty: 0 }, { price: 108, qty: 100 } ]
      （qty = 0 代表移除該 level）`}</Code>

        <SubHeading>為什麼不能用 double 當 key</SubHeading>

        <p className="mb-3 text-text-muted">
          面試中 interviewer 直接給了 <code>{"std::map<double, double> bid, ask"}</code> 的暗示，
          這正好是要你挑戰的：
        </p>

        <Code lang="cpp">{`// Bad: floating point 比較不精確
std::map<double, double> bid;  // ✗

// 0.1 + 0.2 == 0.3 是 false - 這在 order book 裡是致命的
// 兩個 "相同" 價格可能被當成不同 key`}</Code>

        <p className="mb-3 text-text-muted">
          Precision 18 意味著價格需要精確到 18 位小數。浮點數只有 ~15-16 位有效數字。
          正確做法是轉成整數：
        </p>

        <Code lang="cpp">{`// Good: 把價格轉成整數 tick
// 如果 min tick = 0.5, precision = 18
// price 111.5 → tick_index = 111.5 / 0.5 = 223
// 或直接用 fixed-point integer: price * 10^18

using Price = int64_t;  // fixed-point, 或 tick index
using Qty = int64_t;

// bid 要快速找最大 → 降序
std::map<Price, Qty, std::greater<Price>> bid;
// ask 要快速找最小 → 升序（預設）
std::map<Price, Qty> ask;`}</Code>

        <SubHeading>兩種更新模式的實作</SubHeading>

        <Code lang="cpp">{`// Case 1: Snapshot - 全量更新
void applySnapshot(
    std::map<Price, Qty, std::greater<Price>>& bid,
    const std::vector<std::pair<Price, Qty>>& levels
) {
    bid.clear();
    for (const auto& [px, qty] : levels) {
        if (qty > 0) bid[px] = qty;
    }
}

// Case 2: Delta - 增量更新
void applyDelta(
    std::map<Price, Qty, std::greater<Price>>& bid,
    const std::vector<std::pair<Price, Qty>>& deltas
) {
    for (const auto& [px, qty] : deltas) {
        if (qty == 0) {
            bid.erase(px);    // qty=0 代表移除
        } else {
            bid[px] = qty;    // 新增或更新
        }
    }
}`}</Code>

        <SubHeading>進階考量</SubHeading>

        <div className="my-4 space-y-3 text-sm text-text-muted">
          <div className="rounded-lg border border-border bg-surface p-4">
            <p className="font-medium text-text mb-1">std::map vs 其他選擇</p>
            <p>
              <code>std::map</code>（紅黑樹）O(log n) 查找/插入/刪除，cache locality 差。
              如果 level 數量固定（如 top 20），sorted array + binary search 可能更快（cache friendly）。
              如果需要極致效能，可用 flat sorted vector 或 B-tree variant。
            </p>
          </div>
          <div className="rounded-lg border border-border bg-surface p-4">
            <p className="font-medium text-text mb-1">Sequence number / 防亂序</p>
            <p>
              實際系統中 delta 可能亂序到達。需要 sequence number 來偵測 gap，
              遇到 gap 時 fallback 到 snapshot 重建。
            </p>
          </div>
          <div className="rounded-lg border border-border bg-surface p-4">
            <p className="font-medium text-text mb-1">Lock-free 設計</p>
            <p>
              HFT 場景中 order book 更新在 hot path 上。常見做法是 single-writer（market data thread 獨佔更新），
              reader 用 seqlock 或 RCU 做 lock-free read。
            </p>
          </div>
        </div>

        <Callout>
          這題的核心考點：(1) 不用 double 當 key - fixed-point 或 tick index；
          (2) snapshot vs delta 兩種模式的 trade-off；
          (3) 對 HFT 場景的 latency-aware 思維。
        </Callout>
      </FadeIn>

      {/* ======================== Summary ======================== */}
      <FadeIn delay={0.45}>
        <Heading id="summary">這場面試到底在篩什麼</Heading>

        <div className="space-y-4">
          <p>
            表面上是六題 C++ 小題，實際上它在看三件事：
            你能不能把抽象語法還原成 copy、move、allocation 的真實成本；
            你能不能分清楚 correctness 和 performance 的 trade-off；
            還有遇到系統題時，有沒有 latency-aware 的直覺。
          </p>
          <ul className="list-inside list-disc space-y-2 text-sm text-text-muted">
            <li>不是背語法，而是要把每一種寫法拆成成本模型。</li>
            <li>不是只追最快，而是要知道什麼情境下哪種寫法比較合理。</li>
            <li>到了 Order Book 這種題目，已經是在看你有沒有系統感。</li>
          </ul>
        </div>

        <div className="my-8 rounded-lg border border-primary/20 bg-primary/5 p-6">
          <p className="font-bold text-text mb-2">我自己的收穫</p>
          <p className="text-sm text-text-muted mb-2">
            Crypto / HFT 的 C++ 面試跟一般 backend 面試真的差很多，不考 LeetCode，
            而是一直問「這樣寫到底會多幾次 copy / move / allocation」。
          </p>
          <p className="text-sm text-text-muted">
            我自己主要背景還是競賽和演算法，low-level 和 modern C++ 還有不少地方要補。
            這次面試最大的提醒是：move semantics、lambda capture、memory layout 這些在 HFT 場景不是細節，是基本功。
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2 text-xs">
          {["C++", "Performance", "Interview", "HFT", "Move Semantics", "Lambda", "Order Book"].map((tag) => (
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
