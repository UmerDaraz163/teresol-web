import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { format } from 'date-fns';

// --- Define the structure for dynamic CSV generation ---
type ApplicationRecord = Record<string, any>;

// --- Convert an array of objects to CSV ---
function convertToCSV(data: ApplicationRecord[]): string {
  if (data.length === 0) return '';

  // Automatically extract headers from object keys
  const headers = Object.keys(data[0]);

  // Create CSV string
  let csv = headers.join(',') + '\n';

  // Create rows
  data.forEach(row => {
    const values = headers.map(key => {
      let value = row[key];

      // Format date fields
      if (value instanceof Date || (typeof value === 'string' && /\d{4}-\d{2}-\d{2}/.test(value))) {
        try {
          const date = new Date(value);
          if (!isNaN(date.getTime())) {
            value = format(date, 'yyyy-MM-dd HH:mm:ss');
          }
        } catch {
          // ignore invalid date
        }
      }

      // Escape quotes & commas
      const stringValue = String(value ?? '').replace(/"/g, '""');
      return `"${stringValue}"`;
    });

    csv += values.join(',') + '\n';
  });

  return csv;
}

// --- Fetch application data (regular or intern) ---
async function fetchApplicationData(type: 'regular' | 'intern'): Promise<ApplicationRecord[]> {
  if (type === 'intern') {
    const [rows] = await pool.query(`
      SELECT 
        a.id, 
        COALESCE(a.internship_dept, 'General Internship (Stream Unknown)') AS job_title, 
        a.name, 
        a.email, 
        a.created_at AS applied_date,
        COALESCE(a.status, 'New') AS status
      FROM job_applications a 
      WHERE a.is_internship = 1 
      ORDER BY a.created_at DESC
    `);
    return rows as ApplicationRecord[];
  } else {
    // For REGULAR job applications — include all fields
    const [rows] = await pool.query(`
      SELECT 
        a.id,
        j.title AS job_title,
        a.name,
        a.email,
        a.phone,
        a.father_spouse_name,
        a.field_of_interest,
        a.address,
        a.year_of_birth,
        a.any_medical_illness,
        a.shortlisted_elsewhere,
        a.other_org_name,
        a.other_app_status,
        a.expected_salary,
        a.willing_to_travel,
        a.future_study_plans,
        a.earliest_join_date,
        a.expected_stay_duration,
        a.heard_about_us,
        a.relative_at_teresol,
        a.referral_name,
        a.referral_contact,
        a.professional_exp_years,
        a.current_company_name,
        a.current_designation,
        a.current_salary,
        a.tenure_last_job,
        a.reason_for_quitting,
        a.candidate_notes,
        a.highest_degree,
        a.degree_title,
        a.university_name,
        a.degree_start_year,
        a.degree_completion_year,
        COALESCE(a.status, 'New') AS status,
        a.created_at AS applied_date
      FROM job_applications a
      JOIN jobs j ON a.job_id = j.id
      WHERE a.is_internship IS NULL OR a.is_internship = 0
      ORDER BY a.created_at DESC
    `);
    return rows as ApplicationRecord[];
  }
}

// --- GET endpoint handler ---
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') === 'intern' ? 'intern' : 'regular';
  const fileName =
    type === 'intern' ? 'internship_applications' : 'regular_job_applications';

  try {
    const applications = await fetchApplicationData(type);
    const csv = convertToCSV(applications);
    const csvWithBOM = '\uFEFF' + csv; // Prevents Excel encoding issues

    return new NextResponse(csvWithBOM, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${fileName}_${format(
          new Date(),
          'yyyyMMdd_HHmmss'
        )}.csv"`,
      },
    });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch or generate CSV data.' },
      { status: 500 }
    );
  }
}
