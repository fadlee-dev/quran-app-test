import React, { useState } from "react";
import { Moon, Sun, Languages, Save } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface SettingsPanelProps {
  onSave?: (settings: SettingsState) => void;
}

interface SettingsState {
  theme: "light" | "dark";
  translationLanguage: string;
  autoScrollEnabled: boolean;
  scrollSpeed: string;
  fontSizeArabic: string;
  fontSizeTranslation: string;
}

const SettingsPanel = ({ onSave = () => {} }: SettingsPanelProps) => {
  const [settings, setSettings] = useState<SettingsState>({
    theme: "light",
    translationLanguage: "english",
    autoScrollEnabled: false,
    scrollSpeed: "medium",
    fontSizeArabic: "large",
    fontSizeTranslation: "medium",
  });

  const handleThemeToggle = () => {
    setSettings((prev) => ({
      ...prev,
      theme: prev.theme === "light" ? "dark" : "light",
    }));
  };

  const handleAutoScrollToggle = () => {
    setSettings((prev) => ({
      ...prev,
      autoScrollEnabled: !prev.autoScrollEnabled,
    }));
  };

  const handleSettingChange = (key: keyof SettingsState, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSaveSettings = () => {
    onSave(settings);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-background">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sun className="h-5 w-5" />
            <Moon className="h-5 w-5" />
            Appearance
          </CardTitle>
          <CardDescription>
            Customize the appearance of the application
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Theme</h3>
              <p className="text-sm text-muted-foreground">
                Switch between light and dark mode
              </p>
            </div>
            <Switch
              checked={settings.theme === "dark"}
              onCheckedChange={handleThemeToggle}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Languages className="h-5 w-5" />
            Translation
          </CardTitle>
          <CardDescription>Configure translation preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col space-y-2">
            <h3 className="font-medium">Translation Language</h3>
            <Select
              value={settings.translationLanguage}
              onValueChange={(value) =>
                handleSettingChange("translationLanguage", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="french">French</SelectItem>
                <SelectItem value="spanish">Spanish</SelectItem>
                <SelectItem value="german">German</SelectItem>
                <SelectItem value="indonesian">Indonesian</SelectItem>
                <SelectItem value="turkish">Turkish</SelectItem>
                <SelectItem value="urdu">Urdu</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Reading Preferences</CardTitle>
          <CardDescription>Customize your reading experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Auto-Scroll</h3>
              <p className="text-sm text-muted-foreground">
                Enable automatic scrolling while reading
              </p>
            </div>
            <Switch
              checked={settings.autoScrollEnabled}
              onCheckedChange={handleAutoScrollToggle}
            />
          </div>

          <Separator className="my-4" />

          <div className="flex flex-col space-y-2">
            <h3 className="font-medium">Scroll Speed</h3>
            <Select
              value={settings.scrollSpeed}
              onValueChange={(value) =>
                handleSettingChange("scrollSpeed", value)
              }
              disabled={!settings.autoScrollEnabled}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select speed" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="very-slow">Very Slow</SelectItem>
                <SelectItem value="slow">Slow</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="fast">Fast</SelectItem>
                <SelectItem value="very-fast">Very Fast</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator className="my-4" />

          <div className="flex flex-col space-y-2">
            <h3 className="font-medium">Arabic Text Size</h3>
            <Select
              value={settings.fontSizeArabic}
              onValueChange={(value) =>
                handleSettingChange("fontSizeArabic", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
                <SelectItem value="x-large">Extra Large</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator className="my-4" />

          <div className="flex flex-col space-y-2">
            <h3 className="font-medium">Translation Text Size</h3>
            <Select
              value={settings.fontSizeTranslation}
              onValueChange={(value) =>
                handleSettingChange("fontSizeTranslation", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
                <SelectItem value="x-large">Extra Large</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          onClick={handleSaveSettings}
          className="flex items-center gap-2"
        >
          <Save className="h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default SettingsPanel;
