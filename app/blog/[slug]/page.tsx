import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  const supabase = await createClient();
  
  const { data: blog, error } = await supabase
    .from('blogs')
    .select('title, content, image_url, author, created_at, read_time, category')
    .eq('slug', slug)
    .single();

  if (error || !blog) {
    notFound();
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[350px] md:h-[450px] w-full">
        {blog.image_url && (
          <Image
            src={blog.image_url}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-center px-4">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg max-w-3xl">
            {blog.title}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Article */}
        <article className="lg:col-span-8 bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center text-sm text-gray-500 mb-6 flex-wrap gap-2">
            <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">
              {blog.category || 'Uncategorized'}
            </span>
            <span>By {blog.author || 'Teresol Team'}</span>
            <span>&middot;</span>
            <span>
              {new Date(blog.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <span>&middot;</span>
            <span>{blog.read_time || '5 min read'}</span>
          </div>

          {/* Blog Content */}
          <div className="prose prose-lg prose-blue max-w-none">
            {blog.content}
          </div>

          {/* Author Box */}
          <div className="mt-12 border-t pt-6 flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
              {blog.author?.[0] || "T"}
            </div>
            <div>
              <p className="font-semibold">{blog.author || "Teresol Team"}</p>
              <p className="text-sm text-gray-500">Writer & Contributor</p>
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-white p-5 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-4">Categories</h2>
            <ul className="space-y-2 text-gray-600">
              <li><Link href="/blog?cat=tech" className="hover:text-blue-600">Tech</Link></li>
              <li><Link href="/blog?cat=design" className="hover:text-blue-600">Design</Link></li>
              <li><Link href="/blog?cat=news" className="hover:text-blue-600">News</Link></li>
            </ul>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-4">Recent Posts</h2>
            <ul className="space-y-3 text-gray-700">
              <li><Link href="/blog/sample1" className="hover:text-blue-600">Sample Recent Blog</Link></li>
              <li><Link href="/blog/sample2" className="hover:text-blue-600">Another Post</Link></li>
            </ul>
          </div>
        </aside>
      </div>

      {/* Back Button */}
      <div className="text-center py-6">
        <Link
          href="/blog"
          className="inline-block px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
        >
          ← Back to All Blogs
        </Link>
      </div>
    </div>
  );
}
