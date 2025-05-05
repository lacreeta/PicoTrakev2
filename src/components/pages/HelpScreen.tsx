import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { DarkModeContext } from "../../context/DarkMode";

const HelpScreen: React.FC = () => {
    const { t } = useTranslation();
    const context = useContext(DarkModeContext);
    if (!context) {
        throw new Error("IndexScreen debe usarse dentro de DarkModeProvider");
    }

  return (
    <div className="min-h-screen px-4 py-10 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <section className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">{t("helpTitle")}</h1>
        <p className="mb-4">{t("helpIntro")}</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>{t("helpItem1")}</li>
          <li>{t("helpItem2")}</li>
          <li>{t("helpItem3")}</li>
        </ul>
      </section>
    </div>
  );
};

export default HelpScreen;
