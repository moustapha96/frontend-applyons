

import { toSentenceCase } from "@/helpers";
import { cn } from "@/utils";
import { use, useEffect, useRef, useState } from "react";
import { LuChevronDown, LuLogIn, LuMenu, LuX } from "react-icons/lu";
import { Link, useLocation } from "react-router-dom";

import logo from "@/assets/logo.png";

import { useTranslation } from "react-i18next";

import frFlag from "@/assets/images/landing/hosting/fr.png";
import enFlag from "@/assets/images/landing/hosting/en.png";
import esFlag from "@/assets/images/landing/hosting/es.png";
import deFlag from "@/assets/images/landing/hosting/de.png";
import itFlag from "@/assets/images/landing/hosting/it.png";
import chFlag from "@/assets/images/landing/hosting/ch.png";

const TopNavBar = ({ menuItems, position, hasDownloadButton }) => {
  const { t, i18n } = useTranslation();
  const navbarRef = useRef(null);
  const navigation = ["home", "about", "contact", "privacy", "terms"];
  const { hash, pathname } = useLocation();
  const [activation, setActivation] = useState(menuItems[0]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const flags = {
    en: enFlag,
    fr: frFlag,
    es: esFlag,
    de: deFlag,
    it: itFlag,
    ch: chFlag
  };

  useEffect(() => {
    const handleScroll = (e) => {
      e.preventDefault();
      activeSection();
      if (navbarRef.current) {
        if (window.scrollY >= 80) navbarRef.current.classList.add('nav-sticky');
        else navbarRef.current.classList.remove('nav-sticky');
      }
    };

    document.addEventListener('scroll', handleScroll);

    const timeout = setTimeout(() => {
      if (hash) {
        const element = document.querySelector(hash);
        if (element) element.scrollIntoView({ behavior: 'instant' });
      }
    }, 0);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener('scroll', handleScroll);
    };
  }, [hash]);

  const activeSection = () => {
    const scrollY = window.scrollY;

    for (let i = menuItems.length - 1; i >= 0; i--) {
      const section = menuItems[i];
      const el = document.getElementById(section);
      if (el && el.offsetTop <= scrollY + 100) {
        setActivation(section);
        return;
      }
    }
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setShowLanguageDropdown(false);
  };


  const LanguageSelector = ({ isMobile = false }) => (
    <div className="relative">
      <button
        onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
        className="flex items-center space-x-1 focus:outline-none"
      >

        <img src={flags[i18n.language] || flags['en']} alt={`Drapeau ${i18n.language} ApplyOns`} className="w-6 h-6" />
        <LuChevronDown className="w-4 h-4" />
      </button>
      {showLanguageDropdown && (
        <div className={`absolute ${isMobile ? 'left-0' : 'right-0'} mt-2 py-2 w-32 bg-white rounded-md shadow-xl z-20`}>
          {Object.keys(flags).map((lang) => (
            <button
              key={lang}
              onClick={() => changeLanguage(lang)}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
            >
              <img src={flags[lang]} alt={lang} className="w-5 h-5 mr-2" />
              <span>{lang.toUpperCase()}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <header
      ref={navbarRef}
      id="navbar"
      className={cn(
        position,
        'inset-x-0 top-0 z-[60] w-full border-b border-transparent bg-white transition-all duration-300 dark:bg-gray-800 lg:bg-transparent [&.nav-sticky]:bg-white/90 [&.nav-sticky]:shadow-md [&.nav-sticky]:backdrop-blur-3xl dark:[&.nav-sticky]:bg-gray-800/80'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src={logo}
                alt="ApplyOns"
                className="h-16 w-auto dark:hidden"
              />
              <img
                src={logo}
                alt="ApplyOns"
                className="hidden h-16 w-auto dark:block"
              />
            </Link>
          </div>

          <nav className="hidden lg:flex items-center space-x-4">
            {menuItems.map((item, idx) => (
              <a
                key={idx}
                href={`/#${item}`}
                className={cn(
                  "text font-medium transition-colors hover:text-primary",
                  activation === item ? "text-primary" : "text-gray-600 dark:text-gray-300"
                )}
              >
                {toSentenceCase(item)}
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <LanguageSelector />
            {hasDownloadButton && (
              <a
                href="https://admin.applyons.com/auth/sign-in"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
              >
                {t("auth.signIn.title")}
              </a>
            )}
            <button
              className="lg:hidden focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <LuX className="h-6 w-6" />
              ) : (
                <LuMenu className="h-6 w-6" />
              )}
              <span className="sr-only">Toggle menu</span>
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {menuItems.map((item, idx) => (
              <a
                key={idx}
                href={`/#${item}`}
                className={cn(
                  "block rounded-md px-3 py-2 text-base font-medium",
                  activation === item
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t(toSentenceCase(item))}
              </a>
            ))}
            {hasDownloadButton && (
              <a
                href="https://admin.applyons.com/auth/sign-in"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-md bg-primary px-3 py-2 text-center text-base font-medium text-white hover:bg-primary-dark"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("auth.signIn.title")}
              </a>
            )}
            {/* <div className="mt-4 px-3">
              <LanguageSelector isMobile={true} />
            </div> */}
          </div>
        </div>
      )}
    </header>
  );
};

export default TopNavBar;

