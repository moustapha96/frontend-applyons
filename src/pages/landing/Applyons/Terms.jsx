"use client"

import { useTranslation } from "react-i18next"
import { PageMetaData } from "@/components"
import HeaderApplyons from "./components/Header"
import { getApplyonsMenuItems } from "./navConfig"
import { LandingLayout } from "@/layouts"
import { Layout } from "antd"
import { useEffect } from "react"
import PageContentBody from "@/components/PageContentBody"
import { useSettingsContext } from "@/context"

const Terms = () => {
    const { t, i18n } = useTranslation()
    const { pageContent } = useSettingsContext()
    const lang = (i18n.language || "fr").split("-")[0]
    const content = pageContent?.["terms-and-conditions"]?.[lang]
    const pageTitle = content?.title ?? t("terms.title")

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const menuItems = getApplyonsMenuItems(t)

    return (
        <LandingLayout>
            <PageMetaData title={pageTitle} />

            <Layout className="min-h-screen">
                <HeaderApplyons menuItems={menuItems} />
                <div className="bg-gray-50 dark:bg-slate-900 pb-16 pt-24">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <div className="max-w-3xl mx-auto">
                            <PageContentBody
                                pageKey="terms-and-conditions"
                                titleKey="terms.title"
                                subtitleKey="terms.subtitle"
                            >
                                <section>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t("terms.acceptance.title")}</h2>
                                    <p className="text-gray-600 dark:text-gray-300">{t("terms.acceptance.description")}</p>
                                </section>
                                <section>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t("terms.services.title")}</h2>
                                    <p className="text-gray-600 dark:text-gray-300 mb-4">{t("terms.services.description")}</p>
                                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                                        <li>{t("terms.services.items.applications")}</li>
                                        <li>{t("terms.services.items.documents")}</li>
                                        <li>{t("terms.services.items.communication")}</li>
                                        <li>{t("terms.services.items.tracking")}</li>
                                    </ul>
                                </section>
                                <section>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t("terms.userObligations.title")}</h2>
                                    <p className="text-gray-600 dark:text-gray-300 mb-4">{t("terms.userObligations.description")}</p>
                                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                                        <li>{t("terms.userObligations.items.accuracy")}</li>
                                        <li>{t("terms.userObligations.items.security")}</li>
                                        <li>{t("terms.userObligations.items.compliance")}</li>
                                        <li>{t("terms.userObligations.items.responsibility")}</li>
                                    </ul>
                                </section>
                                <section>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t("terms.intellectualProperty.title")}</h2>
                                    <p className="text-gray-600 dark:text-gray-300">{t("terms.intellectualProperty.description")}</p>
                                </section>
                                <section>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t("terms.liability.title")}</h2>
                                    <p className="text-gray-600 dark:text-gray-300">{t("terms.liability.description")}</p>
                                </section>
                                <section>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t("terms.termination.title")}</h2>
                                    <p className="text-gray-600 dark:text-gray-300">{t("terms.termination.description")}</p>
                                </section>
                                <section>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t("terms.modifications.title")}</h2>
                                    <p className="text-gray-600 dark:text-gray-300">{t("terms.modifications.description")}</p>
                                </section>
                                <section>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t("terms.contact.title")}</h2>
                                    <p className="text-gray-600 dark:text-gray-300">{t("terms.contact.description")}</p>
                                </section>
                            </PageContentBody>
                        </div>
                    </div>
                </div>
            </Layout>
        </LandingLayout>
    )
}

export default Terms
