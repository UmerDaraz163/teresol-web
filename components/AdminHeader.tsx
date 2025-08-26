'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import SignOutButton from './SignOutButton';

interface AdminHeaderProps {
  showBackButton?: boolean;
  showSignOutButton?: boolean;
}

export default function AdminHeader({
  showBackButton = false,
  showSignOutButton = false,
}: AdminHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    router.back(); // 🔥 This goes to the actual previous page in history
  };

  return (
    <header className="w-full flex items-center justify-between px-4 py-4 bg-gray-100 shadow-sm rounded-md mb-4">
      {/* Left side (Back button) */}
      <div>
        {showBackButton && (
          <button
            type="button"
            onClick={handleBack}
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            <ArrowLeft size={18} />
            <span>Back</span>
          </button>
        )}
      </div>

      {/* Right side (Sign Out button) */}
      <div>
        {showSignOutButton && <SignOutButton />}
      </div>
    </header>
  );
}
