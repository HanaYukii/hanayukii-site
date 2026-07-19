import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import Code from "@/components/CodeBlock";
import { articleMetadata } from "@/lib/seo";
import PostJsonLd from "@/components/PostJsonLd";
import RelatedPosts from "@/components/RelatedPosts";

export const metadata: Metadata = articleMetadata("/blog/cpp-reflection", {
  title: "C++ 反射入門 | 花雪 HanaYukii",
  description:
    "反射就是程式檢視自己的型別與結構。C++ 一直做得很克難：執行期靠 RTTI、編譯期靠 type_traits，要列欄位得靠第三方庫，而 C++26 的 static reflection 把這件事變成語言內建。",
  openGraph: {
    title: "C++ 反射入門",
    description:
      "從 RTTI、type_traits 到 C++26 static reflection，搭配簡單例子，順便對照其他語言怎麼做。",
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

export default function CppReflection() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <PostJsonLd href="/blog/cpp-reflection" />
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
            Reflection
          </span>
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight">C++ 反射入門</h1>
        <p className="mb-8 text-text-muted">
          反射（reflection）就是程式在執行或編譯期「檢視自己」的能力——問一個值是什麼型別、
          一個 struct 有哪些欄位、一個 enum 有哪些名字。序列化、ORM、debug 印整包物件這些事，
          背後都需要它。C++ 在這塊一直做得比較克難，這篇用幾個簡單例子把現況講一遍，
          最後看一下 C++26 帶來的改變。
        </p>
      </FadeIn>

      <div className="prose-custom space-y-2 leading-relaxed text-text-muted [&_code]:rounded [&_code]:bg-surface [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_code]:text-primary [&_strong]:text-text">
        {/* 為什麼 C++ 反射很弱 */}
        <FadeIn>
          <Heading id="why">為什麼 C++ 的反射一直很弱</Heading>
          <p>
            像 Java、C#、Python 這些語言，物件在執行期都還帶著完整的型別資訊，
            所以「列出一個類別的所有欄位」是內建功能。C++ 走的是另一條路：
            編譯完之後，大部分型別資訊就被丟掉了，換來零額外開銷。
          </p>
          <p>
            代價就是 C++ 長年沒有完整反射，只有兩塊零碎的工具——
            執行期的 <strong>RTTI</strong>、編譯期的 <strong>type_traits</strong>。
            下面依序看這兩種工具、其他語言的對照，以及 C++26 的 static reflection。
          </p>
        </FadeIn>

        {/* RTTI */}
        <FadeIn>
          <Heading id="rtti">執行期：RTTI</Heading>
          <p>
            RTTI（Run-Time Type Information）讓你在執行期問「這個東西實際上是什麼型別」。
            入口是 <code>typeid</code> 跟 <code>dynamic_cast</code>：
          </p>
          <Code lang="cpp">{`#include <typeinfo>

struct Animal { virtual ~Animal() = default; };
struct Dog : Animal {};
struct Cat : Animal {};

Animal* a = new Dog;

// typeid 拿到動態（真正）型別
std::cout << typeid(*a).name();   // 例如 "3Dog"（mangled，因實作而異）

// dynamic_cast：執行期檢查能不能安全向下轉型
if (Dog* d = dynamic_cast<Dog*>(a)) {
    // 成功，a 真的是 Dog
} else {
    // 失敗會回 nullptr（指標版）
}`}</Code>
          <p>
            兩個坑先講：<code>typeid(*a)</code> 要拿到動態型別，class 必須有{" "}
            virtual function（這裡的虛擬解構子就夠了），不然 <code>typeid</code>{" "}
            只會回靜態型別。另外 <code>name()</code> 回的字串是
            「mangled」過的、不保證好讀，要還原成 <code>Dog</code> 得另外做 demangle。
          </p>
        </FadeIn>

        {/* type_traits */}
        <FadeIn>
          <Heading id="type-traits">編譯期：type_traits</Heading>
          <p>
            RTTI 是執行期的事，會有一點點成本。更常用的其實是編譯期的{" "}
            <code>&lt;type_traits&gt;</code>——它在編譯期回答型別問題，搭配{" "}
            <code>if constexpr</code> 可以針對不同型別走不同分支，而且沒被選到的分支不會被編譯：
          </p>
          <Code lang="cpp">{`#include <type_traits>

template <typename T>
void describe(T value) {
    if constexpr (std::is_integral_v<T>)
        std::println("整數：{}", value);
    else if constexpr (std::is_floating_point_v<T>)
        std::println("浮點數：{}", value);
    else if constexpr (std::is_pointer_v<T>)
        std::println("指標");
    else
        std::println("其他型別");
}

describe(42);      // 整數：42
describe(3.14);    // 浮點數：3.14
describe("hi");    // 其他型別`}</Code>
          <p>
            <code>is_integral</code>、<code>is_same</code>、<code>is_pointer</code>{" "}
            這些都是純編譯期判斷，常用在泛型程式裡決定「這個型別該怎麼處理」。
            這算是 C++ 最實用的一塊反射，雖然它只能問型別、問不到「欄位名」。
          </p>
        </FadeIn>

        {/* 列欄位 */}
        <FadeIn>
          <Heading id="fields">想列出 struct 的欄位？</Heading>
          <p>
            這才是 C++ 反射最尷尬的地方。給一個 <code>struct</code>，C++ 到 C++23
            為止都<strong>沒辦法</strong>用標準語法自動列出它的欄位名稱，只能手寫：
          </p>
          <Code lang="cpp">{`struct Point { int x, y; };

Point p{1, 2};
std::println("x={}, y={}", p.x, p.y);   // 欄位名只能自己打`}</Code>
          <p>
            想自動化（例如自動序列化成 JSON），傳統做法是靠巨集或第三方庫。
            像 Boost.PFR 就能在不改 struct 的前提下走訪欄位：
          </p>
          <Code lang="cpp">{`#include <boost/pfr.hpp>

struct Point { int x, y; };

boost::pfr::for_each_field(Point{1, 2}, [](auto& f) {
    std::print("{} ", f);   // 1 2
});`}</Code>
          <p>
            能動，但這是庫用模板硬湊出來的，拿不到欄位的「名字」（只有值），
            而且對型別有限制。這個缺口，就是 C++26 要補的。
          </p>
        </FadeIn>

        {/* 其他語言 */}
        <FadeIn>
          <Heading id="others">其他語言怎麼做</Heading>
          <p>
            對照一下就知道 C++ 為什麼克難。Python 的物件自己帶著屬性表，
            一行就列得出來：
          </p>
          <Code lang="python">{`class Point:
    def __init__(self):
        self.x, self.y = 1, 2

p = Point()
print(vars(p))           # {'x': 1, 'y': 2}
print(getattr(p, "x"))   # 1，連欄位名都能用字串動態存取`}</Code>
          <p>Java 也有內建的 Reflection API：</p>
          <Code lang="java">{`for (Field f : Point.class.getDeclaredFields()) {
    System.out.println(f.getName());   // x, y
}`}</Code>
          <p>
            差別在於這些語言把型別資訊留到執行期，所以反射是現成的；
            C++ 為了效能把資訊丟在編譯期，才一直得繞路。
          </p>
        </FadeIn>

        {/* C++26 */}
        <FadeIn>
          <Heading id="cpp26">C++26：static reflection</Heading>
          <p>
            C++26 終於把反射做進語言本身，而且是<strong>編譯期</strong>的——
            用 <code>^^</code> 取得某個型別／實體的「反射值」，再用{" "}
            <code>std::meta</code> 裡的函式去查它的成員、名字等等。
            最經典的痛點「enum 轉字串」終於不用再靠巨集：
          </p>
          <Code lang="cpp">{`// C++26（語法仍在收斂，示意用）
#include <meta>

template <typename E>
std::string enum_to_string(E value) {
    template for (constexpr auto e : std::meta::enumerators_of(^^E))
        if (value == [:e:])
            return std::string(std::meta::identifier_of(e));
    return "?";
}

enum class Color { Red, Green, Blue };
enum_to_string(Color::Green);   // "Green"`}</Code>
          <p>
            重點不是記這個語法（它還在變），而是方向：以前要靠巨集、
            Boost.PFR 硬湊的事，之後會變成標準、編譯期、零執行期成本。
            目前主流編譯器還在陸續實作，先當作「快來了」看待。
          </p>
        </FadeIn>

        {/* 現在可以怎麼用 */}
        <FadeIn>
          <Heading id="wrap">現在可以怎麼用</Heading>
          <p>
            目前 C++ 的反射還是「做得到，但很克難」。日常需求大多用{" "}
            <code>type_traits</code> 配 <code>if constexpr</code> 就能解，
            執行期要辨型別才動 RTTI；要走訪欄位先靠 Boost.PFR 之類的庫頂著。
            等 C++26 的 static reflection 普及，這些繞路大半都能收掉。
          </p>
        </FadeIn>
      </div>
      <RelatedPosts href="/blog/cpp-reflection" />
    </article>
  );
}
