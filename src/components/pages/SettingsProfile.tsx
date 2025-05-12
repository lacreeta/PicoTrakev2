import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/DarkMode";
import { useTranslation } from "react-i18next";
import FormContainer from "../../auth/components/FormContainer";
import Swal from "sweetalert2";
import axiosInstance from "../../utils/axiosInstance";

const SettingsProfileScreen: React.FC = () => {
  const {darkMode} = useContext(DarkModeContext)!;

  const { t } = useTranslation();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateEmailField = (email: string): string => {
    if (!email) return t("errorEmptyEmail");
    if (!validateEmail(email)) return t("invalidEmailFormat");
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const emailMsg = validateEmailField(email);
  setEmailError(emailMsg);

  if (emailMsg) return;

  try {
    await axiosInstance.put("/usuarios/update", {
      nombre,
      apellido,
      email,
    });

    await Swal.fire({
      icon: "success",
      title: t("profile_update_success_title", "Perfil actualizado"),
      text: t("profile_update_success_text", "Tus cambios han sido guardados correctamente."),
      background: darkMode ? "#202C33" : "#fff",
      color: darkMode ? "#e2e8f0" : "#1f2937",
      confirmButtonColor: darkMode ? "#1a4e51" : "#14b8a6",
      confirmButtonText: t("confirm", "Aceptar"),
    });
    navigate("/home");

  } catch (error: any) {
    const message = error.response?.data?.detail || t("profile_update_error_text", "No se pudo actualizar el perfil.");
    
    await Swal.fire({
      icon: "error",
      title: t("profile_update_error_title", "Error al actualizar"),
      text: message,
      background: darkMode ? "#202C33" : "#fff",
      color: darkMode ? "#e2e8f0" : "#1f2937",
      confirmButtonColor: darkMode ? "#a91d1d" : "#dc2626",
      confirmButtonText: t("confirm", "Aceptar"),
    });
  }
  };
  
  const goToChangePassword = () => {
    navigate("/change_password");
  };

  return (
    <div className={`min-h-screen px-6 py-10 transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
    <div className="min-h-screen flex items-center justify-center p-4">
      <FormContainer className="max-w-md w-full dark:bg-teal-header">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-center mb-4 text-gray-700 dark:text-white">
            {t("profileSettings")}
          </h2>

          <div className="mb-4">
            <label htmlFor="nombre" className="block font-medium mb-1 text-gray-700 dark:text-gray-300">
              {t("name")}
            </label>
            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 dark:bg-white dark:text-gray-800"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="apellido" className="block font-medium mb-1 text-gray-700 dark:text-gray-300">
              {t("lastName")}
            </label>
            <input
              id="apellido"
              type="text"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 dark:bg-white dark:text-gray-800"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-1 text-gray-700 dark:text-gray-300">
              {t("email")}
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 dark:bg-white dark:text-gray-800"
            />
            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              type="submit"
              className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-md dark:bg-teal-oscuro dark:hover:bg-teal-oscuroHover"
            >
              {t("saveChanges")}
            </button>

            <button
              type="button"
              onClick={goToChangePassword}
              className="text-teal-600 hover:underline font-medium"
            >
              {t("changePassword")}
            </button>
          </div>
        </form>
      </FormContainer>
      </div>
    </div>
  );
};

export default SettingsProfileScreen;