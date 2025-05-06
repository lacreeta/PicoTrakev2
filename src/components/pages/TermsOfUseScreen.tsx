import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { DarkModeContext } from "../../context/DarkMode";

const TermsOfUseScreen: React.FC = () => {
  const { t } = useTranslation();
  const context = useContext(DarkModeContext);

  if (!context) {
    throw new Error("TermsOfUseScreen debe usarse dentro de DarkModeProvider");
  }

  return (
    <div className="min-h-screen px-6 py-12 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <section className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">{t("termsOfUse")}</h1>

        <article className="space-y-8 text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold mb-2">1. {t("terms.acceptanceTitle")}</h2>
            <p>{t("terms.acceptanceText")}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">2. {t("terms.serviceTitle")}</h2>
            <p>{t("terms.serviceText")}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">3. {t("terms.responsibilitiesTitle")}</h2>
            <p>{t("terms.responsibilitiesText")}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">4. {t("terms.accountTitle")}</h2>
            <p>{t("terms.accountText")}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">5. {t("terms.intellectualTitle")}</h2>
            <p>{t("terms.intellectualText")}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">6. {t("terms.thirdPartyTitle")}</h2>
            <p>{t("terms.thirdPartyText")}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">7. {t("terms.terminationTitle")}</h2>
            <p>{t("terms.terminationText")}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">8. {t("terms.disclaimerTitle")}</h2>
            <p>{t("terms.disclaimerText")}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">9. {t("terms.modificationsTitle")}</h2>
            <p>{t("terms.modificationsText")}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">10. {t("terms.governingLawTitle")}</h2>
            <p>{t("terms.governingLawText")}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">11. {t("terms.contactTitle")}</h2>
            <p>{t("terms.contactText")}</p>
          </section>
        </article>
      </section>
    </div>
  );
};

export default TermsOfUseScreen;