import { createContext, useContext, useCallback, ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface I18nContextType {
  toggleLanguage: () => void;
  currentLanguage: string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation();

  const toggleLanguage = useCallback(() => {
    const newLang = i18n.language === "ja" ? "en" : "ja";
    i18n.changeLanguage(newLang);
  }, [i18n]);

  return (
    <I18nContext.Provider
      value={{
        toggleLanguage,
        currentLanguage: i18n.language,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
