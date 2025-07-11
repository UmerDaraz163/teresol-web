'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';

export default function Resources() {
  const whitepapers = [
    {
      title: "Digital Transformation in Manufacturing",
      description: "A comprehensive guide to implementing digital solutions in manufacturing environments",
      category: "Whitepaper",
      downloadSize: "2.4 MB",
      image: "https://readdy.ai/api/search-image?query=Digital%20transformation%20concept%20with%20manufacturing%20equipment%20and%20digital%20interfaces%2C%20modern%20industrial%20setting%20with%20blue%20technological%20elements%2C%20professional%20business%20document%20design&width=300&height=200&seq=wp1&orientation=landscape"
    },
    {
      title: "IoT Security Best Practices",
      description: "Essential security considerations for IoT device deployment and management",
      category: "Whitepaper",
      downloadSize: "1.8 MB",
      image: "https://readdy.ai/api/search-image?query=IoT%20security%20visualization%20with%20connected%20devices%20and%20security%20shields%2C%20cybersecurity%20concept%20with%20blue%20digital%20protection%20elements%2C%20professional%20technical%20document&width=300&height=200&seq=wp2&orientation=landscape"
    },
    {
      title: "Embedded Systems Design Guide",
      description: "Complete reference for designing efficient and reliable embedded systems",
      category: "Technical Guide",
      downloadSize: "3.2 MB",
      image: "https://readdy.ai/api/search-image?query=Embedded%20systems%20circuit%20board%20design%20with%20microprocessors%20and%20components%2C%20technical%20engineering%20documentation%20with%20blue%20accent%20elements%2C%20professional%20guide%20layout&width=300&height=200&seq=wp3&orientation=landscape"
    }
  ];

  const caseStudies = [
    {
      title: "Smart Factory Implementation at ABC Manufacturing",
      description: "How we helped transform a traditional factory into a smart, connected facility",
      industry: "Manufacturing",
      results: "40% efficiency increase, 25% cost reduction",
      image: "https://readdy.ai/api/search-image?query=Smart%20factory%20with%20automated%20production%20line%20and%20digital%20monitoring%20systems%2C%20modern%20manufacturing%20facility%20with%20blue%20LED%20indicators%20and%20connected%20equipment&width=300&height=200&seq=cs1&orientation=landscape"
    },
    {
      title: "Hospital Management System Modernization",
      description: "Complete digital transformation of patient management and medical records",
      industry: "Healthcare",
      results: "50% faster patient processing, 99.9% uptime",
      image: "https://readdy.ai/api/search-image?query=Modern%20hospital%20with%20digital%20patient%20management%20system%2C%20healthcare%20technology%20with%20blue%20interface%20elements%2C%20professional%20medical%20facility%20with%20advanced%20IT%20infrastructure&width=300&height=200&seq=cs2&orientation=landscape"
    },
    {
      title: "Energy Monitoring for Commercial Complex",
      description: "Implementation of comprehensive energy management solution",
      industry: "Real Estate",
      results: "30% energy savings, ROI in 18 months",
      image: "https://readdy.ai/api/search-image?query=Commercial%20building%20with%20energy%20monitoring%20dashboard%20and%20smart%20meters%2C%20green%20building%20technology%20with%20blue%20interface%20elements%2C%20sustainable%20energy%20management&width=300&height=200&seq=cs3&orientation=landscape"
    }
  ];

  const webinars = [
    {
      title: "Future of Industrial IoT",
      date: "January 25, 2024",
      duration: "45 minutes",
      status: "upcoming",
      description: "Exploring trends and opportunities in Industrial Internet of Things"
    },
    {
      title: "Cybersecurity for Embedded Systems",
      date: "December 15, 2023",
      duration: "60 minutes",
      status: "recorded",
      description: "Best practices for securing embedded devices and systems"
    },
    {
      title: "Cloud Migration Strategies",
      date: "November 20, 2023",
      duration: "50 minutes",
      status: "recorded",
      description: "Comprehensive guide to successful cloud migration projects"
    }
  ];

  const tools = [
    {
      title: "System Requirements Calculator",
      description: "Estimate hardware requirements for your embedded system project",
      type: "Online Tool",
      icon: "ri-calculator-line"
    },
    {
      title: "IoT Device Compatibility Checker",
      description: "Verify compatibility between different IoT devices and protocols",
      type: "Online Tool",
      icon: "ri-check-line"
    },
    {
      title: "Project Cost Estimator",
      description: "Get preliminary cost estimates for your technology project",
      type: "Online Tool",
      icon: "ri-money-dollar-circle-line"
    },
    {
      title: "Technical Specifications Template",
      description: "Downloadable template for documenting technical requirements",
      type: "Template",
      icon: "ri-file-text-line"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section
        className="relative py-32 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://readdy.ai/api/search-image?query=Digital%20library%20and%20knowledge%20resources%20with%20technical%20documents%20and%20educational%20materials%2C%20modern%20learning%20environment%20with%20blue%20accent%20lighting%2C%20professional%20resource%20center&width=1920&height=600&seq=reshero&orientation=landscape)`
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Resources</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Access our comprehensive collection of guides, case studies, and tools to accelerate your technology projects
          </p>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="bg-blue-50 p-6 rounded-xl text-center">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-600 text-white rounded-full mb-4 mx-auto">
                <i className="ri-file-text-line text-xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Whitepapers</h3>
              <p className="text-gray-600 text-sm">In-depth technical guides</p>
            </div>
            <div className="bg-green-50 p-6 rounded-xl text-center">
              <div className="w-12 h-12 flex items-center justify-center bg-green-600 text-white rounded-full mb-4 mx-auto">
                <i className="ri-presentation-line text-xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Case Studies</h3>
              <p className="text-gray-600 text-sm">Real project success stories</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl text-center">
              <div className="w-12 h-12 flex items-center justify-center bg-purple-600 text-white rounded-full mb-4 mx-auto">
                <i className="ri-video-line text-xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Webinars</h3>
              <p className="text-gray-600 text-sm">Live and recorded sessions</p>
            </div>
            <div className="bg-orange-50 p-6 rounded-xl text-center">
              <div className="w-12 h-12 flex items-center justify-center bg-orange-600 text-white rounded-full mb-4 mx-auto">
                <i className="ri-tools-line text-xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Tools</h3>
              <p className="text-gray-600 text-sm">Calculators and templates</p>
            </div>
          </div>
        </div>
      </section>

      {/* Whitepapers Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Whitepapers & Guides</h2>
            <p className="text-xl text-gray-600">
              Download our comprehensive technical guides and industry insights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whitepapers.map((paper, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <img
                  src={paper.image}
                  alt={paper.title}
                  className="w-full h-48 object-cover object-top"
                />
                <div className="p-6">
                  <div className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-sm font-medium rounded-full mb-3">
                    {paper.category}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{paper.title}</h3>
                  <p className="text-gray-600 mb-4">{paper.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{paper.downloadSize}</span>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer">
                      Download PDF
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Case Studies</h2>
            <p className="text-xl text-gray-600">
              Learn from real-world implementations and success stories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <img
                  src={study.image}
                  alt={study.title}
                  className="w-full h-48 object-cover object-top"
                />
                <div className="p-6">
                  <div className="inline-block px-3 py-1 bg-green-100 text-green-600 text-sm font-medium rounded-full mb-3">
                    {study.industry}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{study.title}</h3>
                  <p className="text-gray-600 mb-4">{study.description}</p>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <div className="text-sm font-semibold text-gray-900 mb-1">Key Results:</div>
                    <div className="text-sm text-gray-600">{study.results}</div>
                  </div>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer">
                    Read Full Case Study
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Webinars Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Webinars & Events</h2>
            <p className="text-xl text-gray-600">
              Join our educational webinars and stay updated with industry trends
            </p>
          </div>

          <div className="space-y-6">
            {webinars.map((webinar, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
                  <div className="lg:col-span-2">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`px-3 py-1 text-sm font-medium rounded-full ${
                        webinar.status === 'upcoming' 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {webinar.status === 'upcoming' ? 'Upcoming' : 'Recorded'}
                      </div>
                      <span className="text-gray-500 text-sm">{webinar.duration}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{webinar.title}</h3>
                    <p className="text-gray-600">{webinar.description}</p>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900">{webinar.date}</div>
                  </div>
                  <div className="text-center">
                    <button className={`px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
                      webinar.status === 'upcoming'
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-600 hover:bg-gray-700 text-white'
                    }`}>
                      {webinar.status === 'upcoming' ? 'Register Now' : 'Watch Recording'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Tools & Calculators</h2>
            <p className="text-xl text-gray-600">
              Helpful tools and templates to assist with your projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full mb-4">
                  <i className={`${tool.icon} text-xl text-blue-600`}></i>
                </div>
                <div className="inline-block px-3 py-1 bg-orange-100 text-orange-600 text-sm font-medium rounded-full mb-3">
                  {tool.type}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{tool.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{tool.description}</p>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer">
                  {tool.type === 'Template' ? 'Download' : 'Use Tool'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Stay Updated</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest resources, industry insights, and technology updates
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}