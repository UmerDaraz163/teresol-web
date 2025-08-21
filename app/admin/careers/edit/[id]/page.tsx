"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Define and EXPORT a type for the job data for better type safety
export type Job = {
  id: number;
  title: string;
  location: string;
  short_desc: string;
  full_description: string;
  department: string;
  job_type: string;
  experience_level: string;
  is_active: boolean;
  closing_date: string;
};

export default function EditJobForm({ job }: { job: Job }) {
  const router = useRouter();
  // Initialize form state with the job data passed as a prop
  const [formData, setFormData] = useState(job);
  const [message, setMessage] = useState<string | null>(null);

  // Effect to handle potential date formatting issues from the database
  useEffect(() => {
    // Ensure the closing_date is in 'YYYY-MM-DD' format for the input[type=date]
    if (job.closing_date) {
      const formattedDate = new Date(job.closing_date).toISOString().split('T')[0];
      setFormData(prev => ({ ...prev, closing_date: formattedDate }));
    }
  }, [job]);

  // A single handler to manage changes for all input types
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    // Handle checkbox separately
    const isCheckbox = type === "checkbox";
    const checked = isCheckbox ? (e.target as HTMLInputElement).checked : undefined;

    setFormData({
      ...formData,
      [name]: isCheckbox ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("Saving...");

    try {
      const res = await fetch(`/api/careers/${job.id}`, { // Use the correct API endpoint
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage("✅ Job updated successfully! Redirecting...");
        // Redirect back to the admin careers page after a short delay
        setTimeout(() => {
          router.push("/admin/careers");
          router.refresh(); // Refresh the page to show updated data
        }, 1500);
      } else {
        const errorData = await res.json();
        setMessage(`❌ Failed to update job: ${errorData.error || 'Please try again.'}`);
      }
    } catch (error) {
      console.error("Update failed:", error);
      setMessage("⚠️ An unexpected error occurred.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Job Listing</h2>

      {message && (
        <div className={`mb-4 p-3 rounded ${message.includes('❌') || message.includes('⚠️') ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block font-medium">Job Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block font-medium">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Short Description */}
        <div>
          <label className="block font-medium">Short Description</label>
          <textarea
            name="short_desc"
            value={formData.short_desc}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Full Description */}
        <div>
          <label className="block font-medium">Full Description</label>
          <textarea
            name="full_description"
            value={formData.full_description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows={5}
          />
        </div>

        {/* Department */}
        <div>
          <label className="block font-medium">Department</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Job Type */}
        <div>
          <label className="block font-medium">Job Type</label>
          <select
            name="job_type"
            value={formData.job_type}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select Type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
          </select>
        </div>

        {/* Experience Level */}
        <div>
          <label className="block font-medium">Experience Level</label>
          <select
            name="experience_level"
            value={formData.experience_level}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select Level</option>
            <option value="Entry">Entry</option>
            <option value="Mid">Mid</option>
            <option value="Senior">Senior</option>
          </select>
        </div>

        {/* Is Active */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="is_active"
            checked={formData.is_active}
            onChange={handleChange}
            className="mr-2 h-4 w-4"
          />
          <label className="font-medium">Is Active</label>
        </div>

        {/* Closing Date */}
        <div>
          <label className="block font-medium">Closing Date</label>
          <input
            type="date"
            name="closing_date"
            value={formData.closing_date}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white rounded py-2 font-semibold hover:bg-green-700"
        >
          Update Job
        </button>
      </form>
    </div>
  );
}
