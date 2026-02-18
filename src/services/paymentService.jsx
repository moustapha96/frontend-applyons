


import { loadStripe } from "@stripe/stripe-js";
import { HttpClient } from "../helpers";

const urlApi = import.meta.env.VITE_API_URL;
const STRIPE_PUBLIC_KEY = "pk_test_51Q3Lo4JKwZ36wwZjsfyDN25sYUpD8PdUVHWYnryUCISxNjVZzVlqbmg6F3fi8PXGMOXajbDu8O1Gg48BGjJxT1FA0048V89piE";


const PAYPAL_SECRET = "AWUFH6_SN-v1cQIy2WbxjZXqs3NJHPNSBJb_TEpjjQ4JZlKZu-KlTYZpJiWMrPiVGGKVfvhA6XQvKjGt";
// const PAYPAL_ID = "EPVrbMrGtXwKqa_ap6p633vcPzdFbattFojhr_XEPQkO0T9mS_ozWklaRB5Yl_xn-KUaK6Adksw1BOCE";

// const PAYPAL_SECRET = "AWUFH6_SN-v1cQIy2WbxjZXqs3NJHPNSBJb_TEpjjQ4JZlKZu-KlTYZpJiWMrPiVGGKVfvhA6XQvKjGt";
const PAYPAL_ID = "EPVrbMrGtXwKqa_ap6p633vcPzdFbattFojhr_XEPQkO0T9mS_ozWklaRB5Yl_xn-KUaK6Adksw1BOCE";

const paypal_id = "ATY_tA1zy-K2HMNBRpuMcP1zH3QwR8-TC0M2_lywc9wN7ozwyuBiNQgMxNsA4_kecVYReedEmj8ToyhV"


export const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

export const getPayPalConfig = () => {
    return {
        "client-id": paypal_id,
        currency: "USD",
        intent: "capture",
    };
};


export const getPayPalConfigi = async () => {
    try {
        const response = await HttpClient.get(`${urlApi}paypal/config`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la sélection des documents:', error);
        throw error;
    }
};


export const getPublishableKey = async () => {
    try {
        const response = await HttpClient.get(`${urlApi}publishable-key`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la sélection des documents:', error);
        throw error;
    }
};

export const createPayment = async (userId, amount, type = "demandeur") => {
    try {
        const response = await HttpClient.post(`${urlApi}create-payment-intent`, { userId, amount, type });
        return response.data;
    } catch (err) {
        console.error("Erreur création paiement", err);
        throw err;
    }
};

export const confirmPayment = async (stripe, clientSecret, cardElement) => {
    const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card: cardElement,
        },
    });
    return result;
};

export const confirmStripePayment = async (data) => {
    try {
        const response = await HttpClient.post(`${urlApi}payments/confirm`, data);
        return response.data;
    } catch (err) {
        console.error("Erreur création paiement", err);
        throw err;
    }
};

export const updatePayPalPaymentDemandeur = async (data) => {
    try {
        const response = await HttpClient.post(`${urlApi}payment/paypal/confirm`, data);
        return response.data;
    } catch (error) {
        console.error("Erreur création paiement", error);
        throw error;
    }
};
export async function getPaymentsByDemandeur(demandeurId) {
    try {
        const response = await HttpClient.get(`${urlApi}payments/demandeur/${demandeurId}`);
        return response.data; // Return list of documents
    } catch (error) {
        console.error('Erreur lors de la sélection des documents:', error);
        throw error;
    }
}

export async function getPaymentsByInstitut(institutId) {
    try {
        const response = await HttpClient.get(`${urlApi}payments/institut/${institutId}`);
        return response.data; // Return list of documents
    } catch (error) {
        console.error('Erreur lors de la sélection des documents:', error);
        throw error;
    }
}

export async function getPriceDemandeur() {
    try {
        const resp = await HttpClient.getWithoutToken(urlApi + "price/demandeur");
        return resp.data;
    } catch (error) {
        // //console.log(error);
        return error;
    }
}

export async function getPriceInstitut() {
    try {
        const resp = await HttpClient.getWithoutToken(urlApi + "price/institut");
        return resp.data;
    } catch (error) {
        // //console.log(error);
        return error;
    }
}
export const createPaymentIntentInstitut = async (userId, amount) => {
    try {
        const response = await HttpClient.post(`${urlApi}create-payment-intent-institut`, { userId, amount });
        return response.data; // Return list of documents
    } catch (error) {
        console.error('Erreur lors de la création de l\'intention de paiement:', error);
        throw error;
    }
}

export const createPaymentIntentDemandeur = async (userId, amount) => {
    try {
        const response = await HttpClient.post(`${urlApi}create-payment-intent-demandeur`, { userId, amount });
        return response.data; // Return list of documents
    } catch (error) {
        console.error('Erreur lors de la création de l\'intention de paiement:', error);
        throw error;
    }
}


export const processPayPalPayment = async (amount) => {
    // Cette fonction serait normalement appelée côté serveur
    // Ici, nous simulons une réponse réussie
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                paymentInfo: {
                    id: "PAY-" + Math.random().toString(36).substr(2, 9),
                    amount: amount,
                    currency: "USD",
                    method: "PayPal",
                },
            });
        }, 2000);
    });
};

export const processStripePayment = async (stripe, amount) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                paymentInfo: {
                    id: "pi_" + Math.random().toString(36).substr(2, 9),
                    amount: amount,
                    currency: "USD",
                    method: "Stripe",
                },
            });
        }, 2000);
    });
};

export const updatePaymentIntentInstitut = async (paymentIntentId, status, institutId) => {
    try {
        const response = await HttpClient.post(`${urlApi}update-payment-intent-institut`, { paymentIntentId, status, institutId });
        return response.data; // Return list of documents
    } catch (error) {
        console.error('Erreur lors de la création de l\'intention de paiement:', error);
        throw error;
    }
}


export const updatePaymentIntentDemandeur = async (paymentIntentId, status, demandeurId) => {
    try {
        const response = await HttpClient.post(`${urlApi}update-payment-intent-demandeur`, { paymentIntentId, status, demandeurId });
        return response.data; // Return list of documents
    } catch (error) {
        console.error('Erreur lors de la création de l\'intention de paiement:', error);
        throw error;
    }
}

