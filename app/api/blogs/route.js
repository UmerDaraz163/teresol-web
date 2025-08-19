// app/api/blogs/route.ts

import { NextResponse } from 'next/server';
import pool from '@/lib/db'; // Your MySQL connection pool

export async function GET() {
  try {
    const [rows] = await pool.query(
      "SELECT id, created_at, title, short_desc, author, image_url, category FROM blogs ORDER BY created_at DESC"
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts.' },
      { status: 500 }
    );
  }
}
