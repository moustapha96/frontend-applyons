
// "use client"

// import { useState, useEffect } from "react"
// import { Card, Table, Tag, Descriptions, Typography, Space, Spin, Alert, Button, Badge, Input, Form, Popover } from "antd"
// import {
//     MailOutlined,
//     PhoneOutlined,
//     GlobalOutlined,
//     EnvironmentOutlined,
//     FileTextOutlined,
//     EyeOutlined,
//     SearchOutlined,
//     InfoCircleOutlined,
// } from "@ant-design/icons"
// import { BankOutlined } from "@ant-design/icons"
// import { Link, useNavigate, useParams } from "react-router-dom"
// import { getDocumentPartageInstitut } from "@/services/partageService"
// import { useTranslation } from "react-i18next"
// import { CopyableFieldSimple } from "@/utils/CopyableField"

// import { message, Select } from "antd"
// import { } from "@ant-design/icons"
// import { getDossierATraiterInstitut } from "@/services/institutTraducteurService"
// import InstitutTraducteurBreadcrumb from "@/components/InstitutTraducteurBreadcrumb"
// import { useAuthContext } from "@/context"

// const InstitutTraducteurInstitutDetails = () => {
//     const { id } = useParams()
//     const { institut } = useAuthContext()
//     const [institutDetails, setInstitutDetails] = useState(null)
//     const [loading, setLoading] = useState(true)
//     const [error, setError] = useState(null)
//     const navigate = useNavigate()
//     const { t } = useTranslation()
//     const [demandes, setDemandes] = useState([])
//     const [searchText, setSearchText] = useState("")
//     const [form] = Form.useForm()
//     const [filterPeriode, setFilterPeriode] = useState(null)
//     const [filterYear, setFilterYear] = useState(null)
//     const [uniquePeriodes, setUniquePeriodes] = useState([])
//     const [uniqueYears, setUniqueYears] = useState([])

//     const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0)

//     useEffect(() => {
//         const handleResize = () => setWindowWidth(window.innerWidth)
//         window.addEventListener("resize", handleResize)
//         return () => window.removeEventListener("resize", handleResize)
//     }, [])

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 setLoading(true)
//                 const demoData = await getDocumentPartageInstitut(id);
//                 setInstitutDetails(demoData)
//             } catch (err) {
//                 setError("Erreur lors du chargement des données")
//             } finally {
//                 setLoading(false)
//             }
//         }

//         const fetchDemandes = async () => {
//             setLoading(true)
//             try {
//                 const data = await getDossierATraiterInstitut(institut.id, id)
//                 setDemandes(data)
//                 extractUniqueFilters(data)
//                 //console.log(data)
//             } catch (err) {
//                 message.error(t("institutTraducteur.error_fetching_requests"))
//             } finally {
//                 setLoading(false)
//             }
//         }
//         fetchDemandes()
//         fetchData()
//     }, [institut.id, id])



//     if (loading) {
//         return (
//             <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px" }}>
//                 <Spin fullscreen size="large" />
//             </div>
//         )
//     }

//     if (error) {
//         return <Alert message="Erreur" description={error} type="error" showIcon />
//     }


//     const extractUniqueFilters = (data) => {
//         const periodes = [...new Set(data.map((item) => item.periode))].sort()
//         const years = [...new Set(data.map((item) => item.year))].sort((a, b) => b - a)

//         setUniquePeriodes(periodes)
//         setUniqueYears(years)
//     }

//     const handlePeriodeFilter = (periode) => {
//         setFilterPeriode(periode)
//     }

//     const handleYearFilter = (year) => {
//         setFilterYear(year)
//     }

//     const resetFilters = () => {
//         setFilterPeriode(null)
//         setFilterYear(null)
//     }

//     const getFilteredData = () => {
//         return demandes.filter((item) => {
//             const matchesSearch =
//                 item.code.toLowerCase().includes(searchText.toLowerCase()) ||
//                 item.demandeur.name.toLowerCase().includes(searchText.toLowerCase())

//             const matchesPeriode = filterPeriode ? item.periode === filterPeriode : true
//             const matchesYear = filterYear ? item.year === filterYear : true

//             return matchesSearch && matchesPeriode && matchesYear
//         })
//     }

//     const translatePeriode = (periode) => {
//         switch (periode) {
//             case "Printemps":
//                 return t("institutTraducteur.periode_1")
//             case "Été":
//                 return t("institutTraducteur.periode_2")
//             case "Automne":
//                 return t("institutTraducteur.periode_3")
//             case "Hiver":
//                 return t("institutTraducteur.periode_4")
//             case "Autre":
//                 return t("institutTraducteur.periode_5")
//             default:
//                 return periode
//         }
//     }


//     const getResponsiveColumns = () => {
//         const baseColumns = [
//             {
//                 title: t("institutTraducteur.requester"),
//                 dataIndex: "demandeur",
//                 key: "demandeur",
//                 render: (_, record) => (record.demandeur ?
//                     <>
//                         <Link to={`/institut-traducteur/demandeur/${record.demandeur.id}/details`}>
//                             <Tag color="blue">{record.demandeur.name}</Tag>
//                         </Link>
//                     </>
//                     :
//                     <span>N/A</span>),
//                 sorter: (a, b) => a.demandeur?.name.localeCompare(b.demandeur?.name),
//             },
//             {
//                 title: t("institutTraducteur.periode"),
//                 dataIndex: "periode",
//                 key: "periode",
//                 render: (_, record) => (
//                     <Tag color="blue">
//                         {translatePeriode(record.periode)} - {record.year}
//                     </Tag>
//                 ),
//                 sorter: (a, b) => a.periode - b.periode,
//             },
//             {
//                 title: t("institutTraducteur.code"),
//                 dataIndex: "code",
//                 key: "code",
//                 render: (_, record) => (
//                     <Tag color="blue">
//                         <span>{record.code}</span>
//                         {/* <CopyableFieldSimple value={record.code} /> */}
//                     </Tag>
//                 ),
//                 sorter: (a, b) => a.code.localeCompare(b.code),
//             },
//             {
//                 title: t("institutTraducteur.request_date"),
//                 dataIndex: "dateDemande",
//                 key: "dateDemande",
//                 render: (date) => new Date(date).toLocaleDateString(),
//                 sorter: (a, b) => new Date(a.dateDemande) - new Date(b.dateDemande),
//                 responsive: ["md"],
//             },

//             {
//                 title: t("institutTraducteur.documents"),
//                 dataIndex: "documentPartages",
//                 key: "documentPartages",
//                 render: (docs, record) => (
//                     <Link to={`/institut-traducteur/dossier-a-traiter/${record.id}/documents`}>
//                         <Tag color="blue">{docs.length} document(s)</Tag>
//                     </Link>
//                 ),
//                 responsive: ["md"],
//             },
//             {
//                 title: t("institutTraducteur.actions"),
//                 key: "actions",
//                 render: (_, record) => (
//                     <Space size="small" wrap>
//                         <Link
//                             to={`/institut-traducteur/dossier-a-traiter/${record.id}/details`}
//                         >
//                             <Button
//                                 className="ant-btn-primary"
//                                 icon={<EyeOutlined />}
//                                 title="Voir les détails de la demande"
//                                 size={windowWidth < 768 ? "small" : "middle"}
//                             >
//                                 {windowWidth >= 576 ? t("institutTraducteur.details") : ""}
//                             </Button>
//                         </Link>

//                         <Popover
//                             content={
//                                 <div style={{ maxWidth: "400px" }}>
//                                     <Space direction="vertical">
//                                         <div>
//                                             <strong>{t("institutTraducteur.requester")}:</strong>
//                                             <p>{record.demandeur.name}</p>
//                                             <p>
//                                                 {record.demandeur.type} - {record.demandeur.paysResidence}
//                                             </p>
//                                             <p>
//                                                 {t("institutTraducteur.email")}: {record.demandeur.email}
//                                             </p>
//                                             <p>
//                                                 {t("institutTraducteur.phone")}: {record.demandeur.phone}
//                                             </p>
//                                         </div>
//                                         {record.documentPartages.length > 0 && (
//                                             <div>
//                                                 <strong>{t("institutTraducteur.documents")}:</strong>
//                                                 {record.documentPartages.map((doc, index) => (
//                                                     <div key={index} style={{ marginTop: "8px" }}>
//                                                         <p>
//                                                             {doc.intitule} - {doc.typeDocument}
//                                                         </p>
//                                                         <p>
//                                                             {" "}
//                                                             {t("institutTraducteur.dna_code")} : {doc.codeAdn}
//                                                         </p>
//                                                         <Tag color={doc.statut === "ACCEPTED" ? "success" : "processing"}>
//                                                             {t(`institutTraducteur.status.${doc.statut.toLowerCase()}`)}
//                                                         </Tag>
//                                                     </div>
//                                                 ))}
//                                             </div>
//                                         )}
//                                     </Space>
//                                 </div>
//                             }
//                             title={t("institutTraducteur.request_details")}
//                             trigger="click"
//                             placement="right"
//                         >
//                             <Button icon={<InfoCircleOutlined />} className="ant-btn-primary" size={windowWidth < 768 ? "small" : "middle"} />
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
//         <div style={{ padding: "24px" }}>
//             <InstitutTraducteurBreadcrumb title={t("institutTraducteur.institut_details")} SubTitle={institut.name} />

//             <Space direction="vertical" size="large" style={{ width: "100%" }}>
//                 <Card
//                     title={
//                         <Space>
//                             <BankOutlined />
//                             <span>{t("institutTraducteur.institute_information")}</span>
//                         </Space>
//                     }
//                 >
//                     {institutDetails && <>

//                         <Descriptions bordered>
//                             <Descriptions.Item label={t("institutTraducteur.name")} span={3}>
//                                 {institutDetails.name}
//                             </Descriptions.Item>
//                             <Descriptions.Item label={t("institutTraducteur.type")} span={2}>
//                                 {institutDetails.type}
//                             </Descriptions.Item>
//                             <Descriptions.Item label={t("institutTraducteur.country")}>{institutDetails.paysResidence}</Descriptions.Item>
//                             <Descriptions.Item label={t("institutTraducteur.email")} span={2}>
//                                 <Space>
//                                     <MailOutlined />
//                                     {institutDetails.email}
//                                 </Space>
//                             </Descriptions.Item>
//                             <Descriptions.Item label={t("institutTraducteur.phone")}>
//                                 <Space>
//                                     <PhoneOutlined />
//                                     {institutDetails.phone}
//                                 </Space>
//                             </Descriptions.Item>
//                             <Descriptions.Item label={t("institutTraducteur.address")} span={3}>
//                                 <Space>
//                                     <EnvironmentOutlined />
//                                     {institutDetails.adresse}
//                                 </Space>
//                             </Descriptions.Item>
//                             <Descriptions.Item label={t("admin.website")} span={3}>
//                                 <Space>
//                                     <GlobalOutlined />
//                                     <a href={institutDetails.siteWeb} target="_blank" rel="noopener noreferrer">
//                                         {institutDetails.siteWeb}
//                                     </a>
//                                 </Space>
//                             </Descriptions.Item>
//                             <Descriptions.Item label="Code utilisateur" span={3}>
//                                 <Tag color="green">{institutDetails.codeUser}</Tag>
//                             </Descriptions.Item>
//                         </Descriptions>
//                     </>}
//                     {loading && (<Spin />)}
//                 </Card>

//                 {/* Tableau des demandes */}
//                 <Card>
//                     <div
//                         style={{
//                             marginBottom: 16,
//                             display: "flex",
//                             justifyContent: "space-between",
//                             flexWrap: "wrap",
//                             gap: "10px",
//                         }}
//                     >
//                         <Input
//                             placeholder={t("institutTraducteur.search_placeholder")}
//                             prefix={<SearchOutlined />}
//                             value={searchText}
//                             onChange={(e) => setSearchText(e.target.value)}
//                             style={{ width: "100%", maxWidth: 300 }}
//                         />
//                         <Space wrap>
//                             <Select
//                                 placeholder={t("institutTraducteur.select_periode")}
//                                 style={{ width: 120 }}
//                                 allowClear
//                                 onChange={handlePeriodeFilter}
//                                 value={filterPeriode}
//                             >
//                                 {uniquePeriodes.map((periode) => (
//                                     <Select.Option key={periode} value={periode}>
//                                         {translatePeriode(periode)}
//                                     </Select.Option>
//                                 ))}
//                             </Select>
//                             <Select
//                                 placeholder={t("institutTraducteur.select_year")}
//                                 style={{ width: 120 }}
//                                 allowClear
//                                 onChange={handleYearFilter}
//                                 value={filterYear}
//                             >
//                                 {uniqueYears.map((year) => (
//                                     <Select.Option key={year} value={year}>
//                                         {year}
//                                     </Select.Option>
//                                 ))}
//                             </Select>
//                             <Button onClick={resetFilters} type="default">
//                                 {t("common.reset_filters")}
//                             </Button>
//                         </Space>
//                     </div>
//                     <div style={tableContainerStyle}>
//                         <Table
//                             columns={columns}
//                             dataSource={getFilteredData()}
//                             rowKey="id"
//                             loading={loading}
//                             pagination={{
//                                 defaultPageSize: 5,
//                                 showSizeChanger: true,
//                                 showTotal: (total) =>
//                                     `${t("institutTraducteur.total")} ${total} ${t("institutTraducteur.requests")}`,
//                             }}
//                             scroll={{ x: "max-content" }}
//                             className="responsive-table"
//                         />
//                     </div>
//                 </Card>
//             </Space>
//         </div>
//     )
// }

// export default InstitutTraducteurInstitutDetails

"use client"

import { useState, useEffect, useMemo } from "react"
import {
    Card,
    Table,
    Tag,
    Descriptions,
    Typography,
    Space,
    Spin,
    Alert,
    Button,
    Badge,
    Input,
    Form,
    Popover,
    Dropdown,
    Menu,
    Row,
    Col,
    Statistic,
} from "antd"
import {
    MailOutlined,
    PhoneOutlined,
    GlobalOutlined,
    EnvironmentOutlined,
    FileTextOutlined,
    EyeOutlined,
    SearchOutlined,
    InfoCircleOutlined,
    DownloadOutlined,
    UploadOutlined,
    MoreOutlined,
    UserOutlined,
    CalendarOutlined,
    FileOutlined,
    CheckCircleOutlined,
} from "@ant-design/icons"
import { BankOutlined } from "@ant-design/icons"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getDocumentPartageInstitut } from "@/services/partageService"
import { useTranslation } from "react-i18next"

import { message, Select } from "antd"
import { getDossierATraiterInstitut } from "@/services/institutTraducteurService"
import InstitutTraducteurBreadcrumb from "@/components/InstitutTraducteurBreadcrumb"
import { useAuthContext } from "@/context"

const { Title, Text } = Typography

const InstitutTraducteurInstitutDetails = () => {
    const { id } = useParams()
    const { institut } = useAuthContext()
    const [institutDetails, setInstitutDetails] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const { t } = useTranslation()
    const [demandes, setDemandes] = useState([])
    const [searchText, setSearchText] = useState("")
    const [form] = Form.useForm()
    const [filterPeriode, setFilterPeriode] = useState(null)
    const [filterYear, setFilterYear] = useState(null)
    const [uniquePeriodes, setUniquePeriodes] = useState([])
    const [uniqueYears, setUniqueYears] = useState([])

    const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0)

    const handleResize = () => setWindowWidth(window.innerWidth)

    const fetchData = async () => {
        try {
            setLoading(true)
            const demoData = await getDocumentPartageInstitut(id)
            setInstitutDetails(demoData)
        } catch (err) {
            setError("Erreur lors du chargement des données")
        } finally {
            setLoading(false)
        }
    }

    const fetchDemandes = async () => {
        setLoading(true)
        try {
            const data = await getDossierATraiterInstitut(institut.id, id)
            setDemandes(data)
            extractUniqueFilters(data)
        } catch (err) {
            message.error(t("institutTraducteur.error_fetching_requests"))
        } finally {
            setLoading(false)
        }
    }

    const extractUniqueFilters = (data) => {
        const periodes = [...new Set(data.map((item) => item.periode))].sort()
        const years = [...new Set(data.map((item) => item.year))].sort((a, b) => b - a)

        setUniquePeriodes(periodes)
        setUniqueYears(years)
    }

    const handlePeriodeFilter = (periode) => {
        setFilterPeriode(periode)
    }

    const handleYearFilter = (year) => {
        setFilterYear(year)
    }

    const resetFilters = () => {
        setFilterPeriode(null)
        setFilterYear(null)
    }

    const filteredData = useMemo(() => {
        return demandes.filter((item) => {
            const matchesSearch =
                item.code.toLowerCase().includes(searchText.toLowerCase()) ||
                item.demandeur.name.toLowerCase().includes(searchText.toLowerCase())

            const matchesPeriode = filterPeriode ? item.periode === filterPeriode : true
            const matchesYear = filterYear ? item.year === filterYear : true

            return matchesSearch && matchesPeriode && matchesYear
        })
    }, [demandes, searchText, filterPeriode, filterYear])

    const statistics = useMemo(() => {
        const total = demandes.length
        const completed = demandes.filter((d) => d.documentPartages.some((doc) => doc.statut === "ACCEPTED")).length
        const pending = total - completed
        const totalDocuments = demandes.reduce((acc, d) => acc + d.documentPartages.length, 0)

        return { total, completed, pending, totalDocuments }
    }, [demandes])

    const translatePeriode = (periode) => {
        switch (periode) {
            case "Printemps":
                return t("institutTraducteur.periode_1")
            case "Été":
                return t("institutTraducteur.periode_2")
            case "Automne":
                return t("institutTraducteur.periode_3")
            case "Hiver":
                return t("institutTraducteur.periode_4")
            case "Autre":
                return t("institutTraducteur.periode_5")
            default:
                return periode
        }
    }

    const getActionMenu = (record) => (
        <Menu>
            <Menu.Item key="download" icon={<DownloadOutlined />}>
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault()
                        console.log("Télécharger:", record.id)
                    }}
                >
                    Télécharger
                </a>
            </Menu.Item>
            <Menu.Item key="upload" icon={<UploadOutlined />}>
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault()
                        console.log("Téléverser:", record.id)
                    }}
                >
                    Téléverser
                </a>
            </Menu.Item>
            <Menu.Item key="details" icon={<EyeOutlined />}>
                <Link to={`/institut-traducteur/dossier-a-traiter/${record.id}/details`}>
                    {t("institutTraducteur.details")}
                </Link>
            </Menu.Item>
        </Menu>
    )

    const getResponsiveColumns = () => {
        const baseColumns = [
            {
                title: t("institutTraducteur.requester"),
                dataIndex: "demandeur",
                key: "demandeur",
                render: (_, record) =>
                    record.demandeur ? (
                        <>
                            <Link to={`/institut-traducteur/demandeur/${record.demandeur.id}/details`}>
                                <Tag color="blue">{record.demandeur.name}</Tag>
                            </Link>
                        </>
                    ) : (
                        <span>N/A</span>
                    ),
                sorter: (a, b) => a.demandeur?.name.localeCompare(b.demandeur?.name),
            },
            {
                title: t("institutTraducteur.periode"),
                dataIndex: "periode",
                key: "periode",
                render: (_, record) => (
                    <Tag color="blue">
                        {translatePeriode(record.periode)} - {record.year}
                    </Tag>
                ),
                sorter: (a, b) => a.periode - b.periode,
            },
            {
                title: t("institutTraducteur.code"),
                dataIndex: "code",
                key: "code",
                render: (_, record) => (
                    <Tag color="blue">
                        <span>{record.code}</span>
                    </Tag>
                ),
                sorter: (a, b) => a.code.localeCompare(b.code),
            },
            {
                title: t("institutTraducteur.request_date"),
                dataIndex: "dateDemande",
                key: "dateDemande",
                render: (date) => new Date(date).toLocaleDateString(),
                sorter: (a, b) => new Date(a.dateDemande) - new Date(b.dateDemande),
                responsive: ["md"],
            },
            {
                title: t("institutTraducteur.documents"),
                dataIndex: "documentPartages",
                key: "documentPartages",
                render: (docs, record) => (
                    <Link to={`/institut-traducteur/dossier-a-traiter/${record.id}/documents`}>
                        <Tag color="blue">{docs.length}  {t('common.documents')} </Tag>
                    </Link>
                ),
                responsive: ["md"],
            },
            {
                title: t("institutTraducteur.actions"),
                key: "actions",
                render: (_, record) => (
                    <Space size="small" wrap>
                        <Dropdown overlay={getActionMenu(record)} trigger={["click"]} placement="bottomRight">
                            <Button type="primary" icon={<MoreOutlined />} size={windowWidth < 768 ? "small" : "middle"}>
                                {t('common.actions')}
                            </Button>
                        </Dropdown>

                        <Popover
                            content={
                                <div style={{ maxWidth: "400px" }}>
                                    <Space direction="vertical">
                                        <div>
                                            <strong>{t("institutTraducteur.requester")}:</strong>
                                            <p>{record.demandeur.name}</p>
                                            <p>
                                                {record.demandeur.type} - {record.demandeur.paysResidence}
                                            </p>
                                            <p>
                                                {t("institutTraducteur.email")}: {record.demandeur.email}
                                            </p>
                                            <p>
                                                {t("institutTraducteur.phone")}: {record.demandeur.phone}
                                            </p>
                                        </div>
                                        {record.documentPartages.length > 0 && (
                                            <div>
                                                <strong>{t("institutTraducteur.documents")}:</strong>
                                                {record.documentPartages.map((doc, index) => (
                                                    <div key={index} style={{ marginTop: "8px" }}>
                                                        <p>
                                                            {doc.intitule} - {doc.typeDocument}
                                                        </p>
                                                        <p>
                                                            {t("institutTraducteur.dna_code")} : {doc.codeAdn}
                                                        </p>
                                                        <Tag color={doc.statut === "ACCEPTED" ? "success" : "processing"}>
                                                            {t(`institutTraducteur.status.${doc.statut.toLowerCase()}`)}
                                                        </Tag>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </Space>
                                </div>
                            }
                            title={t("institutTraducteur.request_details")}
                            trigger="click"
                            placement="right"
                        >
                            <Button icon={<InfoCircleOutlined />} size={windowWidth < 768 ? "small" : "middle"} />
                        </Popover>
                    </Space>
                ),
            },
        ]

        return baseColumns
    }

    const columns = getResponsiveColumns()

    useEffect(() => {
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    useEffect(() => {
        fetchDemandes()
        fetchData()
    }, [institut.id, id])

    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px" }}>
                <Spin size="large" />
            </div>
        )
    }

    if (error) {
        return <Alert message="Erreur" description={error} type="error" showIcon />
    }

    return (
        <div
            style={{
                padding: "24px",
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
                minHeight: "100vh",
            }}
        >
            <InstitutTraducteurBreadcrumb title={t("institutTraducteur.institut_details")} SubTitle={institut.name} />

            <Space direction="vertical" size="large" style={{ width: "100%" }}>
                {/* <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} md={6}>
                        <Card>
                            <Statistic
                                title="Total Demandes"
                                value={statistics.total}
                                prefix={<UserOutlined style={{ color: "#1890ff" }} />}
                                valueStyle={{ color: "#1890ff" }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Card>
                            <Statistic
                                title="Demandes Complétées"
                                value={statistics.completed}
                                prefix={<CheckCircleOutlined style={{ color: "#52c41a" }} />}
                                valueStyle={{ color: "#52c41a" }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Card>
                            <Statistic
                                title="En Attente"
                                value={statistics.pending}
                                prefix={<CalendarOutlined style={{ color: "#faad14" }} />}
                                valueStyle={{ color: "#faad14" }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Card>
                            <Statistic
                                title="Total Documents"
                                value={statistics.totalDocuments}
                                prefix={<FileOutlined style={{ color: "#722ed1" }} />}
                                valueStyle={{ color: "#722ed1" }}
                            />
                        </Card>
                    </Col>
                </Row> */}

                <Card
                    title={
                        <Space>
                            <BankOutlined style={{ color: "#1890ff" }} />
                            <span style={{ fontSize: "18px", fontWeight: 600 }}>{t("institutTraducteur.institute_information")}</span>
                        </Space>
                    }
                    style={{
                        borderRadius: "12px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        border: "1px solid #e8f4fd",
                    }}
                >
                    {institutDetails && (
                        <Descriptions bordered column={{ xs: 1, sm: 2, md: 3 }}>
                            <Descriptions.Item label={t("institutTraducteur.name")} span={3}>
                                <Text strong style={{ fontSize: "16px", color: "#1890ff" }}>
                                    {institutDetails.name}
                                </Text>
                            </Descriptions.Item>
                            <Descriptions.Item label={t("institutTraducteur.type")} span={2}>
                                <Tag color="blue">{institutDetails.type}</Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label={t("institutTraducteur.country")}>
                                <Tag color="green">{institutDetails.paysResidence}</Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label={t("institutTraducteur.email")} span={2}>
                                <Space>
                                    <MailOutlined style={{ color: "#1890ff" }} />
                                    <a href={`mailto:${institutDetails.email}`}>{institutDetails.email}</a>
                                </Space>
                            </Descriptions.Item>
                            <Descriptions.Item label={t("institutTraducteur.phone")}>
                                <Space>
                                    <PhoneOutlined style={{ color: "#52c41a" }} />
                                    <a href={`tel:${institutDetails.phone}`}>{institutDetails.phone}</a>
                                </Space>
                            </Descriptions.Item>
                            <Descriptions.Item label={t("institutTraducteur.address")} span={3}>
                                <Space>
                                    <EnvironmentOutlined style={{ color: "#fa8c16" }} />
                                    {institutDetails.adresse}
                                </Space>
                            </Descriptions.Item>
                            {institutDetails.siteWeb && (
                            <Descriptions.Item label={t("admin.website")} span={3}>
                                <Space>
                                    <GlobalOutlined style={{ color: "#722ed1" }} />
                                    <a href={institutDetails.siteWeb} target="_blank" rel="noopener noreferrer">
                                        {institutDetails.siteWeb}
                                    </a>
                                </Space>
                            </Descriptions.Item>
                            ) }
                            <Descriptions.Item label="Code utilisateur" span={3}>
                                <Tag color="green" style={{ fontSize: "14px", padding: "4px 12px" }}>
                                    {institutDetails.codeUser}
                                </Tag>
                            </Descriptions.Item>
                        </Descriptions>
                    )}
                    {loading && <Spin />}
                </Card>

                <Card
                    title={
                        <Space>
                            <FileTextOutlined style={{ color: "#1890ff" }} />
                            <span style={{ fontSize: "18px", fontWeight: 600 }}>{(t("institutTraducteur.demande_de_traduction"))}  </span>
                            <Badge count={filteredData.length} style={{ backgroundColor: "#52c41a" }} />
                        </Space>
                    }
                    style={{
                        borderRadius: "12px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        border: "1px solid #e8f4fd",
                    }}
                >
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
                            placeholder={t("institutTraducteur.search_placeholder")}
                            prefix={<SearchOutlined />}
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            style={{
                                width: "100%",
                                maxWidth: 300,
                                borderRadius: "8px",
                            }}
                        />
                        <Space wrap>
                            <Select
                                placeholder={t("institutTraducteur.select_periode")}
                                style={{ width: 120, borderRadius: "8px" }}
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
                                placeholder={t("institutTraducteur.select_year")}
                                style={{ width: 120, borderRadius: "8px" }}
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
                            <Button onClick={resetFilters} type="default" style={{ borderRadius: "8px" }}>
                                {t("common.reset_filters")}
                            </Button>
                        </Space>
                    </div>
                    <div style={{ overflowX: "auto", width: "100%", maxWidth: "100%" }}>
                        <Table
                            columns={columns}
                            dataSource={filteredData}
                            rowKey="id"
                            loading={loading}
                            pagination={{
                                defaultPageSize: 10,
                                showSizeChanger: true,
                                showQuickJumper: true,
                                showTotal: (total, range) => `${range[0]}-${range[1]} sur ${total} demandes`,
                                pageSizeOptions: ["5", "10", "20", "50"],
                            }}
                            scroll={{ x: "max-content" }}
                            className="responsive-table"
                            style={{
                                borderRadius: "8px",
                                overflow: "hidden",
                            }}
                        />
                    </div>
                </Card>
            </Space>
        </div>
    )
}

export default InstitutTraducteurInstitutDetails
