import FadeIn from "@/components/FadeIn";

const ExternalLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-sm font-medium transition-all hover:border-primary hover:text-primary"
  >
    {children}
    <svg className="h-3 w-3 opacity-40" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 9l6-6m0 0H4m5 0v5" />
    </svg>
  </a>
);

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">

      {/* ── Header ── */}
      <FadeIn>
        <h1 className="mb-3 text-4xl font-extrabold tracking-tight">About Me</h1>
        <p className="mb-12 text-text-muted">継続は力なり</p>
      </FadeIn>

      {/* ── Intro ── */}
      <FadeIn>
        <section className="mb-14">
          <p className="text-lg leading-relaxed text-text-muted">
            我是<strong className="text-text">花雪 (HanaYukii)</strong>。
            程式競賽出身，喜歡演算法跟數學。在 Google 待了三年，現在在 AI 新創當 Tech Lead，也有在做 Web3。
            這邊隨興寫自己喜歡的 topic，想寫啥寫啥。
          </p>
        </section>
      </FadeIn>

      {/* ── Competitive Programming ── */}
      <FadeIn>
        <section className="mb-14">
          <h2 className="mb-6 text-2xl font-bold">Competitive Programming</h2>
          <div className="rounded-xl border border-border bg-surface/40 p-6 backdrop-blur-sm">
            <div className="mb-4 flex flex-wrap gap-3">
              {[
                { text: "ICPC Taipei Regional Gold - Team Leader & Main Coder (2020)", color: "bg-accent/10 text-accent" },
                { text: "Google Code Jam Round 3 (x2)", color: "bg-warm/10 text-warm" },
                { text: "Meta Hacker Cup Round 3 (x3)", color: "bg-rose/10 text-rose" },
                { text: "LeetCode ~2800 - Guardian (Top 0.04%)", color: "bg-primary/10 text-primary" },
                { text: "Codeforces 2300+ - International Master (Top 0.5%)", color: "bg-teal-400/10 text-teal-300" },
                { text: "AtCoder 2000+ - 5-Dan", color: "bg-orange-400/10 text-orange-300" },
                { text: "Google Kick Start 2020 - Invited to Google Visit Program", color: "bg-sky/10 text-sky" },
              ].map((badge) => (
                <span key={badge.text} className={`rounded-full px-3 py-1 text-sm font-semibold ${badge.color}`}>
                  {badge.text}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <ExternalLink href="https://codeforces.com/profile/HanaYukii">Codeforces</ExternalLink>
              <ExternalLink href="https://leetcode.com/hanayukii">LeetCode</ExternalLink>
              <ExternalLink href="https://atcoder.jp/users/HanaYukii">AtCoder</ExternalLink>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ── Projects ── */}
      <FadeIn>
        <section className="mb-14">
          <h2 className="mb-6 text-2xl font-bold">Projects</h2>
          <div className="rounded-xl border border-border bg-surface/40 p-6 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-surface-hover">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-bold">Polkadot JAM Protocol</h3>
                  <span className="rounded-full bg-warm/10 px-2 py-0.5 text-xs font-semibold text-warm">94 Stars</span>
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">Top Contributor in Team</span>
                </div>
                <p className="mt-1 text-sm text-text-muted">Sep 2024 – Present</p>
                <p className="mt-1 text-sm leading-relaxed text-text-muted">
                  Web3 Foundation JAM contest 參賽團隊 New-JAMneration 的成員，主要寫核心協議的 code 跟文件。
                </p>
              </div>
              <a
                href="https://github.com/New-JAMneration"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 shrink-0 rounded-full border border-border p-2 transition-all hover:border-primary hover:text-primary"
              >
                <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ── Background ── */}
      <FadeIn>
        <section className="mb-14">
          <h2 className="mb-5 text-2xl font-bold">Background</h2>
          <div className="space-y-3">
            {[
              { period: "2025 –", role: "Tech Lead", place: "AI Startup (under NDA)" },
              { period: "2022 – 2025", role: "Software Engineer", place: "Google · Cloud" },
              { period: "2016 – 2022", role: "B.S. + M.S. CS", place: "NCTU / NYCU" },
            ].map((item, i) => (
              <div key={i} className="flex items-baseline gap-4">
                <span className="w-24 shrink-0 text-xs font-medium text-text-muted">{item.period}</span>
                <div className="min-w-0">
                  <span className="font-semibold">{item.role}</span>
                  <span className="text-text-muted"> · {item.place}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {["C++", "Go", "Rust", "Python", "System Design", "Web3", "日本語 N2"].map((s) => (
              <span key={s} className="rounded-full border border-border bg-surface/40 px-3 py-1 text-sm">{s}</span>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* ── Beyond Code ── */}
      <section className="mb-14">
        <FadeIn>
          <h2 className="mb-6 text-2xl font-bold">Beyond Code</h2>
        </FadeIn>
        <div className="space-y-4">
          {[
            {
              icon: "🎤",
              title: "日系偶像",
              text: "在追私立恵比寿中学、高嶺のなでしこ、=LOVE、ukka、TPE48 等等。看現場十幾年了，順便拿來練日文。",
            },
            {
              icon: "🏎️⚾",
              title: "F1 & 棒球",
              text: "F1 忠實觀眾，想找機會去鈴鹿跟新加坡站看現場。也很愛棒球，在日本跟美國都看過球。",
            },
            {
              icon: "🚴",
              title: "公路車",
              text: "平常騎公路車，喜歡研究裝備跟規劃路線，長騎很適合放空。",
            },
            {
              icon: "📈",
              title: "投資",
              text: "有在投資加密貨幣跟股票，本身也在做 Web3 開發，所以不只是看投資面。",
            },
            {
              icon: "✈️",
              title: "日本旅遊",
              text: "常去日本，通常是配合偶像的 live 順便旅遊，希望跟著偶像一起走遍日本各地。",
            },
          ].map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.05}>
              <div className="rounded-xl border border-border bg-surface/40 p-6 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-surface-hover">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-lg">{item.icon}</span>
                  <h3 className="text-lg font-bold">{item.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-text-muted">{item.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── Contact ── */}
      <FadeIn>
        <section className="mb-14">
          <h2 className="mb-4 text-2xl font-bold">Contact</h2>

          <div className="mb-6 flex flex-wrap gap-3">
            <ExternalLink href="https://www.linkedin.com/in/erh-hsuan-lu-a9b0681ba/">LinkedIn</ExternalLink>
            <ExternalLink href="https://github.com/HanaYukii">GitHub</ExternalLink>
          </div>

          <p className="mb-5 text-sm leading-relaxed text-text-muted">
            想聊的 topic 不限，希望 build up 好的 connection，經驗有機會幫上人，也從交流中學習。如果對演算法家教有興趣也歡迎聯絡。
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://calendly.com/islu245777/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-all hover:brightness-110"
            >
              預約 1:1 交流 (Calendly)
              <svg className="h-3 w-3 opacity-70" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l6-6m0 0H4m5 0v5" />
              </svg>
            </a>
            <a
              href="mailto:islu245777@gmail.com"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium transition-all hover:border-primary hover:text-primary"
            >
              islu245777@gmail.com
            </a>
          </div>
        </section>
      </FadeIn>

    </div>
  );
}
