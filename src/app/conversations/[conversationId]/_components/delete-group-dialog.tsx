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

interface DeleteGroupDialogProps {
  conversationId: Id<"conversations">;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DeleteGroupDialog({
  conversationId,
  open,
  setOpen,
}: DeleteGroupDialogProps) {
  const { mutate: deleteGroup, pending: deletePending } = useMutationState(
    api.conversation.deleteGroup,
  );

  const handleDeleteGroup = async () => {
    deleteGroup(conversationId)
      .then(() => toast.success("Group deleted"))
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
            will not be able to message in this group.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deletePending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={deletePending}
            onClick={handleDeleteGroup}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
