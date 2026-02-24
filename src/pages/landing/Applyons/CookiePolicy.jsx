"use client"

import { useTranslation } from "react-i18next"
import { PageMetaData } from "@/components"
import HeaderApplyons from "./components/Header"
import { getApplyonsMenuItems } from "./navConfig"
import { LandingLayout } from "@/layouts"
import { Layout } from "antd"
import { useEffect } from "react"

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
        <div className="bg-gray-50 pb-16 pt-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{t("cookies.title")}</h1>
                <p className="text-lg text-gray-600">{t("cookies.subtitle")}</p>
                <p className="text-sm text-gray-500 mt-2">{t("cookies.lastUpdated")}</p>
              </div>

              <div className="bg-white shadow-xl rounded-xl p-8 space-y-8">
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("cookies.intro.title")}</h2>
                  <p className="text-gray-600">{t("cookies.intro.description")}</p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("cookies.what.title")}</h2>
                  <p className="text-gray-600 mb-4">{t("cookies.what.description")}</p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>{t("cookies.what.items.definition")}</li>
                    <li>{t("cookies.what.items.usage")}</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("cookies.types.title")}</h2>
                  <p className="text-gray-600 mb-4">{t("cookies.types.description")}</p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>{t("cookies.types.items.essential")}</li>
                    <li>{t("cookies.types.items.preferences")}</li>
                    <li>{t("cookies.types.items.analytics")}</li>
                    <li>{t("cookies.types.items.security")}</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("cookies.consent.title")}</h2>
                  <p className="text-gray-600">{t("cookies.consent.description")}</p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("cookies.manage.title")}</h2>
                  <p className="text-gray-600 mb-4">{t("cookies.manage.description")}</p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>{t("cookies.manage.items.browser")}</li>
                    <li>{t("cookies.manage.items.preferences")}</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("cookies.contact.title")}</h2>
                  <p className="text-gray-600">{t("cookies.contact.description")}</p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </LandingLayout>
  )
}

export default CookiePolicy
