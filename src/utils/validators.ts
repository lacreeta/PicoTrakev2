// src/utils/validators.ts
type TranslatorFunction = (key: string) => string;

// Validación básica de email
export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Validación de contraseña (mínimo 8 caracteres, mayúscula, minúscula, número y símbolo)
export const validatePassword = (password: string): boolean => {
  const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  return regex.test(password);
};

// Validación con mensajes traducidos para campo email
export const validateEmailField = (email: string, t: TranslatorFunction): string => {
  if (!email) return t("errorEmptyEmail");
  if (!validateEmail(email)) return t("invalidEmailFormat");
  return "";
};

// Validación con mensajes traducidos para campo contraseña
export const validatePasswordField = (password: string, t: TranslatorFunction): string => {
  if (!password) return t("errorEmptyPassword");
  if (!validatePassword(password)) return t("invalidPasswordFormat");
  return "";
};
