import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import ArticleBlocks from "@/components/ArticleBlocks";
import { articleMetadata } from "@/lib/seo";
import PostJsonLd from "@/components/PostJsonLd";
import RelatedPosts from "@/components/RelatedPosts";
import { countryNamesBody } from "@/data/articles/countryNames";

const HREF = "/blog/japanese-country-names";
const DESCRIPTION =
  "整理ドイツ、イギリス、オランダ等日文國名的來源，以及米・英・独・仏等縮寫、「国」的讀法和常見後綴。";

export const metadata: Metadata = articleMetadata(HREF, {
  title: "日文國名整理 | 花雪 HanaYukii",
  description: DESCRIPTION,
  openGraph: {
    title: "日文國名整理",
    description: DESCRIPTION,
    type: "article",
  },
});

export default function JapaneseCountryNames() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <PostJsonLd href={HREF} />
      <FadeIn>
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-1 text-sm text-text-muted transition-colors hover:text-primary"
        >
          &larr; Back to Blog
        </Link>
        <h1 className="mb-4 text-4xl font-bold tracking-tight">日文國名整理</h1>
        <p className="mb-8 text-sm text-text-muted">2026-07-20</p>
      </FadeIn>
      <ArticleBlocks blocks={countryNamesBody} />
      <RelatedPosts href={HREF} />
    </article>
  );
}
