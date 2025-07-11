'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';

export default function Solutions() {
  const solutions = [
    {
      title: "Enterprise Software Solutions",
      description: "Custom enterprise applications designed to streamline operations and boost productivity",
      features: ["ERP Systems", "CRM Solutions", "Business Intelligence", "Workflow Automation"],
      image: "https://readdy.ai/api/search-image?query=Modern%20enterprise%20software%20dashboard%20displaying%20analytics%20and%20business%20data%20on%20multiple%20screens%2C%20clean%20professional%20interface%20with%20blue%20accent%20colors%2C%20corporate%20office%20environment&width=600&height=400&seq=sol1&orientation=landscape"
    },
    {
      title: "Industrial Hardware Systems",
      description: "Robust hardware solutions for manufacturing and industrial applications",
      features: ["Control Systems", "Monitoring Equipment", "Custom PCB Design", "Industrial IoT"],
      image: "https://readdy.ai/api/search-image?query=Industrial%20control%20panel%20with%20electronic%20components%20and%20monitoring%20systems%2C%20modern%20manufacturing%20facility%20with%20blue%20lighting%2C%20professional%20industrial%20hardware%20setup&width=600&height=400&seq=sol2&orientation=landscape"
    },
    {
      title: "Embedded System Integration",
      description: "Intelligent embedded solutions for automation and smart device applications",
      features: ["Microcontroller Programming", "Sensor Integration", "Real-time Systems", "IoT Connectivity"],
      image: "https://readdy.ai/api/search-image?query=Advanced%20embedded%20system%20circuit%20board%20with%20microprocessors%20and%20sensors%2C%20close-up%20view%20of%20electronic%20components%2C%20modern%20tech%20lab%20with%20blue%20accent%20lighting&width=600&height=400&seq=sol3&orientation=landscape"
    },
    {
      title: "Cloud & Digital Transformation",
      description: "Comprehensive cloud migration and digital transformation services",
      features: ["Cloud Migration", "DevOps Implementation", "API Development", "System Modernization"],
      image: "https://readdy.ai/api/search-image?query=Cloud%20computing%20visualization%20with%20servers%20and%20data%20flow%20graphics%2C%20modern%20data%20center%20environment%20with%20blue%20lighting%2C%20professional%20technology%20infrastructure&width=600&height=400&seq=sol4&orientation=landscape"
    }
  ];

  const industries = [
    { name: "Manufacturing", icon: "ri-factory-line" },
    { name: "Healthcare", icon: "ri-hospital-line" },
    { name: "Finance", icon: "ri-bank-line" },
    { name: "Education", icon: "ri-school-line" },
    { name: "Retail", icon: "ri-store-line" },
    { name: "Telecommunications", icon: "ri-signal-tower-line" },
    { name: "Energy", icon: "ri-flashlight-line" },
    { name: "Transportation", icon: "ri-truck-line" }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section
        className="relative py-32 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://readdy.ai/api/search-image?query=Technology%20solutions%20concept%20with%20interconnected%20digital%20systems%20and%20data%20networks%2C%20futuristic%20blue%20digital%20environment%2C%20professional%20corporate%20technology%20background&width=1920&height=600&seq=solhero&orientation=landscape)`
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Our Solutions</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Comprehensive technology solutions tailored to meet your specific business requirements
          </p>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Technology Solutions Portfolio</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From software development to hardware integration, we deliver end-to-end solutions
            </p>
          </div>

          <div className="space-y-20">
            {solutions.map((solution, index) => (
              <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}>
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">{solution.title}</h3>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">{solution.description}</p>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {solution.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/contact" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer inline-block">
                    Learn More
                  </Link>
                </div>
                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <img
                    src={solution.image}
                    alt={solution.title}
                    className="w-full h-80 object-cover object-top rounded-xl shadow-lg"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Industries We Serve</h2>
            <p className="text-xl text-gray-600">
              Delivering specialized solutions across diverse industry verticals
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {industries.map((industry, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full mb-4 mx-auto">
                  <i className={`${industry.icon} text-xl text-blue-600`}></i>
                </div>
                <h3 className="text-sm font-semibold text-gray-900">{industry.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Development Process</h2>
            <p className="text-xl text-gray-600">
              A systematic approach to ensure successful project delivery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 flex items-center justify-center bg-blue-600 text-white rounded-full mb-6 mx-auto text-2xl font-bold">1</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Analysis & Planning</h3>
              <p className="text-gray-600">Comprehensive requirement analysis and strategic planning to ensure project success</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 flex items-center justify-center bg-blue-600 text-white rounded-full mb-6 mx-auto text-2xl font-bold">2</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Design & Development</h3>
              <p className="text-gray-600">Iterative design and development process with regular client feedback and updates</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 flex items-center justify-center bg-blue-600 text-white rounded-full mb-6 mx-auto text-2xl font-bold">3</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Testing & Deployment</h3>
              <p className="text-gray-600">Rigorous testing followed by smooth deployment and ongoing support</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Discuss Your Project?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let's explore how our solutions can address your specific business challenges
          </p>
          <Link href="/contact" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer inline-block">
            Schedule Consultation
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}