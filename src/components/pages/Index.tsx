import React, { useContext } from "react";
import { DarkModeContext } from "../../context/DarkMode";
import { useTranslation } from "react-i18next";

const IndexScreen: React.FC = () => {
  const { t } = useTranslation();
  const context = useContext(DarkModeContext);

  if (!context) {
    throw new Error("IndexScreen debe usarse dentro de DarkModeProvider");
  }

  return (
    <div className="min-h-screen w-full px-4 py-10 bg-gray-50 dark:bg-gray-900">
      {/* HERO SECTION */}
      <section className="text-center max-w-4xl mx-auto mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
          {t("heroTitle") /* Ej: Explora la naturaleza sin límites */}
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
          {t("heroSubtitle") /* Ej: Descubre rutas, planifica y comparte tus aventuras al aire libre */}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="/app"
            className="bg-teal-600 text-white px-6 py-3 rounded-xl hover:bg-teal-700 transition"
          >
            {t("exploreRoutes") /* Ej: Ver rutas */}
          </a>
          <a
            href="/premium"
            className="bg-yellow-500 text-white px-6 py-3 rounded-xl hover:bg-yellow-600 transition"
          >
            {t("bePremiumButton") /* Ej: Hazte Premium */}
          </a>
        </div>
      </section>

      {/* IMAGEN BANNER */}
      <div className="max-w-6xl mx-auto mb-16 rounded-3xl overflow-hidden shadow-xl">
        <img
          src="/img/banner.png"
          alt={t("natureImageAlt") /* Ej: Excursión en la naturaleza */}
          className="w-full h-[300px] md:h-[400px] object-cover object-[center-center]"
        />
      </div>

      {/* VENTAJAS / FEATURES */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {[
          {
            icon: "🗺️",
            title: t("featureMapTitle", "Mapas detallados"),
            text: t("featureMapText", "Explora rutas con mapas interactivos precisos."),
          },
          {
            icon: "📍",
            title: t("featureNearbyTitle", "Rutas cercanas"),
            text: t("featureNearbyText", "Encuentra excursiones cerca de tu ubicación."),
          },
          {
            icon: "📝",
            title: t("featureLogTitle", "Diario de ruta"),
            text: t("featureLogText", "Guarda tus salidas, fotos y notas personales."),
          },
          {
            icon: "📴",
            title: t("featureOfflineTitle", "Modo offline"),
            text: t("featureOfflineText", "Accede a mapas sin conexión con Premium."),
          },
        ].map(({ icon, title, text }, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 flex flex-col items-center text-center"
          >
            <div className="text-4xl mb-4">{icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
              {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">{text}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default IndexScreen;
