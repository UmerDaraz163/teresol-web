
'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const featuredPost = {
    title: "The Future of Industrial IoT: Trends and Predictions for 2024",
    excerpt: "Exploring the latest developments in Industrial Internet of Things and what they mean for manufacturing and automation sectors.",
    author: "Sarah Khan",
    date: "January 15, 2024",
    readTime: "8 min read",
    category: "IoT",
    image: "https://readdy.ai/api/search-image?query=Industrial%20IoT%20concept%20with%20connected%20factory%20equipment%20and%20digital%20interfaces%2C%20futuristic%20manufacturing%20environment%20with%20blue%20technological%20elements%2C%20modern%20industrial%20automation&width=800&height=400&seq=featured&orientation=landscape"
  };

  const blogPosts = [
    {
      title: "Implementing Cybersecurity in Embedded Systems",
      excerpt: "Essential security practices for protecting embedded devices from cyber threats and vulnerabilities.",
      author: "Muhammad Ali",
      date: "January 10, 2024",
      readTime: "6 min read",
      category: "Security",
      image: "https://readdy.ai/api/search-image?query=Cybersecurity%20for%20embedded%20systems%20with%20circuit%20boards%20and%20security%20shields%2C%20blue%20digital%20protection%20elements%2C%20professional%20technology%20security%20concept&width=400&height=250&seq=blog1&orientation=landscape"
    },
    {
      title: "Cloud Migration Strategies for Legacy Systems",
      excerpt: "A comprehensive guide to successfully migrating legacy applications and systems to the cloud.",
      author: "Ahmed Hassan",
      date: "January 8, 2024",
      readTime: "10 min read",
      category: "Cloud",
      image: "https://readdy.ai/api/search-image?query=Cloud%20migration%20concept%20with%20servers%20and%20data%20transfer%20visualization%2C%20modern%20data%20center%20with%20blue%20cloud%20computing%20elements%2C%20professional%20IT%20infrastructure&width=400&height=250&seq=blog2&orientation=landscape"
    },
    {
      title: "Optimizing Performance in Real-Time Embedded Applications",
      excerpt: "Techniques and best practices for achieving optimal performance in time-critical embedded systems.",
      author: "Fatima Sheikh",
      date: "January 5, 2024",
      readTime: "7 min read",
      category: "Embedded",
      image: "https://readdy.ai/api/search-image?query=Real-time%20embedded%20system%20performance%20optimization%20with%20microprocessors%20and%20timing%20diagrams%2C%20technical%20engineering%20environment%20with%20blue%20accent%20lighting&width=400&height=250&seq=blog3&orientation=landscape"
    },
    {
      title: "Building Scalable Enterprise Software Architecture",
      excerpt: "Design principles and patterns for creating software systems that can grow with your business needs.",
      author: "Sarah Khan",
      date: "January 3, 2024",
      readTime: "12 min read",
      category: "Software",
      image: "https://readdy.ai/api/search-image?query=Software%20architecture%20diagram%20with%20scalable%20system%20components%2C%20modern%20enterprise%20software%20design%20with%20blue%20interface%20elements%2C%20professional%20development%20environment&width=400&height=250&seq=blog4&orientation=landscape"
    },
    {
      title: "Hardware Design Best Practices for Industrial Applications",
      excerpt: "Key considerations for designing robust hardware solutions for harsh industrial environments.",
      author: "Muhammad Ali",
      date: "December 28, 2023",
      readTime: "9 min read",
      category: "Hardware",
      image: "https://readdy.ai/api/search-image?query=Industrial%20hardware%20design%20with%20rugged%20electronic%20components%20and%20circuit%20boards%2C%20manufacturing%20environment%20with%20blue%20industrial%20lighting%2C%20professional%20engineering%20workspace&width=400&height=250&seq=blog5&orientation=landscape"
    },
    {
      title: "Data Analytics in Smart Manufacturing",
      excerpt: "Leveraging data analytics to improve efficiency and decision-making in manufacturing processes.",
      author: "Ahmed Hassan",
      date: "December 25, 2023",
      readTime: "8 min read",
      category: "Analytics",
      image: "https://readdy.ai/api/search-image?query=Smart%20manufacturing%20analytics%20dashboard%20with%20data%20visualization%20and%20production%20metrics%2C%20modern%20factory%20with%20blue%20digital%20interface%20elements%2C%20industrial%20data%20analytics&width=400&height=250&seq=blog6&orientation=landscape"
    }
  ];

  const categories = ["All", "IoT", "Security", "Cloud", "Embedded", "Software", "Hardware", "Analytics"];

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className={`py-20 bg-gradient-to-r from-blue-600 to-blue-800 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-pulse">Technology Blog</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto animate-fade-in-up">
            Insights, tutorials, and industry updates from our team of technology experts
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className={`py-20 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Article</h2>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] group">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 lg:p-12">
                  <div className="inline-block px-4 py-2 bg-blue-100 text-blue-600 font-semibold rounded-full mb-4 hover:bg-blue-600 hover:text-white transition-all duration-300">
                    {featuredPost.category}
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors duration-300">
                    {featuredPost.title}
                  </h3>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div>
                        <div className="font-semibold text-gray-900">{featuredPost.author}</div>
                        <div className="text-gray-600">{featuredPost.date}</div>
                      </div>
                    </div>
                    <div className="text-gray-600">{featuredPost.readTime}</div>
                  </div>
                  <Link href="/blog/the-future-of-industrial-iot" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer inline-block hover:scale-105 hover:shadow-lg">
                    Read Full Article
                  </Link>
                </div>
                <div className="h-64 lg:h-auto overflow-hidden">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className={`py-8 bg-gray-50 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 whitespace-nowrap cursor-pointer hover:scale-105 hover:shadow-md transform ${
                  selectedCategory === category 
                    ? 'bg-blue-600 text-white shadow-lg scale-105' 
                    : 'bg-white text-gray-700 hover:bg-blue-600 hover:text-white'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className={`py-20 transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest Articles</h2>
            <p className="text-xl text-gray-600">
              Stay informed with the latest trends and insights in technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <article 
                key={index} 
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 group cursor-pointer"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover object-top group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <div className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-sm font-medium rounded-full mb-3 hover:bg-blue-600 hover:text-white transition-all duration-300">
                    {post.category}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span className="group-hover:text-blue-600 transition-colors duration-300">{post.author}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{post.date}</span>
                    <Link href={`/blog/${post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')}`} className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer group-hover:translate-x-2 transition-transform duration-300">
                      Read More →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className={`py-20 bg-gray-900 transform transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6 hover:text-blue-400 transition-colors duration-300">Never Miss an Update</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Subscribe to our blog newsletter and get the latest technology insights delivered to your inbox
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-300 focus:scale-105"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer hover:scale-105 hover:shadow-lg">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Tags */}
      <section className={`py-20 bg-gray-50 transform transition-all duration-1000 delay-1100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Topics</h2>
            <p className="text-lg text-gray-600">
              Explore articles by popular tags and topics
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Industrial IoT", "Embedded Systems", "Cloud Computing", "Cybersecurity",
              "Software Architecture", "Hardware Design", "Data Analytics", "Automation",
              "Digital Transformation", "Machine Learning", "Edge Computing", "Microservices"
            ].map((tag, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-white text-gray-700 rounded-full font-medium hover:bg-blue-600 hover:text-white transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-md transform"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
