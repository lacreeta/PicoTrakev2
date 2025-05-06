import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { DarkModeContext } from "../context/DarkMode";
import { useContext } from "react";
import Logo from "/Logo.png";
import GooglePlay from "/GooglePlay.png"
import Swal from "sweetalert2";

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const { darkMode } = useContext(DarkModeContext)!;
  if (!darkMode === undefined) {
    throw new Error("Footer debe usarse dentro de DarkModeProvider");
  }

  useEffect(() => {
    const privacyNotice = localStorage.getItem("hasSeenPrivacyNotice")
    if (!privacyNotice) {
      Swal.fire({
        title: t("transparencyMessageTitle"),
        text: t("transparencyMessageText"),
        icon: "info",
        background: darkMode ? "#0f172a" : "#fff",
        color: darkMode ? "#e2e8f0" : "#1f2937",
        confirmButtonText: t("understandButton"),
        customClass: {
          popup: "rounded-xl p-6 shadow-lg",
          title: "text-lg font-semibold",
          htmlContainer: "text-base",
          confirmButton: "bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none",
        },
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then(() => {
        localStorage.setItem("hasSeenPrivacyNotice", "true")
      });
    }
  }, []);

  return (
    <footer className={`${darkMode ? "bg-teal-header text-white" : "bg-gray-100 text-gray-800"} pt-10 shadow-inner`}>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-6 gap-6 pb-10 items-stretch">
        {/* Get the App */}
        <div className="h-full">
          <h3 className="font-bold mb-3">{t("getTheApp")}</h3>
          <a href="https://play.google.com/store/apps/details?id=com.innersloth.spacemafia" target="_blank" rel="noopener noreferrer">
            <img src={GooglePlay} alt="Get it on Google Play" />
          </a>
        </div>

        {/* Explore */}
        <div className="h-full">
          <h3 className="font-bold mb-3">{t("explore")}</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/map" className="hover:underline">{t("worldMap")}</Link></li>
            <li><Link to="/explore/hiking" className="hover:underline">{t("hiking")}</Link></li>
            <li><Link to="/explore/camping" className="hover:underline">{t("camping")}</Link></li>
          </ul>
        </div>

        {/* About PicoTrake */}
        <div className="h-full">
          <h3 className="font-bold mb-3">{t("aboutPicoTrake")}</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:underline">{t("aboutUs")}</Link></li>
            <li><Link to="/help" className="hover:underline">{t("helpCenter")}</Link></li>
            <li><Link to="/contact" className="hover:underline">{t("contact")}</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div className="h-full">
          <h3 className="font-bold mb-3">{t("services")}</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/premium" className="hover:underline">{t("picoTrakePremium")}</Link></li>
            <li><Link to="/safety" className="hover:underline">{t("safetyTools")}</Link></li>
          </ul>
        </div>

        {/* Social */}
        <div className="flex flex-col items-start gap-3 h-full">
          <h3 className="font-bold mb-3">{t("followUs")}</h3>
          <div className="flex gap-4">
            <a href="https://x.com/kanyewest" className="hover:opacity-80" target="_blank" rel="noopener noreferrer">
              <img src="https://img.icons8.com/ios-filled/24/x.png" alt="X" />
            </a>
            <a href="#" className="hover:opacity-80" target="_blank" rel="noopener noreferrer">
              <img src="https://img.icons8.com/ios-filled/24/instagram-new.png" alt="Instagram" />
            </a>
          </div>
        </div>
        {/* Logo */}
        <div className="flex flex-col items-start gap-3 h-full">
            <a href="/" className="hover:opacity-80">
                <img src={Logo} alt="PicoTrake Logo" className="h-24 w-auto" />
            </a>
        </div>
      </div>

      {/* Bottom bar */}
    <div className={`${darkMode ? "bg-teal-oscuroHover text-white" : "bg-teal-600 text-white"} text-sm py-4`}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
            <p className="mb-2 md:mb-0">© PicoTrake. {t("allRightsReserved")}</p>
            <div className="flex gap-4 items-center text-sm">
                <Link to="/terms" className="hover:underline">{t("termsOfUse")}</Link>
                <Link to="/privacy" className="hover:underline">{t("privacy")}</Link>
            </div>
        </div>
    </div>
    </footer>
  );
};

export default Footer;