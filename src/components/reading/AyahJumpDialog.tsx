import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  ayahNumber: z.coerce
    .number()
    .min(1, { message: "Ayah number must be at least 1" })
    .max(286, {
      message: "Ayah number must not exceed the maximum for this surah",
    }),
});

interface AyahJumpDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onJump?: (ayahNumber: number) => void;
  maxAyahs?: number;
  currentSurah?: string;
}

export default function AyahJumpDialog({
  open = true,
  onOpenChange,
  onJump = () => {},
  maxAyahs = 286, // Default to Al-Baqarah's ayah count as maximum
  currentSurah = "Al-Baqarah",
}: AyahJumpDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ayahNumber: 1,
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onJump(values.ayahNumber);
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white dark:bg-gray-900 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Jump to Ayah</DialogTitle>
          <DialogDescription>
            Enter the ayah number you want to navigate to in {currentSurah}.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="ayahNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ayah Number</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter ayah number"
                      min={1}
                      max={maxAyahs}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter a number between 1 and {maxAyahs}.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex justify-between sm:justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange && onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Jump</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
