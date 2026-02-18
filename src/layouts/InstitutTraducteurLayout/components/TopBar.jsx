"use client"
import { Layout, Button, Space, Dropdown, Badge, Avatar, Typography, theme } from "antd"
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons"
import { Link } from "react-router-dom"
import { useAuthContext } from "@/context"
import MaximizeScreen from "./MaximizeScreen"
import LanguageSelector from "@/layouts/LanguageSelector"
import DemandesDropdown from "./DemandesDropdown"
import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react"
import { getInstitutDP } from "@/services/institutService"
const { Header } = Layout
const { Text, Title } = Typography
const { useToken } = theme

const TopBar = ({ collapsed, setCollapsed }) => {
  const { token } = useToken()
  const { t } = useTranslation()
  const { logout, institut, profileImage, superviseur } = useAuthContext()

  const [dp, setDp] = useState(null)

  useEffect(() => {
    // if (institut?.id) {
    //   getInstitutDPFunction(institut.id)
    // }
  }, [institut])

  // const getInstitutDPFunction = async (id) => {
  //   try {
  //     const resp = await getInstitutDP(id)
  //     setDp(resp)
  //     // //console.log(resp)
  //   } catch (error) {
  //     console.error('Erreur lors de la récupération de l\'image de profil de l\'institut:', error)
  //   }
  // }

  const profileItems = [
    {
      key: "profile",
      label: <Link to="/institut-traducteur/profil">{t('institutMenu.layout.topbar.mon_profil')}</Link>,
      icon: <UserOutlined />,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: <span onClick={logout}>{t('institutMenu.layout.topbar.deconnexion')}</span>,
      icon: <LogoutOutlined />,
      danger: true,
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

        {/* <DemandesDropdown demandesPartages={dp?.demandesPartages} />

        <DocumentsPartagesDropdown documentsPartages={dp?.documentsPartages} /> */}


        {/* <Dropdown
          menu={{ items: notificationItems }}
          placement="bottomRight"
          arrow={{ pointAtCenter: true }}
          trigger={["click"]}
        >
          <Badge count={dp?.documentsPartages?.length} size="small">
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
                <Text strong>{institut?.name || "Institut"}</Text>
                <Text type="secondary" style={{ fontSize: "12px" }}>

                  {t('institutMenu.layout.topbar.institut')} <br />
                  {superviseur && t('institutMenu.superviseurList')}
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
