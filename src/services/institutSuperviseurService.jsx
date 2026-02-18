
import { HttpClient } from '../helpers';

const urlApi = import.meta.env.VITE_API_URL
// Function to create a new institute

export async function listeSuperviseurInstitut(IdInstitut) {
    try {
        const response = await HttpClient.get(`${urlApi}institut/${IdInstitut}/superviseurs`);

        return response.data; // Return success message or created institute
    } catch (error) {
        console.error('Erreur lors de la création de l\'institut:', error);
        throw error;
    }
}

// create institut superviseur
export async function createInstitutSuperviseur(idInstitut, institutData) {
    try {
        const response = await HttpClient.post(`${urlApi}institut/${idInstitut}/create-superviseur`, institutData);
        return response.data; // Return success message or created institute
    } catch (error) {
        console.error('Erreur lors de la création de l\'institut:', error);
        throw error;
    }
}

// /institut/{ idInstitut }/update-superviseur-status

export async function updateSuperviseurStatus(idInstitut, idSuperviseur, statusAccount) {
    try {
        console.log(statusAccount, idSuperviseur);
        const response = await HttpClient.put(`${urlApi}institut/${idInstitut}/update-superviseur-status`,
            { isActive: statusAccount ? "active" : "desactive", idSuperviseur: idSuperviseur });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la création de l\'institut:', error);
        throw error;
    }
}

export async function updateSuperviseurRole(idInstitut, idSuperviseur, role) {
    try {
        const response = await HttpClient.put(`${urlApi}institut/${idInstitut}/update-superviseur-role`,
            { role: role, idSuperviseur: idSuperviseur });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la création de l\'institut:', error);
        throw error;
    }
}

// Function to get an institute by ID
export async function getInstitut(id) {
    try {
        const response = await HttpClient.get(`${urlApi}institut/${id}/details-institut`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'institut:', error);
        throw error;
    }
}
