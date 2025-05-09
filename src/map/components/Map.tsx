import { useContext, useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { DarkModeContext } from "../../context/DarkMode";
import { Montanya } from "../../types/Mountain";

interface SearchResult {
  lat: string;
  lon: string;
  display_name: string;
}

interface MapComponentProps {
  searchResult: SearchResult | null;
  ruta?: {
    geojson?: any;
    nombre_ruta?: string;
  };
  modoCrearRuta?: boolean;
  onPuntosChange?: (puntos: [number, number][]) => void;
}

const iconoDiscreto = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [20, 30],
  iconAnchor: [10, 30],
  popupAnchor: [0, -30],
});


const MapComponent: React.FC<MapComponentProps> = ({ searchResult, ruta, modoCrearRuta, onPuntosChange }) => {
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const routeLayerRef = useRef<L.GeoJSON | null>(null);
  const montanyasRef = useRef<L.GeoJSON | null>(null);
  const { darkMode } = useContext(DarkModeContext)!;

  const [puntosRuta, setPuntosRuta] = useState<[number, number][]>([]);
  const [marcadoresRuta, setMarcadoresRuta] = useState<L.Marker[]>([]);
  const polylineRef = useRef<L.Polyline | null>(null);
  const [esperandoReenganche, setEsperandoReenganche] = useState<number | null>(null);

  useEffect(() => {
    const map = L.map("map").setView([41.3784, 2.1917], 13);
    mapRef.current = map;

    const accessToken = import.meta.env.VITE_JAWG_ACCESS_TOKEN;

    const tileUrl = darkMode
    ? `https://tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=${accessToken}`
    : `https://tile.jawg.io/jawg-lagoon/{z}/{x}/{y}{r}.png?access-token=${accessToken}`;

    const tileLayer = L.tileLayer(tileUrl, {
      attribution: '<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      minZoom: 0,
      maxZoom: 22
    });
    
    tileLayer.addTo(map);

    return () => {
      map.remove();
    };
  }, [darkMode]);

  // Buscar sitio
  useEffect(() => {
    if (mapRef.current && searchResult) {
      const lat = parseFloat(searchResult.lat);
      const lon = parseFloat(searchResult.lon);

      mapRef.current.setView([lat, lon], 14);

      if (markerRef.current) {
        mapRef.current.removeLayer(markerRef.current);
      }

      const marker = L.marker([lat, lon])
        .addTo(mapRef.current)
        .bindPopup(searchResult.display_name)
        .openPopup();

      markerRef.current = marker;
    }
  }, [searchResult]);

  // Cargar GeoJSON si hay una ruta
  useEffect(() => {
    if (mapRef.current && ruta?.geojson) {
      if (routeLayerRef.current) {
        mapRef.current.removeLayer(routeLayerRef.current);
      }
      const geoLayer = L.geoJSON(ruta.geojson).addTo(mapRef.current);
      routeLayerRef.current = geoLayer;
      mapRef.current.fitBounds(geoLayer.getBounds());
    }
  }, [ruta]);

  // Crear ruta a mano
  useEffect(() => {
    if (!mapRef.current || !modoCrearRuta) return;

    const handleClick = (e: L.LeafletMouseEvent) => {
      const latlng: [number, number] = [e.latlng.lat, e.latlng.lng];

      if (esperandoReenganche !== null) {
        const nuevosPuntos = [...puntosRuta];
        nuevosPuntos.splice(esperandoReenganche, 0, latlng);
        setPuntosRuta(nuevosPuntos);
        onPuntosChange?.(nuevosPuntos);
        setEsperandoReenganche(null);
      } else {
        setPuntosRuta(prev => {
          const nuevos = [...prev, latlng];
          onPuntosChange?.(nuevos);
          return nuevos;
        });
      }
    };

    mapRef.current.on("click", handleClick);

    return () => {
      mapRef.current?.off("click", handleClick);
    };
  }, [modoCrearRuta, puntosRuta, esperandoReenganche]);
  
  useEffect(() => {
    if (!modoCrearRuta) {
      setPuntosRuta([]);
      setMarcadoresRuta([]);
      if (polylineRef.current && mapRef.current) {
        mapRef.current.removeLayer(polylineRef.current);
        polylineRef.current = null;
      }
      if (mapRef.current) {
        marcadoresRuta.forEach(m => mapRef.current!.removeLayer(m));
      }
    }
  }, [modoCrearRuta]);

  // Actualizar marcadores y líneas
  useEffect(() => {
    if (!mapRef.current) return;

    marcadoresRuta.forEach(m => mapRef.current!.removeLayer(m));

    const nuevosMarcadores: L.Marker[] = [];

    puntosRuta.forEach((point, index) => {
      const marker = L.marker(point, { icon: iconoDiscreto, draggable: false });

      const popupDiv = L.DomUtil.create("div", "");
      const btnEliminar = L.DomUtil.create("button", "text-red-600", popupDiv);
      btnEliminar.innerText = "Eliminar";
      btnEliminar.onclick = () => {
        setPuntosRuta(prev => {
          const nuevos = [...prev];
          nuevos.splice(index, 1);
          onPuntosChange?.(nuevos);
          return nuevos;
        });
        setEsperandoReenganche(index);
        mapRef.current?.closePopup();
      };

      const btnMover = L.DomUtil.create("button", "text-blue-600 ml-2", popupDiv);
      btnMover.innerText = "Mover";
      btnMover.onclick = () => {
        marker.dragging?.enable();
        mapRef.current?.closePopup();
        marker.on("dragend", () => {
          const pos = marker.getLatLng();
          setPuntosRuta(prev => {
            const nuevos = [...prev];
            nuevos[index] = [pos.lat, pos.lng];
            onPuntosChange?.(nuevos);
            return nuevos;
          });
        });
      };

      marker.bindPopup(popupDiv);
      marker.addTo(mapRef.current!);
      nuevosMarcadores.push(marker);
    });

    setMarcadoresRuta(nuevosMarcadores);

    if (polylineRef.current) {
      mapRef.current.removeLayer(polylineRef.current);
    }

    if (puntosRuta.length > 1) {
      const polyline = L.polyline(puntosRuta, { color: "#14b8a6", weight: 4 });
      polyline.addTo(mapRef.current);
      polylineRef.current = polyline;
    }

  }, [puntosRuta]);

  // elimina ruta anteirior al querer crear una nueva
  useEffect(() => {
    if (modoCrearRuta && mapRef.current && routeLayerRef.current) {
      mapRef.current.removeLayer(routeLayerRef.current);
      routeLayerRef.current = null;
    }
  }, [modoCrearRuta]);

  useEffect(() => {
    if (!mapRef.current) return;
  
    fetch("http://localhost/mountains") // cambiar en producción
      .then(res => res.json())
      .then((data: Montanya[]) => {
        if (montanyasRef.current) {
          mapRef.current!.removeLayer(montanyasRef.current);
        }
  
        const features = data.flatMap((m) => {
          const enrichedFeatures: GeoJSON.Feature[] = [];
  
          if (m.geojson?.type === "FeatureCollection") {
            m.geojson.features.forEach((f: any) => {
              enrichedFeatures.push({
                ...f,
                properties: {
                  ...f.properties,
                  nombre: m.nombre_montanya,
                  descripcion: m.descripcion,
                  dificultad: m.dificultad,
                  acampar: m.acampar,
                  pernoctar: m.pernoctar,
                  especies_peligrosas: m.especies_peligrosas
                }
              });
            });
          }
  
          return enrichedFeatures;
        });
  
        const geoLayer = L.geoJSON(features, {
          onEachFeature: (feature, layer) => {
            const p = feature.properties || {};
            const contenido = `
              <b>${p.nombre ?? "Montaña"}</b><br/>
              <i>${p.descripcion ?? "Sin descripción"}</i><br/>
              <b>Dificultad:</b> ${p.dificultad ?? "Desconocida"}<br/>
              <b>¿Se puede acampar?</b> ${p.acampar ? "Sí" : "No"}<br/>
              <b>¿Se puede pernoctar?</b> ${p.pernoctar ? "Sí" : "No"}<br/>
              <b>¿Especies peligrosas?</b> ${p.especies_peligrosas ? "Sí" : "No"}
            `;
            layer.bindPopup(contenido);
          },
          style: {
            color: "#15803d",
            weight: 2,
            fillOpacity: 0.3
          }
        }).addTo(mapRef.current!);
  
        montanyasRef.current = geoLayer;
      })
      .catch(err => {
        console.error("Error al cargar montañas:", err);
      });
  }, []);
  

  return <div id="map" className="h-[calc(100vh)] w-full z-0" />;
};

export default MapComponent;
