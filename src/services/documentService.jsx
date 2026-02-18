
import { HttpClient } from '../helpers';




const urlApi = import.meta.env.VITE_API_URL
// Function to create a new document


// Function to verify a document
export async function verifyDocument(verificationData) {
    try {
        const response = await HttpClient.post(`${urlApi}verification-document`, verificationData);
        return response.data; // Return verification result
    } catch (error) {
        console.error('Erreur lors de la vérification du document:', error);
        throw error;
    }
}

// Function to get a document by its ID
export async function getDocument(documentId) {
    try {
        const response = await HttpClient.get(`${urlApi}documents/${documentId}`);
        return response.data; // Return the document data
    } catch (error) {
        console.error('Erreur lors de la récupération du document:', error);
        throw error;
    }
}

// Function to delete a document by its ID
export async function deleteDocument(documentId) {
    try {
        const response = await HttpClient.delete(`${urlApi}documents/${documentId}`);
        return response.data; // Return success message
    } catch (error) {
        console.error('Erreur lors de la suppression du document:', error);
        throw error;
    }
}


export async function getAllDocuments() {
    try {
        const response = await HttpClient.get(`${urlApi}documents`);
        return response.data; // Return list of documents
    } catch (error) {
        console.error('Erreur lors de la sélection des documents:', error);
        throw error;
    }
}

// get document by id
export async function getDocumentById(documentId) {
    try {
        const response = await HttpClient.get(`${urlApi}documents/institut/one/${documentId}`);
        return response.data; // Return the document data
    } catch (error) {
        console.error('Erreur lors de la sélection du document:', error);
        throw error;
    }
}

export async function getFileDocument(documentId) {
    try {
        const response = await HttpClient.get(`${urlApi}documents/file/${documentId}`);
        return response.data; // Return success message
    } catch (error) {
        console.error('Erreur lors de la mise à jour du document:', error);
        throw error;
    }
}

// get documents by id demandeur
export async function getDocumentByIdDemandeur(demandeurId) {
    try {
        const response = await HttpClient.get(`${urlApi}documents/demandeur/${demandeurId}`);
        return response.data; // Return list of documents
    } catch (error) {
        console.error('Erreur lors de la sélection des documents:', error);
        throw error;
    }
}

// get documents by id institut
export async function getDocumentByIdInstitut(institutId) {
    try {
        const response = await HttpClient.get(`${urlApi}documents/institut/${institutId}`);
        return response.data; // Return list of documents
    } catch (error) {
        console.error('Erreur lors de la sélection des documents:', error);
        throw error;
    }
}

// fonction pour verifier un document
export async function confirmerDemande(data) {
    try {
        const response = await HttpClient.post(`${urlApi}confirmation-demande`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data; // Return success message or errors
    } catch (error) {
        console.error('Erreur lors de la vérification du document:', error);
        throw error;
    }
}

export async function ajouterDocumentDemandeur(data) {
    try {
        const response = await HttpClient.post(`${urlApi}documents/ajouter-document-demandeur`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data; // Return success message or errors
    } catch (error) {
        console.error('Erreur lors de la vérification du document:', error);
        throw error;
    }
}


export async function addMassDocumentInstitut(data) {
    try {
        const response = await HttpClient.post(`${urlApi}documents/mass-document-demandeur`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data; // Return success message or errors
    } catch (error) {
        console.error('Erreur lors de la vérification du document:', error);
        throw error;
    }
}
