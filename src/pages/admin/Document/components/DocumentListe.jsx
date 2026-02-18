
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllDocuments } from "../../../../services/documentService";
import { Download, Search, ChevronRight, ChevronLeft, X, FileText, User, Building } from "lucide-react";
import { useTranslation } from 'react-i18next';

const DocumentListe = () => {
    const { t } = useTranslation();
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState("");
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [documentsPerPage] = useState(5);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const data = await getAllDocuments();
                //console.log(data);
                setDocuments(data);
            } catch (err) {
                setError(t("admin.error_loading_documents"));
            } finally {
                setLoading(false);
            }
        };

        fetchDocuments();
    }, [t]);

    if (loading) return <div className="flex justify-center items-center h-screen">{t("admin.loading_documents")}</div>;
    if (error) return <div className="flex justify-center items-center h-screen text-red-600">{t("admin.error")}: {error}</div>;

    const filteredDocuments = documents.filter(document =>
        document.intitule.toLowerCase().includes(filter.toLowerCase())
    );

    const indexOfLastDocument = currentPage * documentsPerPage;
    const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
    const currentDocuments = filteredDocuments.slice(indexOfFirstDocument, indexOfLastDocument);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleOpenPopup = (document) => {
        setSelectedDocument(document);
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setSelectedDocument(null);
    };

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">{t("admin.document_list")}</h1>

                </div>

                <div className="mb-6">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder={t("admin.search_placeholder")}
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
                                {["#ADN", t("admin.title"), t("admin.document_type"), t("admin.obtention_year"), t("admin.demandeur"), t("admin.actions")].map((header) => (
                                    <th key={header} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentDocuments.map((document) => (
                                <tr key={document.id} className="hover:bg-gray-50 transition duration-300">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{document.codeAdn}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{document.intitule}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{document.typeDocument}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(document.anneeObtention).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {document.demande && document.demande.demandeur ? document.demande.demandeur.name : t("admin.unknown")}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <Link
                                            to={`/admin/documents/${document.id}/details`}
                                            className="text-blue-600 hover:text-blue-900 mr-4"
                                        >
                                            {t("admin.details")}
                                        </Link>
                                        {document.demande && document.demande.institut && (
                                            <Link
                                                to={`/admin/institut/${document.demande.institut.id}/details`}
                                                className="text-green-600 hover:text-green-900"
                                            >
                                                {t("admin.institut")}
                                            </Link>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-6 flex justify-between items-center">
                    <div>
                        <p className="text-sm text-gray-700">
                            {t("admin.showing")} {indexOfFirstDocument + 1} {t("admin.to")} {Math.min(indexOfLastDocument, filteredDocuments.length)} {t("admin.of")} {filteredDocuments.length} {t("admin.documents")}
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                            <button
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                            >
                                <span className="sr-only">{t("previous")}</span>
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
                                <span className="sr-only">{t("admin.next")}</span>
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
                            <h2 className="text-2xl font-bold text-gray-800">{t("admin.document_details")}</h2>
                            <button onClick={handleClosePopup} className="text-gray-500 hover:text-gray-700">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <InfoItem icon={<FileText className="w-5 h-5" />} label={t("admin.title")} value={selectedDocument.intitule} />
                            <InfoItem icon={<FileText className="w-5 h-5" />} label={t("admin.document_type")} value={selectedDocument.typeDocument} />
                            <InfoItem icon={<FileText className="w-5 h-5" />} label={t("admin.obtention_year")} value={new Date(selectedDocument.anneeObtention).toLocaleDateString()} />

                            {selectedDocument.demandeur && (
                                <>
                                    <h3 className="text-lg font-semibold text-gray-800 mt-6">{t("admin.demandeur_info")}</h3>
                                    <InfoItem icon={<User className="w-5 h-5" />} label={t("admin.name")} value={selectedDocument.demandeur.name} />
                                    <InfoItem icon={<User className="w-5 h-5" />} label={t("admin.residence_country")} value={selectedDocument.demandeur.paysResidence} />
                                    <InfoItem icon={<User className="w-5 h-5" />} label={t("admin.phone")} value={selectedDocument.demandeur.phone} />
                                </>
                            )}

                            {selectedDocument.institut && (
                                <>
                                    <h3 className="text-lg font-semibold text-gray-800 mt-6">{t("admin.associated_institut")}</h3>
                                    <InfoItem icon={<Building className="w-5 h-5" />} label={t("admin.name")} value={selectedDocument.institut.name} />
                                    <InfoItem icon={<Building className="w-5 h-5" />} label={t("admin.email")} value={selectedDocument.institut.email} />
                                    <InfoItem icon={<Building className="w-5 h-5" />} label={t("admin.phone")} value={selectedDocument.institut.phone} />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const InfoItem = ({ icon, label, value }) => (
    <div className="flex items-center space-x-3">
        <div className="flex-shrink-0 text-gray-400">{icon}</div>
        <div>
            <p className="text-sm font-medium text-gray-500">{label}</p>
            <p className="text-sm text-gray-900">{value || "N/A"}</p>
        </div>
    </div>
);

export default DocumentListe;
