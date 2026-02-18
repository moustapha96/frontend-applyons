"use client"
import { Typography, Row, Col } from "antd"
import { RightOutlined } from "@ant-design/icons"

const { Title, Paragraph, Text } = Typography

export default function AuthenticationSection() {
    return (
        <>
            <section id="solutions" style={{ padding: "40px 0 80px", background: "#f9fafb" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
                    <Row gutter={[32, 32]} align="middle">
                        <Col xs={24} md={12} style={{ display: "flex", justifyContent: "center" }}>
                            <img
                                src="/placeholder.svg?height=600&width=600"
                                alt="Secure authentication with ApplyOns"
                                style={{
                                    maxWidth: "100%",
                                    height: "auto",
                                    borderRadius: "8px",
                                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                                    animation: "fadeIn 1s ease-in-out",
                                }}
                            />
                        </Col>

                        <Col xs={24} md={12}>
                            <Text
                                style={{
                                    fontSize: "0.875rem",
                                    textTransform: "uppercase",
                                    fontWeight: "600",
                                    letterSpacing: "0.05em",
                                    color: "#254c6b",
                                    display: "block",
                                    marginBottom: "8px",
                                }}
                            >
                                AUTHENTIFICATION SÉCURISÉE
                            </Text>
                            <Title level={2} style={{ color: "#254c6b", marginBottom: "16px" }}>
                                Vérification d'identité avancée
                            </Title>
                            <div
                                style={{
                                    width: "64px",
                                    height: "4px",
                                    background: "#24377A",
                                    marginBottom: "16px",
                                    borderRadius: "4px",
                                }}
                            ></div>

                            <Paragraph style={{ color: "#4b5563", marginBottom: "20px" }}>
                                Notre système d'authentification avancé garantit que seules les personnes autorisées peuvent accéder aux
                                documents sensibles. Nous utilisons des technologies de pointe pour vérifier l'identité des utilisateurs
                                et prévenir les fraudes.
                            </Paragraph>
                            <Paragraph style={{ color: "#4b5563", marginBottom: "20px" }}>
                                Avec ApplyOns, vous pouvez être sûr que vos données sont protégées par les mesures de sécurité les plus
                                strictes. Notre système est conforme aux normes internationales de protection des données.
                            </Paragraph>
                            <a
                                href="/trust-and-safety"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    color: "#254c6b",
                                    fontSize: "1.25rem",
                                    fontWeight: "500",
                                    position: "relative",
                                }}
                            >
                                <span
                                    style={{
                                        position: "absolute",
                                        height: "1px",
                                        width: "70%",
                                        background: "rgba(36, 55, 122, 0.8)",
                                        bottom: "0",
                                        transition: "width 0.5s",
                                    }}
                                />
                                En savoir plus
                                <RightOutlined style={{ marginLeft: "8px" }} />
                            </a>
                        </Col>
                    </Row>
                </div>
            </section>

            <section style={{ padding: "40px 0 80px", background: "#fff" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
                    <Row gutter={[32, 32]} align="middle">
                        <Col xs={24} md={12}>
                            <Text
                                style={{
                                    fontSize: "0.875rem",
                                    textTransform: "uppercase",
                                    fontWeight: "600",
                                    letterSpacing: "0.05em",
                                    color: "#254c6b",
                                    display: "block",
                                    marginBottom: "8px",
                                }}
                            >
                                PROCESSUS SIMPLIFIÉ
                            </Text>
                            <Title level={2} style={{ color: "#254c6b", marginBottom: "16px" }}>
                                Soumission et vérification rapides
                            </Title>
                            <div
                                style={{
                                    width: "64px",
                                    height: "4px",
                                    background: "#24377A",
                                    marginBottom: "16px",
                                    borderRadius: "4px",
                                }}
                            ></div>

                            <Paragraph style={{ color: "#4b5563", marginBottom: "20px" }}>
                                Notre plateforme permet aux candidats de soumettre facilement leurs documents et aux recruteurs de les
                                vérifier rapidement. Fini les processus longs et fastidieux!
                            </Paragraph>
                            <Paragraph style={{ color: "#4b5563", marginBottom: "20px" }}>
                                Grâce à notre technologie de reconnaissance automatique, les documents sont analysés et vérifiés en
                                quelques minutes, réduisant considérablement les délais de traitement des candidatures.
                            </Paragraph>
                            <Paragraph style={{ color: "#4b5563", marginBottom: "20px" }}>
                                Notre système intelligent détecte automatiquement les anomalies et signale les documents potentiellement
                                frauduleux, vous permettant de prendre des décisions éclairées rapidement.
                            </Paragraph>
                            <a
                                href="/simplify-process"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    color: "#254c6b",
                                    fontSize: "1.25rem",
                                    fontWeight: "500",
                                    position: "relative",
                                }}
                            >
                                <span
                                    style={{
                                        position: "absolute",
                                        height: "1px",
                                        width: "70%",
                                        background: "rgba(36, 55, 122, 0.8)",
                                        bottom: "0",
                                        transition: "width 0.5s",
                                    }}
                                />
                                En savoir plus
                                <RightOutlined style={{ marginLeft: "8px" }} />
                            </a>
                        </Col>

                        <Col xs={24} md={12} style={{ display: "flex", justifyContent: "center" }}>
                            <img
                                src="/placeholder.svg?height=600&width=600"
                                alt="Fast and secure authentication process"
                                style={{
                                    maxWidth: "100%",
                                    height: "auto",
                                    borderRadius: "8px",
                                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                                    animation: "fadeIn 1s ease-in-out",
                                }}
                            />
                        </Col>
                    </Row>
                </div>
                <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        `}</style>
            </section>
        </>
    )
}
