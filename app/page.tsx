'use client';

// Component Imports
import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import FeaturedServicesSection from '@/components/FeaturedServicesSection';
import MapAndStatSection from '@/components/MapAndStatSection';
import ClientsSection from '@/components/ClientsSection';
import CertificationsSection from '@/components/CertificationsSection';
import FeaturedBlogsSection from '@/components/FeaturedBlogsSection';
import AboutPreviewSection from '@/components/AboutPreviewSection';
import CTASection from '@/components/CTASection';

//  Styles
import './styles/homepage.css';

export default function Home() {
  useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <FeaturedServicesSection />
        <MapAndStatSection />
        <ClientsSection />
        <CertificationsSection />
        <FeaturedBlogsSection />
        <AboutPreviewSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}