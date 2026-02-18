

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { AdminBreadcrumb } from "@/components";
import { getDemande } from "../../../services/demandeService";
import { Calendar, Award, CheckCircle, Building, Mail, Phone, MapPin, User, FileText, Clock, Link as LinkIcon, Key, Loader } from "lucide-react";
import { getFileDocument } from "../../../services/documentService";
import { CopyableField } from "../../../utils/CopyableField";
import { useTranslation } from "react-i18next";

const institut = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const [demande, setDemande] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [fichier, setFichier] = useState(null);

    useEffect(() => {
        const fetchDemande = async () => {
            try {
                const data = await getDemande(id);
                setDemande(data);
                //console.log(data);

                if (data.document) {
                    const response = await getFileDocument(data.document.id);
                    setFichier(response);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDemande();
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
    if (!demande) return <div className="flex justify-center items-center h-screen text-red-600">{t("institut.noDataFound")}</div>;

    return (
        <>
            <AdminBreadcrumb title={t("institut.demandeTitle")} />
            <section>
                <div className="container">
                    <div className="my-6 space-y-6">
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div className="p-6 sm:p-10">
                                <h1 className="text-3xl font-bold text-gray-800 mb-6">{demande.intitule}</h1>
                                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                    <InfoCard title={t("institut.demandeInfo")}>
                                        <InfoItem icon={<Calendar className="w-5 h-5" />} label={t("institut.dateDemande")} value={new Date(demande.dateDemande).toLocaleDateString()} />
                                        <InfoItem icon={<Award className="w-5 h-5" />} label={t("institut.anneeObtention")} value={demande.anneeObtention} />
                                        <InfoItem icon={<CheckCircle className="w-5 h-5" />} label={t("institut.resultat")} value={t(`institut.${demande.resultat.toLowerCase()}`)} />
                                        {demande.typeAuth && <InfoItem icon={<CheckCircle className="w-5 h-5" />} label={t("institut.typeAuth")} value={t(`institut.${demande.typeAuth}`)} />}
                                    </InfoCard>
                                    {demande.typeAuth === "AUTH_SIMPLE" && (
                                        <InfoCard title={t("institut.institutDemandeur")}>
                                            <InfoItem icon={<Building className="w-5 h-5" />} label={t("institut.nom")} value={demande.institutDemandeur?.name || demande.nameInstitut} />
                                            <InfoItem icon={<Mail className="w-5 h-5" />} label={t("institut.email")} value={demande.institutDemandeur?.email || demande.emailInstitut} />
                                            <InfoItem icon={<Phone className="w-5 h-5" />} label={t("institut.telephone")} value={demande.institutDemandeur?.phone || demande.phoneInstitut} />
                                            <InfoItem icon={<MapPin className="w-5 h-5" />} label={t("institut.adresse")} value={demande.institutDemandeur?.adresse || demande.adresseInstitut} />
                                            <InfoItem icon={<MapPin className="w-5 h-5" />} label={t("institut.pays")} value={demande.institutDemandeur?.paysResidence || demande.paysInstitut} />
                                        </InfoCard>
                                    )}

                                    <InfoCard title={t("institut.demandeur")}>
                                        <InfoItem icon={<User className="w-5 h-5" />} label={t("institut.nom")} value={demande.demandeur.name} />
                                        <InfoItem icon={<Phone className="w-5 h-5" />} label={t("institut.telephone")} value={demande.demandeur.phone} />
                                        <InfoItem icon={<Mail className="w-5 h-5" />} label={t("institut.email")} value={demande.demandeur.email} />
                                        <InfoItem icon={<MapPin className="w-5 h-5" />} label={t("institut.adresse")} value={demande.demandeur.adresse} />
                                        <InfoItem icon={<MapPin className="w-5 h-5" />} label={t("institut.paysResidence")} value={demande.demandeur.paysResidence} />
                                        <CopyableField icon={<Key className="w-5 h-5" />} label={t("demandeur.codeUser")} value={demande.demandeur.codeUser} />

                                    </InfoCard>

                                    {demande.document && (
                                        <InfoCard title={t("institut.document")}>
                                            <InfoItem icon={<FileText className="w-5 h-5" />} label={t("institut.typeDocument")} value={demande.document.typeDocument} />
                                            <InfoItem icon={<Clock className="w-5 h-5" />} label={t("institut.dateObtention")} value={new Date(demande.document.dateObtention).toLocaleDateString()} />
                                            <InfoItem icon={<Award className="w-5 h-5" />} label={t("institut.anneeObtention")} value={demande.document.anneeObtention} />
                                            <InfoItem icon={<CheckCircle className="w-5 h-5" />} label={t("institut.statut")} value={demande.document.statut} />
                                            <CopyableField icon={<FileText className="w-5 h-5" />} label={t("institut.codeAdn")} value={demande.document.codeAdn} />
                                        </InfoCard>
                                    )}
                                </div>
                                <div>
                                    {fichier && (
                                        <>
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
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

const InfoCard = ({ title, children }) => (
    <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
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
