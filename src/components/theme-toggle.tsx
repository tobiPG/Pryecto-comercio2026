"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isLight ? "Cambiar a modo oscuro" : "Cambiar a modo claro"}
      className="relative flex h-10 w-10 items-center justify-center rounded-full border border-surface-border text-foreground transition-colors hover:border-accent hover:text-accent"
    >
      <motion.span
        key={theme}
        initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {isLight ? <Moon size={17} /> : <Sun size={17} />}
      </motion.span>
    </button>
  );
}
