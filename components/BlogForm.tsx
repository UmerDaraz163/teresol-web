//components/BlogForm.tsx
'use client';

import { useRef, useState } from 'react';
import { updateBlogAction } from '@/app/admin/blogs/actions'; // Adjust path if needed

export default function BlogForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const blogId = 1; // Replace with the actual blog ID or fetch dynamically
    const result = await updateBlogAction(blogId, formData);

    if (result?.error) {
      setError(result.error);
      setIsSubmitting(false);
    }
    // On success, the action redirects, so no further client-side action is needed.
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-md">
      {/* Title Field */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <input id="title" name="title" type="text" className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" required />
      </div>

      {/* Short Description (Excerpt) Field */}
      <div>
        <label htmlFor="short_desc" className="block text-sm font-medium text-gray-700">Short Description (Excerpt)</label>
        <textarea id="short_desc" name="short_desc" className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" rows={3} />
      </div>

      {/* Content Field */}
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
        <textarea id="content" name="content" className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" rows={12} required />
      </div>

      {/* Image URL Field */}
      <div>
        <label htmlFor="image_url" className="block text-sm font-medium text-gray-700">Image URL</label>
        <input id="image_url" name="image_url" type="url" placeholder="https://example.com/image.png" className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
      </div>

      {/* Author and Read Time in a grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author</label>
          <input id="author" name="author" type="text" className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div>
          <label htmlFor="read_time" className="block text-sm font-medium text-gray-700">Read Time</label>
          <input id="read_time" name="read_time" type="text" placeholder="e.g., 5 min read" className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
      </div>

      {/* Category Field */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
        <input id="category" name="category" type="text" placeholder="e.g., Technology" className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
      </div>

      {/* Is Featured Checkbox */}
      <div className="flex items-center">
        <input id="is_featured" name="is_featured" type="checkbox" className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
        <label htmlFor="is_featured" className="ml-2 block text-sm text-gray-900">Mark as Featured Post</label>
      </div>

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      {/* Submit Button */}
      <div>
        <button type="submit" disabled={isSubmitting} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400">
          {isSubmitting ? 'Creating...' : 'Create Post'}
        </button>
      </div>
    </form>
  );
}
