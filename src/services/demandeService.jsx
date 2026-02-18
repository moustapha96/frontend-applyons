
import { HttpClient } from '../helpers';
import httpClient from '../helpers/httpClient';




const urlApi = import.meta.env.VITE_API_URL
// Function to create a new demande
export async function createDemande(demandeData) {
    try {
        const response = await HttpClient.post(`${urlApi}create-demande`, demandeData);
        return response.data; // Return success message or created demande
    } catch (error) {
        console.error('Erreur lors de la création de la demande:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
}

export async function getAllDemandes() {
    try {
        const response = await HttpClient.get(`${urlApi}demandes`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de layses demandes:', error);
        throw error;
    }
}
// Function to get a demande by ID
export async function getDemande(demandeId) {
    try {
        const response = await HttpClient.get(`${urlApi}demandes/${demandeId}`);
        return response.data; // Return the demande data
    } catch (error) {
        console.error('Erreur lors de la récupération de la demande:', error);
        throw error;
    }
}

// Function to update an existing demande
export async function updateDemande(demandeId, updateData) {
    try {
        const response = await HttpClient.put(`${urlApi}demandes/${demandeId}`, updateData);
        return response.data; // Return success message
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la demande:', error);
        throw error;
    }
}

// Function to delete a demande
export async function deleteDemande(demandeId) {
    try {
        const response = await HttpClient.delete(`${urlApi}demandes/${demandeId}`);
        return response.data; // Return success message
    } catch (error) {
        console.error('Erreur lors de la suppression de la demande:', error);
        throw error;
    }
}

// Function to verify a demande by ID
export async function verifierDemande(demandeId, documentData) {
    try {
        const response = await HttpClient.post(`${urlApi}verifier-demande/${demandeId}`, documentData);
        return response.data; // Return success message or errors
    } catch (error) {
        console.error('Erreur lors de la vérification de la demande:', error);
        throw error;
    }
}

// Function to get demandes by demandeur ID

export async function getDemandesByDemandeur(demandeurId) {
    try {
        const response = await HttpClient.get(`${urlApi}demandes/demandeur/${demandeurId}`);
        return response.data; // Return list of demandes
    } catch (error) {
        console.error('Erreur lors de la récupération des demandes:', error);
        throw error;
    }
}

// Function to get demandes by institut ID
export async function getDemandesByInstitut(institutId) {
    try {
        const response = await HttpClient.get(`${urlApi}demandes/institut/${institutId}`);
        return response.data; // Return list of demandes
    } catch (error) {
        console.error('Erreur lors de la récupération des demandes:', error);
        throw error;
    }
}

// function to send verification by codeAdn , nomComplet , dateNaissance
export async function sendVerification(verificationData) {
    try {
        const response = await HttpClient.post(`${urlApi}verification-document`, verificationData);
        return response.data; // Return success message
    } catch (error) {
        console.error('Erreur lors de la création de la demande:', error);
        throw error;
    }
}

export async function sendVerificationWithAbonnement(verificationData) {
    try {
        const response = await HttpClient.post(`${urlApi}verification-document-abonnement`, verificationData);
        return response.data; // Return success message
    } catch (error) {
        console.error('Erreur lors de la création de la demande:', error);
        throw error;
    }
}

// createVerification
export async function createVerification(data) {
    try {
        const response = await HttpClient.post(`${urlApi}verifcation-simple`, data);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la création de la demande:', error);
        throw error;
    }
}

export async function verificationDocument(data) {
    try {
        const response = await HttpClient.post(`${urlApi}documents/verification`, data)
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la création de la demande:', error);
        throw error;
    }
}

export async function updateStatusObervationDemande(id, data) {
    try {
        const response = await HttpClient.put(`${urlApi}demande/${id}/update-status`, data)
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
