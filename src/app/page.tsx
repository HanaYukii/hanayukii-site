import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Colorful background blobs */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />
          <div className="absolute right-0 top-10 h-60 w-60 rounded-full bg-violet-400/20 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-rose-400/15 blur-3xl" />
          <div className="absolute -bottom-10 right-1/4 h-48 w-48 rounded-full bg-amber-400/15 blur-3xl" />
          <div className="absolute left-1/2 top-1/3 h-40 w-40 rounded-full bg-emerald-400/15 blur-3xl" />
        </div>

        <div className="mx-auto max-w-4xl px-6 py-28 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs font-medium text-text-muted backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Software Engineer &middot; Algorithm Tutor
          </div>
          <h1 className="mb-6 text-5xl font-extrabold tracking-tight sm:text-6xl">
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-blue-500 via-violet-500 to-rose-500 bg-clip-text text-transparent">
              花雪
            </span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-text-muted">
            Senior Staff SWE @ Pulsaris AI &middot; Ex-Google Cloud
            Infrastructure &middot; ICPC Gold &middot; Web3 Protocol Developer
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/tutoring"
              className="rounded-lg bg-gradient-to-r from-blue-500 to-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-xl hover:shadow-violet-500/30"
            >
              Tutoring
            </Link>
            <Link
              href="/about"
              className="rounded-lg border border-border bg-surface/60 px-6 py-3 text-sm font-semibold text-text backdrop-blur-sm transition-colors hover:border-violet-400 hover:text-violet-600"
            >
              About Me
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="border-t border-border">
        <div className="mx-auto grid max-w-4xl gap-6 px-6 py-16 sm:grid-cols-3">
          {[
            {
              emoji: "⚙️",
              title: "Backend & Infra",
              desc: "Extensive experience in backend systems, infrastructure, and system design at scale. C++, Go, Python, Rust.",
              color: "from-blue-500/10 to-cyan-500/10",
              border: "hover:border-blue-400",
            },
            {
              emoji: "🏆",
              title: "Competitive Programming",
              desc: "ICPC Regional Gold Medalist, Codeforces peak 2350, LeetCode ~2800. Deep algorithmic expertise.",
              color: "from-amber-500/10 to-orange-500/10",
              border: "hover:border-amber-400",
            },
            {
              emoji: "🔗",
              title: "Web3 & Blockchain",
              desc: "Polkadot JAM Protocol contributor. Bridging cutting-edge research with production-grade implementations.",
              color: "from-violet-500/10 to-rose-500/10",
              border: "hover:border-violet-400",
            },
          ].map((item) => (
            <div
              key={item.title}
              className={`rounded-xl border border-border bg-gradient-to-br ${item.color} p-6 text-center transition-all ${item.border} hover:shadow-md`}
            >
              <div className="mb-3 text-2xl">{item.emoji}</div>
              <h3 className="mb-2 text-lg font-bold">{item.title}</h3>
              <p className="text-sm leading-relaxed text-text-muted">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Blog Preview */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Latest Posts</h2>
          <Link
            href="/blog"
            className="text-sm font-medium text-violet-600 hover:underline"
          >
            View all &rarr;
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {[
            {
              title: "Understanding System Design Fundamentals",
              date: "Coming Soon",
              tags: ["System Design", "Backend"],
              tagColor: "bg-blue-500/10 text-blue-600",
            },
            {
              title: "ICPC Preparation Guide: From Zero to Gold",
              date: "Coming Soon",
              tags: ["Competitive Programming", "ICPC"],
              tagColor: "bg-amber-500/10 text-amber-600",
            },
          ].map((post) => (
            <article
              key={post.title}
              className="rounded-xl border border-border bg-surface p-6 transition-shadow hover:shadow-md"
            >
              <div className="mb-3 flex gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${post.tagColor}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="mb-1 text-lg font-semibold">{post.title}</h3>
              <p className="text-sm text-text-muted">{post.date}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
