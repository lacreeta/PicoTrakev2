import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { DarkModeContext } from "../../context/DarkMode";
import {
  FaMapMarkedAlt,
  FaStar,
  FaCloudDownloadAlt,
  FaArrowLeft,
  FaSpinner,
} from "react-icons/fa";

const HelpScreen: React.FC = () => {
  const { t } = useTranslation();
  const context = useContext(DarkModeContext);
  const [selected, setSelected] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  if (!context) {
    throw new Error("HelpScreen debe usarse dentro de DarkModeProvider");
  }

  const details = [
    {
      icon: <FaMapMarkedAlt size={40} className="text-teal-500" />,
      title: t("helpItem1Title"),
      description: t("helpItem1"),
      detail: t("helpItem1Detail"),
    },
    {
      icon: <FaStar size={40} className="text-yellow-400" />,
      title: t("helpItem2Title"),
      description: t("helpItem2"),
      detail: t("helpItem2Detail"),
    },
    {
      icon: <FaCloudDownloadAlt size={40} className="text-blue-400" />,
      title: t("helpItem3Title"),
      description: t("helpItem3"),
      detail: t("helpItem3Detail"),
    },
  ];

  const handleSelect = (index: number) => {
    setLoading(true);
    setTimeout(() => {
      setSelected(index);
      setLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen px-4 py-10 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <section className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">{t("helpTitle")}</h1>
        <p className="mb-8 text-center text-lg">{t("helpIntro")}</p>

        {selected === null && !loading && (
          <div className="grid gap-6 md:grid-cols-3">
            {details.map((item, index) => (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                className="p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800 flex flex-col items-center text-center hover:ring-2 ring-teal-400"
              >
                {item.icon}
                <h3 className="text-xl font-semibold mt-4 mb-2">{item.title}</h3>
                <p className="text-sm">{item.description}</p>
              </button>
            ))}
          </div>
        )}

        {loading && (
          <div className="flex justify-center items-center h-40">
            <FaSpinner className="animate-spin text-teal-500 text-4xl" />
          </div>
        )}

        {selected !== null && !loading && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">{details[selected].title}</h3>
              <button
                onClick={() => setSelected(null)}
                className="text-teal-500 hover:underline flex items-center gap-1"
              >
                {t("backButton")} <FaArrowLeft />
              </button>
            </div>
            <p className="text-base">{details[selected].detail}</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default HelpScreen;