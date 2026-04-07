export default function Tutoring() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-2 text-4xl font-extrabold tracking-tight">
        Algorithm Tutoring
      </h1>
      <p className="mb-10 text-lg text-text-muted">
        Personalized 1-on-1 coaching to level up your competitive programming
        and algorithm skills.
      </p>

      {/* Why Me */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold">Why Learn From Me?</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              icon: "🏅",
              title: "ICPC Gold Medalist",
              desc: "Proven track record in competitive programming at the highest level.",
            },
            {
              icon: "🏢",
              title: "Ex-Google SWE",
              desc: "Real-world engineering experience to bridge theory and practice.",
            },
            {
              icon: "🎓",
              title: "NCTU CS Master's",
              desc: "Strong academic foundation in computer science fundamentals.",
            },
            {
              icon: "📊",
              title: "Active Competitor",
              desc: "Still practicing on Codeforces — I stay sharp and up-to-date.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-border bg-surface p-5"
            >
              <div className="mb-2 text-2xl">{item.icon}</div>
              <h3 className="mb-1 font-bold">{item.title}</h3>
              <p className="text-sm text-text-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What I Teach */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold">What I Teach</h2>
        <div className="rounded-xl border border-border bg-surface p-6">
          <ul className="space-y-3 text-text-muted">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-primary">&#10003;</span>
              <span>
                <strong className="text-text">
                  Data Structures & Algorithms
                </strong>{" "}
                — from basics to advanced topics like segment trees, graph
                algorithms, DP optimization
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-primary">&#10003;</span>
              <span>
                <strong className="text-text">ICPC / Contest Prep</strong> —
                strategy, problem selection, team coordination, time management
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-primary">&#10003;</span>
              <span>
                <strong className="text-text">Coding Interview Prep</strong> —
                LeetCode patterns, system design basics, Google/Meta-style
                interviews
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-primary">&#10003;</span>
              <span>
                <strong className="text-text">C++ for CP</strong> — STL mastery,
                performance optimization, competitive idioms
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-xl bg-gradient-to-r from-primary to-accent p-8 text-center text-white">
        <h2 className="mb-3 text-2xl font-bold">Ready to Get Started?</h2>
        <p className="mb-6 text-white/90">
          Send me a message and let&apos;s discuss your goals and create a
          personalized learning plan.
        </p>
        <a
          href="mailto:hanayuki@example.com"
          className="inline-block rounded-lg bg-white px-6 py-3 text-sm font-semibold text-primary shadow-md transition-colors hover:bg-white/90"
        >
          Contact Me
        </a>
      </section>
    </div>
  );
}
