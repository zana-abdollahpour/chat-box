import { PopoverClose } from "@radix-ui/react-popover";
import { PlusCircle, Smile } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function MessageActionsPopover() {
  return (
    <Popover>
      <PopoverContent className="mb-1 flex w-full flex-col gap-2">
        <PopoverClose>
          <Button variant="outline" onClick={() => {}} size="icon">
            <Smile />
          </Button>
        </PopoverClose>
      </PopoverContent>
      <PopoverTrigger asChild>
        <Button size="icon" variant="secondary">
          <PlusCircle />
        </Button>
      </PopoverTrigger>
    </Popover>
  );
}
