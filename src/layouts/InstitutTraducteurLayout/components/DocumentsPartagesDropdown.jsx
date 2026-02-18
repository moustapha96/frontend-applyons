
"use client"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { LuFile, LuFiles, LuFileCheck, LuClock } from "react-icons/lu"
import { useTranslation } from "react-i18next"
import { FileText } from "lucide-react"


const DocumentsPartagesDropdown = ({ documentsPartages, loading = false }) => {
  const { t } = useTranslation()

  // Fonction pour obtenir l'icône selon le statut
  const getStatusIcon = (statut) => {
    switch (statut?.toLowerCase()) {
      case 'accepted':
        return <LuFileCheck className="size-5" />
      case 'pending':
        return <LuClock className="size-5" />
      default:
        return <LuFile className="size-5" />
    }
  }

  // Fonction pour obtenir la couleur selon le statut
  const getStatusColor = (statut) => {
    switch (statut?.toLowerCase()) {
      case 'accepted':
        return 'bg-green-100 text-green-600'
      case 'pending':
        return 'bg-yellow-100 text-yellow-600'
      case 'rejected':
        return 'bg-red-100 text-red-600'
      default:
        return 'bg-blue-100 text-blue-600'
    }
  }

  // Fonction pour formater le type de document
  const formatDocumentType = (typeDocument) => {
    return typeDocument || 'Document'
  }

  return (
    <div className="hs-dropdown relative inline-flex [--placement:bottom-right]">
      <button
        id="hs-dropdown-documents-partages"
        type="button"
        className="hs-dropdown-toggle inline-flex size-9 flex-shrink-0 items-center justify-center gap-2 rounded-md align-middle font-medium text-zinc-200 transition-all duration-300 hover:bg-white/10"
      >
        <FileText className="size-5" />
        {documentsPartages?.length > 0 && (
          <span className="absolute -end-0 -top-0 size-4 rounded-full bg-blueLogo text-xs font-medium text-white">
            {documentsPartages.length}
          </span>
        )}
      </button>

      <div className="hs-dropdown-menu duration mt-2 hidden min-w-[22rem] rounded-lg border border-default-200 bg-white opacity-0 shadow-md transition-[opacity,margin] hs-dropdown-open:opacity-100 dark:bg-default-50">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-default-200">
          <h6 className="text-base font-semibold text-default-900">
            {t('demandeurPartage.document_sharing')}
          </h6>
          <Link
            to={`/institut/partages`}
            className="border-b border-dashed border-default-300 font-semibold text-default-800 hover:text-blueLogo transition-colors"
          >
            <small>{t('common.viewAll')}</small>
          </Link>
        </div>

        {/* Content */}
        <div className="h-52 overflow-y-auto py-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-default-300 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-1">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blueLogo"></div>
              <span className="ml-2 text-sm text-default-600">
                {t('common.loading')}
              </span>
            </div>
          ) : documentsPartages && documentsPartages.length > 0 ? (
            documentsPartages
              .filter(document => !document.isDeleted) // Filtrer les documents supprimés
              .map((document, idx) => (
                <Link
                  to={`/institut/demande/${document?.demande?.id}/documents`}
                  key={document.id || idx}
                  className="mx-2 flex items-center rounded px-3 py-3 transition-all duration-200 hover:bg-default-100 group"
                >
                  {/* Icône avec statut */}
                  <span className={`inline-flex size-10 items-center justify-center rounded-full ${getStatusColor(document.statut)}`}>
                    {getStatusIcon(document.statut)}
                  </span>

                  {/* Contenu */}
                  <div className="flex-1 px-3 min-w-0">
                    <div className="flex items-center justify-between">
                      <h6 className="text-sm font-semibold text-default-800 truncate">
                        {document.intitule || `${formatDocumentType(document.typeDocument)} - ${document.anneeObtention}`}
                      </h6>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(document.statut)}`}>
                        {t(`common.status.${document.statut?.toLowerCase()}`, document.statut)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-default-600 truncate">
                        {t('common.document.code', 'Code')}: {document.codeAdn}
                      </p>
                      <p className="text-xs text-default-500">
                        {new Date(document.dateObtention).toLocaleDateString('fr-FR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        })}
                      </p>
                    </div>

                    <p className="text-xs text-default-500 mt-1">
                      {formatDocumentType(document.typeDocument)} • {document.anneeObtention}
                    </p>
                  </div>

                  {/* Indicateur de hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-4 h-4 text-default-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))
          ) : (
            <div className="flex flex-col items-center justify-center py-8 px-4">
              <LuFiles className="size-12 text-default-300 mb-2" />
              <p className="text-sm text-default-600 text-center">
                {t('institutMenu.layout.topbar.noDocumentsPartages')}
              </p>
            </div>
          )}
        </div>


      </div>
    </div>
  )
}

export default DocumentsPartagesDropdown