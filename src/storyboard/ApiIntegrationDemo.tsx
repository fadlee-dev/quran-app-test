import React, { useState, useEffect } from "react";
import { getAllSurahs, getSurahWithTranslation } from "@/services/quranService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const ApiIntegrationDemo = () => {
  const [surahs, setSurahs] = useState([]);
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [surahDetails, setSurahDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSurahs = async () => {
      setLoading(true);
      try {
        const data = await getAllSurahs();
        setSurahs(data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch surahs:", err);
        setError("Failed to load surahs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSurahs();
  }, []);

  const handleSurahSelect = async (surahNumber) => {
    setSelectedSurah(surahNumber);
    setLoading(true);

    try {
      const data = await getSurahWithTranslation(surahNumber);
      setSurahDetails(data);
      setError(null);
    } catch (err) {
      console.error(`Failed to fetch surah ${surahNumber}:`, err);
      setError(`Failed to load Surah ${surahNumber}. Please try again later.`);
      setSurahDetails(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-background min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Quran API Integration Demo</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Surah List</CardTitle>
          </CardHeader>
          <CardContent>
            {loading && !surahDetails ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : error && !surahDetails ? (
              <div className="text-destructive text-center py-8">{error}</div>
            ) : (
              <ScrollArea className="h-[400px]">
                <div className="space-y-2">
                  {surahs.slice(0, 20).map((surah) => (
                    <Button
                      key={surah.number}
                      variant={
                        selectedSurah === surah.number ? "default" : "outline"
                      }
                      className="w-full justify-between"
                      onClick={() => handleSurahSelect(surah.number)}
                    >
                      <span>
                        {surah.number}. {surah.englishName}
                      </span>
                      <span className="text-xs">{surah.revelationType}</span>
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Surah Details</CardTitle>
          </CardHeader>
          <CardContent>
            {loading && surahDetails ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : error && selectedSurah ? (
              <div className="text-destructive text-center py-8">{error}</div>
            ) : surahDetails ? (
              <div>
                <div className="mb-4">
                  <h2 className="text-xl font-bold">
                    {surahDetails.surah.englishName}
                  </h2>
                  <p className="text-muted-foreground">
                    {surahDetails.surah.englishNameTranslation}
                  </p>
                  <p className="text-right text-xl font-arabic mt-2">
                    {surahDetails.surah.name}
                  </p>
                </div>

                <ScrollArea className="h-[350px]">
                  <div className="space-y-4">
                    {surahDetails.combinedAyahs.slice(0, 5).map((ayah) => (
                      <div key={ayah.number} className="border-b pb-3">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center text-sm">
                            {ayah.number}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            Juz {ayah.juz} | Page {ayah.page}
                          </span>
                        </div>
                        <p className="text-right text-lg mb-2 font-arabic">
                          {ayah.text}
                        </p>
                        <p className="text-muted-foreground text-sm">
                          {ayah.translation}
                        </p>
                      </div>
                    ))}
                    {surahDetails.combinedAyahs.length > 5 && (
                      <p className="text-center text-muted-foreground">
                        Showing first 5 ayahs of{" "}
                        {surahDetails.combinedAyahs.length} total
                      </p>
                    )}
                  </div>
                </ScrollArea>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                Select a surah to view details
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ApiIntegrationDemo;
