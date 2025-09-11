'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { clients } from '@/app/data/homepageData'; 

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

export default function ClientsSection() {
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
        <section ref={sectionRef} id="clients" className="py-20 bg-white">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#25237b] to-[#8b0303]">
                    Our Valuable Clients
                </h2>
                <p className="text-lg mb-12 max-w-2xl mx-auto text-gray-600">
                    Trusted by Global Industry Leaders and Renowned Institutions Worldwide
                </p>
                {/* ✅ FIX: Changed from a scrolling marquee to a wrapping flexbox grid */}
                <div className="flex flex-wrap justify-center items-center gap-16">
                    {/* ✅ FIX: Mapped over the original 'clients' array, not the duplicated one */}
                    {clients.map((client, index) => (
                        <div
                            key={index}
                            className="w-72 h-40 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-md p-4 flex flex-col items-center justify-center transform hover:scale-105 transition-transform duration-300"
                        >
                            <img
                                src={client.logo}
                                alt={client.name}
                                className="max-h-28 max-w-full object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}