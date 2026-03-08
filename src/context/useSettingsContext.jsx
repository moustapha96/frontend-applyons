import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { fetchSettings, fetchPaymentSettings, fetchPageContent } from "@/services/settingsService";

const SettingsContext = createContext(undefined);

export function useSettingsContext() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettingsContext must be used within a SettingsProvider");
  }
  return context;
}

const PAGE_KEYS = [
  "landing",
  "about",
  "contact",
  "privacy-policy",
  "terms-and-conditions",
  "cookie-policy",
  "legal-notice",
  "security-trust",
];

/** Contenu par page et par langue : { "landing": { fr: {...}, en: {...} }, "privacy-policy": {...}, ... } */
const initialPageContent = Object.fromEntries(PAGE_KEYS.map((k) => [k, null]));

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(null);
  const [paymentSettings, setPaymentSettings] = useState(null);
  const [pageContent, setPageContent] = useState(initialPageContent);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadAll() {
      try {
        setLoading(true);

        const [settingsRes, paymentRes, ...pageContentResList] = await Promise.all([
          fetchSettings(),
          fetchPaymentSettings(),
          ...PAGE_KEYS.map((key) => fetchPageContent(key)),
        ]);

        const settingsData = settingsRes?.data ?? settingsRes;
        const paymentData = paymentRes?.data ?? paymentRes;
        const nextPageContent = { ...initialPageContent };
        pageContentResList.forEach((res, i) => {
          const key = PAGE_KEYS[i];
          const content =
            res?.data?.data?.content ??
            res?.data?.content ??
            res?.content ??
            null;
          nextPageContent[key] = content && typeof content === "object" ? content : {};
        });

        if (isMounted) {
          setSettings(settingsData);
          setPaymentSettings(paymentData);
          setPageContent(nextPageContent);
          setError(null);
        }
      } catch (err) {
        console.error(
          "Impossible de charger les paramètres du site / paiement:",
          err
        );
        if (isMounted) {
          setError(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadAll();

    return () => {
      isMounted = false;
    };
  }, []);

  const value = useMemo(
    () => ({
      settings,
      paymentSettings,
      pageContent,
      loading,
      error,
    }),
    [settings, paymentSettings, pageContent, loading, error]
  );

  return (
    <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
  );
}

