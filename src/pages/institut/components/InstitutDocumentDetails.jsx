
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDocumentById, getFileDocument } from "../../../services/documentService";
import { AdminBreadcrumb } from "@/components";
import { FileText, Calendar, Award, CheckCircle, Building, Mail, Phone, MapPin, User, Key, Loader } from "lucide-react";
import { CopyableField } from "../../../utils/CopyableField";
import { useTranslation } from "react-i18next";
import InstitutBreadcrumb from "@/components/InstitutBreadcrumb";

const institut = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const [document, setDocument] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [fichier, setFichier] = useState(null);

    useEffect(() => {
        const fetchDocument = async () => {
            try {
                const data = await getDocumentById(id);
                // //console.log("response data ", response);
                setDocument(data);
                const response = await getFileDocument(id);
                // //console.log("response file ", response);
                setFichier(response);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDocument();
    }, [id]);

    if (loading)
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="flex flex-col items-center">
                    <Loader className="h-8 w-8 text-blueLogo animate-spin mb-2" />
                    <p className="text-gray-700 font-medium text-lg">{t("common.loading")}</p>
                    <p className="text-gray-700 font-medium text-sm">{t("institut.loadingMessage")}</p>

                </div>
            </div>
        )
    if (error) return <div className="flex justify-center items-center h-screen text-red-600">{t("institut.errorMessage")}{error}</div>;

    return (
        <>
            <InstitutBreadcrumb title={t("institut.documentTitle")} />
            <section>
                <div className="container">
                    <div className="my-6 space-y-6">
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div className="p-6 sm:p-10">
                                <h1 className="text-3xl font-bold text-gray-800 mb-6">{document.intitule}</h1>
                                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                    <InfoCard title={t("institut.documentTitle")} icon={<FileText className="w-6 h-6 text-blue-500" />}>
                                        <CopyableField icon={<FileText className="w-5 h-5" />} label={t("institut.codeAdn")} value={document.codeAdn} />
                                        <InfoItem icon={<FileText className="w-5 h-5" />} label={t("institut.typeDocument")} value={document.typeDocument} />
                                        <InfoItem icon={<Calendar className="w-5 h-5" />} label={t("institut.dateObtention")} value={new Date(document.dateObtention).toLocaleDateString()} />
                                        <InfoItem icon={<Award className="w-5 h-5" />} label={t("institut.anneeObtention")} value={document.anneeObtention} />
                                        <InfoItem icon={<CheckCircle className="w-5 h-5" />} label={t("institut.statut")} value={document.statut} />
                                    </InfoCard>

                                    {document.demande.institutDemandeur && (
                                        <InfoCard title={t("institut.institutDemandeur")} icon={<Building className="w-6 h-6 text-blue-500" />}>
                                            <InfoItem icon={<Building className="w-5 h-5" />} label={t("institut.nom")} value={document.demande.institutDemandeur.name} />
                                            <InfoItem icon={<Mail className="w-5 h-5" />} label={t("institut.email")} value={document.demande.institutDemandeur.email} />
                                            <InfoItem icon={<Phone className="w-5 h-5" />} label={t("institut.telephone")} value={document.demande.institutDemandeur.phone} />
                                            <InfoItem icon={<MapPin className="w-5 h-5" />} label={t("institut.adresse")} value={document.demande.institutDemandeur.adresse} />
                                            <InfoItem icon={<MapPin className="w-5 h-5" />} label={t("institut.pays")} value={document.demande.institutDemandeur.paysResidence} />
                                        </InfoCard>
                                    )}

                                    {document.demande.demandeur && (
                                        <InfoCard title={t("institut.demandeur")} icon={<User className="w-6 h-6 text-blue-500" />}>
                                            <InfoItem icon={<User className="w-5 h-5" />} label={t("institut.nom")} value={document.demande.demandeur.name} />
                                            <InfoItem icon={<Phone className="w-5 h-5" />} label={t("institut.telephone")} value={document.demande.demandeur.phone} />
                                            <InfoItem icon={<Mail className="w-5 h-5" />} label={t("institut.email")} value={document.demande.demandeur.email} />
                                            <InfoItem icon={<MapPin className="w-5 h-5" />} label={t("institut.adresse")} value={document.demande.demandeur.adresse} />
                                            <InfoItem icon={<MapPin className="w-5 h-5" />} label={t("institut.paysResidence")} value={document.demande.demandeur.paysResidence} />

                                            <CopyableField icon={<Key className="w-5 h-5" />} label={t("demandeur.codeUser")} value={document.demande.demandeur.codeUser} />
                                        </InfoCard>
                                    )}
                                </div>

                                {fichier && (
                                    <div className="mt-8">
                                        <h2 className="text-2xl font-bold text-gray-800 mb-4">{t("institut.documentPreview")}</h2>
                                        <div className="bg-gray-200 rounded-lg p-4">
                                            <iframe
                                                src={`data:application/pdf;base64,${fichier}`}
                                                width="100%"
                                                height="600px"
                                                title="Document PDF"
                                                className="border rounded"
                                                onLoad={(e) => {
                                                    e.target.contentWindow.document.body.addEventListener('contextmenu', (event) => event.preventDefault());
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

const InfoCard = ({ title, icon, children }) => (
    <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center mb-4">
            {icon}
            <h3 className="text-xl font-semibold text-gray-800 ml-2">{title}</h3>
        </div>
        <div className="space-y-3">
            {children}
        </div>
    </div>
);

const InfoItem = ({ icon, label, value }) => (
    <div className="flex items-center space-x-3">
        <div className="flex-shrink-0 text-blue-500">{icon}</div>
        <div>
            <p className="text-sm font-medium text-gray-500">{label}</p>
            <p className="text-sm text-gray-800">{value || "N/A"}</p>
        </div>
    </div>
);

export default institut;
