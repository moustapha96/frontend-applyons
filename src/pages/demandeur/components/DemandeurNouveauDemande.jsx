

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createDemande } from "../../../services/demandeService";
import { useAuthContext } from "@/context";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { List } from "lucide-react";
import { getInstitutForDemandeDemandeur } from "../../../services/institutService";
import { toast } from "sonner";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { getPayPalConfig, confirmStripePayment, getPublishableKey, createPayment, updatePayPalPaymentDemandeur, processStripePayment } from "../../../services/paymentService";
import CheckoutForm from "./CheckoutForm";
import { useTranslation } from "react-i18next";




const schema = yup.object({
    intitule: yup.string().required("demandeur.errors.intituleRequired"),
    institutId: yup.string().nullable(),
    nameInstitut: yup.string().when('institutId', {
        is: (val) => !val,
        then: (schema) => schema.required("demandeur.errors.nameInstitutRequired"),
        otherwise: (schema) => schema.nullable()
    }),
    emailInstitut: yup.string().when('institutId', {
        is: (val) => !val,
        then: (schema) => schema.email("demandeur.errors.invalidEmail").required("demandeur.errors.emailInstitutRequired"),
        otherwise: (schema) => schema.nullable()
    }),
    phoneInstitut: yup.string().when('institutId', {
        is: (val) => !val,
        then: (schema) => schema.required("demandeur.errors.phoneInstitutRequired"),
        otherwise: (schema) => schema.nullable()
    }),
    adresseInstitut: yup.string().when('institutId', {
        is: (val) => !val,
        then: (schema) => schema.required("demandeur.errors.adresseInstitutRequired"),
        otherwise: (schema) => schema.nullable()
    }),
    paysInstitut: yup.string().when('institutId', {
        is: (val) => !val,
        then: (schema) => schema.required("demandeur.errors.paysInstitutRequired"),
        otherwise: (schema) => schema.nullable()
    }),
    anneeObtention: yup.number().required("demandeur.errors.anneeObtentionRequired").min(1990).max(new Date().getFullYear()),
    paymentMethod: yup.string().required("demandeur.errors.paymentMethodRequired"),
});

export default function Component() {
    const { demandeur } = useAuthContext();
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [instituts, setInstituts] = useState([]);
    const [isFormValid, setIsFormValid] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [paymentAmount, setPaymentAmount] = useState(15);
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecretSettings, setClientSecretSettings] = useState({
        clientSecret: "",
        loading: true,
        payment_intent_id: "",
    });


    useEffect(() => {
        const initializeStripe = async () => {
            try {
                const response = await getPublishableKey();
                const publishableKey = response.publishable_key;
                setStripePromise(loadStripe(publishableKey));
            } catch (error) {
                console.error(t('demandeur.errors.stripeInitializationError'), error);
            }
        };
        initializeStripe();
    }, [t]);

    useEffect(() => {
        async function createPaymentIntentState() {
            try {
                const response = await createPayment(demandeur.id, 10);
                setClientSecretSettings({
                    clientSecret: response.client_secret,
                    loading: false,
                    payment_intent_id: response.payment_intent_id,
                });
            } catch (error) {
                console.log("error")
                console.log(error)
                console.error(t('demandeur.errors.paymentIntentError'), error);
                throw error;
            }
        }
        createPaymentIntentState();
    }, [demandeur, t]);


    const navigate = useNavigate();
    const { control, handleSubmit, formState: { errors, isSubmitting }, watch, getValues, reset, setValue } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            intitule: '',
            institutId: '',
            nameInstitut: '',
            emailInstitut: '',
            phoneInstitut: '',
            adresseInstitut: '',
            paysInstitut: '',
            anneeObtention: new Date().getFullYear(),
            institutDemandeur: '',
            paymentMethod: '',
        }
    });


    useEffect(() => {
        setLoading(true);
        const fetchInstitut = async () => {
            try {
                const data = await getInstitutForDemandeDemandeur();
                setInstituts(data);
            } catch (error) {
                setError(error.message);
            }
            setLoading(false);
        };
        fetchInstitut();
    }, []);


    const onSubmit = async (data) => {
        setIsFormValid(true);
    };

    const handlePayment = async (paymentMethod, paypalOrderData) => {
        const formData = getValues();
        let paymentResult;
        try {
            if (paymentMethod === 'paypal') {
                paymentResult = {
                    success: true,
                    paymentInfo: {
                        id: paypalOrderData.id,
                        status: paypalOrderData.status,
                        payer: paypalOrderData.payer,
                        amount: paypalOrderData.purchase_units[0].amount,
                        create_time: paypalOrderData.create_time,
                        update_time: paypalOrderData.update_time
                    }
                };
            } else if (paymentMethod === 'stripe') {
                const stripe = await stripePromise;
                // paymentResult = await processStripePayment(stripe, paymentAmount);
                const { error, paymentIntent } = await stripe.confirmPayment({
                    elements,
                    confirmParams: {
                        return_url: window.location.origin,
                    },
                });
                if (error) {
                    throw error;
                }
                paymentResult = {
                    success: true,
                    paymentInfo: {
                        id: paymentIntent.id,
                        status: paymentIntent.status,
                        amount: paymentIntent.amount,
                    }
                };
            }
            if (paymentResult.success) {
                setPaymentStatus('success');
                const submitData = {
                    ...formData,
                    demandeur_id: demandeur?.id,
                    resultat: 'Pending',
                    institutDemandeur_id: null,
                    paymentInfo: paymentResult.paymentInfo,
                    amount: paymentAmount,
                    clientSecret: paymentResult.paymentInfo.id,
                    typePaiement: paymentMethod === 'paypal' ? 'PayPal' : 'Stripe',
                    currency: 'USD'
                };
                await createDemande(submitData);
                toast.success(t('demandeur.paymentSuccessToast'), {
                    position: "top-right",
                    duration: 2000,
                });
                navigate('/demandeur/demandes');
            } else {
                setPaymentStatus('failed');
                toast.error(t('demandeur.paymentFailedToast'), {
                    position: "top-right",
                    duration: 2000,
                });
            }
        } catch (error) {
            setPaymentStatus('failed');
            toast.error(t('demandeur.paymentErrorToast'), {
                position: "top-right",
                duration: 2000,
            });
        }
    };


    const selectedInstitut = watch("institutId");
    const selectedPaymentMethod = watch("paymentMethod");

    return (
        <PayPalScriptProvider options={getPayPalConfig()}>
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                        <h4 className="text-xl font-semibold text-gray-800 uppercase">{t('demandeur.nouvelleDemandeTitle')}</h4>
                        <Link
                            to="/demandeur/demandes"
                            className="inline-flex items-center gap-x-1.5 rounded-full bg-blueLogo px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-rougeLogo"
                        >
                            <List className="h-5 w-5" />
                            {t('demandeur.liste')}
                        </Link>
                    </div>
                    <div className="max-w-3xl mx-auto px-4 py-8 bg-white shadow-md rounded-md">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div>
                                <label htmlFor="intitule" className="block text-sm font-medium text-gray-700">{t('demandeur.intituleLabel')} <span className="text-red-500">*</span></label>
                                <Controller
                                    name="intitule"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            type="text"
                                            id="intitule"
                                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    )}
                                />
                                {errors.intitule && <p className="mt-2 text-sm text-red-500">{t(errors.intitule.message)}</p>}
                            </div>
                            <div>
                                <label htmlFor="institutId" className="block text-sm font-medium text-gray-700">{t('demandeur.institutLabel')}<span className="text-red-500">*</span></label>
                                {!loading ? (
                                    <Controller
                                        name="institutId"
                                        control={control}
                                        render={({ field }) => (
                                            <select
                                                {...field}
                                                id="institutId"
                                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                            >
                                                <option value="">{t('demandeur.selectInstitut')}</option>
                                                {instituts.map((institut) => (
                                                    <option key={institut.id} value={institut.id}>
                                                        {institut.name}
                                                    </option>
                                                ))}
                                            </select>
                                        )}
                                    />
                                ) : (
                                    <div>{t('demandeur.loading')}</div>
                                )}
                                {errors.institutId && <p className="mt-2 text-sm text-red-500">{t(errors.institutId.message)}</p>}
                            </div>
                            {!selectedInstitut && (
                                <>
                                    <div>
                                        <label htmlFor="nameInstitut" className="block text-sm font-medium text-gray-700">{t('demandeur.nameInstitutLabel')}<span className="text-red-500">*</span></label>
                                        <Controller
                                            name="nameInstitut"
                                            control={control}
                                            render={({ field }) => (
                                                <input
                                                    {...field}
                                                    type="text"
                                                    id="nameInstitut"
                                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                />
                                            )}
                                        />
                                        {errors.nameInstitut && <p className="mt-2 text-sm text-red-500">{t(errors.nameInstitut.message)}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="emailInstitut" className="block text-sm font-medium text-gray-700">{t('demandeur.emailInstitutLabel')} <span className="text-red-500">*</span></label>
                                        <Controller
                                            name="emailInstitut"
                                            control={control}
                                            render={({ field }) => (
                                                <input
                                                    {...field}
                                                    type="email"
                                                    id="emailInstitut"
                                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                />
                                            )}
                                        />
                                        {errors.emailInstitut && <p className="mt-2 text-sm text-red-500">{t(errors.emailInstitut.message)}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="phoneInstitut" className="block text-sm font-medium text-gray-700">{t('demandeur.phoneInstitutLabel')} <span className="text-red-500" >*</span></label>
                                        <Controller
                                            name="phoneInstitut"
                                            control={control}
                                            render={({ field }) => (
                                                <input
                                                    {...field}
                                                    type="tel"
                                                    id="phoneInstitut"
                                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                />
                                            )}
                                        />
                                        {errors.phoneInstitut && <p className="mt-2 text-sm text-red-500">{t(errors.phoneInstitut.message)}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="adresseInstitut" className="block text-sm font-medium text-gray-700">{t('demandeur.adresseInstitutLabel')} <span className="text-red-500" >*</span></label>
                                        <Controller
                                            name="adresseInstitut"
                                            control={control}
                                            render={({ field }) => (
                                                <textarea
                                                    {...field}
                                                    id="adresseInstitut"
                                                    rows={3}
                                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                />
                                            )}
                                        />
                                        {errors.adresseInstitut && <p className="mt-2 text-sm text-red-500">{t(errors.adresseInstitut.message)}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="paysInstitut" className="block text-sm font-medium text-gray-700">{t('demandeur.paysInstitutLabel')} <span className="text-red-500" >*</span></label>
                                        <Controller
                                            name="paysInstitut"
                                            control={control}
                                            render={({ field }) => (
                                                <input
                                                    {...field}
                                                    type="text"
                                                    id="paysInstitut"
                                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                />
                                            )}
                                        />
                                        {errors.paysInstitut && <p className="mt-2 text-sm text-red-500">{t(errors.paysInstitut.message)}</p>}
                                    </div>
                                </>
                            )}
                            <div>
                                <label htmlFor="anneeObtention" className="block text-sm font-medium text-gray-700">{t('demandeur.anneeObtentionLabel')} <span className="text-red-500" >*</span></label>
                                <Controller
                                    name="anneeObtention"
                                    control={control}
                                    render={({ field }) => (
                                        <select
                                            {...field}
                                            id="anneeObtention"
                                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                        >
                                            {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                                                <option key={year} value={year}>
                                                    {year}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                />
                                {errors.anneeObtention && <p className="mt-2 text-sm text-red-500">{t(errors.anneeObtention.message)}</p>}
                            </div>
                            <div>
                                <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">{t('demandeur.paymentMethodLabel')} <span className="text-red-500" >*</span></label>
                                <Controller
                                    name="paymentMethod"
                                    control={control}
                                    render={({ field }) => (
                                        <select
                                            {...field}
                                            id="paymentMethod"
                                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                        >
                                            <option value="">{t('demandeur.selectPaymentMethod')}</option>
                                            <option value="stripe">Stripe</option>
                                            <option value="paypal">PayPal</option>
                                        </select>
                                    )}
                                />
                                {errors.paymentMethod && <p className="mt-2 text-sm text-red-500">{t(errors.paymentMethod.message)}</p>}
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={() => reset()}
                                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    {t('demandeur.cancelButton')}
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting || isFormValid}
                                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blueLogo focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    {isFormValid ? t('demandeur.pleaseWait') : t('demandeur.validateForm')}
                                </button>
                            </div>
                        </form>
                        {isFormValid && (
                            <div className="mt-8">
                                <h5 className="text-lg font-semibold mb-4">Procéder au paiement</h5>
                                {selectedPaymentMethod === 'stripe' && (
                                    <>
                                        {clientSecretSettings.loading ? (
                                            <h1>{t('common.loading')}</h1>
                                        ) : (
                                            <Elements
                                                stripe={stripePromise}
                                                options={{
                                                    clientSecret: clientSecretSettings.clientSecret,
                                                    appearance: { theme: "stripe" },
                                                }}
                                            >
                                                <CheckoutForm
                                                    type="demandeur"
                                                    amount={paymentAmount}
                                                    institut=''
                                                    clientSecretSettings={clientSecretSettings}
                                                    data={{
                                                        intitule: getValues('intitule'),
                                                        institutId: getValues('institutId'),
                                                        paysInstitut: getValues('paysInstitut'),
                                                        nameInstitut: getValues('nameInstitut'),
                                                        phoneInstitut: getValues('phoneInstitut'),
                                                        emailInstitut: getValues('emailInstitut'),
                                                        paymentMethod: getValues('paymentMethod'),
                                                        anneeObtention: getValues('anneeObtention'),
                                                        adresseInstitut: getValues('adresseInstitut'),
                                                        institutDemandeur: getValues('institutDemandeur'),
                                                    }}
                                                    demandeur={demandeur}
                                                    typePayment="demande"
                                                />
                                            </Elements>
                                        )}
                                    </>
                                )}



                                {selectedPaymentMethod === 'paypal' && (
                                    <PayPalButtons
                                        style={{ layout: 'vertical' }}
                                        createOrder={(data, actions) => {
                                            return actions.order.create({
                                                purchase_units: [{
                                                    amount: {
                                                        value: paymentAmount.toString(),
                                                        currency_code: 'USD'
                                                    }
                                                }]
                                            });
                                        }}
                                        onApprove={async (data, actions) => {
                                            const order = await actions.order.capture();
                                            await updatePayPalPaymentDemandeur({
                                                paypal_order_id: order.id,
                                                demandeur_id: demandeur.id,
                                                amount: order.purchase_units[0].amount.value,
                                            });
                                            toast.success("Payment completed");
                                            navigate('/demandeur/demandes');
                                        }}
                                        onError={(err) => {
                                            console.error('PayPal Error', err);
                                            toast.error(t('demandeur.paymentErrorToast'), {
                                                position: "top-right",
                                                duration: 2000,
                                            });
                                        }}
                                    />
                                )}
                            </div>
                        )}
                        {paymentStatus === 'success' && (
                            <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md">
                                {t('demandeur.paymentSuccess')}
                            </div>
                        )}
                        {paymentStatus === 'failed' && (
                            <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
                                {t('demandeur.paymentFailed')}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </PayPalScriptProvider>
    );
}
