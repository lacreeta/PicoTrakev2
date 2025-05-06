import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { DarkModeContext } from "../../context/DarkMode";
import { Ruta } from "../../types/Routes";
import Swal from "sweetalert2";
import { FaSpinner } from "react-icons/fa";

const RutaDetalleScreen: React.FC = () => {
    const { darkMode } = useContext(DarkModeContext)!;
    const { nombre_ruta } = useParams();
    const [ruta, setRuta] = useState<Ruta | null>(null);
    const [loading, setLoading] = useState(true);        // carga inicial de ruta
    const [startingRoute, setStartingRoute] = useState(false);

    useEffect(() => {
    const fetchRuta = async () => {
        try {
            if (nombre_ruta) {
                const res = await axios.get(
                    `http://localhost/rutas/nombre/${encodeURIComponent(nombre_ruta)}`
                );
                setRuta(res.data);
            }
        } catch (err) {
        console.error("No se pudo cargar la ruta:", err);
        } finally {
        setLoading(false);
        }
    };
    fetchRuta();
    }, [nombre_ruta]);

    const handleIniciarRuta = async () => { console.log("Iniciar ruta clicado");
        const token = localStorage.getItem("accessToken");
        if (!token || !ruta?.id_ruta) return;
        setStartingRoute(true);
      
        try {
          const payload = {
            id_ruta: ruta.id_ruta,
            fecha: new Date().toISOString().split("T")[0],
            };
            
      
          await axios.put("http://localhost/historial/", payload, {
            headers: { Authorization: `Bearer ${token}` },
          });
      
          Swal.fire({
            icon: "success",
            title: "¡Ruta iniciada!",
            text: "Se ha añadido correctamente a tu historial.",
            background: darkMode ? "#0f172a" : "#fff",
            color: darkMode ? "#e2e8f0" : "#1f2937",
            confirmButtonColor: "#14b8a6",
          });
        } catch (err) {
          console.error("Error al iniciar la ruta:", err);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudo registrar la ruta.",
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
        <p>Cargando detalles de la ruta...</p>
      ) : ruta ? (
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
          <h1 className="text-3xl font-bold mb-4">{ruta.nombre_ruta}</h1>
          <p className="mb-2">
            <strong>Ubicación:</strong> {ruta.ubicacion}
          </p>
          <p className="mb-2">
            <strong>Dificultad:</strong> {ruta.dificultad}
          </p>
          <p>
            <strong>Descripción:</strong> {ruta.descripcion}
          </p>

          <button
            onClick={handleIniciarRuta}
            disabled={startingRoute}
            className={`mt-6 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md font-semibold flex items-center justify-center gap-2 ${
                startingRoute ? "opacity-70 cursor-not-allowed" : ""
            }`}
            >
            {startingRoute ? (
                <>
                <FaSpinner className="animate-spin" />
                Iniciando...
                </>
            ) : (
                "Iniciar ruta"
            )}
            </button>
        </div>
      ) : (
        <p className="text-center text-red-500">Ruta no encontrada.</p>
      )}
    </div>
  );
};

export default RutaDetalleScreen;
