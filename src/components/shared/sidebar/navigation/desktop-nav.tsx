"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useNavigation } from "@/hooks/useNavigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function DesktopNav() {
  const paths = useNavigation();

  return (
    <Card className="hidden h-full w-16 flex-col items-center justify-between px-2 py-4 md:flex">
      <nav>
        <ul className="flex flex-col items-center gap-4">
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
        </ul>
      </nav>
      <div className="flex flex-col items-center gap-4">
        <ThemeToggle />
        <UserButton />
      </div>
    </Card>
  );
}
