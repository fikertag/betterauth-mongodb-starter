import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import type { UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(request: Request) {
  const data = await request.formData();
  const avatar = data.get("avatar") as File;

  if (!avatar) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const bytes = await avatar.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const response = await new Promise<UploadApiResponse>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ resource_type: "auto" }, (error, result) => {
        if (error) reject(error);
        else resolve(result!);
      })
      .end(buffer);
  });
  console.log(response);

  return NextResponse.json({
    url: response.secure_url,
    publicId: response.public_id,
  });
}
