// app/api/settings/internships/route.ts
import { NextResponse } from 'next/server';
import pool from "@/lib/db";

// The key we use in the 'settings' table
const SETTING_KEY = 'internships_enabled';

/**
 * GET handler: Retrieves the current status of the internship setting.
 * Endpoint: GET /api/admin/settings/internships
 */
export async function GET() {
    try {
        const [rows]: any = await pool.query(
            `SELECT setting_value FROM settings WHERE setting_key = ?`,
            [SETTING_KEY]
        );

        if (rows.length === 0) {
            // Setting doesn't exist, return disabled by default
            return NextResponse.json({ enabled: '0' }, { status: 200 });
        }

        const value = rows[0].setting_value;
        
        return NextResponse.json({ enabled: value }, { status: 200 });

    } catch (error) {
        console.error(`API Error fetching setting '${SETTING_KEY}':`, error);
        return NextResponse.json({ error: 'Failed to retrieve setting.' }, { status: 500 });
    }
}

/**
 * PUT handler: Updates the status of the internship setting.
 * Endpoint: PUT /api/admin/settings/internships
 */
export async function PUT(request: Request) {
    try {
        const { key, value } = await request.json(); // Expecting { key: 'internships_enabled', value: '1' | '0' }

        // Input validation: Ensure the key matches and the value is valid
        if (key !== SETTING_KEY) {
            return NextResponse.json({ error: 'Invalid setting key provided.' }, { status: 400 });
        }

        const newValue = (value === true || value === '1' || value === 1) ? '1' : '0';
        
        // Use an INSERT...ON DUPLICATE KEY UPDATE query.
        const query = `
            INSERT INTO settings (setting_key, setting_value, description)
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)
        `;
        
        await pool.query(query, [
            SETTING_KEY, 
            newValue, 
            '1=Enabled, 0=Disabled. Controls visibility of the Internship Program card.'
        ]);

        return NextResponse.json({ 
            message: 'Setting updated successfully.',
            newStatus: newValue === '1' ? true : false 
        }, { status: 200 });

    } catch (error) {
        console.error(`API Error updating setting '${SETTING_KEY}':`, error);
        return NextResponse.json({ error: 'Failed to update setting.' }, { status: 500 });
    }
}
