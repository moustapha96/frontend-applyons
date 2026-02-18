

import {
  LuArchive,
  LuFile,
  LuRadar,
  LuSnowflake,
} from "react-icons/lu";

const demandeurMenu = [
  {
    name: "dashboard", // Utilisez une clé de traduction
    link: "/demandeur/dashboard",
    icon: LuRadar,
  },
  {
    name: "demandes", // Utilisez une clé de traduction
    link: "/demandeur/demandes",
    icon: LuArchive,
  },
  {
    name: "Nouvelle Demande",
    link: "/demandeur/nouvelle-demande",
    icon: LuSnowflake,
  },
  {
    name: "transaction", // Utilisez une clé de traduction
    link: "/demandeur/transactions",
    icon: LuSnowflake,
  },
  {
    name: "documents", // Utilisez une clé de traduction
    link: "/demandeur/documents",
    icon: LuFile,
  },
  {
    name: "partages", // Utilisez une clé de traduction
    link: "/demandeur/partages",
    icon: LuFile,
  },
];

export { demandeurMenu };
