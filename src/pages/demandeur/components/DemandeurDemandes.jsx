import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { AdminBreadcrumb } from "@/components";
import { getDemande, getDemandesByDemandeur } from "../../../services/demandeService";
import { Calendar, Award, CheckCircle, Building, Mail, Phone, MapPin, User, PlusCircle, Loader, AlertCircle } from "lucide-react";
import { useAuthContext } from "@/context";
import { LuUpload, LuSearch, LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { cn } from "@/utils";
import { useTranslation } from "react-i18next";

const DemandeurDemandes = () => {
    const { t } = useTranslation();

    const { isAuthenticated, role, session, demandeur } = useAuthContext();
    const [demandes, setDemandes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);


    useEffect(() => {
        const fetchDemande = async () => {
            try {
                const data = await getDemandesByDemandeur(demandeur.id);
                setDemandes(data);
                // //console.log(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDemande();
    }, [demandeur]);


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

    const filteredDemandes = demandes.filter(demande =>
        demande.intitule.toLowerCase().includes(filter.toLowerCase()) ||
        demande.institut.name.toLowerCase().includes(filter.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredDemandes.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">

                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                    <h4 className="text-xl font-semibold text-gray-800 uppercase">{t("demandeur.Liste des Demandes")}</h4>
                    <div className="flex space-x-4">
                        <Link
                            to="/demandeur/nouvelle-demande"
                            className="inline-flex items-center gap-x-1.5 rounded-full bg-blueLogo px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-rougeLogo"
                        >
                            <PlusCircle className="h-5 w-5" />
                            {t("demandeur.Nouvelle Demande")}
                        </Link>
                    </div>
                </div>

                <div className="p-6">
                    <div className="flex mb-4">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder={t("demandeur.Rechercher par intitulé ou demandeur...")}
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                            <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("demandeur.Intitulé")}</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("demandeur.Institut")}</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('demandeur.Institut Demandeur')}</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("demandeur.Date de Demande")}</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("demandeur.Résultat")}</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("demandeur.Actions")}</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {currentItems.map((demande) => (
                                    <tr key={demande.id} className="hover:bg-gray-50 transition-colors duration-200">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{demande.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{demande.intitule}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {demande.institut ? (
                                                <Link
                                                    to={`/demandeur/institut/${demande.institut.id}/details`}
                                                    className="text-primary hover:text-primary-700 transition-colors duration-200"
                                                >
                                                    {demande.institut.name}
                                                </Link>
                                            ) : (
                                                demande.nameInstitut
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {demande.institutDemandeur ? (
                                                <Link
                                                    to={`/demandeur/institut/${demande.institutDemandeur.id}/details`}
                                                    className="text-primary hover:text-primary-700 transition-colors duration-200"
                                                >
                                                    {demande.institutDemandeur.name}
                                                </Link>
                                            ) : (
                                                <p className="text-gray-500">{t("demandeur.Inconnue")}</p>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(demande.dateDemande).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={cn(
                                                    "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                                                    demande.resultat === "Accepted" ? "bg-green-100 text-green-800" :
                                                        demande.resultat === "Declined" ? "bg-red-100 text-red-800" :
                                                            demande.resultat === "Pending" ? "bg-yellow-100 text-yellow-800" :
                                                                "bg-gray-100 text-gray-800"
                                                )}
                                            >
                                                {t(`demandeur.${demande.resultat}`)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <Link
                                                to={`/demandeur/demande/${demande.id}/details`}
                                                className="text-primary hover:text-primary-700 transition-colors duration-200"
                                            >
                                                {t('demandeur.Détails')}
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <div className="text-sm text-gray-700">
                            {/* Affichage de {indexOfFirstItem + 1} à {Math.min(indexOfLastItem, filteredDemandes.length)} sur {filteredDemandes.length} entrées */}

                            {t("demandeur.showing_entries", { first: indexOfFirstItem + 1, last: Math.min(indexOfLastItem, filteredDemandes.length), total: filteredDemandes.length })}
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={cn(
                                    "px-3 py-1 rounded-md",
                                    currentPage === 1 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-50"
                                )}
                            >
                                <LuChevronLeft className="h-5 w-5" />
                            </button>
                            {Array.from({ length: Math.ceil(filteredDemandes.length / itemsPerPage) }).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => paginate(index + 1)}
                                    className={cn(
                                        "px-3 py-1 rounded-md",
                                        currentPage === index + 1 ? "bg-primary text-white" : "bg-white text-gray-700 hover:bg-gray-50"
                                    )}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === Math.ceil(filteredDemandes.length / itemsPerPage)}
                                className={cn(
                                    "px-3 py-1 rounded-md",
                                    currentPage === Math.ceil(filteredDemandes.length / itemsPerPage) ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-50"
                                )}
                            >
                                <LuChevronRight className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default DemandeurDemandes;