import { NextResponse } from "next/server";
import pool from "@/lib/db";

// GET handler to fetch all jobs
export async function GET() {
  try {
    const [rows] = await pool.query("SELECT * FROM jobs ORDER BY created_at DESC");
    return NextResponse.json(rows);
  } catch (error: any) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs", details: error.message },
      { status: 500 }
    );
  }
}

// POST handler to create a new job
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Basic validation - removed slug check
    if (!body.title) {
      return NextResponse.json(
        { error: "Title is a required field" },
        { status: 400 }
      );
    }

    // ✅ FIX: Removed the 'slug' column from the INSERT statement to match the database table.
    const [result]: any = await pool.query(
      `INSERT INTO jobs 
        (title, location, short_desc, full_description, department, job_type, experience_level, is_active, closing_date, created_at) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
      [
        body.title,
        body.location,
        body.short_desc,
        body.full_description,
        body.department,
        body.job_type,
        body.experience_level,
        body.is_active,
        body.closing_date,
      ]
    );

    return NextResponse.json({ success: true, id: result.insertId });
  } catch (error: any) {
    console.error("Error creating job:", error);
    return NextResponse.json(
      { error: "Failed to create job", details: error.message },
      { status: 500 }
    );
  }
}
