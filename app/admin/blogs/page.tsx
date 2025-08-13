// app/admin/blogs/page.tsx
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server'; // Your corrected server client
import BlogForm from '@/components/blogForm'; // Your client component form
import SignOutButton from '@/components/SignOutButton'; // We'll create this

export default async function AdminBlogsPage() {
  const supabase = createClient();

  // 1. Check for an active session
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/admin/login'); // Redirect to login if not authenticated
  }

  // 2. Check if the user is an admin
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', session.user.id)
    .single();

  // If there's no profile or the role is not 'admin', deny access
  if (!profile || profile.role !== 'admin') {
    return (
      <div className="text-center p-12">
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p>You do not have permission to view this page.</p>
      </div>
    );
  }

  // 3. If they are an admin, render the page content
  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Create a New Blog Post</h1>
        <SignOutButton />
      </div>
      <BlogForm />
    </div>
  );
}