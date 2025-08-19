// components/SignOutButton.tsx
'use client';

import { signOut } from 'next-auth/react';

export default function SignOutButton() {
  const handleSignOut = async () => {
    // The signOut function from NextAuth handles session clearing and redirection.
    await signOut({ callbackUrl: '/admin/login' });
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
