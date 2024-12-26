import Link from "next/link";

import type { Id } from "#/convex/_generated/dataModel";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface GroupConversationItemProps {
  id: Id<"conversations">;
  name: string;
  lastMessageSender?: string;
  lastMessageContent?: string;
  unseenCount: number;
}

export default function GroupConversationItem({
  id,
  name,
  lastMessageContent,
  lastMessageSender,
  unseenCount,
}: GroupConversationItemProps) {
  return (
    <Link href={`/conversations/${id}`} className="w-full">
      <Card className="flex flex-row items-center justify-between p-2">
        <div className="flex flex-row items-center gap-4 truncate">
          <Avatar>
            <AvatarFallback>
              {name.charAt(0).toLocaleUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col truncate">
            <h4 className="truncate">{name}</h4>
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
