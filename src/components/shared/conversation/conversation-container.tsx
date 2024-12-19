import { Card } from "@/components/ui/card";

export default function ConversationContainer({
  children,
}: React.PropsWithChildren) {
  return (
    <Card className="flex h-[calc(100svh_-_32px)] w-full flex-col gap-2 p-2 md:h-full">
      {children}
    </Card>
  );
}
