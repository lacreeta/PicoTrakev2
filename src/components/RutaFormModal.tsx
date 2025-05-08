
import React, { useState } from "react";
import axios from "axios";

interface Props {
  puntos: [number, number][];
  onClose: () => void;
}

const RutaFormModal: React.FC<Props> = ({ puntos, onClose }) => {
  const [nombre, setNombre] = useState("");
  const [dificultad, setDificultad] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [loading, setLoading] = useState(false);

  const generarGeoJSON = (): any => ({
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: puntos.map(([lat, lng]) => [lng, lat]),
        },
        properties: {
          nombre,
          dificultad,
          descripcion,
        },
      },
    ],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const geojson = generarGeoJSON();
  
      await axios.post("http://localhost/rutas/", {
        nombre_ruta: nombre,
        dificultad,
        descripcion,
        ubicacion,
        geojson, 
      });
  
      alert("✅ Ruta guardada correctamente");
      onClose();
    } catch (err) {
      console.error("Error al guardar ruta:", err);
      alert("❌ Error al guardar la ruta");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold">Guardar nueva ruta</h2>

        <input
          type="text"
          placeholder="Nombre de la ruta"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded-md"
        />

        <select
          value={dificultad}
          onChange={(e) => setDificultad(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded-md"
        >
          <option value="">Selecciona dificultad</option>
          <option value="fácil">Fácil</option>
          <option value="media">Media</option>
          <option value="difícil">Difícil</option>
        </select>

        <input
          type="text"
          placeholder="Ubicación"
          value={ubicacion}
          onChange={(e) => setUbicacion(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded-md"
        />

        <textarea
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded-md resize-none"
        />

        <div className="flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-md border">
            Cancelar
          </button>
          <button type="submit" disabled={loading} className="bg-teal-600 text-white px-4 py-2 rounded-md">
            {loading ? "Guardando..." : "Guardar ruta"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RutaFormModal;
