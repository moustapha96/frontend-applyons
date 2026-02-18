import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { fetchSettings, fetchPaymentSettings } from "@/services/settingsService";

const SettingsContext = createContext(undefined);

export function useSettingsContext() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettingsContext must be used within a SettingsProvider");
  }
  return context;
}

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(null);
  const [paymentSettings, setPaymentSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadAll() {
      try {
        setLoading(true);

        const [settingsRes, paymentRes] = await Promise.all([
          fetchSettings(),
          fetchPaymentSettings(),
        ]);

        const settingsData = settingsRes?.data ?? settingsRes;
        const paymentData = paymentRes?.data ?? paymentRes;

        if (isMounted) {
          setSettings(settingsData);
          setPaymentSettings(paymentData);
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
      loading,
      error,
    }),
    [settings, paymentSettings, loading, error]
  );

  return (
    <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
  );
}

