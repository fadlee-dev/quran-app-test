import React, { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import Header from "./layout/Header";
import TabNavigation from "./navigation/TabNavigation";
import SurahList from "./surah/SurahList";
import BookmarkList from "./bookmarks/BookmarkList";
import SettingsPanel from "./settings/SettingsPanel";

const Home = () => {
  const [activeTab, setActiveTab] = useState("surahs");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    // In a real implementation, this would update the theme in the app context or localStorage
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
    // In a real implementation, this would save settings to storage
    console.log("Save settings:", settings);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
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
            <SettingsPanel onSave={handleSaveSettings} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Home;
