import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

type PageProps = {
  params: {
    slug: string;
  };
};

export default async function BlogPostPage({ params }: PageProps) {
  const supabase = createClient();
  
  const { data: blog } = await supabase
    .from('blogs')
    .select('title, content, image_url, author, created_at, read_time, category')
    .eq('slug', params.slug)
    .single();

  // If no blog is found with that slug, show a 404 page
  if (!blog) {
    notFound();
  }

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <article className="max-w-3xl mx-auto">
          {/* Back to Blog Link */}
          <Link href="/blog" className="text-blue-600 hover:underline mb-8 inline-block">
            &larr; Back to all posts
          </Link>
          
          {/* Post Header */}
          <div className="mb-8">
            <p className="text-base text-gray-500 font-semibold uppercase tracking-wide">{blog.category || 'Uncategorized'}</p>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mt-2">
              {blog.title}
            </h1>
            <div className="flex items-center text-sm text-gray-500 mt-4">
              <span>By {blog.author || 'Teresol Team'}</span>
              <span className="mx-2">&middot;</span>
              <span>
                {new Date(blog.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <span className="mx-2">&middot;</span>
              <span>{blog.read_time || '5 min read'}</span>
            </div>
          </div>

          {/* Featured Image */}
          {blog.image_url && (
            <div className="relative h-96 w-full rounded-lg overflow-hidden mb-8 shadow-lg">
              <Image
                src={blog.image_url}
                alt={`Featured image for ${blog.title}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
          )}

          {/* Post Content */}
          <div className="prose lg:prose-lg max-w-none">
            <p>{blog.content}</p>
            
          </div>
        </article>
      </div>
    </div>
  );
}