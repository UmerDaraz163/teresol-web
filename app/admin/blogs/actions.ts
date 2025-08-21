'use server';

import pool from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createBlogAction(formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const short_desc = formData.get('short_desc') as string | null;
    const content = formData.get('content') as string | null;
    const image_url = formData.get('image_url') as string | null;
    const author = formData.get('author') as string | null;
    const read_time = formData.get('read_time') as string | null;
    const category = formData.get('category') as string | null;
    const is_featured = formData.get('is_featured') ? 1 : 0;

    await pool.query(
      `INSERT INTO blogs 
        (title, slug, short_desc, content, image_url, author, read_time, category, is_featured, created_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [title, slug, short_desc, content, image_url, author, read_time, category, is_featured]
    );

    revalidatePath('/admin/blogs');
    return { success: true };
  } catch (error: any) {
    console.error('Failed to create blog:', error);
    return { error: 'Failed to create blog. Please try again.' };
  }
}

// Action to UPDATE an existing blog post
export async function updateBlogAction(blogId: number, formData: FormData) {
  const data = {
    title: formData.get('title') as string,
    slug: formData.get('slug') as string,
    short_desc: formData.get('short_desc') as string,
    content: formData.get('content') as string,
    image_url: formData.get('image_url') as string,
    author: formData.get('author') as string,
    read_time: formData.get('read_time') as string,
    category: formData.get('category') as string,
    is_featured: formData.get('is_featured') === 'on' ? 1 : 0,
  };

  // **FIX: Add validation to ensure the slug is not empty.**
  // This prevents it from being saved as NULL in the database.
  if (!data.slug || data.slug.trim() === '') {
    return { error: 'Slug is required and cannot be empty.' };
  }

  try {
    const query = `
      UPDATE blogs
      SET title = ?, slug = ?, short_desc = ?, content = ?, image_url = ?, 
          author = ?, read_time = ?, category = ?, is_featured = ?
      WHERE id = ?
    `;
    const values = [
      data.title, data.slug, data.short_desc, data.content, 
      data.image_url, data.author, data.read_time, data.category, 
      data.is_featured, blogId
    ];
    await pool.query(query, values);

  } catch (error) {
    console.error(`Failed to update blog post ${blogId}:`, error);
    // Check for duplicate slug error
    if ((error as any).code === 'ER_DUP_ENTRY') {
        return { error: 'This slug is already in use by another post. Please choose a unique one.' };
    }
    return { error: 'Database error: Failed to update post.' };
  }

  // **FIX: Revalidate the entire blog layout to handle slug changes.**
  // This ensures both the old page and the new page are updated in the cache.
  revalidatePath('/admin/blogs');
  revalidatePath('/blog', 'layout'); 
  redirect('/admin/blogs');
}

export async function deleteBlogAction(blogId: number) {
  try {
    await pool.query('DELETE FROM blogs WHERE id = ?', [blogId]);
  } catch (error) {
    console.error(`Failed to delete blog post ${blogId}:`, error);
    return { error: 'Database error: Failed to delete post.' };
  }

  // Revalidate the blogs list page to reflect the deletion
  revalidatePath('/admin/blogs');
}
