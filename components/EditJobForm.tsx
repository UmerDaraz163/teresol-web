"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditJobForm({ job }: { job: any }) {
  const router = useRouter();
  const [form, setForm] = useState(job);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch(`/api/jobs/${job.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    router.push("/admin/jobs");
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-lg mx-auto space-y-4">
      <h1 className="text-xl font-bold">Edit Job</h1>
      <input className="w-full border p-2" placeholder="Title"
             value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}/>
      <input className="w-full border p-2" placeholder="Company"
             value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })}/>
      <input className="w-full border p-2" placeholder="Location"
             value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}/>
      <textarea className="w-full border p-2" placeholder="Description"
             value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}></textarea>
      <button className="px-4 py-2 bg-green-600 text-white rounded">Update Job</button>
    </form>
  );
}
