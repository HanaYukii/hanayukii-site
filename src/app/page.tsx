import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export default function Home() {
  const hotPosts = [
    {
      title: "離開 Google 半年後的轉職紀錄",
      date: "2026-04-06",
      tags: ["Career", "Personal"],
      tagStyle: "bg-warm/10 text-warm",
      href: "/blog/leaving-google",
    },
    {
      title: "從 Midnight 看隱私鏈技術",
      date: "2026-04-06",
      tags: ["Web3", "Privacy"],
      tagStyle: "bg-primary/10 text-primary",
      href: "/blog/privacy-chain-midnight",
    },
  ];

  const recentPosts = [
    {
      title: "搞懂 Dependency Injection",
      date: "04-06",
      tags: ["Design Pattern"],
      tagStyle: "bg-primary/10 text-primary",
      href: "/blog/dependency-injection",
    },
    {
      title: "C++ 編譯期可以做的五件事",
      date: "03-31",
      tags: ["C++"],
      tagStyle: "bg-sky/10 text-sky",
      href: "/blog/cpp-compile-time-optimization",
    },
    {
      title: "SSO 跟 Copy Elision：C++ 背後在偷做什麼",
      date: "03-31",
      tags: ["C++"],
      tagStyle: "bg-sky/10 text-sky",
      href: "/blog/cpp-secret-optimizations-1",
    },
    {
      title: "Padding、Vtable、Smart Pointer：C++ 的隱藏成本",
      date: "03-31",
      tags: ["C++"],
      tagStyle: "bg-sky/10 text-sky",
      href: "/blog/cpp-secret-optimizations-2",
    },
    {
      title: "手寫 inplace_vector：一場硬核 C++ 面試",
      date: "03-31",
      tags: ["C++"],
      tagStyle: "bg-accent/10 text-accent",
      href: "/blog/cpp-inplace-vector",
    },
    {
      title: "HFT 面試的六道 C++ 效能題",
      date: "03-31",
      tags: ["Interview"],
      tagStyle: "bg-warm/10 text-warm",
      href: "/blog/cpp-interview-performance-analysis",
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Ambient color blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/8 blur-[120px]" />
          <div className="absolute -right-20 top-20 h-72 w-72 rounded-full bg-sky/8 blur-[100px]" />
          <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-accent/6 blur-[100px]" />
          <div className="absolute -bottom-20 right-1/4 h-56 w-56 rounded-full bg-rose/5 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 py-32 text-center">
          <FadeIn>
            <h1 className="mb-6 text-5xl font-extrabold tracking-tight sm:text-7xl">
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-sky via-primary to-accent bg-clip-text text-transparent">
                花雪
              </span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-text-muted">
              A starmine yet to peak — each burst brighter than the last.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="mb-10 flex flex-wrap justify-center gap-2">
              {[
                { label: "Ex-Google", style: "border-sky/30 text-sky" },
                { label: "ICPC Gold", style: "border-accent/30 text-accent" },
                { label: "CP Enthusiast", style: "border-rose-400/30 text-rose-400" },
                { label: "Tech Lead", style: "border-emerald-400/30 text-emerald-400" },
                { label: "Web3 Builder", style: "border-warm/30 text-warm" },
              ].map((tag) => (
                <span
                  key={tag.label}
                  className={`rounded-full border px-3 py-1 text-sm font-medium ${tag.style}`}
                >
                  {tag.label}
                </span>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex justify-center gap-4">
              <Link
                href="/blog"
                className="rounded-lg bg-gradient-to-r from-primary to-sky px-6 py-3 text-sm font-semibold text-bg shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30"
              >
                Read Blog
              </Link>
              <Link
                href="/about"
                className="rounded-lg border border-border bg-surface/40 px-6 py-3 text-sm font-semibold text-text backdrop-blur-sm transition-all hover:border-accent/60 hover:text-accent"
              >
                About Me
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Hot Posts */}
      <section className="relative mx-auto max-w-4xl px-6 py-20">
        <FadeIn>
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Hot Posts</h2>
            <Link
              href="/blog"
              className="text-sm font-medium text-primary hover:underline"
            >
              View all &rarr;
            </Link>
          </div>
        </FadeIn>
        <div className="grid gap-6 sm:grid-cols-2">
          {hotPosts.map((post, i) => (
            <FadeIn key={post.title} delay={i * 0.1}>
              <Link href={post.href}>
                <article className="rounded-xl border border-border bg-surface/40 p-6 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-surface-hover cursor-pointer">
                  <div className="mb-3 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${post.tagStyle}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="mb-1 text-lg font-semibold">{post.title}</h3>
                  <p className="text-sm text-text-muted">{post.date}</p>
                </article>
              </Link>
            </FadeIn>
          ))}
        </div>

        {/* Recent Posts compact list */}
        <FadeIn delay={0.3}>
          <h3 className="mb-3 mt-10 text-sm font-semibold text-text-muted uppercase tracking-wider">Recent Posts</h3>
          <div className="space-y-0 divide-y divide-border/30">
            {recentPosts.map((post) => (
              <Link key={post.title} href={post.href}>
                <div className="flex items-center justify-between py-2 transition-colors hover:text-primary">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={`shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-medium ${post.tagStyle}`}>
                      {post.tags[0]}
                    </span>
                    <span className="truncate text-xs font-medium">{post.title}</span>
                  </div>
                  <span className="shrink-0 pl-3 text-[10px] text-text-muted">{post.date}</span>
                </div>
              </Link>
            ))}
          </div>
        </FadeIn>
      </section>
    </>
  );
}
