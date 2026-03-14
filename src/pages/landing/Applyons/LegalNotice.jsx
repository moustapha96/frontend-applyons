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

const LegalNotice = () => {
  const { t, i18n } = useTranslation()
  const { pageContent } = useSettingsContext()
  const lang = (i18n.language || "fr").split("-")[0]
  const content = pageContent?.["legal-notice"]?.[lang]
  const pageTitle = content?.title ?? t("legal.title")

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
                pageKey="legal-notice"
                titleKey="legal.title"
                subtitleKey="legal.subtitle"
              >
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t("legal.publisher.title")}</h2>
                  <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">{t("legal.publisher.content")}</p>
                </section>
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t("legal.host.title")}</h2>
                  <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">{t("legal.host.content")}</p>
                </section>
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t("legal.contact.title")}</h2>
                  <p className="text-gray-600 dark:text-gray-300">{t("legal.contact.content")}</p>
                </section>
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t("legal.intellectual.title")}</h2>
                  <p className="text-gray-600 dark:text-gray-300">{t("legal.intellectual.content")}</p>
                </section>
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t("legal.compliance.title")}</h2>
                  <p className="text-gray-600 dark:text-gray-300">{t("legal.compliance.content")}</p>
                </section>
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t("legal.governing.title")}</h2>
                  <p className="text-gray-600 dark:text-gray-300">{t("legal.governing.content")}</p>
                </section>
              </PageContentBody>
            </div>
          </div>
        </div>
      </Layout>
    </LandingLayout>
  )
}

export default LegalNotice
