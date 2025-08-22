// app/blog/[slug]/page.tsx

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import pool from '@/lib/db'; // Your MySQL connection
import Header from '@/components/Header'; // Assuming you have a Header component
import Footer from '@/components/Footer'; // Assuming you have a Footer component
import { JSX } from 'react';

// --- FIX 1: Update the type to reflect that 'params' is a Promise ---
type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

// Define a type for the main blog post data
type Blog = {
  id: number;
  title: string;
  content: string;
  image_url: string | null;
  author: string | null;
  created_at: string;
  read_time: string | null;
  category: string | null;
};

// Define a type for recent posts
type RecentPost = {
  title: string;
  slug: string;
};

// Define a type for categories
type Category = {
  category: string;
};

// This function fetches all necessary data in parallel
async function getBlogData(slug: string) {
  try {
    // Fetch the main blog post
    const [blogRows]: any[] = await pool.query(
      `SELECT id, title, content, image_url, author, created_at, read_time, category 
       FROM blogs 
       WHERE slug = ?`,
      [slug]
    );

    const blog: Blog | null = blogRows.length > 0 ? blogRows[0] : null;

    if (!blog) {
      return { blog: null, recentPosts: [], categories: [] };
    }

    // Fetch recent posts (excluding the current one)
    const [recentPostRows]: any[] = await pool.query(
      `SELECT title, slug 
       FROM blogs 
       WHERE slug != ? 
       ORDER BY created_at DESC 
       LIMIT 5`,
      [slug]
    );
    const recentPosts: RecentPost[] = recentPostRows;

    // Fetch all unique categories
    const [categoryRows]: any[] = await pool.query(
      `SELECT DISTINCT category 
       FROM blogs 
       WHERE category IS NOT NULL AND category != '' 
       ORDER BY category ASC`
    );
    const categories: Category[] = categoryRows;

    return { blog, recentPosts, categories };
  } catch (error) {
    console.error("Database Error:", error);
    // In case of a database error, we return nulls to be handled by the component
    return { blog: null, recentPosts: [], categories: [] };
  }
}

// --- FIX 3: Add the explicit return type for the async component ---
export default async function BlogPostPage({ params }: PageProps): Promise<JSX.Element> {
  // --- FIX 2: Await the 'params' Promise to get the slug ---
  const { slug } = await params;
  const { blog, recentPosts, categories } = await getBlogData(slug);

  // If the blog post is not found, render the 404 page
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
