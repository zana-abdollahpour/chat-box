"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { useRouter } from "next/router";
import { Loader2 } from "lucide-react";

import { api } from "#/convex/_generated/api";
import type { Id } from "#/convex/_generated/dataModel";

import ConversationContainer from "@/components/shared/conversation/conversation-container";

import Header, { type CallType } from "@/features/conversation/header";
import Body from "@/features/conversation/body";
import ChatInput from "@/features/conversation/inputs/chat-input";
import RemoveFriendDialog from "@/features/conversation/dialogs/remove-friend-dialog";
import DeleteGroupDialog from "@/features/conversation/dialogs/delete-group-dialog";
import LeaveGroupDialog from "@/features/conversation/dialogs/leave-group-dialog";

export default function ConversationPage() {
  const router = useRouter();
  const conversationId = router.query.conversationId as Id<"conversations">;
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
      <LeaveGroupDialog
        conversationId={conversationId}
        open={leaveGroupDialogOpen}
        setOpen={setLeaveGroupDialogOpen}
      />
      <DeleteGroupDialog
        conversationId={conversationId}
        open={deleteGroupDialogOpen}
        setOpen={setDeleteGroupDialogOpen}
      />
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
        setCallType={setCallType}
      />
      <Body
        members={
          conversation.isGroup
            ? conversation.otherMembers
              ? conversation.otherMembers
              : []
            : conversation.otherMember
              ? [conversation.otherMember]
              : []
        }
        callType={callType}
        setCallType={setCallType}
      />
      <ChatInput />
    </ConversationContainer>
  );
}
