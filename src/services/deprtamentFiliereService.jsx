import { HttpClient } from "../helpers"

const urlApi = import.meta.env.VITE_API_URL

// fonction pour obtenir la liste des départements et filières
export async function getDepartementFilierer() {
    try {
        const response = await HttpClient.get(`${urlApi}departement-filieres`)
        return response.data
    } catch (error) {
        console.error("Error fetching departement-filieres:", error)
        throw error
    }
}

export async function updateFiliere(institutId, body) {
    try {
        const response = await HttpClient.put(`${urlApi}institut/${institutId}/update-filiere`, body)
        return response.data
    } catch (error) {
        console.error("Error updating filiere:", error)
        throw error
    }
}

export async function createFiliere(institutId, body) {
    try {
        const response = await HttpClient.post(`${urlApi}institut/${institutId}/nouveau-filiere`, body)
        return response.data
    } catch (error) {
        console.error("Error creating filiere:", error)
        throw error
    }
}

// liste filieres institut
export async function filieresInstitut(institutId) {
    try {
        const response = await HttpClient.get(`${urlApi}institut/${institutId}/filieres`)
        return response.data
    } catch (error) {
        console.error("Error fetching filieres institut:", error)
        throw error
    }
}

//  get one departement institut
export async function oneDepartementInstitut(institutId, departementId) {
    try {
        const response = await HttpClient.get(`${urlApi}institut/${institutId}/departement/${departementId}`)
        return response.data
    } catch (error) {
        console.error("Error fetching one departement:", error)
        throw error
    }
}

// update one departement institut
export async function updateDepartementInstitut(institutId, departementId, body) {
    try {
        const response = await HttpClient.put(`${urlApi}institut/${institutId}/departement/${departementId}`, body)
        return response.data
    } catch (error) {
        console.error("Error updating departement:", error)
        throw error
    }
}

// get all departements for institut
export async function departementsInstitut(institutId) {
    try {
        const response = await HttpClient.get(`${urlApi}institut/${institutId}/departements`)
        return response.data
    } catch (error) {
        console.error("Error fetching departements institut:", error)
        throw error
    }
}

// create departement
export async function createDepartement(institutId, body) {
    try {
        const response = await HttpClient.post(`${urlApi}institut/${institutId}/departement`, body)
        return response.data
    } catch (error) {
        console.error("Error creating departement:", error)
        throw error
    }
}

export async function adminDepartement() {
    try {
        const response = await HttpClient.get(`${urlApi}admin/departements`)
        return response.data
    } catch (error) {
        console.error("Error fetching departements institut:", error)
        throw error
    }
}

export async function adminFilieres() {
    try {
        const response = await HttpClient.get(`${urlApi}admin/filieres`)
        return response.data
    } catch (error) {
        console.error("Error fetching departements institut:", error)
        throw error
    }
}