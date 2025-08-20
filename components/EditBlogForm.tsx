'use client';

import { useState } from 'react';
import { updateBlogAction } from '@/app/admin/blogs/actions'; // ✅ new import

// Define the type for the blog prop
type Blog = {
  id: number;
  title: string;
  short_desc: string | null;
  content: string | null;
  image_url: string | null;
  author: string | null;
  read_time: string | null;
  category: string | null;
  is_featured: boolean | null;
};

export default function EditBlogForm({ blog }: { blog: Blog }) {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);

    // ✅ Call update action with id + form data
    const result = await updateBlogAction(blog.id, formData);

    if (result?.error) {
      setError(result.error);
      setIsSubmitting(false);
    }
    // ✅ On success, action can redirect to /admin/blogs
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-3xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-md"
    >
      {/* Title Field */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          defaultValue={blog.title}
          className="w-full p-2 mt-1 border border-gray-300 rounded-md"
          required
        />
      </div>

      {/* Short Description Field */}
      <div>
        <label htmlFor="short_desc" className="block text-sm font-medium text-gray-700">Short Description</label>
        <textarea
          id="short_desc"
          name="short_desc"
          defaultValue={blog.short_desc || ''}
          className="w-full p-2 mt-1 border border-gray-300 rounded-md"
          rows={3}
        />
      </div>

      {/* Content Field */}
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
        <textarea
          id="content"
          name="content"
          defaultValue={blog.content || ''}
          className="w-full p-2 mt-1 border border-gray-300 rounded-md"
          rows={12}
          required
        />
      </div>

      {/* Image URL Field */}
      <div>
        <label htmlFor="image_url" className="block text-sm font-medium text-gray-700">Image URL</label>
        <input
          id="image_url"
          name="image_url"
          type="url"
          defaultValue={blog.image_url || ''}
          className="w-full p-2 mt-1 border border-gray-300 rounded-md"
        />
      </div>

      {/* Author and Read Time */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author</label>
          <input
            id="author"
            name="author"
            type="text"
            defaultValue={blog.author || ''}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="read_time" className="block text-sm font-medium text-gray-700">Read Time</label>
          <input
            id="read_time"
            name="read_time"
            type="text"
            defaultValue={blog.read_time || ''}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      {/* Category Field */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
        <input
          id="category"
          name="category"
          type="text"
          defaultValue={blog.category || ''}
          className="w-full p-2 mt-1 border border-gray-300 rounded-md"
        />
      </div>

      {/* Is Featured Checkbox */}
      <div className="flex items-center">
        <input
          id="is_featured"
          name="is_featured"
          type="checkbox"
          defaultChecked={blog.is_featured || false}
          className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
        />
        <label htmlFor="is_featured" className="ml-2 block text-sm text-gray-900">
          Mark as Featured Post
        </label>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}
