"use client"

import { useTranslation } from "react-i18next"
import { PageMetaData } from "@/components"
import HeaderApplyons from "./components/Header"
import { LandingLayout } from "@/layouts"
import { Layout } from "antd"
import { useEffect } from "react"

const Terms = () => {
    const { t } = useTranslation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const menuItems = [
        { key: "home", label: <a href="/">{t("nav.home")} </a> },
        { key: "features", label: <a href="/#features">{t("nav.features")}</a> },
        { key: "pricing", label: <a href="/#pricing">{t("nav.pricings")}</a> },
        { key: "concuPour", label: <a href="/#concuPour">{t("nav.concuPour")}</a> }
    ];

    return (

        <LandingLayout>
            <PageMetaData title="terms.title" />

            <Layout className="min-h-screen">
                <HeaderApplyons menuItems={menuItems} />
                <div className="bg-gray-50 pb-16 pt-24">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <div className="max-w-3xl mx-auto">
                            <div className="text-center mb-12">
                                <h1 className="text-4xl font-bold text-gray-900 mb-4">{t("terms.title")}</h1>
                                <p className="text-lg text-gray-600">{t("terms.subtitle")}</p>
                            </div>

                            <div className="bg-white shadow-xl rounded-xl p-8 space-y-8">
                                <section>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("terms.acceptance.title")}</h2>
                                    <p className="text-gray-600">{t("terms.acceptance.description")}</p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("terms.services.title")}</h2>
                                    <p className="text-gray-600 mb-4">{t("terms.services.description")}</p>
                                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                                        <li>{t("terms.services.items.applications")}</li>
                                        <li>{t("terms.services.items.documents")}</li>
                                        <li>{t("terms.services.items.communication")}</li>
                                        <li>{t("terms.services.items.tracking")}</li>
                                    </ul>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("terms.userObligations.title")}</h2>
                                    <p className="text-gray-600 mb-4">{t("terms.userObligations.description")}</p>
                                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                                        <li>{t("terms.userObligations.items.accuracy")}</li>
                                        <li>{t("terms.userObligations.items.security")}</li>
                                        <li>{t("terms.userObligations.items.compliance")}</li>
                                        <li>{t("terms.userObligations.items.responsibility")}</li>
                                    </ul>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("terms.intellectualProperty.title")}</h2>
                                    <p className="text-gray-600">{t("terms.intellectualProperty.description")}</p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("terms.liability.title")}</h2>
                                    <p className="text-gray-600">{t("terms.liability.description")}</p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("terms.termination.title")}</h2>
                                    <p className="text-gray-600">{t("terms.termination.description")}</p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("terms.modifications.title")}</h2>
                                    <p className="text-gray-600">{t("terms.modifications.description")}</p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("terms.contact.title")}</h2>
                                    <p className="text-gray-600">{t("terms.contact.description")}</p>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </LandingLayout>
    )
}

export default Terms
