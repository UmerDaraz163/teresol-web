// app/admin/blogs/page.tsx

import Link from 'next/link';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from 'next/navigation';
import pool from '@/lib/db';
import SignOutButton from '@/components/SignOutButton';
import { PlusCircle, FileText, LayoutDashboard } from "lucide-react";
import BlogActions from '@/components/BlogActions';

type Blog = {
  id: number;
  title: string;
  slug: string;
};

export default async function AdminBlogsPage() {
  const session = await getServerSession(authOptions);

  // @ts-ignore
  if (!session || session.user?.role !== 'admin') {
    redirect('/admin/login');
  }

  let blogs: Blog[] = [];
  try {
    const [rows] = await pool.query<any[]>(
      'SELECT id, title, slug FROM blogs ORDER BY created_at DESC'
    );
    blogs = rows as Blog[];
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
  }

  return (
    <div className="container mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-2">
          <LayoutDashboard className="w-7 h-7 text-indigo-600" />
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-800">
            Admin Dashboard
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blogs/new"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl shadow-md transition"
          >
            <PlusCircle className="w-5 h-5" />
            Add Blog
          </Link>
          <SignOutButton />
        </div>
      </div>

      {/* Blog List */}
      <div className="space-y-4">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div
              key={blog.id}
              className="flex items-center justify-between p-5 rounded-xl border bg-gray-50 shadow-sm hover:shadow-md transition"
            >
              {/* Left side */}
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-indigo-500" />
                <span className="text-lg font-semibold text-gray-700">
                  {blog.title}
                </span>
              </div>

              {/* Right side (Client Component) */}
              <BlogActions blogId={blog.id} slug={blog.slug} />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No blog posts found.</p>
        )}
      </div>
    </div>
  );
}
