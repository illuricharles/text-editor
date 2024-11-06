"use client";

import { UploadDropzone } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

interface UploadedImagesProps {
  url: string,
  appUrl: string,
  key: string
}

interface TestUpload {
  onSuccessUploadImage({url, appUrl, key}: UploadedImagesProps): void
}


export default function TestUpload({onSuccessUploadImage}: TestUpload) {
  return (
    <main className="flex w-full cursor-pointer flex-col items-center justify-between ">
      <UploadDropzone<OurFileRouter, "imageUploader">
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          onSuccessUploadImage(res[0])
         
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}
