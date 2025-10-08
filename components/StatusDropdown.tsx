// components/StatusDropdown.tsx
'use client';

import { useState } from 'react';

// Define the available statuses
const STATUSES = ['New', 'Reviewed', 'Interview', 'Rejected', 'Hired', 'Reserved'];

type StatusDropdownProps = {
    applicationId: number;
    initialStatus: string;
};

// Helper function to map status to color for styling
const getStatusColor = (status: string) => {
    switch (status) {
        case 'New':
            return 'bg-blue-100 text-blue-800';
        case 'Reviewed':
            return 'bg-yellow-100 text-yellow-800';
        case 'Interview':
            return 'bg-purple-100 text-purple-800';
        case 'Hired':
            return 'bg-green-100 text-green-800';
        case 'Rejected':
            return 'bg-red-100 text-red-800';
        case 'Reserved':
            return 'bg-gray-100 text-gray-800';
        default:
            return 'bg-gray-200 text-gray-800';
    }
};

export default function StatusDropdown({ applicationId, initialStatus }: StatusDropdownProps) {
    const [status, setStatus] = useState(initialStatus);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleStatusChange = async (newStatus: string) => {
        // Log to prove the function is running (you already confirmed this)
        console.log(`Handler fired for ID: ${applicationId}, Status: ${newStatus}`);

        // Temporarily skip the check for stuck state and same status
        // if (newStatus === status || isUpdating) return; 

        const prevStatus = status;

        // Ensure state is set to true to show loading (optional, but good practice)
        setIsUpdating(true);

        try {
            console.log("--- ATTEMPTING FETCH ---"); // 👈 NEW DEBUG LOG

            // Ensure this fetch call is UNCOMMENTED and correct:
            const response = await fetch(`/api/applications/${applicationId}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) {
                throw new Error(`Server returned error status: ${response.status}`);
            }

            // Update UI state only after successful server response
            setStatus(newStatus);
            console.log(`[SUCCESS] Status for ID ${applicationId} updated.`);

        } catch (error) {
            console.error('Network or API Error:', error);
            // Rollback UI state on failure
            setStatus(prevStatus);
            alert('Failed to update status. Check console for details.');
        } finally {
            // This is CRITICAL: Ensure the state is reset regardless of outcome.
            setIsUpdating(false);
            console.log("--- FINISHED FETCH ---");
        }
    };
    // NOTE: This function needs to be implemented to call an API route (e.g., /api/applications/[id]/status)
    // const handleStatusChange = async (newStatus: string) => {
    //     console.log('--- Handler Fired ---');
    //     console.log('Application ID:', applicationId);
    //     console.log('New Status:', newStatus);

    //     if (newStatus === status) return;

    //     setIsUpdating(true);
    //     setStatus(newStatus); // Optimistic update

    //     // ⚠️ IMPORTANT: Implement the API call here to persist the change in the database
    //     // try {
    //     //   const response = await fetch(`/api/applications/${applicationId}/status`, {
    //     //     method: 'PUT',
    //     //     headers: { 'Content-Type': 'application/json' },
    //     //     body: JSON.stringify({ status: newStatus }),
    //     //   });
    //     //   if (!response.ok) {
    //     //     throw new Error('Failed to update status');
    //     //   }
    //     //   // Optionally, revalidate the page/data here after successful update
    //     // } catch (error) {
    //     //   console.error('Update failed:', error);
    //     //   // Revert status on failure
    //     //   setStatus(initialStatus);
    //     //   alert('Failed to update status. Check console.');
    //     // } finally {
    //     //   setIsUpdating(false);
    //     // }

    //     // REMOVE THIS TIMEOUT once you implement the actual fetch logic above.
    //     setTimeout(() => {
    //         console.log(`Updated Application ${applicationId} status to: ${newStatus}`);
    //         setIsUpdating(false);
    //     }, 1000);
    // };

    return (
        <select
            value={status}
            onChange={(e) => handleStatusChange(e.target.value)}
            disabled={isUpdating}
            className={`px-2 py-1 text-xs font-medium rounded-md border appearance-none transition duration-150 ease-in-out cursor-pointer ${getStatusColor(status)} ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {STATUSES.map((s) => (
                <option key={s} value={s}>
                    {s} {isUpdating && s === status ? '...' : ''}
                </option>
            ))}
        </select>
    );
}