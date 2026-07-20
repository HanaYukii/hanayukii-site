"use client";

import { useState } from "react";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

type Lang = "zh" | "en";

type LinkItem = { label: string; href: string };

// muted, ·-separated inline links; internal hrefs (starting "/") use next/link
function InlineLinks({ items }: { items: LinkItem[] }) {
  return (
    <span className="text-sm text-text-muted">
      {items.map((item, i) => (
        <span key={item.href}>
          {i > 0 && <span className="mx-2 opacity-40">·</span>}
          {item.href.startsWith("/") ? (
            <Link href={item.href} className="inline-block py-1 transition-colors hover:text-primary">
              {item.label}
            </Link>
          ) : (
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block py-1 transition-colors hover:text-primary"
            >
              {item.label}
            </a>
          )}
        </span>
      ))}
    </span>
  );
}

const cpBadges = [
  { text: "ICPC Taipei Regional Gold — Team Leader & Main Coder (2020)", color: "bg-accent/10 text-accent" },
  { text: "Codeforces 2300+ — International Master (Top 0.5%)", color: "bg-primary/10 text-primary" },
  { text: "LeetCode 2800+ — Guardian", color: "bg-primary/10 text-primary" },
  { text: "AtCoder 2000+ — 1 Dan", color: "bg-primary/10 text-primary" },
  { text: "Google Code Jam Round 3 (x2)", color: "bg-accent/10 text-accent" },
  { text: "Meta Hacker Cup Round 3 (x3)", color: "bg-accent/10 text-accent" },
  { text: "Google Kick Start — Invited to Google Visit Program (2020)", color: "bg-accent/10 text-accent" },
];

const cpLinks: LinkItem[] = [
  { label: "Codeforces", href: "https://codeforces.com/profile/HanaYukii" },
  { label: "LeetCode", href: "https://leetcode.com/u/HanaYukii/" },
  { label: "AtCoder", href: "https://atcoder.jp/users/HanaYukii" },
  { label: "Solutions", href: "https://github.com/HanaYukii/Competitive-Programming" },
];

type Project = { period: string; name: string; blurb: string; links: LinkItem[] };

const projects: Record<Lang, Project[]> = {
  zh: [
    {
      period: "2024 –",
      name: "Polkadot JAM Protocol",
      blurb: "Web3 Foundation 的 JAM contest 參賽隊，repo 核心成員（95★）；我主要寫實作和文件。",
      links: [{ label: "GitHub", href: "https://github.com/New-JAMneration/JAM-Protocol" }],
    },
    {
      period: "2026 –",
      name: "Jabiko",
      blurb: "和朋友做的 JLPT 自習網站，從動詞變化練到 N1 文法，會自動盯錯題複習，打開就能用。",
      links: [
        { label: "jabiko.pages.dev", href: "https://jabiko.pages.dev/" },
        { label: "介紹", href: "/blog/jabiko-jlpt-app" },
      ],
    },
  ],
  en: [
    {
      period: "2024 –",
      name: "Polkadot JAM Protocol",
      blurb: "Web3 Foundation JAM contest team — one of the core repo contributors (95★), a lot of the implementation and docs.",
      links: [{ label: "GitHub", href: "https://github.com/New-JAMneration/JAM-Protocol" }],
    },
    {
      period: "2026 –",
      name: "Jabiko",
      blurb: "A JLPT self-study site I built with a friend — from verb conjugation up to N1 grammar, with automatic spaced review of missed questions.",
      links: [
        { label: "jabiko.pages.dev", href: "https://jabiko.pages.dev/" },
        { label: "Write-up", href: "/blog/jabiko-jlpt-app" },
      ],
    },
  ],
};

const background = [
  { period: "2025 –", role: "Senior Staff Engineer", place: "AI Startup (under NDA)" },
  { period: "2022 – 2025", role: "Software Engineer", place: "Google · Cloud" },
  { period: "2016 – 2022", role: "B.S. + M.S. CS", place: "NCTU / NYCU" },
];

const skills: Record<Lang, string[]> = {
  zh: ["C++", "Go", "Rust", "Python", "System Design", "Web3", "日本語 N2"],
  en: ["C++", "Go", "Rust", "Python", "System Design", "Web3", "Japanese N2"],
};

const beyondCode: Record<Lang, { icon: string; title: string; text: string }[]> = {
  zh: [
    { icon: "🎤", title: "日系偶像", text: "目前主要追私立恵比寿中学、高嶺のなでしこ、=LOVE、ukka、TPE48 等等，長年也累積了不少日文軟實力。" },
    { icon: "🏎️⚾", title: "F1 & 棒球", text: "F1 忠實觀眾，想找機會去鈴鹿跟新加坡站看現場。也很愛棒球，在日本跟美國都看過球。" },
    { icon: "🚴", title: "公路車", text: "平常騎公路車，喜歡研究裝備跟規劃路線，長騎很適合放空。" },
    { icon: "📈", title: "投資", text: "有在投資加密貨幣跟股票，本身也在做 Web3 開發，在科技業裡也比較跟得上這塊的動態。" },
    { icon: "✈️", title: "日本旅遊", text: "常去日本，通常是配合偶像的 live 順便旅遊，希望跟著偶像一起走遍日本各地。" },
  ],
  en: [
    { icon: "🎤", title: "J-Pop Idols", text: "Currently following 私立恵比寿中学, 高嶺のなでしこ, =LOVE, ukka, TPE48 and more. Following them for years has got my Japanese to a decent level." },
    { icon: "🏎️⚾", title: "F1 & Baseball", text: "Been watching F1 for years — want to make it to Suzuka or the Singapore GP in person. Big baseball fan too; been to games in Japan and the US." },
    { icon: "🚴", title: "Road Cycling", text: "Ride road bikes regularly — like fiddling with gear and planning routes. Long rides are a good way to zone out." },
    { icon: "📈", title: "Investing", text: "Investing in crypto and equities, and building in Web3 myself. Working in tech, it's easier to stay close to how it develops." },
    { icon: "✈️", title: "Japan Travel", text: "Go to Japan often, usually around idol live shows — hoping to get to most of the prefectures eventually." },
  ],
};

export default function AboutContent() {
  const [lang, setLang] = useState<Lang>("zh");

  const sectionClass = "mt-12 border-t border-border pt-10";

  return (
    <div lang={lang === "zh" ? "zh-Hant" : "en"} className="mx-auto max-w-3xl px-6 py-16">
      {/* ── Lang Toggle ── */}
      <div className="mb-8 flex justify-end">
        <div className="inline-flex rounded-full border border-border p-1 text-sm">
          <button
            type="button"
            aria-pressed={lang === "zh"}
            onClick={() => setLang("zh")}
            className={`rounded-full px-3 py-1 transition-all ${
              lang === "zh" ? "bg-primary text-white" : "text-text-muted hover:text-text"
            }`}
          >
            中文
          </button>
          <button
            type="button"
            aria-pressed={lang === "en"}
            onClick={() => setLang("en")}
            className={`rounded-full px-3 py-1 transition-all ${
              lang === "en" ? "bg-primary text-white" : "text-text-muted hover:text-text"
            }`}
          >
            English
          </button>
        </div>
      </div>

      {/* ── Header ── */}
      <FadeIn>
        <h1 className="mb-3 text-4xl font-bold tracking-tight">About Me</h1>
        <p className="mb-12 text-text-muted">継続は力なり</p>
      </FadeIn>

      {/* ── Intro ── */}
      <FadeIn>
        <section>
          {lang === "zh" ? (
            <p className="text-lg leading-relaxed text-text-muted">
              我是<strong className="text-text">花雪 (HanaYukii)</strong>，<Link href="/blog/cp-career-memoir" className="prose-link">程式競賽</Link>出身，喜歡演算法跟數學。在 <Link href="/blog/leaving-google" className="prose-link">Google 待了三年</Link>後離開，現在在一間 AI 新創做 Senior Staff Engineer，平常也碰 Web3。這個網站隨手記些自己有興趣的東西，想寫啥寫啥。
            </p>
          ) : (
            <p className="text-lg leading-relaxed text-text-muted">
              I&apos;m <strong className="text-text">HanaYukii</strong> — from a{" "}
              <Link href="/blog/cp-career-memoir" className="prose-link">competitive programming</Link>{" "}
              background, and I like algorithms and math. After{" "}
              <Link href="/blog/leaving-google" className="prose-link">three years at Google</Link>{" "}
              I left and joined an AI startup, where I&apos;m now a Senior Staff Engineer. I also build in Web3 and write here about whatever I happen to find interesting.
            </p>
          )}
        </section>
      </FadeIn>

      {/* ── Talk (prominent CTA, surfaced high) ── */}
      <FadeIn>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="https://calendly.com/islu245777/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:brightness-110"
          >
            {lang === "zh" ? "預約 1:1 交流" : "Book a 1:1 chat"}
            <svg aria-hidden="true" className="h-3 w-3 opacity-70" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l6-6m0 0H4m5 0v5" />
            </svg>
          </a>
          <span className="text-sm text-text-muted">
            {lang === "zh" ? "30 分鐘，聊什麼都行。" : "30 minutes, anything goes."}
          </span>
        </div>
      </FadeIn>

      {/* ── Competitive Programming ── */}
      <FadeIn>
        <section className={sectionClass}>
          <h2 className="mb-5 text-2xl font-bold">Competitive Programming</h2>
          <div className="flex flex-wrap gap-2.5">
            {cpBadges.map((badge) => (
              <span key={badge.text} className={`rounded-full px-3 py-1 text-sm font-medium ${badge.color}`}>
                {badge.text}
              </span>
            ))}
          </div>
          <div className="mt-4">
            <InlineLinks items={cpLinks} />
          </div>
        </section>
      </FadeIn>

      {/* ── Projects ── */}
      <FadeIn>
        <section className={sectionClass}>
          <h2 className="mb-5 text-2xl font-bold">Projects</h2>
          <div className="space-y-5">
            {projects[lang].map((p) => (
              <div key={p.name} className="flex gap-4">
                <span className="w-24 shrink-0 pt-0.5 text-xs font-medium text-text-muted">{p.period}</span>
                <div className="min-w-0">
                  <h3 className="font-semibold">{p.name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-text-muted">{p.blurb}</p>
                  <div className="mt-1.5">
                    <InlineLinks items={p.links} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* ── Background ── */}
      <FadeIn>
        <section className={sectionClass}>
          <h2 className="mb-5 text-2xl font-bold">Background</h2>
          <div className="space-y-3">
            {background.map((item) => (
              <div key={item.role} className="flex items-baseline gap-4">
                <span className="w-24 shrink-0 text-xs font-medium text-text-muted">{item.period}</span>
                <div className="min-w-0">
                  <span className="font-semibold">{item.role}</span>
                  <span className="text-text-muted"> · {item.place}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {skills[lang].map((s) => (
              <span key={s} className="rounded-full border border-border bg-surface/40 px-3 py-1 text-sm text-text-muted">{s}</span>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* ── Beyond Code ── */}
      <FadeIn>
        <section className={sectionClass}>
          <h2 className="mb-5 text-2xl font-bold">Beyond Code</h2>
          <ul className="space-y-3">
            {beyondCode[lang].map((item) => (
              <li key={item.title} className="text-sm leading-relaxed text-text-muted">
                <span className="mr-1.5">{item.icon}</span>
                <strong className="font-medium text-text">{item.title}</strong>
                <span> — {item.text}</span>
              </li>
            ))}
          </ul>
        </section>
      </FadeIn>

      {/* ── Contact ── */}
      <FadeIn>
        <section className={sectionClass}>
          <h2 className="mb-5 text-2xl font-bold">Contact</h2>
          <p className="text-sm leading-relaxed text-text-muted">
            {lang === "zh"
              ? "什麼都可以聊。我的經驗能幫上忙就幫，也想跟你學點東西。"
              : "Happy to talk about anything — I'll share what I know if it helps, and I'd like to learn from you too."}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <a
              href="mailto:islu245777@gmail.com"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium transition-all hover:border-primary hover:text-primary"
            >
              islu245777@gmail.com
            </a>
          </div>
          <div className="mt-3">
            <InlineLinks
              items={[
                { label: lang === "zh" ? "預約 1:1 交流" : "Calendly", href: "https://calendly.com/islu245777/30min" },
                { label: "LinkedIn", href: "https://www.linkedin.com/in/erh-hsuan-lu-a9b0681ba/" },
                { label: "GitHub", href: "https://github.com/HanaYukii" },
              ]}
            />
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
