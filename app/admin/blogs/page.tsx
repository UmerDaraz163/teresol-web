import Link from 'next/link';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import SignOutButton from '@/components/SignOutButton';
import DeleteBlogButton from '@/components/DeleteBlogButton';

export default async function AdminBlogsPage() {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return redirect('/admin/login');
  }

  const { data: blogs } = await supabase.from('blogs').select('id, title, slug');

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <Link href="/admin/blogs/new" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
            + Add New Blog
          </Link>
          <SignOutButton />
        </div>
      </div>
      
      <div className="space-y-4">
        {blogs?.map((blog) => (
          <div key={blog.id} className="flex justify-between items-center p-4 border rounded-lg shadow-sm">
            <h3 className="font-semibold">{blog.title}</h3>
            <div className="flex items-center gap-4">
              <Link href={`/blog/${blog.slug}`} target="_blank" className="text-sm text-gray-500 hover:underline">
                View
              </Link>
              <Link href={`/admin/blogs/edit/${blog.slug}`} className="text-sm text-blue-500 hover:underline">
                Edit
              </Link>
              <DeleteBlogButton id={blog.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}