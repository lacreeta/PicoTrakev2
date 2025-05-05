import React, { createContext, useState, useEffect, ReactNode } from "react";
import i18n from "../language/i18n";

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

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState(i18n.language);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
  };

  useEffect(() => {
    i18n.changeLanguage(language); // asegúrate de sincronizarlo al montar
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
