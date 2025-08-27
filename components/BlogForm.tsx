'use client';

import { useRef, useState } from 'react';
import { createBlogAction } from '@/app/admin/blogs/actions';
import ImageUploadForm from '@/components/ImageUploadForm'; // ✅ 1. Import the upload form

export default function BlogForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');

  // ✅ 2. Add state to hold the uploaded image URL
  const [imageUrl, setImageUrl] = useState<string>('');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;
    setTitle(newTitle);

    const newSlug = newTitle
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

    setSlug(newSlug);
  };

  // ✅ 3. Create a callback function to receive the URL from the upload component
  const handleUploadComplete = (url: string) => {
    setImageUrl(url);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);

    // The hidden input for image_url will automatically be included in formData
    const result = await createBlogAction(formData);

    // If the server action returns a value, it means an error occurred.
    if (result?.error) {
      setError(result.error);
    }

    // On success, the page redirects, so no form reset is needed here.
    // We only stop the submitting state if there was an error.
    setIsSubmitting(false);
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

      {/* ✅ 4. Replace the old input with the ImageUploadForm component */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Feature Image</label>
        <ImageUploadForm uploadType="blogs" onUploadComplete={handleUploadComplete} />
        {/* Use a hidden input to pass the imageUrl to the FormData */}
        <input type="hidden" name="image_url" value={imageUrl} />
        {imageUrl && (
          <div className="mt-4">
            <p className="text-sm text-gray-600">Image uploaded:</p>
            <img src={imageUrl} alt="Uploaded preview" className="mt-2 rounded-lg w-full max-w-xs object-cover" />
          </div>
        )}
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
