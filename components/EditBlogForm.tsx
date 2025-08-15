'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

type Blog = {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  slug: string;
};

export default function EditBlogForm({ blog }: { blog: Blog }) {
  const router = useRouter();
  const supabase = createClient();
  
  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content);
  const [excerpt, setExcerpt] = useState(blog.excerpt);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await supabase
      .from('blogs')
      .update({ title, content, excerpt })
      .eq('id', blog.id);

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
      {/* Form fields are the same as BlogForm, just pre-filled */}
      <div>
        <label htmlFor="title" className="block font-medium">Title</label>
        <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 mt-1 border rounded-md" required />
      </div>
      <div>
        <label htmlFor="excerpt" className="block font-medium">Excerpt</label>
        <textarea id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} className="w-full p-2 mt-1 border rounded-md" rows={3} required />
      </div>
      <div>
        <label htmlFor="content" className="block font-medium">Content</label>
        <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} className="w-full p-2 mt-1 border rounded-md" rows={10} required />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md disabled:bg-gray-400" disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
}