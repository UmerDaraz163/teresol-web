// app/admin/page.tsx

import Link from "next/link";
import { FileText, Briefcase } from "lucide-react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Adjust this import path if needed
import { redirect } from "next/navigation";

// Convert the component to an async function to use await
export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  // Redirect if the user is not logged in or is not an admin
  // @ts-ignore - session.user.role is a custom property we added in the auth callback
  if (!session || session.user?.role !== "admin") {
    redirect("/"); // Redirect to the homepage or a login page
  }

  // If the user is an admin, render the dashboard
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Admin Panel
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Welcome, {session.user?.email}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Blogs Dashboard */}
          <Link href="/admin/blogs">
            <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition cursor-pointer border border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Blogs Dashboard
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Manage blog posts, updates, and content.
                  </p>
                </div>
              </div>
            </div>
          </Link>

          {/* Careers Dashboard */}
          <Link href="/admin/careers">
            <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition cursor-pointer border border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 rounded-xl">
                  <Briefcase className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Careers Dashboard
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Post job openings and manage applications.
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
