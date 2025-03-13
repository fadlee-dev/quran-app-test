import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Bookmark, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface Ayah {
  number: number;
  text: string;
  translation: string;
  juz: number;
  page: number;
}

interface AyahListProps {
  ayahs?: Ayah[];
  surahName?: string;
  surahNumber?: number;
  onBookmark?: (ayahNumber: number) => void;
  showTranslation?: boolean;
}

const AyahList: React.FC<AyahListProps> = ({
  ayahs = [
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
  ],
  surahName = "Al-Fatihah",
  surahNumber = 1,
  onBookmark = () => {},
  showTranslation = true,
}) => {
  const [expandedAyahs, setExpandedAyahs] = useState<number[]>([]);

  const toggleAyahExpansion = (ayahNumber: number) => {
    setExpandedAyahs((prev) =>
      prev.includes(ayahNumber)
        ? prev.filter((num) => num !== ayahNumber)
        : [...prev, ayahNumber],
    );
  };

  const isAyahExpanded = (ayahNumber: number) => {
    return expandedAyahs.includes(ayahNumber);
  };

  return (
    <div className="w-full bg-background p-4 rounded-lg shadow-sm">
      <div className="mb-4 text-center">
        <h2 className="text-2xl font-bold text-primary">{surahName}</h2>
        <p className="text-muted-foreground">Surah {surahNumber}</p>
      </div>

      <ScrollArea className="h-[70vh] w-full pr-4">
        <div className="space-y-6">
          {ayahs.map((ayah) => (
            <div
              key={ayah.number}
              className="border border-border rounded-lg p-4 bg-card hover:bg-card/90 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-medium">
                    {ayah.number}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Juz {ayah.juz} | Page {ayah.page}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onBookmark(ayah.number)}
                    className="h-8 w-8"
                  >
                    <Bookmark className="h-4 w-4" />
                  </Button>
                  {showTranslation && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleAyahExpansion(ayah.number)}
                      className="h-8 w-8"
                    >
                      {isAyahExpanded(ayah.number) ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <p className="text-right text-xl leading-loose font-arabic">
                  {ayah.text}
                </p>
                {showTranslation && isAyahExpanded(ayah.number) && (
                  <div
                    className={cn(
                      "mt-3 pt-3 border-t border-border text-muted-foreground",
                    )}
                  >
                    <p>{ayah.translation}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default AyahList;
