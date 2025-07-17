
'use client';

import { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import Button from '@/components/Button.';
import './styles/homepage.css';



export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [currentCertSlide, setCurrentCertSlide] = useState(0);
  const [visibleSections, setVisibleSections] = useState<{ [key: string]: boolean }>({});
  const [mounted, setMounted] = useState(false);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const [hasScrolledToServices, setHasScrolledToServices] = useState(false);
  const [hasEnteredServices, setHasEnteredServices] = useState(false);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const [headingVisible, setHeadingVisible] = useState(false);



  //lenis

  //lenis


  const heroSlides = [
    {
      title: "Innovativelly Creative",
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
    },
    {
      icon: "ri-cpu-line",
      title: "Embedded Design Services",
      description: "Our embedded design includes complex multi layers (18-24) high speed signal processing PCBs, Single Board Computers (SBC) for time sched-uled applications, their board support packages/APIs for external integration and complete customized end to end product (qualified for tough temperature environment) with multiple designed cards.",
      features: ["Single Board Computers (SBCs)", "Military Avionics", "Display Computer", "Control Computer", "Mission Data Recorders", , "Ground-based Defense Solutions", "AI based Autotracking System", "Ruggedized Field Equipment"]
    }
  ];

  const certifications = [
    {
      title: "P@SHA Member",
      description: "Pakistan Software Houses Association",
      image: "https://readdy.ai/api/search-image?query=Professional%20software%20association%20membership%20badge%20with%20blue%20and%20white%20design%2C%20technology%20industry%20certification%20symbol%2C%20clean%20minimal%20background&width=200&height=200&seq=cert5&orientation=squarish"
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
      image: "/iso20000.png"
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

  useEffect(() => {
    setMounted(true);
    setIsVisible(true);
  }, []);


  useEffect(() => {
    if (!mounted || !headingRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeadingVisible(true);
          // observer.disconnect(); // stop observing after first trigger
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(headingRef.current);

    // return () => observer.disconnect();
  }, [mounted]);
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

  useEffect(() => {
    if (!mounted) return;


    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;

          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [id]: true,
            }));

            if (id === 'featured-services' && !hasEnteredServices) {
              setTimeout(() => {
                setHasEnteredServices(true);
              }, 1500); // ⏳ Delay of 1 second after section enters
            }

          }
        });
      },
      { threshold: 0.4 } // Ensures 60% visible before triggering
    );



    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    // return () => observer.disconnect();
  }, [mounted]);


  const setSectionRef = (id: string) => (el: HTMLElement | null) => {
    sectionRefs.current[id] = el;
  };


  // revert featuredServices to original

  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const prevScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > prevScrollY.current) {
        setScrollDirection('down');
      } else if (currentScrollY < prevScrollY.current) {
        setScrollDirection('up');
      }
      prevScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  if (!mounted) {
    return (
      <div className="min-h-screen bg-white">
        <div className="animate-bounce">
          <div className="h-16 bg-gray-200"></div>
          <div className="h-screen bg-gray-100"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            {slide.video ? (
              <video
                autoPlay
                loop
                muted
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src={slide.video} type="video/mp4" />
              </video>
            ) : (
              <div
                style={{
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',

                }}
                className="absolute inset-0"
              ></div>
            )}
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
        ))}

        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className={`w-full max-w-3xl transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
              {heroSlides[currentSlide].subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/solutions" className="bg-[#25237b] hover:bg-[#8b0303] text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg whitespace-nowrap cursor-pointer text-center">
                Explore Solutions
              </Link>
              <Link href="/contact" className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 whitespace-nowrap cursor-pointer text-center">
                Get In Touch
              </Link>
            </div>
          </div>
        </div>

        {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer hover:scale-125 ${index === currentSlide ? 'bg-white' : 'bg-white/50'}`}
            />
          ))}
        </div> */}
        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-4 h-4 rounded-full border border-white transition-all duration-300 cursor-pointer
        ${index === currentSlide ? 'bg-white shadow-md scale-110' : 'bg-white/30 hover:scale-125'}`}
            />
          ))}
        </div>
      </section>

      {/* Featured Services Section */}

      <section
        id="featured-services"
        ref={setSectionRef('featured-services')}
        className="relative min-h-screen py-20 bg-gray-50"
      >
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Sticky Heading Column */}
          <div
            ref={headingRef}
            className={`lg:col-span-2 relative transition-all duration-1000 ${hasEnteredServices ? 'sticky top-32 self-start' : 'flex items-center justify-center min-h-screen'
              } text-center`}
          >
            <div className="transition-all duration-700">
              <h2
                className={`font-extrabold text-gray-900 mb-6 transition-all duration-700 
            ${hasEnteredServices ? 'text-5xl' : 'text-6xl text-center'} wavy-text`}
              >
                Featured Services
              </h2>
              <p
                className={`text-gray-600 leading-relaxed transition-all duration-700 
            ${hasEnteredServices ? 'text-xl' : 'text-2xl text-center max-w-2xl mx-auto'}`}
              >
                Discover our most popular technology solutions that drive business success
              </p>
            </div>
          </div>

          {/* Cards Column */}
          <div className="lg:col-span-3 flex flex-col gap-8 transition-opacity duration-700 ease-in">
            {hasEnteredServices &&
              scrollDirection === 'down' &&
              featuredServices.map((service, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-3 hover:scale-105 transition-all duration-500 group"
                >
                  <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-full mb-6">
                    <i className={`${service.icon} text-2xl text-blue-600 group-hover:text-[#8b0303]`}></i>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1 group-hover:text-blue-600">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-2">{service.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.features.map((feature, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full group-hover:bg-blue-100 group-hover:text-blue-800"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-block bg-[#25237b] hover:bg-[#8b0303] text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105"
                  >
                    Learn More
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Maps Section (Stats Section)  */}


      <section id="map" className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">

            {/* Map Area - 3/5 Columns */}
            <div className="lg:col-span-3">
              <div className="relative w-full h-96 lg:h-[32rem] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/World-Map.png"
                  alt="World Map"
                  className="w-full h-full object-contain transition-transform duration-700 ease-in-out hover:scale-105"
                />

                {/* Map Markers with Tooltips */}

                {/* Zambia */}
                <div className="absolute top-[54%] left-[50%] group">
                  <div className="w-3 h-3 bg-red-600 rounded-full animate-ping"></div>
                  <div className="w-3 h-3 bg-red-600 rounded-full absolute top-0 left-0"></div>
                  <div className="absolute left-1/2 -translate-x-1/2 -top-8 text-xs sm:text-sm bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition duration-300 whitespace-nowrap">
                    Zambia
                  </div>
                </div>

                {/* Pakistan */}
                <div className="absolute top-[40%] left-[60%] group">
                  <div className="w-3 h-3 bg-blue-600 rounded-full animate-ping"></div>
                  <div className="w-3 h-3 bg-blue-600 rounded-full absolute top-0 left-0"></div>
                  <div className="absolute left-1/2 -translate-x-1/2 -top-8 text-xs sm:text-sm bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition duration-300 whitespace-nowrap">
                    Pakistan
                  </div>
                </div>

                {/* USA */}
                <div className="absolute top-[55%] left-[30%] group">
                  <div className="w-3 h-3 bg-green-600 rounded-full animate-ping"></div>
                  <div className="w-3 h-3 bg-green-600 rounded-full absolute top-0 left-0"></div>
                  <div className="absolute left-1/2 -translate-x-1/2 -top-8 text-xs sm:text-sm bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition duration-300 whitespace-nowrap">
                    USA
                  </div>
                </div>

              </div>
            </div>

            {/* Stats Area - 2/5 Columns */}
            <div className="lg:col-span-2 space-y-8">
              <h2 className="text-4xl font-extrabold text-gray-800 mb-6">
                Our Global Presence
              </h2>

              {/* Stat Card - Countries */}
              <div className="flex items-center space-x-4 p-5 border-l-4 border-gradient-to-br from-blue-600 to-indigo-900 bg-gray-50 rounded-xl shadow transition-all duration-300 transform hover:scale-[1.03] hover:-translate-y-1 hover:shadow-2xl">
                <div className="text-5xl text-blue-700 font-bold">5+</div>
                <div>
                  <p className="text-lg text-gray-700 font-semibold">Countries Reached</p>
                  <p className="text-sm text-gray-500">Expanding worldwide every year</p>
                </div>
              </div>

              {/* Stat Card - Clients */}
              <div className="flex items-center space-x-4 p-5 border-l-4 border-gradient-to-br from-green-500 to-emerald-700 bg-gray-50 rounded-xl shadow transition-all duration-300 transform hover:scale-[1.03] hover:-translate-y-1 hover:shadow-2xl">
                <div className="text-5xl text-green-600 font-bold">500+</div>
                <div>
                  <p className="text-lg text-gray-700 font-semibold">Clients Served</p>
                  <p className="text-sm text-gray-500">Across various industries</p>
                </div>
              </div>

              {/* Stat Card - Support */}
              <div className="flex items-center space-x-4 p-5 border-l-4 border-gradient-to-br from-red-600 to-pink-700 bg-gray-50 rounded-xl shadow transition-all duration-300 transform hover:scale-[1.03] hover:-translate-y-1 hover:shadow-2xl">
                <div className="text-5xl text-red-600 font-bold">24/7</div>
                <div>
                  <p className="text-lg text-gray-700 font-semibold">Global Support</p>
                  <p className="text-sm text-gray-500">Round-the-clock availability</p>
                </div>
              </div>
              {/* Stat Card - Experience */}
              <div className="flex items-center space-x-4 p-5 border-l-4 border-gradient-to-br from-red-600 to-pink-700 bg-gray-50 rounded-xl shadow transition-all duration-300 transform hover:scale-[1.03] hover:-translate-y-1 hover:shadow-2xl">
                <div className="text-5xl text-orange-600 font-bold">15+</div>
                <div>
                  <p className="text-lg text-gray-700 font-semibold">Years Experience</p>
                  <p className="text-sm text-gray-500">A Legacy of Excellence. A Vision for the Future</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Stats Section */}
      {/* <section className="py-20 bg-[#25237b]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center transform hover:scale-110 transition-transform duration-300 cursor-pointer">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 hover:animate-pulse">{stat.number}</div>
                <div className="text-lg text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Clients Section */}

      <section id="clients" className="py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#25237b] to-[#8b0303]">
            Our Valuable Clients
          </h2>
          <p className="text-lg mb-12 max-w-2xl mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#25237b] to-[#8b0303]">
            Trusted by industry leaders and national institutions
          </p>

          <div className="relative group">
            <div className="flex space-x-12 w-max animate-marquee group-hover:[animation-play-state:paused] overflow-x-auto sm:overflow-hidden">
              {[
                {
                  name: "Bank Al Habib",
                  logo: "/clients/bank-al-habib.png"
                },
                {
                  name: "Pakistan Air Force",
                  logo: "/clients/paf-logo.png"
                },
                {
                  name: "Heavy Industries Taxila",
                  logo: "/clients/hit-logo.png"
                },
                {
                  name: "National Bank of Pakistan",
                  logo: "/clients/nbp-logo.png"
                },
                {
                  name: "The First MicroFinanceBank",
                  logo: "/clients/tfmfb.png"
                },
                {
                  name: "Honda",
                  logo: "/clients/honda.png"
                },
                {
                  name: "Fauji Fertilizer Bin Qasim Ltd",
                  logo: "/clients/ffbl.png"
                },
                {
                  name: "Sybrid",
                  logo: "/clients/sybrid.png"
                },
                {
                  name: "Oil & Gas Development Company",
                  logo: "/clients/OGDCL.png"
                },
                {
                  name: "Albayrak",
                  logo: "/clients/Albayrak.png"
                }

              ].concat([
                {
                  name: "Bank Al Habib",
                  logo: "/clients/bank-al-habib.png"
                },
                {
                  name: "Pakistan Air Force",
                  logo: "/clients/paf-logo.png"
                },
                {
                  name: "Heavy Industries Taxila",
                  logo: "/clients/hit-logo.png"
                },
                {
                  name: "National Bank of Pakistan",
                  logo: "/clients/nbp-logo.png"
                },
                {
                  name: "The First MicroFinanceBank",
                  logo: "/clients/tfmfb.png"
                },
                {
                  name: "Honda",
                  logo: "/clients/honda.png"
                },
                {
                  name: "Fauji Fertilizer Bin Qasim Ltd",
                  logo: "/clients/ffbl.png"
                },
                {
                  name: "Sybrid",
                  logo: "/clients/sybrid.png"
                },
                {
                  name: "Oil & Gas Development Company",
                  logo: "/clients/OGDCL.png"
                },
                {
                  name: "Albayrak",
                  logo: "/clients/Albayrak.png"
                }
              ]).map((client, index) => (
                <div
                  key={index}
                  className="relative group flex-shrink-0 w-48 h-28 bg-gradient-to-br from-gray-100 to-white rounded-xl shadow-md p-4 flex flex-col items-center justify-center transform hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-h-16 max-w-full object-contain transition duration-300"
                  />
                  {(
                    <div className="absolute bottom-2 opacity-0 group-hover:opacity-100 text-sm font-medium text-[#8b0303] transition-opacity duration-300">
                      {client?.name}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {/* Slider Dots */}
            <div className="flex justify-center mt-6 space-x-2">
              {[0, 1, 2, 3].map((dot) => (
                <span key={dot} className="w-3 h-3 rounded-full bg-[#25237b] opacity-50 hover:opacity-100 transition"></span>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* Certifications & Memberships Slider */}

      {/* Dynamic section */}
      <section
        id="certifications"
        ref={setSectionRef('certifications')}
        className="py-20 bg-gradient-to-b from-white to-blue-50 transition-all duration-1000"
      >
        <div className="container mx-auto px-4">
          {/* Heading */}
          <div
            className={`text-center mb-16 transform transition-all duration-[1500ms] ease-in-out ${visibleSections['certifications']
              ? 'translate-y-0 opacity-100'
              : 'translate-y-10 opacity-0'
              }`}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Certifications & Memberships
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Recognized excellence and professional standards
            </p>
          </div>

          {/* Slider */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentCertSlide * 100}%)` }}
            >
              {Array.from({ length: Math.ceil(certifications.length / 4) }).map((_, pageIndex) => (
                <div key={pageIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {certifications
                      .slice(pageIndex * 4, (pageIndex + 1) * 4)
                      .map((cert, index) => (
                        <div
                          key={index}
                          className={`bg-white p-6 rounded-2xl shadow-lg text-center transition-all duration-500 transform cursor-pointer group
                      ${visibleSections['certifications']
                              ? 'opacity-100 translate-y-0'
                              : 'opacity-0 translate-y-10'}
                    `}
                          style={{
                            transitionDelay: `${index * 200}ms`,
                          }}
                        >
                          <div className="mb-4">
                            <img
                              src={cert.image}
                              alt={cert.title}
                              className="w-20 h-20 mx-auto object-contain group-hover:scale-110 transition-transform duration-300"
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

            {/* Pagination */}
            <div className="flex justify-center mt-10 space-x-2">
              {Array.from({ length: Math.ceil(certifications.length / 4) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentCertSlide(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 cursor-pointer hover:scale-125 ${index === currentCertSlide ? 'bg-[#25237b]' : 'bg-gray-300'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* Featured Blogs Section */}


      {/* Dynamic section */}
      <section
        id="featured-blogs"
        ref={setSectionRef('featured-blogs')}
        className="py-20 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <div className={`text-center mb-16 transform transition-all duration-1000 ${visibleSections['featured-blogs'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest Insights</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest technology trends and industry insights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredBlogs.map((blog, index) => (
              <article
                key={index}
                className={`bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 cursor-pointer group ${visibleSections['featured-blogs']
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-10 opacity-0'
                  }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-48 object-cover object-top group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#25237b] text-white px-3 py-1 rounded-full text-sm font-medium">
                      {blog.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <span>{blog.date}</span>
                    <span>{blog.readTime}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                    {blog.excerpt}
                  </p>
                  <Link href="/blog" className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300 cursor-pointer">
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/blog" className="bg-[#25237b] hover:bg-[#8b0303] text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg whitespace-nowrap cursor-pointer inline-block">
              View All Articles
            </Link>
          </div>
        </div>
      </section>




      {/* About Preview Section */}
      <section
        id="about-preview"
        ref={setSectionRef('about-preview')}
        className="py-20"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`transform transition-all duration-1000 ${visibleSections['about-preview'] ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
              }`}>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">About Teresol</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                TeReSol's Enterprise Fintech Solutions empower businesses to thrive in the digital age. We offer a comprehensive suite
                of services. We are a team of over 400 professionals including 20 PhDs from esteemed global institutes. We are ISO 9001,
                20000, 27001 certified, guaranteeing industry-leading quality. </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We help you transform your outdated systems, deliver
                seamless omni-channel banking experiences, manage your IT infrastructure, and provide expert advice for the perfect
                fintech solution for your unique needs.
              </p>
              <Link href="/about">
                <Button btnName={"Learn More About Us"} />
              </Link>
            </div>
            <div className={`relative transform transition-all duration-1000 ${visibleSections['about-preview'] ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
              }`}>
              <img
                src="https://readdy.ai/api/search-image?query=Professional%20team%20of%20software%20engineers%20and%20hardware%20specialists%20working%20together%20in%20modern%20office%20environment%2C%20diverse%20group%20collaborating%20on%20technology%20projects%2C%20clean%20corporate%20setting%20with%20natural%20lighting&width=600&height=400&seq=about1&orientation=landscape"
                alt="Teresol Team"
                className="w-full h-96 object-cover object-top rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss how our innovative solutions can help you achieve your technology goals and drive success.
          </p>
          <Link href="/contact" className="bg-[#25237b] hover:bg-[#8b0303] text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg whitespace-nowrap cursor-pointer inline-block">
            Start Your Project Today
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
