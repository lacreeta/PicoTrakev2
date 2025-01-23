import { render, screen } from "@testing-library/react";
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, GeoJSONData} from "../__mocks__/react-leaflet"; // Importa los mocksj

// Datos de prueba para GeoJSON
const mockGeoJSONData : GeoJSONData = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "Location A" },
      geometry: {
        type: "Point",
        coordinates: [2.1734, 41.3851], // Coordenadas de ejemplo
      },
    },
  ],
};

// Estilo de prueba para GeoJSON
const mockStyle = {
  color: "red",
  weight: 2,
  opacity: 1,
  fillOpacity: 0,
};

// Test principal
test("MapContainer renders all components correctly", () => {
  // Renderiza el componente MapContainer con sus hijos
  render(
    <MapContainer center={[41.3851, 2.1734]} zoom={10}>
      <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <GeoJSON data={mockGeoJSONData} style={mockStyle} />
      <Marker position={[41.3851, 2.1734]}>
        <Popup>Location A</Popup>
      </Marker>
    </MapContainer>
  );

  // Verifica que MapContainer se renderice correctamente
  expect(screen.getByTestId("map-container")).toBeInTheDocument();

  // Verifica que TileLayer se renderice con la URL correcta
  expect(screen.getByTestId("tile-layer")).toHaveTextContent(
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png"
  );

  // Verifica que GeoJSON se renderice con los datos correctos
  expect(screen.getByTestId("geojson")).toHaveTextContent(
    JSON.stringify(mockGeoJSONData)
  );

  // Verifica que Marker se renderice con la posición correcta
  expect(screen.getByTestId("marker")).toHaveTextContent(
    JSON.stringify([41.3851, 2.1734])
  );

  // Verifica que Popup se renderice con el contenido correcto
  expect(screen.getByTestId("popup")).toHaveTextContent("Location A");
});