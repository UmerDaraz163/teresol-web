'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { featuredBlogs } from '@/app/data/homepageData'; 

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

export default function FeaturedBlogsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const heading = sectionRef.current?.querySelector('.blog-heading');
      if (heading) {
        gsap.from(heading, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        });
      }
      const blogArticles = gsap.utils.toArray('.blog-article') as HTMLElement[];
      blogArticles.forEach(article => {
        gsap.from(article, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: article,
            start: 'top 85%', 
          },
        });
      });

    }, sectionRef); 
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="featured-blogs" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 blog-heading">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest Insights</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest technology trends and industry insights
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 blog-grid">
          {featuredBlogs.map((blog) => (
            <article 
              key={blog.title} 
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 cursor-pointer group blog-article"
            >
              <div className="relative overflow-hidden rounded-t-xl">
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
        <div className="text-center mt-16">
          <Link 
            href="/blog" 
            className="bg-[#25237b] hover:bg-[#8b0303] text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg whitespace-nowrap cursor-pointer inline-block"
          >
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  );
}
