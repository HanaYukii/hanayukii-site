import FadeIn from "@/components/FadeIn";

export default function Tutoring() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <FadeIn>
        <h1 className="mb-2 text-4xl font-extrabold tracking-tight">
          Algorithm Tutoring
        </h1>
        <p className="mb-10 text-lg text-text-muted">
          I help students get better at algorithms, contests, and interviews
          without turning the whole process into pure suffering.
        </p>
      </FadeIn>

      {/* Why Me */}
      <section className="mb-12">
        <FadeIn>
          <h2 className="mb-4 text-2xl font-bold">Why Learn From Me?</h2>
        </FadeIn>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              icon: "🏅",
              title: "ICPC Gold Medalist",
              desc: "I have been through the contest grind myself, so I know what usually helps and what is just noise.",
            },
            {
              icon: "🏢",
              title: "3.5 Years at Google",
              desc: "I can explain the textbook version, but I also care about how these ideas show up in real engineering work.",
            },
            {
              icon: "🎓",
              title: "NCTU CS Master's",
              desc: "My background is solid enough that I can usually explain the same idea from more than one angle.",
            },
            {
              icon: "📊",
              title: "Active Competitor",
              desc: "I still do contests, so I am not teaching from old notes or half-remembered patterns.",
            },
          ].map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.08}>
              <div className="rounded-xl border border-border bg-surface/40 p-5 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-surface-hover">
                <div className="mb-2 text-2xl">{item.icon}</div>
                <h3 className="mb-1 font-bold">{item.title}</h3>
                <p className="text-sm text-text-muted">{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* What I Teach */}
      <section className="mb-12">
        <FadeIn>
          <h2 className="mb-4 text-2xl font-bold">What I Teach</h2>
          <div className="rounded-xl border border-border bg-surface/40 p-6 backdrop-blur-sm">
            <ul className="space-y-3 text-text-muted">
              {[
                {
                  title: "Data Structures & Algorithms",
                  desc: "from fundamentals to topics like segment trees, graph algorithms, and DP optimization",
                },
                {
                  title: "ICPC / Contest Prep",
                  desc: "how to practice, how to read problems, and how to avoid wasting effort",
                },
                {
                  title: "Coding Interview Prep",
                  desc: "LeetCode patterns, common interview traps, and the thinking process behind good solutions",
                },
                {
                  title: "C++ for CP",
                  desc: "STL, implementation habits, and the small things that make contest code cleaner and faster",
                },
              ].map((item) => (
                <li key={item.title} className="flex items-start gap-2">
                  <span className="mt-0.5 text-primary">&#10003;</span>
                  <span>
                    <strong className="text-text">{item.title}</strong> -{" "}
                    {item.desc}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </section>

      {/* CTA */}
      <FadeIn>
        <section className="rounded-xl bg-gradient-to-r from-sky via-primary to-accent p-8 text-center text-white">
          <h2 className="mb-3 text-2xl font-bold">Ready to Get Started?</h2>
          <p className="mb-6 text-white/80">
            Send me your current level and what you are aiming for. I can
            usually tell pretty quickly whether I&apos;m the right fit and how
            we should approach it.
          </p>
          <a
            href="mailto:islu245777@gmail.com"
            className="inline-block rounded-lg bg-white px-6 py-3 text-sm font-semibold text-bg shadow-md transition-colors hover:bg-white/90"
          >
            Contact Me
          </a>
        </section>
      </FadeIn>
    </div>
  );
}
