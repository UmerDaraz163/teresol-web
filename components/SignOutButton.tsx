// components/SignOutButton.tsx
'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client'; // The browser client

export default function SignOutButton() {
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh(); // Refreshes the page, which will trigger the server-side redirect
    router.push('/admin/login');
  };

  return (
    <button
      onClick={handleSignOut}
      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
    >
      Sign Out
    </button>
  );
}