'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';

export default function Services() {
  const services = [
    {
      title: "Software Development Services",
      description: "End-to-end software development from concept to deployment",
      icon: "ri-code-line",
      features: [
        "Custom Application Development",
        "Web & Mobile Applications",
        "API Development & Integration",
        "Legacy System Modernization",
        "Cloud-Native Solutions",
        "Microservices Architecture"
      ]
    },
    {
      title: "Hardware Design & Integration",
      description: "Complete hardware solutions from design to manufacturing",
      icon: "ri-computer-line",
      features: [
        "PCB Design & Layout",
        "Circuit Analysis & Simulation",
        "Prototype Development",
        "Hardware Testing & Validation",
        "Manufacturing Support",
        "Component Sourcing"
      ]
    },
    {
      title: "Embedded Systems Development",
      description: "Intelligent embedded solutions for various applications",
      icon: "ri-cpu-line",
      features: [
        "Microcontroller Programming",
        "Real-Time Operating Systems",
        "Sensor Integration",
        "IoT Device Development",
        "Firmware Development",
        "Performance Optimization"
      ]
    },
    {
      title: "System Integration Services",
      description: "Seamless integration of software and hardware components",
      icon: "ri-settings-line",
      features: [
        "Enterprise System Integration",
        "Third-Party API Integration",
        "Database Integration",
        "Legacy System Migration",
        "Cloud Integration",
        "Performance Monitoring"
      ]
    },
    {
      title: "Consulting & Technical Support",
      description: "Expert guidance and ongoing technical assistance",
      icon: "ri-customer-service-line",
      features: [
        "Technology Consulting",
        "Architecture Review",
        "Performance Optimization",
        "Security Assessment",
        "24/7 Technical Support",
        "Training & Documentation"
      ]
    },
    {
      title: "Quality Assurance & Testing",
      description: "Comprehensive testing services to ensure reliability",
      icon: "ri-shield-check-line",
      features: [
        "Automated Testing",
        "Performance Testing",
        "Security Testing",
        "Hardware Validation",
        "Compliance Testing",
        "User Acceptance Testing"
      ]
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
      title: "IEEE Membership",
      description: "Institute of Electrical and Electronics Engineers",
      image: "https://readdy.ai/api/search-image?query=IEEE%20professional%20membership%20badge%20with%20blue%20and%20white%20design%2C%20electrical%20engineering%20certification%20symbol%2C%20clean%20minimal%20background&width=200&height=200&seq=cert4&orientation=squarish"
    }
  ];

  const memberships = [
    {
      title: "Pakistan Software Houses Association",
      acronym: "P@SHA",
      description: "Premier trade association for IT companies in Pakistan"
    },
    {
      title: "Pakistan Electronics Association",
      acronym: "PEA",
      description: "Leading association for electronics industry"
    },
    {
      title: "Karachi Chamber of Commerce",
      acronym: "KCCI",
      description: "Business community representation and advocacy"
    },
    {
      title: "Software Technology Parks",
      acronym: "STPK",
      description: "Technology park membership for innovation support"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section
        className="relative py-32 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://readdy.ai/api/search-image?query=Professional%20technology%20services%20team%20working%20on%20software%20and%20hardware%20solutions%2C%20modern%20corporate%20office%20with%20computers%20and%20electronic%20equipment%2C%20blue%20accent%20lighting%20and%20clean%20workspace&width=1920&height=600&seq=servicehero&orientation=landscape)`
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Our Services</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Comprehensive technology services designed to accelerate your digital transformation
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Professional Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From initial consultation to ongoing support, we provide end-to-end technology services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-full mb-6">
                  <i className={`${service.icon} text-2xl text-blue-600`}></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Certifications & Standards</h2>
            <p className="text-xl text-gray-600">
              Our commitment to quality is validated by industry-recognized certifications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg text-center">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-24 h-24 mx-auto mb-6 object-contain"
                />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{cert.title}</h3>
                <p className="text-gray-600 text-sm">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Memberships Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Professional Memberships</h2>
            <p className="text-xl text-gray-600">
              Active participation in industry associations and professional communities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {memberships.map((membership, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-full">
                    <span className="text-blue-600 font-bold text-sm">{membership.acronym}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{membership.title}</h3>
                    <p className="text-gray-600">{membership.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">24/7 Technical Support</h2>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Our dedicated support team ensures your systems run smoothly with round-the-clock monitoring and assistance.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <i className="ri-check-line text-white text-xl"></i>
                  </div>
                  <span className="text-blue-100">Remote monitoring and diagnostics</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <i className="ri-check-line text-white text-xl"></i>
                  </div>
                  <span className="text-blue-100">Preventive maintenance programs</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <i className="ri-check-line text-white text-xl"></i>
                  </div>
                  <span className="text-blue-100">Emergency response team</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <i className="ri-check-line text-white text-xl"></i>
                  </div>
                  <span className="text-blue-100">Regular system updates and patches</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="text-6xl font-bold text-white mb-4">24/7</div>
                <div className="text-2xl text-blue-100 mb-6">Support Available</div>
                <Link href="/contact" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer inline-block">
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
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Need Custom Services?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            We understand that every business is unique. Let's discuss your specific requirements and create a tailored service package.
          </p>
          <Link href="/contact" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer inline-block">
            Request Custom Quote
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}