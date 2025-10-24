// app/careers/apply/[jobId]/page.tsx
import Header from '@/components/Header'; // Assuming Header is in components/Header
import Footer from '@/components/Footer'; // Assuming Footer is in components/Footer
import JobApplicationPage from '@/components/JobApplicationPage'; // The client component you created

/**
 * Defines the props received by the dynamic Next.js Page component.
 */
interface JobApplicationPageProps {
  params: {
    jobId: string;
  };
  searchParams: {
    title?: string;
  };
}

/**
 * This is the Next.js Server Component that renders the page.
 * It extracts the job ID and title from the URL parameters.
 */
export default function ApplicationPage({ params, searchParams }: JobApplicationPageProps) {
  
  // 1. Extract and validate jobId
  const jobId = parseInt(params.jobId, 10);
  
  // 2. Extract jobTitle from search parameters
  const jobTitle = searchParams.title || 'Job Opening'; // Use default if title is missing

  // Basic validation check
  if (isNaN(jobId) || jobId <= 0) {
    return (
      <>
        <Header />
        <main className="min-h-screen py-20 flex items-center justify-center">
          <div className="text-center p-8 bg-white shadow-xl rounded-lg">
            <h1 className="text-3xl font-bold text-red-600 mb-4">Application Error</h1>
            <p className="text-gray-600">Invalid job application link. Please go back to the careers page.</p>
            <a href="/careers" className="mt-4 inline-block text-blue-600 hover:text-blue-800">
              &larr; Back to Careers
            </a>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main className="py-12">
        {/* 3. Render the client component, passing the validated props.
          The complex form logic resides entirely within JobApplicationPage.
        */}
        <JobApplicationPage jobId={jobId} jobTitle={jobTitle} />
      </main>
      <Footer />
    </div>
  );
}