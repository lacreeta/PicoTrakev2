import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, contrasena }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("accessToken", data.access_token);
        setMensaje("Inicio de sesión exitoso");
      } else {
        setMensaje("Error: " + data.detail);
      }
    } catch (error) {
      setMensaje("Error de red");
    }
  };

  return (
    <div className="min-h-screen flex  flex-col items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="
          w-full max-w-[350px]
          bg-white p-6 rounded-xl shadow-md h-[450px]
          flex flex-col justify-center
        "
      >
        <h2 className="text-2xl font-bold text-center mb-4">
          Inicia sesión
        </h2>

        {/* Campo Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 text-gray-700 font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Ingresa tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="
              w-full border border-gray-300 rounded-md p-2 text-gray-700
              placeholder-gray-400 focus:outline-none focus:border-teal-400
            "
          />
        </div>

        {/* Campo Password */}
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1 text-gray-700 font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Ingresa tu contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
            className="
              w-full border border-gray-300 rounded-md p-2 text-gray-700
              placeholder-gray-400 focus:outline-none focus:border-teal-400
            "
          />
        </div>

        {/* Botón Enviar */}
        <button
          type="submit"
          className="
            w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold
            py-2 rounded-md transition-colors
          "
        >
          Sign In
        </button>

        {/* Separador */}
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-2 text-gray-500 text-sm">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <div className="text-center">
          <a href="/forgot-password" className="text-sm text-gray-600 underline">
            Forgot password?
          </a>
        </div>

        {/* Mensaje de error o confirmación */}
        {mensaje && (
          <p className="mt-4 text-center text-red-500 font-medium">{mensaje}</p>
        )}
      </form>
      <div className=" mt-4 w-full max-w-[350px] bg-white p-4 rounded-xl shadow-md text-center">
        <p className="text-sm text-gray-700">
          ¿No tienes una cuenta?{" "}
          <Link to="/registro" className="text-teal-500 hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
