'use client';

import { useEffect, useRef } from 'react';
// import Link from 'next/link';
import Image from "next/image";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import Button from '@/components/Button.'; 

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
              At TeReSol, we enable enterprises to excel in the digital age through innovative, tailor-made embedded systems and enterprise software solutions. Backed by a team of 400+ experts—including over 20 PhDs from leading global institutions—and more than 10 million man-hours of development experience, we deliver next-generation technologies with a focus on precision, scalability, and performance.
            </p>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed text-justify">
              Our proven expertise spans the development of customized embedded products, advanced RF technologies, omni-channel banking platforms, and intelligent IT infrastructure. As an ISO 9001, 20000, and 27001 certified organization, we adhere to the highest standards of quality, security, and service management.
            </p>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed text-justify">
              Whether modernizing legacy systems or delivering specialized consulting, TeReSol is your trusted partner for secure, future-ready digital transformation.
            </p>

            {/* <Link href="/">
              <Button btnName={"Learn More About Us"} />
            </Link> */}
          </div>
          {/* Image Content */}
          <div className="relative about-image w-full aspect-[2/1] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
            <Image
              src="/about-us1.webp"
              alt="Teresol Team"
              fill
              priority
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
