// components/ImageUploadForm.tsx

'use client';

import { useState, type ChangeEvent } from 'react';

type Props = {
  uploadType: 'blogs' | 'jobs';
  onUploadComplete: (url: string) => void;
};

export default function ImageUploadForm({ uploadType, onUploadComplete }: Props) {
  const [message, setMessage] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    setMessage('');
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    // ✅ Validate file size (max 1MB)
    const maxSize = 1 * 1024 * 1024; // 1MB
    if (file.size > maxSize) {
      setMessage('Error: File size should not exceed 1MB.');
      event.target.value = ''; // reset input so user can select again
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
        onUploadComplete(data.imageUrl);
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
    <div className="p-4 border rounded-lg bg-gray-50">
      <input
        name="file"
        type="file"
        accept="image/png, image/jpeg, image/webp"
        required
        onChange={handleFileChange}
        disabled={isUploading}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
      />
      {message && <p className="mt-4 text-sm font-medium">{message}</p>}
    </div>
  );
}
