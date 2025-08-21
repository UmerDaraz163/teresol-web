"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function JobForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    short_desc: "",
    full_description: "",
    department: "",
    job_type: "Full-time",
    experience_level: "Mid-level",
    is_active: true,
    closing_date: "",
  });
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    const checked = isCheckbox ? (e.target as HTMLInputElement).checked : undefined;

    setFormData({
      ...formData,
      [name]: isCheckbox ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("Creating job...");

    // ✅ FIX: Prepare a payload and convert empty date string to null for the database.
    const payload = {
      ...formData,
      closing_date: formData.closing_date || null,
    };

    try {
      const res = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload), // Send the corrected payload
      });

      if (res.ok) {
        setMessage("✅ Job created successfully! Redirecting...");
        setTimeout(() => {
          router.push("/admin/careers");
          router.refresh();
        }, 1500);
      } else {
        const errorData = await res.json();
        setMessage(`❌ Failed to create job: ${errorData.error || 'Please try again.'}`);
      }
    } catch (error) {
      console.error("Creation failed:", error);
      setMessage("⚠️ An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Create New Job Listing</h2>

      {message && (
        <div className={`mb-4 p-3 rounded ${message.includes('❌') || message.includes('⚠️') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
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
            onChange={handleChange} // Added the onChange handler
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
            rows={2}
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

        {/* Job Type and Experience Level */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Job Type</label>
            <select
              name="job_type"
              value={formData.job_type}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
          <div>
            <label className="block font-medium">Experience Level</label>
            <select
              name="experience_level"
              value={formData.experience_level}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="Entry-level">Entry-level</option>
              <option value="Mid-level">Mid-level</option>
              <option value="Senior">Senior</option>
              <option value="Lead">Lead</option>
              <option value="Manager">Manager</option>
            </select>
          </div>
        </div>
        
        {/* Closing Date and Active Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
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
            <div className="flex items-center pt-6">
              <input
                type="checkbox"
                name="is_active"
                checked={formData.is_active}
                onChange={handleChange}
                className="mr-2 h-4 w-4"
              />
              <label className="font-medium">Job is Active and Visible</label>
            </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white rounded py-2 font-semibold hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isSubmitting ? 'Creating...' : 'Create Job'}
        </button>
      </form>
    </div>
  );
}
