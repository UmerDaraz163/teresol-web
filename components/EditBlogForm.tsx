'use client';

import { useState, useEffect } from 'react';
import { updateBlogAction } from '@/app/admin/blogs/actions';
import TiptapEditor from './TiptapEditor'; // 1. Import the Tiptap editor
import ImageUploadForm from './ImageUploadForm'; // 2. Import the Image Upload form

// Define the type for the blog prop
type Blog = {
  id: number;
  title: string;
  slug: string;
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

  // 3. Set up state for all controlled fields, including the new editor content
  const [title, setTitle] = useState(blog.title);
  const [slug, setSlug] = useState(blog.slug);
  const [content, setContent] = useState(blog.content || '');
  const [imageUrl, setImageUrl] = useState(blog.image_url || '');

  // Effect to reset state if a different blog is loaded
  useEffect(() => {
    setTitle(blog.title);
    setSlug(blog.slug);
    setContent(blog.content || '');
    setImageUrl(blog.image_url || '');
  }, [blog]);

  // Function to auto-generate the slug from the title
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

  // Callback for the image uploader
  const handleUploadComplete = (url: string) => {
    setImageUrl(url);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = await updateBlogAction(blog.id, formData);

    if (result?.error) {
      setError(result.error);
      setIsSubmitting(false);
    }
    // On success, the server action handles redirection.
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
          value={title}
          onChange={handleTitleChange}
          className="w-full p-2 mt-1 border border-gray-300 rounded-md"
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

      {/* 4. Replace the content textarea with the TiptapEditor */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Content</label>
        <TiptapEditor content={content} onChange={setContent} />
        <input type="hidden" name="content" value={content} />
      </div>

      {/* 5. Replace the image URL input with the ImageUploadForm */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Feature Image</label>
        <ImageUploadForm uploadType="blogs" onUploadComplete={handleUploadComplete} />
        <input type="hidden" name="image_url" value={imageUrl} />
        {imageUrl && (
          <div className="mt-4">
            <p className="text-sm text-gray-600">Current Image:</p>
            <img src={imageUrl} alt="Current preview" className="mt-2 rounded-lg w-full max-w-xs object-cover"/>
          </div>
        )}
      </div>

      {/* Other fields */}
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
          <label htmlFor="read_time" className="block text-sm font-medium text-gray-700">Read Time(Mins)</label>
          <input
            id="read_time"
            name="read_time"
            type="number"
            defaultValue={blog.read_time || ''}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
          />
        </div>
      </div>

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
