'use client';

import { signOut } from 'next-auth/react';

export default function SignOutButton() {
  const handleSignOut = async () => {
    const callbackUrl = `${window.location.origin}/admin/login`;
    await signOut({ callbackUrl });
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
