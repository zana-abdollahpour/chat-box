"use client";

import { useEffect } from "react";
import { useQuery } from "convex/react";

import { api } from "#/convex/_generated/api";
import type { Id } from "#/convex/_generated/dataModel";

import { useMutationState } from "@/hooks/useMutationState";
import { useConversation } from "@/hooks/useConversation";

import Message from "./message";
import CallRoom from "./call-room";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import type { CallType } from "@/features/conversation/header";
import type { MessageType } from "@/features/conversation/body/message";

const formatSeenBy = (names: string[]) => {
  switch (names.length) {
    case 1:
      return (
        <p className="text-right text-sm text-muted-foreground">
          Seen by {names[0]}
        </p>
      );
    case 2:
      return (
        <p className="text-right text-sm text-muted-foreground">
          Seen by {names[0]} and {names[1]}
        </p>
      );

    default:
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="text-right text-sm text-muted-foreground">{`Seen by ${
                names[0]
              }, ${names[1]}, and ${names.length - 2} more`}</p>
            </TooltipTrigger>
            <TooltipContent>
              <ul>
                {names.map((name, index) => {
                  return <li key={index}>{name}</li>;
                })}
              </ul>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
  }
};

interface BodyProps {
  members: {
    lastSeenMessageId?: Id<"messages">;
    username?: string;
    [key: string]: unknown;
  }[];
  callType: CallType | null;
  setCallType: React.Dispatch<React.SetStateAction<CallType | null>>;
}

export default function Body({ members, callType, setCallType }: BodyProps) {
  const { conversationId } = useConversation();

  const messages = useQuery(api.messages.get, {
    id: conversationId as Id<"conversations">,
  });

  const { mutate: markRead } = useMutationState(api.conversation.markRead);

  useEffect(() => {
    if (!messages || messages.length < 1) return;
    markRead({ conversationId, messageId: messages[0].message._id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId, markRead, messages?.length]);

  const getSeenMessage = (messageId: Id<"messages">) => {
    const seenUsers = members
      .filter((m) => m.lastSeenMessageId === messageId)
      .map((user) => user.username!.split(" ")[0]);

    return seenUsers.length === 0 ? undefined : formatSeenBy(seenUsers);
  };

  return (
    <div className="no-scrollbar flex w-full flex-1 flex-col-reverse gap-2 overflow-y-scroll p-3">
      {!callType ? (
        messages?.map(
          ({ isCurrentUser, message, senderImage, senderName }, i) => {
            const lastByUser =
              messages[i - 1]?.message.senderId ===
              messages[i].message.senderId;

            const seenMessage = isCurrentUser
              ? getSeenMessage(message._id)
              : undefined;

            return (
              <Message
                key={message._id}
                fromCurrentUser={isCurrentUser}
                senderImage={senderImage}
                senderName={senderName}
                lastByUser={lastByUser}
                content={message.content}
                createdAt={message._creationTime}
                type={message.type as MessageType}
                seen={seenMessage}
              />
            );
          },
        )
      ) : (
        <CallRoom
          audio={callType === "audio" || callType === "video"}
          video={callType === "video"}
          handleDisconnect={() => setCallType(null)}
        />
      )}
    </div>
  );
}
