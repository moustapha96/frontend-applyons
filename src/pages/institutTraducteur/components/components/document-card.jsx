

"use client"

import { getFileDocument } from "@/services/documentService"
import {
  FileText,
  Calendar,
  User,
  MapPin,
  CheckCircle,
  Download,
  ExternalLink,
  Mail,
  Phone,
  Briefcase,
  Building,
  Award,
  Clock,
  Shield,
  BookOpen,
  GraduationCap,
  Loader2,
} from "lucide-react"
import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"

const DocumentCard = ({ document }) => {
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState(false)
  const [fichier, setFichier] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDocument = async () => {
      setLoading(true)
      try {
        const response = await getFileDocument(document.id)
        setFichier(response)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchDocument()
  }, [document.id])

  if (!document) return null

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  // Fonction pour extraire le nom du fichier à partir de l'URL
  const getFileName = (url) => {
    if (!url) return "Document"
    const parts = url.split("/")
    return parts[parts.length - 1]
  }

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-green-200">
      <div className="bg-green-600 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <GraduationCap className="h-6 w-6 text-white mr-3" />
          <div>
            <h3 className="text-lg font-bold text-white">{t("institutVerification.document_authentic")}</h3>
            <p className="text-green-100 text-sm">
              {document.typeDocument} - {document.anneeObtention}
            </p>
          </div>
        </div>
        <div className="bg-white bg-opacity-20 p-2 rounded-full">
          <CheckCircle className="h-5 w-5 text-white" />
        </div>
      </div>

      <div className="p-6">
        {/* Aperçu du document */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-700 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-green-600" />
              {t("institutVerification.document_info")}
            </h4>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {document.demande.resultat}
            </span>
          </div>

          <div className="bg-gray-50 rounded-lg border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div className="flex items-center mb-3 sm:mb-0">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h5 className="text-lg font-medium text-gray-800">{document.demande.intitule}</h5>
                    <p className="text-gray-600 text-sm">{document.intitule}</p>
                  </div>
                </div>

                {fichier && (
                  <div className="flex space-x-2">
                    <a
                      href={`data:application/pdf;base64,${fichier}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      {t("institutVerification.view_document")}
                    </a>

                    <a
                      href={`data:application/pdf;base64,${fichier}`}
                      download={getFileName(document.url) || "document.pdf"}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      {t("institutVerification.download_document")}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Affichage du PDF */}
            <div className="p-4">
              {loading && (
                <div className="flex items-center justify-center py-10">
                  <Loader2 className="animate-spin h-8 w-8 text-blue-600"></Loader2>
                  <span className="ml-2 text-gray-600">{t("institutVerification.loading_document")}</span>
                </div>
              )}

              {error && !loading && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  <p className="font-medium">{t("institutVerification.document_error")}</p>
                  <p className="text-sm">{error}</p>
                </div>
              )}

              {fichier && !loading && (
                <div className="mt-2 prevent-select">
                  <div className="bg-gray-200 rounded-lg p-2">
                    <iframe
                      src={`data:application/pdf;base64,${fichier}`}
                      title="Document"
                      width="100%"
                      height="500px"
                      className="rounded border-0"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Informations du document */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-4 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-green-600" />
              {t("institutVerification.document_info")}
            </h4>

            <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
              <div>
                <p className="text-sm text-gray-500">{t("institutVerification.adn_code")}</p>
                <div className="flex items-center">
                  <p className="font-medium text-gray-800">{document.codeAdn}</p>
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    <Shield className="h-3 w-3 mr-1" />
                    {t("institutVerification.verify")}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500">{t("institutVerification.document_info")}</p>
                <p className="font-medium text-gray-800">{document.typeDocument}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">{t("institutVerification.start_date")}</p>
                <p className="font-medium text-gray-800 flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                  {formatDate(document.dateObtention)}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">{t("institutVerification.end_date")}</p>
                <p className="font-medium text-gray-800">{document.anneeObtention}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">{t("institutVerification.verification")}</p>
                <p className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {document.statut}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">{t("institutVerification.verification")}</p>
                <p className="font-medium text-gray-800 flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-gray-500" />
                  {formatDate(document.demande.dateDemande)}
                </p>
              </div>
            </div>
          </div>

          {/* Informations du demandeur */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-4 flex items-center">
              <User className="h-5 w-5 mr-2 text-green-600" />
              {t("institutVerification.requester_info")}
            </h4>

            <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
              <div>
                <p className="text-sm text-gray-500">{t("institutVerification.full_name")}</p>
                <p className="font-medium text-gray-800">{document.demande.demandeur.name}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">{t("institutVerification.user_code")}</p>
                <p className="font-medium text-gray-800">{document.demande.demandeur.codeUser}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-800 flex items-center">
                  <Mail className="h-4 w-4 mr-1 text-gray-500" />
                  {document.demande.demandeur.email}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">{t("institutVerification.phone")}</p>
                <p className="font-medium text-gray-800 flex items-center">
                  <Phone className="h-4 w-4 mr-1 text-gray-500" />
                  {document.demande.demandeur.phone}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">{t("institutVerification.birth_date")}</p>
                <p className="font-medium text-gray-800">{formatDate(document.demande.demandeur.dateNaissance)}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">{t("institutVerification.birth_place")}</p>
                <p className="font-medium text-gray-800">{document.demande.demandeur.lieuNaissance}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Informations supplémentaires (Institut) */}
        {expanded && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Informations de l'institut */}
              <div>
                <h4 className="font-semibold text-gray-700 mb-4 flex items-center">
                  <Building className="h-5 w-5 mr-2 text-green-600" />
                  {t("institutVerification.institute_info")}
                </h4>

                <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-500">{t("institutVerification.institute_name")}</p>
                    <p className="font-medium text-gray-800">{document.demande.institut.name}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">{t("institutVerification.type")}</p>
                    <p className="font-medium text-gray-800">{document.demande.institut.type}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-800 flex items-center">
                      <Mail className="h-4 w-4 mr-1 text-gray-500" />
                      {document.demande.institut.email}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">{t("institutVerification.phone")}</p>
                    <p className="font-medium text-gray-800 flex items-center">
                      <Phone className="h-4 w-4 mr-1 text-gray-500" />
                      {document.demande.institut.phone}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">{t("institutVerification.address")}</p>
                    <p className="font-medium text-gray-800 flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                      {document.demande.institut.adresse}, {document.demande.institut.paysResidence}
                    </p>
                  </div>
                </div>
              </div>

              {/* Informations complémentaires du demandeur */}
              <div>
                <h4 className="font-semibold text-gray-700 mb-4 flex items-center">
                  <Award className="h-5 w-5 mr-2 text-green-600" />
                  {t("institutVerification.additional_info")}
                </h4>

                <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-500">{t("institutVerification.profession")}</p>
                    <p className="font-medium text-gray-800 flex items-center">
                      <Briefcase className="h-4 w-4 mr-1 text-gray-500" />
                      {document.demande.demandeur.profession}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">{t("institutVerification.gender")}</p>
                    <p className="font-medium text-gray-800">{document.demande.demandeur.sexe}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">{t("institutVerification.address")}</p>
                    <p className="font-medium text-gray-800">{document.demande.demandeur.adresse}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">{t("institutVerification.country")}</p>
                    <p className="font-medium text-gray-800">{document.demande.demandeur.paysResidence}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">{t("institutVerification.auth_type")}</p>
                    <p className="font-medium text-gray-800">{document.demande.typeAuth}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bouton pour afficher plus/moins d'informations */}
        <div className="mt-6 flex justify-center border-t border-gray-100 pt-4">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center px-4 py-2 rounded-md hover:bg-blue-50 transition-colors"
          >
            {expanded ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
                {t("institutVerification.show_less")}
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                {t("institutVerification.show_more")}
              </>
            )}
          </button>
        </div>

        {/* Certificat d'authenticité */}
        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
          <h5 className="font-semibold text-green-800 mb-1">{t("institutVerification.document_authentic")}</h5>
          <p className="text-green-700 text-sm">
            {t("institutVerification.verified_by")} {document.demande.institut.name}.
          </p>
          <p className="text-green-600 text-xs mt-1">
            {t("institutVerification.verified_on")} {formatDate(document.demande.dateDemande)} •{" "}
            {t("institutVerification.adn_code")}: {document.codeAdn}
          </p>
        </div>
      </div>
    </div>
  )
}

export default DocumentCard

