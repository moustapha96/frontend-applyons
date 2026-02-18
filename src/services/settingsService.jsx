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
 * Exemple de réponse:
 * {
 *   success: true,
 *   data: {
 *     currency: "USD",
 *     demandeAuthentification: 100,
 *     application: 49,
 *     abonnement: { ... }
 *   }
 * }
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

