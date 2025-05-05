import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/DarkMode";
import { useTranslation } from "react-i18next";
import FormContainer from "../../auth/components/FormContainer";

const SettingsProfileScreen: React.FC = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error("SettingsProfileScreen debe usarse dentro de DarkModeProvider");
  } 

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailMsg = validateEmailField(email);
    setEmailError(emailMsg);

    if (!emailMsg) {
      console.log("Perfil actualizado:", { nombre, apellido, email });
    }
  };

  const goToChangePassword = () => {
    navigate("/change_password");
  };

  return (
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
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 dark:bg-white"
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
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 dark:bg-white"
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
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 dark:bg-white"
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
  );
};

export default SettingsProfileScreen;