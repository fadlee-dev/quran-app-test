import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Search, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

interface SurahListProps {
  surahs?: Surah[];
  isLoading?: boolean;
  onSurahSelect?: (surahId: number) => void;
}

const SurahList = ({
  surahs = [
    {
      number: 1,
      name: "الفاتحة",
      englishName: "Al-Fatiha",
      englishNameTranslation: "The Opening",
      numberOfAyahs: 7,
      revelationType: "Meccan",
    },
    {
      number: 2,
      name: "البقرة",
      englishName: "Al-Baqarah",
      englishNameTranslation: "The Cow",
      numberOfAyahs: 286,
      revelationType: "Medinan",
    },
    {
      number: 3,
      name: "آل عمران",
      englishName: "Aal-Imran",
      englishNameTranslation: "The Family of Imran",
      numberOfAyahs: 200,
      revelationType: "Medinan",
    },
    {
      number: 4,
      name: "النساء",
      englishName: "An-Nisa",
      englishNameTranslation: "The Women",
      numberOfAyahs: 176,
      revelationType: "Medinan",
    },
    {
      number: 5,
      name: "المائدة",
      englishName: "Al-Ma'idah",
      englishNameTranslation: "The Table Spread",
      numberOfAyahs: 120,
      revelationType: "Medinan",
    },
  ],
  isLoading = false,
  onSurahSelect = () => {},
}: SurahListProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSurahs = surahs.filter(
    (surah) =>
      surah.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      surah.englishNameTranslation
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      surah.number.toString().includes(searchQuery),
  );

  return (
    <div className="w-full h-full bg-background p-4">
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search surah by name or number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="space-y-3">
            {filteredSurahs.map((surah) => (
              <Link to={`/surah/${surah.number}`} key={surah.number}>
                <Card
                  className={cn(
                    "cursor-pointer hover:bg-accent transition-colors",
                    "border-l-4 border-l-primary",
                  )}
                  onClick={() => onSurahSelect(surah.number)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-semibold">
                          {surah.number}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">
                            {surah.englishName}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {surah.englishNameTranslation}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <p className="text-xl font-arabic">{surah.name}</p>
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                          <BookOpen className="h-3 w-3 mr-1" />
                          <span>{surah.numberOfAyahs} verses</span>
                          <span className="ml-2 px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground text-xs">
                            {surah.revelationType}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}

            {filteredSurahs.length === 0 && (
              <div className="text-center py-10">
                <p className="text-muted-foreground">
                  No surahs found matching your search.
                </p>
                <Button
                  variant="ghost"
                  onClick={() => setSearchQuery("")}
                  className="mt-2"
                >
                  Clear search
                </Button>
              </div>
            )}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default SurahList;
