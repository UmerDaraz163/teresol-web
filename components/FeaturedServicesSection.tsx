'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Tilt from 'react-parallax-tilt';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { featuredServices } from '@/app/data/homepageData';

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedServicesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const leftColumnRef = useRef<HTMLDivElement | null>(null);
  const headingContentRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !leftColumnRef.current || !headingContentRef.current || !headingRef.current || !paragraphRef.current || !cardsContainerRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        '(min-width: 1024px)': function () {
          ScrollTrigger.create({
            trigger: sectionRef.current,
            pin: leftColumnRef.current,
            start: 'top 128px',
            end: () => `+=${cardsContainerRef.current!.offsetHeight - leftColumnRef.current!.offsetHeight}`,
          });

          const flippingWord = headingRef.current?.querySelector("#flipping-word");

          gsap.set(headingRef.current, { xPercent: 100, scale: 1.5 });
          gsap.set(paragraphRef.current, { xPercent: 100, opacity: 70 });

          const serviceCards = gsap.utils.toArray(cardsContainerRef.current!.children);
          gsap.set(serviceCards, { opacity: 0, y: 30 });

          const servicesTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 40%",
              end: "top 10%",
              scrub: 2,
            }
          });

          servicesTimeline.to(headingRef.current, {
            xPercent: 0,
            scale: 1,
            x: 20,
            duration: 5,
            ease: "slow(0.7,0.7,false)",
          });

          servicesTimeline.to(paragraphRef.current, {
            xPercent: 0,
            opacity: 1,
            x: 20,
            duration: 5,
            ease: "slow(0.7,0.7,false)",
          }, "<");

          if (flippingWord) {
            servicesTimeline.from(flippingWord, {
              rotationX: -360,
              ease: 'power3.inOut',
              duration: 1.5
            }, "<");
          }

          servicesTimeline
            .to(serviceCards, {
              opacity: 1,
              y: 0,
              stagger: 0.1,
              ease: 'power2.out'
            }, "-=1.5")
            .to(headingContentRef.current, {
              y: 45,
              x: 20,
              ease: 'sine.inOut'
            }, "<");

          return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
          };
        },
        '(max-width: 1023px)': function () {
          gsap.from([headingContentRef.current, cardsContainerRef.current], {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power2.out',
            stagger: 0.2,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          });

          return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
          };
        }
      });

      const sectionTrigger = {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5
      };

      gsap.fromTo("#windmill-1", { xPercent: -100, rotation: -90 }, { xPercent: 100, rotation: 180, ease: "none", scrollTrigger: sectionTrigger });
      gsap.fromTo("#windmill-2", { yPercent: 100, rotation: 0 }, { yPercent: -100, rotation: -180, ease: "none", scrollTrigger: { ...sectionTrigger, scrub: 2.5 } });
      gsap.fromTo("#windmill-3", { xPercent: 150, yPercent: -150, rotation: 50 }, { xPercent: -150, yPercent: 150, rotation: -270, ease: "none", scrollTrigger: sectionTrigger });

      const bulbGlow = sectionRef.current?.querySelector("#bulb-glow");
      if (bulbGlow) {
        gsap.set(bulbGlow, { opacity: 0 });
        const flickerTimeline = gsap.timeline().to(bulbGlow, { opacity: 1, duration: 0.1 }).to(bulbGlow, { opacity: 0.2, duration: 0.1 }).to(bulbGlow, { opacity: 1, duration: 0.2 }).to(bulbGlow, { opacity: 0, duration: 0.2 }, "+=0.3").to(bulbGlow, { opacity: 1, duration: 0.15 }).to(bulbGlow, { opacity: 0.5, duration: 0.1 }).to(bulbGlow, { opacity: 1, duration: 0.3 });
        ScrollTrigger.create({ animation: flickerTimeline, trigger: sectionRef.current, start: "top center", end: "bottom bottom", scrub: true });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="featured-services" className="relative min-h-screen py-20 bg-gray-50 overflow-x-clip">
      <div className="absolute inset-0 z-0 opacity-50 pointer-events-none">
        <svg id="windmill-1" className="absolute top-[10%] left-0 w-48 h-48 text-gray-500/50" viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M50 50 L5 20 C10 5, 40 5, 45 20 L50 50Z" /><path d="M50 50 L80 5 C70 10, 60 40, 80 45 L50 50Z" /><path d="M50 50 L95 80 C90 95, 60 95, 55 80 L50 50Z" /><path d="M50 50 L20 95 C30 90, 40 60, 20 55 L50 50Z" /></svg>
        <svg id="windmill-2" className="absolute bottom-[5%] right-0 w-64 h-64 text-gray-500/50" viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M50 50 L5 20 C10 5, 40 5, 45 20 L50 50Z" /><path d="M50 50 L80 5 C70 10, 60 40, 80 45 L50 50Z" /><path d="M50 50 L95 80 C90 95, 60 95, 55 80 L50 50Z" /><path d="M50 50 L20 95 C30 90, 40 60, 20 55 L50 50Z" /></svg>
        <svg id="windmill-3" className="absolute top-1/2 left-0 w-20 h-20 text-gray-500/50" viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M50 50 L5 20 C10 5, 40 5, 45 20 L50 50Z" /><path d="M50 50 L80 5 C70 10, 60 40, 80 45 L50 50Z" /><path d="M50 50 L95 80 C90 95, 60 95, 55 80 L50 50Z" /><path d="M50 50 L20 95 C30 90, 40 60, 20 55 L50 50Z" /></svg>
      </div>
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
        <div ref={leftColumnRef} className="lg:col-span-2 text-center lg:text-left">
          <div ref={headingContentRef}>
            <h2 ref={headingRef} className="font-extrabold mb-8 text-[14px] md:text-5xl relative [perspective:1000px] [transform-style:preserve-3d] whitespace-nowrap">
              <span className="bg-gradient-to-r from-[#25237b] to-[#8b0303] bg-clip-text text-transparent">Featured</span>{' '}
              <span id="flipping-word" className="inline-block backface-hidden text-[#25237b]">Services</span>
            </h2>
            <p ref={paragraphRef} className="leading-relaxed text-lg md:text-xl bg-gradient-to-r from-[#25237b] to-[#8b0303] text-transparent bg-clip-text">
              Discover our most popular technology solutions that drive business success
            </p>
            <div className="mt-16 mx-auto flex justify-center lg:justify-start">
              <svg id="idea-bulb" className="w-24 h-24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path id="bulb-glow" d="M12,6 C9.79,6 8,7.79 8,10 C8,11.83 9.17,13.42 11,13.85 L11,15 L9,15 C8.45,15 8,15.45 8,16 L8,17 L16,17 L16,16 C16,15.45 15.55,15 15,15 L13,15 L13,13.85 C14.83,13.42 16,11.83 16,10 C16,7.79 14.21,6 12,6 Z" fill="#FBBF24" /><path d="M12,2 C7.59,2 4,5.59 4,10 C4,13.04 5.92,15.64 8.7,16.65 L8,17 L8,18 C8,18.55 8.45,19 9,19 L15,19 C15.55,19 16,18.55 16,18 L16,17 L15.3,16.65 C18.08,15.64 20,13.04 20,10 C20,5.59 16.41,2 12,2 Z M12,17 C11.45,17 11,17.45 11,18 L11,19 L13,19 L13,18 C13,17.45 12.55,17 12,17 Z M12,4 C15.31,4 18,6.69 18,10 C18,12.53 16.36,14.61 14,15.13 L14,16 C14,16.55 13.55,17 13,17 L11,17 C10.45,17 10,16.55 10,16 L10,15.13 C7.64,14.61 6,12.53 6,10 C6,6.69 8.69,4 12,4 Z" fill="currentColor" className="text-gray-400" /></svg>
            </div>
          </div>
        </div>
        <div ref={cardsContainerRef} className="lg:col-span-3 flex flex-col gap-8">
          {featuredServices.map((service) => (
            <Tilt key={service.title} glareEnable={true} glareMaxOpacity={0.2} glareColor="#ffffff" tiltMaxAngleX={10} tiltMaxAngleY={10}>
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-3 hover:scale-[1.03] transition-all duration-500 group service-card">
                <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-full mb-6">
                  {service.icon.includes('.') ? (

                    <div
                      className={`${service.icon.includes('ai.png') ? 'w-12 h-12' : 'w-10 h-10'
                        } bg-[#25237b] group-hover:bg-[#8b0303] transition-colors duration-300`} style={{
                          maskImage: `url(${service.icon})`,
                          WebkitMaskImage: `url(${service.icon})`,
                          maskSize: 'contain',
                          WebkitMaskSize: 'contain',
                          maskRepeat: 'no-repeat',
                          WebkitMaskRepeat: 'no-repeat',
                          maskPosition: 'center',
                          WebkitMaskPosition: 'center',
                        }}
                    ></div>
                  ) : (
                    // Standard icon font rendering
                    <i className={`${service.icon} text-5xl text-[#25237b] group-hover:text-[#8b0303] transition-colors duration-300`}></i>
                  )}
                </div>                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1 group-hover:text-blue-600">{service.title}</h3>
                <p className="text-sm md:text-base text-gray-600 mb-2">{service.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">{service.features.map((feature, i) => (<span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs sm:text-sm rounded-full group-hover:bg-blue-100 group-hover:text-blue-800">{feature}</span>))}</div>

                <div className="flex flex-wrap justify-start items-center gap-4 my-4 lg:flex-nowrap lg:justify-between lg:gap-0">
                  {service.techIcons?.map((iconUrl, index) => (
                    <img
                      key={index}
                      src={iconUrl}
                      alt={`Tech icon ${index + 1}`}
                      className="h-8 w-auto object-contain lg:h-auto lg:w-full lg:max-w-[180px] lg:rounded-lg"
                    />
                  ))}
                </div>
                <Link href={`/`} className="inline-block bg-[#25237b] hover:bg-[#8b0303] text-white px-6 py-2 rounded-lg font-medium text-sm md:text-base transition-all duration-300 hover:scale-105">Learn More</Link>

              </div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}