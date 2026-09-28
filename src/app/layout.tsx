import type { Metadata } from "next";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Newsreader, Inter_Tight, JetBrains_Mono, Noto_Serif_TC } from "next/font/google";
import { topics } from "@/data/topics";
import ThemeToggle from "@/components/ThemeToggle";
import Mark from "@/components/Mark";
import NavLinks from "@/components/NavLinks";
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
    const storedTheme = window.localStorage.getItem("hanayukii-theme-v3");
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
    "Personal site of 花雪 (HanaYukii) — Senior Staff Engineer, competitive programmer, and writer.",
  openGraph: {
    title: "花雪 HanaYukii",
    description:
      "Personal site of 花雪 (HanaYukii) — Senior Staff Engineer, competitive programmer, and writer.",
    url: "https://hanayukii.dev",
    siteName: "花雪 HanaYukii",
    type: "website",
    locale: "zh_TW",
  },
  twitter: {
    card: "summary_large_image",
    title: "花雪 HanaYukii",
    description:
      "Personal site of 花雪 (HanaYukii) — Senior Staff Engineer, competitive programmer, and writer.",
  },
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
};

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-surface/90 shadow-[0_1px_0_var(--nav-shadow)]">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-6 py-4">
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2.5 text-xl font-bold text-text transition-colors hover:text-primary sm:text-2xl"
        >
          <Mark className="h-5 w-5 shrink-0 text-accent sm:h-[1.375rem] sm:w-[1.375rem]" />
          <span>
            花雪{" "}
            <span className="hidden font-normal text-text/70 sm:inline">
              (HanaYukii)
            </span>
          </span>
        </Link>
        <div className="flex min-w-0 items-center gap-1 sm:gap-3">
          <NavLinks />
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
      <div className="mx-auto max-w-4xl px-6 py-7 sm:py-8">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <Link href="/" className="inline-flex items-center gap-2 text-base font-semibold hover:text-primary">
            <Mark className="h-4 w-4 text-accent" />
            花雪 <span className="font-normal text-text-muted">HanaYukii</span>
          </Link>
          <p className="text-sm text-text-muted">隨興寫喜歡的東西</p>
        </div>
        <div className="grid gap-3 border-y border-border py-4">
          <nav aria-label="頁尾文章分類" className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
            <span className="text-sm text-text-muted">文章</span>
            {topics.map((topic) => (
              <Link key={topic.tag} href={`/blog?tag=${encodeURIComponent(topic.tag)}`}
                className="inline-flex min-h-9 items-center text-sm text-text-muted hover:text-primary">
                {topic.footerLabel}
              </Link>
            ))}
            <Link href="/blog" className="inline-flex min-h-9 items-center text-sm text-primary hover:underline">所有文章 →</Link>
          </nav>
          <nav aria-label="聯絡與訂閱" className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
            {contacts.map((contact) => (
              <a key={contact.label} href={contact.href}
                target={contact.external ? "_blank" : undefined}
                rel={contact.external ? "noopener noreferrer" : undefined}
                className="inline-flex min-h-9 items-center text-sm text-text-muted hover:text-primary">
                {contact.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="mt-4 flex flex-wrap justify-between gap-2 text-sm text-text-muted">
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
      data-scroll-behavior="smooth"
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
