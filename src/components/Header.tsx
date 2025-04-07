import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Logo from "/public/image.svg";
import { DarkModeContext } from "../context/DarkMode";
import { AuthContext } from "../context/AuthContext";
import SearchBar from "../map/components/SearchBar";

const Header: React.FC = () => {
  const { t } = useTranslation(); 
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
        ${darkMode ? "bg-teal-header text-white" : "bg-teal-500 text-white"}`}
    >
      {/* Logo */}
      <div className="flex-1">
        <div className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate(isAuthenticated ? "/home" : "/")}
        >
          <img
            src={Logo}
            alt={t("logoAlt")}
            className="w-[650px] h-[100px] object-contain object-left"
          />
        </div>
      </div>

      {/* SearchBar (solo en pantalla de mapa) */}
      <div className="flex-1 flex justify-center">
        {isMapScreen && (
          <div className="w-[400px]">
            <SearchBar 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery} 
              handleSearch={(query) => console.log("Buscar:", query)}
            />
          </div>
        )}
      </div>

      {/* Botones */}
      <div className="flex-1 flex justify-end items-center gap-4">
        <button
          className={`w-[140px] h-[40px] shadow-md rounded-[15px] font-bold text-sm flex items-center justify-center 
            ${darkMode ? "bg-teal-oscuro text-white hover:bg-teal-oscuroHover" : "bg-white text-teal-500 hover:bg-teal-500 hover:text-white"}`}
        >
          <Link to="/settings" className="hover:opacity-80">
            {t("settings")}
          </Link>
        </button>
        <button
          className={`w-[140px] h-[40px] shadow-md rounded-[15px] font-bold text-sm flex items-center justify-center 
            ${darkMode ? "bg-teal-oscuro text-white hover:bg-teal-oscuroHover" : "bg-white text-teal-500 hover:bg-teal-500 hover:text-white"}`}
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
                ${darkMode ? "bg-teal-oscuro text-white hover:bg-teal-oscuroHover" : "bg-white text-teal-500 hover:bg-teal-500 hover:text-white"}`}
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
              ${darkMode ? "bg-teal-oscuro text-white hover:bg-teal-oscuroHover" : "bg-white text-teal-500 hover:bg-teal-500 hover:text-white"}`}
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
