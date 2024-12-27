"use client";

import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ConvexError } from "convex/values";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { z } from "zod";
import TextareaAutosize from "react-textarea-autosize";
import EmojiPicker, { type Theme } from "emoji-picker-react";
import { SendHorizontal } from "lucide-react";

import { api } from "#/convex/_generated/api";
import { useConversation } from "@/hooks/useConversation";
import { useMutationState } from "@/hooks/useMutationState";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import MessageActionsPopover from "./message-actions-popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const chatMessageSchema = z.object({
  content: z.string().min(1, { message: "This field can't be empty" }),
});

export default function ChatInput() {
  const [cursorPosition, setCursorPosition] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const emojiPickerRef = useRef<HTMLDivElement | null>(null);
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const { theme } = useTheme();
  const conversationId = useConversation();
  const { mutate: createMessage, pending: pendingCreate } = useMutationState(
    api.message.create,
  );
  const form = useForm<z.infer<typeof chatMessageSchema>>({
    resolver: zodResolver(chatMessageSchema),
    defaultValues: { content: "" },
  });
  const content = form.watch("content", "");

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(e.target as Node)
      ) {
        setEmojiPickerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmition = async (values: z.infer<typeof chatMessageSchema>) => {
    createMessage({
      conversationId,
      type: "text",
      content: [values.content],
    })
      .then(() => {
        form.reset();
        textareaRef.current?.focus();
      })
      .catch((err) =>
        toast.error(
          err instanceof ConvexError ? err.data : "Unexpected error occured",
        ),
      );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (e: any) => {
    const { value, selectionStart } = e.target;
    if (selectionStart === null) return;

    form.setValue("content", value);
    setCursorPosition(selectionStart);
  };

  const insertEmoji = (emoji: string) => {
    const text = [
      content.substring(0, cursorPosition),
      emoji,
      content.substring(cursorPosition),
    ].join("");

    form.setValue("content", text);
    setCursorPosition(cursorPosition + emoji.length);
  };

  const handleSend: React.KeyboardEventHandler<HTMLTextAreaElement> = async (
    e,
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      await form.handleSubmit(handleSubmition)();
    }
  };

  return (
    <Card className="relative w-full rounded-lg p-2">
      <div className="absolute bottom-16" ref={emojiPickerRef}>
        <EmojiPicker
          lazyLoadEmojis
          open={emojiPickerOpen}
          theme={theme as Theme}
          onEmojiClick={({ emoji }) => {
            insertEmoji(emoji);
            setEmojiPickerOpen(false);
          }}
        />
      </div>
      <div className="flex w-full items-end gap-2">
        <MessageActionsPopover setEmojiPickerOpen={setEmojiPickerOpen} />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmition)}
            className="flex w-full items-end gap-2"
          >
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="h-full w-full">
                  <FormControl>
                    <TextareaAutosize
                      {...field}
                      rows={1}
                      maxRows={3}
                      ref={textareaRef}
                      onChange={handleInputChange}
                      onClick={handleInputChange}
                      onKeyDown={handleSend}
                      placeholder="Type a message..."
                      className="min-h-full w-full resize-none border-0 bg-card p-1.5 text-card-foreground outline-0 placeholder:text-muted-foreground"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={pendingCreate} size="icon" type="submit">
              <SendHorizontal />
            </Button>
          </form>
        </Form>
      </div>
    </Card>
  );
}
