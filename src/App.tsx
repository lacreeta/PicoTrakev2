import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* Se ven en todas las pantallas */ 
import Header from "./components/Header";
import Footer from "./components/Footer";

/* Autentiación */ 
import SignupScreen from "./auth/pages/SignUp";
import LoginScreen from "./auth/pages/Login";

/* Preferencias */
import SettingsScreen from "./components/pages/Settings";

/* Pantalla de home al iniciar sesión */
import HomeScreen from "./components/pages/Home";

/* Pantalla de mapa */
import MapScreen from "./map/pages/MapScreen";

/* Pantalla de home sin iniciar sesión */
import IndexScreen from "./components/pages/Index";

/* Pantalla de perfil al iniciar sesión */
import ProfileScreen from "./components/pages/Profile";

/* Pantalla de settings para el usuario al iniciar sesión */
import SettingsProfileScreen from "./components/pages/SettingsProfile";

/* Pantalla de cambiar contraseña al iniciar sesión  */
import ChangePasswordScreen from "./components/pages/ChangePassword";

/* Pantalla de inscripción a premium */
import PremiumSubscriptionScreen from "./components/pages/PremiumScreen";

/* Pantalla de ayuda y contacto */
import HelpScreen from "./components/pages/HelpScreen";
import ContactScreen from "./components/pages/ContactScreen";

/* Pantalla de herramientas de seguridad */
import SecurityToolsScreen from "./components/pages/SecurityTool";

/* Pantalla sobre nosotros (el equipo) */
import AboutScreen from "./components/pages/AboutScreen";

/* Término de uso */
import TermsOfUseScreen from "./components/pages/TermsOfUseScreen";

/* Pantalla de rutas */
import RoutesScreen from "./components/pages/RoutesScreen";
import RutaDetalleScreen from "./components/pages/RutaDetalleScreen";

import { DarkModeProvider } from "./context/DarkMode";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./context/AuthContext";
import "./language/i18n";
import "./index.css";
import { useTranslation } from "react-i18next";



const App: React.FC = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);
  return (
    <DarkModeProvider>
      <AuthProvider>
        <LanguageProvider>
          <div className="min-h-screen flex flex-col">
            <Router>
              <Header />
              <main className="flex-grow pt-[100px]">
                <Routes>
                  <Route path="/" element={<IndexScreen />} />
                  <Route path="/home" element={<HomeScreen />} />
                  <Route path="/rutas" element={<RoutesScreen />} />
                  <Route path="/rutas/nombre/:nombre_ruta" element={<RutaDetalleScreen />} />
                  <Route path="/registro" element={<SignupScreen />} />
                  <Route path="/login" element={<LoginScreen />} />
                  <Route path="/settings" element={<SettingsScreen />} />
                  <Route path="/map" element={<MapScreen />} />
                  <Route path="/profile" element={<ProfileScreen />} />
                  <Route path="/userSettings" element={<SettingsProfileScreen />} />
                  <Route path="/change_password" element={<ChangePasswordScreen />} />
                  <Route path="/premium" element={<PremiumSubscriptionScreen />} />
                  <Route path="/help" element={<HelpScreen />} />
                  <Route path="/contact" element={<ContactScreen />} />
                  <Route path="/safety" element={<SecurityToolsScreen />} />
                  <Route path="/about" element={<AboutScreen />} />
                  <Route path="/terms" element={<TermsOfUseScreen />} />
                </Routes>
              </main>
              <Footer />
            </Router>
          </div>
        </LanguageProvider>
      </AuthProvider>
    </DarkModeProvider>
  );
};
export default App;


 /* import { MapContainer, TileLayer, GeoJSON, Marker, Popup, useMap } from "react-leaflet";
  import { LatLng } from "leaflet";
  import { useEffect, useState} from 'react';
  import "./App.css";
  import SearchBar from "./components/SearchBar";
  import axios from 'axios';

  interface Place {
    display_name: string;
    lat: string;
    lon: string;
  }

  function App() {
    const [geojsonData, setGeojsonData] = useState<any>(null);
    const [center, setCenter] = useState<LatLng>(new LatLng(41.3784, 2.1927));
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState<Place[]>([]);
    const [markerPosition, setMarkerPosition] = useState<LatLng | null>(null);
    const [markerName, setMarkerName] = useState<string | null>(null);
    const [style] = useState({
      color: "red",
      weight: 2,
      opacity: 1,
      fillOpacity: 0,
    });
    const [isGeoJsonLoaded, setIsGeoJsonLoaded] = useState(false);

    const truncateText = (text: string, length: number = 50) => {
      return text.length > length ? text.substring(0, length) + "..." : text;
    };

    const handleSearch = () => {
      console.log('Search Query:', searchQuery);
      if (searchQuery.toLowerCase().includes("montseny")) {
        console.log('Buscando Montseny...');
        if (!isGeoJsonLoaded) {
          const loadGeoJSON = async () => {
            console.log('Cargando GeoJSON...');
            try {
              const response = await fetch("/montseny.geojson");
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              const data = await response.json();
              setGeojsonData(data);
              setIsGeoJsonLoaded(true);
            } catch (error) {
              console.error("Error loading GeoJSON:", error);
            }
          };
          loadGeoJSON();
        }
      }
    };

    useEffect(() => {
      const fetchSuggestions = async () => {
        if (searchQuery.length >= 1) {
          try {
            const response = await axios.get('https://nominatim.openstreetmap.org/search', {
              params: {
                q: searchQuery,
                format: 'json',
                addressdetails: 1,
                limit: 5,
              },
            });
            const data = response.data as Place[];
            const truncatedSuggestions = data.map((suggestion) =>  ({
              ...suggestion,
              display_name: truncateText(suggestion.display_name),
            }));
            setSuggestions(truncatedSuggestions);
          } catch (error) {
            console.error("Error fetching suggestions:", error);
            setSuggestions([]);
          }
        } else {
          setSuggestions([]);
          setMarkerPosition(null);
          setMarkerName(null);
        }
      };

      const timeoutId = setTimeout(() => {
        fetchSuggestions();
      }, 300);

      return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    useEffect(() => {
      if (searchQuery.toLowerCase().includes("montseny")) {
        if (!isGeoJsonLoaded) {
          const loadGeoJSON = async () => {
            try {
              const response = await fetch("/montseny.geojson");
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              const data = await response.json();
              setGeojsonData(data);
              setIsGeoJsonLoaded(true);
            } catch (error) {
              console.error("Error loading GeoJSON:", error);
            }
          };
          loadGeoJSON();
        }
      } else {
        if(searchQuery != "") {
          setGeojsonData(null);
          setIsGeoJsonLoaded(false);
        }
      }
    }, [searchQuery, isGeoJsonLoaded]);

    const handleSuggestionSelect = (place: Place) => {
      const newCenter = new LatLng(parseFloat(place.lat), parseFloat(place.lon));
      setCenter(newCenter);
      setMarkerPosition(newCenter);
      setMarkerName(place.display_name);
      setSuggestions([]);
    };

    function MyMapComponent() {  // Componente *dentro* de MapContainer
      const map = useMap(); // Hook para obtener la instancia del mapa
  
      useEffect(() => {
        map.setView(center, 15); // Usa map directamente
      }, [map]);
  
      return null; 
    }

    return (
      <div className="map-wrapper">
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
        />
        {suggestions.length > 0 && (
          <div className="suggestions-list">
            {suggestions.map((suggestion) => (
              <div
                key={`${suggestion.lat}-${suggestion.lon}`}
                className="suggestion-item"
                onClick={() => handleSuggestionSelect(suggestion)}>
                {suggestion.display_name}
              </div>
            ))}
          </div>
        )}
        <MapContainer center={center} zoom={15} scrollWheelZoom={true} style={{ height: "100%" }}>
          <MyMapComponent/>
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.carto.com/">CARTO</a> contributors'
          />

          {markerPosition && (
            <Marker position={markerPosition}>
              <Popup>{markerName}</Popup>
            </Marker>
          )}

          {isGeoJsonLoaded && geojsonData && (
            <GeoJSON data={geojsonData} style={style} />
          )}
        </MapContainer>
      </div>
    );
  }

export default App;
  */