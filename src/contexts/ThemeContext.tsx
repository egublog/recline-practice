import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useCallback,
} from "react";
import { GRADIENTS, COLORS } from "../constants/theme";

type ThemeMode = "light" | "dark";

interface ThemeContextType {
  bgGradient: string;
  headerGradient: string;
  buttonScheme: string;
  boxBg: string;
  textColor: string;
  mode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>("light");

  const toggleTheme = useCallback(() => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const themeValues = {
    bgGradient: GRADIENTS[mode].background,
    headerGradient: GRADIENTS[mode].header,
    buttonScheme: COLORS[mode].button,
    boxBg: COLORS[mode].box,
    textColor: COLORS[mode].text,
    mode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={themeValues}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useAppTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useAppTheme must be used within a ThemeProvider");
  }
  return context;
}
