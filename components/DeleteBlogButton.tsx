'use client';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function DeleteBlogButton({ id }: { id: number }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      const supabase = createClient();
      const { error } = await supabase.from('blogs').delete().eq('id', id);

      if (!error) {
        router.refresh();
      } else {
        alert('Error deleting post: ' + error.message);
      }
    }
  };

  return (
    <button onClick={handleDelete} className="text-sm text-red-500 hover:underline">
      Delete
    </button>
  );
}