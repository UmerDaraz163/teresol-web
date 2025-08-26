// app/blog/[slug]/page.tsx

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import pool from '@/lib/db';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { JSX } from 'react';
import { Metadata, ResolvingMetadata } from 'next';

// Define the shape of the props passed to the page and metadata function
type PageProps = {
  params: { slug: string };
};

// Define the type for a single blog post, including a short description
type Blog = {
  id: number;
  title: string;
  short_desc: string; // Used for meta descriptions
  content: string;
  image_url: string | null;
  author: string | null;
  created_at: string;
  read_time: string | null;
  category: string | null;
};

// Define types for sidebar content
type RecentPost = {
  title: string;
  slug: string;
};

type Category = {
  category: string;
};

/**
 * Generates dynamic metadata for each blog post page based on its slug.
 * This function fetches data for a specific post and returns SEO-friendly metadata.
 */
export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = params;

  // Fetch only the data needed for SEO to keep this function fast
  const [rows]: any[] = await pool.query(
    `SELECT title, short_desc, image_url, category FROM blogs WHERE slug = ? LIMIT 1`,
    [slug]
  );

  const blog = rows.length > 0 ? rows[0] : null;

  // If no blog is found, return a default "Not Found" title
  if (!blog) {
    return {
      title: 'Blog Post Not Found',
      description: 'The blog post you are looking for could not be found.',
    };
  }

  // Construct the dynamic metadata object
  return {
    title: blog.title,
    description: blog.short_desc,
    keywords: [blog.category, 'Teresol Blog', blog.title],
  };
}

/**
 * Fetches all necessary data to render the blog post page content.
 */
async function getBlogData(slug: string) {
  try {
    // Fetch the main blog post content
    const [blogRows]: any[] = await pool.query(
      `SELECT id, title, short_desc, content, image_url, author, created_at, read_time, category 
       FROM blogs 
       WHERE slug = ?`,
      [slug]
    );
    const blog: Blog | null = blogRows.length > 0 ? blogRows[0] : null;

    if (!blog) {
      return { blog: null, recentPosts: [], categories: [] };
    }

    // Fetch recent posts for the sidebar
    const [recentPostRows]: any[] = await pool.query(
      `SELECT title, slug FROM blogs WHERE slug != ? ORDER BY created_at DESC LIMIT 5`,
      [slug]
    );
    const recentPosts: RecentPost[] = recentPostRows;

    // Fetch categories for the sidebar
    const [categoryRows]: any[] = await pool.query(
      `SELECT DISTINCT category FROM blogs WHERE category IS NOT NULL AND category != '' ORDER BY category ASC`
    );
    const categories: Category[] = categoryRows;

    return { blog, recentPosts, categories };
  } catch (error) {
    console.error("Database Error:", error);
    return { blog: null, recentPosts: [], categories: [] };
  }
}

/**
 * The main component for rendering a single blog post page.
 */
export default async function BlogPostPage({ params }: { params: { slug: string } }): Promise<JSX.Element> {
  const { slug } = params;
  const { blog, recentPosts, categories } = await getBlogData(slug);

  // If the blog post doesn't exist, trigger a 404 Not Found page
  if (!blog) {
    notFound();
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <div className="relative h-[350px] md:h-[450px] w-full">
        {blog.image_url ? (
          <Image
            src={blog.image_url}
            alt={blog.title}
            fill
            className="object-cover"
            priority
            onError={(e) => { e.currentTarget.src = 'https://placehold.co/1920x450/eee/ccc?text=Image+Not+Found'; }}
          />
        ) : (
           <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
             <span className="text-gray-500">No Image Available</span>
           </div>
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
        <article className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-xl shadow-md">
          <div className="flex items-center text-sm text-gray-500 mb-6 flex-wrap gap-x-4 gap-y-2">
            {blog.category && (
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                {blog.category}
              </span>
            )}
            <span>By <strong>{blog.author || 'Teresol Team'}</strong></span>
            <span>&middot;</span>
            <span>
              {new Date(blog.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            {blog.read_time && (
              <>
                <span>&middot;</span>
                <span>{blog.read_time}</span>
              </>
            )}
          </div>

          {/* Blog Content */}
          <div className="prose prose-lg prose-blue max-w-none" dangerouslySetInnerHTML={{ __html: blog.content || '' }} />

          {/* Author Box */}
          <div className="mt-12 border-t pt-8 flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-600">
                {blog.author ? blog.author.charAt(0).toUpperCase() : "T"}
              </span>
            </div>
            <div>
              <p className="font-bold text-lg text-gray-800">{blog.author || "Teresol Team"}</p>
              <p className="text-sm text-gray-500">Writer & Contributor</p>
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-8">
          {/* Categories Section */}
          {categories.length > 0 && (
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Categories</h2>
              <ul className="space-y-2">
                {categories.map((cat, index) => (
                  <li key={index}>
                    <Link href={`/blog?category=${encodeURIComponent(cat.category)}`} className="text-gray-600 hover:text-blue-600 hover:underline transition-colors">
                      {cat.category}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Recent Posts Section */}
          {recentPosts.length > 0 && (
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Recent Posts</h2>
              <ul className="space-y-4">
                {recentPosts.map((post, index) => (
                  <li key={index}>
                    <Link href={`/blog/${post.slug}`} className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>

      {/* Back Button */}
      <div className="text-center py-8">
        <Link
          href="/blog"
          className="inline-flex items-center px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-transform transform hover:-translate-x-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Back to All Blogs
        </Link>
      </div>
      
      <Footer />
    </div>
  );
}
