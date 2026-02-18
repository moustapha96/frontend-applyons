
// import React, { useEffect, useState } from "react";
// import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";
// import { createDemande, sendVerification, sendVerificationWithAbonnement } from "../../../services/demandeService";
// import { createAbonnement } from "../../../services/abonnementService";
// import { Loader2, LoaderCircleIcon } from "lucide-react";
// import { useTranslation } from "react-i18next";

// export default function CheckoutForm({ onPaymentSuccess, institut, amount, clientSecretSettings, data }) {

//     const { t } = useTranslation();

//     const stripe = useStripe();
//     const elements = useElements();
//     const [errorMessage, setErrorMessage] = useState(null);
//     const [isProcessing, setIsProcessing] = useState(false);
//     const [paymentInfo, setPaymentInfo] = useState(null);
//     const [successMessage, setSuccessMessage] = useState(null);

//     useEffect(() => {
//         if (!stripe) {
//             return;
//         }
//         if (!clientSecretSettings.clientSecret) {
//             return;
//         }
//         // stripe.retrievePaymentIntent(clientSecretSettings.clientSecret).then(({ paymentIntent }) => {
//         //     switch (paymentIntent.status) {
//         //         case "succeeded":
//         //             setSuccessMessage("Payment succeeded!");
//         //             break;
//         //         case "processing":
//         //             setSuccessMessage("Your payment is processing.");
//         //             break;
//         //         // case "requires_payment_method":
//         //         //     setErrorMessage("Your payment was not successful, please try again.");
//         //         //     break;
//         //         default:
//         //             setErrorMessage("Something went wrong.");
//         //             break;
//         //     }
//         // });
//     }, [stripe, clientSecretSettings]);


//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         if (!stripe || !elements) {
//             return;
//         }
//         setIsProcessing(true);
//         const result = await stripe.confirmPayment({
//             elements,
//             confirmParams: {
//                 return_url: `${window.location.origin}/institut/abonnements`,
//             },
//             redirect: "if_required",
//         });
//         // //console.log(result)

//         if (result.error) {
//             setErrorMessage(result.error.message);
//             setIsProcessing(false);
//         } else {
//             setPaymentInfo(result.paymentIntent);
//             setIsProcessing(false);

//             const submitData = {
//                 dateDebut: data.dateDebut,
//                 dateFin: data.dateFin,
//                 institut_id: institut?.id,
//                 montant: amount,
//                 paymentMethod: data.paymentMethod,
//                 statut: 'actif',
//                 typePaiement: 'Stripe',
//                 paymentInfo: result.paymentIntent,
//                 currency: result.paymentIntent.currency,
//             };
//             // //console.log(submitData)
//             const resultatPaiement = await createAbonnement(submitData);
//             if (resultatPaiement) {
//                 onPaymentSuccess();
//                 return resultatPaiement;
//             } else {
//                 return null;
//             }
//         }
//     };


//     const infoStyle = {
//         marginTop: '20px',
//         padding: '10px',
//         backgroundColor: '#f0f0f0',
//         borderRadius: '3px',
//     };

//     return (
//         <div className="max-w-md mx-auto">
//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <PaymentElement />
//                 <button
//                     className="w-full bg-blueLogo text-white text-lg py-2 rounded-lg transition duration-300 ease-in-out hover:bg-blueLogo focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
//                     disabled={!stripe || isProcessing}
//                 >
//                     {isProcessing ? <span> <LoaderCircleIcon className="animate-spin" /> {t('common.loading')} </span> : "Valider"}
//                 </button>
//                 {errorMessage && <div className="text-red-500">{errorMessage}</div>}
//                 {successMessage && <div className="text-red-500">{successMessage}</div>}
//             </form>

//         </div>
//     );
// }


// ------------------------------------------------------------------------------------------------------


import React, { useState } from "react";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function CheckoutForm({ type, amount, institut, clientSecretSettings, data, typePayment, demandeur, onPaymentSuccess }) {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [paymentInfo, setPaymentInfo] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);
        setErrorMessage(null);

        try {
            const { error, paymentIntent } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: window.location.origin + "/institut/abonnements",
                },
                redirect: "if_required"
            });

            console.log("Payment Intent:", paymentIntent);
            console.log("Error:", error);

            if (error) {
                setErrorMessage(error.message || "An unknown error occurred");
                setIsProcessing(false);
                return;
            }

            if (paymentIntent && paymentIntent.status === "succeeded") {
                const submitData = {
                    dateDebut: data.dateDebut,
                    dateFin: data.dateFin,
                    institut_id: institut?.id,
                    montant: amount,
                    paymentMethod: data.paymentMethod,
                    statut: 'actif',
                    typePaiement: 'Stripe',
                    paymentInfo: paymentIntent,
                    currency: paymentIntent.currency,
                };
                console.log(submitData);
                setPaymentInfo(paymentIntent);
                onPaymentSuccess(paymentIntent);
            } else if (paymentIntent && paymentIntent.status !== "succeeded") {
                setErrorMessage("Payment did not succeed: " + paymentIntent.status);
                toast.error("Payment did not succeed: " + paymentIntent.status, {
                    position: "top-right",
                    duration: 2000,
                });
            } else {
                setErrorMessage("Payment confirmation failed with no payment intent.");
                toast.error("Payment confirmation failed.", {
                    position: "top-right",
                    duration: 2000,
                });
            }
        } catch (error) {
            setErrorMessage("An unexpected error occurred: " + error.message);
            toast.error("An unexpected error occurred: " + error.message, {
                position: "top-right",
                duration: 2000,
            });
        } finally {
            setIsProcessing(false);
        }
    };

    const infoStyle = {
        marginTop: '20px',
        padding: '10px',
        backgroundColor: '#f0f0f0',
        borderRadius: '3px',
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
            <PaymentElement />
            <button
                className="w-full bg-blueLogo text-white text-lg py-2 rounded-lg hover:bg-blue-700 focus:outline-none disabled:bg-gray-400"
                disabled={!stripe || isProcessing}
            >
                {isProcessing ? "Processing..." : "Validate"}
            </button>
            {paymentInfo && (
                <div style={infoStyle}>
                    <h3 className="font-bold mb-2">Payment Information:</h3>
                    <p>Amount: {paymentInfo.amount} {paymentInfo.currency?.toUpperCase()}</p>
                    <p>Status: {paymentInfo.status}</p>
                    <p>Payment Method: {paymentInfo.payment_method_types?.[0]}</p>
                    <p>Created: {new Date(paymentInfo.created * 1000).toLocaleString()}</p>
                </div>
            )}
            {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
        </form>
    );
}
