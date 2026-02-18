

import React, { useState, useEffect } from "react";
import { AdminBreadcrumb } from "@/components";
import Statistics from "./components/Statistics";
import { getAllDemandeurs } from "../../../services/demandeurService";
import { getInstituts } from "../../../services/institutService";
import RecentDemandeur from "./components/RecentDemandeur";
import RecentInstitut from "./components/RecentInstitut";
import { useTranslation } from 'react-i18next';
import { getStatAdmin } from "@/services/partageService";

const Dashboard = () => {
  const { t } = useTranslation();
  const [demandes, setDemandes] = useState([]);
  const [demandeurs, setDemandeurs] = useState([]);
  const [instituts, setInstituts] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {

    const getStatAdminData = async () => {
      setLoading(true);
      try {
        const res = await getStatAdmin();

        setDemandes(res.totalDemandePartages);
        // setDocuments(res.totalDocumentsPartages);
        setInstituts(res.totalInstituts);
        setDemandeurs(res.totalDemandeurs);

      } catch (err) {
        setError(t("admin.error_loading_data"));
      } finally {
        setLoading(false);
      }
    };

    getStatAdminData()
  }, []);


  if (loading) return <div className="flex justify-center items-center h-screen">{t("common.loading")}</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-600">{t("admin.error")}: {error}</div>;



  return (
    <>
      <AdminBreadcrumb title={t("admin.dashboard")} />
      <section>
        <div className="container">
          <div className="my-6 space-y-6">
            <Statistics
              demandesCount={demandes}
              demandeursCount={demandeurs}
              institutsCount={instituts}
              // documentsCount={documents}
            />

          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
