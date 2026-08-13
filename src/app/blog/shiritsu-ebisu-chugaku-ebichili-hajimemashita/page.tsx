import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import ArticleBlocks from "@/components/ArticleBlocks";
import { articleMetadata } from "@/lib/seo";
import PostJsonLd from "@/components/PostJsonLd";
import RelatedPosts from "@/components/RelatedPosts";
import { ebichiliBody } from "@/data/articles/ebichili";

const HREF = "/blog/shiritsu-ebisu-chugaku-ebichili-hajimemashita";
const TITLE = "蝦中是什麼？〈えびチリ、はじめました〉日文筆記";
const DESCRIPTION =
  "從私立恵比寿中学簡稱「エビ中」的由來開始，拆解〈えびチリ、はじめました〉裡的町中華、中文、麻將、南美國名、流行甜點與實用口語。";

export const metadata: Metadata = articleMetadata(HREF, {
  title: `${TITLE} | 花雪 HanaYukii`,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "article",
  },
});

export default function ShiritsuEbisuChugakuEbichili() {
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
        <p className="mb-8 text-sm text-text-muted">2026-07-12</p>
      </FadeIn>
      <ArticleBlocks blocks={ebichiliBody} />
      <RelatedPosts href={HREF} />
    </article>
  );
}
