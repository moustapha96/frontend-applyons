import { AdminBreadcrumb } from "@/components";

import DemandeListe from "./components/DemandeListe";

const AdminDemande = () => {
  return (
    <>
      <AdminBreadcrumb title="Liste de Demandes" />
      <section>
        <div className="container">
          <div className="my-6 space-y-6">
            <div className="grid grid-cols-1">
              <DemandeListe />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminDemande;
