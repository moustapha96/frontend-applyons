
"use client"

import { useState, useEffect } from "react"
import { useAuthContext } from "../../../context/useAuthContext"
import { useTranslation } from "react-i18next"
import { addDocumentPartage } from "../../../services/partageService"
import { message, Spin } from "antd"
import { Plus } from "lucide-react"
import { toast } from "sonner"

import InstitutBreadcrumb from "@/components/InstitutBreadcrumb"
import AjouterDocumentFormPartage from "./AjouterDocumentFormPartage"

const InstitutAjoutPartage = () => {
  const { institut, role } = useAuthContext()
  const [loading, setLoading] = useState(false)

  const { t } = useTranslation()

  useEffect(() => {
    scrollTo(0, 0)
  }, [])

  const handleSubmit = async (documentData) => {
    try {
      setLoading(true)
      await addDocumentPartage(documentData)
      toast.success(t("institutPartage.document_added"))
    } catch (error) {
      console.error(error)
      toast.error(t("institutPartage.add_document_error"))
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" tip={t("common.loading")} />
      </div>
    )
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <InstitutBreadcrumb
        title={t("institutMenu.ajouterPartage")}
        SubTitle={institut?.name}
      />

      <section className="py-6">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center border-b border-gray-200 px-4 sm:px-6 py-4">
              <button
                className="flex items-center text-base font-medium text-blue-600 hover:text-blue-800 transition"
              >
                <Plus className="w-5 h-5 mr-2" />
                {t("institutMenu.ajouterPartage")}
              </button>
            </div>

            <div className="p-4 sm:p-6">
              {role && role === "ROLE_INSTITUT_READ" ? (
                <p className="text-red-500 text-sm">
                  {t("institutPartage.no_permission")}
                </p>
              ) : (
                <AjouterDocumentFormPartage onAjouterDocument={handleSubmit} />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default InstitutAjoutPartage
