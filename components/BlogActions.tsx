"use client";

import Link from "next/link";
import { Eye, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { deleteBlogAction } from "@/app/admin/blogs/actions"; // Import the delete action

type Props = {
  blogId: number;
  slug: string;
};

export default function BlogActions({ blogId, slug }: Props) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    // Add a confirmation dialog to prevent accidental deletion
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      setIsDeleting(true);
      try {
        await deleteBlogAction(blogId);
        // The page will be revalidated by the server action, so no need to refresh.
      } catch (error) {
        console.error("Failed to delete blog:", error);
        alert("Failed to delete the blog post.");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="flex items-center gap-4 text-gray-500">
      <Link href={`/blog/${slug}`} title="View" target="_blank" rel="noopener noreferrer">
        <Eye className="w-5 h-5 hover:text-indigo-600 cursor-pointer transition" />
      </Link>
      <Link href={`/admin/blogs/edit/${slug}`} title="Edit">
        <Edit className="w-5 h-5 hover:text-green-600 cursor-pointer transition" />
      </Link>
      <button onClick={handleDelete} title="Delete" disabled={isDeleting}>
        <Trash2 
          className={`w-5 h-5 cursor-pointer transition ${
            isDeleting 
              ? 'text-gray-400 animate-spin' 
              : 'hover:text-red-600'
          }`} 
        />
      </button>
    </div>
  );
}
