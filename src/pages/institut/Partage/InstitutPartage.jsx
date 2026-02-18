
// // "use client"

// // import { useState, useEffect, useContext } from "react"
// // import { useAuthContext } from "../../../context/useAuthContext"
// // import { useTranslation } from "react-i18next"
// // import { getDemandePartageInstitut } from "../../../services/partageService"
// // import { message, Form, Input, Button, Card, Table, Spin, Tag, Space, Popover, Select } from "antd"
// // import {
// //   SearchOutlined,
// //   EyeOutlined,
// //   InfoCircleOutlined,
// // } from "@ant-design/icons"
// // import { Link } from "react-router-dom"
// // import InstitutBreadcrumb from "@/components/InstitutBreadcrumb"
// // import { AlertCircle, CheckCircle, CreditCard, FileText, Loader2 } from "lucide-react"
// // import { CopyableFieldSimple } from "@/utils/CopyableField"
// // import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
// // import { Elements } from "@stripe/react-stripe-js"
// // import { loadStripe } from "@stripe/stripe-js"
// // import { toast } from "sonner"
// // import { useForm, Controller } from "react-hook-form"
// // import { yupResolver } from "@hookform/resolvers/yup"
// // import * as yup from "yup"
// // import { getPayPalConfig, getPublishableKey, createPaymentIntentInstitut } from "../../../services/paymentService"
// // import { getAbonnementsByInstitutActif, createAbonnement } from "../../../services/abonnementService"
// // import CheckoutForm from "../components/CheckoutForm"
// // import { AppContext } from "@/AppContext"



// // // Schema de validation pour le formulaire d'abonnement
// // const subscriptionSchema = yup.object({
// //   nomComplet: yup.string().required("Le nom complet est requis"),
// //   paymentMethod: yup.string().required("La méthode de paiement est requise"),
// //   dateDebut: yup.date().required("La date de début est requise"),
// //   dateFin: yup.date().required("La date de fin est requise"),
// // })

// // const InstitutPartage = () => {
// //   const { institut } = useAuthContext()
// //   const [loading, setLoading] = useState(true)
// //   const [demandes, setDemandes] = useState([])
// //   const [searchText, setSearchText] = useState("")
// //   const [form] = Form.useForm()
// //   const { t } = useTranslation()
// //   const [filterPeriode, setFilterPeriode] = useState(null)
// //   const [filterYear, setFilterYear] = useState(null)
// //   const [uniquePeriodes, setUniquePeriodes] = useState([])
// //   const [uniqueYears, setUniqueYears] = useState([])

// //   // Subscription and payment states
// //   const [activeSubscription, setActiveSubscription] = useState(null)
// //   const [stripePromise, setStripePromise] = useState(null)
// //   const [clientSecret, setClientSecret] = useState("")
// //   const [paymentStatus, setPaymentStatus] = useState(null)
// //   const [clientSecretSettings, setClientSecretSettings] = useState({
// //     clientSecret: "",
// //     loading: true,
// //     payment_intent_id: "",
// //   })
// //   const { urlApi, prixDemandeur, prixInstitut, prixUnivercity } = useContext(AppContext)
// //   const [paymentAmount] = useState(institut?.type === "Université" ? prixUnivercity : prixInstitut)
// //   const [subscriptionLoading, setSubscriptionLoading] = useState(true)
// //   const [isFormValid, setIsFormValid] = useState(false)
// //   const [loadingPayment, setLoadingPayment] = useState(false)

// //   // Form pour l'abonnement
// //   const {
// //     control,
// //     handleSubmit,
// //     formState: { errors, isSubmitting },
// //     watch,
// //     getValues,
// //   } = useForm({
// //     resolver: yupResolver(subscriptionSchema),
// //     defaultValues: {
// //       nomComplet: "",
// //       paymentMethod: "",
// //       dateDebut: new Date().toISOString().split("T")[0],
// //       dateFin: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0],
// //     },
// //   })

// //   // Ajouter une constante pour l'intervalle de vérification (en millisecondes)
// //   const SUBSCRIPTION_CHECK_INTERVAL = 60000 // Vérifier toutes les minutes

// //   // Ajouter un état pour suivre l'intervalle
// //   const [checkSubscriptionInterval, setCheckSubscriptionInterval] = useState(null)

// //   // Modifier le useEffect existant pour initialiser l'intervalle de vérification
// //   useEffect(() => {
// //     initializeComponent()

// //     // Configurer l'intervalle pour vérifier l'abonnement périodiquement
// //     const interval = setInterval(() => {
// //       checkSubscriptionStatus()
// //     }, SUBSCRIPTION_CHECK_INTERVAL)

// //     setCheckSubscriptionInterval(interval)

// //     // Nettoyer l'intervalle lors du démontage du composant
// //     return () => {
// //       if (interval) {
// //         clearInterval(interval)
// //       }
// //     }
// //   }, [institut.id])

// //   // Ajouter une nouvelle fonction pour vérifier uniquement le statut de l'abonnement
// //   const checkSubscriptionStatus = async () => {
// //     try {
// //       //console.log("Vérification périodique de l'abonnement...")
// //       const subscriptionData = await getAbonnementsByInstitutActif(institut.id)

// //       // Mettre à jour l'état de l'abonnement uniquement s'il a changé
// //       if ((subscriptionData && !activeSubscription) || (!subscriptionData && activeSubscription)) {
// //         //console.log("Statut d'abonnement modifié:", subscriptionData ? "Actif" : "Inactif")
// //         setActiveSubscription(subscriptionData)

// //         // Si l'abonnement est devenu inactif
// //         if (!subscriptionData && activeSubscription) {
// //           toast.warning(t("institutPartage.subscription_expired"))
// //         }

// //         // Si l'abonnement est devenu actif
// //         if (subscriptionData && !activeSubscription) {
// //           toast.success(t("institutPartage.subscription_activated"))
// //         }
// //       }
// //     } catch (error) {
// //       console.error(t("institutPartage.error_checking_subscription"), error)
// //     }
// //   }

// //   useEffect(() => {
// //     scrollTo(0, 0)
// //   }, [])

// //   const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0)

// //   useEffect(() => {
// //     const handleResize = () => setWindowWidth(window.innerWidth)
// //     window.addEventListener("resize", handleResize)
// //     return () => window.removeEventListener("resize", handleResize)
// //   }, [])

// //   const initializeComponent = async () => {
// //     try {
// //       setSubscriptionLoading(true)

// //       // Check subscription and initialize payment
// //       const [subscriptionData, publishableKey] = await Promise.all([
// //         getAbonnementsByInstitutActif(institut.id),
// //         getPublishableKey(),
// //       ])

// //       setActiveSubscription(subscriptionData)
// //       setStripePromise(loadStripe(publishableKey.publishable_key))

// //       if (!subscriptionData) {
// //         // Create payment intent for subscription
// //         const response = await createPaymentIntentInstitut(institut.id, paymentAmount)
// //         setClientSecret(response.client_secret)
// //         setClientSecretSettings({
// //           clientSecret: response.client_secret,
// //           loading: false,
// //           payment_intent_id: response.payment_intent_id,
// //         })
// //       }
// //       // Fetch demandes regardless of subscription status
// //       await fetchDemandes()
// //     } catch (error) {
// //       console.error(t("institutPartage.error_initialization"), error)
// //       message.error(t("institutPartage.error_initialization"))
// //     } finally {
// //       setSubscriptionLoading(false)
// //     }
// //   }

// //   const fetchDemandes = async () => {
// //     try {
// //       setLoading(true)
// //       const data = await getDemandePartageInstitut(institut.id)
// //       setDemandes(data)
// //       extractUniqueFilters(data)
// //       //console.log(data)
// //     } catch (err) {
// //       console.error(t("institutPartage.error_fetching_requests"), err)
// //       message.error(t("institutPartage.error_fetching_requests"))
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   const extractUniqueFilters = (data) => {
// //     const periodes = [...new Set(data.map((item) => item.periode))].sort()
// //     const years = [...new Set(data.map((item) => item.year))].sort((a, b) => b - a)

// //     setUniquePeriodes(periodes)
// //     setUniqueYears(years)
// //   }

// //   const handlePeriodeFilter = (periode) => {
// //     setFilterPeriode(periode)
// //   }

// //   const handleYearFilter = (year) => {
// //     setFilterYear(year)
// //   }

// //   const resetFilters = () => {
// //     setFilterPeriode(null)
// //     setFilterYear(null)
// //   }

// //   const getFilteredData = () => {
// //     return demandes.filter((item) => {
// //       const matchesSearch =
// //         item.code.toLowerCase().includes(searchText.toLowerCase()) ||
// //         item.demandeur.name.toLowerCase().includes(searchText.toLowerCase())

// //       const matchesPeriode = filterPeriode ? item.periode === filterPeriode : true
// //       const matchesYear = filterYear ? item.year === filterYear : true

// //       return matchesSearch && matchesPeriode && matchesYear
// //     })
// //   }

// //   const translatePeriode = (periode) => {
// //     switch (periode) {
// //       case "Printemps":
// //         return t("demandePartage.periode_1")
// //       case "Été":
// //         return t("demandePartage.periode_2")
// //       case "Automne":
// //         return t("demandePartage.periode_3")
// //       case "Hiver":
// //         return t("demandePartage.periode_4")
// //       case "Autre":
// //         return t("demandePartage.periode_5")
// //       default:
// //         return periode
// //     }
// //   }

// //   // Fonctions pour l'abonnement
// //   const onSubmitSubscription = async (data) => {
// //     setIsFormValid(true)
// //     if (data.paymentMethod === "stripe") {
// //       try {
// //         const response = await createPaymentIntentInstitut(institut.id, paymentAmount)
// //         setClientSecret(response.client_secret)
// //         setClientSecretSettings({
// //           clientSecret: response.client_secret,
// //           loading: false,
// //           payment_intent_id: response.payment_intent_id,
// //         })
// //       } catch (error) {
// //         console.error(t("institutPartage.error_payment_preparation"), error)
// //         toast.error(t("institutPartage.error_payment_preparation"))
// //       }
// //     }
// //   }

// //   const onPaymentSuccess = async () => {
// //     toast.success(t("institutPartage.payment_success"))
// //     setPaymentStatus("success")
// //     setIsFormValid(false)
// //     initializeComponent()
// //   }



// //   const handlePayment = async (paymentMethod, paymentData) => {
// //     const formData = getValues()
// //     let paymentResult

// //     setLoadingPayment(true);

// //     if (paymentMethod === "paypal") {
// //       paymentResult = {
// //         success: true,
// //         paymentInfo: {
// //           id: paymentData.id,
// //           status: paymentData.status,
// //           payer: paymentData.payer,
// //           amount: paymentData.purchase_units[0].amount,
// //           create_time: paymentData.create_time,
// //           update_time: paymentData.update_time,
// //           currency: paymentData.purchase_units[0].amount.currency_code
// //         },
// //       }
// //     } else if (paymentMethod === "stripe") {
// //       paymentResult = {
// //         success: true,
// //         paymentInfo: paymentData,
// //       }
// //     }

// //     const submitData = {
// //       ...formData,
// //       dateDebut: getValues('dateDebut'),
// //       dateFin: getValues('dateFin'),
// //       institut_id: institut?.id,
// //       montant: paymentAmount,
// //       amount: paymentAmount,
// //       paymentMethod: "PayPal",
// //       statut: 'actif',
// //       paymentInfo: paymentResult.paymentInfo,
// //       typePaiement: paymentMethod === "paypal" ? "PayPal" : "Stripe",
// //       clientSecret: paymentResult.paymentInfo.id,
// //       currency: paymentResult.paymentInfo.amount.currency_code ?? 'USD'
// //     }
// //     console.log(submitData)

// //     try {
// //       if (paymentResult.success) {
// //         setPaymentStatus("success")
// //         try {
// //           const resultatPaiement = await createAbonnement(submitData);
// //           if (resultatPaiement) {
// //             toast.success(t("institutPartage.subscription_effective"))
// //             setPaymentStatus("success")
// //             setIsFormValid(false)
// //             initializeComponent()
// //           } else {
// //             toast.error(t("institutPartage.error_payment_confirmation"))
// //           }
// //           setLoadingPayment(false);
// //         } catch (error) {
// //           console.error(t("institutPartage.error_creating_subscription"), error)
// //           toast.error(t("institutPartage.error_payment_confirmation"))
// //           setLoadingPayment(false)
// //         }
// //       } else {
// //         setPaymentStatus("failed")
// //         toast.error(t("institut.abonnement.paymentFailed"));
// //       }
// //       setLoadingPayment(false);
// //     } catch (error) {
// //       console.error("Error creating abonnement:", error);
// //       toast.error(t("paymentFailed"));
// //       setLoadingPayment(false);
// //     }
// //   };

// //   const selectedPaymentMethod = watch("paymentMethod")

// //   if (subscriptionLoading) {
// //     return (
// //       <Spin size="large" tip={t("common.loading")} >
// //         <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
// //         </div>
// //       </Spin>
// //     )
// //   }


// //   if (!activeSubscription && paymentStatus !== "success") {
// //     return (
// //       <PayPalScriptProvider options={getPayPalConfig()}>
// //         <Elements stripe={stripePromise}>
// //           <div style={{ background: "#f0f2f5", minHeight: "100vh" }}>
// //             <InstitutBreadcrumb title={t("institutMenu.applications")} SubTitle={institut?.name} />

// //             <section className="py-6">
// //               <div className="container max-w-4xl mx-auto px-4">
// //                 <div className="bg-white rounded-xl shadow-xl overflow-hidden">
// //                   {/* Header */}
// //                   <div className="bg-gradient-to-r from-blueLogo to-blue-600 px-8 py-6">
// //                     <div className="flex items-center space-x-4">
// //                       <div className="bg-white bg-opacity-20 p-3 rounded-full">
// //                         <CreditCard className="h-8 w-8 text-white" />
// //                       </div>
// //                       <div>
// //                         <h2 className="text-2xl font-bold text-white">{t("institutPartage.abonnementRequis")}</h2>
// //                         <p className="text-blue-100 mt-1">
// //                           {t("institutPartage.souscrivezAbonnement")}
// //                         </p>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   {/* Alert */}
// //                   <div className="p-6">
// //                     <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6 rounded-r-lg">
// //                       <div className="flex items-center">
// //                         <AlertCircle className="h-5 w-5 text-amber-400 mr-3" />
// //                         <div>
// //                           <p className="text-amber-800 font-medium">{t("institutPartage.accesLimite")}</p>
// //                           <p className="text-amber-700 text-sm mt-1">
// //                             {t("institutPartage.accesLimiteDescription")}
// //                           </p>
// //                         </div>
// //                       </div>
// //                     </div>

// //                     {/* Formulaire d'abonnement */}
// //                     <div className="max-w-3xl mx-auto">
// //                       <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
// //                         <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
// //                           <div>
// //                             <h4 className="text-lg font-semibold text-gray-800">{t("institutPartage.abonnementPremium")}</h4>
// //                             <p className="text-gray-600 mt-1">{t("institutPartage.accesIllimite")}</p>
// //                           </div>
// //                           <div className="text-right">
// //                             <p className="text-2xl font-bold text-blueLogo">${paymentAmount}</p>
// //                             <p className="text-gray-500 text-sm">par an</p>
// //                           </div>
// //                         </div>

// //                         <form onSubmit={handleSubmit(onSubmitSubscription)} className="space-y-6">
// //                           <div>
// //                             <label htmlFor="nomComplet" className="block text-sm font-medium text-gray-700">
// //                               {t("institutPartage.nomComplet")}
// //                             </label>
// //                             <Controller
// //                               name="nomComplet"
// //                               control={control}
// //                               render={({ field }) => (
// //                                 <input
// //                                   {...field}
// //                                   type="text"
// //                                   id="nomComplet"
// //                                   className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
// //                                 />
// //                               )}
// //                             />
// //                             {errors.nomComplet && (
// //                               <p className="mt-2 text-sm text-red-500">{errors.nomComplet.message}</p>
// //                             )}
// //                           </div>

// //                           <div className="w-full flex gap-6">
// //                             <div className="flex-1">
// //                               <label htmlFor="dateDebut" className="block text-sm font-medium text-gray-700">
// //                                 {t("institutPartage.dateDebut")}
// //                               </label>
// //                               <Controller
// //                                 name="dateDebut"
// //                                 control={control}
// //                                 render={({ field }) => (
// //                                   <input
// //                                     {...field}
// //                                     type="date"
// //                                     id="dateDebut"
// //                                     className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
// //                                   />
// //                                 )}
// //                               />
// //                               {errors.dateDebut && (
// //                                 <p className="mt-2 text-sm text-red-500">{errors.dateDebut.message}</p>
// //                               )}
// //                             </div>
// //                             <div className="flex-1">
// //                               <label htmlFor="dateFin" className="block text-sm font-medium text-gray-700">
// //                                 {t("institutPartage.dateFin")}
// //                               </label>
// //                               <Controller
// //                                 name="dateFin"
// //                                 control={control}
// //                                 render={({ field }) => (
// //                                   <input
// //                                     {...field}
// //                                     type="date"
// //                                     id="dateFin"
// //                                     className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
// //                                   />
// //                                 )}
// //                               />
// //                               {errors.dateFin && <p className="mt-2 text-sm text-red-500">{errors.dateFin.message}</p>}
// //                             </div>
// //                           </div>

// //                           <div>
// //                             <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
// //                               {t("institutPartage.methodePaiement")}
// //                             </label>
// //                             <Controller
// //                               name="paymentMethod"
// //                               control={control}
// //                               render={({ field }) => (
// //                                 <select
// //                                   {...field}
// //                                   id="paymentMethod"
// //                                   className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
// //                                 >
// //                                   <option value="">{t("institutPartage.selectionnezMethodePaiement")}</option>
// //                                   <option value="paypal">{t("institutPartage.paypal")}</option>
// //                                   <option value="stripe">{t("institutPartage.stripe")}</option>
// //                                 </select>
// //                               )}
// //                             />
// //                             {errors.paymentMethod && (
// //                               <p className="mt-2 text-sm text-red-500">{errors.paymentMethod.message}</p>
// //                             )}
// //                           </div>

// //                           <div className="flex justify-end">
// //                             <button
// //                               type="submit"
// //                               disabled={isSubmitting}
// //                               className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blueLogo hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
// //                             >
// //                               {loadingPayment ? (
// //                                 <>
// //                                   <Loader2 className="animate-spin mr-2 h-4 w-4" />
// //                                   {t("institutPartage.traitement")}
// //                                 </>
// //                               ) : (
// //                                 t("institutPartage.validerFormulaire")
// //                               )}
// //                             </button>
// //                           </div>
// //                         </form>

// //                         {isFormValid && (
// //                           <div className="mt-8 pt-6 border-t border-gray-200">
// //                             <h5 className="text-lg font-semibold mb-4">{t("institutPartage.procederPaiement")}</h5>
// //                             <div className="mb-4 p-4 bg-blue-50 rounded-lg">
// //                               <p className="text-lg font-semibold">{t("institutPartage.montant")}: ${paymentAmount}</p>
// //                             </div>

// //                             {selectedPaymentMethod === "paypal" && (
// //                               <PayPalButtons
// //                                 createOrder={(data, actions) => {
// //                                   return actions.order.create({
// //                                     purchase_units: [
// //                                       {
// //                                         amount: {
// //                                           value: paymentAmount.toString(),
// //                                           currency_code: 'USD'
// //                                         },
// //                                       },
// //                                     ],
// //                                   });
// //                                 }}
// //                                 onApprove={async (data, actions) => {
// //                                   return actions.order.capture().then((orderData) => {
// //                                     handlePayment("paypal", orderData);
// //                                   });
// //                                 }}
// //                                 onError={(err) => {
// //                                   console.error('PayPal Error', err);
// //                                   toast.error(t('demandeur.paymentErrorToast'), {
// //                                     position: "top-right",
// //                                     duration: 2000,
// //                                   });
// //                                 }}
// //                                 onCancel={() => {
// //                                   toast.error(t("institut.abonnement.paymentFailed"));
// //                                 }}
// //                               />
// //                             )}

// //                             {selectedPaymentMethod === "stripe" && (
// //                               <>
// //                                 {clientSecretSettings.loading ? (
// //                                   <div className="text-center">
// //                                     <Spin size="large" tip={t("common.loading")} />
// //                                   </div>
// //                                 ) : (
// //                                   <Elements
// //                                     stripe={stripePromise}
// //                                     options={{
// //                                       clientSecret: clientSecretSettings.clientSecret,
// //                                       appearance: { theme: "stripe" },
// //                                     }}
// //                                   >
// //                                     <CheckoutForm
// //                                       // onPaymentSuccess={onPaymentSuccess}
// //                                       onPaymentSuccess={(paymentIntent) => handlePayment("stripe", paymentIntent)}
// //                                       amount={paymentAmount}
// //                                       institut={institut}
// //                                       clientSecretSettings={clientSecretSettings}
// //                                       data={{
// //                                         nomComplet: getValues("nomComplet"),
// //                                         paymentMethod: getValues("paymentMethod"),
// //                                         dateDebut: getValues("dateDebut"),
// //                                         dateFin: getValues("dateFin"),
// //                                       }}
// //                                     />
// //                                   </Elements>
// //                                 )}
// //                               </>
// //                             )}
// //                           </div>
// //                         )}

// //                         {paymentStatus === "success" && (
// //                           <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md">
// //                             {t("institutPartage.paiementReussi")}
// //                           </div>
// //                         )}
// //                         {paymentStatus === "failed" && (
// //                           <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
// //                             {t("institutPartage.paiementEchoue")}
// //                           </div>
// //                         )}
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </section>
// //           </div>
// //         </Elements>
// //       </PayPalScriptProvider>
// //     );
// //   }


// //   // Reste du code pour l'affichage normal avec abonnement actif...
// //   const getResponsiveColumns = () => {
// //     const baseColumns = [
// //       {
// //         title: t("institutPartage.requester"),
// //         dataIndex: "demandeur",
// //         key: "demandeur",
// //         render: (_, record) =>
// //           record.demandeur ? (
// //             <Link to={`/institut/demandeur/${record.demandeur.id}/details`}>
// //               <Tag color="blue">{record.demandeur.name}</Tag>
// //             </Link>
// //           ) : (
// //             <span>N/A</span>
// //           ),
// //         sorter: (a, b) => a.demandeur?.name.localeCompare(b.demandeur?.name),
// //       },
// //       {
// //         title: t("demandePartage.periode"),
// //         dataIndex: "periode",
// //         key: "periode",
// //         render: (_, record) => (
// //           <Tag color="blue">
// //             {translatePeriode(record.periode)} - {record.year}
// //           </Tag>
// //         ),
// //         sorter: (a, b) => a.periode - b.periode,
// //       },
// //       {
// //         title: t("institutPartage.code"),
// //         dataIndex: "code",
// //         key: "code",
// //         render: (_, record) => (
// //           <Tag color="blue">
// //             <CopyableFieldSimple value={record.code} />
// //           </Tag>
// //         ),
// //         sorter: (a, b) => a.code.localeCompare(b.code),
// //       },
// //       {
// //         title: t("institutPartage.request_date"),
// //         dataIndex: "dateDemande",
// //         key: "dateDemande",
// //         render: (date) => new Date(date).toLocaleDateString(),
// //         sorter: (a, b) => new Date(a.dateDemande) - new Date(b.dateDemande),
// //         responsive: ["md"],
// //       },
// //       {
// //         title: t("institutPartage.documents"),
// //         dataIndex: "documentPartages",
// //         key: "documentPartages",
// //         render: (docs, record) => (
// //           <Link to={`/institut/demande/${record.id}/documents`}>
// //             <Tag color="blue">{docs.length} document(s)</Tag>
// //           </Link>
// //         ),
// //         responsive: ["md"],
// //       },
// //       {
// //         title: t("institutPartage.actions"),
// //         key: "actions",
// //         render: (_, record) => (
// //           <Space size="small" wrap>
// //             <Link
// //               to={`/institut/partages/${record.id}/details`}
// //               className="text-primary hover:text-primary-light transition-colors duration-200 flex items-center gap-1"
// //             >
// //               <Button
// //                 className="ant-btn-primary"
// //                 icon={<EyeOutlined />}
// //                 title="Voir les détails de la demande"
// //                 size={windowWidth < 768 ? "small" : "middle"}
// //               >
// //                 {windowWidth >= 576 ? t("institutPartage.details") : ""}
// //               </Button>
// //             </Link>

// //             <Popover
// //               content={
// //                 <div style={{ maxWidth: "400px" }}>
// //                   <Space direction="vertical">
// //                     <div>
// //                       <strong>{t("institutPartage.requester")}:</strong>
// //                       <p>{record.demandeur.name}</p>
// //                       <p>
// //                         {record.demandeur.type} - {record.demandeur.paysResidence}
// //                       </p>
// //                       <p>
// //                         {t("institutPartage.email")}: {record.demandeur.email}
// //                       </p>
// //                       <p>
// //                         {t("institutPartage.phone")}: {record.demandeur.phone}
// //                       </p>
// //                     </div>
// //                     {record.documentPartages.length > 0 && (
// //                       <div>
// //                         <strong>{t("institutPartage.documents")}:</strong>
// //                         {record.documentPartages.map((doc, index) => (
// //                           <div key={index} style={{ marginTop: "8px" }}>
// //                             <p>
// //                               {doc.intitule} - {doc.typeDocument}
// //                             </p>
// //                             <p>
// //                               {t("institutPartage.dna_code")} : {doc.codeAdn}
// //                             </p>
// //                             <Tag color={doc.statut === "ACCEPTED" ? "success" : "processing"}>
// //                               {t(`institutPartage.status.${doc.statut.toLowerCase()}`)}
// //                             </Tag>
// //                           </div>
// //                         ))}
// //                       </div>
// //                     )}
// //                   </Space>
// //                 </div>
// //               }
// //               title={t("institutPartage.request_details")}
// //               trigger="click"
// //               placement="right"
// //             >
// //               <Button icon={<InfoCircleOutlined />} className="ant-btn-primary" size={windowWidth < 768 ? "small" : "middle"} />
// //             </Popover>
// //           </Space>
// //         ),
// //       },
// //     ]

// //     return baseColumns
// //   }

// //   const columns = getResponsiveColumns()

// //   const tableContainerStyle = {
// //     overflowX: "auto",
// //     width: "100%",
// //     maxWidth: "100%",
// //   }

// //   return (
// //     <PayPalScriptProvider options={getPayPalConfig()}>
// //       <Elements stripe={stripePromise}>
// //         <div style={{ background: "#f0f2f5", minHeight: "100vh" }}>
// //           <InstitutBreadcrumb title={t("institutMenu.applications")} SubTitle={institut?.name} />

// //           <section className="py-6">
// //             <div className="container max-w-6xl mx-auto px-4">
// //               <div className="bg-white rounded-xl shadow-xl overflow-hidden">
// //                 {/* Subscription Active Alert */}
// //                 <div className="bg-green-50 border-l-4 border-green-400 p-4 m-6 rounded-r-lg">
// //                   <div className="flex items-center">
// //                     <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
// //                     <p className="text-green-800 font-medium">{t('institutPartage.active_subscription')}</p>
// //                   </div>
// //                 </div>

// //                 <div className="flex border-b border-gray-200">
// //                   <button className="flex items-center py-4 px-6 font-medium transition-colors duration-200 text-blueLogo">
// //                     <FileText className="w-5 h-5 mr-2" />
// //                     {t("institutPartage.assigned_requests_list")}
// //                   </button>
// //                 </div>

// //                 <div className="p-6">
// //                   <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px" }}>
// //                     <Card>
// //                       <div
// //                         style={{
// //                           marginBottom: 16,
// //                           display: "flex",
// //                           justifyContent: "space-between",
// //                           flexWrap: "wrap",
// //                           gap: "10px",
// //                         }}
// //                       >
// //                         <Input
// //                           placeholder={t("institutPartage.search_placeholder")}
// //                           prefix={<SearchOutlined />}
// //                           value={searchText}
// //                           onChange={(e) => setSearchText(e.target.value)}
// //                           style={{ width: "100%", maxWidth: 300 }}
// //                         />
// //                         <Space wrap>
// //                           <Select
// //                             placeholder={t("demandePartage.select_periode")}
// //                             style={{ width: 120 }}
// //                             allowClear
// //                             onChange={handlePeriodeFilter}
// //                             value={filterPeriode}
// //                           >
// //                             {uniquePeriodes.map((periode) => (
// //                               <Select.Option key={periode} value={periode}>
// //                                 {translatePeriode(periode)}
// //                               </Select.Option>
// //                             ))}
// //                           </Select>
// //                           <Select
// //                             placeholder={t("demandePartage.select_year")}
// //                             style={{ width: 120 }}
// //                             allowClear
// //                             onChange={handleYearFilter}
// //                             value={filterYear}
// //                           >
// //                             {uniqueYears.map((year) => (
// //                               <Select.Option key={year} value={year}>
// //                                 {year}
// //                               </Select.Option>
// //                             ))}
// //                           </Select>
// //                           <Button onClick={resetFilters} className="ant-btn-primary" type="default">
// //                             {t("common.reset_filters")}
// //                           </Button>
// //                         </Space>
// //                       </div>
// //                       <div style={tableContainerStyle}>
// //                         <Table
// //                           columns={columns}
// //                           dataSource={getFilteredData()}
// //                           rowKey="id"
// //                           loading={loading}
// //                           pagination={{
// //                             defaultPageSize: 5,
// //                             showSizeChanger: true,
// //                             showTotal: (total) =>
// //                               `${t("institutPartage.total")} ${total} ${t("institutPartage.requests")}`,
// //                           }}
// //                           scroll={{ x: "max-content" }}
// //                           className="responsive-table"
// //                         />
// //                       </div>
// //                     </Card>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </section>
// //         </div>
// //       </Elements>
// //     </PayPalScriptProvider>
// //   )
// // }

// // export default InstitutPartage


// "use client";

// import { useState, useEffect, useContext } from "react";
// import { useAuthContext } from "../../../context/useAuthContext";
// import { useTranslation } from "react-i18next";
// import { getDemandePartageInstitut } from "../../../services/partageService";
// import { message, Form, Input, Button, Card, Table, Spin, Tag, Space, Popover, Select } from "antd";
// import { SearchOutlined, EyeOutlined, InfoCircleOutlined } from "@ant-design/icons";
// import { Link } from "react-router-dom";
// import InstitutBreadcrumb from "@/components/InstitutBreadcrumb";
// import { AlertCircle, CheckCircle, CreditCard, FileText, Loader2 } from "lucide-react";
// import { CopyableFieldSimple } from "@/utils/CopyableField";
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import { toast } from "sonner";
// import { useForm, Controller } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { getPayPalConfig, getPublishableKey, createPaymentIntentInstitut } from "../../../services/paymentService";
// import { getAbonnementsByInstitutActif, createAbonnement } from "../../../services/abonnementService";
// import CheckoutForm from "../components/CheckoutForm";
// import { AppContext } from "@/AppContext";

// // Schema de validation pour le formulaire d'abonnement
// const subscriptionSchema = yup.object({
//   nomComplet: yup.string().required("Le nom complet est requis"),
//   paymentMethod: yup.string().required("La méthode de paiement est requise"),
//   dateDebut: yup.date().required("La date de début est requise"),
//   dateFin: yup.date().required("La date de fin est requise"),
// });

// const InstitutPartage = () => {
//   const { institut } = useAuthContext();
//   const [loading, setLoading] = useState(true);
//   const [demandes, setDemandes] = useState([]);
//   const [searchText, setSearchText] = useState("");
//   const [form] = Form.useForm();
//   const { t } = useTranslation();
//   const [filterPeriode, setFilterPeriode] = useState(null);
//   const [filterYear, setFilterYear] = useState(null);
//   const [uniquePeriodes, setUniquePeriodes] = useState([]);
//   const [uniqueYears, setUniqueYears] = useState([]);
//   const [activeSubscription, setActiveSubscription] = useState(null);
//   const [stripePromise, setStripePromise] = useState(null);
//   const [clientSecret, setClientSecret] = useState("");
//   const [paymentStatus, setPaymentStatus] = useState(null);
//   const [clientSecretSettings, setClientSecretSettings] = useState({
//     clientSecret: "",
//     loading: true,
//     payment_intent_id: "",
//   });
//   const { urlApi, prixDemandeur, prixInstitut, prixUnivercity } = useContext(AppContext);
//   const [paymentAmount] = useState(institut?.type === "Université" ? prixUnivercity : prixInstitut);
//   const [subscriptionLoading, setSubscriptionLoading] = useState(true);
//   const [isFormValid, setIsFormValid] = useState(false);
//   const [loadingPayment, setLoadingPayment] = useState(false);

//   const {
//     control,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     watch,
//     getValues,
//   } = useForm({
//     resolver: yupResolver(subscriptionSchema),
//     defaultValues: {
//       nomComplet: institut ? institut.name : "",
//       paymentMethod: "",
//       dateDebut: new Date().toISOString().split("T")[0],
//       dateFin: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0],
//     },
//   });

//   const SUBSCRIPTION_CHECK_INTERVAL = 60000;
//   const [checkSubscriptionInterval, setCheckSubscriptionInterval] = useState(null);
//   const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0);

//   useEffect(() => {
//     const handleResize = () => setWindowWidth(window.innerWidth);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     initializeComponent();
//     const interval = setInterval(() => {
//       checkSubscriptionStatus();
//     }, SUBSCRIPTION_CHECK_INTERVAL);
//     setCheckSubscriptionInterval(interval);
//     return () => {
//       if (interval) {
//         clearInterval(interval);
//       }
//     };
//   }, [institut.id]);

//   const checkSubscriptionStatus = async () => {
//     try {
//       const subscriptionData = await getAbonnementsByInstitutActif(institut.id);
//       if ((subscriptionData && !activeSubscription) || (!subscriptionData && activeSubscription)) {
//         setActiveSubscription(subscriptionData);
//         if (!subscriptionData && activeSubscription) {
//           toast.warning(t("institutPartage.subscription_expired"));
//         }
//         if (subscriptionData && !activeSubscription) {
//           toast.success(t("institutPartage.subscription_activated"));
//         }
//       }
//     } catch (error) {
//       console.error(t("institutPartage.error_checking_subscription"), error);
//     }
//   };

//   useEffect(() => {
//     scrollTo(0, 0);
//   }, []);

//   const initializeComponent = async () => {
//     try {
//       setSubscriptionLoading(true);
//       const [subscriptionData, publishableKey] = await Promise.all([
//         getAbonnementsByInstitutActif(institut.id),
//         getPublishableKey(),
//       ]);
//       setActiveSubscription(subscriptionData);
//       setStripePromise(loadStripe(publishableKey.publishable_key));
//       if (!subscriptionData) {
//         const response = await createPaymentIntentInstitut(institut.id, paymentAmount);
//         setClientSecret(response.client_secret);
//         setClientSecretSettings({
//           clientSecret: response.client_secret,
//           loading: false,
//           payment_intent_id: response.payment_intent_id,
//         });
//       }
//       await fetchDemandes();
//     } catch (error) {
//       console.error(t("institutPartage.error_initialization"), error);
//       message.error(t("institutPartage.error_initialization"));
//     } finally {
//       setSubscriptionLoading(false);
//     }
//   };

//   const fetchDemandes = async () => {
//     try {
//       setLoading(true);
//       const data = await getDemandePartageInstitut(institut.id);
//       setDemandes(data);
//       extractUniqueFilters(data);
//     } catch (err) {
//       console.error(t("institutPartage.error_fetching_requests"), err);
//       message.error(t("institutPartage.error_fetching_requests"));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const extractUniqueFilters = (data) => {
//     const periodes = [...new Set(data.map((item) => item.periode))].sort();
//     const years = [...new Set(data.map((item) => item.year))].sort((a, b) => b - a);
//     setUniquePeriodes(periodes);
//     setUniqueYears(years);
//   };

//   const handlePeriodeFilter = (periode) => {
//     setFilterPeriode(periode);
//   };

//   const handleYearFilter = (year) => {
//     setFilterYear(year);
//   };

//   const resetFilters = () => {
//     setFilterPeriode(null);
//     setFilterYear(null);
//   };

//   const getFilteredData = () => {
//     return demandes.filter((item) => {
//       const matchesSearch =
//         item.code.toLowerCase().includes(searchText.toLowerCase()) ||
//         item.demandeur.name.toLowerCase().includes(searchText.toLowerCase());
//       const matchesPeriode = filterPeriode ? item.periode === filterPeriode : true;
//       const matchesYear = filterYear ? item.year === filterYear : true;
//       return matchesSearch && matchesPeriode && matchesYear;
//     });
//   };

//   const translatePeriode = (periode) => {
//     switch (periode) {
//       case "Printemps":
//         return t("demandePartage.periode_1");
//       case "Été":
//         return t("demandePartage.periode_2");
//       case "Automne":
//         return t("demandePartage.periode_3");
//       case "Hiver":
//         return t("demandePartage.periode_4");
//       case "Autre":
//         return t("demandePartage.periode_5");
//       default:
//         return periode;
//     }
//   };

//   const onSubmitSubscription = async (data) => {
//     setIsFormValid(true);
//     if (data.paymentMethod === "stripe") {
//       try {
//         const response = await createPaymentIntentInstitut(institut.id, paymentAmount);
//         setClientSecret(response.client_secret);
//         setClientSecretSettings({
//           clientSecret: response.client_secret,
//           loading: false,
//           payment_intent_id: response.payment_intent_id,
//         });
//       } catch (error) {
//         console.error(t("institutPartage.error_payment_preparation"), error);
//         toast.error(t("institutPartage.error_payment_preparation"));
//       }
//     }
//   };

//   const onPaymentSuccess = async () => {
//     toast.success(t("institutPartage.payment_success"));
//     setPaymentStatus("success");
//     setIsFormValid(false);
//     initializeComponent();
//   };

//   const handlePayment = async (paymentMethod, paymentData) => {
//     const formData = getValues();
//     let paymentResult;
//     setLoadingPayment(true);
//     if (paymentMethod === "paypal") {
//       paymentResult = {
//         success: true,
//         paymentInfo: {
//           id: paymentData.id,
//           status: paymentData.status,
//           payer: paymentData.payer,
//           amount: paymentData.purchase_units[0].amount,
//           create_time: paymentData.create_time,
//           update_time: paymentData.update_time,
//           currency: paymentData.purchase_units[0].amount.currency_code,
//         },
//       };
//     } else if (paymentMethod === "stripe") {
//       paymentResult = {
//         success: true,
//         paymentInfo: paymentData,
//       };
//     }
//     const submitData = {
//       ...formData,
//       dateDebut: getValues("dateDebut"),
//       dateFin: getValues("dateFin"),
//       institut_id: institut?.id,
//       montant: paymentAmount,
//       amount: paymentAmount,
//       paymentMethod: "PayPal",
//       statut: "actif",
//       paymentInfo: paymentResult.paymentInfo,
//       typePaiement: paymentMethod === "paypal" ? "PayPal" : "Stripe",
//       clientSecret: paymentResult.paymentInfo.id,
//       currency: paymentResult.paymentInfo.amount.currency_code ?? "USD",
//     };
//     try {
//       if (paymentResult.success) {
//         setPaymentStatus("success");
//         try {
//           const resultatPaiement = await createAbonnement(submitData);
//           if (resultatPaiement) {
//             toast.success(t("institutPartage.subscription_effective"));
//             setPaymentStatus("success");
//             setIsFormValid(false);
//             initializeComponent();
//           } else {
//             toast.error(t("institutPartage.error_payment_confirmation"));
//           }
//           setLoadingPayment(false);
//         } catch (error) {
//           console.error(t("institutPartage.error_creating_subscription"), error);
//           toast.error(t("institutPartage.error_payment_confirmation"));
//           setLoadingPayment(false);
//         }
//       } else {
//         setPaymentStatus("failed");
//         toast.error(t("institut.abonnement.paymentFailed"));
//       }
//       setLoadingPayment(false);
//     } catch (error) {
//       console.error("Error creating abonnement:", error);
//       toast.error(t("paymentFailed"));
//       setLoadingPayment(false);
//     }
//   };

//   const selectedPaymentMethod = watch("paymentMethod");


//   if (subscriptionLoading) {
//     return (
//       <div style={{ display: "flex", justifyContent: "center", color: "#1890ff", alignItems: "center", height: "400px" }}>
//         <Spin fullscreen size="large" />
//       </div>
//     )
//   }


//   if (!activeSubscription && paymentStatus !== "success") {
//     return (
//       <PayPalScriptProvider options={getPayPalConfig()}>
//         <Elements stripe={stripePromise}>
//           <div style={{ background: "#f0f2f5", minHeight: "100vh" }}>
//             <InstitutBreadcrumb title={t("institutMenu.applications")} SubTitle={institut?.name} />
//             <section className="py-6">
//               <div className="container max-w-4xl mx-auto px-4">
//                 <div className="bg-white rounded-xl shadow-xl overflow-hidden">
//                   <div className="bg-gradient-to-r from-blueLogo to-blue-600 px-8 py-6">
//                     <div className="flex items-center space-x-4">
//                       <div className="bg-white bg-opacity-20 p-3 rounded-full">
//                         <CreditCard className="h-8 w-8 text-white" />
//                       </div>
//                       <div>
//                         <h2 className="text-2xl font-bold text-white">{t("institutPartage.abonnementRequis")}</h2>
//                         <p className="text-blue-100 mt-1">{t("institutPartage.souscrivezAbonnement")}</p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="p-6">
//                     <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6 rounded-r-lg">
//                       <div className="flex items-center">
//                         <AlertCircle className="h-5 w-5 text-amber-400 mr-3" />
//                         <div>
//                           <p className="text-amber-800 font-medium">{t("institutPartage.accesLimite")}</p>
//                           <p className="text-amber-700 text-sm mt-1">{t("institutPartage.accesLimiteDescription")}</p>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="max-w-3xl mx-auto">
//                       <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
//                         <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
//                           <div>
//                             <h4 className="text-lg font-semibold text-gray-800">{t("institutPartage.abonnementPremium")}</h4>
//                             <p className="text-gray-600 mt-1">{t("institutPartage.accesIllimite")}</p>
//                           </div>
//                           <div className="text-right">
//                             <p className="text-2xl font-bold text-blueLogo">${paymentAmount}</p>
//                             <p className="text-gray-500 text-sm">par an</p>
//                           </div>
//                         </div>
//                         <form onSubmit={handleSubmit(onSubmitSubscription)} className="space-y-6">
//                           <div>
//                             <label htmlFor="nomComplet" className="block text-sm font-medium text-gray-700">
//                               {t("institutPartage.nomComplet")}
//                             </label>
//                             <Controller
//                               name="nomComplet"
//                               control={control}
//                               render={({ field }) => (
//                                 <input
//                                   {...field}
//                                   type="text"
//                                   id="nomComplet"
//                                   className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                                 />
//                               )}
//                             />
//                             {errors.nomComplet && <p className="mt-2 text-sm text-red-500">{errors.nomComplet.message}</p>}
//                           </div>
//                           <div className="w-full flex gap-6">
//                             <div className="flex-1">
//                               <label htmlFor="dateDebut" className="block text-sm font-medium text-gray-700">
//                                 {t("institutPartage.dateDebut")}
//                               </label>
//                               <Controller
//                                 name="dateDebut"
//                                 control={control}
//                                 render={({ field }) => (
//                                   <input
//                                     {...field}
//                                     type="date"
//                                     id="dateDebut"
//                                     className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                                   />
//                                 )}
//                               />
//                               {errors.dateDebut && <p className="mt-2 text-sm text-red-500">{errors.dateDebut.message}</p>}
//                             </div>
//                             <div className="flex-1">
//                               <label htmlFor="dateFin" className="block text-sm font-medium text-gray-700">
//                                 {t("institutPartage.dateFin")}
//                               </label>
//                               <Controller
//                                 name="dateFin"
//                                 control={control}
//                                 render={({ field }) => (
//                                   <input
//                                     {...field}
//                                     type="date"
//                                     id="dateFin"
//                                     className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                                   />
//                                 )}
//                               />
//                               {errors.dateFin && <p className="mt-2 text-sm text-red-500">{errors.dateFin.message}</p>}
//                             </div>
//                           </div>
//                           <div>
//                             <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
//                               {t("institutPartage.methodePaiement")}
//                             </label>
//                             <Controller
//                               name="paymentMethod"
//                               control={control}
//                               render={({ field }) => (
//                                 <select
//                                   {...field}
//                                   id="paymentMethod"
//                                   className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
//                                 >
//                                   <option value="">{t("institutPartage.selectionnezMethodePaiement")}</option>
//                                   <option value="paypal">{t("institutPartage.paypal")}</option>
//                                   <option value="stripe">{t("institutPartage.stripe")}</option>
//                                 </select>
//                               )}
//                             />
//                             {errors.paymentMethod && <p className="mt-2 text-sm text-red-500">{errors.paymentMethod.message}</p>}
//                           </div>
//                           <div className="flex justify-end">
//                             <button
//                               type="submit"
//                               disabled={isSubmitting}
//                               className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blueLogo hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                             >
//                               {loadingPayment ? (
//                                 <>
//                                   <Loader2 className="animate-spin mr-2 h-4 w-4" />
//                                   {t("institutPartage.traitement")}
//                                 </>
//                               ) : (
//                                 t("institutPartage.validerFormulaire")
//                               )}
//                             </button>
//                           </div>
//                         </form>
//                         {isFormValid && (
//                           <div className="mt-8 pt-6 border-t border-gray-200">
//                             <h5 className="text-lg font-semibold mb-4">{t("institutPartage.procederPaiement")}</h5>
//                             <div className="mb-4 p-4 bg-blue-50 rounded-lg">
//                               <p className="text-lg font-semibold">
//                                 {t("institutPartage.montant")}: ${paymentAmount}
//                               </p>
//                             </div>
//                             {selectedPaymentMethod === "paypal" && (
//                               <PayPalButtons
//                                 createOrder={(data, actions) => {
//                                   return actions.order.create({
//                                     purchase_units: [
//                                       {
//                                         amount: {
//                                           value: paymentAmount.toString(),
//                                           currency_code: "USD",
//                                         },
//                                       },
//                                     ],
//                                   });
//                                 }}
//                                 onApprove={async (data, actions) => {
//                                   return actions.order.capture().then((orderData) => {
//                                     handlePayment("paypal", orderData);
//                                   });
//                                 }}
//                                 onError={(err) => {
//                                   console.error("PayPal Error", err);
//                                   toast.error(t("demandeur.paymentErrorToast"), {
//                                     position: "top-right",
//                                     duration: 2000,
//                                   });
//                                 }}
//                                 onCancel={() => {
//                                   toast.error(t("institut.abonnement.paymentFailed"));
//                                 }}
//                               />
//                             )}
//                             {selectedPaymentMethod === "stripe" && (
//                               <>
//                                 {clientSecretSettings.loading ? (
//                                   <div className="text-center">
//                                     <Spin size="large" tip={t("common.loading")} />
//                                   </div>
//                                 ) : (
//                                   <Elements
//                                     stripe={stripePromise}
//                                     options={{
//                                       clientSecret: clientSecretSettings.clientSecret,
//                                       appearance: { theme: "stripe" },
//                                     }}
//                                   >
//                                     <CheckoutForm
//                                       onPaymentSuccess={(paymentIntent) => handlePayment("stripe", paymentIntent)}
//                                       amount={paymentAmount}
//                                       institut={institut}
//                                       clientSecretSettings={clientSecretSettings}
//                                       data={{
//                                         nomComplet: getValues("nomComplet"),
//                                         paymentMethod: getValues("paymentMethod"),
//                                         dateDebut: getValues("dateDebut"),
//                                         dateFin: getValues("dateFin"),
//                                       }}
//                                     />
//                                   </Elements>
//                                 )}
//                               </>
//                             )}
//                           </div>
//                         )}
//                         {paymentStatus === "success" && (
//                           <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md">{t("institutPartage.paiementReussi")}</div>
//                         )}
//                         {paymentStatus === "failed" && (
//                           <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">{t("institutPartage.paiementEchoue")}</div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </section>
//           </div>
//         </Elements>
//       </PayPalScriptProvider>
//     );
//   }

//   const getResponsiveColumns = () => {
//     const baseColumns = [
//       {
//         title: t("institutPartage.requester"),
//         dataIndex: "demandeur",
//         key: "demandeur",
//         render: (_, record) =>
//           record.demandeur ? (
//             <Link to={`/institut/demandeur/${record.demandeur.id}/details`}>
//               <Tag color="blue">{record.demandeur.name}</Tag>
//             </Link>
//           ) : (
//             <span>N/A</span>
//           ),
//         sorter: (a, b) => a.demandeur?.name.localeCompare(b.demandeur?.name),
//       },
//       {
//         title: t("demandePartage.periode"),
//         dataIndex: "periode",
//         key: "periode",
//         render: (_, record) => (
//           <Tag color="blue">
//             {translatePeriode(record.periode)} - {record.year}
//           </Tag>
//         ),
//         sorter: (a, b) => a.periode.localeCompare(b.periode),
//       },
//       {
//         title: t("institutPartage.code"),
//         dataIndex: "code",
//         key: "code",
//         render: (_, record) => (
//           <Tag color="blue">
//             <CopyableFieldSimple value={record.code} />
//           </Tag>
//         ),
//         sorter: (a, b) => a.code.localeCompare(b.code),
//       },
//       {
//         title: t("institutPartage.request_date"),
//         dataIndex: "dateDemande",
//         key: "dateDemande",
//         render: (date) => new Date(date).toLocaleDateString(),
//         sorter: (a, b) => new Date(a.dateDemande) - new Date(b.dateDemande),
//         responsive: ["md"],
//       },
//       {
//         title: t("institutPartage.documents"),
//         dataIndex: "documentPartages",
//         key: "documentPartages",
//         render: (docs, record) => (
//           <Link to={`/institut/demande/${record.id}/documents`}>
//             <Tag color="blue">{docs.length} document(s)</Tag>
//           </Link>
//         ),
//         responsive: ["md"],
//       },
//       {
//         title: t("institutPartage.actions"),
//         key: "actions",
//         render: (_, record) => (
//           <Space size="small" wrap>
//             <Link to={`/institut/partages/${record.id}/details`}>
//               <Button icon={<EyeOutlined />} className="ant-btn-primary" type="default" size={windowWidth < 768 ? "small" : "middle"}>
//                 {windowWidth >= 576 ? t("institutPartage.details") : ""}
//               </Button>
//             </Link>
//             <Popover
//               content={
//                 <div style={{ maxWidth: "400px" }}>
//                   <Space direction="vertical">
//                     <div>
//                       <strong>{t("institutPartage.requester")}:</strong>
//                       <p>{record.demandeur.name}</p>
//                       <p>
//                         {record.demandeur.type} - {record.demandeur.paysResidence}
//                       </p>
//                       <p>
//                         {t("institutPartage.email")}: {record.demandeur.email}
//                       </p>
//                       <p>
//                         {t("institutPartage.phone")}: {record.demandeur.phone}
//                       </p>
//                     </div>
//                     {record.documentPartages.length > 0 && (
//                       <div>
//                         <strong>{t("institutPartage.documents")}:</strong>
//                         {record.documentPartages.map((doc, index) => (
//                           <div key={index} style={{ marginTop: "8px" }}>
//                             <p>
//                               {doc.intitule} - {doc.typeDocument}
//                             </p>
//                             <p>
//                               {t("institutPartage.dna_code")} : {doc.codeAdn}
//                             </p>
//                             <Tag color={doc.statut === "ACCEPTED" ? "success" : "processing"}>
//                               {t(`institutPartage.status.${doc.statut.toLowerCase()}`)}
//                             </Tag>
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </Space>
//                 </div>
//               }
//               title={t("institutPartage.request_details")}
//               trigger="click"
//               placement="right"
//             >
//               <Button icon={<InfoCircleOutlined />} className="ant-btn-primary" size={windowWidth < 768 ? "small" : "middle"} />
//             </Popover>
//           </Space>
//         ),
//       },
//     ];
//     return baseColumns;
//   };

//   const columns = getResponsiveColumns();
//   const tableContainerStyle = {
//     overflowX: "auto",
//     width: "100%",
//     maxWidth: "100%",
//   };

//   return (
//     <PayPalScriptProvider options={getPayPalConfig()}>
//       <Elements stripe={stripePromise}>
//         <div style={{ background: "#f0f2f5", minHeight: "100vh" }}>
//           <InstitutBreadcrumb title={t("institutMenu.applications")} SubTitle={institut?.name} />
//           <section className="py-6">
//             <div className="container max-w-6xl mx-auto px-4">
//               <div className="bg-white rounded-xl shadow-xl overflow-hidden">
//                 <div className="bg-green-50 border-l-4 border-green-400 p-4 m-6 rounded-r-lg">
//                   <div className="flex items-center">
//                     <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
//                     <p className="text-green-800 font-medium">{t("institutPartage.active_subscription")}</p>
//                   </div>
//                 </div>
//                 <div className="flex border-b border-gray-200">
//                   <button className="flex items-center py-4 px-6 font-medium transition-colors duration-200 text-blueLogo">
//                     <FileText className="w-5 h-5 mr-2" />
//                     {t("institutPartage.assigned_requests_list")}
//                   </button>
//                 </div>
//                 <div className="p-6">
//                   <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px" }}>
//                     <Card>
//                       <div
//                         style={{
//                           marginBottom: 16,
//                           display: "flex",
//                           justifyContent: "space-between",
//                           flexWrap: "wrap",
//                           gap: "10px",
//                         }}
//                       >
//                         <Input
//                           placeholder={t("institutPartage.search_placeholder")}
//                           prefix={<SearchOutlined />}
//                           value={searchText}
//                           onChange={(e) => setSearchText(e.target.value)}
//                           style={{ width: "100%", maxWidth: 300 }}
//                         />
//                         <Space wrap>
//                           <Select
//                             placeholder={t("demandePartage.select_periode")}
//                             style={{ width: 120 }}
//                             allowClear
//                             onChange={handlePeriodeFilter}
//                             value={filterPeriode}
//                           >
//                             {uniquePeriodes.map((periode) => (
//                               <Select.Option key={periode} value={periode}>
//                                 {translatePeriode(periode)}
//                               </Select.Option>
//                             ))}
//                           </Select>
//                           <Select
//                             placeholder={t("demandePartage.select_year")}
//                             style={{ width: 120 }}
//                             allowClear
//                             onChange={handleYearFilter}
//                             value={filterYear}
//                           >
//                             {uniqueYears.map((year) => (
//                               <Select.Option key={year} value={year}>
//                                 {year}
//                               </Select.Option>
//                             ))}
//                           </Select>
//                           <Button onClick={resetFilters} className="ant-btn-primary" type="default">
//                             {t("common.reset_filters")}
//                           </Button>
//                         </Space>
//                       </div>
//                       <div style={tableContainerStyle}>
//                         <Table
//                           columns={columns}
//                           dataSource={getFilteredData()}
//                           rowKey="id"
//                           loading={loading}
//                           pagination={{
//                             defaultPageSize: 5,
//                             showSizeChanger: true,
//                             showTotal: (total) => `${t("institutPartage.total")} ${total} ${t("institutPartage.requests")}`,
//                           }}
//                           scroll={{ x: "max-content" }}
//                           className="responsive-table"
//                         />
//                       </div>
//                     </Card>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </section>
//         </div>
//       </Elements>
//     </PayPalScriptProvider>
//   );
// };

// export default InstitutPartage;

"use client"

import { useState, useEffect, useContext, useMemo } from "react"
import { useAuthContext } from "../../../context/useAuthContext"
import { useTranslation } from "react-i18next"
import { getDemandePartageInstitut } from "../../../services/partageService"
import { message, Form, Input, Button, Table, Spin, Tag, Select, Modal, Dropdown, Avatar } from "antd"
import {
  SearchOutlined,
  EyeOutlined,
  InfoCircleOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  MoreOutlined,
  DownloadOutlined,
  UploadOutlined,
} from "@ant-design/icons"
import { Link } from "react-router-dom"
import InstitutBreadcrumb from "@/components/InstitutBreadcrumb"
import { AlertCircle, CheckCircle, CreditCard, FileText, Loader2 } from "lucide-react"
import { CopyableFieldSimple } from "@/utils/CopyableField"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { toast } from "sonner"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { getPayPalConfig, getPublishableKey, createPaymentIntentInstitut } from "../../../services/paymentService"
import { getAbonnementsByInstitutActif, createAbonnement } from "../../../services/abonnementService"
import CheckoutForm from "../components/CheckoutForm"
import { AppContext } from "@/AppContext"

// Schema de validation pour le formulaire d'abonnement
const subscriptionSchema = yup.object({
  nomComplet: yup.string().required("Le nom complet est requis"),
  paymentMethod: yup.string().required("La méthode de paiement est requise"),
  dateDebut: yup.date().required("La date de début est requise"),
  dateFin: yup.date().required("La date de fin est requise"),
})

const InstitutPartage = () => {
  const { institut } = useAuthContext()
  const [loading, setLoading] = useState(true)
  const [demandes, setDemandes] = useState([])
  const [searchText, setSearchText] = useState("")
  const [form] = Form.useForm()
  const { t } = useTranslation()
  const [filterPeriode, setFilterPeriode] = useState(null)
  const [filterYear, setFilterYear] = useState(null)
  const [uniquePeriodes, setUniquePeriodes] = useState([])
  const [uniqueYears, setUniqueYears] = useState([])
  const [activeSubscription, setActiveSubscription] = useState(null)
  const [stripePromise, setStripePromise] = useState(null)
  const [clientSecret, setClientSecret] = useState("")
  const [paymentStatus, setPaymentStatus] = useState(null)
  const [clientSecretSettings, setClientSecretSettings] = useState({
    clientSecret: "",
    loading: true,
    payment_intent_id: "",
  })
  const { urlApi, prixDemandeur, prixInstitut, prixUnivercity } = useContext(AppContext)
  const [paymentAmount] = useState(institut?.type === "Université" ? prixUnivercity : prixInstitut)
  const [subscriptionLoading, setSubscriptionLoading] = useState(true)
  const [isFormValid, setIsFormValid] = useState(false)
  const [loadingPayment, setLoadingPayment] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    getValues,
  } = useForm({
    resolver: yupResolver(subscriptionSchema),
    defaultValues: {
      nomComplet: institut ? institut.name : "",
      paymentMethod: "",
      dateDebut: new Date().toISOString().split("T")[0],
      dateFin: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0],
    },
  })

  const SUBSCRIPTION_CHECK_INTERVAL = 60000
  const [checkSubscriptionInterval, setCheckSubscriptionInterval] = useState(null)
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    initializeComponent()
    const interval = setInterval(() => {
      checkSubscriptionStatus()
    }, SUBSCRIPTION_CHECK_INTERVAL)

    setCheckSubscriptionInterval(interval)
    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [institut.id])

  const checkSubscriptionStatus = async () => {
    try {
      const subscriptionData = await getAbonnementsByInstitutActif(institut.id)
      if ((subscriptionData && !activeSubscription) || (!subscriptionData && activeSubscription)) {
        setActiveSubscription(subscriptionData)
        if (!subscriptionData && activeSubscription) {
          toast.warning(t("institutPartage.subscription_expired"))
        }
        if (subscriptionData && !activeSubscription) {
          toast.success(t("institutPartage.subscription_activated"))
        }
      }
    } catch (error) {
      console.error(t("institutPartage.error_checking_subscription"), error)
    }
  }

  useEffect(() => {
    scrollTo(0, 0)
  }, [])

  const initializeComponent = async () => {
    try {
      setSubscriptionLoading(true)
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
      }
      await fetchDemandes()
    } catch (error) {
      console.error(t("institutPartage.error_initialization"), error)
      message.error(t("institutPartage.error_initialization"))
    } finally {
      setSubscriptionLoading(false)
    }
  }

  const fetchDemandes = async () => {
    try {
      setLoading(true)
      const data = await getDemandePartageInstitut(institut.id)
      setDemandes(data)
      extractUniqueFilters(data)
    } catch (err) {
      console.error(t("institutPartage.error_fetching_requests"), err)
      message.error(t("institutPartage.error_fetching_requests"))
    } finally {
      setLoading(false)
    }
  }

  const extractUniqueFilters = (data) => {
    const periodes = [...new Set(data.map((item) => item.periode))].sort()
    const years = [...new Set(data.map((item) => item.year))].sort((a, b) => b - a)
    setUniquePeriodes(periodes)
    setUniqueYears(years)
  }

  const handlePeriodeFilter = (periode) => {
    setFilterPeriode(periode)
  }

  const handleYearFilter = (year) => {
    setFilterYear(year)
  }

  const resetFilters = () => {
    setFilterPeriode(null)
    setFilterYear(null)
  }

  const getFilteredData = () => {
    return demandes.filter((item) => {
      const matchesSearch =
        item.code.toLowerCase().includes(searchText.toLowerCase()) ||
        item.demandeur.name.toLowerCase().includes(searchText.toLowerCase())
      const matchesPeriode = filterPeriode ? item.periode === filterPeriode : true
      const matchesYear = filterYear ? item.year === filterYear : true
      return matchesSearch && matchesPeriode && matchesYear
    })
  }

  const translatePeriode = (periode) => {
    switch (periode) {
      case "Printemps":
        return t("demandePartage.periode_1")
      case "Été":
        return t("demandePartage.periode_2")
      case "Automne":
        return t("demandePartage.periode_3")
      case "Hiver":
        return t("demandePartage.periode_4")
      case "Autre":
        return t("demandePartage.periode_5")
      default:
        return periode
    }
  }

  const onSubmitSubscription = async (data) => {
    setIsFormValid(true)
    if (data.paymentMethod === "stripe") {
      try {
        const response = await createPaymentIntentInstitut(institut.id, paymentAmount)
        setClientSecret(response.client_secret)
        setClientSecretSettings({
          clientSecret: response.client_secret,
          loading: false,
          payment_intent_id: response.payment_intent_id,
        })
      } catch (error) {
        console.error(t("institutPartage.error_payment_preparation"), error)
        toast.error(t("institutPartage.error_payment_preparation"))
      }
    }
  }

  const onPaymentSuccess = async () => {
    toast.success(t("institutPartage.payment_success"))
    setPaymentStatus("success")
    setIsFormValid(false)
    initializeComponent()
  }

  const handlePayment = async (paymentMethod, paymentData) => {
    const formData = getValues()
    let paymentResult
    setLoadingPayment(true)
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
          currency: paymentData.purchase_units[0].amount.currency_code,
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
      dateDebut: getValues("dateDebut"),
      dateFin: getValues("dateFin"),
      institut_id: institut?.id,
      montant: paymentAmount,
      amount: paymentAmount,
      paymentMethod: "PayPal",
      statut: "actif",
      paymentInfo: paymentResult.paymentInfo,
      typePaiement: paymentMethod === "paypal" ? "PayPal" : "Stripe",
      clientSecret: paymentResult.paymentInfo.id,
      currency: paymentResult.paymentInfo.amount.currency_code ?? "USD",
    }
    try {
      if (paymentResult.success) {
        setPaymentStatus("success")
        try {
          const resultatPaiement = await createAbonnement(submitData)
          if (resultatPaiement) {
            toast.success(t("institutPartage.subscription_effective"))
            setPaymentStatus("success")
            setIsFormValid(false)
            initializeComponent()
          } else {
            toast.error(t("institutPartage.error_payment_confirmation"))
          }
          setLoadingPayment(false)
        } catch (error) {
          console.error(t("institutPartage.error_creating_subscription"), error)
          toast.error(t("institutPartage.error_payment_confirmation"))
          setLoadingPayment(false)
        }
      } else {
        setPaymentStatus("failed")
        toast.error(t("institut.abonnement.paymentFailed"))
      }
      setLoadingPayment(false)
    } catch (error) {
      console.error("Error creating abonnement:", error)
      toast.error(t("paymentFailed"))
      setLoadingPayment(false)
    }
  }

  const selectedPaymentMethod = watch("paymentMethod")

  const statistics = useMemo(() => {
    const total = demandes.length
    const accepted = demandes.filter((d) => d.documentPartages.some((doc) => doc.statut === "ACCEPTED")).length
    const pending = demandes.filter((d) => d.documentPartages.some((doc) => doc.statut === "PENDING")).length
    const thisMonth = demandes.filter((d) => {
      const demandeDate = new Date(d.dateDemande)
      const now = new Date()
      return demandeDate.getMonth() === now.getMonth() && demandeDate.getFullYear() === now.getFullYear()
    }).length

    return { total, accepted, pending, thisMonth }
  }, [demandes])

  if (subscriptionLoading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", color: "#1890ff", alignItems: "center", height: "400px" }}
      >
        <Spin fullscreen size="large" />
      </div>
    )
  }

  if (!activeSubscription && paymentStatus !== "success") {
    return (
      <PayPalScriptProvider options={getPayPalConfig()}>
        <Elements stripe={stripePromise}>
          <div style={{ background: "#f0f2f5", minHeight: "100vh" }}>
            <InstitutBreadcrumb title={t("institutMenu.applications")} SubTitle={institut?.name} />
            <section className="py-6">
              <div className="container max-w-4xl mx-auto px-4">
                <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                  <div className="bg-gradient-to-r from-blueLogo to-blue-600 px-8 py-6">
                    <div className="flex items-center space-x-4">
                      <div className="bg-white bg-opacity-20 p-3 rounded-full">
                        <CreditCard className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">{t("institutPartage.abonnementRequis")}</h2>
                        <p className="text-blue-100 mt-1">{t("institutPartage.souscrivezAbonnement")}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6 rounded-r-lg">
                      <div className="flex items-center">
                        <AlertCircle className="h-5 w-5 text-amber-400 mr-3" />
                        <div>
                          <p className="text-amber-800 font-medium">{t("institutPartage.accesLimite")}</p>
                          <p className="text-amber-700 text-sm mt-1">{t("institutPartage.accesLimiteDescription")}</p>
                        </div>
                      </div>
                    </div>
                    <div className="max-w-3xl mx-auto">
                      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-800">
                              {t("institutPartage.abonnementPremium")}
                            </h4>
                            <p className="text-gray-600 mt-1">{t("institutPartage.accesIllimite")}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-blueLogo">${paymentAmount}</p>
                            <p className="text-gray-500 text-sm">par an</p>
                          </div>
                        </div>
                        <form onSubmit={handleSubmit(onSubmitSubscription)} className="space-y-6">
                          <div>
                            <label htmlFor="nomComplet" className="block text-sm font-medium text-gray-700">
                              {t("institutPartage.nomComplet")}
                            </label>
                            <Controller
                              name="nomComplet"
                              control={control}
                              render={({ field }) => (
                                <input
                                  {...field}
                                  type="text"
                                  id="nomComplet"
                                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                              )}
                            />
                            {errors.nomComplet && (
                              <p className="mt-2 text-sm text-red-500">{errors.nomComplet.message}</p>
                            )}
                          </div>
                          <div className="w-full flex gap-6">
                            <div className="flex-1">
                              <label htmlFor="dateDebut" className="block text-sm font-medium text-gray-700">
                                {t("institutPartage.dateDebut")}
                              </label>
                              <Controller
                                name="dateDebut"
                                control={control}
                                render={({ field }) => (
                                  <input
                                    {...field}
                                    type="date"
                                    id="dateDebut"
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                  />
                                )}
                              />
                              {errors.dateDebut && (
                                <p className="mt-2 text-sm text-red-500">{errors.dateDebut.message}</p>
                              )}
                            </div>
                            <div className="flex-1">
                              <label htmlFor="dateFin" className="block text-sm font-medium text-gray-700">
                                {t("institutPartage.dateFin")}
                              </label>
                              <Controller
                                name="dateFin"
                                control={control}
                                render={({ field }) => (
                                  <input
                                    {...field}
                                    type="date"
                                    id="dateFin"
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                  />
                                )}
                              />
                              {errors.dateFin && <p className="mt-2 text-sm text-red-500">{errors.dateFin.message}</p>}
                            </div>
                          </div>
                          <div>
                            <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
                              {t("institutPartage.methodePaiement")}
                            </label>
                            <Controller
                              name="paymentMethod"
                              control={control}
                              render={({ field }) => (
                                <select
                                  {...field}
                                  id="paymentMethod"
                                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                >
                                  <option value="">{t("institutPartage.selectionnezMethodePaiement")}</option>
                                  <option value="paypal">{t("institutPartage.paypal")}</option>
                                  <option value="stripe">{t("institutPartage.stripe")}</option>
                                </select>
                              )}
                            />
                            {errors.paymentMethod && (
                              <p className="mt-2 text-sm text-red-500">{errors.paymentMethod.message}</p>
                            )}
                          </div>
                          <div className="flex justify-end">
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blueLogo hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              {loadingPayment ? (
                                <>
                                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                                  {t("institutPartage.traitement")}
                                </>
                              ) : (
                                t("institutPartage.validerFormulaire")
                              )}
                            </button>
                          </div>
                        </form>
                        {isFormValid && (
                          <div className="mt-8 pt-6 border-t border-gray-200">
                            <h5 className="text-lg font-semibold mb-4">{t("institutPartage.procederPaiement")}</h5>
                            <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                              <p className="text-lg font-semibold">
                                {t("institutPartage.montant")}: ${paymentAmount}
                              </p>
                            </div>
                            {selectedPaymentMethod === "paypal" && (
                              <PayPalButtons
                                createOrder={(data, actions) => {
                                  return actions.order.create({
                                    purchase_units: [
                                      {
                                        amount: {
                                          value: paymentAmount.toString(),
                                          currency_code: "USD",
                                        },
                                      },
                                    ],
                                  })
                                }}
                                onApprove={async (data, actions) => {
                                  return actions.order.capture().then((orderData) => {
                                    handlePayment("paypal", orderData)
                                  })
                                }}
                                onError={(err) => {
                                  console.error("PayPal Error", err)
                                  toast.error(t("demandeur.paymentErrorToast"), {
                                    position: "top-right",
                                    duration: 2000,
                                  })
                                }}
                                onCancel={() => {
                                  toast.error(t("institut.abonnement.paymentFailed"))
                                }}
                              />
                            )}
                            {selectedPaymentMethod === "stripe" && (
                              <>
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
                                      onPaymentSuccess={(paymentIntent) => handlePayment("stripe", paymentIntent)}
                                      amount={paymentAmount}
                                      institut={institut}
                                      clientSecretSettings={clientSecretSettings}
                                      data={{
                                        nomComplet: getValues("nomComplet"),
                                        paymentMethod: getValues("paymentMethod"),
                                        dateDebut: getValues("dateDebut"),
                                        dateFin: getValues("dateFin"),
                                      }}
                                    />
                                  </Elements>
                                )}
                              </>
                            )}
                          </div>
                        )}
                        {paymentStatus === "success" && (
                          <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md">
                            {t("institutPartage.paiementReussi")}
                          </div>
                        )}
                        {paymentStatus === "failed" && (
                          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
                            {t("institutPartage.paiementEchoue")}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </Elements>
      </PayPalScriptProvider>
    )
  }

  const getResponsiveColumns = () => {
    const baseColumns = [
      {
        title: t("institutPartage.applican"),
        dataIndex: "demandeur",
        key: "demandeur",
        render: (_, record) =>
          record.demandeur ? (
            <div className="flex items-center space-x-2">
              <Avatar size="small" style={{ backgroundColor: "#1890ff" }}>
                {record.demandeur.name.charAt(0).toUpperCase()}
              </Avatar>
              <Link to={`/institut/demandeur/${record.demandeur.id}/details`}>
                <Tag color="blue" className="cursor-pointer hover:bg-blue-100">
                  {record.demandeur.name}
                </Tag>
              </Link>
            </div>
          ) : (
              <span className="text-gray-400">N/A</span>
          ),
        sorter: (a, b) => a.demandeur?.name.localeCompare(b.demandeur?.name),
      },
      {
        title: t("demandePartage.periode"),
        dataIndex: "periode",
        key: "periode",
        render: (_, record) => (
          <div className="flex flex-col space-y-1">
            <Tag color="geekblue" className="text-center">
              {translatePeriode(record.periode)}
            </Tag>
            <Tag color="cyan" className="text-center">
              {record.year}
            </Tag>
          </div>
        ),
        sorter: (a, b) => a.periode.localeCompare(b.periode),
      },
      {
        title: t("institutPartage.code"),
        dataIndex: "code",
        key: "code",
        render: (_, record) => (
          <Tag color="purple" className="font-mono">
            <CopyableFieldSimple value={record.code} />
          </Tag>
        ),
        sorter: (a, b) => a.code.localeCompare(b.code),
      },
      {
        title: t("institutPartage.request_date"),
        dataIndex: "dateDemande",
        key: "dateDemande",
        render: (date) => (
          <div className="text-sm">
            <div className="font-medium">{new Date(date).toLocaleDateString()}</div>
          </div>
        ),
        sorter: (a, b) => new Date(a.dateDemande) - new Date(b.dateDemande),
        responsive: ["md"],
      },
      {
        title: t("institutPartage.documents"),
        dataIndex: "documentPartages",
        key: "documentPartages",
        render: (docs, record) => (
          <Link to={`/institut/demande/${record.id}/documents`}>
            <div className="flex items-center space-x-2">
              <FileTextOutlined className="text-blue-500" />
              <Tag color="blue" className="cursor-pointer hover:bg-blue-100">
                {docs.length} document{docs.length > 1 ? "s" : ""}
              </Tag>
            </div>
          </Link>
        ),
        responsive: ["md"],
      },
      {
        title: t("institutPartage.actions"),
        key: "actions",
        render: (_, record) => (
          <Dropdown
            menu={{
              items: [
                {
                  key: "details",
                  icon: <EyeOutlined />,
                  label: <Link to={`/institut/partages/${record.id}/details`}>{t("institutPartage.details")}</Link>,
                },
                {
                  key: "info",
                  icon: <InfoCircleOutlined />,
                  label: t("institutPartage.info"),
                  onClick: () => showInfo(record),
                },
              ],
            }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <Button
              type="primary"
              icon={<MoreOutlined />}
              size={windowWidth < 768 ? "small" : "middle"}
              className="bg-blue-500 hover:bg-blue-600"
            >
              {windowWidth >= 576 ? t("institutPartage.actions") : ""}
            </Button>
          </Dropdown>
        ),
      },
    ]
    return baseColumns
  }

  const handleDownload = (record) => {
    message.success(`${t("institutPartage.downloading")} ${record.code}`)
  }

  const handleUpload = (record) => {
    message.info(`${t("institutPartage.uploading")} ${record.code}`)
  }

  const showInfo = (record) => {
    Modal.info({
      title: t("institutPartage.request_details"),
      width: 600,
      content: (
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">{t("institutPartage.applican")}</h4>
            <div className="space-y-1">
              <p>
                <strong>{t("institutPartage.name")}:</strong> {record.demandeur.name}
              </p>

              <p>
                <strong>{t("institutPartage.email")}:</strong> {record.demandeur.email}
              </p>
              <p>
                <strong>{t("institutPartage.phone")}:</strong> {record.demandeur.phone}
              </p>
            </div>
          </div>
          {record.documentPartages.length > 0 && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">{t("institutPartage.documents")}</h4>
              <div className="space-y-2">
                {record.documentPartages.map((doc, index) => (
                  <div key={index} className="border-l-4 border-blue-400 pl-3">
                    <p className="font-medium">
                      {doc.intitule} - {doc.typeDocument}
                    </p>
                    <p className="text-sm text-gray-600">
                      {t("institutPartage.dna_code")}: {doc.codeAdn}
                    </p>
                    <Tag color={doc.statut === "ACCEPTED" ? "success" : "processing"}>
                      {t(`institutPartage.status.${doc.statut.toLowerCase()}`)}
                    </Tag>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ),
    })
  }

  const columns = getResponsiveColumns()
  const tableContainerStyle = {
    overflowX: "auto",
    width: "100%",
    maxWidth: "100%",
  }

  return (
    <PayPalScriptProvider options={getPayPalConfig()}>
      <Elements stripe={stripePromise}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <InstitutBreadcrumb title={t("institutMenu.applications")} SubTitle={institut?.name} />

          <section className="py-6">
            <div className="container max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{t("institutPartage.total_requests")}</p>
                      <p className="text-3xl font-bold text-blue-600">{statistics.total}</p>
                    </div>
                    <FileTextOutlined className="text-4xl text-blue-500" />
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{t("institutPartage.this_month")}</p>
                      <p className="text-3xl font-bold text-purple-600">{statistics.thisMonth}</p>
                    </div>
                    <CalendarOutlined className="text-4xl text-purple-500" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-green-400 to-blue-500 p-6">
                  <div className="flex items-center text-white">
                    <CheckCircle className="h-6 w-6 mr-3" />
                    <h2 className="text-xl font-semibold">{t("institutPartage.active_subscription")}</h2>
                  </div>
                </div>

                <div className="border-b border-gray-200 bg-gray-50">
                  <div className="flex items-center py-4 px-6">
                    <FileText className="w-5 h-5 mr-3 text-blue-600" />
                    <h3 className="font-semibold text-gray-800">{t("institutPartage.assigned_requests_list")}</h3>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-6 space-y-4 lg:space-y-0 lg:flex lg:items-center lg:justify-between">
                    <div className="flex-1 max-w-md">
                      <Input
                        placeholder={t("institutPartage.search_placeholder")}
                        prefix={<SearchOutlined className="text-gray-400" />}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        size="large"
                      />
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Select
                        placeholder={t("demandePartage.select_periode")}
                        className="min-w-[140px]"
                        size="large"
                        allowClear
                        onChange={handlePeriodeFilter}
                        value={filterPeriode}
                      >
                        {uniquePeriodes.map((periode) => (
                          <Select.Option key={periode} value={periode}>
                            {translatePeriode(periode)}
                          </Select.Option>
                        ))}
                      </Select>

                      <Select
                        placeholder={t("demandePartage.select_year")}
                        className="min-w-[120px]"
                        size="large"
                        allowClear
                        onChange={handleYearFilter}
                        value={filterYear}
                      >
                        {uniqueYears.map((year) => (
                          <Select.Option key={year} value={year}>
                            {year}
                          </Select.Option>
                        ))}
                      </Select>

                      <Button
                        onClick={resetFilters}
                        size="large"
                        className="bg-gray-100 hover:bg-gray-200 border-gray-300"
                      >
                        {t("common.reset_filters")}
                      </Button>
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-lg border border-gray-200">
                    <Table
                      columns={columns}
                      dataSource={getFilteredData()}
                      rowKey="id"
                      loading={loading}
                      pagination={{
                        defaultPageSize: 10,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total, range) =>
                          `${range[0]}-${range[1]} ${t("institutPartage.of")} ${total} ${t("institutPartage.requests")}`,
                        pageSizeOptions: ["5", "10", "20", "50"],
                      }}
                      scroll={{ x: "max-content" }}
                      className="responsive-table"
                      rowClassName="hover:bg-gray-50 transition-colors duration-200"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Elements>
    </PayPalScriptProvider>
  )
}

export default InstitutPartage
