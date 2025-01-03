import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import ImagePreview from "./image-preview";
import FilePreview from "./file-preview";

export type MessageType = "text" | "image" | "file" | "call";
interface MessageProps {
  fromCurrentUser: boolean;
  senderImage: string;
  senderName: string;
  lastByUser: boolean;
  content: string[];
  createdAt: number;
  type: MessageType;
  seen?: React.ReactNode;
}

export default function Message({
  fromCurrentUser,
  senderImage,
  senderName,
  lastByUser,
  content,
  createdAt,
  type,
  seen,
}: MessageProps) {
  const formatTime = (t: number) => format(t, "HH:mm");

  return (
    <div
      className={cn("flex items-end", {
        "justify-end": fromCurrentUser,
      })}
    >
      <div
        className={cn("mx-2 flex w-full flex-col", {
          "order-1 items-end": fromCurrentUser,
          "order-2 items-start": !fromCurrentUser,
        })}
      >
        <div
          className={cn("max-w-[70%] rounded-lg px-4 py-2", {
            "bg-primary text-primary-foreground": fromCurrentUser,
            "bg-secondary text-secondary-foreground": !fromCurrentUser,
            "rounded-br-none": !lastByUser && fromCurrentUser,
            "rounded-bl-none": !lastByUser && !fromCurrentUser,
          })}
        >
          {type === "text" && (
            <p className="whitespace-pre-wrap text-wrap break-words break-all">
              {content}
            </p>
          )}
          {type === "image" && <ImagePreview urls={content} />}
          {type === "file" && <FilePreview url={content[0]} />}
          {type === "call" && <Badge variant="secondary">Joined Call</Badge>}
          <p
            className={cn("my-1 flex w-full text-xs", {
              "justify-end text-primary-foreground": fromCurrentUser,
              "justify-start text-secondary-foreground": !fromCurrentUser,
            })}
          >
            {formatTime(createdAt)}
          </p>
        </div>
        {seen}
      </div>

      {
        <Avatar
          className={cn("relative h-8 w-8", {
            "order-2": fromCurrentUser,
            "order-1": !fromCurrentUser,
            invisible: lastByUser,
          })}
        >
          <AvatarImage src={senderImage} />
          <AvatarFallback>{senderName.substring(0, 1)}</AvatarFallback>
        </Avatar>
      }
    </div>
  );
}
