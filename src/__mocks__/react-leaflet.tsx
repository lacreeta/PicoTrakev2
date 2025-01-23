  /* eslint-disable @typescript-eslint/no-explicit-any */
  import React from "react";

  // Definición de tipos
  type Coordinates = [number, number]; // Tipo para coordenadas (latitud, longitud)

  // Props para MapContainer
  interface MapContainerProps {
    children: React.ReactNode;
    center: Coordinates;
    zoom: number;
    whenReady?: () => void; // Prop opcional para manejar el evento "whenReady"
  }

  // Props para TileLayer
  interface TileLayerProps {
    url: string;
  }

  // Definición de la interfaz GeoJSON
  export interface GeoJSONFeature {
    type: "Feature";
    properties: {
      [key: string]: any; // Propiedades dinámicas
    };
    geometry: {
      type: "Point" | "LineString" | "Polygon" | "MultiPoint" | "MultiLineString" | "MultiPolygon";
      coordinates: number[] | number[][] | number[][][];
    };
  }

  export interface GeoJSONData {
    type: "FeatureCollection";
    features: GeoJSONFeature[];
  }

  // Props para el mock de GeoJSON
  interface GeoJSONProps {
    data: GeoJSONData;
    style?: { 
      color: string;
      weight: number;
      opacity: number;
      fillOpacity: number;
    };
  }

  // Props para Marker
  interface MarkerProps {
    position: Coordinates;
    children?: React.ReactNode;
  }


  // Props para Popup
  interface PopupProps {
    children: React.ReactNode;
  }

  // Mock de MapContainer
  export const MapContainer = ({ children, whenReady }: MapContainerProps) => {
    // Simula el evento "whenReady" si está definido
    React.useEffect(() => {
      if (whenReady) {
        whenReady();
      }
    }, [whenReady]);

    return (
      <div data-testid="map-container">
        {children}
      </div>
    );
  };

  // Mock de TileLayer
  export const TileLayer = ({ url }: TileLayerProps) => (
    <div data-testid="tile-layer">{url}</div>
  );

  // Mock de GeoJSON
  export const GeoJSON = ({ data}: GeoJSONProps) => (
    <div data-testid="geojson">
      {JSON.stringify(data)} {/* Simula la renderización de los datos GeoJSON */}
    </div>
  );

  // Mock de Marker
  export const Marker = ({ position }: MarkerProps) => (
    <div data-testid="marker">{JSON.stringify(position)}</div>
  );

  // Mock de Popup
  export const Popup = ({ children }: PopupProps) => (
    <div data-testid="popup">{children}</div>
  );