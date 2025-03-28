import React, { useContext, useState } from "react";
import { DarkModeContext } from "../context/DarkMode";
import { LanguageContext } from "../context/LanguageContext";
import { useTranslation } from "react-i18next";

const SettingsScreen: React.FC = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error("SettingsScreen debe usarse dentro de DarkModeProvider");
  }
  const { setDarkMode } = context;
  
  const { language, changeLanguage } = useContext(LanguageContext)!;
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value);
  };

  const confirmLanguageChange = () => {
    changeLanguage(selectedLanguage);
    console.log("Idioma actualizado a:", selectedLanguage);
  };

  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-8">
      {/* Título */}
      <h1 className="text-3xl font-bold text-gray-700 dark:text-white">{t("Appearance")}</h1>
       
      {/* Botones para cambiar el modo */}
      <div className="flex gap-4">
        <button
          onClick={() => setDarkMode(true)}
          className="w-[265px] h-[60px] text-teal-500 hover:text-white hover:bg-teal-500 font-bold 
                    dark:text-white dark:bg-teal-oscuro dark:hover:text-white dark:hover:bg-teal-oscuroHover rounded-full shadow-md"
        >
          {t("dark")}
        </button>
        <button
          onClick={() => setDarkMode(false)}
          className="w-[265px] h-[60px] text-teal-500 hover:text-white hover:bg-teal-500 font-bold 
          dark:text-white dark:bg-teal-oscuro dark:hover:text-white dark:hover:bg-teal-oscuroHover rounded-full shadow-md"
        >
          {t("light")}
        </button>
      </div>

      {/* Selector de idioma con botón de confirmación */}
      <div className="flex flex-col items-center gap-4">
        <select
          value={selectedLanguage}
          onChange={handleLanguageChange}
          className="w-[200px] h-[50px] bg-white border border-gray-300 rounded-md shadow-md text-teal-500 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white dark:border-gray-500"
        >
          <option value="en">🇬🇧 English</option>
          <option value="es">🇪🇸 Español</option>
          <option value="fr">🇫🇷 Français</option>
          <option value="ca">🎗️Català</option>
        </select>
        <button
          onClick={confirmLanguageChange}
          className="w-[200px] h-[50px] text-teal-500 dark:text-white dark:bg-teal-oscuro dark:hover:bg-teal-oscuroHover hover:bg-teal-600 hover:text-white font-bold rounded-md shadow-md "
        >
          {t("saveChanges")}
        </button>
      </div>
    </div>
  );
};

export default SettingsScreen;


/*
<div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
  <form
    className="
      w-full max-w-[350px]
      bg-white p-6 rounded-xl shadow-md h-auto
      flex flex-col justify-center
    "
  >
    <h2 className="text-2xl font-bold text-center mb-4">
      Configuración
    </h2>

    <label className="text-gray-700 font-semibold mt-2">Nombre de usuario</label>
    <input
      type="text"
      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-teal-400"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />

    <label className="text-gray-700 font-semibold mt-2">Correo electrónico</label>
    <input
      type="email"
      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-teal-400"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />

    <div className="flex items-center mt-3">
      <input
        type="checkbox"
        className="mr-2 accent-teal-500 hover:accent-teal-400"
        checked={notifications}
        onChange={() => setNotifications(!notifications)}
      />
      <label className="text-gray-700 font-semibold">Recibir notificaciones</label>
    </div>

    <button
      type="submit"
      className="mt-4 bg-teal-500 text-white font-semibold py-2 rounded-md  transition"
    >
      Guardar Cambios
    </button>
  </form>
</div >
*/