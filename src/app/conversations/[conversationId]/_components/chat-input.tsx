"use client";

import { useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ConvexError } from "convex/values";
import { toast } from "sonner";
import { z } from "zod";
import TextareaAutosize from "react-textarea-autosize";
import { SendHorizontal } from "lucide-react";

import { api } from "#/convex/_generated/api";
import { useConversation } from "@/hooks/useConversation";
import { useMutationState } from "@/hooks/useMutationState";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import MessageActionsPopover from "./message-actions-popover";

const chatMessageSchema = z.object({
  content: z.string().min(1, { message: "This field can't be empty" }),
});

export default function ChatInput() {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const conversationId = useConversation();
  const { mutate: createMessage, pending: pendingCreate } = useMutationState(
    api.message.create,
  );
  const form = useForm<z.infer<typeof chatMessageSchema>>({
    resolver: zodResolver(chatMessageSchema),
    defaultValues: { content: "" },
  });

  const handleSubmition = async (values: z.infer<typeof chatMessageSchema>) => {
    createMessage({
      conversationId,
      type: "text",
      content: [values.content],
    })
      .then(() => {
        form.reset();
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
      <div className="flex w-full items-end gap-2">
        <MessageActionsPopover />
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
