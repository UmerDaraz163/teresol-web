'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { heroSlides } from '@/app/data/homepageData';
import SlideIndicator from '@/components/SlideIndicator';

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const heroInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(heroInterval);
  }, []);

  useEffect(() => {
    const animation = gsap.fromTo(
      ".hero-content",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 }
    );
    return () => {
      animation.kill(); 
    };
  }, [currentSlide]);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {slide.video ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              key={slide.video}
            >
              <source src={slide.video} type="video/mp4" />
            </video>
          ) : (
            <div
              style={{ backgroundImage: `url(${slide.image})` }}
              className="absolute inset-0 bg-cover bg-center"
            ></div>
          )}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      ))}
      
      {/* Hero Content */}
      <div className="relative z-20 container mx-auto px-4 h-full flex items-center">
        <div className="w-full max-w-3xl hero-content">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            {heroSlides[currentSlide].title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
            {heroSlides[currentSlide].subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/solutions"
              className="bg-[#25237b] hover:bg-[#8b0303] text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg whitespace-nowrap cursor-pointer text-center"
            >
              Explore Solutions
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 whitespace-nowrap cursor-pointer text-center"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </div>
      
      {/* ✨ 2. Use the reusable SlideIndicator component */}
      <SlideIndicator
        count={heroSlides.length}
        currentIndex={currentSlide}
        onIndicatorClick={setCurrentSlide}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      />
    </section>
  );
}