import { HttpClient } from '../helpers';
import i18next from "i18next";

const urlApi = import.meta.env.VITE_API_URL

export async function getConfiguration() {
    try {
        const response = await HttpClient.get(`${urlApi}configurations/liste`);
        return response.data;
    } catch (error) {
        console.error(i18next.t("errors.configuration.get"), error);
        throw error;
    }
}

export async function getAllSimpleConfiguration() {
    try {
        const response = await HttpClient.getWithoutToken(`${urlApi}configurations/liste-simple`);
        return response.data;
    } catch (error) {
        console.error(i18next.t("errors.configuration.get_all_simple"), error);
        throw error;
    }
}

export const updateConfiguration = async (updatedConfigs) => {

    try {
        const response = await HttpClient.post(`${urlApi}configurations/update`, updatedConfigs);
        return response.data;
    } catch (error) {
        console.error(i18next.t("errors.configuration.update"), error);
        throw error;
    }
};

export const updateLogoConfiguration = async (formData) => {
    try {
        const response = await HttpClient.post(`${urlApi}configurations/update-logo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Spécifie le type de contenu pour le téléchargement de fichiers
            },
        });                                                                                                     
        return response.data;
    } catch (error) {
        console.error(i18next.t("errors.configuration.logo_update"), error);
        throw new Error(i18next.t("errors.configuration.logo_update"));
    }
};