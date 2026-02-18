// import { Link, useLocation } from "react-router-dom";
// import { demandeurMenu } from "../data";
// import { cn } from "@/utils";
// import { useTranslation } from "react-i18next";

// const DemandeurMenu = () => {
//   const { t } = useTranslation();
//   const { pathname } = useLocation();
//   return (
//     <nav className="admin-menu border-b border-default-200 bg-white text-sm font-medium shadow-sm shadow-default-100 dark:bg-default-50">
//       <div className="custom-scroll container mx-auto flex w-full snap-x items-center overflow-x-auto py-2.5">
//         {demandeurMenu.map((item, idx) => {
//           const Icon = item.icon;
//           return (
//             <div key={idx} className="shrink-0 snap-center px-2">
//               <Link
//                 to={item.link}
//                 className={cn(
//                   "inline-flex items-center gap-2 rounded-full px-3 py-2 font-semibold text-default-600 transition-all hover:bg-default-100 hover:text-default-800 [&.active]:bg-primary/10 [&.active]:text-primary",
//                   pathname === item.link && "active"
//                 )}
//               >
//                 <Icon className="size-5" />
//                 <span>{t(`demandeurMenu.${item.name}`)}</span>
//               </Link>
//             </div>
//           );
//         })}
//       </div>
//     </nav>
//   );
// };

// export default DemandeurMenu;

"use client"
import { Menu, theme } from "antd"
import {
  HomeOutlined,
  FileTextOutlined,
  MessageOutlined,
  UserOutlined,
  SettingOutlined,
  BellOutlined,
} from "@ant-design/icons"
import { Link, useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"

const { useToken } = theme

const DemandeurMenu = () => {
  const { token } = useToken()
  const { t } = useTranslation()
  const location = useLocation()

  // Exemple de menu pour les demandeurs
  const menuItems = [
    {
      key: "dashboard",
      icon: <HomeOutlined />,
      label: <Link to="/demandeur/dashboard">{t("demandeurMenu.dashboard")}</Link>,
    },
    {
      key: "demandes",
      icon: <FileTextOutlined />,
      label: <Link to="/demandeur/demandes">{t("demandeurMenu.demandes")}</Link>,
    },
    {
      key: "messages",
      icon: <MessageOutlined />,
      label: <Link to="/demandeur/messages">{t("demandeurMenu.messages")}</Link>,
    },
    {
      key: "notifications",
      icon: <BellOutlined />,
      label: <Link to="/demandeur/notifications">{t("demandeurMenu.notifications")}</Link>,
    },
    {
      key: "profil",
      icon: <UserOutlined />,
      label: <Link to="/demandeur/profil">{t("demandeurMenu.profil")}</Link>,
    },
    {
      key: "parametres",
      icon: <SettingOutlined />,
      label: <Link to="/demandeur/parametres">{t("demandeurMenu.parametres")}</Link>,
    },
  ]

  // Trouver l'élément de menu actif basé sur le chemin actuel
  const getSelectedKeys = () => {
    const path = location.pathname
    return menuItems.filter((item) => path.includes(item.key)).map((item) => item.key)
  }

  return (
    <div
      style={{
        position: "sticky",
        top: 64,
        zIndex: 999,
        width: "100%",
        background: token.colorBgContainer,
        borderBottom: `1px solid ${token.colorBorderSecondary}`,
        boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", overflow: "auto" }}>
        <Menu
          mode="horizontal"
          selectedKeys={getSelectedKeys()}
          items={menuItems}
          style={{ border: "none", justifyContent: "center" }}
        />
      </div>
    </div>
  )
}

export default DemandeurMenu
