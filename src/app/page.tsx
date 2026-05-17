import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { hotPosts, recentPosts } from "@/data/posts";

const focusAreas = [
  {
    label: "Competitive Programming",
    tag: "Competitive Programming",
    summary: "演算法、競賽題解、解題思路與訓練回顧。",
  },
  {
    label: "Systems / C++",
    tag: "C++",
    summary: "效能、記憶體、編譯期技巧與工程面試。",
  },
  {
    label: "Career",
    tag: "Career",
    summary: "從 Google 到新創，工作選擇與職涯反思。",
  },
  {
    label: "Life",
    tag: "Life",
    summary: "偶像現場、投資觀察、旅行與日常紀錄。",
  },
];

const signals = [
  { value: "Ex-Google", label: "backend engineer" },
  { value: "Tech Lead", label: "AI startup" },
  { value: "ICPC Gold", label: "competitive programmer" },
];

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="font-mono text-xs uppercase text-primary">{children}</p>
  );
}

function HeroVisual() {
  return (
    <div
      aria-hidden="true"
      className="relative min-h-[360px] max-w-full overflow-hidden rounded-lg border border-border bg-surface/60 shadow-2xl shadow-black/30"
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(46,196,182,0.16),transparent_34%),linear-gradient(315deg,rgba(244,132,95,0.12),transparent_32%),linear-gradient(rgba(155,161,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(155,161,184,0.08)_1px,transparent_1px)] bg-[size:100%_100%,100%_100%,32px_32px,32px_32px]" />

      <div className="absolute left-6 top-6 font-mono text-xs text-text-muted">
        hanayukii.dev
      </div>
      <div className="absolute right-6 top-6 flex gap-1.5">
        <span className="h-2 w-2 rounded-full bg-primary" />
        <span className="h-2 w-2 rounded-full bg-accent" />
        <span className="h-2 w-2 rounded-full bg-sky" />
      </div>

      <div className="absolute inset-x-8 top-20 border-t border-primary/35" />
      <div className="absolute bottom-10 left-8 right-8 border-t border-accent/35" />
      <div className="absolute left-12 top-24 h-44 border-l border-text-muted/20" />
      <div className="absolute right-14 top-28 h-40 border-l border-primary/30" />

      <div className="absolute left-8 top-28">
        <p className="font-serif text-6xl font-bold text-text sm:text-7xl">
          花雪
        </p>
        <p className="mt-2 font-mono text-xs uppercase text-text-muted">
          starmine / still becoming
        </p>
      </div>

      <div className="absolute bottom-16 right-8 hidden w-48 space-y-3 font-mono text-xs sm:block">
        <div className="flex items-center justify-between border-b border-border pb-2">
          <span className="text-text-muted">algorithm</span>
          <span className="text-primary">accepted</span>
        </div>
        <div className="flex items-center justify-between border-b border-border pb-2">
          <span className="text-text-muted">system</span>
          <span className="text-sky">stable</span>
        </div>
        <div className="flex items-center justify-between border-b border-border pb-2">
          <span className="text-text-muted">life</span>
          <span className="text-accent">writing</span>
        </div>
      </div>

      <div className="absolute bottom-8 left-8 h-2 w-28 bg-primary/70" />
      <div className="absolute bottom-8 left-40 h-2 w-16 bg-accent/70" />
      <div className="absolute bottom-8 left-60 h-2 w-10 bg-sky/70" />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border/70">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(46,196,182,0.10),transparent_38%),linear-gradient(90deg,rgba(244,132,95,0.08),transparent_32%,rgba(56,189,248,0.08))]" />
        <div className="relative mx-auto grid max-w-6xl min-w-0 gap-12 px-6 pb-20 pt-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-center lg:pb-24 lg:pt-24">
          <div className="min-w-0 max-w-3xl">
            <p className="mb-5 font-mono text-xs uppercase text-primary">
              / PERSONAL SITE
            </p>
            <h1 className="font-serif text-5xl font-bold leading-[1.05] text-text sm:text-7xl">
              花雪
              <span className="block font-normal italic text-text/55">
                HanaYukii
              </span>
            </h1>
            <p className="mt-5 text-base italic text-accent sm:text-lg">
              Starmine, still becoming.
            </p>

            <div className="mt-8 max-w-2xl space-y-3 text-base leading-relaxed text-text-muted sm:text-lg">
              <p>Ex-Google engineer, now Tech Lead at an AI startup.</p>
              <p>
                Competitive programmer at heart, Web3 protocol contributor on
                the side.
              </p>
              <p>
                這邊隨興寫自己喜歡的 topic：演算法、C++、職涯、偶像、F1、日本旅遊。
              </p>
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/blog"
                className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-5 text-sm font-semibold text-bg transition-colors hover:bg-primary-dark"
              >
                Read Blog
              </Link>
              <Link
                href="/about"
                className="inline-flex h-11 items-center justify-center rounded-md border border-border bg-surface/70 px-5 text-sm font-semibold text-text transition-colors hover:border-primary/60 hover:text-primary"
              >
                About Me
              </Link>
            </div>
          </div>

          <div className="min-w-0">
            <HeroVisual />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <FadeIn>
          <div className="grid gap-3 sm:grid-cols-3">
            {signals.map((signal) => (
              <div
                key={signal.value}
                className="rounded-lg border border-border bg-surface/50 px-4 py-4"
              >
                <p className="font-serif text-2xl font-semibold text-text">
                  {signal.value}
                </p>
                <p className="mt-1 text-sm text-text-muted">{signal.label}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <FadeIn>
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <SectionLabel>/TOPICS</SectionLabel>
              <h2 className="mt-2 font-serif text-3xl font-semibold text-text">
                常寫的主題
              </h2>
            </div>
            <Link
              href="/blog"
              className="hidden text-sm text-text-muted transition-colors hover:text-primary sm:block"
            >
              Browse all posts &rarr;
            </Link>
          </div>

          <div className="grid gap-3 md:grid-cols-4">
            {focusAreas.map((area) => (
              <Link
                key={area.tag}
                href={`/blog?tag=${encodeURIComponent(area.tag)}`}
                className="group rounded-lg border border-border bg-surface/45 p-4 transition-colors hover:border-primary/60 hover:bg-surface-hover/60"
              >
                <p className="font-serif text-lg font-semibold text-text transition-colors group-hover:text-primary">
                  {area.label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {area.summary}
                </p>
              </Link>
            ))}
          </div>
        </FadeIn>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <FadeIn>
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <SectionLabel>/FEATURED</SectionLabel>
              <h2 className="mt-2 font-serif text-3xl font-semibold text-text">
                Hot Posts
              </h2>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {hotPosts.map((post, i) => (
              <Link
                key={post.title}
                href={post.href!}
                className="group flex min-h-72 flex-col rounded-lg border border-border bg-surface/60 p-5 transition-colors hover:border-primary/60 hover:bg-surface-hover/60"
              >
                <div className="mb-8 flex items-center justify-between text-xs text-text-muted">
                  <span className="font-mono">
                    {String(i + 1).padStart(2, "0")} / HOT
                  </span>
                  <time dateTime={post.date}>{post.date}</time>
                </div>

                <h3 className="font-serif text-2xl font-semibold leading-snug text-text transition-colors group-hover:text-primary">
                  {post.title}
                </h3>
                <p className="mt-4 line-clamp-4 text-sm leading-relaxed text-text-muted">
                  {post.summary}
                </p>

                <div className="mt-auto flex flex-wrap gap-2 pt-6">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${post.tagStyle}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </FadeIn>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <FadeIn>
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <SectionLabel>/RECENT</SectionLabel>
              <h2 className="mt-2 font-serif text-3xl font-semibold text-text">
                Recent Posts
              </h2>
            </div>
            <Link
              href="/blog"
              className="text-sm text-text-muted transition-colors hover:text-primary"
            >
              View all &rarr;
            </Link>
          </div>

          <div className="grid gap-x-8 divide-y divide-border/60 lg:grid-cols-2 lg:divide-y-0">
            {recentPosts.slice(0, 10).map((post) => (
              <Link
                key={post.title}
                href={post.href!}
                className="group grid min-w-0 gap-3 border-border/60 py-4 transition-colors lg:border-t"
              >
                <div className="flex min-w-0 items-start justify-between gap-4">
                  <h3 className="line-clamp-2 text-base font-semibold text-text transition-colors group-hover:text-primary">
                    {post.title}
                  </h3>
                  <time
                    dateTime={post.date}
                    className="shrink-0 text-xs text-text-muted"
                  >
                    {post.date}
                  </time>
                </div>
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${post.tagStyle}`}
                  >
                    {post.tags[0]}
                  </span>
                  <p className="min-w-0 truncate text-sm text-text-muted">
                    {post.summary}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </FadeIn>
      </section>
    </>
  );
}
