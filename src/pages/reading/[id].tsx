import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReadingControls from "@/components/reading/ReadingControls";
import QuranText from "@/components/reading/QuranText";
import AyahJumpDialog from "@/components/reading/AyahJumpDialog";
import BookmarkDialog from "@/components/reading/BookmarkDialog";

interface SurahData {
  id: number;
  name: string;
  englishName: string;
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

  // Mock surah data - in a real app, this would be fetched from the API
  const [surahData, setSurahData] = useState<SurahData>({
    id: surahId,
    name: "الفاتحة",
    englishName: "Al-Fatiha",
    ayahs: [
      {
        number: 1,
        text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        translation:
          "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
      },
      {
        number: 2,
        text: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
        translation: "All praise is due to Allah, Lord of the worlds.",
      },
      {
        number: 3,
        text: "الرَّحْمَٰنِ الرَّحِيمِ",
        translation: "The Entirely Merciful, the Especially Merciful.",
      },
      {
        number: 4,
        text: "مَالِكِ يَوْمِ الدِّينِ",
        translation: "Sovereign of the Day of Recompense.",
      },
      {
        number: 5,
        text: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
        translation: "It is You we worship and You we ask for help.",
      },
      {
        number: 6,
        text: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
        translation: "Guide us to the straight path.",
      },
      {
        number: 7,
        text: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
        translation:
          "The path of those upon whom You have bestowed favor, not of those who have earned [Your] anger or of those who are astray.",
      },
    ],
  });

  // Fetch surah data effect - simulated
  useEffect(() => {
    // In a real app, this would be an API call
    // fetchSurahData(surahId).then(data => setSurahData(data));

    // For now, we'll just update the ID in our mock data
    setSurahData((prevData) => ({
      ...prevData,
      id: surahId,
    }));
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
