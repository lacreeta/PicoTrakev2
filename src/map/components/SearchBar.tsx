import React, { FC, useContext, useEffect, useState} from "react";
import { FaSearch } from "react-icons/fa";
import { DarkModeContext } from "../../context/DarkMode";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  const { darkMode } = useContext(DarkModeContext)!;
  const [tooltipText, setTooltipText] = useState("Buscar");

  useEffect(() => {
    const userLang = navigator.language;
    const translations: Record<string, string> = {
      es: "Buscar",
      en: "Search",
      fr: "Rechercher",
      de: "Suchen",
      it: "Cercare",
      pt: "Procurar",
    };
    const defaultText = "Buscar";
    setTooltipText(translations[userLang.slice(0, 2)] || defaultText);
  }, []);

  return (
    <div className="flex items-center w-full">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Busca en PicoTrake"
        aria-label="Buscar en PicoTrake"
        className={`p-2 h-[40px] w-full rounded-l-[15px] border focus:outline-none focus:ring-2 
          ${darkMode 
            ? "bg-gray-700 text-white border-gray-600 focus:ring-gray-500" 
            : "bg-white text-[#00A1A9] border-gray-300 focus:ring-teal-400"}`}
      />
      <button
        type="button" // <- importante: NO submit, ya que no queremos interferir con el debounce
        className={`p-2 h-[40px] shadow-md rounded-r-[15px] font-bold text-sm flex items-center justify-center 
          ${darkMode 
            ? "bg-gray-700 text-white hover:bg-gray-600 focus:ring-gray-500" 
            : "bg-white text-[#00A1A9] hover:bg-teal-500 hover:text-white focus:ring-teal-400"}`}
        aria-label={tooltipText}
      >
        <FaSearch />
        <span className="sr-only">{tooltipText}</span>
      </button>
    </div>
  );
};

export default SearchBar;
