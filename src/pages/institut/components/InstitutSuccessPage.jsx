

import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { useAuthContext } from "../../../context/useAuthContext";
import { updatePaymentIntentInstitut } from "../../../services/paymentService";

const InstitutSuccessPage = () => {
    const { institut } = useAuthContext();

    const location = useLocation();
    const { state } = location;
    const queryParams = new URLSearchParams(location.search);
    const paymentIntent = queryParams.get('payment_intent');
    const paymentIntentClientSecret = queryParams.get('payment_intent_client_secret');
    const redirectStatus = queryParams.get('redirect_status');
    useEffect(() => {
        //console.log(paymentIntent, paymentIntentClientSecret, redirectStatus)

        const updatePaymentIntent = async () => {
            const res = await updatePaymentIntentInstitut(paymentIntent, redirectStatus, institut.id);
            //console.log(res);
        }
        updatePaymentIntent();
    }, [location]);


    return (

        <section >
            <div className="container">
                <div className="my-6 space-y-6">

                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <div className="p-6">

                            <div className="overflow-x-auto">
                                <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                                    <h1 className="text-3xl font-bold text-green-600">Paiement Réussi !</h1>
                                    <p className="mt-4 text-lg text-gray-800">
                                        Merci pour votre paiement. Votre demande a été enregistrée avec succès.
                                    </p>
                                    {state && state.paymentInfo && (
                                        <div className="mt-4">
                                            <h2 className="text-xl font-semibold">Détails du paiement :</h2>
                                            <pre className="mt-2 bg-white p-4 rounded-md border border-gray-300">
                                                {JSON.stringify(state.paymentInfo, null, 2)}
                                            </pre>
                                        </div>
                                    )}
                                    <a
                                        href="/institut/demandes"
                                        className="mt-6 inline-block px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                                    >
                                        Retourner aux demandes
                                    </a>
                                </div>
                            </div>


                        </div>


                    </div>
                </div>
            </div>
        </section>
    );
};


export default InstitutSuccessPage;