
// export default Dashboard;
import { AdminBreadcrumb } from "@/components";
import Statistics from "./components/Statistics";
import { useAuthContext } from "@/context";
import DemandeurBreadcrumb from "../../../components/DemandeurBreadcrumb";
import { useEffect, useState } from "react";
import { getDemandesByDemandeur } from "../../../services/demandeService";
import { getDocumentByIdDemandeur } from "../../../services/documentService";
import RecentDemandes from "./components/RecentDemandes";
import { AlertCircle, Loader } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getDemandePartageDemandeur, getStatDemandeur } from "@/services/partageService";

const Dashboard = () => {
  const { demandeur } = useAuthContext();
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [demandePartage, setDemandePartage] = useState([]);
  const [documentPartage, setDocumentPartage] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stats = await getStatDemandeur(demandeur.id);
        console.log(stats)
        setDemandePartage(stats.totalDemandePartages);
        setDocumentPartage(stats.totalDocumentsPartages);

        const demandesResponse = await getDemandePartageDemandeur(demandeur.id);
        setDemandes(demandesResponse);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [demandeur.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center">
          <Loader className="h-8 w-8 text-blueLogo animate-spin mb-2" />
          <p className="text-gray-600">{t("loading")}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center">
          <AlertCircle className="h-8 w-8 text-red-500 mb-2" />
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <DemandeurBreadcrumb title={t("demandeur.dashboard")} SubTitle={demandeur?.name} />
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="my-6 space-y-6">
            <Statistics demandePartage={demandePartage} documentPartage={documentPartage} />
            <div className="grid gap-6 md:grid-cols-1">
              <RecentDemandes demandes={demandes.slice(0, 5)} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
