import type { MetadataRoute } from "next";
import { posts } from "@/data/posts";

const SITE_URL = "https://hanayukii.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const published = posts.filter((p) => p.href);
  // newest published date drives the home/blog index freshness (stable, not build-time)
  const latest = published.reduce(
    (max, p) => (p.date > max ? p.date : max),
    "2024-01-01",
  );
  const latestDate = new Date(latest);

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: latestDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: latestDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date("2026-06-28"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/tutoring`,
      lastModified: new Date("2026-06-28"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const articlePages: MetadataRoute.Sitemap = published.map((p) => ({
    url: `${SITE_URL}${p.href}`,
    lastModified: new Date(p.updated ?? p.date),
    changeFrequency: "monthly" as const,
    priority: p.hot ? 0.9 : 0.7,
  }));

  return [...staticPages, ...articlePages];
}
