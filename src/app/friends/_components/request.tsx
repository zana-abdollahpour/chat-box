import { Check, User, X } from "lucide-react";

import type { Id } from "#/convex/_generated/dataModel";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface RequestProps {
  id: Id<"requests">;
  imageUrl: string;
  username: string;
  email: string;
}

export default function Request({
  id,
  imageUrl,
  username,
  email,
}: RequestProps) {
  return (
    <Card className="flex w-full flex-row items-center justify-between gap-2 p-2">
      <div className="flex items-center gap-4 truncate">
        <Avatar>
          <AvatarImage src={imageUrl} />
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col truncate">
          <h4 className="truncate">{username}</h4>
          <p className="truncate text-xs text-muted-foreground">{email}</p>
        </div>
      </div>

      {/* TODO: accept or reject invitation */}
      <div className="flex items-center gap-2">
        <Button size="icon" onClick={() => {}}>
          <Check className="h-4 w-4" />
        </Button>
        <Button size="icon" onClick={() => {}} variant="destructive">
          <X className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
