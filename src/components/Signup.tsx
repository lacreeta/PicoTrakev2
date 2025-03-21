import React, { useState, useContext } from "react";
import { DarkModeContext } from "../context/DarkMode";

const SignupScreen: React.FC = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error("Signup debe usarse dentro de DarkModeProvider");
  }
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      nombre,
      apellido,
      email,
      contrasena,
    };

    try {
      const response = await fetch("https://18.205.138.231/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        setMensaje("Cuenta creada con éxito. Tu ID es: " + data.id_usuarios);
      } else {
        setMensaje("Error: " + data.detail);
      }
    } catch {
      setMensaje("Error de red");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow-md rounded-lg bg-white dark:bg-gray-800">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-700 dark:text-gray-100">
        Crear Cuenta
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campo Nombre */}
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
            Nombre:
          </label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:border-teal-400 dark:bg-white dark:text-black"
          />
        </div>
        {/* Campo Apellido */}
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
            Apellido:
          </label>
          <input
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:border-teal-400 dark:bg-white dark:text-black"
          />
        </div>
        {/* Campo Email */}
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
            Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:border-teal-400 dark:bg-white dark:text-black"
          />
        </div>
        {/* Campo Contraseña */}
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
            Contraseña:
          </label>
          <input
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:border-teal-400 dark:bg-white dark:text-black"
          />
        </div>
        {/* Botón Enviar */}
        <button
          type="submit"
          className="w-full bg-teal-500 dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-teal-600 text-white font-semibold py-2 rounded-md transition-colors"
        >
          Crear Cuenta
        </button>
      </form>
      {mensaje && <p className="mt-4 text-center text-red-500">{mensaje}</p>}
    </div>
  );
};

export default SignupScreen;
