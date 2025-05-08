import React from "react";

import { DarkModeProvider } from "./context/DarkMode";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./context/AuthContext";
import { ModoRutaProvider } from "./context/ModoRutaContext";
import "./language/i18n";
import "./index.css";



import AppContent from "./AppContent"; // Asegúrate de que la ruta esté bien

const App: React.FC = () => {
  return (
    <ModoRutaProvider>
      <DarkModeProvider>
        <AuthProvider>
          <LanguageProvider>
            <AppContent />
          </LanguageProvider>
        </AuthProvider>
      </DarkModeProvider>
    </ModoRutaProvider>
  );
};

export default App;
