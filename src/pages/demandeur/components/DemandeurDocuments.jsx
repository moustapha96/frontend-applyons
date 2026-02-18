'use client'

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Download, Search, ChevronRight, ChevronLeft, X, FileText, User, Building, Calendar, Hash, Loader, AlertCircle } from "lucide-react"
import { useAuthContext } from "@/context"
import { getDocumentByIdDemandeur } from "../../../services/documentService"
import { CopyableField } from "../../../utils/CopyableField"
import { useTranslation } from "react-i18next"

export default function DemandeurDocuments() {
    const { demandeur } = useAuthContext()
    const [documents, setDocuments] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [filter, setFilter] = useState("")
    const [selectedDocument, setSelectedDocument] = useState(null)
    const [showPopup, setShowPopup] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [documentsPerPage] = useState(5)
    const { t } = useTranslation();

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const data = await getDocumentByIdDemandeur(demandeur.id)
                //console.log(data)
                setDocuments(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchDocuments()
    }, [demandeur.id])


    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="flex flex-col items-center">
                    <Loader className="h-8 w-8 text-blueLogo animate-spin mb-2" />
                    <p className="text-gray-600">{t("loading")}</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="flex flex-col items-center">
                    <AlertCircle className="h-8 w-8 text-red-500 mb-2" />
                    <p className="text-gray-600">{error}</p>
                </div>
            </div>
        )
    }

    const filteredDocuments = documents.length > 0 && documents.filter(document =>
        document.intitule.toLowerCase().includes(filter.toLowerCase())
    )

    const indexOfLastDocument = currentPage * documentsPerPage
    const indexOfFirstDocument = indexOfLastDocument - documentsPerPage
    const currentDocuments = filteredDocuments.length > 0 && filteredDocuments.slice(indexOfFirstDocument, indexOfLastDocument)

    const paginate = (pageNumber) => setCurrentPage(pageNumber)



    const handleOpenPopup = (document) => {
        setSelectedDocument(document)
        setShowPopup(true)
    }

    const handleClosePopup = () => {
        setShowPopup(false)
        setSelectedDocument(null)
    }

    //console.log(documents);

    return (

        <section className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
                <div className="p-6 sm:p-10">

                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold text-gray-800">Liste des Documents</h1>
                            </div>

                            <div className="mb-6">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder={t('demandeur.searchByTitle')}
                                        value={filter}
                                        onChange={(e) => setFilter(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            {[
                                                t('demandeur.adn'),
                                                t('demandeur.title'),
                                                t('demandeur.documentType'),
                                                t('demandeur.obtainingYear'),
                                                t('demandeur.institution'),
                                                t('demandeur.actions')
                                            ].map((header) => (
                                                <th key={header} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    {header}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {currentDocuments && currentDocuments.map((document) => (
                                            <tr key={document.id} className="hover:bg-gray-50 transition duration-300">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{document.codeAdn}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{document.intitule}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{document.typeDocument}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(document.anneeObtention).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <Link
                                                        to={`/demandeur/institut/${document.demande.institut.id}/details`}
                                                    >
                                                        <strong> {document.demande.institut.name}</strong>
                                                    </Link>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <Link
                                                        to={`/demandeur/demande/${document.demande.id}/details`}
                                                        className="text-blueLogo hover:text-blueClaire mr-4 border border-blueLogo rounded-md px-2 py-1"
                                                    >
                                                        {t('demandeur.details')}
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-6 flex justify-between items-center">
                                <div>
                                    <p className="text-sm text-gray-700">
                                        {/* Affichage de {indexOfFirstDocument + 1} à {Math.min(indexOfLastDocument, filteredDocuments.length)} sur {filteredDocuments.length} documents */}

                                        {t('demandeur.showing_entries', {
                                            first: indexOfFirstDocument + 1,
                                            last: Math.min(indexOfLastDocument, filteredDocuments.length),
                                            total: filteredDocuments.length
                                        })}
                                    </p>
                                </div>
                                <div className="flex justify-center">
                                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                        <button
                                            onClick={() => paginate(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                        >
                                            <span className="sr-only">{t('demandeur.previous')}</span>
                                            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                                        </button>
                                        {Array.from({ length: Math.ceil(filteredDocuments.length / documentsPerPage) }).map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => paginate(index + 1)}
                                                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === index + 1
                                                    ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                    }`}
                                            >
                                                {index + 1}
                                            </button>
                                        ))}
                                        <button
                                            onClick={() => paginate(currentPage + 1)}
                                            disabled={currentPage === Math.ceil(filteredDocuments.length / documentsPerPage)}
                                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                        >
                                            {/* <span className="sr-only">Next</span> */}
                                            <span className="sr-only">{t('demandeur.next')}</span>
                                            <ChevronRight className="h-5 w-5" aria-hidden="true" />
                                        </button>
                                    </nav>
                                </div>
                            </div>
                        </div>

                        {showPopup && selectedDocument && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                                <div className="bg-white rounded-lg p-8 max-w-md w-full">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-2xl font-bold text-gray-800">Détails du Document</h2>
                                        <button onClick={handleClosePopup} className="text-gray-500 hover:text-gray-700">
                                            <X className="w-6 h-6" />
                                        </button>
                                    </div>
                                    <div className="space-y-4">
                                        {/* <InfoItem icon={<Hash className="w-5 h-5" />} label="Code ADN" value={selectedDocument.codeAdn} /> */}
                                        <CopyableField icon={<FileText className="w-5 h-5" />} label="Code ADN" value={selectedDocument.codeAdn} />

                                        <InfoItem icon={<FileText className="w-5 h-5" />} label="Intitulé" value={selectedDocument.intitule} />
                                        <InfoItem icon={<FileText className="w-5 h-5" />} label="Type de Document" value={selectedDocument.typeDocument} />
                                        <InfoItem icon={<Calendar className="w-5 h-5" />} label="Date d'Obtention" value={new Date(selectedDocument.dateObtention).toLocaleDateString()} />
                                        <InfoItem icon={<Calendar className="w-5 h-5" />} label="Année d'Obtention" value={selectedDocument.anneeObtention} />
                                        <InfoItem icon={<FileText className="w-5 h-5" />} label="Statut" value={selectedDocument.statut} />

                                        {selectedDocument.demande && (
                                            <>
                                                <h3 className="text-lg font-semibold text-gray-800 mt-6">Détails de la Demande</h3>
                                                <InfoItem icon={<Calendar className="w-5 h-5" />} label="Date de Demande" value={new Date(selectedDocument.demande.dateDemande).toLocaleDateString()} />
                                                <InfoItem icon={<FileText className="w-5 h-5" />} label="Intitulé" value={selectedDocument.demande.intitule} />
                                                <InfoItem icon={<FileText className="w-5 h-5" />} label="Résultat" value={selectedDocument.demande.resultat} />
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

const InfoItem = ({ icon, label, value }) => (
    <div className="flex items-center space-x-3">
        <div className="flex-shrink-0 text-gray-400">{icon}</div>
        <div>
            <p className="text-sm font-medium text-gray-500">{label}</p>
            <p className="text-sm text-gray-900">{value || "N/A"}</p>
        </div>
    </div>
)