// src/context/AppContext.js
import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [urlApi, setUrlApi] = useState(import.meta.env.VITE_API_URL);

    const [prixDemandeur, setPrixDemandeur] = useState(import.meta.env.VITE_PRIX_DEMANDEUR);

    const [prixInstitut, setPrixInstitut] = useState(import.meta.env.VITE_PRIX_INSTITUT);

    const [prixUnivercity, setPrixUnivercity] = useState(import.meta.env.VITE_PRIX_UNIVERCITE);

    return (
        <AppContext.Provider value={{ urlApi, setUrlApi, prixDemandeur, prixInstitut, prixUnivercity }}>
            {children}
        </AppContext.Provider>
    );
};
