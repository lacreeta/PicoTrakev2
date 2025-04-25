/* Usada solamente si se ha iniciado sesión */

import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/DarkMode";


interface User {
    nombre: string;
  }
  
  interface Historial {
    nombre_ruta: string;
    fecha: string; 
  }

const HomeScreen: React.FC = () => {
    const { darkMode } = useContext(DarkModeContext)!;
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [historial, setHistorial] = useState<Historial[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchData = async (): Promise<void> => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            navigate("/login");
            return;
        }

        try {
            const headers = { Authorization: `Bearer ${token}` };

            // const { data: userData } = await axios.get("https://18.205.138.231/usuarios/get/me", { headers });
            const { data: userData } = await axios.get("https://localhost/usuarios/get/me", { headers });
            setUser(userData);

            // const { data: historialData } = await axios.get("https://18.205.138.231/historial/usuario/mis-actividades", { headers });
            const { data: historialData } = await axios.get("https://localhost/historial/usuario/mis-actividades", { headers });
            setHistorial(historialData);
        } catch (error) {
            console.error("Error cargando datos del home screen", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    if (loading) return <p>Cargando tu experiencia...</p>;
    if (!user) return <p>No se pudo cargar el usuario</p>;

    return (
        <div
            className={`min-h-screen px-6 py-10 transition-colors duration-300 
            ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}
        >
            <h1 className="text-4xl font-bold text-center mb-10">
                ¡Bienvenido de nuevo, {user.nombre}!
            </h1>
            
            {/* HISTORIAL */}
            <section>
                <h2 className="text-2xl font-semibold mb-4">📍 Tu historial reciente</h2>
                {historial.length === 0 ? (
                    <p className="text-gray-500">Aún no has hecho ninguna ruta.</p>
                ) : (
                    <ul className="list-disc pl-6 space-y-2">
                        {historial.map((actividad, index) => (
                            <li key={index}>
                                <span className="font-medium">{actividad.nombre_ruta}</span>{" "}
                                - {new Date(actividad.fecha).toLocaleDateString()}
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
};      
export default HomeScreen;