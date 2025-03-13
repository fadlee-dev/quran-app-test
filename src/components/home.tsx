import React, { useState, useEffect } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import Header from "./layout/Header";
import TabNavigation from "./navigation/TabNavigation";
import SurahList from "./surah/SurahList";
import BookmarkList from "./bookmarks/BookmarkList";
import SettingsPanel from "./settings/SettingsPanel";
import MetaTags from "./seo/MetaTags";

const Home = () => {
  const [activeTab, setActiveTab] = useState("surahs");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else if (savedTheme === "light") {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      // Use system preference if no saved preference
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleThemeToggle = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      if (newMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return newMode;
    });
  };

  const handleSurahSelect = (surahId: number) => {
    // In a real implementation, this would navigate to the surah detail page
    console.log(`Selected surah: ${surahId}`);
  };

  const handleViewBookmark = (bookmark: any) => {
    // In a real implementation, this would navigate to the specific ayah in reading mode
    console.log("View bookmark:", bookmark);
  };

  const handleDeleteBookmark = (bookmarkId: string) => {
    // In a real implementation, this would delete the bookmark from storage
    console.log(`Delete bookmark: ${bookmarkId}`);
  };

  const handleSaveSettings = (settings: any) => {
    // Apply theme setting if it changed
    if (settings.theme === "dark" && !isDarkMode) {
      handleThemeToggle();
    } else if (settings.theme === "light" && isDarkMode) {
      handleThemeToggle();
    }

    // Save other settings
    localStorage.setItem("quranAppSettings", JSON.stringify(settings));
    console.log("Save settings:", settings);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <MetaTags
        title="Quran App - Read, Reflect, Remember"
        description="A modern Quran reading application with auto-scroll, bookmarks, and multiple translations. Read the Holy Quran with ease on any device."
      />
      <Header
        title="Quran App"
        isDarkMode={isDarkMode}
        onThemeToggle={handleThemeToggle}
      />

      <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />

      <main className="flex-1 overflow-hidden">
        <Tabs value={activeTab} className="w-full h-full">
          <TabsContent value="surahs" className="h-full">
            <SurahList onSurahSelect={handleSurahSelect} />
          </TabsContent>

          <TabsContent value="bookmarks" className="h-full">
            <BookmarkList
              onViewBookmark={handleViewBookmark}
              onDeleteBookmark={handleDeleteBookmark}
            />
          </TabsContent>

          <TabsContent value="settings" className="h-full">
            <SettingsPanel
              onSave={handleSaveSettings}
              initialSettings={{ theme: isDarkMode ? "dark" : "light" }}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Home;
