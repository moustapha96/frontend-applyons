

"use client"

import { Layout, Row, Col, Typography, Space, Divider } from "antd"
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, LinkedinOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import logo from "@/assets/logo.png"
import logo_blanc from "@/assets/logo_blanc.png"
import { useSettingsContext } from "@/context"

const { Footer } = Layout
const { Title, Text, Link: AntLink } = Typography

export default function FooterAppyons() {
    const { t } = useTranslation()
    const { settings } = useSettingsContext()
    const currentYear = new Date().getFullYear()

    const siteName = settings?.siteName || "Applyons"
    const social = settings?.socialMedia || {}
    const footerText = settings?.footer

    return (
        <Footer className=" bg-blueLogo  p-8 text-white">



            <div className="container mx-auto px-4">
                <Row gutter={[48, 32]}>
                    <Col xs={24} md={6}>
                        <div className="flex items-center mb-4 md:mb-0">
                            <img src={logo_blanc} alt="logo ApplyOns" width={40} height={40} />
                            <span className=" text-lg font-bold">{siteName}</span>
                        </div>



                        <Text className="text-white opacity-80" style={{ display: "block", marginBottom: "16px" }}>{t('applyons.footer.description')}</Text>
                        <Space size="large">
                            <AntLink
                                href={social.facebook || "https://www.facebook.com/profile.php?id=61577351653295"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white opacity-80 font-bold hover:opacity-100"
                                style={{ fontSize: "20px" }}
                                aria-label="Facebook ApplyOns"
                            >
                                <FacebookOutlined />
                            </AntLink>
                            <AntLink
                                href={social.twitter || "https://x.com/esefemdiop?s=11"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white opacity-80 font-bold hover:opacity-100"
                                style={{ fontSize: "20px" }}
                                aria-label="X (Twitter) ApplyOns"
                            >
                                <TwitterOutlined />
                            </AntLink>
                            <AntLink
                                href={social.instagram || "https://www.instagram.com/applyonsny?igsh=d3k3b216dHBtaWdo&utm_source=qr"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white opacity-80 font-bold hover:opacity-100"
                                style={{ fontSize: "20px" }}
                                aria-label="Instagram ApplyOns"
                            >
                                <InstagramOutlined />
                            </AntLink>
                            <AntLink
                                href={social.linkedin || "https://www.linkedin.com/company/applyons/"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white opacity-80 font-bold hover:opacity-100"
                                style={{ fontSize: "20px" }}
                                aria-label="LinkedIn ApplyOns"
                            >
                                <LinkedinOutlined />
                            </AntLink>
                        </Space>
                    </Col>

                    <Col xs={24} md={6}>
                        <Title level={4} style={{ color: "#fff", marginBottom: "16px" }}>
                            {t('applyons.footer.product')}
                        </Title>
                        <ul style={{ listStyle: "none", padding: 0 }}>
                            <li style={{ marginBottom: "12px" }}>
                                <Link to={{ pathname: "/", hash: "features" }} style={{ color: "#fff" }}>
                                    {t('applyons.footer.features')}
                                </Link>
                            </li>
                            <li style={{ marginBottom: "12px" }}>
                                <Link to={{ pathname: "/", hash: "pricing" }} style={{ color: "#fff" }}>
                                    {t('applyons.footer.pricing')}
                                </Link>
                            </li>
                            <li style={{ marginBottom: "12px" }}>
                                <Link to={{ pathname: "/", hash: "faq" }} style={{ color: "#fff" }}>
                                    {t('applyons.footer.faq')}
                                </Link>
                            </li>
                            <li style={{ marginBottom: "12px" }}>
                                <Link to={{ pathname: "/", hash: "testimonials" }} style={{ color: "#fff" }}>
                                    {t('applyons.footer.testimonials')}
                                </Link>
                            </li>
                        </ul>
                    </Col>

                    <Col xs={24} md={6}>
                        <Title level={4} style={{ color: "#fff", marginBottom: "16px" }}>
                            {t('applyons.footer.company')}
                        </Title>
                        <ul style={{ listStyle: "none", padding: 0 }}>
                            <li style={{ marginBottom: "12px" }}>
                                <Link to="/about" style={{ color: "#fff" }}>
                                    {t('applyons.footer.about')}
                                </Link>
                            </li>
                            <li style={{ marginBottom: "12px" }}>
                                <Link to="/contact" style={{ color: "#fff" }}>
                                    {t('applyons.footer.contact')}
                                </Link>
                            </li>
                        </ul>
                    </Col>

                    <Col xs={24} md={6}>
                        <Title level={4} style={{ color: "#fff", marginBottom: "16px" }}>
                            {t('applyons.footer.legal')}
                        </Title>
                        <ul style={{ listStyle: "none", padding: 0 }}>
                            <li style={{ marginBottom: "12px" }}>
                                <Link to="/privacy-policy" style={{ color: "#fff" }}>
                                    {t('applyons.footer.privacy')}
                                </Link>
                            </li>
                            <li style={{ marginBottom: "12px" }}>
                                <Link to="/terms-and-conditions" style={{ color: "#fff" }}>
                                    {t('applyons.footer.terms')}
                                </Link>
                            </li>
                            <li style={{ marginBottom: "12px" }}>
                                <Link to="/cookie-policy" style={{ color: "#fff" }}>
                                    {t('applyons.footer.cookies')}
                                </Link>
                            </li>
                            <li style={{ marginBottom: "12px" }}>
                                <Link to="/legal-notice" style={{ color: "#fff" }}>
                                    {t('applyons.footer.legalNotice')}
                                </Link>
                            </li>
                            <li style={{ marginBottom: "12px" }}>
                                <Link to="/security-trust" style={{ color: "#fff" }}>
                                    {t('applyons.footer.security')}
                                </Link>
                            </li>
                        </ul>
                    </Col>
                </Row>

                <Divider style={{ margin: "40px 0 24px" }} />

                <div style={{ textAlign: "center", color: "#fff", }}>

                    <Text className="text-white opacity-80">
                        {footerText || `© ${currentYear} ${siteName} ${t('applyons.footer.copyright')}`}
                    </Text>
                </div>
            </div>
        </Footer>
    )
}
