import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    

    const map = L.map('map').setView([41.3784, 2.1917], 13); 
    mapRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div
      id="map"
      style={{
        height: 'calc(100vh - 100px)', 
        width: '100%',
      }}
    ></div>
  );
};

export default MapComponent;
