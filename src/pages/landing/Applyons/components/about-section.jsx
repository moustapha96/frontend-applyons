

"use client"
import { Typography, Row, Col, Card } from "antd"
import { CheckCircleOutlined } from "@ant-design/icons"
import { useTranslation } from "react-i18next"

const { Title, Paragraph } = Typography

export default function AboutSection() {
    const { t } = useTranslation()

    return (
        <section id="about" style={{ padding: "80px 0", background: "#f9fafb" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
                <div style={{ textAlign: "center", marginBottom: "60px" }}>
                    <Title
                        level={2}
                        style={{
                            color: "#254c6b",
                            marginBottom: "16px",
                            animation: "fadeInUp 0.7s ease-in-out",
                        }}
                    >
                        {t("about.title")}
                    </Title>
                    <div
                        style={{
                            width: "64px",
                            height: "4px",
                            background: "#24377A",
                            margin: "0 auto",
                            borderRadius: "4px",
                            animation: "fadeInUp 1s ease-in-out 0.5s",
                            animationFillMode: "both",
                        }}
                    ></div>
                    <Paragraph
                        style={{
                            fontSize: "1rem",
                            color: "#4b5563",
                            maxWidth: "800px",
                            margin: "16px auto 0",
                            textAlign: "justify",
                        }}
                    >
                        {t("about.description")
                            .split("\n\n")
                            .map((paragraph, index) => (
                                <span key={index}>
                                    {paragraph}
                                    {index < t("about.description").split("\n\n").length - 1 && (
                                        <>
                                            <br />
                                            <br />
                                        </>
                                    )}
                                </span>
                            ))}
                    </Paragraph>
                </div>

                <Row gutter={[32, 32]} align="middle">
                    <Col xs={24} lg={12}>
                        <div style={{ marginBottom: "40px" }}>
                            <Title level={3} style={{ color: "#111827", marginBottom: "16px" }}>
                                {t("about.mission.title")}
                            </Title>
                            <Paragraph style={{ color: "#4b5563", textAlign: "justify" }}>{t("about.mission.description")}</Paragraph>
                        </div>

                        <div>
                            <Title level={3} style={{ color: "#111827", marginBottom: "16px" }}>
                                {t("about.vision.title")}
                            </Title>
                            <Paragraph style={{ color: "#4b5563", textAlign: "justify" }}>{t("about.vision.description")}</Paragraph>
                        </div>
                    </Col>

                    <Col xs={24} lg={12} style={{ display: "flex", justifyContent: "center" }}>
                        <img
                            src="/placeholder.svg?height=600&width=600"
                            alt="À propos d'ApplyOns"
                            style={{
                                maxWidth: "100%",
                                height: "auto",
                                borderRadius: "8px",
                                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                            }}
                        />
                    </Col>
                </Row>

                <Row gutter={[24, 24]} style={{ marginTop: "64px" }}>
                    <Col xs={24} lg={8}>
                        <Card style={{ height: "100%", textAlign: "center" }}>
                            <CheckCircleOutlined style={{ fontSize: "36px", color: "#254c6b", marginBottom: "16px" }} />
                            <Title level={4} style={{ color: "#111827", marginBottom: "8px" }}>
                                {t("about.values.integrity.title")}
                            </Title>
                            <Paragraph style={{ color: "#4b5563", textAlign: "left" }}>
                                {t("about.values.integrity.description")}
                            </Paragraph>
                        </Card>
                    </Col>

                    <Col xs={24} lg={8}>
                        <Card style={{ height: "100%", textAlign: "center" }}>
                            <CheckCircleOutlined style={{ fontSize: "36px", color: "#254c6b", marginBottom: "16px" }} />
                            <Title level={4} style={{ color: "#111827", marginBottom: "8px" }}>
                                {t("about.values.innovation.title")}
                            </Title>
                            <Paragraph style={{ color: "#4b5563", textAlign: "left" }}>
                                {t("about.values.innovation.description")}
                            </Paragraph>
                        </Card>
                    </Col>

                    <Col xs={24} lg={8}>
                        <Card style={{ height: "100%", textAlign: "center" }}>
                            <CheckCircleOutlined style={{ fontSize: "36px", color: "#254c6b", marginBottom: "16px" }} />
                            <Title level={4} style={{ color: "#111827", marginBottom: "8px" }}>
                                {t("about.values.accessibility.title")}
                            </Title>
                            <Paragraph style={{ color: "#4b5563", textAlign: "left" }}>
                                {t("about.values.accessibility.description")}
                            </Paragraph>
                        </Card>
                    </Col>
                </Row>
            </div>

            <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.7s ease-in-out;
        }

        .animate-underline {
          animation: fadeInUp 1s ease-in-out 0.5s;
          animation-fill-mode: both;
        }
      `}</style>
        </section>
    )
}
