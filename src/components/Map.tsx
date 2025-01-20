import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Asegúrate de importar los estilos

const MapComponent = () => {
  useEffect(() => {
    // Crear el mapa y establecer las coordenadas y el zoom inicial
    const map = L.map('map').setView([41.3784, 2.1917], 13); // Coordenadas de Barcelona

    // Añadir la capa de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    // Añadir un marcador
    L.marker([41.3784, 2.1917]).addTo(map)
      .bindPopup('¡Hola, Barcelona!')
      .openPopup();
  }, []);

  return (
    <div
      id="map"
      style={{
        height: '500px', // Tamaño del mapa, ajusta como prefieras
        width: '100%',
      }}
    ></div>
  );
};

export default MapComponent;
