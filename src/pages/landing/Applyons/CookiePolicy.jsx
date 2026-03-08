"use client"

import { useTranslation } from "react-i18next"
import { PageMetaData } from "@/components"
import HeaderApplyons from "./components/Header"
import { getApplyonsMenuItems } from "./navConfig"
import { LandingLayout } from "@/layouts"
import { Layout } from "antd"
import { useEffect } from "react"
import PageContentBody from "@/components/PageContentBody"

const CookiePolicy = () => {
  const { t } = useTranslation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const menuItems = getApplyonsMenuItems(t)

  return (
    <LandingLayout>
      <PageMetaData title={t("cookies.title")} />
      <Layout className="min-h-screen">
        <HeaderApplyons menuItems={menuItems} />
        <div className="bg-gray-50 dark:bg-slate-900 pb-16 pt-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-3xl mx-auto">
              <PageContentBody
                pageKey="cookie-policy"
                titleKey="cookies.title"
                subtitleKey="cookies.subtitle"
                lastUpdatedKey="cookies.lastUpdated"
              >
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t("cookies.intro.title")}</h2>
                  <p className="text-gray-600 dark:text-gray-300">{t("cookies.intro.description")}</p>
                </section>
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t("cookies.what.title")}</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{t("cookies.what.description")}</p>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                    <li>{t("cookies.what.items.definition")}</li>
                    <li>{t("cookies.what.items.usage")}</li>
                  </ul>
                </section>
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t("cookies.types.title")}</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{t("cookies.types.description")}</p>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                    <li>{t("cookies.types.items.essential")}</li>
                    <li>{t("cookies.types.items.preferences")}</li>
                    <li>{t("cookies.types.items.analytics")}</li>
                    <li>{t("cookies.types.items.security")}</li>
                  </ul>
                </section>
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t("cookies.consent.title")}</h2>
                  <p className="text-gray-600 dark:text-gray-300">{t("cookies.consent.description")}</p>
                </section>
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t("cookies.manage.title")}</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{t("cookies.manage.description")}</p>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                    <li>{t("cookies.manage.items.browser")}</li>
                    <li>{t("cookies.manage.items.preferences")}</li>
                  </ul>
                </section>
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t("cookies.contact.title")}</h2>
                  <p className="text-gray-600 dark:text-gray-300">{t("cookies.contact.description")}</p>
                </section>
              </PageContentBody>
            </div>
          </div>
        </div>
      </Layout>
    </LandingLayout>
  )
}

export default CookiePolicy
