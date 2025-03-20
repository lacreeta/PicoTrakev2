import { Link } from "react-router-dom";
import Logo from "/public/image.svg";
import { DarkModeContext } from "../context/DarkMode";
import React, {useContext} from "react";

const Header: React.FC = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error("Header debe usarse dentro de DarkModeProvider");
  }
  const { darkMode } = context;
  return (
    <header
      className={`relative py-3 px-6 flex items-center justify-between h-[100px] w-full shadow-md 
        ${darkMode ? "bg-gray-900 text-white" : "bg-teal-500 text-white"}`}
    >
      {/* Logo y Título */}
      <div className="flex items-center absolute left-0 top-1/2 transform -translate-y-1/2">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={Logo}
            alt="Icono"
            className="w-[650px] h-[100px] object-contain"
          />
        </Link>
      </div>
      {/* Contenedor de Botones */}
      <div className="absolute right-6 top-1/2 transform -translate-y-1/2 flex gap-4">
        {/* Botón SETTINGS */}
        <button
          className={`w-[140px] h-[40px] shadow-md rounded-[15px] font-bold text-sm flex items-center justify-center 
            ${darkMode ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-white text-[#00A1A9] hover:bg-teal-500 hover:text-white"}`}
        >
          <Link to="/settings" className="hover:opacity-80">
            SETTINGS
          </Link>
        </button>
        {/* Botón WATCH THE MAP */}
        <button
          className={`w-[140px] h-[40px] shadow-md rounded-[15px] font-bold text-sm flex items-center justify-center 
            ${darkMode ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-white text-[#00A1A9] hover:bg-teal-500 hover:text-white"}`}
        >
          WATCH THE MAP
        </button>
        {/* Botón SIGN IN */}
        <button
          className={`w-[140px] h-[40px] shadow-md rounded-[15px] font-bold text-sm flex items-center justify-center 
            ${darkMode ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-white text-[#00A1A9] hover:bg-teal-500 hover:text-white"}`}
        >
          <Link to="/login" className="hover:opacity-80">
            SIGN IN
          </Link>
        </button>
      </div>
    </header>
  );
};
export default Header;