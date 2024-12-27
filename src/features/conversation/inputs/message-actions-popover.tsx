"use client";

import { useState } from "react";
import { PopoverClose } from "@radix-ui/react-popover";
import { PlusCircle, Smile } from "lucide-react";

import UploadFileDialog from "../dialogs/upload-file-dialog";
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
  const [uploadFileDialogOpen, setUploadFileDialogOpen] = useState(false);
  const [uploadImageDialogOpen, setUploadImageDialogOpen] = useState(false);

  return (
    <Popover>
      <PopoverContent className="mb-1 flex w-full flex-col gap-2">
        <UploadFileDialog
          type="file"
          open={uploadFileDialogOpen}
          toggle={(newState) => setUploadFileDialogOpen(newState)}
        />
        <UploadFileDialog
          type="image"
          open={uploadImageDialogOpen}
          toggle={(newState) => setUploadImageDialogOpen(newState)}
        />
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
