

import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import InstitutBreadcrumb from "../../../components/InstitutBreadcrumb";
import { useAuthContext } from "@/context";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from "sonner";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { getPayPalConfig, processPayPalPayment, processStripePayment, getPublishableKey, createPaymentIntentInstitut } from "../../../services/paymentService";
import { LuListMinus } from "react-icons/lu";
import CheckoutForm from "./CheckoutForm";
import { createAbonnement } from "../../../services/abonnementService";
import { Loader2 } from "lucide-react";
import { Card, message, Spin } from "antd";
import { AppContext } from "@/AppContext";




const schema = yup.object({
    nomComplet: yup.string().required("fullName required"),
    paymentMethod: yup.string().required("paymentMethod required"),
    dateDebut: yup.date().required("startDate required"),
    dateFin: yup.date().required("endDate required")
});

const InstitutNouvelAbonnement = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { institut } = useAuthContext();
    const { urlApi, prixDemandeur, prixInstitut, prixUnivercity } = useContext(AppContext)

    const [abonnements, setAbonnements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFormValid, setIsFormValid] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [paymentAmount, setPaymentAmount] = useState(institut.type == "Université" ? prixUnivercity : prixInstitut);
    const [loadingPayment, setLoadingPayment] = useState(false);

    const [stripePromise, setStripePromise] = useState(null)
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("")
    const [clientSecretSettings, setClientSecretSettings] = useState({
        clientSecret: "",
        loading: true,
        payment_intent_id: "",
    })

    const { control, handleSubmit, formState: { errors, isSubmitting }, watch, getValues } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            nomComplet: institut ? institut.name : '',
            paymentMethod: '',
            dateDebut: new Date().toISOString().split("T")[0],
            dateFin: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0]
        }
    });


    useEffect(() => {
        const initializeStripe = async () => {
            try {
                const response = await getPublishableKey()
                const publishableKey = response.publishable_key
                setStripePromise(loadStripe(publishableKey))
            } catch (error) {
                console.error(t("demandeur.errors.stripeInitializationError"), error)
            }
        }
        initializeStripe()
    }, [])

    useEffect(() => {
        async function createPaymentIntentState() {
            try {
                // let prix = institut?.type == "Université" ? prixUnivercity : prixInstitut;
                // console.log(prix)
                const response = await createPaymentIntentInstitut(institut.id, paymentAmount);
                console.log(response)
                setClientSecretSettings({
                    clientSecret: response.client_secret,
                    loading: false,
                    payment_intent_id: response.payment_intent_id,
                })
            } catch (error) {
                console.error('Error payment key:', error);
                throw error;
            }
        }
        if (institut?.id) {
            createPaymentIntentState();
        }
    }, [institut.id]);

    // const onSubmit = async (data) => {
    //     setIsFormValid(true);
    //     try {
    //         setLoadingPayment(true);
    //         toast.success(t("institutPartage.form_validated_proceed_payment"))
    //         console.log(data);
    //     } catch (error) {
    //         toast.error(t("institutPartage.please_fill_required_fields"))
    //         console.error(error);
    //     } finally {
    //         setLoadingPayment(false);
    //     }
    // };

    const onSubmit = async (data) => {
        setIsFormValid(true);
        setSelectedPaymentMethod(data.paymentMethod);

        try {
            setLoadingPayment(true);
            toast.success(t("institutPartage.form_validated_proceed_payment"))
            console.log(data);
        } catch (error) {
            toast.error(t("institutPartage.please_fill_required_fields"))
            console.error(error);
        } finally {
            setLoadingPayment(false);
        }
    };

    const handlePayment = async (paymentMethod, paymentData) => {
        // const formData = form.getFieldsValue()
        const formData = getValues()
        let paymentResult

        setLoadingPayment(true);

        if (paymentMethod === "paypal") {
            paymentResult = {
                success: true,
                paymentInfo: {
                    id: paymentData.id,
                    status: paymentData.status,
                    payer: paymentData.payer,
                    amount: paymentData.purchase_units[0].amount,
                    create_time: paymentData.create_time,
                    update_time: paymentData.update_time,
                    currency: paymentData.purchase_units[0].amount.currency_code
                },
            }
        } else if (paymentMethod === "stripe") {
            paymentResult = {
                success: true,
                paymentInfo: paymentData,
            }
        }

        const submitData = {
            ...formData,
            dateDebut: getValues('dateDebut'),
            dateFin: getValues('dateFin'),
            institut_id: institut?.id,
            montant: paymentAmount,
            amount: paymentAmount,
            paymentMethod: "PayPal",
            statut: 'actif',

            paymentInfo: paymentResult.paymentInfo,
            typePaiement: paymentMethod === "paypal" ? "PayPal" : "Stripe",
            clientSecret: paymentResult.paymentInfo.id,
            currency: paymentResult.paymentInfo.amount.currency_code ?? 'USD'
        }

        console.log(submitData)

        try {
            if (paymentResult.success) {
                setPaymentStatus("success")
                try {
                    const resultatPaiement = await createAbonnement(submitData);
                    if (resultatPaiement) {
                        toast.success(t("paymentSuccess"));
                        setPaymentStatus("success");
                        navigate("/institut/abonnements");
                    } else {
                        toast.error(t("institut.abonnement.paymentFailed"));
                    }
                    setLoadingPayment(false);
                } catch (error) {
                    console.log("erreur d'enregistrement", error)
                    toast.error(t("demandeurPartage.payment_intent_error"), {
                        position: "top-right",
                        duration: 2000,
                    })
                    return
                }
            } else {
                setPaymentStatus("failed")
                toast.error(t("institut.abonnement.paymentFailed"));
            }
            setLoadingPayment(false);
        } catch (error) {
            console.error("Error creating abonnement:", error);
            toast.error(t("paymentFailed"));
            setLoadingPayment(false);
        }
    };

    if (!institut) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <Spin size="large" tip={t("common.loading")} />
            </div>
        )
    }

    return (
        <PayPalScriptProvider options={getPayPalConfig()}>
            <Elements stripe={stripePromise}>
                <div className="bg-gray-100 min-h-screen">
                    <InstitutBreadcrumb title={t("institut.abonnement.newSubscription")} SubTitle={institut?.name} />
                    <section>
                        <div className="container">
                            <div className="my-6 space-y-6">
                                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                                    <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                                        <h4 className="text-xl font-semibold text-gray-800 uppercase">{t("institut.abonnement.newSubscription")}</h4>
                                        <Link
                                            to="/institut/abonnements"
                                            className="inline-flex items-center gap-x-1.5 rounded-full bg-blueLogo px-3 py-1.5 text-xs font-medium text-white transition-all duration-300 hover:bg-primary-700"
                                        >
                                            <LuListMinus className="ms-1.5 size-4" /> {t("institut.abonnement.list")}
                                        </Link>
                                    </div>
                                    <div className="max-w-3xl mx-auto px-4 py-8 bg-white shadow-md rounded-md">
                                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">


                                            <div>
                                                <label htmlFor="NomComplet" className="block text-sm font-medium text-gray-700">{t("institut.abonnement.fullName")}</label>
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
                                                {errors.nomComplet && <p className="mt-2 text-sm text-red-500">{t(errors.nomComplet.message)}</p>}
                                            </div>
                                            <div className="w-full flex gap-6">
                                                <div className="flex-1">
                                                    <label htmlFor="dateDebut" className="block text-sm font-medium text-gray-700">
                                                        {t("institut.abonnement.startDate")}
                                                    </label>
                                                    <Controller
                                                        name="dateDebut"
                                                        control={control}

                                                        render={({ field }) => (
                                                            <input
                                                                {...field}
                                                                type="date"
                                                                id="dateDebut"
                                                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                                            />
                                                        )}
                                                    />
                                                    {errors.dateDebut && <p className="mt-2 text-sm text-red-500">{t(errors.dateDebut.message)}</p>}
                                                </div>
                                                <div className="flex-1">
                                                    <label htmlFor="dateFin" className="block text-sm font-medium text-gray-700">
                                                        {t("institut.abonnement.endDate")}
                                                    </label>
                                                    <Controller
                                                        name="dateFin"

                                                        control={control}
                                                        render={({ field }) => (
                                                            <input
                                                                {...field}
                                                                type="date"
                                                                id="dateFin"
                                                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                                            />
                                                        )}
                                                    />
                                                    {errors.dateFin && <p className="mt-2 text-sm text-red-500">{t(errors.dateFin.message)}</p>}
                                                </div>
                                            </div>
                                            <div>
                                                <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">{t("institut.abonnement.paymentMethod")}</label>
                                                <Controller
                                                    name="paymentMethod"
                                                    control={control}
                                                    onChange={setSelectedPaymentMethod}
                                                    render={({ field }) => (
                                                        <select
                                                            {...field}
                                                            id="paymentMethod"
                                                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                                        >
                                                            <option value="">{t("institut.abonnement.selectPaymentMethod")}</option>
                                                            <option value="stripe">Stripe</option>
                                                            <option value="paypal">Paypal</option>
                                                        </select>
                                                    )}
                                                />
                                                {errors.paymentMethod && <p className="mt-2 text-sm text-red-500">{t(errors.paymentMethod.message)}</p>}
                                            </div>
                                            <div className="flex justify-end space-x-4">
                                                <button
                                                    type="button"
                                                    onClick={() => navigate('/institut/abonnements')}
                                                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                >
                                                    {t("institut.abonnement.cancel")}
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blueLogo hover:bg-rouge focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center justify-center"
                                                >
                                                    {loadingPayment ? <Loader2 className="animate-spin" /> : t("institut.abonnement.submitForm")}
                                                </button>

                                            </div>
                                        </form>
                                        {isFormValid && (

                                            <Card
                                                title={t("institut.abonnement.proceedToPayment")}
                                                style={{ marginTop: 24 }}
                                                className="border-2 border-blue-200"
                                            >
                                                <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                                                    <p className="text-lg font-semibold">
                                                        {t("demandeurPartage.paymentAmount")}: ${paymentAmount}
                                                    </p>
                                                </div>

                                                {selectedPaymentMethod === 'paypal' && (
                                                    <PayPalButtons
                                                        style={{ layout: "vertical" }}
                                                        createOrder={(data, actions) => {
                                                            return actions.order.create({
                                                                purchase_units: [
                                                                    {
                                                                        amount: {
                                                                            value: paymentAmount.toString(),
                                                                            currency_code: 'USD'
                                                                        },
                                                                    },
                                                                ],
                                                            });
                                                        }}
                                                        onApprove={async (data, actions) => {
                                                            return actions.order.capture().then((orderData) => {
                                                                handlePayment('paypal', orderData);
                                                            });
                                                        }}
                                                        onError={(err) => {
                                                            console.error('PayPal Error', err);
                                                            toast.error(t('demandeur.paymentErrorToast'), {
                                                                position: "top-right",
                                                                duration: 2000,
                                                            });
                                                        }}
                                                        onCancel={() => {
                                                            toast.error(t("institut.abonnement.paymentFailed"));
                                                        }}
                                                    />
                                                )}

                                                {selectedPaymentMethod === 'stripe' && <>
                                                    {clientSecretSettings.loading ? (
                                                        <div className="text-center">
                                                            <Spin size="large" tip={t("common.loading")} />
                                                        </div>
                                                    ) : (
                                                        <Elements
                                                            stripe={stripePromise}
                                                            options={{
                                                                clientSecret: clientSecretSettings.clientSecret,
                                                                appearance: { theme: "stripe" },
                                                            }}
                                                        >
                                                            <CheckoutForm
                                                                type="partage"
                                                                amount={paymentAmount}
                                                                institut={institut}
                                                                clientSecretSettings={clientSecretSettings}
                                                                data={{
                                                                    nomComplet: getValues('nomComplet'),
                                                                    paymentMethod: getValues('paymentMethod'),
                                                                    dateDebut: getValues('dateDebut'),
                                                                    dateFin: getValues('dateFin')
                                                                }}
                                                                onPaymentSuccess={(paymentIntent) => handlePayment("stripe", paymentIntent)}
                                                            />
                                                        </Elements>
                                                    )}
                                                </>}

                                            </Card>

                                        )}
                                        {paymentStatus === 'success' && (
                                            <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md">
                                                {t("institut.abonnement.paymentSuccess")}
                                            </div>
                                        )}
                                        {paymentStatus === 'failed' && (
                                            <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
                                                {t("institut.abonnement.paymentFailed")}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </Elements>
        </PayPalScriptProvider>
    );
}

export default InstitutNouvelAbonnement;
