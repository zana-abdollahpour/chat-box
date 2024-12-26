import { toast } from "sonner";
import { type UploadThingError } from "uploadthing/server";
import { type Json } from "@uploadthing/shared";

import { UploadDropzone } from "@/lib/uploadthing";

interface UploaderProps {
  onChange: (urls: string[]) => void;
  type: "image" | "file";
}

export default function Uploader({ type, onChange }: UploaderProps) {
  return (
    <UploadDropzone
      endpoint={type}
      onClientUploadComplete={(res) => onChange(res.map((item) => item.url))}
      onUploadError={(error: UploadThingError<Json>) => {
        toast.error(error.message);
      }}
    />
  );
}
