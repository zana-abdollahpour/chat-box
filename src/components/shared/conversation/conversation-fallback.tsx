import { Card } from "@/components/ui/card";

export default function ConversationFallback() {
  return (
    <Card className="hidden h-full w-full items-center justify-center bg-secondary p-2 text-secondary-foreground md:flex">
      select a conversation to get started
    </Card>
  );
}
