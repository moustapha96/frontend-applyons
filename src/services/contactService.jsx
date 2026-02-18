
import { HttpClient } from '../helpers';




const urlApi = import.meta.env.VITE_API_URL;

// Envoie un message de contact vers l'API
// Essaie d'abord POST /contact, puis fallback sur /contacts/create si la route n'existe pas (404)
export async function createContact(data) {
    const body = JSON.stringify(data);
    const headers = {
        "Content-Type": "application/json",
    };

    // 1. Nouvelle route souhaitée : /contact
    let response = await fetch(urlApi + "contacts", {
        method: "POST",
        headers,
        body,
    });

    // 2. Fallback sur l'ancienne route si /contact n'existe pas encore
    if (!response.ok && response.status === 404) {
        response = await fetch(urlApi + "contacts", {
            method: "POST",
            headers,
            body,
        });
    }

    return response;
}

// Function to get a demande by ID
export async function getContact(id) {
    try {
        const response = await HttpClient.get(`${urlApi}contacts/${id}`);
        return response.data; // Return the demande data
    } catch (error) {
        console.error('Erreur lors de la récupération de la demande:', error);
        throw error;
    }
}

// get all contact 
export async function getAllContact() {
    try {
        const response = await HttpClient.get(`${urlApi}contacts-liste`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la reccuperation des contacts : ', error);
        throw error;
    }
}