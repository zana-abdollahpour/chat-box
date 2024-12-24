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

interface RemoveFriendDialogProps {
  conversationId: Id<"conversations">;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function RemoveFriendDialog({
  conversationId,
  open,
  setOpen,
}: RemoveFriendDialogProps) {
  const { mutate: removeFriend, pending: removePending } = useMutationState(
    api.friend.remove,
  );

  const handleRemoveFriend = async () => {
    removeFriend(conversationId)
      .then(() => toast.success("removed friend"))
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
            This action cannot be undone. All messages will be deleted and you
            will not be able to message this user. All group chats will still
            work as normal
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={removePending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={removePending}
            onClick={handleRemoveFriend}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
