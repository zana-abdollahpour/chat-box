import Link from "next/link";
import { CircleArrowLeft } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeaderProps {
  imageUrl?: string;
  name: string;
}

export default function Header({ name, imageUrl }: HeaderProps) {
  return (
    <Card className="flex w-full items-center justify-between rounded-lg p-2">
      <div className="flex items-center gap-2">
        <Link href="/conversations" className="block md:hidden">
          <CircleArrowLeft />
        </Link>
        <Avatar className="h-8 w-8">
          <AvatarImage src={imageUrl} />
          <AvatarFallback>{name.substring(0, 1)}</AvatarFallback>
        </Avatar>
        <h2 className="font-semibold">{name}</h2>
      </div>
    </Card>
  );
}
