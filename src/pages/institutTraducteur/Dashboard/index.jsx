import Statistics from "./components/Statistics";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context";
import { useTranslation } from "react-i18next";
import { getStatInstitut } from "@/services/partageService";
import InstitutTraducteurBreadcrumb from "@/components/InstitutTraducteurBreadcrumb";

const DashboardInstitutTraducteur = () => {

  const { institut } = useAuthContext();
  console.log(institut);


  const [demandePartage, setDemandePartage] = useState([]);
  const [documentPartage, setDocumentPartage] = useState([]);


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        getStatInstitut(institut.id).then((res) => {
          console.log(res)
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
      <InstitutTraducteurBreadcrumb title={t('dashboard')} />
      <section>
        <div className="container">
          <div className="my-6 space-y-6">
            <span>  the institutTraducteur dashboard</span>
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

export default DashboardInstitutTraducteur;

