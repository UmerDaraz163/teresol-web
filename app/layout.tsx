// app/layout.tsx

import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import type { ReactNode } from 'react';
import SmoothScroll from '@/components/SmoothScroll';
import AuthProvider from '@/components/AuthProvider'; // <-- Import the provider

export const dynamic = "force-dynamic"; // 🚀 force dynamic rendering
export const revalidate = 0; // 🚀 disable caching globally

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta-sans',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: "Teresol Pvt Ltd",
  description: "Innovatively Creative",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${plusJakartaSans.variable} font-sans antialiased`}
        suppressHydrationWarning={true}
      >
        <AuthProvider> 
          <SmoothScroll />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
