"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";

import ConversationFallback from "@/components/shared/conversation/conversation-fallback";

export default function Error({ error }: { error: Error }) {
  const router = useRouter();

  useEffect(() => {
    router.push("/conversations");
  }, [error, router]);

  return <ConversationFallback />;
}
