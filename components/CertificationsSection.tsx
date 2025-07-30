'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Tilt from 'react-parallax-tilt';
import { certifications, memberships } from '@/app/data/homepageData';
import SlideIndicator from '@/components/SlideIndicator';

gsap.registerPlugin(ScrollTrigger);

export default function CertificationsSection() {
  const [currentCertSlide, setCurrentCertSlide] = useState(0);
  const [currentMembershipSlide, setCurrentMembershipSlide] = useState(0);
  
  const sectionRef = useRef<HTMLElement | null>(null);
  const certSliderRef = useRef<HTMLDivElement | null>(null);
  const membershipSliderRef = useRef<HTMLDivElement | null>(null);
  
  const prevCertSlide = useRef(0);
  const certsInitialized = useRef(false);
  const prevMembershipSlide = useRef(0);
  const membershipsInitialized = useRef(false);

  const ITEMS_PER_PAGE = 4;
  const certPages = Math.ceil(certifications.length / ITEMS_PER_PAGE);
  const membershipPages = Math.ceil(memberships.length / ITEMS_PER_PAGE);

  // No changes in this section
  useEffect(() => {
    if (certPages > 1) {
      const certInterval = setInterval(() => {
        setCurrentCertSlide((prev) => (prev + 1) % certPages);
      }, 4500);
      return () => clearInterval(certInterval);
    }
  }, [certPages]);

  useEffect(() => {
    if (membershipPages > 1) {
      const membershipInterval = setInterval(() => {
        setCurrentMembershipSlide((prev) => (prev + 1) % membershipPages);
      }, 4500);
      return () => clearInterval(membershipInterval);
    }
  }, [membershipPages]);
  
  useEffect(() => {
    if (!certSliderRef.current || certPages <= 1) return;
    const slides = gsap.utils.toArray<HTMLElement>('.cert-slide');

    if (!certsInitialized.current) {
      gsap.set(slides, {
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        autoAlpha: 0, xPercent: 0, rotationY: 0
      });
      gsap.set(slides[0], { autoAlpha: 1 });
      certsInitialized.current = true;
      return;
    }

    const outgoingSlide = slides[prevCertSlide.current];
    const incomingSlide = slides[currentCertSlide];
    
    const tl = gsap.timeline();
    tl.set(incomingSlide, { autoAlpha: 1, rotationY: -80, xPercent: 100 })
      .to(outgoingSlide, { duration: 0.8, xPercent: -100, rotationY: 80, autoAlpha: 0, ease: 'power3.inOut' })
      .to(incomingSlide, { duration: 0.8, xPercent: 0, rotationY: 0, ease: 'power3.inOut' }, '<');

    prevCertSlide.current = currentCertSlide;
  }, [currentCertSlide, certPages]);

  useEffect(() => {
    if (!membershipSliderRef.current || membershipPages <= 1) return;
    const slides = gsap.utils.toArray<HTMLElement>('.membership-slide');

    if (!membershipsInitialized.current) {
      gsap.set(slides, {
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        autoAlpha: 0, xPercent: 0, rotationY: 0
      });
      gsap.set(slides[0], { autoAlpha: 1 });
      membershipsInitialized.current = true;
      return;
    }

    const outgoingSlide = slides[prevMembershipSlide.current];
    const incomingSlide = slides[currentMembershipSlide];
    
    const tl = gsap.timeline();
    tl.set(incomingSlide, { autoAlpha: 1, rotationY: -80, xPercent: 100 })
      .to(outgoingSlide, { duration: 0.8, xPercent: -100, rotationY: 80, autoAlpha: 0, ease: 'power3.inOut' })
      .to(incomingSlide, { duration: 0.8, xPercent: 0, rotationY: 0, ease: 'power3.inOut' }, '<');

    prevMembershipSlide.current = currentMembershipSlide;
  }, [currentMembershipSlide, membershipPages]);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.cert-heading', { y: 50, opacity: 0, duration: 1, ease: 'power1.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="certifications" className="sm:py-20 bg-gradient-to-b from-white to-blue-50 overflow-hidden">
      <div className="container mx-auto px-4">
        
        {/* Certifications Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-2 text-center cert-heading">Certifications</h2>
          <p className="text-lg text-gray-600 mb-6 text-center max-w-xl mx-auto">Recognized for meeting international standards of quality and excellence.</p>
          
          {certifications.length < ITEMS_PER_PAGE ? (
            <div className="flex justify-center items-stretch flex-wrap gap-6 md:gap-8 pt-4"> {/* ✨ items-stretch */}
              {certifications.map((cert) => (
                <div key={cert.title} className="w-full max-w-[260px] sm:w-auto flex"> {/* ✨ flex */}
                  <Tilt className="h-full w-full" tiltMaxAngleX={8} tiltMaxAngleY={8} perspective={1000} glareEnable={true} glareMaxOpacity={0.05} glareColor="#ffffff"> {/* ✨ h-full w-full */}
                    {/* ✨ Card structure updated for consistent height */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg text-center h-full group cert-card flex flex-col">
                      <div className="mb-4 flex justify-center items-center h-20">
                        <img src={cert.image} alt={cert.title} className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"/>
                      </div>
                      <div className="flex flex-col flex-grow justify-center">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#25237b] transition-colors duration-300">{cert.title}</h3>
                        <p className="text-gray-600 text-sm">{cert.description}</p>
                      </div>
                    </div>
                  </Tilt>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div ref={certSliderRef} className="relative min-h-[24rem] sm:min-h-[22rem] [perspective:1200px]">
                {Array.from({ length: certPages }).map((_, pageIndex) => {
                  const slideItems = certifications.slice(pageIndex * ITEMS_PER_PAGE, (pageIndex + 1) * ITEMS_PER_PAGE);
                  const isFullSlide = slideItems.length === ITEMS_PER_PAGE;
                  
                  return (
                    <div key={pageIndex} className="cert-slide [transform-style:preserve-3d]">
                      <div className="w-full h-full flex justify-center items-stretch"> {/* ✨ items-stretch */}
                        <div className={
                          isFullSlide
                            ? "inline-grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
                            : "flex justify-center items-stretch flex-wrap gap-6 md:gap-8" // ✨ items-stretch
                        }>
                          {slideItems.map((cert) => (
                            <div key={cert.title} className="w-full max-w-[260px] sm:w-auto flex"> {/* ✨ flex */}
                                <Tilt className="h-full w-full" tiltMaxAngleX={18} tiltMaxAngleY={18} perspective={1000} glareEnable={true} glareMaxOpacity={0.05} glareColor="#ffffff"> {/* ✨ h-full w-full */}
                                  {/* ✨ Card structure updated for consistent height */}
                                  <div className="bg-white p-6 rounded-2xl shadow-lg text-center h-full group cert-card flex flex-col">
                                    <div className="mb-4 flex justify-center items-center h-20">
                                      <img src={cert.image} alt={cert.title} className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"/>
                                    </div>
                                    <div className="flex flex-col flex-grow justify-center">
                                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#25237b] transition-colors duration-300">{cert.title}</h3>
                                      <p className="text-gray-600 text-sm">{cert.description}</p>
                                    </div>
                                  </div>
                                </Tilt>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <SlideIndicator
                count={certPages}
                currentIndex={currentCertSlide}
                onIndicatorClick={setCurrentCertSlide}
                className="justify-center mt-6"
              />
            </>
          )}
        </div>

        {/* Memberships Section */}
        <div>
          <h2 className="text-4xl font-bold text-gray-800 mb-2 text-center cert-heading">Memberships</h2>
          <p className="text-lg text-gray-600 mb-6 text-center max-w-xl mx-auto">Partnering with global organizations to drive innovation and growth.</p>
          
          {memberships.length < ITEMS_PER_PAGE ? (
            <div className="flex justify-center items-stretch flex-wrap gap-6 md:gap-8 pt-4"> {/* ✨ items-stretch */}
              {memberships.map((membership) => (
                <div key={membership.title} className="w-full max-w-[260px] sm:w-auto flex"> {/* ✨ flex */}
                  <Tilt className="h-full w-full" tiltMaxAngleX={18} tiltMaxAngleY={18} perspective={1000} glareEnable={true} glareMaxOpacity={0.05} glareColor="#ffffff"> {/* ✨ h-full w-full */}
                    {/* ✨ Card structure updated for consistent height */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg text-center h-full group cert-card flex flex-col">
                      <div className="mb-4 flex justify-center items-center h-20">
                        <img src={membership.image} alt={membership.title} className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"/>
                      </div>
                      <div className="flex flex-col flex-grow justify-center">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#25237b] transition-colors duration-300">{membership.title}</h3>
                        <p className="text-gray-600 text-sm">{membership.description}</p>
                      </div>
                    </div>
                  </Tilt>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div ref={membershipSliderRef} className="relative min-h-[24rem] sm:min-h-[22rem] [perspective:1200px]">
                {Array.from({ length: membershipPages }).map((_, pageIndex) => {
                  const slideItems = memberships.slice(pageIndex * ITEMS_PER_PAGE, (pageIndex + 1) * ITEMS_PER_PAGE);
                  const isFullSlide = slideItems.length === ITEMS_PER_PAGE;

                  return (
                    <div key={pageIndex} className="membership-slide [transform-style:preserve-3d]">
                      <div className="w-full h-full flex justify-center items-stretch"> {/* ✨ items-stretch */}
                        <div className={
                          isFullSlide
                            ? "inline-grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
                            : "flex justify-center items-stretch flex-wrap gap-6 md:gap-8" // ✨ items-stretch
                        }>
                          {slideItems.map((membership) => (
                            <div key={membership.title} className="w-full max-w-[260px] sm:w-auto flex"> {/* ✨ flex */}
                                <Tilt className="h-full w-full" tiltMaxAngleX={8} tiltMaxAngleY={8} perspective={1000} glareEnable={true} glareMaxOpacity={0.05} glareColor="#ffffff"> {/* ✨ h-full w-full */}
                                  {/* ✨ Card structure updated for consistent height */}
                                  <div className="bg-white p-6 rounded-2xl shadow-lg text-center h-full group cert-card flex flex-col">
                                    <div className="mb-4 flex justify-center items-center h-20">
                                      <img src={membership.image} alt={membership.title} className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"/>
                                    </div>
                                    <div className="flex flex-col flex-grow justify-center">
                                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#25237b] transition-colors duration-300">{membership.title}</h3>
                                      <p className="text-gray-600 text-sm">{membership.description}</p>
                                    </div>
                                  </div>
                                </Tilt>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <SlideIndicator
                count={membershipPages}
                currentIndex={currentMembershipSlide}
                onIndicatorClick={setCurrentMembershipSlide}
                className="justify-center mt-6"
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
}