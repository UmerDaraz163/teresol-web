// app/services/page.tsx

import { Metadata } from 'next';
import ServicesPageClient from '@/components/ServicesPageClient'; // Import the new client component

// ✅ Add your unique SEO metadata for the Services page
export const metadata: Metadata = {
  title: 'Our Core Services | Teresol',
  description: 'Explore Teresol\'s core services, including embedded hardware solutions, enterprise software development, and AI development. We deliver end-to-end technology solutions.',
  keywords: ['Teresol services', 'embedded hardware', 'enterprise software', 'AI development', 'technology solutions', 'custom software'],
};

export default function Services() {
  return <ServicesPageClient />;
}
