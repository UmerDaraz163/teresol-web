// app/api/careers/[id]/route.ts

import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// ✅ FIX: Update the type to show that params is a Promise
type Params = {
  params: Promise<{
    id: string;
  }>;
};

/**
 * API route to UPDATE an existing job listing.
 */
export async function PUT(request: Request, { params }: Params) {
  try {
    // ✅ FIX: Await the params object before destructuring
    const { id } = await params;
    const body = await request.json();
    const {
      title,
      location,
      short_desc,
      full_description,
      department,
      job_type,
      experience_level,
      is_active,
      closing_date,
    } = body;

    // Basic validation
    if (!title) {
      return NextResponse.json({ error: 'Title is required.' }, { status: 400 });
    }

    const query = `
      UPDATE jobs 
      SET 
        title = ?, location = ?, short_desc = ?, full_description = ?, 
        department = ?, job_type = ?, experience_level = ?, 
        is_active = ?, closing_date = ?
      WHERE id = ?
    `;

    await pool.query(query, [
      title,
      location,
      short_desc,
      full_description,
      department,
      job_type,
      experience_level,
      is_active,
      closing_date || null,
      id,
    ]);

    return NextResponse.json({ message: 'Job updated successfully.' });

  } catch (error: any) {
    console.error('API Error updating job:', error);
    return NextResponse.json({ error: 'Failed to update job.' }, { status: 500 });
  }
}

/**
 * API route to DELETE a job listing.
 */
export async function DELETE(request: Request, { params }: Params) {
  try {
    // ✅ FIX: Await the params object before destructuring
    const { id } = await params;

    // Check if the ID is valid
    if (!id) {
        return NextResponse.json({ error: 'Job ID is required.' }, { status: 400 });
    }

    const query = 'DELETE FROM jobs WHERE id = ?';
    const [result]: any = await pool.query(query, [id]);

    // Check if any row was actually deleted
    if (result.affectedRows === 0) {
        return NextResponse.json({ error: 'Job not found.' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Job deleted successfully.' });

  } catch (error: any) {
    console.error('API Error deleting job:', error);
    return NextResponse.json({ error: 'Failed to delete job.' }, { status: 500 });
  }
}
