import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReadingControls from "@/components/reading/ReadingControls";
import QuranText from "@/components/reading/QuranText";
import AyahJumpDialog from "@/components/reading/AyahJumpDialog";
import BookmarkDialog from "@/components/reading/BookmarkDialog";
import { getSurahWithTranslation } from "@/services/quranService";
import MetaTags from "@/components/seo/MetaTags";

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
  const [wakeLock, setWakeLock] = useState<any>(null);
  const [scrollSpeed, setScrollSpeed] = useState(() => {
    try {
      // Get saved scroll speed from localStorage or use default
      const savedSpeed = localStorage.getItem("scrollSpeed");
      return savedSpeed ? parseInt(savedSpeed, 10) : 30; // Default to a slower speed
    } catch (e) {
      // In case localStorage is not available
      return 30;
    }
  });
  const [showTranslation, setShowTranslation] = useState(() => {
    try {
      // Get saved translation preference from localStorage or use default
      const savedPref = localStorage.getItem("showTranslation");
      return savedPref !== null ? savedPref === "true" : true; // Default to showing translation
    } catch (e) {
      // In case localStorage is not available
      return true;
    }
  });
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
  // Handle visibility change to reacquire wake lock if needed
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (
        document.visibilityState === "visible" &&
        isAutoScrolling &&
        !wakeLock
      ) {
        requestWakeLock();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      // Release wake lock when component unmounts
      releaseWakeLock();
    };
  }, [isAutoScrolling, wakeLock]);

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

  // Handle auto-scroll toggle and wake lock
  const handleToggleAutoScroll = async () => {
    setIsAutoScrolling((prev) => {
      const newValue = !prev;

      // Request or release wake lock based on auto-scroll state
      if (newValue) {
        requestWakeLock();
      } else {
        releaseWakeLock();
      }

      return newValue;
    });
  };

  // Request wake lock to prevent device from sleeping
  const requestWakeLock = async () => {
    try {
      if ("wakeLock" in navigator) {
        const lock = await navigator.wakeLock.request("screen");
        setWakeLock(lock);

        // Add event listener to reacquire wake lock if it's released
        lock.addEventListener("release", () => {
          // Only try to reacquire if still auto-scrolling
          if (isAutoScrolling) {
            requestWakeLock();
          }
        });

        console.log("Wake Lock acquired");
      } else {
        console.log("Wake Lock API not supported in this browser");
      }
    } catch (err) {
      console.error("Failed to acquire Wake Lock:", err);
    }
  };

  // Release wake lock when auto-scroll is disabled
  const releaseWakeLock = () => {
    if (wakeLock) {
      wakeLock
        .release()
        .then(() => {
          console.log("Wake Lock released");
          setWakeLock(null);
        })
        .catch((err: any) => {
          console.error("Failed to release Wake Lock:", err);
        });
    }
  };

  // Handle scroll speed change
  const handleScrollSpeedChange = (speed: number) => {
    // Store the scroll speed in localStorage for persistence
    try {
      localStorage.setItem("scrollSpeed", speed.toString());
    } catch (e) {
      console.warn("Could not save scroll speed to localStorage", e);
    }
    setScrollSpeed(speed);
  };

  // Handle translation toggle
  const handleToggleTranslation = () => {
    setShowTranslation((prev) => {
      const newValue = !prev;
      // Store the preference in localStorage
      try {
        localStorage.setItem("showTranslation", newValue.toString());
      } catch (e) {
        console.warn(
          "Could not save translation preference to localStorage",
          e,
        );
      }
      return newValue;
    });
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
      <MetaTags
        title={`Reading Surah ${surahData.englishName} - Quran App`}
        description={`Read Surah ${surahData.englishName} in reading mode with auto-scroll functionality and translation options. Immerse yourself in the Holy Quran.`}
        canonicalUrl={
          typeof window !== "undefined"
            ? `${window.location.origin}/reading/${surahId}`
            : `/reading/${surahId}`
        }
      />
      {/* Main reading area */}
      <div className="flex-1 overflow-hidden pb-32">
        <QuranText
          surahId={surahId}
          ayahs={surahData.ayahs}
          autoScroll={isAutoScrolling}
          scrollSpeed={scrollSpeed}
          showTranslation={showTranslation}
          onAyahView={handleAyahInView}
        />
      </div>

      {/* Controls */}
      <ReadingControls
        isAutoScrolling={isAutoScrolling}
        scrollSpeed={scrollSpeed}
        showTranslation={showTranslation}
        onToggleAutoScroll={handleToggleAutoScroll}
        onChangeScrollSpeed={handleScrollSpeedChange}
        onToggleTranslation={handleToggleTranslation}
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
