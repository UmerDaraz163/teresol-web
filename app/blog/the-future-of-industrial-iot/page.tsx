'use client';

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function BlogDetail() {
  const [isVisible, setIsVisible] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const relatedPosts = [
    {
      title: "Implementing Cybersecurity in Embedded Systems",
      excerpt: "Essential security practices for protecting embedded devices from cyber threats and vulnerabilities.",
      readTime: "6 min read",
      image: "https://readdy.ai/api/search-image?query=Cybersecurity%20for%20embedded%20systems%20with%20circuit%20boards%20and%20security%20shields%2C%20blue%20digital%20protection%20elements%2C%20professional%20technology%20security%20concept&width=300&height=200&seq=related1&orientation=landscape"
    },
    {
      title: "Cloud Migration Strategies for Legacy Systems",
      excerpt: "A comprehensive guide to successfully migrating legacy applications and systems to the cloud.",
      readTime: "10 min read",
      image: "https://readdy.ai/api/search-image?query=Cloud%20migration%20concept%20with%20servers%20and%20data%20transfer%20visualization%2C%20modern%20data%20center%20with%20blue%20cloud%20computing%20elements%2C%20professional%20IT%20infrastructure&width=300&height=200&seq=related2&orientation=landscape"
    },
    {
      title: "Optimizing Performance in Real-Time Embedded Applications",
      excerpt: "Techniques and best practices for achieving optimal performance in time-critical embedded systems.",
      readTime: "7 min read",
      image: "https://readdy.ai/api/search-image?query=Real-time%20embedded%20system%20performance%20optimization%20with%20microprocessors%20and%20timing%20diagrams%2C%20technical%20engineering%20environment%20with%20blue%20accent%20lighting&width=300&height=200&seq=related3&orientation=landscape"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-blue-600 transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        ></div>
      </div>

      {/* Hero Section */}
      <section className={`py-20 bg-gradient-to-r from-blue-600 to-blue-800 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-blue-500 text-white font-semibold rounded-full mb-6 hover:bg-blue-400 transition-colors duration-300">
              IoT
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              The Future of Industrial IoT: Trends and Predictions for 2024
            </h1>
            <div className="flex items-center justify-center space-x-8 text-blue-100 mb-8">
              <div className="flex items-center space-x-2">
                <i className="ri-user-line text-xl"></i>
                <span>Sarah Khan</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="ri-calendar-line text-xl"></i>
                <span>January 15, 2024</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="ri-time-line text-xl"></i>
                <span>8 min read</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className={`py-12 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-500">
              <img
                src="https://readdy.ai/api/search-image?query=Industrial%20IoT%20concept%20with%20connected%20factory%20equipment%20and%20digital%20interfaces%2C%20futuristic%20manufacturing%20environment%20with%20blue%20technological%20elements%2C%20modern%20industrial%20automation%20with%20detailed%20machinery%20and%20sensors&width=1200&height=600&seq=hero&orientation=landscape"
                alt="Industrial IoT Future"
                className="w-full h-96 object-cover object-top hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className={`py-12 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-3">
                <div className="prose prose-lg max-w-none">
                  <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                    The Industrial Internet of Things (IIoT) continues to revolutionize manufacturing and industrial processes, 
                    creating unprecedented opportunities for efficiency, automation, and data-driven decision making. As we progress 
                    through 2024, several key trends are shaping the future of industrial connectivity.
                  </p>

                  <h2 className="text-3xl font-bold text-gray-900 mb-6 hover:text-blue-600 transition-colors duration-300">
                    Edge Computing Integration
                  </h2>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    One of the most significant developments in IIoT is the widespread adoption of edge computing. 
                    By processing data closer to where it's generated, industrial facilities can achieve real-time 
                    decision making, reduce latency, and improve overall system reliability. This trend is particularly 
                    crucial for applications requiring immediate responses, such as predictive maintenance and quality control.
                  </p>

                  <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-8 rounded-r-lg hover:bg-blue-100 transition-colors duration-300">
                    <h3 className="text-xl font-semibold text-blue-900 mb-2">Key Insight</h3>
                    <p className="text-blue-800">
                      Edge computing in IIoT reduces data transmission costs by up to 40% while improving response 
                      times by 75% compared to cloud-only solutions.
                    </p>
                  </div>

                  <h2 className="text-3xl font-bold text-gray-900 mb-6 hover:text-blue-600 transition-colors duration-300">
                    Advanced Analytics and AI Integration
                  </h2>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Artificial Intelligence and Machine Learning are becoming integral components of IIoT systems. 
                    These technologies enable predictive analytics, anomaly detection, and automated optimization 
                    of industrial processes. The combination of AI with IIoT data creates powerful insights that 
                    drive operational excellence.
                  </p>

                  <ul className="list-disc pl-6 mb-8 space-y-2 text-gray-700">
                    <li>Predictive maintenance algorithms reduce unplanned downtime by 50%</li>
                    <li>Quality control systems using AI improve product consistency by 35%</li>
                    <li>Energy optimization through ML models reduces consumption by 20-30%</li>
                    <li>Supply chain visibility increases through intelligent tracking systems</li>
                  </ul>

                  <h2 className="text-3xl font-bold text-gray-900 mb-6 hover:text-blue-600 transition-colors duration-300">
                    Enhanced Security Frameworks
                  </h2>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    As IIoT deployments grow, cybersecurity becomes increasingly critical. Modern industrial 
                    systems are implementing zero-trust architectures, advanced encryption protocols, and 
                    continuous monitoring systems to protect against evolving threats.
                  </p>

                  <div className="bg-gray-50 rounded-xl p-8 mb-8 hover:bg-gray-100 transition-colors duration-300">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">Security Best Practices</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Network Segmentation</h4>
                        <p className="text-gray-600">Isolate critical systems from general networks</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Regular Updates</h4>
                        <p className="text-gray-600">Maintain current firmware and security patches</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Access Control</h4>
                        <p className="text-gray-600">Implement role-based authentication systems</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Monitoring</h4>
                        <p className="text-gray-600">Continuous threat detection and response</p>
                      </div>
                    </div>
                  </div>

                  <h2 className="text-3xl font-bold text-gray-900 mb-6 hover:text-blue-600 transition-colors duration-300">
                    Looking Ahead: 2024 Predictions
                  </h2>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    The remainder of 2024 will see accelerated adoption of IIoT technologies across various 
                    industries. Key developments to watch include the integration of 5G networks for improved 
                    connectivity, the rise of digital twins for system modeling, and increased focus on 
                    sustainability through IoT-enabled energy management.
                  </p>
                </div>

                {/* Share Buttons */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Share this article</h3>
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105">
                      <i className="ri-twitter-line"></i>
                      <span>Twitter</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-all duration-300 hover:scale-105">
                      <i className="ri-linkedin-line"></i>
                      <span>LinkedIn</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 hover:scale-105">
                      <i className="ri-mail-line"></i>
                      <span>Email</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-8">
                  {/* Author Info */}
                  <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">About the Author</h3>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">SK</span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Sarah Khan</div>
                        <div className="text-sm text-gray-600">IoT Solutions Architect</div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      Sarah has over 8 years of experience in industrial IoT implementations 
                      and helps companies transform their operations through connected technologies.
                    </p>
                  </div>

                  {/* Table of Contents */}
                  <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-300">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Table of Contents</h3>
                    <ul className="space-y-2 text-sm">
                      <li><a href="#edge-computing" className="text-blue-600 hover:text-blue-700 cursor-pointer">Edge Computing Integration</a></li>
                      <li><a href="#ai-integration" className="text-blue-600 hover:text-blue-700 cursor-pointer">AI Integration</a></li>
                      <li><a href="#security" className="text-blue-600 hover:text-blue-700 cursor-pointer">Security Frameworks</a></li>
                      <li><a href="#predictions" className="text-blue-600 hover:text-blue-700 cursor-pointer">2024 Predictions</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className={`py-20 bg-gray-50 transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((post, index) => (
                <article 
                  key={index}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 group cursor-pointer"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover object-top group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{post.readTime}</span>
                      <span className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer group-hover:translate-x-2 transition-transform duration-300">
                        Read More →
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className={`py-20 bg-blue-600 transform transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Stay Updated</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get the latest insights on Industrial IoT and emerging technologies delivered to your inbox
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300"
              />
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 whitespace-nowrap cursor-pointer hover:scale-105">
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