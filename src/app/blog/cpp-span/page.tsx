import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import Code from "@/components/CodeBlock";
import { articleMetadata } from "@/lib/seo";
import PostJsonLd from "@/components/PostJsonLd";
import RelatedPosts from "@/components/RelatedPosts";

export const metadata: Metadata = articleMetadata("/blog/cpp-span", {
  title: "C++20 的 std::span 應用整理 | 花雪 HanaYukii",
  description:
    "std::span 把 vector、array、指標加長度收成同一個介面：基本用法、subspan 切片、static extent，還有 span<const T> 跟 const span<T> 不是同一回事的坑。",
  openGraph: {
    title: "C++20 的 std::span 應用整理",
    description:
      "不擁有資料的連續記憶體視圖：基本用法、切片、extent，跟幾個 dangling 的坑。",
    type: "article",
  },
});

function Heading({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <h2 id={id} className="mb-4 mt-12 scroll-mt-20 text-2xl font-bold text-warm">
      {children}
    </h2>
  );
}

export default function CppSpan() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <PostJsonLd href="/blog/cpp-span" />
      <FadeIn>
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-1 text-sm text-text-muted transition-colors hover:text-primary"
        >
          &larr; Back to Blog
        </Link>

        <div className="mb-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-sky/10 px-2.5 py-0.5 text-xs font-medium text-sky">
            C++
          </span>
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            C++20
          </span>
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight">
          C++20 的 std::span 應用整理
        </h1>
        <p className="mb-8 text-text-muted">
          寫函式常常卡一個小問題：「一段連續的資料」要用什麼型別接？
          用 <code>vector</code> 的話 C array 傳不進來，
          用指標加長度又退回 C 的寫法。<code>std::span</code>{" "}
          就是為這件事設計的：一個不擁有資料的輕量視圖。
          這篇整理基本用法、切片、extent，跟幾個容易踩的坑。
        </p>
      </FadeIn>

      <div className="prose-custom space-y-2 leading-relaxed text-text-muted [&_code]:rounded [&_code]:bg-surface [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_code]:text-primary [&_strong]:text-text">
        {/* 為什麼 */}
        <FadeIn>
          <Heading id="why">一個介面收所有連續資料</Heading>
          <p>
            以前同一份邏輯，常常得為不同容器各寫一個版本：
          </p>
          <Code lang="cpp">{`// 以前：擇一，然後另外兩種呼叫端就不開心
double avg(const std::vector<double>& v);
double avg(const double* p, std::size_t n);
template <std::size_t N> double avg(const std::array<double, N>& a);

// 現在：一個就好
double avg(std::span<const double> v);`}</Code>
          <p>
            <code>std::span&lt;T&gt;</code> 本體就只有指標加長度兩個欄位，
            指著別人的記憶體，自己不配置也不釋放。資料只要是連續的就能直接傳。
          </p>
        </FadeIn>

        {/* 基本 */}
        <FadeIn>
          <Heading id="basic">基本用法</Heading>
          <p>
            <code>#include &lt;span&gt;</code>。C array、<code>std::array</code>、
            <code>vector</code>、指標加長度，全部都能直接傳：
          </p>
          <Code lang="cpp">{`#include <span>

void print_all(std::span<const int> s) {
    for (int x : s) std::print("{} ", x);
}

int arr[]     = {1, 2, 3};
std::array a  = {4, 5, 6};
std::vector v = {7, 8, 9};

print_all(arr);                // C array
print_all(a);                  // std::array
print_all(v);                  // vector
print_all({v.data() + 1, 2});  // 指標 + 長度 → 8 9`}</Code>
          <p>
            介面長得跟容器很像，<code>size()</code>、<code>empty()</code>、
            <code>front()</code>、<code>back()</code>、<code>data()</code>、
            <code>begin()/end()</code> 該有的都有，range-based for 跟{" "}
            <code>&lt;algorithm&gt;</code> 直接用。
          </p>
        </FadeIn>

        {/* view 語意 */}
        <FadeIn>
          <Heading id="view">它是 view，不是容器</Heading>
          <p>
            span 不擁有資料，複製它就是複製一個指標跟一個長度，所以
            <strong>傳參數直接傳值就好</strong>，不用寫{" "}
            <code>const std::span&lt;T&gt;&amp;</code>。
            反過來，透過 span 改元素，改到的就是原本那塊記憶體：
          </p>
          <Code lang="cpp">{`void fill_zero(std::span<int> s) {
    for (int& x : s) x = 0;
}

std::vector v = {1, 2, 3};
fill_zero(v);   // v 變成 {0, 0, 0}`}</Code>
          <p>
            可以把它當成配好了迭代器的 <code>(T*, size_t)</code>。
          </p>
        </FadeIn>

        {/* const 坑 */}
        <FadeIn>
          <Heading id="const">坑：唯讀要寫 span&lt;const T&gt;</Heading>
          <p>
            <code>const std::span&lt;int&gt;</code> 跟{" "}
            <code>std::span&lt;const int&gt;</code> 不是同一回事，
            規則跟指標一模一樣（<code>int* const</code> vs{" "}
            <code>const int*</code>）：
          </p>
          <Code lang="cpp">{`void f(std::span<const int> s) {
    // s[0] = 1;   // 編譯錯誤：元素唯讀
}

void g(const std::span<int> s) {
    s[0] = 1;      // 可以編！const 的是 span 本身，不是元素
}`}</Code>
          <p>
            <code>const</code> 加在 span 上只是說這個 view 本身不能改指向，
            元素照樣可以寫。所以<strong>不打算改資料的介面，就寫{" "}
            <code>span&lt;const T&gt;</code></strong>，順便連{" "}
            <code>const</code> 的容器也能直接傳。
          </p>
        </FadeIn>

        {/* 切片 */}
        <FadeIn>
          <Heading id="slice">切片：first / last / subspan</Heading>
          <p>切一段出來不會複製資料，切完還是 span：</p>
          <Code lang="cpp">{`std::vector v = {0, 1, 2, 3, 4, 5};
std::span s{v};

s.first(3);       // {0, 1, 2}
s.last(2);        // {4, 5}
s.subspan(2);     // {2, 3, 4, 5}    從 index 2 到底
s.subspan(1, 3);  // {1, 2, 3}       從 index 1 取 3 個`}</Code>
          <p>
            sliding window、分段處理這種寫起來都蠻順的。
            切出來的 span 一樣指著原資料，改了就是改本體：
          </p>
          <Code lang="cpp">{`// 固定大小的視窗掃過去
for (std::size_t i = 0; i + 3 <= s.size(); ++i)
    process(s.subspan(i, 3));

// 只排序前半段，動的是 v 本人
std::ranges::sort(s.first(s.size() / 2));`}</Code>
        </FadeIn>

        {/* extent */}
        <FadeIn>
          <Heading id="extent">編譯期長度：static extent</Heading>
          <p>
            span 其實還有第二個 template 參數：<code>std::span&lt;T, N&gt;</code>。
            預設是 <code>std::dynamic_extent</code>，長度存在執行期；
            把 N 寫死之後長度就進到型別裡，適合那種「一定要剛好 N 個」的介面：
          </p>
          <Code lang="cpp">{`double dot3(std::span<const double, 3> a,
            std::span<const double, 3> b) {
    return a[0]*b[0] + a[1]*b[1] + a[2]*b[2];
}

double u[] = {1, 2, 3}, w[] = {4, 5, 6};
dot3(u, w);    // OK：C array 長度編譯期就知道

std::vector v = {1.0, 2.0, 3.0};
// dot3(v, w);                       // 編譯錯誤：vector 長度是執行期的
dot3(std::span{v}.first<3>(), w);    // 明確保證「就是 3 個」`}</Code>
          <p>
            另外，自動型別推導（CTAD）有個地方要留意：
            <code>{`std::span s{arr}`}</code> 用 C array 初始化，
            推出來是 <code>span&lt;int, 3&gt;</code>（static extent），
            用 vector 初始化才是 dynamic。static extent 少存一個長度、
            編譯器也能多做點假設，不過日常介面用 dynamic 就夠了。
          </p>
        </FadeIn>

        {/* bytes */}
        <FadeIn>
          <Heading id="bytes">as_bytes：用 byte 視角看資料</Heading>
          <p>
            做 IO、hash、序列化常常要拿一塊資料的原始 bytes，
            以前得自己 <code>reinterpret_cast</code>，現在有標準寫法：
          </p>
          <Code lang="cpp">{`std::vector<float> v = {1.5f, 2.5f};

std::span<const std::byte> raw = std::as_bytes(std::span{v});
// raw.size() == v.size() * sizeof(float)

auto writable = std::as_writable_bytes(std::span{v});  // span<std::byte>`}</Code>
        </FadeIn>

        {/* 坑 */}
        <FadeIn>
          <Heading id="traps">坑：沒有 bounds check，也沒有所有權</Heading>
          <p>
            <code>s[i]</code> 越界是未定義行為（UB），而且 C++20/23 連{" "}
            <code>at()</code> 都沒有，C++26 才補上。index 來自外部輸入的話，
            先自己檢查 <code>size()</code>。
          </p>
          <p>
            更常見的是懸空（dangling）。span 不會延長資料的生命週期，
            跟 <code>string_view</code> 是同一類問題：
          </p>
          <Code lang="cpp">{`std::span<int> bad() {
    std::vector v = {1, 2, 3};
    return v;            // v 出 scope 就死了，回傳的 span 懸空
}

std::vector v = {1, 2, 3};
std::span s{v};
v.push_back(4);          // 可能 reallocate，s 整個失效`}</Code>
          <p>
            用法上跟 <code>string_view</code> 同一套：
            <strong>當參數往下傳</strong>很安全，存成成員或回傳出去就要想清楚，
            得確定底層資料的壽命比 span 長，中途也不會 reallocate。
          </p>
        </FadeIn>

        {/* string_view */}
        <FadeIn>
          <Heading id="string-view">跟 string_view 怎麼分</Heading>
          <p>
            <code>string_view</code> 概念上就是字串特化的唯讀 span，
            多了 <code>find</code>、<code>substr</code>、
            <code>starts_with</code> 這些字串操作，但永遠唯讀。
            分法很簡單：<strong>字串用 <code>string_view</code>，
            其他連續記憶體用 <code>span</code></strong>，
            真的要原地改字元的少數場合，才會用到{" "}
            <code>span&lt;char&gt;</code>。
          </p>
        </FadeIn>
      </div>
      <RelatedPosts href="/blog/cpp-span" />
    </article>
  );
}
