// components/BlogForm.tsx
'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client'; // Your client-side client

export default function BlogForm() {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    const { error } = await supabase.from('blogs').insert({
      title,
      excerpt,
      // You can add other fields here based on your table columns
      date: new Date().toISOString(),
      category: 'Technology', // Example static value
    });

    if (error) {
      setMessage('Error creating blog: ' + error.message);
    } else {
      setMessage('Blog post created successfully!');
      // Clear the form
      setTitle('');
      setExcerpt('');
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
      <div>
        <label htmlFor="title" className="block font-medium text-gray-700">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mt-1 border rounded-md shadow-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="excerpt" className="block font-medium text-gray-700">Excerpt</label>
        <textarea
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className="w-full p-2 mt-1 border rounded-md shadow-sm"
          rows={6}
          required
        ></textarea>
      </div>
      <button 
        type="submit" 
        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:bg-gray-400"
        disabled={isLoading}
      >
        {isLoading ? 'Creating...' : 'Create Post'}
      </button>
      {message && <p className="mt-4 text-sm">{message}</p>}
    </form>
  );
}