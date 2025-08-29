// components/BlogActions.tsx

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { deleteBlogAction } from "@/app/admin/blogs/actions";
import { Edit, Trash2, Eye } from "lucide-react";

export default function BlogActions({
  blogId,
  slug,
}: {
  blogId: number;
  slug: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const handleDelete = async () => {
    setMessage(null);

    startTransition(async () => {
      const result = await deleteBlogAction(blogId);
      if (result?.error) {
        setMessage({ text: `Error: ${result.error}`, type: "error" });
      } else {
        setMessage({ text: "Deleted!", type: "success" });
        router.refresh();
      }
      setIsConfirmingDelete(false);
    });
  };

  const handleCancel = () => {
    setIsConfirmingDelete(false);
    setMessage(null);
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

      {/* Delete + Floating Confirm Box */}
      <div className="relative">
        <button
          onClick={() => setIsConfirmingDelete(true)}
          disabled={isPending}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white bg-red-500 hover:bg-red-600 transition text-sm disabled:bg-gray-400"
        >
          <Trash2 size={14} />
          Delete
        </button>

        {isConfirmingDelete && (
          <div className="absolute left-0 mt-2 bg-white border rounded-lg shadow-lg p-3 flex flex-col gap-2 z-50 w-40">
            <p className="text-xs font-medium text-gray-700">Confirm delete?</p>
            <div className="flex gap-2">
              <button
                onClick={handleDelete}
                disabled={isPending}
                className="flex-1 px-2 py-1 text-xs rounded-md text-white bg-red-600 hover:bg-red-700 disabled:bg-gray-400"
              >
                Confirm
              </button>
              <button
                onClick={handleCancel}
                disabled={isPending}
                className="flex-1 px-2 py-1 text-xs rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* On-page Messages */}
      {message && (
        <span
          className={`text-xs font-semibold ${
            message.type === "error" ? "text-red-600" : "text-green-600"
          }`}
        >
          {message.text}
        </span>
      )}
    </div>
  );
}
