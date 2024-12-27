"use client";

import "@livekit/components-styles";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { api } from "#/convex/_generated/api";
import { useConversation } from "@/hooks/useConversation";
import { useMutationState } from "@/hooks/useMutationState";
import { Button } from "@/components/ui/button";

interface CallRoomProps {
  video: boolean;
  audio: boolean;
  handleDisconnect: () => void;
}

export default function CallRoom({
  audio,
  video,
  handleDisconnect,
}: CallRoomProps) {
  const { user } = useUser();
  const [token, setToken] = useState("");
  const { conversationId } = useConversation();
  const { mutate: createMessage } = useMutationState(api.message.create);

  useEffect(() => {
    if (!user?.fullName) return;

    (async () => {
      try {
        const res = await fetch(
          `/api/livekit?room=${conversationId}&username=${
            user.fullName
          } (${Math.floor(Math.random() * 2000)})`,
        );
        const data = await res.json();

        setToken(data.token);
      } catch (err) {
        toast.error("Could not join the call");
        console.error(err);
      }
    })();
  }, [user?.fullName, conversationId]);

  if (token === "") {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-foreground" />
        <p className="text-sm text-foreground">Joining call...</p>
        <Button
          className="mt-4"
          variant="destructive"
          onClick={handleDisconnect}
        >
          Cancel
        </Button>
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <LiveKitRoom
        data-lk-theme="default"
        serverUrl={process.env.LIVEKIT_URL}
        token={token}
        connect={true}
        video={video}
        audio={audio}
        onDisconnected={() => handleDisconnect()}
        onConnected={() => {
          createMessage({
            conversationId,
            type: "call",
            content: [],
          });
        }}
      >
        <VideoConference />
      </LiveKitRoom>
    </div>
  );
}
