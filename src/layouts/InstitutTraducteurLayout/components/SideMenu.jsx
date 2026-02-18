
import { Layout, Menu, theme } from "antd"
import {
    DashboardOutlined,
    UserOutlined,
    SendOutlined,
    LogoutOutlined,
    MoneyCollectFilled,
    FileOutlined,
} from "@ant-design/icons"
import { Link, useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"
import logo from "@/assets/logo.png"
import { useAuthContext } from "@/context"

const { Sider } = Layout
const { useToken } = theme

const SideMenu = ({ collapsed, onItemClick }) => {
    const { token } = useToken()
    const { t } = useTranslation()
    const location = useLocation()
    const { logout, role } = useAuthContext()

    const handleClick = (item) => {
        if (item.onClick) item.onClick()
        if (onItemClick) onItemClick()
    }


    const menuItems = [
        {
            key: "dashboard",
            icon: <DashboardOutlined />,
            label: <Link to="/institut-traducteur/dashboard">{t("institutMenu.dashboard")}</Link>,
        },
        {
            key: "a-traiter",
            icon: <FileOutlined />,
            label: <Link to="/institut-traducteur/dossier-a-traiter">{t("institutTraducteur.dossierATraiter")}</Link>,
        },
        {
            key: "superviseur",
            icon: <MoneyCollectFilled />,
            label: (
                <Link to="/institut-traducteur/superviseurs">{t("institutMenu.manage_admins")}</Link>
            ),
        },
        {
            key: "profil",
            icon: <UserOutlined />,
            label: <Link to="/institut-traducteur/profil">{t("institutMenu.profil")}</Link>,
        },

        {
            key: "deconnexion",
            icon: <LogoutOutlined />,
            label: t("institutMenu.deconnexion"),
            onClick: () => logout(),
        },
    ]

       
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
            <div
                style={{
                    height: 64,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Link
                    to="/"
                    style={{
                        color: token.colorBgContainer,
                        fontSize: collapsed ? 24 : 20,
                        fontWeight: "bold",
                    }}
                >
                    {collapsed ? (
                        <img src={logo} alt="ApplyOns" style={{ width: 45, height: 45 }} />
                    ) : (
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <img src={logo} alt="ApplyOns" style={{ width: 45, height: 45 }} />
                            ApplyOns
                        </div>
                    )}
                </Link>
            </div>

            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={getSelectedKeys()}
                defaultOpenKeys={getSelectedKeys()}
                items={menuItems.map((item) => ({
                    ...item,
                    onClick: () => handleClick(item),
                }))}
            />
        </Sider>
    )
}

export default SideMenu
