import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import Code from "@/components/CodeBlock";

export const metadata: Metadata = {
  title: "C++20 的 std::format 語法整理 | 花雪 HanaYukii",
  description:
    "std::format 的格式語法速記：對齊寬度、浮點數的 precision 與 type、還有 precision 在浮點數跟字串上語義不同的坑。",
  openGraph: {
    title: "C++20 的 std::format 語法整理",
    description:
      "對齊寬度、浮點數 precision / type、以及 precision 在字串上是截斷長度的坑。",
    type: "article",
  },
};

function Heading({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <h2 id={id} className="mb-4 mt-12 scroll-mt-20 text-2xl font-bold text-warm">
      {children}
    </h2>
  );
}

export default function CppFormat() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
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
          C++20 的 std::format 語法整理
        </h1>
        <p className="mb-8 text-text-muted">
          排版字串時，比起 <code>printf</code> 的 <code>%</code> 或 iostream 的{" "}
          <code>&lt;&lt;</code>，<code>std::format</code> 的格式跟參數分離得比較清楚，
          也比較好讀。這篇先當速查筆記，整理幾個最常需要查的點：浮點數的{" "}
          precision / type，以及 precision 用在字串上會截斷的坑。
        </p>
      </FadeIn>

      <div className="prose-custom space-y-2 leading-relaxed text-text-muted [&_code]:rounded [&_code]:bg-surface [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_code]:text-primary [&_strong]:text-text">
        {/* 基本 */}
        <FadeIn>
          <Heading id="basic">基本用法</Heading>
          <p>
            <code>#include &lt;format&gt;</code>，用 <code>{`{}`}</code> 當佔位符。
            它是 type-safe 的，不用像 <code>printf</code> 那樣手動對{" "}
            <code>%d</code>、<code>%f</code>。
          </p>
          <Code lang="cpp">{`#include <format>
#include <print>   // C++23

std::string s = std::format("{} + {} = {}", 1, 2, 3);
// "1 + 2 = 3"

std::println("{} + {} = {}", 1, 2, 3);  // C++23，直接印`}</Code>
          <p>
            想重複用同一個參數，就標位置 <code>{`{0}`}</code>：
          </p>
          <Code lang="cpp">{`std::format("{0}{1}{0}", "ab", "cd");  // "abcdab"`}</Code>
        </FadeIn>

        {/* 對齊寬度符號 */}
        <FadeIn>
          <Heading id="align">對齊、寬度、符號</Heading>
          <p>
            format spec 看起來很長，但日常大多只會用到 width、precision、type 這幾個：
          </p>
          <Code lang="text">{`{:[fill][align][sign][#][0][width][.precision][type]}`}</Code>
          <p>
            <code>&lt;</code> 靠左、<code>&gt;</code> 靠右、<code>^</code> 置中：
          </p>
          <Code lang="cpp">{`std::format("{:>8}",  "hi");  // "      hi"
std::format("{:<8}",  "hi");  // "hi      "
std::format("{:^8}",  "hi");  // "   hi   "
std::format("{:*^8}", "hi");  // "***hi***"
std::format("{:08}",  42);    // "00000042"   0 + width 補零
std::format("{:+}",   42);    // "+42"         正數也加號
std::format("{: }",   42);    // " 42"         正數留空位，負數照樣 -`}</Code>
        </FadeIn>

        {/* 浮點數 precision / type — 漫畫重點 */}
        <FadeIn>
          <Heading id="float">浮點數：precision 跟 type</Heading>
          <p>
            浮點數先記兩件事就夠：<strong>precision</strong>（<code>.N</code>）
            決定精度、<strong>type</strong>（最後那個字母）決定顯示形式。
          </p>
          <Code lang="cpp">{`double pi = 3.14159265;

std::format("{:.2f}", pi);  // "3.14"       固定小數 2 位
std::format("{:.3e}", pi);  // "3.142e+00"  科學記號
std::format("{:.4g}", pi);  // "3.142"      g：自動選 f/e，緊湊顯示`}</Code>
          <p>金額、平均值、比例這類輸出，<code>{`{:.2f}`}</code> 通常就很合適：</p>
          <Code lang="cpp">{`for (double price : {12.5, 8.99, 159.0, 68.75})
    std::println("\${:>8.2f}", price);
// \$   12.50
// \$    8.99
// \$  159.00
// \$   68.75`}</Code>
        </FadeIn>

        {/* precision 語義不同 — 坑 */}
        <FadeIn>
          <Heading id="precision-trap">坑：precision 在字串上是「截斷長度」</Heading>
          <p>
            同一個 <code>.N</code>，放在浮點數跟字串上不是同一件事：
          </p>
          <ul className="my-3 list-disc space-y-1 pl-6">
            <li>
              浮點數：<strong>精度</strong>，可能是小數位或有效位數，取決於 type
            </li>
            <li>
              字串：<strong>截斷長度</strong>，最多取幾個字元
            </li>
          </ul>
          <Code lang="cpp">{`std::format("{:.3}", 3.14159);      // "3.14"           3 位有效數字
std::format("{:.3}", "formatting");  // "for"            截到 3 個字
std::format("{:.3f}", 3.14159);     // "3.142"          f 才是 3 位小數`}</Code>
          <p>
            所以 <code>{`{:.3}`}</code> 套在字串上不會報錯。
            這種 bug 特別煩：不會炸，只是輸出悄悄變短。
          </p>
        </FadeIn>

        {/* 進制 */}
        <FadeIn>
          <Heading id="int">整數：進制與前綴</Heading>
          <Code lang="cpp">{`std::format("{:b}",  42);  // "101010"
std::format("{:o}",  42);  // "52"
std::format("{:x}",  255); // "ff"
std::format("{:#x}", 255); // "0xff"   # 加上進制前綴
std::format("{:#010b}", 42); // "0b00101010"`}</Code>
        </FadeIn>

        {/* 動態寬度 / 精度 */}
        <FadeIn>
          <Heading id="dynamic">寬度、精度也能動態傳</Heading>
          <p>
            不想寫死，就用巢狀的 <code>{`{}`}</code> 把寬度或精度當參數傳進去：
          </p>
          <Code lang="cpp">{`int w = 8;
std::format("{:>{}}", x, w);    // 寬度由 w 決定

int n = 3;
std::format("{:.{}f}", pi, n);  // 小數位數由 n 決定`}</Code>
          <p>
            這招很適合用在 log / table output：欄寬固定，
            但寬度或小數位可以從 config 來。
          </p>
        </FadeIn>
      </div>
    </article>
  );
}
