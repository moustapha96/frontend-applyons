import React, { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { toast } from 'sonner'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useNavigate } from 'react-router-dom'

import { getPayPalConfig, createPaymentIntent } from '@/services/paymentService'
import CheckoutForm from './CheckoutForm'
import { getPublishableKey } from '../../../services/paymentService'


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

const PaymentForm = ({
    formFields,
    validationSchema,
    onSubmit,
    paymentAmount,
    paymentType,
    entityId,
    entityType,
    returnUrl,
}) => {
    const navigate = useNavigate()
    const [isFormValid, setIsFormValid] = useState(false)
    const [paymentStatus, setPaymentStatus] = useState < 'idle' | 'processing' | 'success' | 'error' > ('idle')
    const [clientSecret, setClientSecret] = useState('')
    const stripePromise = initStripe();


    const { control, handleSubmit, watch, getValues, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(validationSchema),
    })

    const selectedPaymentMethod = watch('paymentMethod')

    useEffect(() => {
        const initializePayment = async () => {
            try {
                const response = await createPaymentIntent(entityId, paymentAmount, entityType)
                setClientSecret(response.client_secret)
            } catch (error) {
                console.error('Error initializing payment:', error)
                toast.error("Erreur lors de l'initialisation du paiement")
            }
        }

        initializePayment()
    }, [entityId, paymentAmount, entityType])

    const handleFormSubmit = async (data) => {
        setIsFormValid(true)
        await onSubmit(data)
    }

    const handlePaymentSuccess = async () => {
        setPaymentStatus('success')
        toast.success('Paiement réussi')
        navigate(returnUrl)
    }

    const handlePaymentError = () => {
        setPaymentStatus('error')
        toast.error('Le paiement a échoué. Veuillez réessayer.')
    }

    return (
        <div className="w-full max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-4 bg-gray-100 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800">Formulaire de paiement</h2>
            </div>
            <div className="p-6">
                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                    {formFields.map((field) => (
                        <div key={field.name}>
                            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
                                {field.label}
                            </label>
                            <Controller
                                name={field.name}
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    field.type === 'select' ? (
                                        <select
                                            onChange={onChange}
                                            value={value}
                                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                        >
                                            {field.options?.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            type={field.type}
                                            id={field.name}
                                            onChange={onChange}
                                            value={value}
                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        />
                                    )
                                )}
                            />
                            {errors[field.name] && (
                                <p className="mt-2 text-sm text-red-600">{errors[field.name]?.message}</p>
                            )}
                        </div>
                    ))}
                </form>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
                <button
                    onClick={() => navigate(returnUrl)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Annuler
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting || isFormValid}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                    {isFormValid ? 'Traitement en cours...' : 'Valider'}
                </button>
            </div>

            {isFormValid && clientSecret && (
                <div className="mt-8 p-4">
                    <h3 className="text-lg font-semibold mb-4">Procéder au paiement</h3>
                    {selectedPaymentMethod === 'paypal' && (
                        <PayPalScriptProvider options={getPayPalConfig()}>
                            <PayPalButtons
                                createOrder={(data, actions) => {
                                    return actions.order.create({
                                        purchase_units: [{ amount: { value: paymentAmount.toString() } }],
                                    })
                                }}
                                onApprove={handlePaymentSuccess}
                                onError={handlePaymentError}
                            />
                        </PayPalScriptProvider>
                    )}
                    {selectedPaymentMethod === 'stripe' && (
                        <Elements stripe={stripePromise} options={{ clientSecret }}>
                            <CheckoutForm
                                amount={paymentAmount}
                                onSuccess={handlePaymentSuccess}
                                onError={handlePaymentError}
                            />
                        </Elements>
                    )}
                </div>
            )}

            {paymentStatus === 'success' && (
                <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md">
                    Paiement réussi ! Votre demande a été enregistrée.
                </div>
            )}
            {paymentStatus === 'error' && (
                <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
                    Le paiement a échoué. Veuillez réessayer.
                </div>
            )}
        </div>
    )
}

export default PaymentForm