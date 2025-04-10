/* Usada solamente si se ha iniciado sesión */

import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/DarkMode";
import { useTranslation } from "react-i18next";





const ProfileScreen: React.FC = () => {
    const { darkMode } = useContext(DarkModeContext)!;
    const { t } = useTranslation();
    const navigate = useNavigate();
    if (!darkMode) {
        throw new Error("Profile debe usarse dentro de DarkModeProvider");
    }
    
    return (
        <h1>Nigga</h1>
    );
};
export default ProfileScreen;




