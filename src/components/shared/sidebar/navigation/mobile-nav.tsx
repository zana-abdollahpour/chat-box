"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

import { useConversation } from "@/hooks/useConversation";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useNavigation } from "@/hooks/useNavigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
                  {path.requestsCount ? (
                    <Badge className="absolute bottom-6 left-6 px-2">
                      {path.requestsCount}
                    </Badge>
                  ) : null}
                  <TooltipContent>
                    <p>{path.name}</p>
                  </TooltipContent>
                </Tooltip>
              </Link>
            </li>
          ))}
          <li>
            <ThemeToggle />
          </li>
          <li>
            <UserButton />
          </li>
        </ul>
      </nav>
    </Card>
  );
}
