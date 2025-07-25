'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { certifications } from '@/app/data/homepageData'; // Adjust path if needed

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

export default function CertificationsSection() {
  const [currentCertSlide, setCurrentCertSlide] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const numPages = Math.ceil(certifications.length / 4);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentCertSlide((prev) => (prev + 1) % numPages);
    }, 4000);
    return () => clearInterval(slideInterval);
  }, [numPages]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {

      const heading = sectionRef.current?.querySelector('.cert-heading');
      if (heading) {
        gsap.from(heading, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        });
      }
      const certCards = gsap.utils.toArray('.cert-card') as HTMLElement[];
      certCards.forEach(card => {
        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
          }
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="certifications" className="py-16 sm:py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 cert-heading">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Certifications & Memberships
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Global Certifications & Memberships for Distinction
          </p>
        </div>
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentCertSlide * 100}%)` }}
          >
            {Array.from({ length: numPages }).map((_, pageIndex) => (
              <div key={pageIndex} className="w-full flex-shrink-0">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 cert-grid">
                  {certifications.slice(pageIndex * 4, (pageIndex + 1) * 4).map((cert) => (
                    <div
                      key={cert.title}
                      className="bg-white p-6 rounded-2xl shadow-lg text-center transition-all duration-500 transform cursor-pointer group cert-card"
                    >
                      <div className="mb-4 flex justify-center items-center h-20">
                        <img
                          src={cert.image}
                          alt={cert.title}
                          className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#25237b] transition-colors duration-300">
                        {cert.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{cert.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-16 space-x-3">
            {Array.from({ length: numPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentCertSlide(index)}
                className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 cursor-pointer hover:scale-125 ${index === currentCertSlide ? 'bg-[#25237b]' : 'bg-gray-300'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
