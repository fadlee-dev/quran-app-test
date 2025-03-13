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
    <header className="w-full h-16 bg-background border-b border-border flex items-center justify-between px-4 sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="md:hidden"
        >
          <MenuIcon className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold text-foreground">{title}</h1>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onThemeToggle}
          aria-label={
            isDarkMode ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          {isDarkMode ? (
            <SunIcon className="h-5 w-5" />
          ) : (
            <MoonIcon className="h-5 w-5" />
          )}
        </Button>
      </div>
    </header>
  );
};

export default Header;
