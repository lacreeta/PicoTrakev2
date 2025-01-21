/* eslint-disable @typescript-eslint/no-explicit-any */ // it serves to avoid any in the document
import { MapContainer, TileLayer, GeoJSON, Marker, Popup} from "react-leaflet";
import { LatLng, Layer } from "leaflet";
import { useEffect, useState, useRef } from 'react';
import "./App.css";
import SearchBar from "./components/SearchBar";

function App() {
  const [geojsonData, setGeojsonData] = useState<any>(null);
  const [center, setCenter] = useState<LatLng>(new LatLng(41.3784, 2.1927)); // initial coordinates
  const [searchQuery, setSearchQuery] = useState<string>(""); 
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [markerPosition, setMarkerPosition] = useState<LatLng | null>(null);
  const [markerName, setMarkerName] = useState<string | null>(null);
  const [style, setStyle] = useState<any>({
    color: "red",
    weight: 2,
    opacity: 1,
    fillOpacity: 0,
  });
  const [isGeoJsonLoaded, setIsGeoJsonLoaded] = useState(false);
  const mapRef = useRef<any>(null);

  // searching function
  const handleSearch = () => {
    console.log('Search Query:', searchQuery); // log when u do a search
    if (searchQuery.toLowerCase().includes("montseny")) {
      console.log('Buscando Montseny...');
      // load geoJSON if is not charged
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

  // load suggestions when typing something in the search bar
  useEffect(() => {
    console.log('Search Query en useEffect:', searchQuery); // log searchQuery
    if (searchQuery.length >= 1) {
      const fetchSuggestions = async () => {
        console.log('Buscando sugerencias...');
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${searchQuery}&format=json&addressdetails=1&limit=5`
        );
        const data = await response.json();
        console.log('Sugerencias obtenidas:', data); // log with suggestions 
        setSuggestions(data);
      };

      const delaySearch = setTimeout(() => {
        fetchSuggestions();
      }, 100); // 10ms delay to avoid too many api calls

      return () => clearTimeout(delaySearch); // clean timeout
    } else {
      setSuggestions([]); // clean suggestions if text is shorter than 3 characters
      setMarkerPosition(null);
    }
  }, [searchQuery]);

  // load or delete geoJSON when search query changes
  useEffect(() => {
    console.log('Search Query en useEffect (cambio de búsqueda):', searchQuery); // log searchQuery change  
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
      setCenter(new LatLng(41.3784, 2.1927)); // bcn
    }
  }, [searchQuery, isGeoJsonLoaded]);

  // function to handle the selection of a suggestion
  const handleSuggestionSelect = (lat: string, lon: string, name: string) => {
    console.log('Sugerencia seleccionada:', lat, lon, name);
    const newCenter = new LatLng(parseFloat(lat), parseFloat(lon));
    console.log("Cambiando a: ", newCenter);
    
    setCenter(newCenter); 
    setMarkerPosition(newCenter);
    setMarkerName(name)
    setSuggestions([]); 
  };
  
  useEffect(() => {
    console.log('Centro del mapa actualizado:', center);
    if (mapRef.current) {
      console.log("Actualizando la vista del mapa con las nuevas coordenadas", center);
      mapRef.current.setView(center, 15); // change map
    }
  }, [center]); 
  
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
              onClick={() => handleSuggestionSelect(suggestion.lat, suggestion.lon, suggestion.display_name)}
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
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.carto.com/">CARTO</a> contributors'
        />

        {markerPosition && (
          <Marker position={markerPosition}>
            <Popup>{markerName}</Popup>
          </Marker>
        )}
        
        {isGeoJsonLoaded && geojsonData && (
          <GeoJSON data={geojsonData} style={style}/>
        )}
      </MapContainer>
    </div>
  );
}
export default App;
