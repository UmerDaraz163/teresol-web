import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import type { ReactNode } from 'react';
import SmoothScroll from '@/components/SmoothScroll';

// Instantiate the Plus Jakarta Sans font
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta-sans', // Assign a CSS variable
});

export const metadata: Metadata = {
  title: "Teresol Pvt Ltd",
  description: "Innovatively Creative",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        // Apply the font variable to the body
        className={`${plusJakartaSans.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}