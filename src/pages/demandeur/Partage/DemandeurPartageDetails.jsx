"use client"
import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useAuthContext } from "../../../context/useAuthContext"
import { useTranslation } from "react-i18next"
import { Card, Spin, Typography, Space, Tag, Descriptions, Button, message, Modal, Divider } from "antd"
import {
  ArrowLeftOutlined,
  BankOutlined,
  FileOutlined,
  CalendarOutlined,
  EyeOutlined,
  UserOutlined,
  GlobalOutlined,
  BookOutlined,
  TrophyOutlined,
  TeamOutlined,
  DollarOutlined,
  SafetyOutlined,
  EditOutlined,
  CheckCircleOutlined
} from "@ant-design/icons"
import DemandeurBreadcrumb from "../../../components/DemandeurBreadcrumb"
import { getDemandePartageDetail, getFileDocumentPartager } from "../../../services/partageService"
import { CopyableFieldSimple } from "@/utils/CopyableField"

const { Title, Text } = Typography

const DemandeurPartageDetails = () => {
  const { id } = useParams()
  const { demandeur } = useAuthContext()
  const [loading, setLoading] = useState(true)
  const [demande, setDemande] = useState(null)
  const [error, setError] = useState(null)
  const [selectedDoc, setSelectedDoc] = useState(null)
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
    fetchDemande()
  }, [id])

  const fetchDemande = async () => {
    try {
      const data = await getDemandePartageDetail(id)
      console.log(data)
      setDemande(data)
    } catch (err) {
      setError(err.message)
      message.error(t("demandeurPartageDetails.error_fetching_details"))
    } finally {
      setLoading(false)
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

  // Determine if we should use column layout based on screen size
  const isSmallScreen = windowWidth < 768

  // Configure descriptions layout based on screen size
  const descriptionsLayout = isSmallScreen ? "vertical" : "horizontal"

  // Adjust column spans for responsive layout
  const getColumnSpan = (defaultSpan) => (isSmallScreen ? 3 : defaultSpan)

  // Helper function to format boolean values
  const formatBoolean = (value) => {
    if (value === true || value === "true") return t("application.options.yesNo.yes")
    if (value === false || value === "false") return t("application.options.yesNo.no")
    return value
  }


  const formatArrayExam = (array) => {
    if (!array || !Array.isArray(array) || array.length === 0) return t("common.notSpecified")
    const result = []
    array.forEach(element => {
      result.push(formatExam(element))
    })
    return result.join(", ")
  }

  const formatArrayEnglisTest = (array) => {
    if (!array || !Array.isArray(array) || array.length === 0) return t("common.notSpecified")
    const liste = []
    array.forEach(element => {
      liste.push(formatEnglishTest(element))
    });
    return liste.join(", ")
  }

  const formatExam = (exam) => {
    const periodMap = {
      "A-Levels": t("application.options.exams.alevels"),
      "IB Diploma": t("application.options.exams.ib"),
      "WAEC/NECO": t("application.options.exams.waec"),
      "French Baccalauréat": t("application.options.exams.baccalaureat"),
      "National Exams": t("application.options.exams.national"),
    }
    return periodMap[exam] || exam

  }
  const formatVisa = (visa) => {
    const periodMap = {
      "None": t("application.options.visaTypes.none"),
      "F-1 Student Visa": t("application.options.visaTypes.f1"),
      "J-1 Exchange": t("application.options.visaTypes.j1"),
      "Other": t("application.options.visaTypes.other"),
    }
    return periodMap[visa] || visa
  }

  const formatEnglishTest = (englishTest) => {
    const periodMap = {
      "TOEFL": t("application.options.englishTests.toefl"),
      "IELTS": t("application.options.englishTests.ielts"),
      "Duolingo English Test": t("application.options.englishTests.duolingo"),
      "PTE Academic": t("application.options.englishTests.pte"),
      "None": t("application.options.englishTests.none"),
    }
    return periodMap[englishTest] || englishTest
  }

  const formatLevel = (level) => {
    const periodMap = {
      "No formal education": t("application.options.educationLevels.noFormal"),
      "Secondary": t("application.options.educationLevels.secondary"),
      "Bachelor's": t("application.options.educationLevels.bachelors"),
      "Graduate": t("application.options.educationLevels.graduate"),
    }
    return periodMap[level] || level
  }
  // Helper function to format period
  const formatPeriod = (periode) => {
    const periodMap = {
      "Printemps": t("application.options.periods.spring"),
      "Été": t("application.options.periods.summer"),
      "Automne": t("application.options.periods.fall"),
      "Hiver": t("application.options.periods.winter"),
      "Autre": t("application.options.periods.other")
    }
    return periodMap[periode] || periode
  }


  const formatApplicationRound = (applicationRound) => {
    const periodMap = {
      "Regular Decision": t("application.options.applicationRounds.regularDecision"),
      "Early Action": t("application.options.applicationRounds.earlyAction"),
      "Early Decision": t("application.options.applicationRounds.earlyDecision"),
    }
    return periodMap[applicationRound] || applicationRound
  }

  return (
    <div style={{ background: "#f0f2f5", minHeight: "100vh" }}>
      <DemandeurBreadcrumb title={t("demandeurPartageDetails.request_details")} SubTitle={demande?.code} />
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: windowWidth < 576 ? "12px" : "24px" }}>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>

          {/* Information générale de la demande */}
          <Card>
            <Descriptions
              title={t("demandeurPartageDetails.request_information")}
              bordered
              column={isSmallScreen ? 1 : 3}
              layout={descriptionsLayout}
              size={isSmallScreen ? "small" : "default"}
            >
              <Descriptions.Item label={t("demandeurPartageDetails.code")} span={3}>
                <Tag color="blue">
                  <CopyableFieldSimple value={demande.code} />
                </Tag>
              </Descriptions.Item>

              <Descriptions.Item label={t("demandeurPartageDetails.request_date")} span={3}>
                {new Date(demande.dateDemande).toLocaleDateString()}
              </Descriptions.Item>
              <Descriptions.Item label={t("application.fields.preferredStartPeriod")} span={3}>
                {demande.periode ? <>
                  {formatPeriod(demande.periode) + " " + demande.year}
                </> : <>
                  {t("common.notSpecified")}
                </>}
              </Descriptions.Item>
              <Descriptions.Item label={t("application.fields.applicationRound")} span={3}>
                {formatApplicationRound(demande.applicationRound) || t("common.notSpecified")}


              </Descriptions.Item>
              <Descriptions.Item label={t("application.fields.howDidYouHearAboutUs")} span={3}>
                {demande.howDidYouHearAboutUs || t("common.notSpecified")}
              </Descriptions.Item>
            </Descriptions>
          </Card>


          {/* Informations personnelles */}
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
              <Descriptions.Item label={t("application.fields.dateOfBirth")} span={getColumnSpan(1)}>
                {demande.dob ? new Date(demande.dob).toLocaleDateString() : t("common.notSpecified")}
              </Descriptions.Item>
              <Descriptions.Item label={t("application.fields.countryOfCitizenship")} span={getColumnSpan(2)}>
                {demande.citizenship || t("common.notSpecified")}
              </Descriptions.Item>
              <Descriptions.Item label={t("application.fields.passportNumber")} span={3}>
                {demande.passport || t("common.notSpecified")}
              </Descriptions.Item>
            </Descriptions>
          </Card>


          {/* Information de l'institut */}
          <Card
            title={
              <Space>
                <BankOutlined />
                <span>{t("demandeurPartageDetails.institute_information")}</span>
              </Space>
            }
          >
            <Descriptions
              bordered
              column={isSmallScreen ? 1 : 3}
              layout={descriptionsLayout}
              size={isSmallScreen ? "small" : "default"}
            >
              <Descriptions.Item label={t("demandeurPartageDetails.name")} span={3}>
                {demande.institut.name}
              </Descriptions.Item>
              <Descriptions.Item label={t("demandeurPartageDetails.type")} span={getColumnSpan(2)}>
                {demande.institut.type}
              </Descriptions.Item>
              <Descriptions.Item label={t("demandeurPartageDetails.country")}>
                {demande.institut.paysResidence}
              </Descriptions.Item>
              <Descriptions.Item label={t("demandeurPartageDetails.email")} span={getColumnSpan(2)}>
                {demande.institut.email}
              </Descriptions.Item>
              <Descriptions.Item label={t("demandeurPartageDetails.phone")}>{demande.institut.phone}</Descriptions.Item>
              <Descriptions.Item label={t("demandeurPartageDetails.address")} span={3}>
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



          {/* Maîtrise de l'anglais */}
          <Card
            title={
              <Space>
                <GlobalOutlined />
                <span>{t("application.englishProficiency")}</span>
              </Space>
            }
          >
            <Descriptions
              bordered
              column={isSmallScreen ? 1 : 3}
              layout={descriptionsLayout}
              size={isSmallScreen ? "small" : "default"}
            >
              <Descriptions.Item label={t("application.fields.isEnglishFirstLanguage")} span={3}>
                {formatBoolean(demande.isEnglishFirstLanguage)}
              </Descriptions.Item>
              <Descriptions.Item label={t("application.fields.englishProficiencyTests")} span={getColumnSpan(2)}>
                {/* {formatArray(formatEnglishTest(demande.englishProficiencyTests))} */}
                {formatArrayEnglisTest(demande.englishProficiencyTests)}
              </Descriptions.Item>
              <Descriptions.Item label={t("application.fields.testScores")} span={getColumnSpan(1)}>
                {demande.testScores || t("common.notSpecified")}
              </Descriptions.Item>
            </Descriptions>
          </Card>

          {/* Parcours académique */}
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
              <Descriptions.Item label={t("application.fields.examsTaken")} span={3}>
                {formatArrayExam(demande.examsTaken)}
              </Descriptions.Item>
            </Descriptions>
          </Card>

          {/* Programme d'études */}
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
            title={
              <Space>
                <TrophyOutlined />
                <span>{t("application.activitiesAndAchievements")}</span>
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
              <Descriptions.Item label={t("application.fields.parentGuardianName")} span={getColumnSpan(2)}>
                {demande.parentGuardianName || t("common.notSpecified")}
              </Descriptions.Item>
              <Descriptions.Item label={t("application.fields.parentOccupation")} span={getColumnSpan(1)}>
                {demande.occupation || t("common.notSpecified")}
              </Descriptions.Item>
              <Descriptions.Item label={t("application.fields.educationLevel")} span={3}>
                {formatLevel(demande.educationLevel) || t("common.notSpecified")}
              </Descriptions.Item>
            </Descriptions>
          </Card>

          {/* Informations financières */}
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
            title={
              <Space>
                <SafetyOutlined />
                <span>{t("application.visaInformation")}</span>
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
                {formatVisa(demande.visaType) || t("common.notSpecified")}
              </Descriptions.Item>
              <Descriptions.Item label={t("application.fields.hasPreviouslyStudiedInUS")}>
                {formatBoolean(demande.hasPreviouslyStudiedInUS)}
              </Descriptions.Item>
            </Descriptions>
          </Card>

          {/* Essais */}
          <Card
            title={
              <Space>
                <EditOutlined />
                <span>{t("application.essays")}</span>
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
            title={
              <Space>
                <FileOutlined />
                <span>{t("demandeurPartageDetails.shared_documents")}</span>
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
                        {doc.estTraduit && (
                          <Tag color="success" size="small">
                            <CheckCircleOutlined className="mr-1" />
                            {t("institutTraducteurDetails.translated", "Traduit")}
                          </Tag>
                        )}

                      <Button
                        icon={<EyeOutlined />}
                          className="ant-btn-primary text-white"
                        onClick={() => handleViewDocument(doc.id)}
                        size={isSmallScreen ? "small" : "middle"}
                      >
                        {!isSmallScreen && t("demandeurPartageDetails.view_document")}
                        </Button>
                      </>
                    }
                  >
                    <Descriptions
                      bordered
                      column={isSmallScreen ? 1 : 3}
                      layout={descriptionsLayout}
                      size={isSmallScreen ? "small" : "default"}
                    >
                      <Descriptions.Item label={t("demandeurPartageDetails.title")} span={getColumnSpan(2)}>
                        {doc.intitule}
                      </Descriptions.Item>
                      <Descriptions.Item label={t("demandeurPartageDetails.type")}>
                        {doc.typeDocument}
                      </Descriptions.Item>
                      <Descriptions.Item label={t("demandeurPartageDetails.dna_code")} span={getColumnSpan(2)}>
                        {doc.codeAdn}
                      </Descriptions.Item>
                      <Descriptions.Item label={t("demandeurPartageDetails.year_obtained")}>
                        {doc.anneeObtention}
                      </Descriptions.Item>
                    </Descriptions>

                    <Card
                      title={
                        <Space>
                          <BankOutlined />
                          <span>{t("demandeurPartageDetails.institute_information")}</span>
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
                        <Descriptions.Item label={t("demandeurPartageDetails.name")} span={3}>
                          {doc.institut.name}
                        </Descriptions.Item>
                        <Descriptions.Item label={t("demandeurPartageDetails.type")} span={getColumnSpan(2)}>
                          {doc.institut.type}
                        </Descriptions.Item>
                        <Descriptions.Item label={t("demandeurPartageDetails.country")}>
                          {doc.institut.paysResidence}
                        </Descriptions.Item>
                        <Descriptions.Item label={t("demandeurPartageDetails.email")} span={getColumnSpan(2)}>
                          {doc.institut.email}
                        </Descriptions.Item>
                        <Descriptions.Item label={t("demandeurPartageDetails.phone")}>
                          {doc.institut.phone}
                        </Descriptions.Item>
                        <Descriptions.Item label={t("demandeurPartageDetails.address")} span={3}>
                          {doc.institut.adresse}
                        </Descriptions.Item>
                      </Descriptions>
                    </Card>
                  </Card>
                ))}
              </Space>
            ) : (
              <Text type="secondary">{t("demandeurPartageDetails.no_shared_documents")}</Text>
            )}
          </Card>
        </Space>
      </div>

      <Modal
        title={t("demandeurPartageDetails.pdf_document")}
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
            <Spin fullscreen tip={t("demandeurPartageDetails.loading_document")} />
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
              title={t("demandeurPartageDetails.pdf_viewer")}
            />
          </object>
        ) : (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <Text type="warning">{t("demandeurPartageDetails.no_document_to_display")}</Text>
          </div>
        )}
      </Modal>
    </div>
  )

  async function handleViewDocument(docId) {
    try {
      setPdfError(null)
      setPdfLoading(true)
      setPdfVisible(true)
      const base64Data = await getFileDocumentPartager(docId)
      setPdfData(base64Data)
    } catch (error) {
      setPdfError(error.message)
      message.error(t("demandeurPartageDetails.error_loading_document"))
    } finally {
      setPdfLoading(false)
    }
  }
}

export default DemandeurPartageDetails
