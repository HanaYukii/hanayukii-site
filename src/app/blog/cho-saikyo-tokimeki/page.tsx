import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import ArticleBlocks from "@/components/ArticleBlocks";
import { articleMetadata } from "@/lib/seo";
import PostJsonLd from "@/components/PostJsonLd";
import RelatedPosts from "@/components/RelatedPosts";
import { choSaikyoBody } from "@/data/articles/choSaikyo";

const HREF = "/blog/cho-saikyo-tokimeki";
const TITLE = "從〈超最強〉學日文：偶像把『推し活』唱成一首歌";
const DESCRIPTION =
  "從超ときめき♡宣伝部〈超最強〉學推し活、布教、トレカ、レス、尊い、過去一等偶像歌常見日文，理解かわいい call 和推し活的雙向循環。";

export const metadata: Metadata = articleMetadata(HREF, {
  title: `${TITLE} | 花雪 HanaYukii`,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "article",
  },
});

export default function ChoSaikyoTokimeki() {
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
        <p className="mb-8 text-sm text-text-muted">2026-07-06</p>
      </FadeIn>
      <ArticleBlocks blocks={choSaikyoBody} />
      <RelatedPosts href={HREF} />
    </article>
  );
}
