import React, { useState } from "react";
import { BookmarkPlus } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";

interface BookmarkDialogProps {
  surahId?: number;
  ayahNumber?: number;
  surahName?: string;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSaveBookmark?: (bookmark: {
    surahId: number;
    ayahNumber: number;
    title: string;
    notes: string;
  }) => void;
}

const BookmarkDialog = ({
  surahId = 1,
  ayahNumber = 1,
  surahName = "Al-Fatihah",
  isOpen = true,
  onOpenChange,
  onSaveBookmark,
}: BookmarkDialogProps) => {
  const [title, setTitle] = useState(`${surahName} - Ayah ${ayahNumber}`);
  const [notes, setNotes] = useState("");

  const handleSave = () => {
    if (onSaveBookmark) {
      onSaveBookmark({
        surahId,
        ayahNumber,
        title,
        notes,
      });
    }
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="bg-background">
          <BookmarkPlus className="h-5 w-5" />
          <span className="sr-only">Add bookmark</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-background">
        <DialogHeader>
          <DialogTitle>Add Bookmark</DialogTitle>
          <DialogDescription>
            Save this verse to your bookmarks for quick access later.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label
              htmlFor="bookmark-title"
              className="text-right text-sm font-medium"
            >
              Title
            </label>
            <Input
              id="bookmark-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label
              htmlFor="bookmark-notes"
              className="text-right text-sm font-medium"
            >
              Notes
            </label>
            <Textarea
              id="bookmark-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes about this verse..."
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange && onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Bookmark</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookmarkDialog;
