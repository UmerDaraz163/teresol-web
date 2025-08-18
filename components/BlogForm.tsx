'use client';
import { useState } from 'react';
// Note: 'next/navigation' is the standard import for routing hooks in Next.js 13+ App Router.
import { useRouter } from 'next/navigation';
// Note: '@/...' is a path alias. Ensure it's configured in your jsconfig.json or tsconfig.json.
import { createClient } from '@/lib/supabase/client';

export default function BlogForm() {
  const router = useRouter();
  const supabase = createClient();

  // State for all form fields
  const [title, setTitle] = useState('');
  const [short_desc, setShortDesc] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [author, setAuthor] = useState('');
  const [readTime, setReadTime] = useState('');
  const [category, setCategory] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages

  // Function to generate a slug from the title
  const createSlug = (titleString: string) => {
    return titleString
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous errors

    if (!title) {
      setErrorMessage("Title is required.");
      return;
    }
    setIsLoading(true);

    const slug = createSlug(title);

    // Insert new blog post with all the fields
    const { error } = await supabase.from('blogs').insert({
      title,
      short_desc,
      content,
      image_url: imageUrl,
      author,
      read_time: readTime,
      category,
      is_featured: isFeatured,
      slug,
    });

    if (!error) {
      // Redirect to the blogs overview page on success
      router.push('/admin/blogs');
      router.refresh(); // Refresh server components to show the new post
    } else {
      console.error('Error creating post:', error);
      setErrorMessage(`Error creating post: ${error.message}`);
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-md">
      {/* Title Field */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" required />
      </div>

      {/* Short Description (Excerpt) Field */}
      <div>
        <label htmlFor="short_desc" className="block text-sm font-medium text-gray-700">Short Description (Excerpt)</label>
        <textarea id="short_desc" value={short_desc} onChange={(e) => setShortDesc(e.target.value)} className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" rows={3} />
      </div>

      {/* Content Field */}
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
        <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" rows={12} required />
      </div>

      {/* Image URL Field */}
      <div>
        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
        <input id="imageUrl" type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://example.com/image.png" className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
      </div>

      {/* Author and Read Time in a grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author</label>
          <input id="author" type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div>
          <label htmlFor="readTime" className="block text-sm font-medium text-gray-700">Read Time</label>
          <input id="readTime" type="text" value={readTime} onChange={(e) => setReadTime(e.target.value)} placeholder="e.g., 5 min read" className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
      </div>

      {/* Category Field */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
        <input id="category" type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g., Technology" className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
      </div>

      {/* Is Featured Checkbox */}
      <div className="flex items-center">
        <input id="isFeatured" name="isFeatured" type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
        <label htmlFor="isFeatured" className="ml-2 block text-sm text-gray-900">Mark as Featured Post</label>
      </div>

      {/* Error Message Display */}
      {errorMessage && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
          <p>{errorMessage}</p>
        </div>
      )}

      {/* Submit Button */}
      <div>
        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create Post'}
        </button>
      </div>
    </form>
  );
}
