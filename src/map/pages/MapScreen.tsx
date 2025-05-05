import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import MapComponent from "../components/Map";
import { useRef } from "react";



const MapScreen: React.FC = () => {
  const skipNextSearch = useRef(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const handleSearch = async (query: string) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json`
      );
      const data = await response.json();
      if (data.length > 0) {
        setSuggestions(data);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error al buscar en Nominatim:", error);
      setSuggestions([]);
    }
  };

  useEffect(() => {
    if (skipNextSearch.current) {
      skipNextSearch.current = false;
      return; 
    }
    const delayDebounce = setTimeout(() => {
      if (searchQuery.length > 2) {
        handleSearch(searchQuery);
      } else {
        setSuggestions([]);
      }
    }, 500);
  
    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);
  

  return (
    <>
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />

      {/* Lista de sugerencias */}
      {suggestions.length > 0 && (
        <div className="absolute z-50 top-[110px] left-1/2 transform -translate-x-1/2 w-[400px] max-h-[300px] overflow-y-auto bg-white shadow-lg rounded-md">
          {suggestions.map((place, index) => (
            <div
              key={index}
              onClick={() => {
                skipNextSearch.current = true; 
                setSearchResult(place);
                setSearchQuery(place.display_name); 
                setSuggestions([]);

                const input = document.querySelector('input[aria-label="Buscar en PicoTrake"]') as HTMLInputElement;
                if (input) input.blur();
              }}
              className="p-2 cursor-pointer hover:bg-gray-100 border-b text-sm text-gray-700"
            >
              {place.display_name}
            </div>
          ))}
        </div>
      )}

      <div className="relative" style={{ height: "calc(100vh - 100px)" }}>
        <MapComponent searchResult={searchResult} />
      </div>
    </>
  );
};

export default MapScreen;