"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { Loader2 } from "lucide-react";

import { api } from "#/convex/_generated/api";
import type { Id } from "#/convex/_generated/dataModel";

import ConversationContainer from "@/components/shared/conversation/conversation-container";
import Header from "./_components/header";
import Body from "./_components/body";
import ChatInput from "./_components/chat-input";

import RemoveFriendDialog from "./_components/remove-friend-dialog";

interface ConversationPageProps {
  params: {
    conversationId: Id<"conversations">;
  };
}

type CallType = "audio" | "video";

export default function ConversationPage({
  params: { conversationId },
}: ConversationPageProps) {
  const conversation = useQuery(api.conversation.get, { id: conversationId });
  const [removeFriendDialogOpen, setRemoveFriendDialogOpen] = useState(false);
  const [deleteGroupDialogOpen, setDeleteGroupDialogOpen] = useState(false);
  const [leaveGroupDialogOpen, setLeaveGroupDialogOpen] = useState(false);
  const [callType, setCallType] = useState<CallType | null>(null);

  return conversation === undefined ? (
    <div className="flex h-full w-full items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  ) : conversation === null ? (
    <p className="flex h-full w-full items-center justify-center">
      Conversation not found
    </p>
  ) : (
    <ConversationContainer>
      <RemoveFriendDialog
        conversationId={conversationId}
        open={removeFriendDialogOpen}
        setOpen={setRemoveFriendDialogOpen}
      />

      {/* TODO: add group chat image */}
      <Header
        name={
          (conversation.isGroup
            ? conversation.name
            : conversation.otherMember?.username) || ""
        }
        imageUrl={
          conversation.isGroup ? undefined : conversation.otherMember?.imageUrl
        }
        options={
          conversation.isGroup
            ? [
                {
                  label: "Leave Group",
                  destructive: false,
                  onClick: () => setLeaveGroupDialogOpen(true),
                },
                {
                  label: "Delete Group",
                  destructive: true,
                  onClick: () => setDeleteGroupDialogOpen(true),
                },
              ]
            : [
                {
                  label: "Remove Friend",
                  destructive: true,
                  onClick: () => setRemoveFriendDialogOpen(true),
                },
              ]
        }
      />
      <Body />
      <ChatInput />
    </ConversationContainer>
  );
}
