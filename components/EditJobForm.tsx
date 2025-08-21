'use client';

import { Career } from '@/types/career';

type Props = {
  job: Career;
};

export default function EditJobForm({ job }: Props) {
  return (
    <form className="space-y-4 p-4 border rounded-md shadow">
      <h1 className="text-xl font-bold">Edit Job: {job.title}</h1>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium">Title</label>
        <input
          type="text"
          defaultValue={job.title ?? ''}
          className="mt-1 block w-full rounded-md border p-2"
        />
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium">Location</label>
        <input
          type="text"
          defaultValue={job.location ?? ''}
          className="mt-1 block w-full rounded-md border p-2"
        />
      </div>

      {/* Short Description */}
      <div>
        <label className="block text-sm font-medium">Short Description</label>
        <textarea
          defaultValue={job.short_desc ?? ''}
          className="mt-1 block w-full rounded-md border p-2"
        />
      </div>

      {/* Full Description */}
      <div>
        <label className="block text-sm font-medium">Full Description</label>
        <textarea
          defaultValue={job.full_description ?? ''}
          className="mt-1 block w-full rounded-md border p-2"
        />
      </div>

      {/* Department */}
      <div>
        <label className="block text-sm font-medium">Department</label>
        <input
          type="text"
          defaultValue={job.department ?? ''}
          className="mt-1 block w-full rounded-md border p-2"
        />
      </div>

      {/* Job Type */}
      <div>
        <label className="block text-sm font-medium">Job Type</label>
        <select
          defaultValue={job.job_type ?? 'Full-time'}
          className="mt-1 block w-full rounded-md border p-2"
        >
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
        </select>
      </div>

      {/* Experience Level */}
      <div>
        <label className="block text-sm font-medium">Experience Level</label>
        <select
          defaultValue={job.experience_level ?? 'Entry'}
          className="mt-1 block w-full rounded-md border p-2"
        >
          <option value="Entry">Entry</option>
          <option value="Mid">Mid</option>
          <option value="Senior">Senior</option>
        </select>
      </div>

      {/* Closing Date */}
      <div>
        <label className="block text-sm font-medium">Closing Date</label>
        <input
          type="date"
          defaultValue={job.closing_date ?? ''}
          className="mt-1 block w-full rounded-md border p-2"
        />
      </div>

      {/* Active Status */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          defaultChecked={job.is_active}
          className="h-4 w-4"
        />
        <label className="text-sm font-medium">Active</label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Save Changes
      </button>
    </form>
  );
}
