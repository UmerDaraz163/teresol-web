'use client';

import { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import Button from '@/components/Button.';
import StatCard from '@/components/StatCard';
import HeroSection from '@/components/HeroSection';
import MapMarker from '@/components/MapMarker';
import Tilt from 'react-parallax-tilt';
import './styles/homepage.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentCertSlide, setCurrentCertSlide] = useState(0);
  const [visibleSections, setVisibleSections] = useState<{ [key: string]: boolean }>({});
  const [mounted, setMounted] = useState(false);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const [hasEnteredServices, setHasEnteredServices] = useState(false);
  const headingContentRef = useRef<HTMLDivElement | null>(null);
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);



  // Refs for GSAP animations
  const headingContainerRef = useRef<HTMLDivElement | null>(null);
  const headingTextRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const wavyUnderlineRef = useRef<HTMLSpanElement>(null);
  const featuredServicesRef = useRef<HTMLDivElement | null>(null);

  // Data arrays (unchanged)
  const heroSlides = [
    {
      title: "Innovatively Creative",
      subtitle: "Transforming businesses through cutting-edge technology",
      video: "/teresol.mp4"
    },
    {
      title: "Innovative Software Solutions",
      subtitle: "Transforming businesses through cutting-edge technology",
      image: "https://readdy.ai/api/search-image?query=Modern%20tech%20office%20with%20software%20development%20team%20working%20on%20multiple%20monitors%2C%20clean%20minimal%20workspace%20with%20blue%20accent%20lighting%2C%20professional%20corporate%20environment%2C%20high-tech%20atmosphere&width=1920&height=1080&seq=hero1&orientation=landscape"
    },
    {
      title: "Advanced Hardware Systems",
      subtitle: "Custom hardware solutions for complex challenges",
      image: "https://readdy.ai/api/search-image?query=High-tech%20hardware%20laboratory%20with%20circuit%20boards%20and%20electronic%20components%2C%20modern%20industrial%20setting%20with%20blue%20lighting%2C%20professional%20technology%20workspace%2C%20clean%20minimal%20background&width=1920&height=1080&seq=hero2&orientation=landscape"
    },
    {
      title: "Embedded System Excellence",
      subtitle: "Powering the future with intelligent embedded solutions",
      image: "https://readdy.ai/api/search-image?query=Microprocessor%20and%20embedded%20systems%20on%20circuit%20board%2C%20close-up%20of%20advanced%20electronic%20components%2C%20blue%20accent%20lighting%2C%20modern%20technology%20background%2C%20clean%20professional%20setup&width=1920&height=1080&seq=hero3&orientation=landscape"
    }
  ];
  const featuredServices = [
    {
      icon: "ri-code-line",
      title: "Enterprise Software Solutions",
      description: "Well-reputed Research and Innovation (R&I) company with a proven track record in developing customized, cost efficient and scalable enterprise software solutions. We offer a comprehensive suite of services. We are a team of over 400 professionals includ- ing 20 PhDs from esteemed global institutes. We are ISO 9001, 20000, 27001 certified, guaranteeing industry-leading quality.",
      features: ["Command, Control, Communications, Computers and Intelligence (C4I) System", "Banking", "Fintech", "Embedded Solutions"]
    },
    {
      icon: "ri-cpu-line",
      title: "Embedded Design Services",
      description: "Our embedded design includes complex multi layers (18-24) high speed signal processing PCBs, Single Board Computers (SBC) for time sched-uled applications, their board support packages/APIs for external integration and complete customized end to end product (qualified for tough temperature environment) with multiple designed cards.",
      features: ["Single Board Computers (SBCs)", "Military Avionics", "Display Computer", "Control Computer", "Mission Data Recorders", "Ground-based Defense Solutions", "AI based Autotracking System", "Ruggedized Field Equipment"]
    },
    {
      icon: "ri-brain-line",
      title: "AI Devevelopment Services",
      description: "The future of businesses reside in the transformative capabilities of Artificial Intelligence (AI). We help you integrate AI in your current infrastructure by delivering state-of-art AI software development services. Our competent developers provide you with custom solutions perfectly tailored to your requirements.",
      features: ["Business Analytics Suite", "AI Detection and Tracking System", "Wind Power Estimation", "Brain Image Processing", "Eye Blob Remover",]
    },

    {
      icon: "ri-dashboard-line",
      title: "Automotive Electronics",
      description: "TeReSol has successfully developed and delivered advanced automotive electronics and access control systems, offering end-to-end lifecycle support. Trusted by leading corporate clients across Pakistan, our solutions ensure reliability, efficiency, and innovation",
      features: ["Fleet Management Solution", "Vehicle Infotainment System"]
    }
  ];
  const markers = [
    {
      name: "Zambia",
      position: { top: '54%', left: '50%' },
      color: "#198A00",
      text: "Welcome to Our Tech Company. Discover our most popular technology solutions that drive business success"
    },
    {
      name: "Pakistan",
      position: { top: '40%', left: '60%' },
      color: "#01411C",
      text: "Welcome to Our Tech Company. Discover our most popular technology solutions that drive business success"
    },
    {
      name: "Qatar",
      position: { top: '42%', left: '57%' },
      color: "#8A1538",
      text: "Welcome to Our Tech Company. Discover our most popular technology solutions that drive business success"
    },
    {
      name: "USA",
      position: { top: '55%', left: '30%' },
      color: "#3C3B6E",
      text: "Welcome to Our Tech Company. Discover our most popular technology solutions that drive business success"
    }
  ];
  const stats = [
    {
      value: "5+",
      title: "Countries Reached",
      subtitle: "Expanding worldwide every year",
      colorClasses: "text-blue-700",
      borderClasses: "from-blue-600 to-indigo-900"
    },
    {
      value: "500+",
      title: "Clients Served",
      subtitle: "Across various industries",
      colorClasses: "text-green-600",
      borderClasses: "from-green-500 to-emerald-700"
    },
    {
      value: "24/7",
      title: "Global Support",
      subtitle: "Round-the-clock availability",
      colorClasses: "text-red-600",
      borderClasses: "from-red-600 to-pink-700"
    },
    {
      value: "15+",
      title: "Years Experience",
      subtitle: "A Legacy of Excellence. A Vision for the Future",
      colorClasses: "text-orange-600",
      borderClasses: "from-red-600 to-pink-700"
    }
  ];
  const certifications = [
    {
      title: "P@SHA Member",
      description: "Pakistan Software Houses Association",
      image: "/PASHA.png"
    },
    {
      title: "PSEB",
      description: "Quality Management Systems",
      image: "/PSEB.png"
    },
    {
      title: "PTA",
      description: "Regulatory Body For Telecom",
      image: "/PTA.png"
    },
    {
      title: "PAeC",
      description: "Defense Contractor And An Aerospace Manufacturer",
      image: "/paec.png"
    },
    {
      title: "ISO 9001",
      description: "Standard For Quality Management Systems",
      image: "/iso9001.png"
    }
    ,
    {
      title: "ISO 20000",
      description: "International IT Service Management Standard",
      image: "/iso2000-01.png"
    }
  ];
  const featuredBlogs = [
    {
      title: "Lorem Ipsum Dolor Sit Amet",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non urna eu justo vehicula commodo.",
      date: "December 15, 2024",
      category: "Technology",
      image: "https://readdy.ai/api/search-image?query=IoT%20embedded%20systems%20and%20connected%20devices%20in%20modern%20smart%20environment%2C%20circuit%20boards%20and%20sensors%2C%20blue%20accent%20lighting%2C%20futuristic%20technology%20background&width=400&height=250&seq=blog1&orientation=landscape",
      readTime: "5 min read"
    },
    {
      title: "Consectetur Adipiscing Elit",
      excerpt: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
      date: "December 10, 2024",
      category: "Development",
      image: "https://readdy.ai/api/search-image?query=Software%20development%20coding%20on%20computer%20screens%2C%20modern%20programming%20environment%20with%20code%20editor%2C%20professional%20workspace%20with%20blue%20lighting&width=400&height=250&seq=blog2&orientation=landscape",
      readTime: "7 min read"
    },
    {
      title: "Ut Enim Ad Minim Veniam",
      excerpt: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      date: "December 5, 2024",
      category: "Hardware",
      image: "https://readdy.ai/api/search-image?query=Hardware%20integration%20laboratory%20with%20electronic%20components%20and%20testing%20equipment%2C%20professional%20engineering%20workspace%2C%20blue%20accent%20lighting&width=400&height=250&seq=blog3&orientation=landscape",
      readTime: "6 min read"
    }
  ];

  // Effect to set mounted state and scroll to top
  useEffect(() => {
    setMounted(true);
    const timeout = setTimeout(() => window.scrollTo(0, 0), 50);
    return () => clearTimeout(timeout);
  }, []);

  // Effect for sliders
  useEffect(() => {
    if (!mounted) return;

    const heroInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    const certInterval = setInterval(() => {
      setCurrentCertSlide((prev) => (prev + 1) % Math.ceil(certifications.length / 4));
    }, 4000);

    return () => {
      clearInterval(heroInterval);
      clearInterval(certInterval);
    };
  }, [mounted, heroSlides.length, certifications.length]);

  // Effect for section visibility observer
  useEffect(() => {
    if (!mounted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setVisibleSections((prev) => ({ ...prev, [id]: true }));
            if (id === 'featured-services') {
              setHasEnteredServices(true);
            }
          }
        });
      },
      { threshold: 0.2 } // Trigger when 20% of the section is visible
    );

    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [mounted]);

  // GSAP Animations
  useEffect(() => {
    if (!mounted) return;
    gsap.registerPlugin(ScrollTrigger);

    // Hero section animations
    gsap.from(".hero-content", { duration: 1.5, y: 50, opacity: 0, ease: "power3.out", delay: 0.5 });


    if (headingContentRef.current && cardsContainerRef.current) {

      const serviceCards = gsap.utils.toArray<HTMLElement>(cardsContainerRef.current.children);

      gsap.set(serviceCards, { opacity: 0, y: 30 });

      const servicesTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#featured-services",
          start: "top 60%",
          end: "top 10%",
          scrub: 2,
        }
      });

      servicesTimeline
        .from(headingContentRef.current, {
          xPercent: 75,
          ease: 'none'
        })
        .to(serviceCards, {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          ease: 'power2.out'
        }, "<0.2")
        
        .to(headingContentRef.current, {
          y: 20,  
          yoyo: true, // Reverses to float back down
          repeat: 1,
          ease: 'sine.inOut' 
        }, "<"); 
      const sectionTrigger = { trigger: "#featured-services", start: "top bottom", end: "bottom top", scrub: 1.5, };
      gsap.fromTo("#windmill-1", { xPercent: -100, rotation: -90 }, { xPercent: 100, rotation: 180, ease: "none", scrollTrigger: sectionTrigger });
      gsap.fromTo("#windmill-2", { yPercent: 100, rotation: 0 }, { yPercent: -100, rotation: -180, ease: "none", scrollTrigger: { ...sectionTrigger, scrub: 2.5 } });
      gsap.fromTo("#windmill-3", { xPercent: 150, yPercent: -150, rotation: 50 }, { xPercent: -150, yPercent: 150, rotation: -270, ease: "none", scrollTrigger: sectionTrigger });
      const bulbGlow = document.querySelector("#bulb-glow");
      if (bulbGlow) {
        const flickerTimeline = gsap.timeline().to(bulbGlow, { opacity: 1, duration: 0.1 }).to(bulbGlow, { opacity: 0.2, duration: 0.1 }).to(bulbGlow, { opacity: 1, duration: 0.2 }).to(bulbGlow, { opacity: 0, duration: 0.2 }, "+=0.3").to(bulbGlow, { opacity: 1, duration: 0.15 }).to(bulbGlow, { opacity: 0.5, duration: 0.1 }).to(bulbGlow, { opacity: 1, duration: 0.3 });
        ScrollTrigger.create({ animation: flickerTimeline, trigger: featuredServicesRef.current, start: "top center", end: "bottom bottom", scrub: true });
      }
    }

    // Service cards animation
    gsap.utils.toArray<HTMLElement>(".service-card").forEach((card) => {
      gsap.from(card, { opacity: 0, y: 50, scale: 0.9, duration: 0.5, ease: "power2.out", scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "restart none none none" } });
    });

    // One-time fade-in for major sections
    gsap.utils.toArray<HTMLElement>("#map, #clients, #about-preview").forEach((section) => {
      gsap.from(section, { y: 50, opacity: 0, duration: 1, ease: "power1.out", scrollTrigger: { trigger: section, start: "top 80%" } });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [mounted]);

  const setSectionRef = (id: string) => (el: HTMLElement | null) => {
    sectionRefs.current[id] = el;
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        {/* Simple loading spinner or skeleton */}
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />


      {/* Featured Services Section */}
      <section
        id="featured-services"
        ref={setSectionRef('featured-services')}
        className="relative min-h-screen py-20 bg-gray-50 overflow-x-clip"
      >
        <div className="absolute inset-0 z-0 opacity-50 pointer-events-none">
          <svg id="windmill-1" className="absolute top-[10%] left-0 w-48 h-48 text-gray-500/50" viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M50 50 L5 20 C10 5, 40 5, 45 20 L50 50Z" /><path d="M50 50 L80 5 C70 10, 60 40, 80 45 L50 50Z" /><path d="M50 50 L95 80 C90 95, 60 95, 55 80 L50 50Z" /><path d="M50 50 L20 95 C30 90, 40 60, 20 55 L50 50Z" /></svg>
          <svg id="windmill-2" className="absolute bottom-[5%] right-0 w-64 h-64 text-gray-500/50" viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M50 50 L5 20 C10 5, 40 5, 45 20 L50 50Z" /><path d="M50 50 L80 5 C70 10, 60 40, 80 45 L50 50Z" /><path d="M50 50 L95 80 C90 95, 60 95, 55 80 L50 50Z" /><path d="M50 50 L20 95 C30 90, 40 60, 20 55 L50 50Z" /></svg>
          <svg id="windmill-3" className="absolute top-1/2 left-0 w-20 h-20 text-gray-500/50" viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M50 50 L5 20 C10 5, 40 5, 45 20 L50 50Z" /><path d="M50 50 L80 5 C70 10, 60 40, 80 45 L50 50Z" /><path d="M50 50 L95 80 C90 95, 60 95, 55 80 L50 50Z" /><path d="M50 50 L20 95 C30 90, 40 60, 20 55 L50 50Z" /></svg>
        </div>
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          <div className="lg:col-span-2 sticky top-32 self-start text-center lg:text-left">
            <div ref={headingContentRef}>
              {/* Heading content is correct */}
              <h2 className="font-extrabold text-gray-900 mb-6 text-4xl md:text-5xl relative">
                Featured Services
                <svg className="absolute -bottom-3 left-0 w-full h-2" viewBox="0 0 500 10" preserveAspectRatio="none"><path d="M0,5 C100,0 200,10 300,5 C400,0 500,10 500,5" fill="none" stroke="#8b0303" strokeWidth="2" strokeLinecap="round" /></svg>
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg md:text-xl">
                Discover our most popular technology solutions that drive business success
              </p>
              <div className={`mt-16 mx-auto flex justify-center transition-opacity duration-500 ${hasEnteredServices ? "opacity-100" : "opacity-0"}`}>
                <svg id="idea-bulb" className="w-24 h-24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path id="bulb-glow" d="M12,6 C9.79,6 8,7.79 8,10 C8,11.83 9.17,13.42 11,13.85 L11,15 L9,15 C8.45,15 8,15.45 8,16 L8,17 L16,17 L16,16 C16,15.45 15.55,15 15,15 L13,15 L13,13.85 C14.83,13.42 16,11.83 16,10 C16,7.79 14.21,6 12,6 Z"
                    fill="#FBBF24" className="opacity-0" />
                  <path id="M12,2 C7.59,2 4,5.59 4,10 C4,13.04 5.92,15.64 8.7,16.65 L8,17 L8,18 C8,18.55 8.45,19 9,19 L15,19 C15.55,19 16,18.55 16,18 L16,17 L15.3,16.65 C18.08,15.64 20,13.04 20,10 C20,5.59 16.41,2 12,2 Z M12,17 C11.45,17 11,17.45 11,18 L11,19 L13,19 L13,18 C13,17.45 12.55,17 12,17 Z M12,4 C15.31,4 18,6.69 18,10 C18,12.53 16.36,14.61 14,15.13 L14,16 C14,16.55 13.55,17 13,17 L11,17 C10.45,17 10,16.55 10,16 L10,15.13 C7.64,14.61 6,12.53 6,10 C6,6.69 8.69,4 12,4 Z"
                    fill="currentColor" className="text-gray-400" />
                </svg>
              </div>
            </div>
          </div>

          {/* Cards Column */}
          {/* THE FIX: Added a ref to this container to help GSAP find all the cards */}
          <div ref={cardsContainerRef} className="lg:col-span-3 flex flex-col gap-8">
            {featuredServices.map((service) => (
              <Tilt key={service.title} glareEnable={true} glareMaxOpacity={0.2} glareColor="#ffffff" tiltMaxAngleX={10} tiltMaxAngleY={10}>
                <div className="bg-white p-6 md:p-8 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-3 hover:scale-[1.03] transition-all duration-500 group service-card">
                  {/* Card content is correct */}
                  <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-full mb-6"><i className={`${service.icon} text-2xl text-blue-600 group-hover:text-[#8b0303]`}></i></div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1 group-hover:text-blue-600">{service.title}</h3>
                  <p className="text-sm md:text-base text-gray-600 mb-2">{service.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.features.map((feature, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs sm:text-sm rounded-full group-hover:bg-blue-100 group-hover:text-blue-800">{feature}</span>
                    ))}
                  </div>
                  <Link href={`/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`} className="inline-block bg-[#25237b] hover:bg-[#8b0303] text-white px-6 py-2 rounded-lg font-medium text-sm md:text-base transition-all duration-300 hover:scale-105">Learn More</Link>
                </div>
              </Tilt>
            ))}
          </div>
        </div>
      </section>

      {/* Map & Stats Section */}
      <section id="map" ref={setSectionRef('map')} className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-3">
              <div className="relative w-full h-96 lg:h-[32rem] rounded-3xl overflow-hidden shadow-2xl">
                <img src="/World-Map.png" alt="World Map" className="w-full h-full object-contain transition-transform duration-700 ease-in-out hover:scale-105" />
                {markers.map(marker => (<MapMarker key={marker.name} marker={marker} />))}
              </div>
            </div>
            <div className="lg:col-span-2 space-y-8">
              <h2 className="text-4xl font-extrabold text-gray-800 mb-6">Our Global Presence</h2>
              {stats.map(stat => (<StatCard key={stat.title} stat={stat} />))}
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section id="clients" ref={setSectionRef('clients')} className="py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#25237b] to-[#8b0303]">Our Valuable Clients</h2>
          <p className="text-lg mb-12 max-w-2xl mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#25237b] to-[#8b0303]">Trusted by industry leaders and national institutions</p>
          <div className="relative group">
            <div className="flex space-x-12 w-max animate-marquee group-hover:[animation-play-state:paused] overflow-x-auto sm:overflow-hidden">
              {[{ name: "Bank Al Habib", logo: "/clients/bank-al-habib.png" }, { name: "Pakistan Air Force", logo: "/clients/paf-logo.png" }, { name: "Heavy Industries Taxila", logo: "/clients/HIT-01.png" }, { name: "National Bank of Pakistan", logo: "/clients/nbp-logo.png" }, { name: "The First MicroFinanceBank", logo: "/clients/tfmfb.png" }, { name: "Honda", logo: "/clients/honda.png" }, { name: "Fauji Fertilizer Bin Qasim Ltd", logo: "/clients/ffbl.png" }, { name: "Sybrid", logo: "/clients/sybrid.png" }, { name: "Oil & Gas Development Company", logo: "/clients/OGDCL.png" }, { name: "Albayrak", logo: "/clients/Albayrak.png" }].concat([{ name: "Bank Al Habib", logo: "/clients/bank-al-habib.png" }, { name: "Pakistan Air Force", logo: "/clients/paf-logo.png" }, { name: "Heavy Industries Taxila", logo: "/clients/hit-logo.png" }, { name: "National Bank of Pakistan", logo: "/clients/nbp-logo.png" }, { name: "The First MicroFinanceBank", logo: "/clients/tfmfb.png" }, { name: "Honda", logo: "/clients/honda.png" }, { name: "Fauji Fertilizer Bin Qasim Ltd", logo: "/clients/ffbl.png" }, { name: "Sybrid", logo: "/clients/sybrid.png" }, { name: "Oil & Gas Development Company", logo: "/clients/OGDCL.png" }, { name: "Albayrak", logo: "/clients/Albayrak.png" }]).map((client, index) => (
                <div key={index} className="relative group flex-shrink-0 w-48 h-28 bg-gradient-to-br from-gray-100 to-white rounded-xl shadow-md p-4 flex flex-col items-center justify-center transform hover:scale-105 transition-transform duration-300">
                  <img src={client.logo} alt={client.name} className="max-h-16 max-w-full object-contain transition duration-300" />
                  <div className="absolute bottom-2 opacity-0 group-hover:opacity-100 text-sm font-medium text-[#8b0303] transition-opacity duration-300">{client?.name}</div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-6 space-x-2">
              {[0, 1, 2, 3].map((dot) => (<span key={dot} className="w-3 h-3 rounded-full bg-[#25237b] opacity-50 hover:opacity-100 transition"></span>))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications & Memberships Slider */}
      <section id="certifications" ref={setSectionRef('certifications')} className="py-20 bg-gradient-to-b from-white to-blue-50 transition-all duration-1000">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-16 transform transition-all duration-[1500ms] ease-in-out ${visibleSections['certifications'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">Certifications & Memberships</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Recognized excellence and professional standards</p>
          </div>
          <div className="relative overflow-hidden">
            <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentCertSlide * 100}%)` }}>
              {Array.from({ length: Math.ceil(certifications.length / 4) }).map((_, pageIndex) => (
                <div key={pageIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {certifications.slice(pageIndex * 4, (pageIndex + 1) * 4).map((cert, index) => (
                      <div key={index} className={`bg-white p-6 rounded-2xl shadow-lg text-center transition-all duration-500 transform cursor-pointer group ${visibleSections['certifications'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${index * 200}ms` }}>
                        <div className="mb-4"><img src={cert.image} alt={cert.title} className="w-20 h-20 mx-auto object-contain group-hover:scale-110 transition-transform duration-300" /></div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#25237b] transition-colors duration-300">{cert.title}</h3>
                        <p className="text-gray-600 text-sm">{cert.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-10 space-x-2">
              {Array.from({ length: Math.ceil(certifications.length / 4) }).map((_, index) => (
                <button key={index} onClick={() => setCurrentCertSlide(index)} className={`w-4 h-4 rounded-full transition-all duration-300 cursor-pointer hover:scale-125 ${index === currentCertSlide ? 'bg-[#25237b]' : 'bg-gray-300'}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blogs Section */}
      <section id="featured-blogs" ref={setSectionRef('featured-blogs')} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-16 transform transition-all duration-1000 ${visibleSections['featured-blogs'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest Insights</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Stay updated with the latest technology trends and industry insights</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredBlogs.map((blog, index) => (
              <article key={index} className={`bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 cursor-pointer group ${visibleSections['featured-blogs'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: `${index * 200}ms` }}>
                <div className="relative overflow-hidden">
                  <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover object-top group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 left-4"><span className="bg-[#25237b] text-white px-3 py-1 rounded-full text-sm font-medium">{blog.category}</span></div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3"><span>{blog.date}</span><span>{blog.readTime}</span></div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">{blog.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">{blog.excerpt}</p>
                  <Link href="/blog" className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300 cursor-pointer">Read More →</Link>
                </div>
              </article>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/blog" className="bg-[#25237b] hover:bg-[#8b0303] text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg whitespace-nowrap cursor-pointer inline-block">View All Articles</Link>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section id="about-preview" ref={setSectionRef('about-preview')} className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`transform transition-all duration-1000 ${visibleSections['about-preview'] ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">About Teresol</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">TeReSol's Enterprise Fintech Solutions empower businesses to thrive in the digital age. We offer a comprehensive suite of services. We are a team of over 400 professionals including 20 PhDs from esteemed global institutes. We are ISO 9001, 20000, 27001 certified, guaranteeing industry-leading quality. </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">We help you transform your outdated systems, deliver seamless omni-channel banking experiences, manage your IT infrastructure, and provide expert advice for the perfect fintech solution for your unique needs.</p>
              <Link href="/about"><Button btnName={"Learn More About Us"} /></Link>
            </div>
            <div className={`relative transform transition-all duration-1000 ${visibleSections['about-preview'] ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              <img src="https://readdy.ai/api/search-image?query=Professional%20team%20of%20software%20engineers%20and%20hardware%20specialists%20working%20together%20in%20modern%20office%20environment%2C%20diverse%20group%20collaborating%20on%20technology%20projects%2C%20clean%20corporate%20setting%20with%20natural%20lighting&width=600&height=400&seq=about1&orientation=landscape" alt="Teresol Team" className="w-full h-96 object-cover object-top rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Transforming needs into innovative solutions</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">Let's discuss how our innovative solutions can help you achieve your technology goals and drive success.</p>
          <Link href="/contact" className="bg-[#25237b] hover:bg-[#8b0303] text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg whitespace-nowrap cursor-pointer inline-block">Start Your Project Today</Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}