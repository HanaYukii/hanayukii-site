import AboutContent from "./AboutContent";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "花雪 HanaYukii",
  alternateName: ["Erh-Hsuan Lu", "HanaYukii"],
  url: "https://hanayukii.dev",
  jobTitle: "Senior Staff Engineer",
  description:
    "Ex-Google engineer, Senior Staff Engineer at an AI startup, competitive programmer (ICPC Gold, Codeforces 2300+, LeetCode 2800+), Web3 protocol contributor.",
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
