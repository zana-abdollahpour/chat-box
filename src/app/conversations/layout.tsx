"use client";

import { Loader2 } from "lucide-react";

import { useQuery } from "convex/react";

import { api } from "#/convex/_generated/api";
import ItemList from "@/components/shared/item-list";
import DMConversationItem from "./_components/dm-conversation-item";

export default function ConversationsLayout({
  children,
}: React.PropsWithChildren) {
  const conversations = useQuery(api.conversations.get);

  return (
    <>
      <ItemList title="Conversations">
        {conversations ? (
          conversations.length === 0 ? (
            <p className="flex h-full w-full items-center justify-center">
              No conversations found
            </p>
          ) : (
            conversations.map(({ conversation, otherMember, lastMessage }) =>
              conversation.isGroup ? null : (
                <DMConversationItem
                  key={conversation._id}
                  id={conversation._id}
                  username={otherMember?.username || ""}
                  imageUrl={otherMember?.imageUrl || ""}
                  lastMessageSender={lastMessage?.sender}
                  lastMessageContent={lastMessage?.content}
                />
              ),
            )
          )
        ) : (
          <Loader2 className="animate-spin" />
        )}
      </ItemList>
      {children}
    </>
  );
}
