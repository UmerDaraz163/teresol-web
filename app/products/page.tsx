'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';

export default function Products() {
  const products = [
    {
      title: "TeresoLink IoT Platform",
      category: "Software Product",
      description: "Comprehensive IoT management platform for device monitoring and data analytics",
      features: ["Real-time monitoring", "Advanced analytics", "Cloud connectivity", "Mobile app support"],
      image: "https://readdy.ai/api/search-image?query=IoT%20dashboard%20interface%20showing%20device%20monitoring%20and%20analytics%2C%20modern%20software%20platform%20with%20blue%20interface%20elements%2C%20clean%20professional%20design%20with%20data%20visualization&width=400&height=300&seq=prod1&orientation=landscape",
      price: "Starting from 299/month"
    },
    {
      title: "TeresoCTRL Industrial Controller",
      category: "Hardware Product",
      description: "Advanced industrial control system for manufacturing and automation applications",
      features: ["Multi-channel I/O", "Real-time processing", "Industrial protocols", "Rugged design"],
      image: "https://readdy.ai/api/search-image?query=Industrial%20control%20system%20hardware%20with%20multiple%20input%20output%20ports%2C%20professional%20manufacturing%20equipment%20with%20blue%20accent%20lighting%2C%20robust%20industrial%20design&width=400&height=300&seq=prod2&orientation=landscape",
      price: "Starting from 1,299"
    },
    {
      title: "TeresoSense Smart Sensor Array",
      category: "Embedded Product",
      description: "Intelligent sensor network solution for environmental monitoring and data collection",
      features: ["Multi-sensor fusion", "Wireless connectivity", "Low power consumption", "Weather resistant"],
      image: "https://readdy.ai/api/search-image?query=Smart%20sensor%20array%20devices%20with%20wireless%20connectivity%2C%20modern%20IoT%20sensors%20for%20environmental%20monitoring%2C%20clean%20tech%20design%20with%20blue%20LED%20indicators&width=400&height=300&seq=prod3&orientation=landscape",
      price: "Starting from 199 per unit"
    },
    {
      title: "TeresoSecure Access System",
      category: "Software + Hardware",
      description: "Integrated access control system combining hardware and software for security management",
      features: ["Biometric authentication", "Cloud management", "Mobile access", "Audit trails"],
      image: "https://readdy.ai/api/search-image?query=Modern%20access%20control%20system%20with%20biometric%20scanner%20and%20security%20interface%2C%20professional%20security%20hardware%20with%20blue%20interface%20lighting%2C%20corporate%20security%20solution&width=400&height=300&seq=prod4&orientation=landscape",
      price: "Starting from 899"
    },
    {
      title: "TeresoEnergy Management Suite",
      category: "Software Product",
      description: "Comprehensive energy monitoring and management solution for smart buildings",
      features: ["Real-time monitoring", "Energy optimization", "Cost analysis", "Sustainability reporting"],
      image: "https://readdy.ai/api/search-image?query=Energy%20management%20software%20dashboard%20showing%20power%20consumption%20analytics%20and%20optimization%20charts%2C%20professional%20interface%20with%20blue%20color%20scheme%2C%20clean%20data%20visualization&width=400&height=300&seq=prod5&orientation=landscape",
      price: "Starting from 499/month"
    },
    {
      title: "TeresoConnect Gateway",
      category: "Hardware Product",
      description: "Universal communication gateway for connecting legacy systems to modern networks",
      features: ["Protocol conversion", "Edge computing", "Secure tunneling", "Remote management"],
      image: "https://readdy.ai/api/search-image?query=Network%20gateway%20device%20with%20multiple%20connectivity%20ports%20and%20LED%20indicators%2C%20industrial%20communication%20hardware%20with%20modern%20design%2C%20blue%20accent%20lighting&width=400&height=300&seq=prod6&orientation=landscape",
      price: "Starting from 799"
    }
  ];

  const categories = ["All Products", "Software Product", "Hardware Product", "Embedded Product", "Software + Hardware"];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section
        className="relative py-32 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://readdy.ai/api/search-image?query=Technology%20products%20showcase%20with%20software%20interfaces%20and%20hardware%20devices%2C%20modern%20product%20display%20with%20blue%20lighting%2C%20professional%20corporate%20technology%20products&width=1920&height=600&seq=prodhero&orientation=landscape)`
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Our Products</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Innovative software and hardware products designed to solve real-world business challenges
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <button
                key={index}
                className="px-6 py-3 bg-white text-gray-700 rounded-full font-medium hover:bg-blue-600 hover:text-white transition-colors whitespace-nowrap cursor-pointer"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Product Portfolio</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our range of innovative products designed to enhance efficiency and drive digital transformation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover object-top"
                />
                <div className="p-8">
                  <div className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-sm font-medium rounded-full mb-4">
                    {product.category}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{product.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{product.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    {product.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-lg font-semibold text-blue-600">{product.price}</div>
                    <Link href="/contact" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer">
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Teresol Products?</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 flex items-center justify-center bg-blue-100 rounded-full flex-shrink-0">
                    <i className="ri-shield-check-line text-blue-600"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Enterprise-Grade Quality</h3>
                    <p className="text-gray-600">Built to meet the highest standards of reliability and performance</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 flex items-center justify-center bg-blue-100 rounded-full flex-shrink-0">
                    <i className="ri-settings-line text-blue-600"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Customizable Solutions</h3>
                    <p className="text-gray-600">Flexible products that can be tailored to your specific requirements</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 flex items-center justify-center bg-blue-100 rounded-full flex-shrink-0">
                    <i className="ri-customer-service-line text-blue-600"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Comprehensive Support</h3>
                    <p className="text-gray-600">24/7 technical support and regular updates to ensure optimal performance</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 flex items-center justify-center bg-blue-100 rounded-full flex-shrink-0">
                    <i className="ri-money-dollar-circle-line text-blue-600"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Cost-Effective</h3>
                    <p className="text-gray-600">Competitive pricing with excellent return on investment</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img
                src="https://readdy.ai/api/search-image?query=Professional%20team%20testing%20and%20validating%20technology%20products%20in%20modern%20laboratory%2C%20quality%20assurance%20process%20with%20electronic%20equipment%20and%20software%20testing%2C%20blue%20accent%20lighting&width=600&height=400&seq=benefits&orientation=landscape"
                alt="Product Benefits"
                className="w-full h-96 object-cover object-top rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600">
              Real feedback from businesses using our products
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-5 h-5 flex items-center justify-center">
                    <i className="ri-star-fill text-yellow-400"></i>
                  </div>
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">
                "The TeresoLink platform has revolutionized how we monitor our industrial equipment. The real-time analytics have helped us reduce downtime by 40%."
              </p>
              <div>
                <div className="font-semibold text-gray-900">Hassan Ahmed</div>
                <div className="text-gray-600">Operations Manager, ABC Manufacturing</div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-5 h-5 flex items-center justify-center">
                    <i className="ri-star-fill text-yellow-400"></i>
                  </div>
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">
                "TeresoCTRL has been instrumental in automating our production line. The reliability and ease of use exceeded our expectations."
              </p>
              <div>
                <div className="font-semibold text-gray-900">Maria Khan</div>
                <div className="text-gray-600">Plant Engineer, XYZ Industries</div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-5 h-5 flex items-center justify-center">
                    <i className="ri-star-fill text-yellow-400"></i>
                  </div>
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">
                "The energy management suite has helped us achieve 25% cost savings on our electricity bills while improving our sustainability metrics."
              </p>
              <div>
                <div className="font-semibold text-gray-900">Ali Rahman</div>
                <div className="text-gray-600">Facility Manager, DEF Corporation</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Explore Our Products?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Schedule a demo or consultation to see how our products can benefit your business
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer">
              Request Demo
            </Link>
            <Link href="/contact" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer">
              Get Quote
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}