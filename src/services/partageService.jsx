
import { HttpClient } from '../helpers';

const urlApi = import.meta.env.VITE_API_URL


export async function getDemandePartageDetail(id) {
    try {
        const response = await HttpClient.get(`${urlApi}demande-partage/${id}/details`);
        return response.data; // Return success message or created demande
    } catch (error) {
        console.error('Erreur lors de la création de la demande:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
}

export async function getFileDocumentPartager(documentId) {
    try {
        const response = await HttpClient.get(`${urlApi}document-partage/${documentId}/file`);
        return response.data; // Return success message
    } catch (error) {
        console.error('Erreur lors de la récupération du document:', error);
        throw error;
    }
}

export async function deleteDocumentTraduit(documentId) {
    try {
        const response = await HttpClient.get(`${urlApi}document-partage-traduit/${documentId}/delete`);
        return response.data; // Return success message
    } catch (error) {
        console.error('Erreur lors de la suppression du document:', error);
        throw error;
    }
}

export async function getFileDocumentPartagerTraduit(documentId) {
    try {
        const response = await HttpClient.get(`${urlApi}document-partage-traduit/${documentId}/file`);
        return response.data; // Return success message
    } catch (error) {
        console.error('Erreur lors de la récupération du document:', error);
        throw error;
    }
}


export async function getDocumentPartageDetail(id) {
    try {
        const response = await HttpClient.get(`${urlApi}document-partage/${id}/details`);
        return response.data; // Return success message or created demande
    } catch (error) {
        console.error('Erreur lors de la création de la demande:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
}


export async function getDemandePartageAdmin() {
    try {
        const response = await HttpClient.get(`${urlApi}demande-partage/admin`);
        return response.data; // Return success message or created demande
    } catch (error) {
        console.error('Erreur lors de la récupération des demandes:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
}


// Function to create a new demande
export async function getDemandePartageDemandeur(id) {
    try {
        const response = await HttpClient.get(`${urlApi}demande-partage/${id}/demandeur`);
        return response.data; // Return success message or created demande
    } catch (error) {
        console.error('Erreur lors de la création de la demande:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
}

export async function getDemandePartageInstitut(id) {
    try {
        const response = await HttpClient.get(`${urlApi}demande-partage/${id}/institut`);
        return response.data; // Return success message or created demande
    } catch (error) {
        console.error('Erreur lors de la création de la demande:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
}

export async function createDemandePartage(data) {
    try {
        const response = await HttpClient.post(`${urlApi}create-demande-partage`, data);
        return response.data; // Return success message or created demande
    } catch (error) {
        console.error('Erreur lors de la création de la demande:', error);
        throw error; 
    }
}


// form-data
export async function addDocumentPartage(data) {
    try {
        const response = await HttpClient.post(`${urlApi}add-document-partage`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        console.log(response.data)
        return response.data; // Return success message or created demande
    } catch (error) {
        console.error('Erreur lors de la création de la demande:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
}

export async function getStatInstitut(id) {
    try {
        const response = await HttpClient.get(`${urlApi}statistique/institut/${id}`);
        return response.data; // Return success message or created demande
    } catch (error) {
        console.error('Erreur lors de la création de la demande:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
}

export async function getStatDemandeur(id) {
    try {
        const response = await HttpClient.get(`${urlApi}statistique/demandeur/${id}`);
        return response.data; // Return success message or created demande
    } catch (error) {
        console.error('Erreur lors de la création de la demande:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
}
export async function getStatAdmin() {
    try {
        const response = await HttpClient.get(`${urlApi}statistique/admin`);
        return response.data; // Return success message or created demande
    } catch (error) {
        console.error('Erreur lors de la création de la demande:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
}

export async function getDocumentPartageDemandeur(id) {
    try {
        const response = await HttpClient.get(`${urlApi}document-partage/${id}/demandeur`);
        return response.data; // Return success message or created demande
    } catch (error) {
        console.error('Erreur lors de la création de la demande:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
}



export async function getDocumentPartageInstitut(id) {
    try {
        const response = await HttpClient.get(`${urlApi}document-partage/${id}/institut`);
        return response.data; // Return success message or created demande
    } catch (error) {
        console.error('Erreur lors de la création de la demande:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
}

export async function getDocumentsDemandePartage(id) {
    try {
        const response = await HttpClient.get(`${urlApi}demande-partage/${id}/documents`);
        return response.data; // Return success message or created demande
    } catch (error) {
        console.error('Erreur lors de la récupération des documents:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
}