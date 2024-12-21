import Link from "next/link";
import { User } from "lucide-react";

import type { Id } from "#/convex/_generated/dataModel";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface DMConversationItemProps {
  id: Id<"conversations">;
  imageUrl: string;
  username: string;
}

export default function DMConversationItem({
  id,
  imageUrl,
  username,
}: DMConversationItemProps) {
  return (
    <Link href={`/conversations/${id}`} className="w-full">
      <Card className="flex flex-row items-center gap-4 truncate p-2">
        <div className="flex flex-row items-center gap-4 truncate">
          <Avatar>
            <AvatarImage src={imageUrl} />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col truncate">
            <h4 className="truncate">{username}</h4>
            <p className="truncate text-sm text-muted-foreground">
              Start the conversation!
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
}
