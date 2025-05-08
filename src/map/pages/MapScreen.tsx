import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/Header";
import MapComponent from "../components/Map";
import { useLocation } from "react-router-dom";
import RutaFormModal from "../../components/RutaFormModal";
import { useModoRuta } from "../../context/ModoRutaContext";

const MapScreen: React.FC = () => {
  const skipNextSearch = useRef(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [puntosSeleccionados, setPuntosSeleccionados] = useState<[number, number][]>([]);

  const { modoCrearRuta, setModoCrearRuta } = useModoRuta();
  const location = useLocation();
  const ruta = location.state?.ruta;
  const token = localStorage.getItem("accessToken");

  const handleSearch = async (query: string) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json`
      );
      const data = await response.json();
      setSuggestions(data.length > 0 ? data : []);
    } catch (error) {
      console.error("Error al buscar en Nominatim:", error);
      setSuggestions([]);
    }
  };

  useEffect(() => {
    if (skipNextSearch.current) {
      skipNextSearch.current = false;
      return;
    }

    const delayDebounce = setTimeout(() => {
      if (searchQuery.length > 2) {
        handleSearch(searchQuery);
      } else {
        setSuggestions([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  return (
    <div className="flex flex-col flex-grow relative">
      {!modoCrearRuta && (
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
        />
      )}

      {!modoCrearRuta && token && (
        <div className="absolute top-[110px] left-1/2 transform -translate-x-1/2 z-40">
          <button
            onClick={() => setModoCrearRuta(true)}
            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-md shadow-md"
          >
            Crear ruta
          </button>
        </div>
      )}

      {!modoCrearRuta && suggestions.length > 0 && (
        <div className="absolute z-50 top-[160px] left-1/2 transform -translate-x-1/2 w-[400px] max-h-[300px] overflow-y-auto bg-white shadow-lg rounded-md">
          {suggestions.map((place, index) => (
            <div
              key={index}
              onClick={() => {
                skipNextSearch.current = true;
                setSearchResult(place);
                setSearchQuery(place.display_name);
                setSuggestions([]);
                const input = document.querySelector('input[aria-label="Buscar en PicoTrake"]') as HTMLInputElement;
                if (input) input.blur();
              }}
              className="p-2 cursor-pointer hover:bg-gray-100 border-b text-sm text-gray-700"
            >
              {place.display_name}
            </div>
          ))}
        </div>
      )}

      {modoCrearRuta && token &&(
        <div className="absolute top-4 right-4 z-50 flex gap-4">
          <button
            onClick={() => setMostrarFormulario(true)}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md"
          >
            Guardar ruta
          </button>
          <button
            onClick={() => setModoCrearRuta(false)}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md"
          >
            Salir del modo ruta
          </button>
        </div>
      )}

      {/* Contenedor del mapa con altura automática */}
      <div className="flex-grow relative z-0">
        <MapComponent
          searchResult={searchResult}
          ruta={ruta}
          modoCrearRuta={modoCrearRuta}
          onPuntosChange={setPuntosSeleccionados}
        />
      </div>

      {/* Modal para guardar ruta */}
      {mostrarFormulario && modoCrearRuta && (
        <RutaFormModal
          puntos={puntosSeleccionados}
          onClose={() => setMostrarFormulario(false)}
        />
      )}
    </div>
  );
};

export default MapScreen;
