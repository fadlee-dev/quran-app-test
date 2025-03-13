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
  Languages,
  PauseIcon,
  PlayIcon,
  SettingsIcon,
  SkipBackIcon,
  SkipForwardIcon,
} from "lucide-react";

interface ReadingControlsProps {
  isAutoScrolling?: boolean;
  scrollSpeed?: number;
  showTranslation?: boolean;
  onToggleAutoScroll?: () => void;
  onChangeScrollSpeed?: (speed: number) => void;
  onToggleTranslation?: () => void;
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
  showTranslation = true,
  onToggleAutoScroll = () => {},
  onChangeScrollSpeed = () => {},
  onToggleTranslation = () => {},
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
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-2 flex flex-col gap-1 shadow-lg z-10">
      {/* Main controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onNavigateBack}
                  aria-label="Back"
                  className="h-8 w-8"
                >
                  <ChevronLeftIcon className="h-4 w-4" />
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
                  className="h-8 w-8"
                >
                  <HomeIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Home</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex items-center gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onNavigatePrevious}
                  aria-label="Previous Surah"
                  className="h-8 w-8"
                >
                  <SkipBackIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Previous Surah</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button
            variant="outline"
            onClick={onOpenAyahJumpDialog}
            className="px-2 py-1 h-7 text-xs"
            size="sm"
          >
            {currentSurah.englishName} ({currentSurah.id})
          </Button>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onNavigateNext}
                  aria-label="Next Surah"
                  className="h-8 w-8"
                >
                  <SkipForwardIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Next Surah</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex items-center gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onOpenBookmarkDialog}
                  aria-label="Bookmark"
                  className="h-8 w-8"
                >
                  <BookmarkIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Bookmark</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={showTranslation ? "default" : "ghost"}
                  size="icon"
                  onClick={onToggleTranslation}
                  aria-label={
                    showTranslation ? "Hide Translation" : "Show Translation"
                  }
                  className="h-8 w-8"
                >
                  <Languages className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {showTranslation ? "Hide Translation" : "Show Translation"}
              </TooltipContent>
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
                  className="h-8 w-8"
                >
                  <SettingsIcon className="h-4 w-4" />
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
          className="flex items-center gap-1 h-7 px-2"
        >
          {isAutoScrolling ? (
            <>
              <PauseIcon className="h-3 w-3" /> Pause
            </>
          ) : (
            <>
              <PlayIcon className="h-3 w-3" /> Auto-Scroll
            </>
          )}
        </Button>

        {isAutoScrolling && (
          <div className="flex items-center gap-1 flex-1 ml-2">
            <span className="text-xs text-muted-foreground">Speed:</span>
            <Slider
              value={[scrollSpeed]}
              min={10}
              max={100}
              step={5}
              onValueChange={(value) => onChangeScrollSpeed(value[0])}
              className="w-28 md:w-40"
            />
            <span className="text-xs font-medium">{scrollSpeed}%</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReadingControls;
