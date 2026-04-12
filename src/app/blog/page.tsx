import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export default function Blog() {
  const posts = [
    {
      title: "LeetCode Weekly Contest 497 Q4 Good Subsequence Queries",
      date: "2026-04-12",
      summary:
        "Segment Tree 維護 GCD，分 case 討論。值域限制讓拿掉誰 GCD 都不為 1 只在很小的 n 才可能。",
      tags: ["Competitive Programming", "Number Theory"],
      tagStyle: "bg-accent/10 text-accent",
      href: "/blog/lc-wc497-q4",
    },
    {
      title: "CF2217F Interval Game",
      date: "2026-04-08",
      summary:
        "Nim + XOR 加法恆等式 + Digit DP。把區間博弈轉成 Nim，再用代數轉換拆解 counting。",
      tags: ["Competitive Programming", "Game Theory"],
      tagStyle: "bg-accent/10 text-accent",
      href: "/blog/cf2217f",
    },
    {
      title: "2025 偶像現場全紀錄",
      date: "2026-04-08",
      summary:
        "意外回歸星塵的一年，感謝各種現場的相遇與告別。從桃草到蝦中、從虎魚組到高嶺のなでしこ，2025 年的偶像現場紀錄。",
      tags: ["Life", "Idol"],
      tagStyle: "bg-warm/10 text-warm",
      href: "/blog/idol-2025",
    },
    {
      title: "從 Midnight 看隱私鏈技術",
      date: "2026-04-06",
      summary:
        "從零開始理解隱私鏈的核心技術：ZK-SNARKs、雙狀態架構、可程式化隱私，以 Midnight Network (NIGHT) 為例拆解。",
      tags: ["Web3", "Privacy"],
      tagStyle: "bg-primary/10 text-primary",
      href: "/blog/privacy-chain-midnight",
    },
    {
      title: "離開 Google 半年後的轉職紀錄",
      date: "2026-04-06",
      summary:
        "在 Google Cloud 待了三年，我最後選擇裸辭。不是因為壓力太大，而是因為太輕鬆。",
      tags: ["Career", "Personal"],
      tagStyle: "bg-warm/10 text-warm",
      href: "/blog/leaving-google",
    },
    {
      title: "搞懂 Dependency Injection",
      date: "2026-04-06",
      summary:
        "我想把這個很常被講得很玄的主題講清楚，所以直接用例子拆到夠細。",
      tags: ["Design Pattern", "Software Engineering"],
      tagStyle: "bg-primary/10 text-primary",
      href: "/blog/dependency-injection",
    },
    {
      title: "C++ 編譯期可以做的五件事",
      date: "2026-03-31",
      summary:
        "從 constexpr 到 LUT 生成 - 五個實用的編譯期技巧，把能在編譯期做的事移到編譯期。",
      tags: ["C++", "Performance"],
      tagStyle: "bg-sky/10 text-sky",
      href: "/blog/cpp-compile-time-optimization",
    },
    {
      title: "SSO 跟 Copy Elision：C++ 背後在偷做什麼",
      date: "2026-03-31",
      summary:
        "std::string 不一定用 heap？return 時加 std::move 反而更慢？拆解編譯器與標準庫在背後做的事。",
      tags: ["C++", "Performance", "Memory"],
      tagStyle: "bg-sky/10 text-sky",
      href: "/blog/cpp-secret-optimizations-1",
    },
    {
      title: "Padding、Vtable、Smart Pointer：C++ 的隱藏成本",
      date: "2026-03-31",
      summary:
        "sizeof 不是你想的那樣、virtual 讓物件膨脹 4 倍、shared_ptr 的隱藏原子操作代價。",
      tags: ["C++", "Performance", "Memory"],
      tagStyle: "bg-sky/10 text-sky",
      href: "/blog/cpp-secret-optimizations-2",
    },
    {
      title: "手寫 inplace_vector：一場硬核 C++ 面試",
      date: "2026-03-31",
      summary:
        "世界頂級量化交易公司的面試，面試官劍橋畢業，從零實作 inplace_vector：aligned storage、placement new、Rule of Five。",
      tags: ["C++", "C++26", "Interview"],
      tagStyle: "bg-accent/10 text-accent",
      href: "/blog/cpp-inplace-vector",
    },
    {
      title: "HFT 面試的六道 C++ 效能題",
      date: "2026-03-31",
      summary:
        "我親身參與的某知名 Crypto / HFT 公司 C++ 面試，涵蓋 string 傳遞、lambda 捕獲、Order Book 設計等六道效能分析題。",
      tags: ["C++", "Interview", "HFT"],
      tagStyle: "bg-warm/10 text-warm",
      href: "/blog/cpp-interview-performance-analysis",
    },
    {
      title: "區塊鏈日報 RESET 活動心得",
      date: "2026-04-12",
      summary:
        "去年我是粉絲，今年我換了角度。一場心理成長活動背後的包裝、銷售設計，以及我自己的反思。",
      tags: ["Life", "觀察"],
      tagStyle: "bg-warm/10 text-warm",
      href: "/blog/reset-influence-analysis",
    },
    {
      title: "系統設計面試的經典注意事項",
      date: "2026-04-11",
      summary:
        "以 Auto-complete 為案例，整理系統設計面試中常見的思路：需求分析、狀態設計、Debounce、快取策略、Accessibility。",
      tags: ["System Design", "Interview"],
      tagStyle: "bg-primary/10 text-primary",
      href: "/blog/system-design-fundamentals",
    },
    {
      title: "ICPC 要怎麼練比較有用",
      date: "Draft",
      summary:
        "Still writing. Mostly the kind of training advice I wish I had heard earlier.",
      tags: ["Competitive Programming", "ICPC"],
      tagStyle: "bg-accent/10 text-accent",
      href: null,
    },
    {
      title: "JAM Protocol 到底在幹嘛",
      date: "Draft",
      summary:
        "Still writing. This one will probably end up being a gentle intro to JAM from an implementer&apos;s point of view.",
      tags: ["Web3", "Polkadot"],
      tagStyle: "bg-warm/10 text-warm",
      href: null,
    },
  ];

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <FadeIn>
        <h1 className="mb-2 text-4xl font-extrabold tracking-tight">Blog</h1>
        <p className="mb-10 text-text-muted">
          Mostly technical writing, with a few career posts and other things I
          ended up caring enough to write down.
        </p>
      </FadeIn>

      <div className="space-y-4">
        {posts.map((post, i) => {
          const content = (
            <>
              <div className="mb-3 flex gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${post.tagStyle}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="mb-2 text-xl font-bold">{post.title}</h2>
              <p className="mb-2 text-sm leading-relaxed text-text-muted">
                {post.summary}
              </p>
              <p className="text-xs text-text-muted">{post.date}</p>
            </>
          );

          return (
            <FadeIn key={post.title} delay={i * 0.1}>
              {post.href ? (
                <Link href={post.href}>
                  <article className="rounded-xl border border-border bg-surface/40 p-6 backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-surface-hover">
                    {content}
                  </article>
                </Link>
              ) : (
                <article className="rounded-xl border border-border bg-surface/40 p-6 backdrop-blur-sm opacity-70">
                  {content}
                </article>
              )}
            </FadeIn>
          );
        })}
      </div>
    </div>
  );
}
