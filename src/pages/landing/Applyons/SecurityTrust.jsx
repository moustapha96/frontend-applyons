"use client"

import { useTranslation } from "react-i18next"
import { PageMetaData } from "@/components"
import HeaderApplyons from "./components/Header"
import { getApplyonsMenuItems } from "./navConfig"
import { LandingLayout } from "@/layouts"
import { Layout } from "antd"
import { useEffect } from "react"
import { Lock, Server, FileCheck, Globe, Award } from "lucide-react"
import PageContentBody from "@/components/PageContentBody"
import { useSettingsContext } from "@/context"

const SecurityTrust = () => {
  const { t, i18n } = useTranslation()
  const { pageContent } = useSettingsContext()
  const lang = (i18n.language || "fr").split("-")[0]
  const content = pageContent?.["security-trust"]?.[lang]
  const pageTitle = content?.title ?? t("security.title")

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const menuItems = getApplyonsMenuItems(t)

  const pillars = [
    { icon: Lock, key: "encryption" },
    { icon: Server, key: "infrastructure" },
    { icon: FileCheck, key: "compliance" },
    { icon: Globe, key: "international" },
    { icon: Award, key: "commitment" },
  ]

  return (
    <LandingLayout>
      <PageMetaData title={pageTitle} />
      <Layout className="min-h-screen">
        <HeaderApplyons menuItems={menuItems} />
        <div className="bg-gray-50 dark:bg-slate-900 pb-16 pt-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-3xl mx-auto">
              <PageContentBody
                pageKey="security-trust"
                titleKey="security.title"
                subtitleKey="security.subtitle"
                wrapChildrenInCard={false}
              >
                <>
                  <div className="space-y-6">
                    {pillars.map(({ icon: Icon, key }) => (
                      <div key={key} className="bg-white dark:bg-slate-800/80 shadow-xl rounded-xl p-8 flex gap-6 border border-transparent dark:border-slate-700">
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#254c6b]/10 flex items-center justify-center text-[#254c6b]">
                          <Icon size={24} strokeWidth={2} />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{t(`security.${key}.title`)}</h2>
                          <p className="text-gray-600 dark:text-gray-300">{t(`security.${key}.description`)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-10 bg-white dark:bg-slate-800/80 shadow-xl rounded-xl p-8 border border-transparent dark:border-slate-700">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t("security.summary.title")}</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{t("security.summary.description")}</p>
                    <p className="text-gray-600 dark:text-gray-300">{t("security.summary.contact")}</p>
                  </div>
                </>
              </PageContentBody>
            </div>
          </div>
        </div>
      </Layout>
    </LandingLayout>
  )
}

export default SecurityTrust
