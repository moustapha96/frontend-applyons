"use client";
import React, { useState, useEffect } from "react";
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
    UserAddOutlined
} from "@ant-design/icons";
import { Link, Navigate, useNavigate } from "react-router-dom";
import LanguageSelector from "@/layouts/LanguageSelector";

import logo from "@/assets/logo.png"
import { useTranslation } from "react-i18next";

const { Header } = Layout;
const { Title } = Typography;
const { useBreakpoint } = Grid;

export default function HeaderApplyons({ menuItems }) {
    const [drawerVisible, setDrawerVisible] = useState(false);
    const screens = useBreakpoint();
    const { t } = useTranslation()
    const navigate = useNavigate();
    const showDrawer = () => {
        setDrawerVisible(true);
    };

    const onClose = () => {
        setDrawerVisible(false);
    };

    return (
        <>
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
                            <Link to="/">
                                <img src={logo} alt="ApplyOns Logo" width="45" height="45" />
                            </Link>
                        </div>
                        <Link to="/">
                            <Title onClick={() => navigate("/")} level={4} style={{ margin: 0, color: "#254c6b" }}  >
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
                    {screens.md && <>
                        <div className="flex items-center gap-3 " >
                            <LanguageSelector />

                            <Button
                                block
                                type="text"
                                icon={<LoginOutlined />}
                                style={{ background: "#254c6b", marginBottom: 8, color: "#fff" }}
                                href="https://admin.applyons.com/auth/sign-in"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {t("auth.signIn.title")}
                            </Button>

                            <Button
                                block
                                type="primary"
                                icon={<UserAddOutlined />}
                                style={{ background: "#254c6b", marginBottom: 8, color: "#fff" }}
                                href="https://admin.applyons.com/auth/signup"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {t("auth.signUp.title")}
                            </Button>

                        </div>

                    </>}
                </div>
            </Header >

            {/* Drawer Menu */}
            <Drawer Drawer
                title="Menu"
                placement="right"
                closable
                onClose={onClose}
                open={drawerVisible}
            >
                <Menu mode="vertical" items={menuItems} onClick={onClose} />
                <div style={{ marginTop: 16 }} className="flex flex-col" >

                    <Button
                        block
                        type="text"
                        icon={<LoginOutlined />}
                        style={{ background: "#254c6b", marginBottom: 8, color: "#fff" }}
                        href="https://admin.applyons.com/auth/sign-in"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={onClose}
                    >
                        {t("auth.signIn.title")}
                    </Button>

                    <Button
                        block
                        type="primary"
                        icon={<UserAddOutlined />}
                        style={{ background: "#254c6b", marginBottom: 8, color: "#fff" }}
                        href="https://admin.applyons.com/auth/signup"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={onClose}
                    >
                        {t("auth.signUp.title")}
                    </Button>

                    <div className="flex justify-center mt-4" >
                        <LanguageSelector />
                    </div>
                </div>
            </Drawer >
        </>
    );
}
