import Image from "next/image";

import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ImagePreviewProps {
  urls: string[];
}

export default function ImagePreview({ urls }: ImagePreviewProps) {
  const isVideoFile = (filename: string) => {
    const videoFilePattern = /\.(mp4|webm|ogg|mov)$/i;
    return videoFilePattern.test(filename);
  };

  return (
    <div
      className={cn("grid justify-items-start gap-2", {
        "grid-cols-1": urls.length === 1,
        "grid-cols-2": urls.length > 1,
      })}
    >
      {urls.map((url, index) => {
        const isVideo = isVideoFile(url);

        return (
          <Dialog key={index}>
            <div
              className={cn("relative cursor-pointer", {
                "h-28 w-28 max-w-full": !isVideo,
              })}
            >
              <DialogTrigger asChild>
                {isVideo ? (
                  <div className="aspect-w-16 aspect-h-9 h-full">
                    <video
                      poster={url}
                      className="h-full w-full rounded-md object-cover"
                    >
                      <source src={`${url}#t=0.1`} type="video/mp4" />
                    </video>
                  </div>
                ) : (
                  <Image
                    src={url}
                    alt={`Uploaded image`}
                    referrerPolicy="no-referrer"
                    className="rounded-md"
                    layout="fill"
                    objectFit="cover"
                  />
                )}
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {isVideo ? "Video Preview" : "Image Preview"}
                  </DialogTitle>
                </DialogHeader>
                <div className="relative flex h-96 w-full items-center justify-center">
                  {isVideoFile(url) ? (
                    <video controls poster={url} className="w-full">
                      <source src={`${url}#t=0.1`} type="video/mp4" />
                    </video>
                  ) : (
                    <Image
                      src={url}
                      alt={`Uploaded image`}
                      referrerPolicy="no-referrer"
                      layout="fill"
                      objectFit="contain"
                    />
                  )}
                </div>
              </DialogContent>
            </div>
          </Dialog>
        );
      })}
    </div>
  );
}
