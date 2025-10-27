export const dynamic = "force-dynamic";

import Link from "next/link";
import pool from "@/lib/db";
import { Career } from "@/types/career";
import { format } from "date-fns";
import AdminHeader from "@/components/AdminHeader";
import CareerActions from "@/components/CareerActions";
import StatusDropdown from "@/components/StatusDropdown";
import InternshipSettings from "@/components/InternshipSettings";

// Define the Application type (Updated to match new DB schema)
type Application = {
  id: number;
  job_title: string;
  name: string;
  email: string;
  applied_date: Date;
  status: string;
  // All fields from job_applications table (optional for interns/not in list view)
  phone?: string;
  father_spouse_name?: string;
  field_of_interest?: string;
  address?: string;
  year_of_birth?: number;
  any_medical_illness?: string;
  shortlisted_elsewhere?: string;
  other_org_name?: string;
  other_app_status?: string;
  expected_salary?: string;
  willing_to_travel?: string;
  future_study_plans?: string;
  earliest_join_date?: string | null; // DATE type in DB
  expected_stay_duration?: string;
  heard_about_us?: string;
  relative_at_teresol?: string;
  referral_name?: string;
  referral_contact?: string;
  professional_exp_years?: number; // DECIMAL(4,2) in DB
  current_company_name?: string;
  current_designation?: string;
  current_salary?: string;
  tenure_last_job?: string;
  reason_for_quitting?: string;
  candidate_notes?: string;
  highest_degree?: string;
  degree_title?: string;
  university_name?: string;
  degree_start_year?: number;
  degree_completion_year?: number;
};

// --- Fetch Careers (Job Postings) ---
async function getCareers(): Promise<Career[]> {
  if (process.env.NEXT_PHASE === "phase-production-build") return [];
  const [rows] = await pool.query(`
    SELECT id, title, location, job_type, closing_date, is_active 
    FROM jobs 
    WHERE is_internship IS NULL OR is_internship = 0 
    ORDER BY created_at DESC
  `);
  return Array.isArray(rows) ? (rows as Career[]) : [];
}

// --- Fetch Internship Applications (Minimal fields) ---
async function getInternApplications(): Promise<Application[]> {
  if (process.env.NEXT_PHASE === "phase-production-build") return [];
  const [rows] = await pool.query(`
    SELECT 
      a.id, 
      COALESCE(a.internship_dept, 'General Internship (Stream Unknown)') AS job_title, 
      a.name, 
      a.email, 
      a.created_at AS applied_date,
      COALESCE(a.status, 'New') AS status
    FROM job_applications a 
    WHERE a.is_internship = 1 
    ORDER BY a.created_at DESC
  `);
  return Array.isArray(rows) ? (rows as Application[]) : [];
}

// --- Fetch Regular Applications (Full fields for detail view later) ---
async function getRegularApplications(): Promise<Application[]> {
  if (process.env.NEXT_PHASE === "phase-production-build") return [];
  
  // NOTE: Selecting all fields from the job_applications table
  const [rows] = await pool.query(`
    SELECT 
      a.id, 
      j.title AS job_title, 
      a.name, 
      a.email, 
      a.created_at AS applied_date,
      COALESCE(a.status, 'New') AS status,
      a.phone,
      a.father_spouse_name,
      a.field_of_interest,
      a.address,
      a.year_of_birth,
      a.any_medical_illness,
      a.shortlisted_elsewhere,
      a.other_org_name,
      a.other_app_status,
      a.expected_salary,
      a.willing_to_travel,
      a.future_study_plans,
      a.earliest_join_date,
      a.expected_stay_duration,
      a.heard_about_us,
      a.relative_at_teresol,
      a.referral_name,
      a.referral_contact,
      a.professional_exp_years,
      a.current_company_name,
      a.current_designation,
      a.current_salary,
      a.tenure_last_job,
      a.reason_for_quitting,
      a.candidate_notes,
      a.highest_degree,
      a.degree_title,
      a.university_name,
      a.degree_start_year,
      a.degree_completion_year
    FROM job_applications a 
    JOIN jobs j ON a.job_id = j.id 
    WHERE a.is_internship IS NULL OR a.is_internship = 0
    ORDER BY a.created_at DESC
  `);
  return Array.isArray(rows) ? (rows as Application[]) : [];
}

// --- Applied Jobs List Component ---
function AppliedJobsList({
  applications = [],
  type,
}: {
  applications?: Application[];
  type: "regular" | "intern";
}) {
  const fileName = type === "intern" ? "Intern" : "Regular Job";
  const downloadUrl = `/api/careers/download-applications?type=${type}`;

  const safeApplications = Array.isArray(applications) ? applications : [];
  const showViewDetails = type === "regular"; // Only show button for regular jobs

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{fileName} Applications List</h2>

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
              {showViewDetails && <th className="p-4 font-semibold">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {safeApplications.length === 0 ? (
              <tr>
                <td colSpan={showViewDetails ? 6 : 5} className="p-4 text-center text-gray-500">
                  No applications found.
                </td>
              </tr>
            ) : (
              safeApplications.map((app) => (
                <tr key={app.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-800">
                    {app.job_title}
                  </td>
                  <td className="p-4 text-gray-600">{app.name}</td>
                  <td className="p-4 text-blue-600 hover:underline">
                    <a href={`mailto:${app.email}`}>{app.email}</a>
                  </td>
                  <td className="p-4 text-gray-600">
                    {app.applied_date
                      ? format(new Date(app.applied_date), "dd MMM yyyy, hh:mm a")
                      : "N/A"}
                  </td>
                  <td className="p-4">
                    <StatusDropdown
                      applicationId={app.id}
                      initialStatus={app.status ?? "New"}
                    />
                  </td>
                  {showViewDetails && (
                    <td className="p-4">
                      <Link
                        href={`/admin/careers/applications/${app.id}`}
                        className="bg-blue-500 text-white px-3 py-1 text-xs rounded-md hover:bg-blue-600 transition"
                      >
                        View Details
                      </Link>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// --- MAIN PAGE COMPONENT ---
export default async function CareersPage({
  searchParams,
}: {
  searchParams: { tab?: string };
}) {
  const params = await searchParams; 
  const tab = params?.tab ?? "careers"; //Access after await
  const activeTab =
    tab === "interns" ? "interns" : tab === "applications" ? "applications" : "careers";

  const allCareers =
    activeTab === "careers" ? await getCareers() : [];
  const allRegularApplications =
    activeTab === "applications" ? await getRegularApplications() : [];
  const allInternApplications =
    activeTab === "interns" ? await getInternApplications() : [];

  const today = new Date();
  const todayPKTString = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Karachi",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(today);

  return (
    <div>
      <AdminHeader showBackButton showSignOutButton />

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          {activeTab === "careers" && (
            <Link
              href="/admin/careers/new"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              + Add New Job
            </Link>
          )}
        </div>

        <InternshipSettings />

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: "careers", label: "Job Postings" },
              { id: "applications", label: "Regular Applications" },
              { id: "interns", label: "Intern Applications" },
            ].map((tabItem) => (
              <Link
                key={tabItem.id}
                href={`/admin/careers?tab=${tabItem.id}`}
                className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tabItem.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                {tabItem.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === "careers" && (
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
                  const closing =
                    career.closing_date &&
                    new Date(career.closing_date).toLocaleDateString("en-CA", {
                      timeZone: "Asia/Karachi",
                    }) < todayPKTString;

                  const status = !career.is_active
                    ? "Inactive"
                    : closing
                    ? "Closed"
                    : "Active";

                  const statusClass =
                    status === "Inactive"
                      ? "bg-red-100 text-red-800"
                      : status === "Closed"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800";

                  return (
                    <tr key={career.id} className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium text-gray-800">
                        {career.title}
                      </td>
                      <td className="p-4 text-gray-600">{career.location}</td>
                      <td className="p-4">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                          {career.job_type}
                        </span>
                      </td>
                      <td className="p-4 text-gray-600">
                        {career.closing_date
                          ? format(new Date(career.closing_date), "dd MMM yyyy")
                          : "N/A"}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${statusClass}`}
                        >
                          {status}
                        </span>
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

        {activeTab === "applications" && (
          <AppliedJobsList
            applications={allRegularApplications}
            type="regular"
          />
        )}

        {activeTab === "interns" && (
          <AppliedJobsList applications={allInternApplications} type="intern" />
        )}
      </div>
    </div>
  );
}