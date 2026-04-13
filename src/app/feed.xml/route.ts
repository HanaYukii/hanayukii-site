import { posts } from "@/data/posts";

const SITE_URL = "https://hanayukii.dev";

export function GET() {
  const publishedPosts = posts.filter((p) => p.href && p.date !== "Draft");

  const items = publishedPosts
    .map(
      (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}${post.href}</link>
      <guid>${SITE_URL}${post.href}</guid>
      <description>${escapeXml(post.summary)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>花雪 HanaYukii</title>
    <link>${SITE_URL}/blog</link>
    <description>Backend engineer, competitive programmer, and writer.</description>
    <language>zh-TW</language>
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
