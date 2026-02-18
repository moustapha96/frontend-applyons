"use client"

import { useTranslation } from "react-i18next"
import { PageMetaData } from "@/components"
import { useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { TextFormInput } from "@/components"
import { LoaderCircle } from "lucide-react"
import { Layout } from "antd"
import HeaderApplyons from "./components/Header"
import { LandingLayout } from "@/layouts"
import { useSettingsContext } from "@/context"
import { createContact } from "@/services/contactService"
import { toast } from "sonner"

const Contact = () => {
    const { t } = useTranslation()
    const [loading, setLoading] = useState(false)
    const { settings } = useSettingsContext()
    const contactEmail = settings?.contactEmail || "support@applyons.com"
    const contactPhone = settings?.contactPhone || settings?.contactMobile || "+1(917) 943-9275"
    const contactAddress = settings?.contactAddress || "123 Street, New York, USA"

    // Schéma de validation traduit dans la langue active
    const contactSchema = useMemo(
        () =>
            yup.object({
                name: yup
                    .string()
                    .required(t("contact.validation.nameRequired")),
                email: yup
                    .string()
                    .email(t("contact.validation.invalidEmail"))
                    .required(t("contact.validation.emailRequired")),
                subject: yup
                    .string()
                    .required(t("contact.validation.subjectRequired")),
                message: yup
                    .string()
                    .required(t("contact.validation.messageRequired"))
                    .min(10, t("contact.validation.messageLength")),
            }),
        [t]
    )

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const menuItems = [
        { key: "home", label: <a href="/">{t("nav.home")} </a> },
        { key: "features", label: <a href="/#features">{t("nav.features")}</a> },
        { key: "pricing", label: <a href="/#pricing">{t("nav.pricings")}</a> },
        { key: "concuPour", label: <a href="/#concuPour">{t("nav.concuPour")}</a> }
    ];

    const { control, handleSubmit, reset, register } = useForm({
        resolver: yupResolver(contactSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: ""
        }
    })

    const onSubmit = async (data) => {
        setLoading(true)
        console.log(data)
        try {
            const res = await createContact({
                name: data.name,
                email: data.email,
                subject: data.subject,
                message: data.message,
            })

                toast.success(t("contact.form.success"))
                reset()
          
        } catch (error) {
            console.error(error)
            toast.error(t("contact.form.error"))
        } finally {
            setLoading(false)
        }
    }

    return <>

        <LandingLayout>
            <PageMetaData title={`${t("contact.title")}`} />

            <Layout className="min-h-screen">


                <HeaderApplyons menuItems={menuItems} />


                <div className="bg-gray-50 pb-16 pt-24">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <div className="max-w-3xl mx-auto">
                            <div className="text-center mb-12">
                                <h1 className="text-4xl font-bold text-gray-900 mb-4">{t("contact.title")}</h1>
                                <p className="text-lg text-gray-600">{t("contact.subtitle")}</p>
                            </div>

                            <div className="bg-white shadow-xl rounded-xl p-8">
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <TextFormInput
                                            label={t("contact.form.name")}
                                            name="name"
                                            labelClassName="block text-sm font-medium text-gray-700 mb-1"
                                            className="w-full h-[32px] border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                            fullWidth
                                            control={control}
                                            placeholder={t("contact.form.placeholders.name")}
                                        />

                                        <TextFormInput
                                            label={t("contact.form.email")}
                                            name="email"
                                            type="email"
                                            labelClassName="block text-sm font-medium text-gray-700 mb-1"
                                            className="w-full h-[32px] border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                            fullWidth
                                            control={control}
                                            placeholder={t("contact.form.placeholders.email")}
                                        />
                                    </div>

                                    <TextFormInput
                                        label={t("contact.form.subject")}
                                        name="subject"
                                        labelClassName="block text-sm font-medium text-gray-700 mb-1"
                                        className="w-full h-[32px] border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        fullWidth
                                        control={control}
                                        placeholder={t("contact.form.placeholders.subject")}
                                    />

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            {t("contact.form.message")}
                                        </label>
                                        <textarea
                                            {...register("message")}
                                            rows={6}
                                            className="w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors p-3"
                                            placeholder={t("contact.form.placeholders.message")}
                                        />
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full bg-gradient-to-r from-blueLogo to-blueLogo text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all transform hover:scale-[1.02] font-medium text-lg shadow-md"
                                        >
                                            {loading ? (
                                                <span className="flex items-center justify-center">
                                                    {t("contact.form.sending")}
                                                    <LoaderCircle className="ml-2 h-5 w-5 animate-spin" />
                                                </span>
                                            ) : (
                                                t("contact.form.submit")
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>

                            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="text-center">
                                    <div className="bg-white p-6 rounded-xl shadow-lg">
                                        <h3 className="text-lg font-semibold mb-2">{t("contact.info.email")}</h3>
                                        <p className="text-gray-600">{contactEmail}</p>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="bg-white p-6 rounded-xl shadow-lg">
                                        <h3 className="text-lg font-semibold mb-2">{t("contact.info.phone")}</h3>
                                        <p className="text-gray-600">{contactPhone}</p>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="bg-white p-6 rounded-xl shadow-lg">
                                        <h3 className="text-lg font-semibold mb-2">{t("contact.info.address")}</h3>
                                        <p className="text-gray-600">{contactAddress}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </LandingLayout>
    </>
}

export default Contact
