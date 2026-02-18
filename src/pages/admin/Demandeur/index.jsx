import { AdminBreadcrumb } from "@/components";

import DemandeurListe from "./components/DemandeurListe";
import { useTranslation } from "react-i18next";

const AdminDemandeur = () => {
  const { t } = useTranslation();
  return (
    <>
      <AdminBreadcrumb title={t("adminDemandeur.demandeur_list")} />
      <section>
        <div className="container">
          <div className="my-6 space-y-6">
            <div className="grid grid-cols-1">
              <DemandeurListe />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminDemandeur;
