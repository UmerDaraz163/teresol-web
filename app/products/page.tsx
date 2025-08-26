// app/products/page.tsx

import { Metadata } from 'next';
import ProductsPageClient from '@/components/ProductsPageClient'; // Import the new client component

// ✅ Add your unique SEO metadata for the Products page
export const metadata: Metadata = {
  title: 'Our Products | Teresol',
  description: 'Explore Teresol’s portfolio of innovative hardware and software products, including Single Board Computers, video processing cards, and enterprise software solutions.',
  keywords: ['Teresol products', 'hardware solutions', 'enterprise software', 'SBC', 'video processing', 'fintech solutions'],
};

// This Server Component now only renders the client component
export default function Products() {
  return <ProductsPageClient />;
}