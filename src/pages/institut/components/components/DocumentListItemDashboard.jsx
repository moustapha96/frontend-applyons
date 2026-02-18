"use client"
import React, { useState } from 'react';
import { FileText, Calendar, User, Building, Trash2, Eye, Loader, File } from 'lucide-react';

import { getFileDocument } from '../../../../services/documentService';

import { useTranslation } from "react-i18next"



const DocumentListItemDashboard = ({ document, onDelete }) => {
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [fichier, setFichier] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useTranslation()

  const handleViewDocument = async () => {
    setIsLoading(true)
    setIsViewerOpen(true)
    try {
      const response = await getFileDocument(document.id)
      // Supposons que la réponse contient directement la chaîne base64
      setFichier(response)
    } catch (error) {
      console.error("Erreur lors de l'ouverture du document:", error)
      // Vous pouvez ajouter ici une notification d'erreur pour l'utilisateur
    } finally {
      setIsLoading(false)
    }
  }

  const closeViewer = () => {
    setIsViewerOpen(false)
    setFichier(null)
  }

  return (
    <li className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 flex justify-between items-start">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">{document.codeAdn}</span>
            <span
              className={`px-2 py-1 text-xs font-semibold rounded-full ${document.statut === "Créé" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                }`}
            >
              {document.statut}
            </span>
          </div>
          <h3 className="text-xl font-semibold text-gray-800">{document.intitule}</h3>
          <div className="flex items-center text-gray-600">
            <FileText className="w-4 h-4 mr-2" />
            <span>{document.typeDocument}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Obtenu le {new Date(document.dateObtention).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <User className="w-4 h-4 mr-2" />
            <span>{document.demandeur.name}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Building className="w-4 h-4 mr-2" />
            <span>
              {document.demande.institut.name} ({document.demande.institut.type})
            </span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleViewDocument}
            className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
            aria-label="Visualiser le document"
          >
            <File className="w-8 h-8" />
          </button>

        </div>
      </div>

      {isViewerOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">{t("institut.documentPreview")}</h2>
              <button onClick={closeViewer} className="text-gray-500 hover:text-gray-700">
                Fermer
              </button>
            </div>
            <div className="bg-gray-200 rounded-lg p-4">
              {isLoading ? (
                <div className="flex justify-center items-center h-[600px]">
                  <Loader className="w-12 h-12 animate-spin text-blue-600" />
                  <span className="ml-2 text-lg font-semibold text-gray-700">Chargement du document...</span>
                </div>
              ) : fichier ? (
                <iframe
                  src={`data:application/pdf;base64,${fichier}`}
                  width="100%"
                  height="600px"
                  title="Document PDF"
                  className="border rounded"
                  onLoad={(e) => {
                    const iframe = e.target
                    if (iframe instanceof HTMLIFrameElement) {
                      if (iframe.contentWindow) {
                        iframe.contentWindow.document.body.addEventListener("contextmenu", (event) =>
                          event.preventDefault(),
                        )
                      }
                    }
                  }}
                />
              ) : (
                <div className="flex justify-center items-center h-[600px]">
                  <span className="text-lg font-semibold text-gray-700">Erreur de chargement du document.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </li>
  )
}

export default DocumentListItemDashboard

