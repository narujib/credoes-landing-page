"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle({ onToggle }: { onToggle?: () => void } = {}) {
  const { theme, resolvedTheme, setTheme } = useTheme();

  const handleToggleTheme = () => {
    const currentTheme = resolvedTheme || theme || "light";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    if (typeof document !== "undefined" && "startViewTransition" in document) {
      (
        document as unknown as { startViewTransition: (cb: () => void) => void }
      ).startViewTransition(() => {
        setTheme(nextTheme);
      });
    } else {
      setTheme(nextTheme);
    }

    onToggle?.();
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggleTheme}
      aria-label="Toggle theme"
      className="h-9 w-9 rounded-full transition-all duration-300 ease-in-out hover:bg-primary-foreground/15 text-primary-foreground cursor-pointer"
    >
      <Sun className="h-5 w-5 scale-100 rotate-0 transition-all duration-500 ease-in-out dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-5 w-5 scale-0 rotate-90 transition-all duration-500 ease-in-out dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
