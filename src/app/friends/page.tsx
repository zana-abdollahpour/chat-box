"use client";

import { useQuery } from "convex/react";
import { Loader2 } from "lucide-react";

import ConversationFallback from "@/components/shared/conversation/conversation-fallback";
import ItemList from "@/components/shared/item-list";
import AddFriendDialog from "@/features/friends/add-friend-dialog";
import Request from "@/features/friends/request";

import { api } from "#/convex/_generated/api";

export default function FriendsPage() {
  const requests = useQuery(api.requests.get);

  return (
    <>
      <ItemList title="Friends" action={<AddFriendDialog />}>
        {requests ? (
          requests.length === 0 ? (
            <p className="flex h-full w-full items-center justify-center">
              No friend request found
            </p>
          ) : (
            requests.map(({ request, sender }) => (
              <Request
                key={request._id}
                id={request._id}
                imageUrl={sender.imageUrl}
                username={sender.username}
                email={sender.email}
              />
            ))
          )
        ) : (
          <Loader2 className="h-8 w-8 animate-spin" />
        )}
      </ItemList>
      <ConversationFallback />
    </>
  );
}
