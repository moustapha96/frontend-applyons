

import { LuUpload, LuSearch, LuChevronLeft, LuChevronRight, LuFile, LuList, LuListMinus } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { useAuthContext } from "@/context";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from "sonner";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { getPayPalConfig, processPayPalPayment, processStripePayment, stripePromise, getPublishableKey, createPaymentIntentInstitut } from "../../../services/paymentService";
import CheckoutForm from "../../demandeur/components/CheckoutForm";
import { AppContext } from "@/AppContext";



export const initStripe = async () => {
    try {
        const response = await getPublishableKey();
        // //console.log(response.publishable_key)
        const publishableKey = response.publishable_key;
        return loadStripe(publishableKey);
    } catch (error) {
        // //console.log(error)
    }
};


const schema = yup.object({
    nomComplet: yup.string().required("Le nom complet est requis"),
    dateNaissance: yup.date().required("La date de naissance est requise"),
    codeAdn: yup.string().required("Le code ADN est requis"),
    paymentMethod: yup.string().required("La méthode de paiement est requise"),
});


const InstitutNouvelleDemande = () => {
    const { saveSession, role, institut } = useAuthContext();
    const { urlApi, prixDemandeur, prixInstitut, prixUnivercity } = useContext(AppContext)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isFormValid, setIsFormValid] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [paymentAmount, setPaymentAmount] = useState(institut?.type == "Université" ? prixUnivercity : prixInstitut);
    const stripePromise = initStripe();
    const [clientSecretSettings, setClientSecretSettings] = useState({
        clientSecret: "",
        loading: true,
    });

    useEffect(() => {
        async function createPaymentIntentState() {

            try {
                // let prix = institut?.type == "Université" ? prixUnivercity : prixInstitut;
                const response = await createPaymentIntentInstitut(institut.id, paymentAmount);
                setClientSecretSettings({
                    clientSecret: response.client_secret,
                    loading: false,
                });
            } catch (error) {
                console.error('Error payment key:', error);
                throw error;
            }
        }
        createPaymentIntentState();
    }, []);

    const navigate = useNavigate();
    const { control, handleSubmit, formState: { errors, isSubmitting }, watch, getValues } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            nomComplet: '',
            dateNaissance: '',
            codeAdn: '',
            paymentMethod: '',
        }
    });
    const onSubmit = async (data) => {
        setIsFormValid(true);
    };

    const handlePayment = async (paymentMethod) => {
        const formData = getValues();
        let paymentResult;

        try {
            if (paymentMethod === 'paypal') {
                paymentResult = await processPayPalPayment(paymentAmount);
            } else if (paymentMethod === 'stripe') {
                const stripe = await stripePromise;
                paymentResult = await processStripePayment(stripe, paymentAmount);
            }

            if (paymentResult.success) {
                setPaymentStatus('success');
                const submitData = {
                    ...formData,
                    institutId: institut?.id,
                    resultat: 'Pending',
                    paymentInfo: paymentResult.paymentInfo,
                };

                await createDemande(submitData);
                toast.success("Demande enregistrée avec succès et paiement effectué", {
                    position: "top-right",
                    duration: 2000,
                });
                navigate('/institut/demandes');
            } else {
                setPaymentStatus('failed');
                toast.error("Le paiement a échoué. Veuillez réessayer.", {
                    position: "top-right",
                    duration: 2000,
                });
            }
        } catch (error) {
            setPaymentStatus('failed');
            toast.error("Une erreur est survenue lors du paiement", {
                position: "top-right",
                duration: 2000,
            });
        }
    };

    const selectedInstitut = watch("institutId");
    const selectedPaymentMethod = watch("paymentMethod");

    return (

        <PayPalScriptProvider options={getPayPalConfig()}>

            <section >
                <div className="container">
                    <div className="my-6 space-y-6">

                        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                                <h4 className="text-xl font-semibold text-gray-800 uppercase">Nouvelle Demande</h4>
                                <Link
                                    to="/institut/demandes"
                                    className="inline-flex items-center gap-x-1.5 rounded-full bg-blueLogo px-3 py-1.5 text-xs font-medium text-white transition-all duration-300 hover:bg-primary-700"
                                >
                                    <LuListMinus className="ms-1.5 size-4" /> Liste
                                </Link>
                            </div>

                            <div className="max-w-3xl mx-auto px-4 py-8 bg-white shadow-md rounded-md">
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    <div>
                                        <label htmlFor="NomComplet" className="block text-sm font-medium text-gray-700">Nom complet</label>
                                        <Controller
                                            name="nomComplet"
                                            control={control}
                                            render={({ field }) => (
                                                <input
                                                    {...field}
                                                    type="text"
                                                    id="nomComplet"
                                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                />
                                            )}
                                        />
                                        {errors.nomComplet && <p className="mt-2 text-sm text-red-500">{errors.nomComplet.message}</p>}
                                    </div>


                                    <div>
                                        <label htmlFor="codeAdn" className="block text-sm font-medium text-gray-700">code Adn</label>
                                        <Controller
                                            name="codeAdn"
                                            control={control}
                                            render={({ field }) => (
                                                <input
                                                    {...field}
                                                    type="text"
                                                    id="codeAdn"
                                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                />
                                            )}
                                        />
                                        {errors.codeAdn && <p className="mt-2 text-sm text-red-500">{errors.codeAdn.message}</p>}
                                    </div>


                                    <div>
                                        <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">Méthode de paiement</label>
                                        <Controller
                                            name="paymentMethod"
                                            control={control}
                                            render={({ field }) => (
                                                <select
                                                    {...field}
                                                    id="paymentMethod"
                                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                                >
                                                    <option value="">Sélectionnez une méthode de paiement</option>
                                                    {/* <option value="paypal">PayPal</option> */}
                                                    <option value="stripe">Stripe</option>
                                                </select>
                                            )}
                                        />
                                        {errors.paymentMethod && <p className="mt-2 text-sm text-red-500">{errors.paymentMethod.message}</p>}
                                    </div>

                                    <div className="flex justify-end space-x-4">
                                        <button
                                            type="button"
                                            onClick={() => navigate('/institut/demandes')}
                                            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Annuler
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Valider le formulaire
                                        </button>
                                    </div>
                                </form>

                                {isFormValid && (
                                    <div className="mt-8">
                                        <h5 className="text-lg font-semibold mb-4">Procéder au paiement</h5>
                                        {selectedPaymentMethod === 'paypal' && (
                                            <PayPalButtons
                                                createOrder={(data, actions) => {
                                                    return actions.order.create({
                                                        purchase_units: [
                                                            {
                                                                amount: {
                                                                    value: paymentAmount.toString(),
                                                                },
                                                            },
                                                        ],
                                                    });
                                                }}
                                                onApprove={(data, actions) => handlePayment('paypal')}
                                            />
                                        )}
                                        {selectedPaymentMethod === 'stripe' && <>

                                            {clientSecretSettings.loading ? (
                                                <h1>Loading ...</h1>
                                            ) : (
                                                <Elements
                                                    stripe={stripePromise}
                                                    options={{
                                                        clientSecret: clientSecretSettings.clientSecret,
                                                        appearance: { theme: "stripe" },
                                                    }}
                                                >
                                                    <CheckoutForm
                                                        type="institut"
                                                        amount={paymentAmount}
                                                        institut={institut}
                                                        data={{
                                                            nomComplet: getValues('nomComplet'),
                                                            codeAdn: getValues('codeAdn'),
                                                            dateNaissance: getValues('dateNaissance'),
                                                            paymentMethod: getValues('paymentMethod')
                                                        }}
                                                        demandeur=""
                                                        typePayment="nouvelleDemande"
                                                    />
                                                </Elements>
                                            )}
                                        </>}
                                    </div>
                                )}

                                {paymentStatus === 'success' && (
                                    <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md">
                                        Paiement réussi ! Votre demande a été enregistrée.
                                    </div>
                                )}
                                {paymentStatus === 'failed' && (
                                    <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
                                        Le paiement a échoué. Veuillez réessayer.
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </PayPalScriptProvider>
    );
}

export default InstitutNouvelleDemande;