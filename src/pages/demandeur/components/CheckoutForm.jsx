

// import React, { useEffect, useState } from "react";
// import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import { useLocation, useNavigate } from "react-router-dom";
// import { toast } from "sonner";
// import { createDemande, sendVerification } from "../../../services/demandeService";
// import { createAbonnement } from "../../../services/abonnementService";
// import { createDemandePartage } from "@/services/partageService";

// export default function CheckoutForm({ type, amount, institut, clientSecretSettings, data, demandeur, typePayment }) {
//     const stripe = useStripe();
//     const elements = useElements();
//     const navigate = useNavigate();
//     const [errorMessage, setErrorMessage] = useState(null);
//     const [isProcessing, setIsProcessing] = useState(false);
//     const [paymentInfo, setPaymentInfo] = useState(null);

//     useEffect(() => {
//         const fetchMethod = async () => {
//             if (typePayment === "demande") {
//                 // await handleDemandePayment();
//             }
//         };
//         if (clientSecretSettings?.payment_intent_id) {
//             fetchMethod();
//         }
//     }, [typePayment, clientSecretSettings?.payment_intent_id]);

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         if (!stripe || !elements) {
//             return;
//         }
//         setIsProcessing(true);
//         const urlWithoutParams = "https://www.applysons.com";

//         const result = await stripe.confirmPayment({
//             elements,
//             confirmParams: {
//                 return_url: `${urlWithoutParams}/demandeur/success-payment`,
//             },
//             redirect: 'if_required',
//         });

//         if (result.error) {
//             setErrorMessage(result.error.message ?? "An unknown error occurred");
//             setIsProcessing(false);
//             //console.log(result)
//         } else {
//             setPaymentInfo(result.paymentIntent);
//             setIsProcessing(false);
//             try {
//                 await handleDemandePayment();
//                 toast.success("Payment successful", {
//                     position: "top-right",
//                     duration: 2000,
//                 });
//                 setTimeout(() => {
//                     navigateToNextStep();
//                 }, 2000);
//             } catch (err) {
//                 console.error(err);
//                 toast.error("An error occurred during payment processing", {
//                     position: "top-right",
//                     duration: 2000,
//                 });
//             }
//         }
//     };

//     const navigateToNextStep = () => {
//         navigate('/demandeur/partages');
//     };

//     const handleDemandePayment = async () => {
//         const submitData = {
//             ...data,
//             demandeur_id: demandeur?.id,
//             resultat: 'Pending',
//             amount: amount,
//             institutDemandeur_id: data?.institutDemandeur,
//             clientSecret: clientSecretSettings?.payment_intent_id,
//             typePaiement: 'Stripe',
//             currency: 'USD',
//             paymentInfo: JSON.stringify(paymentInfo),
//         };
//         //console.log(submitData)
//         await createDemandePartage(submitData);
//     };

//     // const handleVerificationPayment = async () => {
//     //     const submitData = {
//     //         codeAdn: data?.codeAdn,
//     //         nomComplet: data?.nomComplet,
//     //         dateNaissance: data?.dateNaissance,
//     //         institut_id: institut?.id,
//     //     };
//     //     await sendVerification(submitData);
//     // };

//     // const handleAbonnementPayment = async () => {
//     //     const submitData = {
//     //         ...data,
//     //         nomComplet: data.nomComplet,
//     //         paymentMethod: data.paymentMethod,
//     //         institut_id: institut?.id
//     //     };
//     //     await createAbonnement(submitData);
//     // };

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
//                     className="w-full bg-blueLogo text-white text-lg py-2 rounded-lg transition duration-300 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
//                     disabled={!stripe || isProcessing}
//                 >
//                     {isProcessing ? "Processing..." : "Validate"}
//                 </button>
//                 {errorMessage && <div className="text-red-500">{errorMessage}</div>}
//             </form>
//             {paymentInfo && (
//                 <div style={infoStyle}>
//                     <h3 className="font-bold mb-2">Payment Information:</h3>
//                     <p>Amount: {paymentInfo.amount} {paymentInfo.currency.toUpperCase()}</p>
//                     <p>Status: {paymentInfo.status}</p>
//                     <p>Payment Method: {paymentInfo.payment_method_types[0]}</p>
//                     <p>Created: {new Date(paymentInfo.created * 1000).toLocaleString()}</p>
//                 </div>
//             )}
//         </div>
//     );
// }




import React, { useState } from "react"
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { confirmStripePayment } from "../../../services/paymentService"
import { createDemandePartage } from "@/services/partageService"

export default function CheckoutForm({ type, amount, institut, clientSecretSettings, data, typePayment, demandeur, onPaymentSuccess }) {
    const stripe = useStripe()
    const elements = useElements()
    const navigate = useNavigate()
    const [isProcessing, setIsProcessing] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    const [paymentInfo, setPaymentInfo] = useState(null)

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!stripe || !elements) {
            return
        }

        setIsProcessing(true)
        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: window.location.origin + "/demandeur/partages",
            },
            redirect: "if_required"
        })
        console.log("Payment Intent:", paymentIntent)
        console.log("Error:", error)

        if (error) {
            console.log("arrivé premier erreur ")
            setErrorMessage(error.message ?? "An unknown error occurred")
            setIsProcessing(false)
            return
        }

        if (paymentIntent && paymentIntent.status === "succeeded") {
            setIsProcessing(false)
            const dataS = {
                ...data,
                demandeur_id: demandeur.id,
                amount: amount,
                resultat: 'Pending',
                clientSecret: paymentIntent.id,
                typePaiement: 'Stripe',
                currency: 'USD',
                paymentInfo: paymentIntent,
            }
            setPaymentInfo(paymentIntent)
            onPaymentSuccess(paymentIntent)
        } else if (paymentIntent && paymentIntent.status !== "succeeded") {
            setErrorMessage("Payment did not succeed: " + paymentIntent.status)
            setIsProcessing(false)
            toast.error("Payment did not succeed: " + paymentIntent.status, {
                position: "top-right",
                duration: 2000,
            })
        } else {
            console.log("arrivé derniere erreur ")
            setErrorMessage("Payment confirmation failed with no payment intent.")
            setIsProcessing(false)
            toast.error("Payment confirmation failed.", {
                position: "top-right",
                duration: 2000,
            })
        }
    }

    const infoStyle = {
        marginTop: '20px',
        padding: '10px',
        backgroundColor: '#f0f0f0',
        borderRadius: '3px',
    }

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
                    <p>Amount: {paymentInfo.amount} {paymentInfo.currency.toUpperCase()}</p>
                    <p>Status: {paymentInfo.status}</p>
                    <p>Payment Method: {paymentInfo.payment_method_types[0]}</p>
                    <p>Created: {new Date(paymentInfo.created * 1000).toLocaleString()}</p>
                </div>
            )}
            {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
        </form>
    )
}
