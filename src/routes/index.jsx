
import InstitutTraducteurListeSuperviseur from "@/pages/institutTraducteur/Superviseur/ListeSuperviseur";
import { lazy } from "react";
// ADMIN
const AdminGestionProgramme = lazy(() => import("@/pages/admin/Programme/AdminGestionProgramme"));
const GestionProgramme = lazy(() => import("@/pages/institut/Programme/GestionProgramme"));
const DashboardInstitutTraducteur = lazy(() => import("@/pages/institutTraducteur/Dashboard"));
const InstitutTraducteurDossierATraiter = lazy(() => import("@/pages/institutTraducteur/DossierAtraiter/DossierAtraiter"));

const InstitutTraducteurProfil = lazy(() => import("@/pages/institutTraducteur/profil"));

const InstitutTraducteurDemandeurDetails = lazy(() => import("@/pages/institutTraducteur/demandeur/demandeurDetail"));
const InstitutTraducteurDossierATraiterDetails = lazy(() => import("@/pages/institutTraducteur/DossierAtraiter/Details"));
const InstitutTraducteurDossierATraiterDocument = lazy(() => import("@/pages/institutTraducteur/DossierAtraiter/Document"));
const InstitutTraducteurInstitutDetails = lazy(() => import("@/pages/institutTraducteur/institut/institutDetail"));



const AdminDemande = lazy(() => import("@/pages/admin/Demande"));
const AdminDemandeur = lazy(() => import("@/pages/admin/Demandeur"));
const AdminInstitut = lazy(() => import("@/pages/admin/Institut"));
const AdminConfiguration = lazy(() => import("@/pages/admin/Configuration"));
const AdminDocument = lazy(() => import("@/pages/admin/Document"));
const AdminProfil = lazy(() => import("@/pages/admin/Profil"));
const NouveauAdmin = lazy(() => import("@/pages/admin/NouveauAdmin"));
const AdminCompte = lazy(() => import("@/pages/admin/Compte"));
const AdminMailer = lazy(() => import("@/pages/admin/Mailer"));
const AdminPartage = lazy(() => import("@/pages/admin/Partage/AdminPartage"));
const AdminPartageDetails = lazy(() => import("@/pages/admin/Partage/AdminPartageDetails"));
const AdminPartageDemandeurDetail = lazy(() => import("@/pages/admin/Partage/AdminPartageDemandeurDetail"));
const AdminInstitutAbonnement = lazy(() => import("@/pages/admin/Component/AdminInstitutAbonnement"));
const AdminInstitutNouvelAbonnement = lazy(() => import("@/pages/admin/Component/AdminInstitutNouvelAbonnement"));
const AdminDemandeInstitut = lazy(() => import("@/pages/admin/Component/DemandeInstitut"));
const InstitutDetails = lazy(() => import("@/pages/admin/Component/InstitutDetails"));
const DocumentInstitut = lazy(() => import("@/pages/admin/Component/DocumentInstitut"));
const DocumentDetails = lazy(() => import("@/pages/admin/Component/DocumentDetails"));
const DemandeDetails = lazy(() => import("@/pages/admin/Component/DemandeDetails"));
const ContactListe = lazy(() => import("@/pages/admin/Component/ContactListe"));

// DEMANDEUR
const DemandeurDemandes = lazy(() => import("@/pages/demandeur/components/DemandeurDemandes"));
const DemandeurInstituts = lazy(() => import("@/pages/demandeur/components/DemandeurInstituts"));
const DemandeurDemandeDetails = lazy(() => import("@/pages/demandeur/components/DemandeurDemandeDetails"));
const DemandeurNouveauDemande = lazy(() => import("@/pages/demandeur/components/DemandeurNouveauDemande"));
const DemandeurInstitutDetails = lazy(() => import("@/pages/demandeur/components/DemandeurInstitutDetails"));
const DemandeurTransactions = lazy(() => import("@/pages/demandeur/components/DemandeurTransactions"));
const DemandeurProfil = lazy(() => import("@/pages/demandeur/components/DemandeurProfil"));
const DemandeurSuccessPage = lazy(() => import("@/pages/demandeur/components/DemandeurSuccessPage"));
const DemandeurPartage = lazy(() => import("@/pages/demandeur/Partage/DemandeurPartage"));
const DemandeurPartageDetails = lazy(() => import("@/pages/demandeur/Partage/DemandeurPartageDetails"));
const DemandeurNouveauPartage = lazy(() => import("@/pages/demandeur/Partage/DemandeurNouveauPartage"));
const DemandeurDocumentPartage = lazy(() => import("@/pages/demandeur/Partage/DemandeurDocumentPartage"));
const DemandeurDocumentPartageDetail = lazy(() => import("@/pages/demandeur/Partage/DemandeurDocumentPartageDetail"));
const DemandeurDocumentsPartage = lazy(() => import("@/pages/demandeur/Partage/DemandeurDocument"));

// INSTITUT

const InstitutListeSuperviseur = lazy(() => import("@/pages/institut/Superviseur/ListeSuperviseur"));
const InstitutDemandes = lazy(() => import("@/pages/institut/components/InstitutDemandes"));
const InstitutDocuments = lazy(() => import("@/pages/institut/components/InstitutDocuments"));
const InstitutDemandeurs = lazy(() => import("@/pages/institut/components/InstitutDemandeurs"));
const InstitutDemanndeReponse = lazy(() => import("@/pages/institut/components/InstitutDemanndeReponse"));
const InstitutTransactions = lazy(() => import("@/pages/institut/components/InstitutTransactions"));
const InstitutDemandeDetails = lazy(() => import("@/pages/institut/components/InstitutDemandeDetails"));
const InstitutDocumentDetails = lazy(() => import("@/pages/institut/components/InstitutDocumentDetails"));
const InstitutAuthentifier = lazy(() => import("@/pages/institut/components/InstitutAuthentifier"));
const InstitutNouvelleDemande = lazy(() => import("@/pages/institut/components/InstitutNouvelleDemande"));
const InstitutVerification = lazy(() => import("@/pages/institut/components/InstitutVerification"));
const InstitutSuccessPage = lazy(() => import("@/pages/institut/components/InstitutSuccessPage"));
const InstitutAbonnement = lazy(() => import("@/pages/institut/components/InstitutAbonnement"));
const InstitutNouvelAbonnement = lazy(() => import("@/pages/institut/components/InstitutNouvelAbonnement"));
const InstitutProfil = lazy(() => import("@/pages/institut/components/InstitutProfil"));
const InstitutDashboardDemande = lazy(() => import("@/pages/institut/components/InstitutDashboardDemande"));
const InstitutPartage = lazy(() => import("@/pages/institut/Partage/InstitutPartage"));
const InstitutPartageDetails = lazy(() => import("@/pages/institut/Partage/InstitutPartageDetails"));
const InstitutAjoutPartage = lazy(() => import("@/pages/institut/Partage/InstitutAjoutPartage"));
const InstitutDemandeurDetail = lazy(() => import("@/pages/institut/Partage/InstitutDemandeurDetail"));
const InstitutDocumentPartage = lazy(() => import("@/pages/institut/Partage/InstitutDocument"));


const RegistrationPage = lazy(() => import("@/pages/landing/Applyons/Registration"));
const AccountCreated = lazy(() => import("@/pages/auth/created"));
const InstitutSignup = lazy(() => import("@/pages/landing/Applyons/institutSignup"));
const DemandeurSignup = lazy(() => import("@/pages/landing/Applyons/DemandeurSignup"));
const About = lazy(() => import("@/pages/landing/Applyons/About"));
const Terms = lazy(() => import("@/pages/landing/Applyons/Terms"));
const Contact = lazy(() => import("@/pages/landing/Applyons/Contact"));
const Privacy = lazy(() => import("@/pages/landing/Applyons/Privacy"));
const ActivatedAccount = lazy(() => import("@/pages/auth/activated"));


const ApplyOnePage = lazy(() => import('@/pages/landing/Applyons'));

// admin routes
const Dashboard = lazy(() => import("@/pages/admin/Dashboard"));
const Chat = lazy(() => import("@/pages/admin/Chat"));
const Project = lazy(() => import("@/pages/admin/Project"));
const UiComponents = lazy(() => import("@/pages/admin/UiComponents"));

// institut routes
const DashboardInstitut = lazy(() => import("@/pages/institut/Dashboard"));
const ChatInstitut = lazy(() => import("@/pages/institut/Chat"));
const ProjectInstitut = lazy(() => import("@/pages/institut/Project"));
const UiComponentsInstitut = lazy(() => import("@/pages/institut/UiComponents"));
//  demandeur routes
const DashboardDemandeur = lazy(() => import("@/pages/demandeur/Dashboard"));
const ChatDemandeur = lazy(() => import("@/pages/demandeur/Chat"));


// auth routes
const SignIn = lazy(() => import("@/pages/auth/SignIn"));
const SignUp = lazy(() => import("@/pages/auth/SignUp"));
const ResetPassword = lazy(() => import("@/pages/auth/ResetPassword"));
const ForgotPassword = lazy(() => import("@/pages/auth/ForgotPassword"));
const Logout = lazy(() => import("@/pages/auth/Logout"));

const ApplyOnsPageRoutes = [
  {
    path: "/",
    element: <ApplyOnePage />,
  },
  {
    path: "about",
    element: <About />
  },
  {
    path: "contact",
    element: <Contact />
  },
  {
    path: "terms-and-conditions",
    element: <Terms />
  },
  {
    path: "privacy-policy",
    element: <Privacy />
  }
];

// const AuthenticPageRoutes = [
//   {
//     path: "/authenticpage",
//     element: <AuthenticPage />,
//   },

//   {
//     path: "trust-and-safety",
//     element: <TrustSecurityPage />
//   },
//   {
//     path: "simplify-process",
//     element: <SimplifyProcessPage />
//   },
//   {
//     path: "/registration",
//     element: <InscriptionPage />,
//   },
//   {
//     path: "privacy-policy",
//     element: <PrivacyPolicyPage />,
//   },

//   {
//     path: "terms-and-conditions",
//     element: <TermsConditionsPage />,
//   },
// ];


const institutTraducteurRoutes = [
  {
    path: "/institut-traducteur/dashboard",
    element: <DashboardInstitutTraducteur />,
  },
  {
    path: "/institut-traducteur/dossier-a-traiter",
    element: <InstitutTraducteurDossierATraiter />,
  },
  {
    path: "/institut-traducteur/dossier-a-traiter/:id/details",
    element: <InstitutTraducteurDossierATraiterDetails />,
  },
  {
    path: "/institut-traducteur/dossier-a-traiter/:id/documents",
    element: <InstitutTraducteurDossierATraiterDocument />,
  },
  {
    path: "/institut-traducteur/institut/:id/details",
    element: <InstitutTraducteurInstitutDetails />,
  },
  {
    path: "/institut-traducteur/demandeur/:id/details",
    element: <InstitutTraducteurDemandeurDetails />,
  },
  {
    path: "/institut-traducteur/superviseurs",
    element: <InstitutTraducteurListeSuperviseur />,
  },
  {
    path: '/institut-traducteur/profil',
    element: <InstitutTraducteurProfil />
  }
]

const institutRoutes = [
  {
    path: "/institut/dashboard",
    element: <DashboardInstitut />,
  },
  {
    path: "/institut/programme",
    element: <GestionProgramme />
  },
  {
    path: "/institut/superviseurs",
    element: <InstitutListeSuperviseur />,
  },
  {
    path: "/institut/partages",
    element: <InstitutPartage />,
  },
  {
    path: "/institut/partages/ajouter",
    element: <InstitutAjoutPartage />,
  },
  {
    path: "/institut/partages/:id/details",
    element: <InstitutPartageDetails />,
  },
  {
    path: '/institut/profil',
    element: <InstitutProfil />
  },
  {
    path: "/institut/success-payment",
    element: <InstitutSuccessPage />
  },
  {
    path: "/institut/chat",
    element: <ChatInstitut />,
  },
  {
    path: "/institut/project",
    element: <ProjectInstitut />,
  },
  {
    path: "/institut/ui-components",
    element: <UiComponentsInstitut />,
  },
  {
    path: "/institut/demandes",
    element: <InstitutDemandes />,
  },
  {
    path: "/institut/verification",
    element: <InstitutVerification />,
  },
  {
    path: '/institut/nouvelle-demande',
    element: <InstitutNouvelleDemande />
  },
  {
    path: '/institut/demande/:id/details',
    element: <InstitutDemandeDetails />
  },
  {
    path: "/institut/documents",
    element: <InstitutDocuments />,
  },
  {
    path: "/institut/demandeurs",
    element: <InstitutDemandeurs />,
  },
  {
    path: '/institut/document/:id/details',
    element: <InstitutDocumentDetails />
  },
  {
    path: "/institut/demandeur/:id/reponse",
    element: <InstitutDemanndeReponse />,
  },
  {
    path: "/institut/demandeur/:id/details",
    element: <InstitutDemandeurDetail />,
  },
  {
    'path': '/institut/transactions',
    element: <InstitutTransactions />
  },
  {
    path: '/institut/authentifier',
    element: <InstitutAuthentifier />
  },
  {
    path: '/institut/authentifier/:id/demande',
    element: <InstitutAuthentifier />
  },

  {
    path: '/institut/abonnements',
    element: <InstitutAbonnement />
  },
  {
    path: '/institut/nouvel-abonnement',
    element: <InstitutNouvelAbonnement />
  },
  {
    path: "/institut/dashboard-demandeur",
    element: <InstitutDashboardDemande />
  },
  {
    path: '/institut/demande/:id/documents',
    element: <InstitutDocumentPartage />
  }
];


const demandeurRoutes = [
  {
    path: "/demandeur/dashboard",
    element: <DashboardDemandeur />,
  },
  {
    path: "/demandeur/partages",
    element: <DemandeurPartage />,
  },
  {
    path: "/demandeur/nouvelle-demande-partage",
    element: <DemandeurNouveauPartage />,
  },
  {
    path: "/demandeur/partages/:id/details",
    element: <DemandeurPartageDetails />,
  },
  {
    path: "/demandeur/document-partage/:id/details",
    element: <DemandeurDocumentPartageDetail />
  },
  {
    path: "/demandeur/success-payment",
    element: <DemandeurSuccessPage />
  },
  {
    path: "/demandeur/chat",
    element: <ChatDemandeur />,
  },
  {
    path: "/demandeur/nouvelle-demande",
    element: <DemandeurNouveauDemande />,
  },
  {
    path: "/demandeur/demandes",
    element: <DemandeurDemandes />,
  },
  {
    path: "/demandeur/institut/:id/details",
    element: <DemandeurInstitutDetails />
  },
  {
    path: "demandeur/instituts",
    element: <DemandeurInstituts />
  },
  {
    path: "/demandeur/demande/:id/details",
    element: <DemandeurDemandeDetails />,
  },
  // {
  //   path: "/demandeur/documents",
  //   element: <DemandeurDocuments />,
  // },
  {
    path: "/demandeur/documents",
    element: <DemandeurDocumentPartage />,
  },
  {
    path: "/demandeur/transactions",
    element: <DemandeurTransactions />
  },
  {
    path: "demandeur/profil",
    element: <DemandeurProfil />
  },
  {
    path: '/demandeur/demandes/:id/documents',
    element: <DemandeurDocumentsPartage />
  }

];

const adminRoutes = [
  {
    path: "/admin/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/admin/programme",
    element: <AdminGestionProgramme />
  },
  {
    'path': '/admin/demandeurs',
    element: <AdminDemandeur />,
  },
  {
    'path': '/admin/demandes',
    element: <AdminDemande />,
  },
  {
    'path': '/admin/instituts',
    element: <AdminInstitut />,
  },
  {
    path: "/admin/partages",
    element: <AdminPartage />,
  },
  {
    path: "/admin/partages/:id/details",
    element: <AdminPartageDetails />,
  },
  {
    path: "/admin/institut/:id/details",
    element: <InstitutDetails />,
  },
  {
    path: "/admin/institut/:id/abonnements",
    element: <AdminInstitutAbonnement />
  },
  {
    path: "/admin/institut/:id/nouvel-abonnement",
    element: <AdminInstitutNouvelAbonnement />
  },
  {
    'path': '/admin/institut/:id/demandes',
    element: <AdminDemandeInstitut />,
  },
  {
    'path': '/admin/institut/:id/documents',
    element: <DocumentInstitut />,
  },
  {
    'path': '/admin/documents/:id/details',
    element: <DocumentDetails />
  },
  {
    path: "/admin/demandes/:id/details",
    element: <DemandeDetails />,
  },
  {
    'path': '/admin/demandeur/:id/details',
    element: <AdminPartageDemandeurDetail />,
    // element: <DemandeurDetails />,
  },
  {
    'path': '/admin/documents',
    element: <AdminDocument />,
  },

  {
    path: "/admin/chat",
    element: <Chat />,
  },
  {
    path: "/admin/project",
    element: <Project />,
  },
  {
    path: "/admin/ui-components",
    element: <UiComponents />,
  },
  {
    'path': '/admin/configurations',
    element: <AdminConfiguration />,
  },
  {
    'path': '/admin/profil',
    element: <AdminProfil />,
  },
  {
    'path': '/admin/nouveau-admin',
    element: <NouveauAdmin />,
  },
  {
    'path': '/admin/comptes',
    element: <AdminCompte />,
  },

  {
    'path': '/admin/g-contact',
    element: <ContactListe />
  },
  {
    'path': "/admin/mailer",
    element: <AdminMailer />
  }

];

const authRoutes = [
  {
    path: "/auth/sign-in",
    element: <SignIn />,
  },
  {
    path: "/auth/institut",
    element: <InstitutSignup />,
  },
  {
    path: "/auth/demandeur",
    element: <DemandeurSignup />,
  },
  {
    path: "/auth/sign-up",
    element: <SignUp />,
  },
  {
    path: "/auth/reset-pass",
    element: <ResetPassword />,
  },
  {
    path: "/auth/forgot-pass",
    element: <ForgotPassword />,
  },
  {
    path: "/auth/logout",
    element: <Logout />,
  },
  {
    path: "/activate",
    element: <ActivatedAccount />
  },
  {
    path: "/registration",
    element: <RegistrationPage />,
  },
  {
    path: "/account-created",
    element: <AccountCreated />
  },
  // 
];

export { adminRoutes, ApplyOnsPageRoutes, authRoutes, institutTraducteurRoutes, institutRoutes, demandeurRoutes };
