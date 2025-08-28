// components/CareersPageClient.tsx

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

      {/* ✅ New Hero Section */}
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

      <main className={`max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 transition-all duration-300 ${selectedJob ? 'blur-sm pointer-events-none' : ''}`}>
        <div className="mt-12 space-y-4">
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
                      <p className="mt-3 text-gray-600 leading-relaxed">
                        {job.short_desc}
                      </p>
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

                  <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[1000px] mt-6 pt-6 border-t' : 'max-h-0'}`}>
                    <div 
                      className="prose prose-sm sm:prose-base max-w-none" 
                      dangerouslySetInnerHTML={{ __html: job.full_description || '' }} 
                    />
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
