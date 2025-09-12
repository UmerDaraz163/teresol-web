'use client';

import { useState, useEffect } from 'react';
import JobApplicationModal from '@/components/JobApplicationModal';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Define a type for the job data
type Job = {
  id: number;
  title: string;
  location: string | null;
  short_desc: string | null;
  full_description: string | null;
  closing_date: string | null;
  slug: string | null;
};

// Data for the Benefits & Perks section
const benefits = [
    { title: "Medical Coverage (Self & Dependents)", icon: "ri-first-aid-kit-line" },
    { title: "Life Insurance", icon: "ri-heart-pulse-line" },
    { title: "Paid Leaves", icon: "ri-calendar-event-line" },
    { title: "Subsidized Food", icon: "ri-restaurant-2-line" },
    { title: "Annual Increments", icon: "ri-arrow-up-circle-line" },
    { title: "Annual Bonuses", icon: "ri-gift-line" },
    { title: "Annual Trips", icon: "ri-plane-line" },
    { title: "Annual Dinners", icon: "ri-goblet-line" },
    { title: "EOBI (Old Age Pension)", icon: "ri-bank-line" },
    { title: "Marriage Gifts", icon: "ri-hearts-line" },
    { title: "Birthday Celebrations", icon: "ri-cake-3-line" },
    { title: "Market Competitive Salary", icon: "ri-money-dollar-circle-line" },
    { title: "Recreational Area for Indoor Games", icon: "ri-gamepad-line" },
    { title: "Rewarding & Challenging Ladder", icon: "ri-line-chart-line" },
    { title: "Professional Development Support", icon: "ri-graduation-cap-line" },
];


export default function CareersPageClient() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [expandedJobId, setExpandedJobId] = useState<number | null>(null);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch('/api/careers');
        if (!res.ok) {
          throw new Error('Failed to fetch jobs.');
        }
        const data = await res.json();
        
        const todayPKTString = new Intl.DateTimeFormat('en-CA', {
          timeZone: 'Asia/Karachi',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }).format(new Date());

        const activeJobs = data.filter((job: Job) => {
          if (!job.closing_date) {
            return true;
          }
          
          const closingDate = new Date(job.closing_date);
          const closingDatePKTString = new Intl.DateTimeFormat('en-CA', {
            timeZone: 'Asia/Karachi',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          }).format(closingDate);

          return closingDatePKTString >= todayPKTString;
        });

        setJobs(activeJobs);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchJobs();
  }, []);

  const toggleJobDescription = (jobId: number) => {
    setExpandedJobId(prevId => (prevId === jobId ? null : jobId));
  };

  if (isLoading) {
    return <p className="text-center py-12">Loading job openings...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 py-12">Could not load job openings. Please try again later.</p>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {selectedJob && (
        <JobApplicationModal 
          job={selectedJob} 
          onClose={() => setSelectedJob(null)} 
        />
      )}
      <Header/>

      {/* Hero Section */}
      <section
        className="relative py-32 bg-cover bg-center"
        style={{ backgroundImage: `url('/careers/career-banner.jpg')` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Join Our Team
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            We are looking for passionate people to help us build the future. Check out our open positions below.
          </p>
        </div>
      </section>

      {/* Benefits & Perks Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    Benefits & Perks
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    We invest in our employees’ well-being and professional growth with a comprehensive benefits package.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-4">
                        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full text-blue-600">
                            <i className={`${benefit.icon} text-2xl`}></i>
                        </div>
                        <p className="text-lg font-medium text-gray-700">{benefit.title}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      <main className={`max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 transition-all duration-300 ${selectedJob ? 'blur-sm pointer-events-none' : ''}`}>
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Open Positions</h2>
        <div className="space-y-4">
          {jobs.length > 0 ? (
            jobs.map((job) => {
              const isExpanded = expandedJobId === job.id;
              return (
                <div key={job.id} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">{job.title}</h2>
                      <p className="text-md text-gray-500 mt-1">{job.location}</p>
                      {job.closing_date && (
                        <p className="text-sm text-gray-500 mt-1">
                          <strong>Closes on:</strong> {new Date(job.closing_date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            timeZone: 'UTC',
                          })}
                        </p>
                      )}
                      {/* ✅ Short description is now removed from the main view */}
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-6 flex-shrink-0 flex items-center gap-4">
                      <button 
                        onClick={() => toggleJobDescription(job.id)}
                        className="font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        {isExpanded ? 'Hide Details' : 'View Details'}
                      </button>
                      <button 
                        onClick={() => setSelectedJob(job)}
                        className="inline-block bg-blue-600 text-white font-semibold px-5 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>

                  <div className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <div className="overflow-hidden">
                      <div className="mt-6 pt-6 border-t">
                        {/* ✅ Short description is now here, in the expandable section */}
                        <p className="mb-4 text-gray-600 leading-relaxed">
                          {job.short_desc}
                        </p>
                        <div 
                          className="prose prose-sm sm:prose-base max-w-none" 
                          dangerouslySetInnerHTML={{ __html: job.full_description || '' }} 
                        />
                      </div>
                    </div>
                  </div>

                </div>
              )
            })
          ) : (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-700">No Open Positions</h3>
              <p className="mt-2 text-gray-500">We are not currently hiring, but please check back soon!</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

