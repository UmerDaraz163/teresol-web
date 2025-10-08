import { NextResponse } from 'next/server';
import pool from "@/lib/db";

const VALID_STATUSES = ['New', 'Reviewed', 'Interview', 'Rejected', 'Hired', 'Reserved'];

export async function PUT(
    request: Request,
    routeContext: { params: Promise<{ id: string }> }  // 👈 note the Promise type
) {
    const { id: applicationId } = await routeContext.params;  // ✅ correct async handling

    try {
        const { status } = await request.json();

        console.log(`[API_START] Attempting status update.`);
        console.log(`[ID] Application ID received: ${applicationId}`);
        console.log(`[STATUS] New Status requested: ${status}`);

        if (!applicationId || !status) {
            return NextResponse.json({ error: 'Missing application ID or status' }, { status: 400 });
        }

        if (!VALID_STATUSES.includes(status)) {
            return NextResponse.json({ error: 'Invalid status value' }, { status: 400 });
        }

        const query = `UPDATE job_applications SET status = ? WHERE id = ?`;
        const [result]: any = await pool.query(query, [status, applicationId]);

        if (result.affectedRows === 0) {
            if (result.changedRows === 0) {
                return NextResponse.json({ message: 'Status unchanged (already set).' }, { status: 200 });
            }
            return NextResponse.json({ error: 'Job application not found.' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Status updated successfully.', newStatus: status });
    } catch (error: any) {
        console.error(`[FATAL_ERROR] ${error.message}`);
        return NextResponse.json({ error: 'Failed to update application status due to server error.' }, { status: 500 });
    }
}
