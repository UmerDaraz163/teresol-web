'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '@/components/Button.'; 

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

export default function AboutPreviewSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate the text block sliding in from the left
      const textBlock = sectionRef.current?.querySelector('.about-text');
      if (textBlock) {
        gsap.from(textBlock, {
          x: -50, 
          opacity: 0,
          duration: 1,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        });
      }

      // Animate the image block sliding in from the right
      const imageBlock = sectionRef.current?.querySelector('.about-image');
      if (imageBlock) {
        gsap.from(imageBlock, {
          x: 50, 
          opacity: 0,
          duration: 1,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        });
      }
    }, sectionRef); 

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about-preview" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Heading Content */}
          <div className="about-text">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">About Teresol</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed text-justify">
            At TeReSol, we empower enterprises to thrive in the digital era with cutting-edge fintech and customized embedded solutions. Our 400+ experts—including 20+ PhDs from top global institutions—deliver next-gen omni-channel banking, intelligent IT infrastructure, and precision RF technologies. ISO 9001, 20000, and 27001 certified, we guarantee industry-leading quality. From modernizing legacy systems to tailored consulting, TeReSol is your partner for future-ready, secure, and seamless financial transformation.
            </p>

            <Link href="/about">
              <Button btnName={"Learn More About Us"} />
            </Link>
          </div>
          {/* Image Content */}
          <div className="relative about-image">
            <img 
              src="https://readdy.ai/api/search-image?query=Professional%20team%20of%20software%20engineers%20and%20hardware%20specialists%20working%20together%20in%20modern%20office%20environment%2C%20diverse%20group%20collaborating%20on%20technology%20projects%2C%20clean%20corporate%20setting%20with%20natural%20lighting&width=600&height=400&seq=about1&orientation=landscape" 
              alt="Teresol Team" 
              className="w-full h-96 object-cover object-top rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
