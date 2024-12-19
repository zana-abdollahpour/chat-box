"use client";

import { useConversation } from "@/hooks/useConversation";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ItemListProps extends React.PropsWithChildren {
  title: string;
  action?: React.ReactNode;
}

export default function ItemList({ title, action, children }: ItemListProps) {
  const { isActive } = useConversation();

  return (
    <Card
      className={cn("hidden h-full w-full p-2 md:w-80 md:flex-none", {
        block: !isActive,
        "md:block": isActive,
      })}
    >
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {action ?? null}
      </div>
      <div className="flex h-full w-full flex-col items-center justify-start gap-2">
        {children}
      </div>
    </Card>
  );
}
