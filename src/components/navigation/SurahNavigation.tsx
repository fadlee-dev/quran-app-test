import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Book, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SurahNavigationProps {
  surahId?: number;
  totalSurahs?: number;
  onReadingModeClick?: () => void;
}

const SurahNavigation = ({
  surahId = 1,
  totalSurahs = 114,
  onReadingModeClick = () => {},
}: SurahNavigationProps) => {
  const navigate = useNavigate();

  const goToPreviousSurah = () => {
    if (surahId > 1) {
      navigate(`/surah/${surahId - 1}`);
    }
  };

  const goToNextSurah = () => {
    if (surahId < totalSurahs) {
      navigate(`/surah/${surahId + 1}`);
    }
  };

  const goToReadingMode = () => {
    navigate(`/reading/${surahId}`);
    onReadingModeClick();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-2 flex items-center justify-between shadow-md">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => navigate("/")}
        aria-label="Go to home"
        className="h-8 w-8"
      >
        <Home className="h-4 w-4" />
      </Button>

      <div className="flex items-center space-x-1">
        <Button
          variant="outline"
          size="sm"
          onClick={goToPreviousSurah}
          disabled={surahId <= 1}
          className={cn(
            "h-7 px-2",
            surahId <= 1 ? "opacity-50 cursor-not-allowed" : "",
          )}
          aria-label="Previous surah"
        >
          <ChevronLeft className="h-3 w-3 mr-1" />
          Prev
        </Button>

        <Button
          variant="default"
          onClick={goToReadingMode}
          className="px-2 h-7"
          size="sm"
          aria-label="Enter reading mode"
        >
          <Book className="h-3 w-3 mr-1" />
          Read
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={goToNextSurah}
          disabled={surahId >= totalSurahs}
          className={cn(
            "h-7 px-2",
            surahId >= totalSurahs ? "opacity-50 cursor-not-allowed" : "",
          )}
          aria-label="Next surah"
        >
          Next
          <ChevronRight className="h-3 w-3 ml-1" />
        </Button>
      </div>

      <div className="w-8">{/* Empty div for balanced layout */}</div>
    </div>
  );
};

export default SurahNavigation;
