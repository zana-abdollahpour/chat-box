"use client";

import { useQuery } from "convex/react";

import { api } from "#/convex/_generated/api";
import type { Id } from "#/convex/_generated/dataModel";
import { useConversation } from "@/hooks/useConversation";
import Message from "./message";

export default function Body() {
  const { conversationId } = useConversation();

  const messages = useQuery(api.messages.get, {
    id: conversationId as Id<"conversations">,
  });

  return (
    <div className="no-scrollbar flex w-full flex-1 flex-col-reverse gap-2 overflow-y-scroll p-3">
      {messages?.map(
        ({ isCurrentUser, message, senderImage, senderName }, i) => {
          const lastByUser =
            messages[i - 1]?.message.senderId === messages[i].message.senderId;

          return (
            <Message
              key={message._id}
              fromCurrentUser={isCurrentUser}
              senderImage={senderImage}
              senderName={senderName}
              lastByUser={lastByUser}
              content={message.content}
              createdAt={message._creationTime}
              type={message.type}
            />
          );
        },
      )}
    </div>
  );
}
