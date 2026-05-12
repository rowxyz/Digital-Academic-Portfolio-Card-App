import React, { createContext, useContext, useState, useMemo } from "react";

// ---- Light palette ----
const lightColors = {
  background: "#F4F5FB",
  surface: "#FFFFFF",
  surfaceAlt: "#F8F9FF",
  card: "#FFFFFF",
  text: "#0F172A",
  textMuted: "#64748B",
  textInverse: "#FFFFFF",
  primary: "#4F46E5",
  primaryDark: "#3730A3",
  primaryLight: "#EEF0FF",
  border: "#E5E7F0",
  shadow: "#1E1B4B",
  chipBg: "#EEF0FF",
  chipText: "#4338CA",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  gradient: ["#6366F1", "#4338CA"],
};

// ---- Dark palette ----
const darkColors = {
  background: "#0B0B17",
  surface: "#15162B",
  surfaceAlt: "#1B1D38",
  card: "#1A1B33",
  text: "#F1F5F9",
  textMuted: "#94A3B8",
  textInverse: "#FFFFFF",
  primary: "#818CF8",
  primaryDark: "#6366F1",
  primaryLight: "#2A2C56",
  border: "#26284A",
  shadow: "#000000",
  chipBg: "#2A2C56",
  chipText: "#C7D2FE",
  success: "#34D399",
  warning: "#FBBF24",
  danger: "#F87171",
  gradient: ["#4338CA", "#1E1B4B"],
};

const ThemeContext = createContext(undefined);

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("light"); // "light" | "dark"

  const value = useMemo(
    () => ({
      mode,
      colors: mode === "light" ? lightColors : darkColors,
      toggle: () => setMode((m) => (m === "light" ? "dark" : "light")),
    }),
    [mode]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
};
