import pool from "@/lib/db";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import AdminHeader from "@/components/AdminHeader";
import React from "react";

export const dynamic = "force-dynamic";

type Application = {
    id: number;
    job_title: string;
    name: string;
    email: string;
    phone?: string;
    applied_date: Date;
    status: string;
    father_spouse_name?: string;
    address?: string;
    field_of_interest?: string;
    year_of_birth?: number;
    any_medical_illness?: string;
    shortlisted_elsewhere?: string;
    other_org_name?: string;
    other_app_status?: string;
    expected_salary?: string;
    willing_to_travel?: string;
    future_study_plans?: string;
    earliest_join_date?: string | null;
    expected_stay_duration?: string;
    heard_about_us?: string;
    relative_at_teresol?: string;
    referral_name?: string;
    referral_contact?: string;
    professional_exp_years?: number;
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

async function getApplication(id: string): Promise<Application | null> {
    const [rows] = await pool.query(
        `
    SELECT 
      a.*, 
      j.title AS job_title
    FROM job_applications a
    JOIN jobs j ON a.job_id = j.id
    WHERE a.id = ?
  `,
        [id]
    );

    const result = Array.isArray(rows) && rows.length > 0 ? (rows[0] as Application) : null;
    return result;
}

export default async function ApplicationDetailsPage({ params }: { params: { id: string } }) {
      const { id } = await params; 
    const application = await getApplication(id);
    if (!application) return notFound();

    return (
        <div className="min-h-screen bg-gray-50">
            <AdminHeader showBackButton showSignOutButton />

            <div className="max-w-5xl mx-auto px-6 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Application Details
                    </h1>
                    <span
                        className={`px-4 py-1.5 text-sm rounded-full font-medium ${application.status === "New"
                                ? "bg-blue-100 text-blue-700"
                                : application.status === "Shortlisted"
                                    ? "bg-green-100 text-green-700"
                                    : application.status === "Rejected"
                                        ? "bg-red-100 text-red-700"
                                        : "bg-gray-100 text-gray-700"
                            }`}
                    >
                        {application.status}  
                    </span>
                </div>

                {/* Job Info Card */}
                <div className="bg-white shadow rounded-2xl p-6 mb-6 border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                        Job Information
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
                        <p><strong>Job Title:</strong> {application.job_title}</p>
                        <p>
                            <strong>Applied On:</strong>{" "}
                            {application.applied_date
                                ? (() => {
                                    try {
                                        const date = new Date(application.applied_date as any);
                                        if (isNaN(date.getTime())) return "Invalid date";
                                        return format(date, "dd MMM yyyy, hh:mm a");
                                    } catch {
                                        return "Invalid date";
                                    }
                                })()
                                : "N/A"}
                        </p>
                    </div>
                </div>

                {/* Personal Info */}
                <div className="bg-white shadow rounded-2xl p-6 mb-6 border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                        Personal Information
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
                        <p><strong>Name:</strong> {application.name}</p>
                        <p><strong>Email:</strong> <a href={`mailto:${application.email}`} className="text-blue-600 hover:underline">{application.email}</a></p>
                        <p><strong>Phone:</strong> {application.phone || "N/A"}</p>
                        <p><strong>Father/Spouse Name:</strong> {application.father_spouse_name || "N/A"}</p>
                        <p><strong>Address:</strong> {application.address || "N/A"}</p>
                        <p><strong>Year of Birth:</strong> {application.year_of_birth || "N/A"}</p>
                        <p><strong>Field of Interest:</strong> {application.field_of_interest || "N/A"}</p>
                        <p><strong>Any Medical Illness:</strong> {application.any_medical_illness || "N/A"}</p>
                    </div>
                </div>

                {/* Professional Info */}
                <div className="bg-white shadow rounded-2xl p-6 mb-6 border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                        Professional Details
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
                        <p><strong>Current Company:</strong> {application.current_company_name || "N/A"}</p>
                        <p><strong>Designation:</strong> {application.current_designation || "N/A"}</p>
                        <p><strong>Current Salary:</strong> {application.current_salary || "N/A"}</p>
                        <p><strong>Expected Salary:</strong> {application.expected_salary || "N/A"}</p>
                        <p><strong>Experience (Years):</strong> {application.professional_exp_years || "N/A"}</p>
                        <p><strong>Reason for Quitting:</strong> {application.reason_for_quitting || "N/A"}</p>
                        <p><strong>Tenure Last Job:</strong> {application.tenure_last_job || "N/A"}</p>
                        <p><strong>Willing to Travel:</strong> {application.willing_to_travel || "N/A"}</p>
                    </div>
                </div>

                {/* Education Info */}
                <div className="bg-white shadow rounded-2xl p-6 mb-6 border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                        Education Background
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
                        <p><strong>Highest Degree:</strong> {application.highest_degree || "N/A"}</p>
                        <p><strong>Degree Title:</strong> {application.degree_title || "N/A"}</p>
                        <p><strong>University:</strong> {application.university_name || "N/A"}</p>
                        <p><strong>Duration:</strong> {application.degree_start_year && application.degree_completion_year ? `${application.degree_start_year} - ${application.degree_completion_year}` : "N/A"}</p>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="bg-white shadow rounded-2xl p-6 border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                        Additional Information
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
                        <p><strong>Heard About Us:</strong> {application.heard_about_us || "N/A"}</p>
                        <p><strong>Relative at Teresol:</strong> {application.relative_at_teresol || "N/A"}</p>
                        <p><strong>Referral Name:</strong> {application.referral_name || "N/A"}</p>
                        <p><strong>Referral Contact:</strong> {application.referral_contact || "N/A"}</p>
                        <p><strong>Future Study Plans:</strong> {application.future_study_plans || "N/A"}</p>
                        <p><strong>Candidate Notes:</strong> {application.candidate_notes || "N/A"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
