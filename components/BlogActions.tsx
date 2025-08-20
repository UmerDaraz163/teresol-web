// components/BlogActions.tsx
"use client";

import Link from "next/link";
import { Eye, Edit, Trash2 } from "lucide-react";

type Props = {
  blogId: number;
  slug: string;
};

export default function BlogActions({ blogId, slug }: Props) {
  const handleDelete = () => {
    // TODO: Replace with real delete logic (API call + revalidation)
    alert(`Delete blog ${blogId}`);
  };

  return (
    <div className="flex items-center gap-4 text-gray-500">
      <Link href={`/blog/${slug}`} title="View">
        <Eye className="w-5 h-5 hover:text-indigo-600 cursor-pointer transition" />
      </Link>
      <Link href={`/admin/blogs/edit/${slug}`} title="Edit">
        <Edit className="w-5 h-5 hover:text-green-600 cursor-pointer transition" />
      </Link>
      <button onClick={handleDelete} title="Delete">
        <Trash2 className="w-5 h-5 hover:text-red-600 cursor-pointer transition" />
      </button>
    </div>
  );
}
