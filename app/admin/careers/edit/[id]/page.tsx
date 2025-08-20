import pool from "@/lib/db";
import EditCareerForm from "@/components/EditJobForm";
import { Career } from "types/career";

async function getCareer(id: string): Promise<Career | null> {
  const [rows] = await pool.query("SELECT * FROM jobs WHERE id = ?", [id]);
  return (rows as Career[])[0] || null;
}

export default async function EditCareerPage({ params }: { params: { id: string } }) {
  const career = await getCareer(params.id);

  if (!career) {
    return <div>Job not found</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Job</h1>
      <EditCareerForm job={career} />
    </div>
  );
}
