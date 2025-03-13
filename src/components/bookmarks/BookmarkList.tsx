import React, { useState } from "react";
import { Bookmark, Search, Trash2, ExternalLink } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface BookmarkItem {
  id: string;
  surahId: number;
  surahName: string;
  ayahNumber: number;
  text: string;
  notes?: string;
  createdAt: string;
}

interface BookmarkListProps {
  bookmarks?: BookmarkItem[];
  onViewBookmark?: (bookmark: BookmarkItem) => void;
  onDeleteBookmark?: (bookmarkId: string) => void;
}

const BookmarkList = ({
  bookmarks = [
    {
      id: "1",
      surahId: 1,
      surahName: "Al-Fatiha",
      ayahNumber: 5,
      text: "You alone we worship and You alone we ask for help.",
      notes: "Important verse about worship",
      createdAt: "2023-06-15T10:30:00Z",
    },
    {
      id: "2",
      surahId: 2,
      surahName: "Al-Baqarah",
      ayahNumber: 255,
      text: "Allah! There is no deity except Him, the Ever-Living, the Sustainer of existence.",
      notes: "Ayatul Kursi",
      createdAt: "2023-06-20T14:45:00Z",
    },
    {
      id: "3",
      surahId: 36,
      surahName: "Ya-Sin",
      ayahNumber: 12,
      text: "Indeed, it is We who bring the dead to life and record what they have put forth and what they left behind, and all things We have enumerated in a clear register.",
      createdAt: "2023-07-05T09:15:00Z",
    },
  ],
  onViewBookmark = () => {},
  onDeleteBookmark = () => {},
}: BookmarkListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBookmark, setSelectedBookmark] = useState<BookmarkItem | null>(
    null,
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const filteredBookmarks = bookmarks.filter(
    (bookmark) =>
      bookmark.surahName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bookmark.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (bookmark.notes &&
        bookmark.notes.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  const handleViewBookmark = (bookmark: BookmarkItem) => {
    onViewBookmark(bookmark);
  };

  const handleDeleteClick = (bookmark: BookmarkItem) => {
    setSelectedBookmark(bookmark);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedBookmark) {
      onDeleteBookmark(selectedBookmark.id);
      setIsDeleteDialogOpen(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="w-full h-full bg-background p-4">
      <div className="flex items-center mb-6">
        <Bookmark className="h-5 w-5 mr-2 text-primary" />
        <h1 className="text-2xl font-bold">Your Bookmarks</h1>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search bookmarks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {filteredBookmarks.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <Bookmark className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No bookmarks found</h3>
          <p className="text-muted-foreground mt-2">
            {searchTerm
              ? "Try a different search term"
              : "You haven't saved any bookmarks yet"}
          </p>
        </div>
      ) : (
        <ScrollArea className="h-[calc(100vh-220px)]">
          <div className="space-y-4">
            {filteredBookmarks.map((bookmark) => (
              <Card key={bookmark.id} className="bg-card">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">
                        {bookmark.surahName} ({bookmark.surahId}:
                        {bookmark.ayahNumber})
                      </CardTitle>
                      <CardDescription>
                        Saved on {formatDate(bookmark.createdAt)}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-md mb-2">{bookmark.text}</p>
                  {bookmark.notes && (
                    <div className="mt-2 p-2 bg-muted rounded-md">
                      <p className="text-sm italic">{bookmark.notes}</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteClick(bookmark)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleViewBookmark(bookmark)}
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </ScrollArea>
      )}

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Bookmark</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this bookmark? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookmarkList;
