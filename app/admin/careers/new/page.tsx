import NewCareerForm from "@/components/NewCareerForm";
import AdminHeader from "../../../../components/AdminHeader";

export default function NewCareerPage() {
  return (
    <div>
      <AdminHeader showBackButton showSignOutButton />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Add New Job</h1>
        <NewCareerForm />
      </div>
    </div>
  );
}
