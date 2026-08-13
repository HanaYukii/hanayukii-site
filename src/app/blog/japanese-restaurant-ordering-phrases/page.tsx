import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import ArticleBlocks from "@/components/ArticleBlocks";
import { articleMetadata } from "@/lib/seo";
import PostJsonLd from "@/components/PostJsonLd";
import PostMeta from "@/components/PostMeta";
import RelatedPosts from "@/components/RelatedPosts";
import { restaurantOrderingBody } from "@/data/articles/restaurantOrdering";

const HREF = "/blog/japanese-restaurant-ordering-phrases";
const TITLE = "日本店員到底在問什麼？從點餐、加購到結帳的實用回答";
const DESCRIPTION =
  "從進店、點餐、套餐與袋子一路到結帳，整理日本餐廳、咖啡店和便利商店常見問句、自然回答與店規注意事項。";

export const metadata: Metadata = articleMetadata(HREF, {
  title: `${TITLE} | 花雪 HanaYukii`,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "article",
  },
});

export default function JapaneseRestaurantOrderingPhrases() {
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
        <h1 className="mb-4 text-4xl font-bold tracking-tight">{TITLE}</h1>
        <PostMeta href={HREF} />
      </FadeIn>
      <ArticleBlocks blocks={restaurantOrderingBody} />
      <RelatedPosts href={HREF} />
    </article>
  );
}
