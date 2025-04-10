import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/DarkMode";
import { useTranslation } from "react-i18next";

const SettingsProfileScreen: React.FC = () => {
  const { darkMode } = useContext(DarkModeContext)!;
  const { t } = useTranslation();
  const navigate = useNavigate();

  if (!darkMode) {
    throw new Error("Profile debe usarse dentro de DarkModeProvider");
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (contrasena: string): boolean => {
    const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    return regex.test(contrasena);
  };

  const validateEmailField = (email: string): string => {
    if (!email) return t("errorEmptyEmail");
    if (!validateEmail(email)) return t("invalidEmailFormat");
    return "";
  };

  const validatePasswordField = (contrasena: string): string => {
    if (!contrasena) return t("errorEmptyPassword");
    if (!validatePassword(contrasena)) return t("invalidPasswordFormat");
    return "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailMsg = validateEmailField(email);
    const passwordMsg = validatePasswordField(password);

    setEmailError(emailMsg);
    setPasswordError(passwordMsg);

    if (!emailMsg && !passwordMsg) {
      // Aquí podrías hacer una petición para actualizar los datos
      console.log("Todo validado. Submitting...");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}>
        <legend>{t("profileSettings")}</legend>

        <div>
          <label htmlFor="email">{t("email")}</label><br />
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <p style={{ color: "red" }}>{emailError}</p>}
        </div>

        <div>
          <label htmlFor="password">{t("password")}</label><br />
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
        </div>

        <button type="submit">{t("saveChanges")}</button>
      </fieldset>
    </form>
  );
};

export default SettingsProfileScreen;