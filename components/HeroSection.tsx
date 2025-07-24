'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { heroSlides } from '@/app/data/homepageData';

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Effect for the slider interval
  useEffect(() => {
    const heroInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(heroInterval);
  }, []);

  // Effect for the animation
  useEffect(() => {
    const animation = gsap.fromTo(
      ".hero-content",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 0.5 }
    );

    return () => {
      animation.kill(); // Cleanup GSAP animation
    };
  }, [currentSlide]);

  return (
    <section className="relative h-screen overflow-hidden">
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
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-4 h-4 rounded-full border border-white transition-all duration-300 cursor-pointer ${
              index === currentSlide
                ? 'bg-white shadow-md scale-110'
                : 'bg-white/30 hover:scale-125'
            }`}
          />
        ))}
      </div>
    </section>
  );
}