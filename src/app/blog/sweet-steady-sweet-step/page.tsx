import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import ArticleBlocks from "@/components/ArticleBlocks";
import { articleMetadata } from "@/lib/seo";
import PostJsonLd from "@/components/PostJsonLd";
import PostMeta from "@/components/PostMeta";
import RelatedPosts from "@/components/RelatedPosts";
import { sweetStepBody } from "@/data/articles/sweetStep";

const HREF = "/blog/sweet-steady-sweet-step";
const TITLE = "從歌詞學日文系列 SWEET STEADY - SWEET STEP：在 ありのまま 裡找真正的自己";
const DESCRIPTION =
  "從 SWEET STEADY〈SWEET STEP〉學 ありのまま、強がる、素直、口上常見詞與偶像歌裡的細膩語感。";

export const metadata: Metadata = articleMetadata(HREF, {
  title: `${TITLE} | 花雪 HanaYukii`,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "article",
  },
});

export default function SweetSteadySweetStep() {
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
      <ArticleBlocks blocks={sweetStepBody} />
      <RelatedPosts href={HREF} />
    </article>
  );
}
