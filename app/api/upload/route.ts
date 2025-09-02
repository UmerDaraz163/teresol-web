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

    if (!uploadType || !['blogs', 'jobs'].includes(uploadType)) {
      return NextResponse.json({ error: 'Invalid upload type specified.' }, { status: 400 });
    }

    // ✅ **Change 1: Save to a writable directory outside /public**
    // We'll create a folder named 'writable_uploads' at the project root.
    const savePath = path.join(process.cwd(), 'writable_uploads', uploadType);
    await fs.mkdir(savePath, { recursive: true });

    const buffer = Buffer.from(await file.arrayBuffer());

    const timestamp = Date.now();
    const originalFilename = file.name.replaceAll(' ', '_');
    const newFilename = `${uploadType}-${timestamp}-${originalFilename}`;
    const filePath = path.join(savePath, newFilename);

    await fs.writeFile(filePath, buffer);

    // ✅ **Change 2: Return a URL pointing to our new serving API**
    // This URL will be handled by the GET route we create in Step 2.
    // It passes the subfolder (uploadType) and the filename.
    const imageUrl = `/api/images/${uploadType}/${newFilename}`;

    return NextResponse.json({
      success: true,
      message: 'Image uploaded successfully.',
      imageUrl, // This is now an API URL, not a direct file path
    });

  } catch (error: any) {
    console.error('Error uploading image:', error);
    return NextResponse.json({ error: 'Failed to upload image.', details: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Upload API is working. Use POST to upload files.' });
}