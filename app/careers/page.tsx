// app/careers/page.tsx

import { Metadata } from 'next';
import CareersPageClient from '@/components/CareersPageClient'; // Import the new client component

// ✅ Add your unique SEO metadata for the Careers page
export const metadata: Metadata = {
  title: 'Careers | Teresol',
  description: 'Join the Teresol team! We are looking for passionate and talented individuals to help us build the future of technology. Explore our open positions.',
  keywords: ['Teresol careers', 'tech jobs', 'software engineering jobs', 'hardware engineering jobs', 'join our team'],
};

export default function CareersPage() {
  return <CareersPageClient />;
}
