import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { useEffect, useState } from 'react';
import "./App.css";

// Definimos las zonas a remarcar con sus coordenadas
const places = [
  { position: [41.3784, 2.1927] as LatLngExpression, name: "Barcelona", area: [[41.378, 2.192], [41.379, 2.193], [41.377, 2.194]]  }, 
  { position: [41.4036, 2.1744] as LatLngExpression, name: "Sagrada Familia", area: [[41.4035, 2.1743], [41.404, 2.175], [41.403, 2.176]] },
  { position: [41.388481, 2.186316] as LatLngExpression, name: "Parc de la Ciutadella", area: [[41.391436, 2.187060], [41.388154, 2.182717], [41.384933, 2.187543], [41.384933, 2.192177], [41.391436, 2.187060]] },
];

function App() {
  const [geojsonData, setGeojsonData] = useState<any>(null);

  useEffect(() => {
    // Cargar el archivo GeoJSON desde la carpeta public
    const loadGeoJSON = async () => {
      const response = await fetch("/ciutadella.geojson");
      const data = await response.json();
      setGeojsonData(data);
    };

    loadGeoJSON();
  }, []);

  const onEachFeature = (feature: any, layer: any) => {
    layer.off("popupopen");
    layer.unbindPopup();
  };

  return (
    <div className="map-wrapper">
      <MapContainer center={[41.3784, 2.1927]} zoom={13} scrollWheelZoom={true} style={{ height: "100%" }} whenCreated ={map => {map.closePopup();}}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Renderizar el GeoJSON solo si se han cargado los datos */}
        {geojsonData && (
          <GeoJSON data={geojsonData} style={{ color: 'red', weight: 2, opacity: 1, fillOpacity: 0.5 }} onEachFeature={onEachFeature}/>
        )}

        {places.map((place, index) => (
          <div key={index}>
            {/* Marcador en el centro de la zona */}
            <Marker position={place.position}>
              <Popup>{place.name}</Popup>
            </Marker>
          </div>
        ))}
      </MapContainer>
    </div>
  );
}

export default App;
