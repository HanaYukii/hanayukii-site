import { posts } from "@/data/posts";

const SITE_URL = "https://hanayukii.dev";

export function GET() {
  const publishedPosts = posts.filter((p) => p.href);

  const newest = publishedPosts.reduce(
    (max, p) => (p.date > max ? p.date : max),
    publishedPosts[0]?.date ?? "2024-01-01",
  );

  const items = publishedPosts
    .map(
      (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}${post.href}</link>
      <guid isPermaLink="true">${SITE_URL}${post.href}</guid>
      <description>${escapeXml(post.summary)}</description>
      <dc:creator>花雪 HanaYukii</dc:creator>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
${post.tags
  .map((t) => `      <category>${escapeXml(t)}</category>`)
  .join("\n")}
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>花雪 HanaYukii</title>
    <link>${SITE_URL}/blog</link>
    <description>Senior Staff Engineer, competitive programmer, and writer.</description>
    <language>zh-TW</language>
    <lastBuildDate>${new Date(newest).toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}

function escapeXml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
