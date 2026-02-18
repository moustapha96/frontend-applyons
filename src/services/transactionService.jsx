

import { HttpClient } from '../helpers';




const urlApi = import.meta.env.VITE_API_URL
export async function getTransactionsByDemandeur(demandeurId) {
    try {
        const response = await HttpClient.get(`${urlApi}transactions/demandeur/${demandeurId}`);
        return response.data; // Return list of documents
    } catch (error) {
        console.error('Erreur lors de la sélection des documents:', error);
        throw error;
    }
}
