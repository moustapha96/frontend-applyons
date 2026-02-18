"use client"
import InstitutBreadcrumb from "@/components/InstitutBreadcrumb"
import { useAuthContext } from "@/context"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { toast } from "sonner"
import { PayPalScriptProvider } from "@paypal/react-paypal-js"
import { getPayPalConfig } from "../../../services/paymentService"
import { verificationDocumentsDemandeur, ajouterDocument, supprimerDocument } from "@/services/demandeurService"
import DocumentListItemDashboard from "./components/DocumentListItemDashboard"
import AjouterDocumentFormDashboard from "./components/AjouterDocumentFormDashboard"
import { Search, FileText, Plus, Loader2 } from "lucide-react"

const schema = yup.object({
  codeAdn: yup.string().required("Le code ADN est requis"),
})

export default function InstitutDashboardDemande() {
  const { t } = useTranslation()
  const { institut } = useAuthContext()
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("documents")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    scrollTo(0, 0)
  }, [activeTab])

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const datas = {
        ...data,
        institut_id: institut.id,
      }
      const res = await verificationDocumentsDemandeur(datas)
      setDocuments(res)
      if (res.length === 0) {
        toast.info(t("institutDashboardDemandeur.no_document_found"))
      } else {
        toast.success(t("institutDashboardDemandeur.documents_found", { count: res.length }))
      }
    } catch (error) {
      console.error(error)
      toast.error(t("institutDashboardDemandeur.verification_error"))
    } finally {
      setLoading(false)
    }
  }

  const handleAjouterDocument = async (documentData) => {
    try {
      const newDocument = await ajouterDocument(documentData)
      setDocuments([...documents, newDocument])
      toast.success(t("institutDashboardDemandeur.document_added"))
    } catch (error) {
      console.error(error)
      toast.error(t("institutDashboardDemandeur.add_document_error"))
    }
  }

  const handleSupprimerDocument = async (documentId) => {
    try {
      await supprimerDocument(documentId)
      setDocuments(documents.filter((doc) => doc.id !== documentId))
      toast.success(t("institutDashboardDemandeur.document_deleted"))
    } catch (error) {
      console.error(error)
      toast.error(t("institutDashboardDemandeur.delete_document_error"))
    }
  }

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      <InstitutBreadcrumb title={t("institutDashboardDemandeur.documents")} SubTitle={institut?.name} />
      <PayPalScriptProvider options={getPayPalConfig()}>
        <section className="py-6">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="flex border-b border-gray-200">
                <button
                  className={`flex items-center py-4 px-6 font-medium transition-colors duration-200 ${activeTab === "documents"
                    ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/50"
                    : "text-gray-600 hover:text-blue-500 hover:bg-blue-50/30"
                    }`}
                  onClick={() => setActiveTab("documents")}
                >
                  <FileText className="w-5 h-5 mr-2" />
                  {t("institutDashboardDemandeur.liste_documents")}
                </button>

                <button
                  className={`flex items-center py-4 px-6 font-medium transition-colors duration-200 ${activeTab === "ajouter"
                    ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/50"
                    : "text-gray-600 hover:text-blue-500 hover:bg-blue-50/30"
                    }`}
                  onClick={() => setActiveTab("ajouter")}
                >
                  <Plus className="w-5 h-5 mr-2" />
                  {t("institutDashboardDemandeur.add_document")}
                </button>
              </div>

              <div className="p-6">
                {activeTab === "documents" && (
                  <div className="space-y-8">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100">
                      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                        <Search className="w-6 h-6 mr-2 text-blue-600" />
                        {t("institutDashboardDemandeur.search_documents")}
                      </h2>
                      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div className="flex justify-center w-full">
                          <div className="w-full max-w-md">
                            <label htmlFor="codeAdn" className="block text-sm font-medium text-gray-700 mb-1">
                              {t("institutDashboardDemandeur.user_code")}
                            </label>
                            <input
                              {...register("codeAdn")}
                              type="text"
                              id="codeAdn"
                              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors"
                              placeholder={t("institutDashboardDemandeur.enter_adn_code")}
                            />
                            {errors.codeAdn && <p className="mt-1 text-sm text-red-600">{errors.codeAdn.message}</p>}
                          </div>
                        </div>
                        <div className="flex justify-center pt-2">
                          <button
                            type="submit"
                            disabled={loading}
                            className="min-w-40  text-white py-2.5 px-6 rounded-lg 
                            bg-blueLogo
                            hover:bg-rougeLogo focus:outline-none 
                            focus:ring-2 focus:ring-blue-500 
                            focus:ring-opacity-50 transition 
                            duration-150 ease-in-out shadow-md flex items-center justify-center"
                          >
                            {loading ? (
                              <>
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                {t("common.loading")}
                              </>
                            ) : (
                              <>
                                <Search className="w-5 h-5 mr-2" />
                                {t("institutDashboardDemandeur.search")}
                              </>
                            )}
                          </button>
                        </div>
                      </form>
                    </div>

                    {documents && documents.length > 0 && (
                      <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                          <FileText className="w-5 h-5 mr-2 text-blue-600" />
                          {t("institutDashboardDemandeur.found_documents")}
                          <span className="ml-2 bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                            {documents.length}
                          </span>
                        </h3>
                        <ul className="space-y-4 mt-6">
                          {documents.map((document) => (
                            <DocumentListItemDashboard
                              key={document.id}
                              document={document}
                              onDelete={() => handleSupprimerDocument(document.id)}
                            />
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => setActiveTab("ajouter")}
                        className="px-5 py-2.5 bg-blueLogo text-white rounded-lg shadow-md text-sm font-medium transition hover:bg-rougeLogo flex items-center"
                      >
                        <Plus className="w-5 h-5 mr-2" />
                        {t("institutDashboardDemandeur.add_document")}
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === "ajouter" && <AjouterDocumentFormDashboard onAjouterDocument={handleAjouterDocument} />}
              </div>
            </div>
          </div>
        </section>
      </PayPalScriptProvider>
    </div>
  )
}

