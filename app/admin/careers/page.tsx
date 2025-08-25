// app/admin/careers/page.tsx
export const dynamic = "force-dynamic";

import Link from "next/link";
import pool from "@/lib/db";
import { Career } from "@/types/career";
import { format } from 'date-fns';
import CareerActions from "@/components/CareerActions"; // Import the new component

async function getCareers(): Promise<Career[]> {
  if (process.env.NEXT_PHASE === "phase-production-build") {
    console.log("⏭️ Skipping DB fetch during build...");
    return [];
  }

  const [rows] = await pool.query(
    "SELECT id, title, location, job_type, closing_date, is_active FROM jobs ORDER BY created_at DESC"
  );
  return rows as Career[];
}



export default async function CareersPage() {
  const careers = await getCareers();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Careers Dashboard</h1>
        <Link
          href="/admin/careers/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          + Add New Job
        </Link>
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4 font-semibold">Title</th>
              <th className="p-4 font-semibold">Location</th>
              <th className="p-4 font-semibold">Job Type</th>
              <th className="p-4 font-semibold">Closing Date</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {careers.map((career) => (
              <tr key={career.id} className="border-b hover:bg-gray-50">
                <td className="p-4">
                  <div className="font-medium text-gray-800">{career.title}</div>
                </td>
                <td className="p-4 text-gray-600">{career.location}</td>
                <td className="p-4">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                    {career.job_type}
                  </span>
                </td>
                <td className="p-4 text-gray-600">
                  {career.closing_date ? format(new Date(career.closing_date), 'dd MMM yyyy') : 'N/A'}
                </td>
                <td className="p-4">
                  {career.is_active ? (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                      Inactive
                    </span>
                  )}
                </td>
                <td className="p-4">
                  {/* Use the new client component for actions */}
                  <CareerActions careerId={career.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
