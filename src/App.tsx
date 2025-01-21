/* eslint-disable @typescript-eslint/no-explicit-any */
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { LatLng, Layer } from "leaflet";
import { useEffect, useState, useRef } from 'react';
import "./App.css";
import SearchBar from "./components/SearchBar";

function App() {
  const [geojsonData, setGeojsonData] = useState<any>(null);
  const [center, setCenter] = useState<LatLng>(new LatLng(41.3784, 2.1927)); // Coordenadas iniciales
  const [searchQuery, setSearchQuery] = useState<string>(""); 
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [style, setStyle] = useState<any>({
    color: "red",
    weight: 2,
    opacity: 1,
    fillOpacity: 0,
  });
  const [isGeoJsonLoaded, setIsGeoJsonLoaded] = useState(false);
  const mapRef = useRef<any>(null);

  // Función de búsqueda
  const handleSearch = () => {
    console.log('Search Query:', searchQuery); // Log cuando se hace una búsqueda
    if (searchQuery.toLowerCase().includes("montseny")) {
      console.log('Buscando Montseny...');
      // Cargar GeoJSON solo si no está cargado
      if (!isGeoJsonLoaded) {
        const loadGeoJSON = async () => {
          console.log('Cargando GeoJSON...');
          const response = await fetch("/montseny.geojson");
          const data = await response.json();
          setGeojsonData(data);
          setIsGeoJsonLoaded(true);
        };
        loadGeoJSON();
      }
    }
  };

  // Cargar sugerencias cuando se escribe algo en la barra de búsqueda
  useEffect(() => {
    console.log('Search Query en useEffect:', searchQuery); // Log del searchQuery
    if (searchQuery.length >= 3) {
      const fetchSuggestions = async () => {
        console.log('Buscando sugerencias...');
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${searchQuery}&format=json&addressdetails=1&limit=5`
        );
        const data = await response.json();
        console.log('Sugerencias obtenidas:', data); // Log con las sugerencias obtenidas
        setSuggestions(data);
      };

      const delaySearch = setTimeout(() => {
        fetchSuggestions();
      }, 500); // Retraso de 500ms para evitar demasiadas llamadas

      return () => clearTimeout(delaySearch); // Limpiar el timeout cuando se escriba nuevamente
    } else {
      setSuggestions([]); // Limpiar sugerencias si el texto es menor a 3 caracteres
    }
  }, [searchQuery]);

  // Cargar o eliminar el GeoJSON cuando cambia el query de búsqueda
  useEffect(() => {
    console.log('Search Query en useEffect (cambio de búsqueda):', searchQuery); // Log del cambio de búsqueda
    if (searchQuery.toLowerCase().includes("montseny")) {
      if (!isGeoJsonLoaded) {
        const loadGeoJSON = async () => {
          console.log('Cargando GeoJSON...');
          const response = await fetch("/montseny.geojson");
          const data = await response.json();
          setGeojsonData(data);
          setIsGeoJsonLoaded(true);
        };
        loadGeoJSON();
      }
    } else {
      console.log('Limpiando GeoJSON porque no se menciona Montseny');
      setGeojsonData(null);
      setIsGeoJsonLoaded(false);
      setCenter(new LatLng(41.3784, 2.1927)); // Coordenadas iniciales
    }
  }, [searchQuery, isGeoJsonLoaded]);

  const onEachFeature = (feature: any, layer: Layer) => {
    if (layer.getPopup()) {
      layer.unbindPopup();
    }
  };

  // Función para manejar la selección de una sugerencia
  const handleSuggestionSelect = (lat: string, lon: string) => {
    console.log('Sugerencia seleccionada:', lat, lon);
    const newCenter = new LatLng(parseFloat(lat), parseFloat(lon));
    console.log("Cambiando a: ", newCenter);
    
    // Actualiza el estado de center en React
    setCenter(newCenter); // Esto actualiza el estado, lo cual causará un re-render
    setSuggestions([]); // Limpiar las sugerencias
  };
  
  useEffect(() => {
    console.log('Centro del mapa actualizado:', center);
    if (mapRef.current) {
      console.log("Actualizando la vista del mapa con las nuevas coordenadas", center);
      mapRef.current.setView(center, 13); // Esto actualizará la vista del mapa inmediatamente
    }
  }, [center]); // Dependemos de `center` para actualizar el mapa en cada cambio
  
  return (
    <div className="map-wrapper">
      {/* Barra de búsqueda */}
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />
      {/* Mostrar las sugerencias de búsqueda */}
      {suggestions.length > 0 && (
        <div className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="suggestion-item"
              onClick={() => handleSuggestionSelect(suggestion.lat, suggestion.lon)}
            >
              {suggestion.display_name}
            </div>
          ))}
        </div>
      )}
      <MapContainer
        center={center}
        zoom={15}
        scrollWheelZoom={true}
        style={{ height: "100%" }}
        whenReady={() => {
          console.log("El mapa está listo");
        }}
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Renderizar el GeoJSON solo si se han cargado los datos */}
        {isGeoJsonLoaded && geojsonData && (
          <GeoJSON data={geojsonData} style={style} onEachFeature={onEachFeature}/>
        )}
      </MapContainer>
    </div>
  );
}
export default App;
