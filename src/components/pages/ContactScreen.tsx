import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { DarkModeContext } from "../../context/DarkMode";

const ContactScreen: React.FC = () => {
    const { t } = useTranslation();
    const context = useContext(DarkModeContext);
    if (!context) {
        throw new Error("IndexScreen debe usarse dentro de DarkModeProvider");
      }

  return (
    <div className="min-h-screen px-4 py-10 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <section className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">{t("contactTitle")}</h1>
        <p className="mb-4">{t("contactIntro")}</p>
        <ul className="space-y-2">
          <li>
            📧 <strong>{t("contactEmail")}</strong>: contacto@picotrake.com
          </li>
          <li>
            🐦 <strong>X (Twitter)</strong>: @PicoTrake
          </li>
          <li>
            📝 {t("contactForm")} → <a href="https://forms.gle/..." className="text-teal-600 underline">Google Form</a>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default ContactScreen;
