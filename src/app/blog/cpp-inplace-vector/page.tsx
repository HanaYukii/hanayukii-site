import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import Code from "@/components/CodeBlock";

export const metadata: Metadata = {
  title: "面試被要求手寫 C++26 inplace_vector | 花雪 HanaYukii",
  description:
    "世界頂級量化交易公司的面試，面試官劍橋畢業，從零實作 inplace_vector：aligned storage、placement new、Rule of Five。",
  openGraph: {
    title: "面試被要求手寫 C++26 inplace_vector",
    description:
      "世界頂級量化交易公司的面試，從零實作 inplace_vector：aligned storage、placement new、Rule of Five。",
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


function KeyPoint({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="my-3 rounded-lg border border-primary/20 bg-primary/5 p-4">
      <p className="font-bold text-text text-sm mb-1">{title}</p>
      <div className="text-sm text-text-muted">{children}</div>
    </div>
  );
}

function PitfallBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-3 rounded-lg border border-accent/30 bg-accent/5 p-4">
      <span className="text-xs font-bold uppercase text-accent">Pitfall</span>
      <div className="mt-1 text-sm text-text-muted">{children}</div>
    </div>
  );
}

export default function CppInplaceVector() {
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
          <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
            Interview
          </span>
          <span className="rounded-full bg-warm/10 px-2.5 py-0.5 text-xs font-medium text-warm">
            C++26
          </span>
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            Memory
          </span>
        </div>

        <h1 className="mb-2 text-3xl font-extrabold leading-tight sm:text-4xl">
          面試被要求手寫 C++26 inplace_vector
        </h1>
        <p className="mb-2 text-sm text-text-muted">2026-03-31</p>
        <p className="mb-8 text-text-muted">
          世界頂級量化交易公司的 C++ 面試，面試官劍橋畢業，要求現場從零實作一個 <code className="text-primary">inplace_vector</code>。
          不能用 STL container，自己管理記憶體、物件生命週期、alignment。
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        {/* TOC */}
        <nav className="mb-12 rounded-lg border border-border bg-surface p-6">
          <h2 className="mb-4 text-lg font-bold">目錄</h2>
          <ol className="space-y-2 text-sm">
            <li>
              <a href="#what" className="text-text-muted hover:text-primary transition-colors">
                什麼是 inplace_vector？
              </a>
            </li>
            <li>
              <a href="#storage" className="text-text-muted hover:text-primary transition-colors">
                Step 1 - 記憶體 Layout：aligned storage
              </a>
            </li>
            <li>
              <a href="#lifecycle" className="text-text-muted hover:text-primary transition-colors">
                Step 2 - 物件生命週期：placement new & manual destroy
              </a>
            </li>
            <li>
              <a href="#core" className="text-text-muted hover:text-primary transition-colors">
                Step 3 - 核心操作：push_back / emplace_back / pop_back
              </a>
            </li>
            <li>
              <a href="#move" className="text-text-muted hover:text-primary transition-colors">
                Step 4 - Move semantics & copy
              </a>
            </li>
            <li>
              <a href="#full" className="text-text-muted hover:text-primary transition-colors">
                完整實作
              </a>
            </li>
            <li>
              <a href="#pitfalls" className="text-text-muted hover:text-primary transition-colors">
                面試常見踩坑點
              </a>
            </li>
          </ol>
        </nav>
      </FadeIn>

      {/* ======================== What ======================== */}
      <FadeIn delay={0.15}>
        <Heading id="what">什麼是 inplace_vector？</Heading>

        <p className="mb-4 text-text-muted">
          <code className="text-primary">std::inplace_vector&lt;T, N&gt;</code> 是 C++26 新增的 container，
          你可以把它想像成 <strong>固定容量的 vector</strong>：
        </p>

        <div className="my-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="pb-2 pr-4 font-medium text-text">特性</th>
                <th className="pb-2 pr-4 font-medium text-text">std::vector</th>
                <th className="pb-2 pr-4 font-medium text-text">std::array</th>
                <th className="pb-2 font-medium text-text">inplace_vector</th>
              </tr>
            </thead>
            <tbody className="text-text-muted">
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-medium">大小</td>
                <td className="py-2 pr-4">動態</td>
                <td className="py-2 pr-4">固定 N</td>
                <td className="py-2">動態，最大 N</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-medium">記憶體</td>
                <td className="py-2 pr-4">Heap</td>
                <td className="py-2 pr-4">Inline</td>
                <td className="py-2">Inline</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-medium">Heap alloc</td>
                <td className="py-2 pr-4">會</td>
                <td className="py-2 pr-4">不會</td>
                <td className="py-2">不會</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-medium">元素初始化</td>
                <td className="py-2 pr-4">push 時才建構</td>
                <td className="py-2 pr-4">全部預先建構</td>
                <td className="py-2">push 時才建構</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Code lang="text">{`inplace_vector<int, 4> 的記憶體 layout：

物件本身（全部在 stack 上）：
┌────────┬─────┬─────┬─────┬─────┐
│ size=2 │  10 │  20 │  ?  │  ?  │
│ (8B)   │ [0] │ [1] │ --- │ --- │
└────────┴─────┴─────┴─────┴─────┘
           ↑ 已建構    ↑ 未初始化的空間

對比 std::vector<int>：
┌──────────┬──────┬──────────┐
│ ptr(8B)  │ size │ capacity │ ──→ [10, 20] (heap)
└──────────┴──────┴──────────┘

重點：inplace_vector 的資料就在物件內部，不碰 heap。
在 HFT 場景中，不 malloc = 不會觸發 latency spike。`}</Code>

        <Callout>
          面試要求：從零手刻一個 inplace_vector，支援 push_back、emplace_back、pop_back、
          operator[]、size、capacity、begin/end。不能用任何 STL container。
        </Callout>
      </FadeIn>

      {/* ======================== Storage ======================== */}
      <FadeIn delay={0.2}>
        <Heading id="storage">Step 1 - 記憶體 Layout：aligned storage</Heading>

        <p className="mb-4 text-text-muted">
          第一個挑戰：如何在物件內部準備一塊「未初始化但正確對齊」的記憶體？
        </p>

        <SubHeading>為什麼不能用 T data[N]？</SubHeading>

        <Code lang="cpp">{`// ✗ 錯誤：array 會對所有 N 個元素呼叫 default constructor
template <typename T, size_t N>
struct bad_inplace_vector {
    T data[N];    // 如果 T 沒有 default constructor → 編譯失敗
    size_t sz;    // 如果 T 的 constructor 有副作用 → 行為錯誤
};`}</Code>

        <p className="mb-3 text-text-muted">
          inplace_vector 的語意是「push 的時候才建構」，所以我們需要一塊 <strong>raw memory</strong>，
          不觸發任何 constructor，等之後用 placement new 手動建構物件。
        </p>

        <SubHeading>正確做法：alignas + std::byte</SubHeading>

        <Code lang="cpp">{`template <typename T, size_t N>
class inplace_vector {
    alignas(T) std::byte storage_[sizeof(T) * N];
    size_t size_ = 0;

    // 取得第 i 個 slot 的指標
    T* ptr(size_t i) noexcept {
        return std::launder(
            reinterpret_cast<T*>(storage_ + sizeof(T) * i)
        );
    }
    const T* ptr(size_t i) const noexcept {
        return std::launder(
            reinterpret_cast<const T*>(storage_ + sizeof(T) * i)
        );
    }
};`}</Code>

        <KeyPoint title="alignas(T)">
          確保 storage_ 的起始位址滿足 T 的對齊要求。
          如果 T 是 <code>double</code>（alignof = 8），storage_ 的位址一定是 8 的倍數。
          少了這個，在某些架構上會 bus fault。
        </KeyPoint>

        <KeyPoint title="std::launder">
          C++17 引入。reinterpret_cast 後的 pointer 在嚴格 aliasing 規則下可能不合法，
          <code>std::launder</code> 告訴 compiler「這個位址上已經有一個 T 物件了，相信我」。
          面試時提到這個會加分，但不是所有 interviewer 都會要求。
        </KeyPoint>
      </FadeIn>

      {/* ======================== Lifecycle ======================== */}
      <FadeIn delay={0.25}>
        <Heading id="lifecycle">Step 2 - 物件生命週期</Heading>

        <p className="mb-4 text-text-muted">
          raw memory 上建構物件用 <strong>placement new</strong>，銷毀用 <strong>explicit destructor call</strong>。
          這是 C++ object model中最底層的操作：
        </p>

        <Code lang="cpp">{`// 在 storage_ 的第 i 個 slot 上建構物件
template <typename... Args>
void construct_at(size_t i, Args&&... args) {
    ::new (static_cast<void*>(storage_ + sizeof(T) * i))
        T(std::forward<Args>(args)...);
}

// 銷毀第 i 個 slot 上的物件（不釋放記憶體）
void destroy_at(size_t i) {
    ptr(i)->~T();
}`}</Code>

        <Code lang="text">{`placement new 做的事：

普通 new：
  1. malloc 一塊記憶體     ← operator new
  2. 在上面呼叫 constructor ← placement

placement new（跳過 step 1）：
  ::new (addr) T(args...);
  ↑ 不 allocate，直接在 addr 上呼叫 constructor

explicit destructor call：
  ptr->~T();
  ↑ 只呼叫 destructor，不 free 記憶體（記憶體是 storage_ 的一部分）`}</Code>

        <Callout>
          這組操作在 C++20 後也可以用 <code>std::construct_at</code> 和
          <code>std::destroy_at</code>（在 &lt;memory&gt; 裡）。面試時兩種寫法都可以，
          但手寫 placement new 展示你理解底層。
        </Callout>
      </FadeIn>

      {/* ======================== Core ops ======================== */}
      <FadeIn delay={0.3}>
        <Heading id="core">Step 3 - 核心操作</Heading>

        <Code lang="cpp">{`// push_back - copy version
void push_back(const T& value) {
    if (size_ >= N) throw std::bad_alloc{};
    construct_at(size_, value);
    ++size_;
}

// push_back - move version
void push_back(T&& value) {
    if (size_ >= N) throw std::bad_alloc{};
    construct_at(size_, std::move(value));
    ++size_;
}

// emplace_back - perfect forwarding
template <typename... Args>
T& emplace_back(Args&&... args) {
    if (size_ >= N) throw std::bad_alloc{};
    construct_at(size_, std::forward<Args>(args)...);
    return *ptr(size_++);
    // 注意：這裡 size_++ 要在 construct 之後，
    // 如果 constructor throw，size_ 不變 → strong exception guarantee
}

// pop_back
void pop_back() {
    assert(size_ > 0);
    --size_;
    destroy_at(size_);
}

// element access
T& operator[](size_t i) { return *ptr(i); }
const T& operator[](size_t i) const { return *ptr(i); }

// size & capacity
size_t size() const noexcept { return size_; }
static constexpr size_t capacity() noexcept { return N; }
bool empty() const noexcept { return size_ == 0; }

// iterators
T* begin() noexcept { return ptr(0); }
T* end() noexcept { return ptr(size_); }
const T* begin() const noexcept { return ptr(0); }
const T* end() const noexcept { return ptr(size_); }`}</Code>

        <PitfallBox>
          <strong>emplace_back 的 size 更新順序很重要。</strong> 如果先 <code>++size_</code> 再 construct，
          constructor throw 時 size_ 已經增加了，但物件沒有建構成功 - destructor 會試圖銷毀一個不存在的物件 = UB。
          正確順序：先 construct，成功後才 ++size_。
        </PitfallBox>

        <PitfallBox>
          <strong>capacity() 是 static constexpr。</strong> 容量在編譯期就確定了，不是 runtime 值。
          這是面試小亮點 - 展示你理解 inplace_vector 和 vector 的本質區別。
        </PitfallBox>
      </FadeIn>

      {/* ======================== Move/Copy ======================== */}
      <FadeIn delay={0.35}>
        <Heading id="move">Step 4 - Rule of Five</Heading>

        <p className="mb-4 text-text-muted">
          因為我們手動管理物件生命週期，compiler 生成的 default copy/move 是 <strong>bitwise copy storage_</strong> -
          這對 non-trivial type 是 UB。必須手寫 Rule of Five：
        </p>

        <Code lang="cpp">{`// Destructor - 銷毀所有已建構的元素
~inplace_vector() {
    clear();
}

void clear() noexcept {
    while (size_ > 0) {
        pop_back();
    }
}

// Copy constructor
inplace_vector(const inplace_vector& other) : size_(0) {
    for (size_t i = 0; i < other.size_; ++i) {
        construct_at(i, *other.ptr(i));
        ++size_;  // 逐個增加，exception safety
    }
}

// Move constructor
inplace_vector(inplace_vector&& other) noexcept(
    std::is_nothrow_move_constructible_v<T>
) : size_(0) {
    for (size_t i = 0; i < other.size_; ++i) {
        construct_at(i, std::move(*other.ptr(i)));
        ++size_;
    }
    other.clear();
}

// Copy assignment
inplace_vector& operator=(const inplace_vector& other) {
    if (this == &other) return *this;
    clear();
    for (size_t i = 0; i < other.size_; ++i) {
        construct_at(i, *other.ptr(i));
        ++size_;
    }
    return *this;
}

// Move assignment
inplace_vector& operator=(inplace_vector&& other) noexcept(
    std::is_nothrow_move_constructible_v<T>
) {
    if (this == &other) return *this;
    clear();
    for (size_t i = 0; i < other.size_; ++i) {
        construct_at(i, std::move(*other.ptr(i)));
        ++size_;
    }
    other.clear();
    return *this;
}`}</Code>

        <KeyPoint title="為什麼 move constructor 裡要逐個 ++size_？">
          如果第 3 個元素的 move constructor 丟 exception，前 2 個已經建構好的物件
          需要被正確銷毀。逐個增加 size_ 確保 destructor 只銷毀已建構的部分。
          這是 <strong>strong exception guarantee</strong>。
        </KeyPoint>

        <KeyPoint title="noexcept 條件式">
          move constructor 的 noexcept 取決於 T 的 move constructor。
          如果 T 的 move 不是 noexcept（例如某些自訂type），
          我們的 inplace_vector 的 move 也不能是 noexcept。
          這影響 <code>std::vector&lt;inplace_vector&gt;</code> 在 realloc 時會用 move 還是 copy。
        </KeyPoint>
      </FadeIn>

      {/* ======================== Full impl ======================== */}
      <FadeIn delay={0.4}>
        <Heading id="full">完整實作</Heading>

        <Code lang="cpp">{`#include <cstddef>
#include <cassert>
#include <new>
#include <type_traits>
#include <utility>
#include <memory>    // std::launder

template <typename T, size_t N>
class inplace_vector {
    alignas(T) std::byte storage_[sizeof(T) * N];
    size_t size_ = 0;

    T* ptr(size_t i) noexcept {
        return std::launder(reinterpret_cast<T*>(
            storage_ + sizeof(T) * i));
    }
    const T* ptr(size_t i) const noexcept {
        return std::launder(reinterpret_cast<const T*>(
            storage_ + sizeof(T) * i));
    }

    template <typename... Args>
    void construct_at_(size_t i, Args&&... args) {
        ::new (static_cast<void*>(storage_ + sizeof(T) * i))
            T(std::forward<Args>(args)...);
    }

    void destroy_at_(size_t i) noexcept {
        ptr(i)->~T();
    }

public:
    // --- constructors / destructor ---

    inplace_vector() = default;

    inplace_vector(const inplace_vector& other) : size_(0) {
        for (size_t i = 0; i < other.size_; ++i) {
            construct_at_(i, *other.ptr(i));
            ++size_;
        }
    }

    inplace_vector(inplace_vector&& other)
        noexcept(std::is_nothrow_move_constructible_v<T>)
        : size_(0)
    {
        for (size_t i = 0; i < other.size_; ++i) {
            construct_at_(i, std::move(*other.ptr(i)));
            ++size_;
        }
        other.clear();
    }

    ~inplace_vector() { clear(); }

    // --- assignment ---

    inplace_vector& operator=(const inplace_vector& other) {
        if (this != &other) {
            clear();
            for (size_t i = 0; i < other.size_; ++i) {
                construct_at_(i, *other.ptr(i));
                ++size_;
            }
        }
        return *this;
    }

    inplace_vector& operator=(inplace_vector&& other)
        noexcept(std::is_nothrow_move_constructible_v<T>)
    {
        if (this != &other) {
            clear();
            for (size_t i = 0; i < other.size_; ++i) {
                construct_at_(i, std::move(*other.ptr(i)));
                ++size_;
            }
            other.clear();
        }
        return *this;
    }

    // --- modifiers ---

    void push_back(const T& value) {
        if (size_ >= N) throw std::bad_alloc{};
        construct_at_(size_, value);
        ++size_;
    }

    void push_back(T&& value) {
        if (size_ >= N) throw std::bad_alloc{};
        construct_at_(size_, std::move(value));
        ++size_;
    }

    template <typename... Args>
    T& emplace_back(Args&&... args) {
        if (size_ >= N) throw std::bad_alloc{};
        construct_at_(size_, std::forward<Args>(args)...);
        return *ptr(size_++);
    }

    void pop_back() noexcept {
        assert(size_ > 0);
        --size_;
        destroy_at_(size_);
    }

    void clear() noexcept {
        while (size_ > 0) pop_back();
    }

    // --- access ---

    T& operator[](size_t i) noexcept { return *ptr(i); }
    const T& operator[](size_t i) const noexcept { return *ptr(i); }

    T& front() noexcept { return *ptr(0); }
    T& back() noexcept { return *ptr(size_ - 1); }

    // --- capacity ---

    size_t size() const noexcept { return size_; }
    static constexpr size_t capacity() noexcept { return N; }
    bool empty() const noexcept { return size_ == 0; }
    bool full() const noexcept { return size_ == N; }

    // --- iterators ---

    T* begin() noexcept { return ptr(0); }
    T* end() noexcept { return ptr(size_); }
    const T* begin() const noexcept { return ptr(0); }
    const T* end() const noexcept { return ptr(size_); }
    T* data() noexcept { return ptr(0); }
};`}</Code>

        <SubHeading>用法</SubHeading>

        <Code lang="cpp">{`#include <iostream>
#include <string>

int main() {
    inplace_vector<std::string, 4> v;

    v.push_back("hello");
    v.emplace_back("world");
    v.push_back(std::string(50, 'x'));  // 長字串，但 vector 本身不 malloc

    std::cout << "size: " << v.size() << "\\n";       // 3
    std::cout << "capacity: " << v.capacity() << "\\n"; // 4

    for (const auto& s : v) {
        std::cout << s << "\\n";
    }

    // sizeof 是固定的，不管放了幾個元素
    std::cout << "sizeof: " << sizeof(v) << "\\n";
    // = alignof(string) padding + sizeof(string) * 4 + sizeof(size_t)

    v.pop_back();  // 銷毀 "xxx..."，string 的 destructor 會 free heap
    v.clear();     // 銷毀剩餘元素
}`}</Code>

        <Callout>
          注意：inplace_vector 本身不做 heap allocation，但 <strong>T 本身可能會</strong>。
          例如 <code>inplace_vector&lt;std::string, N&gt;</code> 裡如果放長字串，
          string 的 data 仍然在 heap 上（除非走 SSO）。
          inplace_vector 保證的是「container 自身不 malloc」，不是「整體不 malloc」。
        </Callout>
      </FadeIn>

      {/* ======================== Pitfalls ======================== */}
      <FadeIn delay={0.45}>
        <Heading id="pitfalls">面試常見踩坑點</Heading>

        <PitfallBox>
          <strong>1. 忘記 alignas</strong>
          <br />
          直接用 <code>char storage_[sizeof(T) * N]</code>，
          如果 T 的 alignment 大於 1（幾乎所有type），就是 UB。
          面試官會直接問「你的 buffer 對齊了嗎？」
        </PitfallBox>

        <PitfallBox>
          <strong>2. 用 T data[N] 而不是 raw storage</strong>
          <br />
          會強制所有元素被 default construct。如果 T 沒有 default constructor 就編譯不過，
          如果有的話也違反了 inplace_vector 的語意（size = 0 時不該有任何 T 物件存在）。
        </PitfallBox>

        <PitfallBox>
          <strong>3. Destructor 裡忘記銷毀元素</strong>
          <br />
          default destructor 不會幫你呼叫每個 T 的 destructor -
          因為 compiler 看到的只是 <code>std::byte[]</code>，不知道上面有活著的 T 物件。
          <strong>記憶體洩漏 + resource leak。</strong>
        </PitfallBox>

        <PitfallBox>
          <strong>4. Copy/Move 用 memcpy</strong>
          <br />
          對 trivially copyable types（int, double）可以用 memcpy，
          但對 non-trivial types（string, unique_ptr）是 UB。
          面試時安全做法是逐個元素 copy/move construct。
          <br />
          <span className="text-xs text-text-muted mt-1 block">
            進階優化：可以用 <code>if constexpr (std::is_trivially_copyable_v&lt;T&gt;)</code>
            做 branch，trivial 用 memcpy，non-trivial 逐個 construct。
          </span>
        </PitfallBox>

        <PitfallBox>
          <strong>5. Exception safety 沒處理</strong>
          <br />
          constructor throw 時，已經建構好的元素要回滾銷毀。
          面試不一定要求你寫 try-catch，但至少要口頭提到這個問題。
        </PitfallBox>

        <PitfallBox>
          <strong>6. emplace_back 的 size 更新時機</strong>
          <br />
          先 <code>++size_</code> 再 construct：如果 constructor throw，
          destructor 會嘗試銷毀不存在的物件 → UB。
          正確順序永遠是 construct first, then update size。
        </PitfallBox>
      </FadeIn>

      {/* ======================== Summary ======================== */}
      <FadeIn delay={0.5}>
        <Heading id="summary">總結</Heading>

        <div className="my-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="pb-2 pr-4 font-medium text-text">考點</th>
                <th className="pb-2 font-medium text-text">面試官想看到</th>
              </tr>
            </thead>
            <tbody className="text-text-muted">
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-medium">Memory layout</td>
                <td className="py-2">alignas + raw byte array，不是 T[]</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-medium">Object lifetime</td>
                <td className="py-2">placement new construct, explicit dtor destroy</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-medium">Rule of Five</td>
                <td className="py-2">手寫 copy/move ctor & assignment, dtor clear</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-medium">Exception safety</td>
                <td className="py-2">construct before ++size_, destructor 只銷毀已建構的</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-medium">Move semantics</td>
                <td className="py-2">conditional noexcept, forward, move 已建構的元素</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-medium">Template</td>
                <td className="py-2">perfect forwarding (emplace_back), constexpr capacity</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="my-8 rounded-lg border border-primary/20 bg-primary/5 p-6">
          <p className="font-bold text-text mb-2">面試心得</p>
          <p className="text-sm text-text-muted mb-2">
            老實說面試當下基本上寫不出來，placement new、alignment 這些平常根本不會碰到，
            當場被問直接傻住。
          </p>
          <p className="text-sm text-text-muted">
            但也因為這次被電得很慘，後來才花時間把 inplace_vector 從頭到尾搞懂，
            整理成這篇文章。結果學到的東西比面試過了還多。
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2 text-xs">
          {["C++", "C++26", "Interview", "inplace_vector", "Placement New", "Memory", "HFT"].map((tag) => (
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
