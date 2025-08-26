import BlogForm from "@/components/BlogForm";
import AdminHeader from "../../../../components/AdminHeader";

export default function NewBlogPage() {
  return (
    <div>
      <AdminHeader showBackButton showSignOutButton />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Create a New Blog Post</h1>
        <BlogForm />
      </div>
    </div>
  );
}
