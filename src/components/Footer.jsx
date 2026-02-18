import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, LinkedinOutlined } from "@ant-design/icons";
import logo from "@/assets/logo.png";
import { useSettingsContext } from "@/context";

const Footer = () => {
  const { t } = useTranslation();
  const { settings } = useSettingsContext();
  const currentYear = new Date().getFullYear();

  const siteName = settings?.siteName || "ApplyOns";
  const social = settings?.socialMedia || {};
  const footerText = settings?.footer;

  return (
    <footer className="bg-[#f9fafb] py-16 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">


          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4 space-x-2">
              <img src={logo} alt={t("alt.logo")} className="h-8 w-8" />
              <h4 className="text-xl font-semibold text-[#24377A]">{siteName}</h4>
            </div>
            <p className="text-[#4b5563] mb-6">
              {t("applyons.footer.description")}
            </p>
            <div className="flex space-x-6">
              <a
                href={social.facebook || "https://www.facebook.com/profile.php?id=61577351653295"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4b5563] hover:text-[#24377A] text-xl"
                aria-label="Facebook ApplyOns"
              >
                <FacebookOutlined />
              </a>
              <a
                href={social.twitter || "https://x.com/esefemdiop?s=11"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4b5563] hover:text-[#24377A] text-xl"
                aria-label="X (Twitter) ApplyOns"
              >
                <TwitterOutlined />
              </a>
              <a
                href={social.instagram || "https://www.instagram.com/applyonsny?igsh=d3k3b216dHBtaWdo&utm_source=qr"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4b5563] hover:text-[#24377A] text-xl"
                aria-label="Instagram ApplyOns"
              >
                <InstagramOutlined />
              </a>
              <a
                href={social.linkedin || "https://www.linkedin.com/company/applyons/"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4b5563] hover:text-[#24377A] text-xl"
                aria-label="LinkedIn ApplyOns"
              >
                <LinkedinOutlined />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-lg font-semibold text-[#254c6b] mb-4">{t("applyons.footer.product")}</h4>
            <ul className="space-y-3">
              <li>
                <Link to="#features" className="text-[#4b5563] hover:text-[#24377A]">
                  {t("applyons.footer.features")}
                </Link>
              </li>
              <li>
                <Link to="#pricing" className="text-[#4b5563] hover:text-[#24377A]">
                  {t("applyons.footer.pricing")}
                </Link>
              </li>
              <li>
                <Link to="#faq" className="text-[#4b5563] hover:text-[#24377A]">
                  {t("applyons.footer.faq")}
                </Link>
              </li>
              {/* <li>
                <Link to="/#testimonials" className="text-[#4b5563] hover:text-[#24377A]">
                  {t("applyons.footer.testimonials")}
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold text-[#254c6b] mb-4">{t("applyons.footer.company")}</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-[#4b5563] hover:text-[#24377A]">
                  {t("applyons.footer.about")}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[#4b5563] hover:text-[#24377A]">
                  {t("applyons.footer.contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold text-[#254c6b] mb-4">{t("applyons.footer.legal")}</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy-policy" className="text-[#4b5563] hover:text-[#24377A]">
                  {t("applyons.footer.privacy")}
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="text-[#4b5563] hover:text-[#24377A]">
                  {t("applyons.footer.terms")}
                </Link>
              </li>
            </ul>
          </div>
        </div>



        <div className="mt-5 pt-8 border-t border-gray-200 text-center">
          <p className="text-[#4b5563]">
            {footerText || `© ${currentYear} ${siteName}. ${t("applyons.footer.copyright")}`}
          </p>
        </div>


      </div>
    </footer>
  );
};

export default Footer;

