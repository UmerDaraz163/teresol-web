import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { format } from 'date-fns';

// Define the structure of the data you'll fetch
type ApplicationRecord = {
    id: number;
    job_title: string;
    name: string;
    email: string;
    applied_date: Date;
    status: string;
};

// Function to convert an array of objects to a CSV string
function convertToCSV(data: ApplicationRecord[]): string {
    if (data.length === 0) return '';

    // Define headers (CSV header row)
    const headers = ['ID', 'Job Title', 'Applicant Name', 'Applicant Email', 'Applied Date', 'Status'];

    // Map the object keys to the header order
    const keys = ['id', 'job_title', 'name', 'email', 'applied_date', 'status'] as const;

    // Create the header row
    let csv = headers.join(',') + '\n';

    // Create data rows
    data.forEach(row => {
        const values = keys.map(key => {
            let value = row[key];

            // Format date field
            if (key === 'applied_date') {
                // Ensure date is valid before formatting
                value = value ? format(new Date(value as Date), 'yyyy-MM-dd HH:mm:ss') : '';
            }
            
            // Handle commas/quotes in data by wrapping the value in quotes
            const stringValue = String(value).replace(/"/g, '""'); // Escape existing quotes
            return `"${stringValue}"`;
        });
        csv += values.join(',') + '\n';
    });

    return csv;
}

// Function to fetch application data based on the type (regular or intern)
async function fetchApplicationData(type: 'regular' | 'intern'): Promise<ApplicationRecord[]> {
    if (type === 'intern') {
        const [rows] = await pool.query(
            `SELECT 
                a.id, 
                COALESCE(a.internship_dept, 'General Internship (Stream Unknown)') AS job_title, 
                a.name, 
                a.email, 
                a.created_at AS applied_date,
                COALESCE(a.status, 'New') as status 
            FROM job_applications a 
            WHERE a.is_internship = 1 
            ORDER BY a.created_at DESC`
        );
        return rows as ApplicationRecord[];
    } else { // 'regular'
        const [rows] = await pool.query(
            `SELECT 
                a.id, 
                j.title AS job_title, 
                a.name, 
                a.email, 
                a.created_at AS applied_date,
                COALESCE(a.status, 'New') as status 
            FROM job_applications a 
            JOIN jobs j ON a.job_id = j.id 
            WHERE a.is_internship IS NULL OR a.is_internship = 0
            ORDER BY a.created_at DESC`
        );
        return rows as ApplicationRecord[];
    }
}


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') === 'intern' ? 'intern' : 'regular';
    const fileName = type === 'intern' ? 'internship_applications' : 'regular_job_applications';

    try {
        const applications = await fetchApplicationData(type);
        const csv = convertToCSV(applications);

        const csvWithBOM = '\uFEFF' + csv; 
        
        return new NextResponse(csvWithBOM, { // <-- Use csvWithBOM here
            status: 200,
            headers: {
                // Use charset=utf-8 to explicitly state the encoding
                'Content-Type': 'text/csv; charset=utf-8', 
                'Content-Disposition': `attachment; filename="${fileName}_${format(new Date(), 'yyyyMMdd_HHmmss')}.csv"`,
            },
        });

    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ error: 'Failed to fetch or generate CSV data.' }, { status: 500 });
    }
}