import { HttpClient } from '../helpers';
import i18next from 'i18next';
import axios from "axios";

const urlApi = import.meta.env.VITE_API_URL

// Function to create a new demandeur
export async function createDemandeur(demandeurData) {
    try {
        const response = await HttpClient.post(`${urlApi}create-demandeur`, demandeurData);
        return response.data; // Return success message or created demandeur
    } catch (error) {
        console.error(i18next.t('errors.request.create'), error);
        throw error; // Rethrow the error for handling in the calling function
    }
}

// Function to update an existing demandeur
export async function updateDemandeur(id, demandeurData) {
    try {
        const response = await HttpClient.put(`${urlApi}update-demandeur/${id}`, demandeurData);
        return response.data; // Return success message
    } catch (error) {
        console.error(i18next.t('errors.request.update'), error);
        throw error;
    }
}

// Function to delete a demandeur by ID
export async function deleteDemandeur(id) {
    try {
        const response = await HttpClient.delete(`${urlApi}demandeur/${id}`);
        return response.data; // Return success message
    } catch (error) {
        console.error(i18next.t('errors.request.delete'), error);
        throw error;
    }
}

// Function to get a demandeur by ID
export async function getDemandeur(id) {
    try {
        const response = await HttpClient.get(`${urlApi}show-demandeur/${id}`);
        return response.data; // Return the demandeur data
    } catch (error) {
        console.error(i18next.t('errors.request.fetch'), error);
        throw error;
    }
}
export async function getDemandeurSimple(id) {

    try {
        const response = await HttpClient.get(`${urlApi}demandeur/${id}/details`);
        return response.data; // Return the demandeur data
    }
    catch (error) {
        console.error(i18next.t('errors.request.fetch'), error);
        throw error;
    }
}

export async function getDemandeurSimpleInstitut(id, institutId) {
    try {
        const response = await HttpClient.get(`${urlApi}institut/${institutId}/demandeur/${id}/details`);
        return response.data; // Return the demandeur data
    }
    catch (error) {
        console.error(i18next.t('errors.request.fetch'), error);
        throw error;
    }
}



// Function to get all demandes associated with a specific demandeur ID
export async function getDemandesByDemandeur(demandeurId) {
    try {
        const response = await HttpClient.get(`${urlApi}demandes/demandeur/${demandeurId}`);
        return response.data; // Return list of demandes
    } catch (error) {
        console.error(i18next.t('errors.request.fetch'), error);
        throw error;
    }
}

// get all demandeurs
export async function getAllDemandeurs() {
    try {
        const response = await HttpClient.get(`${urlApi}demandeurs`);
        return response.data; // Return list of demandeurs
    } catch (error) {
        console.error(i18next.t('errors.request.fetch'), error);
        throw error;
    }
}

export async function verificationDocumentsDemandeur(data) {
    try {
        const response = await HttpClient.post(`${urlApi}demandeur/verification`, data)
        return response.data;
    } catch (error) {
        console.error(i18next.t('errors.request.create'), error);
        throw error;
    }
}

export const ajouterDocument = async (documentData) => {
    try {
        const response = await axios.post(`${urlApi}/documents`, documentData)
        return response.data
    } catch (error) {
        console.error(i18next.t('errors.document.add'), error)
        throw error
    }
}

export const supprimerDocument = async (documentId) => {
    try {
        const response = await axios.delete(`${urlApi}/documents/${documentId}`)
        return response.data
    } catch (error) {
        console.error(i18next.t('errors.document.delete'), error)
        throw error
    }
}


export async function getDemandeurDP(id) {
    try {
        const response = await HttpClient.get(`${urlApi}demandeur/${id}/getDP`);
        return response.data; // Return the demandeur data
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'demandeur par ID:', error);
        throw error;
    }
}