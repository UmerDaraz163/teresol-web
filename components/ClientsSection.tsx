'use client';

import { useEffect, useRef } from 'react';

import gsap from 'gsap';

import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { clients } from '@/app/data/homepageData';

// Register GSAP plugin

gsap.registerPlugin(ScrollTrigger);

export default function ClientsSection() {

    // ref for the main section element

    const sectionRef = useRef<HTMLElement | null>(null);
    // Duplicate the clients array for looping effect
    const duplicatedClients = [...clients, ...clients];
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
        <section ref={sectionRef} id="clients" className="py-20 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#25237b] to-[#8b0303]">
                    Our Valuable Clients
                </h2>
                <p className="text-lg mb-12 max-w-2xl mx-auto text-gray-600">
                    Trusted by Global Industry Leaders and Renowned Institutions Worldwide
                </p>
                <div className="relative group">
                    {/* MODIFIED: Increased spacing for larger cards */}
                    <div className="flex space-x-20 w-max animate-marquee group-hover:[animation-play-state:paused]">
                        {duplicatedClients.map((client, index) => (
                            <div
                                key={index}
                                className="relative group flex-shrink-0 w-72 h-40 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-md p-4 flex flex-col items-center justify-center transform hover:scale-105 transition-transform duration-300"
                            >
                                <img
                                    src={client.logo}
                                    alt={client.name}
                                    className="max-h-28 max-w-full object-contain transition duration-150"
                                />
                                {/* <div className="absolute bottom-2 opacity-0 group-hover:opacity-100 text-sm font-medium text-[#8b0303] transition-opacity duration-300">
                                    {client.name}

                                    </div> */}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );

}