import { notFound } from 'next/navigation';
import pool from '@/lib/db';
import EditJobForm from '@/components/EditJobForm';
import { Career } from '@/types/career';

// ✅ FIX: Disable caching for this page to ensure fresh data is always fetched.
// This prevents showing stale data after an update.
export const revalidate = 0;

export default async function EditCareerPage({ params }: { params: { id: Number } }) {
  const { id } = await params;

  // Fetch the job using the correct ID from the URL
  const [rows] = await pool.query(
    'SELECT * FROM jobs WHERE id = ? LIMIT 1',
    [id]
  );

  // If the query returns no rows, it means the job doesn't exist, so show a 404
  if (!Array.isArray(rows) || rows.length === 0) {
    notFound();
  }

  // Cast the database row to your Career type
  const career: Career = rows[0] as Career;

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Pass the fetched data as the 'job' prop, which the form component expects */}
      <EditJobForm job={career} />
    </div>
  );
}
