'use client';

import { useRef, useState } from 'react';
// 1. Import the correct action for CREATING a post
import { createBlogAction } from '@/app/admin/blogs/actions';

export default function BlogForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State for title and slug generation
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');

  // Function to generate a slug from the title
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;
    setTitle(newTitle);

    const newSlug = newTitle
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric characters
      .replace(/\s+/g, '-')          // Replace spaces with hyphens
      .replace(/-+/g, '-');           // Ensure single hyphens

    setSlug(newSlug);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);

    // 2. Call the create action. It doesn't need an ID.
    const blogId = 1; // Replace with the actual blog ID or fetch it dynamically
    const result = await createBlogAction(formData);

    if (result?.success) {
      formRef.current?.reset();
      setTitle('');
      setSlug('');
    }

    // On success, the action handles redirection, so no client-side changes are needed.
    // If you stay on the page, you might want to reset the form:
    // else {
    //   formRef.current?.reset();
    //   setTitle('');
    //   setSlug('');
    // }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Title Field */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={title}
          onChange={handleTitleChange}
          className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>

      {/* Slug Field */}
      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-gray-700">Slug</label>
        <input
          id="slug"
          name="slug"
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full p-2 mt-1 border border-gray-300 rounded-md bg-gray-50"
          required
        />
      </div>

      {/* All other form fields remain the same... */}
      {/* Short Description (Excerpt) Field */}
      <div>
        <label htmlFor="short_desc" className="block text-sm font-medium text-gray-700">Short Description (Excerpt)</label>
        <textarea id="short_desc" name="short_desc" className="w-full p-2 mt-1 border border-gray-300 rounded-md" rows={3} />
      </div>

      {/* Content Field */}
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
        <textarea id="content" name="content" className="w-full p-2 mt-1 border border-gray-300 rounded-md" rows={12} required />
      </div>

      {/* Image URL Field */}
      <div>
        <label htmlFor="image_url" className="block text-sm font-medium text-gray-700">Image URL</label>
        <input id="image_url" name="image_url" type="url" placeholder="https://example.com/image.png" className="w-full p-2 mt-1 border border-gray-300 rounded-md" />
      </div>

      {/* Author and Read Time */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author</label>
          <input id="author" name="author" type="text" className="w-full p-2 mt-1 border border-gray-300 rounded-md" />
        </div>
        <div>
          <label htmlFor="read_time" className="block text-sm font-medium text-gray-700">Read Time</label>
          <input id="read_time" name="read_time" type="text" placeholder="e.g., 5 min read" className="w-full p-2 mt-1 border border-gray-300 rounded-md" />
        </div>
      </div>

      {/* Category Field */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
        <input id="category" name="category" type="text" placeholder="e.g., Technology" className="w-full p-2 mt-1 border border-gray-300 rounded-md" />
      </div>

      {/* Is Featured Checkbox */}
      <div className="flex items-center">
        <input id="is_featured" name="is_featured" type="checkbox" className="h-4 w-4 text-indigo-600 border-gray-300 rounded" />
        <label htmlFor="is_featured" className="ml-2 block text-sm text-gray-900">Mark as Featured Post</label>
      </div>

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      {/* Submit Button */}
      <div>
        <button type="submit" disabled={isSubmitting} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-400">
          {isSubmitting ? 'Creating...' : 'Create Post'}
        </button>
      </div>
    </form>
  );
}
