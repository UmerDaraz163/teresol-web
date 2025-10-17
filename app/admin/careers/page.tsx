export const dynamic = "force-dynamic";

import Link from "next/link";
import pool from "@/lib/db";
import { Career } from "@/types/career";
import { format } from 'date-fns';
import AdminHeader from "@/components/AdminHeader";
import CareerActions from "@/components/CareerActions";
import StatusDropdown from "@/components/StatusDropdown"; 
import InternshipSettings from "@/components/InternshipSettings"; 

// Define the Application type
type Application = {
  id: number;
  job_title: string;
  name: string;
  email: string;
  applied_date: Date;
  status: 'New' | 'Reviewed' | 'Interview' | 'Rejected' | 'Hired' | 'Reserved';
}

// Data fetching for Careers (Job Postings)
async function getCareers(): Promise<Career[]> {
  if (process.env.NEXT_PHASE === "phase-production-build") return [];
  const [rows] = await pool.query(
    "SELECT id, title, location, job_type, closing_date, is_active FROM jobs WHERE is_internship IS NULL OR is_internship = 0 ORDER BY created_at DESC"
  );
  return rows as Career[];
}

// Data fetching for Internship Applications
async function getInternApplications(): Promise<Application[]> {
  if (process.env.NEXT_PHASE === "phase-production-build") return [];
  const [rows] = await pool.query(
    `SELECT 
        a.id, 
        COALESCE(a.internship_dept, 'General Internship (Stream Unknown)') AS job_title, 
        a.name, 
        a.email, 
        a.created_at AS applied_date,
        COALESCE(a.status, 'New') as status 
    FROM job_applications a 
    WHERE a.is_internship = 1 
    ORDER BY a.created_at DESC`
  );
  return rows as Application[];
}

// Data fetching for REGULAR Job Applications (Non-Interns)
async function getRegularApplications(): Promise<Application[]> {
  if (process.env.NEXT_PHASE === "phase-production-build") return [];
  const [rows] = await pool.query(
    `SELECT 
        a.id, 
        j.title AS job_title, 
        a.name, 
        a.email, 
        a.created_at AS applied_date,
        COALESCE(a.status, 'New') as status 
    FROM job_applications a 
    JOIN jobs j ON a.job_id = j.id 
    WHERE a.is_internship IS NULL OR a.is_internship = 0
    ORDER BY a.created_at DESC`
  );
  return rows as Application[];
}


// New component for the list of applied jobs - UPDATED TO INCLUDE DOWNLOAD BUTTON
function AppliedJobsList({ applications, type }: { applications: Application[], type: 'regular' | 'intern' }) {
    const fileName = type === 'intern' ? 'Intern' : 'Regular Job';
    // Link to the API route with the correct type parameter
    const downloadUrl = `/api/careers/download-applications?type=${type}`;
    
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{fileName} Applications List</h2>
                
                {/* DOWNLOAD BUTTON */}
                <a
                    href={downloadUrl}
                    className="bg-green-600 text-white px-4 py-2 text-sm rounded-md hover:bg-green-700 transition flex items-center space-x-2"
                >
                    <i className="fas fa-file-excel mr-2"></i>
                    Download {fileName} CSV
                </a>
                
            </div>
            
            <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-full text-left">
                <thead className="bg-gray-100 border-b">
                <tr>
                    <th className="p-4 font-semibold">Job Title</th>
                    <th className="p-4 font-semibold">Applicant Name</th>
                    <th className="p-4 font-semibold">Applicant Email</th>
                    <th className="p-4 font-semibold">Applied Date</th>
                    <th className="p-4 font-semibold">Status</th>
                </tr>
                </thead>
                <tbody>
                {applications.length === 0 ? (
                    <tr>
                    <td colSpan={5} className="p-4 text-center text-gray-500">
                        No applications found.
                    </td>
                    </tr>
                ) : (
                    applications.map((app) => (
                    <tr key={app.id} className="border-b hover:bg-gray-50">
                        <td className="p-4 font-medium text-gray-800">{app.job_title}</td>
                        <td className="p-4 text-gray-600">{app.name}</td>
                        <td className="p-4 text-blue-600 hover:underline">
                            <a href={`mailto:${app.email}`}>{app.email}</a>
                        </td>
                        <td className="p-4 text-gray-600">
                        {format(new Date(app.applied_date), 'dd MMM yyyy, hh:mm a')}
                        </td>
                        <td className="p-4">
                        <StatusDropdown 
                            applicationId={app.id} 
                            initialStatus={app.status} 
                        />
                        </td>
                    </tr>
                    ))
                )}
                </tbody>
            </table>
            </div>
        </div>
    );
}

// Your main Server Component now takes searchParams to determine the tab
export default async function CareersPage({ searchParams }: { searchParams: { tab?: string } }) {
  const { tab } = await searchParams; 
  
  // Update to handle three states: 'careers', 'applications' (regular), 'interns'
  let activeTab: 'careers' | 'applications' | 'interns';
  if (tab === 'interns') {
      activeTab = 'interns';
  } else if (tab === 'applications') {
      activeTab = 'applications';
  } else {
      activeTab = 'careers';
  }

  // Fetch data based on the active tab
  const allCareers = activeTab === 'careers' ? await getCareers() : [];
  const allRegularApplications = activeTab === 'applications' ? await getRegularApplications() : [];
  const allInternApplications = activeTab === 'interns' ? await getInternApplications() : []; 

  // Get today's date string for career status check
  const today = new Date();
  const todayPKTString = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Karachi',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(today);

  return (
    <div>
      <AdminHeader showBackButton showSignOutButton />
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          {activeTab === 'careers' && (
            <Link
              href="/admin/careers/new"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              + Add New Job
            </Link>
          )}
        </div>
        
        <InternshipSettings />

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <Link
              href="/admin/careers?tab=careers"
              className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'careers'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
              aria-current={activeTab === 'careers' ? 'page' : undefined}
            >
              Job Postings
            </Link>
            <Link
              href="/admin/careers?tab=applications"
              className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'applications'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
              aria-current={activeTab === 'applications' ? 'page' : undefined}
            >
              Regular Applications
            </Link>
             <Link
              href="/admin/careers?tab=interns"
              className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'interns'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
              aria-current={activeTab === 'interns' ? 'page' : undefined}
            >
              Intern Applications
            </Link>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'careers' && (
           <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-full text-left">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="p-4 font-semibold">Title</th>
                  <th className="p-4 font-semibold">Location</th>
                  <th className="p-4 font-semibold">Job Type</th>
                  <th className="p-4 font-semibold">Closing Date</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {allCareers.map((career) => {
                  let statusElement;
                  const isClosed = career.closing_date && new Intl.DateTimeFormat('en-CA', {
                    timeZone: 'Asia/Karachi',
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  }).format(new Date(career.closing_date)) < todayPKTString;

                  if (!career.is_active) {
                    statusElement = (
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                        Inactive
                      </span>
                    );
                  } else if (isClosed) {
                    statusElement = (
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                        Closed
                      </span>
                    );
                  } else {
                    statusElement = (
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    );
                  }

                  return (
                    <tr key={career.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div className="font-medium text-gray-800">{career.title}</div>
                      </td>
                      <td className="p-4 text-gray-600">{career.location}</td>
                      <td className="p-4">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                          {career.job_type}
                        </span>
                      </td>
                      <td className="p-4 text-gray-600">
                        {career.closing_date ? format(new Date(career.closing_date), 'dd MMM yyyy') : 'N/A'}
                      </td>
                      <td className="p-4">
                        {statusElement}
                      </td>
                      <td className="p-4">
                        <CareerActions careerId={career.id} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Display Regular Applications */}
        {activeTab === 'applications' && (
          <AppliedJobsList applications={allRegularApplications} type="regular" />
        )}
        
        {/* Display Intern Applications */}
        {activeTab === 'interns' && (
          <AppliedJobsList applications={allInternApplications} type="intern" />
        )}

      </div>
    </div>
  );
}