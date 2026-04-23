"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import localDict from "../data/content.json";

type Language = "vi" | "en";

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const GAS_CONTENT_URL = "https://script.google.com/macros/s/AKfycbzvhRomfkwgVsw6aWiwJHUUncfL3hk8A44zS8nDLlKTmI3deUyFeioZgSVWa_DQqDdj/exec";

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("vi");
  const [dynamicDict, setDynamicDict] = useState<any>(localDict);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch(GAS_CONTENT_URL);
        if (res.ok) {
          const data = await res.json();
          // Merge dynamic data with local fallback
          setDynamicDict({
            vi: { ...localDict.vi, ...data.vi },
            en: { ...localDict.en, ...data.en }
          });
        }
      } catch (error) {
        console.error("CMS Load Error:", error);
      }
    };
    fetchContent();
  }, []);

  const t = (key: string): string => {
    const val = dynamicDict[language][key as keyof typeof localDict.vi];
    if (Array.isArray(val)) return val.join(", ");
    return val || key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
};
