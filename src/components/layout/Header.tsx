import React from "react";
import { MoonIcon, SunIcon, MenuIcon } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface HeaderProps {
  title?: string;
  onThemeToggle?: () => void;
  isDarkMode?: boolean;
  onMenuClick?: () => void;
}

const Header = ({
  title = "Quran App",
  onThemeToggle = () => {},
  isDarkMode = false,
  onMenuClick = () => {},
}: HeaderProps) => {
  return (
    <header className="w-full h-12 bg-background border-b border-border flex items-center justify-between px-4 sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="md:hidden h-8 w-8"
        >
          <MenuIcon className="h-4 w-4" />
        </Button>
        <h1 className="text-lg font-bold text-foreground">{title}</h1>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onThemeToggle}
          className="h-8 w-8"
          aria-label={
            isDarkMode ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          {isDarkMode ? (
            <SunIcon className="h-4 w-4" />
          ) : (
            <MoonIcon className="h-4 w-4" />
          )}
        </Button>
      </div>
    </header>
  );
};

export default Header;
