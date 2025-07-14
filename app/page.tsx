
'use client';

import { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import Button from '@/components/Button.';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [currentCertSlide, setCurrentCertSlide] = useState(0);
  const [visibleSections, setVisibleSections] = useState<{ [key: string]: boolean }>({});
  const [mounted, setMounted] = useState(false);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

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
      title: "Custom Software Development",
      description: "Tailored software solutions built with cutting-edge technologies to meet your unique business requirements and drive digital transformation.",
      features: ["Web Applications", "Mobile Apps", "API Development", "Cloud Solutions"]
    },
    {
      icon: "ri-computer-line",
      title: "Hardware Design & Engineering",
      description: "Complete hardware solutions from concept to manufacturing, including PCB design, prototyping, and system integration services.",
      features: ["PCB Design", "Prototyping", "Testing", "Manufacturing"]
    },
    {
      icon: "ri-cpu-line",
      title: "Embedded Systems Development",
      description: "Intelligent embedded solutions for IoT, automation, and control systems with real-time performance and reliability.",
      features: ["IoT Devices", "Automation", "RTOS", "Firmware"]
    }
  ];

  const certifications = [
    {
      title: "ISO 9001:2015",
      description: "Quality Management Systems",
      image: "https://readdy.ai/api/search-image?query=ISO%209001%20quality%20management%20certification%20badge%20with%20professional%20blue%20and%20white%20design%2C%20corporate%20certification%20symbol%2C%20clean%20minimal%20background&width=200&height=200&seq=cert1&orientation=squarish"
    },
    {
      title: "ISO 27001",
      description: "Information Security Management",
      image: "https://readdy.ai/api/search-image?query=ISO%2027001%20information%20security%20certification%20badge%20with%20professional%20blue%20and%20white%20design%2C%20cybersecurity%20certification%20symbol%2C%20clean%20minimal%20background&width=200&height=200&seq=cert2&orientation=squarish"
    },
    {
      title: "CMMI Level 3",
      description: "Capability Maturity Model Integration",
      image: "https://readdy.ai/api/search-image?query=CMMI%20Level%203%20software%20development%20maturity%20certification%20badge%20with%20professional%20blue%20and%20white%20design%2C%20quality%20assurance%20symbol%2C%20clean%20minimal%20background&width=200&height=200&seq=cert3&orientation=squarish"
    },
    {
      title: "IEEE Member",
      description: "Institute of Electrical Engineers",
      image: "https://readdy.ai/api/search-image?query=IEEE%20professional%20membership%20badge%20with%20blue%20and%20white%20design%2C%20electrical%20engineering%20certification%20symbol%2C%20clean%20minimal%20background&width=200&height=200&seq=cert4&orientation=squarish"
    },
    {
      title: "P@SHA Member",
      description: "Pakistan Software Houses Association",
      image: "https://readdy.ai/api/search-image?query=Professional%20software%20association%20membership%20badge%20with%20blue%20and%20white%20design%2C%20technology%20industry%20certification%20symbol%2C%20clean%20minimal%20background&width=200&height=200&seq=cert5&orientation=squarish"
    },
    {
      title: "PEA Member",
      description: "Pakistan Electronics Association",
      image: "https://readdy.ai/api/search-image?query=Electronics%20industry%20association%20membership%20badge%20with%20blue%20and%20white%20design%2C%20hardware%20certification%20symbol%2C%20clean%20minimal%20background&width=200&height=200&seq=cert6&orientation=squarish"
    }
  ];

  const featuredBlogs = [
    {
      title: "The Future of Embedded Systems in IoT",
      excerpt: "Exploring how embedded systems are revolutionizing the Internet of Things landscape with smarter, more efficient solutions.",
      date: "December 15, 2024",
      category: "Technology",
      image: "https://readdy.ai/api/search-image?query=IoT%20embedded%20systems%20and%20connected%20devices%20in%20modern%20smart%20environment%2C%20circuit%20boards%20and%20sensors%2C%20blue%20accent%20lighting%2C%20futuristic%20technology%20background&width=400&height=250&seq=blog1&orientation=landscape",
      readTime: "5 min read"
    },
    {
      title: "Custom Software Development Trends 2024",
      excerpt: "Key trends shaping the software development industry and how businesses can leverage them for competitive advantage.",
      date: "December 10, 2024",
      category: "Development",
      image: "https://readdy.ai/api/search-image?query=Software%20development%20coding%20on%20computer%20screens%2C%20modern%20programming%20environment%20with%20code%20editor%2C%20professional%20workspace%20with%20blue%20lighting&width=400&height=250&seq=blog2&orientation=landscape",
      readTime: "7 min read"
    },
    {
      title: "Hardware Integration Best Practices",
      excerpt: "Essential guidelines for successful hardware-software integration projects and avoiding common pitfalls.",
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
    if (!mounted) return;

    const heroInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 10000);

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
          if (entry.isIntersecting) {
            setVisibleSections(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [mounted]);

  const setSectionRef = (id: string) => (el: HTMLElement | null) => {
    sectionRefs.current[id] = el;
  };

  const stats = [
    { number: "500+", label: "Projects Completed" },
    { number: "50+", label: "Happy Clients" },
    { number: "15+", label: "Years Experience" },
    { number: "24/7", label: "Support Available" }
  ];

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white">
        <div className="animate-pulse">
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

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer hover:scale-125 ${index === currentSlide ? 'bg-white' : 'bg-white/50'}`}
            />
          ))}
        </div>
      </section>

      {/* Featured Services Section */}
[      <section
        id="featured-services"
        ref={setSectionRef('featured-services')}
        className="py-20 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <div className={`text-center mb-16 transform transition-all duration-1000 ${visibleSections['featured-services'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our most popular technology solutions that drive business success
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredServices.map((service, index) => (
              <div
                key={index}
                className={`bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all backface-visible duration-150 transform hover:-translate-y-3 hover:scale-105 cursor-pointer group ${visibleSections['featured-services']
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-10 opacity-0'
                  }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-full mb-6 group-hover:bg-[#25237b]700 transition-colors duration-300">
                  <i className={`${service.icon} text-2xl text-blue-600 group-hover:text-[#8b0303] transition-colors duration-300`}></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature, featureIndex) => (
                    <span
                      key={featureIndex}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full group-hover:bg-blue-100 group-hover:text-blue-800 transition-colors duration-300"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
]
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

      

      {/* Certifications & Memberships Slider */}
      <section
        id="certifications"
        ref={setSectionRef('certifications')}
        className="py-20"
      >
        <div className="container mx-auto px-4">
          <div className={`text-center mb-16 transform transition-all duration-1000 ${visibleSections['certifications'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Certifications & Memberships</h2>
            <p className="text-xl text-gray-600">
              Recognized excellence and professional standards
            </p>
          </div>

          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentCertSlide * 100}%)` }}
            >
              {Array.from({ length: Math.ceil(certifications.length / 4) }).map((_, pageIndex) => (
                <div key={pageIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {certifications.slice(pageIndex * 4, (pageIndex + 1) * 4).map((cert, index) => (
                      <div
                        key={index}
                        className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 cursor-pointer group"
                      >
                        <img
                          src={cert.image}
                          alt={cert.title}
                          className="w-20 h-20 mx-auto mb-4 object-contain group-hover:scale-110 transition-transform duration-300"
                        />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">{cert.title}</h3>
                        <p className="text-gray-600 text-sm">{cert.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: Math.ceil(certifications.length / 4) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentCertSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer hover:scale-125 ${index === currentCertSlide ? 'bg-[#25237b]' : 'bg-gray-300'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blogs Section */}
      <section
        id="featured-blogs"
        ref={setSectionRef('featured-blogs')}
        className="py-20 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          {/* <div className={`text-center mb-16 transform transition-all duration-1000 ${visibleSections['featured-blogs'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest Insights</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest technology trends and industry insights
            </p>
          </div> */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredBlogs.map((blog, index) => (
              <article
                key={index}
                className={`bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 cursor-pointer group overflow-hidden ${visibleSections['featured-blogs']
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

          {/* <div className="text-center mt-12">
            <Link href="/blog" className="bg-[#25237b] hover:bg-[#8b0303] text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg whitespace-nowrap cursor-pointer inline-block">
              View All Articles
            </Link>
          </div> */}
        </div>
      </section>

      {/* About Preview Section */}
      {/* <section
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
                With over 15 years of experience in the technology industry, Teresol Pvt Ltd has established itself as a leading provider of innovative software, hardware, and embedded solutions.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our team of expert engineers and developers work closely with clients to deliver cutting-edge solutions that drive business growth and operational efficiency.
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
      </section> */}

      {/* CTA Section */}
      {/* <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss how our innovative solutions can help you achieve your technology goals and drive success.
          </p>
          <Link href="/contact" className="bg-[#25237b] hover:bg-[#8b0303] text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg whitespace-nowrap cursor-pointer inline-block">
            Start Your Project Today
          </Link>
        </div>
      </section> */}

      <Footer />
    </div>
  );
}
