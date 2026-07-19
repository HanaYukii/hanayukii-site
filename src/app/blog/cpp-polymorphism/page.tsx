import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import Code from "@/components/CodeBlock";
import { articleMetadata } from "@/lib/seo";
import PostJsonLd from "@/components/PostJsonLd";
import RelatedPosts from "@/components/RelatedPosts";

export const metadata: Metadata = articleMetadata("/blog/cpp-polymorphism", {
  title: "C++ 多型：靜態(template) vs 動態(virtual) | 花雪 HanaYukii",
  description:
    "同一個介面、不同行為，C++ 有兩條路：動態多型（virtual，執行期分派）與靜態多型（template / CRTP，編譯期分派）。以例子為主，附 concept 與選用時機。",
  openGraph: {
    title: "C++ 多型：靜態(template) vs 動態(virtual)",
    description:
      "virtual 與 template / CRTP 的對照，以例子為主，附 concept 與選用時機。",
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

export default function CppPolymorphism() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <PostJsonLd href="/blog/cpp-polymorphism" />
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
            Performance
          </span>
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight">
          C++ 多型：靜態(template) vs 動態(virtual)
        </h1>
        <p className="mb-8 text-text-muted">
          多型就是「同一個介面、不同行為」。C++ 有兩條路：
          <strong className="text-text">動態多型</strong>（<code>virtual</code>，執行期決定呼叫誰）跟{" "}
          <strong className="text-text">靜態多型</strong>（template / CRTP，編譯期就決定）。
          直接看例子（範例用到 C++23 的 <code>std::println</code>，include 多半省略）。
        </p>
      </FadeIn>

      <div className="prose-custom space-y-2 leading-relaxed text-text-muted [&_code]:rounded [&_code]:bg-surface [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_code]:text-primary [&_strong]:text-text">
        {/* 動態 */}
        <FadeIn>
          <Heading id="dynamic">動態多型：virtual</Heading>
          <Code lang="cpp">{`struct Shape {
    virtual double area() const = 0;
    virtual ~Shape() = default;
};

struct Circle : Shape {
    double r;
    Circle(double r) : r(r) {}
    double area() const override { return 3.14159 * r * r; }
};
struct Square : Shape {
    double s;
    Square(double s) : s(s) {}
    double area() const override { return s * s; }
};

void print_area(const Shape& sh) {   // 不知道具體型別
    std::println("{}", sh.area());   // 執行期經 vtable 分派
}`}</Code>
          <p>
            重點是<strong>異質容器</strong>——同一個 <code>vector</code>{" "}
            裝不同型別，執行期才決定呼叫誰：
          </p>
          <Code lang="cpp">{`std::vector<std::unique_ptr<Shape>> shapes;
shapes.push_back(std::make_unique<Circle>(2.0));
shapes.push_back(std::make_unique<Square>(3.0));
for (auto& s : shapes) print_area(*s);   // 2 種 area() 各自被叫到`}</Code>
          <p>
            代價：每次呼叫多一層 vtable 間接、難 inline，每個物件多一個 vptr。
          </p>
        </FadeIn>

        {/* 靜態 template */}
        <FadeIn>
          <Heading id="template">靜態多型：template</Heading>
          <p>沒有共同基底、沒有 <code>virtual</code>，靠 template 在編譯期綁定：</p>
          <Code lang="cpp">{`struct Circle { double r; double area() const { return 3.14159 * r * r; } };
struct Square { double s; double area() const { return s * s; } };

template <typename T>
void print_area(const T& sh) {       // 編譯期就綁定 T::area
    std::println("{}", sh.area());
}

print_area(Circle{2.0});
print_area(Square{3.0});`}</Code>
          <p>
            可 inline、零執行期分派成本。代價：每個 <code>T</code> 各生一份程式碼，
            而且型別得編譯期已知——<strong>塞不進同一個容器</strong>。
          </p>
        </FadeIn>

        {/* CRTP */}
        <FadeIn>
          <Heading id="crtp">靜態多型：CRTP</Heading>
          <p>
            想要「基底定義共通介面」又不付 <code>virtual</code> 成本，
            就讓基底吃下衍生型別當模板參數（CRTP）：
          </p>
          <Code lang="cpp">{`template <typename Derived>
struct Shape {
    double area() const {
        // 編譯期 static_cast 到真正型別，無 vtable
        return static_cast<const Derived&>(*this).area_impl();
    }
};

struct Circle : Shape<Circle> {
    double r;
    double area_impl() const { return 3.14159 * r * r; }
};

Circle c{2.0};
c.area();   // Shape<Circle>::area() → Circle::area_impl()，全程編譯期`}</Code>
          <p>
            基底叫 <code>area</code>、衍生叫 <code>area_impl</code> 是故意的——同名的話{" "}
            <code>static_cast</code> 那行會綁回衍生的 <code>area</code>，變成無限遞迴。
            常用在 header-only 的泛型基底；缺點一樣：<code>Shape&lt;Circle&gt;</code> 跟{" "}
            <code>Shape&lt;Square&gt;</code> 是不同型別，不能混在一個容器。
          </p>
        </FadeIn>

        {/* concepts */}
        <FadeIn>
          <Heading id="concepts">concept：把介面講清楚</Heading>
          <p>
            靜態多型的老問題是「型別不符時錯誤訊息很長」。C++20 的 concept
            可以先把要求寫明，錯誤就直接指到點上：
          </p>
          <Code lang="cpp">{`#include <concepts>

template <typename T>
concept HasArea = requires(const T t) {
    { t.area() } -> std::convertible_to<double>;
};

template <HasArea T>
void print_area(const T& sh) { std::println("{}", sh.area()); }

print_area(Circle{2.0});   // OK
// print_area(42);         // 編譯錯誤：int 不滿足 HasArea（訊息清楚）`}</Code>
        </FadeIn>

        {/* variant */}
        <FadeIn>
          <Heading id="variant">第三條路：std::variant + std::visit</Heading>
          <p>
            如果型別集合是<strong>封閉</strong>的（就那幾種、編譯期已知），
            還有第三條路：用 <code>std::variant</code> 裝值、<code>std::visit</code> 分派。
            能放進同一個容器，又不用繼承或指標：
          </p>
          <Code lang="cpp">{`#include <variant>

struct Circle { double r; double area() const { return 3.14159 * r * r; } };
struct Square { double s; double area() const { return s * s; } };

using Shape = std::variant<Circle, Square>;

std::vector<Shape> shapes{ Circle{2.0}, Square{3.0} };

for (const auto& sh : shapes)
    std::println("{}", std::visit([](const auto& s) { return s.area(); }, sh));`}</Code>
          <p>
            值語意、無 heap 配置；分派在編譯期決定、沒有 vtable，執行期只剩一次依{" "}
            <code>index()</code> 的跳轉。注意這裡用泛型 lambda 不會做完整性檢查——
            新增的型別只要有 <code>area()</code> 就默默通過；想要「漏一種就編譯報錯」，
            得把 visitor 寫成每個型別一個 overload。代價是集合封閉，加一種就得改{" "}
            <code>variant</code> 定義。
          </p>
        </FadeIn>

        {/* 取捨 */}
        <FadeIn>
          <Heading id="when">什麼時候用哪個</Heading>
          <ul className="my-3 list-disc space-y-2 pl-6">
            <li>
              <strong>動態（virtual）</strong>：型別執行期才知道、需要異質容器（
              <code>vector&lt;Base*&gt;</code>）、跨外掛或 ABI 邊界。
              代價是 vtable 間接 + vptr、難 inline。
            </li>
            <li>
              <strong>靜態（template / CRTP）</strong>：型別編譯期已知、效能敏感的熱路徑、
              header-only 泛型庫。代價是程式碼膨脹、編譯變慢、二進位介面不穩。
            </li>
            <li>
              <strong>封閉集合（std::variant）</strong>：型別就那幾種、編譯期已知，
              又想放進同一個容器。值語意、無 vtable，但加型別就得改定義。
            </li>
          </ul>
          <p>
            我會這樣分：<strong>開放集合用 virtual、封閉集合用 variant、熱路徑用 template</strong>。
          </p>
        </FadeIn>
      </div>
      <RelatedPosts href="/blog/cpp-polymorphism" />
    </article>
  );
}
