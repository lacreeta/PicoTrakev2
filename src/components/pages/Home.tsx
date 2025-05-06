import { useEffect, useState, useContext, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/DarkMode";
import { useTranslation } from "react-i18next";
import { FaHiking, FaMapMarkedAlt } from "react-icons/fa";
import { Trans } from "react-i18next";


interface User {
  nombre: string;
}

interface Historial {
  nombre_ruta: string;
  fecha: string;
}

const HomeScreen: React.FC = () => {
  const { t } = useTranslation();
  const { darkMode } = useContext(DarkModeContext)!;
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [historial, setHistorial] = useState<Historial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [nombreRutaFiltro, setNombreRutaFiltro] = useState<string>("");
  const [fechaInicio, setFechaInicio] = useState<string>("");
  const [fechaFinal, setFechaFinal] = useState<string>("");
  const token = localStorage.getItem("accessToken");
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const fetchUserAndHistorial = async () => {
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const { data: userData } = await axios.get("http://localhost/usuarios/get/me", { headers });
      setUser(userData);
      const { data: historialData } = await axios.get("http://localhost/historial/usuario/mis-actividades", { headers });
      setHistorial(historialData);
    } catch (error) {
      console.error("Error cargando datos del home screen", error);
    } finally {
      setLoading(false);
    }
  };

  const filtrarPorFechas = async () => {
    if (!fechaInicio || !fechaFinal) return;
    try {
      const { data } = await axios.get(
        `http://localhost/historial/usuarios/filtrar?fecha_inicio=${fechaInicio}&fecha_final=${fechaFinal}`,
        { headers }
      );
      setHistorial(data);
    } catch (error) {
      console.error("Error al filtrar por fechas", error);
    }
  };

  const debounce = (func: () => void, delay: number) => {
    let timer: ReturnType<typeof setTimeout>;
    return () => {
      clearTimeout(timer);
      timer = setTimeout(func, delay);
    };
  };

  const filtrarPorNombre = useCallback(
    debounce(async () => {
      if (!token) return;
      if (!nombreRutaFiltro) {
        fetchUserAndHistorial();
        return;
      }
      try {
        const { data } = await axios.get(
          `http://localhost/historial/usuario/${encodeURIComponent(nombreRutaFiltro)}`,
          { headers }
        );
        setHistorial(data);
      } catch (error) {
        console.error("Error al filtrar dinámicamente", error);
        setHistorial([]);
      }
    }, 500),
    [nombreRutaFiltro]
  );

  useEffect(() => {
    fetchUserAndHistorial();
  }, []);

  useEffect(() => {
    filtrarPorNombre();
  }, [nombreRutaFiltro]);

  if (loading) return <p className="text-center mt-20">{t("loading_experience")}</p>;
  if (!user) return <p>{t("user_load_error")}</p>;

  return (
    <div className={`min-h-screen px-6 py-10 transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <div className="text-center mb-10">
      <h1 className="text-4xl font-extrabold mb-2">
        <Trans
            i18nKey="welcome_back"
            values={{ name: user.nombre }}
            components={{ teal: <span className="text-teal-500" /> }}
        />
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-300">{t("welcome_message")}</p>
      </div>

      <div className="flex justify-end mb-8">
        <button
          onClick={() => navigate("/rutas")}
          className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-5 rounded-md flex items-center gap-2 shadow-md"
        >
          <FaMapMarkedAlt />
          {t("view_all_routes")}
        </button>
      </div>

      {/* Filtros */}
      <div className="mb-8 grid gap-4 sm:grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="font-medium">{t("filter_by_name")}</label>
          <input
            type="text"
            value={nombreRutaFiltro}
            onChange={(e) => setNombreRutaFiltro(e.target.value)}
            placeholder={t("placeholder_name_filter") || ""}
            className="px-3 py-2 rounded-md border dark:bg-white dark:text-black"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium">{t("filter_by_dates")}</label>
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            className="px-3 py-2 rounded-md border dark:bg-white dark:text-black"
          />
          <input
            type="date"
            value={fechaFinal}
            onChange={(e) => setFechaFinal(e.target.value)}
            className="px-3 py-2 rounded-md border dark:bg-white dark:text-black"
          />
          <button
            onClick={filtrarPorFechas}
            className="bg-teal-600 hover:bg-teal-700 text-white py-1 px-4 rounded-md"
          >
            {t("filter_by_dates")}
          </button>
        </div>
      </div>

      {/* Historial */}
      <section>
        <h2 className="text-2xl font-bold mb-6">{t("your_recent_history")}</h2>

        {historial.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-500 mb-4">{t("no_routes_done")}</p>
            <button
              onClick={() => navigate("/rutas")}
              className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-md"
            >
              {t("explore_routes")}
            </button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {historial.map((actividad, index) => (
              <div
                key={index}
                className={`rounded-xl p-4 border shadow-sm transition-all ${
                  darkMode
                    ? "bg-gray-800 border-gray-700 text-white"
                    : "bg-white border-gray-200 text-gray-800"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <FaHiking className="text-teal-500 text-xl" />
                  <h3 className="text-lg font-semibold">{actividad.nombre_ruta}</h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  {t("route_started_on")} {new Date(actividad.fecha).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomeScreen;
