import React from "react";
import { ArrowLeft, ArrowRight, BookOpen, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

interface SurahHeaderProps {
  surahNumber?: number;
  surahName?: string;
  surahNameArabic?: string;
  revelationType?: string;
  versesCount?: number;
  onBackClick?: () => void;
  onReadClick?: () => void;
  onPreviousSurah?: () => void;
  onNextSurah?: () => void;
}

const SurahHeader: React.FC<SurahHeaderProps> = ({
  surahNumber = 1,
  surahName = "Al-Fatiha",
  surahNameArabic = "الفاتحة",
  revelationType = "Meccan",
  versesCount = 7,
  onBackClick = () => {},
  onReadClick = () => {},
  onPreviousSurah = () => {},
  onNextSurah = () => {},
}) => {
  return (
    <div className="bg-background border-b py-2 px-4 sticky top-0 z-10 w-full shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBackClick}
            aria-label="Back to surah list"
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold">{surahName}</h1>
              <Badge variant="outline" className="text-xs">
                {revelationType}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Badge variant="secondary" className="text-xs h-5">
                {surahNumber}
              </Badge>
              <h2 className="font-semibold text-primary">{surahNameArabic}</h2>
              <div className="flex items-center space-x-1">
                <Info className="h-3 w-3" />
                <span>{versesCount} verses</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onPreviousSurah}
                  disabled={surahNumber <= 1}
                  aria-label="Previous surah"
                  className="h-8 w-8"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Previous Surah</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onNextSurah}
                  disabled={surahNumber >= 114}
                  aria-label="Next surah"
                  className="h-8 w-8"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Next Surah</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default SurahHeader;
