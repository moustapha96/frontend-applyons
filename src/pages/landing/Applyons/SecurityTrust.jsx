"use client"

import { useTranslation } from "react-i18next"
import { PageMetaData } from "@/components"
import HeaderApplyons from "./components/Header"
import { getApplyonsMenuItems } from "./navConfig"
import { LandingLayout } from "@/layouts"
import { Layout } from "antd"
import { useEffect } from "react"
import { Shield, Lock, Server, FileCheck, Globe, Award } from "lucide-react"

const SecurityTrust = () => {
  const { t } = useTranslation()

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
      <PageMetaData title={t("security.title")} />
      <Layout className="min-h-screen">
        <HeaderApplyons menuItems={menuItems} />
        <div className="bg-gray-50 pb-16 pt-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#254c6b] text-white mb-4">
                  <Shield size={32} strokeWidth={2} />
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{t("security.title")}</h1>
                <p className="text-lg text-gray-600">{t("security.subtitle")}</p>
              </div>

              <div className="space-y-6">
                {pillars.map(({ icon: Icon, key }) => (
                  <div key={key} className="bg-white shadow-xl rounded-xl p-8 flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#254c6b]/10 flex items-center justify-center text-[#254c6b]">
                      <Icon size={24} strokeWidth={2} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-2">{t(`security.${key}.title`)}</h2>
                      <p className="text-gray-600">{t(`security.${key}.description`)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 bg-white shadow-xl rounded-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("security.summary.title")}</h2>
                <p className="text-gray-600 mb-4">{t("security.summary.description")}</p>
                <p className="text-gray-600">{t("security.summary.contact")}</p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </LandingLayout>
  )
}

export default SecurityTrust
