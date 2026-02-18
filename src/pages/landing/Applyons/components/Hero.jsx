

"use client"

import { Row, Col, Typography, Button, Image } from "antd"
import { useTranslation } from "react-i18next"
import { UserCheck } from "lucide-react"
import logo from "@/assets/logo.png"

const ADMIN_BASE_URL = "https://admin.applyons.com"

const { Title, Paragraph } = Typography

export default function HeroApplayons() {
    const { t } = useTranslation();

    return (
        <div
            style={{
                background: "linear-gradient(135deg, #f0f5ff 0%, #ffffff 100%)",
                padding: "100px 0",
                overflow: "hidden",
                position: "relative",
            }}
        >
            <div className="container mx-auto px-4">
                <Row gutter={[48, 48]} align="middle">
                    {/* Texte */}
                    <Col xs={24} md={12}>
                        <div style={{ maxWidth: 600 }}>
                            <Title
                                level={1}
                                style={{
                                    fontSize: "3.5rem",
                                    fontWeight: "800",
                                    marginBottom: "24px",
                                    color: "#254c6b",
                                    lineHeight: "1.2",
                                }}
                            >
                                {t('applyons.hero.title')}
                            </Title>
                            <Paragraph
                                style={{
                                    fontSize: "1.25rem",
                                    color: "#4b5563",
                                    marginBottom: "32px",
                                    fontWeight: "500",
                                    lineHeight: "1.6",
                                }}
                            >
                                {t('applyons.hero.subtitle')}
                            </Paragraph>

                            <div className="flex flex-col sm:flex-col gap-6 mb-4">
                                <Button
                                    block
                                    type="primary"
                                    style={{ borderRadius: "12px" }}
                                    className="bg-blueLogo hover:bg-rougeLogo text-white font-bold py-2 px-4 rounded"
                                    href={`${ADMIN_BASE_URL}/auth/demandeur`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    icon={<UserCheck size={20} />}
                                >
                                    {t('requestAuthentication')}
                                </Button>

                                <Button
                                    block
                                    type="primary"
                                    style={{ borderRadius: "12px" }}
                                    className="bg-blueLogo hover:bg-rougeLogo text-white font-bold py-2 px-4 rounded"
                                    href={`${ADMIN_BASE_URL}/auth/institut`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    icon={<UserCheck size={20} />}
                                >
                                    {t('checkDocumentAuthenticity')}
                                </Button>
                            </div>
                        </div>
                    </Col>

                    {/* Image */}
                    <Col xs={24} md={12}>
                        <div
                            style={{
                                position: "relative",
                                height: "500px",
                                width: "100%",
                                borderRadius: "16px",
                                overflow: "hidden",
                                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                                transform: "perspective(1000px) rotateY(-5deg)",
                            }}
                        >
                            <Image
                                src={logo}
                                alt="ApplyOns Dashboard"
                                preview={false}
                                style={{
                                    objectFit: "cover",
                                    width: "100%",
                                    height: "100%",
                                }}
                            />
                            <div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    background: "linear-gradient(135deg, rgba(36, 55, 122, 0.2), transparent)",
                                }}
                            />
                        </div>
                    </Col>
                </Row>
            </div>

            {/* Background décoratif */}
            <div
                style={{
                    position: "absolute",
                    top: "-150px",
                    right: "-150px",
                    width: "500px",
                    height: "500px",
                    borderRadius: "50%",
                    background: "rgba(36, 55, 122, 0.08)",
                    filter: "blur(80px)",
                    zIndex: 0,
                }}
            />
            <div
                style={{
                    position: "absolute",
                    bottom: "-150px",
                    left: "-150px",
                    width: "500px",
                    height: "500px",
                    borderRadius: "50%",
                    background: "rgba(36, 55, 122, 0.08)",
                    filter: "blur(80px)",
                    zIndex: 0,
                }}
            />
        </div>
    )
}
