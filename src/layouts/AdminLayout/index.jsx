

"use client"

import { Suspense, useState } from "react"
import { Layout, Spin, ConfigProvider } from "antd"
import SideMenu from "./components/SideMenu"
import Footer from "./components/Footer"
import TopBar from "./components/TopBar"


const { Header, Content, Footer: AntFooter } = Layout

const AdminLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)

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
        <SideMenu collapsed={collapsed} />
        <Layout>
          <Header style={{ padding: 0, height: 64 }}>
            <TopBar collapsed={collapsed} setCollapsed={setCollapsed} />
          </Header>
          <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
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
          </AntFooter>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}

export default AdminLayout
