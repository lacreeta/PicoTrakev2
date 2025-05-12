import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import { DarkModeContext } from "../../context/DarkMode";
import { useNavigate } from "react-router-dom";
import FormContainer from "../../auth/components/FormContainer";

const ChangePasswordScreen: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { darkMode } = useContext(DarkModeContext)!;
    const token = localStorage.getItem("accessToken");
    if (!token) {
        navigate("/login");
        return;
    }

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validatePassword = (password: string) => {
    const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePassword(newPassword)) {
      Swal.fire({
        icon: "error",
        title: t("invalidPasswordTitle"),
        text: t("invalidPasswordFormat"),
        background: darkMode ? "#0f172a" : "#fff",
        color: darkMode ? "#e2e8f0" : "#1f2937",
        confirmButtonText: t("okButton"),
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: t("passwordMismatchTitle"),
        text: t("passwordMismatchMessage"),
        background: darkMode ? "#0f172a" : "#fff",
        color: darkMode ? "#e2e8f0" : "#1f2937",
        confirmButtonText: t("okButton"),
      });
      return;
    }

    try {
      const res = await fetch("https://api.picotrakeclub.tech/usuarios/update/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          contrasena_actual: currentPassword,
          nueva_contrasena: newPassword,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: t("passwordUpdated"),
          text: t("passwordUpdatedMessage"),
          background: darkMode ? "#0f172a" : "#fff",
          color: darkMode ? "#e2e8f0" : "#1f2937",
          confirmButtonText: t("okButton"),
        });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        throw new Error(data.detail || "Error al cambiar la contraseña");
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: t("error"),
        text: error.message || t("networkErrorMessage"),
        background: darkMode ? "#0f172a" : "#fff",
        color: darkMode ? "#e2e8f0" : "#1f2937",
        confirmButtonText: t("okButton"),
      });
    }
  };

  return (
    <div className={`min-h-screen px-6 py-10 transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
    <div className="min-h-screen flex items-center justify-center p-4">
      <FormContainer className="max-w-md w-full dark:bg-teal-header">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-center mb-4 text-gray-700 dark:text-white">
            {t("changePassword")}
          </h2>

          <div className="mb-4">
            <label htmlFor="current" className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
              {t("currentPassword")}
            </label>
            <input
              id="current"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 dark:bg-white dark:text-gray-800"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="new" className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
              {t("newPassword")}
            </label>
            <input
              id="new"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 dark:bg-white dark:text-gray-800 "
            />
          </div>

          <div className="mb-6">
            <label htmlFor="confirm" className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
              {t("confirmNewPassword")}
            </label>
            <input
              id="confirm"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 dark:bg-white dark:text-gray-800"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 rounded-md dark:bg-teal-oscuro dark:hover:bg-teal-oscuroHover"
          >
            {t("saveChanges")}
          </button>
        </form>
      </FormContainer>
      </div>
    </div>
  );
};

export default ChangePasswordScreen;
