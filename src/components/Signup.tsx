import React, { useState, useContext } from "react";
import { DarkModeContext } from "../context/DarkMode";
import FormContainer from "./FormContainer";
import { useTranslation } from "react-i18next";

const SignupScreen: React.FC = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error("Signup debe usarse dentro de DarkModeProvider");
  }

  // Estado para controlar el paso actual
  const [step, setStep] = useState(1);
  // Estados para cada campo del formulario
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [mensaje, setMensaje] = useState("");
  const { t } = useTranslation();

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = { nombre, apellido, email, contrasena };

    try {
      const response = await fetch("https://18.205.138.231/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        setMensaje(t("Cuenta creada con éxito."));
        // Aquí podrías redireccionar o resetear el formulario
      } else {
        setMensaje("Error: " + data.detail);
      }
    } catch {
      setMensaje("Error de red");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow-md rounded-lg flex flex-col items-center justify-center">
      <FormContainer className="h-auto flex flex-col justify-center dark:bg-teal-header">
        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 && (
            <div>
              {/* Paso 1: Email */}
              <div>
                <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
                  {t("email")}{":"}
                </label>
                <input
                  type="email"
                  value={email}
                  placeholder="someone@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:border-teal-400 dark:bg-white dark:text-black"
                />
              </div>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="mt-4 w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 rounded-md dark:bg-teal-oscuro dark:hover:bg-teal-oscuroHover"
              >
                {t("Siguiente")}
              </button>
            </div>
          )}
          {step === 2 && (
            <div>
              {/* Paso 2: Contraseña */}
              <div>
                <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
                  {t("password")}{":"}
                </label>
                <input
                  type="password"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:border-teal-400 dark:bg-white dark:text-black"
                />
              </div>
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md"
                >
                  {t("Atrás")}
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-md"
                >
                  {t("Siguiente")}
                </button>
              </div>
            </div>
          )}
          {step === 3 && (
            <div>
              {/* Paso 3: Nombre y Apellido */}
              <h2 className="text-2xl font-bold text-gray-700 dark:text-white">
                {t("¿Cuál es su nombre?")}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                {t("Necesitamos un poco más de información para configurar tu cuenta.")}
              </p>
              <div>
                <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
                  {t("name")}{":"}
                </label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:border-teal-400 dark:bg-white dark:text-black"
                />
              </div>
              <div className="mt-4">
                <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
                  {t("lastName")}{":"}
                </label>
                <input
                  type="text"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:border-teal-400 dark:bg-white dark:text-black"
                />
              </div>
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md"
                >
                  {t("Atrás")}
                </button>
                <button
                  type="submit"
                  className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-md dark:bg-teal-oscuro dark:hover:bg-teal-oscuroHover"
                >
                  {t("createAccount")}
                </button>
              </div>
            </div>
          )}
        </form>
      </FormContainer>
      {mensaje && <p className="mt-4 text-center text-red-500">{mensaje}</p>}
    </div>
  );
};

export default SignupScreen;
