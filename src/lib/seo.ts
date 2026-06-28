import type { Metadata } from "next";
import { posts, type Post } from "@/data/posts";

export const SITE_URL = "https://hanayukii.dev";
export const AUTHOR = "花雪 HanaYukii";

export function getPostByHref(href: string): Post | undefined {
  return posts.find((p) => p.href === href);
}

// Merge article-specific SEO fields onto a post's hand-written metadata, sourcing
// publish date / tags from the single source of truth in src/data/posts.ts.
export function articleMetadata(href: string, base: Metadata): Metadata {
  const post = getPostByHref(href);

  const og: Record<string, unknown> = {
    type: "article",
    url: href,
    ...(base.openGraph ?? {}),
  };
  if (post) {
    og.publishedTime = new Date(post.date).toISOString();
    og.modifiedTime = new Date(post.updated ?? post.date).toISOString();
    og.authors = [`${SITE_URL}/about`];
    og.tags = post.tags;
  }

  const twTitle =
    (og.title as string | undefined) ??
    (base.title as unknown as string | undefined) ??
    undefined;
  const twDesc = (og.description as string | undefined) ?? base.description ?? undefined;

  return {
    ...base,
    alternates: { canonical: href, ...(base.alternates ?? {}) },
    openGraph: og as unknown as Metadata["openGraph"],
    twitter: {
      card: "summary_large_image",
      title: twTitle,
      description: twDesc ?? undefined,
      ...(base.twitter ?? {}),
    },
  };
}
