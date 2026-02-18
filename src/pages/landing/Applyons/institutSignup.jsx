"use client"

import { useTranslation } from "react-i18next"
import { PageMetaData, PasswordFormInput, TextFormInput, SelectFormInput } from "@/components"
import { Link, useNavigate } from "react-router-dom"
import { LoaderCircle } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import { useContext } from "react";
import { AppContext } from "../../../AppContext";
import { toast } from "sonner"


const institutSchema = yup.object({
    name: yup.string().required("Please enter the institute name"),
    type: yup.string().required("Please select the institute type"),
    email: yup.string().email("Please enter a valid email").required("Email is required"),
    phone: yup.string().required("Phone number is required"),
    adresse: yup.string().required("Address is required"),
    pays_residence: yup.string().required("Country is required"),
    siteWeb: yup.string().url("Please enter a valid URL").nullable(),
    password: yup.string().required("Password is required").min(8, "Password must contain at least 8 characters"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords do not match")
        .required("Password confirmation is required"),
})

const InstitutSignup = () => {
    const { t } = useTranslation()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const { urlApi } = useContext(AppContext);

    const { control, handleSubmit } = useForm({
        resolver: yupResolver(institutSchema),
        defaultValues: {
            name: "",
            type: "",
            email: "",
            phone: "",
            adresse: "",
            pays_residence: "",
            siteWeb: "",
            password: "",
            confirmPassword: ""
        }
    })

    const onSubmit = async (data) => {
        setLoading(true)
        //console.log(data);
        try {
            setLoading(true);
            const response = await fetch(urlApi + 'create-institut', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                const errorData = await response.json();
                toast.error(errorData.message || 'Erreur lors de la création de l\'institut');
                setLoading(false);
                return;
            }
            toast.success("Institut créé avec succès !");
            toast.success("Merci de vérifier votre email pour activer votre compte");

            navigate('/auth/sign-in');
        } catch (error) {
            console.error('Erreur lors de la création de l\'institut:', error);
            setLoading(false);
            toast.error("Erreur lors de la création de l'institut");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <PageMetaData title={t("auth.signUp.title")} />

            <div className="w-full max-w-2xl space-y-6 bg-white p-8 sm:p-10 rounded-xl shadow-xl border border-gray-100">
                <div className="flex flex-col items-center space-y-4">
                    <img
                        src="/logo.png"
                        alt="Logo"
                        className="h-16 w-auto"
                    />
                    <div className="text-center space-y-2">
                        <h2 className="text-3xl font-bold text-gray-900">{t("auth.signUp.institutTitle")}</h2>
                        <p className="text-base text-gray-600">{t("auth.signUp.institutSubtitle")}</p>
                    </div>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid  gap-6">
                        <TextFormInput
                            label={t("auth.signUp.name")}
                            name="name"
                            labelClassName="block text-sm font-medium text-gray-700 mb-1"
                            className="w-full h-[32px] border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            fullWidth
                            control={control}
                            placeholder={t("auth.signUp.placeholders.institutName")}
                        />


                    </div>
                    <div className="grid  gap-6">

                        <SelectFormInput
                            label={t("auth.signUp.type")}
                            name="type"
                            labelClassName="block text-sm font-medium text-gray-700 mb-1"
                            className="w-full h-[32px] border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            fullWidth
                            control={control}
                            options={[
                                { value: "Université", label: t("auth.signUp.university") },
                                { value: "Collège", label: t("auth.signUp.college") },
                                { value: "Ambassade", label: t("auth.signUp.ambassade") },
                                { value: "Ecole", label: t("auth.signUp.school") },
                                { value: "Banque", label: t("auth.signUp.banque") },
                                { value: "Lycée", label: t("auth.signUp.lycee") },
                                { value: "other", label: t("auth.signUp.other") },
                            ]}
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
                        />

                        <TextFormInput
                            label={t("auth.signUp.country")}
                            name="pays_residence"
                            labelClassName="block text-sm font-medium text-gray-700 mb-1"
                            className="w-full h-[32px] border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            fullWidth
                            control={control}
                        />
                    </div>

                    <TextFormInput
                        label={t("auth.signUp.website")}
                        name="siteWeb"
                        labelClassName="block text-sm font-medium text-gray-700 mb-1"
                        className="w-full h-[32px] border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        fullWidth
                        control={control}
                        placeholder={t("auth.signUp.placeholders.website")}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <PasswordFormInput
                            label={t("auth.signUp.password")}
                            name="password"
                            labelClassName="block text-sm font-medium text-gray-700 mb-1"
                            className="w-full h-[32px] border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            fullWidth
                            control={control}
                        />

                        <PasswordFormInput
                            label={t("auth.signUp.confirmPassword")}
                            name="confirmPassword"
                            labelClassName="block text-sm font-medium text-gray-700 mb-1"
                            className="w-full h-[32px] border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            fullWidth
                            control={control}
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

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        {t("auth.signUp.alreadyAccount")}
                        <Link target="_blank" href="https://admin.applyons.com/auth/sign-in" className="ml-1 text-blueLogo hover:text-blue-800 font-medium">
                            {t("auth.signIn.title")}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default InstitutSignup
