// components/ImageUploadForm.tsx

'use client';

import { useState, type ChangeEvent } from 'react';

// The component props remain the same
type Props = {
  uploadType: 'blogs' | 'jobs';
  onUploadComplete: (url: string) => void;
};

export default function ImageUploadForm({ uploadType, onUploadComplete }: Props) {
  const [message, setMessage] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);

  // ✅ This function now runs automatically when a file is selected
  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    setMessage('');
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setIsUploading(true);
    setMessage('Uploading...');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('uploadType', uploadType);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Upload successful!`);
        onUploadComplete(data.imageUrl); // Send the URL back to the parent form
      } else {
        throw new Error(data.error || 'Upload failed');
      }
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  }

  return (
    // ✅ The <form> and <button> have been removed
    <div className="p-4 border rounded-lg bg-gray-50">
      <input
        name="file"
        type="file"
        accept="image/png, image/jpeg, image/webp"
        required
        onChange={handleFileChange} // ✅ The upload is triggered on change
        disabled={isUploading} // Disable input while uploading
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
      />
      {message && <p className="mt-4 text-sm font-medium">{message}</p>}
    </div>
  );
}
