import React, { createContext, useState, useEffect, ReactNode } from "react";
import i18n from "../language/i18n";
import Cookies from "js-cookie";

interface LanguageContextProps {
  language: string;
  changeLanguage: (lng: string) => void;
}

export const LanguageContext = createContext<LanguageContextProps>({
  language: "en",
  changeLanguage: () => {},
});

interface LanguageProviderProps {
  children: ReactNode;
}

const supportedLanguages = ["en", "es", "fr", "ca"];

const getInitialLang = (): string => {
  const cookieLang = Cookies.get("lang");
  if (cookieLang && supportedLanguages.includes(cookieLang)) return cookieLang;

  const browserLang = navigator.language.slice(0, 2);
  return supportedLanguages.includes(browserLang) ? browserLang : "en";
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<string>(getInitialLang);

  const changeLanguage = (lng: string) => {
    setLanguage(lng);
    if (lng !== getInitialLang()) {
      Cookies.set("lang", lng, { expires: 30 }); 
    }
    i18n.changeLanguage(lng);
  };
  

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};