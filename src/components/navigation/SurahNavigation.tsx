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
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-3 flex items-center justify-between shadow-md">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => navigate("/")}
        aria-label="Go to home"
      >
        <Home className="h-5 w-5" />
      </Button>

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={goToPreviousSurah}
          disabled={surahId <= 1}
          className={cn(surahId <= 1 ? "opacity-50 cursor-not-allowed" : "")}
          aria-label="Previous surah"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>

        <Button
          variant="default"
          onClick={goToReadingMode}
          className="px-4"
          aria-label="Enter reading mode"
        >
          <Book className="h-4 w-4 mr-2" />
          Reading Mode
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={goToNextSurah}
          disabled={surahId >= totalSurahs}
          className={cn(
            surahId >= totalSurahs ? "opacity-50 cursor-not-allowed" : "",
          )}
          aria-label="Next surah"
        >
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>

      <div className="w-9">{/* Empty div for balanced layout */}</div>
    </div>
  );
};

export default SurahNavigation;
