

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDocumentById, getFileDocument } from "../../../services/documentService";
import { AdminBreadcrumb } from "@/components";
import { FileText, Calendar, Award, CheckCircle, Building, Mail, Phone, MapPin, User } from "lucide-react";
import { CopyableField } from "../../../utils/CopyableField";

const DocumentCardDemandeur = ({ documents }) => {

    // const [fichier, setFichier] = useState(document.fichier);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // useEffect(() => {
    //     const fetchDocument = async () => {
    //         setLoading(true);
    //         try {
    //             const response = await getFileDocument(document.id);
    //             setFichier(response);
    //         } catch (err) {
    //             setError(err.message);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchDocument();
    // }, [document.id]);

    return (
        <>
            <section>

                <div className="">
                    <h3>Verification Result</h3>
                    {/* <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="p-6 sm:p-10">
                            <h1 className="text-3xl font-bold text-gray-800 mb-6">{document.intitule}</h1>
                            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
                                <InfoCard title="Détails du Document" icon={<FileText className="w-6 h-6 text-blue-500" />}>
                                    <CopyableField icon={<FileText className="w-5 h-5" />} label="Code ADN" value={document.codeAdn} />
                                    <InfoItem icon={<FileText className="w-5 h-5" />} label="Type de Document" value={document.typeDocument} />
                                    <InfoItem icon={<Calendar className="w-5 h-5" />} label="Date d'Obtention" value={new Date(document.dateObtention).toLocaleDateString()} />
                                    <InfoItem icon={<Award className="w-5 h-5" />} label="Année d'Obtention" value={document.anneeObtention} />
                                    <InfoItem icon={<CheckCircle className="w-5 h-5" />} label="Statut" value={document.statut} />
                                </InfoCard>

                                {document.demande.demandeur && (
                                    <InfoCard title="Demandeur" icon={<User className="w-6 h-6 text-blue-500" />}>
                                        <InfoItem icon={<User className="w-5 h-5" />} label="Nom" value={document.demande.demandeur.name} />
                                        <InfoItem icon={<Phone className="w-5 h-5" />} label="Téléphone" value={document.demande.demandeur.phone} />
                                        <InfoItem icon={<Mail className="w-5 h-5" />} label="Email" value={document.demande.demandeur.email} />
                                        <InfoItem icon={<MapPin className="w-5 h-5" />} label="Adresse" value={document.demande.demandeur.adresse} />
                                        <InfoItem icon={<MapPin className="w-5 h-5" />} label="Pays de Résidence" value={document.demande.demandeur.paysResidence} />
                                    </InfoCard>
                                )}
                            </div>

                            {loading && !fichier && <>
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
                                </div>
                            </>

                            }
                            {fichier && !loading && (
                                <>
                                    <div>
                                        <div className="mt-8 prevent-select">
                                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Document Preview</h2>
                                            <div className="bg-gray-200 rounded-lg p-4">
                                                <iframe
                                                    src={`data:application/pdf;base64,${fichier}`}
                                                    title="Document"
                                                    width="100%"
                                                    height="600px"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </>

                            )}
                        </div>
                    </div> */}
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

export default DocumentCardDemandeur;