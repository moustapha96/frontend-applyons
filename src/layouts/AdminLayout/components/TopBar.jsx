

"use client"
import { Layout, Button, Space, Dropdown, Badge, Avatar, Typography, theme } from "antd"
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MailOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons"
import { Link, useNavigate } from "react-router-dom"
import { useAuthContext } from "@/context"
import LanguageSelector from "@/layouts/LanguageSelector"
import MaximizeScreen from "./MaximizeScreen"
import { use } from "react"
import { useTranslation } from "react-i18next"

const { Header } = Layout
const { Text, Title } = Typography
const { useToken } = theme

const TopBar = ({ collapsed, setCollapsed }) => {
  const { token } = useToken()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { session, profileImage, logout } = useAuthContext()

  const profileItems = [
    {
      key: "profile",
      label: <Link to="/admin/profil">  {t('adminMenu.layout.topbar.mon_profil')}</Link>,
      icon: <UserOutlined />,
    },
    {
      key: "settings",
      label: <Link to="/admin/configurations">{t('adminMenu.layout.topbar.paramettre')}</Link>,
      icon: <SettingOutlined />,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: <span onClick={logout}>{t('adminMenu.layout.topbar.deconnexion')}</span>,
      icon: <LogoutOutlined />,
      danger: true,
    },
  ]

  const notificationItems = [
    {
      key: "1",
      label: (
        <div>
          <Text strong>Nouveau message</Text>
          <div>Vous avez reçu un nouveau message</div>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div>
          <Text strong>Nouvelle demande</Text>
          <div>Une nouvelle demande a été soumise</div>
        </div>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "view-all",
      label: <Text style={{ color: token.colorPrimary }}>Voir tout</Text>,
    },
  ]

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: token.colorBgContainer,
        padding: "0 16px",
        boxShadow: "0 1px 4px rgba(0,21,41,.08)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{ fontSize: "16px", width: 64, height: 64 }}
        />
        {/* cacher le ApplyOns en mobile  */}

        {/* afficher le ApplyOns en mobile  */}
        <div className="hidden md:block">
          <Link to="/" style={{ display: "flex", alignItems: "center" }}>
            <Title level={4} style={{ margin: 0 }}>
              <span style={{ color: "#254c6b" }}>ApplyOns</span>
            </Title>
          </Link>
        </div>


      </div>

      <Space size="middle">
        <MaximizeScreen />

        <Button type="text" onClick={() => navigate("/admin/mailer")} icon={<MailOutlined />} size="large" shape="circle" />



        <LanguageSelector />

        {/* <Dropdown
          menu={{ items: notificationItems }}
          placement="bottomRight"
          arrow={{ pointAtCenter: true }}
          trigger={["click"]}
        >
          <Badge count={2} size="small">
            <Button type="text" icon={<MailOutlined />} size="large" shape="circle" />
          </Badge>
        </Dropdown> */}

        <div className="hidden md:block">
          <Dropdown
            menu={{ items: profileItems }}
            placement="bottomRight"
            arrow={{ pointAtCenter: true }}
            trigger={["click"]}
          >
            <Space>
              <Avatar
                src={profileImage ? `data:image/jpeg;base64,${profileImage}` : null}
                icon={!profileImage && <UserOutlined />}
                size="default"
              />
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                <Text strong>{session?.email}</Text>
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  {t('adminMenu.layout.topbar.admin')}
                </Text>
              </div>
            </Space>
          </Dropdown>
        </div>


        <Button type="text" danger icon={<LogoutOutlined />} onClick={logout} />
      </Space>
    </Header>
  )
}

export default TopBar
