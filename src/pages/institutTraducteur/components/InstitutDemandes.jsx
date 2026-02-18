

import { useAuthContext } from "../../../context/useAuthContext";
import { LuUpload, LuSearch, LuChevronLeft, LuChevronRight, LuFile } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { cn } from "@/utils";
import { getDemandesByInstitut } from "../../../services/demandeService";
import InstitutBreadcrumb from "../../../components/InstitutBreadcrumb";
import { useTranslation } from "react-i18next";
import { Loader } from "lucide-react";

const institut = () => {
    const { t } = useTranslation();
    const { saveSession, role, institut } = useAuthContext();
    const [demandes, setDemandes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    useEffect(() => {
        const fetchDemandes = async () => {
            try {
                const data = await getDemandesByInstitut(institut.id);
                //console.log(data)
                setDemandes(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchDemandes();
    }, []);


    if (loading)
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="flex flex-col items-center">
                    <Loader className="h-8 w-8 text-blueLogo animate-spin mb-2" />
                    <p className="text-gray-700 font-medium text-lg">{t("common.loading")}</p>
                    <p className="text-gray-500 text-sm mt-2">{t("institut.loadingMessage")}</p>

                </div>
            </div>
        )


    if (error) return <div className="flex justify-center items-center h-screen text-red-500">{t("institut.errorMessage")}{error}</div>;

    const filteredDemandes = demandes.filter(demande =>
        demande.intitule.toLowerCase().includes(filter.toLowerCase()) ||
        demande.demandeur.name.toLowerCase().includes(filter.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredDemandes.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="bg-gray-100 min-h-screen">
            <InstitutBreadcrumb title="Demandes" SubTitle={institut?.name} />
            <section>
                <div className="container">
                    <div className="my-6 space-y-6">
                        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                                <h4 className="text-xl font-semibold text-gray-800 uppercase">{t("institut.demandesList")}</h4>
                                <Link
                                    to="/institut/verification"
                                    className="inline-flex items-center gap-x-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-white transition-all duration-300 hover:bg-primary-700"
                                >
                                    <LuFile className="ms-1.5 size-4" /> {t("institut.verificationButton")}
                                </Link>
                                <Link
                                    to="/institut/authentifier"
                                    className="inline-flex items-center gap-x-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-white transition-all duration-300 hover:bg-primary-700"
                                >
                                    <LuFile className="ms-1.5 size-4" /> {t("institut.authenticateButton")}
                                </Link>
                            </div>
                            <div className="p-6">
                                <div className="flex mb-4">
                                    <div className="relative flex-1">
                                        <input
                                            type="text"
                                            placeholder={t("institut.searchPlaceholder")}
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
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("institut.id")}</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("institut.intitule")}</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("institut.demandeur")}</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("institut.dateDemande")}</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("institut.anneeObtention")}</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("institut.resultat")}</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("institut.actions")}</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {currentItems.map((demande) => (
                                                <tr key={demande.id} className="hover:bg-gray-50 transition-colors duration-200">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{demande.id}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{demande.intitule}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{demande.demandeur.name}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {new Date(demande.dateDemande).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{demande.anneeObtention}</td>
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
                                                            {t(`institut.${demande.resultat.toLowerCase()}`)}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex justify-between gap-4">
                                                        {demande.resultat === "Pending" && (
                                                            <Link
                                                                to={`/institut/authentifier/${demande.id}/demande`}
                                                                className="text-rougeLogo hover:bg-rougeLogo hover:text-white transition-colors duration-200 border-2 border-rougeLogo rounded-md px-2 py-1"
                                                            >
                                                                {t("institut.authentifier")}
                                                            </Link>
                                                        )}
                                                        <Link
                                                            to={`/institut/demande/${demande.id}/details`}
                                                            className="text-primary hover:text-white hover:bg-blueLogo transition-colors duration-200 border-2 border-blueLogo rounded-md px-2 py-1"
                                                        >
                                                            {t("institut.details")}
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="flex items-center justify-between mt-4">
                                    <div className="text-sm text-gray-700">
                                        {t("institut.showingEntries", {
                                            first: indexOfFirstItem + 1,
                                            last: Math.min(indexOfLastItem, filteredDemandes.length),
                                            total: filteredDemandes.length
                                        })}
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
                </div>
            </section>
        </div>
    );
}

export default institut;
