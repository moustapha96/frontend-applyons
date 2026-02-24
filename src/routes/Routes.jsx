import { DefaultLAyout } from "@/layouts";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { ApplyOnsPageRoutes } from "./index";
import { useEffect } from "react";
import { setupInterceptors } from "./setupInterceptors";

const AllRoutes = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    setupInterceptors(navigate);
  }, [navigate]);

  return (
    <Routes>
      {ApplyOnsPageRoutes.map((route, idx) => (
        <Route
          path={route.path}
          element={<DefaultLAyout {...props}>{route.element}</DefaultLAyout>}
          key={idx}
        />
      ))}
      {/* Page inexistante : redirection vers l'accueil */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AllRoutes;
