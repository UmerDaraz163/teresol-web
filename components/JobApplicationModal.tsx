'use client';

import { useState, type FormEvent, type ChangeEvent } from 'react';

type Job = {
  id: number;
  title: string;
};

type Props = {
  job: Job;
  onClose: () => void;
  isInternship: boolean; // 👈 Now correctly defined in Props
};

// 🛑 1. Destructure isInternship from Props
export default function JobApplicationModal({ job, onClose, isInternship }: Props) {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Using 5 MB as the limit
  const MAX_FILE_SIZE_MB = 5; 
  const [fileError, setFileError] = useState<string | null>(null);

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setFileError(`File size must be less than ${MAX_FILE_SIZE_MB} MB.`);
        e.target.value = ''; // reset the file input
      } else {
        setFileError(null);
      }
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const cvFile = formData.get('cv') as File | null;
    if (!cvFile || cvFile.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setFileError(`Please upload a CV under ${MAX_FILE_SIZE_MB} MB.`);
      return;
    }

    setIsSubmitting(true);
    setMessage('Submitting application...');

    // 🛑 2. Add isInternship and job_id to the form data
    formData.append('jobTitle', job.title);
    
    // If it's the general internship, send a special job ID (like 0) or null for the backend
    // and explicitly send the internship flag.
    formData.append('jobId', isInternship ? '0' : job.id.toString());
    formData.append('isInternship', isInternship ? '1' : '0'); 


    try {
      const response = await fetch('/api/apply', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('✅ Application submitted successfully! We will be in touch.');
        setTimeout(onClose, 2000);
      } else {
        throw new Error(data.error || 'Failed to submit application.');
      }
    } catch (error: any) {
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  }
  
  // UI helper for the title
  const modalTitle = isInternship 
    ? "General Internship Application" 
    : `Apply for: ${job.title}`;


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-2">{modalTitle}</h2>
        <p className="text-gray-600 mb-6">
          {isInternship 
            ? "We are accepting applications for our general internship program."
            : "Please fill out the form below to submit your application."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Note: Removed the unused hidden input since jobId is added to formData in JS */}
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number (Optional)</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              inputMode="numeric"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              onInput={(e: React.FormEvent<HTMLInputElement>) => {
                const input = e.currentTarget;
                input.value = input.value.replace(/[^0-9+]/g, ""); // allow only numbers and +
              }}
            />

          </div>

          <div>
            <label htmlFor="cv" className="block text-sm font-medium text-gray-700">Upload CV</label>
            <input
              type="file"
              name="cv"
              id="cv"
              required
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
            <p className="text-xs text-gray-500 mt-1">
              Accepted formats: PDF, DOC, DOCX. Max size: {MAX_FILE_SIZE_MB} MB
            </p>
            {fileError && <p className="text-red-500 text-sm mt-1">{fileError}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white font-semibold px-5 py-3 rounded-md hover:bg-blue-700 transition-colors duration-300 disabled:bg-gray-400"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>

        {message && <p className="mt-4 text-center text-sm">{message}</p>}
      </div>
    </div>
  );
}
