"use client"

import { useTranslation } from "react-i18next"
import { PageMetaData } from "@/components"
import { LandingLayout } from "@/layouts"
import { Layout } from "antd"
import HeaderApplyons from "./components/Header"
import { useEffect } from "react"

const Privacy = () => {
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
            <PageMetaData title="privacy.title" />

            <Layout className="min-h-screen">
                <HeaderApplyons menuItems={menuItems} />
                <div className="bg-gray-50 pb-16 pt-24">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <div className="max-w-3xl mx-auto">
                            <div className="text-center mb-12">
                                <h1 className="text-4xl font-bold text-gray-900 mb-4">{t("privacy.title")}</h1>
                                <p className="text-lg text-gray-600">{t("privacy.subtitle")}</p>
                                <p className="text-sm text-gray-500 mt-2">{t("privacy.lastUpdated")}</p>
                            </div>

                            <div className="bg-white shadow-xl rounded-xl p-8 space-y-8">
                                <section>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("privacy.introduction.title")}</h2>
                                    <p className="text-gray-600">{t("privacy.introduction.description")}</p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("privacy.dataCollection.title")}</h2>
                                    <p className="text-gray-600 mb-4">{t("privacy.dataCollection.description")}</p>
                                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                                        <li>{t("privacy.dataCollection.items.personal")}</li>
                                        <li>{t("privacy.dataCollection.items.academic")}</li>
                                        <li>{t("privacy.dataCollection.items.verification")}</li>
                                        <li>{t("privacy.dataCollection.items.usage")}</li>
                                    </ul>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("privacy.dataUse.title")}</h2>
                                    <p className="text-gray-600 mb-4">{t("privacy.dataUse.description")}</p>
                                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                                        <li>{t("privacy.dataUse.items.verification")}</li>
                                        <li>{t("privacy.dataUse.items.communication")}</li>
                                        <li>{t("privacy.dataUse.items.improvement")}</li>
                                        <li>{t("privacy.dataUse.items.security")}</li>
                                    </ul>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("privacy.dataSecurity.title")}</h2>
                                    <p className="text-gray-600 mb-4">{t("privacy.dataSecurity.description")}</p>
                                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                                        <li>{t("privacy.dataSecurity.items.encryption")}</li>
                                        <li>{t("privacy.dataSecurity.items.access")}</li>
                                        <li>{t("privacy.dataSecurity.items.monitoring")}</li>
                                        <li>{t("privacy.dataSecurity.items.compliance")}</li>
                                    </ul>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("privacy.userRights.title")}</h2>
                                    <p className="text-gray-600 mb-4">{t("privacy.userRights.description")}</p>
                                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                                        <li>{t("privacy.userRights.items.access")}</li>
                                        <li>{t("privacy.userRights.items.rectification")}</li>
                                        <li>{t("privacy.userRights.items.deletion")}</li>
                                        <li>{t("privacy.userRights.items.portability")}</li>
                                    </ul>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("privacy.cookies.title")}</h2>
                                    <p className="text-gray-600 mb-4">{t("privacy.cookies.description")}</p>
                                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                                        <li>{t("privacy.cookies.items.essential")}</li>
                                        <li>{t("privacy.cookies.items.preferences")}</li>
                                        <li>{t("privacy.cookies.items.analytics")}</li>
                                        <li>{t("privacy.cookies.items.security")}</li>
                                    </ul>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("privacy.contact.title")}</h2>
                                    <p className="text-gray-600">{t("privacy.contact.description")}</p>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </LandingLayout>
    )
}

export default Privacy
