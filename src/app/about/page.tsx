import type { Metadata } from "next";
import AboutContent from "./AboutContent";

const DESCRIPTION =
  "花雪 HanaYukii：ex-Google 工程師，目前在 AI 新創做技術研發，程式競賽 ICPC Gold／Codeforces IM，也做 Web3。";

export const metadata: Metadata = {
  title: "About | 花雪 HanaYukii",
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About | 花雪 HanaYukii",
    description: DESCRIPTION,
    url: "/about",
    type: "profile",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "花雪 HanaYukii",
  alternateName: ["Erh-Hsuan Lu", "HanaYukii"],
  url: "https://hanayukii.dev",
  description:
    "Ex-Google engineer working in R&D at an AI startup, competitive programmer (ICPC Gold, Codeforces 2300+, LeetCode 2800+), Web3 protocol contributor.",
  knowsAbout: [
    "C++",
    "Systems Engineering",
    "Competitive Programming",
    "Algorithms",
    "AI",
    "Web3",
    "Polkadot JAM",
  ],
  alumniOf: [
    {
      "@type": "Organization",
      name: "Google Cloud",
    },
  ],
  sameAs: [
    "https://github.com/HanaYukii",
    "https://www.linkedin.com/in/erh-hsuan-lu-a9b0681ba/",
    "https://codeforces.com/profile/HanaYukii",
    "https://leetcode.com/u/HanaYukii/",
    "https://atcoder.jp/users/HanaYukii",
  ],
};

export default function About() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <AboutContent />
    </>
  );
}
