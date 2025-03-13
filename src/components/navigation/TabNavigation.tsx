import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Home, BookMarked, Settings } from "lucide-react";

interface TabNavigationProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const TabNavigation = ({
  activeTab = "surahs",
  onTabChange,
}: TabNavigationProps) => {
  const [currentTab, setCurrentTab] = useState(activeTab);

  const handleTabChange = (value: string) => {
    setCurrentTab(value);
    if (onTabChange) {
      onTabChange(value);
    }
  };

  return (
    <div className="w-full bg-background border-b">
      <Tabs
        defaultValue={currentTab}
        onValueChange={handleTabChange}
        className="w-full max-w-3xl mx-auto"
      >
        <TabsList className="grid grid-cols-3 w-full h-10">
          <TabsTrigger
            value="surahs"
            className="flex items-center gap-2 text-xs"
          >
            <Home size={16} />
            <span className="hidden sm:inline">Surahs</span>
          </TabsTrigger>
          <TabsTrigger
            value="bookmarks"
            className="flex items-center gap-2 text-xs"
          >
            <BookMarked size={16} />
            <span className="hidden sm:inline">Bookmarks</span>
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="flex items-center gap-2 text-xs"
          >
            <Settings size={16} />
            <span className="hidden sm:inline">Settings</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default TabNavigation;
