import FadeIn from "@/components/FadeIn";

export default function Experience() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <FadeIn>
        <h1 className="mb-2 text-4xl font-extrabold tracking-tight">
          Experience
        </h1>
        <p className="mb-12 text-text-muted">
          The short version of what I&apos;ve been working on and the kind of
          problems I like.
        </p>
      </FadeIn>

      {/* Work Experience */}
      <section className="mb-14">
        <FadeIn>
          <h2 className="mb-6 text-2xl font-bold">Work</h2>
        </FadeIn>
        <div className="space-y-8">
          {[
            {
              period: "Dec 2025 – Present",
              title: "Tech Lead, Software Engineer",
              company: "AI Startup",
              desc: "Working close to both product and engineering. A lot of my time goes into turning vague AI ideas into something the team can actually build and iterate on.",
              current: true,
            },
            {
              period: "Sep 2022 – Nov 2025 · 3 yr 3 mo",
              title: "Software Engineer",
              company: "Google - Cloud Infrastructure",
              desc: "Built backend telemetry infrastructure for Google Cloud. Most of the work was C++, reliability, performance, and making large systems behave predictably.",
              current: false,
            },
            {
              period: "Jul 2020 – Sep 2020 · 3 mo",
              title: "Software Engineer Intern",
              company: "Synopsys",
              desc: "Worked on C++ and CUDA for IC layout rule validation. It was one of the first times I got to seriously care about runtime and low-level performance.",
              current: false,
            },
          ].map((job, i) => (
            <FadeIn key={job.company} delay={i * 0.1}>
              <div
                className={`relative border-l-2 pl-6 ${
                  job.current ? "border-primary/50" : "border-border"
                }`}
              >
                <div
                  className={`absolute -left-[7px] top-1 h-3 w-3 rounded-full ${
                    job.current ? "bg-primary shadow-lg shadow-primary/50" : "bg-border"
                  }`}
                />
                <p className="text-xs font-medium text-text-muted">
                  {job.period}
                </p>
                <h3 className="text-lg font-bold">{job.title}</h3>
                <p className="text-sm text-text-muted">{job.company}</p>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {job.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mb-14">
        <FadeIn>
          <h2 className="mb-6 text-2xl font-bold">Education</h2>
        </FadeIn>
        <div className="space-y-6">
          {[
            {
              period: "2020 – 2022",
              degree: "M.S. in Computer Science",
              school: "National Chiao Tung University (NCTU / NYCU)",
              details: "EDA Lab - Routing & Graph Theory. Collaborated with MediaTek on NCTUGR.",
            },
            {
              period: "2016 – 2020",
              degree: "B.S. in Computer Science",
              school: "National Chiao Tung University (NCTU / NYCU)",
              details: "Top of class · Academic Achievement Award (x2) · CP Team top member · TA: Algorithms, CP, Computer Organization.",
            },
          ].map((edu, i) => (
            <FadeIn key={edu.degree} delay={i * 0.1}>
              <div className="relative border-l-2 border-border pl-6">
                <div className="absolute -left-[7px] top-1 h-3 w-3 rounded-full bg-border" />
                <p className="text-xs font-medium text-text-muted">
                  {edu.period}
                </p>
                <h3 className="text-lg font-bold">{edu.degree}</h3>
                <p className="text-sm text-text-muted">{edu.school}</p>
                <p className="mt-1 text-sm leading-relaxed text-text-muted">
                  {edu.details}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Competitive Programming */}
      <section className="mb-14">
        <FadeIn>
          <h2 className="mb-6 text-2xl font-bold">Competitive Programming</h2>
          <div className="mb-6 rounded-xl border border-border bg-surface/40 p-6 backdrop-blur-sm">
            <div className="mb-4 flex flex-wrap gap-3">
              <span className="rounded-full bg-accent/10 px-3 py-1 text-sm font-semibold text-accent">
                ICPC Taipei Regional Gold - Team Leader & Main Coder (2020)
              </span>
              <span className="rounded-full bg-warm/10 px-3 py-1 text-sm font-semibold text-warm">
                Google Code Jam Round 3 (x2)
              </span>
              <span className="rounded-full bg-rose/10 px-3 py-1 text-sm font-semibold text-rose">
                Meta Hacker Cup Round 3 (x3)
              </span>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                LeetCode ~2800 - Guardian (Top 0.04%)
              </span>
              <span className="rounded-full bg-teal-400/10 px-3 py-1 text-sm font-semibold text-teal-300">
                Codeforces 2300+ - International Master (Top 0.5%)
              </span>
              <span className="rounded-full bg-orange-400/10 px-3 py-1 text-sm font-semibold text-orange-300">
                AtCoder 2000+ - 5-Dan
              </span>
              <span className="rounded-full bg-sky/10 px-3 py-1 text-sm font-semibold text-sky">
                Google Kick Start 2020 - Invited to Google Visit Program
              </span>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-text-muted">
              I still do contests even after working full-time for years. It is
              partly habit, partly fun, and partly because I just like hard
              problems. I have also mentored students who later became national
              team members, ICPC medalists, and engineers at Google and
              Microsoft.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                {
                  name: "Codeforces",
                  href: "https://codeforces.com/profile/HanaYukii",
                },
                {
                  name: "LeetCode",
                  href: "https://leetcode.com/hanayukii",
                },
                {
                  name: "AtCoder",
                  href: "https://atcoder.jp/users/HanaYukii",
                },
              ].map((oj) => (
                <a
                  key={oj.name}
                  href={oj.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-sm font-medium transition-all hover:border-primary hover:text-primary"
                >
                  {oj.name}
                  <svg
                    className="h-3 w-3 opacity-40"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M3 9l6-6m0 0H4m5 0v5" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Tutoring Achievements */}
      <section className="mb-14">
        <FadeIn>
          <h2 className="mb-6 text-2xl font-bold">Tutoring Achievements</h2>
          <div className="rounded-xl border border-border bg-surface/40 p-6 backdrop-blur-sm">
            <div className="space-y-4">
              {[
                {
                  icon: "🏆",
                  title: "National Selection Training Camp",
                  desc: "Students selected into TOI national training camp (TOI 選訓營)",
                },
                {
                  icon: "🎓",
                  title: "Top University Special Admissions",
                  desc: "Multiple students admitted to NTHU & NCTU through special talent admissions (特殊選才)",
                },
                {
                  icon: "💼",
                  title: "Big Tech Offers",
                  desc: "Multiple students landed offers at Google, Microsoft, and other top tech companies",
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <span className="mt-0.5 text-lg">{item.icon}</span>
                  <div>
                    <p className="font-bold">{item.title}</p>
                    <p className="text-sm text-text-muted">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Projects */}
      <section className="mb-14">
        <FadeIn>
          <h2 className="mb-6 text-2xl font-bold">Projects</h2>
          <div className="rounded-xl border border-border bg-surface/40 p-6 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-surface-hover">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-bold">Polkadot JAM Protocol</h3>
                  <span className="rounded-full bg-warm/10 px-2 py-0.5 text-xs font-semibold text-warm">
                    94 Stars
                  </span>
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                    Top Contributor in Team
                  </span>
                </div>
                <p className="mt-1 text-sm text-text-muted">
                  Sep 2024 – Present
                </p>
                <p className="mt-1 text-sm leading-relaxed text-text-muted">
                  Part of team New-JAMneration in the Web3 Foundation JAM
                  contest. I spent a lot of time on core protocol code, design
                  discussions, and writing docs that made the whole thing more
                  understandable.
                </p>
              </div>
              <a
                href="https://github.com/New-JAMneration"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 shrink-0 rounded-full border border-border p-2 transition-all hover:border-primary hover:text-primary"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
              </a>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Skills */}
      <section>
        <FadeIn>
          <h2 className="mb-4 text-2xl font-bold">Skills</h2>
          <div className="space-y-3">
            {[
              {
                label: "Languages",
                items: ["C++", "Go", "Rust", "Python"],
              },
              {
                label: "Domains",
                items: [
                  "Backend / Infrastructure",
                  "System Design",
                  "Algorithms",
                  "EDA / Routing",
                  "Reinforcement Learning",
                  "Web3 / Blockchain",
                ],
              },
              {
                label: "Human Languages",
                items: [
                  "Chinese (Native)",
                  "English",
                  "Japanese (JLPT N2)",
                  "US & Asia cross-team collaboration",
                ],
              },
            ].map((group) => (
              <div key={group.label}>
                <p className="mb-1.5 text-sm font-semibold text-text-muted">
                  {group.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-border bg-surface/40 px-3 py-1 text-sm"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
