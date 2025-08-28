// app/api/careers/[id]/route.ts

import { NextResponse } from 'next/server';
import pool from '@/lib/db';

type Params = {
  params: {
    id: string;
  };
};

/**
 * API route to UPDATE an existing job listing.
 */
export async function PUT(request: Request, { params }: Params) {
  try {
    const { id } = params;
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
