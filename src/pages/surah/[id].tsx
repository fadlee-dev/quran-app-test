import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SurahHeader from "@/components/surah/SurahHeader";
import AyahList from "@/components/surah/AyahList";
import SurahNavigation from "@/components/navigation/SurahNavigation";

interface Ayah {
  number: number;
  text: string;
  translation: string;
  juz: number;
  page: number;
}

interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  numberOfAyahs: number;
  ayahs: Ayah[];
}

const SurahPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const surahId = parseInt(id || "1", 10);

  const [surah, setSurah] = useState<Surah>({
    number: surahId,
    name: "الفاتحة",
    englishName: "Al-Fatiha",
    englishNameTranslation: "The Opening",
    revelationType: "Meccan",
    numberOfAyahs: 7,
    ayahs: [
      {
        number: 1,
        text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        translation:
          "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
        juz: 1,
        page: 1,
      },
      {
        number: 2,
        text: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
        translation: "[All] praise is [due] to Allah, Lord of the worlds -",
        juz: 1,
        page: 1,
      },
      {
        number: 3,
        text: "الرَّحْمَٰنِ الرَّحِيمِ",
        translation: "The Entirely Merciful, the Especially Merciful,",
        juz: 1,
        page: 1,
      },
      {
        number: 4,
        text: "مَالِكِ يَوْمِ الدِّينِ",
        translation: "Sovereign of the Day of Recompense.",
        juz: 1,
        page: 1,
      },
      {
        number: 5,
        text: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
        translation: "It is You we worship and You we ask for help.",
        juz: 1,
        page: 1,
      },
      {
        number: 6,
        text: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
        translation: "Guide us to the straight path -",
        juz: 1,
        page: 1,
      },
      {
        number: 7,
        text: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
        translation:
          "The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.",
        juz: 1,
        page: 1,
      },
    ],
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showTranslation, setShowTranslation] = useState<boolean>(true);

  useEffect(() => {
    // In a real implementation, this would fetch data from the alquran.cloud API
    // For now, we're just simulating a data fetch with our default state
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Update surah number based on the URL parameter
      setSurah((prev) => ({
        ...prev,
        number: surahId,
      }));
      setLoading(false);
    }, 500);
  }, [surahId]);

  const handleBackClick = () => {
    navigate("/");
  };

  const handleReadClick = () => {
    navigate(`/reading/${surahId}`);
  };

  const handlePreviousSurah = () => {
    if (surahId > 1) {
      navigate(`/surah/${surahId - 1}`);
    }
  };

  const handleNextSurah = () => {
    if (surahId < 114) {
      navigate(`/surah/${surahId + 1}`);
    }
  };

  const handleBookmark = (ayahNumber: number) => {
    // In a real implementation, this would save the bookmark
    console.log(`Bookmarked Surah ${surahId}, Ayah ${ayahNumber}`);
    // Example implementation could store in localStorage or a database
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
    <div className="min-h-screen bg-background pb-20">
      <SurahHeader
        surahNumber={surah.number}
        surahName={surah.englishName}
        surahNameArabic={surah.name}
        revelationType={surah.revelationType}
        versesCount={surah.numberOfAyahs}
        onBackClick={handleBackClick}
        onReadClick={handleReadClick}
        onPreviousSurah={handlePreviousSurah}
        onNextSurah={handleNextSurah}
      />

      <main className="container mx-auto px-4 py-6">
        <AyahList
          ayahs={surah.ayahs}
          surahName={surah.englishName}
          surahNumber={surah.number}
          onBookmark={handleBookmark}
          showTranslation={showTranslation}
        />
      </main>

      <SurahNavigation
        surahId={surah.number}
        totalSurahs={114}
        onReadingModeClick={handleReadClick}
      />
    </div>
  );
};

export default SurahPage;
