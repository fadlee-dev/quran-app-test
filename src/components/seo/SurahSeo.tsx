import React from "react";
import MetaTags from "./MetaTags";

interface SurahSeoProps {
  surahNumber: number;
  surahName: string;
  englishName: string;
  englishNameTranslation: string;
  versesCount: number;
}

const SurahSeo = ({
  surahNumber,
  surahName,
  englishName,
  englishNameTranslation,
  versesCount,
}: SurahSeoProps) => {
  const title = `Surah ${englishName} (${surahName}) - Quran App`;
  const description = `Read Surah ${englishName} (${englishNameTranslation}) with ${versesCount} verses. The ${englishNameTranslation} chapter of the Holy Quran with translation and auto-scroll reading mode.`;
  const canonicalUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/surah/${surahNumber}`
      : `/surah/${surahNumber}`;

  return (
    <MetaTags
      title={title}
      description={description}
      canonicalUrl={canonicalUrl}
    />
  );
};

export default SurahSeo;
