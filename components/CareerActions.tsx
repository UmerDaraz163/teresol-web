"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CareerActions({ careerId }: { careerId: number }) {
  const router = useRouter();

  const handleDelete = async () => {
    // Ask for confirmation before deleting
    if (!window.confirm("Are you sure you want to delete this job?")) {
      return;
    }

    try {
      const res = await fetch(`/api/careers/${careerId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Job deleted successfully.");
        // Refresh the page to show the updated list
        router.refresh();
      } else {
        const errorData = await res.json();
        alert(`Failed to delete job: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Delete failed:", error);
      alert("An unexpected error occurred.");
    }
  };

  return (
    <div className="space-x-2">
      <Link
        href={`/admin/careers/edit/${careerId}`}
        className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
      >
        Edit
      </Link>
      <button
        onClick={handleDelete}
        className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
      >
        Delete
      </button>
    </div>
  );
}
