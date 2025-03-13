import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReadingControls from "@/components/reading/ReadingControls";
import QuranText from "@/components/reading/QuranText";
import AyahJumpDialog from "@/components/reading/AyahJumpDialog";
import BookmarkDialog from "@/components/reading/BookmarkDialog";
import { getSurahWithTranslation } from "@/services/quranService";

interface SurahData {
  id: number;
  name: string;
  englishName: string;
  englishNameTranslation?: string;
  ayahs: Array<{
    number: number;
    text: string;
    translation?: string;
  }>;
}

const ReadingPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const surahId = parseInt(id || "1", 10);

  // State for reading mode
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(50);
  const [currentAyah, setCurrentAyah] = useState(1);

  // Dialog states
  const [isAyahJumpDialogOpen, setIsAyahJumpDialogOpen] = useState(false);
  const [isBookmarkDialogOpen, setIsBookmarkDialogOpen] = useState(false);

  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Surah data state
  const [surahData, setSurahData] = useState<SurahData>({
    id: surahId,
    name: "الفاتحة",
    englishName: "Al-Fatiha",
    ayahs: [],
  });

  // Fetch surah data from API
  useEffect(() => {
    const fetchSurahData = async () => {
      setLoading(true);
      setError(null);

      try {
        const { surah, combinedAyahs } = await getSurahWithTranslation(surahId);

        setSurahData({
          id: surah.number,
          name: surah.name,
          englishName: surah.englishName,
          englishNameTranslation: surah.englishNameTranslation,
          ayahs: combinedAyahs.map((ayah) => ({
            number: ayah.number,
            text: ayah.text,
            translation: ayah.translation,
          })),
        });
      } catch (err) {
        console.error("Failed to fetch surah data for reading:", err);
        setError("Failed to load surah data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSurahData();
  }, [surahId]);

  // Handle auto-scroll toggle
  const handleToggleAutoScroll = () => {
    setIsAutoScrolling((prev) => !prev);
  };

  // Handle scroll speed change
  const handleScrollSpeedChange = (speed: number) => {
    setScrollSpeed(speed);
  };

  // Navigation handlers
  const handleNavigateBack = () => {
    navigate(`/surah/${surahId}`);
  };

  const handleNavigateHome = () => {
    navigate("/");
  };

  const handleNavigatePrevious = () => {
    if (surahId > 1) {
      navigate(`/reading/${surahId - 1}`);
    }
  };

  const handleNavigateNext = () => {
    if (surahId < 114) {
      // 114 is the total number of surahs in the Quran
      navigate(`/reading/${surahId + 1}`);
    }
  };

  // Dialog handlers
  const handleOpenAyahJumpDialog = () => {
    setIsAyahJumpDialogOpen(true);
  };

  const handleOpenBookmarkDialog = () => {
    setIsBookmarkDialogOpen(true);
  };

  const handleOpenSettings = () => {
    // This would open settings dialog or navigate to settings
    console.log("Open settings");
  };

  // Ayah jump handler
  const handleJumpToAyah = (ayahNumber: number) => {
    setCurrentAyah(ayahNumber);
    // The QuranText component would handle scrolling to this ayah
  };

  // Bookmark save handler
  const handleSaveBookmark = (bookmark: {
    surahId: number;
    ayahNumber: number;
    title: string;
    notes: string;
  }) => {
    // In a real app, this would save to local storage or a database
    console.log("Bookmark saved:", bookmark);
  };

  // Track current ayah in view
  const handleAyahInView = (ayahNumber: number) => {
    setCurrentAyah(ayahNumber);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading surah...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="text-center p-6 max-w-md bg-card rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-destructive mb-2">Error</h2>
          <p className="text-muted-foreground">{error}</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Main reading area */}
      <div className="flex-1 overflow-hidden pb-32">
        <QuranText
          surahId={surahId}
          ayahs={surahData.ayahs}
          autoScroll={isAutoScrolling}
          scrollSpeed={scrollSpeed}
          onAyahView={handleAyahInView}
        />
      </div>

      {/* Controls */}
      <ReadingControls
        isAutoScrolling={isAutoScrolling}
        scrollSpeed={scrollSpeed}
        onToggleAutoScroll={handleToggleAutoScroll}
        onChangeScrollSpeed={handleScrollSpeedChange}
        onNavigateBack={handleNavigateBack}
        onNavigateHome={handleNavigateHome}
        onNavigatePrevious={handleNavigatePrevious}
        onNavigateNext={handleNavigateNext}
        onOpenBookmarkDialog={handleOpenBookmarkDialog}
        onOpenAyahJumpDialog={handleOpenAyahJumpDialog}
        onOpenSettings={handleOpenSettings}
        currentSurah={{
          id: surahData.id,
          name: surahData.name,
          englishName: surahData.englishName,
        }}
      />

      {/* Dialogs */}
      <AyahJumpDialog
        open={isAyahJumpDialogOpen}
        onOpenChange={setIsAyahJumpDialogOpen}
        onJump={handleJumpToAyah}
        maxAyahs={surahData.ayahs.length}
        currentSurah={surahData.englishName}
      />

      <BookmarkDialog
        surahId={surahData.id}
        ayahNumber={currentAyah}
        surahName={surahData.englishName}
        isOpen={isBookmarkDialogOpen}
        onOpenChange={setIsBookmarkDialogOpen}
        onSaveBookmark={handleSaveBookmark}
      />
    </div>
  );
};

export default ReadingPage;
