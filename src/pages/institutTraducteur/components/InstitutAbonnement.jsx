import { useAuthContext } from "../../../context/useAuthContext";
import { LuChevronLeft, LuChevronRight, LuFile, LuListMinus } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { cn } from "@/utils";
import { getAbonnementsByInstitut } from "../../../services/abonnementService";
import InstitutBreadcrumb from "../../../components/InstitutBreadcrumb";
import { useTranslation } from "react-i18next";
import { Loader } from "lucide-react";
import { Button } from "antd";

const InstitutAbonnement = () => {
    const { institut } = useAuthContext();
    const [abonnements, setAbonnements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchAbonnements = async () => {
            try {
                const data = await getAbonnementsByInstitut(institut.id);
                //console.log(data)
                setAbonnements(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchAbonnements();
    }, [institut.id]);


    if (loading)
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="flex flex-col items-center">
                    <Loader className="h-8 w-8 text-blueLogo animate-spin mb-2" />
                    <p className="text-gray-700 font-medium text-lg">{t("common.loading")}</p>

                </div>
            </div>
        )

    if (error) return <div className="flex justify-center items-center h-screen text-red-500">Erreur: {error}</div>;

    const filteredAbonnements = abonnements.filter(abonnement =>
        abonnement.dateDebut.toLowerCase().includes(filter.toLowerCase()) ||
        abonnement.montant.toString().includes(filter.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredAbonnements.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Fonction pour déterminer l'état de validité
    const getAbonnementStatus = (abonnement) => {
        const today = new Date();
        const expirationDate = new Date(abonnement.dateExpiration);

        return expirationDate >= today ? "En cours de validité" : "Expiré";
    };

    return (

        <div className="bg-gray-100 min-h-screen">
            <InstitutBreadcrumb title={t('institutAbonnement.subscriptions')} SubTitle={institut?.name} />

            <section>
                <div className="container">
                    <div className="my-6 space-y-6">
                        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                                <h4 className="text-xl font-semibold text-gray-800 uppercase"> {t('institutAbonnement.subscriptionList')}</h4>


                                <Link
                                    to="/institut/nouvel-abonnement"
                                    className="inline-flex items-center gap-x-1.5 rounded-full bg-blueLogo px-3 py-1.5 text-xs font-medium text-white transition-all duration-300 hover:bg-primary-700"
                                >
                                    <LuFile className="ms-1.5 size-4" /> {t('institutAbonnement.addSubscription')}
                                </Link>

                            </div>

                            <div className="p-6">
                                <div className="flex mb-4">
                                    <div className="relative flex-1">
                                        <input
                                            type="text"
                                            placeholder={t('institutAbonnement.searchPlaceholder')}
                                            value={filter}
                                            onChange={(e) => setFilter(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('institutAbonnement.institut')}</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('institutAbonnement.startDate')}</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('institutAbonnement.endDate')}</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('institutAbonnement.amount')}</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('institutAbonnement.status')}</th>
                                                {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th> */}
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {currentItems.map((abonnement) => (
                                                <tr key={abonnement.id} className="hover:bg-gray-50 transition-colors duration-200">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{abonnement.id}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{abonnement.institut.name}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {new Date(abonnement.dateDebut).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {new Date(abonnement.dateExpiration).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${abonnement.montant}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span
                                                            className={cn(
                                                                "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                                                                getAbonnementStatus(abonnement) === "En cours de validité"
                                                                    ? "bg-green-100 text-green-800"
                                                                    : "bg-red-100 text-red-800"
                                                            )}
                                                        >
                                                            {t('institutAbonnement.' + getAbonnementStatus(abonnement))}
                                                        </span>
                                                    </td>
                                                    {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <Link
                                                            to={`/institut/abonnement/${abonnement.id}/details`}
                                                            className="text-primary hover:text-primary-700 transition-colors duration-200"
                                                        >
                                                            Détails
                                                        </Link>
                                                    </td> */}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="flex items-center justify-between mt-4">
                                    <div className="text-sm text-gray-700">
                                        {/* Affichage de {indexOfFirstItem + 1} à {Math.min(indexOfLastItem, filteredAbonnements.length)} sur {filteredAbonnements.length} entrées */}

                                        {t('institut.showingEntries', { first: indexOfFirstItem + 1, last: Math.min(indexOfLastItem, filteredAbonnements.length), total: filteredAbonnements.length })}
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
                                        {Array.from({ length: Math.ceil(filteredAbonnements.length / itemsPerPage) }).map((_, index) => (
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
                                            disabled={currentPage === Math.ceil(filteredAbonnements.length / itemsPerPage)}
                                            className={cn(
                                                "px-3 py-1 rounded-md",
                                                currentPage === Math.ceil(filteredAbonnements.length / itemsPerPage) ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-50"
                                            )}
                                        >
                                            <LuChevronRight className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>

    );
}

export default InstitutAbonnement;
