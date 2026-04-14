import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <FadeIn>
        <h1 className="mb-3 text-4xl font-extrabold tracking-tight">
          About Me
        </h1>
        <p className="mb-12 text-text-muted">
          継続は力なり (Perseverance is power)
        </p>
      </FadeIn>

      {/* Intro */}
      <FadeIn>
        <section className="mb-14">
          <p className="text-lg leading-relaxed text-text-muted">
            I&apos;m{" "}
            <strong className="text-text">花雪 (HanaYukii)</strong>.
            Competitive programming background, into algorithms and math.
            Worked at Google, now building at an AI startup and contributing to a Web3 protocol.
            I write about topics I find interesting here, from C++ and system design
            to idols, F1, and Japan trips.
          </p>
        </section>
      </FadeIn>

      {/* Work & Education */}
      <FadeIn>
        <section className="mb-14">
          <h2 className="mb-5 text-2xl font-bold">Background</h2>
          <div className="space-y-3">
            {[
              { period: "2025 –", role: "Tech Lead, Software Engineer", place: "AI Startup (under NDA)", current: true },
              { period: "2022 – 2025", role: "Software Engineer", place: "Google · Cloud Infrastructure" },
              { period: "2020", role: "Software Engineer Intern", place: "Synopsys" },
              { period: "2020 – 2022", role: "M.S. Computer Science", place: "NCTU / NYCU" },
              { period: "2016 – 2020", role: "B.S. Computer Science", place: "NCTU / NYCU" },
            ].map((item, i) => (
              <div key={i} className="flex items-baseline gap-4">
                <span className="shrink-0 w-24 text-xs font-medium text-text-muted">{item.period}</span>
                <div className="min-w-0">
                  <span className="font-semibold">{item.role}</span>
                  <span className="text-text-muted"> · {item.place}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </FadeIn>

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
      <section className="mb-14">
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
                  "Software Engineering",
                  "System Design",
                  "Algorithms",
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

      {/* Beyond Code */}
      <section className="mb-14">
        <FadeIn>
          <h2 className="mb-2 text-2xl font-bold">Beyond Code</h2>
          <p className="mb-6 text-sm text-text-muted">
            Things I actually spend time on outside of work.
          </p>
        </FadeIn>

        <div className="space-y-4">
          {[
            {
              icon: "🎤",
              title: "日系偶像",
              text: [
                <>
                  2025 是很低潮的一年，也從偶像那邊獲得很多能量。
                  平時有在關注 <strong className="text-text">私立恵比寿中学</strong>、
                  <strong className="text-text">高嶺のなでしこ</strong>、=LOVE、
                  <strong className="text-text">ukka</strong> 以及{" "}
                  <strong className="text-text">TPE48</strong> 等日系偶像團體。
                </>,
                <>
                  十餘年看過很多現場，追星之餘也持續拿來練日文，看 blog、了解歌詞都是很好的學習素材。
                </>,
              ],
            },
            {
              icon: "🏎️⚾",
              title: "F1 & 棒球",
              text: [
                <>
                  F1 忠實觀眾，喜歡高速感跟策略博弈，目前想找機會去亞洲鄰近的鈴鹿跟新加坡站看現場。
                </>,
                <>
                  同時熱愛棒球，曾在日本與美國的球場看過比賽，喜歡感受現場熱血的氛圍。
                </>,
              ],
            },
            {
              icon: "🚴",
              title: "公路車",
              text: [
                <>
                  主要運動是騎公路車，喜歡研究裝備、規劃路線，長騎也是放空的好方式。
                </>,
              ],
            },
            {
              icon: "📈",
              title: "投資",
              text: [
                <>
                  長期投資加密貨幣跟股票。本身也在做 Web3
                  開發，所以對 protocol 的理解不只停在投資面，期待加密牛市早日回歸。
                </>,
              ],
            },
            {
              icon: "✈️",
              title: "日本旅遊",
              text: [
                <>
                  常去日本，通常是配合偶像的 live 順便旅遊，希望跟著偶像一起走遍日本各地。
                  喜歡自由行跟AI一起排行程。
                </>,
              ],
            },
          ].map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.05}>
              <div className="rounded-xl border border-border bg-surface/40 p-6 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-surface-hover">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-lg">{item.icon}</span>
                  <h3 className="text-lg font-bold">{item.title}</h3>
                </div>
                {item.text.map((t, j) => (
                  <p
                    key={j}
                    className="mt-2 text-sm leading-relaxed text-text-muted"
                  >
                    {t}
                  </p>
                ))}
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Personal Tags */}
      <FadeIn>
        <section className="mb-14">
          <div className="flex flex-wrap gap-2">
            {[
              "偶像宅",
              "F1",
              "公路車",
              "Crypto",
              "日本旅遊",
              "日本語 N2",
              "Competitive Programming",
              "Software Engineer",
            ].map((tag, i) => (
              <span
                key={tag}
                className={`rounded-full border px-3 py-1 text-sm font-medium ${
                  [
                    "border-primary/20 bg-primary/5 text-primary",
                    "border-accent/20 bg-accent/5 text-accent",
                    "border-primary/20 bg-primary/5 text-primary",
                    "border-warm/20 bg-warm/5 text-warm",
                    "border-accent/20 bg-accent/5 text-accent",
                    "border-primary/20 bg-primary/5 text-primary",
                    "border-warm/20 bg-warm/5 text-warm",
                    "border-accent/20 bg-accent/5 text-accent",
                  ][i % 8]
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* Get in Touch */}
      <FadeIn>
        <section className="mb-14">
          <h2 className="mb-4 text-2xl font-bold">Get in Touch</h2>
          <p className="mb-4 text-text-muted">
            I&apos;m always open to interesting work, side projects, or just a
            good coffee chat. Feel free to reach out.
          </p>
          <div className="flex flex-wrap gap-3">
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
            <a
              href="https://codeforces.com/profile/HanaYukii"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium transition-all hover:border-primary hover:text-primary"
            >
              Codeforces
              <svg className="h-3 w-3 opacity-40" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l6-6m0 0H4m5 0v5"/></svg>
            </a>
            <a
              href="https://leetcode.com/u/HanaYukii/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium transition-all hover:border-primary hover:text-primary"
            >
              LeetCode
              <svg className="h-3 w-3 opacity-40" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l6-6m0 0H4m5 0v5"/></svg>
            </a>
          </div>
        </section>
      </FadeIn>

      {/* Teaching */}
      <FadeIn>
        <section className="mb-14">
          <h2 className="mb-4 text-2xl font-bold">Teaching</h2>
          <p className="mb-3 text-sm text-text-muted">
            有幾年演算法教學經驗，教過從高中競賽到業界面試準備。過去學生有入選 TOI 選訓營、透過特殊選才錄取清交、拿到 Google / Microsoft offer 等。
          </p>
          <p className="text-sm text-text-muted">
            有興趣可以聊聊：
            <a href="mailto:islu245777@gmail.com" className="text-primary hover:underline ml-1">islu245777@gmail.com</a>
          </p>
        </section>
      </FadeIn>

    </div>
  );
}
