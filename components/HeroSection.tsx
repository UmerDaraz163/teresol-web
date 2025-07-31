'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { heroSlides } from '@/app/data/homepageData';
import SlideIndicator from '@/components/SlideIndicator';

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  // Timer for automatic slide transition
  useEffect(() => {
    const slideDuration = heroSlides[currentSlide]?.duration || 5000;
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, slideDuration);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  // MODIFIED: Manually control video playback
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      // Check if the video element exists in the ref array
      if (video) {
        if (index === currentSlide) {
          video.currentTime = 0; // Reset to the beginning
          // Play the video and catch any potential browser errors
          video.play().catch(error => {
            console.error("Video autoplay failed:", error);
          });
        } else {
          video.pause();
        }
      }
    });
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
              ref={el => {
                if (el) videoRefs.current[index] = el;
              }}
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

      {/* Hero Content */}
      <div className="relative z-20 container mx-auto px-4 h-full flex items-center">
        <div className="w-full max-w-3xl hero-content">
          <div className="hero-text">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
              {heroSlides[currentSlide].subtitle}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/"
              className="bg-[#25237b] hover:bg-[#8b0303] text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg whitespace-nowrap cursor-pointer text-center"
            >
              Explore Solutions
            </Link>
            <Link
              href="/"
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 whitespace-nowrap cursor-pointer text-center"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </div>

      {/* SlideIndicator component */}
      <SlideIndicator
        count={heroSlides.length}
        currentIndex={currentSlide}
        onIndicatorClick={setCurrentSlide}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      />
    </section>
  );
}