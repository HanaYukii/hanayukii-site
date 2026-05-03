import type { Metadata } from "next";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "花雪 HanaYukii",
  description:
    "Personal site of 花雪 (HanaYukii) — backend engineer, competitive programmer, and writer.",
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
};

function Navbar() {
  const links = [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About Me" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-bg/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-text transition-colors hover:text-primary"
        >
          花雪 <span className="font-normal text-text/70">(HanaYukii)</span>
        </Link>
        <div className="flex gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-text/60 transition-colors hover:text-text"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  const topics: { label: string; tag: string }[] = [
    { label: "C++ / 系統", tag: "C++" },
    { label: "演算法 / CP", tag: "Competitive Programming" },
    { label: "職涯 / 反思", tag: "Career" },
    { label: "投資 / 觀察", tag: "投資" },
    { label: "生活 / 雜談", tag: "Life" },
  ];

  const contacts: { label: string; href: string; external: boolean }[] = [
    { label: "GitHub", href: "https://github.com/HanaYukii", external: true },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/erh-hsuan-lu-a9b0681ba/",
      external: true,
    },
    {
      label: "Codeforces",
      href: "https://codeforces.com/profile/HanaYukii",
      external: true,
    },
    {
      label: "Coffee Chat",
      href: "https://calendly.com/islu245777/30min",
      external: true,
    },
    { label: "Email", href: "mailto:islu245777@gmail.com", external: true },
    { label: "RSS", href: "/feed.xml", external: true },
  ];

  return (
    <footer className="relative z-10 border-t border-border bg-bg/80">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-3 sm:gap-12">
          {/* Brand */}
          <div>
            <p className="mb-3 text-base font-bold text-text">
              花雪 <span className="font-normal text-text/70">(HanaYukii)</span>
            </p>
            <p className="text-sm leading-relaxed text-text-muted">
              工程師、競賽選手，
              <br />
              寫一些自己有感的東西。
            </p>
            <p className="mt-4 text-xs italic text-accent/80">
              Starmine, still becoming.
            </p>
          </div>

          {/* 主題 */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-text/60">
              主題
            </p>
            <ul className="space-y-2.5 text-sm">
              {topics.map((topic) => (
                <li key={topic.tag}>
                  <Link
                    href={`/blog?tag=${encodeURIComponent(topic.tag)}`}
                    className="text-text-muted transition-colors hover:text-text"
                  >
                    {topic.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/blog"
                  className="text-text-muted transition-colors hover:text-primary"
                >
                  所有文章 &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* 連絡 */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-text/60">
              連絡
            </p>
            <ul className="space-y-2.5 text-sm">
              {contacts.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    target={c.external ? "_blank" : undefined}
                    rel={c.external ? "noopener noreferrer" : undefined}
                    className="text-text-muted transition-colors hover:text-text"
                  >
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 text-xs text-text-muted sm:flex-row sm:justify-between">
          <p>&copy; 2026 花雪 HanaYukii</p>
          <p>Built with Next.js</p>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW">
      <body className="flex min-h-screen flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
