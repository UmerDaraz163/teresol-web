import { createClient } from '@/lib/supabase/server';
import EditBlogForm from '@/components/EditBlogForm';
import { notFound } from 'next/navigation';

// type EditPageProps = {
//   params: {
//     slug: string;
//   };
// };

export default async function EditBlogPage({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  const { data: blog } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (!blog) {
    notFound();
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Edit Blog Post</h1>
      <EditBlogForm blog={blog} />
    </div>
  );
}