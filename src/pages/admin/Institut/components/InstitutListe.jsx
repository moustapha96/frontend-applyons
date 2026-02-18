'use client'
import React, { useState, useEffect } from "react";
import { LuUpload, LuSearch, LuChevronLeft, LuChevronRight, LuFile, LuToggleRight, LuToggleLeft, LuUsers, LuWatch, LuWallet } from "react-icons/lu";
import { Link } from "react-router-dom";
import { getInstatutPartageDocumnent, getInstituts, getListeInstituts } from "../../../../services/institutService";
import { cn } from "@/utils";
import avatar1 from "@/assets/images/avatars/avatar.png";
import { setCompteEnable } from "../../../../services/userService";
import { toast } from "sonner";
import { useTranslation } from 'react-i18next';

const InstitutListe = ({ setSelectedInstitut }) => {
    const { t } = useTranslation();
    const [instituts, setInstituts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedInstitutSubscribers, setSelectedInstitutSubscribers] = useState(null);
    const [showSubscribersPopup, setShowSubscribersPopup] = useState(false);

    useEffect(() => {
        fetchInstituts();
    }, []);

    const fetchInstituts = async () => {
        try {
            const data = await getInstatutPartageDocumnent();
            //console.log(data);
            setInstituts(data);
        } catch (err) {
            setError(t("admin.error_loading_instituts"));
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="flex justify-center items-center h-screen">{t("admin.loading_instituts")}</div>;
    if (error) return <div className="flex justify-center items-center h-screen text-red-500">{t("admin.error")}: {error}</div>;

    const filteredInstituts = instituts.filter(institut =>
        institut.name.toLowerCase().includes(filter.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredInstituts.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleOpenPopup = (institut) => {
        setSelectedInstitut(institut);
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setSelectedInstitut(null);
    };

    const handleStatusChange = async (clientId, newStatus) => {
        if (!window.confirm(t("admin.confirm_status_change"))) {
            return;
        }
        const res = await setCompteEnable(clientId, newStatus);
        // //console.log(res);
        if (res) {
            toast.success(res);
            fetchInstituts();
        }
        // //console.log(`Disable client ${clientId}`);
    };



    return (
        <>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                    <h4 className="text-xl font-semibold text-gray-800 uppercase">{t("admin.institut_list")}</h4>
                </div>

                <div className="p-6">
                    <div className="flex mb-4">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder={t("admin.search_placeholder")}
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
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("admin.name")}</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("admin.type")}</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("admin.residence_country")}</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("admin.number_of_requests")}</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("admin.account")}</th>
                                    {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("admin.subscribers")}</th> */}
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("admin.actions")}</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {currentItems.map((institut) => (
                                    <tr key={institut.id} className="hover:bg-gray-50 transition-colors duration-200">
                                        <td className="text-gray-900">
                                            <img className="inline-block size-9 rounded-full" src={institut && institut.compte.avatar ? `data:image/jpeg;base64,${institut.compte.avatar}` : avatar1} />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{institut.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{institut.type}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{institut.pays_residence}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Link
                                                to={`/admin/institut/${institut.id}/demandes`}
                                                className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                                            >
                                                <LuFile className="mr-1.5 h-4 w-4" />
                                                {institut.demandes && institut.demandes.length} {t("admin.requests")}
                                            </Link>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <button
                                                onClick={() => handleStatusChange(institut.compte.id, institut.compte.enabled ? "inactif" : "actif")}
                                                className={`inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded ${institut.compte.enabled
                                                    ? 'text-green-700 bg-green-100 hover:bg-green-200'
                                                    : 'text-red-700 bg-red-100 hover:bg-red-200'
                                                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
                                            >
                                                {institut.compte.enabled ? (
                                                    <>
                                                        <LuToggleRight className="mr-1.5 h-4 w-4" />
                                                        {t("admin.active")}
                                                    </>
                                                ) : (
                                                    <>
                                                        <LuToggleLeft className="mr-1.5 h-4 w-4" />
                                                        {t("admin.inactive")}
                                                    </>
                                                )}
                                            </button>
                                        </td>

                                        {/* <td className="px-6 py-4 whitespace-nowrap">
                                            <Link
                                                to={`/admin/institut/${institut.id}/abonnements`}
                                                className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                                            >
                                                <LuWallet className="mr-1.5 h-4 w-4" />
                                                {t("admin.subscribers")}
                                            </Link>


                                        </td> */}

                                        <td className="px-6 py-4 whitespace-nowrap items-center text-sm font-medium space-x-2">
                                            <Link
                                                to={`/admin/institut/${institut.id}/details`}
                                                className="text-primary-600 hover:text-primary-900 transition-colors duration-200 mr-2"
                                            >
                                                {t("admin.details")}
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <div className="text-sm text-gray-700">
                            {t("admin.showing")} {indexOfFirstItem + 1} {t("admin.to")} {Math.min(indexOfLastItem, filteredInstituts.length)} {t("admin.of")} {filteredInstituts.length} {t("admin.entries")}
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
                            {Array.from({ length: Math.ceil(filteredInstituts.length / itemsPerPage) }).map((_, index) => (
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
                                disabled={currentPage === Math.ceil(filteredInstituts.length / itemsPerPage)}
                                className={cn(
                                    "px-3 py-1 rounded-md",
                                    currentPage === Math.ceil(filteredInstituts.length / itemsPerPage) ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-50"
                                )}
                            >
                                <LuChevronRight className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-xl">
                        <h2 className="text-xl font-bold mb-4">{t("admin.institut_documents")}</h2>
                        {/* Add your document list here */}
                        <button
                            onClick={handleClosePopup}
                            className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-700"
                        >
                            {t("admin.close")}
                        </button>
                    </div>
                </div>
            )}


        </>
    );
};

export default InstitutListe;
