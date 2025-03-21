import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Logo from "/public/image.svg";
import { DarkModeContext } from "../context/DarkMode";
import { AuthContext } from "../context/AuthContext";
import SearchBar from "./SearchBar";

const Header: React.FC = () => {
  const { t } = useTranslation(); // Obtén la función t para traducir
  const { darkMode } = useContext(DarkModeContext)!;
  const { isAuthenticated, logout } = useContext(AuthContext)!;
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const navigate = useNavigate();
  const location = useLocation();
  const isMapScreen = location.pathname === "/map";
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setIsDropdownOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-[100px] flex items-center justify-between px-6 shadow-md
        ${darkMode ? "bg-blue-900 text-white" : "bg-teal-500 text-white"}`}
    >
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={Logo}
            alt={t("logoAlt")}
            className="w-[650px] h-[100px] object-contain"
          />
        </Link>
      </div>

      {/* SearchBar (solo en pantalla de mapa) */}
      {isMapScreen && (
        <div className="flex items-center w-[400px] text-black">
          <SearchBar 
             searchQuery={searchQuery} 
             setSearchQuery={setSearchQuery} 
             handleSearch={(query) => console.log("Buscar:", query)}
          />
        </div>
      )}

      {/* Botones */}
      <div className="flex items-center gap-4">
        <button
          className={`w-[140px] h-[40px] shadow-md rounded-[15px] font-bold text-sm flex items-center justify-center 
            ${darkMode ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-white text-[#00A1A9] hover:bg-teal-500 hover:text-white"}`}
        >
          <Link to="/settings" className="hover:opacity-80">
            {t("settings")}
          </Link>
        </button>
        <button
          className={`w-[140px] h-[40px] shadow-md rounded-[15px] font-bold text-sm flex items-center justify-center 
            ${darkMode ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-white text-[#00A1A9] hover:bg-teal-500 hover:text-white"}`}
        >
          <Link to="/map" className="hover:opacity-80">
            {t("watchTheMap")}
          </Link>
        </button>
        {isAuthenticated ? (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className={`w-[140px] h-[40px] shadow-md rounded-[15px] font-bold text-sm flex items-center justify-center 
                ${darkMode ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-white text-[#00A1A9] hover:bg-teal-500 hover:text-white"}`}
            >
              {t("profile")}
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-[140px] bg-white dark:bg-gray-700 shadow-md rounded-md py-2">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  {t("myProfile")}
                </Link>
                <Link
                  to="/userSettings"
                  className="block px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  {t("settings")}
                </Link>
                <button
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                  className="w-full text-left px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  {t("logout")}
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            className={`w-[140px] h-[40px] shadow-md rounded-[15px] font-bold text-sm flex items-center justify-center 
              ${darkMode ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-white text-[#00A1A9] hover:bg-teal-500 hover:text-white"}`}
          >
            <Link to="/login" className="hover:opacity-80">
              {t("signIn")}
            </Link>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
