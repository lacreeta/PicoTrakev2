import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { DarkModeContext } from "../../context/DarkMode";
import { FaEnvelope, FaComments, FaArrowLeft } from "react-icons/fa";
import Swal from "sweetalert2";
import { validateEmail } from "../../utils/validators";

export const offensiveWords = [
  // Español
  "puta", "puto", "gilipollas", "mierda", "coño", "cabrón", "imbécil", "idiota", "pendejo",
  "maricón", "zorra", "perra", "hijo de puta", "jódete", "estúpido", "subnormal", "malparido",
  "mamón", "pajero", "culiao", "culero", "pelotudo", "verga", "chingar", "chinga tu madre",
  "mierdero", "mierdoso", "joputa", "pichabrava", "pichacorta", "cara de mierda",

  // Inglés
  "fuck", "fucking", "shit", "bitch", "asshole", "bastard", "dick", "pussy", "cunt",
  "motherfucker", "nigger", "nigga", "retard", "slut", "whore", "douche", "cock", "prick",
  "faggot", "twat", "jerkoff", "wanker", "bullshit", "goddamn", "dipshit", "shithead",

  // Català
  "gilipolles", "cabró", "imbècil", "idiota", "subnormal", "merda", "puta", "fill de puta",
  "polla", "cap de suro", "tocacollons", "collons", "capull", "malparit",

  // Francés
  "putain", "connard", "con", "salope", "merde", "bordel", "enculé", "bite", "nique ta mère",
  "salaud", "fils de pute", "chiotte", "pédé", "batard", "tarlouze", "couille", "branleur",

  // Portugués
  "merda", "puta", "caralho", "porra", "foda", "foder", "piranha", "arrombado", "viado",
  "cuzao", "bicha", "corno", "buceta", "rola", "punheta",

  // Alemán
  "scheiße", "fotze", "arschloch", "hurensohn", "wichser", "fick dich", "verdammt", "miststück",

  // Italiano
  "cazzo", "stronzo", "merda", "vaffanculo", "puttana", "bastardo", "troia", "figlio di puttana",

  // Otros comunes y variantes leetspeak o censurados
  "f*ck", "sh*t", "b!tch", "a$$", "c*nt", "d!ck", "m0therf*cker", "f u", "f.u.", "s.u.c.k", "c0ck"
];


const containsOffensiveWords = (text: string): boolean => {
  const lowerText = text.toLowerCase();
  return offensiveWords.some((word) => lowerText.includes(word));
};

const ContactScreen: React.FC = () => {
  const { t } = useTranslation();
  const context = useContext(DarkModeContext);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  if (!context) {
    throw new Error("ContactScreen debe usarse dentro de DarkModeProvider");
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !message) {
      Swal.fire({
        icon: "error",
        title: t("formIncomplete"),
        text: t("pleaseFillAllFields"),
        background: context.darkMode ? "#0f172a" : "#fff",
        color: context.darkMode ? "#e2e8f0" : "#1f2937",
        confirmButtonText: t("okButton"),
      });
      return;
    }

    if (!validateEmail(email)) {
      Swal.fire({
        icon: "error",
        title: t("invalidEmailTitle"),
        text: t("invalidEmailText"),
        background: context.darkMode ? "#0f172a" : "#fff",
        color: context.darkMode ? "#e2e8f0" : "#1f2937",
        confirmButtonText: t("okButton"),
      });
      return;
    }

    if (containsOffensiveWords(message)) {
      Swal.fire({
        icon: "error",
        title: t("inappropriateContentTitle"),
        text: t("inappropriateContentText"),
        background: context.darkMode ? "#0f172a" : "#fff",
        color: context.darkMode ? "#e2e8f0" : "#1f2937",
        confirmButtonText: t("okButton"),
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: t("messageSentTitle"),
      text: t("messageSentText"),
      background: context.darkMode ? "#0f172a" : "#fff",
      color: context.darkMode ? "#e2e8f0" : "#1f2937",
      confirmButtonText: t("okButton"),
    });

    setName("");
    setEmail("");
    setMessage("");
    setShowForm(false);
  };

  return (
    <div className="min-h-screen px-4 py-12 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <section className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">{t("contactTitle")}</h1>
        <p className="mb-8 text-lg text-gray-700 dark:text-gray-300">{t("contactIntro")}</p>

        {showForm ? (
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-left space-y-4"
          >
            <input
              type="text"
              placeholder={t("yourName")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white"
            />
            <input
              type="email"
              placeholder={t("enterEmail")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white"
            />
            <textarea
              placeholder={t("yourMessage")}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white"
              rows={5}
            />
            <button
              type="submit"
              className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded"
            >
              {t("send")}
            </button>
            <div className="flex justify-end">
              <button
                type="button"
                className="flex items-center gap-2 text-sm text-teal-500 mt-2 hover:underline"
                onClick={() => setShowForm(false)}
              >
                {t("backButton")} <FaArrowLeft className="ml-1" />
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md flex flex-col items-center">
              <FaEnvelope className="text-teal-500 text-4xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t("contactEmail")}</h3>
              <p className="text-gray-700 dark:text-gray-400">support@picotrake.com</p>
            </div>

            <button
              onClick={() => setShowForm(true)}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md flex flex-col items-center hover:ring-2 ring-teal-400"
            >
              <FaComments className="text-blue-500 text-4xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t("contactForm")}</h3>
              <p className="text-gray-700 dark:text-gray-400">www.picotrake.com/contact</p>
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default ContactScreen;