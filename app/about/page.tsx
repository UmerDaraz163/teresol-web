// app/about/page.tsx

import { Metadata } from 'next';
import AboutPageClient from '@/components/AboutPageClient'; // Import the new client component

// ✅ Add your unique SEO metadata for the About page here
export const metadata: Metadata = {
  title: 'About Teresol',
  description: 'Learn about Teresol, our mission, values, and the expert leadership team driving our innovative technology solutions.',
  keywords: ['about Teresol', 'Teresol team', 'company values', 'tech leadership'],
};

export default function About() {
  return <AboutPageClient />;
}
