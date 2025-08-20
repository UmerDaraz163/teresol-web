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

export async function updateBlogAction(id: number, formData: FormData) {
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
      `UPDATE blogs 
       SET title = ?, slug = ?, short_desc = ?, content = ?, image_url = ?, 
           author = ?, read_time = ?, category = ?, is_featured = ?
       WHERE id = ?`,
      [title, slug, short_desc, content, image_url, author, read_time, category, is_featured, id]
    );

    revalidatePath('/admin/blogs');
    return { success: true };
  } catch (error: any) {
    console.error('Failed to update blog:', error);
    return { error: 'Failed to update blog. Please try again.' };
  }
}
