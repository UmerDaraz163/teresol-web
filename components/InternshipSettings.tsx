'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type SettingsResponse = {
    enabled: '1' | '0'; // Database stores it as string '1' or '0'
    message?: string;
};

// Component to fetch and manage the global internship enablement setting
export default function InternshipSettings() {
    // State stores boolean, but API deals with strings '1'/'0'
    const [isEnabled, setIsEnabled] = useState<boolean | null>(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const settingKey = 'internships_enabled';
    const apiUrl = `/api/settings/internships`;

    // 1. Fetch initial setting status on component mount
    useEffect(() => {
        async function fetchSetting() {
            try {
                const res = await fetch(apiUrl);
                if (!res.ok) {
                    throw new Error('Failed to fetch settings status.');
                }
                const data: SettingsResponse = await res.json();
                setIsEnabled(data.enabled === '1');
            } catch (e: any) {
                setError(`Error loading setting: ${e.message}`);
                console.error(e);
            }
        }
        fetchSetting();
    }, [apiUrl]);

    // 2. Handle update when the toggle is clicked
    const handleToggle = async (newStatus: boolean) => {
        setIsUpdating(true);
        setError(null);
        
        // Optimistically update the UI
        setIsEnabled(newStatus);

        try {
            const statusValue = newStatus ? '1' : '0';
            const res = await fetch(apiUrl, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ key: settingKey, value: statusValue }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Failed to save setting.');
            }

            // Successfully updated. Refresh the applications list in the Admin UI.
            router.refresh(); 

        } catch (e: any) {
            // Rollback the UI state on failure
            setIsEnabled(!newStatus);
            setError(`Update failed: ${e.message}`);
            console.error('Internship status update error:', e);
        } finally {
            setIsUpdating(false);
        }
    };

    const StatusSwitch = (
        <button
            onClick={() => handleToggle(!isEnabled)}
            disabled={isEnabled === null || isUpdating}
            className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 
                ${isEnabled ? 'bg-green-600' : 'bg-gray-200'}
                ${isUpdating ? 'opacity-50 cursor-wait' : 'hover:shadow-md'}
            `}
        >
            <span className="sr-only">Toggle Internships</span>
            <span
                aria-hidden="true"
                className={`
                    inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                    ${isEnabled ? 'translate-x-5' : 'translate-x-0.5'}
                `}
            />
        </button>
    );
    
    // Display loading state
    if (isEnabled === null && !error) {
        return (
            <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex justify-between items-center animate-pulse">
                <span className="text-gray-500">Loading Internship Settings...</span>
                <div className="h-6 w-11 bg-gray-200 rounded-full"></div>
            </div>
        );
    }
    
    // Display main component
    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6 border border-gray-200">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">Internship Application Acceptance</h3>
                    <p className="text-sm text-gray-500 mt-1">
                        Controls whether the Internship Program card is visible on the public careers page.
                    </p>
                </div>
                <div className="flex items-center space-x-3">
                    <span className={`text-sm font-medium ${isEnabled ? 'text-green-600' : 'text-red-600'}`}>
                        {isEnabled ? 'Enabled' : 'Disabled'}
                    </span>
                    {StatusSwitch}
                </div>
            </div>
            {error && (
                <p className="mt-2 text-sm text-red-600 border border-red-200 p-2 rounded bg-red-50">
                    Error: {error}
                </p>
            )}
            {isUpdating && (
                <p className="mt-2 text-sm text-blue-600">
                    Updating setting...
                </p>
            )}
        </div>
    );
}
