
import { LuTrendingUp } from "react-icons/lu";
import { statisticData } from "../data";
import StatisticWidget from "./StatisticWidget";
import { Files, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

const Statistics = ({ demandesCount, demandeursCount, institutsCount }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  //console.log(demandesCount, documentsCount, demandeursCount, institutsCount,)
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="rounded-md border border-default-200 bg-white dark:bg-default-50">
        <div className="p-5">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-default-600">
                {t("adminDashboard.applications")}
              </span>
              {/* <span className="text-teal-500">
                <LuTrendingUp className="me-1 inline size-4" />
                {demandesCount}%
              </span> */}
            </div>
            <div className="flex items-end justify-between gap-4">
              <h3 className="text-3xl font-medium text-default-800">{demandesCount}</h3>

              <Link to="/admin/partages" >
                <Files size={70} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-md border border-default-200 bg-white dark:bg-default-50">
        <div className="p-5">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-default-600">
                {t("adminDashboard.demandeurs")}
              </span>
              {/* <span className="text-teal-500">
                <LuTrendingUp className="me-1 inline size-4" />
                {demandeursCount}%
              </span> */}
            </div>
            <div className="flex items-end justify-between gap-4">
              <h3 className="text-3xl font-medium text-default-800">{demandeursCount}</h3>
              <Link to="/admin/demandeurs" >
                <Users size={70} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-md border border-default-200 bg-white dark:bg-default-50">
        <div className="p-5">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-default-600">
                {t("adminDashboard.instituts")}
              </span>
              {/* <span className="text-teal-500">
                <LuTrendingUp className="me-1 inline size-4" />
                {institutsCount}%
              </span> */}
            </div>
            <div className="flex items-end justify-between gap-4">
              <h3 className="text-3xl font-medium text-default-800">{institutsCount}</h3>
              <Link to="/admin/instituts" >
                <Users size={70} />
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
                {t("adminDashboard.documents")}
              </span>

            </div>
            <div className="flex items-end justify-between gap-4">
              <h3 className="text-3xl font-medium text-default-800">{documentsCount}</h3>

              <Link to="/admin/partages" >
                <Files size={70} />
              </Link>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Statistics;
