
// "use client"
// import { useState, useEffect, useCallback } from "react"
// import { useParams } from "react-router-dom"
// import { useTranslation } from "react-i18next"
// import { Card, Spin, Typography, Space, Tag, Descriptions, Button, message, Modal } from "antd"
// import DemandeurBreadcrumb from "../../../components/DemandeurBreadcrumb"
// import { getDemandePartageDetail, getFileDocumentPartager } from "../../../services/partageService"
// import { CopyableFieldSimple } from "@/utils/CopyableField"
// import {
//   UserOutlined,
//   BankOutlined,
//   FileOutlined,
//   CalendarOutlined,
//   EyeOutlined,
//   GlobalOutlined,
//   BookOutlined,
//   TrophyOutlined,
//   TeamOutlined,
//   DollarOutlined,
//   SafetyOutlined,
//   EditOutlined
// } from "@ant-design/icons"

// const { Text } = Typography

// const AdminPartageDetails = () => {
//   const { id } = useParams()
//   const [loading, setLoading] = useState(true)
//   const [demande, setDemande] = useState(null)
//   const [error, setError] = useState(null)
//   const [pdfVisible, setPdfVisible] = useState(false)
//   const [pdfLoading, setPdfLoading] = useState(false)
//   const [pdfData, setPdfData] = useState(null)
//   const [pdfError, setPdfError] = useState(null)
//   const [windowWidth, setWindowWidth] = useState(window.innerWidth)
//   const { t } = useTranslation()

//   // Gestion du redimensionnement de la fenêtre
//   const handleResize = useCallback(() => {
//     setWindowWidth(window.innerWidth)
//   }, [])

//   useEffect(() => {
//     window.addEventListener("resize", handleResize)
//     return () => window.removeEventListener("resize", handleResize)
//   }, [handleResize])

//   // Récupération des données
//   useEffect(() => {
//     const fetchDemande = async () => {
//       try {
//         const data = await getDemandePartageDetail(id)
//         setDemande(data)
//       } catch (err) {
//         setError(err.message)
//         message.error(t("demandeurPartageDetails.error_fetching_details"))
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchDemande()
//   }, [id, t])

//   // Layout responsive
//   const isSmallScreen = windowWidth < 768
//   const descriptionsLayout = isSmallScreen ? "vertical" : "horizontal"
//   const getColumnSpan = (defaultSpan) => (isSmallScreen ? 3 : defaultSpan)

//   // Fonctions de formatage
//   const formatBoolean = (value) => {
//     if (value === true || value === "true") return t("application.options.yesNo.yes")
//     if (value === false || value === "false") return t("application.options.yesNo.no")
//     return value
//   }

//   const formatArray = (array) => {
//     if (!array || !Array.isArray(array) || array.length === 0) return t("common.notSpecified")
//     return array.join(", ")
//   }

//   const formatPeriod = (periode) => {
//     const periodMap = {
//       "Printemps": t("demandePartage.periode_1"),
//       "Été": t("demandePartage.periode_2"),
//       "Automne": t("demandePartage.periode_3"),
//       "Hiver": t("demandePartage.periode_4"),
//       "Autre": t("demandePartage.periode_5")
//     }
//     return periodMap[periode] || periode
//   }

//   // Affichage du PDF
//   const handleViewDocument = async (docId) => {
//     try {
//       setPdfError(null)
//       setPdfLoading(true)
//       setPdfVisible(true)
//       const base64Data = await getFileDocumentPartager(docId)
//       setPdfData(base64Data)
//     } catch (error) {
//       setPdfError(error.message)
//       message.error(t("demandeurPartageDetails.error_loading_document"))
//     } finally {
//       setPdfLoading(false)
//     }
//   }

//   // Affichage du chargement ou de l'erreur
//   if (error) {
//     return (
//       <div style={{ textAlign: "center", marginTop: "50px" }}>
//         <Text type="danger">{error}</Text>
//       </div>
//     )
//   }

//   // Rendu principal
//   return (
//     <div style={{ background: "#f0f2f5", minHeight: "100vh" }}>
//       <DemandeurBreadcrumb title={t("demandeurPartageDetails.request_details")} SubTitle={demande?.code} />
//       <div style={{ maxWidth: "1200px", margin: "0 auto", padding: isSmallScreen ? "12px" : "24px" }}>
//         {loading ? (
//           <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
//             <Spin size="large" tip={t("common.loading")} />
//           </div>
//         ) : (
//           <Space direction="vertical" size="large" style={{ width: "100%" }}>
//             {/* Information générale de la demande */}
//             <Card>
//               <Descriptions
//                 title={t("institutPartageDetails.request_information")}
//                 bordered
//                 column={isSmallScreen ? 1 : 3}
//                 layout={descriptionsLayout}
//                 size={isSmallScreen ? "small" : "default"}
//               >
//                 <Descriptions.Item label={t("institutPartageDetails.code")} span={3}>
//                   <Tag color="blue">
//                     <CopyableFieldSimple value={demande.code} />
//                   </Tag>
//                 </Descriptions.Item>
//                 {/* <Descriptions.Item label={t("demandePartage.year")} span={getColumnSpan(1)}>
//                   <CalendarOutlined /> {demande.year}
//                 </Descriptions.Item>
//                 <Descriptions.Item label={t("demandePartage.periode")} span={getColumnSpan(2)}>
//                   {formatPeriod(demande.periode)}
//                 </Descriptions.Item> */}
//                 <Descriptions.Item label={t("institutPartageDetails.request_date")} span={3}>
//                   {demande.dateDemande ? new Date(demande.dateDemande).toLocaleDateString() : t("common.notSpecified")}
//                 </Descriptions.Item>
//                 <Descriptions.Item label={t("application.fields.preferredStartPeriod")} span={3}>
//                   {formatPeriod(demande.periode) + " " + demande.year || t("common.notSpecified")}
//                 </Descriptions.Item>
//                 <Descriptions.Item label={t("application.fields.applicationRound")} span={3}>
//                   {demande.applicationRound || t("common.notSpecified")}
//                 </Descriptions.Item>
//                 <Descriptions.Item label={t("application.fields.howDidYouHearAboutUs")} span={3}>
//                   {demande.howDidYouHearAboutUs || t("common.notSpecified")}
//                 </Descriptions.Item>
//               </Descriptions>
//             </Card>

//             {/* Information du demandeur - Informations de base */}
//             <Card
//               title={
//                 <Space>
//                   <UserOutlined />
//                   <span>{t("institutPartageDetails.requester_information")}</span>
//                 </Space>
//               }
//             >
//               <Descriptions
//                 bordered
//                 column={isSmallScreen ? 1 : 3}
//                 layout={descriptionsLayout}
//                 size={isSmallScreen ? "small" : "default"}
//               >
//                 <Descriptions.Item label={t("institutPartageDetails.name")} span={getColumnSpan(2)}>
//                   {demande.demandeur?.name || t("common.notSpecified")}
//                 </Descriptions.Item>
//                 <Descriptions.Item label={t("institutPartageDetails.gender")}>
//                   {demande.demandeur?.sexe || t("common.notSpecified")}
//                 </Descriptions.Item>
//                 <Descriptions.Item label={t("institutPartageDetails.email")} span={getColumnSpan(2)}>
//                   {demande.demandeur?.email || t("common.notSpecified")}
//                 </Descriptions.Item>
//                 <Descriptions.Item label={t("institutPartageDetails.phone")}>
//                   {demande.demandeur?.phone || t("common.notSpecified")}
//                 </Descriptions.Item>
//                 <Descriptions.Item label={t("institutPartageDetails.profession")} span={getColumnSpan(2)}>
//                   {demande.demandeur?.profession || t("common.notSpecified")}
//                 </Descriptions.Item>
//                 <Descriptions.Item label={t("institutPartageDetails.code")}>
//                   {demande.demandeur?.codeUser || t("common.notSpecified")}
//                 </Descriptions.Item>
//                 <Descriptions.Item label={t("institutPartageDetails.birth_date")}>
//                   {demande.demandeur?.dateNaissance ? new Date(demande.demandeur.dateNaissance).toLocaleDateString() : t("common.notSpecified")}
//                 </Descriptions.Item>
//                 <Descriptions.Item label={t("institutPartageDetails.birth_place")}>
//                   {demande.demandeur?.lieuNaissance || t("common.notSpecified")}
//                 </Descriptions.Item>
//                 <Descriptions.Item label={t("institutPartageDetails.country_of_residence")}>
//                   {demande.demandeur?.paysResidence || t("common.notSpecified")}
//                 </Descriptions.Item>
//               </Descriptions>
//             </Card>

//             <Card
//               title={
//                 <Space>
//                   <BankOutlined />
//                   <span>{t("demandeurPartageDetails.institute_information")}</span>
//                 </Space>
//               }
//             >
//               <Descriptions bordered>
//                 <Descriptions.Item label={t("demandeurPartageDetails.name")} span={3}>
//                   {demande.institut.name}
//                 </Descriptions.Item>
//                 <Descriptions.Item label={t("demandeurPartageDetails.type")} span={2}>
//                   {demande.institut.type}
//                 </Descriptions.Item>
//                 <Descriptions.Item label={t("demandeurPartageDetails.country")}>
//                   {demande.institut.paysResidence}
//                 </Descriptions.Item>
//                 <Descriptions.Item label={t("demandeurPartageDetails.email")} span={2}>
//                   {demande.institut.email}
//                 </Descriptions.Item>
//                 <Descriptions.Item label={t("demandeurPartageDetails.phone")}>{demande.institut.phone}</Descriptions.Item>
//                 <Descriptions.Item label={t("demandeurPartageDetails.address")} span={3}>
//                   {demande.institut.adresse}
//                 </Descriptions.Item>
//               </Descriptions>
//             </Card>

//             {/* Informations personnelles de l'application */}
//             <Card
//               title={
//                 <Space>
//                   <UserOutlined />
//                   <span>{t("application.personalInformation")}</span>
//                 </Space>
//               }
//             >
//               <Descriptions
//                 bordered
//                 column={isSmallScreen ? 1 : 3}
//                 layout={descriptionsLayout}
//                 size={isSmallScreen ? "small" : "default"}
//               >
//                 <Descriptions.Item label={t("application.fields.dateOfBirth")} span={getColumnSpan(1)}>
//                   {demande.dob ? new Date(demande.dob).toLocaleDateString() : t("common.notSpecified")}
//                 </Descriptions.Item>
//                 <Descriptions.Item label={t("application.fields.countryOfCitizenship")} span={getColumnSpan(2)}>
//                   {demande.citizenship || t("common.notSpecified")}
//                 </Descriptions.Item>
//                 <Descriptions.Item label={t("application.fields.passportNumber")} span={3}>
//                   {demande.passport || t("common.notSpecified")}
//                 </Descriptions.Item>
//               </Descriptions>
//             </Card>

//             {/* Maîtrise de l'anglais */}
//             <Card
//               title={
//                 <Space>
//                   <GlobalOutlined />
//                   <span>{t("application.englishProficiency")}</span>
//                 </Space>
//               }
//             >
//               <Descriptions
//                 bordered
//                 column={isSmallScreen ? 1 : 3}
//                 layout={descriptionsLayout}
//                 size={isSmallScreen ? "small" : "default"}
//               >
//                 <Descriptions.Item label={t("application.fields.isEnglishFirstLanguage")} span={3}>
//                   {formatBoolean(demande.isEnglishFirstLanguage)}
//                 </Descriptions.Item>
//                 <Descriptions.Item label={t("application.fields.englishProficiencyTests")} span={getColumnSpan(2)}>
//                   {formatArray(demande.englishProficiencyTests)}
//                 </Descriptions.Item>
//                 <Descriptions.Item label={t("application.fields.testScores")} span={getColumnSpan(1)}>
//                   {demande.testScores || t("common.notSpecified")}
//                 </Descriptions.Item>
//               </Descriptions>
//             </Card>

//             {/* Parcours académique */}
//             <Card
//               title={
//                 <Space>
//                   <BookOutlined />
//                   <span>{t("application.academicBackground")}</span>
//                 </Space>
//               }
//             >
//               <Descriptions
//                 bordered
//                 column={isSmallScreen ? 1 : 3}
//                 layout={descriptionsLayout}
//                 size={isSmallScreen ? "small" : "default"}
//               >
//                 <Descriptions.Item label={t("application.fields.secondarySchoolName")} span={getColumnSpan(2)}>
//                   {demande.secondarySchoolName || t("common.notSpecified")}
//                 </Descriptions.Item>
//                 <Descriptions.Item label={t("application.fields.countryOfSchool")} span={getColumnSpan(1)}>
//                   {demande.countryOfSchool || t("common.notSpecified")}
//                 </Descriptions.Item>
//                 <Descriptions.Item label={t("application.fields.graduationDate")} span={getColumnSpan(1)}>
//                   {demande.graduationDate ? new Date(demande.graduationDate).toLocaleDateString() : t("common.notSpecified")}
//                 </Descriptions.Item>
//                 <Descriptions.Item label={t("application.fields.gradingScale")} span={getColumnSpan(1)}>
//                   {demande.gradingScale || t("common.notSpecified")}
//                 </Descriptions.Item>
//                 <Descriptions.Item label={t("application.fields.gpaOrAverage")} span={getColumnSpan(1)}>
//                   {demande.gpa || t("common.notSpecified")}
//                 </Descriptions.Item>
//                 <Descriptions.Item label={t("application.fields.examsTaken")} span={3}>
//                   {formatArray(demande.examsTaken)}
//                 </Descriptions.Item>
//               </Descriptions>
//             </Card>

//             {/* Programme d'études */}
//             <Card
//               title={
//                 <Space>
//                   <BookOutlined />
//                   <span>{t("application.intendedProgramOfStudy")}</span>
//                 </Space>
//               }
//             >
//               <Descriptions
//                 bordered
//                 column={isSmallScreen ? 1 : 2}
//                 layout={descriptionsLayout}
//                 size={isSmallScreen ? "small" : "default"}
//               >
//                 <Descriptions.Item label={t("application.fields.intendedMajor")} span={2}>
//                   {demande.intendedMajor || t("common.notSpecified")}
//                 </Descriptions.Item>
//               </Descriptions>
//             </Card>

//             {/* Activités et réalisations */}
//             <Card
//               title={
//                 <Space>
//                   <TrophyOutlined />
//                   <span>{t("application.activitiesAndAchievements")}</span>
//                 </Space>
//               }
//             >
//               <Descriptions
//                 bordered
//                 column={1}
//                 layout="vertical"
//                 size={isSmallScreen ? "small" : "default"}
//               >
//                 <Descriptions.Item label={t("application.fields.extracurricularActivities")}>
//                   <div style={{ whiteSpace: "pre-wrap", maxHeight: "200px", overflowY: "auto" }}>
//                     {demande.extracurricularActivities || t("common.notSpecified")}
//                   </div>
//                 </Descriptions.Item>
//                 <Descriptions.Item label={t("application.fields.honorsOrAwards")}>
//                   <div style={{ whiteSpace: "pre-wrap", maxHeight: "200px", overflowY: "auto" }}>
//                     {demande.honorsOrAwards || t("common.notSpecified")}
//                   </div>
//                 </Descriptions.Item>
//               </Descriptions>
//             </Card>

//             {/* Informations familiales */}
//             <Card
//               title={
//                 <Space>
//                   <TeamOutlined />
//                   <span>{t("application.familyInformation")}</span>
//                 </Space>
//               }
//             >
//               <Descriptions
//                 bordered
//                 column={isSmallScreen ? 1 : 3}
//                 layout={descriptionsLayout}
//                 size={isSmallScreen ? "small" : "default"}
//               >
//                 <Descriptions.Item label={t("application.fields.parentGuardianName")} span={getColumnSpan(2)}>
//                   {demande.parentGuardianName || t("common.notSpecified")}
//                 </Descriptions.Item>
//                 <Descriptions.Item label={t("application.fields.parentOccupation")} span={getColumnSpan(1)}>
//                   {demande.occupation || t("common.notSpecified")}
//                 </Descriptions.Item>
//                 <Descriptions.Item label={t("application.fields.educationLevel")} span={3}>
//                   {demande.educationLevel || t("common.notSpecified")}
//                 </Descriptions.Item>
//               </Descriptions>
//             </Card>

//             {/* Informations financières */}
//             <Card
//               title={
//                 <Space>
//                   <DollarOutlined />
//                   <span>{t("application.financialInformation")}</span>
//                 </Space>
//               }
//             >
//               <Descriptions
//                 bordered
//                 column={isSmallScreen ? 1 : 2}
//                 layout={descriptionsLayout}
//                 size={isSmallScreen ? "small" : "default"}
//               >
//                 <Descriptions.Item label={t("application.fields.willApplyForFinancialAid")}>
//                   {formatBoolean(demande.willApplyForFinancialAid)}
//                 </Descriptions.Item>
//                 <Descriptions.Item label={t("application.fields.hasExternalSponsorship")}>
//                   {formatBoolean(demande.hasExternalSponsorship)}
//                 </Descriptions.Item>
//               </Descriptions>
//             </Card>

//             {/* Informations de visa */}
//             <Card
//               title={
//                 <Space>
//                   <SafetyOutlined />
//                   <span>{t("application.visaInformation")}</span>
//                 </Space>
//               }
//             >
//               <Descriptions
//                 bordered
//                 column={isSmallScreen ? 1 : 2}
//                 layout={descriptionsLayout}
//                 size={isSmallScreen ? "small" : "default"}
//               >
//                 <Descriptions.Item label={t("application.fields.visaType")}>
//                   {demande.visaType || t("common.notSpecified")}
//                 </Descriptions.Item>
//                 <Descriptions.Item label={t("application.fields.hasPreviouslyStudiedInUS")}>
//                   {formatBoolean(demande.hasPreviouslyStudiedInUS)}
//                 </Descriptions.Item>
//               </Descriptions>
//             </Card>

//             {/* Essais */}
//             <Card
//               title={
//                 <Space>
//                   <EditOutlined />
//                   <span>{t("application.essays")}</span>
//                 </Space>
//               }
//             >
//               <Descriptions
//                 bordered
//                 column={1}
//                 layout="vertical"
//                 size={isSmallScreen ? "small" : "default"}
//               >
//                 <Descriptions.Item label={t("application.fields.personalStatement")}>
//                   <div style={{
//                     whiteSpace: "pre-wrap",
//                     maxHeight: "300px",
//                     overflowY: "auto",
//                     padding: "12px",
//                     backgroundColor: "#f9f9f9",
//                     borderRadius: "6px",
//                     border: "1px solid #e0e0e0"
//                   }}>
//                     {demande.personalStatement || t("common.notSpecified")}
//                   </div>
//                 </Descriptions.Item>
//                 <Descriptions.Item label={t("application.fields.optionalEssay")}>
//                   <div style={{
//                     whiteSpace: "pre-wrap",
//                     maxHeight: "300px",
//                     overflowY: "auto",
//                     padding: "12px",
//                     backgroundColor: "#f9f9f9",
//                     borderRadius: "6px",
//                     border: "1px solid #e0e0e0"
//                   }}>
//                     {demande.optionalEssay || t("common.notSpecified")}
//                   </div>
//                 </Descriptions.Item>
//               </Descriptions>
//             </Card>

//             {/* Documents partagés */}
//             <Card
//               id="documents"
//               title={
//                 <Space>
//                   <FileOutlined />
//                   <span>{t("demandeurPartageDetails.shared_documents")}</span>
//                 </Space>
//               }
//             >
//               {demande.documentPartages && demande.documentPartages.length > 0 ? (
//                 <Space direction="vertical" style={{ width: "100%" }}>
//                   {demande.documentPartages.map((doc) => (
//                     <Card
//                       key={doc.id}
//                       type="inner"
//                       style={{ marginBottom: "10px" }}
//                       extra={
//                         <Button
//                           icon={<EyeOutlined />}
//                           className="bg-blueLogo text-white"
//                           onClick={() => handleViewDocument(doc.id)}
//                         >
//                           {t("demandeurPartageDetails.view_document")}
//                         </Button>
//                       }
//                     >
//                       <Descriptions bordered>
//                         <Descriptions.Item label={t("demandeurPartageDetails.title")} span={2}>
//                           {doc.intitule}
//                         </Descriptions.Item>
//                         <Descriptions.Item label={t("demandeurPartageDetails.type")}>
//                           {doc.typeDocument}
//                         </Descriptions.Item>
//                         <Descriptions.Item label={t("demandeurPartageDetails.dna_code")} span={2}>
//                           {doc.codeAdn}
//                         </Descriptions.Item>
//                         <Descriptions.Item label={t("demandeurPartageDetails.year_obtained")}>
//                           {doc.anneeObtention}
//                         </Descriptions.Item>
//                       </Descriptions>
//                       <Card
//                         title={
//                           <Space>
//                             <BankOutlined />
//                             <span>{t("demandeurPartageDetails.institute_information")}</span>
//                           </Space>
//                         }
//                       >
//                         <Descriptions bordered>
//                           <Descriptions.Item label={t("demandeurPartageDetails.name")} span={3}>
//                             {doc.institut?.name || t("common.notSpecified")}
//                           </Descriptions.Item>
//                           <Descriptions.Item label={t("demandeurPartageDetails.type")} span={2}>
//                             {doc.institut?.type || t("common.notSpecified")}
//                           </Descriptions.Item>
//                           <Descriptions.Item label={t("demandeurPartageDetails.country")}>
//                             {doc.institut?.paysResidence || t("common.notSpecified")}
//                           </Descriptions.Item>
//                           <Descriptions.Item label={t("demandeurPartageDetails.email")} span={2}>
//                             {doc.institut?.email || t("common.notSpecified")}
//                           </Descriptions.Item>
//                           <Descriptions.Item label={t("demandeurPartageDetails.phone")}>
//                             {doc.institut?.phone || t("common.notSpecified")}
//                           </Descriptions.Item>
//                           <Descriptions.Item label={t("demandeurPartageDetails.address")} span={3}>
//                             {doc.institut?.adresse || t("common.notSpecified")}
//                           </Descriptions.Item>
//                         </Descriptions>
//                       </Card>
//                     </Card>
//                   ))}
//                 </Space>
//               ) : (
//                 <Text type="secondary">{t("demandeurPartageDetails.no_shared_documents")}</Text>
//               )}
//             </Card>
//           </Space>
//         )}
//       </div>

//       {/* Modal pour afficher le PDF */}
//       <Modal
//         title={t("demandeurPartageDetails.pdf_document")}
//         open={pdfVisible}
//         onCancel={() => {
//           setPdfVisible(false)
//           setPdfData(null)
//         }}
//         width={isSmallScreen ? "95%" : 1000}
//         footer={null}
//       >
//         {pdfLoading ? (
//           <div style={{ textAlign: "center", padding: "20px" }}>
//             {/* <Spin tip={t("demandeurPartageDetails.loading_document")} /> */}
//             <Spin />
//           </div>
//         ) : pdfError ? (
//           <div style={{ textAlign: "center", padding: "20px" }}>
//             <Text type="danger">{pdfError}</Text>
//           </div>
//         ) : pdfData ? (
//           <object
//             data={`data:application/pdf;base64,${pdfData}`}
//             type="application/pdf"
//             width="100%"
//             height={isSmallScreen ? "300px" : "500px"}
//             aria-label={t("demandeurPartageDetails.pdf_viewer")}
//           >
//             <iframe
//               src={`data:application/pdf;base64,${pdfData}`}
//               width="100%"
//               height={isSmallScreen ? "300px" : "500px"}
//               title={t("demandeurPartageDetails.pdf_viewer")}
//             />
//           </object>
//         ) : (
//           <div style={{ textAlign: "center", padding: "20px" }}>
//             <Text type="warning">{t("demandeurPartageDetails.no_document_to_display")}</Text>
//           </div>
//         )}
//       </Modal>
//     </div>
//   )
// }

// export default AdminPartageDetails

"use client"
import { useState, useEffect, useCallback } from "react"
import { useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Card, Spin, Typography, Space, Tag, Descriptions, Button, message, Modal } from "antd"
import DemandeurBreadcrumb from "../../../components/DemandeurBreadcrumb"
import { getDemandePartageDetail, getFileDocumentPartager } from "../../../services/partageService"
import { CopyableFieldSimple } from "@/utils/CopyableField"
import {
  UserOutlined,
  BankOutlined,
  FileOutlined,
  CalendarOutlined,
  EyeOutlined,
  GlobalOutlined,
  BookOutlined,
  TrophyOutlined,
  TeamOutlined,
  DollarOutlined,
  SafetyOutlined,
  EditOutlined,
} from "@ant-design/icons"

const { Text } = Typography

const AdminPartageDetails = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [demande, setDemande] = useState(null)
  const [error, setError] = useState(null)
  const [pdfVisible, setPdfVisible] = useState(false)
  const [pdfLoading, setPdfLoading] = useState(false)
  const [pdfData, setPdfData] = useState(null)
  const [pdfError, setPdfError] = useState(null)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const { t } = useTranslation()

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
    const fetchDemande = async () => {
      try {
        const data = await getDemandePartageDetail(id)
        setDemande(data)
      } catch (err) {
        setError(err.message)
        message.error(t("demandeurPartageDetails.error_fetching_details"))
      } finally {
        setLoading(false)
      }
    }
    fetchDemande()
  }, [id, t])

  // Layout responsive
  const isSmallScreen = windowWidth < 768
  const descriptionsLayout = isSmallScreen ? "vertical" : "horizontal"
  const getColumnSpan = (defaultSpan) => (isSmallScreen ? 3 : defaultSpan)

  // Fonctions de formatage
  const formatBoolean = (value) => {
    if (value === true || value === "true") return t("application.options.yesNo.yes")
    if (value === false || value === "false") return t("application.options.yesNo.no")
    return value
  }

  const formatArray = (array) => {
    if (!array || !Array.isArray(array) || array.length === 0) return t("common.notSpecified")
    return array.join(", ")
  }

  const formatPeriod = (periode) => {
    const periodMap = {
      Printemps: t("demandePartage.periode_1"),
      Été: t("demandePartage.periode_2"),
      Automne: t("demandePartage.periode_3"),
      Hiver: t("demandePartage.periode_4"),
      Autre: t("demandePartage.periode_5"),
    }
    return periodMap[periode] || periode
  }

  // Affichage du PDF
  const handleViewDocument = async (docId) => {
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

  // Calcul des statistiques
  const getStatistics = () => {
    if (!demande) return { totalSections: 0, documentsCount: 0, completedSections: 0, requestDate: null }

    const totalSections = 10 // Total sections in the form
    const documentsCount = demande.documentPartages?.length || 0
    const completedSections = [
      demande.code,
      demande.demandeur?.name,
      demande.dob,
      demande.citizenship,
      demande.secondarySchoolName,
      demande.intendedMajor,
      demande.personalStatement,
      demande.parentGuardianName,
      demande.willApplyForFinancialAid,
      demande.visaType,
    ].filter(Boolean).length

    return {
      totalSections,
      documentsCount,
      completedSections,
      requestDate: demande.dateDemande,
    }
  }

  const statistics = getStatistics()

  // Affichage du chargement ou de l'erreur
  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Text type="danger">{error}</Text>
      </div>
    )
  }

  // Rendu principal
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        minHeight: "100vh",
      }}
    >
      <DemandeurBreadcrumb title={t("demandeurPartageDetails.request_details")} SubTitle={demande?.code} />
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: isSmallScreen ? "12px" : "24px" }}>
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <Spin size="large" tip={t("common.loading")} />
          </div>
        ) : (
          <Space direction="vertical" size="large" style={{ width: "100%" }}>


            {/* Information générale de la demande */}
              <Card
                style={{
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  border: `2px solid #254c6b`,
                }}
              >
              <Descriptions
                  title={
                    <span style={{ color: "#254c6b", fontSize: "18px", fontWeight: "bold" }}>
                      {t("institutPartageDetails.request_information")}
                    </span>
                  }
                bordered
                column={isSmallScreen ? 1 : 3}
                layout={descriptionsLayout}
                size={isSmallScreen ? "small" : "default"}
              >
                <Descriptions.Item label={t("institutPartageDetails.code")} span={3}>
                    <Tag color="#254c6b" style={{ borderRadius: "6px", padding: "4px 12px" }}>
                    <CopyableFieldSimple value={demande.code} />
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label={t("demandePartage.year")} span={getColumnSpan(1)}>
                  <CalendarOutlined /> {demande.year}
                </Descriptions.Item>
                <Descriptions.Item label={t("demandePartage.periode")} span={getColumnSpan(2)}>
                  {formatPeriod(demande.periode)}
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
                    <UserOutlined style={{ color: "#254c6b" }} />
                    <span style={{ color: "#254c6b", fontSize: "18px", fontWeight: "bold" }}>
                      {t("institutPartageDetails.requester_information")}
                    </span>
                </Space>
              }
                style={{
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  border: `2px solid #3eb6e9`,
                }}
            >
              <Descriptions
                bordered
                column={isSmallScreen ? 1 : 3}
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
                    {demande.demandeur?.dateNaissance
                      ? new Date(demande.demandeur.dateNaissance).toLocaleDateString()
                      : t("common.notSpecified")}
                </Descriptions.Item>
                <Descriptions.Item label={t("institutPartageDetails.birth_place")}>
                    {demande.demandeur?.lieuNaissance || t("common.notSpecified")}
                </Descriptions.Item>
                <Descriptions.Item label={t("institutPartageDetails.country_of_residence")}>
                    {demande.demandeur?.paysResidence || t("common.notSpecified")}
                  </Descriptions.Item>
                </Descriptions>
              </Card>

              <Card
                title={
                  <Space>
                    <BankOutlined style={{ color: "#254c6b" }} />
                    <span style={{ color: "#254c6b", fontSize: "18px", fontWeight: "bold" }}>
                      {t("demandeurPartageDetails.institute_information")}
                    </span>
                  </Space>
                }
                style={{
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  border: `2px solid #e41021`,
                }}
              >
                <Descriptions bordered>
                  <Descriptions.Item label={t("demandeurPartageDetails.name")} span={3}>
                    {demande.institut.name}
                  </Descriptions.Item>
                  <Descriptions.Item label={t("demandeurPartageDetails.type")} span={2}>
                    {demande.institut.type}
                  </Descriptions.Item>
                  <Descriptions.Item label={t("demandeurPartageDetails.country")}>
                    {demande.institut.paysResidence}
                  </Descriptions.Item>
                  <Descriptions.Item label={t("demandeurPartageDetails.email")} span={2}>
                    {demande.institut.email}
                  </Descriptions.Item>
                  <Descriptions.Item label={t("demandeurPartageDetails.phone")}>
                    {demande.institut.phone}
                  </Descriptions.Item>
                  <Descriptions.Item label={t("demandeurPartageDetails.address")} span={3}>
                    {demande.institut.adresse}
                </Descriptions.Item>
              </Descriptions>
            </Card>

            {/* Informations personnelles de l'application */}
            <Card
              title={
                <Space>
                    <UserOutlined style={{ color: "#254c6b" }} />
                    <span style={{ color: "#254c6b", fontSize: "18px", fontWeight: "bold" }}>
                      {t("application.personalInformation")}
                    </span>
                </Space>
              }
                style={{
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  border: `2px solid #254c6b`,
                }}
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

            {/* Maîtrise de l'anglais */}
            <Card
              title={
                <Space>
                    <GlobalOutlined style={{ color: "#254c6b" }} />
                    <span style={{ color: "#254c6b", fontSize: "18px", fontWeight: "bold" }}>
                      {t("application.englishProficiency")}
                    </span>
                </Space>
              }
                style={{
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  border: `2px solid #3eb6e9`,
                }}
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
                  {formatArray(demande.englishProficiencyTests)}
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
                    <BookOutlined style={{ color: "#254c6b" }} />
                    <span style={{ color: "#254c6b", fontSize: "18px", fontWeight: "bold" }}>
                      {t("application.academicBackground")}
                    </span>
                </Space>
              }
                style={{
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  border: `2px solid #e41021`,
                }}
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
                    {demande.graduationDate
                      ? new Date(demande.graduationDate).toLocaleDateString()
                      : t("common.notSpecified")}
                </Descriptions.Item>
                <Descriptions.Item label={t("application.fields.gradingScale")} span={getColumnSpan(1)}>
                  {demande.gradingScale || t("common.notSpecified")}
                </Descriptions.Item>
                <Descriptions.Item label={t("application.fields.gpaOrAverage")} span={getColumnSpan(1)}>
                  {demande.gpa || t("common.notSpecified")}
                </Descriptions.Item>
                <Descriptions.Item label={t("application.fields.examsTaken")} span={3}>
                  {formatArray(demande.examsTaken)}
                </Descriptions.Item>
              </Descriptions>
            </Card>

            {/* Programme d'études */}
            <Card
              title={
                <Space>
                    <BookOutlined style={{ color: "#254c6b" }} />
                    <span style={{ color: "#254c6b", fontSize: "18px", fontWeight: "bold" }}>
                      {t("application.intendedProgramOfStudy")}
                    </span>
                </Space>
              }
                style={{
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  border: `2px solid #254c6b`,
                }}
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
                    <TrophyOutlined style={{ color: "#254c6b" }} />
                    <span style={{ color: "#254c6b", fontSize: "18px", fontWeight: "bold" }}>
                      {t("application.activitiesAndAchievements")}
                    </span>
                </Space>
              }
                style={{
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  border: `2px solid #3eb6e9`,
                }}
            >
                <Descriptions bordered column={1} layout="vertical" size={isSmallScreen ? "small" : "default"}>
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
                    <TeamOutlined style={{ color: "#254c6b" }} />
                    <span style={{ color: "#254c6b", fontSize: "18px", fontWeight: "bold" }}>
                      {t("application.familyInformation")}
                    </span>
                </Space>
              }
                style={{
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  border: `2px solid #e41021`,
                }}
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
                  {demande.educationLevel || t("common.notSpecified")}
                </Descriptions.Item>
              </Descriptions>
            </Card>

            {/* Informations financières */}
            <Card
              title={
                <Space>
                    <DollarOutlined style={{ color: "#254c6b" }} />
                    <span style={{ color: "#254c6b", fontSize: "18px", fontWeight: "bold" }}>
                      {t("application.financialInformation")}
                    </span>
                </Space>
              }
                style={{
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  border: `2px solid #254c6b`,
                }}
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
                    <SafetyOutlined style={{ color: "#254c6b" }} />
                    <span style={{ color: "#254c6b", fontSize: "18px", fontWeight: "bold" }}>
                      {t("application.visaInformation")}
                    </span>
                </Space>
              }
                style={{
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  border: `2px solid #3eb6e9`,
                }}
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
              title={
                <Space>
                    <EditOutlined style={{ color: "#254c6b" }} />
                    <span style={{ color: "#254c6b", fontSize: "18px", fontWeight: "bold" }}>
                      {t("application.essays")}
                    </span>
                </Space>
              }
                style={{
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  border: `2px solid #e41021`,
                }}
            >
                <Descriptions bordered column={1} layout="vertical" size={isSmallScreen ? "small" : "default"}>
                <Descriptions.Item label={t("application.fields.personalStatement")}>
                    <div
                      style={{
                        whiteSpace: "pre-wrap",
                        maxHeight: "300px",
                        overflowY: "auto",
                        padding: "12px",
                        backgroundColor: "#f9f9f9",
                        borderRadius: "6px",
                        border: "1px solid #254c6b",
                      }}
                    >
                    {demande.personalStatement || t("common.notSpecified")}
                  </div>
                </Descriptions.Item>
                <Descriptions.Item label={t("application.fields.optionalEssay")}>
                    <div
                      style={{
                        whiteSpace: "pre-wrap",
                        maxHeight: "300px",
                        overflowY: "auto",
                        padding: "12px",
                        backgroundColor: "#f9f9f9",
                        borderRadius: "6px",
                        border: "1px solid #254c6b",
                      }}
                    >
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
                  <FileOutlined style={{ color: "#254c6b" }} />
                  <span style={{ color: "#254c6b", fontSize: "18px", fontWeight: "bold" }}>
                    {t("demandeurPartageDetails.shared_documents")}
                  </span>
                </Space>
              }
                style={{
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  border: `2px solid #254c6b`,
                }}
            >
                {demande.documentPartages && demande.documentPartages.length > 0 ? (
                <Space direction="vertical" style={{ width: "100%" }}>
                  {demande.documentPartages.map((doc) => (
                    <Card
                      key={doc.id}
                      type="inner"
                      style={{
                        marginBottom: "10px",
                        borderRadius: "8px",
                        border: `1px solid #3eb6e9`,
                      }}
                      extra={
                        <Button
                          icon={<EyeOutlined />}
                          style={{
                            backgroundColor: "#254c6b",
                            borderColor: "#254c6b",
                            color: "white",
                            borderRadius: "6px",
                          }}
                          onClick={() => handleViewDocument(doc.id)}
                        >
                          {t("demandeurPartageDetails.view_document")}
                        </Button>
                      }
                    >
                      <Descriptions bordered>
                        <Descriptions.Item label={t("demandeurPartageDetails.title")} span={2}>
                          {doc.intitule}
                        </Descriptions.Item>
                        <Descriptions.Item label={t("demandeurPartageDetails.type")}>
                          {doc.typeDocument}
                        </Descriptions.Item>
                        <Descriptions.Item label={t("demandeurPartageDetails.dna_code")} span={2}>
                          {doc.codeAdn}
                        </Descriptions.Item>
                        <Descriptions.Item label={t("demandeurPartageDetails.year_obtained")}>
                          {doc.anneeObtention}
                        </Descriptions.Item>
                      </Descriptions>
                      <Card
                        title={
                          <Space>
                            <BankOutlined style={{ color: "#254c6b" }} />
                            <span style={{ color: "#254c6b", fontSize: "18px", fontWeight: "bold" }}>
                              {t("demandeurPartageDetails.institute_information")}
                            </span>
                          </Space>
                        }
                        style={{
                          borderRadius: "8px",
                          border: `1px solid #3eb6e9`,
                        }}
                      >
                        <Descriptions bordered>
                          <Descriptions.Item label={t("demandeurPartageDetails.name")} span={3}>
                            {doc.institut?.name || t("common.notSpecified")}
                          </Descriptions.Item>
                          <Descriptions.Item label={t("demandeurPartageDetails.type")} span={2}>
                            {doc.institut?.type || t("common.notSpecified")}
                          </Descriptions.Item>
                          <Descriptions.Item label={t("demandeurPartageDetails.country")}>
                            {doc.institut?.paysResidence || t("common.notSpecified")}
                          </Descriptions.Item>
                          <Descriptions.Item label={t("demandeurPartageDetails.email")} span={2}>
                            {doc.institut?.email || t("common.notSpecified")}
                          </Descriptions.Item>
                          <Descriptions.Item label={t("demandeurPartageDetails.phone")}>
                            {doc.institut?.phone || t("common.notSpecified")}
                          </Descriptions.Item>
                          <Descriptions.Item label={t("demandeurPartageDetails.address")} span={3}>
                            {doc.institut?.adresse || t("common.notSpecified")}
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
        )}
      </div>

      {/* Modal pour afficher le PDF */}
      <Modal
        title={t("demandeurPartageDetails.pdf_document")}
        open={pdfVisible}
        onCancel={() => {
          setPdfVisible(false)
          setPdfData(null)
        }}
        width={isSmallScreen ? "95%" : 1000}
        footer={null}
      >
        {pdfLoading ? (
          <div style={{ textAlign: "center", padding: "20px" }}>
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
                height={isSmallScreen ? "300px" : "500px"}
                aria-label={t("demandeurPartageDetails.pdf_viewer")}
              >
            <iframe
              src={`data:application/pdf;base64,${pdfData}`}
              width="100%"
                  height={isSmallScreen ? "300px" : "500px"}
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
}

export default AdminPartageDetails
