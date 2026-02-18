// import { useState, useEffect } from "react";
// import { Link, useParams } from "react-router-dom";
// import { getInstitut } from "../../../services/institutService";
// import { Building2, Mail, Phone, Globe, MapPin, FileText, ClipboardList, Eye, ChevronLeft, ChevronRight } from "lucide-react";
// import { cn } from "@/utils";
// import DemandeurBreadcrumb from "../../../components/DemandeurBreadcrumb";


// const DemandeurInstitutDetails = () => {
//     const { id } = useParams();
//     const [institut, setInstitut] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);


//     useEffect(() => {
//         const fetchInstitut = async () => {
//             try {
//                 const data = await getInstitut(id);
//                 setInstitut(data);
//                 //console.log(data.documents)
//                 //console.log(data.demandes)
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchInstitut();
//     }, [id]);

//     if (loading) return <div className="flex justify-center items-center h-screen">Chargement des détails de l'institut...</div>;
//     if (error) return <div className="flex justify-center items-center h-screen text-red-600">Erreur: {error}</div>;

//     return (
//         <div className="bg-gray-100 min-h-screen">
//             <DemandeurBreadcrumb title="Détails Institut" SubTitle={institut?.name} />
//             <section className="container mx-auto px-4 py-8">
//                 <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
//                     <div className="p-6 sm:p-10">
//                         <h1 className="text-3xl font-bold text-gray-800 mb-6">{institut?.name}</h1>
//                         <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
//                             <InfoCard icon={<Building2 className="w-6 h-6" />} title="Type" value={institut?.type} />
//                             <InfoCard icon={<Mail className="w-6 h-6" />} title="Email" value={institut?.email} />
//                             <InfoCard icon={<Phone className="w-6 h-6" />} title="Phone" value={institut?.phone} />
//                             <InfoCard icon={<Globe className="w-6 h-6" />} title="Site Web" value={institut?.siteWeb} />
//                             <InfoCard icon={<MapPin className="w-6 h-6" />} title="Adresse" value={institut?.adresse} />
//                             <InfoCard icon={<MapPin className="w-6 h-6" />} title="Pays" value={institut?.paysResidence} />
//                         </div>
//                     </div>
//                 </div>


//             </section>
//         </div>
//     );
// };

// const InfoCard = ({ icon, title, value }) => (
//     <div className="bg-gray-50 rounded-lg p-6 flex items-start space-x-4">
//         <div className="flex-shrink-0 text-blue-500">{icon}</div>
//         <div>
//             <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
//             <p className="mt-2 text-gray-600">{value || "N/A"}</p>
//         </div>
//     </div>
// );

// const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
//     const totalPages = Math.ceil(totalItems / itemsPerPage);

//     return (
//         <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-4">
//             <div className="flex flex-1 justify-between sm:hidden">
//                 <button
//                     onClick={() => onPageChange(Math.max(1, currentPage - 1))}
//                     disabled={currentPage === 1}
//                     className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
//                 >
//                     Précédent
//                 </button>
//                 <button
//                     onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
//                     disabled={currentPage === totalPages}
//                     className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
//                 >
//                     Suivant
//                 </button>
//             </div>
//             <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
//                 <div>
//                     <p className="text-sm text-gray-700">
//                         Affichage de <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> à{" "}
//                         <span className="font-medium">{Math.min(currentPage * itemsPerPage, totalItems)}</span> sur{" "}
//                         <span className="font-medium">{totalItems}</span> résultats
//                     </p>
//                 </div>
//                 <div>
//                     <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
//                         <button
//                             onClick={() => onPageChange(Math.max(1, currentPage - 1))}
//                             disabled={currentPage === 1}
//                             className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
//                         >
//                             <span className="sr-only">Précédent</span>
//                             <ChevronLeft className="h-5 w-5" aria-hidden="true" />
//                         </button>
//                         {[...Array(totalPages).keys()].map((page) => (
//                             <button
//                                 key={page + 1}
//                                 onClick={() => onPageChange(page + 1)}
//                                 className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === page + 1
//                                     ? "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                                     : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
//                                     }`}
//                             >
//                                 {page + 1}
//                             </button>
//                         ))}
//                         <button
//                             onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
//                             disabled={currentPage === totalPages}
//                             className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
//                         >
//                             <span className="sr-only">Suivant</span>
//                             <ChevronRight className="h-5 w-5" aria-hidden="true" />
//                         </button>
//                     </nav>
//                 </div>
//             </div>
//         </div>
//     );
// };
// export default DemandeurInstitutDetails;

import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getInstitut } from "../../../services/institutService";
import { Building2, Mail, Phone, Globe, MapPin, FileText, ClipboardList, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from "@/utils";
import DemandeurBreadcrumb from "../../../components/DemandeurBreadcrumb";
import { useTranslation } from "react-i18next";

const DemandeurInstitutDetails = () => {
    const { id } = useParams();
    const [institut, setInstitut] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchInstitut = async () => {
            try {
                const data = await getInstitut(id);
                setInstitut(data);
                // //console.log(data.documents)
                // //console.log(data.demandes)
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchInstitut();
    }, [id]);

    if (loading) return <div className="flex justify-center items-center h-screen">{t('demandeur.loadingInstitutDetails')}</div>;
    if (error) return <div className="flex justify-center items-center h-screen text-red-600">{t('demandeur.error', { error })}</div>;

    return (
        <div className="bg-gray-100 min-h-screen">
            <DemandeurBreadcrumb title={t('demandeur.institutDetails')} SubTitle={institut?.name} />
            <section className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
                    <div className="p-6 sm:p-10">
                        <h1 className="text-3xl font-bold text-gray-800 mb-6">{institut?.name}</h1>
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            <InfoCard icon={<Building2 className="w-6 h-6" />} title={t('demandeur.type')} value={institut?.type} />
                            <InfoCard icon={<Mail className="w-6 h-6" />} title={t('demandeur.email')} value={institut?.email} />
                            <InfoCard icon={<Phone className="w-6 h-6" />} title={t('demandeur.phone')} value={institut?.phone} />
                            <InfoCard icon={<Globe className="w-6 h-6" />} title={t('demandeur.website')} value={institut?.siteWeb} />
                            <InfoCard icon={<MapPin className="w-6 h-6" />} title={t('demandeur.address')} value={institut?.adresse} />
                            <InfoCard icon={<MapPin className="w-6 h-6" />} title={t('demandeur.country')} value={institut?.paysResidence} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

const InfoCard = ({ icon, title, value }) => (
    <div className="bg-gray-50 rounded-lg p-6 flex items-start space-x-4">
        <div className="flex-shrink-0 text-blue-500">{icon}</div>
        <div>
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <p className="mt-2 text-gray-600">{value || "N/A"}</p>
        </div>
    </div>
);

const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const { t } = useTranslation();

    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-4">
            <div className="flex flex-1 justify-between sm:hidden">
                <button
                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    {t('demandeur.previous')}
                </button>
                <button
                    onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    {t('demandeur.next')}
                </button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        {t('demandeur.showing')} <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> {t('demandeur.to')}{" "}
                        <span className="font-medium">{Math.min(currentPage * itemsPerPage, totalItems)}</span> {t('demandeur.of')}{" "}
                        <span className="font-medium">{totalItems}</span> {t('demandeur.results')}
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <button
                            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                            <span className="sr-only">{t('demandeur.previous')}</span>
                            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                        </button>
                        {[...Array(totalPages).keys()].map((page) => (
                            <button
                                key={page + 1}
                                onClick={() => onPageChange(page + 1)}
                                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === page + 1
                                    ? "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                    }`}
                            >
                                {page + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                            <span className="sr-only">{t('demandeur.next')}</span>
                            <ChevronRight className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default DemandeurInstitutDetails;

