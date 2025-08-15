'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function BlogForm() {
  const router = useRouter();
  const supabase = createClient();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [short_desc, setExcerpt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Function to generate a slug from the title
  const createSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const slug = createSlug(title);

    const { error } = await supabase.from('blogs').insert({
      title,
      content,
      short_desc,
      slug,
    });

    if (!error) {
      router.push('/admin/blogs');
      router.refresh();
    } else {
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
      <div>
        <label htmlFor="title" className="block font-medium">Title</label>
        <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 mt-1 border rounded-md" required />
      </div>
      <div>
        <label htmlFor="excerpt" className="block font-medium">Excerpt</label>
        <textarea id="excerpt" value={short_desc} onChange={(e) => setExcerpt(e.target.value)} className="w-full p-2 mt-1 border rounded-md" rows={3} required />
      </div>
      <div>
        <label htmlFor="content" className="block font-medium">Content</label>
        <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} className="w-full p-2 mt-1 border rounded-md" rows={10} required />
      </div>
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md disabled:bg-gray-400" disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Create Post'}
      </button>
    </form>
  );
}