import Link from "next/link";
import pool from "@/lib/db";
import { Career } from "@/types/career";

async function getCareers(): Promise<Career[]> {
  const [rows] = await pool.query("SELECT * FROM jobs ORDER BY created_at DESC");
  return rows as Career[];
}

export default async function CareersPage() {
  const careers = await getCareers();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Careers Dashboard</h1>
      <Link
        href="/admin/careers/new"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        + Add New Job
      </Link>
      <table className="mt-6 w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Company</th>
            <th className="p-2 border">Active</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {careers.map((career) => (
            <tr key={career.id}>
              <td className="p-2 border">{career.title}</td>
              <td className="p-2 border">{career.company}</td>
              <td className="p-2 border">
                {career.is_active ? "✅ Active" : "❌ Inactive"}
              </td>
              <td className="p-2 border space-x-2">
                <Link
                  href={`/admin/careers/edit/${career.id}`}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </Link>
                <form
                  action={`/admin/careers/delete/${career.id}`}
                  method="post"
                  className="inline"
                >
                  <button
                    type="submit"
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
