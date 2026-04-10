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

      {/* Get in Touch */}
      <FadeIn>
        <section className="mb-14">
          <h2 className="mb-4 text-2xl font-bold">Get in Touch</h2>
          <p className="mb-4 text-text-muted">
            I&apos;m always up for interesting work, side projects, or just a
            good conversation. If you want to talk about backend systems,
            competitive programming, idols, or Japan travel, feel free to
            reach out.
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
      </FadeIn>

      {/* Quick Facts */}
      <FadeIn>
        <section className="mb-14">
          <h2 className="mb-5 text-2xl font-bold">At a Glance</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { label: "Current Role", value: "Tech Lead @ AI Startup (under NDA)" },
              { label: "Previous", value: "Software Engineer @ Google (3 yrs)" },
              { label: "Education", value: "M.S. CS, NCTU" },
              { label: "Languages", value: "中文 · English · 日本語 (N2)" },
              { label: "Competitive Programming", value: "ICPC Gold · Codeforces IM (2350) · LeetCode ~2800" },
              { label: "Open Source", value: "Polkadot JAM Protocol - 747+ commits" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-border bg-surface/40 px-4 py-3 backdrop-blur-sm"
              >
                <p className="text-xs font-medium text-text-muted">
                  {item.label}
                </p>
                <p className="font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
        </section>
      </FadeIn>

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
              "Backend Engineer",
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

    </div>
  );
}
