// app/api/test-db/route.ts

import mysql from 'mysql2/promise';
import { NextResponse } from 'next/server';

export async function GET() {
  // Create a connection pool
  const pool = mysql.createPool(process.env.DATABASE_URL!);

  try {
    // Run a simple query to test the connection
    const [rows] = await pool.query('SELECT 1 + 1 AS solution');
    pool.end(); // Close the connection pool

    return NextResponse.json({
      message: 'Database connection successful!',
      result: rows,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: 'Database connection failed.', error: error.message },
      { status: 500 }
    );
  }
}