// components/CareersPageClient.tsx
'use client';

import { useState, useEffect } from 'react';
import JobApplicationModal from '@/components/JobApplicationModal';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation'; // 👈 Import useRouter

// Define the available internship streams
const INTERNSHIP_STREAMS = [
    'Software Department',
    'Hardware Department',
    'MIS',
    'Production',
    'Operations',
    'Accounts',
    'Human Resource (HR)',
];

// Define a type for the job data
type Job = {
    id: number;
    title: string;
    location: string | null;
    short_desc: string | null;
    full_description: string | null;
    closing_date: string | null;
    slug: string | null;
    is_internship: boolean;
};

// ... (Benefits data remains the same) ...
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


// Base definition for the Internship Application
const BASE_INTERNSHIP_JOB = {
    id: 0,
    location: "Any Location (Remote/On-Site)",
    short_desc: "Submit your application for this internship stream. We are always looking for bright new talent.",
    full_description: "<p>If you are a student looking for practical experience, please apply here. Your application will be reviewed for potential placements in this department.</p>",
    closing_date: null,
    slug: 'general-internship',
    is_internship: true,
};


export default function CareersPageClient() {
    const router = useRouter(); // 👈 Initialize the router
    const [jobs, setJobs] = useState<Job[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null); // Only used for Internships now
    const [expandedJobId, setExpandedJobId] = useState<number | null>(null);

    // State to hold the internship enablement status
    const [isInternshipsActive, setIsInternshipsActive] = useState(false);
    const [showInternshipStreams, setShowInternshipStreams] = useState(false);


    useEffect(() => {
        // Combined fetch function to get jobs and settings concurrently
        async function fetchJobsAndSettings() {
            try {
                // 1. Fetch Job Listings
                const jobsRes = await fetch('/api/careers');

                // 2. Fetch Internship Setting
                const settingsRes = await fetch('/api/settings/internships');

                if (!jobsRes.ok) {
                    throw new Error('Failed to fetch job listings.');
                }

                let activeStatus = false;
                if (settingsRes.ok) {
                    const settingsData = await settingsRes.json();
                    activeStatus = settingsData.enabled === '1';
                    setIsInternshipsActive(activeStatus);
                } else {
                    console.error("Failed to fetch internship settings, defaulting to disabled.");
                }

                const data = await jobsRes.json();

                const todayPKTString = new Intl.DateTimeFormat('en-CA', {
                    timeZone: 'Asia/Karachi',
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                }).format(new Date());

                const activeJobs = data.filter((job: Job) => {

                    // Filter out roles explicitly marked as an internship 
                    if (job.is_internship) return false;

                    // Existing closing date check
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
        fetchJobsAndSettings();
    }, []);

    const toggleJobDescription = (jobId: number) => {
        setExpandedJobId(prevId => (prevId === jobId ? null : jobId));
    };

    // New handler creates the job object based on the selected stream (for Modal)
    const openInternshipModal = (stream: string) => {
        const internshipJob: Job = {
            ...BASE_INTERNSHIP_JOB,
            title: `${stream} Internship Application`,
            full_description: BASE_INTERNSHIP_JOB.full_description.replace('various departments', stream),
        };
        setSelectedJob(internshipJob);
        // Optional: Hide stream buttons after selection
        setShowInternshipStreams(false);
    }

    // NEW HANDLER: To open the stream selection buttons
    const handleStartInternshipApplication = () => {
        if (isInternshipsActive) {
            setShowInternshipStreams(true);
        }
    }

    // NEW HANDLER: Redirects to the new application page
    const handleApplyNow = (job: Job) => {
        // Use Next.js router to navigate to the new dedicated application page
        router.push(`/careers/apply/${job.id}?title=${encodeURIComponent(job.title)}`);
    }


    if (isLoading) {
        return <p className="text-center py-12">Loading job openings...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500 py-12">Could not load job openings. Please try again later.</p>;
    }

    // Define button state based on the setting 
    const internshipButtonDisabled = !isInternshipsActive;
    const internshipButtonText = isInternshipsActive ? 'Start Internship Application' : 'Applications Temporarily Closed';


    return (
        <div className="bg-gray-50 min-h-screen">
            {/* The modal component (JobApplicationModal) now ONLY for internships */}
            {selectedJob && (
                <JobApplicationModal
                    job={selectedJob}
                    isInternship={selectedJob.is_internship}
                    onClose={() => setSelectedJob(null)}
                />
            )}
            <Header />

            {/* Hero Section (remains the same) */}
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

            {/* Benefits & Perks Section (remains the same) */}

            <section className="py-20 bg-gray-50"> {/* Use a slight off-white background */}
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-extrabold text-[#25237b] mb-4 tracking-tight">
                            Benefits & Perks
                        </h2>
                        <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                            We invest in our employees’ well-being and professional growth with a comprehensive benefits package.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 group"
                            >
                                <div
                                    className="flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-full transition duration-300 text-[#25237b] group-hover:text-[#8b0303]"
                                    style={{
                                        backgroundColor: '#e0e0f8',
                                    }}
                                >
                                    <i
                                        className={`${benefit.icon} text-3xl transition duration-300 group-hover:animate-pulse text-current`}

                                    ></i>
                                </div>
                                <p className="text-xl font-extrabold text-gray-800 pt-1 group-hover:text-[#8b0303] transition duration-300">
                                    {benefit.title}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Current Opportunities</h2>

                {/* 🛑 INTERNSHIP SECTION: Always Show */}
                <>
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Internship Opportunities</h3>
                    <div className="bg-yellow-50 border-2 border-yellow-300 shadow-xl rounded-xl p-8 mb-8 flex flex-col justify-between transition-all duration-300">
                        <div className="flex items-center space-x-4 mb-4">
                            <i className="ri-graduation-cap-line text-4xl text-yellow-700"></i>
                            <div>
                                <h3 className="text-2xl font-bold text-yellow-800">
                                    Internship Program
                                </h3>
                                <p className="text-lg text-yellow-700 mt-1 max-w-xl">
                                    {/* Update description based on status */}
                                    {isInternshipsActive
                                        ? 'Select your preferred stream to begin your quick application.'
                                        : 'We are not accepting new internship applications at this time. Please check back later.'}
                                </p>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-yellow-200">
                            {/* Check if streams are visible, otherwise show the main selection button */}
                            {!showInternshipStreams ? (
                                <button
                                    onClick={handleStartInternshipApplication}
                                    disabled={!isInternshipsActive} // 🛑 DISABLE BUTTON IF NOT ACTIVE
                                    className={`w-full font-semibold px-6 py-3 rounded-lg transition-colors duration-300 shadow-md 
                                ${!isInternshipsActive
                                            ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                                            : 'bg-yellow-600 text-white hover:bg-yellow-700'
                                        }
                            `}
                                >
                                    {internshipButtonText}
                                </button>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {INTERNSHIP_STREAMS.map(stream => (
                                            <button
                                                key={stream}
                                                onClick={() => openInternshipModal(stream)}
                                                // 🛑 DISABLE DEPARTMENT BUTTONS IF NOT ACTIVE
                                                disabled={!isInternshipsActive}
                                                className={`text-sm font-semibold p-3 rounded-lg shadow-md h-full
                                            ${!isInternshipsActive
                                                        ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                                                        : 'bg-yellow-700 text-white hover:bg-yellow-800 transition-colors duration-300'
                                                    }
                                        `}
                                            >
                                                {stream}
                                            </button>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => setShowInternshipStreams(false)}
                                        className="w-full bg-gray-300 text-gray-700 text-sm font-semibold p-3 rounded-lg hover:bg-gray-400 transition-colors duration-300 shadow-md"
                                    >
                                        Cancel Selection
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </>

                {/* 🛑 FULL-TIME SECTION: Always show */}
                <>
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Full-Time Openings</h3>
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
                                            </div>
                                            <div className="mt-4 sm:mt-0 sm:ml-6 flex-shrink-0 flex items-center gap-4">
                                                <button
                                                    onClick={() => toggleJobDescription(job.id)}
                                                    className="font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                                                >
                                                    {isExpanded ? 'Hide Details' : 'View Details'}
                                                </button>
                                                <button
                                                    onClick={() => handleApplyNow(job)} // 👈 NEW HANDLER: Redirects to new page
                                                    className="inline-block bg-blue-600 text-white font-semibold px-5 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
                                                >
                                                    Apply Now
                                                </button>
                                            </div>
                                        </div>

                                        <div className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                                            <div className="overflow-hidden">
                                                <div className="mt-6 pt-6 border-t">
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
                                );
                            })
                        ) : (
                            <div className="text-center py-10 bg-gray-50 rounded-lg">
                                <h3 className="text-xl font-semibold text-gray-700">No Full-Time Openings</h3>
                                <p className="mt-2 text-gray-500">We are not currently hiring for full-time roles, but please check back soon!</p>
                            </div>
                        )}
                    </div>
                </>
            </main>
            <Footer />
        </div>
    );
}