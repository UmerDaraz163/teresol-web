import { notFound } from 'next/navigation';
import pool from '@/lib/db';
import EditJobForm from '@/components/EditJobForm';
import { Career } from '@/types/career';
import { JSX } from 'react';

export const revalidate = 0;

// Define a clear type for the page's props
type EditCareerPageProps = {
  params: Promise<{ id: string }>; // FIX 1: 'params' is a Promise and 'id' is a string
};

export default async function EditCareerPage({
  params,
}: EditCareerPageProps): Promise<JSX.Element> {
  const { id } = await params;

  // FIX 2: Convert the 'id' string from the URL to a number for the database query
  const numericId = parseInt(id, 10);

  // Handle cases where the ID is not a valid number
  if (isNaN(numericId)) {
    notFound();
  }

  const [rows] = await pool.query(
    'SELECT * FROM jobs WHERE id = ? LIMIT 1',
    [numericId] // Use the converted numeric ID here
  );

  if (!Array.isArray(rows) || rows.length === 0) {
    notFound();
  }

  const career: Career = rows[0] as Career;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <EditJobForm job={career} />
    </div>
  );
}