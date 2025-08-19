// app/admin/blogs/actions.ts
'use server'

import pool from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// --- ADD THIS NEW UPDATE FUNCTION ---
export async function updateBlogAction(id: number, formData: FormData) {
  const blogData = {
    title: formData.get('title') as string,
    short_desc: formData.get('short_desc') as string,
    content: formData.get('content') as string,
    image_url: formData.get('image_url') as string,
    author: formData.get('author') as string,
    read_time: formData.get('read_time') as string,
    category: formData.get('category') as string,
    is_featured: formData.get('is_featured') === 'on',
  };

  if (!blogData.title) {
    return { error: 'Title is required.' };
  }

  try {
    const query = `
      UPDATE blogs SET 
        title = ?, short_desc = ?, content = ?, image_url = ?, 
        author = ?, read_time = ?, category = ?, is_featured = ?
      WHERE id = ?
    `;
    await pool.query(query, [
      blogData.title,
      blogData.short_desc,
      blogData.content,
      blogData.image_url,
      blogData.author,
      blogData.read_time,
      blogData.category,
      blogData.is_featured,
      id
    ]);
  } catch (error) {
    console.error('Database Error:', error);
    return { error: 'Failed to update blog post.' };
  }

  revalidatePath('/admin/blogs');
  redirect('/admin/blogs');
}

// ... your existing create and delete actions ...
