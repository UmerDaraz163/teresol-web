import { MetadataRoute } from "next";
import pool from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.teresol.com";

  // Static pages
  const routes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/services",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  let blogPostUrls: MetadataRoute.Sitemap = [];

  try {
    const [posts]: any[] = await pool.query(
      `SELECT slug, created_at as updated_at FROM blogs ORDER BY created_at DESC`
    );

    blogPostUrls = posts.map((post: any) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updated_at).toISOString(),
      changeFrequency: "weekly",
      priority: 0.7,
    }));
  } catch (err) {
    console.error("Skipping DB sitemap generation (DB not available):", err);
  }

  return [...routes, ...blogPostUrls];
}
