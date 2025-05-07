import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { DarkModeContext } from "../../context/DarkMode";
import { useNavigate } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Ruta } from "../../types/Routes";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

const RoutesScreen: React.FC = () => {
  const { t } = useTranslation();
  const { darkMode } = useContext(DarkModeContext)!;
  const navigate = useNavigate();
  const [rutas, setRutas] = useState<Ruta[]>([]);
  const [loading, setLoading] = useState(true);
  const [rutaSeleccionada, setRutaSeleccionada] = useState<string | null>(null);

  useEffect(() => {
    const fetchRutas = async () => {
      try {
        const res = await axios.get("http://localhost/rutas");
        setRutas(res.data);
      } catch (err) {
        console.error("Error al obtener las rutas:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRutas();
  }, []);

  const toggleRuta = (nombre: string) => {
    setRutaSeleccionada((prev) => (prev === nombre ? null : nombre));
  };

  const handleVerDetalles = (nombre_ruta: string) => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      Swal.fire({
        icon: "info",
        title: t("need_login_title"),
        text: t("need_login_text"),
        confirmButtonText: t("go_to_login"),
        showCancelButton: true,
        background: darkMode ? "#202C33" : "#fff",
        color: darkMode ? "#e2e8f0" : "#1f2937",
        cancelButtonText: t("cancel"),
        confirmButtonColor: darkMode ? "#1a4e51" : "#14b8a6"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
      return;
    }

    navigate(`/rutas/nombre/${encodeURIComponent(nombre_ruta)}`);
  };

  return (
    <div className={`min-h-screen px-6 py-10 transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <h1 className="text-3xl font-bold mb-8 text-center">{t("routes_available")}</h1>

      {loading ? (
        <p className="text-center">{t("loading_routes")}</p>
      ) : rutas.length === 0 ? (
        <p className="text-center text-gray-500">{t("no_routes")}</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rutas.map((ruta, i) => {
            const isSelected = rutaSeleccionada === ruta.nombre_ruta;
            return (
              <div
                key={i}
                className={`cursor-pointer rounded-lg border shadow-lg transition-all duration-300 ${
                  darkMode
                    ? "bg-gray-800 border-gray-700 hover:shadow-xl"
                    : "bg-white border-gray-200 hover:shadow-xl"
                }`}
              >
                <div className="p-5 flex justify-between items-center" onClick={() => toggleRuta(ruta.nombre_ruta)}>
                  <div>
                    <h2 className="text-xl font-semibold">{ruta.nombre_ruta}</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{ruta.ubicacion}</p>
                  </div>
                  <span className="text-teal-500">{isSelected ? <FaChevronUp /> : <FaChevronDown />}</span>
                </div>

                {isSelected && (
                  <div className="px-5 pb-5 text-sm space-y-2">
                    <p>
                      <strong>{t("difficulty")}:</strong> {ruta.dificultad}
                    </p>
                    <p>
                      <strong>{t("description")}:</strong> {ruta.descripcion}
                    </p>
                    <button
                      onClick={() => handleVerDetalles(ruta.nombre_ruta)}
                      className="mt-2 bg-teal-600 hover:bg-teal-700 text-white py-1 px-3 rounded-md dark:bg-teal-oscuro dark:hover:bg-teal-oscuroHover"
                    >
                      {t("view_details")}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RoutesScreen;
