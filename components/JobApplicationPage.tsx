// components/JobApplicationPage.tsx
'use client';

import { useState, type FormEvent, type ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
  jobId: number;
  jobTitle: string;
};

const MAX_FILE_SIZE_MB = 5;

export default function JobApplicationPage({ jobId, jobTitle }: Props) {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setFileError(`File size must be less than ${MAX_FILE_SIZE_MB} MB.`);
        e.target.value = '';
      } else {
        setFileError(null);
      }
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const cvFile = formData.get('cv') as File | null;
    if (!cvFile || cvFile.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setFileError(`Please upload a CV under ${MAX_FILE_SIZE_MB} MB.`);
      return;
    }

    setIsSubmitting(true);
    setMessage('Submitting application...');

    // These are crucial for the backend
    formData.append('jobTitle', jobTitle);
    formData.append('jobId', jobId.toString());
    formData.append('isInternship', '0'); // Explicitly mark as non-internship

    try {
      const response = await fetch('/api/apply', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('✅ Application submitted successfully! We will be in touch shortly.');
        // Redirect or show success message permanently
        // router.push('/careers?status=success'); // Example redirect
      } else {
        throw new Error(data.error || 'Failed to submit application.');
      }
    } catch (error: any) {
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (message.startsWith('✅')) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <div className="bg-white p-10 rounded-xl shadow-2xl text-center">
          <i className="ri-check-circle-fill text-6xl text-green-500 mb-4"></i>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Application Successful!</h2>
          <p className="text-gray-600 max-w-md">{message}</p>
          <button
            onClick={() => router.push('/careers')}
            className="mt-6 bg-blue-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Careers
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-white shadow-xl rounded-lg">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Application for: {jobTitle}</h1>
      <p className="text-lg text-gray-600 mb-8 border-b pb-4">
        Please fill out all sections below carefully.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* === SECTION: Basic Personal Details (Required) === */}
        <fieldset className="p-6 border border-gray-200 rounded-md space-y-4">
            <legend className="text-xl font-semibold text-gray-800 px-2">Personal Information</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input type="text" name="name" id="name" required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="father_spouse_name" className="block text-sm font-medium text-gray-700">Father / Spouse Name (as per CNIC)</label>
                    <input type="text" name="father_spouse_name" id="father_spouse_name"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div>
                    <label htmlFor="year_of_birth" className="block text-sm font-medium text-gray-700">Year of Birth</label>
                    <input type="number" name="year_of_birth" id="year_of_birth" min="1900" max={new Date().getFullYear() - 18}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Full Address</label>
                <textarea name="address" id="address" rows={2}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input type="email" name="email" id="email" required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Contact Number</label>
                    <input type="tel" name="phone" id="phone" inputMode="numeric" required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        onInput={(e: React.FormEvent<HTMLInputElement>) => {
                            const input = e.currentTarget;
                            input.value = input.value.replace(/[^0-9+]/g, "");
                        }}
                    />
                </div>
            </div>
            
            <div>
                <label htmlFor="any_medical_illness" className="block text-sm font-medium text-gray-700">Any medical illness? (Mention only if relevant to work)</label>
                <textarea name="any_medical_illness" id="any_medical_illness" rows={1}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                ></textarea>
            </div>
        </fieldset>
        
        {/* === SECTION: Education === */}
        <fieldset className="p-6 border border-gray-200 rounded-md space-y-4">
            <legend className="text-xl font-semibold text-gray-800 px-2">Highest Education</legend>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="highest_degree" className="block text-sm font-medium text-gray-700">Degree Level (Masters/Bachelors/Intermediate)</label>
                    <input type="text" name="highest_degree" id="highest_degree"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div>
                    <label htmlFor="degree_title" className="block text-sm font-medium text-gray-700">Degree Title</label>
                    <input type="text" name="degree_title" id="degree_title"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="university_name" className="block text-sm font-medium text-gray-700">University Name</label>
                <input type="text" name="university_name" id="university_name"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="degree_start_year" className="block text-sm font-medium text-gray-700">Start Year</label>
                    <input type="number" name="degree_start_year" id="degree_start_year"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div>
                    <label htmlFor="degree_completion_year" className="block text-sm font-medium text-gray-700">Completion Year</label>
                    <input type="number" name="degree_completion_year" id="degree_completion_year"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="future_study_plans" className="block text-sm font-medium text-gray-700">Future plans of study (UG/PG /PHD)?</label>
                <input type="text" name="future_study_plans" id="future_study_plans"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
            </div>
        </fieldset>

        {/* === SECTION: Employment and Availability === */}
        <fieldset className="p-6 border border-gray-200 rounded-md space-y-4">
            <legend className="text-xl font-semibold text-gray-800 px-2">Professional & Financial</legend>

            <div>
                <label htmlFor="professional_exp_years" className="block text-sm font-medium text-gray-700">Professional Experience (In Years, excluding study duration)</label>
                <input type="number" step="0.5" name="professional_exp_years" id="professional_exp_years" defaultValue={0} min="0"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
            </div>

            <fieldset className="p-4 border border-gray-300 rounded-md space-y-3">
                <legend className="text-lg font-semibold text-gray-700 px-2">Current/Last Job Details</legend>
                <div>
                    <label htmlFor="current_company_name" className="block text-sm font-medium text-gray-700">Companys Name</label>
                    <input type="text" name="current_company_name" id="current_company_name"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="current_designation" className="block text-sm font-medium text-gray-700">Designation</label>
                        <input type="text" name="current_designation" id="current_designation"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="current_salary" className="block text-sm font-medium text-gray-700">Current Salary (with Proof)</label>
                        <input type="text" name="current_salary" id="current_salary" placeholder="e.g. 50,000 PKR + benefits"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="tenure_last_job" className="block text-sm font-medium text-gray-700">Tenure of last working place</label>
                    <input type="text" name="tenure_last_job" id="tenure_last_job" placeholder="e.g. 2 years 6 months"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div>
                    <label htmlFor="reason_for_quitting" className="block text-sm font-medium text-gray-700">Reason to quit your last job</label>
                    <textarea name="reason_for_quitting" id="reason_for_quitting" rows={2}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    ></textarea>
                </div>
            </fieldset>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="expected_salary" className="block text-sm font-medium text-gray-700">Expected Salary from TeReSol</label>
                    <input type="text" name="expected_salary" id="expected_salary" placeholder="e.g. 70,000 PKR"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div>
                    <label htmlFor="earliest_join_date" className="block text-sm font-medium text-gray-700">Earliest Join Date</label>
                    <input type="date" name="earliest_join_date" id="earliest_join_date"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="expected_stay_duration" className="block text-sm font-medium text-gray-700">If selected, how long can you stay with us?</label>
                <input type="text" name="expected_stay_duration" id="expected_stay_duration" placeholder="e.g. 2 years minimum / Long-term"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
            </div>
            
            <div className="pt-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Are you willing to travel national/international?</label>
                <div className="flex flex-wrap gap-4">
                    {['National', 'International', 'Both', 'No'].map(val => (
                        <label key={val} className="inline-flex items-center">
                            <input type="radio" name="willing_to_travel" value={val} className="form-radio text-blue-600" defaultChecked={val === 'No'} />
                            <span className="ml-2 text-gray-700">{val}</span>
                        </label>
                    ))}
                </div>
            </div>
        </fieldset>

        {/* === SECTION: Other Applications and Referral === */}
        <fieldset className="p-6 border border-gray-200 rounded-md space-y-4">
            <legend className="text-xl font-semibold text-gray-800 px-2">Other Details</legend>
            
            <div>
                <label htmlFor="field_of_interest" className="block text-sm font-medium text-gray-700">Field of Interest</label>
                <input type="text" name="field_of_interest" id="field_of_interest"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
            </div>

            <div className="pt-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Have you been shortlisted for a job elsewhere?</label>
                <div className="flex space-x-4">
                    <label className="inline-flex items-center">
                        <input type="radio" name="shortlisted_elsewhere" value="Yes" className="form-radio text-blue-600" />
                        <span className="ml-2 text-gray-700">Yes</span>
                    </label>
                    <label className="inline-flex items-center">
                        <input type="radio" name="shortlisted_elsewhere" value="No" className="form-radio text-blue-600" defaultChecked />
                        <span className="ml-2 text-gray-700">No</span>
                    </label>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="other_org_name" className="block text-sm font-medium text-gray-700">If Yes, Name of organization applied to</label>
                    <input type="text" name="other_org_name" id="other_org_name"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div>
                    <label htmlFor="other_app_status" className="block text-sm font-medium text-gray-700">Present Status of Application</label>
                    <input type="text" name="other_app_status" id="other_app_status" placeholder="e.g. Awaiting final offer / Interview stage"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
            </div>

            <fieldset className="p-4 border border-gray-300 rounded-md space-y-3">
                <legend className="text-lg font-semibold text-gray-700 px-2">Referral</legend>
                <div>
                    <label htmlFor="heard_about_us" className="block text-sm font-medium text-gray-700">How did you hear about us?</label>
                    <input type="text" name="heard_about_us" id="heard_about_us"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Do you have any relatives/friends at TeReSol?</label>
                    <div className="flex space-x-4">
                        <label className="inline-flex items-center">
                            <input type="radio" name="relative_at_teresol" value="Yes" className="form-radio text-blue-600" />
                            <span className="ml-2 text-gray-700">Yes</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input type="radio" name="relative_at_teresol" value="No" className="form-radio text-blue-600" defaultChecked />
                            <span className="ml-2 text-gray-700">No</span>
                        </label>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="referral_name" className="block text-sm font-medium text-gray-700">Referral Name (If Any)</label>
                        <input type="text" name="referral_name" id="referral_name"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="referral_contact" className="block text-sm font-medium text-gray-700">Referral Contact Number</label>
                        <input type="tel" name="referral_contact" id="referral_contact" inputMode="numeric"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                </div>
            </fieldset>

            <div>
                <label htmlFor="candidate_notes" className="block text-sm font-medium text-gray-700">Another thing you want to share</label>
                <textarea name="candidate_notes" id="candidate_notes" rows={3}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                ></textarea>
            </div>
        </fieldset>


        {/* === CV Upload (Required) === */}
        <div className="p-6 border border-blue-300 bg-blue-50 rounded-md space-y-2">
            <label htmlFor="cv" className="block text-lg font-bold text-blue-700">Upload CV / Resume</label>
            <input
                type="file"
                name="cv"
                id="cv"
                required
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="mt-1 block w-full text-sm text-gray-600
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-200 file:text-blue-700
                hover:file:bg-blue-300"
            />
            <p className="text-xs text-gray-500 mt-1">
                Accepted formats: PDF, DOC, DOCX. Max size: {MAX_FILE_SIZE_MB} MB
            </p>
            {fileError && <p className="text-red-500 text-sm mt-1">{fileError}</p>}
        </div>

        <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white font-semibold px-5 py-3 rounded-md hover:bg-blue-700 transition-colors duration-300 disabled:bg-gray-400"
        >
            {isSubmitting ? 'Submitting...' : 'Submit Final Application'}
        </button>
      </form>
      {message && !message.startsWith('✅') && <p className="mt-4 text-center text-red-500 text-sm">{message}</p>}
    </div>
  );
}