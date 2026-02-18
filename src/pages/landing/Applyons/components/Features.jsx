
"use client"

import { Row, Col, Typography, Card } from "antd"
import { useTranslation } from "react-i18next"
import {
    FileTextOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    SafetyOutlined,
    BarChartOutlined,
    TeamOutlined,
} from "@ant-design/icons"

const { Title, Paragraph } = Typography

export default function FeaturesApplayons() {
    const { t } = useTranslation();

    const features = [
        {
            icon: <FileTextOutlined style={{ fontSize: 24 }} />,
            title: t('applyons.features.customForms.title'),
            description: t('applyons.features.customForms.description'),
        },
        {
            icon: <CheckCircleOutlined style={{ fontSize: 24 }} />,
            title: t('applyons.features.documentVerification.title'),
            description: t('applyons.features.documentVerification.description'),
        },
        {
            icon: <ClockCircleOutlined style={{ fontSize: 24 }} />,
            title: t('applyons.features.realTimeUpdates.title'),
            description: t('applyons.features.realTimeUpdates.description'),
        },
        {
            icon: <SafetyOutlined style={{ fontSize: 24 }} />,
            title: t('applyons.features.security.title'),
            description: t('applyons.features.security.description'),
        },
        {
            icon: <BarChartOutlined style={{ fontSize: 24 }} />,
            title: t('applyons.features.analytics.title'),
            description: t('applyons.features.analytics.description'),
        },
        {
            icon: <TeamOutlined style={{ fontSize: 24 }} />,
            title: t('applyons.features.collaboration.title'),
            description: t('applyons.features.collaboration.description'),
        },
    ]


    return (
        <div style={{ padding: "80px 0", background: "#fff" }}>
            <div className="container mx-auto px-4">
                <div style={{ textAlign: "center", marginBottom: "60px" }}>
                    <Title level={2} style={{ color: "#254c6b", marginBottom: "16px" }}>
                        {t('applyons.features.title')}
                    </Title>
                    <div
                        style={{
                            width: "64px",
                            height: "4px",
                            background: "#24377A",
                            margin: "0 auto",
                            borderRadius: "4px",
                        }}
                    ></div>
                    <Paragraph
                        style={{
                            fontSize: "1.1rem",
                            color: "#4b5563",
                            maxWidth: "800px",
                            margin: "16px auto 0",
                        }}
                    >
                        {t('applyons.features.subtitle')}
                    </Paragraph>
                </div>

                <Row gutter={[24, 24]}>
                    {features.map((feature, index) => (
                        <Col xs={24} md={12} lg={8} key={index}>
                            <Card hoverable style={{ height: "100%", padding: "24px" }}>
                                <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            width: "48px",
                                            height: "48px",
                                            borderRadius: "8px",
                                            backgroundColor: "rgba(36, 55, 122, 0.1)",
                                            color: "#254c6b",
                                            flexShrink: 0,
                                        }}
                                    >
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <Title level={4} style={{ marginTop: 0, marginBottom: "8px" }}>
                                            {feature.title}
                                        </Title>
                                        <Paragraph style={{ color: "#4b5563", marginBottom: 0 }}>{feature.description}</Paragraph>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    )
}
