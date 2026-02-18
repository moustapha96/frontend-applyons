

import {
  LuAlertOctagon,
  LuArchive,
  LuComponent,
  LuFile,
  LuMessagesSquare,
  LuRadar,
  LuShieldOff,
  LuSnowflake,
  LuSquareDot,
  LuTarget,
  LuUsers,
} from "react-icons/lu";

const institutMenu = [
  {
    name: "dashboard", // Utilisez une clé de traduction
    link: "/institut/dashboard",
    icon: LuRadar,
  },
  {
    name: "demandes", // Utilisez une clé de traduction
    link: "/institut/demandes",
    icon: LuArchive,
  },
  {
    name: "documents", // Utilisez une clé de traduction
    link: "/institut/documents",
    icon: LuFile,
  },
  {
    name: "partages", // Utilisez une clé de traduction
    link: "/institut/partages",
    icon: LuFile,
  },

  {
    name: "dashboardDemandeur", // Utilisez une clé de traduction
    link: "/institut/dashboard-demandeur",
    icon: LuUsers,
  },
  {
    name: "authentifier", // Utilisez une clé de traduction
    link: "/institut/authentifier",
    icon: LuSquareDot,
    color: "text-red-500"
  },
  {
    name: "faire_une_verification", // Utilisez une clé de traduction
    link: "/institut/verification",
    icon: LuSquareDot,
    color: "text-blue-500"
  },
  {
    name: "abonnements", // Utilisez une clé de traduction
    link: "/institut/abonnements",
    icon: LuSnowflake,
  },
];

export { institutMenu };
