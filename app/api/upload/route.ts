// app/api/upload/route.ts

import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const uploadType = formData.get('uploadType') as string | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
    }

    // Validate the uploadType to ensure it's either 'blogs' or 'jobs'
    if (!uploadType || !['blogs', 'jobs'].includes(uploadType)) {
      return NextResponse.json({ error: 'Invalid upload type specified.' }, { status: 400 });
    }

    // Construct the save path based on the uploadType
    const savePath = path.join(process.cwd(), 'public', 'uploads', uploadType);

    // Ensure the save directory exists
    await fs.mkdir(savePath, { recursive: true });

    // Read the file into a buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // ✅ Create a new filename with the format: type-timestamp-originalName
    const timestamp = Date.now();
    const originalFilename = file.name.replaceAll(' ', '_');
    const newFilename = `${uploadType}-${timestamp}-${originalFilename}`;
    const filePath = path.join(savePath, newFilename);

    // Write the file to the filesystem
    await fs.writeFile(filePath, buffer);

    // Construct the public URL for the saved image
    const imageUrl = `/uploads/${uploadType}/${newFilename}`;

    return NextResponse.json({
      message: 'Image uploaded successfully.',
      imageUrl: imageUrl,
    });

  } catch (error: any) {
    console.error('Error uploading image:', error);
    return NextResponse.json({ error: 'Failed to upload image.', details: error.message }, { status: 500 });
  }
}
