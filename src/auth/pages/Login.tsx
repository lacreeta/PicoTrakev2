import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
  import { useTranslation } from "react-i18next";
import { DarkModeContext } from "../../context/DarkMode";
import { AuthContext } from "../../context/AuthContext";
import FormContainer from "../components/FormContainer";
import Swal from 'sweetalert2';
import { FaSpinner } from "react-icons/fa";


const LoginScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {darkMode} = useContext(DarkModeContext)!;
  
  const { login } = useContext(AuthContext)!;
  
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    const payload = { email, contrasena };
    try {
      const response = await fetch("https://api.picotrake.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        login(data.access_token);
        navigate("/home");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: t("invalidCredentials"),
          background: darkMode ? "#0f172a" : "#fff",
          color: darkMode ? "#e2e8f0" : "#1f2937",
          confirmButtonText: t("okButton"),
          customClass: {
            popup: "rounded-xl p-6 shadow-lg",
            title: "text-lg font-semibold",
            htmlContainer: "text-base",
            confirmButton: "bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none",
          },
        });
      }
    } catch (error:any) {
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen px-6 py-10 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
    <div
      className="min-h-screen flex flex-col items-center justify-center w-full h-screen p-4"
    >
      <FormContainer className="h-[450px] flex flex-col justify-center dark:bg-teal-header">
        <form onSubmit={handleSubmit}>
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
              disabled={loading}
              onChange={(e) => setEmail(e.target.value)}
              required
              onInvalid={(e) =>
                (e.target as HTMLInputElement).setCustomValidity(
                  t("Por favor, ingresa un correo válido")
                )
              }
              onInput={(e) =>
                (e.target as HTMLInputElement).setCustomValidity("")
              }
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
              disabled={loading}
              onChange={(e) => setContrasena(e.target.value)}
              required
              onInvalid={(e) =>
                (e.target as HTMLInputElement).setCustomValidity(
                  t("enterPassword")
                )
              }
              onInput={(e) =>
                (e.target as HTMLInputElement).setCustomValidity("")
              }
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 text-gray-700 dark:text-black placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:border-teal-400"
            />
          </div>

          {/* Botón Enviar */}
          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 rounded-md dark:bg-teal-oscuro dark:hover:bg-teal-oscuroHover flex justify-center items-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin w-5 h-5" />
                {t("loading")}
              </>
            ) : (
              t("signIn")
            )}
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
      </FormContainer>
      <div className="mt-4 w-full max-w-[350px] bg-white dark:bg-teal-header p-4 rounded-xl shadow-md text-center">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {t("noAccount")}{" "}
          <Link to="/registro" className="text-teal-500 dark:text-teal-oscuro hover:underline">
            {t("register")}
          </Link>
        </p>
      </div>
      </div>
    </div>
  );
};

export default LoginScreen;
