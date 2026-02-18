import { Layout, Menu, theme } from "antd"
import {
    DashboardOutlined,
    UserOutlined,
    TeamOutlined,
    SettingOutlined,
    MailOutlined,
    FileTextOutlined,
    LogoutOutlined,
    FileOutlined,
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
            icon: <DashboardOutlined />,
            label: <Link to="/admin/dashboard">{t("adminMenu.dashboard")}</Link>,
        },
        {
            key: "users",
            icon: <UserOutlined />,
            label: t("adminMenu.users"),
            children: [
                {
                    key: "demandeurs",
                    label: <Link to="/admin/demandeurs">{t("adminMenu.demandeurs")}</Link>,
                },
                {
                    key: "instituts",
                    label: <Link to="/admin/instituts">{t("adminMenu.instituts")}</Link>,
                },
                {
                    key: "comptes",
                    label: <Link to="/admin/comptes">{t("adminMenu.comptes")}</Link>,
                },
                // {
                //     key: "nouveau-admin",
                //     label: <Link to="/admin/nouveau-admin">{t("adminMenu.nouveauAdmin")}</Link>,
                // }
            ],
        },
        // {
        //     key: "demandes",
        //     icon: <FileOutlined />,
        //     label: <Link to="/admin/demandes">{t("adminMenu.demandes")}</Link>,
        // },
        {
            key: "partages",
            icon: <FileTextOutlined />,
            label: <Link to="/admin/partages">{t("adminMenu.partages")}</Link>,
        },
        {
            key: "programe",
            icon: <FileOutlined />,
            label: <Link to="/admin/programme">{t("institutMenu.programme")}</Link>,
        },
        // {
        //     key: "documents",
        //     icon: <FileOutlined />,
        //     label: <Link to="/admin/documents">{t("adminMenu.documents")}</Link>,
        // },
        {
            key: "mailer",
            icon: <MailOutlined />,
            label: <Link to="/admin/mailer">{t("adminMenu.mailer")}</Link>,
        },
        // {
        //     key: "abonnment",
        //     icon: <MailOutlined />,
        //     label: <Link to="/admin/abonnemnts">{t("adminMenu.mailer")}</Link>,
        // },
        {
            key: "contacts",
            icon: <UserOutlined />,
            label: <Link to="/admin/g-contact">{t("adminMenu.contacts")}</Link>,
        },
        {
            key: "configurations",
            icon: <SettingOutlined />,
            label: <Link to="/admin/configurations">{t("adminMenu.configurations")}</Link>,
        },
        {
            key: "profil",
            icon: <UserOutlined />,
            label: <Link to="/admin/profil">{t("adminMenu.profil")}</Link>,
        },

        {
            key: "deconnexion",
            icon: <LogoutOutlined />,
            label: t("adminMenu.deconnexion"),
            onClick: () => {
                logout()
            }
        },
    ]

    // Find the active menu item based on the current path
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
