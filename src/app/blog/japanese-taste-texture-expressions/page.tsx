import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import ArticleBlocks from "@/components/ArticleBlocks";
import { articleMetadata } from "@/lib/seo";
import PostJsonLd from "@/components/PostJsonLd";
import PostMeta from "@/components/PostMeta";
import RelatedPosts from "@/components/RelatedPosts";
import { tasteExpressionsBody } from "@/data/articles/tasteExpressions";

const HREF = "/blog/japanese-taste-texture-expressions";
const TITLE = "日本人吃東西不只說「おいしい」：味道、口感與吃後感的實用日文";
const DESCRIPTION =
  "整理あっさり、こってり、サクサク、もちもち等味道與口感日文，也收錄吃完拉麵後對店員說的自然句子。";

export const metadata: Metadata = articleMetadata(HREF, {
  title: `${TITLE} | 花雪 HanaYukii`,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "article",
  },
});

export default function JapaneseTasteTextureExpressions() {
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
      <ArticleBlocks blocks={tasteExpressionsBody} />
      <RelatedPosts href={HREF} />
    </article>
  );
}
