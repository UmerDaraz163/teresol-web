'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { heroSlides } from '@/app/data/homepageData';
import SlideIndicator from '@/components/SlideIndicator';

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  // Default state for text is now empty
  const [displayText, setDisplayText] = useState({ title: '', subtitle: '' });
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const heroTextRef = useRef<HTMLDivElement>(null);

  // Effect for automatic slide transition
  useEffect(() => {
    const slideDuration = heroSlides[currentSlide]?.duration || 5000;
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, slideDuration);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  // Effect to control video playback and set initial text
  useEffect(() => {
    const slideData = heroSlides[currentSlide];
    
    // Check for an active cue at the very beginning (time = 0)
    let initialText = { title: '', subtitle: '' };
    if (slideData.textCues) {
      const initialCue = slideData.textCues.find(cue => cue.startTime === 0);
      if (initialCue) {
        initialText = initialCue;
      }
    } else {
      initialText = { title: slideData.title, subtitle: slideData.subtitle };
    }
    setDisplayText(initialText);

    // GSAP animation for the text container
    if (heroTextRef.current) {
        gsap.fromTo(heroTextRef.current, 
            { opacity: 0, y: 20 }, 
            { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
        );
    }
    
    // Manage video playback
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentSlide) {
          video.currentTime = 0;
          video.play().catch(error => console.error("Video autoplay failed:", error));
        } else {
          video.pause();
        }
      }
    });

  }, [currentSlide]);

  // MODIFIED: Handler now checks for a time range (start and end)
  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const video = e.currentTarget;
    const slideData = heroSlides[currentSlide];

    if (!slideData.textCues) return;

    // Find a cue where the currentTime is within its start and end time
    const activeCue = slideData.textCues.find(
      cue => video.currentTime >= cue.startTime && video.currentTime < cue.endTime
    );
      
    if (activeCue) {
      // If a cue is found, update the text only if it's different
      if (activeCue.title !== displayText.title) {
        setDisplayText(activeCue);
      }
    } else {
      // If no cue is found (i.e., we are in a gap), clear the text
      if (displayText.title !== '') {
        setDisplayText({ title: '', subtitle: '' });
      }
    }
  };

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
              ref={el => { if (el) videoRefs.current[index] = el; }}
              onTimeUpdate={handleTimeUpdate}
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
          {/* The key prop handles the hide/show animation when displayText becomes empty or populated */}
          <div key={displayText.title} ref={heroTextRef} className="hero-text">
            {/* Render only if there's a title to prevent an empty block */}
            {displayText.title && (
              <>
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  {displayText.title}
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                  {displayText.subtitle}
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      <SlideIndicator
        count={heroSlides.length}
        currentIndex={currentSlide}
        onIndicatorClick={setCurrentSlide}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      />
    </section>
  );
}