import { useAuthContext } from "@/context";
import {
  AdminLayout,
  AuthLayout,
  DefaultLAyout,
  LandingLayout,
} from "@/layouts";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { adminRoutes, authRoutes, institutTraducteurRoutes, institutRoutes, demandeurRoutes, ApplyOnsPageRoutes } from "./index";
import InstitutLayout from "../layouts/InstitutLayout";
import DemandeurLayout from "../layouts/DemandeurLayout";
import { useEffect } from "react";
import { setupInterceptors } from "./setupInterceptors";
import InstitutTraducteurLayout from "@/layouts/InstitutTraducteurLayout";

const AllRoutes = (props) => {
  const navigate = useNavigate();
  const { isAuthenticated, role, token, removeSession, isInstitutAuthenticated, isDemandeurAuthenticated } = useAuthContext();


  useEffect(() => {
    setupInterceptors(navigate, removeSession);
    // checkAuthStatus();
  }, [navigate, removeSession]);


  return (
    <Routes>

      {ApplyOnsPageRoutes.map((route, idx) => (
        <Route
          path={route.path}
          element={<DefaultLAyout {...props}>{route.element}</DefaultLAyout>}
          key={idx}
        />
      ))}



      {institutRoutes.map((route, idx) => {
        const hasAccess = token && [
          "ROLE_INSTITUT",
          "ROLE_INSTITUT_READ",
          "ROLE_INSTITUT_WRITE"].includes(role);

        return (
          <Route
            key={idx}
            path={route.path}
            element={
              hasAccess ? (
                <InstitutLayout {...props}>{route.element}</InstitutLayout>
              ) : (
                <Navigate
                  to={{
                    pathname: "/auth/sign-in",
                    search: "redirectTo=" + route.path,
                  }}
                  replace
                />
              )
            }
          />
        );
      })}


      {institutTraducteurRoutes.map((route, idx) => {
        const hasAccess = token && ["ROLE_TRADUCTEUR"].includes(role);

        return (
          <Route
            key={idx}
            path={route.path}
            element={
              hasAccess ? (
                <InstitutTraducteurLayout {...props}>{route.element}</InstitutTraducteurLayout>
              ) : (
                <Navigate
                  to={{
                    pathname: "/auth/sign-in",
                    search: "redirectTo=" + route.path,
                  }}
                  replace
                />
              )
            }
          />
        );
      })}



      {demandeurRoutes.map((route, idx) => (
        <Route
          path={route.path}
          element={
            token && role == "ROLE_DEMANDEUR" ? (
              <DemandeurLayout {...props}>{route.element}</DemandeurLayout>
            ) : (
              <Navigate
                to={{
                  pathname: "/auth/sign-in",
                  search: "redirectTo=" + route.path,
                }}
              />
            )
          }
          key={idx}
        />
      ))}

      {adminRoutes.map((route, idx) => (
        <Route
          path={route.path}
          element={
            token && role == "ROLE_ADMIN" ? (
              <AdminLayout {...props}>{route.element}</AdminLayout>
            ) : (
              <Navigate
                to={{
                  pathname: "/auth/sign-in",
                  search: "redirectTo=" + route.path,
                }}
              />
            )
          }
          key={idx}
        />
      ))}



      {authRoutes.map((route, idx) => (
        <Route
          path={route.path}
          element={<AuthLayout {...props}>{route.element}</AuthLayout>}
          key={idx}
        />
      ))}

    </Routes>
  );
};

export default AllRoutes;
