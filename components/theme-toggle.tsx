"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className="h-10 w-10 rounded-full border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900"
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="
        flex h-10 w-10 items-center justify-center
        rounded-full
        border
        border-gray-200
        bg-white
        text-gray-700
        shadow-sm
        transition-all
        duration-300
        hover:bg-gray-100
        hover:-translate-y-0.5
        dark:border-gray-700
        dark:bg-gray-900
        dark:text-yellow-300
        dark:hover:bg-gray-800
      "
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}