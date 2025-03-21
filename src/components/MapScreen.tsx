// src/components/MapScreen.tsx
import React, { useState } from "react";
import SearchBar from "./SearchBar";
import MapComponent from "./Map";

const MapScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    console.log("Realizando búsqueda para:", query);
  };

  return (
    <div className="relative" style={{ height: "calc(100vh - 100px)" }}>
      {/* Ubica el SearchBar encima del mapa */}
      <div className="absolute top-4 left-4 z-10 w-full max-w-md">
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
        />
      </div>
      <MapComponent />
    </div>
  );
};

export default MapScreen;
