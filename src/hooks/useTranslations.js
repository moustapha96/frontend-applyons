import { useState, useMemo } from 'react';
import { useTranslation as useI18n } from 'react-i18next';

export const useTranslation = () => {
  const { t, i18n } = useI18n();
  const [language, setLanguage] = useState(i18n.language);

  // Memoize les traductions pour éviter les recalculs inutiles
  const getTranslation = useMemo(() => {
    return (key) => {
      if (!key) return '';
      
      // Optimisation pour les traductions imbriquées
      const parts = key.split('.');
      let translation = t(parts[0]);
      
      // Si la traduction est un objet, on continue de naviguer
      if (typeof translation === 'object' && parts.length > 1) {
        return parts.slice(1).reduce((acc, part) => {
          if (typeof acc === 'object' && acc[part]) {
            return acc[part];
          }
          return acc;
        }, translation);
      }
      
      return translation;
    };
  }, [t]);

  // Gestion du changement de langue
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
  };

  return {
    t: getTranslation,
    language,
    changeLanguage,
  };
};
