import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/DarkMode";
import { Ruta } from "../../types/Routes";
import Swal from "sweetalert2";
import { FaSpinner } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const RutaDetalleScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { darkMode } = useContext(DarkModeContext)!;
  const { nombre_ruta } = useParams();
  const [ruta, setRuta] = useState<Ruta | null>(null);
  const [loading, setLoading] = useState(true);
  const [startingRoute, setStartingRoute] = useState(false);

  useEffect(() => {
    const fetchRuta = async () => {
      try {
        if (nombre_ruta) {
          const res = await axios.get(
            `https://api.picotrakeclub.tech/rutas/nombre/${encodeURIComponent(nombre_ruta)}`
          );
          setRuta(res.data);
        }
      } catch (err) {
        console.error(t("start_error_text"), err);
      } finally {
        setLoading(false);
      }
    };
    fetchRuta();
  }, [nombre_ruta, t]);

  const handleIniciarRuta = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token || !ruta?.id_ruta) return;
    setStartingRoute(true);

    try {
      const payload = {
        id_ruta: ruta.id_ruta,
        fecha: new Date().toISOString().split("T")[0],
      };

      await axios.put("https://api.picotrakeclub.tech/historial/", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      await Swal.fire({
        icon: "success",
        title: t("start_success_title"),
        text: t("start_success_text"),
        background: darkMode ? "#202C33" : "#fff",
        color: darkMode ? "#e2e8f0" : "#1f2937",
        cancelButtonText: t("cancel", "Cancelar"),
        confirmButtonColor: darkMode ? "#1a4e51" : "#14b8a6",
      });

      navigate("/map", { state: { ruta } });
    } catch (err) {
      console.error("Error al iniciar la ruta:", err);
      Swal.fire({
        icon: "error",
        title: t("start_error_title"),
        text: t("start_error_text"),
      });
    } finally {
      setStartingRoute(false);
    }
  };

  return (
    <div
      className={`min-h-screen px-6 py-10 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      {loading ? (
        <p>{t("loading_route")}</p>
      ) : ruta ? (
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
          <h1 className="text-3xl font-bold mb-4">{ruta.nombre_ruta}</h1>
          <p className="mb-2">
            <strong>{t("location")}:</strong> {ruta.ubicacion}
          </p>
          <p className="mb-2">
            <strong>{t("difficulty")}:</strong> {ruta.dificultad}
          </p>
          <p>
            <strong>{t("description")}:</strong> {ruta.descripcion}
          </p>

          <button
            onClick={handleIniciarRuta}
            disabled={startingRoute}
            className={`mt-6 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md font-semibold flex items-center justify-center gap-2 dark:bg-teal-oscuro dark:hover:bg-teal-oscuroHover${
              startingRoute ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {startingRoute ? (
              <>
                <FaSpinner className="animate-spin" />
                {t("starting")}
              </>
            ) : (
              t("start_route")
            )}
          </button>
        </div>
      ) : (
        <p className="text-center text-red-500">{t("route_not_found")}</p>
      )}
    </div>
  );
};

export default RutaDetalleScreen;
