import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const [result]: any = await pool.query(
      `INSERT INTO jobs 
        (title, slug, location, short_desc, full_description, department, job_type, experience_level, is_active, closing_date, created_at) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
      [
        body.title,
        body.slug,
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

    // ✅ MySQL returns the new auto-increment ID
    return NextResponse.json({ success: true, id: result.insertId });
  } catch (error: any) {
    console.error("Error creating job:", error);
    return NextResponse.json(
      { error: "Failed to create job", details: error.message },
      { status: 500 }
    );
  }
}
