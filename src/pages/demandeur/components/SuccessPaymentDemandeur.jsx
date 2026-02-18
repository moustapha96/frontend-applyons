// src/pages/demandeur/SuccessPaymentDemandeur.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const SuccessPaymentDemandeur = () => {
    const navigate = useNavigate();


    useEffect(() => {
        toast.success("Paiement réussi", {
            position: "top-right",
            duration: 2000,
        });
    }, []);


    const handleContinue = () => {
        navigate('/demandeur/dashboard');
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Paiement réussi</h1>
            <p className="mb-4">Votre paiement a été effectué avec succès.</p>
            <button
                onClick={handleContinue}
                className="w-full bg-blueLogo text-white text-lg py-2 rounded-lg transition duration-300 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Continuer
            </button>
        </div>
    );
};

export default SuccessPaymentDemandeur;
