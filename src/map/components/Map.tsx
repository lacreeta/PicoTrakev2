import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { point, nearestPointOnLine, lineString } from "@turf/turf";


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
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);
  const routeLayerRef = useRef<L.GeoJSON | null>(null);

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
          if (routeLayerRef.current) {
            mapRef.current!.removeLayer(routeLayerRef.current);
          }
          const geoLayer = L.geoJSON(geojson).addTo(mapRef.current!);
          routeLayerRef.current = geoLayer;
          mapRef.current!.fitBounds(geoLayer.getBounds());
        })
        .catch(err => {
          console.error("Error cargando el GeoJSON:", err);
        });
    }
  }, [ruta]);
  useEffect(() => {
    if (!mapRef.current) return;
  
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserLocation([latitude, longitude]);

        if (mapRef.current && !userMarkerRef.current) {
          mapRef.current.setView([latitude, longitude], 15);
        }
  
        // Mueve el marcador del usuario o créalo
        if (userMarkerRef.current) {
          userMarkerRef.current.setLatLng([latitude, longitude]);
        } else {
          const marker = L.marker([latitude, longitude], {
            icon: L.divIcon({
              className: "",
              html: `
                <div style="
                  width: 16px;
                  height: 16px;
                  background-color: #3b82f6;
                  border: 4px solid white;
                  border-radius: 9999px;
                  box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
                "></div>
              `,
              iconSize: [24, 24],
              iconAnchor: [12, 12],
            }),
          }).addTo(mapRef.current!);
          userMarkerRef.current = marker;          
        }
  
        // Lógica de seguimiento con Turf.js
        if (routeLayerRef.current) {
          const geojson = routeLayerRef.current.toGeoJSON() as GeoJSON.FeatureCollection;
  
          const coordinates: [number, number][] = [];
  
          geojson.features.forEach((feature: any) => {
            if (feature.geometry.type === "LineString") {
              coordinates.push(...(feature.geometry.coordinates as [number, number][]));
            }
          });
  
          if (coordinates.length > 0) {
            const routeLine = lineString(coordinates);
            const userPoint = point([longitude, latitude]);
            const snapped = nearestPointOnLine(routeLine, userPoint);
  
            const distance = snapped.properties.dist; // En grados (~0.01 = 1 km aprox)
  
            if (distance < 0.03) {
              console.log("✅ Estás sobre la ruta");
            } else {
              console.log("❌ Te estás desviando de la ruta");
            }
          }
        }
      },
      (err) => {
        console.error("Error obteniendo ubicación del usuario:", err);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      }
    );
  
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);
  
  
  
  return <div id="map" className="h-[calc(100vh-100px)] w-full relative z-0" />;
};

export default MapComponent;
