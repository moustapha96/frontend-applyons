
import { HttpClient } from '../helpers';




const urlApi = import.meta.env.VITE_API_URL
// Function to create a new institute
export async function createInstitut(institutData) {
    try {
        const response = await HttpClient.post(`${urlApi}create-institut`, institutData);
        return response.data; // Return success message or created institute
    } catch (error) {
        console.error('Erreur lors de la création de l\'institut:', error);
        throw error; // Rethrow the error for handling in the calling function
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

export async function getInstitutPartageDocument(id) {
    try {
        const response = await HttpClient.get(`${urlApi}institut-partage-document/${id}/details`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'institut:', error);
        throw error;
    }
}
export async function getOneInstitut(id) {
    try {
        const response = await HttpClient.get(`${urlApi}institut/${id}/details`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'institut:', error);
        throw error;
    }
}
export async function getOneInsitutDetailsPartgeDocument(id) {
    try {
        const response = await HttpClient.get(`${urlApi}institut-partage-document/${id}/details`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'institut:', error);
        throw error;
    }
}

// Function to update an existing institute
export async function updateInstitut(id, institutData) {
    try {
        const response = await HttpClient.put(`${urlApi}update-institut/${id}`, institutData);
        return response.data; // Return success message
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'institut:', error);
        throw error;
    }
}

// Function to delete an institute by ID
export async function deleteInstitut(id) {
    try {
        const response = await HttpClient.delete(`${urlApi}institut/${id}`);
        return response.data; // Return success message
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'institut:', error);
        throw error;
    }
}

// Function to list all institutes
export async function getInstituts() {
    try {
        const response = await HttpClient.get(`${urlApi}institut`);
        return response.data; // Return list of institutes
    } catch (error) {
        console.error('Erreur lors de la récupération des instituts:', error);
        throw error;
    }
}

export async function getInstitutsSimple() {
    try {
        const response = await HttpClient.get(`${urlApi}institut-simple`);
        return response.data; // Return list of institutes
    } catch (error) {
        console.error('Erreur lors de la récupération des instituts:', error);
        throw error;
    }
}


// get liste-institut
export async function getListeInstituts() {
    try {
        const response = await HttpClient.get(`${urlApi}liste-instituts`);
        return response.data; // Return list of institutes
    } catch (error) {
        console.error('Erreur lors de la récupération des instituts:', error);
        throw error;
    }
}

export async function getInstatutPartageDocumnent() {
    try {
        const response = await HttpClient.get(`${urlApi}institut-partage-document`);
        return response.data; // Return list of institutes
    } catch (error) {
        console.error('Erreur lors de la récupération des instituts:', error);
        throw error;
    }
}

export async function getInstitutForDemandeDemandeur() {
    try {
        const response = await HttpClient.get(`${urlApi}demandeur/instituts`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des instituts:', error);
        throw error;
    }
}

// Function to get an institute by codeUser
export async function getInstitutByCodeUser(codeUser) {
    try {
        const response = await HttpClient.get(`${urlApi}institut/bycodeUser/${codeUser}`);
        return response.data; // Return the institute data
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'institut par codeUser:', error);
        throw error;
    }
}

// api/institut/bytoken/{token}
export async function getInstitutByToken(token) {
    try {
        const response = await HttpClient.get(`${urlApi}institut/bytoken/${token}`);
        return response.data; // Return the institute data
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'institut par token:', error);
        throw error;
    }
}

export async function getInstitutDP(id) {
    try {
        const response = await HttpClient.get(`${urlApi}institut/${id}/getDP`);
        return response.data; // Return the institute data
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'institut par ID:', error);
        throw error;
    }
}