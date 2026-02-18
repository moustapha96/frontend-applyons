// import { LuTrendingUp } from "react-icons/lu";
// import { statisticData } from "../data";
// import StatisticWidget from "./StatisticWidget";
// import { Files, Users } from "lucide-react";

// const Statistics = ({ demandesCount, demandesRejeteCount, demandesAccepteCount, documentsCount }) => {
//   return (
//     <div className="grid gap-6 lg:grid-cols-3">

//       <div className="rounded-md border border-default-200 bg-white dark:bg-default-50">
//         <div className="p-5">
//           <div>
//             <div className="flex items-center justify-between">
//               <span className="text-sm font-medium text-default-600">
//                 Nombre de demandes
//               </span>
//               <span className="text-teal-500">
//                 <LuTrendingUp className="me-1 inline size-4" />
//                 {demandesCount}%
//               </span>
//             </div>
//             <div className="flex items-end justify-between gap-4">
//               <h3 className="text-3xl font-medium text-default-800">{demandesCount}</h3>
//               <Files size={70} ></Files>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="rounded-md border border-default-200 bg-white dark:bg-default-50">
//         <div className="p-5">
//           <div>
//             <div className="flex items-center justify-between">
//               <span className="text-sm font-medium text-default-600">
//                 Nombre de demandes acceptées
//               </span>
//               <span className="text-teal-500">
//                 <LuTrendingUp className="me-1 inline size-4" />
//                 {demandesAccepteCount}%
//               </span>
//             </div>
//             <div className="flex items-end justify-between gap-4">
//               <h3 className="text-3xl font-medium text-default-800">{demandesAccepteCount}</h3>
//               <Users size={70} ></Users>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="rounded-md border border-default-200 bg-white dark:bg-default-50">
//         <div className="p-5">
//           <div>
//             <div className="flex items-center justify-between">
//               <span className="text-sm font-medium text-default-600">
//                 Nombre de demandes rejetées
//               </span>
//               <span className="text-teal-500">
//                 <LuTrendingUp className="me-1 inline size-4" />
//                 {demandesRejeteCount}%
//               </span>
//             </div>
//             <div className="flex items-end justify-between gap-4">
//               <h3 className="text-3xl font-medium text-default-800">{demandesRejeteCount}</h3>
//               <Users size={70} ></Users>
//             </div>
//           </div>
//         </div>
//       </div>


//       <div className="rounded-md border border-default-200 bg-white dark:bg-default-50">
//         <div className="p-5">
//           <div>
//             <div className="flex items-center justify-between">
//               <span className="text-sm font-medium text-default-600">
//                 Nombre de documents
//               </span>
//               <span className="text-teal-500">
//                 <LuTrendingUp className="me-1 inline size-4" />
//                 {documentsCount}%
//               </span>
//             </div>
//             <div className="flex items-end justify-between gap-4">
//               <h3 className="text-3xl font-medium text-default-800">{documentsCount}</h3>
//               <Files size={70} ></Files>
//             </div>
//           </div>
//         </div>
//       </div>



//     </div>
//   );
// };

// export default Statistics;
import { LuTrendingUp } from "react-icons/lu";
import { Files, Folder, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Statistics = ({
  loading,
  demandePartage,
  documentPartage }) => {
  const { t } = useTranslation();


  return (
    <div className="grid gap-6 lg:grid-cols-3">

      <div className="rounded-md border border-default-200 bg-white dark:bg-default-50">
        <div className="p-5">
          <div>
            <div className="flex items-center justify-between" >
              <span className="text-sm font-medium text-default-600">
                {t("institutTraducteur.dossierATraiter")}
              </span>

              {/* <span className="text-teal-500">
                <LuTrendingUp className="me-1 inline size-4" />
                {demandePartage}%
              </span> */}

            </div>
            <div className="flex items-end justify-between gap-4">
              <h3 className="text-3xl font-medium text-default-800">{demandePartage}</h3>
              <Link to="/institut-traducteur/dossier-a-traiter" >
                <Folder size={70} />
              </Link>
            </div>
          </div>
        </div>
      </div>


      {/* <div className="rounded-md border border-default-200 bg-white dark:bg-default-50">
        <div className="p-5">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-default-600">
                {t("institut.demandesCount")}
              </span>
              <span className="text-teal-500">
                <LuTrendingUp className="me-1 inline size-4" />
                {demandesCount}%
              </span>
            </div>
            <div className="flex items-end justify-between gap-4">
              <h3 className="text-3xl font-medium text-default-800">{demandesCount}</h3>
              <Files size={70} />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-md border border-default-200 bg-white dark:bg-default-50">
        <div className="p-5">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-default-600">
                {t("institut.demandesAccepteCount")}
              </span>
              <span className="text-teal-500">
                <LuTrendingUp className="me-1 inline size-4" />
                {demandesAccepteCount}%
              </span>
            </div>
            <div className="flex items-end justify-between gap-4">
              <h3 className="text-3xl font-medium text-default-800">{demandesAccepteCount}</h3>
              <Users size={70} />
            </div>
          </div>
        </div>
      </div>


      <div className="rounded-md border border-default-200 bg-white dark:bg-default-50">
        <div className="p-5">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-default-600">
                {t("institut.demandesRejeteCount")}
              </span>
              <span className="text-teal-500">
                <LuTrendingUp className="me-1 inline size-4" />
                {demandesRejeteCount}%
              </span>
            </div>
            <div className="flex items-end justify-between gap-4">
              <h3 className="text-3xl font-medium text-default-800">{demandesRejeteCount}</h3>
              <Users size={70} />
            </div>
          </div>
        </div>
      </div> */}

      {/* <div className="rounded-md border border-default-200 bg-white dark:bg-default-50">
        <div className="p-5">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-default-600">
                {t("institut.documentsCount")}
              </span>
              <span className="text-teal-500">
                <LuTrendingUp className="me-1 inline size-4" />
                {documentsCount}%
              </span>
            </div>
            <div className="flex items-end justify-between gap-4">
              <h3 className="text-3xl font-medium text-default-800">{documentsCount}</h3>
              <Files size={70} />
            </div>
          </div>
        </div>
      </div> */}

      {/* <div className="rounded-md border border-default-200 bg-white dark:bg-default-50">
        <div className="p-5">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-default-600">
                {t("institut.documentsCount")}
              </span>
              <span className="text-teal-500">
                <LuTrendingUp className="me-1 inline size-4" />
                {documentPartage}%
              </span>
            </div>
            <div className="flex items-end justify-between gap-4">
              <h3 className="text-3xl font-medium text-default-800">{documentPartage}</h3>
              <Files size={70} />
            </div>
          </div>
        </div>
      </div> */}

    </div>
  );
};

export default Statistics;
