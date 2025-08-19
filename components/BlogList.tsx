// components/BlogList.tsx
'use client';

import { useState, useEffect } from 'react';

type Blog = {
  id: number;
  created_at: string;
  title: string;
  short_desc: string;
  author?: string; 
  image_url?: string;
  category?: string; 
};

export default function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        // Fetch data from your new API route
        const response = await fetch('/api/blogs');
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    getBlogs();
  }, []); // The empty array ensures this runs only once on mount

  if (loading) {
    return <p>Loading blogs...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Latest Blogs</h2>
      {blogs.length > 0 ? (
        <ul>
          {blogs.map((blog) => (
            <li key={blog.id} className="p-2 border-b">
              {blog.title}
              {blog.short_desc && <p className="text-sm text-gray-600">{blog.short_desc}</p>}
              <p className="text-xs text-gray-400">Published on {new Date(blog.created_at).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No blogs found.</p>
      )}
    </div>
  );
}
