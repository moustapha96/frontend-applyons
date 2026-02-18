"use client"

import { Suspense, useState } from "react"
import { Layout, Spin, ConfigProvider, Grid, Drawer } from "antd"
import SideMenu from "./components/SideMenu"
import TopBar from "./components/TopBar"
import Footer from "./components/Footer"
import WhatsAppButton from "@/components/WhatsAppButton"

const { Header, Content, Footer: AntFooter } = Layout
const { useBreakpoint } = Grid

const InstitutLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)
  const [drawerVisible, setDrawerVisible] = useState(false)
  const screens = useBreakpoint()
  const isMobile = !screens.md

  const toggleMenu = () => {
    if (isMobile) setDrawerVisible(!drawerVisible)
    else setCollapsed(!collapsed)
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#fff",
          borderRadius: 6,
        },
        components: {
          Layout: {
            headerBg: "#001529",
            headerHeight: 64,
            footerPadding: "24px 50px",
          },
        },
      }}
    >
      <Layout style={{ minHeight: "100vh" }}>
        {isMobile ? (
          <Drawer
            closable={false}
            placement="left"
            open={drawerVisible}
            onClose={() => setDrawerVisible(false)}
            // bodyStyle={{ padding: 0 }}
            width={250}
          >
            <SideMenu collapsed={false} onItemClick={() => setDrawerVisible(false)} />
          </Drawer>
        ) : (
          <SideMenu collapsed={collapsed} />
        )}


        <Layout>
          <Header style={{ padding: 0, height: 64 }}>
            <TopBar
              collapsed={collapsed}
              setCollapsed={toggleMenu}
              isMobile={isMobile}
            />
          </Header>
          <Content style={{ margin: "24px 16px 0", overflow: "auto" }}>
            <div style={{ padding: 24, background: "#fff", borderRadius: 6 }}>
              <Suspense
                fallback={
                  <div style={{ textAlign: "center", padding: "50px 0" }}>
                    <Spin fullscreen size="large" />
                  </div>
                }
              >
                {children}
              </Suspense>
            </div>
          </Content>
          <AntFooter style={{ padding: "24px 16px" }}>
            <Footer />
            <WhatsAppButton phoneNumber="+19179439275" />
          </AntFooter>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}

export default InstitutLayout
