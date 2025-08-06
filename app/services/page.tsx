'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';

export default function Services() {
  // Services data updated with detailed features
  const services = [
    {
      icon: "ri-cpu-line",
      title: "Embedded Hardware Design Services",
      description: "Our embedded design includes complex multi-layer (18-24) high-speed signal processing PCBs, Single Board Computers (SBC) for time-scheduled applications, their board support packages/APIs for external integration, and complete customized end-to-end products qualified for tough temperature environments.",
      features: [
        "Single Board Computers (SBCs)", 
        "Military Avionics & Display Computers", 
        "Control & Mission Data Recorders", 
        "Ground-based Defense Solutions", 
        "AI-based Autotracking Systems", 
        "Ruggedized Field Equipment"
      ],
      techIcons: [
        '/services/hw1.png',
        '/services/hw2.png',
        '/services/hw3.png',
      ]
    },
    {
      icon: "/icons/esw.png",
      title: "Enterprise Software Solutions",
      description: "As a well-reputed Research and Innovation (R&I) company, we have a proven track record in developing customized, cost-efficient, and scalable enterprise software solutions. We are a team of over 400 professionals, including 20 PhDs from esteemed global institutes, and are ISO 9001, 20000, 27001 certified.",
      features: [
        "Command, Control, Communications, Computers & Intelligence (C4I) Systems", 
        "Banking & Fintech Platforms", 
        "Custom ERP & CRM Solutions",
        "Cloud-Based SaaS Applications",
        "System Integration & Modernization",
        "Secure Enterprise Portals"
      ],
      techIcons: [
        '/services/sw1.png',
        '/services/sw2.png',
        '/services/sw3.png',
      ]
    },
    {
      icon: "/icons/ai.png",
      title: "AI Development Services",
      description: "The future of business resides in the transformative capabilities of Artificial Intelligence. We help you integrate AI into your current infrastructure by delivering state-of-the-art AI software development services. Our competent developers provide you with custom solutions perfectly tailored to your requirements.",
      features: [
        "AI-Powered Business Analytics Suites", 
        "Intelligent Detection & Tracking Systems", 
        "Predictive Wind Power Estimation", 
        "Advanced Brain Image Processing", 
        "Automated Medical Imaging Analysis (e.g., Eye Blob Remover)",
        "Natural Language Processing (NLP) Solutions"
      ],
      techIcons: [
        '/services/ai1.png',
        '/services/ai2.png',
        '/services/ai3.png',
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section
        className="relative py-32 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://readdy.ai/api/search-image?query=Abstract%20background%20of%20glowing%20blue%20and%20purple%20digital%20network%20connections%20on%20dark%20backdrop%2C%20futuristic%20technology%20concept&width=1920&height=600&seq=servicehero2&orientation=landscape)`
        }}
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
            {services.map((service, index) => (
              <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                
                {/* Text Content Column */}
                <div className={`flex flex-col ${index % 2 !== 0 ? 'lg:order-last' : ''}`}>
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5 bg-gradient-to-r from-[#25237b] to-[#8b0303] bg-clip-text text-transparent">{service.title}</h3>
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6">{service.description}</p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center bg-green-100 rounded-full mr-3 mt-1">
                          <i className="ri-check-line text-green-700 text-base"></i>
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                   <div className="mt-auto">
                     <Link href="/contact" className="inline-block bg-[#25237b] hover:bg-[#8b0303] text-white px-6 py-3 rounded-lg font-medium text-sm md:text-base transition-all duration-300 hover:scale-105">
                       Inquire About {service.title.split(' ')[0]}
                     </Link>
                   </div>
                </div>

                {/* Visuals (Tech Icons) Column */}
                <div className="flex items-center justify-center">
                   <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6 p-6 bg-gray-50/80 rounded-2xl shadow-lg border border-gray-200/60 w-full">
                    {service.techIcons.map((iconUrl, i) => (
                      <div key={i} className="bg-white p-4 rounded-xl flex items-center justify-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <img
                          src={iconUrl}
                          alt={`Technology icon ${i + 1}`}
                          className="h-16 md:h-20 w-auto object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))}
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