"use client"
import { useState, useEffect, useCallback, useMemo } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Card, Spin, Typography, Space, Tag, Descriptions, Button, message, Modal, Row, Col, Statistic, Form, Select, Input } from "antd"
import {
  UserOutlined,
  FileOutlined,
  EyeOutlined,
  GlobalOutlined,
  BookOutlined,
  TrophyOutlined,
  TeamOutlined,
  DollarOutlined,
  SafetyOutlined,
  EditOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  TranslationOutlined,
} from "@ant-design/icons"
import {
  BankOutlined,
  CalendarOutlined,

} from "@ant-design/icons"
import { deleteDocumentTraduit, getDemandePartageDetail, getFileDocumentPartager, getFileDocumentPartagerTraduit } from "../../../services/partageService"
import { CopyableFieldSimple } from "@/utils/CopyableField"
import InstitutBreadcrumb from "@/components/InstitutBreadcrumb"
import { File } from "lucide-react"
import { getAbonnementsByInstitutActif } from "@/services/abonnementService"
import { useAuthContext } from "@/context"
import { toast } from "sonner"
import { updateStatusObervationDemande } from "@/services/demandeService"

const { Text } = Typography

const InstitutPartageDetails = () => {
  const { id } = useParams()
  const { institut } = useAuthContext()
  const [loading, setLoading] = useState(true)
  const [demande, setDemande] = useState(null)
  const [error, setError] = useState(null)
  const [pdfVisible, setPdfVisible] = useState(false)
  const [pdfLoading, setPdfLoading] = useState(false)
  const [pdfData, setPdfData] = useState(null)
  const [pdfError, setPdfError] = useState(null)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const navigate = useNavigate()
  const { t } = useTranslation()


  const [modalVisible, setModalVisible] = useState(false);
  const [status, setStatus] = useState("");
  const [observation, setObservation] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const response = await updateStatusObervationDemande(id, { status, observation });
      console.log(response)
      message.success(t("institutPartageDetails.status_updated_successfully"));
      setModalVisible(false);
    } catch (error) {
      message.error(t("institutPartageDetails.error_updating_status"));
    } finally {
      setSubmitting(false);
    }
  };



  const statistics = useMemo(() => {
    if (!demande) return { totalDocuments: 0, completedSections: 0, totalSections: 12 }

    const totalDocuments = demande.documentPartages?.length || 0
    let completedSections = 0

    // Count completed sections
    if (demande.code) completedSections++
    if (demande.demandeur?.name) completedSections++
    if (demande.dob) completedSections++
    if (demande.englishProficiencyTests?.length) completedSections++
    if (demande.secondarySchoolName) completedSections++
    if (demande.intendedMajor) completedSections++
    if (demande.extracurricularActivities) completedSections++
    if (demande.parentGuardianName) completedSections++
    if (demande.willApplyForFinancialAid !== undefined) completedSections++
    if (demande.visaType) completedSections++
    if (demande.personalStatement) completedSections++
    if (totalDocuments > 0) completedSections++

    return { totalDocuments, completedSections, totalSections: 12 }
  }, [demande])

  // Gestion du redimensionnement de la fenêtre
  const handleResize = useCallback(() => {
    setWindowWidth(window.innerWidth)
  }, [])

  useEffect(() => {
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [handleResize])

  // Récupération des données
  useEffect(() => {

    checkSubscriptionStatus()

    const fetchDemande = async () => {
      try {
        const data = await getDemandePartageDetail(id)
        console.log(data)
        setDemande(data)
      } catch (err) {
        setError(err.message)
        message.error(t("institutPartageDetails.error_fetching_details"))
      } finally {
        setLoading(false)
      }
    }
    fetchDemande()
  }, [id, t])



  const checkSubscriptionStatus = async () => {
    try {
      const subscriptionData = await getAbonnementsByInstitutActif(institut.id)
      console.log(subscriptionData)
      if (!subscriptionData) {
        toast.dismiss();
        toast.warning(t("institutPartage.subscription_expired"))
        navigate("/institut/partages");
      }
    } catch (error) {
      console.error(t("institutPartage.error_checking_subscription"), error)
    }
  }


  // Layout responsive
  const isSmallScreen = windowWidth < 768
  const descriptionsLayout = isSmallScreen ? "vertical" : "horizontal"
  const getColumnSpan = (defaultSpan) => (isSmallScreen ? 3 : defaultSpan)

  const formatBoolean = useCallback(
    (value) => {
      if (value === true || value === "true") return t("application.options.yesNo.yes")
      if (value === false || value === "false") return t("application.options.yesNo.no")
      return value
    },
    [t],
  )

  const formatArray = useCallback(
    (array, formatter = (x) => x) => {
      if (!array || !Array.isArray(array) || array.length === 0) return t("common.notSpecified")
      return array.map(formatter).join(", ")
    },
    [t],
  )

  const formatExam = useCallback(
    (exam) => {
      const examMap = {
        "A-Levels": t("application.options.exams.alevels"),
        "IB Diploma": t("application.options.exams.ib"),
        "WAEC/NECO": t("application.options.exams.waec"),
        "French Baccalauréat": t("application.options.exams.baccalaureat"),
        "National Exams": t("application.options.exams.national"),
      }
      return examMap[exam] || exam
    },
    [t],
  )

  const formatEnglishTest = useCallback(
    (test) => {
      const testMap = {
        TOEFL: t("application.options.englishTests.toefl"),
        IELTS: t("application.options.englishTests.ielts"),
        "Duolingo English Test": t("application.options.englishTests.duolingo"),
        "PTE Academic": t("application.options.englishTests.pte"),
        None: t("application.options.englishTests.none"),
      }
      return testMap[test] || test
    },
    [t],
  )

  const formatVisa = useCallback(
    (visa) => {
      const visaMap = {
        None: t("application.options.visaTypes.none"),
        "F-1 Student Visa": t("application.options.visaTypes.f1"),
        "J-1 Exchange": t("application.options.visaTypes.j1"),
        Other: t("application.options.visaTypes.other"),
      }
      return visaMap[visa] || visa
    },
    [t],
  )

  const formatLevel = useCallback(
    (level) => {
      const levelMap = {
        "No formal education": t("application.options.educationLevels.noFormal"),
        Secondary: t("application.options.educationLevels.secondary"),
        "Bachelor's": t("application.options.educationLevels.bachelors"),
        Graduate: t("application.options.educationLevels.graduate"),
      }
      return levelMap[level] || level
    },
    [t],
  )

  const formatPeriod = useCallback(
    (periode) => {
      const periodMap = {
        Printemps: t("application.options.periods.spring"),
        Été: t("application.options.periods.summer"),
        Automne: t("application.options.periods.fall"),
        Hiver: t("application.options.periods.winter"),
        Autre: t("application.options.periods.other"),
      }
      return periodMap[periode] || periode
    },
    [t],
  )

  const formatApplicationRound = useCallback(
    (round) => {
      const roundMap = {
        "Regular Decision": t("application.options.applicationRounds.regularDecision"),
        "Early Action": t("application.options.applicationRounds.earlyAction"),
        "Early Decision": t("application.options.applicationRounds.earlyDecision"),
      }
      return roundMap[round] || round
    },
    [t],
  )

  // Affichage du PDF
  const handleViewDocument = useCallback(
    async (docId) => {
      try {
        setPdfError(null)
        setPdfLoading(true)
        setPdfVisible(true)
        const base64Data = await getFileDocumentPartager(docId)
        setPdfData(base64Data)
      } catch (error) {
        setPdfError(error.message)
        message.error(t("institutPartageDetails.error_loading_document"))
      } finally {
        setPdfLoading(false)
      }
    },
    [t],
  )




  const handleViewTraduction = useCallback(
    async (docId) => {
      try {
        setPdfError(null)
        setPdfLoading(true)
        setPdfVisible(true)
        const base64Data = await getFileDocumentPartagerTraduit(docId)
        console.log(base64Data)
        setPdfData(base64Data)
      } catch (error) {
        console.log(error)
        setPdfError(error.message)
        message.error(t("institutPartageDetails.error_loading_document"))
      } finally {
        setPdfLoading(false)
      }
    },
    [t],
  )

  // Affichage du chargement ou de l'erreur
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
        }}
      >
        <Spin fullscreen size="large" />
      </div>
    )
  }



  if (error) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "50px",
          background: "linear-gradient(135deg, #254c6b 0%, #3eb6e9 100%)",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card>
          <Text type="danger">{error}</Text>
        </Card>
      </div>
    )
  }

  // Rendu principal
  return (
    <div
      style={{
        minHeight: "100vh",
      }}
    >
      <InstitutBreadcrumb title={t("institutPartageDetails.request_details")} SubTitle={demande?.code} />

      <div style={{ padding: "20px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px" }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={8}>
              <Card
                style={{
                  background: "rgba(255,255,255,0.95)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              >
                <Statistic
                  title={t('institutPartageDetails.documents')}
                  value={statistics.totalDocuments}
                  prefix={<File style={{ color: "#254c6b" }} />}
                  valueStyle={{ color: "#254c6b" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card
                style={{
                  background: "rgba(255,255,255,0.95)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              >
                <Statistic
                  title={t('institutPartageDetails.section_completed')}
                  value={statistics.completedSections}
                  suffix={`/ ${statistics.totalSections}`}
                  prefix={<CheckCircleOutlined style={{ color: "#3eb6e9" }} />}
                  valueStyle={{ color: "#3eb6e9" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card
                style={{
                  background: "rgba(255,255,255,0.95)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              >
                <Statistic
                  title={t('institutPartageDetails.date_demande')}
                  value={demande?.dateDemande ? new Date(demande.dateDemande).toLocaleDateString() : "N/A"}
                  prefix={<ClockCircleOutlined style={{ color: "#e41021" }} />}
                  valueStyle={{ color: "#e41021", fontSize: "18px" }}
                />
              </Card>
            </Col>
          </Row>

          <div style={{ margin: "20px 0", textAlign: "right" }}>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => setModalVisible(true)}
            >
              {t("institutPartageDetails.respond_to_request")}
            </Button>
          </div>


          {/* Section pour afficher le statut et les observations */}
          {demande?.status || demande?.observation ? (
            <Card
              style={{
                marginBottom: "20px",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                background: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(10px)",
              }}
            >
              <Descriptions
                title={
                  <span style={{ color: "#254c6b", fontSize: "16px", fontWeight: "600" }}>
                    {t("institutPartageDetails.current_status")}
                  </span>
                }
                bordered
                column={1}
                layout="horizontal"
                size="default"
              >
                {demande?.statut && (
                  <Descriptions.Item label={t("institutPartageDetails.status")}>
                    <Tag
                      color={
                        demande.statuts === "accepted"
                          ? "green"
                          : demande.status === "rejected"
                            ? "red"
                            : "orange"
                      }
                    >
                      {demande.status === "accepted"
                        ? t("institutPartageDetails.status_accepted")
                        : demande.status === "rejected"
                          ? t("institutPartageDetails.status_rejected")
                          : t("institutPartageDetails.status_pending")}
                    </Tag>
                  </Descriptions.Item>
                )}
                {demande?.observation && (
                  <Descriptions.Item label={t("institutPartageDetails.observation")}>
                    <div
                      style={{
                        whiteSpace: "pre-wrap",
                        maxHeight: "150px",
                        overflowY: "auto",
                        padding: "8px",
                        backgroundColor: "#f9f9f9",
                        borderRadius: "4px",
                        border: "1px solid #e0e0e0",
                      }}
                    >
                      {demande.observation}
                    </div>
                  </Descriptions.Item>
                )}
              </Descriptions>
            </Card>
          ) : null}


        </div>
      </div>

      <section className="py-6">
        <div className="container max-w-6xl mx-auto px-4">
          <div
            style={{
              background: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(10px)",
              borderRadius: "16px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
              overflow: "hidden",
            }}
          >
            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: isSmallScreen ? "12px" : "24px" }}>


              <Space direction="vertical" size="large" style={{ width: "100%" }}>
                {/* Information générale de la demande */}
                <Card>
                  <Descriptions
                    title={
                      <span style={{ color: "#254c6b", fontSize: "18px", fontWeight: "600" }}>
                        {t("institutPartageDetails.request_information")}
                      </span>
                    }
                    bordered
                    column={isSmallScreen ? 1 : 3}
                    layout={descriptionsLayout}
                    size={isSmallScreen ? "small" : "default"}
                  >
                    <Descriptions.Item label={t("institutPartageDetails.code")} span={3}>
                      <Tag color="blue">
                        <CopyableFieldSimple value={demande.code} />
                      </Tag>
                    </Descriptions.Item>

                    <Descriptions.Item label={t("institutPartageDetails.request_date")} span={3}>
                      {demande.dateDemande ? new Date(demande.dateDemande).toLocaleDateString() : t("common.notSpecified")}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("application.fields.preferredStartPeriod")} span={3}>
                      {formatPeriod(demande.periode) + " " + demande.year || t("common.notSpecified")}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("application.fields.applicationRound")} span={3}>
                      {demande.applicationRound || t("common.notSpecified")}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("application.fields.howDidYouHearAboutUs")} span={3}>
                      {demande.howDidYouHearAboutUs || t("common.notSpecified")}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>

                {/* Information du demandeur - Informations de base */}
                <Card
                  title={
                    <Space>
                      <UserOutlined style={{ color: "#3eb6e9" }} />
                      <span style={{ color: "#3eb6e9", fontSize: "18px", fontWeight: "600" }}>
                        {t("institutPartageDetails.requester_information")}
                      </span>
                    </Space>
                  }
                >
                  <Descriptions
                    bordered
                    column={isSmallScreen ? 1 : 2}
                    layout={descriptionsLayout}
                    size={isSmallScreen ? "small" : "default"}
                  >
                    <Descriptions.Item label={t("institutPartageDetails.name")} span={getColumnSpan(2)}>
                      {demande.demandeur?.name || t("common.notSpecified")}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("institutPartageDetails.gender")}>
                      {demande.demandeur?.sexe || t("common.notSpecified")}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("institutPartageDetails.email")} span={getColumnSpan(2)}>
                      {demande.demandeur?.email || t("common.notSpecified")}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("institutPartageDetails.phone")}>
                      {demande.demandeur?.phone || t("common.notSpecified")}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("institutPartageDetails.profession")} span={getColumnSpan(2)}>
                      {demande.demandeur?.profession || t("common.notSpecified")}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("institutPartageDetails.code")}>
                      {demande.demandeur?.codeUser || t("common.notSpecified")}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("institutPartageDetails.birth_date")}>
                      {demande.demandeur?.dateNaissance ? new Date(demande.demandeur.dateNaissance).toLocaleDateString() : t("common.notSpecified")}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("institutPartageDetails.birth_place")}>
                      {demande.demandeur?.lieuNaissance || t("common.notSpecified")}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("institutPartageDetails.country_of_residence")}>
                      {demande.demandeur?.paysResidence || t("common.notSpecified")}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>

                {/* information de l'institut */}
                <Card
                  title={
                    <Space>
                      <BankOutlined />
                      <span>{t("institutTraducteur.institute_information")}</span>
                    </Space>
                  }
                >
                  <Descriptions bordered column={isSmallScreen ? 1 : 2}>
                    <Descriptions.Item label={t("institutTraducteur.name")} >
                      {demande.institut.name}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("institutTraducteur.type")} >
                      {demande.institut.type}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("institutTraducteur.country")}>
                      {demande.institut.paysResidence}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("institutTraducteur.email")} >
                      {demande.institut.email}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("institutTraducteur.phone")}>{demande.institut.phone}</Descriptions.Item>
                    <Descriptions.Item label={t("institutTraducteur.address")}>
                      {demande.institut.adresse}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>



                {/* information institut Traducteur */}
                {demande.institutTraducteur && <>
                  <Card
                    title={
                      <Space>
                        <BankOutlined />
                        <span>{t("institutTraducteur.institute_information_traducteur")}</span>
                      </Space>
                    }
                    style={{ marginTop: "16px" }}
                  >
                    <Descriptions
                      bordered
                      column={isSmallScreen ? 1 : 3}
                      layout={descriptionsLayout}
                      size={isSmallScreen ? "small" : "default"}
                    >
                      <Descriptions.Item label={t("institutTraducteur.name")} span={3}>
                        {demande.institutTraducteur.name}
                      </Descriptions.Item>
                      <Descriptions.Item label={t("institutTraducteur.type")} span={getColumnSpan(2)}>
                        {demande.institutTraducteur.type}
                      </Descriptions.Item>
                      <Descriptions.Item label={t("institutTraducteur.country")}>
                        {demande.institutTraducteur.paysResidence}
                      </Descriptions.Item>
                      <Descriptions.Item label={t("institutTraducteur.email")} span={getColumnSpan(2)}>
                        {demande.institutTraducteur.email}
                      </Descriptions.Item>
                      <Descriptions.Item label={t("institutTraducteur.phone")}>
                        {demande.institutTraducteur.phone}
                      </Descriptions.Item>
                      <Descriptions.Item label={t("institutTraducteur.address")} span={3}>
                        {demande.institutTraducteur.adresse}
                      </Descriptions.Item>
                    </Descriptions>
                  </Card>

                </>}


                {/* Informations personnelles de l'application */}
                <Card
                  style={{ borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                  title={
                    <Space>
                      <UserOutlined style={{ color: "#e41021" }} />
                      <span style={{ color: "#e41021", fontSize: "18px", fontWeight: "600" }}>
                        {t("application.personalInformation")}
                      </span>
                    </Space>
                  }
                >
                  <Descriptions
                    bordered
                    column={isSmallScreen ? 1 : 2}
                    layout={descriptionsLayout}
                    size={isSmallScreen ? "small" : "default"}
                  >
                    <Descriptions.Item label={t("application.fields.dateOfBirth")} span={getColumnSpan(1)}>
                      {demande.dob ? new Date(demande.dob).toLocaleDateString() : t("common.notSpecified")}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("application.fields.countryOfCitizenship")} span={getColumnSpan(2)}>
                      {demande.citizenship || t("common.notSpecified")}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("application.fields.passportNumber")} span={2}>
                      {demande.passport || t("common.notSpecified")}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>

                {/* Maîtrise de l'anglais */}
                <Card
                  style={{ borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                  title={
                    <Space>
                      <GlobalOutlined style={{ color: "#254c6b" }} />
                      <span style={{ color: "#254c6b", fontSize: "18px", fontWeight: "600" }}>
                        {t("application.englishProficiency")}
                      </span>
                    </Space>
                  }
                >
                  <Descriptions
                    bordered
                    column={isSmallScreen ? 1 : 2}
                    layout={descriptionsLayout}
                    size={isSmallScreen ? "small" : "default"}
                  >
                    <Descriptions.Item label={t("application.fields.isEnglishFirstLanguage")} span={2}>
                      {formatBoolean(demande.isEnglishFirstLanguage)}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("application.fields.englishProficiencyTests")} span={getColumnSpan(2)}>
                      {formatArray(demande.englishProficiencyTests)}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("application.fields.testScores")} span={getColumnSpan(1)}>
                      {demande.testScores || t("common.notSpecified")}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>

                {/* Parcours académique */}
                <Card
                  style={{ borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                  title={
                    <Space>
                      <BookOutlined style={{ color: "#3eb6e9" }} />
                      <span style={{ color: "#3eb6e9", fontSize: "18px", fontWeight: "600" }}>
                        {t("application.academicBackground")}
                      </span>
                    </Space>
                  }
                >
                  <Descriptions
                    bordered
                    column={isSmallScreen ? 1 : 2}
                    layout={descriptionsLayout}
                    size={isSmallScreen ? "small" : "default"}
                  >
                    <Descriptions.Item label={t("application.fields.secondarySchoolName")} span={getColumnSpan(2)}>
                      {demande.secondarySchoolName || t("common.notSpecified")}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("application.fields.countryOfSchool")} span={getColumnSpan(1)}>
                      {demande.countryOfSchool || t("common.notSpecified")}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("application.fields.graduationDate")} span={getColumnSpan(1)}>
                      {demande.graduationDate ? new Date(demande.graduationDate).toLocaleDateString() : t("common.notSpecified")}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("application.fields.gradingScale")} span={getColumnSpan(1)}>
                      {demande.gradingScale || t("common.notSpecified")}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("application.fields.gpaOrAverage")} span={getColumnSpan(1)}>
                      {demande.gpa || t("common.notSpecified")}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("application.fields.examsTaken")} span={2}>
                      {formatArray(demande.examsTaken)}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>

                {/* Programme d'études */}
                <Card
                  style={{ borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                  title={
                    <Space>
                      <BookOutlined style={{ color: "#e41021" }} />
                      <span style={{ color: "#e41021", fontSize: "18px", fontWeight: "600" }}>
                        {t("application.intendedProgramOfStudy")}
                      </span>
                    </Space>
                  }
                >
                  <Descriptions
                    bordered
                    column={isSmallScreen ? 1 : 2}
                    layout={descriptionsLayout}
                    size={isSmallScreen ? "small" : "default"}
                  >
                    <Descriptions.Item label={t("application.fields.intendedMajor")} span={2}>
                      {demande.intendedMajor || t("common.notSpecified")}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>

                {/* Activités et réalisations */}
                <Card
                  style={{ borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                  title={
                    <Space>
                      <TrophyOutlined style={{ color: "#254c6b" }} />
                      <span style={{ color: "#254c6b", fontSize: "18px", fontWeight: "600" }}>
                        {t("application.activitiesAndAchievements")}
                      </span>
                    </Space>
                  }
                >
                  <Descriptions
                    bordered
                    column={1}
                    layout="vertical"
                    size={isSmallScreen ? "small" : "default"}
                  >
                    <Descriptions.Item label={t("application.fields.extracurricularActivities")}>
                      <div style={{ whiteSpace: "pre-wrap", maxHeight: "200px", overflowY: "auto" }}>
                        {demande.extracurricularActivities || t("common.notSpecified")}
                      </div>
                    </Descriptions.Item>
                    <Descriptions.Item label={t("application.fields.honorsOrAwards")}>
                      <div style={{ whiteSpace: "pre-wrap", maxHeight: "200px", overflowY: "auto" }}>
                        {demande.honorsOrAwards || t("common.notSpecified")}
                      </div>
                    </Descriptions.Item>
                  </Descriptions>
                </Card>

                {/* Informations familiales */}
                <Card
                  style={{ borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                  title={
                    <Space>
                      <TeamOutlined style={{ color: "#3eb6e9" }} />
                      <span style={{ color: "#3eb6e9", fontSize: "18px", fontWeight: "600" }}>
                        {t("application.familyInformation")}
                      </span>
                    </Space>
                  }
                >
                  <Descriptions
                    bordered
                    column={isSmallScreen ? 1 : 2}
                    layout={descriptionsLayout}
                    size={isSmallScreen ? "small" : "default"}
                  >
                    <Descriptions.Item label={t("application.fields.parentGuardianName")} span={getColumnSpan(2)}>
                      {demande.parentGuardianName || t("common.notSpecified")}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("application.fields.parentOccupation")} span={getColumnSpan(1)}>
                      {demande.occupation || t("common.notSpecified")}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("application.fields.educationLevel")} span={2}>
                      {demande.educationLevel || t("common.notSpecified")}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>

                {/* Informations financières */}
                <Card
                  style={{ borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                  title={
                    <Space>
                      <DollarOutlined style={{ color: "#e41021" }} />
                      <span style={{ color: "#e41021", fontSize: "18px", fontWeight: "600" }}>
                        {t("application.financialInformation")}
                      </span>
                    </Space>
                  }
                >
                  <Descriptions
                    bordered
                    column={isSmallScreen ? 1 : 2}
                    layout={descriptionsLayout}
                    size={isSmallScreen ? "small" : "default"}
                  >
                    <Descriptions.Item label={t("application.fields.willApplyForFinancialAid")}>
                      {formatBoolean(demande.willApplyForFinancialAid)}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("application.fields.hasExternalSponsorship")}>
                      {formatBoolean(demande.hasExternalSponsorship)}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>

                {/* Informations de visa */}
                <Card
                  style={{ borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                  title={
                    <Space>
                      <SafetyOutlined style={{ color: "#254c6b" }} />
                      <span style={{ color: "#254c6b", fontSize: "18px", fontWeight: "600" }}>
                        {t("application.visaInformation")}
                      </span>
                    </Space>
                  }
                >
                  <Descriptions
                    bordered
                    column={isSmallScreen ? 1 : 2}
                    layout={descriptionsLayout}
                    size={isSmallScreen ? "small" : "default"}
                  >
                    <Descriptions.Item label={t("application.fields.visaType")}>
                      {demande.visaType || t("common.notSpecified")}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("application.fields.hasPreviouslyStudiedInUS")}>
                      {formatBoolean(demande.hasPreviouslyStudiedInUS)}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>

                {/* Essais */}
                <Card
                  style={{ borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                  title={
                    <Space>
                      <EditOutlined style={{ color: "#3eb6e9" }} />
                      <span style={{ color: "#3eb6e9", fontSize: "18px", fontWeight: "600" }}>
                        {t("application.essays")}
                      </span>
                    </Space>
                  }
                >
                  <Descriptions
                    bordered
                    column={1}
                    layout="vertical"
                    size={isSmallScreen ? "small" : "default"}
                  >
                    <Descriptions.Item label={t("application.fields.personalStatement")}>
                      <div style={{
                        whiteSpace: "pre-wrap",
                        maxHeight: "300px",
                        overflowY: "auto",
                        padding: "12px",
                        backgroundColor: "#f9f9f9",
                        borderRadius: "6px",
                        border: "1px solid #e0e0e0"
                      }}>
                        {demande.personalStatement || t("common.notSpecified")}
                      </div>
                    </Descriptions.Item>
                    <Descriptions.Item label={t("application.fields.optionalEssay")}>
                      <div style={{
                        whiteSpace: "pre-wrap",
                        maxHeight: "300px",
                        overflowY: "auto",
                        padding: "12px",
                        backgroundColor: "#f9f9f9",
                        borderRadius: "6px",
                        border: "1px solid #e0e0e0"
                      }}>
                        {demande.optionalEssay || t("common.notSpecified")}
                      </div>
                    </Descriptions.Item>
                  </Descriptions>
                </Card>

                {/* Documents partagés */}
                <Card
                  id="documents"
                  style={{ borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                  title={
                    <Space>
                      <FileOutlined style={{ color: "#e41021" }} />
                      <span style={{ color: "#e41021", fontSize: "18px", fontWeight: "600" }}>
                        {t("institutPartageDetails.shared_documents")}
                      </span>
                    </Space>
                  }
                >
                  {demande.documentPartages && demande.documentPartages.length > 0 ? (
                    <Space direction="vertical" style={{ width: "100%" }}>
                      {demande.documentPartages.map((doc) => (
                        <Card
                          key={doc.id}
                          type="inner"
                          style={{ marginBottom: "10px" }}
                          extra={
                            <>
                              <Button
                                icon={<EyeOutlined />}
                                className="ant-btn-primary text-white"
                                onClick={() => handleViewDocument(doc.id)}
                              >
                                {t("institutTraducteurDetails.view_document")}
                              </Button>
                              {doc.estTraduit && (
                                <Button
                                  icon={<TranslationOutlined />}
                                  className="ant-btn-secondary text-white"
                                  onClick={() => handleViewTraduction(doc.id)}
                                >
                                  {t("institutTraducteur.view_translation")}
                                </Button>
                              )}
                            </>
                          }
                        >

                          <Descriptions bordered>
                            <Descriptions.Item label={t("institutTraducteur.title")} span={2}>
                              {doc.intitule}
                            </Descriptions.Item>
                            <Descriptions.Item label={t("institutTraducteur.type")}>
                              {doc.typeDocument}
                            </Descriptions.Item>
                            <Descriptions.Item label={t("institutTraducteur.dna_code")} span={2}>
                              {doc.codeAdn}
                            </Descriptions.Item>
                            <Descriptions.Item label={t("institutTraducteur.year_obtained")}>
                              {doc.anneeObtention}
                            </Descriptions.Item>
                          </Descriptions>
                          <Card
                            title={
                              <Space>
                                <BankOutlined />
                                <span>{t("institutTraducteur.institute_information")}</span>
                              </Space>
                            }
                          >
                            <Descriptions bordered column={isSmallScreen ? 1 : 2}>
                              <Descriptions.Item label={t("institutTraducteur.name")} span={2}>
                                {doc.institut?.name || t("common.notSpecified")}
                              </Descriptions.Item>
                              <Descriptions.Item label={t("institutTraducteur.type")} span={2}>
                                {doc.institut?.type || t("common.notSpecified")}
                              </Descriptions.Item>
                              <Descriptions.Item label={t("institutTraducteur.country")} span={2}>
                                {doc.institut?.paysResidence || t("common.notSpecified")}
                              </Descriptions.Item>
                              <Descriptions.Item label={t("institutTraducteur.email")} span={2}>
                                {doc.institut?.email || t("common.notSpecified")}
                              </Descriptions.Item>
                              <Descriptions.Item label={t("institutTraducteur.phone")} span={2}>
                                {doc.institut?.phone || t("common.notSpecified")}
                              </Descriptions.Item>
                              <Descriptions.Item label={t("institutTraducteur.address")} span={2}>
                                {doc.institut?.adresse || t("common.notSpecified")}
                              </Descriptions.Item>
                            </Descriptions>
                          </Card>
                        </Card>
                      ))}
                    </Space>
                  ) : (
                    <Text type="secondary">{t("institutPartageDetails.no_shared_documents")}</Text>
                  )}
                </Card>
              </Space>

            </div>
          </div>
        </div>
      </section>


      {/* Modal pour afficher le PDF */}
      <Modal
        title={t("institutPartageDetails.pdf_document")}
        open={pdfVisible}
        onCancel={() => {
          setPdfVisible(false)
          setPdfData(null)
        }}
        width={isSmallScreen ? "95%" : 1000}
        footer={null}
      >
        {pdfLoading ? (
          <div style={{ textAlign: "center", padding: "20px", color: "#254c6b" }}>
            <Spin fullscreen />
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
                height={isSmallScreen ? "300px" : "500px"}
                aria-label={t("institutPartageDetails.pdf_viewer")}
              >
                <iframe
                  src={`data:application/pdf;base64,${pdfData}`}
                  width="100%"
              height={isSmallScreen ? "300px" : "500px"}
              title={t("institutPartageDetails.pdf_viewer")}
            />
          </object>
        ) : (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <Text type="warning">{t("institutPartageDetails.no_document_to_display")}</Text>
          </div>
        )}
      </Modal>


      <Modal
        title={t("institutPartageDetails.respond_to_request")}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setModalVisible(false)}>
            {t("common.cancel")}
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={submitting}
            onClick={handleSubmit}
          >
            {t("common.submit")}
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label={t("institutPartageDetails.status")}>
            <Select
              value={status}
              onChange={setStatus}
              placeholder={t("institutPartageDetails.select_status")}
            >
              <Select.Option value="accepted">
                {t("institutPartageDetails.status_accepted")}
              </Select.Option>
              <Select.Option value="rejected">
                {t("institutPartageDetails.status_rejected")}
              </Select.Option>
              <Select.Option value="pending">
                {t("institutPartageDetails.status_pending")}
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label={t("institutPartageDetails.observation")}>
            <Input.TextArea
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
              rows={4}
              placeholder={t("institutPartageDetails.enter_observation")}
            />
          </Form.Item>

        </Form>
      </Modal>


    </div>
  )
}

export default InstitutPartageDetails
