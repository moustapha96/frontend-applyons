import React, { useState, useEffect } from "react";
import { AdminBreadcrumb } from "@/components";
import { getInstitut } from "../../../services/institutService";
import { Link, useParams } from "react-router-dom";
import { getFileDocument } from "../../../services/documentService";
import { useTranslation } from 'react-i18next';

const DocumentInstitut = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const [institut, setInstitut] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [documents, setDocuments] = useState(null);
    const [filter, setFilter] = useState(""); // État pour le filtre


    useEffect(() => {
        const fetchDocument = async () => {
            try {
                const data = await getInstitut(id);
                setInstitut(data);
                setDocuments(data.documents);
                // //console.log(data);
            } catch (err) {
                setError(t("error_loading_documents"));
            } finally {
                setLoading(false);
            }
        };

        fetchDocument();
    }, [id, t]);


    if (loading) return <div>{t("loading_documents")}</div>;
    if (error) return <div>{t("error")}: {error}</div>;

    // Filtrer les documents en fonction du texte saisi
    const filteredDocuments = documents.filter(document =>
        document.intitule.toLowerCase().includes(filter.toLowerCase())
    );

    const handleOpenDocument = async (document) => {
        //console.log(document);
        try {
            const file = await getFileDocument(document.id);
            //console.log(file);
        } catch (error) {
            //console.log(error);
        }
    };

    return (
        <>
            <AdminBreadcrumb title={t("document_institut")} />
            <section>
                <div className="container">
                    <div className="my-6 space-y-6">
                        {/* Champ de filtre */}
                        <div className="px-4 py-2">
                            <input
                                type="text"
                                placeholder={t("admin.search_placeholder")}
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="w-full rounded-md border border-default-300 px-3 py-2"
                            />
                        </div>

                        <div className="overflow-auto">
                            <div className="inline-block min-w-full align-middle">
                                <div className="overflow-hidden">
                                    <table className="min-w-full divide-y divide-default-200">
                                        <thead>
                                            <tr className="bg-default-100">
                                                <th
                                                    scope="col"
                                                    className="px-4 py-4 text-start text-sm font-semibold text-default-900"
                                                >
                                                    {t("admin.dna_code")}
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-4 text-start text-sm font-semibold text-default-900"
                                                >
                                                    {t("admin.title")}
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-4 text-start text-sm font-semibold text-default-900"
                                                >
                                                    {t("admin.document_type")}
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-4 text-start text-sm font-semibold text-default-900"
                                                >
                                                    {t("admin.obtention_year")}
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-4 text-start text-sm font-semibold text-default-900"
                                                >
                                                    {t("admin.demandeur")}
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-4 text-start text-sm font-semibold text-default-900"
                                                >
                                                    {t("admin.actions")}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-default-200">
                                            {filteredDocuments.map((document) => (
                                                <tr key={document.id} className="hover:bg-default-100">
                                                    <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-default-600">
                                                        {document.codeAdn}
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-4 text-sm text-default-600">
                                                        {document.intitule}
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-4 text-sm text-default-600">
                                                        {document.typeDocument}
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-4 text-sm text-default-600">
                                                        {new Date(document.anneeObtention).toLocaleDateString()} {/* Formatage de la date */}
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-4 text-sm text-default-600">
                                                        {/* Afficher le nom du demandeur */}
                                                        {document.demandeur ? document.demandeur.name : t("admin.unknown")}
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-4 text-sm text-default-600">
                                                        {/* Bouton pour voir les détails */}
                                                        <button
                                                            onClick={() => handleOpenDocument(document)}
                                                            className="inline-flex items-center gap-x-2 rounded-full bg-blueLogo px-3 py-2 text-xs font-medium text-white transition-all duration-300 hover:bg-blue-700"
                                                        >
                                                            {t("admin.document")}
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default DocumentInstitut;
