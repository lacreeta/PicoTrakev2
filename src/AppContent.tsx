import React, { useEffect } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useModoRuta } from "./context/ModoRutaContext";

import Header from "./components/Header";
import Footer from "./components/Footer";

import SignupScreen from "./auth/pages/SignUp";
import LoginScreen from "./auth/pages/Login";
import SettingsScreen from "./components/pages/Settings";
import HomeScreen from "./components/pages/Home";
import MapScreen from "./map/pages/MapScreen";
import IndexScreen from "./components/pages/Index";
import ProfileScreen from "./components/pages/Profile";
import SettingsProfileScreen from "./components/pages/SettingsProfile";
import ChangePasswordScreen from "./components/pages/ChangePassword";
import PremiumSubscriptionScreen from "./components/pages/PremiumScreen";
import HelpScreen from "./components/pages/HelpScreen";
import ContactScreen from "./components/pages/ContactScreen";
import SecurityToolsScreen from "./components/pages/SecurityTool";
import AboutScreen from "./components/pages/AboutScreen";
import TermsOfUseScreen from "./components/pages/TermsOfUseScreen";
import RoutesScreen from "./components/pages/RoutesScreen";
import RutaDetalleScreen from "./components/pages/RutaDetalleScreen";

const AppContent: React.FC = () => {
  const { i18n } = useTranslation();
  const { modoCrearRuta } = useModoRuta();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <div className="min-h-screen flex flex-col">
      <Router>
        {!modoCrearRuta && <Header />}
        <main className={`flex-grow ${!modoCrearRuta ? "pt-[100px]" : ""}`}>
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
        {!modoCrearRuta && <Footer />}
      </Router>
    </div>
  );
};

export default AppContent;
