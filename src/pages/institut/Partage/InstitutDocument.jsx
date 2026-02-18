
// "use client"

// import { useState, useEffect } from "react"
// import { useAuthContext } from "../../../context/useAuthContext"
// import { useTranslation } from "react-i18next"
// import { getDemandePartageDetail, getDocumentsDemandePartage, getFileDocumentPartager } from "../../../services/partageService"
// import { message, Form, Input, Button, Card, Table, Spin, Tag, Space, Popover, Select, Modal } from "antd"
// import { SearchOutlined, InfoCircleOutlined, FilePdfOutlined, DownloadOutlined, EyeOutlined, CalendarOutlined, EditOutlined, SafetyOutlined, DollarOutlined, TeamOutlined, TrophyOutlined, BookOutlined, GlobalOutlined, UserOutlined } from "@ant-design/icons"
// import { useParams } from "react-router-dom"
// import InstitutBreadcrumb from "@/components/InstitutBreadcrumb"
// import { FileText, Calendar, Building } from "lucide-react"
// import { CopyableFieldSimple } from "@/utils/CopyableField"

// import { Descriptions } from "antd"

// const InstitutDocumentPartage = () => {
//     const { institut } = useAuthContext()
//     const { id } = useParams()

//     const [loading, setLoading] = useState(true)
//     const [documents, setDocuments] = useState([])
//     const [searchText, setSearchText] = useState("")
//     const [form] = Form.useForm()
//     const { t } = useTranslation()
//     const [filterPeriode, setFilterPeriode] = useState(null)
//     const [filterYear, setFilterYear] = useState(null)
//     const [filterStatut, setFilterStatut] = useState(null)
//     const [uniquePeriodes, setUniquePeriodes] = useState([])
//     const [uniqueYears, setUniqueYears] = useState([])
//     const [uniqueStatuts, setUniqueStatuts] = useState([])
//     const [demande, setDemande] = useState(null)

//     const [pdfVisible, setPdfVisible] = useState(false)
//     const [pdfLoading, setPdfLoading] = useState(false)
//     const [pdfData, setPdfData] = useState(null)
//     const [pdfError, setPdfError] = useState(null)


//     const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0)
//     const isSmallScreen = windowWidth < 768;
//     const descriptionsLayout = isSmallScreen ? "vertical" : "horizontal"
//     // Determine if we should use column layout based on screen size


//     // Determine if we should use column layout based on screen size
//     const isMobileScreen = windowWidth < 576;
//     // Adjust column spans for responsive layout
//     const getColumnSpan = (defaultSpan) => (isSmallScreen ? 3 : defaultSpan);


//     useEffect(() => {
//         const handleResize = () => setWindowWidth(window.innerWidth);
//         window.addEventListener("resize", handleResize);
//         return () => window.removeEventListener("resize", handleResize);
//     }, []);


//     useEffect(() => {
//         fetchDemande()
//     }, [id])

//     const fetchDemande = async () => {
//         try {
//             const data = await getDemandePartageDetail(id)
//             setDemande(data)
//         } catch (err) {
//             setError(err.message)
//             message.error(t("institutPartageDetails.error_fetching_details"))
//         } finally {
//             setLoading(false)
//         }
//     }

//     useEffect(() => {
//         fetchDocuments()
//     }, [institut.id])

//     useEffect(() => {
//         scrollTo(0, 0)
//     }, [])



//     useEffect(() => {
//         const handleResize = () => setWindowWidth(window.innerWidth)
//         window.addEventListener("resize", handleResize)
//         return () => window.removeEventListener("resize", handleResize)
//     }, [])

//     const fetchDocuments = async () => {
//         try {
//             const data = await getDocumentsDemandePartage(id)
//             //console.log(data)
//             setDocuments(data)
//             extractUniqueFilters(data)
//         } catch (err) {
//             message.error(t("institutPartage.error_fetching_documents"))
//         } finally {
//             setLoading(false)
//         }
//     }

//     const formatArray = (array) => {
//         if (!array || !Array.isArray(array) || array.length === 0) return t("common.notSpecified")
//         return array.join(", ")
//     }

//     const formatPeriod = (periode) => {
//         const periodMap = {
//             "Printemps": t("demandePartage.periode_1"),
//             "Été": t("demandePartage.periode_2"),
//             "Automne": t("demandePartage.periode_3"),
//             "Hiver": t("demandePartage.periode_4"),
//             "Autre": t("demandePartage.periode_5")
//         }
//         return periodMap[periode] || periode
//     }
//     const formatBoolean = (value) => {
//         if (value === true || value === "true") return t("application.options.yesNo.yes")
//         if (value === false || value === "false") return t("application.options.yesNo.no")
//         return value
//     }

//     const extractUniqueFilters = (data) => {
//         const periodes = [...new Set(data.map((item) => item.demande?.periode).filter(Boolean))].sort()
//         const years = [...new Set(data.map((item) => item.demande?.year).filter(Boolean))].sort((a, b) => b - a)
//         const statuts = [...new Set(data.map((item) => item.statut).filter(Boolean))].sort()

//         setUniquePeriodes(periodes)
//         setUniqueYears(years)
//         setUniqueStatuts(statuts)
//     }

//     const handlePeriodeFilter = (periode) => {
//         setFilterPeriode(periode)
//     }

//     const handleYearFilter = (year) => {
//         setFilterYear(year)
//     }

//     const handleStatutFilter = (statut) => {
//         setFilterStatut(statut)
//     }

//     const resetFilters = () => {
//         setFilterPeriode(null)
//         setFilterYear(null)
//         setFilterStatut(null)
//     }

//     const getFilteredData = () => {
//         return documents.filter((item) => {
//             const matchesSearch =
//                 item.codeAdn.toLowerCase().includes(searchText.toLowerCase()) ||
//                 item.intitule.toLowerCase().includes(searchText.toLowerCase()) ||
//                 item.institut?.name.toLowerCase().includes(searchText.toLowerCase())

//             const matchesPeriode = filterPeriode ? item.demande?.periode === filterPeriode : true
//             const matchesYear = filterYear ? item.demande?.year === filterYear : true
//             const matchesStatut = filterStatut ? item.statut === filterStatut : true

//             return matchesSearch && matchesPeriode && matchesYear && matchesStatut
//         })
//     }


//     const translatePeriode = (periode) => {
//         switch (periode) {
//             case "Printemps":
//                 return t("demandePartage.periode_1")
//             case "Été":
//                 return t("demandePartage.periode_2")
//             case "Automne":
//                 return t("demandePartage.periode_3")
//             case "Hiver":
//                 return t("demandePartage.periode_4")
//             case "Autre":
//                 return t("demandePartage.periode_5")
//             default:
//                 return periode
//         }
//     }

//     const getStatutColor = (statut) => {
//         switch (statut?.toLowerCase()) {
//             case "accepted":
//                 return "success"
//             case "pending":
//                 return "processing"
//             case "rejected":
//                 return "error"
//             default:
//                 return "default"
//         }
//     }

//     const translateStatut = (statut) => {
//         switch (statut?.toLowerCase()) {
//             case "accepted":
//                 return t("institutPartage.status.accepted", "Accepté")
//             case "pending":
//                 return t("institutPartage.status.pending", "En attente")
//             case "rejected":
//                 return t("institutPartage.status.rejected", "Rejeté")
//             default:
//                 return statut
//         }
//     }

//     if (loading) {
//         return (
//             <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
//                 <Spin size="large" tip={t("common.loading")} />
//             </div>
//         )
//     }


//     const getResponsiveColumns = () => {
//         const baseColumns = [
//             {
//                 title: t("institutPartageDetails.title"),
//                 dataIndex: "intitule",
//                 key: "intitule",
//                 render: (text, record) => (
//                     <div>
//                         <div style={{ fontWeight: "600", color: "#254c6b" }}>{text}</div>
//                         {/* <div style={{ fontSize: "12px", color: "#666" }}>
//                             <Tag color="blue" size="small">
//                                 {record.typeDocument}
//                             </Tag>
//                         </div> */}
//                     </div>
//                 ),
//                 sorter: (a, b) => a.intitule.localeCompare(b.intitule),
//             },


//             {
//                 title: t("institutPartageDetails.type"),
//                 dataIndex: "intitule",
//                 key: "intitule",
//                 render: (text, record) => (
//                     <div>
//                         {/* <div style={{ fontWeight: "600", color: "#254c6b" }}>{text}</div> */}
//                         <div style={{ fontSize: "12px", color: "#666" }}>
//                             <Tag color="blue" size="small">
//                                 {record.typeDocument}
//                             </Tag>
//                         </div>
//                     </div>
//                 ),
//                 sorter: (a, b) => a.intitule.localeCompare(b.intitule),
//             },

//             {
//                 title: t("institutPartageDetails.institute_information"),
//                 dataIndex: "institut",
//                 key: "institut",
//                 render: (institut) => (
//                     <div>
//                         <div style={{ fontWeight: "500" }}>{institut?.name}</div>
//                         <div style={{ fontSize: "12px", color: "#666" }}>
//                             <Building className="w-3 h-3 inline mr-1" />
//                             {institut?.paysResidence}
//                         </div>
//                     </div>
//                 ),
//                 sorter: (a, b) => a.institut?.name.localeCompare(b.institut?.name),
//                 responsive: ["md"],
//             },

//             {
//                 title: t("institutPartageDetails.year_obtained"),
//                 dataIndex: "anneeObtention",
//                 key: "anneeObtention",
//                 render: (_, record) => (
//                     <>
//                         <Tag color="blue">
//                             <Calendar className="w-3 h-3 inline mr-1" />
//                             {record.anneeObtention}
//                         </Tag>
//                     </>
//                 ),
//                 sorter: (a, b) => a.anneeObtention - b.anneeObtention,
//                 responsive: ["lg"],
//             },


//             {
//                 title: t("institutPartage.actions"),
//                 key: "actions",
//                 render: (_, record) => (
//                     <Space size="small" wrap>


//                         <Button
//                             className="ant-btn-primary"
//                             icon={<EyeOutlined />}
//                             onClick={() => handleViewDocument(record.id)}
//                             size={isSmallScreen ? "small" : "middle"}
//                         >
//                             {!isSmallScreen && t("institutPartageDetails.view_document")}
//                         </Button>

//                         {/* <Popover
//                             content={
//                                 <div style={{ maxWidth: "400px" }}>
//                                     <Space direction="vertical" size="middle">
//                                         <div>
//                                             <strong>{t("institutPartage.document_details", "Détails du document")}:</strong>
//                                             <p>
//                                                 <strong>{t("institutPartage.document_title", "Intitulé")}:</strong> {record.intitule}
//                                             </p>
//                                             <p>
//                                                 <strong>{t("institutPartage.document_type", "Type")}:</strong> {record.typeDocument}
//                                             </p>
//                                             <p>
//                                                 <strong>{t("institutPartage.dna_code", "Code ADN")}:</strong> {record.codeAdn}
//                                             </p>
//                                             <p>
//                                                 <strong>{t("institutPartage.year_obtained", "Année")}:</strong> {record.anneeObtention}
//                                             </p>

//                                         </div>

//                                         {record.institut && (
//                                             <div>
//                                                 <strong>{t("institutPartage.institut_info", "Informations Institut")}:</strong>
//                                                 <p>{record.institut.name}</p>
//                                                 <p>
//                                                     {record.institut.type} - {record.institut.paysResidence}
//                                                 </p>
//                                                 <p>
//                                                     {t("institutPartage.email", "Email")}: {record.institut.email}
//                                                 </p>
//                                                 <p>
//                                                     {t("institutPartage.phone", "Téléphone")}: {record.institut.phone}
//                                                 </p>
//                                             </div>
//                                         )}

//                                         {record.demande && (
//                                             <div>
//                                                 <strong>{t("institutPartage.request_info", "Informations Demande")}:</strong>
//                                                 <p>
//                                                     {t("institutPartage.code", "Code")}: {record.demande.code}
//                                                 </p>
//                                                 <p>
//                                                     {t("institutPartage.period", "Période")}: {translatePeriode(record.demande.periode)}{" "}
//                                                     {record.demande.year}
//                                                 </p>
//                                                 <p>
//                                                     {t("institutPartage.description", "Description")}: {record.demande.description}
//                                                 </p>
//                                             </div>
//                                         )}
//                                     </Space>
//                                 </div>
//                             }
//                             title={t("institutPartage.document_details", "Détails du document")}
//                             trigger="click"
//                             placement="left"
//                         >
//                             <Button icon={<InfoCircleOutlined />} size={windowWidth < 768 ? "small" : "middle"} />
//                         </Popover> */}
//                     </Space>
//                 ),
//             },
//         ]

//         return baseColumns
//     }

//     const columns = getResponsiveColumns()

//     const tableContainerStyle = {
//         overflowX: "auto",
//         width: "100%",
//         maxWidth: "100%",
//     }


//     return (
//         <div style={{ background: "#f0f2f5", minHeight: "100vh" }}>
//             <InstitutBreadcrumb title={t("institutMenu.documentTool")} SubTitle={institut?.name} />

//             <section className="py-6">
//                 <div className="container max-w-7xl mx-auto px-4">
//                     <div className="bg-white rounded-xl shadow-xl overflow-hidden">
//                         {demande && <>
//                             <Card>
//                                 <Descriptions
//                                     title={t("institutPartageDetails.request_information")}
//                                     bordered
//                                     column={isSmallScreen ? 1 : 3}
//                                     layout={descriptionsLayout}
//                                     size={isSmallScreen ? "small" : "default"}
//                                 >
//                                     <Descriptions.Item label={t("institutPartageDetails.code")} span={3}>
//                                         <Tag color="blue">
//                                             <CopyableFieldSimple value={demande?.code} />
//                                         </Tag>
//                                     </Descriptions.Item>

//                                     <Descriptions.Item label={t("demandePartage.year")} span={3}>
//                                         <CalendarOutlined /> {demande.year}
//                                     </Descriptions.Item>

//                                     <Descriptions.Item label={t("demandePartage.periode")} span={3}>
//                                         {demande.periode && <>
//                                             {demande.periode === "Printemps" && <span>  {t("demandePartage.periode_1")} </span>}
//                                             {demande.periode === "Été" && <span>  {t("demandePartage.periode_2")} </span>}
//                                             {demande.periode === "Automne" && <span>  {t("demandePartage.periode_3")} </span>}
//                                             {demande.periode === "Hiver" && <span>  {t("demandePartage.periode_4")} </span>}
//                                             {demande.periode === "Autre" && <span>  {t("demandePartage.periode_5")} </span>}
//                                         </>}
//                                     </Descriptions.Item>


//                                     <Descriptions.Item label={t("institutPartageDetails.request_date")} span={3}>
//                                         <CalendarOutlined /> {new Date(demande.dateDemande).toLocaleDateString()}
//                                     </Descriptions.Item>

//                                     <Descriptions.Item label={t("institutPartageDetails.description")} span={3}>
//                                         {demande.description}
//                                     </Descriptions.Item>
//                                 </Descriptions>
//                             </Card>
//                             {/* Information générale de la demande */}
//                             <Card>
//                                 <Descriptions
//                                     title={t("institutPartageDetails.request_information")}
//                                     bordered
//                                     column={isSmallScreen ? 1 : 3}
//                                     layout={descriptionsLayout}
//                                     size={isSmallScreen ? "small" : "default"}
//                                 >
//                                     <Descriptions.Item label={t("institutPartageDetails.code")} span={3}>
//                                         <Tag color="blue">
//                                             <CopyableFieldSimple value={demande.code} />
//                                         </Tag>
//                                     </Descriptions.Item>
//                                     <Descriptions.Item label={t("demandePartage.year")} span={getColumnSpan(1)}>
//                                         <CalendarOutlined /> {demande.year}
//                                     </Descriptions.Item>
//                                     <Descriptions.Item label={t("demandePartage.periode")} span={getColumnSpan(2)}>
//                                         {formatPeriod(demande.periode)}
//                                     </Descriptions.Item>
//                                     <Descriptions.Item label={t("institutPartageDetails.request_date")} span={3}>
//                                         <CalendarOutlined /> {new Date(demande.dateDemande).toLocaleDateString()}
//                                     </Descriptions.Item>
//                                     <Descriptions.Item label={t("application.fields.preferredStartPeriod")} span={3}>
//                                         {demande.preferredStartTerm || t("common.notSpecified")}
//                                     </Descriptions.Item>
//                                     <Descriptions.Item label={t("application.fields.applicationRound")} span={3}>
//                                         {demande.applicationRound || t("common.notSpecified")}
//                                     </Descriptions.Item>
//                                     <Descriptions.Item label={t("application.fields.howDidYouHearAboutUs")} span={3}>
//                                         {demande.howDidYouHearAboutUs || t("common.notSpecified")}
//                                     </Descriptions.Item>
//                                 </Descriptions>
//                             </Card>

//                             {/* Information du demandeur - Informations de base */}
//                             <Card
//                                 title={
//                                     <Space>
//                                         <UserOutlined />
//                                         <span>{t("institutPartageDetails.requester_information")}</span>
//                                     </Space>
//                                 }
//                             >
//                                 <Descriptions
//                                     bordered
//                                     column={isSmallScreen ? 1 : 3}
//                                     layout={descriptionsLayout}
//                                     size={isSmallScreen ? "small" : "default"}
//                                 >
//                                     <Descriptions.Item label={t("institutPartageDetails.name")} span={getColumnSpan(2)}>
//                                         {demande.demandeur.name}
//                                     </Descriptions.Item>
//                                     <Descriptions.Item label={t("institutPartageDetails.gender")}>
//                                         {demande.demandeur.sexe}
//                                     </Descriptions.Item>
//                                     <Descriptions.Item label={t("institutPartageDetails.email")} span={getColumnSpan(2)}>
//                                         {demande.demandeur.email}
//                                     </Descriptions.Item>
//                                     <Descriptions.Item label={t("institutPartageDetails.phone")}>
//                                         {demande.demandeur.phone}
//                                     </Descriptions.Item>
//                                     <Descriptions.Item label={t("institutPartageDetails.profession")} span={getColumnSpan(2)}>
//                                         {demande.demandeur.profession}
//                                     </Descriptions.Item>
//                                     <Descriptions.Item label={t("institutPartageDetails.code")}>
//                                         {demande.demandeur.codeUser}
//                                     </Descriptions.Item>
//                                     <Descriptions.Item label={t("institutPartageDetails.birth_date")}>
//                                         {new Date(demande.demandeur.dateNaissance).toLocaleDateString()}
//                                     </Descriptions.Item>
//                                     <Descriptions.Item label={t("institutPartageDetails.birth_place")}>
//                                         {demande.demandeur.lieuNaissance}
//                                     </Descriptions.Item>
//                                     <Descriptions.Item label={t("institutPartageDetails.country_of_residence")}>
//                                         {demande.demandeur.paysResidence}
//                                     </Descriptions.Item>
//                                 </Descriptions>
//                             </Card>

//                             {/* Informations personnelles de l'application */}
//                             <Card
//                                 title={
//                                     <Space>
//                                         <UserOutlined />
//                                         <span>{t("application.personalInformation")}</span>
//                                     </Space>
//                                 }
//                             >
//                                 <Descriptions
//                                     bordered
//                                     column={isSmallScreen ? 1 : 3}
//                                     layout={descriptionsLayout}
//                                     size={isSmallScreen ? "small" : "default"}
//                                 >
//                                     <Descriptions.Item label={t("application.fields.dateOfBirth")} span={getColumnSpan(1)}>
//                                         {demande.dob ? new Date(demande.dob).toLocaleDateString() : t("common.notSpecified")}
//                                     </Descriptions.Item>
//                                     <Descriptions.Item label={t("application.fields.countryOfCitizenship")} span={getColumnSpan(2)}>
//                                         {demande.citizenship || t("common.notSpecified")}
//                                     </Descriptions.Item>
//                                     <Descriptions.Item label={t("application.fields.passportNumber")} span={3}>
//                                         {demande.passport || t("common.notSpecified")}
//                                     </Descriptions.Item>
//                                 </Descriptions>
//                             </Card>

//                             {/* Maîtrise de l'anglais */}
//                             <Card
//                                 title={
//                                     <Space>
//                                         <GlobalOutlined />
//                                         <span>{t("application.englishProficiency")}</span>
//                                     </Space>
//                                 }
//                             >
//                                 <Descriptions
//                                     bordered
//                                     column={isSmallScreen ? 1 : 3}
//                                     layout={descriptionsLayout}
//                                     size={isSmallScreen ? "small" : "default"}
//                                 >
//                                     <Descriptions.Item label={t("application.fields.isEnglishFirstLanguage")} span={3}>
//                                         {formatBoolean(demande.isEnglishFirstLanguage)}
//                                     </Descriptions.Item>
//                                     <Descriptions.Item label={t("application.fields.englishProficiencyTests")} span={getColumnSpan(2)}>
//                                         {formatArray(demande.englishProficiencyTests)}
//                                     </Descriptions.Item>
//                                     <Descriptions.Item label={t("application.fields.testScores")} span={getColumnSpan(1)}>
//                                         {demande.testScores || t("common.notSpecified")}
//                                     </Descriptions.Item>
//                                 </Descriptions>
//                             </Card>

//                             {/* Parcours académique */}
//                             <Card
//                                 title={
//                                     <Space>
//                                         <BookOutlined />
//                                         <span>{t("application.academicBackground")}</span>
//                                     </Space>
//                                 }
//                             >
//                                 <Descriptions
//                                     bordered
//                                     column={isSmallScreen ? 1 : 3}
//                                     layout={descriptionsLayout}
//                                     size={isSmallScreen ? "small" : "default"}
//                                 >
//                                     <Descriptions.Item label={t("application.fields.secondarySchoolName")} span={getColumnSpan(2)}>
//                                         {demande.secondarySchoolName || t("common.notSpecified")}
//                                     </Descriptions.Item>
//                                     <Descriptions.Item label={t("application.fields.countryOfSchool")} span={getColumnSpan(1)}>
//                                         {demande.countryOfSchool || t("common.notSpecified")}
//                                     </Descriptions.Item>
//                                     <Descriptions.Item label={t("application.fields.graduationDate")} span={getColumnSpan(1)}>
//                                         {demande.graduationDate ? new Date(demande.graduationDate).toLocaleDateString() : t("common.notSpecified")}
//                                     </Descriptions.Item>
//                                     <Descriptions.Item label={t("application.fields.gradingScale")} span={getColumnSpan(1)}>
//                                         {demande.gradingScale || t("common.notSpecified")}
//                                     </Descriptions.Item>
//                                     <Descriptions.Item label={t("application.fields.gpaOrAverage")} span={getColumnSpan(1)}>
//                                         {demande.gpa || t("common.notSpecified")}
//                                     </Descriptions.Item>
//                                     <Descriptions.Item label={t("application.fields.examsTaken")} span={3}>
//                                         {formatArray(demande.examsTaken)}
//                                     </Descriptions.Item>
//                                 </Descriptions>
//                             </Card>

//                             {/* Programme d'études */}
//                             <Card
//                                 title={
//                                     <Space>
//                                         <BookOutlined />
//                                         <span>{t("application.intendedProgramOfStudy")}</span>
//                                     </Space>
//                                 }
//                             >
//                                 <Descriptions
//                                     bordered
//                                     column={isSmallScreen ? 1 : 2}
//                                     layout={descriptionsLayout}
//                                     size={isSmallScreen ? "small" : "default"}
//                                 >
//                                     <Descriptions.Item label={t("application.fields.intendedMajor")} span={2}>
//                                         {demande.intendedMajor || t("common.notSpecified")}
//                                     </Descriptions.Item>
//                                 </Descriptions>
//                             </Card>

//                             {/* Activités et réalisations */}
//                             <Card
//                                 title={
//                                     <Space>
//                                         <TrophyOutlined />
//                                         <span>{t("application.activitiesAndAchievements")}</span>
//                                     </Space>
//                                 }
//                             >
//                                 <Descriptions
//                                     bordered
//                                     column={1}
//                                     layout="vertical"
//                                     size={isSmallScreen ? "small" : "default"}
//                                 >
//                                     <Descriptions.Item label={t("application.fields.extracurricularActivities")}>
//                                         <div style={{ whiteSpace: "pre-wrap", maxHeight: "200px", overflowY: "auto" }}>
//                                             {demande.extracurricularActivities || t("common.notSpecified")}
//                                         </div>
//                                     </Descriptions.Item>
//                                     <Descriptions.Item label={t("application.fields.honorsOrAwards")}>
//                                         <div style={{ whiteSpace: "pre-wrap", maxHeight: "200px", overflowY: "auto" }}>
//                                             {demande.honorsOrAwards || t("common.notSpecified")}
//                                         </div>
//                                     </Descriptions.Item>
//                                 </Descriptions>
//                             </Card>

//                             {/* Informations familiales */}
//                             <Card
//                                 title={
//                                     <Space>
//                                         <TeamOutlined />
//                                         <span>{t("application.familyInformation")}</span>
//                                     </Space>
//                                 }
//                             >
//                                 <Descriptions
//                                     bordered
//                                     column={isSmallScreen ? 1 : 3}
//                                     layout={descriptionsLayout}
//                                     size={isSmallScreen ? "small" : "default"}
//                                 >
//                                     <Descriptions.Item label={t("application.fields.parentGuardianName")} span={getColumnSpan(2)}>
//                                         {demande.parentGuardianName || t("common.notSpecified")}
//                                     </Descriptions.Item>
//                                     <Descriptions.Item label={t("application.fields.occupation")} span={getColumnSpan(1)}>
//                                         {demande.occupation || t("common.notSpecified")}
//                                     </Descriptions.Item>
//                                     <Descriptions.Item label={t("application.fields.educationLevel")} span={3}>
//                                         {demande.educationLevel || t("common.notSpecified")}
//                                     </Descriptions.Item>
//                                 </Descriptions>
//                             </Card>

//                             {/* Informations financières */}
//                             <Card
//                                 title={
//                                     <Space>
//                                         <DollarOutlined />
//                                         <span>{t("application.financialInformation")}</span>
//                                     </Space>
//                                 }
//                             >
//                                 <Descriptions
//                                     bordered
//                                     column={isSmallScreen ? 1 : 2}
//                                     layout={descriptionsLayout}
//                                     size={isSmallScreen ? "small" : "default"}
//                                 >
//                                     <Descriptions.Item label={t("application.fields.willApplyForFinancialAid")}>
//                                         {formatBoolean(demande.willApplyForFinancialAid)}
//                                     </Descriptions.Item>
//                                     <Descriptions.Item label={t("application.fields.hasExternalSponsorship")}>
//                                         {formatBoolean(demande.hasExternalSponsorship)}
//                                     </Descriptions.Item>
//                                 </Descriptions>
//                             </Card>

//                             {/* Informations de visa */}
//                             <Card
//                                 title={
//                                     <Space>
//                                         <SafetyOutlined />
//                                         <span>{t("application.visaInformation")}</span>
//                                     </Space>
//                                 }
//                             >
//                                 <Descriptions
//                                     bordered
//                                     column={isSmallScreen ? 1 : 2}
//                                     layout={descriptionsLayout}
//                                     size={isSmallScreen ? "small" : "default"}
//                                 >
//                                     <Descriptions.Item label={t("application.fields.visaType")}>
//                                         {demande.visaType || t("common.notSpecified")}
//                                     </Descriptions.Item>
//                                     <Descriptions.Item label={t("application.fields.hasPreviouslyStudiedInUS")}>
//                                         {formatBoolean(demande.hasPreviouslyStudiedInUS)}
//                                     </Descriptions.Item>
//                                 </Descriptions>
//                             </Card>

//                             {/* Essais */}
//                             <Card
//                                 title={
//                                     <Space>
//                                         <EditOutlined />
//                                         <span>{t("application.essays")}</span>
//                                     </Space>
//                                 }
//                             >
//                                 <Descriptions
//                                     bordered
//                                     column={1}
//                                     layout="vertical"
//                                     size={isSmallScreen ? "small" : "default"}
//                                 >
//                                     <Descriptions.Item label={t("application.fields.personalStatement")}>
//                                         <div style={{
//                                             whiteSpace: "pre-wrap",
//                                             maxHeight: "300px",
//                                             overflowY: "auto",
//                                             padding: "12px",
//                                             backgroundColor: "#f9f9f9",
//                                             borderRadius: "6px",
//                                             border: "1px solid #e0e0e0"
//                                         }}>
//                                             {demande.personalStatement || t("common.notSpecified")}
//                                         </div>
//                                     </Descriptions.Item>
//                                     <Descriptions.Item label={t("application.fields.optionalEssay")}>
//                                         <div style={{
//                                             whiteSpace: "pre-wrap",
//                                             maxHeight: "300px",
//                                             overflowY: "auto",
//                                             padding: "12px",
//                                             backgroundColor: "#f9f9f9",
//                                             borderRadius: "6px",
//                                             border: "1px solid #e0e0e0"
//                                         }}>
//                                             {demande.optionalEssay || t("common.notSpecified")}
//                                         </div>
//                                     </Descriptions.Item>
//                                 </Descriptions>
//                             </Card>

//                         </>}

//                         <div className="p-6">
//                             <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "24px" }}>
//                                 <Card>
//                                     <div
//                                         style={{
//                                             marginBottom: 16,
//                                             display: "flex",
//                                             justifyContent: "space-between",
//                                             flexWrap: "wrap",
//                                             gap: "10px",
//                                         }}
//                                     >
//                                         <Input
//                                             placeholder={t(
//                                                 "institutPartage.search_documents",
//                                                 "Rechercher par code ADN, intitulé ou institut...",
//                                             )}
//                                             prefix={<SearchOutlined />}
//                                             value={searchText}
//                                             onChange={(e) => setSearchText(e.target.value)}
//                                             style={{ width: "100%", maxWidth: 350 }}
//                                         />
//                                         <Space wrap>
//                                             <Select
//                                                 placeholder={t("demandePartage.select_periode", "Période")}
//                                                 style={{ width: 120 }}
//                                                 allowClear
//                                                 onChange={handlePeriodeFilter}
//                                                 value={filterPeriode}
//                                             >
//                                                 {uniquePeriodes.map((periode) => (
//                                                     <Select.Option key={periode} value={periode}>
//                                                         {translatePeriode(periode)}
//                                                     </Select.Option>
//                                                 ))}
//                                             </Select>
//                                             <Select
//                                                 placeholder={t("demandePartage.select_year", "Année")}
//                                                 style={{ width: 120 }}
//                                                 allowClear
//                                                 onChange={handleYearFilter}
//                                                 value={filterYear}
//                                             >
//                                                 {uniqueYears.map((year) => (
//                                                     <Select.Option key={year} value={year}>
//                                                         {year}
//                                                     </Select.Option>
//                                                 ))}
//                                             </Select>
//                                             <Select
//                                                 placeholder={t("institutPartage.select_status", "Statut")}
//                                                 style={{ width: 120 }}
//                                                 allowClear
//                                                 onChange={handleStatutFilter}
//                                                 value={filterStatut}
//                                             >
//                                                 {uniqueStatuts.map((statut) => (
//                                                     <Select.Option key={statut} value={statut}>
//                                                         {translateStatut(statut)}
//                                                     </Select.Option>
//                                                 ))}
//                                             </Select>
//                                             <Button onClick={resetFilters} className="ant-btn-primary" type="default">
//                                                 {t("common.reset_filters", "Réinitialiser")}
//                                             </Button>
//                                         </Space>
//                                     </div>
//                                     <div style={tableContainerStyle}>
//                                         <Table
//                                             columns={columns}
//                                             dataSource={getFilteredData()}
//                                             rowKey="id"
//                                             loading={loading}
//                                             pagination={{
//                                                 defaultPageSize: 10,
//                                                 showSizeChanger: true,
//                                                 showTotal: (total) =>
//                                                     `${t("institutPartage.total", "Total")} ${total} ${t("institutPartage.documents", "document(s)")}`,
//                                             }}
//                                             scroll={{ x: "max-content" }}
//                                             className="responsive-table"
//                                         />
//                                     </div>
//                                 </Card>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             {/* PDF Viewer Modal */}
//             <Modal
//                 title={t("institutPartageDetails.pdf_document")}
//                 open={pdfVisible}
//                 onCancel={() => {
//                     setPdfVisible(false)
//                     setPdfData(null)
//                 }}
//                 width={windowWidth < 768 ? "95%" : 1000}
//                 footer={null}
//             >
//                 {pdfLoading ? (
//                     <div style={{ textAlign: "center", padding: "20px" }}>
//                         {/* <Spin tip={t("institutPartageDetails.loading_document")} /> */}
//                         <Spin />
//                     </div>
//                 ) : pdfError ? (
//                     <div style={{ textAlign: "center", padding: "20px" }}>
//                         <Text type="danger">{pdfError}</Text>
//                     </div>
//                 ) : pdfData ? (
//                     <object
//                         data={`data:application/pdf;base64,${pdfData}`}
//                         type="application/pdf"
//                         width="100%"
//                         height={windowWidth < 576 ? "300px" : "500px"}
//                     >
//                         <iframe
//                             src={`data:application/pdf;base64,${pdfData}`}
//                             width="100%"
//                             height={windowWidth < 576 ? "300px" : "500px"}
//                             title={t("institutPartageDetails.pdf_viewer")}
//                         />
//                     </object>
//                 ) : (
//                     <div style={{ textAlign: "center", padding: "20px" }}>
//                         <Text type="warning">{t("institutPartageDetails.no_document_to_display")}</Text>
//                     </div>
//                 )}
//             </Modal>
//         </div>
//     )

//     async function handleViewDocument(docId) {
//         try {
//             setPdfError(null)
//             setPdfLoading(true)
//             setPdfVisible(true)
//             const base64Data = await getFileDocumentPartager(docId)
//             //console.log(base64Data)
//             setPdfData(base64Data)
//         } catch (error) {
//             setPdfError(error.message)
//             message.error(t("institutPartageDetails.error_loading_document"))
//         } finally {
//             setPdfLoading(false)
//         }
//     }
// }

// export default InstitutDocumentPartage

"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { useAuthContext } from "../../../context/useAuthContext"
import { useTranslation } from "react-i18next"
import {
    getDemandePartageDetail,
    getDocumentsDemandePartage,
    getFileDocumentPartager,
    getFileDocumentPartagerTraduit,
} from "../../../services/partageService"
import { message, Form, Input, Button, Card, Table, Spin, Tag, Space, Select, Modal, Dropdown, Menu } from "antd"
import {
    SearchOutlined,
    InfoCircleOutlined,
    DownloadOutlined,
    EyeOutlined,
    CalendarOutlined,
    UserOutlined,
    MoreOutlined,
    FileTextOutlined,
    UploadOutlined,
    BankOutlined,
    CheckCircleOutlined,
} from "@ant-design/icons"
import { useParams } from "react-router-dom"
import InstitutBreadcrumb from "@/components/InstitutBreadcrumb"
import { Calendar, Building } from "lucide-react"
import { CopyableFieldSimple } from "@/utils/CopyableField"
import { Descriptions } from "antd"

const InstitutDocumentPartage = () => {
    const { institut } = useAuthContext()
    const { id } = useParams()

    const [loading, setLoading] = useState(true)
    const [documents, setDocuments] = useState([])
    const [searchText, setSearchText] = useState("")
    const [form] = Form.useForm()
    const { t } = useTranslation()
    const [filterPeriode, setFilterPeriode] = useState(null)
    const [filterYear, setFilterYear] = useState(null)
    const [filterStatut, setFilterStatut] = useState(null)
    const [uniquePeriodes, setUniquePeriodes] = useState([])
    const [uniqueYears, setUniqueYears] = useState([])
    const [uniqueStatuts, setUniqueStatuts] = useState([])
    const [demande, setDemande] = useState(null)

    const [pdfVisible, setPdfVisible] = useState(false)
    const [pdfLoading, setPdfLoading] = useState(false)
    const [pdfData, setPdfData] = useState(null)
    const [pdfError, setPdfError] = useState(null)

    const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0)
    const isSmallScreen = windowWidth < 768
    const descriptionsLayout = isSmallScreen ? "vertical" : "horizontal"
    const isMobileScreen = windowWidth < 576
    const getColumnSpan = (defaultSpan) => (isSmallScreen ? 3 : defaultSpan)

    const colors = {
        blueLogo: "#254c6b",
        blueClaire: "#3eb6e9",
        rougeLogo: "#e41021",
    }

    const statistics = useMemo(() => {
        const totalDocuments = documents.length
        const acceptedDocuments = documents.filter((doc) => doc.statut?.toLowerCase() === "accepted").length
        const pendingDocuments = documents.filter((doc) => doc.statut?.toLowerCase() === "pending").length
        const rejectedDocuments = documents.filter((doc) => doc.statut?.toLowerCase() === "rejected").length

        return {
            totalDocuments,
            acceptedDocuments,
            pendingDocuments,
            rejectedDocuments,
        }
    }, [documents])

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
            message.error(t("institutPartageDetails.error_fetching_details"))
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchDocuments()
    }, [institut.id])

    useEffect(() => {
        scrollTo(0, 0)
    }, [])

    const fetchDocuments = useCallback(async () => {
        try {
            const data = await getDocumentsDemandePartage(id)
            setDocuments(data)
            extractUniqueFilters(data)
        } catch (err) {
            message.error(t("institutPartage.error_fetching_documents"))
        } finally {
            setLoading(false)
        }
    }, [id, t])

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

    const formatBoolean = (value) => {
        if (value === true || value === "true") return t("application.options.yesNo.yes")
        if (value === false || value === "false") return t("application.options.yesNo.no")
        return value
    }

    const extractUniqueFilters = (data) => {
        const periodes = [...new Set(data.map((item) => item.demande?.periode).filter(Boolean))].sort()
        const years = [...new Set(data.map((item) => item.demande?.year).filter(Boolean))].sort((a, b) => b - a)
        const statuts = [...new Set(data.map((item) => item.statut).filter(Boolean))].sort()

        setUniquePeriodes(periodes)
        setUniqueYears(years)
        setUniqueStatuts(statuts)
    }

    const handlePeriodeFilter = (periode) => {
        setFilterPeriode(periode)
    }

    const handleYearFilter = (year) => {
        setFilterYear(year)
    }

    const handleStatutFilter = (statut) => {
        setFilterStatut(statut)
    }

    const resetFilters = () => {
        setFilterPeriode(null)
        setFilterYear(null)
        setFilterStatut(null)
    }

    const getFilteredData = useMemo(() => {
        return documents.filter((item) => {
            const matchesSearch =
                item.codeAdn.toLowerCase().includes(searchText.toLowerCase()) ||
                item.intitule.toLowerCase().includes(searchText.toLowerCase()) ||
                item.institut?.name.toLowerCase().includes(searchText.toLowerCase())

            const matchesPeriode = filterPeriode ? item.demande?.periode === filterPeriode : true
            const matchesYear = filterYear ? item.demande?.year === filterYear : true
            const matchesStatut = filterStatut ? item.statut === filterStatut : true

            return matchesSearch && matchesPeriode && matchesYear && matchesStatut
        })
    }, [documents, searchText, filterPeriode, filterYear, filterStatut])

    const translatePeriode = (periode) => {
        switch (periode) {
            case "Printemps":
                return t("demandePartage.periode_1")
            case "Été":
                return t("demandePartage.periode_2")
            case "Automne":
                return t("demandePartage.periode_3")
            case "Hiver":
                return t("demandePartage.periode_4")
            case "Autre":
                return t("demandePartage.periode_5")
            default:
                return periode
        }
    }

    const getStatutColor = (statut) => {
        switch (statut?.toLowerCase()) {
            case "accepted":
                return "success"
            case "pending":
                return "processing"
            case "rejected":
                return "error"
            default:
                return "default"
        }
    }

    const translateStatut = (statut) => {
        switch (statut?.toLowerCase()) {
            case "accepted":
                return t("institutPartage.status.accepted", "Accepté")
            case "pending":
                return t("institutPartage.status.pending", "En attente")
            case "rejected":
                return t("institutPartage.status.rejected", "Rejeté")
            default:
                return statut
        }
    }
    const handleDownloadFile = useCallback(
        async (docId) => {
            try {
                setPdfError(null)
                setPdfLoading(true)
                const base64Data = await getFileDocumentPartager(docId)
                const link = document.createElement("a")
                link.href = `data:application/pdf;base64,${base64Data}`
                link.download = `document_${docId}.pdf`
                link.click()
            } catch (error) {
                console.error("[v0] Error loading PDF:", error)
                setPdfError(error.message)
                message.error(t("institutTraducteurDetails.error_loading_document"))
            } finally {
                setPdfLoading(false)
            }
        },
        [t],
    )

    const handleDownloadFileTraduit = useCallback(
        async (docId) => {
            try {
                setPdfError(null)
                setPdfLoading(true)
                const base64Data = await getFileDocumentPartagerTraduit(docId)
                const link = document.createElement("a")
                link.href = `data:application/pdf;base64,${base64Data}`
                link.download = `document_traduit_${docId}.pdf`
                link.click()
            } catch (error) {
                console.error("[v0] Error loading PDF:", error)
                setPdfError(error.message)
                message.error(t("institutTraducteurDetails.error_loading_document"))
            } finally {
                setPdfLoading(false)
            }
        },
        [t],
    )

    async function handleViewDocument(docId) {
        setPdfLoading(true)
        try {
            setPdfError(null)
            setPdfVisible(true)
            const base64Data = await getFileDocumentPartager(docId)
            setPdfData(base64Data)
        } catch (error) {
            setPdfError(error.message)
            message.error(t("institutPartageDetails.error_loading_document"))
        } finally {
            setPdfLoading(false)
        }
    }

    const handleViewDocumentTraduit = useCallback(
        async (docId) => {
            setPdfLoading(true)
            try {
                setPdfError(null)
                setPdfVisible(true)
                const base64Data = await getFileDocumentPartagerTraduit(docId)
                setPdfData(base64Data)
            } catch (error) {
                console.error("[v0] Error loading PDF:", error)
                setPdfError(error.message)
                message.error(t("institutTraducteurDetails.error_loading_document"))
            } finally {
                setPdfLoading(false)
            }
        },
        [t],
    )



    const getActionMenu = (record) => (
        <Menu>
            {record.estTraduit && (
                <Menu.Item key="view-translated" icon={<EyeOutlined />} onClick={() => handleViewDocumentTraduit(record.id)}>
                    {t("institutTraducteurDetails.view_translated", "Voir traduit")}
                </Menu.Item>
            )}
            <Menu.Item key="view" icon={<EyeOutlined />} onClick={() => handleViewDocument(record.id)}>
                {t("institutPartageDetails.view_document")}
            </Menu.Item>
        </Menu>
    )

    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <Spin size="large" tip={t("common.loading")} />
            </div>
        )
    }

    const getResponsiveColumns = () => {
        const baseColumns = [
            {
                title: t("institutPartageDetails.title"),
                dataIndex: "intitule",
                key: "intitule",
                render: (text, record) => (
                    <div>
                        <div style={{ fontWeight: "600", color: colors.blueLogo }}>{text}</div>
                        {record.estTraduit && (
                            <Tag color="success" size="small">
                                <CheckCircleOutlined className="mr-1" />
                                {t("institutTraducteurDetails.translated", "Traduit")}
                            </Tag>
                        )}
                    </div>
                ),
                sorter: (a, b) => a.intitule.localeCompare(b.intitule),
            },
            {
                title: t("institutPartageDetails.type"),
                dataIndex: "typeDocument",
                key: "typeDocument",
                render: (text) => (
                    <Tag color={colors.blueClaire} size="small">
                        {text}
                    </Tag>
                ),
                sorter: (a, b) => a.typeDocument.localeCompare(b.typeDocument),
            },
            {
                title: t("institutPartageDetails.institute_information"),
                dataIndex: "institut",
                key: "institut",
                render: (institut) => (
                    <div>
                        <div style={{ fontWeight: "500" }}>{institut?.name}</div>
                        <div style={{ fontSize: "12px", color: "#666" }}>
                            <Building className="w-3 h-3 inline mr-1" />
                            {institut?.paysResidence}
                        </div>
                    </div>
                ),
                sorter: (a, b) => a.institut?.name.localeCompare(b.institut?.name),
                responsive: ["md"],
            },
            {
                title: t("institutPartageDetails.year_obtained"),
                dataIndex: "anneeObtention",
                key: "anneeObtention",
                render: (_, record) => (
                    <Tag style={{ backgroundColor: colors.blueClaire, color: "white", border: "none" }}>
                        <Calendar className="w-3 h-3 inline mr-1" />
                        {record.anneeObtention}
                    </Tag>
                ),
                sorter: (a, b) => a.anneeObtention - b.anneeObtention,
                responsive: ["lg"],
            },
            {
                title: t("institutPartage.actions"),
                key: "actions",
                render: (_, record) => (
                    <Dropdown overlay={getActionMenu(record)} trigger={["click"]} placement="bottomRight">
                        <Button
                            icon={<MoreOutlined />}
                            style={{
                                backgroundColor: colors.blueLogo,
                                borderColor: colors.blueLogo,
                                color: "white",
                            }}
                            size={isSmallScreen ? "small" : "middle"}
                        >
                            {!isSmallScreen && t("institutPartage.actions")}
                        </Button>
                    </Dropdown>
                ),
            },
        ]

        return baseColumns
    }

    const columns = getResponsiveColumns()

    const tableContainerStyle = {
        overflowX: "auto",
        width: "100%",
        maxWidth: "100%",
    }


    return (
        <div
            style={{
                background: `linear-gradient(135deg, ${colors.blueClaire}15 0%, ${colors.blueLogo}10 100%)`,
                minHeight: "100vh",
            }}
        >
            <InstitutBreadcrumb title={t("institutMenu.documentTool")} SubTitle={institut?.name} />

            <section className="py-6">
                <div className="container max-w-7xl mx-auto px-4">

                    <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                        {demande && (
                            <>
                                <Card
                                    style={{
                                        background: `linear-gradient(135deg, ${colors.blueLogo} 0%, ${colors.blueClaire} 100%)`,
                                        color: "white",
                                        border: "none",
                                        borderRadius: "12px 12px 0 0",
                                    }}
                                >
                                    <Descriptions
                                        title={<span style={{ color: "white" }}>{t("institutPartageDetails.request_information")}</span>}
                                        bordered={false}
                                        column={isSmallScreen ? 1 : 2}
                                        layout={descriptionsLayout}
                                        size={isSmallScreen ? "small" : "default"}
                                        labelStyle={{ color: "rgba(255,255,255,0.8)" }}
                                        contentStyle={{ color: "white" }}
                                    >
                                        <Descriptions.Item label={t("institutPartageDetails.code")} span={2}>
                                            <Tag style={{ backgroundColor: "rgba(255,255,255,0.2)", color: "white", border: "none" }}>
                                                <CopyableFieldSimple value={demande?.code} />
                                            </Tag>
                                        </Descriptions.Item>
                                        <Descriptions.Item label={t("demandePartage.year")} span={2}>
                                            <CalendarOutlined /> {demande.year}
                                        </Descriptions.Item>
                                        <Descriptions.Item label={t("demandePartage.periode")} span={2}>
                                            {formatPeriod(demande.periode)}
                                        </Descriptions.Item>
                                        <Descriptions.Item label={t("institutPartageDetails.request_date")} span={2}>
                                            <CalendarOutlined /> {new Date(demande.dateDemande).toLocaleDateString()}
                                        </Descriptions.Item>

                                    </Descriptions>
                                </Card>

                                {/* Information du demandeur - Informations de base */}
                                <Card
                                    title={
                                        <Space>
                                            <UserOutlined style={{ color: colors.blueLogo }} />
                                            <span style={{ color: colors.blueLogo }}>
                                                {t("institutPartageDetails.requester_information")}
                                            </span>
                                        </Space>
                                    }
                                    style={{ margin: "16px 0", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                                >
                                    <Descriptions
                                        bordered
                                        column={isSmallScreen ? 1 : 2}
                                        layout={descriptionsLayout}
                                        size={isSmallScreen ? "small" : "default"}
                                    >
                                        <Descriptions.Item label={t("institutPartageDetails.name")} span={getColumnSpan(2)}>
                                            {demande.demandeur.name}
                                        </Descriptions.Item>
                                        <Descriptions.Item label={t("institutPartageDetails.gender")}>
                                            {demande.demandeur.sexe}
                                        </Descriptions.Item>
                                        <Descriptions.Item label={t("institutPartageDetails.email")} span={getColumnSpan(2)}>
                                            {demande.demandeur.email}
                                        </Descriptions.Item>
                                        <Descriptions.Item label={t("institutPartageDetails.phone")}>
                                            {demande.demandeur.phone}
                                        </Descriptions.Item>
                                        <Descriptions.Item label={t("institutPartageDetails.profession")} span={getColumnSpan(2)}>
                                            {demande.demandeur.profession}
                                        </Descriptions.Item>

                                        <Descriptions.Item label={t("institutPartageDetails.birth_date")}>
                                            {new Date(demande.demandeur.dateNaissance).toLocaleDateString()}
                                        </Descriptions.Item>
                                        <Descriptions.Item label={t("institutPartageDetails.birth_place")}>
                                            {demande.demandeur.lieuNaissance}
                                        </Descriptions.Item>
                                        <Descriptions.Item label={t("institutPartageDetails.country_of_residence")}>
                                            {demande.demandeur.paysResidence}
                                        </Descriptions.Item>
                                    </Descriptions>
                                </Card>

                                {/* Informations personnelles de l'application */}
                                <Card
                                    title={
                                        <Space>
                                            <UserOutlined style={{ color: colors.blueLogo }} />
                                            <span style={{ color: colors.blueLogo }}>{t("application.personalInformation")}</span>
                                        </Space>
                                    }
                                    style={{ margin: "16px 0", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
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


                            </>
                        )}

                        <div className="p-6">
                            <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "24px" }}>
                                <Card style={{ borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
                                    <div
                                        style={{
                                            marginBottom: 16,
                                            display: "flex",
                                            justifyContent: "space-between",
                                            flexWrap: "wrap",
                                            gap: "10px",
                                        }}
                                    >
                                        <Input
                                            placeholder={t(
                                                "institutPartage.search_documents",
                                                "Rechercher par code ADN, intitulé ou institut...",
                                            )}
                                            prefix={<SearchOutlined />}
                                            value={searchText}
                                            onChange={(e) => setSearchText(e.target.value)}
                                            style={{ width: "100%", maxWidth: 350 }}
                                        />
                                        <Space wrap>
                                            <Select
                                                placeholder={t("demandePartage.select_periode", "Période")}
                                                style={{ width: 120 }}
                                                allowClear
                                                onChange={handlePeriodeFilter}
                                                value={filterPeriode}
                                            >
                                                {uniquePeriodes.map((periode) => (
                                                    <Select.Option key={periode} value={periode}>
                                                        {translatePeriode(periode)}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                            <Select
                                                placeholder={t("demandePartage.select_year", "Année")}
                                                style={{ width: 120 }}
                                                allowClear
                                                onChange={handleYearFilter}
                                                value={filterYear}
                                            >
                                                {uniqueYears.map((year) => (
                                                    <Select.Option key={year} value={year}>
                                                        {year}
                                                    </Select.Option>
                                                ))}
                                            </Select>

                                            <Button
                                                onClick={resetFilters}
                                                style={{
                                                    backgroundColor: colors.blueLogo,
                                                    borderColor: colors.blueLogo,
                                                    color: "white",
                                                }}
                                            >
                                                {t("common.reset_filters", "Réinitialiser")}
                                            </Button>
                                        </Space>
                                    </div>
                                    <div style={tableContainerStyle}>
                                        <Table
                                            columns={columns}
                                            dataSource={getFilteredData}
                                            rowKey="id"
                                            loading={loading}
                                            pagination={{
                                                defaultPageSize: 10,
                                                showSizeChanger: true,
                                                showTotal: (total) =>
                                                    `${t("institutPartage.total", "Total")} ${total} ${t("institutPartage.documents", "document(s)")}`,
                                            }}
                                            scroll={{ x: "max-content" }}
                                            className="responsive-table"
                                            rowClassName={(record, index) => (index % 2 === 0 ? "table-row-light" : "table-row-dark")}
                                        />
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PDF Viewer Modal */}
            <Modal
                title={t("institutPartageDetails.pdf_document")}
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
                        <Spin fullscreen />
                    </div>
                ) : pdfError ? (
                    <div style={{ textAlign: "center", padding: "20px" }}>
                            <span style={{ color: colors.rougeLogo }}>{pdfError}</span>
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
                            title={t("institutPartageDetails.pdf_viewer")}
                        />
                    </object>
                ) : (
                    <div style={{ textAlign: "center", padding: "20px" }}>
                                    <span style={{ color: colors.rougeLogo }}>{t("institutPartageDetails.no_document_to_display")}</span>
                    </div>
                )}
            </Modal>

            <style jsx>{`
                .table-row-light {
                    background-color: #fafafa;
                }
                .table-row-dark {
                    background-color: #ffffff;
                }
                .table-row-light:hover,
                .table-row-dark:hover {
                    background-color: ${colors.blueClaire}15 !important;
                }
            `}</style>
        </div>
    )
}

export default InstitutDocumentPartage
