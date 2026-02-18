"use client"

import { useTranslation } from "react-i18next"
import { PageMetaData } from "@/components"
import { LandingLayout } from "@/layouts"
import { Layout } from "antd"
import HeaderApplyons from "./components/Header"
import { useEffect } from "react"

const About = () => {
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
            <PageMetaData title={t('applyons.about.title')} />

            <Layout className="min-h-screen">
                <HeaderApplyons menuItems={menuItems} />

                <div className="bg-gray-50 pb-16 pt-24">

                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <div className="max-w-3xl mx-auto">
                            <div className="text-center mb-12">
                                <h1 className="text-4xl font-bold text-gray-900 mb-4">{t("applyons.about.title")}</h1>
                                <p className="text-lg text-gray-600">{t("applyons.about.subtitle")}</p>
                            </div>

                            <div className="space-y-8">
                                <div className="bg-white shadow-xl rounded-xl p-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("applyons.about.mission.title")}</h2>
                                    <p className="text-gray-600">{t("applyons.about.mission.description")}</p>
                                </div>

                                <div className="bg-white shadow-xl rounded-xl p-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("applyons.about.vision.title")}</h2>
                                    <p className="text-gray-600">{t("applyons.about.vision.description")}</p>
                                </div>

                                <div className="bg-white shadow-xl rounded-xl p-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("applyons.about.values.title")}</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t("applyons.about.values.trust.title")}</h3>
                                            <p className="text-gray-600">{t("applyons.about.values.trust.description")}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t("applyons.about.values.innovation.title")}</h3>
                                            <p className="text-gray-600">{t("applyons.about.values.innovation.description")}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t("applyons.about.values.security.title")}</h3>
                                            <p className="text-gray-600">{t("applyons.about.values.security.description")}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t("applyons.about.values.accessibility.title")}</h3>
                                            <p className="text-gray-600">{t("applyons.about.values.accessibility.description")}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white shadow-xl rounded-xl p-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("applyons.about.team.title")}</h2>
                                    <p className="text-gray-600 mb-6">{t("applyons.about.team.description")}</p>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {[1, 2, 3].map((member) => (
                                            <div key={member} className="text-center">
                                                <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full mb-4"></div>
                                                <h3 className="text-lg font-semibold text-gray-900">{t(`applyons.about.team.member${member}.name`)}</h3>
                                                <p className="text-gray-600">{t(`applyons.about.team.member${member}.role`)}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </LandingLayout>
    )
}

export default About
