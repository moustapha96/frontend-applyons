
// // "use client"

// // import { Row, Col, Typography, Card, Button, List } from "antd"
// // import { BuildOutlined, BankOutlined, CheckOutlined } from "@ant-design/icons"
// // import { useTranslation } from "react-i18next"

// // const { Title, Paragraph, Text } = Typography

// // export default function ConcuPourApplyons() {
// //     const { t } = useTranslation()

// //     const solutions = [
// //         {
// //             icon: <BuildOutlined style={{ fontSize: 32 }} />,
// //             title: t("applyons.designedFor.business.title"),
// //             subtitle: t("applyons.designedFor.business.subtitle"),
// //             description: t("applyons.designedFor.business.description"),
// //             action: t("applyons.designedFor.business.action"),
// //             gradient: "linear-gradient(135deg, #254c6b, #3a7ad9)",
// //         },
// //         {
// //             icon: <BankOutlined style={{ fontSize: 32 }} />,
// //             title: t("applyons.designedFor.education.title"),
// //             subtitle: t("applyons.designedFor.education.subtitle"),
// //             description: t("applyons.designedFor.education.description"),
// //             action: t("applyons.designedFor.education.action"),
// //             gradient: "linear-gradient(135deg, #2c5282, #4299e1)",
// //         },
// //     ]

// //     const benefits = [
// //         t("applyons.designedFor.benefits.verification"),
// //         t("applyons.designedFor.benefits.workflow"),
// //         t("applyons.designedFor.benefits.reports"),
// //     ]

// //     return (
// //         <div style={{ padding: "100px 0", background: "#f8fafc" }}>
// //             <div className="container mx-auto px-4">
// //                 <div style={{ textAlign: "center", marginBottom: "80px" }}>
// //                     <Title
// //                         level={2}
// //                         style={{
// //                             color: "#254c6b",
// //                             marginBottom: "24px",
// //                             fontSize: "2.5rem",
// //                             fontWeight: "700",
// //                         }}
// //                     >
// //                         {t("applyons.designedFor.title")}
// //                     </Title>
// //                     <div
// //                         style={{
// //                             width: "80px",
// //                             height: "4px",
// //                             background: "linear-gradient(90deg, #254c6b, #3a7ad9)",
// //                             margin: "0 auto",
// //                             borderRadius: "4px",
// //                         }}
// //                     ></div>
// //                     <Paragraph
// //                         style={{
// //                             fontSize: "1.25rem",
// //                             color: "#4b5563",
// //                             maxWidth: "800px",
// //                             margin: "24px auto 0",
// //                             lineHeight: "1.6",
// //                         }}
// //                     >
// //                         {t("applyons.designedFor.subtitle")}
// //                     </Paragraph>
// //                 </div>

// //                 <Row gutter={[32, 32]}>
// //                     {solutions.map((solution, index) => (
// //                         <Col xs={24} md={12} key={index}>
// //                             <Card
// //                                 style={{
// //                                     height: "100%",
// //                                     overflow: "hidden",
// //                                     boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
// //                                     borderRadius: "16px",
// //                                     transition: "transform 0.3s ease",
// //                                     cursor: "pointer",
// //                                     ":hover": {
// //                                         transform: "translateY(-5px)",
// //                                     },
// //                                 }}
// //                                 bodyStyle={{ padding: 0 }}
// //                             >
// //                                 <div
// //                                     style={{
// //                                         background: solution.gradient,
// //                                         padding: "32px",
// //                                         color: "white",
// //                                     }}
// //                                 >
// //                                     <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
// //                                         <div
// //                                             style={{
// //                                                 display: "flex",
// //                                                 alignItems: "center",
// //                                                 justifyContent: "center",
// //                                                 width: "64px",
// //                                                 height: "64px",
// //                                                 borderRadius: "12px",
// //                                                 backgroundColor: "rgba(255, 255, 255, 0.2)",
// //                                                 backdropFilter: "blur(8px)",
// //                                             }}
// //                                         >
// //                                             {solution.icon}
// //                                         </div>
// //                                         <div>
// //                                             <Title
// //                                                 level={3}
// //                                                 style={{
// //                                                     color: "white",
// //                                                     margin: 0,
// //                                                     fontSize: "1.75rem",
// //                                                     fontWeight: "600",
// //                                                 }}
// //                                             >
// //                                                 {solution.title}
// //                                             </Title>
// //                                             <Text
// //                                                 style={{
// //                                                     color: "rgba(255, 255, 255, 0.9)",
// //                                                     fontSize: "1.1rem",
// //                                                 }}
// //                                             >
// //                                                 {solution.subtitle}
// //                                             </Text>
// //                                         </div>
// //                                     </div>
// //                                 </div>

// //                                 <div style={{ padding: "32px" }}>
// //                                     <Paragraph
// //                                         style={{
// //                                             marginBottom: "32px",
// //                                             fontSize: "1.1rem",
// //                                             lineHeight: "1.6",
// //                                             color: "#4b5563",
// //                                         }}
// //                                     >
// //                                         {solution.description}
// //                                     </Paragraph>

// //                                     <List
// //                                         itemLayout="horizontal"
// //                                         dataSource={benefits}
// //                                         renderItem={(item) => (
// //                                             <List.Item style={{ borderBottom: "none", padding: "12px 0" }}>
// //                                                 <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
// //                                                     <CheckOutlined
// //                                                         style={{
// //                                                             color: "#10b981",
// //                                                             marginTop: "4px",
// //                                                             fontSize: "1.2rem",
// //                                                         }}
// //                                                     />
// //                                                     <Text style={{ fontSize: "1.1rem" }}>{item}</Text>
// //                                                 </div>
// //                                             </List.Item>
// //                                         )}
// //                                         style={{ marginBottom: "32px" }}
// //                                     />

// //                                     <Button
// //                                         type="primary"
// //                                         block
// //                                         size="large"
// //                                         style={{
// //                                             backgroundColor: "#254c6b",
// //                                             height: "48px",
// //                                             fontSize: "1.1rem",
// //                                             borderRadius: "8px",
// //                                             boxShadow: "0 4px 6px -1px rgba(37, 76, 107, 0.2)",
// //                                         }}
// //                                     >
// //                                         {solution.action}
// //                                     </Button>
// //                                 </div>
// //                             </Card>
// //                         </Col>
// //                     ))}
// //                 </Row>
// //             </div>
// //         </div>
// //     )
// // }

// "use client"

// import { Row, Col, Typography, Card, Button, List } from "antd"
// import { BuildOutlined, BankOutlined, CheckOutlined, ArrowRightOutlined, StarFilled } from "@ant-design/icons"
// import { useTranslation } from "react-i18next"

// const { Title, Paragraph, Text } = Typography

// export default function ConcuPourApplyons() {
//     const { t } = useTranslation()

//     const solutions = [
//         {
//             icon: <BuildOutlined style={{ fontSize: 40 }} />,
//             title: t("applyons.designedFor.business.title"),
//             subtitle: t("applyons.designedFor.business.subtitle"),
//             description: t(
//                 "applyons.designedFor.business.description"),
//             action: t("applyons.designedFor.business.action"),
//             gradient: "linear-gradient(135deg, #254c6b 0%, #1e3a52 50%, #254c6b 100%)",
//             features: [
//                 t("applyons.designedFor.business.features.automation"),
//                 t("applyons.designedFor.business.features.analytics"),
//                 t("applyons.designedFor.business.features.api"),
//                 t("applyons.designedFor.business.features.support"),
//             ],
//         },
//         {
//             icon: <BankOutlined style={{ fontSize: 40 }} />,
//             title: t("applyons.designedFor.education.title",),
//             subtitle: t("applyons.designedFor.education.subtitle"),
//             description: t(
//                 "applyons.designedFor.education.description"),
//             action: t("applyons.designedFor.education.action"),
//             gradient: "linear-gradient(135deg, #254c6b 0%, #2d5a7b 50%, #254c6b 100%)",
//             features: [
//                 t("applyons.designedFor.education.features.verification"),
//                 t("applyons.designedFor.education.features.workflow"),
//                 t("applyons.designedFor.education.features.reports"),
//                 t("applyons.designedFor.education.features.security"),
//             ],
//         },
//     ]

//     const globalBenefits = [
//         {
//             title: t("applyons.designedFor.benefits.verification.title"),
//             description: t(
//                 "applyons.designedFor.benefits.verification.description"
//             ),
//         },
//         {
//             title: t("applyons.designedFor.benefits.workflow.title"),
//             description: t(
//                 "applyons.designedFor.benefits.workflow.description"
//             ),
//         },
//         {
//             title: t("applyons.designedFor.benefits.reports.title"),
//             description: t(
//                 "applyons.designedFor.benefits.reports.description"
//             ),
//         },
//     ]

//     // const solutions = [
//     //     {
//     //         icon: <BuildOutlined style={{ fontSize: 40 }} />,
//     //         title: t("applyons.designedFor.business.title"),
//     //         subtitle: t("applyons.designedFor.business.subtitle"),
//     //         description: t("applyons.designedFor.business.description"),
//     //         action: t("applyons.designedFor.business.action"),
//     //         gradient: "linear-gradient(135deg, #254c6b 0%, #1e3a52 50%, #254c6b 100%)",
//     //         features: [
//     //             "Gestion automatisée des demandes",
//     //             "Tableau de bord analytique",
//     //             "Intégration API complète",
//     //             "Support technique dédié",
//     //         ],
//     //     },
//     //     {
//     //         icon: <BankOutlined style={{ fontSize: 40 }} />,
//     //         title: t("applyons.designedFor.education.title"),
//     //         subtitle: t("applyons.designedFor.education.subtitle"),
//     //         description: t("applyons.designedFor.education.description"),
//     //         action: t("applyons.designedFor.education.action"),
//     //         gradient: "linear-gradient(135deg, #254c6b 0%, #2d5a7b 50%, #254c6b 100%)",
//     //         features: ["Vérification des diplômes", "Workflow personnalisable", "Rapports détaillés", "Sécurité renforcée"],
//     //     },
//     // ]

//     // const globalBenefits = [
//     //     t("applyons.designedFor.benefits.verification.title"),
//     //     t("applyons.designedFor.benefits.workflow.title"),
//     //     t("applyons.designedFor.benefits.reports"),
//     // ]


//     return (
//         <div
//             style={{
//                 padding: "120px 0",
//                 background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)",
//                 position: "relative",
//                 overflow: "hidden",
//             }}
//         >
//             {/* Background decorative elements */}
//             <div
//                 style={{
//                     position: "absolute",
//                     top: "10%",
//                     left: "-5%",
//                     width: "400px",
//                     height: "400px",
//                     background: "radial-gradient(circle, rgba(37, 76, 107, 0.1) 0%, transparent 70%)",
//                     borderRadius: "50%",
//                 }}
//             />
//             <div
//                 style={{
//                     position: "absolute",
//                     bottom: "10%",
//                     right: "-5%",
//                     width: "500px",
//                     height: "500px",
//                     background: "radial-gradient(circle, rgba(37, 76, 107, 0.08) 0%, transparent 70%)",
//                     borderRadius: "50%",
//                 }}
//             />

//             {/* Container with increased width */}
//             <div className="mx-auto px-6" style={{ maxWidth: "1400px", position: "relative", zIndex: 1 }}>
//                 {/* Header Section */}
//                 <div style={{ textAlign: "center", marginBottom: "100px" }}>
//                     <div
//                         style={{
//                             display: "inline-flex",
//                             alignItems: "center",
//                             gap: "8px",
//                             background: "#254c6b",
//                             color: "white",
//                             padding: "10px 24px",
//                             borderRadius: "50px",
//                             fontSize: "14px",
//                             fontWeight: "600",
//                             marginBottom: "32px",
//                             boxShadow: "0 8px 25px rgba(37, 76, 107, 0.3)",
//                         }}
//                     >
//                         <StarFilled />
//                         {t("applyons.designedFor.title")}
//                     </div>

//                     <Title
//                         level={1}
//                         style={{
//                             color: "#254c6b",
//                             marginBottom: "32px",
//                             fontSize: "3.5rem",
//                             fontWeight: "800",
//                             lineHeight: "1.1",
//                             maxWidth: "900px",
//                             margin: "0 auto 32px",
//                         }}
//                     >
//                         {t("applyons.designedFor.title")}
//                     </Title>

//                     <div
//                         style={{
//                             width: "120px",
//                             height: "6px",
//                             background: "linear-gradient(90deg, #254c6b, #1e3a52, #254c6b)",
//                             margin: "0 auto 32px",
//                             borderRadius: "6px",
//                         }}
//                     />

//                     <Paragraph
//                         style={{
//                             fontSize: "1.4rem",
//                             color: "#475569",
//                             maxWidth: "1000px",
//                             margin: "0 auto",
//                             lineHeight: "1.7",
//                             fontWeight: "400",
//                         }}
//                     >
//                         {t("applyons.designedFor.subtitle")}
//                     </Paragraph>
//                 </div>

//                 {/* Solutions Cards */}
//                 <Row gutter={[48, 48]} style={{ marginBottom: "80px" }}>
//                     {solutions.map((solution, index) => (
//                         <Col xs={24} lg={12} key={index}>
//                             <div
//                                 style={{
//                                     position: "relative",
//                                     transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
//                                 }}
//                                 onMouseEnter={(e) => {
//                                     e.currentTarget.style.transform = "translateY(-8px) scale(1.02)"
//                                 }}
//                                 onMouseLeave={(e) => {
//                                     e.currentTarget.style.transform = "translateY(0) scale(1)"
//                                 }}
//                             >
//                                 <Card
//                                     style={{
//                                         height: "100%",
//                                         overflow: "hidden",
//                                         boxShadow: "0 25px 50px -12px rgba(37, 76, 107, 0.15)",
//                                         borderRadius: "24px",
//                                         border: "1px solid rgba(37, 76, 107, 0.1)",
//                                         background: "white",
//                                     }}
//                                     bodyStyle={{ padding: 0 }}
//                                 >
//                                     {/* Card Header */}
//                                     <div
//                                         style={{
//                                             background: solution.gradient,
//                                             padding: "48px 40px",
//                                             color: "white",
//                                             position: "relative",
//                                             overflow: "hidden",
//                                         }}
//                                     >
//                                         {/* Decorative pattern */}
//                                         <div
//                                             style={{
//                                                 position: "absolute",
//                                                 top: "-50%",
//                                                 right: "-20%",
//                                                 width: "200px",
//                                                 height: "200px",
//                                                 background: "rgba(255, 255, 255, 0.1)",
//                                                 borderRadius: "50%",
//                                                 filter: "blur(40px)",
//                                             }}
//                                         />

//                                         <div style={{ position: "relative", zIndex: 1 }}>
//                                             <div
//                                                 style={{
//                                                     display: "flex",
//                                                     alignItems: "center",
//                                                     gap: "24px",
//                                                     marginBottom: "24px",
//                                                 }}
//                                             >
//                                                 <div
//                                                     style={{
//                                                         display: "flex",
//                                                         alignItems: "center",
//                                                         justifyContent: "center",
//                                                         width: "80px",
//                                                         height: "80px",
//                                                         borderRadius: "20px",
//                                                         backgroundColor: "rgba(255, 255, 255, 0.2)",
//                                                         backdropFilter: "blur(10px)",
//                                                         border: "1px solid rgba(255, 255, 255, 0.3)",
//                                                     }}
//                                                 >
//                                                     {solution.icon}
//                                                 </div>
//                                                 <div>
//                                                     <Title
//                                                         level={2}
//                                                         style={{
//                                                             color: "white",
//                                                             margin: "0 0 8px 0",
//                                                             fontSize: "2rem",
//                                                             fontWeight: "700",
//                                                         }}
//                                                     >
//                                                         {solution.title}
//                                                     </Title>
//                                                     <Text
//                                                         style={{
//                                                             color: "rgba(255, 255, 255, 0.9)",
//                                                             fontSize: "1.2rem",
//                                                             fontWeight: "500",
//                                                         }}
//                                                     >
//                                                         {solution.subtitle}
//                                                     </Text>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {/* Card Body */}
//                                     <div style={{ padding: "48px 40px" }}>
//                                         <Paragraph
//                                             style={{
//                                                 marginBottom: "40px",
//                                                 fontSize: "1.2rem",
//                                                 lineHeight: "1.7",
//                                                 color: "#475569",
//                                                 fontWeight: "400",
//                                             }}
//                                         >
//                                             {solution.description}
//                                         </Paragraph>

//                                         {/* Features List */}
//                                         <div style={{ marginBottom: "40px" }}>
//                                             <Title level={4} style={{ color: "#254c6b", marginBottom: "24px" }}>
//                                                 {t("applyons.designedFor.keyFeatures")} :
//                                             </Title>
//                                             <List
//                                                 itemLayout="horizontal"
//                                                 dataSource={solution.features}
//                                                 renderItem={(item) => (
//                                                     <List.Item style={{ borderBottom: "none", padding: "8px 0" }}>
//                                                         <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
//                                                             <div
//                                                                 style={{
//                                                                     width: "24px",
//                                                                     height: "24px",
//                                                                     borderRadius: "50%",
//                                                                     background: "linear-gradient(135deg, #10b981, #059669)",
//                                                                     display: "flex",
//                                                                     alignItems: "center",
//                                                                     justifyContent: "center",
//                                                                     flexShrink: 0,
//                                                                 }}
//                                                             >
//                                                                 <CheckOutlined
//                                                                     style={{
//                                                                         color: "white",
//                                                                         fontSize: "12px",
//                                                                         fontWeight: "bold",
//                                                                     }}
//                                                                 />
//                                                             </div>
//                                                             <Text style={{ fontSize: "1.1rem", color: "#475569" }}>{item}</Text>
//                                                         </div>
//                                                     </List.Item>
//                                                 )}
//                                             />
//                                         </div>


//                                     </div>
//                                 </Card>
//                             </div>
//                         </Col>
//                     ))}
//                 </Row>

//                 <div
//                     style={{
//                         background: "linear-gradient(135deg, #254c6b, #1e3a52)",
//                         borderRadius: "32px",
//                         padding: "60px 48px",
//                         textAlign: "center",
//                         color: "white",
//                         position: "relative",
//                         overflow: "hidden",
//                     }}
//                 >
//                     <div
//                         style={{
//                             position: "absolute",
//                             top: "-30%",
//                             left: "-10%",
//                             width: "300px",
//                             height: "300px",
//                             background: "rgba(255, 255, 255, 0.1)",
//                             borderRadius: "50%",
//                             filter: "blur(60px)",
//                         }}
//                     />

//                     <div style={{ position: "relative", zIndex: 1 }}>
//                         <Title
//                             level={2}
//                             style={{
//                                 color: "white",
//                                 marginBottom: "32px",
//                                 fontSize: "2.5rem",
//                                 fontWeight: "700",
//                             }}
//                         >
//                             {t("applyons.designedFor.whyChoose")}
//                         </Title>

//                         <Row gutter={[32, 32]} justify="center">
//                             {globalBenefits.map((benefit, index) => (
//                                 <Col xs={24} md={8} key={index}>
//                                     <div
//                                         style={{
//                                             padding: "32px 24px",
//                                             background: "rgba(255, 255, 255, 0.1)",
//                                             borderRadius: "20px",
//                                             backdropFilter: "blur(10px)",
//                                             border: "1px solid rgba(255, 255, 255, 0.2)",
//                                             transition: "all 0.3s ease",
//                                         }}
//                                         onMouseEnter={(e) => {
//                                             e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)"
//                                             e.currentTarget.style.transform = "translateY(-4px)"
//                                         }}
//                                         onMouseLeave={(e) => {
//                                             e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)"
//                                             e.currentTarget.style.transform = "translateY(0)"
//                                         }}
//                                     >
//                                         <CheckOutlined
//                                             style={{
//                                                 fontSize: "2rem",
//                                                 color: "#10b981",
//                                                 marginBottom: "16px",
//                                             }}
//                                         />
//                                         {/* <Text
//                                             style={{
//                                                 color: "white",
//                                                 fontSize: "1.2rem",
//                                                 fontWeight: "500",
//                                                 display: "block",
//                                             }}
//                                         >
//                                             {benefit}
//                                         </Text> */}
//                                         <Title
//                                             level={4}
//                                             style={{
//                                                 color: "white",
//                                                 marginBottom: "12px",
//                                                 fontSize: "1.3rem",
//                                             }}
//                                         >
//                                             {benefit.title}
//                                         </Title>
//                                         <Text
//                                             style={{
//                                                 color: "rgba(255, 255, 255, 0.9)",
//                                                 fontSize: "1rem",
//                                                 display: "block",
//                                                 lineHeight: "1.5",
//                                             }}
//                                         >
//                                             {benefit.description}
//                                         </Text>
//                                     </div>
//                                 </Col>
//                             ))}
//                         </Row>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

"use client"

import { useState } from "react"
import { Row, Col, Typography, Card, List, Modal } from "antd"
import { BuildOutlined, BankOutlined, CheckOutlined, StarFilled, InfoCircleOutlined } from "@ant-design/icons"
import { useTranslation } from "react-i18next"

const { Title, Paragraph, Text } = Typography

export default function ConcuPourApplyons() {
    const { t } = useTranslation()
    const [popup, setPopup] = useState(null) // { type: 'solution' | 'benefit', index: number } | null

    const hasMoreKey = (key) => {
        try {
            const v = t(key)
            return v && typeof v === "string" && v !== key
        } catch {
            return false
        }
    }

    const solutions = [
        {
            icon: <BuildOutlined style={{ fontSize: 24 }} />,
            titleKey: "applyons.designedFor.business.title",
            descriptionKey: "applyons.designedFor.business.description",
            moreKey: "applyons.designedFor.business.more",
            featuresKeys: [
                "applyons.designedFor.business.features.automation",
                "applyons.designedFor.business.features.analytics",
                "applyons.designedFor.business.features.api",
                "applyons.designedFor.business.features.support",
            ],
        },
        {
            icon: <BankOutlined style={{ fontSize: 24 }} />,
            titleKey: "applyons.designedFor.education.title",
            descriptionKey: "applyons.designedFor.education.description",
            moreKey: "applyons.designedFor.education.more",
            featuresKeys: [
                "applyons.designedFor.education.features.verification",
                "applyons.designedFor.education.features.workflow",
                "applyons.designedFor.education.features.reports",
                "applyons.designedFor.education.features.security",
            ],
        },
    ]

    const globalBenefits = [
        {
            titleKey: "applyons.designedFor.benefits.verification.title",
            descriptionKey: "applyons.designedFor.benefits.verification.description",
            moreKey: "applyons.designedFor.benefits.verification.more",
        },
        {
            titleKey: "applyons.designedFor.benefits.workflow.title",
            descriptionKey: "applyons.designedFor.benefits.workflow.description",
            moreKey: "applyons.designedFor.benefits.workflow.more",
        },
        {
            titleKey: "applyons.designedFor.benefits.reports.title",
            descriptionKey: "applyons.designedFor.benefits.reports.description",
            moreKey: "applyons.designedFor.benefits.reports.more",
        },
    ]

    const currentSolution = popup?.type === "solution" ? solutions[popup.index] : null
    const currentBenefit = popup?.type === "benefit" ? globalBenefits[popup.index] : null

    return (
        <div id="concuPour" style={{ padding: "40px 0", background: "#f8fafc" }}>
            <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 20px" }}>
                <div style={{ textAlign: "center", marginBottom: "40px" }}>
                    <div style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        background: "#254c6b",
                        color: "white",
                        padding: "6px 16px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        marginBottom: "16px"
                    }}>
                        <StarFilled style={{ fontSize: "12px" }} />
                        {t("applyons.designedFor.title")}
                    </div>

                    <Title level={2} style={{
                        color: "#254c6b",
                        marginBottom: "16px",
                        fontSize: "1.8rem"
                    }}>
                        {t("applyons.designedFor.title")}
                    </Title>

                    <Paragraph style={{
                        fontSize: "1rem",
                        color: "#475569",
                        maxWidth: "600px",
                        margin: "0 auto",
                    }}>
                        {t("applyons.designedFor.subtitle")}
                    </Paragraph>
                </div>

                <Row gutter={[24, 24]} style={{ marginBottom: "40px" }}>
                    {solutions.map((solution, index) => (
                        <Col xs={24} sm={12} key={index}>
                            <Card
                                hoverable
                                role="button"
                                tabIndex={0}
                                onClick={() => setPopup({ type: "solution", index })}
                                onKeyDown={(e) => e.key === "Enter" && setPopup({ type: "solution", index })}
                                style={{
                                    height: "100%",
                                    borderRadius: "12px",
                                    border: "1px solid #e2e8f0",
                                    padding: "16px",
                                    cursor: "pointer",
                                }}
                            >
                                <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "12px",
                                    marginBottom: "12px"
                                }}>
                                    <div style={{
                                        width: "40px",
                                        height: "40px",
                                        borderRadius: "12px",
                                        backgroundColor: "#f0f4f8",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}>
                                        {solution.icon}
                                    </div>
                                    <Title level={4} style={{ margin: 0 }}>
                                        {t(solution.titleKey)}
                                    </Title>
                                </div>

                                <Paragraph style={{
                                    marginBottom: "12px",
                                    fontSize: "0.9rem",
                                    color: "#4a5568"
                                }}>
                                    {t(solution.descriptionKey)}
                                </Paragraph>

                                <List
                                    size="small"
                                    dataSource={solution.featuresKeys.slice(0, 2).map((k) => t(k))}
                                    renderItem={(item) => (
                                        <List.Item style={{ padding: "2px 0" }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                                <CheckOutlined style={{ color: "#38a169", fontSize: "12px" }} />
                                                <Text style={{ fontSize: "0.8rem" }}>{item}</Text>
                                            </div>
                                        </List.Item>
                                    )}
                                />
                                <div style={{ marginTop: "12px", display: "flex", alignItems: "center", gap: "6px", color: "#254c6b", fontSize: "0.8rem" }}>
                                    <InfoCircleOutlined />
                                    <span>{t("applyons.designedFor.clickForMore")}</span>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>

                <div style={{
                    background: "#254c6b",
                    borderRadius: "16px",
                    padding: "24px",
                    color: "white"
                }}>
                    <Title level={3} style={{
                        color: "white",
                        textAlign: "center",
                        marginBottom: "20px"
                    }}>
                        {t("applyons.designedFor.whyChoose")}
                    </Title>

                    <Row gutter={[16, 16]}>
                        {globalBenefits.map((benefit, index) => (
                            <Col xs={24} sm={8} key={index}>
                                <div
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => setPopup({ type: "benefit", index })}
                                    onKeyDown={(e) => e.key === "Enter" && setPopup({ type: "benefit", index })}
                                    style={{
                                        padding: "12px",
                                        background: "rgba(255, 255, 255, 0.1)",
                                        borderRadius: "8px",
                                        height: "100%",
                                        cursor: "pointer",
                                        transition: "background 0.2s",
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255, 255, 255, 0.18)" }}
                                    onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)" }}
                                >
                                    <div style={{
                                        width: "24px",
                                        height: "24px",
                                        borderRadius: "50%",
                                        background: "#38a169",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        marginBottom: "8px"
                                    }}>
                                        <CheckOutlined style={{ color: "white", fontSize: "12px" }} />
                                    </div>
                                    <Title level={5} style={{ color: "white", marginBottom: "4px" }}>
                                        {t(benefit.titleKey)}
                                    </Title>
                                    <Text style={{ fontSize: "0.8rem", color: "rgba(255, 255, 255, 0.8)" }}>
                                        {t(benefit.descriptionKey)}
                                    </Text>
                                    <div style={{ marginTop: "8px", display: "flex", alignItems: "center", gap: "4px", fontSize: "0.75rem", opacity: 0.9 }}>
                                        <InfoCircleOutlined /> {t("applyons.designedFor.clickForMore")}
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>

            {/* Popup Solution */}
            <Modal
                open={!!currentSolution}
                onCancel={() => setPopup(null)}
                footer={null}
                width={520}
                centered
                title={
                    <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        {currentSolution && (
                            <>
                                <span style={{ color: "#254c6b" }}>{currentSolution.icon}</span>
                                {t(currentSolution.titleKey)}
                            </>
                        )}
                    </span>
                }
            >
                {currentSolution && (
                    <>
                        <Paragraph style={{ fontSize: "1rem", color: "#4b5563", marginBottom: 16 }}>
                            {t(currentSolution.descriptionKey)}
                        </Paragraph>
                        <Title level={5} style={{ color: "#254c6b", marginBottom: 12 }}>
                            {t("applyons.designedFor.keyFeatures")}
                        </Title>
                        <List
                            size="small"
                            dataSource={currentSolution.featuresKeys.map((k) => t(k))}
                            renderItem={(item) => (
                                <List.Item style={{ borderBottom: "none", padding: "4px 0" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                        <CheckOutlined style={{ color: "#38a169" }} />
                                        <Text>{item}</Text>
                                    </div>
                                </List.Item>
                            )}
                        />
                        {currentSolution.moreKey && hasMoreKey(currentSolution.moreKey) && (
                            <Paragraph style={{ fontSize: "1rem", color: "#4b5563", marginTop: 16, marginBottom: 0 }}>
                                {t(currentSolution.moreKey)}
                            </Paragraph>
                        )}
                    </>
                )}
            </Modal>

            {/* Popup Benefit */}
            <Modal
                open={!!currentBenefit}
                onCancel={() => setPopup(null)}
                footer={null}
                width={480}
                centered
                title={currentBenefit ? t(currentBenefit.titleKey) : ""}
            >
                {currentBenefit && (
                    <>
                        <Paragraph style={{ fontSize: "1rem", color: "#4b5563", marginBottom: currentBenefit.moreKey && hasMoreKey(currentBenefit.moreKey) ? 16 : 0 }}>
                            {t(currentBenefit.descriptionKey)}
                        </Paragraph>
                        {currentBenefit.moreKey && hasMoreKey(currentBenefit.moreKey) && (
                            <Paragraph style={{ fontSize: "1rem", color: "#4b5563", marginBottom: 0 }}>
                                {t(currentBenefit.moreKey)}
                            </Paragraph>
                        )}
                    </>
                )}
            </Modal>
        </div>
    )
}