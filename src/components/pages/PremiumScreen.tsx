import React, { useContext, useState } from "react";
import FormContainer from "../../auth/components/FormContainer";
import { useTranslation } from "react-i18next";
import { DarkModeContext } from "../../context/DarkMode";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const PremiumSubscriptionScreen: React.FC = () => {
  const navigate = useNavigate();
  
  const { t } = useTranslation();
  const darkModeContext = useContext(DarkModeContext);

  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  if (!darkModeContext) {
    throw new Error("Debe usarse dentro de DarkModeProvider");
  }
  const token = localStorage.getItem("accessToken");
    if (!token) {
      Swal.fire({
        icon: "info",
        title: t("loginRequiredTitle"),
        text: t("loginRequiredText"),
        background: darkModeContext.darkMode ? "#0f172a" : "#fff",
        color: darkModeContext.darkMode ? "#e2e8f0" : "#1f2937",
        confirmButtonText: t("okButton"),
      }).then(() => {
        navigate("/login");
      });
      return null; 
    }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !cardNumber || !expiry || !cvv) {
      Swal.fire({
        icon: "error",
        title: t("formIncomplete"),
        text: t("pleaseFillAllFields"),
        background: darkModeContext.darkMode ? "#0f172a" : "#fff",
        color: darkModeContext.darkMode ? "#e2e8f0" : "#1f2937",
        confirmButtonText: t("okButton"),
      });
      return;
    }
    const [mm, yy] = expiry.split("/");
    const month = parseInt(mm, 10);
    const year = parseInt("20" + yy, 10);

    if (isNaN(month) || month < 1 || month > 12) {
      Swal.fire({
        icon: "error",
        title: t("invalidExpiryTitle"),
        text: t("invalidExpiryText"),
        background: darkModeContext.darkMode ? "#0f172a" : "#fff",
        color: darkModeContext.darkMode ? "#e2e8f0" : "#1f2937",
        confirmButtonText: t("okButton"),
      });
      return;
    }

    const now = new Date();
    const expiryDate = new Date(year, month - 1, 1);

    // Si la fecha de expiración es anterior a este mes
    if (expiryDate < new Date(now.getFullYear(), now.getMonth(), 1)) {
      Swal.fire({
        icon: "error",
        title: t("invalidExpiryTitle"),
        text: t("invalidExpiryText"),
        background: darkModeContext.darkMode ? "#0f172a" : "#fff",
        color: darkModeContext.darkMode ? "#e2e8f0" : "#1f2937",
        confirmButtonText: t("okButton"),
      });
      return;
    }   

    // Simulación de pago exitoso
    Swal.fire({
      icon: "success",
      title: t("subscriptionSuccess"),
      text: t("thankYouPremium"),
      background: darkModeContext.darkMode ? "#0f172a" : "#fff",
      color: darkModeContext.darkMode ? "#e2e8f0" : "#1f2937",
      confirmButtonText: t("okButton"),
    });
    setName("");
    setCardNumber("");
    setExpiry("");
    setCvv("");
    // Aquí iría el proceso real con Stripe
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <FormContainer className="h-auto flex flex-col justify-center dark:bg-teal-header">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-center mb-4 text-gray-700 dark:text-white">
            {t("subscribePremium")}
          </h2>

          <div className="mb-4">
            <label htmlFor="name" className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
              {t("cardholderName")}
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("enterCardholderName")}
              required
              onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity(t("enterCardholderName"))}
              onInput={(e) => (e.target as HTMLInputElement).setCustomValidity("")}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 text-gray-700 dark:text-black placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:border-teal-400"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="cardNumber" className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
              {t("cardNumber")}
            </label>
            <input
              id="cardNumber"
              type="text"
              inputMode="numeric"
              maxLength={16}
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
              placeholder="1234 5678 9012 3456"
              required
              onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity(t("enterValidCardNumber"))}
              onInput={(e) => (e.target as HTMLInputElement).setCustomValidity("")}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 text-gray-700 dark:text-black placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:border-teal-400"
            />
          </div>

          <div className="flex gap-4 mb-4">
            <div className="w-1/2">
              <label htmlFor="expiry" className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
                {t("expiryDate")}
              </label>
              <input
                id="expiry"
                type="text"
                placeholder="MM/YY"
                maxLength={5}
                value={expiry}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, "");
                
                  if (value.length >= 3) {
                    value = value.slice(0, 2) + "/" + value.slice(2, 4);
                  }                
                  setExpiry(value);
                }}
                required
                onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity(t("enterExpiry"))}
                onInput={(e) => (e.target as HTMLInputElement).setCustomValidity("")}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 text-gray-700 dark:text-black placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:border-teal-400"
              />
            </div>

            <div className="w-1/2">
              <label htmlFor="cvv" className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
                CVV
              </label>
              <input
                id="cvv"
                type="text"
                maxLength={4}
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                required
                onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity(t("enterCVV"))}
                onInput={(e) => (e.target as HTMLInputElement).setCustomValidity("")}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 text-gray-700 dark:text-black placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:border-teal-400"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 rounded-md dark:bg-teal-oscuro dark:hover:bg-teal-oscuroHover"
          >
            {t("subscribe")}
          </button>
        </form>
      </FormContainer>
    </div>
  );
};

export default PremiumSubscriptionScreen;