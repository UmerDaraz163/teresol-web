// components/BlogListItem.tsx
'use client';

import Link from 'next/link';
import { deleteBlogAction } from '@/components/DeleteBlogButton';

// Define the type for a single blog post prop
type Blog = {
  id: number;
  title: string;
  slug: string;
};

export default function BlogListItem({ blog }: { blog: Blog }) {
  return (
    <div className="flex justify-between items-center p-4 border rounded-lg shadow-sm bg-white">
      <h3 className="font-semibold">{blog.title}</h3>
      <div className="flex items-center gap-4">
        <Link href={`/blog/${blog.slug}`} target="_blank" className="text-sm text-gray-500 hover:underline">
          View
        </Link>
        <Link href={`/admin/blogs/edit/${blog.slug}`} className="text-sm text-blue-500 hover:underline">
          Edit
        </Link>
        <button
          onClick={() => deleteBlogAction(blog.id)}
          className="text-sm text-red-500 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
