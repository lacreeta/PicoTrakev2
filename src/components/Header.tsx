import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Logo from "/src/assets/image.svg";
import { DarkModeContext } from "../context/DarkMode";
import { AuthContext } from "../context/AuthContext";
import SearchBar from "../map/components/SearchBar";

interface HeaderProps {
  searchQuery?: string;
  setSearchQuery?: React.Dispatch<React.SetStateAction<string>>;
  handleSearch?: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery }) => {
  const { t } = useTranslation();
  const { darkMode } = useContext(DarkModeContext)!;
  const { isAuthenticated, logout } = useContext(AuthContext)!;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const isMapScreen = location.pathname === "/map";

  // Cerrar dropdown al cambiar de ruta
  useEffect(() => {
    setIsDropdownOpen(false);
  }, [location]);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0 px-4 sm:px-6 py-2 h-auto sm:h-[100px] shadow-md
        ${darkMode ? "bg-teal-header text-white" : "bg-teal-500 text-white"}`}
    >
      {/* Logo */}
      <div className="flex-1 flex justify-start items-center">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate(isAuthenticated ? "/home" : "/")}
        >
          <img
            src={Logo}
            alt={t("logoAlt")}
            className="h-[80px] sm:h-[100px] w-auto max-w-[90%] object-contain"
          />
        </div>
      </div>

      {/* SearchBar solo en /map */}
      <div className="flex-1 flex justify-center w-full">
        {isMapScreen && searchQuery !== undefined && setSearchQuery && (
          <div className="w-full max-w-[400px] px-2 sm:px-0">
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>
        )}
      </div>

      {/* Botones */}
      <div className="flex-1 flex justify-end items-center gap-2 sm:gap-4 relative">
        <LinkButton to="/settings" label={t("settings")} darkMode={darkMode} />
        <LinkButton to="/map" label={t("watchTheMap")} darkMode={darkMode} />

        {isAuthenticated ? (
          <div className="relative" ref={dropdownRef}>
            <DropdownButton
              isDropdownOpen={isDropdownOpen}
              toggleDropdown={() => setIsDropdownOpen(!isDropdownOpen)}
              logout={logout}
              navigate={navigate}
              t={t}
              darkMode={darkMode}
            />
          </div>
        ) : (
          <LinkButton to="/login" label={t("signIn")} darkMode={darkMode} />
        )}
      </div>
    </header>
  );
};

const LinkButton = ({
  to,
  label,
  darkMode,
}: {
  to: string;
  label: string;
  darkMode: boolean;
}) => (
  <Link
    to={to}
    className={`min-w-[120px] px-4 h-[40px] shadow-md rounded-[15px] font-bold text-sm flex items-center justify-center transition
      ${darkMode
        ? "bg-teal-oscuro text-white hover:bg-teal-oscuroHover"
        : "bg-white text-teal-500 hover:bg-teal-500 hover:text-white"}`}
  >
    {label}
  </Link>
);

const DropdownButton = ({
  isDropdownOpen,
  toggleDropdown,
  logout,
  navigate,
  t,
  darkMode,
}: {
  isDropdownOpen: boolean;
  toggleDropdown: () => void;
  logout: () => void;
  navigate: (path: string) => void;
  t: (key: string) => string;
  darkMode: boolean;
}) => (
  <>
    <button
      onClick={toggleDropdown}
      className={`min-w-[120px] px-4 h-[40px] shadow-md rounded-[15px] font-bold text-sm flex items-center justify-center transition
        ${darkMode
          ? "bg-teal-oscuro text-white hover:bg-teal-oscuroHover"
          : "bg-white text-teal-500 hover:bg-teal-500 hover:text-white"}`}
    >
      {t("profile")}
    </button>
    {isDropdownOpen && (
      <div className="absolute right-0 mt-2 w-[140px] max-w-[90vw] bg-white dark:bg-gray-700 shadow-md rounded-md py-2 z-50">
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
          {t("editProfile")}
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
  </>
);

export default Header;
