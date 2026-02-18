import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './../locales/en.json';
import translationFR from './../locales/fr.json';
import translationES from './../locales/es.json';
import translationDE from './../locales/de.json';
import translationIT from './../locales/it.json';
import translationCH from './../locales/ch.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: translationEN
      },
      fr: {
        translation: translationFR
      },
      es: {
        translation: translationES
      },
      de: {
        translation: translationDE
      },
      it: {
        translation: translationIT
      },
      ch: {
        translation: translationCH
      }
    }
  });

export default i18n;
