import React, { useState } from "react";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  BookmarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HomeIcon,
  PauseIcon,
  PlayIcon,
  SettingsIcon,
  SkipBackIcon,
  SkipForwardIcon,
} from "lucide-react";

interface ReadingControlsProps {
  isAutoScrolling?: boolean;
  scrollSpeed?: number;
  onToggleAutoScroll?: () => void;
  onChangeScrollSpeed?: (speed: number) => void;
  onNavigateBack?: () => void;
  onNavigateHome?: () => void;
  onNavigatePrevious?: () => void;
  onNavigateNext?: () => void;
  onOpenBookmarkDialog?: () => void;
  onOpenAyahJumpDialog?: () => void;
  onOpenSettings?: () => void;
  currentSurah?: {
    id: number;
    name: string;
    englishName: string;
  };
}

const ReadingControls: React.FC<ReadingControlsProps> = ({
  isAutoScrolling = false,
  scrollSpeed = 50,
  onToggleAutoScroll = () => {},
  onChangeScrollSpeed = () => {},
  onNavigateBack = () => {},
  onNavigateHome = () => {},
  onNavigatePrevious = () => {},
  onNavigateNext = () => {},
  onOpenBookmarkDialog = () => {},
  onOpenAyahJumpDialog = () => {},
  onOpenSettings = () => {},
  currentSurah = { id: 1, name: "الفاتحة", englishName: "Al-Fatiha" },
}) => {
  const [showSpeedControls, setShowSpeedControls] = useState(false);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-3 flex flex-col gap-2 shadow-lg z-10">
      {/* Main controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onNavigateBack}
                  aria-label="Back"
                >
                  <ChevronLeftIcon className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Back</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onNavigateHome}
                  aria-label="Home"
                >
                  <HomeIcon className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Home</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onNavigatePrevious}
                  aria-label="Previous Surah"
                >
                  <SkipBackIcon className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Previous Surah</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                onClick={onOpenAyahJumpDialog}
                className="px-3 py-1 h-8 text-xs"
              >
                {currentSurah.englishName} ({currentSurah.id})
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Jump to Ayah</DialogTitle>
              </DialogHeader>
              <div className="p-4 text-center">
                <p>Ayah jump dialog content will be implemented here</p>
              </div>
            </DialogContent>
          </Dialog>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onNavigateNext}
                  aria-label="Next Surah"
                >
                  <SkipForwardIcon className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Next Surah</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onOpenBookmarkDialog}
                  aria-label="Bookmark"
                >
                  <BookmarkIcon className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Bookmark</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onOpenSettings}
                  aria-label="Settings"
                >
                  <SettingsIcon className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Settings</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Auto-scroll controls */}
      <div className="flex items-center justify-between">
        <Button
          variant={isAutoScrolling ? "default" : "outline"}
          size="sm"
          onClick={onToggleAutoScroll}
          className="flex items-center gap-2"
        >
          {isAutoScrolling ? (
            <>
              <PauseIcon className="h-4 w-4" /> Pause
            </>
          ) : (
            <>
              <PlayIcon className="h-4 w-4" /> Auto-Scroll
            </>
          )}
        </Button>

        {isAutoScrolling && (
          <div className="flex items-center gap-2 flex-1 ml-4">
            <span className="text-xs text-muted-foreground">Speed:</span>
            <Slider
              value={[scrollSpeed]}
              min={10}
              max={100}
              step={5}
              onValueChange={(value) => onChangeScrollSpeed(value[0])}
              className="w-32 md:w-48"
            />
            <span className="text-xs font-medium">{scrollSpeed}%</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReadingControls;
