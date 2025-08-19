// app/admin/blogs/actions.ts
'use server'

import pool from '@/lib/db'; // Make sure this path points to your db connection setup
import { revalidatePath } from 'next/cache';

export async function deleteBlogAction(id: number) {
  if (!id) {
    return { error: 'Invalid blog post ID.' };
  }

  try {
    const [result]: any = await pool.query('DELETE FROM blogs WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return { error: 'Blog post not found or already deleted.' };
    }

    // This will refresh the data on the admin blogs page
    revalidatePath('/admin/blogs'); 
    
    return { success: true };

  } catch (error) {
    console.error('Database Error:', error);
    return { error: 'Failed to delete the blog post.' };
  }
}
