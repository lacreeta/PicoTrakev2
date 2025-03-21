import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { DarkModeContext } from "../context/DarkMode";
import { AuthContext } from "../context/AuthContext";

const LoginScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const darkModeContext = useContext(DarkModeContext);
  if (!darkModeContext) {
    throw new Error("Login debe usarse dentro de DarkModeProvider");
  }
  const { darkMode } = darkModeContext;
  const { login } = useContext(AuthContext)!;
  
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("https://18.205.138.231/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, contrasena }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        login(data.access_token);
        setMensaje(t("loginSuccess"));
        navigate("/home");
      } else {
        setMensaje(t("error") + ": " + data.detail);
      }
    } catch (error) {
      setMensaje(t("networkError"));
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center w-full h-screen p-4 ${
        darkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[350px] bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md h-[450px] flex flex-col justify-center"
      >
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-700 dark:text-white">
          {t("signIn")}
        </h2>

        {/* Campo Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
            {t("email")}
          </label>
          <input
            id="email"
            type="email"
            placeholder={t("enterEmail")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 text-gray-700 dark:text-black placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:border-teal-400"
          />
        </div>

        {/* Campo Password */}
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
            {t("password")}
          </label>
          <input
            id="password"
            type="password"
            placeholder={t("enterPassword")}
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
            className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 text-gray-700 dark:text-black placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:border-teal-400"
          />
        </div>

        {/* Botón Enviar */}
        <button
          type="submit"
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 rounded-md transition-colors"
        >
          {t("signIn")}
        </button>

        {/* Separador */}
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
          <span className="mx-2 text-gray-500 text-sm">or</span>
          <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
        </div>

        <div className="text-center">
          <a href="/forgot-password" className="text-sm text-gray-600 dark:text-gray-300 underline">
            {t("forgotPassword")}
          </a>
        </div>

        {/* Mensaje de error o confirmación */}
        {mensaje && (
          <p className="mt-4 text-center text-red-500 font-medium">{mensaje}</p>
        )}
      </form>
      <div className="mt-4 w-full max-w-[350px] bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md text-center">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {t("noAccount")}{" "}
          <Link to="/registro" className="text-teal-500 hover:underline">
            {t("register")}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
