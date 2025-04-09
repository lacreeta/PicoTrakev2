import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/DarkMode";
import { useTranslation } from "react-i18next";

const IndexScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const darkModeContext = useContext(DarkModeContext);

  if (!darkModeContext) {
    throw new Error("Login debe usarse dentro de DarkModeProvider");
  }
  return (
    <div className="min-h-screen w-full px-4 py-10 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
        {t("Si")}
      </h1>
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden flex flex-col md:flex-row items-center">
        <img
          src="/img/landing-banner.jpg" 
          alt="Excursión en la naturaleza"
          className="w-full md:w-1/2 object-cover h-64 md:h-full"
        />

        <div className="p-8 flex flex-col items-start gap-4 w-full">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {t("exploreWithUs")}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            {t("plan")}
          </p>

          <div className="flex flex-wrap gap-4 mt-4">
            <a
              href="/app"
              className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition"
            >
              {t("downloadButton")}
            </a>
            <a
              href="/premium"
              className="bg-yellow-500 text-white px-5 py-2 rounded-xl hover:bg-yellow-600 transition"
            >
              {t("bePremiumButton")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexScreen;
