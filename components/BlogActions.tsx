// components/BlogActions.tsx

'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { deleteBlogAction } from "@/app/admin/blogs/actions";
import { Edit, Trash2, Eye } from "lucide-react";

export default function BlogActions({ blogId, slug }: { blogId: number, slug: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleDelete = async () => {
    // On the first click, enter confirmation mode
    if (!isConfirmingDelete) {
      setIsConfirmingDelete(true);
      setMessage({ text: 'Are you sure?', type: 'error' });
      // Set a timer to exit confirmation mode automatically
      setTimeout(() => {
        setIsConfirmingDelete(false);
        setMessage(null);
      }, 3000); // Reset after 3 seconds
      return;
    }

    // On the second click, proceed with deletion
    setMessage(null);

    startTransition(async () => {
      const result = await deleteBlogAction(blogId);
      if (result?.error) {
        setMessage({ text: `Error: ${result.error}`, type: 'error' });
      } else {
        setMessage({ text: 'Deleted!', type: 'success' });
        // The server action's revalidatePath will handle the UI update,
        // but we can trigger a refresh for good measure.
        router.refresh();
      }
      setIsConfirmingDelete(false);
    });
  };

  return (
    <div className="flex items-center gap-2">
      {/* View Button */}
      <Link
        href={`/blog/${slug}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition text-sm"
      >
        <Eye size={14} />
        View
      </Link>

      {/* Edit Button */}
      <Link
        href={`/admin/blogs/edit/${slug}`}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition text-sm"
      >
        <Edit size={14} />
        Edit
      </Link>
      
      {/* Delete Button with Confirmation */}
      <button
        onClick={handleDelete}
        disabled={isPending}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white transition text-sm ${
          isConfirmingDelete 
            ? 'bg-red-700 hover:bg-red-800' 
            : 'bg-red-500 hover:bg-red-600'
        } disabled:bg-gray-400`}
      >
        <Trash2 size={14} />
        {isConfirmingDelete ? 'Confirm' : 'Delete'}
      </button>

      {/* On-page Messages */}
      {message && (
        <span className={`text-xs font-semibold ${message.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
          {message.text}
        </span>
      )}
    </div>
  );
}
