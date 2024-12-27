"use client";

import { useEffect } from "react";
import { useQuery } from "convex/react";
import { Loader2 } from "lucide-react";

import { api } from "#/convex/_generated/api";
import ItemList from "@/components/shared/item-list";
import DMConversationItem from "@/features/conversations/dm-conversation-item";
import CreateGroupDialog from "@/features/conversations/create-group-dialog";
import GroupConversationItem from "@/features/conversations/group-conversation-item";

export default function ConversationsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const conversations = useQuery(api.conversations.get);

  useEffect(() => {
    document.title = "ChatBox - Conversations";
  });

  return (
    <>
      <ItemList title="Conversations" action={<CreateGroupDialog />}>
        {conversations ? (
          conversations.length === 0 ? (
            <p className="flex h-full w-full items-center justify-center">
              No conversations found
            </p>
          ) : (
            conversations.map(
              ({ conversation, otherMember, lastMessage, unseenCount }) =>
                conversation.isGroup ? (
                  <GroupConversationItem
                    key={conversation._id}
                    id={conversation._id}
                    name={conversation.name || ""}
                    lastMessageSender={lastMessage?.sender}
                    lastMessageContent={lastMessage?.content}
                    unseenCount={unseenCount}
                  />
                ) : (
                  <DMConversationItem
                    key={conversation._id}
                    id={conversation._id}
                    username={otherMember?.username || ""}
                    imageUrl={otherMember?.imageUrl || ""}
                    lastMessageSender={lastMessage?.sender}
                    unseenCount={unseenCount}
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
