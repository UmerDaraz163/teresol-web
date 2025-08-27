// app/careers/page.tsx

'use client';

import { useState, useEffect } from 'react';
import JobApplicationModal from '@/components/JobApplicationModal'; // Import the modal

// Define a type for the job data
type Job = {
  id: number;
  title: string;
  location: string | null;
  short_desc: string | null;
  slug: string | null;
};

// This is now a client component to manage state
export default function CareersPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State to manage the modal
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch('/api/careers'); // Fetch from the API route
        if (!res.ok) {
          throw new Error('Failed to fetch jobs.');
        }
        const data = await res.json();
        setJobs(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchJobs();
  }, []);

  if (isLoading) {
    return <p className="text-center py-12">Loading job openings...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 py-12">Could not load job openings. Please try again later.</p>;
  }

  return (
    <>
      {/* Conditionally render the modal */}
      {selectedJob && (
        <JobApplicationModal 
          job={selectedJob} 
          onClose={() => setSelectedJob(null)} 
        />
      )}

      {/* ✅ FIX: Add conditional classes here to apply the blur effect */}
      <div className={`max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 transition-all duration-300 ${selectedJob ? 'blur-sm pointer-events-none' : ''}`}>
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Join Our Team
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            We're looking for passionate people to help us build the future. Check out our open positions below.
          </p>
        </div>

        <div className="mt-12 space-y-8">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div key={job.id} className="bg-white shadow-lg rounded-lg p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:shadow-xl transition-shadow duration-300">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{job.title}</h2>
                  <p className="text-md text-gray-500 mt-1">{job.location}</p>
                  <p className="mt-3 text-gray-600 leading-relaxed">
                    {job.short_desc}
                  </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-6 flex-shrink-0">
                  {/* This button now opens the modal */}
                  <button 
                    onClick={() => setSelectedJob(job)}
                    className="inline-block bg-blue-600 text-white font-semibold px-5 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
                  >
                    View & Apply
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-700">No Open Positions</h3>
              <p className="mt-2 text-gray-500">We are not currently hiring, but please check back soon!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
