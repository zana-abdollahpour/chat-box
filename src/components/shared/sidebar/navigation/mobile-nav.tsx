"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

import { useConversation } from "@/hooks/useConversation";
import { useNavigation } from "@/hooks/useNavigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function MobileNav() {
  const paths = useNavigation();
  const { isActive } = useConversation();

  if (isActive) return null;

  return (
    <Card className="fixed bottom-4 flex h-16 w-[calc(100dvw_-_32px)] items-center p-2 md:hidden">
      <nav className="w-full">
        <ul className="flex items-center justify-evenly">
          {paths.map((path) => (
            <li key={path.name} className="relative">
              <Link href={path.href}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant={path.active ? "default" : "outline"}
                    >
                      <path.icon />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{path.name}</p>
                  </TooltipContent>
                </Tooltip>
              </Link>
            </li>
          ))}
          <li>
            <UserButton />
          </li>
        </ul>
      </nav>
    </Card>
  );
}
