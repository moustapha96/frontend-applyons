// import { LuUpload } from "react-icons/lu";
// import { Link } from "react-router-dom";
// import { recentOrders } from "../data";
// import { cn } from "@/utils";

// const RecentDemandeur = ({ demandeurs }) => {
//   return (
//     <div className="overflow-hidden rounded-md border border-default-200 bg-white dark:bg-default-50">
//       <div className="flex items-center justify-between border-b border-default-200 px-4 py-3">
//         <h4 className="uppercase">Demandeurs</h4>

//       </div>
//       <div className="overflow-auto">
//         <div className="inline-block min-w-full align-middle">
//           <div className="overflow-hidden">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Téléphone</th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pays de Résidence</th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profession</th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {demandeurs.map((demandeur) => (
//                   <tr key={demandeur.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{demandeur.id}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{demandeur.name}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{demandeur.email}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{demandeur.phone}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{demandeur.paysResidence}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{demandeur.profession}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                       <Link to={`/admin/demandeur/${demandeur.id}/details`} className="text-blueLogo hover:text-indigo-900">
//                         Détails
//                       </Link>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecentDemandeur;

import React from "react";
import { LuUpload } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const RecentDemandeur = ({ demandeurs }) => {
  const { t } = useTranslation();

  return (
    <div className="overflow-hidden rounded-md border border-default-200 bg-white dark:bg-default-50">
      <div className="flex items-center justify-between border-b border-default-200 px-4 py-3">
        <h4 className="uppercase">{t("admin.demandeurs")}</h4>
      </div>
      <div className="overflow-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("admin.name")}</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("admin.email")}</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("admin.phone")}</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("admin.residence_country")}</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("admin.profession")}</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("admin.actions")}</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {demandeurs.map((demandeur) => (
                  <tr key={demandeur.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{demandeur.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{demandeur.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{demandeur.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{demandeur.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{demandeur.paysResidence}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{demandeur.profession}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link to={`/admin/demandeur/${demandeur.id}/details`} className="text-blueLogo hover:text-rougeLogo">
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

export default RecentDemandeur;
