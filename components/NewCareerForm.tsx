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
    job_type: "",
    experience_level: "",
    is_active: true, // ✅ mandatory
    closing_date: "",
  });
  const [message, setMessage] = useState<string | null>(null);



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage("✅ Job created successfully! Redirecting...");
        setTimeout(() => {
          router.push("/admin/careers"); 
        }, 1500);
      } else {
        setMessage("❌ Failed to create job. Try again.");
      }
    } catch (error) {
      setMessage("⚠️ Something went wrong.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Create Job</h2>

      {message && (
        <div className="mb-4 p-3 rounded bg-blue-100 text-blue-700">
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

        {/* Is Active (mandatory) */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="is_active"
            checked={formData.is_active}
            onChange={handleChange}
            required
            className="mr-2"
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
          className="w-full bg-blue-600 text-white rounded py-2 font-semibold hover:bg-blue-700"
        >
          Create Job
        </button>
      </form>
    </div>
  );
}
