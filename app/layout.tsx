// app/layout.tsx

import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import type { ReactNode } from 'react';
import SmoothScroll from '@/components/SmoothScroll';

// 
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta-sans',
  weight: ['400', '700'], // Specify the weights you'll use
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
        // Apply the font variable AND the Tailwind font-sans utility class
        className={`${plusJakartaSans.variable} font-sans antialiased`}
        suppressHydrationWarning={true}
      >
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}