import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export default function Blog() {
  const posts = [
    {
      title: "2025 偶像現場全紀錄",
      date: "2025-12-18",
      summary:
        "意外回歸星塵的一年，感謝各種現場的相遇與告別。從桃草到蝦中、從虎魚組到高嶺のなでしこ，2025 年的偶像現場紀錄。",
      tags: ["Life", "Idol"],
      tagStyle: "bg-warm/10 text-warm",
      href: "/blog/idol-2025",
    },
    {
      title: "Midnight 到底在做什麼？順便聊聊隱私鏈",
      date: "2026-04-06",
      summary:
        "從零開始理解隱私鏈的核心技術：ZK-SNARKs、雙狀態架構、可程式化隱私，以 Midnight Network (NIGHT) 為例拆解。",
      tags: ["Web3", "Privacy"],
      tagStyle: "bg-primary/10 text-primary",
      href: "/blog/privacy-chain-midnight",
    },
    {
      title: "我離開 Google 之後，怎麼找下一份工作",
      date: "2026-04-06",
      summary:
        "在 Google Cloud 待了三年，我最後選擇裸辭。不是因為壓力太大，而是因為太輕鬆。",
      tags: ["Career", "Personal"],
      tagStyle: "bg-warm/10 text-warm",
      href: "/blog/leaving-google",
    },
    {
      title: "Dependency Injection 其實在解什麼",
      date: "2026-04-06",
      summary:
        "我想把這個很常被講得很玄的主題講清楚，所以直接用例子拆到夠細。",
      tags: ["Design Pattern", "Software Engineering"],
      tagStyle: "bg-primary/10 text-primary",
      href: "/blog/dependency-injection",
    },
    {
      title: "哪些事可以在 C++ 編譯期先做掉",
      date: "2026-03-31",
      summary:
        "從 constexpr 到 LUT 生成 - 五個實用的編譯期技巧，把能在編譯期做的事移到編譯期。",
      tags: ["C++", "Performance"],
      tagStyle: "bg-sky/10 text-sky",
      href: "/blog/cpp-compile-time-optimization",
    },
    {
      title: "C++ 小優化筆記：SSO 跟 Copy Elision",
      date: "2026-03-31",
      summary:
        "std::string 不一定用 heap？return 時加 std::move 反而更慢？拆解編譯器與標準庫在背後做的事。",
      tags: ["C++", "Performance", "Memory"],
      tagStyle: "bg-sky/10 text-sky",
      href: "/blog/cpp-secret-optimizations-1",
    },
    {
      title: "C++ 小優化筆記：Padding、Vtable 跟 Smart Pointer",
      date: "2026-03-31",
      summary:
        "sizeof 不是你想的那樣、virtual 讓物件膨脹 4 倍、shared_ptr 的隱藏原子操作代價。",
      tags: ["C++", "Performance", "Memory"],
      tagStyle: "bg-sky/10 text-sky",
      href: "/blog/cpp-secret-optimizations-2",
    },
    {
      title: "那場要我手寫 C++26 inplace_vector 的面試",
      date: "2026-03-31",
      summary:
        "世界頂級量化交易公司的面試，面試官劍橋畢業，從零實作 inplace_vector：aligned storage、placement new、Rule of Five。",
      tags: ["C++", "C++26", "Interview"],
      tagStyle: "bg-accent/10 text-accent",
      href: "/blog/cpp-inplace-vector",
    },
    {
      title: "那場 Crypto/HFT C++ 面試在考什麼",
      date: "2026-03-31",
      summary:
        "我親身參與的某知名 Crypto / HFT 公司 C++ 面試，涵蓋 string 傳遞、lambda 捕獲、Order Book 設計等六道效能分析題。",
      tags: ["C++", "Interview", "HFT"],
      tagStyle: "bg-warm/10 text-warm",
      href: "/blog/cpp-interview-performance-analysis",
    },
    {
      title: "我怎麼想 System Design",
      date: "Draft",
      summary:
        "Still writing. Probably a practical note on how I think about system design interviews, not a giant textbook.",
      tags: ["System Design", "Backend"],
      tagStyle: "bg-primary/10 text-primary",
      href: null,
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
