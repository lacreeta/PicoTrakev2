/* Usada solamente si se ha iniciado sesión */

import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserData } from "../../types/UserData";
import { SubscriptionData } from "../../types/SubscriptionData";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/DarkMode";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";


const formatDate = (fechaISO: string | Date, locale: string = "es-ES"): string => {
    const fecha = new Date(fechaISO);
    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(fecha);
  };
  
const ProfileScreen: React.FC = () => {
    const {darkMode} = useContext(DarkModeContext)!;
    const { t } = useTranslation();
    const [loading, setLoading] = useState<boolean>(true);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
    const navigate = useNavigate();
    
    const fetchData = async (): Promise<void> => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            navigate("/login");
            return;
        }
        try {
            const headers = { Authorization: `Bearer ${token}` };
            const { data: User } = await axios.get("https://api.picotrakeclub.tech/usuarios/get/meAll", { headers });
            setUserData(User)
            if (User.id_suscripciones) {
                const { data: sub } = await axios.get(`https://api.picotrakeclub.tech/suscripciones/${User.id_suscripciones}`, { headers });
                setSubscription(sub);
            }
        } catch (error) {
            console.error("Error al cargar el perfil: ", error)
            navigate("/login")
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return (
        <div className="flex flex-col justify-center items-center h-screen bg-white dark:bg-teal-header text-gray-700 dark:text-white">
          <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg font-medium">{t("loadingProfile") || "Cargando tu perfil..."}</p>
        </div>
    ); 
    
    if (!userData) return <p>No se pudo cargar tu perfil.</p>;
    
    return (
        <div className={`min-h-screen px-6 py-10 transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
        <div className="max-w-xl mx-auto mt-10 bg-white dark:bg-teal-header shadow-md rounded-xl p-6 text-gray-800 dark:text-white">
            <h2 className="text-2xl font-bold mb-4">{t("myProfile") || "Tu perfil"}</h2>
            <p><strong>Nombre: </strong> {userData.nombre}</p>
            <p><strong>Apellido: </strong> {userData.apellido}</p>
            <p><strong>Email: </strong> {userData.email}</p>
            <p><strong>Fecha de registro: </strong> 
                {userData.fecha_registro ? formatDate(userData.fecha_registro) : "No disponible"}
            </p>

            {subscription ? (
            <p className="mt-4">
                <strong>Suscripción:</strong>{" "}
                <span className="inline-block px-2 py-1 bg-teal-100 text-teal-800 text-sm rounded-md dark:bg-teal-700 dark:text-white">
                {subscription.tipo}
                </span>
            </p>
            ) : (
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-300">
                No tienes ninguna suscripción activa.
            </p>
            )}
            <Link 
                to="/userSettings"
                className="text-teal-600 hover:underline font-medium mt-4 inline-block"
            >
                Editar perfil
            </Link>
            </div>
        </div>
    );
};
export default ProfileScreen;




