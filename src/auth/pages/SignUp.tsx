import React, { useState, useContext } from "react";
import { DarkModeContext } from "../../context/DarkMode";
import FormContainer from "../components/FormContainer";
import { useTranslation } from "react-i18next";
import Logo from '../../components/Logo';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import {
  validateEmailField,
  validatePasswordField
} from "../../utils/validators";
import { AuthContext } from "../../context/AuthContext";

const SignupScreen: React.FC = () => {
  const [mensaje] = useState("");
  const { t } = useTranslation();
  const { darkMode } = useContext(DarkModeContext)!;
  const navigate = useNavigate();
  const { login } = useContext(AuthContext)!;

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

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [contrasenaError, setContrasenaError] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");

  const handleEmailBlur = () => {
    setEmailError(validateEmailField(email, t));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const contrasena = e.target.value;
    setContrasena(contrasena);
    setContrasenaError(validatePasswordField(contrasena, t));
  };

  const handlePasswordBlur = () => {
    setContrasenaError(validatePasswordField(contrasena, t));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { nombre, apellido, email, contrasena };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
      const response = await fetch("https://picotrakeapi-production.up.railway.app/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await response.json();

      if (response.ok) {
        // Login automático tras crear cuenta
        const loginController = new AbortController();
        const loginTimeout = setTimeout(() => loginController.abort(), 5000);

        const loginResponse = await fetch("https://picotrakeapi-production.up.railway.app/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, contrasena }),
          signal: loginController.signal,
        });

        clearTimeout(loginTimeout);

        if (loginResponse.ok) {
          const loginData = await loginResponse.json();
          login(loginData.access_token);

          Swal.fire({
            icon: "success",
            title: t("successTitle"),
            text: t("successMessage"),
            background: darkMode ? "#0f172a" : "#fff",
            color: darkMode ? "#e2e8f0" : "#1f2937",
            confirmButtonText: t("okButton"),
            customClass: {
              popup: "rounded-xl p-6 shadow-lg",
              title: "text-lg font-semibold",
              htmlContainer: "text-base",
              confirmButton: "bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none",
            },
          }).then(() => {
            navigate("/home");
          });
        } else {
          Swal.fire({
            icon: "warning",
            title: t("login_after_signup_failed", "Cuenta creada, pero debes iniciar sesión"),
            text: t("manual_login_required", "Inicia sesión manualmente."),
          }).then(() => {
            navigate("/login");
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: t("errorTitle"),
          text: data.detail || t("errorMessage"),
          background: darkMode ? "#0f172a" : "#fff",
          color: darkMode ? "#e2e8f0" : "#1f2937",
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
          background: darkMode ? "#0f172a" : "#fff",
          color: darkMode ? "#e2e8f0" : "#1f2937",
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
          background: darkMode ? "#0f172a" : "#fff",
          color: darkMode ? "#e2e8f0" : "#1f2937",
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
    <div
      className={`min-h-screen px-6 py-10 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
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
                    if (validateEmailField(e.target.value, t) === "") {
                      setEmailError("");
                    }
                  }}
                  onBlur={handleEmailBlur}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const error = validateEmailField(email, t);
                      if (error) {
                        setEmailError(error);
                      } else {
                        setEmailError("");
                        setStep(2);
                      }
                    }
                  }}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md
                            focus:outline-none focus:border-teal-400 dark:bg-white dark:text-black placeholder-[#666666]"
                />
                <button
                  type="button"
                  onClick={() => {
                    const error = validateEmailField(email, t);
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
                  onChange={handlePasswordChange}
                  onBlur={handlePasswordBlur}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const error = validatePasswordField(contrasena, t);
                      if (error) {
                        setContrasenaError(error)
                      } else {
                        setContrasenaError("");
                        setStep(3);
                      }
                    }
                  }}
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
                    type="button"
                    onClick={() => {
                      const error = validatePasswordField(contrasena, t);
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
    </div>
  );
};
export default SignupScreen;