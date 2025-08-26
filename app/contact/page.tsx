// app/contact/page.tsx

import { Metadata } from 'next';
import ContactPageClient from '@/components/ContactPageClient'; // Import the new client component

// ✅ Add your unique SEO metadata for the Contact page
export const metadata: Metadata = {
  title: 'Contact Us | Teresol',
  description: 'Get in touch with the Teresol team. Contact us for inquiries, project discussions, or support. We are here to help you with our expert technology solutions.',
  keywords: ['contact Teresol', 'Teresol support', 'project inquiry', 'tech consultation', 'get in touch'],
};

export default function Contact() {
  return <ContactPageClient />;
}
