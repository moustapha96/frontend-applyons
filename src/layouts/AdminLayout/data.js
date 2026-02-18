
import {
  LuAlertOctagon,
  LuArchive,
  LuComponent,
  LuContact2,
  LuFile,
  LuMessagesSquare,
  LuRadar,
  LuSettings,
  LuShieldOff,
  LuTarget,
  LuUsers,
} from "react-icons/lu";

const adminMenu = [
  {
    name: "dashboard", // Utilisez une clé de traduction
    link: "/admin/dashboard",
    icon: LuRadar,
  },
  {
    name: "demandes", // Utilisez une clé de traduction
    link: "/admin/demandes",
    icon: LuArchive,
  },
  {
    name: "demandeurs", // Utilisez une clé de traduction
    link: "/admin/demandeurs",
    icon: LuUsers,
  },
  {
    name: "instituts", // Utilisez une clé de traduction
    link: "/admin/instituts",
    icon: LuTarget,
  },
  {
    name: "partages", // Utilisez une clé de traduction
    link: "/admin/partages",
    icon: LuFile,
  },
  {
    name: "documents", // Utilisez une clé de traduction
    link: "/admin/documents",
    icon: LuFile,
  },
  {
    name: "configuration", // Utilisez une clé de traduction
    link: "/admin/configurations",
    icon: LuSettings,
  },
  {
    name: "contacts", // Utilisez une clé de traduction
    link: "/admin/g-contact",
    icon: LuContact2,
  }
];

export { adminMenu };
