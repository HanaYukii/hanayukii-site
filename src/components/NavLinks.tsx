"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();
  const links = [
    { href: "/#work", label: "專案", active: false },
    { href: "/blog", label: "文章", active: pathname.startsWith("/blog") },
    { href: "/about", label: "關於", active: pathname === "/about" },
  ];
  return links.map((link) => (
    <Link key={link.href} href={link.href} aria-current={link.active ? "page" : undefined}
      className={`site-control nav-link ${link.active ? "is-selected" : ""}`}>
      {link.label}
    </Link>
  ));
}
