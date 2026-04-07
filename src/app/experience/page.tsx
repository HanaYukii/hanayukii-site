export default function Experience() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-2 text-4xl font-extrabold tracking-tight">
        Experience
      </h1>
      <p className="mb-12 text-text-muted">
        Work experience, competitive programming, and technical background.
      </p>

      {/* Work Experience */}
      <section className="mb-14">
        <h2 className="mb-6 text-2xl font-bold">Work</h2>
        <div className="space-y-8">
          <div className="relative border-l-2 border-primary/30 pl-6">
            <div className="absolute -left-[7px] top-1 h-3 w-3 rounded-full bg-primary" />
            <p className="text-xs font-medium text-text-muted">
              Dec 2025 &ndash; Present
            </p>
            <h3 className="text-lg font-bold">Senior Staff Software Engineer</h3>
            <p className="text-sm text-text-muted">Pulsaris AI</p>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              Leading technical strategy and algorithm design for RL-driven EDA
              optimization. Building high-performance systems for hardware design
              flows with focus on scalability and architectural clarity.
            </p>
          </div>

          <div className="relative border-l-2 border-border pl-6">
            <div className="absolute -left-[7px] top-1 h-3 w-3 rounded-full bg-border" />
            <p className="text-xs font-medium text-text-muted">
              Sep 2022 &ndash; Nov 2025 &middot; 3 yr 3 mo
            </p>
            <h3 className="text-lg font-bold">Software Engineer</h3>
            <p className="text-sm text-text-muted">Google</p>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              Google Cloud Infrastructure. Built and maintained C++ backend
              services for planetary-scale production systems. Focused on system
              design, performance optimization, and reliability.
            </p>
          </div>

          <div className="relative border-l-2 border-border pl-6">
            <div className="absolute -left-[7px] top-1 h-3 w-3 rounded-full bg-border" />
            <p className="text-xs font-medium text-text-muted">
              Jul 2020 &ndash; Sep 2020 &middot; 3 mo
            </p>
            <h3 className="text-lg font-bold">Project Intern</h3>
            <p className="text-sm text-text-muted">Synopsys</p>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              Algorithm development and CUDA optimization for EDA tooling.
            </p>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="mb-14">
        <h2 className="mb-6 text-2xl font-bold">Education</h2>
        <div className="space-y-6">
          <div className="relative border-l-2 border-border pl-6">
            <div className="absolute -left-[7px] top-1 h-3 w-3 rounded-full bg-border" />
            <p className="text-xs font-medium text-text-muted">2020 &ndash; 2022</p>
            <h3 className="text-lg font-bold">M.S. in Computer Science</h3>
            <p className="text-sm text-text-muted">
              National Chiao Tung University (NCTU)
            </p>
          </div>
          <div className="relative border-l-2 border-border pl-6">
            <div className="absolute -left-[7px] top-1 h-3 w-3 rounded-full bg-border" />
            <p className="text-xs font-medium text-text-muted">2016 &ndash; 2020</p>
            <h3 className="text-lg font-bold">B.S. in Computer Science</h3>
            <p className="text-sm text-text-muted">
              National Chiao Tung University (NCTU)
            </p>
          </div>
        </div>
      </section>

      {/* Competitive Programming */}
      <section className="mb-14">
        <h2 className="mb-6 text-2xl font-bold">Competitive Programming</h2>
        <div className="mb-6 rounded-xl border border-border bg-surface p-6">
          <div className="mb-4 flex flex-wrap gap-3">
            <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-800">
              ICPC Regional Gold (Rank 3)
            </span>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-800">
              Google Code Jam Round 3
            </span>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
              LeetCode Rating ~2800 (Top 0.05%)
            </span>
            <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-800">
              Codeforces Peak 2350
            </span>
          </div>
          <div className="flex flex-wrap gap-3">
            {[
              { name: "Codeforces", href: "https://codeforces.com/profile/HanaYukii" },
              { name: "LeetCode", href: "https://leetcode.com/hanayukii" },
              { name: "AtCoder", href: "https://atcoder.jp/users/HanaYukii" },
            ].map((oj) => (
              <a
                key={oj.name}
                href={oj.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-sm font-medium transition-all hover:border-primary hover:text-primary"
              >
                {oj.name}
                <svg className="h-3 w-3 opacity-40" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l6-6m0 0H4m5 0v5"/></svg>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Tutoring Achievements */}
      <section className="mb-14">
        <h2 className="mb-6 text-2xl font-bold">Tutoring Achievements</h2>
        <div className="rounded-xl border border-border bg-surface p-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 text-lg">🏆</span>
              <div>
                <p className="font-bold">
                  National Selection Training Camp
                </p>
                <p className="text-sm text-text-muted">
                  Students selected into the national competitive programming
                  training camp (選訓營)
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-0.5 text-lg">🎓</span>
              <div>
                <p className="font-bold">
                  Top University Special Admissions
                </p>
                <p className="text-sm text-text-muted">
                  Multiple students admitted to NTHU &amp; NCTU through
                  special talent programs (特殊選才 / 初選才)
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-0.5 text-lg">💼</span>
              <div>
                <p className="font-bold">
                  Big Tech Offers
                </p>
                <p className="text-sm text-text-muted">
                  Multiple students landed offers at Google, Microsoft, and
                  other top tech companies
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Side Projects */}
      <section className="mb-14">
        <h2 className="mb-6 text-2xl font-bold">Projects</h2>
        <div className="rounded-xl border border-border bg-surface p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold">Polkadot JAM Protocol</h3>
              <p className="mt-1 text-sm text-text-muted">
                Sep 2024 &ndash; Present
              </p>
              <p className="mt-1 text-sm leading-relaxed text-text-muted">
                Web3 protocol implementation inspired by the Gray Paper.
                Software engineer on team New-JAMneration. Built with Go and
                Rust.
              </p>
            </div>
            <a
              href="https://github.com/New-JAMneration"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 shrink-0 rounded-full border border-border p-2 transition-all hover:border-primary hover:text-primary"
            >
              <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
            </a>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section>
        <h2 className="mb-4 text-2xl font-bold">Skills</h2>
        <div className="space-y-3">
          <div>
            <p className="mb-1.5 text-sm font-semibold text-text-muted">
              Languages
            </p>
            <div className="flex flex-wrap gap-2">
              {["C++", "Go", "Python", "Rust"].map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-border bg-bg px-3 py-1 text-sm"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-1.5 text-sm font-semibold text-text-muted">
              Domains
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Backend / Infrastructure",
                "System Design",
                "Algorithms",
                "EDA / Routing",
                "Reinforcement Learning",
                "Web3 / Blockchain",
              ].map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-border bg-bg px-3 py-1 text-sm"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-1.5 text-sm font-semibold text-text-muted">
              Human Languages
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Chinese (Native)",
                "English (Fluent)",
                "Japanese (JLPT N2)",
              ].map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-border bg-bg px-3 py-1 text-sm"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
