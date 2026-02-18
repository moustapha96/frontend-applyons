"use client"

import { useTranslation } from "react-i18next"
import { PageMetaData, PasswordFormInput, SelectFormInput, TextFormInput } from "@/components"
import { Link, useNavigate } from "react-router-dom"
import { LoaderCircle } from "lucide-react"
import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { AppContext } from "@/AppContext"
import { toast } from "sonner"
import axios from "axios"

const demandeurSchema = yup.object({
    name: yup.string().required("Name is required"),
    sexe: yup.string().oneOf(['Masculin', 'Féminin'], 'Please select a valid gender').required('Gender is required'),
    email: yup.string().email("Please enter a valid email").required("Email is required"),
    phone: yup.string().required("Phone number is required"),
    adresse: yup.string().required("Address is required"),
    pays_residence: yup.string().required("Country is required"),
    intitule: yup.string().required('Title is required'),
    profession: yup.string().required('Profession is required'),
    lieu_naissance: yup.string().required('Place of birth is required'),
    date_naissance: yup.date().required('Date of birth is required'),
    password: yup.string().required("Password is required").min(8, "Password must contain at least 8 characters"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords do not match")
        .required("Password confirmation is required"),
})

const DemandeurSignup = () => {
    const { t } = useTranslation()
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const { urlApi } = useContext(AppContext);


    const { control, handleSubmit } = useForm({
        resolver: yupResolver(demandeurSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            adresse: "",
            sexe: "",
            pays_residence: "",
            intitule: "",
            profession: "",
            lieu_naissance: "",
            date_naissance: "",
            password: "",
            confirmPassword: ""
        }
    })

    const onSubmit = async (data) => {
        //console.log(data)
        setLoading(true)

        try {
            const response = await fetch(urlApi + "create-demandeur", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            //console.log(response)
            if (response.ok) {
                toast.success('Compte créé avec succès')
                navigate('/auth/sign-in')
            } else {
                const errorData = await response.json()
                toast.error(errorData.message || 'Erreur lors de la création du compte')
            }
        } catch (error) {
            console.error('Error during signup:', error)
            toast.error('Erreur de connexion')
        } finally {
            setLoading(false)
        }
    }



    return (
        <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-blue-50">
            <PageMetaData title={t("auth.signUp.title")} />

            <div className="w-full max-w-2xl space-y-6 bg-white p-8 sm:p-10 rounded-xl shadow-xl border border-gray-100">
                <div className="flex flex-col items-center space-y-4">
                    <img
                        src="/logo.png"
                        alt="Logo"
                        className="h-16 w-auto"
                    />
                    <div className="text-center space-y-2">
                        <h2 className="text-3xl font-bold text-gray-900">{t("auth.signUp.demandeurTitle")}</h2>
                        <p className="text-base text-gray-600">{t("auth.signUp.demandeurSubtitle")}</p>
                    </div>
                </div>
                <div className="mt-4 w-20 h-1 bg-blueLogo mx-auto rounded-full"></div>

                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-6">
                        <TextFormInput
                            label={t("auth.signUp.name")}
                            name="name"
                            labelClassName="block text-sm font-medium text-gray-700 mb-1"
                            className="w-full h-[32px] border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            fullWidth
                            control={control}
                            placeholder={t("auth.signUp.placeholders.name")}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TextFormInput
                            label={t("auth.signUp.email")}
                            name="email"
                            type="email"
                            labelClassName="block text-sm font-medium text-gray-700 mb-1"
                            className="w-full h-[32px] border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            fullWidth
                            control={control}
                            placeholder={t("auth.signUp.placeholders.email")}
                        />

                        <TextFormInput
                            label={t("auth.signUp.phone")}
                            name="phone"
                            labelClassName="block text-sm font-medium text-gray-700 mb-1"
                            className="w-full h-[32px] border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            fullWidth
                            control={control}
                            placeholder={t("auth.signUp.placeholders.phone")}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TextFormInput
                            label={t("auth.signUp.address")}
                            name="adresse"
                            labelClassName="block text-sm font-medium text-gray-700 mb-1"
                            className="w-full h-[32px] border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            fullWidth
                            control={control}
                            placeholder={t("auth.signUp.placeholders.address")}
                        />

                        <TextFormInput
                            label={t("auth.signUp.country")}
                            name="pays_residence"
                            labelClassName="block text-sm font-medium text-gray-700 mb-1"
                            className="w-full h-[32px] border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            fullWidth
                            control={control}
                            placeholder={t("auth.signUp.placeholders.country")}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TextFormInput
                            label={t("auth.signUp.titre")}
                            name="intitule"
                            labelClassName="block text-sm font-medium text-gray-700 mb-1"
                            className="w-full h-[32px] border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            fullWidth
                            control={control}
                            placeholder={t("auth.signUp.placeholders.titre")}
                        />

                        <TextFormInput
                            label={t("auth.signUp.profession")}
                            name="profession"
                            labelClassName="block text-sm font-medium text-gray-700 mb-1"
                            className="w-full h-[32px] border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            fullWidth
                            control={control}
                            placeholder={t("auth.signUp.placeholders.profession")}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TextFormInput
                            label={t("auth.signUp.birthPlace")}
                            name="lieu_naissance"
                            labelClassName="block text-sm font-medium text-gray-700 mb-1"
                            className="w-full h-[32px] border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            fullWidth
                            control={control}
                            placeholder={t("auth.signUp.placeholders.birthPlace")}
                        />

                        <TextFormInput
                            label={t("auth.signUp.birthDate")}
                            name="date_naissance"
                            type="date"
                            labelClassName="block text-sm font-medium text-gray-700 mb-1"
                            className="w-full h-[32px] border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            fullWidth
                            control={control}
                            placeholder={t("auth.signUp.placeholders.birthDate")}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <SelectFormInput
                            label={t("auth.signUp.gender")}
                            name="sexe"
                            labelClassName="block text-sm font-medium text-gray-700 mb-1"
                            className="w-full h-[32px] border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            fullWidth
                            control={control}
                            options={[
                                { value: "Masculin", label: t("auth.signUp.male") },
                                { value: "Féminin", label: t("auth.signUp.female") }
                            ]}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <PasswordFormInput
                            label={t("auth.signUp.password")}
                            name="password"
                            labelClassName="block text-sm font-medium text-gray-700 mb-1"
                            className="w-full h-[32px] border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            fullWidth
                            control={control}
                            placeholder={t("auth.signUp.placeholders.password")}
                        />

                        <PasswordFormInput
                            label={t("auth.signUp.confirmPassword")}
                            name="confirmPassword"
                            labelClassName="block text-sm font-medium text-gray-700 mb-1"
                            className="w-full h-[32px] border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            fullWidth
                            control={control}
                            placeholder={t("auth.signUp.placeholders.confirmPassword")}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blueLogo to-blueLogo text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all transform hover:scale-[1.02] font-medium text-lg shadow-md"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                {t("auth.signUp.loading")}
                                <LoaderCircle className="ml-2 h-5 w-5 animate-spin" />
                            </span>
                        ) : (
                            t("auth.signUp.title")
                        )}
                    </button>
                </form>
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-600">
                        {t("auth.signUp.alreadyAccount")}
                        <Link to="/auth/sign-in" className="ml-1 text-blueLogo hover:text-blue-800 font-medium transition-colors">
                            {t("auth.signIn.title")}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default DemandeurSignup
