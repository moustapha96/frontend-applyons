// "use client"

// import { useState, useEffect } from "react"
// import { useAuthContext } from "../../../context/useAuthContext"
// import { useTranslation } from "react-i18next"
// import { getFileDocumentPartager, getFileDocumentPartagerTraduit } from "../../../services/partageService"
// import { message, Input, Button, Card, Table, Spin, Tag, Space, Popover, Modal, Typography, Upload } from "antd"
// import { SearchOutlined, InfoCircleOutlined, EyeOutlined, UserOutlined, UploadOutlined, DownloadOutlined } from "@ant-design/icons"
// import { useParams } from "react-router-dom"
// import { Calendar, Building } from "lucide-react"
// import InstitutTraducteurBreadcrumb from "@/components/InstitutTraducteurBreadcrumb"
// import { getDossierAtraiterDocuments, setDocumentTraduit } from "@/services/institutTraducteurService"

// const { Text } = Typography

// const InstitutTraducteurDossierATraiterDocument = () => {
//     const { institut } = useAuthContext()
//     const { id } = useParams()

//     const [loading, setLoading] = useState(true)
//     const [searchText, setSearchText] = useState("")
//     const { t } = useTranslation()
//     const [pdfVisible, setPdfVisible] = useState(false)
//     const [pdfLoading, setPdfLoading] = useState(false)
//     const [pdfData, setPdfData] = useState(null)
//     const [pdfError, setPdfError] = useState(null)
//     const [error, setError] = useState(null)
//     const [documents, setDocuments] = useState([])
//     const [uploadVisible, setUploadVisible] = useState(false)
//     const [uploadLoading, setUploadLoading] = useState(false)
//     const [selectedDocumentId, setSelectedDocumentId] = useState(null)
//     const [fileList, setFileList] = useState([])

//     const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0)
//     const isSmallScreen = windowWidth < 768
//     const descriptionsLayout = isSmallScreen ? "vertical" : "horizontal"
//     const isMobileScreen = windowWidth < 576

//     const getColumnSpan = (defaultSpan) => (isSmallScreen ? 3 : defaultSpan)

//     useEffect(() => {
//         const handleResize = () => setWindowWidth(window.innerWidth)
//         window.addEventListener("resize", handleResize)
//         return () => window.removeEventListener("resize", handleResize)
//     }, [])

//     const fetchDocuments = async () => {
//         message.destroy()
//         try {
//             const data = await getDossierAtraiterDocuments(institut.id, id)
//             console.log("[v0] Documents fetched:", data)
//             setDocuments(data)
//         } catch (err) {
//             console.error("[v0] Error fetching documents:", err)
//             setError(err.message)
//             message.error(t("institutTraducteurDetails.error_fetching_details"))
//         } finally {
//             setLoading(false)
//         }
//     }

//     useEffect(() => {
//         fetchDocuments()
//     }, [institut.id, id])

//     useEffect(() => {
//         scrollTo(0, 0)
//     }, [])

//     const getFilteredData = () => {
//         if (!documents || !Array.isArray(documents)) return []

//         return documents.filter((doc) => {
//             const searchLower = searchText.toLowerCase()
//             return (
//                 doc.codeAdn?.toLowerCase().includes(searchLower) ||
//                 doc.intitule?.toLowerCase().includes(searchLower) ||
//                 doc.typeDocument?.toLowerCase().includes(searchLower) ||
//                 doc.institut?.name?.toLowerCase().includes(searchLower) ||
//                 doc.demandeur?.name?.toLowerCase().includes(searchLower) ||
//                 doc.demande?.code?.toLowerCase().includes(searchLower)
//             )
//         })
//     }

//     const handleDownloadFile = async (docId) => {
//         try {
//             setPdfError(null)
//             setPdfLoading(true)
//             const base64Data = await getFileDocumentPartager(docId)
//             console.log("[v0] PDF data loaded for document:", docId)
//             const link = document.createElement("a")
//             link.href = `data:application/pdf;base64,${base64Data}`
//             link.download = `document_${docId}.pdf`
//             link.click()
//         } catch (error) {
//             console.error("[v0] Error loading PDF:", error)
//             setPdfError(error.message)
//             message.error(t("institutTraducteurDetails.error_loading_document"))
//         } finally {
//             setPdfLoading(false)
//         }
//     }
//     const handleDownloadFileTraduit = async (docId) => {
//         try {
//             setPdfError(null)
//             setPdfLoading(true)
//             const base64Data = await getFileDocumentPartagerTraduit(docId)
//             console.log("[v0] PDF data loaded for document:", docId)
//             const link = document.createElement("a")
//             link.href = `data:application/pdf;base64,${base64Data}`
//             link.download = `document_${docId}.pdf`
//             link.click()
//         } catch (error) {
//             console.error("[v0] Error loading PDF:", error)
//             setPdfError(error.message)
//             message.error(t("institutTraducteurDetails.error_loading_document"))
//         } finally {
//             setPdfLoading(false)
//         }
//     }

//     const translatePeriode = (periode) => {
//         const periodMap = {
//             Printemps: t("demandePartage.periode_1"),
//             Été: t("demandePartage.periode_2"),
//             Automne: t("demandePartage.periode_3"),
//             Hiver: t("demandePartage.periode_4"),
//             Autre: t("demandePartage.periode_5"),
//         }
//         return periodMap[periode] || periode
//     }

//     const formatArray = (array) => {
//         if (!array || !Array.isArray(array) || array.length === 0) return t("common.notSpecified")
//         return array.join(", ")
//     }

//     const formatPeriod = (periode) => {
//         const periodMap = {
//             Printemps: t("demandePartage.periode_1"),
//             Été: t("demandePartage.periode_2"),
//             Automne: t("demandePartage.periode_3"),
//             Hiver: t("demandePartage.periode_4"),
//             Autre: t("demandePartage.periode_5"),
//         }
//         return periodMap[periode] || periode
//     }

//     const handleViewDocument = async (docId) => {
//         try {
//             setPdfError(null)
//             setPdfLoading(true)
//             setPdfVisible(true)
//             const base64Data = await getFileDocumentPartager(docId)
//             console.log("[v0] PDF data loaded for document:", docId)
//             setPdfData(base64Data)
//         } catch (error) {
//             console.error("[v0] Error loading PDF:", error)
//             setPdfError(error.message)
//             message.error(t("institutTraducteurDetails.error_loading_document"))
//         } finally {
//             setPdfLoading(false)
//         }
//     }
//     const handleViewDocumentTraduit = async (docId) => {
//         try {
//             setPdfError(null)
//             setPdfLoading(true)
//             setPdfVisible(true)
//             const base64Data = await getFileDocumentPartagerTraduit(docId)
//             console.log("[v0] PDF data loaded for document:", docId)
//             setPdfData(base64Data)
//         } catch (error) {
//             console.error("[v0] Error loading PDF:", error)
//             setPdfError(error.message)
//             message.error(t("institutTraducteurDetails.error_loading_document"))
//         } finally {
//             setPdfLoading(false)
//         }
//     }


//     const handleUploadDocument = (documentId) => {
//         setSelectedDocumentId(documentId)
//         setUploadVisible(true)
//         setFileList([])
//     }

//     const handleFileUpload = async () => {
//         if (!fileList.length || !selectedDocumentId) {
//             message.error(t("institutTraducteurDetails.select_file_error", "Veuillez sélectionner un fichier"))
//             return
//         }
//         try {
//             setUploadLoading(true)
//             const file = fileList[0]

//             const formData = new FormData()
//             formData.append("document", file.originFileObj)
//             formData.append("institutId", institut.id)
//             formData.append("documentId", selectedDocumentId)

//             await setDocumentTraduit(institut.id, selectedDocumentId, formData)
//             message.success(t("institutTraducteurDetails.upload_success", "Document traduit uploadé avec succès"))

//             setUploadVisible(false)
//             setFileList([])
//             setSelectedDocumentId(null)

//             await fetchDocuments()
//         } catch (error) {
//             console.error("[v0] Error uploading translated document:", error)
//             message.error(t("institutTraducteurDetails.upload_error", "Erreur lors de l'upload du document traduit"))
//         } finally {
//             setUploadLoading(false)
//         }
//     }

//     const uploadProps = {
//         beforeUpload: (file) => {
//             const isPDF = file.type === "application/pdf"
//             if (!isPDF) {
//                 message.error(t("institutTraducteurDetails.pdf_only_error", "Seuls les fichiers PDF sont autorisés"))
//                 return false
//             }
//             const isLt10M = file.size / 1024 / 1024 < 10
//             if (!isLt10M) {
//                 message.error(t("institutTraducteurDetails.file_size_error", "Le fichier doit faire moins de 10MB"))
//                 return false
//             }
//             return false // Prevent auto upload
//         },
//         fileList,
//         onChange: ({ fileList: newFileList }) => {
//             setFileList(newFileList.slice(-1)) // Keep only the last file
//         },
//         onRemove: () => {
//             setFileList([])
//         },
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
//                 title: t("institutTraducteurDetails.title"),
//                 dataIndex: "intitule",
//                 key: "intitule",
//                 render: (text, record) => (
//                     <div>
//                         <div style={{ fontWeight: "600", color: "#254c6b" }}>{text}</div>
//                         <div style={{ fontSize: "12px", color: "#666" }}>
//                             {/* <Tag color="green" size="small">
//                                 {record.codeAdn}
//                             </Tag> */}
//                             <br />
//                             <Tag color="blue" size="small">
//                                 {record.typeDocument}
//                             </Tag>
//                             <br />
//                             <Tag color="blue">
//                                 <Calendar className="w-3 h-3 inline mr-1" />
//                                 {record.anneeObtention}
//                             </Tag>
//                         </div>
//                     </div>
//                 ),
//                 sorter: (a, b) => a.intitule?.localeCompare(b.intitule),
//             },

//             {
//                 title: t("institutTraducteurDetails.institute_information"),
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
//                 sorter: (a, b) => a.institut?.name?.localeCompare(b.institut?.name),
//                 responsive: ["md"],
//             },
//             {
//                 title: t("institutTraducteurDetails.requester_info"),
//                 dataIndex: "demandeur",
//                 key: "demandeur",
//                 render: (demandeur) => (
//                     <div>
//                         <div style={{ fontWeight: "500" }}>{demandeur?.name}</div>
//                         <div style={{ fontSize: "12px", color: "#666" }}>
//                             <UserOutlined className="w-3 h-3 inline mr-1" />
//                             {demandeur?.email}
//                         </div>
//                     </div>
//                 ),
//                 sorter: (a, b) => a.demandeur?.name?.localeCompare(b.demandeur?.name),
//                 responsive: ["lg"],
//             },

//             {
//                 title: t("institutTraducteurDetails.download"),
//                 dataIndex: "download",
//                 key: "download",
//                 render: (_, record) => (
//                     <Space size="small" wrap>
//                         {record.estTraduit && <Tag color="green">{t("institutTraducteurDetails.translated", "Traduit")}</Tag>}
//                         <br />
//                         <Button
//                             className="ant-btn-primary"
//                             icon={<DownloadOutlined />}
//                             onClick={() => handleDownloadFile(record.id)}
//                             size={isSmallScreen ? "small" : "middle"}
//                         >
//                         </Button>



//                         <Button
//                             icon={<UploadOutlined />}
//                             className="ant-btn-primary"
//                             onClick={() => handleUploadDocument(record.id)}
//                             size={isSmallScreen ? "small" : "middle"}
//                             type="default"
//                             onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#e6f7ff")}
//                         >
//                         </Button>


//                     </Space>
//                 ),
//                 responsive: ["md"],
//             },
//             {
//                 title: t("institutTraducteur.actions"),
//                 key: "actions",
//                 render: (_, record) => (
//                     <Space size="small" wrap>
//                         <Button
//                             className="ant-btn-primary"
//                             icon={<EyeOutlined />}
//                             onClick={() => handleViewDocument(record.id)}
//                             size={isSmallScreen ? "small" : "middle"}
//                         >
//                             {/* {!isSmallScreen && t("institutTraducteurDetails.view_document")} */}
//                         </Button>

//                         <Popover
//                             content={
//                                 <div style={{ maxWidth: "400px" }}>
//                                     <Space direction="vertical" size="middle">
//                                         <div>
//                                             <strong>{t("institutTraducteur.document_details", "Détails du document")}:</strong>
//                                             <p>
//                                                 <strong>{t("institutTraducteur.document_title", "Intitulé")}:</strong> {record.intitule}
//                                             </p>
//                                             <p>
//                                                 <strong>{t("institutTraducteur.document_type", "Type")}:</strong> {record.typeDocument}
//                                             </p>
//                                             <p>
//                                                 <strong>{t("institutTraducteur.dna_code", "Code ADN")}:</strong> {record.codeAdn}
//                                             </p>
//                                             <p>
//                                                 <strong>{t("institutTraducteur.year_obtained", "Année")}:</strong> {record.anneeObtention}
//                                             </p>
//                                         </div>

//                                         {record.institut && (
//                                             <div>
//                                                 <strong>{t("institutTraducteur.institut_info", "Informations Institut")}:</strong>
//                                                 <p>{record.institut.name}</p>
//                                                 <p>
//                                                     {record.institut.type} - {record.institut.paysResidence}
//                                                 </p>
//                                                 <p>
//                                                     {t("institutTraducteur.email", "Email")}: {record.institut.email}
//                                                 </p>
//                                                 <p>
//                                                     {t("institutTraducteur.phone", "Téléphone")}: {record.institut.phone}
//                                                 </p>
//                                             </div>
//                                         )}


//                                     </Space>
//                                 </div>
//                             }
//                             title={t("institutTraducteur.document_details", "Détails du document")}
//                             trigger="click"
//                             placement="left"
//                         >
//                             <Button className="ant-btn-simple" icon={<InfoCircleOutlined />} size={windowWidth < 768 ? "small" : "middle"} />
//                         </Popover>
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
//             <InstitutTraducteurBreadcrumb title={t("institutTraducteur.dossierAtraiter")} SubTitle={institut?.name} />

//             <section className="py-6">
//                 <div className="container max-w-7xl mx-auto px-4">
//                     <div className="bg-white rounded-xl shadow-xl overflow-hidden">
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
//                                             placeholder={t("common.search_documents", "Rechercher par code ADN, intitulé ou institut...")}
//                                             prefix={<SearchOutlined />}
//                                             value={searchText}
//                                             onChange={(e) => setSearchText(e.target.value)}
//                                             style={{ width: "100%", maxWidth: 350 }}
//                                         />
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
//                                                     `${t("institutTraducteur.total", "Total")} ${total} ${t("common.documents", "document(s)")}`,
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

//             <Modal
//                 title={t("institutTraducteurDetails.pdf_document")}
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
//                         <Spin tip={t("institutTraducteurDetails.loading_document")} />
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
//                             title={t("institutTraducteurDetails.pdf_viewer")}
//                         />
//                     </object>
//                 ) : (
//                     <div style={{ textAlign: "center", padding: "20px" }}>
//                         <Text type="warning">{t("institutTraducteurDetails.no_document_to_display")}</Text>
//                     </div>
//                 )}
//             </Modal>

//             <Modal
//                 title={t("institutTraducteurDetails.upload_translated_document", "Upload Document Traduit")}
//                 open={uploadVisible}
//                 onCancel={() => {
//                     setUploadVisible(false)
//                     setFileList([])
//                     setSelectedDocumentId(null)
//                 }}
//                 footer={[
//                     <Button
//                         key="cancel"
//                         onClick={() => {
//                             setUploadVisible(false)
//                             setFileList([])
//                             setSelectedDocumentId(null)
//                         }}
//                         className="ant-btn-simple"
//                     >
//                         {t("common.cancel", "Annuler")}
//                     </Button>,
//                     <Button
//                         key="upload"
//                         type="primary"
//                         loading={uploadLoading}
//                         onClick={handleFileUpload}
//                         disabled={!fileList.length}
//                     >
//                         {t("institutTraducteurDetails.upload", "Upload")}
//                     </Button>,
//                 ]}
//             >
//                 <div style={{ padding: "20px 0" }}>
//                     <p style={{ marginBottom: "16px" }}>
//                         {t(
//                             "institutTraducteurDetails.upload_instruction",
//                             "Sélectionnez le document traduit à uploader (PDF uniquement, max 10MB)",
//                         )}
//                     </p>
//                     <Upload.Dragger {...uploadProps}>
//                         <p className="ant-upload-drag-icon">
//                             <UploadOutlined />
//                         </p>
//                         <p className="ant-upload-text">
//                             {t("institutTraducteurDetails.drag_drop_text", "Cliquez ou glissez le fichier ici pour l'uploader")}
//                         </p>
//                         <p className="ant-upload-hint">
//                             {t("institutTraducteurDetails.file_format_hint", "Seuls les fichiers PDF sont acceptés")}
//                         </p>
//                     </Upload.Dragger>
//                 </div>
//             </Modal>
//         </div>
//     )
// }

// export default InstitutTraducteurDossierATraiterDocument

"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { useAuthContext } from "../../../context/useAuthContext"
import { useTranslation } from "react-i18next"
import { deleteDocumentTraduit, getFileDocumentPartager, getFileDocumentPartagerTraduit } from "../../../services/partageService"
import {
    message,
    Input,
    Button,
    Card,
    Table,
    Spin,
    Tag,
    Space,
    Popover,
    Modal,
    Typography,
    Upload,
    Row,
    Col,
    Statistic,
    Dropdown,
    Menu,
} from "antd"
import {
    SearchOutlined,
    InfoCircleOutlined,
    EyeOutlined,
    UserOutlined,
    UploadOutlined,
    DownloadOutlined,
    MoreOutlined,
    FileTextOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
} from "@ant-design/icons"
import { useParams } from "react-router-dom"
import { Calendar, Building, Users } from "lucide-react"
import InstitutTraducteurBreadcrumb from "@/components/InstitutTraducteurBreadcrumb"
import { getDossierAtraiterDocuments, setDocumentTraduit } from "@/services/institutTraducteurService"

const { Text } = Typography

const InstitutTraducteurDossierATraiterDocument = () => {
    const { institut } = useAuthContext()
    const { id } = useParams()

    const [loading, setLoading] = useState(true)
    const [searchText, setSearchText] = useState("")
    const { t } = useTranslation()
    const [pdfVisible, setPdfVisible] = useState(false)
    const [pdfLoading, setPdfLoading] = useState(false)
    const [pdfData, setPdfData] = useState(null)
    const [pdfError, setPdfError] = useState(null)
    const [error, setError] = useState(null)
    const [documents, setDocuments] = useState([])
    const [uploadVisible, setUploadVisible] = useState(false)
    const [uploadLoading, setUploadLoading] = useState(false)
    const [selectedDocumentId, setSelectedDocumentId] = useState(null)
    const [fileList, setFileList] = useState([])

    const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0)
    const isSmallScreen = windowWidth < 768
    const isMobileScreen = windowWidth < 576

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth)
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    const fetchDocuments = useCallback(async () => {
        message.destroy()
        try {
            const data = await getDossierAtraiterDocuments(institut.id, id)
            setDocuments(data)
        } catch (err) {
            console.error("[v0] Error fetching documents:", err)
            setError(err.message)
            message.error(t("institutTraducteurDetails.error_fetching_details"))
        } finally {
            setLoading(false)
        }
    }, [institut.id, id, t])

    useEffect(() => {
        fetchDocuments()
    }, [fetchDocuments])

    useEffect(() => {
        scrollTo(0, 0)
    }, [])

    const statistics = useMemo(() => {
        if (!documents || !Array.isArray(documents))
            return {
                total: 0,
                translated: 0,
                pending: 0,
                institutes: 0,
            }

        const uniqueInstitutes = new Set(documents.map((doc) => doc.institut?.id).filter(Boolean))

        return {
            total: documents.length,
            translated: documents.filter((doc) => doc.estTraduit).length,
            pending: documents.filter((doc) => !doc.estTraduit).length,
            institutes: uniqueInstitutes.size,
        }
    }, [documents])


    const getFilteredData = useMemo(() => {
        if (!documents || !Array.isArray(documents)) return []

        return documents.filter((doc) => {
            const searchLower = searchText.toLowerCase()
            return (
                doc.codeAdn?.toLowerCase().includes(searchLower) ||
                doc.intitule?.toLowerCase().includes(searchLower) ||
                doc.typeDocument?.toLowerCase().includes(searchLower) ||
                doc.institut?.name?.toLowerCase().includes(searchLower) ||
                doc.demandeur?.name?.toLowerCase().includes(searchLower) ||
                doc.demande?.code?.toLowerCase().includes(searchLower)
            )
        })
    }, [documents, searchText])

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

    const handleViewDocument = useCallback(
        async (docId) => {
            try {
                setPdfError(null)
                setPdfLoading(true)
                setPdfVisible(true)
                const base64Data = await getFileDocumentPartager(docId)
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

    const handleViewDocumentTraduit = useCallback(
        async (docId) => {
            try {
                setPdfError(null)
                setPdfLoading(true)
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

    const handleDeleteTraduit = useCallback(
        async (docId) => {
            try {
                const res = await deleteDocumentTraduit(docId)
                console.log(res)
                fetchDocuments()
                message.success(t("institutPartageDetails.document_deleted"))
            } catch (error) {
                console.log(error)
                message.error(t("institutPartageDetails.error_deleting_document"))
            }
        },
        [t],
    )


    const handleUploadDocument = useCallback((documentId) => {
        setSelectedDocumentId(documentId)
        setUploadVisible(true)
        setFileList([])
    }, [])

    const handleFileUpload = useCallback(async () => {
        if (!fileList.length || !selectedDocumentId) {
            message.error(t("institutTraducteurDetails.select_file_error", "Veuillez sélectionner un fichier"))
            return
        }
        try {
            setUploadLoading(true)
            const file = fileList[0]

            const formData = new FormData()
            formData.append("document", file.originFileObj)
            formData.append("institutId", institut.id)
            formData.append("documentId", selectedDocumentId)

            await setDocumentTraduit(institut.id, selectedDocumentId, formData)
            message.success(t("institutTraducteurDetails.upload_success", "Document traduit uploadé avec succès"))

            setUploadVisible(false)
            setFileList([])
            setSelectedDocumentId(null)

            await fetchDocuments()
        } catch (error) {
            console.error("[v0] Error uploading translated document:", error)
            message.error(t("institutTraducteurDetails.upload_error", "Erreur lors de l'upload du document traduit"))
        } finally {
            setUploadLoading(false)
        }
    }, [fileList, selectedDocumentId, institut.id, t, fetchDocuments])

    const getActionMenu = useCallback(
        (record) => (
            <Menu>
                <Menu.Item key="download" icon={<DownloadOutlined />} onClick={() => handleDownloadFile(record.id)}>
                    {t("institutTraducteurDetails.download_original", "Télécharger original")}
                </Menu.Item>

                {/* {record.estTraduit && (
                    <Menu.Item
                        key="download-translated"
                        icon={<DownloadOutlined />}
                        onClick={() => handleDownloadFileTraduit(record.id)}
                    >
                        {t("institutTraducteurDetails.download_translated", "Télécharger traduit")}
                    </Menu.Item>
                )} */}
                {!record.estTraduit && (
                    <Menu.Item key="upload" icon={<UploadOutlined />} onClick={() => handleUploadDocument(record.id)}>
                        {t("institutTraducteurDetails.upload_translation", "Téléverser traduction")}
                    </Menu.Item>
                )}

                {record.estTraduit && (
                    <Menu.Item key="upload" icon={<UploadOutlined />} onClick={() => handleDeleteTraduit(record.id)}>
                        {t("institutTraducteurDetails.delete_translation", "Supprimer traduction")}
                    </Menu.Item>
                )}

                <Menu.Item key="view" icon={<EyeOutlined />} onClick={() => handleViewDocument(record.id)}>
                    {t("institutTraducteurDetails.view_document", "Voir détails")}
                </Menu.Item>

                {/* {record.estTraduit && (
                    <Menu.Item key="view-translated" icon={<EyeOutlined />} onClick={() => handleViewDocumentTraduit(record.id)}>
                        {t("institutTraducteurDetails.view_translated", "Voir traduit")}
                    </Menu.Item>
                )} */}

            </Menu>
        ),
        [
            handleDownloadFile,
            handleDownloadFileTraduit,
            handleUploadDocument,
            handleViewDocument,
            handleViewDocumentTraduit,
            t,
        ],
    )

    const uploadProps = {
        beforeUpload: (file) => {
            const isPDF = file.type === "application/pdf"
            if (!isPDF) {
                message.error(t("institutTraducteurDetails.pdf_only_error", "Seuls les fichiers PDF sont autorisés"))
                return false
            }
            const isLt10M = file.size / 1024 / 1024 < 10
            if (!isLt10M) {
                message.error(t("institutTraducteurDetails.file_size_error", "Le fichier doit faire moins de 10MB"))
                return false
            }
            return false
        },
        fileList,
        onChange: ({ fileList: newFileList }) => {
            setFileList(newFileList.slice(-1))
        },
        onRemove: () => {
            setFileList([])
        },
    }

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
                title: t("institutTraducteurDetails.title"),
                dataIndex: "intitule",
                key: "intitule",
                render: (text, record) => (
                    <div>
                        <div style={{ fontWeight: "600", color: "#1890ff", marginBottom: "8px" }}>{text}</div>
                        <Space wrap size={[4, 4]}>
                            <Tag color="blue" size="small">
                                {record.typeDocument}
                            </Tag>
                            <Tag color="green" size="small">
                                <Calendar className="w-3 h-3 inline mr-1" />
                                {record.anneeObtention}
                            </Tag>
                            {record.estTraduit && (
                                <Tag color="success" size="small">
                                    <CheckCircleOutlined className="mr-1" />
                                    {t("institutTraducteurDetails.translated", "Traduit")}
                                </Tag>
                            )}
                        </Space>
                    </div>
                ),
                sorter: (a, b) => a.intitule?.localeCompare(b.intitule),
            },
            {
                title: t("institutTraducteurDetails.institute_information"),
                dataIndex: "institut",
                key: "institut",
                render: (institut) => (
                    <div>
                        <div style={{ fontWeight: "500", marginBottom: "4px" }}>{institut?.name}</div>
                        <div style={{ fontSize: "12px", color: "#666" }}>
                            <Building className="w-3 h-3 inline mr-1" />
                            {institut?.paysResidence}
                        </div>
                    </div>
                ),
                sorter: (a, b) => a.institut?.name?.localeCompare(b.institut?.name),
                responsive: ["md"],
            },
            {
                title: t("institutTraducteurDetails.requester_info"),
                dataIndex: "demandeur",
                key: "demandeur",
                render: (demandeur) => (
                    <div>
                        <div style={{ fontWeight: "500", marginBottom: "4px" }}>{demandeur?.name}</div>
                        <div style={{ fontSize: "12px", color: "#666" }}>
                            <UserOutlined className="w-3 h-3 inline mr-1" />
                            {demandeur?.email}
                        </div>
                    </div>
                ),
                sorter: (a, b) => a.demandeur?.name?.localeCompare(b.demandeur?.name),
                responsive: ["lg"],
            },
            {
                title: t("institutTraducteur.actions"),
                key: "actions",
                width: 120,
                render: (_, record) => (
                    <Space size="small">
                        <Dropdown overlay={getActionMenu(record)} trigger={["click"]} placement="bottomRight">
                            <Button type="primary" icon={<MoreOutlined />} size={isSmallScreen ? "small" : "middle"}>
                                {!isSmallScreen && t("common.actions", "Actions")}
                            </Button>
                        </Dropdown>

                        <Popover
                            content={
                                <div style={{ maxWidth: "400px" }}>
                                    <Space direction="vertical" size="middle">
                                        <div>
                                            <strong>{t("institutTraducteur.document_details", "Détails du document")}:</strong>
                                            <p>
                                                <strong>{t("institutTraducteur.document_title", "Intitulé")}:</strong> {record.intitule}
                                            </p>
                                            <p>
                                                <strong>{t("institutTraducteur.document_type", "Type")}:</strong> {record.typeDocument}
                                            </p>
                                            <p>
                                                <strong>{t("institutTraducteur.dna_code", "Code ADN")}:</strong> {record.codeAdn}
                                            </p>
                                            <p>
                                                <strong>{t("institutTraducteur.year_obtained", "Année")}:</strong> {record.anneeObtention}
                                            </p>
                                        </div>

                                        {record.institut && (
                                            <div>
                                                <strong>{t("institutTraducteur.institut_info", "Informations Institut")}:</strong>
                                                <p>{record.institut.name}</p>
                                                <p>
                                                    {record.institut.type} - {record.institut.paysResidence}
                                                </p>
                                                <p>
                                                    {t("institutTraducteur.email", "Email")}: {record.institut.email}
                                                </p>
                                                <p>
                                                    {t("institutTraducteur.phone", "Téléphone")}: {record.institut.phone}
                                                </p>
                                            </div>
                                        )}
                                    </Space>
                                </div>
                            }
                            title={t("institutTraducteur.document_details", "Détails du document")}
                            trigger="click"
                            placement="left"
                        >
                            <Button icon={<InfoCircleOutlined />} size={isSmallScreen ? "small" : "middle"} type="default" />
                        </Popover>
                    </Space>
                ),
            },
        ]

        return baseColumns
    }

    const columns = getResponsiveColumns()

    return (
        <div style={{ background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", minHeight: "100vh" }}>
            <InstitutTraducteurBreadcrumb title={t("institutTraducteur.dossierAtraiter")} SubTitle={institut?.name} />

            <section className="py-6">
                <div className="container max-w-7xl mx-auto px-4">
                    <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                        <div className="p-6">
                            <Card>
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
                                        placeholder={t("common.search_documents", "Rechercher par code ADN, intitulé ou institut...")}
                                        prefix={<SearchOutlined />}
                                        value={searchText}
                                        onChange={(e) => setSearchText(e.target.value)}
                                        style={{ width: "100%", maxWidth: 350 }}
                                        size="large"
                                    />
                                </div>

                                <Table
                                    columns={columns}
                                    dataSource={getFilteredData}
                                    rowKey="id"
                                    loading={loading}
                                    pagination={{
                                        defaultPageSize: 10,
                                        showSizeChanger: true,
                                        showQuickJumper: true,
                                        showTotal: (total, range) =>
                                            `${range[0]}-${range[1]} ${t("common.of", "sur")} ${total} ${t("common.documents", "document(s)")}`,
                                        pageSizeOptions: ["10", "20", "50", "100"],
                                    }}
                                    scroll={{ x: "max-content" }}
                                    className="responsive-table"
                                    size={isSmallScreen ? "small" : "middle"}
                                />
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            <Modal
                title={t("institutTraducteurDetails.pdf_document")}
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
                        <Spin tip={t("institutTraducteurDetails.loading_document")} />
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
                            title={t("institutTraducteurDetails.pdf_viewer")}
                        />
                    </object>
                ) : (
                    <div style={{ textAlign: "center", padding: "20px" }}>
                        <Text type="warning">{t("institutTraducteurDetails.no_document_to_display")}</Text>
                    </div>
                )}
            </Modal>

            <Modal
                title={t("institutTraducteurDetails.upload_translated_document")}
                open={uploadVisible}
                onCancel={() => {
                    setUploadVisible(false)
                    setFileList([])
                    setSelectedDocumentId(null)
                }}
                footer={[
                    <Button
                        key="cancel"
                        onClick={() => {
                            setUploadVisible(false)
                            setFileList([])
                            setSelectedDocumentId(null)
                        }}
                    >
                        {t("common.cancel")}
                    </Button>,
                    <Button
                        key="upload"
                        type="primary"
                        loading={uploadLoading}
                        onClick={handleFileUpload}
                        disabled={!fileList.length}
                    >
                        {t("institutTraducteurDetails.upload")}
                    </Button>,
                ]}
            >
                <div style={{ padding: "20px 0" }}>
                    <p style={{ marginBottom: "16px" }}>
                        {t(
                            "institutTraducteurDetails.upload_instruction",
                            "Sélectionnez le document traduit à uploader (PDF uniquement, max 10MB)",
                        )}
                    </p>
                    <Upload.Dragger {...uploadProps}>
                        <p className="ant-upload-drag-icon">
                            <UploadOutlined />
                        </p>
                        <p className="ant-upload-text">
                            {t("institutTraducteurDetails.drag_drop_text", "Cliquez ou glissez le fichier ici pour l'uploader")}
                        </p>
                        <p className="ant-upload-hint">
                            {t("institutTraducteurDetails.file_format_hint", "Seuls les fichiers PDF sont acceptés")}
                        </p>
                    </Upload.Dragger>
                </div>
            </Modal>
        </div>
    )
}

export default InstitutTraducteurDossierATraiterDocument
