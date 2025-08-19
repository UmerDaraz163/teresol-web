// app/admin/blogs/edit/[slug]/page.tsx

import { notFound } from 'next/navigation';
import pool from '@/lib/db';
import EditBlogForm from '@/components/EditBlogForm'; // Adjust this import path if needed

// Define a more complete type for the blog data
type Blog = {
  id: number;
  title: string;
  short_desc: string | null;
  content: string | null;
  image_url: string | null;
  author: string | null;
  read_time: string | null;
  category: string | null;
  is_featured: boolean | null;
  slug: string | null;
};

export default async function EditBlogPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  let blog: Blog | null = null;
  try {
    const [rows]: any[] = await pool.query(
      'SELECT * FROM blogs WHERE slug = ?',
      [slug]
    );
    if (rows.length > 0) {
      // Convert the is_featured field from 0/1 to boolean
      blog = { ...rows[0], is_featured: !!rows[0].is_featured };
    }
  } catch (error) {
    console.error("Failed to fetch blog for editing:", error);
  }

  if (!blog) {
    notFound();
  }

  return <EditBlogForm blog={blog} />;
}
