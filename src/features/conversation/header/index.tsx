import Link from "next/link";
import { CircleArrowLeft, Phone, Settings, Video } from "lucide-react";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type CallType = "audio" | "video";

interface HeaderProps {
  imageUrl?: string;
  name: string;
  options?: {
    label: string;
    destructive: boolean;
    onClick: () => void;
  }[];
  setCallType: React.Dispatch<React.SetStateAction<CallType | null>>;
}

export default function Header({
  name,
  imageUrl,
  options,
  setCallType,
}: HeaderProps) {
  return (
    <Card className="flex w-full items-center justify-between rounded-lg p-2">
      <div className="flex items-center gap-2">
        <Link href="/conversations" className="block md:hidden">
          <CircleArrowLeft />
        </Link>
        <Avatar className="h-8 w-8">
          <AvatarImage src={imageUrl} />
          <AvatarFallback>{name.substring(0, 1)}</AvatarFallback>
        </Avatar>
        <h2 className="font-semibold">{name}</h2>
      </div>
      <div className="flex gap-2">
        <Button
          variant="secondary"
          size="icon"
          onClick={() => setCallType("audio")}
        >
          <Phone />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          onClick={() => setCallType("video")}
        >
          <Video />
        </Button>
        {options && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="secondary">
                <Settings />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {options.map((opt, i) => (
                <DropdownMenuItem
                  key={i}
                  onClick={opt.onClick}
                  className={cn("font-semibold", {
                    "text-destructive": opt.destructive,
                  })}
                >
                  {opt.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </Card>
  );
}
