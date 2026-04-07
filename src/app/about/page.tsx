import Link from "next/link";

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-3 text-4xl font-extrabold tracking-tight">About Me</h1>
      <p className="mb-12 text-text-muted">
        Engineer by trade, curious by nature.
      </p>

      {/* Intro */}
      <section className="mb-14">
        <p className="text-lg leading-relaxed text-text-muted">
          I&apos;m{" "}
          <strong className="text-text">花雪 (HanaYukii)</strong> — a software
          engineer who digs deep into everything, whether it&apos;s a
          distributed system, a competitive programming problem, or the
          discography of an idol group. I believe the best engineers are the ones
          with genuine curiosity beyond their craft.
        </p>
      </section>

      {/* Quick Facts */}
      <section className="mb-14">
        <h2 className="mb-5 text-2xl font-bold">At a Glance</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { label: "Current Role", value: "Senior Staff SWE @ Pulsaris AI" },
            { label: "Previous", value: "Software Engineer @ Google" },
            { label: "Education", value: "M.S. CS, NCTU" },
            { label: "Languages", value: "中文 · English · 日本語 (N2)" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-lg border border-border bg-surface px-4 py-3"
            >
              <p className="text-xs font-medium text-text-muted">
                {item.label}
              </p>
              <p className="font-semibold">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Beyond Code */}
      <section className="mb-14">
        <h2 className="mb-2 text-2xl font-bold">Beyond Code</h2>
        <p className="mb-6 text-sm text-text-muted">
          Things I invest serious time in, not just bullet points.
        </p>

        <div className="space-y-6">
          {/* Idol Culture */}
          <div className="rounded-xl border border-border bg-surface p-6">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-lg">🎤</span>
              <h3 className="text-lg font-bold">Japanese Idol Culture</h3>
            </div>
            <p className="mb-3 text-sm leading-relaxed text-text-muted">
              Long-time follower of the Japanese idol scene. My favorite group is{" "}
              <strong className="text-text">私立恵比寿中学</strong> and I
              especially follow <strong className="text-text">櫻井えま</strong>.
              I also keep up with =LOVE, ≠ME, ≒JOY, and others across the scene.
            </p>
            <p className="text-sm leading-relaxed text-text-muted">
              For me, idol culture isn&apos;t just about music — it&apos;s about
              following growth stories, stage performances, fandom dynamics, and
              the intersection of art and dedication. I also use idol blogs and
              lyrics as Japanese study material.
            </p>
          </div>

          {/* F1 */}
          <div className="rounded-xl border border-border bg-surface p-6">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-lg">🏎️</span>
              <h3 className="text-lg font-bold">Formula 1</h3>
            </div>
            <p className="text-sm leading-relaxed text-text-muted">
              Active F1 fan, not just a screen viewer. Planning to attend races
              in person — currently eyeing the Japanese GP at Suzuka and the
              Singapore GP at Marina Bay. The engineering precision behind
              motorsport resonates deeply.
            </p>
          </div>

          {/* Cycling */}
          <div className="rounded-xl border border-border bg-surface p-6">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-lg">🚴</span>
              <h3 className="text-lg font-bold">Road Cycling</h3>
            </div>
            <p className="text-sm leading-relaxed text-text-muted">
              Road cycling is my primary sport — a mix of endurance training,
              gear research, and the simple joy of long rides. It&apos;s both a
              fitness commitment and a way to clear my head.
            </p>
          </div>

          {/* Investing */}
          <div className="rounded-xl border border-border bg-surface p-6">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-lg">📈</span>
              <h3 className="text-lg font-bold">Investing &amp; Crypto</h3>
            </div>
            <p className="text-sm leading-relaxed text-text-muted">
              Long-term investor with focus on crypto and equities. My Web3
              engineering work and investment interests are deeply intertwined —
              I don&apos;t just invest in protocols, I study and build them.
              Interested in asset allocation, market cycles, and risk management.
            </p>
          </div>

          {/* Japan & Travel */}
          <div className="rounded-xl border border-border bg-surface p-6">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-lg">✈️</span>
              <h3 className="text-lg font-bold">Japan &amp; Travel</h3>
            </div>
            <p className="text-sm leading-relaxed text-text-muted">
              Frequent traveler to Japan, often combining idol live events with
              exploration. Familiar with Tokyo, Nagoya, Hamamatsu, Mishima, and
              beyond. Enjoy planning detailed itineraries that mix culture,
              food, and live performances.
            </p>
          </div>
        </div>
      </section>

      {/* Personal Tags */}
      <section className="mb-14">
        <div className="flex flex-wrap gap-2">
          {[
            "Idol Culture Enthusiast",
            "F1 Fan",
            "Road Cyclist",
            "Crypto Investor",
            "Japan Traveler",
            "日本語 Learner",
            "Competitive Programmer",
            "Systems Thinker",
          ].map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-primary/5 px-3 py-1 text-sm font-medium text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Get in Touch */}
      <section>
        <h2 className="mb-4 text-2xl font-bold">Get in Touch</h2>
        <p className="mb-4 text-text-muted">
          Always open to coffee chats, new connections, and interesting
          opportunities. Whether it&apos;s about algorithms, systems, idol
          culture, or something I haven&apos;t explored yet — feel free to reach
          out.
        </p>
        <div className="flex gap-3">
          <a
            href="https://www.linkedin.com/in/erh-hsuan-lu-a9b0681ba/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium transition-all hover:border-primary hover:text-primary"
          >
            LinkedIn
            <svg className="h-3 w-3 opacity-40" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l6-6m0 0H4m5 0v5"/></svg>
          </a>
          <a
            href="https://github.com/HanaYukii"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium transition-all hover:border-primary hover:text-primary"
          >
            GitHub
            <svg className="h-3 w-3 opacity-40" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l6-6m0 0H4m5 0v5"/></svg>
          </a>
          <Link
            href="/tutoring"
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
          >
            Tutoring →
          </Link>
        </div>
      </section>
    </div>
  );
}
