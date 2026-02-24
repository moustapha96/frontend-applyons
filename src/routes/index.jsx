import { lazy } from "react";

const About = lazy(() => import("@/pages/landing/Applyons/About"));
const Terms = lazy(() => import("@/pages/landing/Applyons/Terms"));
const Contact = lazy(() => import("@/pages/landing/Applyons/Contact"));
const Privacy = lazy(() => import("@/pages/landing/Applyons/Privacy"));
const CookiePolicy = lazy(() => import("@/pages/landing/Applyons/CookiePolicy"));
const LegalNotice = lazy(() => import("@/pages/landing/Applyons/LegalNotice"));
const SecurityTrust = lazy(() => import("@/pages/landing/Applyons/SecurityTrust"));
const AppDescription = lazy(() => import("@/pages/landing/Applyons/AppDescription"));

const ApplyOnePage = lazy(() => import("@/pages/landing/Applyons"));

const ApplyOnsPageRoutes = [
  { path: "/", element: <ApplyOnePage /> },
  { path: "about", element: <About /> },
  { path: "app", element: <AppDescription /> },
  { path: "contact", element: <Contact /> },
  { path: "terms-and-conditions", element: <Terms /> },
  { path: "privacy-policy", element: <Privacy /> },
  { path: "cookie-policy", element: <CookiePolicy /> },
  { path: "legal-notice", element: <LegalNotice /> },
  { path: "security-trust", element: <SecurityTrust /> },
];

export {  ApplyOnsPageRoutes };
