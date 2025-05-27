import { useEffect, useState, useContext, useCallback } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/DarkMode";
import { useTranslation, Trans } from "react-i18next";
import { FaHiking, FaMapMarkedAlt, FaSpinner } from "react-icons/fa";
import Swal from "sweetalert2";

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
  const [swalShown, setSwalShown] = useState<boolean>(false);
  const [nombreRutaFiltro, setNombreRutaFiltro] = useState<string>("");
  const [fechaInicio, setFechaInicio] = useState<string>("");
  const [fechaFinal, setFechaFinal] = useState<string>("");

  const fetchUserAndHistorial = async () => {
    try {
      const { data: userData } = await axiosInstance.get("https://picotrakeapi-production.up.railway.app/usuarios/get/me");
      setUser(userData);
      const { data: historialData } = await axiosInstance.get("https://picotrakeapi-production.up.railway.app/historial/usuario/mis-actividades");
      setHistorial(historialData);
    } catch (error) {
      console.error("Error cargando datos del home screen", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteHistorial = async () => {
    const confirm = await Swal.fire({
      title: t("confirm_delete_history", "¿Estás seguro?"),
      text: t("confirm_delete_warning", "Esta acción borrará todo tu historial."),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: darkMode ? "#1a4e51" : "#14b8a6", 
      cancelButtonColor: "#6b7280",
      confirmButtonText: t("confirm_delete_yes", "Sí, borrar"),
      cancelButtonText: t("confirm_delete_cancel", "Cancelar"),
      background: darkMode ? "#202C33" : "#fff",
      color: darkMode ? "#e2e8f0" : "#1f2937",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosInstance.delete("https://picotrakeapi-production.up.railway.app/usuario/historial");
      Swal.fire({
        icon: "success",
        title: t("history_deleted_success", "Historial eliminado"),
        text: t("history_deleted_success", "Tu historial se ha borrado correctamente."),
        background: darkMode ? "#202C33" : "#fff",
        color: darkMode ? "#e2e8f0" : "#1f2937",
        confirmButtonColor: darkMode ? "#1a4e51" : "#14b8a6"
      });
      setHistorial([]);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: t("history_delete_error", "Error"),
        text: t("history_delete_error", "No se pudo borrar el historial."),
      });
    }
  };

  const filtrarPorFechas = async () => {
    if (!fechaInicio || !fechaFinal) return;
    try {
      const { data } = await axiosInstance.get(
        `https://picotrakeapi-production.up.railway.app/historial/usuarios/filtrar?fecha_inicio=${fechaInicio}&fecha_final=${fechaFinal}`
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
      if (!nombreRutaFiltro) {
        fetchUserAndHistorial();
        return;
      }
      try {
        const { data } = await axiosInstance.get(
          `https://picotrakeapi-production.up.railway.app/historial/usuario/${encodeURIComponent(nombreRutaFiltro)}`
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

  useEffect(() => {
    if (!loading && !user && !swalShown) {
      Swal.fire({
        icon: "error",
        title: t("user_load_error_title", "Error al cargar usuario"),
        text: t("user_load_error_message", "No se pudo cargar la información del usuario."),
        background: darkMode ? "#202C33" : "#fff",
        color: darkMode ? "#e2e8f0" : "#1f2937",
        confirmButtonColor: darkMode ? "#1a4e51" : "#14b8a6"
      }).then(() => {
        navigate("/login");
      });
      setSwalShown(true);
    }
  }, [loading, user, swalShown]);

  if (loading) {
    return (
      <div className={`min-h-screen px-6 py-10 transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
        <div className="flex flex-col items-center justify-center min-h-screen bg-transparent">
          <FaSpinner
            className="animate-spin text-5xl mb-4"
            style={{ color: darkMode ? "#14b8a6" : "#14b8a6" }}
            aria-label="Loading"
          />
          <p className="text-lg font-medium text-gray-600 dark:text-gray-300">
            {t("loading_experience", "Cargando tu experiencia...")}
          </p>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return (
      <div className={`min-h-screen px-6 py-10 transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
        <div className="h-screen bg-transparent" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen px-6 py-10 transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold mb-2">
          <Trans
            i18nKey="welcome_back"
            values={{ name: user.nombre }}
            components={{ teal: <span className={darkMode ? "text-teal-700" : "text-teal-500"} /> }}
          />
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-300">{t("welcome_message")}</p>
      </div>

      <div className="flex justify-end mb-8">
        <button
          onClick={() => navigate("/rutas")}
          className={`font-semibold py-2 px-5 rounded-md flex items-center gap-2 shadow-md transition-colors ${
            darkMode
              ? "bg-teal-oscuro hover:bg-teal-oscuroHover text-white"
              : "bg-teal-600 hover:bg-teal-700 text-white"
          }`}
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
            className={`px-3 py-2 rounded-md border ${darkMode ? "bg-gray-100 text-black border-gray-400" : "bg-white text-black border-gray-300"}`}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium">{t("filter_by_dates")}</label>
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            className={`px-3 py-2 rounded-md border ${darkMode ? "bg-gray-100 text-black border-gray-400" : "bg-white text-black border-gray-300"}`}
          />
          <input
            type="date"
            value={fechaFinal}
            onChange={(e) => setFechaFinal(e.target.value)}
            className={`px-3 py-2 rounded-md border ${darkMode ? "bg-gray-100 text-black border-gray-400" : "bg-white text-black border-gray-300"}`}
          />
          <button
            onClick={filtrarPorFechas}
            className={`py-1 px-4 rounded-md font-semibold transition-colors ${
              darkMode
                ? "bg-teal-oscuro hover:bg-teal-oscuroHover text-white"
                : "bg-teal-600 hover:bg-teal-700 text-white"
            }`}
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
              className={`font-semibold py-2 px-4 rounded-md transition-colors ${
                darkMode
                  ? "bg-teal-oscuro hover:bg-teal-oscuroHover text-white"
                  : "bg-teal-600 hover:bg-teal-700 text-white"
              }`}
            >
              {t("explore_routes")}
            </button>
          </div>
        ) : (
          <>
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

            <div className="flex justify-center mt-6">
              <button
                onClick={deleteHistorial}
                className={`font-semibold py-2 px-6 rounded-md shadow-md transition-colors ${
                  darkMode
                    ? "bg-red-700 hover:bg-red-800 text-white"
                    : "bg-red-600 hover:bg-red-700 text-white"
                }`}
              >
                {t("delete_all_history", "Borrar todo el historial")}
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default HomeScreen;
