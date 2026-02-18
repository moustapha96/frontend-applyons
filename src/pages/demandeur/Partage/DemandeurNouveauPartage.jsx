"use client"

import { useState, useEffect, useContext } from "react"
import { useAuthContext } from "../../../context/useAuthContext"
import { useTranslation } from "react-i18next"
import { createDemandePartage } from "../../../services/partageService"
import DemandeurBreadcrumb from "../../../components/DemandeurBreadcrumb"
import { getInstitutsSimple } from "@/services/institutService"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { getPayPalConfig, getPublishableKey, createPaymentIntentDemandeur } from "../../../services/paymentService"
import { toast } from "sonner"
import CheckoutForm from "../components/CheckoutForm"
import { useNavigate } from "react-router-dom"
import { AppContext } from "@/AppContext"
import countries from "@/assets/countries.json"
import { getDepartementFilierer } from "@/services/deprtamentFiliereService"
import { getInstitutTypeTraducteur } from "@/services/institutTraducteurService"

const DemandeurNouveauPartage = () => {
    const { demandeur } = useAuthContext()
    const { prixDemandeur } = useContext(AppContext)
    const [loading, setLoading] = useState(true)
    const [instituts, setInstituts] = useState([])
    const { t } = useTranslation()
    const [activeTab, setActiveTab] = useState(0)
    const navigate = useNavigate()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [isSaving, setIsSaving] = useState(false)
    const [lastSaved, setLastSaved] = useState(null)
    const [saveTimeout, setSaveTimeout] = useState(null)
    const [departementFilieres, setDepartementFilieres] = useState({})
    const [institutTraducteurs, setInstitutTraducteurs] = useState([])

    useEffect(() => {
        const fetchInstitutTraducteurs = async () => {
            try {
                const data = await getInstitutTypeTraducteur();
                console.log(data)
                setInstitutTraducteurs(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des instituts traducteurs:", error);
            }
        };
        fetchInstitutTraducteurs();
    }, []);


    // Form data state
    const [formData, setFormData] = useState({
        // Personal Information
        passport: "",
        permanentAddress: "",

        // English Proficiency
        isEnglishFirstLanguage: "",
        englishProficiencyTests: [],
        testScores: "",

        // Academic Background
        secondarySchoolName: "",
        countryOfSchool: "",
        graduationDate: "",
        gradingScale: "",
        gpa: "",
        examsTaken: [],

        // Program of Study
        intendedMajor: "",
        // preferredStartTerm: "",

        // Activities
        extracurricularActivities: "",
        honorsOrAwards: "",

        // Family Information
        parentGuardianName: "",
        parentOccupation: "",
        educationLevel: "",

        // Financial Information
        willApplyForFinancialAid: "",
        hasExternalSponsorship: "",

        // Visa Information
        visaType: "",
        hasPreviouslyStudiedInUS: "",

        // Essays
        personalStatement: "",
        optionalEssay: "",

        selectedInstituts: [], // <-- Ajoutez cette ligne
        customInstituts: [],
        institutTraducteurId: "",
        // Submission
        applicationRound: "",
        howDidYouHearAboutUs: "",
        // Payment
        paymentMethod: "",
    })


    // Payment related states
    const [isFormValid, setIsFormValid] = useState(false)
    const [paymentStatus, setPaymentStatus] = useState(null)
    const [paymentAmount, setPaymentAmount] = useState(prixDemandeur)
    const [stripePromise, setStripePromise] = useState(null)
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("")
    const [clientSecretSettings, setClientSecretSettings] = useState({
        clientSecret: "",
        loading: true,
        payment_intent_id: "",
    })

    const [years, setYears] = useState([])
    const tabs = [
        {
            id: 0,
            title: t("application.tabs.personalInfo"),
            icon: "👤",
            shortTitle: t("application.tabs.personalInfoShort"),
        },
        {
            id: 1,
            title: t("application.tabs.englishProficiency"),
            icon: "🗣️",
            shortTitle: t("application.tabs.englishProficiencyShort"),
        },
        {
            id: 2,
            title: t("application.tabs.academicBackground"),
            icon: "🎓",
            shortTitle: t("application.tabs.academicBackgroundShort"),
        },
        {
            id: 3,
            title: t("application.tabs.programStudy"),
            icon: "📚",
            shortTitle: t("application.tabs.programStudyShort"),
        },
        { id: 4, title: t("application.tabs.activities"), icon: "🏆", shortTitle: t("application.tabs.activitiesShort") },
        {
            id: 5,
            title: t("application.tabs.familyInfo"),
            icon: "👨‍👩‍👧‍👦",
            shortTitle: t("application.tabs.familyInfoShort"),
        },
        {
            id: 6,
            title: t("application.tabs.financialInfo"),
            icon: "💰",
            shortTitle: t("application.tabs.financialInfoShort"),
        },
        { id: 7, title: t("application.tabs.visaInfo"), icon: "📄", shortTitle: t("application.tabs.visaInfoShort") },
        { id: 8, title: t("application.tabs.essays"), icon: "✍️", shortTitle: t("application.tabs.essaysShort") },
        {
            id: 9,
            title: t("application.tabs.institutSelection"),
            icon: "🏫",
            shortTitle: t("application.tabs.institutSelectionShort"),
        },
        {
            id: 10,
            title: t("application.tabs.paymentSubmission"),
            icon: "💳",
            shortTitle: t("application.tabs.paymentSubmissionShort"),
        },
    ]

    // Responsive classes
    const inputClasses =
        "w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
    const labelClasses = "block font-bold text-gray-700 mb-2 text-sm sm:text-base"
    const titleClasses = "text-xl sm:text-2xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-4 sm:mb-6"

    useEffect(() => {
        const currentYear = new Date().getFullYear()
        const years = Array.from({ length: 10 }, (_, i) => currentYear + i)
        setYears(years)
    }, [])

    useEffect(() => {
        fetchInstituts()
    }, [demandeur.id])

    useEffect(() => {
        fetchDepartementInstitut()
    }, [])



    const fetchDepartementInstitut = async () => {
        try {
            const response = await getDepartementFilierer()
            setDepartementFilieres(response)
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }
    // Initialize Stripe
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

    // Create payment intent
    useEffect(() => {
        console.log(demandeur)
        async function createPaymentIntentState() {
            try {
                const response = await createPaymentIntentDemandeur(demandeur.id, paymentAmount)
                setClientSecretSettings({
                    clientSecret: response.client_secret,
                    loading: false,
                    payment_intent_id: response.payment_intent_id,
                })
            } catch (error) {
                console.log("error in createPaymentIntent", error)
            }
        }
        if (demandeur?.id) {
            createPaymentIntentState()
        }
    }, [demandeur, paymentAmount])

    const saveFormToLocalStorage = (data) => {
        try {
            setIsSaving(true)
            const formDataToSave = {
                ...data,
                activeTab,
                timestamp: new Date().toISOString(),
            }
            localStorage.setItem("demandeur_form_data", JSON.stringify(formDataToSave))
            setLastSaved(new Date())
            setTimeout(() => setIsSaving(false), 500)
            console.log("Form data saved to localStorage")
        } catch (error) {
            console.error("Error saving form data:", error)
            setIsSaving(false)
        }
    }

    const loadFormFromLocalStorage = () => {
        try {
            const savedData = localStorage.getItem("demandeur_form_data")
            if (savedData) {
                const parsedData = JSON.parse(savedData)
                const { activeTab: savedTab, timestamp, ...formFields } = parsedData

                setFormData(formFields)
                setActiveTab(savedTab || 0)
                setLastSaved(new Date(timestamp))

                toast.success(t("application.formRestored"), {
                    position: "top-right",
                    duration: 3000,
                })
                console.log("Form data restored from localStorage")
                return true
            }
        } catch (error) {
            console.error("Error loading form data:", error)
        }
        return false
    }

    const clearFormFromLocalStorage = () => {
        try {
            localStorage.removeItem("demandeur_form_data")
            console.log("Form data cleared from localStorage")
        } catch (error) {
            console.error("Error clearing form data:", error)
        }
    }

    const handleManualSave = () => {
        saveFormToLocalStorage(formData)
        console.log(formData)
        toast.success(t("application.formSaved"), {
            position: "top-right",
            duration: 2000,
        })
    }

    useEffect(() => {
        loadFormFromLocalStorage()
    }, [])

    useEffect(() => {
        if (saveTimeout) {
            clearTimeout(saveTimeout)
        }
        const timeout = setTimeout(() => {
            saveFormToLocalStorage(formData)
        }, 1000) // Sauvegarde après 1 seconde d'inactivité
        setSaveTimeout(timeout)
        return () => {
            if (timeout) {
                clearTimeout(timeout)
            }
        }
    }, [formData, activeTab])


    const fetchInstituts = async () => {
        setLoading(true)
        setInstituts([])
        try {
            const data = await getInstitutsSimple()
            console.log(data)
            setInstituts(data)
        } catch (error) {
            toast.error(t("demandeurPartage.error_fetching_institutes"))
        } finally {
            setLoading(false)
        }
    }

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))

        // Update selectedPaymentMethod when paymentMethod changes
        if (field === "paymentMethod") {
            setSelectedPaymentMethod(value)
        }
    }

    const handleArrayChange = (field, value, checked) => {
        setFormData((prev) => ({
            ...prev,
            [field]: checked ? [...prev[field], value] : prev[field].filter((item) => item !== value),
        }))
    }

    // Generate period options with current and next year
    const generatePeriodOptions = () => {
        const currentYear = new Date().getFullYear()
        const nextYear = currentYear + 1
        const periods = [
            { key: "spring", label: t("application.options.periods.spring") },
            { key: "summer", label: t("application.options.periods.summer") },
            { key: "fall", label: t("application.options.periods.fall") },
            { key: "winter", label: t("application.options.periods.winter") },
        ]

        const options = []
        if (formData.periode && formData.year) {
            options.push({
                value: `${formData.periode} ${formData.year}`,
                label: `${formData.periode} ${formData.year}`,
            })
        } else {
            // Add current year periods
            periods.forEach((period) => {
                options.push({
                    value: `${period.label} ${currentYear}`,
                    label: `${period.label} ${currentYear}`,
                })
            })

            // Add next year periods
            periods.forEach((period) => {
                options.push({
                    value: `${period.label} ${nextYear}`,
                    label: `${period.label} ${nextYear}`,
                })
            })
        }

        return options
    }

    const handleInstitutSelection = (institutId, checked) => {
        const institut = instituts.find((i) => i.id === institutId)
        if (checked) {
            setFormData((prev) => ({
                ...prev,
                selectedInstituts: [
                    ...prev.selectedInstituts,
                    {
                        id: institut.id,
                        name: institut.name,
                        email: institut.email,
                    },
                ],
            }))
        } else {
            setFormData((prev) => ({
                ...prev,
                selectedInstituts: prev.selectedInstituts.filter((i) => i.id !== institutId),
            }))
        }
    }

    const handleCustomInstitutAdd = (name, email) => {
        if (name.trim() && email.trim()) {
            const newInstitut = {
                id: `custom_${Date.now()}`,
                name: name.trim(),
                email: email.trim(),
                isCustom: true,
            }
            setFormData((prev) => ({
                ...prev,
                customInstituts: [...prev.customInstituts, newInstitut],
            }))
            return true
        }
        return false
    }

    const handleCustomInstitutRemove = (id) => {
        setFormData((prev) => ({
            ...prev,
            customInstituts: prev.customInstituts.filter((i) => i.id !== id),
        }))
    }

    const validateCurrentTab = () => {
        const requiredFields = {
            0: ["permanentAddress"],
            1: ["isEnglishFirstLanguage"],
            2: ["secondarySchoolName", "countryOfSchool"],
            3: ["periode", "year", "institut_id", "intendedMajor"],
            4: [],
            5: ["parentGuardianName", "educationLevel", "parentOccupation"],
            6: ["willApplyForFinancialAid", "hasExternalSponsorship"],
            7: ["visaType", "hasPreviouslyStudiedInUS"],
            8: ["personalStatement"],
            9: ["applicationRound"],
            10: ["paymentMethod"],
        }

        const required = requiredFields[activeTab] || []

        // Custom validation for institut selection
        if (activeTab === 9) {
            return formData.selectedInstituts.length > 0 || formData.customInstituts.length > 0
        }

        return required.every((field) => formData[field] && formData[field] !== "")
    }

    const handleSaveAndContinue = () => {
        if (validateCurrentTab()) {
            // Sauvegarder d'abord
            handleManualSave()
            // Puis naviguer vers l'onglet suivant
            if (activeTab < tabs.length - 1) {
                setActiveTab(activeTab + 1)
            }
        } else {
            toast.error(t("application.validation.fillRequiredFields"))
        }
    }

    const handlePrevious = () => {
        setActiveTab((prevTab) => Math.max(prevTab - 1, 0))

    }

    const handleSubmit = async () => {
        try {
            // Validate all required fields
            const allRequiredFields = [
                "periode",
                "year",
                "institut_id",
                "isEnglishFirstLanguage",
                "secondarySchoolName",
                "countryOfSchool",
                "intendedMajor",
                // "preferredStartTerm",
                "parentGuardianName",
                "educationLevel",
                "willApplyForFinancialAid",
                "hasExternalSponsorship",
                "visaType",
                "hasPreviouslyStudiedInUS",
                "personalStatement",
                "parentOccupation",
                "paymentMethod",
                // "studyLevel",
                // "fieldOfStudy",
            ]

            const isValid = allRequiredFields.every((field) => formData[field] && formData[field] !== "")

            if (isValid) {
                setIsFormValid(true)
                toast.success(t("application.validation.formValidated"))
            } else {
                toast.error(t("application.validation.fillRequiredFields"))
            }
        } catch (error) {
            toast.error(t("application.validation.fillRequiredFields"))
        }
    }


    const handlePayment = async (paymentMethod, paymentData = null) => {
        let paymentResult;
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
                },
            };
        } else if (paymentMethod === "stripe") {
            paymentResult = {
                success: true,
                paymentInfo: paymentData,
            };
        }

        if (paymentResult.success) {
            setPaymentStatus("success");
            setIsSubmitting(true); // Active le loader

            const submitData = {
                ...formData,
                demandeur_id: demandeur?.id,
                paymentInfo: paymentResult.paymentInfo,
                amount: paymentAmount,
                clientSecret: paymentResult.paymentInfo.id,
                typePaiement: paymentMethod === "paypal" ? "PayPal" : "Stripe",
                currency: "USD",
            };
            // console.log(submitData)
            try {
                await createDemandePartage(submitData);
                clearFormFromLocalStorage();
                toast.success(t("application.payment.requestCreatedSuccess"), {
                    position: "top-right",
                    duration: 2000,
                });

                // Réinitialisation du formulaire
                setFormData({
                    periode: "",
                    year: "",
                    // institut_id: "",
                    // selectedInstituts: [],
                    // customInstituts: [],
                    // institutTraducteurId: "",
                    citizenship: "",
                    passport: "",
                    isEnglishFirstLanguage: "",
                    englishProficiencyTests: [],
                    testScores: "",
                    secondarySchoolName: "",
                    countryOfSchool: "",
                    graduationDate: "",
                    gradingScale: "",
                    gpa: "",
                    examsTaken: [],
                    intendedMajor: "",
                    extracurricularActivities: "",
                    honorsOrAwards: "",
                    parentGuardianName: "",
                    educationLevel: "",
                    willApplyForFinancialAid: "",
                    hasExternalSponsorship: "",
                    visaType: "",
                    hasPreviouslyStudiedInUS: "",
                    personalStatement: "",
                    // optionalEssay: "",
                    applicationRound: "",
                    // howDidYouHearAboutUs: "",
                    // paymentMethod: "",
                    parentOccupation: "",
                    preferredStartPeriod: "",
                    permanentAddress: "",
                });

                setIsFormValid(false);
                setPaymentStatus(null);
                navigate("/demandeur/partages");
            } catch (error) {
                console.log(error)
                console.log("Erreur d'enregistrement", error);
                toast.error(t("application.payment.paymentError"), {
                    position: "top-right",
                    duration: 2000,
                });
            } finally {
                setIsSubmitting(false); // Désactive le loader
            }
        } else {
            setPaymentStatus("failed");
            toast.error(t("application.payment.paymentFailed"), {
                position: "top-right",
                duration: 2000,
            });
        }
    };


    const CustomInstitutForm = ({ onAdd, translations: t }) => {
        const [name, setName] = useState("")
        const [email, setEmail] = useState("")

        const handleSubmit = (e) => {
            e.preventDefault()
            if (onAdd(name, email)) {
                setName("")
                setEmail("")
                toast.success(t("application.customInstitutAdded"))
            } else {
                toast.error(t("application.fillAllFields"))
            }
        }

        return (
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t("application.institutName")} *</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder={t("application.institutNamePlaceholder")}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t("application.institutEmail")} *</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder={t("application.institutEmailPlaceholder")}
                            required
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full sm:w-auto bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                    {t("application.addInstitut")}
                </button>
            </form>
        )
    }

    const renderTabContent = () => {


        switch (activeTab) {
            case 0: // Personal Info
                return (
                    <div className="space-y-4 sm:space-y-6">
                        <h2 className={titleClasses}>{t("application.personalInformation")}</h2>

                        <div>
                            <label className={labelClasses}>{t("application.fields.passportNumber")}</label>
                            <input
                                type="text"
                                value={formData.passport}
                                pattern="[A-Za-z0-9<]{1,20}"
                                minLength="6"
                                maxLength="20"
                                onChange={(e) => handleInputChange("passport", e.target.value)}
                                className={inputClasses}
                                placeholder={t("application.fields.passportPlaceholder")}
                            />
                        </div>

                        <div>
                            <label className={labelClasses}>{t("application.fields.permanentAddress")} *</label>
                            <textarea
                                value={formData.permanentAddress}
                                onChange={(e) => handleInputChange("permanentAddress", e.target.value)}
                                className={inputClasses}
                                rows={3}
                                placeholder={t("application.fields.permanentAddressPlaceholder")}
                            />
                        </div>
                    </div>
                )

            case 1: // English Proficiency (ancien case 2)
                return (
                    <div className="space-y-4 sm:space-y-6">
                        <h2 className={titleClasses}>{t("application.englishProficiency")}</h2>

                        <div>
                            <label className={labelClasses}>{t("application.fields.isEnglishFirstLanguage")} *</label>
                            <select
                                value={formData.isEnglishFirstLanguage}
                                onChange={(e) => handleInputChange("isEnglishFirstLanguage", e.target.value)}
                                className={inputClasses}
                            >
                                <option value="">{t("application.options.select")}</option>
                                <option value="true">{t("application.options.yesNo.yes")}</option>
                                <option value="false">{t("application.options.yesNo.no")}</option>
                            </select>
                        </div>

                        <div>
                            <label className={labelClasses}>{t("application.fields.englishProficiencyTests")}</label>
                            <div className="space-y-2">
                                {[
                                    { key: "toefl", label: t("application.options.englishTests.toefl"), value: "TOEFL" },
                                    { key: "ielts", label: t("application.options.englishTests.ielts"), value: "IELTS" },
                                    {
                                        key: "duolingo",
                                        label: t("application.options.englishTests.duolingo"),
                                        value: "Duolingo English Test",
                                    },
                                    { key: "pte", label: t("application.options.englishTests.pte"), value: "PTE Academic" },
                                    { key: "none", label: t("application.options.englishTests.none"), value: "None" },
                                ].map((test) => (
                                    <label key={test.key} className="flex items-center text-sm sm:text-base">
                                        <input
                                            type="checkbox"
                                            checked={formData.englishProficiencyTests.includes(test.value)}
                                            onChange={(e) => handleArrayChange("englishProficiencyTests", test.value, e.target.checked)}
                                            className="mr-2"
                                        />
                                        {test.label}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className={labelClasses}>{t("application.fields.testScores")}</label>
                            <input
                                type="text"
                                value={formData.testScores}
                                onChange={(e) => handleInputChange("testScores", e.target.value)}
                                className={inputClasses}
                                placeholder={t("application.fields.testScoresPlaceholder")}
                            />
                        </div>
                    </div>
                )

            case 2: // Academic Background (ancien case 3)
                return (
                    <div className="space-y-4 sm:space-y-6">
                        <h2 className={titleClasses}>{t("application.academicBackground")}</h2>

                        <div>
                            <label className={labelClasses}>{t("application.fields.secondarySchoolName")} *</label>
                            <input
                                type="text"
                                value={formData.secondarySchoolName}
                                onChange={(e) => handleInputChange("secondarySchoolName", e.target.value)}
                                className={inputClasses}
                                placeholder={t("application.fields.secondarySchoolPlaceholder")}
                            />
                        </div>

                        <div>
                            <label className={labelClasses}>{t("application.fields.countryOfSchool")} *</label>
                            <select
                                value={formData.countryOfSchool}
                                onChange={(e) => handleInputChange("countryOfSchool", e.target.value)}
                                className={inputClasses}
                            >
                                <option value="">{t("application.fields.countryOfSchoolPlaceholder")}</option>
                                {countries.map((country, index) => (
                                    <option key={index} value={country.name}>
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className={labelClasses}>{t("application.fields.graduationDate")}</label>
                            <input
                                type="date"
                                value={formData.graduationDate}
                                onChange={(e) => handleInputChange("graduationDate", e.target.value)}
                                className={inputClasses}
                            />
                        </div>

                        <div>
                            <label className={labelClasses}>{t("application.fields.gradingScale")}</label>
                            <input
                                type="text"
                                value={formData.gradingScale}
                                onChange={(e) => handleInputChange("gradingScale", e.target.value)}
                                className={inputClasses}
                                placeholder={t("application.fields.gradingScalePlaceholder")}
                            />
                        </div>

                        <div>
                            <label className={labelClasses}>{t("application.fields.gpaOrAverage")}</label>
                            <input
                                type="text"
                                value={formData.gpa}
                                onChange={(e) => handleInputChange("gpa", e.target.value)}
                                className={inputClasses}
                                placeholder={t("application.fields.gpaPlaceholder")}
                            />
                        </div>

                        <div>
                            <label className={labelClasses}>{t("application.fields.examsTaken")}</label>
                            <div className="space-y-2">
                                {[
                                    { key: "alevels", label: t("application.options.exams.alevels"), value: "A-Levels" },
                                    { key: "ib", label: t("application.options.exams.ib"), value: "IB Diploma" },
                                    { key: "waec", label: t("application.options.exams.waec"), value: "WAEC/NECO" },
                                    { key: "baccalaureat", label: t("application.options.exams.baccalaureat"), value: "French Baccalauréat" },
                                    { key: "national", label: t("application.options.exams.national"), value: "National Exams" },
                                ].map((exam) => (
                                    <label key={exam.key} className="flex items-center text-sm sm:text-base">

                                        <input
                                            type="checkbox"
                                            checked={formData.examsTaken.includes(exam.value)}
                                            onChange={(e) => handleArrayChange("examsTaken", exam.value, e.target.checked)}
                                            className="mr-2"
                                        />
                                        {exam.label}
                                    </label>
                                ))}
                            </div>
                        </div>

                    </div>
                )

            case 3: // Preferred Start Period
                return (
                    <div className="space-y-4 sm:space-y-6">
                        {/* <h2 className={titleClasses}>{t("application.preferredStartPeriod")}</h2> */}
                        <h2 className={titleClasses}>{t("application.intendedProgramOfStudy")}</h2>

                        <div>
                            <label className={labelClasses}>{t("application.fields.academicYear")} *</label>
                            <select
                                value={formData.year}
                                onChange={(e) => handleInputChange("year", e.target.value)}
                                className={inputClasses}
                            >
                                <option value="">{t("application.fields.selectYear")}</option>
                                {years.map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className={labelClasses}>{t("application.fields.preferredStartPeriod")} *</label>

                            <select
                                value={formData.periode}
                                onChange={(e) => handleInputChange("periode", e.target.value)}
                                className={inputClasses}
                            >
                                <option value="">{t("application.fields.selectPeriod")}</option>
                                <option value="Printemps">{t("application.options.periods.spring")}</option>
                                <option value="Été">{t("application.options.periods.summer")}</option>
                                <option value="Automne">{t("application.options.periods.fall")}</option>
                                <option value="Hiver">{t("application.options.periods.winter")}</option>
                                <option value="Autre">{t("application.options.periods.other")}</option>
                            </select>
                        </div>

                        <div>
                            <label className={labelClasses}>{t("application.fields.selectInstitut")} *</label>
                            <p className="text-gray-600 text-sm sm:text-base mb-4">{t("application.institutSelectionDescription")}</p>
                            <select
                                value={formData.institut_id}
                                onChange={(e) => handleInputChange("institut_id", e.target.value)}
                                className={inputClasses}
                            >
                                <option value="">{t("application.fields.selectInstitutPlaceholder")}</option>
                                {instituts
                                    .filter((institut) => institut.type !== "Traducteur")
                                    .map((institut) => (
                                        <option key={institut.id} value={institut.id}>
                                            {institut.name}
                                        </option>
                                ))}
                            </select>
                        </div>


                        <div>
                            <label className={labelClasses}>{t("application.fields.intendedMajor")} *</label>
                            <select
                                value={formData.intendedMajor}
                                onChange={(e) => handleInputChange("intendedMajor", e.target.value)}
                                className={inputClasses}
                            >
                                <option value="">{t("application.fields.intendedMajorPlaceholder")}</option>
                                {departementFilieres && departementFilieres.length > 0 && <>
                                    {departementFilieres.filter((filiere) => filiere.institut.id === Number(formData.institut_id)).map((domaine) => (
                                        <optgroup key={domaine.id} label={domaine.nom}>
                                            {domaine.filieres.map((specialisation) => (
                                                <option key={specialisation.id} value={specialisation.nom}>
                                                    {specialisation.nom}
                                                </option>
                                            ))}
                                        </optgroup>
                                    ))}
                                </>}
                            </select>
                        </div>


                    </div>
                )

            case 4: // Activities (ancien case 5)
                return (
                    <div className="space-y-4 sm:space-y-6">
                        <h2 className={titleClasses}>{t("application.activitiesAndAchievements")}</h2>

                        <div>
                            <label className={labelClasses}>{t("application.fields.extracurricularActivities")}</label>
                            <textarea
                                value={formData.extracurricularActivities}
                                onChange={(e) => handleInputChange("extracurricularActivities", e.target.value)}
                                rows={4}
                                className={inputClasses}
                                placeholder={t("application.fields.extracurricularPlaceholder")}
                            />
                        </div>

                        <div>
                            <label className={labelClasses}>{t("application.fields.honorsOrAwards")}</label>
                            <textarea
                                value={formData.honorsOrAwards}
                                onChange={(e) => handleInputChange("honorsOrAwards", e.target.value)}
                                rows={4}
                                className={inputClasses}
                                placeholder={t("application.fields.honorsPlaceholder")}
                            />
                        </div>
                    </div>
                )

            case 5: // Family Information (ancien case 6)
                return (
                    <div className="space-y-4 sm:space-y-6">
                        <h2 className={titleClasses}>{t("application.familyInformation")}</h2>

                        <div>
                            <label className={labelClasses}>{t("application.fields.parentGuardianName")} *</label>
                            <input
                                type="text"
                                value={formData.parentGuardianName}
                                onChange={(e) => handleInputChange("parentGuardianName", e.target.value)}
                                className={inputClasses}
                                placeholder={t("application.fields.parentGuardianPlaceholder")}
                            />
                        </div>
                        <div>
                            <label className={labelClasses}>{t("application.fields.parentOccupation")} *</label>
                            <input
                                type="text"
                                value={formData.parentOccupation}
                                onChange={(e) => handleInputChange("parentOccupation", e.target.value)}
                                className={inputClasses}
                                placeholder={t("application.fields.parentOccupationPlaceholder")}
                            />
                        </div>


                        <div>
                            <label className={labelClasses}>{t("application.fields.educationLevel")} *</label>
                            <select
                                value={formData.educationLevel}
                                onChange={(e) => handleInputChange("educationLevel", e.target.value)}
                                className={inputClasses}
                            >
                                <option value="">{t("application.fields.selectEducationLevel")}</option>
                                <option value="No formal education">{t("application.options.educationLevels.noFormal")}</option>
                                <option value="Secondary">{t("application.options.educationLevels.secondary")}</option>
                                <option value="Bachelor's">{t("application.options.educationLevels.bachelors")}</option>
                                <option value="Graduate">{t("application.options.educationLevels.graduate")}</option>
                            </select>
                        </div>
                    </div>
                )

            case 6: // Financial Information (ancien case 7)
                return (
                    <div className="space-y-4 sm:space-y-6">
                        <h2 className={titleClasses}>{t("application.financialInformation")}</h2>

                        <div>
                            <label className={labelClasses}>{t("application.fields.willApplyForFinancialAid")} *</label>
                            <select
                                value={formData.willApplyForFinancialAid}
                                onChange={(e) => handleInputChange("willApplyForFinancialAid", e.target.value)}
                                className={inputClasses}
                            >
                                <option value="">{t("application.options.select")}</option>
                                <option value="Yes">{t("application.options.yesNo.yes")}</option>
                                <option value="No">{t("application.options.yesNo.no")}</option>
                                <option value="Not sure">{t("application.options.yesNo.notSure")}</option>
                            </select>
                        </div>

                        <div>
                            <label className={labelClasses}>{t("application.fields.hasExternalSponsorship")} *</label>
                            <select
                                value={formData.hasExternalSponsorship}
                                onChange={(e) => handleInputChange("hasExternalSponsorship", e.target.value)}
                                className={inputClasses}
                            >
                                <option value="">{t("application.options.select")}</option>
                                <option value="Yes">{t("application.options.yesNo.yes")}</option>
                                <option value="No">{t("application.options.yesNo.no")}</option>
                            </select>
                        </div>
                    </div>
                )

            case 7: // Visa Information (ancien case 8)
                return (
                    <div className="space-y-4 sm:space-y-6">
                        <h2 className={titleClasses}>{t("application.visaInformation")}</h2>

                        <div>
                            <label className={labelClasses}>{t("application.fields.visaType")} *</label>
                            <select
                                value={formData.visaType}
                                onChange={(e) => handleInputChange("visaType", e.target.value)}
                                className={inputClasses}
                            >
                                <option value="">{t("application.fields.selectVisaType")}</option>
                                <option value="None">{t("application.options.visaTypes.none")}</option>
                                <option value="F-1 Student Visa">{t("application.options.visaTypes.f1")}</option>
                                <option value="J-1 Exchange">{t("application.options.visaTypes.j1")}</option>
                                <option value="Other">{t("application.options.visaTypes.other")}</option>
                            </select>
                        </div>

                        <div>
                            <label className={labelClasses}>{t("application.fields.hasPreviouslyStudiedInUS")} *</label>
                            <select
                                value={formData.hasPreviouslyStudiedInUS}
                                onChange={(e) => handleInputChange("hasPreviouslyStudiedInUS", e.target.value)}
                                className={inputClasses}
                            >
                                <option value="">{t("application.options.select")}</option>
                                <option value="Yes">{t("application.options.yesNo.yes")}</option>
                                <option value="No">{t("application.options.yesNo.no")}</option>
                            </select>
                        </div>
                    </div>
                )

            case 8: // Essays (ancien case 9)
                return (
                    <div className="space-y-4 sm:space-y-6">
                        <h2 className={titleClasses}>{t("application.essays")}</h2>

                        <div>
                            <label className={labelClasses}>{t("application.fields.personalStatement")} *</label>
                            <textarea
                                value={formData.personalStatement}
                                onChange={(e) => handleInputChange("personalStatement", e.target.value)}
                                rows={6}
                                className={inputClasses}
                                placeholder={t("application.fields.personalStatementPlaceholder")}
                            />
                        </div>

                        <div>
                            <label className={labelClasses}>{t("application.fields.optionalEssay")}</label>
                            <textarea
                                value={formData.optionalEssay}
                                onChange={(e) => handleInputChange("optionalEssay", e.target.value)}
                                rows={6}
                                className={inputClasses}
                                placeholder={t("application.fields.optionalEssayPlaceholder")}
                            />
                        </div>
                    </div>
                )


            case 9: // Institut Selection
                return (
                    <div className="space-y-4 sm:space-y-6">
                        <h2 className={titleClasses}>{t("application.tabs.institutSelection")}</h2>


                        <div className="mb-4">
                            <p className="text-sm text-gray-600 mb-4">{t("application.selectInstitutionsDescription")}</p>
                        </div>

                        <div>
                            <label className={labelClasses}>{t("application.fields.institut_traducteur")} </label>
                            <select
                                value={formData.institutTraducteurId}
                                onChange={(e) => handleInputChange("institutTraducteurId", e.target.value)}
                                className={inputClasses}
                            >
                                <option value="">{t("application.fields.selectInstitut")}</option>
                                {institutTraducteurs.map((institut) => (
                                    <option key={institut.id} value={institut.id}>
                                        {institut.name + " - " + institut.email}
                                    </option>
                                ))}
                            </select>
                        </div>


                        {/* Liste des instituts existants */}
                        <div className="grid gap-4">

                            {instituts
                                .filter((institut) => institut.id !== Number(formData.institut_id) && institut.type !== "Traducteur")
                                .map((institut) => (
                                <div
                                    key={institut.id}
                                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                                >
                                    <label className="flex items-start space-x-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                                // checked={formData.selectedInstituts?.some((i) => i.id === institut.id)}
                                                checked={formData.selectedInstituts?.some((i) => i.id === institut.id) || false}
                                            onChange={(e) => handleInstitutSelection(institut.id, e.target.checked)}
                                            className="mt-1 h-4 w-4 text-blueLogo focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <div className="flex-1">
                                            <div className="font-semibold text-gray-900">{institut.name}</div>
                                            <div className="text-sm text-gray-600">{institut.email}</div>
                                            <div className="text-xs text-gray-500 mt-1">
                                                    {institut.pays_residence}
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            ))}
                        </div>

                        {/* Section pour ajouter un institut personnalisé */}
                        <div className="mt-8 p-4 border-2 border-dashed border-gray-300 rounded-lg">
                            <h3 className="font-semibold text-gray-900 mb-4">{t("application.addCustomInstitut")}</h3>
                            <p className="text-sm text-gray-600 mb-4">{t("application.addCustomInstitutDescription")}</p>

                            <CustomInstitutForm onAdd={handleCustomInstitutAdd} translations={t} />
                        </div>

                        {/* Affichage des instituts personnalisés ajoutés */}
                        {formData.customInstituts.length > 0 && (
                            <div className="mt-6">
                                <h3 className="font-semibold text-gray-900 mb-3">{t("application.customInstituts")}</h3>
                                <div className="space-y-2">
                                    {formData.customInstituts.map((institut) => (
                                        <div
                                            key={institut.id}
                                            className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
                                        >
                                            <div>
                                                <div className="font-medium text-gray-900">{institut.name}</div>
                                                <div className="text-sm text-gray-600">{institut.email}</div>
                                                <div className="text-xs text-yellow-600">{t("application.customInstitutNote")}</div>
                                            </div>
                                            <button
                                                onClick={() => handleCustomInstitutRemove(institut.id)}
                                                className="text-red-600 hover:text-red-800 text-sm"
                                            >
                                                {t("application.remove")}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Résumé des sélections */}


                        {(formData.selectedInstituts.length > 0 || formData.customInstituts.length > 0) && (
                            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                                <h3 className="font-semibold text-blue-900 mb-2">
                                    {t("application.selectedInstitutions")} (
                                    {formData.selectedInstituts.length + formData.customInstituts.length})
                                </h3>
                                <div className="space-y-2">
                                    {formData.selectedInstituts.map((institut) => (
                                        <div key={institut.id} className="flex justify-between items-center text-sm">
                                            <span className="font-medium">{institut.name}</span>
                                            <span className="text-gray-600">{institut.email}</span>
                                        </div>
                                    ))}
                                    {formData.customInstituts.map((institut) => (
                                        <div key={institut.id} className="flex justify-between items-center text-sm">
                                            <span className="font-medium">
                                                {institut.name} <span className="text-yellow-600">({t("application.custom")})</span>
                                            </span>
                                            <span className="text-gray-600">{institut.email}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-3 text-sm text-blueClaire">
                                    {t("application.totalApplicationFee")}: ${paymentAmount}
                                </div>
                            </div>
                        )}


                    </div>
                )

            case 10: // Payment & Submission (ancien case 11)
                return (
                    <div className="space-y-4 sm:space-y-6">
                        <h2 className={titleClasses}>{t("application.paymentSubmission")}</h2>

                        {/* Résumé des instituts sélectionnés */}
                        {(formData.selectedInstituts.length > 0 || formData.customInstituts.length > 0) && (
                            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                                <h3 className="font-semibold text-gray-900 mb-3">{t("application.applicationSummary")}</h3>
                                <div className="space-y-2">
                                    {formData.selectedInstituts
                                        .filter((institut) => institut.type !== "Traducteur")
                                        .map((institut, index) => (
                                        <div
                                            key={institut.id}
                                            className="flex justify-between items-center text-sm border-b border-gray-200 pb-2"
                                        >
                                            <div>
                                                <span className="font-medium">{institut.name}</span>
                                                <div className="text-gray-600">{institut.email}</div>
                                            </div>
                                        </div>
                                    ))}
                                    {formData.customInstituts.map((institut, index) => (
                                        <div
                                            key={institut.id}
                                            className="flex justify-between items-center text-sm border-b border-gray-200 pb-2"
                                        >
                                            <div>
                                                <span className="font-medium">
                                                    {institut.name} <span className="text-yellow-600">({t("application.custom")})</span>
                                                </span>
                                                <div className="text-gray-600">{institut.email}</div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="flex justify-between items-center font-bold text-lg pt-2">
                                        <span>{t("application.totalAmount")}</span>
                                        <span className="text-green-600">${paymentAmount}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div>
                            <label className={labelClasses}>{t("application.fields.applicationRound")}</label>
                            <select
                                value={formData.applicationRound}
                                onChange={(e) => handleInputChange("applicationRound", e.target.value)}
                                className={inputClasses}
                            >
                                <option value="">{t("application.fields.selectApplicationRound")}</option>
                                <option value="Regular Decision">{t("application.options.applicationRounds.regularDecision")}</option>
                                <option value="Early Action">{t("application.options.applicationRounds.earlyAction")}</option>
                                <option value="Early Decision">{t("application.options.applicationRounds.earlyDecision")}</option>
                            </select>
                        </div>

                        <div>
                            <label className={labelClasses}>{t("application.fields.howDidYouHearAboutUs")}</label>
                            <input
                                type="text"
                                value={formData.howDidYouHearAboutUs}
                                onChange={(e) => handleInputChange("howDidYouHearAboutUs", e.target.value)}
                                className={inputClasses}
                                placeholder={t("application.fields.howDidYouHearPlaceholder")}
                            />
                        </div>

                        <div>
                            <label className={labelClasses}>{t("application.fields.paymentMethod")} *</label>
                            <select
                                value={formData.paymentMethod}
                                onChange={(e) => handleInputChange("paymentMethod", e.target.value)}
                                className={inputClasses}
                            >
                                <option value="">{t("application.fields.selectPaymentMethod")}</option>
                                <option value="paypal">{t("application.options.paymentMethods.paypal")}</option>
                                <option value="stripe">{t("application.options.paymentMethods.stripe")}</option>
                            </select>
                        </div>

                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                            <button
                                onClick={handleSubmit}
                                disabled={isFormValid}
                                className="w-full sm:w-auto bg-blueLogo text-white px-6 py-3 rounded-md hover:bg-blueClaire disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {isFormValid ? t("application.buttons.pleaseWait") : t("application.buttons.validateForm")}
                            </button>

                            {isFormValid && (
                                <button
                                    onClick={() => {
                                        setIsFormValid(false)
                                        setPaymentStatus(null)
                                    }}
                                    className="w-full sm:w-auto bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700"
                                >
                                    {t("application.buttons.cancel")}
                                </button>
                            )}
                        </div>

                        
                        {isFormValid && (
                            <div className="mt-8 p-4 sm:p-6 bg-white border-2 border-blue-200 rounded-lg shadow-lg">
                                <h3 className="text-lg sm:text-xl font-bold mb-4">{t("application.payment.proceedToPayment")}</h3>
                                <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                                    <p className="text-base sm:text-lg font-semibold">
                                        {t("application.payment.paymentAmount")}: ${paymentAmount}
                                    </p>
                                </div>
                                {selectedPaymentMethod === "paypal" && (
                                    <PayPalButtons
                                        style={{ layout: "vertical" }}
                                        createOrder={(data, actions) => {
                                            return actions.order.create({
                                                purchase_units: [
                                                    {
                                                        amount: {
                                                            value: paymentAmount,
                                                            currency_code: "USD",
                                                        },
                                                    },
                                                ],
                                            });
                                        }}
                                        onApprove={async (data, actions) => {
                                            const order = await actions.order.capture();
                                            handlePayment("paypal", order);
                                            toast.success(t("application.payment.paymentCompleted"));
                                        }}
                                        onError={(err) => {
                                            console.error("PayPal Error", err);
                                            toast.error(t("application.payment.paymentFailed"), {
                                                position: "top-right",
                                                duration: 2000,
                                            });
                                        }}
                                    />
                                )}
                                {selectedPaymentMethod === "stripe" && (
                                    <>
                                        {clientSecretSettings.loading ? (
                                            <div className="text-center">
                                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blueLogo mx-auto"></div>
                                                <p className="mt-2">{t("application.loading")}</p>
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
                                                    institut=""
                                                    clientSecretSettings={clientSecretSettings}
                                                    data={formData}
                                                    demandeur={demandeur}
                                                    typePayment="partage"
                                                    onPaymentSuccess={(paymentIntent) => handlePayment("stripe", paymentIntent)}
                                                />
                                            </Elements>
                                        )}
                                    </>
                                )}
                            </div>
                        )}

                        {isSubmitting && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                                <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blueLogo mb-4"></div>
                                    <p className="text-lg font-semibold text-gray-800">{t("common.payment.processing")}</p>
                                    <p className="text-sm text-gray-600 mt-2">{t("common.payment.pleaseWait")}</p>
                                </div>
                            </div>
                        )}

                        {paymentStatus === "success" && !isSubmitting && (
                            <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md">
                                <p className="font-semibold">{t("common.payment.paymentSuccess")}</p>
                                <p>{t("common.payment.requestCreatedSuccess")}</p>
                            </div>
                        )}

                        {paymentStatus === "failed" && !isSubmitting && (
                            <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
                                <p className="font-semibold">{t("application.payment.paymentFailed")}</p>
                                <p>{t("application.payment.pleaseRetry")}</p>
                            </div>
                        )}

                    </div>
                )

            default:
                return null
        }
    }

    const reetForm = () => {
        setFormData({
            periode: "",
            year: "",
            institut_id: "",
            selectedInstituts: [],
            customInstituts: [],
            passport: "",
            isEnglishFirstLanguage: "",
            englishProficiencyTests: [],
            testScores: "",
            secondarySchoolName: "",
            countryOfSchool: "",
            graduationDate: "",
            gradingScale: "",
            gpa: "",
            examsTaken: [],
            intendedMajor: "",
            // preferredStartTerm: "",
            extracurricularActivities: "",
            honorsOrAwards: "",
            parentGuardianName: "",
            educationLevel: "",
            willApplyForFinancialAid: "",
            hasExternalSponsorship: "",
            visaType: "",
            hasPreviouslyStudiedInUS: "",
            personalStatement: "",
            optionalEssay: "",
            applicationRound: "",
            howDidYouHearAboutUs: "",
            paymentMethod: "",
            parentOccupation: "",
            // studyLevel: "",
            // fieldOfStudy: "",
            preferredStartPeriod: "",

            permanentAddress: "",
        })
        setIsFormValid(false)
        setPaymentStatus(null)
    }

    if (loading && instituts.length === 0) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-blueLogo"></div>
                <p className="ml-4 text-sm sm:text-lg">{t("application.loading")}</p>
            </div>
        )
    }


    return (
        <PayPalScriptProvider options={getPayPalConfig()}>
            <Elements stripe={stripePromise}>
                <div className="min-h-screen bg-gray-50">
                    <DemandeurBreadcrumb title={t("demandeurMenu.newApplicationTool")} SubTitle={demandeur?.name} />

                    <section className="py-4 sm:py-6">
                        <div className="container max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
                            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                                <div className="p-3 sm:p-6">
                                    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-4">
                                        <div className="text-center sm:text-left">
                                            <h1 className="text-2xl sm:text-3xl font-bold text-blueLogo mb-2">
                                                {t("application.title")}
                                            </h1>
                                            <div className="w-16 sm:w-24 h-1 bg-blueLogo mx-auto sm:mx-0 rounded-full"></div>
                                        </div>

                                        <div className="flex flex-col sm:flex-row items-center gap-4">


                                            {/* Indicateur de sauvegarde */}
                                            <div className="flex items-center gap-2 text-sm">
                                                {isSaving ? (
                                                    <div className="flex items-center gap-2 text-blue-600">
                                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                                                        <span>{t("application.saving")}</span>
                                                    </div>
                                                ) : lastSaved ? (
                                                    <div className="flex items-center gap-2 text-green-600">
                                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                        <span>
                                                            {t("application.lastSaved")}: {lastSaved.toLocaleTimeString()}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <div className="text-gray-500">
                                                        <span>{t("application.autoSaveEnabled")}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Responsive Tab Navigation */}
                                    <div className="mb-6 sm:mb-8">
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:flex lg:flex-wrap gap-1 sm:gap-2 mb-4">
                                            {tabs.map((tab) => (
                                                <button
                                                    key={tab.id}
                                                    onClick={() => setActiveTab(tab.id)}
                                                    className={`px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${activeTab === tab.id
                                                        ? "bg-blueLogo text-white"
                                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                        }`}
                                                >
                                                    <span className="mr-1 hidden sm:inline">{tab.icon}</span>
                                                    <span className="block sm:hidden truncate">{tab.shortTitle}</span>
                                                    <span className="hidden sm:block truncate">{tab.title}</span>
                                                </button>
                                            ))}
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-blueLogo h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${((activeTab + 1) / tabs.length) * 100}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-xs sm:text-sm text-gray-600 mt-2">
                                            {t("application.progress")}: {activeTab + 1}/{tabs.length}
                                        </p>
                                    </div>

                                    {/* Tab Content */}
                                    <div className="bg-white p-3 sm:p-6 rounded-lg shadow-sm border">{renderTabContent()}</div>

                                    {activeTab < 10 && (
                                        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6 sm:mt-8">
                                            <div className="flex flex-col sm:flex-row gap-2 order-2 sm:order-1">
                                                <button
                                                    onClick={handlePrevious}
                                                    disabled={activeTab === 0}
                                                    className="w-full sm:w-auto px-6 py-3 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed"
                                                >
                                                    {t("application.buttons.previous")}
                                                </button>

                                                <button
                                                    onClick={reetForm}
                                                    className="w-full sm:w-auto px-6 py-3 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors"
                                                >
                                                    {t("application.resetForm")}
                                                </button>
                                            </div>

                                            <button
                                                onClick={handleSaveAndContinue}
                                                className="w-full sm:w-auto px-6 py-3 bg-blueLogo text-white rounded-md hover:bg-rougeLogo order-1 sm:order-2"
                                            >
                                                {t("application.saveAndContinue")}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </Elements>
        </PayPalScriptProvider>
    )


}

export default DemandeurNouveauPartage


