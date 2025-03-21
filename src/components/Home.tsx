import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


interface User {
    nombre: string;
  }
  
  interface Anuncio {
    titulo: string;
    contenido: string;
  }
  
  interface Historial {
    nombre_ruta: string;
    fecha: string; 
  }

const HomeScreen: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [anuncios, setAnuncios] = useState<Anuncio[]>([]);
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

            const { data: userData } = await axios.get("https://18.205.138.231/usuarios/get/me", { headers });
            setUser(userData);

            const { data: anunciosData } = await axios.get("https://18.205.138.231/anuncios", { headers });
            setAnuncios(anunciosData);

            const { data: historialData } = await axios.get("https://18.205.138.231/historial/usuario/mis-actividades", { headers });
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
    if (loading) return <p>Cargando tu experiencia, primo...</p>;
    if (!user) return <p>No se pudo cargar el usuario</p>;

    return (
        <div style={{ padding: "20px" }}>
            <h1 className="text-4xl font-bold text-black flex justify-center">
                ¡Bienvenido de nuevo, {user.nombre}!
            </h1>

        {anuncios.length > 0 && (
            <section>
            <h2>Anuncios para ti</h2>
            {anuncios.map((anuncio, index) => (
                <div key={index} style={{ border: "1px solid #ccc", marginBottom: "10px", padding: "10px" }}>
                <h3>{anuncio.titulo}</h3>
                <p>{anuncio.contenido}</p>
                </div>
            ))}
            </section>
        )}

        <section>
            <h2>Tu historial reciente</h2>
            {historial.length === 0 ? (
            <p>Aún no has hecho ninguna ruta.</p>
            ) : (
            <ul>
                {historial.map((actividad, index) => (
                <li key={index}>
                    {actividad.nombre_ruta} - {new Date(actividad.fecha).toLocaleDateString()}
                </li>
                ))}
            </ul>
            )}
        </section>
        </div>
    );
};
export default HomeScreen;