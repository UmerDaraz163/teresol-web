// app/admin/blogs/edit/[slug]/page.tsx
import { notFound } from 'next/navigation';
import pool from '@/lib/db';
import EditBlogForm from '@/components/EditBlogForm';
import { JSX } from 'react';

// Define Blog type
type Blog = {
  id: number;
  title: string;
  slug: string;
  short_desc: string | null;
  content: string | null;
  image_url: string | null;
  author: string | null;
  read_time: string | null;
  category: string | null;
  is_featured: boolean | null;
};

// --- FIX 1: Tell TypeScript that 'params' is a Promise ---
// This makes the TypeScript error go away.
type EditBlogPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function EditBlogPage({
  params,
}: EditBlogPageProps): Promise<JSX.Element> {

  // --- FIX 2: Await the 'params' Promise to get the object ---
  // This makes the Next.js runtime error go away.
  const { slug } = await params;

  let blog: Blog | null = null;

  try {
    const [rows]: any = await pool.query(
      `SELECT id, title, short_desc, content, image_url, author, read_time, category, is_featured
       FROM blogs WHERE slug = ? LIMIT 1`,
      [slug]
    );

    if (!rows || rows.length === 0) {
      notFound();
    }

    blog = rows[0];
  } catch (error) {
    console.error('Failed to fetch blog:', error);
    notFound();
  }

  if (!blog) {
    notFound();
  }

  return <EditBlogForm blog={blog} />;
}