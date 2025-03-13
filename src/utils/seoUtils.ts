/**
 * Generates structured data for a Quran surah in JSON-LD format
 */
export const generateSurahStructuredData = ({
  surahNumber,
  surahName,
  englishName,
  englishNameTranslation,
  versesCount,
  url,
}: {
  surahNumber: number;
  surahName: string;
  englishName: string;
  englishNameTranslation: string;
  versesCount: number;
  url: string;
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "Book",
    name: `Surah ${englishName} (${surahName})`,
    alternateName: surahName,
    description: `${englishNameTranslation} - Chapter ${surahNumber} of the Holy Quran with ${versesCount} verses.`,
    url: url,
    inLanguage: ["ar", "en"],
    numberOfPages: 1,
    bookFormat: "EBook",
    potentialAction: {
      "@type": "ReadAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${url.replace("/surah/", "/reading/")}`,
      },
    },
    isPartOf: {
      "@type": "Book",
      name: "The Holy Quran",
      description: "The central religious text of Islam.",
    },
  };
};

/**
 * Injects structured data into the document head
 */
export const injectStructuredData = (data: any) => {
  // Check if we're in a browser environment
  if (typeof document === "undefined") return;

  // Remove any existing structured data script
  const existingScript = document.getElementById("structured-data");
  if (existingScript) {
    existingScript.remove();
  }

  // Create and inject new script
  const script = document.createElement("script");
  script.id = "structured-data";
  script.type = "application/ld+json";
  script.innerHTML = JSON.stringify(data);
  document.head.appendChild(script);
};
