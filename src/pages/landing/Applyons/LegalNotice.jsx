"use client"

import { useTranslation } from "react-i18next"
import { PageMetaData } from "@/components"
import HeaderApplyons from "./components/Header"
import { getApplyonsMenuItems } from "./navConfig"
import { LandingLayout } from "@/layouts"
import { Layout } from "antd"
import { useEffect } from "react"

const LegalNotice = () => {
  const { t } = useTranslation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const menuItems = getApplyonsMenuItems(t)

  return (
    <LandingLayout>
      <PageMetaData title={t("legal.title")} />
      <Layout className="min-h-screen">
        <HeaderApplyons menuItems={menuItems} />
        <div className="bg-gray-50 pb-16 pt-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{t("legal.title")}</h1>
                <p className="text-lg text-gray-600">{t("legal.subtitle")}</p>
              </div>

              <div className="bg-white shadow-xl rounded-xl p-8 space-y-8">
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("legal.publisher.title")}</h2>
                  <p className="text-gray-600 whitespace-pre-line">{t("legal.publisher.content")}</p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("legal.host.title")}</h2>
                  <p className="text-gray-600 whitespace-pre-line">{t("legal.host.content")}</p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("legal.contact.title")}</h2>
                  <p className="text-gray-600">{t("legal.contact.content")}</p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("legal.intellectual.title")}</h2>
                  <p className="text-gray-600">{t("legal.intellectual.content")}</p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("legal.compliance.title")}</h2>
                  <p className="text-gray-600">{t("legal.compliance.content")}</p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("legal.governing.title")}</h2>
                  <p className="text-gray-600">{t("legal.governing.content")}</p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </LandingLayout>
  )
}

export default LegalNotice
