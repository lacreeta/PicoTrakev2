import React, { useState } from "react";
import {
  FaCheckCircle,
  FaMapMarkedAlt,
  FaExclamationTriangle,
  FaPhoneAlt,
  FaFirstAid,
  FaShareAlt,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

const SecurityToolsScreen: React.FC = () => {
  const { t } = useTranslation();
  const checklistItems: string[] = t("securityTools.checklist", { returnObjects: true }) as string[];
  const safetyTips: string[] = t("securityTools.tips", { returnObjects: true }) as string[];
  const alerts: string[] = t("securityTools.alerts", { returnObjects: true }) as string[];

  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    new Array(checklistItems.length).fill(false)
  );

  const handleToggle = (index: number) => {
    const newChecked = [...checkedItems];
    newChecked[index] = !newChecked[index];
    setCheckedItems(newChecked);
  };

  const handleShareLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const locationUrl = `https://maps.google.com/?q=${latitude},${longitude}`;
          navigator.clipboard.writeText(locationUrl);
          alert(t("securityTools.locationCopied"));
        },
        () => {
          alert(t("securityTools.locationError"));
        }
      );
    } else {
      alert(t("securityTools.locationUnavailable"));
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-8 text-gray-800 dark:text-gray-100">
      {/* Título principal */}
      <h1 className="text-3xl font-bold flex items-center gap-2">
        <FaFirstAid />
        {t("securityTools.title")}
      </h1>

      {/* Checklist */}
      <section>
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <FaCheckCircle />
          {t("securityTools.checklistTitle")}
        </h2>
        <ul className="space-y-2">
          {checklistItems.map((item, i) => (
            <li key={i} className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={checkedItems[i]}
                onChange={() => handleToggle(i)}
                className="w-5 h-5 text-teal-600"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Compartir ubicación */}
      <section>
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <FaShareAlt />
          {t("securityTools.shareLocationTitle")}
        </h2>
        <button
          onClick={handleShareLocation}
          className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-md"
        >
          {t("securityTools.shareLocation")}
        </button>
      </section>

      {/* Alertas */}
      <section>
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 text-red-600">
          <FaExclamationTriangle />
          {t("securityTools.alertsTitle")}
        </h2>
        <ul className="list-disc list-inside text-sm">
          {alerts.map((alert, i) => (
            <li key={i}>{alert}</li>
          ))}
        </ul>
      </section>

      {/* Emergencias */}
      <section>
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 text-red-700">
          <FaPhoneAlt />
          {t("securityTools.emergencyTitle")}
        </h2>
        <p className="mb-2">{t("securityTools.emergencyDescription")}</p>
        <a
          href="tel:112"
          className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md"
        >
          {t("securityTools.call112")}
        </a>
      </section>

      {/* Consejos */}
      <section>
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <FaMapMarkedAlt />
          {t("securityTools.safetyTipsTitle")}
        </h2>
        <ul className="list-disc list-inside space-y-1 text-sm">
          {safetyTips.map((tip, i) => (
            <li key={i}>{tip}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default SecurityToolsScreen;