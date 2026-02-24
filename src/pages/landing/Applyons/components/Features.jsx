"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Row, Col, Typography, Card, Button, Modal } from "antd"
import { useTranslation } from "react-i18next"
import {
    FileTextOutlined,
    CloudUploadOutlined,
    CreditCardOutlined,
    BellOutlined,
    SafetyOutlined,
    DashboardOutlined,
    RightOutlined,
    InfoCircleOutlined,
} from "@ant-design/icons"

const { Title, Paragraph } = Typography

const FEATURE_KEYS = [
    { key: "authRequest", icon: FileTextOutlined },
    { key: "documentDeposit", icon: CloudUploadOutlined },
    { key: "subscriptions", icon: CreditCardOutlined },
    { key: "workflowNotifications", icon: BellOutlined },
    { key: "securityTraceability", icon: SafetyOutlined },
    { key: "dashboards", icon: DashboardOutlined },
]

export default function FeaturesApplayons() {
    const { t } = useTranslation()
    const [popupIndex, setPopupIndex] = useState(null)

    const hasMore = (key) => {
        try {
            const v = t(`applyons.features.${key}.more`)
            return v && typeof v === "string" && v !== `applyons.features.${key}.more`
        } catch {
            return false
        }
    }

    return (
        <div id="features" style={{ padding: "80px 0", background: "#fff" }}>
            <div className="container mx-auto px-4">
                <div style={{ textAlign: "center", marginBottom: "60px" }}>
                    <Title level={2} style={{ color: "#254c6b", marginBottom: "16px" }}>
                        {t("applyons.features.title")}
                    </Title>
                    <div
                        style={{
                            width: "64px",
                            height: "4px",
                            background: "#24377A",
                            margin: "0 auto",
                            borderRadius: "4px",
                        }}
                    />
                    <Paragraph
                        style={{
                            fontSize: "1.1rem",
                            color: "#4b5563",
                            maxWidth: "800px",
                            margin: "16px auto 0",
                        }}
                    >
                        {t("applyons.features.subtitle")}
                    </Paragraph>
                </div>

                <Row gutter={[24, 24]}>
                    {FEATURE_KEYS.map((item, index) => {
                        const Icon = item.icon
                        return (
                            <Col xs={24} md={12} lg={8} key={item.key}>
                                <Card
                                    hoverable
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => setPopupIndex(index)}
                                    onKeyDown={(e) => e.key === "Enter" && setPopupIndex(index)}
                                    style={{
                                        height: "100%",
                                        padding: "24px",
                                        cursor: "pointer",
                                        border: "1px solid #e2e8f0",
                                        borderRadius: "12px",
                                    }}
                                >
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
                                            <Icon style={{ fontSize: 24 }} />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <Title level={4} style={{ marginTop: 0, marginBottom: "8px" }}>
                                                {t(`applyons.features.${item.key}.title`)}
                                            </Title>
                                            <Paragraph style={{ color: "#4b5563", marginBottom: 0 }}>
                                                {t(`applyons.features.${item.key}.description`)}
                                            </Paragraph>
                                            <div style={{ marginTop: "12px", display: "flex", alignItems: "center", gap: "6px", color: "#254c6b", fontSize: "0.8rem" }}>
                                                <InfoCircleOutlined />
                                                <span>{t("applyons.features.clickForMore")}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>

                <div style={{ textAlign: "center", marginTop: "48px" }}>
                    <Link to="/app">
                        <Button type="primary" size="large" style={{ background: "#254c6b", borderColor: "#254c6b" }} icon={<RightOutlined />}>
                            {t("applyons.features.discoverApp")}
                        </Button>
                    </Link>
                </div>
            </div>

            <Modal
                open={popupIndex !== null}
                onCancel={() => setPopupIndex(null)}
                footer={null}
                width={560}
                centered
                title={popupIndex !== null ? t(`applyons.features.${FEATURE_KEYS[popupIndex].key}.title`) : ""}
            >
                {popupIndex !== null && (
                    <>
                        <Paragraph style={{ fontSize: "1rem", color: "#4b5563", marginBottom: 16 }}>
                            {t(`applyons.features.${FEATURE_KEYS[popupIndex].key}.description`)}
                        </Paragraph>
                        {hasMore(FEATURE_KEYS[popupIndex].key) && (
                            <Paragraph style={{ fontSize: "1rem", color: "#4b5563", marginBottom: 0 }}>
                                {t(`applyons.features.${FEATURE_KEYS[popupIndex].key}.more`)}
                            </Paragraph>
                        )}
                    </>
                )}
            </Modal>
        </div>
    )
}
