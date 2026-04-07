import type { Metadata } from "next";
import Link from "next/link";
import MouseGlow from "@/components/MouseGlow";
import ParticleGrid from "@/components/ParticleGrid";
import "./globals.css";

export const metadata: Metadata = {
  title: "花雪 HanaYukii",
  description:
    "Personal site of 花雪 (HanaYukii) — backend engineer, competitive programmer, and writer.",
};

function Navbar() {
  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/experience", label: "Experience" },
    { href: "/blog", label: "Blog" },
    { href: "/tutoring", label: "Tutoring" },
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
  return (
    <footer className="relative z-10 border-t border-border bg-bg/80">
      <div className="mx-auto max-w-4xl px-6 py-8 text-center text-sm text-text-muted">
        <div className="mb-3 flex justify-center gap-5">
          <a
            href="https://github.com/HanaYukii"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-text"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/erh-hsuan-lu-a9b0681ba/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-text"
          >
            LinkedIn
          </a>
          <a
            href="https://codeforces.com/profile/HanaYukii"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-text"
          >
            Codeforces
          </a>
        </div>
        <p>&copy; 2026 花雪 HanaYukii</p>
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
        <ParticleGrid />
        <MouseGlow />
        <Navbar />
        <main className="relative z-10 flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
