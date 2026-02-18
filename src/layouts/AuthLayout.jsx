
import { Suspense, useEffect, useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"

import logo from "@/assets/logo.png"

import {
  Layout,
  Button,
  Menu,
  Drawer,
  Typography,
  Grid
} from "antd";
import {
  LoginOutlined,
  MenuOutlined,
  SignalFilled,
  UserAddOutlined
} from "@ant-design/icons";
import LanguageSelector from "@/layouts/LanguageSelector";

const { Header } = Layout;
const { Title } = Typography;
const { useBreakpoint } = Grid;

const AuthLayout = ({ children }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()

  const [drawerVisible, setDrawerVisible] = useState(false);
  const screens = useBreakpoint();
  const showDrawer = () => {
    setDrawerVisible(true);
  };

  useEffect(() => {
    setDrawerVisible(false);
  }, [location.pathname]);


  const onClose = () => {
    setDrawerVisible(false);
  };


  const menuItems = [
    { key: "home", label: <a href="/#home">{t("nav.home")} </a> },
    { key: "features", label: <a href="/#features">{t("nav.features")}</a> },
    { key: "pricing", label: <a href="/#pricing">{t("nav.pricings")}</a> },
    { key: "concuPour", label: <a href="/#concuPour">{t("nav.concuPour")}</a> }
  ];

  const isWideLayout = location.pathname.includes('/auth/demandeur') || location.pathname.includes('/auth/institut');


  return (
    <div className="min-h-screen">
      <Header
        style={{
          position: "fixed",
          zIndex: 100,
          width: "100%",
          background: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          padding: "0 24px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "100%" }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                color: "white",
                padding: "4px",
                borderRadius: "4px",
                marginRight: "8px"
              }}
            >
              <Link to='/' >
                <img src={logo || "/placeholder.svg"} alt="Logo" width="45" height="45" />
              </Link>
            </div>
            <Link to="/" >
              <Title level={4} style={{ margin: 0, color: "#254c6b" }}  >
                ApplyOns
              </Title>
            </Link>
          </div>

          {/* Menu or Burger */}
          {screens.md ? (
            <Menu mode="horizontal" items={menuItems} style={{ border: "none", flex: 1, justifyContent: "center" }} />
          ) : (
            <Button type="text" icon={<MenuOutlined />} onClick={showDrawer} />
          )}

          {/* Buttons */}
          {screens.md && (
            <div className="flex items-center gap-3">
              <LanguageSelector />

              <Button
              //  onClick={() => navigate("https://admin.applyons.com/auth/sign-in  ")}
                target="_blank"
                href="https://admin.applyons.com/auth/sign-in"
                block
                type="text"
                icon={<LoginOutlined />}
                style={{ background: "#254c6b", marginBottom: 8, color: "#fff" }}
              >
                {t("auth.signIn.title")}
              </Button>

              <Button block
                target="_blank"
                href="https://admin.applyons.com/auth/signup"
                // onClick={() => navigate("/registration?type=demandeur")}
                type="primary"
                icon={<UserAddOutlined />}
                style={{ background: "#254c6b", marginBottom: 8, color: "#fff" }}>
                {t("auth.signUp.title")}
              </Button>
            </div>
          )}
        </div>
      </Header>

      {/* Drawer Menu */}
      <Drawer
        title="Menu"
        placement="right"
        closable
        onClose={onClose}
        open={drawerVisible}
      >
        <Menu mode="vertical" items={menuItems} onClick={onClose} />
        <div style={{ marginTop: 16 }} className="flex flex-col">
          <Button onClick={() => navigate("/auth/sign-in")}
            icon={<LoginOutlined />}
            block
            type="text" style={{ background: "#254c6b", marginBottom: 8, color: "#fff" }}>
            {t("auth.signIn.title")}
          </Button>

          <Button block onClick={() => navigate("/registration?type=demandeur")}
            type="primary"
            icon={<UserAddOutlined />}
            style={{ background: "#254c6b" }}>
            {t("auth.signUp.title")}
          </Button>

          <div className="flex justify-center mt-4">
            <LanguageSelector />
          </div>
        </div>
      </Drawer>

      <main className="container mx-auto py-12 px-4 pt-24">
        <div className={`w-full mx-auto bg-white rounded-lg shadow-sm border border-gray-100 ${isWideLayout ? 'md:max-w-5xl' : location.pathname.includes('/auth/sign-in') ? 'md:max-w-md' : 'md:max-w-2xl'}`}>
          {/* <div className={`w-full mx-auto bg-white rounded-lg shadow-sm border border-gray-100 ${isWideLayout ? 'md:w-[85%] bg-red-100' : location.pathname.includes('/auth/sign-in') ? 'md:w-[500px]' : 'md:w-[600px]'}`}> */}


          <div className={isWideLayout ? 'p-2 md:p-6' : 'p-2 md:p-4'}>
            <Suspense
              fallback={
                <div className="flex justify-center py-8">
                  <div className="animate-spin h-8 w-8 border-4 border-blueLogo border-t-transparent rounded-full"></div>
                </div>
              }
            >
              {children}
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AuthLayout;