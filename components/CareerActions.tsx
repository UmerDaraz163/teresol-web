"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function CareerActions({ careerId }: { careerId: number }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleDelete = async () => {
    // On the first click, ask for confirmation
    if (!isConfirmingDelete) {
      setIsConfirmingDelete(true);
      setMessage({ text: 'Are you sure?', type: 'error' });
      return;
    }

    // On the second click, proceed with deletion
    setMessage(null); // Clear confirmation message

    startTransition(async () => {
      try {
        const res = await fetch(`/api/careers/${careerId}`, {
          method: "DELETE",
        });

        if (res.ok) {
          setMessage({ text: 'Deleted!', type: 'success' });
          // Refresh the page to show the updated list after a short delay
          setTimeout(() => router.refresh(), 1000);
        } else {
          const errorData = await res.json();
          setMessage({ text: `Error: ${errorData.error}`, type: 'error' });
        }
      } catch (error) {
        console.error("Delete failed:", error);
        setMessage({ text: 'An unexpected error occurred.', type: 'error' });
      } finally {
        // Reset confirmation state after action
        setIsConfirmingDelete(false);
      }
    });
  };

  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/admin/careers/edit/${careerId}`}
        className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 text-sm"
      >
        Edit
      </Link>
      
      {/* Conditionally render the delete button text */}
      <button
        onClick={handleDelete}
        disabled={isPending}
        className={`px-3 py-1 rounded-md text-sm text-white transition-colors ${
          isConfirmingDelete 
            ? 'bg-red-700 hover:bg-red-800' 
            : 'bg-red-600 hover:bg-red-700'
        } disabled:bg-gray-400`}
      >
        {isConfirmingDelete ? 'Confirm Delete' : 'Delete'}
      </button>

      {/* Display on-page messages */}
      {message && (
        <span className={`text-xs font-medium ${message.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
          {message.text}
        </span>
      )}
    </div>
  );
}
