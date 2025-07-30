'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { markers, stats } from '@/app/data/homepageData';
import MapMarker from '@/components/MapMarker';
import StatCard from '@/components/StatCard';

gsap.registerPlugin(ScrollTrigger);

export default function MapAndStatSection() {

  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {

    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="map" className="py-24 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Map Column */}
          <div className="lg:col-span-3">
            <div className="relative w-full h-96 lg:h-[32rem] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/World-Map1.1.png"
                alt="World Map"
                className="w-full h-full object-contain transition-transform duration-700 ease-in-out hover:scale-105"
              />
              {markers.map(marker => (
                <MapMarker key={marker.name} marker={marker} />
              ))}
            </div>
          </div>
          {/* Stats Column */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-6">
              International Footprint
            </h2>
            {stats.map(stat => (
              <StatCard key={stat.title} stat={stat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
