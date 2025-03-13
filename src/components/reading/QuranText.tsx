import React, { useState, useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

interface QuranTextProps {
  surahId?: number;
  ayahs?: Array<{
    number: number;
    text: string;
    translation?: string;
  }>;
  autoScroll?: boolean;
  scrollSpeed?: number;
  showTranslation?: boolean;
  onAyahView?: (ayahNumber: number) => void;
}

const QuranText = ({
  surahId = 1,
  ayahs = [
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
  autoScroll = false,
  scrollSpeed = 1,
  showTranslation = true,
  onAyahView = () => {},
}: QuranTextProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentAyah, setCurrentAyah] = useState(1);
  const [isScrolling, setIsScrolling] = useState(autoScroll);

  // Set up intersection observer to detect which ayah is in view
  useEffect(() => {
    const options = {
      root: scrollRef.current,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const ayahNumber = parseInt(
            entry.target.getAttribute("data-ayah-number") || "1",
          );
          setCurrentAyah(ayahNumber);
          onAyahView(ayahNumber);
        }
      });
    }, options);

    // Observe all ayah elements
    document.querySelectorAll("[data-ayah-number]").forEach((ayah) => {
      observer.observe(ayah);
    });

    return () => {
      observer.disconnect();
    };
  }, [onAyahView]);

  // Handle auto-scrolling
  useEffect(() => {
    setIsScrolling(autoScroll);
  }, [autoScroll]);

  useEffect(() => {
    let scrollInterval: number | null = null;

    if (isScrolling && scrollRef.current) {
      // Calculate scroll speed based on the user's preference
      // Higher number = faster scroll (reversed from the UI where higher = slower)
      // Reduce the speed by dividing by a larger number to make it slower
      const scrollStep = scrollSpeed / 50;

      scrollInterval = window.setInterval(() => {
        const scrollContainer = scrollRef.current?.querySelector(
          "[data-radix-scroll-area-viewport]",
        );
        if (scrollContainer) {
          scrollContainer.scrollTop += scrollStep;

          // If we've reached the bottom, stop scrolling
          const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
          if (scrollTop + clientHeight >= scrollHeight - 20) {
            setIsScrolling(false);
          }
        }
      }, 50) as unknown as number;
    }

    return () => {
      if (scrollInterval) {
        clearInterval(scrollInterval);
      }
    };
  }, [isScrolling, scrollSpeed]);

  // Jump to a specific ayah
  const scrollToAyah = (ayahNumber: number) => {
    const ayahElement = document.querySelector(
      `[data-ayah-number="${ayahNumber}"]`,
    );
    if (ayahElement && scrollRef.current) {
      ayahElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Card className="w-full h-full bg-background border-0 shadow-none overflow-hidden">
      <ScrollArea ref={scrollRef} className="h-full w-full p-4 md:p-6 lg:p-8">
        <div className="max-w-3xl mx-auto space-y-12">
          {ayahs.map((ayah) => (
            <div
              key={ayah.number}
              data-ayah-number={ayah.number}
              className={`relative py-4 ${currentAyah === ayah.number ? "bg-muted/30 rounded-lg p-4" : ""}`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium">
                  {ayah.number}
                </div>
                <div className="space-y-4 w-full">
                  <p
                    className="text-2xl md:text-3xl leading-relaxed text-right font-quran"
                    dir="rtl"
                  >
                    {ayah.text}
                  </p>
                  {showTranslation && ayah.translation && (
                    <p className="text-base md:text-lg text-muted-foreground">
                      {ayah.translation}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default QuranText;
