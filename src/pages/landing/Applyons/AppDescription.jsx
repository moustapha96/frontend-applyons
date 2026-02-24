"use client";

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Layout, Row, Col, Card, Typography, List, Divider } from "antd";
import {
  UserOutlined,
  BankOutlined,
  TranslationOutlined,
  SettingOutlined,
  FileTextOutlined,
  SafetyCertificateOutlined,
  CreditCardOutlined,
  BellOutlined,
  TeamOutlined,
  AuditOutlined,
} from "@ant-design/icons";
import { PageMetaData } from "@/components";
import { LandingLayout } from "@/layouts";
import HeaderApplyons from "./components/Header";
import { getApplyonsMenuItems } from "./navConfig";

const { Title, Paragraph, Text } = Typography;

export default function AppDescription() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const menuItems = getApplyonsMenuItems(t);

  const roles = [
    {
      icon: <UserOutlined style={{ fontSize: 28 }} />,
      key: "demandeur",
      titleKey: "applyons.app.roles.demandeur.title",
      descKey: "applyons.app.roles.demandeur.description",
      featuresKey: "applyons.app.roles.demandeur.features",
    },
    {
      icon: <BankOutlined style={{ fontSize: 28 }} />,
      key: "institut",
      titleKey: "applyons.app.roles.institut.title",
      descKey: "applyons.app.roles.institut.description",
      featuresKey: "applyons.app.roles.institut.features",
    },
    {
      icon: <TranslationOutlined style={{ fontSize: 28 }} />,
      key: "traducteur",
      titleKey: "applyons.app.roles.traducteur.title",
      descKey: "applyons.app.roles.traducteur.description",
      featuresKey: "applyons.app.roles.traducteur.features",
    },
    {
      icon: <SettingOutlined style={{ fontSize: 28 }} />,
      key: "admin",
      titleKey: "applyons.app.roles.admin.title",
      descKey: "applyons.app.roles.admin.description",
      featuresKey: "applyons.app.roles.admin.features",
    },
  ];

  const modules = [
    { icon: <FileTextOutlined />, titleKey: "applyons.app.modules.demandes.title", descKey: "applyons.app.modules.demandes.desc" },
    { icon: <SafetyCertificateOutlined />, titleKey: "applyons.app.modules.authDoc.title", descKey: "applyons.app.modules.authDoc.desc" },
    { icon: <CreditCardOutlined />, titleKey: "applyons.app.modules.abonnements.title", descKey: "applyons.app.modules.abonnements.desc" },
    { icon: <AuditOutlined />, titleKey: "applyons.app.modules.paiements.title", descKey: "applyons.app.modules.paiements.desc" },
    { icon: <TeamOutlined />, titleKey: "applyons.app.modules.organisations.title", descKey: "applyons.app.modules.organisations.desc" },
    { icon: <BellOutlined />, titleKey: "applyons.app.modules.notifications.title", descKey: "applyons.app.modules.notifications.desc" },
  ];

  return (
    <LandingLayout>
      <PageMetaData title={t("applyons.app.metaTitle")} />
      <Layout className="min-h-screen">
        <HeaderApplyons menuItems={menuItems} />

        <div className="bg-gray-50 pb-20 pt-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Intro */}
            <div className="text-center mb-16">
              <Title level={1} style={{ color: "#254c6b", marginBottom: 16 }}>
                {t("applyons.app.title")}
              </Title>
              <Paragraph style={{ fontSize: "1.15rem", color: "#4b5563", maxWidth: 800, margin: "0 auto" }}>
                {t("applyons.app.subtitle")}
              </Paragraph>
            </div>

            {/* Roles */}
            <Title level={2} style={{ color: "#254c6b", marginBottom: 24 }}>
              {t("applyons.app.rolesTitle")}
            </Title>
            <Paragraph style={{ marginBottom: 32, color: "#4b5563" }}>
              {t("applyons.app.rolesIntro")}
            </Paragraph>
            <Row gutter={[24, 24]} style={{ marginBottom: 48 }}>
              {roles.map((role) => (
                <Col xs={24} md={12} key={role.key}>
                  <Card
                    style={{ height: "100%", borderRadius: 12, border: "1px solid #e2e8f0" }}
                    bodyStyle={{ padding: 24 }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
                      <div
                        style={{
                          width: 56,
                          height: 56,
                          borderRadius: 12,
                          background: "rgba(37, 76, 107, 0.1)",
                          color: "#254c6b",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {role.icon}
                      </div>
                      <Title level={4} style={{ margin: 0 }}>
                        {t(role.titleKey)}
                      </Title>
                    </div>
                    <Paragraph style={{ color: "#4b5563", marginBottom: 16 }}>
                      {t(role.descKey)}
                    </Paragraph>
                    <List
                      size="small"
                      dataSource={["f1", "f2", "f3", "f4"].map((k) => t(`${role.featuresKey}.${k}`)).filter(Boolean)}
                      renderItem={(item) => (
                        <List.Item style={{ borderBottom: "none", padding: "4px 0" }}>
                          <Text style={{ fontSize: "0.9rem", color: "#475569" }}>• {item}</Text>
                        </List.Item>
                      )}
                    />
                  </Card>
                </Col>
              ))}
            </Row>

            <Divider />

            {/* Modules */}
            <Title level={2} style={{ color: "#254c6b", marginBottom: 24 }}>
              {t("applyons.app.modulesTitle")}
            </Title>
            <Paragraph style={{ marginBottom: 32, color: "#4b5563" }}>
              {t("applyons.app.modulesIntro")}
            </Paragraph>
            <Row gutter={[16, 16]}>
              {modules.map((mod, idx) => (
                <Col xs={24} sm={12} lg={8} key={idx}>
                  <Card size="small" style={{ borderRadius: 10, height: "100%" }} bodyStyle={{ padding: 20 }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 8,
                          background: "rgba(37, 76, 107, 0.1)",
                          color: "#254c6b",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {mod.icon}
                      </div>
                      <div>
                        <Text strong style={{ display: "block", marginBottom: 4 }}>
                          {t(mod.titleKey)}
                        </Text>
                        <Text type="secondary" style={{ fontSize: "0.9rem" }}>
                          {t(mod.descKey)}
                        </Text>
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>

            <Divider />

            {/* Workflow */}
            <Title level={2} style={{ color: "#254c6b", marginBottom: 24 }}>
              {t("applyons.app.workflowTitle")}
            </Title>
            <Paragraph style={{ marginBottom: 24, color: "#4b5563" }}>
              {t("applyons.app.workflowIntro")}
            </Paragraph>
            <Card style={{ borderRadius: 12, background: "#fff", border: "1px solid #e2e8f0" }} bodyStyle={{ padding: 24 }}>
              <List
                dataSource={[1, 2, 3, 4, 5].map((i) => ({
                  step: i,
                  text: t(`applyons.app.workflow.step${i}`),
                }))}
                renderItem={({ step, text }) => (
                  <List.Item style={{ borderBottom: "none", padding: "12px 0", alignItems: "flex-start" }}>
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        background: "#254c6b",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 600,
                        flexShrink: 0,
                        marginRight: 16,
                      }}
                    >
                      {step}
                    </div>
                    <Text style={{ fontSize: "1rem" }}>{text}</Text>
                  </List.Item>
                )}
              />
            </Card>

            {/* CTA */}
            <div className="text-center mt-16">
              <Paragraph style={{ marginBottom: 16, fontSize: "1.1rem" }}>
                {t("applyons.app.ctaText")}
              </Paragraph>
              <a
                href="https://admin.applyons.com/auth/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 rounded-lg font-semibold text-white"
                style={{ background: "#254c6b" }}
              >
                {t("applyons.app.ctaButton")}
              </a>
            </div>
          </div>
        </div>
      </Layout>
    </LandingLayout>
  );
}
