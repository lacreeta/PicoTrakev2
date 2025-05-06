import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { DarkModeContext } from "../../context/DarkMode";
import { useNavigate } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Ruta } from "../../types/Routes";

const RoutesScreen: React.FC = () => {
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
    navigate(`/rutas/nombre/${encodeURIComponent(nombre_ruta)}`);
  }; 

  return (
    <div
      className={`min-h-screen px-6 py-10 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <h1 className="text-3xl font-bold mb-8 text-center">Rutas disponibles</h1>

      {loading ? (
        <p className="text-center">Cargando rutas...</p>
      ) : rutas.length === 0 ? (
        <p className="text-center text-gray-500">No hay rutas registradas aún.</p>
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
                <div
                  className="p-5 flex justify-between items-center"
                  onClick={() => toggleRuta(ruta.nombre_ruta)}
                >
                  <div>
                    <h2 className="text-xl font-semibold">{ruta.nombre_ruta}</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {ruta.ubicacion}
                    </p>
                  </div>
                  <span className="text-teal-500">
                    {isSelected ? <FaChevronUp /> : <FaChevronDown />}
                  </span>
                </div>

                {isSelected && (
                  <div className="px-5 pb-5 text-sm space-y-2">
                    <p>
                      <strong>Dificultad:</strong> {ruta.dificultad}
                    </p>
                    <p>
                      <strong>Descripción:</strong> {ruta.descripcion}
                    </p>
                    <button
                      onClick={() => handleVerDetalles(ruta.nombre_ruta)}
                      className="mt-2 bg-teal-600 hover:bg-teal-700 text-white py-1 px-3 rounded-md"
                    >
                      Ver detalles completos
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