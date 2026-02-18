

"use client"
import { useState, useEffect, useContext } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { toast } from "sonner"
import { PayPalScriptProvider } from "@paypal/react-paypal-js"
import { loadStripe } from "@stripe/stripe-js"
import { useTranslation } from "react-i18next"
import {
  FileCheck,
  AlertCircle,
  CheckCircle,
  Loader,
  CreditCard,
  Search,
  User,
  Key,
  Shield,
  RefreshCw,
  ArrowRight,
} from "lucide-react"

import { useAuthContext } from "@/context"
import { getPayPalConfig, getPublishableKey, createPaymentIntentInstitut } from "../../../services/paymentService"
import { getAbonnementsByInstitutActif } from "../../../services/abonnementService"
import { verificationDocument } from "../../../services/demandeService"
import InstitutBreadcrumb from "../../../components/InstitutBreadcrumb"
import PaymentSection from "./other/PaymentSection"
import DocumentCard from "./components/document-card"
import { AppContext } from "@/AppContext"

const schema = yup.object({
  nomComplet: yup.string().required("Le nom complet est requis"),
  codeAdn: yup.string().required("Le code ADN est requis"),
  paymentMethod: yup.string(),
  dateDebut: yup.date().required("La date de début est requise"),
  dateFin: yup.date().required("La date de fin est requise"),
})

const InstitutVerification = () => {
  const { t } = useTranslation()
  const { institut } = useAuthContext()
  const { urlApi, prixDemandeur, prixInstitut, prixUnivercity } = useContext(AppContext)
  const [loading, setLoading] = useState(true)
  const [verifying, setVerifying] = useState(false)
  const [error, setError] = useState(null)
  const [document, setDocument] = useState(null)
  const [activeSubscription, setActiveSubscription] = useState(null)
  const [stripePromise, setStripePromise] = useState(null)
  const [clientSecret, setClientSecret] = useState("")
  const [paymentStatus, setPaymentStatus] = useState(null)
  const [textSearch, setTextSearch] = useState("")
  const [clientSecretSettings, setClientSecretSettings] = useState({
    clientSecret: "",
    loading: true,
  })
  const [paymentAmount, setPaymentAmount] = useState(institut.type == "Université" ? prixUnivercity : prixInstitut)

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nomComplet: "",
      codeAdn: "",
      paymentMethod: "",
      dateDebut: new Date().toISOString().split("T")[0],
      dateFin: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0],
    },
  })

  useEffect(() => {
    initializeComponent()
  }, [institut])

  const initializeComponent = async () => {
    try {
      const [subscriptionData, publishableKey] = await Promise.all([
        getAbonnementsByInstitutActif(institut.id),
        getPublishableKey(),
      ])
      setActiveSubscription(subscriptionData)
      setStripePromise(loadStripe(publishableKey.publishable_key))

      if (!subscriptionData) {

        const response = await createPaymentIntentInstitut(institut.id, paymentAmount)
        setClientSecret(response.client_secret)
        setClientSecretSettings({
          clientSecret: response.client_secret,
          loading: false,
          payment_intent_id: response.payment_intent_id,
        })
        setTextSearch(t("institutVerification.subscription_required"))
      } else {
        setTextSearch(t("institutVerification.subscription_active"))
      }
    } catch (error) {
      setError(t("institutVerification.initialization_error"))
      console.error("Error initializing component:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleVerification = async (data) => {
    setVerifying(true)
    setDocument(null)
    try {
      if (!activeSubscription && paymentStatus !== "success") {
        toast.error(t("institutVerification.payment_required"))
        setVerifying(false)
        return
      }

      const res = await verificationDocument({
        ...data,
        institut_id: institut.id,
      })
      //console.log(res)
      setDocument(res)
      if (!res) {
        setTextSearch(t("institutVerification.no_document_found"))
      } else {
        setTextSearch(t("institutVerification.document_found"))
      }
      toast.success(t("institutVerification.verification_success"))
    } catch (error) {
      //console.log(error)
      toast.error(error.message || t("institutVerification.verification_error"))
    } finally {
      setVerifying(false)
    }
  }

  const handlePaymentSuccess = () => {
    setPaymentStatus("success")
    setTextSearch(t("institutVerification.subscription_active"))
    initializeComponent()
    toast.success(t("institutVerification.payment_success"))
  }

  // if (loading) {
  //   return (
  //     <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-80 z-50">
  //       <div className="flex flex-col items-center bg-white p-8 rounded-xl shadow-2xl">
  //         <Loader className="h-12 w-12 text-blueLogo animate-spin mb-4" />
  //         <p className="text-gray-700 font-medium text-lg">{t("common.loading")}</p>
  //         <p className="text-gray-500 text-sm mt-2">{t("institutVerification.loading_information")}</p>
  //       </div>
  //     </div>
  //   )
  // }

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center">
          <Loader className="h-8 w-8 text-blueLogo animate-spin mb-2" />
          <p className="text-gray-700 font-medium text-lg">{t("common.loading")}</p>
          <p className="text-gray-500 text-sm mt-2">{t("institutVerification.loading_information")}</p>

        </div>
      </div>
    )

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen pb-12">
      <InstitutBreadcrumb title={t("institutVerification.verification")} SubTitle={institut?.name} />
      <PayPalScriptProvider options={getPayPalConfig()}>
        <section className="py-8">
          <div className="container max-w-6xl mx-auto px-4">
            {/* Header Card */}
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{t("institutVerification.system_title")}</h1>
              <p className="text-gray-600 max-w-3xl mx-auto">{t("institutVerification.system_description")}</p>
            </div>

            {/* Main Content */}
            <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200">
              {/* Header */}
              <div className="bg-gradient-to-r from-blueLogo to-blueLogo px-8 py-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-white bg-opacity-20 p-3 rounded-full">
                    <FileCheck className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{t("institutVerification.make_verification")}</h2>
                    <p className="text-blue-100 mt-1">
                      {activeSubscription
                        ? t("institutVerification.subscription_active_message")
                        : t("institutVerification.subscription_required_message")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status Alert */}
              <div className="px-8 pt-6">
                {!document && textSearch && (
                  <div
                    className={`mb-6 p-4 rounded-lg ${textSearch === t("institutVerification.subscription_active") ||
                      textSearch === t("subscription_active")
                      ? "bg-green-50 border border-green-200"
                      : textSearch === t("institutVerification.no_document_found")
                        ? "bg-red-50 border border-red-200"
                        : "bg-amber-50 border border-amber-200"
                      }`}
                  >
                    <div className="flex items-center">
                      {textSearch === t("institutVerification.subscription_active") ||
                        textSearch === t("subscription_active") ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      ) : textSearch === t("institutVerification.no_document_found") ? (
                        <AlertCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0" />
                      )}
                      <p
                        className={`font-medium ${textSearch === t("institutVerification.subscription_active") ||
                          textSearch === t("subscription_active")
                          ? "text-green-700"
                          : textSearch === t("institutVerification.no_document_found")
                            ? "text-red-700"
                            : "text-amber-700"
                          }`}
                      >
                        {textSearch}
                      </p>
                    </div>
                  </div>
                )}

                {document && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <p className="font-medium text-green-700">{textSearch}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-8 pt-2">
                <div className="bg-white rounded-lg">
                  {/* Verification Form Section */}
                  <div className="mb-8">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-100 p-2 rounded-full mr-3">
                        <Search className="h-5 w-5 text-blueLogo" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        {t("institutVerification.verification_form")}
                      </h3>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                      <form onSubmit={handleSubmit(handleVerification)}>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label
                              htmlFor="nomComplet"
                              className="block text-sm font-medium text-gray-700 flex items-center"
                            >
                              <User className="h-4 w-4 mr-1 text-gray-500" />
                              {t("institutVerification.full_name")}
                            </label>
                            <input
                              type="text"
                              id="nomComplet"
                              {...control.register("nomComplet")}
                              className={`w-full px-4 py-3 rounded-lg border ${errors.nomComplet
                                ? "border-red-300 focus:ring-red-500"
                                : "border-gray-300 focus:ring-blue-500"
                                } focus:border-transparent focus:outline-none focus:ring-2`}
                              placeholder={t("institutVerification.enter_full_name")}
                            />
                            {errors.nomComplet && (
                              <p className="text-red-500 text-sm mt-1">{errors.nomComplet.message}</p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <label
                              htmlFor="codeAdn"
                              className="block text-sm font-medium text-gray-700 flex items-center"
                            >
                              <Key className="h-4 w-4 mr-1 text-gray-500" />
                              {t("institutVerification.adn_code")}
                            </label>
                            <input
                              type="text"
                              id="codeAdn"
                              {...control.register("codeAdn")}
                              className={`w-full px-4 py-3 rounded-lg border ${errors.codeAdn
                                ? "border-red-300 focus:ring-red-500"
                                : "border-gray-300 focus:ring-blue-500"
                                } focus:border-transparent focus:outline-none focus:ring-2`}
                              placeholder={t("institutVerification.enter_adn_code")}
                            />
                            {errors.codeAdn && <p className="text-red-500 text-sm mt-1">{errors.codeAdn.message}</p>}
                          </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                          <button
                            type="button"
                            onClick={() => reset()}
                            className="px-4 py-2 mr-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors flex items-center"
                          >
                            <RefreshCw className="h-4 w-4 mr-2" />
                            {t("institutVerification.reset")}
                          </button>
                          <button
                            type="submit"
                            disabled={verifying || (!activeSubscription && paymentStatus !== "success")}
                            className={`px-6 py-2 rounded-lg font-medium flex items-center ${activeSubscription || paymentStatus === "success"
                              ? "bg-blueLogo hover:bg-blueLogo text-white"
                              : "bg-gray-300 text-gray-500 cursor-not-allowed"
                              } transition-colors`}
                          >
                            {verifying ? (
                              <>
                                <Loader className="h-4 w-4 mr-2 animate-spin" />
                                {t("institutVerification.verifying")}
                              </>
                            ) : (
                              <>
                                <Shield className="h-4 w-4 mr-2" />
                                {t("institutVerification.verify")}
                              </>
                            )}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>

                  {/* Payment Section */}
                  {!activeSubscription && paymentStatus !== "success" && (
                    <div className="mt-10 pt-8 border-t border-gray-200">
                      <div className="flex items-center mb-6">
                        <div className="bg-blue-100 p-2 rounded-full mr-3">
                          <CreditCard className="h-5 w-5 text-blueLogo" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800">
                          {t("institutVerification.make_payment")}
                        </h3>
                      </div>

                      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8 rounded-r-lg">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <AlertCircle className="h-5 w-5 text-blueLogo" />
                          </div>
                          <div className="ml-3">
                            <p className="text-blueLogo font-medium">{t("institutVerification.subscription_info")}</p>
                            <p className="text-blueLogo text-sm mt-1">
                              {t("institutVerification.subscription_info_detail")}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-800">
                              {t("institutVerification.subscription_premium")}
                            </h4>
                            <p className="text-gray-600 mt-1">{t("institutVerification.unlimited_access")}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-blueLogo">${paymentAmount}</p>
                            <p className="text-gray-500 text-sm">{t("institutVerification.per_year")}</p>
                          </div>
                        </div>

                        <PaymentSection
                          watch={watch}
                          stripePromise={stripePromise}
                          clientSecret={clientSecret}
                          onPaymentSuccess={handlePaymentSuccess}
                          institut={institut}
                          amount={paymentAmount}
                          clientSecretSettings={clientSecretSettings}
                          data={{
                            nomComplet: getValues("nomComplet"),
                            codeAdn: getValues("codeAdn"),
                            paymentMethod: getValues("paymentMethod"),
                            dateDebut: getValues("dateDebut"),
                            dateFin: getValues("dateFin"),
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Document Results */}
                  {document && (
                    <div className="mt-10 pt-8 border-t border-gray-200">
                      <div className="flex items-center mb-6">
                        <div className="bg-green-100 p-2 rounded-full mr-3">
                          <FileCheck className="h-5 w-5 text-green-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800">
                          {t("institutVerification.document_details")}
                        </h3>
                      </div>

                      <div className="bg-green-50 p-1 rounded-xl">
                        <DocumentCard document={document} />
                      </div>

                      <div className="mt-6 flex justify-end">
                        <button
                          onClick={() => {
                            setDocument(null)
                            reset()
                          }}
                          className="px-6 py-2 bg-blueLogo hover:bg-blueLogo text-white rounded-lg font-medium flex items-center transition-colors"
                        >
                          <ArrowRight className="h-4 w-4 mr-2" />
                          {t("institutVerification.new_verification")}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </PayPalScriptProvider>
    </div>
  )
}

export default InstitutVerification

