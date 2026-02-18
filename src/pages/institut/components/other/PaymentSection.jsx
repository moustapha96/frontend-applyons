import { PayPalButtons } from "@paypal/react-paypal-js"
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from "../CheckoutForm"
import { createAbonnement } from "../../../../services/abonnementService"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"


const PaymentSection = ({
    watch,
    stripePromise,
    clientSecret,
    onPaymentSuccess,
    institut,
    amount,
    clientSecretSettings,
    data,
}) => {
    const { t } = useTranslation()

    const handlePayment = async (paymentMethod, paypalOrderData) => {
        try {
            const paymentResult = {
                success: true,
                paymentInfo: {
                    id: paypalOrderData.id,
                    status: paypalOrderData.status,
                    payer: paypalOrderData.payer,
                    amount: paypalOrderData.purchase_units[0].amount,
                    create_time: paypalOrderData.create_time,
                    update_time: paypalOrderData.update_time,
                    currency: paypalOrderData.purchase_units[0].amount.currency_code,
                },
            }

            const submitData = {
                dateDebut: data.dateDebut,
                dateFin: data.dateFin,
                institut_id: institut?.id,
                montant: amount,
                paymentMethod: data.paymentMethod,
                statut: "actif",
                typePaiement: "PayPal",
                paymentInfo: paymentResult.paymentInfo,
                clientSecret: paymentResult.paymentInfo.id,
                currency: paymentResult.paymentInfo.amount.currency_code ?? "EUR",
            }

            const resultatPaiement = await createAbonnement(submitData)
            if (resultatPaiement) {
                onPaymentSuccess()
            } else {
                toast.error(t("institutVerification.payment_confirmation_error"))
            }
        } catch (error) {
            console.error("Error creating abonnement:", error)
            toast.error(t("institutVerification.payment_confirmation_error"))
        }
    }

    return (
        <div className="mt-8">
            {watch("paymentMethod") === "paypal" && (
                <PayPalButtons
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [{ amount: { value: amount.toString() } }],
                        })
                    }}
                    onApprove={async (data, actions) => {
                        if (actions.order) {
                            return actions.order.capture().then((orderData) => {
                                handlePayment("paypal", orderData)
                            })
                        }
                    }}
                    onCancel={() => {
                        toast.error(t("institutVerification.payment_cancelled"))
                    }}
                    onError={() => {
                        toast.error(t("institutVerification.payment_error"))
                    }}
                />
            )}
            {watch("paymentMethod") === "stripe" && stripePromise && clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm
                        onPaymentSuccess={onPaymentSuccess}
                        institut={institut}
                        amount={amount}
                        clientSecretSettings={clientSecretSettings}
                        data={data}
                    />
                </Elements>
            )}
        </div>
    )
}

export default PaymentSection

