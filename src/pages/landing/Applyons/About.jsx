"use client"

import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { PageMetaData } from "@/components"
import { LandingLayout } from "@/layouts"
import { Layout, Typography, Row, Col, Card } from "antd"
import HeaderApplyons from "./components/Header"
import { getApplyonsMenuItems } from "./navConfig"
import { useEffect } from "react"
import { Target, Eye, Shield, Lightbulb, Lock, Globe } from "lucide-react"
import { useSettingsContext } from "@/context"

const { Title, Paragraph, Text } = Typography

const About = () => {
  const { t } = useTranslation()
  const { settings } = useSettingsContext()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const menuItems = getApplyonsMenuItems(t)

  const values = [
    { key: "trust", icon: Shield, color: "#254c6b" },
    { key: "innovation", icon: Lightbulb, color: "#764ba2" },
    { key: "security", icon: Lock, color: "#0d9488" },
    { key: "accessibility", icon: Globe, color: "#2563eb" },
  ]

  // Support à la fois settings.teamMembers et settings.data.teamMembers (selon la forme de la réponse API)
  const rawTeam = settings?.teamMembers ?? settings?.data?.teamMembers
  console.log(rawTeam)
  const teamFromSettings = Array.isArray(rawTeam) && rawTeam.length > 0 ? rawTeam : null
  const teamMembers = teamFromSettings ?? [1, 2, 3]
  const useI18nTeam = !teamFromSettings
  const apiBaseUrl = (typeof window !== "undefined" && import.meta.env?.VITE_API_URL)
    ? String(import.meta.env.VITE_API_URL).replace(/\/api\/?$/, "").replace(/\/$/, "")
    : ""

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((s) => s[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()
  }

  return (
    <LandingLayout>
      <PageMetaData title={t("applyons.about.title")} />

      <Layout style={{ minHeight: "100vh", background: "#fff" }}>
        <HeaderApplyons menuItems={menuItems} />

        {/* Hero */}
        <div
          style={{
            padding: "100px 24px 64px",
            background: "linear-gradient(165deg, #f0f4f8 0%, #e8eef5 40%, #f5f7fa 100%)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "radial-gradient(circle at 20% 20%, rgba(37, 76, 107, 0.06) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(118, 75, 162, 0.05) 0%, transparent 50%)",
            }}
          />
          <div style={{ position: "relative", zIndex: 1, maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "16px",
                padding: "8px 16px",
                borderRadius: "100px",
                background: "rgba(37, 76, 107, 0.1)",
                color: "#254c6b",
                fontSize: "0.875rem",
                fontWeight: 600,
                letterSpacing: "0.02em",
              }}
            >
              <Target size={18} strokeWidth={2} />
              {t("applyons.about.title")}
            </div>
            <Title
              level={1}
              style={{
                color: "#0f172a",
                marginBottom: "16px",
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}
            >
              {t("applyons.about.title")}
            </Title>
            <Paragraph
              style={{
                fontSize: "1.125rem",
                color: "#64748b",
                maxWidth: "600px",
                margin: "0 auto",
                lineHeight: 1.6,
              }}
            >
              {t("applyons.about.subtitle")}
            </Paragraph>
          </div>
        </div>

        {/* Content */}
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "48px 24px 64px" }}>
          {/* Mission */}
          <Card
            style={{
              marginBottom: "24px",
              borderRadius: "20px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.04)",
              border: "none",
              overflow: "hidden",
            }}
            bodyStyle={{ padding: "32px 40px" }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: "20px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "14px",
                  background: "linear-gradient(135deg, #254c6b 0%, #3d6b8a 100%)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Target size={24} strokeWidth={2} />
              </div>
              <div>
                <Title level={3} style={{ color: "#254c6b", marginBottom: "12px", fontSize: "1.35rem" }}>
                  {t("applyons.about.mission.title")}
                </Title>
                <Paragraph style={{ color: "#475569", marginBottom: "12px", lineHeight: 1.7, fontSize: "1rem" }}>
                  {t("applyons.about.mission.description")}
                </Paragraph>
                {t("applyons.about.mission.more") !== "applyons.about.mission.more" && (
                  <Paragraph style={{ color: "#64748b", marginBottom: 0, lineHeight: 1.7, fontSize: "0.95rem" }}>
                    {t("applyons.about.mission.more")}
                  </Paragraph>
                )}
              </div>
            </div>
          </Card>

          {/* Vision */}
          <Card
            style={{
              marginBottom: "24px",
              borderRadius: "20px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.04)",
              border: "none",
              overflow: "hidden",
            }}
            bodyStyle={{ padding: "32px 40px" }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: "20px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "14px",
                  background: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Eye size={24} strokeWidth={2} />
              </div>
              <div>
                <Title level={3} style={{ color: "#254c6b", marginBottom: "12px", fontSize: "1.35rem" }}>
                  {t("applyons.about.vision.title")}
                </Title>
                <Paragraph style={{ color: "#475569", marginBottom: "12px", lineHeight: 1.7, fontSize: "1rem" }}>
                  {t("applyons.about.vision.description")}
                </Paragraph>
                {t("applyons.about.vision.more") !== "applyons.about.vision.more" && (
                  <Paragraph style={{ color: "#64748b", marginBottom: 0, lineHeight: 1.7, fontSize: "0.95rem" }}>
                    {t("applyons.about.vision.more")}
                  </Paragraph>
                )}
              </div>
            </div>
          </Card>

          {/* Values */}
          <Title
            level={2}
            style={{
              color: "#254c6b",
              textAlign: "center",
              marginBottom: "32px",
              fontSize: "1.75rem",
              fontWeight: 700,
            }}
          >
            {t("applyons.about.values.title")}
          </Title>
          <Row gutter={[20, 20]} style={{ marginBottom: "48px" }}>
            {values.map(({ key, icon: Icon, color }) => (
              <Col xs={24} md={12} key={key}>
                <Card
                  style={{
                    borderRadius: "16px",
                    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(0, 0, 0, 0.04)",
                    border: "none",
                    height: "100%",
                    transition: "box-shadow 0.25s ease",
                  }}
                  bodyStyle={{ padding: "24px 28px" }}
                  className="about-value-card"
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      background: `${color}18`,
                      color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "16px",
                    }}
                  >
                    <Icon size={22} strokeWidth={2} />
                  </div>
                  <Title level={5} style={{ color: "#1e293b", marginBottom: "8px", fontSize: "1.1rem" }}>
                    {t(`applyons.about.values.${key}.title`)}
                  </Title>
                  <Paragraph style={{ color: "#475569", marginBottom: 0, lineHeight: 1.65, fontSize: "0.95rem" }}>
                    {t(`applyons.about.values.${key}.description`)}
                  </Paragraph>
                  {t(`applyons.about.values.${key}.more`) !== `applyons.about.values.${key}.more` && (
                    <Paragraph
                      style={{
                        color: "#64748b",
                        marginTop: "10px",
                        marginBottom: 0,
                        lineHeight: 1.65,
                        fontSize: "0.9rem",
                      }}
                    >
                      {t(`applyons.about.values.${key}.more`)}
                    </Paragraph>
                  )}
                </Card>
              </Col>
            ))}
          </Row>

          {/* Team */}
          <Title
            level={2}
            style={{
              color: "#254c6b",
              textAlign: "center",
              marginBottom: "12px",
              fontSize: "1.75rem",
              fontWeight: 700,
            }}
          >
            {t("applyons.about.team.title")}
          </Title>
          <Paragraph
            style={{
              textAlign: "center",
              color: "#64748b",
              marginBottom: "32px",
              maxWidth: "560px",
              margin: "0 auto 32px",
              lineHeight: 1.6,
            }}
          >
            {t("applyons.about.team.description")}
          </Paragraph>
          <Row gutter={[24, 24]} justify="center">
            {teamMembers.map((member, i) => {
              const name = useI18nTeam ? t(`applyons.about.team.member${member}.name`) : (member?.name ?? "")
              const role = useI18nTeam ? t(`applyons.about.team.member${member}.role`) : (member?.role ?? "")
              const description = useI18nTeam ? null : (member?.description ?? "")
              const imagePath = useI18nTeam ? null : (member?.image ?? "")
              const initials = getInitials(name || "?")
              const imageUrl = imagePath
                ? (imagePath.startsWith("http") ? imagePath : `${apiBaseUrl}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`)
                : null
              return (
                <Col xs={24} sm={12} md={8} key={useI18nTeam ? `i18n-${i}` : `team-${i}-${member?.name ?? i}`}>
                  <Card
                    style={{
                      borderRadius: "16px",
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.04)",
                      border: "none",
                      textAlign: "center",
                      overflow: "hidden",
                    }}
                    bodyStyle={{ padding: "28px 24px" }}
                  >
                    <div
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "50%",
                        background: imageUrl ? "transparent" : "linear-gradient(135deg, #254c6b 0%, #764ba2 100%)",
                        color: "#fff",
                        fontSize: "1.5rem",
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 16px",
                        overflow: "hidden",
                      }}
                    >
                      {imageUrl ? (
                        <img src={imageUrl} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        initials
                      )}
                    </div>
                    <Title level={5} style={{ color: "#1e293b", marginBottom: "4px", fontSize: "1.1rem" }}>
                      {name}
                    </Title>
                    <Text style={{ color: "#64748b", fontSize: "0.9rem" }}>{role}</Text>
                    {description ? (
                      <Paragraph style={{ marginTop: 8, marginBottom: 0, fontSize: "0.85rem", color: "#64748b", lineHeight: 1.5 }}>
                        {description}
                      </Paragraph>
                    ) : null}
                  </Card>
                </Col>
              )
            })}
          </Row>

          {/* CTA */}
          <div
            style={{
              marginTop: "48px",
              padding: "32px 24px",
              borderRadius: "20px",
              background: "linear-gradient(135deg, rgba(37, 76, 107, 0.08) 0%, rgba(118, 75, 162, 0.06) 100%)",
              textAlign: "center",
              border: "1px solid rgba(37, 76, 107, 0.12)",
            }}
          >
            <Paragraph style={{ color: "#475569", marginBottom: "16px", fontSize: "1.05rem" }}>
              {t("applyons.about.ctaText")}
            </Paragraph>
            <Link
              to="/contact"
              style={{
                display: "inline-block",
                padding: "12px 28px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #254c6b 0%, #3d6b8a 100%)",
                color: "#fff",
                fontWeight: 600,
                fontSize: "1rem",
                textDecoration: "none",
                transition: "opacity 0.2s, transform 0.2s",
              }}
              className="about-cta-link"
            >
              {t("applyons.footer.contact")}
            </Link>
          </div>
        </div>

      </Layout>

      <style>{`
      
        .about-value-card:hover {
          box-shadow: 0 12px 28px rgba(37, 76, 107, 0.12), 0 0 0 1px rgba(37, 76, 107, 0.08);
        }
        .about-cta-link:hover {
          color: #fff;
          opacity: 0.95;
          transform: translateY(-1px);
        }
      `}</style>
    </LandingLayout>
  )
}

export default About
