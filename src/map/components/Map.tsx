import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface SearchResult {
  lat: string;
  lon: string;
  display_name: string;
}

interface MapComponentProps {
  searchResult: SearchResult | null;
  ruta?: {
    geojson_path?: string;
    nombre_ruta?: string;
  };
}

const MapComponent: React.FC<MapComponentProps> = ({ searchResult, ruta }) => {
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    const map = L.map("map").setView([41.3784, 2.1917], 13);
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

    return () => {
      map.remove();
    };
  }, []);

  useEffect(() => {
    if (mapRef.current && searchResult) {
      const lat = parseFloat(searchResult.lat);
      const lon = parseFloat(searchResult.lon);

      // Centrar el mapa
      mapRef.current.setView([lat, lon], 14);

      // Eliminar marcador anterior si existe
      if (markerRef.current) {
        mapRef.current.removeLayer(markerRef.current);
      }

      // Añadir nuevo marcador
      const marker = L.marker([lat, lon])
        .addTo(mapRef.current)
        .bindPopup(searchResult.display_name)
        .openPopup();

      markerRef.current = marker;
    }
  }, [searchResult]);

  useEffect(() => {
    if (mapRef.current && ruta?.geojson_path) {
      fetch(ruta.geojson_path)
        .then(res => res.json())
        .then(geojson => {
          const geoLayer = L.geoJSON(geojson).addTo(mapRef.current!);
          mapRef.current!.fitBounds(geoLayer.getBounds());
        })
        .catch(err => {
          console.error("Error cargando el GeoJSON:", err);
        });
    }
  }, [ruta]);
  
  return <div id="map" className="h-[calc(100vh-100px)] w-full relative z-0" />;
};

export default MapComponent;
