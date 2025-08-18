// app/admin/blogs/edit/[slug]/page.tsx

import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import EditBlogForm from '@/components/EditBlogForm'; // Adjust this import path if needed

export default async function EditBlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // ✅ await params

  const supabase = await createClient();

  const { data: blog, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !blog) {
    notFound();
  }

  return <EditBlogForm blog={blog} />;
}

