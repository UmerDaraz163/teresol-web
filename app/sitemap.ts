// app/sitemap.ts

import { MetadataRoute } from 'next';
import pool from '@/lib/db'; // Your MySQL connection

// Define a type for the blog post data we'll fetch
type Post = {
  slug: string;
  updated_at: string; // Or 'created_at' if you don't have an update timestamp
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.teresol.com'; // Replace with your actual domain

  // 1. Fetch all blog post slugs from your database
  const [posts]: any[] = await pool.query(
    `SELECT slug, created_at as updated_at FROM blogs ORDER BY created_at DESC`
  );

  // 2. Map the fetched data to the sitemap format
  const blogPostUrls = posts.map((post: Post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updated_at).toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // 3. Define your static pages
  const staticUrls = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
  ];

  // 4. Combine static and dynamic URLs and return
  return [...staticUrls, ...blogPostUrls];
}
