import React, { FC, useEffect, useState} from "react";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: (query: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ searchQuery, setSearchQuery, handleSearch }) => {
  const [tooltipText, setTooltipText] = useState("Buscar");

  useEffect(() => {
    const userLang = navigator.language;

    const translations: Record<string, string> = {
      "es": "Buscar",
      "en": "Search",
      "fr": "Rechercher",
      "de": "Suchen",
      "it": "Cercare",
      "pt": "Procurar",
    };
    const defaultText = "Buscar";
    setTooltipText(translations[userLang.slice(0, 2)] || defaultText);
  }, []);
  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Busca en PicoTrake"
      />
      <div className="search-icon" onClick={() => handleSearch(searchQuery)}>
        <FaSearch className = "icon"/>
        <span className="tooltip">{tooltipText}</span>
        </div>
    </div>
  );
};

export default SearchBar;
