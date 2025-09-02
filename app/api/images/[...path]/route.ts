import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import mime from "mime";

export async function GET(
  request: Request,
  context: { params: Promise<{ path: string[] }> } // 👈 params is async
) {
  // ✅ Await params
  const { path: filePathSegments } = await context.params;

  if (!filePathSegments || filePathSegments.length === 0) {
    return NextResponse.json(
      { error: "File path is required." },
      { status: 400 }
    );
  }

  const relativePath = path.join(...filePathSegments);
  const absolutePath = path.join(process.cwd(), "writable_uploads", relativePath);

  try {
    // Read file as Buffer
    const fileBuffer = await fs.readFile(absolutePath);

    // Convert safely to ArrayBuffer
    const arrayBuffer = new Uint8Array(fileBuffer).buffer;

    // Detect MIME type
    const mimeType = mime.getType(absolutePath) || "application/octet-stream";

    return new Response(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": mimeType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("File not found:", error);
    return NextResponse.json({ error: "File not found." }, { status: 404 });
  }
}
