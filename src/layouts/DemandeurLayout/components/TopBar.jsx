

"use client"
import { Layout, Button, Space, Dropdown, Badge, Avatar, Typography, theme } from "antd"
import { MenuFoldOutlined, MenuUnfoldOutlined, BellOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import { useAuthContext } from "@/context"
import LanguageSelector from "@/layouts/LanguageSelector"
import MaximizeScreen from "./MaximizeScreen"
import { useTranslation } from "react-i18next"
import DocumentsPartagesDropdown from "./DocumentsPartagesDropdown"
import { getDemandeurDP } from "@/services/demandeurService"
import { useEffect, useState } from "react"

const { Header } = Layout
const { Text, Title } = Typography
const { useToken } = theme

const TopBar = ({ collapsed, setCollapsed }) => {
  const { token } = useToken()
  const { t } = useTranslation()
  const { logout, demandeur, profileImage } = useAuthContext()

  const [dp, setDp] = useState(null)

  useEffect(() => {
    if (demandeur?.id) {
      getDemandeurDPFunction(demandeur.id)
    }
  }, [demandeur])


  const getDemandeurDPFunction = async (id) => {
    try {
      const resp = await getDemandeurDP(id)
      setDp(resp)
      // //console.log(resp)
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'image de profil de l\'demandeur:', error)
    }
  }


  const profileItems = [
    {
      key: "profile",
      label: <Link to="/demandeur/profil">{t('demandeurMenu.layout.topbar.mon_profil')}</Link>,
      icon: <UserOutlined />,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: <span onClick={logout}>{t('demandeurMenu.layout.topbar.deconnexion')}</span>,
      icon: <LogoutOutlined />,
      danger: true,
    },
  ]

  const notificationItems = [
    {
      key: "1",
      label: (
        <div>
          <Text strong>Demande approuvée</Text>
          <div>Votre demande DEM-2023-001 a été approuvée</div>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div>
          <Text strong>Nouveau message</Text>
          <div>Vous avez reçu un nouveau message</div>
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

        <LanguageSelector />


        <DocumentsPartagesDropdown documentsPartages={dp?.documentsPartages} />


        {/* <Dropdown
          menu={{ items: notificationItems }}
          placement="bottomRight"
          arrow={{ pointAtCenter: true }}
          trigger={["click"]}
        >
          <Badge count={2} size="small">
            <Button type="text" icon={<BellOutlined />} size="large" shape="circle" />
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
                <Text strong>{demandeur?.name || "Utilisateur"}</Text>
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  {t('demandeurMenu.layout.topbar.demandeur')}
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
