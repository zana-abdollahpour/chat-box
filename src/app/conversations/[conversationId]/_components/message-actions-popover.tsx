import { PopoverClose } from "@radix-ui/react-popover";
import { PlusCircle, Smile } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface MessageActionsPopoverProps {
  setEmojiPickerOpen: (value: React.SetStateAction<boolean>) => void;
}

export default function MessageActionsPopover({
  setEmojiPickerOpen,
}: MessageActionsPopoverProps) {
  return (
    <Popover>
      <PopoverContent className="mb-1 flex w-full flex-col gap-2">
        <PopoverClose>
          <Button
            variant="outline"
            onClick={() => setEmojiPickerOpen(true)}
            size="icon"
          >
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
