import { Check, User, X } from "lucide-react";

import type { Id } from "#/convex/_generated/dataModel";

import { api } from "#/convex/_generated/api";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMutaionState } from "@/hooks/useMutationState";
import { toast } from "sonner";
import { ConvexError } from "convex/values";

interface RequestProps {
  id: Id<"requests">;
  imageUrl: string;
  username: string;
  email: string;
}

export default function Request({
  id,
  imageUrl,
  username,
  email,
}: RequestProps) {
  const { mutate: denyRequest, pending: denyPending } = useMutaionState(
    api.request.deny,
  );

  const handleDenial = () =>
    denyRequest({ id })
      .then(() => toast.info("Friend request denied"))
      .catch((err) => {
        toast.error(
          err instanceof ConvexError ? err.data : "Unexpected error occured",
        );
      });

  return (
    <Card className="flex w-full flex-row items-center justify-between gap-2 p-2">
      <div className="flex items-center gap-4 truncate">
        <Avatar>
          <AvatarImage src={imageUrl} />
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col truncate">
          <h4 className="truncate">{username}</h4>
          <p className="truncate text-xs text-muted-foreground">{email}</p>
        </div>
      </div>

      {/* TODO: accept invitation */}
      <div className="flex items-center gap-2">
        <Button size="icon" disabled={denyPending} onClick={() => {}}>
          <Check className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          disabled={denyPending}
          onClick={handleDenial}
          variant="destructive"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
