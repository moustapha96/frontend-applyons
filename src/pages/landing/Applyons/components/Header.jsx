"use client";

import React, { useState } from "react";
import { Layout, Button, Menu, Drawer, Typography, Grid } from "antd";
import { LoginOutlined, MenuOutlined, UserAddOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import LanguageSelector from "@/layouts/LanguageSelector";
import logo from "@/assets/logo.png";
import { useTranslation } from "react-i18next";

const { Header } = Layout;
const { Title } = Typography;
const { useBreakpoint } = Grid;

const HEADER_HEIGHT = 64;
const HEADER_HEIGHT_MOBILE = 56;

export default function HeaderApplyons({ menuItems }) {
    const [drawerVisible, setDrawerVisible] = useState(false);
    const screens = useBreakpoint();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const isDesktop = screens.md;
    const isMobile = !screens.md;
    const headerHeight = isDesktop ? HEADER_HEIGHT : HEADER_HEIGHT_MOBILE;
    const paddingX = isDesktop ? 24 : 16;

    return (
        <>
            <Header
                style={{
                    position: "fixed",
                    zIndex: 100,
                    width: "100%",
                    maxWidth: "100vw",
                    height: headerHeight,
                    minHeight: headerHeight,
                    lineHeight: `${headerHeight}px`,
                    background: "#fff",
                    boxShadow: "0 2px 8px rgba(37, 76, 107, 0.06)",
                    padding: 0,
                    paddingLeft: paddingX,
                    paddingRight: paddingX,
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        height: "100%",
                        gap: 8,
                        maxWidth: 1400,
                        margin: "0 auto",
                    }}
                >
                    {/* Logo + nom */}
                    <Link
                        to="/"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            minWidth: 0,
                            flexShrink: 0,
                        }}
                        onClick={() => navigate("/")}
                    >
                        <img
                            src={logo}
                            alt="ApplyOns"
                            style={{
                                width: isDesktop ? 42 : 36,
                                height: isDesktop ? 42 : 36,
                                objectFit: "contain",
                                flexShrink: 0,
                            }}
                        />
                        <Title
                            level={4}
                            style={{
                                margin: 0,
                                color: "#254c6b",
                                fontSize: isDesktop ? "1.25rem" : "1.1rem",
                                fontWeight: 700,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            ApplyOns
                        </Title>
                    </Link>

                    {/* Menu desktop */}
                    {isDesktop && (
                        <Menu
                            mode="horizontal"
                            items={menuItems}
                            style={{
                                border: "none",
                                flex: 1,
                                minWidth: 0,
                                justifyContent: "center",
                                lineHeight: `${headerHeight}px`,
                                fontSize: "0.9375rem",
                            }}
                            className="applyons-header-menu"
                        />
                    )}

                    {/* Actions desktop */}
                    {isDesktop && (
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 12,
                                flexShrink: 0,
                            }}
                        >
                            <LanguageSelector />
                            <Button
                                type="text"
                                icon={<LoginOutlined />}
                                style={{
                                    background: "#254c6b",
                                    color: "#fff",
                                    border: "none",
                                    height: 40,
                                    borderRadius: 8,
                                }}
                                href="https://admin.applyons.com/auth/sign-in"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {t("auth.signIn.title")}
                            </Button>
                            <Button
                                type="primary"
                                icon={<UserAddOutlined />}
                                style={{
                                    background: "#254c6b",
                                    color: "#fff",
                                    border: "none",
                                    height: 40,
                                    borderRadius: 8,
                                }}
                                href="https://admin.applyons.com/auth/signup"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {t("auth.signUp.title")}
                            </Button>
                        </div>
                    )}

                    {/* Burger mobile */}
                    {isMobile && (
                        <Button
                            type="text"
                            icon={<MenuOutlined style={{ fontSize: 22 }} />}
                            onClick={() => setDrawerVisible(true)}
                            style={{
                                width: 44,
                                height: 44,
                                minWidth: 44,
                                color: "#254c6b",
                                padding: 0,
                            }}
                            aria-label={t("nav.menu") || "Menu"}
                        />
                    )}
                </div>
            </Header>

            {/* Drawer mobile */}
            <Drawer
                title={t("nav.menu") || "Menu"}
                placement="right"
                closable
                onClose={() => setDrawerVisible(false)}
                open={drawerVisible}
                width={320}
                styles={{ body: { paddingTop: 8 } }}
            >
                <Menu
                    mode="vertical"
                    items={menuItems}
                    onClick={() => setDrawerVisible(false)}
                    style={{ border: "none", marginBottom: 24 }}
                />
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <Button
                        block
                        type="text"
                        icon={<LoginOutlined />}
                        style={{
                            background: "#254c6b",
                            color: "#fff",
                            border: "none",
                            height: 48,
                            borderRadius: 10,
                        }}
                        href="https://admin.applyons.com/auth/sign-in"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setDrawerVisible(false)}
                    >
                        {t("auth.signIn.title")}
                    </Button>
                    <Button
                        block
                        type="primary"
                        icon={<UserAddOutlined />}
                        style={{
                            background: "#254c6b",
                            color: "#fff",
                            border: "none",
                            height: 48,
                            borderRadius: 10,
                        }}
                        href="https://admin.applyons.com/auth/signup"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setDrawerVisible(false)}
                    >
                        {t("auth.signUp.title")}
                    </Button>
                    <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
                        <LanguageSelector />
                    </div>
                </div>
            </Drawer>

            <style>{`
                .applyons-header-menu .ant-menu-item {
                    padding-inline: 12px !important;
                }
                @media (max-width: 991px) {
                    .applyons-header-menu .ant-menu-item {
                        padding-inline: 8px !important;
                        font-size: 0.875rem;
                    }
                }
            `}</style>
        </>
    );
}
