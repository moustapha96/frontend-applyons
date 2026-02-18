"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useAuthContext } from "../../../context/useAuthContext"
import { useTranslation } from "react-i18next"
import { Card, Spin, Typography, Space, Tag, Descriptions, message, Modal } from "antd"
import {
    BankOutlined,
    FileOutlined,
    CalendarOutlined,
    UserOutlined,
    BookOutlined,
    TrophyOutlined,
    TeamOutlined,
    DollarOutlined,
    SafetyOutlined,
    EditOutlined,
    CreditCardOutlined,
} from "@ant-design/icons"
import DemandeurBreadcrumb from "../../../components/DemandeurBreadcrumb"
import { CopyableFieldSimple } from "@/utils/CopyableField"
import { getDemandePartageDetail } from "@/services/partageService"
import { getFileDocument } from "@/services/documentService"

const { Title, Text } = Typography

const DemandeurApplicationDetail = () => {
    const { id } = useParams()
    const { demandeur } = useAuthContext()
    const [loading, setLoading] = useState(true)
    const [application, setApplication] = useState(null)
    const [error, setError] = useState(null)
    const [pdfVisible, setPdfVisible] = useState(false)
    const [pdfLoading, setPdfLoading] = useState(false)
    const [pdfData, setPdfData] = useState(null)
    const [pdfError, setPdfError] = useState(null)
    const { t } = useTranslation()
    const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0)

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth)
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    useEffect(() => {
        fetchApplication(id)
    }, [id])

    const fetchApplication = async (id) => {
        try {
            const data = await getDemandePartageDetail(id)
            setApplication(data)
        } catch (err) {
            setError(err.message)
            message.error(t("applicationDetails.error_fetching_details"))
        } finally {
            setLoading(false)
        }
    }

    const handleViewDocument = async (docId) => {
        try {
            setPdfError(null)
            setPdfLoading(true)
            setPdfVisible(true)
            const base64Data = await getFileDocument(docId)
            setPdfData(base64Data)
        } catch (error) {
            setPdfError(error.message)
            message.error(t("applicationDetails.error_loading_document"))
        } finally {
            setPdfLoading(false)
        }
    }

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case "pending":
                return "orange"
            case "approved":
                return "green"
            case "rejected":
                return "red"
            case "submitted":
                return "blue"
            default:
                return "default"
        }
    }

    const getPaymentStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case "paid":
                return "green"
            case "pending":
                return "orange"
            case "failed":
                return "red"
            default:
                return "default"
        }
    }

    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <Spin size="large" tip={t("common.loading")} />
            </div>
        )
    }

    if (error) {
        return (
            <div style={{ textAlign: "center", marginTop: "50px" }}>
                <Text type="danger">{error}</Text>
            </div>
        )
    }

    const isSmallScreen = windowWidth < 768
    const descriptionsLayout = isSmallScreen ? "vertical" : "horizontal"
    const getColumnSpan = (defaultSpan) => (isSmallScreen ? 3 : defaultSpan)

    return (
        <div style={{ background: "#f0f2f5", minHeight: "100vh" }}>
            <DemandeurBreadcrumb
                title={t("applicationDetails.application_details")}
                SubTitle={application?.applicationCode}
            />

            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: windowWidth < 576 ? "12px" : "24px" }}>
                <Space direction="vertical" size="large" style={{ width: "100%" }}>
                    {/* Application Status & Basic Info */}
                    <Card>
                        <Descriptions
                            title={t("applicationDetails.application_overview")}
                            bordered
                            column={isSmallScreen ? 1 : 3}
                            layout={descriptionsLayout}
                            size={isSmallScreen ? "small" : "default"}
                        >
                            <Descriptions.Item label={t("applicationDetails.application_code")} span={3}>
                                <Tag color="blue">
                                    <CopyableFieldSimple value={application?.applicationCode} />
                                </Tag>
                            </Descriptions.Item>

                            <Descriptions.Item label={t("applicationDetails.status")} span={getColumnSpan(1)}>
                                <Tag color={getStatusColor(application?.status)}>
                                    {t(`applicationDetails.status_${application?.status?.toLowerCase()}`)}
                                </Tag>
                            </Descriptions.Item>

                            <Descriptions.Item label={t("applicationDetails.submission_date")} span={getColumnSpan(1)}>
                                <CalendarOutlined /> {new Date(application?.submissionDate).toLocaleDateString()}
                            </Descriptions.Item>

                            <Descriptions.Item label={t("applicationDetails.payment_status")} span={getColumnSpan(1)}>
                                <Tag color={getPaymentStatusColor(application?.paymentStatus)}>
                                    {t(`applicationDetails.payment_${application?.paymentStatus?.toLowerCase()}`)}
                                </Tag>
                            </Descriptions.Item>

                            <Descriptions.Item label={t("application.requestDescription")} span={3}>
                                {application?.description}
                            </Descriptions.Item>

                            <Descriptions.Item label={t("application.period")} span={getColumnSpan(1)}>
                                {application?.periode && t(`application.${application.periode.toLowerCase()}`)}
                            </Descriptions.Item>

                            <Descriptions.Item label={t("application.year")} span={getColumnSpan(1)}>
                                <CalendarOutlined /> {application?.year}
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>

                    {/* Personal Information */}
                    <Card
                        title={
                            <Space>
                                <UserOutlined />
                                <span>{t("application.personalInformation")}</span>
                            </Space>
                        }
                    >
                        <Descriptions
                            bordered
                            column={isSmallScreen ? 1 : 3}
                            layout={descriptionsLayout}
                            size={isSmallScreen ? "small" : "default"}
                        >
                            <Descriptions.Item label={t("application.dateOfBirth")} span={getColumnSpan(1)}>
                                <CalendarOutlined /> {new Date(application?.dob).toLocaleDateString()}
                            </Descriptions.Item>

                            <Descriptions.Item label={t("application.countryOfCitizenship")} span={getColumnSpan(2)}>
                                {application?.citizenship}
                            </Descriptions.Item>

                            {application?.passport && (
                                <Descriptions.Item label={t("application.passportNumber")} span={3}>
                                    <CopyableFieldSimple value={application.passport} />
                                </Descriptions.Item>
                            )}
                        </Descriptions>
                    </Card>

                    {/* English Proficiency */}
                    <Card
                        title={
                            <Space>
                                <BookOutlined />
                                <span>{t("application.englishLanguageProficiency")}</span>
                            </Space>
                        }
                    >
                        <Descriptions
                            bordered
                            column={isSmallScreen ? 1 : 3}
                            layout={descriptionsLayout}
                            size={isSmallScreen ? "small" : "default"}
                        >
                            <Descriptions.Item label={t("application.isEnglishFirstLanguage")} span={getColumnSpan(1)}>
                                <Tag color={application?.isEnglishFirstLanguage === "true" ? "green" : "orange"}>
                                    {application?.isEnglishFirstLanguage === "true" ? t("application.yes") : t("application.no")}
                                </Tag>
                            </Descriptions.Item>

                            <Descriptions.Item label={t("application.englishProficiencyTestsTaken")} span={getColumnSpan(2)}>
                                {application?.englishProficiencyTests?.length > 0 ? (
                                    <Space wrap>
                                        {application.englishProficiencyTests.map((test, index) => (
                                            <Tag key={index} color="blue">
                                                {test}
                                            </Tag>
                                        ))}
                                    </Space>
                                ) : (
                                    <Text type="secondary">{t("common.not_specified")}</Text>
                                )}
                            </Descriptions.Item>

                            {application?.testScores && (
                                <Descriptions.Item label={t("application.testScores")} span={3}>
                                    {application.testScores}
                                </Descriptions.Item>
                            )}
                        </Descriptions>
                    </Card>

                    {/* Academic Background */}
                    <Card
                        title={
                            <Space>
                                <BookOutlined />
                                <span>{t("application.academicBackground")}</span>
                            </Space>
                        }
                    >
                        <Descriptions
                            bordered
                            column={isSmallScreen ? 1 : 3}
                            layout={descriptionsLayout}
                            size={isSmallScreen ? "small" : "default"}
                        >
                            <Descriptions.Item label={t("application.secondarySchoolName")} span={getColumnSpan(2)}>
                                {application?.secondarySchoolName}
                            </Descriptions.Item>

                            <Descriptions.Item label={t("application.countryOfSchool")} span={getColumnSpan(1)}>
                                {application?.countryOfSchool}
                            </Descriptions.Item>

                            {application?.graduationDate && (
                                <Descriptions.Item label={t("application.graduationDate")} span={getColumnSpan(1)}>
                                    <CalendarOutlined /> {new Date(application.graduationDate).toLocaleDateString()}
                                </Descriptions.Item>
                            )}

                            {application?.gradingScale && (
                                <Descriptions.Item label={t("application.gradingScale")} span={getColumnSpan(1)}>
                                    {application.gradingScale}
                                </Descriptions.Item>
                            )}

                            {application?.gpa && (
                                <Descriptions.Item label={t("application.gpaOrAverage")} span={getColumnSpan(1)}>
                                    {application.gpa}
                                </Descriptions.Item>
                            )}

                            {application?.examsTaken?.length > 0 && (
                                <Descriptions.Item label={t("application.examsTaken")} span={3}>
                                    <Space wrap>
                                        {application.examsTaken.map((exam, index) => (
                                            <Tag key={index} color="purple">
                                                {exam}
                                            </Tag>
                                        ))}
                                    </Space>
                                </Descriptions.Item>
                            )}
                        </Descriptions>
                    </Card>

                    {/* Program of Study */}
                    <Card
                        title={
                            <Space>
                                <BookOutlined />
                                <span>{t("application.intendedProgramOfStudy")}</span>
                            </Space>
                        }
                    >
                        <Descriptions
                            bordered
                            column={isSmallScreen ? 1 : 3}
                            layout={descriptionsLayout}
                            size={isSmallScreen ? "small" : "default"}
                        >
                            <Descriptions.Item label={t("application.intendedMajor")} span={getColumnSpan(2)}>
                                {application?.intendedMajor}
                            </Descriptions.Item>

                            <Descriptions.Item label={t("application.preferredStartTerm")} span={getColumnSpan(1)}>
                                {application?.preferredStartTerm}
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>

                    {/* Activities and Achievements */}
                    {(application?.extracurricularActivities || application?.honorsOrAwards) && (
                        <Card
                            title={
                                <Space>
                                    <TrophyOutlined />
                                    <span>{t("application.activitiesAndAchievements")}</span>
                                </Space>
                            }
                        >
                            <Descriptions bordered column={1} layout="vertical" size={isSmallScreen ? "small" : "default"}>
                                {application?.extracurricularActivities && (
                                    <Descriptions.Item label={t("application.extracurricularActivities")}>
                                        <div style={{ whiteSpace: "pre-wrap" }}>{application.extracurricularActivities}</div>
                                    </Descriptions.Item>
                                )}

                                {application?.honorsOrAwards && (
                                    <Descriptions.Item label={t("application.honorsOrAwards")}>
                                        <div style={{ whiteSpace: "pre-wrap" }}>{application.honorsOrAwards}</div>
                                    </Descriptions.Item>
                                )}
                            </Descriptions>
                        </Card>
                    )}

                    {/* Family Information */}
                    <Card
                        title={
                            <Space>
                                <TeamOutlined />
                                <span>{t("application.familyInformation")}</span>
                            </Space>
                        }
                    >
                        <Descriptions
                            bordered
                            column={isSmallScreen ? 1 : 3}
                            layout={descriptionsLayout}
                            size={isSmallScreen ? "small" : "default"}
                        >
                            <Descriptions.Item label={t("application.parentGuardianName")} span={getColumnSpan(2)}>
                                {application?.parentGuardianName}
                            </Descriptions.Item>

                            <Descriptions.Item label={t("application.educationLevel")} span={getColumnSpan(1)}>
                                {application?.educationLevel}
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>

                    {/* Financial Information */}
                    <Card
                        title={
                            <Space>
                                <DollarOutlined />
                                <span>{t("application.financialInformation")}</span>
                            </Space>
                        }
                    >
                        <Descriptions
                            bordered
                            column={isSmallScreen ? 1 : 3}
                            layout={descriptionsLayout}
                            size={isSmallScreen ? "small" : "default"}
                        >
                            <Descriptions.Item label={t("application.willApplyForFinancialAid")} span={getColumnSpan(1)}>
                                <Tag color={application?.willApplyForFinancialAid === "Yes" ? "green" : "orange"}>
                                    {t(`application.${application?.willApplyForFinancialAid?.toLowerCase()}`)}
                                </Tag>
                            </Descriptions.Item>

                            <Descriptions.Item label={t("application.hasExternalSponsorship")} span={getColumnSpan(1)}>
                                <Tag color={application?.hasExternalSponsorship === "Yes" ? "green" : "red"}>
                                    {t(`application.${application?.hasExternalSponsorship?.toLowerCase()}`)}
                                </Tag>
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>

                    {/* Visa Information */}
                    <Card
                        title={
                            <Space>
                                <SafetyOutlined />
                                <span>{t("application.visaInformation")}</span>
                            </Space>
                        }
                    >
                        <Descriptions
                            bordered
                            column={isSmallScreen ? 1 : 3}
                            layout={descriptionsLayout}
                            size={isSmallScreen ? "small" : "default"}
                        >
                            <Descriptions.Item label={t("application.visaType")} span={getColumnSpan(2)}>
                                {application?.visaType}
                            </Descriptions.Item>

                            <Descriptions.Item label={t("application.hasPreviouslyStudiedInUS")} span={getColumnSpan(1)}>
                                <Tag color={application?.hasPreviouslyStudiedInUS === "Yes" ? "green" : "red"}>
                                    {t(`application.${application?.hasPreviouslyStudiedInUS?.toLowerCase()}`)}
                                </Tag>
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>

                    {/* Essays */}
                    <Card
                        title={
                            <Space>
                                <EditOutlined />
                                <span>{t("application.essays")}</span>
                            </Space>
                        }
                    >
                        <Descriptions bordered column={1} layout="vertical" size={isSmallScreen ? "small" : "default"}>
                            <Descriptions.Item label={t("application.personalStatement")}>
                                <div style={{ whiteSpace: "pre-wrap", maxHeight: "200px", overflow: "auto" }}>
                                    {application?.personalStatement}
                                </div>
                            </Descriptions.Item>

                            {application?.optionalEssay && (
                                <Descriptions.Item label={t("application.optionalEssay")}>
                                    <div style={{ whiteSpace: "pre-wrap", maxHeight: "200px", overflow: "auto" }}>
                                        {application.optionalEssay}
                                    </div>
                                </Descriptions.Item>
                            )}
                        </Descriptions>
                    </Card>

                    {/* Payment Information */}
                    <Card
                        title={
                            <Space>
                                <CreditCardOutlined />
                                <span>{t("applicationDetails.payment_information")}</span>
                            </Space>
                        }
                    >
                        <Descriptions
                            bordered
                            column={isSmallScreen ? 1 : 3}
                            layout={descriptionsLayout}
                            size={isSmallScreen ? "small" : "default"}
                        >
                            <Descriptions.Item label={t("application.paymentMethod")} span={getColumnSpan(1)}>
                                <Tag color="blue">{application?.paymentMethod}</Tag>
                            </Descriptions.Item>

                            <Descriptions.Item label={t("applicationDetails.payment_amount")} span={getColumnSpan(1)}>
                                <Text strong>${application?.paymentAmount}</Text>
                            </Descriptions.Item>

                            <Descriptions.Item label={t("applicationDetails.payment_date")} span={getColumnSpan(1)}>
                                <CalendarOutlined /> {new Date(application?.paymentDate).toLocaleDateString()}
                            </Descriptions.Item>

                            {application?.transactionId && (
                                <Descriptions.Item label={t("applicationDetails.transaction_id")} span={3}>
                                    <CopyableFieldSimple value={application.transactionId} />
                                </Descriptions.Item>
                            )}
                        </Descriptions>
                    </Card>

                    {/* Institute Information */}
                    <Card
                        title={
                            <Space>
                                <BankOutlined />
                                <span>{t("applicationDetails.institute_information")}</span>
                            </Space>
                        }
                    >
                        <Descriptions
                            bordered
                            column={isSmallScreen ? 1 : 3}
                            layout={descriptionsLayout}
                            size={isSmallScreen ? "small" : "default"}
                        >
                            <Descriptions.Item label={t("applicationDetails.name")} span={3}>
                                {application?.institut?.name}
                            </Descriptions.Item>

                            <Descriptions.Item label={t("applicationDetails.type")} span={getColumnSpan(2)}>
                                {application?.institut?.type}
                            </Descriptions.Item>

                            <Descriptions.Item label={t("applicationDetails.country")}>
                                {application?.institut?.paysResidence}
                            </Descriptions.Item>

                            <Descriptions.Item label={t("applicationDetails.email")} span={getColumnSpan(2)}>
                                {application?.institut?.email}
                            </Descriptions.Item>

                            <Descriptions.Item label={t("applicationDetails.phone")}>
                                {application?.institut?.phone}
                            </Descriptions.Item>

                            {application?.institut?.adresse && (
                                <Descriptions.Item label={t("applicationDetails.address")} span={3}>
                                    {application.institut.adresse}
                                </Descriptions.Item>
                            )}
                        </Descriptions>
                    </Card>

                    {/* Additional Information */}
                    {(application?.applicationRound || application?.howDidYouHearAboutUs) && (
                        <Card
                            title={
                                <Space>
                                    <FileOutlined />
                                    <span>{t("applicationDetails.additional_information")}</span>
                                </Space>
                            }
                        >
                            <Descriptions
                                bordered
                                column={isSmallScreen ? 1 : 3}
                                layout={descriptionsLayout}
                                size={isSmallScreen ? "small" : "default"}
                            >
                                {application?.applicationRound && (
                                    <Descriptions.Item label={t("application.applicationRound")} span={getColumnSpan(2)}>
                                        {application.applicationRound}
                                    </Descriptions.Item>
                                )}

                                {application?.howDidYouHearAboutUs && (
                                    <Descriptions.Item label={t("application.howDidYouHearAboutUs")} span={3}>
                                        {application.howDidYouHearAboutUs}
                                    </Descriptions.Item>
                                )}
                            </Descriptions>
                        </Card>
                    )}
                </Space>
            </div>

            {/* PDF Modal */}
            <Modal
                title={t("applicationDetails.application_document")}
                open={pdfVisible}
                onCancel={() => {
                    setPdfVisible(false)
                    setPdfData(null)
                }}
                width={windowWidth < 768 ? "95%" : 1000}
                footer={null}
            >
                {pdfLoading ? (
                    <div style={{ textAlign: "center", padding: "20px" }}>
                        {/* <Spin tip={t("applicationDetails.loading_document")} /> */}
                        <Spin />
                    </div>
                ) : pdfError ? (
                    <div style={{ textAlign: "center", padding: "20px" }}>
                        <Text type="danger">{pdfError}</Text>
                    </div>
                ) : pdfData ? (
                    <object
                        data={`data:application/pdf;base64,${pdfData}`}
                        type="application/pdf"
                        width="100%"
                        height={windowWidth < 576 ? "300px" : "500px"}
                    >
                        <iframe
                            src={`data:application/pdf;base64,${pdfData}`}
                            width="100%"
                            height={windowWidth < 576 ? "300px" : "500px"}
                            title={t("applicationDetails.pdf_viewer")}
                        />
                    </object>
                ) : (
                    <div style={{ textAlign: "center", padding: "20px" }}>
                        <Text type="warning">{t("applicationDetails.no_document_to_display")}</Text>
                    </div>
                )}
            </Modal>
        </div>
    )
}

export default DemandeurApplicationDetail
