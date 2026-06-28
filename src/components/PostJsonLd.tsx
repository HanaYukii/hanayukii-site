import { getPostByHref, SITE_URL, AUTHOR } from "@/lib/seo";

// Emits BlogPosting + BreadcrumbList structured data for a blog post,
// sourced from its entry in src/data/posts.ts. Render once near the top
// of the post's <article>. No-op if the href isn't in the registry.
export default function PostJsonLd({ href }: { href: string }) {
  const post = getPostByHref(href);
  if (!post) return null;

  const url = `${SITE_URL}${href}`;
  const author = { "@type": "Person", name: AUTHOR, url: `${SITE_URL}/about` };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.summary,
        datePublished: new Date(post.date).toISOString(),
        dateModified: new Date(post.updated ?? post.date).toISOString(),
        keywords: post.tags.join(", "),
        inLanguage: "zh-TW",
        url,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        image: `${SITE_URL}/opengraph-image`,
        author,
        publisher: { "@type": "Person", name: AUTHOR, url: SITE_URL },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
