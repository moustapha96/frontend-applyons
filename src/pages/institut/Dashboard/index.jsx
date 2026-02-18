import { AdminBreadcrumb } from "@/components";

import Statistics from "./components/Statistics";
import { getDemandesByDemandeur, getDemandesByInstitut } from "../../../services/demandeService";
import { getDocumentByIdDemandeur, getDocumentByIdInstitut } from "../../../services/documentService";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context";
import RecentDemandes from "./components/RecentDemandes";
import { useTranslation } from "react-i18next";
import { getStatInstitut } from "@/services/partageService";
import InstitutBreadcrumb from "@/components/InstitutBreadcrumb";

const DashboardInstitut = () => {

  const { isAuthenticated, role, session, institut } = useAuthContext();
  console.log(institut);


  const [demandePartage, setDemandePartage] = useState([]);
  const [documentPartage, setDocumentPartage] = useState([]);


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        getStatInstitut(institut.id).then((res) => {
          setDemandePartage(res.totalDemandePartages);
          setDocumentPartage(res.totalDocumentsPartages);

        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const { t } = useTranslation();


  return (
    <>
      <InstitutBreadcrumb title={t('dashboard')} />
      <section>
        <div className="container">
          <div className="my-6 space-y-6">
            <Statistics
              loading={loading}
              demandePartage={demandePartage}
              documentPartage={documentPartage}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default DashboardInstitut;

