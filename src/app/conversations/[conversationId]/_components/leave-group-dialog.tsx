import { toast } from "sonner";
import { ConvexError } from "convex/values";

import { api } from "#/convex/_generated/api";
import type { Id } from "#/convex/_generated/dataModel";

import { useMutationState } from "@/hooks/useMutationState";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface LeaveGroupDialogProps {
  conversationId: Id<"conversations">;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LeaveGroupDialog({
  conversationId,
  open,
  setOpen,
}: LeaveGroupDialogProps) {
  const { mutate: LeaveGroup, pending: LeavePending } = useMutationState(
    api.conversation.leaveGroup,
  );

  const handleLeaveGroup = async () => {
    LeaveGroup(conversationId)
      .then(() => toast.success("You left the group"))
      .catch((err) => {
        toast.error(
          err instanceof ConvexError ? err.data : "Unexpected error occured",
        );
      });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. You will not be able to message in
            this group or access previous messages.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={LeavePending}>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={LeavePending} onClick={handleLeaveGroup}>
            Leave
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
