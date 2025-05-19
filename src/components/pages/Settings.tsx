import React, { useContext, useState } from "react";
import { DarkModeContext } from "../../context/DarkMode";
import { LanguageContext } from "../../context/LanguageContext";
import { useTranslation } from "react-i18next";

const SettingsScreen: React.FC = () => {
  const { i18n, t } = useTranslation();
  const { darkMode, setDarkMode } = useContext(DarkModeContext)!;
  const { changeLanguage } = useContext(LanguageContext)!;
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const [userHasChosenLang, setUserHasChosenLang] = useState(false);

  const supportedLanguages = ["en", "es", "fr", "ca"];
  const browserLang = navigator.language.slice(0, 2);
  const showUnsupportedMessage = !supportedLanguages.includes(browserLang) && !userHasChosenLang;

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setSelectedLanguage(selected);
    changeLanguage(selected);
    setUserHasChosenLang(true);
  };

  return (
    <div
      className={`min-h-screen px-4 py-10 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div className="flex flex-col items-center justify-center w-full min-h-[80vh] gap-8">
        <h1 className="text-3xl font-bold text-gray-700 dark:text-white">
          {t("Appearance")}
        </h1>

        {/* Botones de modo claro/oscuro */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-[265px]">
          <button
            onClick={() => setDarkMode(true)}
            className="w-full h-[60px] text-teal-500 hover:text-white hover:bg-teal-500 font-bold 
            dark:text-white dark:bg-teal-oscuro dark:hover:text-white dark:hover:bg-teal-oscuroHover 
            rounded-full shadow-md"
          >
            {t("dark")}
          </button>
          <button
            onClick={() => setDarkMode(false)}
            className="w-full h-[60px] text-teal-500 hover:text-white hover:bg-teal-500 font-bold 
            dark:text-white dark:bg-teal-oscuro dark:hover:text-white dark:hover:bg-teal-oscuroHover 
            rounded-full shadow-md"
          >
            {t("light")}
          </button>
        </div>

        {/* Selector de idioma */}
        <div className="flex flex-col items-center text-center gap-4 px-4 w-full">
          {showUnsupportedMessage && (
            <p className="text-sm text-gray-500 dark:text-gray-300">
              {t("unsupportedLang", { browserLang })}
            </p>
          )}
          <select
            value={i18n.language}
            onChange={handleLanguageChange}
            className="w-full max-w-[200px] h-[50px] bg-white border border-gray-300 rounded-md shadow-md text-teal-500 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white dark:border-gray-500"
          >
            <option value="en">🇬🇧 English</option>
            <option value="es">🇪🇸 Español</option>
            <option value="fr">🇫🇷 Français</option>
            <option value="ca">🎗️Català</option>
          </select>
        </div>
      </div>
    </div>
  );
};
export default SettingsScreen;