'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { services, type Service, type FeatureDetail } from '@/app/data/servicesPageData'; // Adjust path if needed

export default function Services() {
  const [expandedServices, setExpandedServices] = useState<Record<string, boolean>>({});

  const toggleService = (title: string) => {
    setExpandedServices(prevState => ({
      ...prevState,
      [title]: !prevState[title]
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section
        className="relative py-32 bg-cover bg-center"
        style={{ backgroundImage: 'url(/services/hw1.png)' }}
      >
        <div className="absolute inset-0 bg-gray-900/70"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Our Core Services</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Pioneering end-to-end technology solutions to drive innovation and accelerate your business success.
          </p>
        </div>
      </section>

      {/* Detailed Services Sections */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">A Closer Look at Our Expertise</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              We combine deep industry knowledge with technical excellence to solve your most complex challenges.
            </p>
          </div>

          <div className="flex flex-col gap-20 lg:gap-28">
            {services.map((service: Service, index: number) => {
              const isExpanded = !!expandedServices[service.title];
              
              return (
                <div key={service.title} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                  
                  {/* Text Content Column */}
                  <div className={`flex flex-col ${index % 2 !== 0 ? 'lg:order-last' : ''}`}>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5 bg-gradient-to-r from-[#25237b] to-[#8b0303] bg-clip-text text-transparent">{service.title}</h3>
                    <p className="text-gray-600 text-base md:text-lg leading-relaxed">{service.description}</p>
                    
                    {/* Expandable Features Section */}
                    <div className={`transition-all duration-700 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[1000px] mt-6' : 'max-h-0'}`}>
                      <div className="space-y-6">
                        {service.features.map((feature, featureIndex) => {
                          if (typeof feature === 'object' && 'title' in feature) {
                            const detailedFeature = feature as FeatureDetail;
                            return (
                              <div key={featureIndex}>
                                <strong className="text-gray-800">{detailedFeature.title}</strong>
                                <ul className="mt-2 space-y-2 pl-4">
                                  {detailedFeature.details.map((detail, detailIndex) => (
                                    <li key={detailIndex} className="flex items-start">
                                      <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center bg-green-100 rounded-full mr-3 mt-1">
                                        <i className="ri-check-line text-green-700 text-xs"></i>
                                      </div>
                                      <span className="text-gray-700 text-sm text-justify">{detail}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            );
                          }
                          return (
                            <li key={featureIndex} className="flex items-start">
                              <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center bg-green-100 rounded-full mr-3 mt-1">
                                <i className="ri-check-line text-green-700 text-base"></i>
                              </div>
                              <span className="text-gray-700">{feature as string}</span>
                            </li>
                          );
                        })}
                      </div>
                    </div>

                    {/* Show More/Less Button */}
                    <div className="mt-6">
                      <button 
                        onClick={() => toggleService(service.title)} 
                        className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-[#25237b] px-6 py-3 rounded-lg font-semibold text-sm md:text-base transition-all duration-300 group"
                      >
                        <i className={`text-4xl transition-transform duration-300 group-hover:translate-x-1 ${isExpanded ? 'ri-arrow-up-double-line' : 'ri-arrow-down-double-line'}`}></i>
                      </button>
                    </div>
                  </div>

                  {/* Visuals (Tech Icons) Column with Conditional Layout */}
                  <div className="flex items-center justify-center">
                    <div className={`p-4 md:p-6 bg-gray-50/80 rounded-2xl shadow-lg border border-gray-200/60 w-full transition-all duration-500 ${
                        isExpanded 
                          ? 'flex flex-col gap-4'
                          : 'grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4'
                    }`}>
                      {service.techIcons.map((iconUrl, i) => (
                        <div 
                          key={i} 
                          className={`bg-white p-2 rounded-xl flex items-center justify-center shadow-md transition-all duration-300 ${
                              !isExpanded && 'hover:shadow-xl hover:-translate-y-1.5 aspect-square'
                          }`}
                        >
                          <img
                            src={iconUrl}
                            alt={`Technology icon ${i + 1}`}
                            className={`transition-all duration-500 object-contain ${
                                isExpanded
                                  ? 'w-96 h-auto rounded-lg'
                                  : 'h-28 md:h-32 w-auto'
                            }`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">24/7 Technical Support</h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Our dedicated support team ensures your systems run smoothly with round-the-clock monitoring and assistance.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 flex items-center justify-center bg-blue-100 rounded-full">
                    <i className="ri-check-line text-[#25237b] text-sm"></i>
                  </div>
                  <span className="text-gray-700">Remote monitoring and diagnostics</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 flex items-center justify-center bg-blue-100 rounded-full">
                    <i className="ri-check-line text-[#25237b] text-sm"></i>
                  </div>
                  <span className="text-gray-700">Preventive maintenance programs</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 flex items-center justify-center bg-blue-100 rounded-full">
                    <i className="ri-check-line text-[#25237b] text-sm"></i>
                  </div>
                  <span className="text-gray-700">Emergency response team</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white border border-gray-200/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
                <div className="text-6xl font-bold text-[#25237b] mb-4">24/7</div>
                <div className="text-2xl text-gray-700 mb-6">Support Available</div>
                <Link href="/contact" className="bg-[#25237b] text-white hover:bg-opacity-90 px-8 py-4 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer inline-block">
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Need a Custom Solution?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            We understand that every business is unique. Let's discuss your specific requirements and create a tailored service package.
          </p>
          <Link href="/contact" className="bg-[#8b0303] hover:bg-opacity-90 text-white px-8 py-4 rounded-lg font-semibold transition-all hover:scale-105 whitespace-nowrap cursor-pointer inline-block">
            Request a Custom Quote
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}