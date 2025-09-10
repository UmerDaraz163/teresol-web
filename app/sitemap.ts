import { MetadataRoute } from "next";
import pool from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.teresol.com";

  // ✅ Static routes
  const routes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/services",
    "/contact",
    "/careers",
    "/products",
    "/blog", // blog listing page
    "/team", // team listing page
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  let blogPostUrls: MetadataRoute.Sitemap = [];
  let jobUrls: MetadataRoute.Sitemap = [];
  let teamUrls: MetadataRoute.Sitemap = [];

  try {
    // ✅ Blogs from DB
    const [posts]: any[] = await pool.query(
      `SELECT slug, created_at as updated_at FROM blogs ORDER BY created_at DESC`
    );

    blogPostUrls = posts.map((post: any) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updated_at).toISOString(),
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    // ✅ Jobs from DB
    const [jobs]: any[] = await pool.query(
      `SELECT id, created_at FROM jobs ORDER BY created_at DESC`
    );

    jobUrls = jobs.map((job: any) => ({
      url: `${baseUrl}/careers/${job.id}`,
      lastModified: new Date(job.created_at).toISOString(),
      changeFrequency: "weekly",
      priority: 0.6,
    }));

    // ✅ Team from static array
    const team = [
      { slug: "dr-muhammad-faisal-khan" },
      { slug: "dr-naveed-iqbal" },
      { slug: "dr-ahmad-muqeem-sheri" },
      { slug: "mansoor-ahmad-khan" },
      { slug: "farooq-umer-khan" },
      { slug: "dr-bilal-rauf" },
      { slug: "aamir-masood" },
      { slug: "babar-amin" },
      { slug: "air-cdre-asim-adnan-r" },
      { slug: "col-abdul-rauf-sim-r" },
    ];

    teamUrls = team.map((member) => ({
      url: `${baseUrl}/team/${member.slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.6,
    }));
  } catch (err) {
    console.error("Skipping DB sitemap generation (DB not available):", err);
  }

  return [...routes, ...blogPostUrls, ...jobUrls, ...teamUrls];
}
