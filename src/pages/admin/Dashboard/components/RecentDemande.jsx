// import { LuUpload } from "react-icons/lu";
// import { Link } from "react-router-dom";
// import { recentOrders } from "../data";
// import { cn } from "@/utils";

// const RecentDemande = ({ demandes }) => {
//     return (
//         <div className="overflow-hidden rounded-md border border-default-200 bg-white dark:bg-default-50">
//             <div className="flex items-center justify-between border-b border-default-200 px-4 py-3">
//                 <h4 className="uppercase">Demandes</h4>

//             </div>
//             <div className="overflow-auto">
//                 <div className="inline-block min-w-full align-middle">
//                     <div className="overflow-hidden">
//                         <table className="min-w-full divide-y divide-gray-200">
//                             <thead className="bg-gray-50">
//                                 <tr>
//                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
//                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Intitulé</th>
//                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Institut</th>
//                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Demandeur</th>
//                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date de Demande</th>
//                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Année d'Obtention</th>
//                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Résultat</th>
//                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="bg-white divide-y divide-gray-200">
//                                 {demandes.map((demande) => (
//                                     <tr key={demande.id} className="hover:bg-gray-50 transition-colors duration-200">
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{demande.id}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{demande.intitule}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                             {demande.institut ? (
//                                                 <Link
//                                                     to={`/admin/institut/${demande.institut.id}/details`}
//                                                     className="text-primary hover:text-primary-700 transition-colors duration-200"
//                                                 >
//                                                     {demande.institut.name}
//                                                 </Link>
//                                             ) : (
//                                                 demande.nameInstitut || "N/A"
//                                             )}
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{demande.demandeur.name}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                             {new Date(demande.dateDemande).toLocaleDateString()}
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{demande.anneeObtention}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap">
//                                             <span
//                                                 className={cn(
//                                                     "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
//                                                     demande.resultat === "Accepted" ? "bg-green-100 text-green-800" :
//                                                         demande.resultat === "Declined" ? "bg-red-100 text-red-800" :
//                                                             demande.resultat === "Pending" ? "bg-yellow-100 text-yellow-800" :
//                                                                 "bg-gray-100 text-gray-800"
//                                                 )}
//                                             >
//                                                 {demande.resultat}
//                                             </span>
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                                             <Link
//                                                 to={`/admin/demandes/${demande.id}/details`}
//                                                 className="text-primary hover:text-primary-700 transition-colors duration-200"
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

// export default RecentDemande;

import React from "react";
import { LuUpload } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { cn } from "@/utils";

const RecentDemande = ({ demandes }) => {
    const { t } = useTranslation();

    return (
        <div className="overflow-hidden rounded-md border border-default-200 bg-white dark:bg-default-50">
            <div className="flex items-center justify-between border-b border-default-200 px-4 py-3">
                <h4 className="uppercase">{t("admin.demandes")}</h4>
            </div>
            <div className="overflow-auto">
                <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("admin.title")}</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("admin.institut")}</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("admin.demandeur")}</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("admin.request_date")}</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("admin.obtention_year")}</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("admin.result")}</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("admin.actions")}</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {demandes.map((demande) => (
                                    <tr key={demande.id} className="hover:bg-gray-50 transition-colors duration-200">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{demande.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{demande.intitule}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {demande.institut ? (
                                                <Link
                                                    to={`/admin/institut/${demande.institut.id}/details`}
                                                    className="text-primary hover:text-primary-700 transition-colors duration-200"
                                                >
                                                    {demande.institut.name}
                                                </Link>
                                            ) : (
                                                demande.nameInstitut || "N/A"
                                            )}
                                        </td>
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
                                                {demande.resultat}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <Link
                                                to={`/admin/demandes/${demande.id}/details`}
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

export default RecentDemande;
