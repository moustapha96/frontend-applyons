import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { AdminBreadcrumb } from "@/components";
import { getDemande } from "../../../services/demandeService";
import { Calendar, Award, CheckCircle, Building, Mail, Phone, MapPin, User, FileText, Clock, Link as LinkIcon } from "lucide-react";
import { getFileDocument } from "../../../services/documentService";


const InstitutAbonnementDetails = () => {
    const { id } = useParams();
    const [abonnement, setAbonnement] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAbonnement = async () => {
            try {
                const data = await getAboonnement(id);
                setAbonnement(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAbonnement();
    }, [id]);

    if (loading) return <div className="flex justify-center items-center h-screen">Chargement des détails de l'abonnement...</div>;
    if (error) return <div className="flex justify-center items-center h-screen text-red-600">Erreur: {error}</div>;
    if (!abonnement) return <div className="flex justify-center items-center h-screen text-red-600">Aucune donnée trouvée</div>;

    return (
        <>

            <section>
                <div className="container">
                    <div className="my-6 space-y-6">
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div className="p-6 sm:p-10">
                                <h1 className="text-3xl font-bold text-gray-800 mb-6">{abonnement.id}</h1>
                                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                    <InfoCard title="Informations sur la Demande">
                                        <InfoItem icon={<Calendar className="w-5 h-5" />} label="Date de Demande" value={new Date(demande.dateDemande).toLocaleDateString()} />
                                        <InfoItem icon={<Award className="w-5 h-5" />} label="Année d'Obtention" value={demande.anneeObtention} />
                                        <InfoItem icon={<CheckCircle className="w-5 h-5" />} label="Résultat" value={demande.resultat} />
                                    </InfoCard>






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

export default InstitutAbonnementDetails;