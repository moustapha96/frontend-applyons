// import { LuFile, LuUpload } from "react-icons/lu";
// import { Link } from "react-router-dom";
// import { recentOrders } from "../data";
// import { cn } from "@/utils";

// const RecentInstitut = ({ instituts }) => {
//     return (
//         <div className="overflow-hidden rounded-md border border-default-200 bg-white dark:bg-default-50">
//             <div className="flex items-center justify-between border-b border-default-200 px-4 py-3">
//                 <h4 className="uppercase">Instituts</h4>

//             </div>
//             <div className="overflow-auto">
//                 <div className="inline-block min-w-full align-middle">
//                     <div className="overflow-hidden">
//                         <table className="min-w-full divide-y divide-gray-200">
//                             <thead className="bg-gray-50">
//                                 <tr>
//                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
//                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
//                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
//                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pays Résidence</th>
//                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre de Demandes</th>
//                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="bg-white divide-y divide-gray-200">
//                                 {instituts.map((institut) => (
//                                     <tr key={institut.id} className="hover:bg-gray-50 transition-colors duration-200">
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{institut.id}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{institut.name}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{institut.type}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{institut.paysResidence}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap">
//                                             <Link
//                                                 to={`/admin/institut/${institut.id}/demandes`}

//                                                 className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
//                                             >
//                                                 <LuFile className="mr-1.5 h-4 w-4" />
//                                                 {institut.demandes && institut.demandes.length} Demandes
//                                             </Link>
//                                         </td>

//                                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                                             <Link
//                                                 to={`/admin/institut/${institut.id}/details`}
//                                                 className="text-primary-600 hover:text-primary-900 transition-colors duration-200"
//                                             >
//                                                 Détails
//                                             </Link>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default RecentInstitut;
import React from "react";
import { LuFile } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const RecentInstitut = ({ instituts }) => {
    const { t } = useTranslation();

    return (
        <div className="overflow-hidden rounded-md border border-default-200 bg-white dark:bg-default-50">
            <div className="flex items-center justify-between border-b border-default-200 px-4 py-3">
                <h4 className="uppercase">{t("instituts")}</h4>
            </div>
            <div className="overflow-auto">
                <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("admin.name")}</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("admin.type")}</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("admin.residence_country")}</th>
                                    {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("admin.number_of_requests")}</th> */}
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("admin.actions")}</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {instituts.map((institut) => (
                                    <tr key={institut.id} className="hover:bg-gray-50 transition-colors duration-200">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{institut.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{institut.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{institut.type}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{institut.paysResidence}</td>
                                        {/* <td className="px-6 py-4 whitespace-nowrap">
                                            <Link
                                                to={`/admin/institut/${institut.id}/demandes`}
                                                className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                                            >
                                                <LuFile className="mr-1.5 h-4 w-4" />
                                                {institut.demandes && institut.demandes.length} {t("admin.requests")}
                                            </Link>
                                        </td> */}
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <Link
                                                to={`/admin/institut/${institut.id}/details`}
                                                className="text-blueLogo hover:text-rougeLogo transition-colors duration-200"
                                            >
                                                {t("admin.details")}
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecentInstitut;
