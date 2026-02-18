import axios from 'axios';
import { HttpClient } from '../helpers';
import { AppContext } from '../AppContext';



const urlApi = import.meta.env.VITE_API_URL

// fonction pour obtenir la liste des abonnements
export async function getAbonnements() {
    try {
        const response = await HttpClient.get(`${urlApi}abonnements`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la sélection des abonnements:', error);
        throw error;
    }
}
// la liste des aboonements pour une institut
export async function getAbonnementsByInstitut(institutId) {
    try {
        const response = await HttpClient.get(`${urlApi}abonnements/institut/${institutId}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la sélection des abonnements:', error);
        throw error;
    }
}

export async function getAbonnementsByInstitutActif(institutId) {
    try {
        const response = await HttpClient.get(`${urlApi}abonnements/institut/actif/${institutId}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la sélection des abonnements:', error);
        throw error;
    }
}

export async function createAbonnement(data) {
    try {
        const response = await HttpClient.post(`${urlApi}abonnements/nouveau`, data);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la création de l\'abonnement:', error);
        throw error;
    }
}

export async function createAbonnementByAdmin(data) {
    try {
        const response = await HttpClient.post(`${urlApi}admin/abonnements/nouveau`, data);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la création de l\'abonnement:', error);
        throw error;
    }
}