import type { Metadata } from "next";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Newsreader, Inter_Tight, JetBrains_Mono, Noto_Serif_TC } from "next/font/google";
import { topics } from "@/data/topics";
import ThemeToggle from "@/components/ThemeToggle";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const notoSerifTC = Noto_Serif_TC({
  weight: ["400", "600", "700"],
  variable: "--font-noto-serif-tc",
  display: "swap",
  preload: false,
});

const themeInitScript = `
(() => {
  try {
    const storedTheme = window.localStorage.getItem("hanayukii-theme");
    const theme = storedTheme === "dark" || storedTheme === "stationery" ? storedTheme : "dark";
    document.documentElement.dataset.theme = theme;
  } catch {
    document.documentElement.dataset.theme = "dark";
  }
})();
`;

export const metadata: Metadata = {
  metadataBase: new URL("https://hanayukii.dev"),
  title: "花雪 HanaYukii",
  description:
    "Personal site of 花雪 (HanaYukii) — backend engineer, competitive programmer, and writer.",
  openGraph: {
    title: "花雪 HanaYukii",
    description:
      "Personal site of 花雪 (HanaYukii) — backend engineer, competitive programmer, and writer.",
    url: "https://hanayukii.dev",
    siteName: "花雪 HanaYukii",
    type: "website",
    locale: "zh_TW",
  },
  twitter: {
    card: "summary_large_image",
    title: "花雪 HanaYukii",
    description:
      "Personal site of 花雪 (HanaYukii) — backend engineer, competitive programmer, and writer.",
  },
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
    { href: "/about", label: "About Me", shortLabel: "About" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-surface/90 shadow-[0_1px_0_var(--nav-shadow)]">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-6 py-4">
        <Link
          href="/"
          className="shrink-0 text-xl font-bold text-text transition-colors hover:text-primary sm:text-2xl"
        >
          花雪{" "}
          <span className="hidden font-normal text-text/70 sm:inline">
            (HanaYukii)
          </span>
        </Link>
        <div className="flex min-w-0 items-center gap-3 sm:gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-medium text-text/60 transition-colors hover:text-text sm:text-sm"
            >
              {"shortLabel" in link ? (
                <>
                  <span className="sm:hidden">{link.shortLabel}</span>
                  <span className="hidden sm:inline">{link.label}</span>
                </>
              ) : (
                link.label
              )}
            </Link>
          ))}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

function Footer() {
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
    { label: "Feedback", href: "/feedback", external: false },
    { label: "RSS", href: "/feed.xml", external: true },
  ];

  return (
    <footer className="relative z-10 border-t border-border bg-surface/65">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-3 sm:gap-12">
          {/* Brand */}
          <div>
            <p className="mb-3 text-base font-bold text-text">
              花雪 <span className="font-normal text-text/70">(HanaYukii)</span>
            </p>
            <p className="text-sm leading-relaxed text-text-muted">
              隨興寫喜歡的 topic
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
                    {topic.footerLabel}
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
          <p>&copy; {new Date().getFullYear()} 花雪 HanaYukii</p>
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
    <html
      lang="zh-TW"
      data-theme="dark"
      suppressHydrationWarning
      className={`${newsreader.variable} ${interTight.variable} ${jetbrainsMono.variable} ${notoSerifTC.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-screen flex-col antialiased">
        <Navbar />
        <main className="min-w-0 flex-1">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
