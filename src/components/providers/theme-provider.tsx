"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Theme = "dark" | "light";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "lueur-theme";

// Script que se inyecta antes de la hidratación para evitar parpadeo
// (aplica el tema guardado -o el oscuro por defecto- de inmediato).
export const themeInitScript = `
(function () {
  try {
    var saved = localStorage.getItem('${STORAGE_KEY}');
    var theme = saved === 'light' ? 'light' : 'dark';
    if (theme === 'light') document.documentElement.classList.add('light');
  } catch (e) {}
})();
`;

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    // Sincroniza el estado de React con el tema que el script inline del
    // <head> ya aplicó al DOM antes de la hidratación (evita el flash).
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (saved === "light" || saved === "dark") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- sincroniza con localStorage, ya reflejado en el DOM por el script inline
      setTheme(saved);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme debe usarse dentro de ThemeProvider");
  return ctx;
}
