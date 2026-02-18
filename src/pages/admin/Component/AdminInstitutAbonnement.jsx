import { useAuthContext } from "../../../context/useAuthContext";
import { LuChevronLeft, LuChevronRight, LuFile, LuListMinus } from "react-icons/lu";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { cn } from "@/utils";
import { getAbonnementsByInstitut } from "../../../services/abonnementService";
import AdminBreadcrumb from "../../../components/AdminBreadcrumb";
import { useTranslation } from "react-i18next";
import { getInstitut } from "../../../services/institutService";
import { Spin } from "antd";
const AdminInstitutAbonnement = () => {
    const { id } = useParams();
    // //console.log(id)
    const [institut, setInstitut] = useState(null);
    const [abonnements, setAbonnements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchInstitut = async () => {
            try {
                const data = await getInstitut(id);
                setInstitut(data);
                // //console.log(data)
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        if (id) {
            fetchInstitut();
        }

    }, [id]);


    useEffect(() => {
        const fetchAbonnements = async () => {
            try {
                const data = await getAbonnementsByInstitut(institut.id);
                //console.log("liste institut", data)
                setAbonnements(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (institut) {
            fetchAbonnements();
        }
    }, [institut]);




    if (loading) {
        // return (
        //     <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px" }}>
        //         <Spin size="large" tip={t("common.loading")} />
        //     </div>
        // )
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px", color: "#000" }}>
                <Spin size="large" tip={t("common.loading")}  >
                    <div style={{ minHeight: "80px" }} />
                </Spin>
            </div>
        )

    }

    if (error) {
        return <Alert message="Erreur" description={error} type="error" showIcon />
    }


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
            <AdminBreadcrumb title={t('admin.institutAbonnement.subscriptions')} SubTitle={institut?.name} />

            <section>
                <div className="container">
                    <div className="my-6 space-y-6">
                        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                                <h4 className="text-xl font-semibold text-gray-800 uppercase"> {t('admin.institutAbonnement.subscriptionList')}</h4>
                                <Link
                                    to={`/admin/institut/${id}/nouvel-abonnement`}
                                    className="inline-flex items-center gap-x-1.5 rounded-full bg-blueLogo px-3 py-1.5 text-xs font-medium text-white transition-all duration-300 hover:bg-primary-700"
                                >
                                    <LuFile className="ms-1.5 size-4" /> {t('admin.institutAbonnement.addSubscription')}
                                </Link>

                            </div>
                            <div className="p-6">
                                <div className="flex mb-4">
                                    <div className="relative flex-1">
                                        <input
                                            type="text"
                                            placeholder={t('admin.institutAbonnement.searchPlaceholder')}
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
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('institutAbonnement.institut')}</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('institutAbonnement.startDate')}</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('institutAbonnement.endDate')}</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('institutAbonnement.amount')}</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('institutAbonnement.status')}</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {currentItems.map((abonnement) => (
                                                <tr key={abonnement.id} className="hover:bg-gray-50 transition-colors duration-200">
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
                                                            {getAbonnementStatus(abonnement)}
                                                        </span>
                                                    </td>
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

export default AdminInstitutAbonnement;
