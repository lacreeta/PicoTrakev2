import React, { useState, useContext } from "react";
import { DarkModeContext } from "../../context/DarkMode";
import FormContainer from "../components/FormContainer";
import { useTranslation } from "react-i18next";
import Logo from '../../components/Logo';
import Swal from 'sweetalert2'

const SignupScreen: React.FC = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error("Signup debe usarse dentro de DarkModeProvider");
  }

  // funcion de validación de email con regex
  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // funcion de validación de contraseña con regex
  const validatePassword = (contrasena: string): boolean => {
    const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    return regex.test(contrasena)
  };

  // funcion de validación del input password
  const validatePasswordField = (contrasena: string): string => {
    if (!contrasena) {
      return t("errorEmptyPassword");
    }
    if (!validatePassword(contrasena)) {
      return t("invalidPasswordFormat");
    }
    return "";
  };

  // funcion de validación del input email
  const validateEmailField = (email: string): string => {
    if (!email) {
      return t("errorEmptyEmail");
    }
    if (!validateEmail(email)) {
      return t("invalidEmailFormat");
    }
    return "";
  };

  // funcion para el h2 dependiendo del step
  const getStepTitle = () => {
    switch (step) {
      case 1:
        return t("createAccount");
      case 2:
        return t("createPassword");
      case 3:
        return t("yourName");
      default:
        return "";
    }
  };
  
  // Estados para pasos y campos
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [contrasenaError, setContrasenaError] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [mensaje] = useState("");
  const { t } = useTranslation();

  const handleEmailBlur = () => {
    setEmailError(validateEmailField(email));
  };
  
  const handlePasswordBlur = () => {
    setContrasenaError(validatePasswordField(contrasena));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { nombre, apellido, email, contrasena };
  
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
  
    try {
      const response = await fetch("https://18.205.138.231/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
  
      clearTimeout(timeoutId);
  
      const data = await response.json();
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: t("successTitle"),
          text: t("successMessage"),
          background: context.darkMode ? "#0f172a" : "#fff",
          color: context.darkMode ? "#e2e8f0" : "#1f2937",
          confirmButtonText: t("okButton"),
          customClass: {
            popup: "rounded-xl p-6 shadow-lg",
            title: "text-lg font-semibold",
            htmlContainer: "text-base",
            confirmButton: "bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none",
          },
        });
      } else {
        Swal.fire({
          icon: "error",
          title: t("errorTitle"),
          text: data.detail || t("errorMessage"),
          background: context.darkMode ? "#0f172a" : "#fff",
          color: context.darkMode ? "#e2e8f0" : "#1f2937",
          confirmButtonText: t("okButton"),
          customClass: {
            popup: "rounded-xl p-6 shadow-lg",
            title: "text-lg font-semibold text-red-600",
            confirmButton: "bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none",
          },
        });
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        Swal.fire({
          icon: "error",
          title: t("networkErrorTitle"),
          text: t("networkTimeout"),
          background: context.darkMode ? "#0f172a" : "#fff",
          color: context.darkMode ? "#e2e8f0" : "#1f2937",
          confirmButtonText: t("okButton"),
          customClass: {
            popup: "rounded-xl p-6 shadow-lg",
            title: "text-lg font-semibold text-red-600",
            confirmButton: "bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none",
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: t("networkErrorTitle"),
          text: t("networkErrorMessage"),
          background: context.darkMode ? "#0f172a" : "#fff",
          color: context.darkMode ? "#e2e8f0" : "#1f2937",
          confirmButtonText: t("okButton"),
          customClass: {
            popup: "rounded-xl p-6 shadow-lg",
            title: "text-lg font-semibold text-red-600",
            confirmButton: "bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none",
          }
        });
      }
    }
  }; 

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4">
      <FormContainer className="w-full max-w-[440px] bg-white dark:bg-teal-header rounded-xl shadow-md">
        <div className="w-full p-6">
          {/* Encabezado: logo y título */}
          <div className="mb-4">
            <div className="flex items-center justify-start gap-2 mb-2">
              <Logo className="w-[135px] h-[34px] object-contain text-gray-700 dark:text-white" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-white text-left">
              {getStepTitle()}
            </h2>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
            {step === 1 && (
              <>
                {emailError && (
                  <div id="emailInputError" className="mt-1 text-[#E81123] ">
                    {emailError}
                  </div>
                )}
                <input
                  type="email"
                  value={email}
                  placeholder="someone@example.com"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (validateEmailField(e.target.value) === "") {
                      setEmailError("");
                    }
                  }}
                  onBlur={handleEmailBlur}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md
                            focus:outline-none focus:border-teal-400 dark:bg-white dark:text-black placeholder-[#666666]"
                />
                <button
                  type="button"
                  onClick={() => {
                    const error = validateEmailField(email);
                    if (error) {
                      setEmailError(error);
                      return;
                    }
                    setEmailError("");
                    setStep(2);
                  }}
                  className="self-end mt-4 min-h-[32px] min-w-[108px] bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 rounded-md 
                             dark:bg-teal-oscuro dark:hover:bg-teal-oscuroHover"
                >
                  {t("nextButton")}
                </button>
              </>
            )}

            {step === 2 && (
              <>
                {contrasenaError && (
                  <div id="passwordInputError" className="mt-1 text-[#E81123] ">
                    {contrasenaError}
                  </div>
                )}
                <input
                  type="password"
                  value={contrasena}
                  onChange={(e) => {
                    setContrasena(e.target.value)
                    if (validatePasswordField(e.target.value) === "") {
                      setContrasenaError("");
                    }
                  }}
                  onBlur={handlePasswordBlur}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md
                             focus:outline-none focus:border-teal-400 dark:bg-white dark:text-black"
                />
                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md"
                  >
                    {t("backButton")}
                  </button>
                  <button
                    onClick={() => {
                      const error = validatePasswordField(contrasena);
                      if (error) {
                        setContrasenaError(error);
                        return;
                      }
                      setContrasenaError("")
                      setStep(3)
                    }}
                    className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-md"
                  >
                    {t("nextButton")}
                  </button>
                </div>
              </>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-700 dark:text-white text-center">
                  {t("yourNameTitle")}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 text-center">
                  {t("yourNameSubTitle")}
                </p>
                <div>
                  <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
                    {t("name")}:
                  </label>
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md
                               focus:outline-none focus:border-teal-400 dark:bg-white dark:text-black"
                  />
                </div>
                <div className="mt-4">
                  <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
                    {t("lastName")}:
                  </label>
                  <input
                    type="text"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md
                               focus:outline-none focus:border-teal-400 dark:bg-white dark:text-black"
                  />
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md"
                  >
                    {t("backButton")}
                  </button>
                  <button
                    type="submit"
                    className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-md 
                               dark:bg-teal-oscuro dark:hover:bg-teal-oscuroHover"
                  >
                    {t("createAccount")}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </FormContainer>
      {mensaje && (
        <p className="mt-4 text-center text-red-500">
          {mensaje}
        </p>
      )}
    </div>
  );
};
export default SignupScreen;