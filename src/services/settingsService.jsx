import { HttpClient } from "../helpers";

const urlApi = import.meta.env.VITE_API_URL;

/**
 * Récupère les paramètres globaux du site depuis l'API.
 * Endpoint backend: GET /api/settings
 */
export async function fetchSettings() {
  try {
    const response = await HttpClient.get(`${urlApi}settings`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des paramètres du site:", error);
    throw error;
  }
}

/**
 * Récupère les paramètres de paiement.
 * Endpoint backend: GET /settings/payment-settings/get-all
 */
export async function fetchPaymentSettings() {
  try {
    const response = await HttpClient.get(
      `${urlApi}settings/payment-settings/get-all`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des paramètres de paiement:",
      error
    );
    throw error;
  }
}

/**
 * Récupère le contenu éditable d'une page du frontend (landing, about, contact, privacy-policy, terms-and-conditions, cookie-policy, legal-notice, security-trust).
 * Réponse: { success, data: { pageKey, content: { fr: {...}, en: {...} } } }
 * Endpoint backend: GET /settings/page-content/:pageKey
 */
export async function fetchPageContent(pageKey) {
  try {
    const response = await HttpClient.get(
      `${urlApi}settings/page-content/${pageKey}`
    );
    console.log("response", response.data);
    return response.data;
  } catch (error) {
    console.error("Erreur récupération contenu page:", error);
    return { success: false, data: { pageKey, content: {} } };
  }
}

