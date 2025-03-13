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
    <div className="bg-background border-b p-4 sticky top-0 z-10 w-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBackClick}
            aria-label="Back to surah list"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">{surahName}</h1>
          <Badge variant="outline" className="ml-2">
            {revelationType}
          </Badge>
        </div>

        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onPreviousSurah}
                  disabled={surahNumber <= 1}
                  aria-label="Previous surah"
                >
                  <ArrowLeft className="h-5 w-5" />
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
                >
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Next Surah</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button
            variant="default"
            onClick={onReadClick}
            className="ml-2"
            aria-label="Enter reading mode"
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Read
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="text-sm">
                {surahNumber}
              </Badge>
              <h2 className="text-xl font-semibold text-primary">
                {surahNameArabic}
              </h2>
            </div>
            <div className="flex items-center space-x-2">
              <Info className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {versesCount} verses
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurahHeader;
