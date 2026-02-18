// api / institut / { id } / dossier - a - traiter

import { HttpClient } from '../helpers';
const urlApi = import.meta.env.VITE_API_URL


export async function getDossierAtraiter(institutId) {
    try {
        const response = await HttpClient.get(`${urlApi}institut/${institutId}/dossier-a-traiter`);
        return response.data; // Return success message or created demande
    } catch (error) {
        console.error('Erreur lors de la création de la demande:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
}
// /api/institut/{id}/dossier-a-traiter/{dossierId}

export async function getDossierAtraiterDetails(institutId, dossierId) {
    try {
        const response = await HttpClient.get(`${urlApi}institut/${institutId}/dossier-a-traiter/${dossierId}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des détails du dossier à traiter:', error);
        throw error;
    }
}
// institut/{id}/dossier-a-traiter/{dossierId}/documents

export async function getDossierAtraiterDocuments(institutId, dossierId) {
    try {
        const response = await HttpClient.get(`${urlApi}institut/${institutId}/dossier-a-traiter/${dossierId}/documents`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des documents du dossier à traiter:', error);
        throw error;
    }
}

export async function getDossierATraiterDemandeur(institutId, demandeurId) {
    try {
        const response = await HttpClient.get(`${urlApi}institut/${institutId}/dossier-a-traiter/demandeur/${demandeurId}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des dossiers à traiter:', error);
        throw error;
    }
}

export async function getDossierATraiterInstitut(institutId, id) {
    try {
        const response = await HttpClient.get(`${urlApi}institut/${institutId}/dossier-a-traiter/institut/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des dossiers à traiter:', error);
        throw error;
    }
}

// institut/document/{documentId}/traduit'

export async function setDocumentTraduit(institutId, documentId, formData) {
    try {
        const response = await HttpClient.post(`${urlApi}institut/${institutId}/document/${documentId}/traduit`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération du document traduit:', error);
        throw error;
    }
}

export async function getInstitutTypeTraducteur() {
    try {
        const response = await HttpClient.get(`${urlApi}institut/type-traducteur`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des types de traducteurs:', error);
        throw error;
    }
}