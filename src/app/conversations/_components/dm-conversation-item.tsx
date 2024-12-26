import Link from "next/link";
import { User } from "lucide-react";

import type { Id } from "#/convex/_generated/dataModel";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface DMConversationItemProps {
  id: Id<"conversations">;
  imageUrl: string;
  username: string;
  lastMessageSender?: string;
  lastMessageContent?: string;
  unseenCount: number;
}

export default function DMConversationItem({
  id,
  imageUrl,
  username,
  lastMessageContent,
  lastMessageSender,
  unseenCount,
}: DMConversationItemProps) {
  return (
    <Link href={`/conversations/${id}`} className="w-full">
      <Card className="flex flex-row items-center justify-between p-2">
        <div className="flex flex-row items-center gap-4 truncate">
          <Avatar>
            <AvatarImage src={imageUrl} />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col truncate">
            <h4 className="truncate">{username}</h4>
            {lastMessageSender && lastMessageContent ? (
              <span className="flex truncate overflow-ellipsis text-sm text-muted-foreground">
                <p className="font-semibold">
                  {lastMessageSender}
                  {":"}&nbsp;
                </p>
                <p className="truncate overflow-ellipsis">
                  {lastMessageContent}
                </p>
              </span>
            ) : (
              <p className="truncate text-sm text-muted-foreground">
                Start the conversation!
              </p>
            )}
          </div>
        </div>
        {unseenCount ? <Badge>{unseenCount}</Badge> : null}
      </Card>
    </Link>
  );
}
