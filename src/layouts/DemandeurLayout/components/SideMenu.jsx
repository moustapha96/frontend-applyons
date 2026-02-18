import { Layout, Menu, theme } from "antd"
import {
    HomeOutlined,
    FileTextOutlined,
    MessageOutlined,
    UserOutlined,
    SettingOutlined,
    BellOutlined,
    CalendarOutlined,
    FileOutlined,
    TeamOutlined,
    LogoutOutlined,
} from "@ant-design/icons"
import { Link, useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"
import logo from "@/assets/logo.png"
import { useAuthContext } from "@/context"

const { Sider } = Layout
const { useToken } = theme

const SideMenu = ({ collapsed }) => {
    const { token } = useToken()
    const { t } = useTranslation()
    const location = useLocation()
    const { logout } = useAuthContext()
    const menuItems = [
        {
            key: "dashboard",
            icon: <HomeOutlined />,
            label: <Link to="/demandeur/dashboard">{t("demandeurMenu.dashboard")}</Link>,
        },
        // {
        //     key: "demandes",
        //     icon: <FileTextOutlined />,
        //     label: t("demandeurMenu.demandes"),
        //     children: [
        //         {
        //             key: "nouvelle-demande",
        //             label: <Link to="/demandeur/nouvelle-demande">{t("demandeurMenu.nouvelleDemande")}</Link>,
        //         },
        //         {
        //             key: "mes-demandes",
        //             label: <Link to="/demandeur/mes-demandes">{t("demandeurMenu.mesDemandes")}</Link>,
        //         }
        //     ],
        // },
        {
            key: "partages",
            icon: <FileTextOutlined />,
            label: t("demandeurMenu.applicationTool"),
            children: [
                {
                    key: "nouvelle-demande-partage",
                    label: <Link to="/demandeur/nouvelle-demande-partage">{t("demandeurMenu.newApplicationTool")}</Link>,
                },
                {
                    key: "mes-partages",
                    label: <Link to="/demandeur/partages">{t("demandeurMenu.myApplications")}</Link>,
                }
            ],
        },
        // {
        //     key: "messages",
        //     icon: <MessageOutlined />,
        //     label: <Link to="/demandeur/messages">{t("demandeurMenu.messages")}</Link>,
        // },
        // {
        //     key: "notifications",
        //     icon: <BellOutlined />,
        //     label: <Link to="/demandeur/notifications">{t("demandeurMenu.notifications")}</Link>,
        // },
        // {
        //     key: "calendrier",
        //     icon: <CalendarOutlined />,
        //     label: <Link to="/demandeur/calendrier">{t("demandeurMenu.calendrier")}</Link>,
        // },
        // {
        //     key: "documents",
        //     icon: <FileOutlined />,
        //     label: <Link to="/demandeur/documents">{t("demandeurMenu.documents")}</Link>,
        // },
        // {
        //     key: "contacts",
        //     icon: <TeamOutlined />,
        //     label: <Link to="/demandeur/contacts">{t("demandeurMenu.contacts")}</Link>,
        // },
        // {
        //     key: "transactions",
        //     icon: <LogoutOutlined />,
        //     label: <Link to="/demandeur/transactions">{t("demandeurMenu.transactions")}</Link>,
        // },
        {
            key: "profil",
            icon: <UserOutlined />,
            label: <Link to="/demandeur/profil">{t("demandeurMenu.profil")}</Link>,
        },
        // {
        //     key: "parametres",
        //     icon: <SettingOutlined />,
        //     label: <Link to="/demandeur/parametres">{t("demandeurMenu.parametres")}</Link>,
        // },
        {
            key: "deconnexion",
            icon: <LogoutOutlined />,
            label: t("demandeurMenu.deconnexion"),
            onClick: () => {
                logout()
            }
        },
    ]

    // Trouver les éléments de menu actifs basés sur le chemin actuel
    const getSelectedKeys = () => {
        const path = location.pathname
        const keys = []

        menuItems.forEach((item) => {
            if (item.children) {
                item.children.forEach((child) => {
                    if (path.includes(child.key)) {
                        keys.push(child.key)
                        keys.push(item.key)
                    }
                })
            } else if (path.includes(item.key)) {
                keys.push(item.key)
            }
        })

        return keys
    }

    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            width={250}
            style={{
                overflow: "auto",
                height: "100vh",
                position: "sticky",
                top: 0,
                left: 0,
            }}
        >
            <div style={{ height: 64, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Link to="/" style={{ color: token.colorBgContainer, fontSize: collapsed ? 24 : 20, fontWeight: "bold" }}>
                    {collapsed ? <>
                        <img src={logo} alt="ApplyOns" style={{ width: 45, height: 45 }} />
                    </> : <>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <img src={logo} alt="ApplyOns" style={{ width: 45, height: 45 }} />
                            ApplyOns
                        </div>
                    </>}
                </Link>
            </div>
            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={getSelectedKeys()}
                defaultOpenKeys={getSelectedKeys()}
                items={menuItems}
            />
        </Sider>
    )
}

export default SideMenu
