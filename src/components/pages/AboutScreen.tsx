import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { DarkModeContext } from "../../context/DarkMode";

const AboutScreen: React.FC = () => {
  const { t } = useTranslation();
  const context = useContext(DarkModeContext);

  if (!context) {
    throw new Error("AboutScreen debe usarse dentro de DarkModeProvider");
  }

  return (
    <div className="min-h-screen px-6 py-12 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <section className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">{t("aboutPicoTrake")}</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-12">{t("aboutIntro")}</p>

        <div className="grid md:grid-cols-2 gap-10 text-left mb-12">
          <Card title={t("ourMissionTitle")} text={t("ourMissionText")} />
          <Card title={t("ourVisionTitle")} text={t("ourVisionText")} />
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-left">
          <Card
            title={t("aboutTechTitle")}
            text="React, TypeScript, TailwindCSS, i18n, context API, SweetAlert2, routing, cookies y más."
          />
          <Card
            title={t("aboutNowTitle")}
            text={t("aboutNowText")}
          />
          <Card
            title={t("aboutNextTitle")}
            text={t("aboutNextText")}
          />
        </div>
      </section>
    </div>
  );
};

const Card = ({ title, text }: { title: string; text: string }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transition hover:shadow-xl">
    <h2 className="text-2xl font-semibold text-teal-600 dark:text-teal-700 mb-2">{title}</h2>
    <p className="text-gray-600 dark:text-gray-300 text-sm whitespace-pre-line">{text}</p>
  </div>
);

export default AboutScreen;
