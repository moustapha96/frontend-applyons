// "use client";

// import { useState, useEffect, useContext } from "react";
// import { useAuthContext } from "../../../context/useAuthContext";
// import { useTranslation } from "react-i18next";
// import { message, Input, Button, Card, Table, Spin, Tag, Space, Popover, Select } from "antd";
// import { SearchOutlined, EyeOutlined, InfoCircleOutlined } from "@ant-design/icons";
// import { Link } from "react-router-dom";
// import { FileText, Loader2 } from "lucide-react";
// import { CopyableFieldSimple } from "@/utils/CopyableField";
// import * as yup from "yup";
// import InstitutTraducteurBreadcrumb from "@/components/InstitutTraducteurBreadcrumb";
// import { getDossierAtraiter } from "@/services/institutTraducteurService";


// const InstitutTraducteurDossierATraiter = () => {
//     const { institut } = useAuthContext();
//     const { t } = useTranslation();
//     const [loading, setLoading] = useState(true);
//     const [demandes, setDemandes] = useState([]);
//     const [searchText, setSearchText] = useState("");
//     const [filterPeriode, setFilterPeriode] = useState(null);
//     const [filterYear, setFilterYear] = useState(null);
//     const [uniquePeriodes, setUniquePeriodes] = useState([]);
//     const [uniqueYears, setUniqueYears] = useState([]);
//     const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0);

//     useEffect(() => {
//         const handleResize = () => setWindowWidth(window.innerWidth);
//         window.addEventListener("resize", handleResize);
//         return () => window.removeEventListener("resize", handleResize);
//     }, []);


//     useEffect(() => {
//         fetchDossierAtraiter();
//         scrollTo(0, 0);
//     }, [institut]);


//     const fetchDossierAtraiter = async () => {
//         try {
//             setLoading(true);
//             const data = await getDossierAtraiter(institut.id);
//             console.log("Dossier à traiter data:", data);
//             setDemandes(data);
//             extractUniqueFilters(data);
//         } catch (err) {
//             console.error(t("institutTraducteur.error_fetching_requests"), err);
//             message.error(t("institutTraducteur.error_fetching_requests"));
//         } finally {
//             setLoading(false);
//         }
//     };

//     const extractUniqueFilters = (data) => {
//         const periodes = [...new Set(data.map((item) => item.periode))].sort();
//         const years = [...new Set(data.map((item) => item.year))].sort((a, b) => b - a);
//         setUniquePeriodes(periodes);
//         setUniqueYears(years);
//     };

//     const handlePeriodeFilter = (periode) => {
//         setFilterPeriode(periode);
//     };

//     const handleYearFilter = (year) => {
//         setFilterYear(year);
//     };

//     const resetFilters = () => {
//         setFilterPeriode(null);
//         setFilterYear(null);
//     };

//     const getFilteredData = () => {
//         return demandes.filter((item) => {
//             const matchesSearch =
//                 item.code.toLowerCase().includes(searchText.toLowerCase()) ||
//                 item.demandeur.name.toLowerCase().includes(searchText.toLowerCase());
//             const matchesPeriode = filterPeriode ? item.periode === filterPeriode : true;
//             const matchesYear = filterYear ? item.year === filterYear : true;
//             return matchesSearch && matchesPeriode && matchesYear;
//         });
//     };

//     const translatePeriode = (periode) => {
//         switch (periode) {
//             case "Printemps":
//                 return t("institutTraducteur.periode_1");
//             case "Été":
//                 return t("institutTraducteur.periode_2");
//             case "Automne":
//                 return t("institutTraducteur.periode_3");
//             case "Hiver":
//                 return t("institutTraducteur.periode_4");
//             case "Autre":
//                 return t("institutTraducteur.periode_5");
//             default:
//                 return periode;
//         }
//     };


//     const getResponsiveColumns = () => {
//         const baseColumns = [
//             {
//                 title: t("institutTraducteur.institute"),
//                 dataIndex: "institut",
//                 key: "institut",
//                 render: (_, record) =>
//                     record.institut ? (
//                         <Link
//                             to={`/institut-traducteur/institut/${record.institut.id}/details`}
//                             className="text-primary hover:text-primary-light transition-colors duration-200 flex items-center gap-1"
//                         >
//                             {record.institut.name}
//                         </Link>
//                     ) : (
//                         "N/A"
//                     ),
//                 sorter: (a, b) => (a.institut?.name && b.institut?.name ? a.institut.name.localeCompare(b.institut.name) : 0),
//             },
//             {
//                 title: t("institutTraducteur.requester"),
//                 dataIndex: "demandeur",
//                 key: "demandeur",
//                 render: (_, record) =>
//                     record.demandeur ? (
//                         <Link to={`/institut-traducteur/demandeur/${record.demandeur.id}/details`}>
//                             <Tag color="blue">{record.demandeur.name}</Tag>
//                         </Link>
//                     ) : (
//                         <span>N/A</span>
//                     ),
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
//                 sorter: (a, b) => a.periode.localeCompare(b.periode),
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
//                         <Link to={`/institut-traducteur/dossier-a-traiter/${record.id}/details`}>
//                             <Button icon={<EyeOutlined />} className="ant-btn-primary" type="default" size={windowWidth < 768 ? "small" : "middle"}>
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
//         ];
//         return baseColumns;
//     };

//     const columns = getResponsiveColumns();
//     const tableContainerStyle = {
//         overflowX: "auto",
//         width: "100%",
//         maxWidth: "100%",
//     };

//     return (
//         <>
//             <div style={{ background: "#f0f2f5", minHeight: "100vh" }}>
//                 <InstitutTraducteurBreadcrumb title={t("institutTraducteur.dossierATraiter")} SubTitle={institut?.name} />
//                 <section className="py-6">
//                     <div className="container max-w-6xl mx-auto px-4">
//                         <div className="bg-white rounded-xl shadow-xl overflow-hidden">

//                             <div className="flex border-b border-gray-200">
//                                 <button className="flex items-center py-4 px-6 font-medium transition-colors duration-200 text-blueLogo">
//                                     <FileText className="w-5 h-5 mr-2" />
//                                     {t("institutTraducteur.assigned_requests_list")}
//                                 </button>
//                             </div>
//                             <div className="p-6">
//                                 <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px" }}>
//                                     <Card>
//                                         <div
//                                             style={{
//                                                 marginBottom: 16,
//                                                 display: "flex",
//                                                 justifyContent: "space-between",
//                                                 flexWrap: "wrap",
//                                                 gap: "10px",
//                                             }}
//                                         >
//                                             <Input
//                                                 placeholder={t("institutTraducteur.search_placeholder")}
//                                                 prefix={<SearchOutlined />}
//                                                 value={searchText}
//                                                 onChange={(e) => setSearchText(e.target.value)}
//                                                 style={{ width: "100%", maxWidth: 300 }}
//                                             />
//                                             <Space wrap>
//                                                 <Select
//                                                     placeholder={t("institutTraducteur.select_periode")}
//                                                     style={{ width: 120 }}
//                                                     allowClear
//                                                     onChange={handlePeriodeFilter}
//                                                     value={filterPeriode}
//                                                 >
//                                                     {uniquePeriodes.map((periode) => (
//                                                         <Select.Option key={periode} value={periode}>
//                                                             {translatePeriode(periode)}
//                                                         </Select.Option>
//                                                     ))}
//                                                 </Select>
//                                                 <Select
//                                                     placeholder={t("institutTraducteur.select_year")}
//                                                     style={{ width: 120 }}
//                                                     allowClear
//                                                     onChange={handleYearFilter}
//                                                     value={filterYear}
//                                                 >
//                                                     {uniqueYears.map((year) => (
//                                                         <Select.Option key={year} value={year}>
//                                                             {year}
//                                                         </Select.Option>
//                                                     ))}
//                                                 </Select>
//                                                 <Button onClick={resetFilters} className="ant-btn-primary" type="default">
//                                                     {t("common.reset_filters")}
//                                                 </Button>
//                                             </Space>
//                                         </div>
//                                         <div style={tableContainerStyle}>
//                                             <Table
//                                                 columns={columns}
//                                                 dataSource={getFilteredData()}
//                                                 rowKey="id"
//                                                 loading={loading}
//                                                 pagination={{
//                                                     defaultPageSize: 5,
//                                                     showSizeChanger: true,
//                                                     showTotal: (total) => `${t("institutTraducteur.total")} ${total} ${t("institutTraducteur.requests")}`,
//                                                 }}
//                                                 scroll={{ x: "max-content" }}
//                                                 className="responsive-table"
//                                             />
//                                         </div>
//                                     </Card>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//             </div>

//         </>
//     );
// };

// export default InstitutTraducteurDossierATraiter;

"use client"

import { useState, useEffect, useMemo, use } from "react"
import { useAuthContext } from "../../../context/useAuthContext"
import { useTranslation } from "react-i18next"
import {
    message,
    Input,
    Button,
    Card,
    Table,
    Tag,
    Space,
    Popover,
    Select,
    Dropdown,
    Menu,
    Row,
    Col,
    Statistic,
    Typography,
} from "antd"
import {
    SearchOutlined,
    EyeOutlined,
    InfoCircleOutlined,
    DownloadOutlined,
    UploadOutlined,
    MoreOutlined,
    FileTextOutlined,
    UserOutlined,
    CalendarOutlined,
    DatabaseOutlined,
} from "@ant-design/icons"
import { Link, useNavigate } from "react-router-dom"
import { FileText } from "lucide-react"
import InstitutTraducteurBreadcrumb from "@/components/InstitutTraducteurBreadcrumb"
import { getDossierAtraiter } from "@/services/institutTraducteurService"

const { Title } = Typography

const InstitutTraducteurDossierATraiter = () => {
    const { institut } = useAuthContext()
    const { t } = useTranslation()
    const navigate = useNavigate()
    
    const [loading, setLoading] = useState(true)
    const [demandes, setDemandes] = useState([])
    const [searchText, setSearchText] = useState("")
    const [filterPeriode, setFilterPeriode] = useState(null)
    const [filterYear, setFilterYear] = useState(null)
    const [uniquePeriodes, setUniquePeriodes] = useState([])
    const [uniqueYears, setUniqueYears] = useState([])
    const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0)

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth)
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    useEffect(() => {
        fetchDossierAtraiter()
        scrollTo(0, 0)
    }, [institut])

    const fetchDossierAtraiter = async () => {
        try {
            setLoading(true)
            const data = await getDossierAtraiter(institut.id)
            console.log("Dossier à traiter data:", data)
            setDemandes(data)
            extractUniqueFilters(data)
        } catch (err) {
            console.error(t("institutTraducteur.error_fetching_requests"), err)
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
        const total = filteredData.length
        const withDocuments = filteredData.filter((item) => item.documentPartages.length > 0).length
        const uniqueRequesters = new Set(filteredData.map((item) => item.demandeur.id)).size
        const currentYear = new Date().getFullYear()
        const thisYear = filteredData.filter((item) => item.year === currentYear).length

        return { total, withDocuments, uniqueRequesters, thisYear }
    }, [filteredData])

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

    const getActionMenu = (record) => {
        const handleDownload = () => {
            message.success(`${t("institutTraducteur.download")}: ${record.code}`)
            // Implement download logic here
        }

        const handleUpload = () => {
            message.info(`${t("institutTraducteur.upload")}: ${record.code}`)
            // Implement upload logic here
        }

        const handleDetails = () => {
            // Navigate to details page
            navigate(`/institut-traducteur/dossier-a-traiter/${record.id}/details`);
            // window.location.href = `/institut-traducteur/dossier-a-traiter/${record.id}/details`
        }

        const menu = (
            <Menu>
                {/* <Menu.Item key="download" icon={<DownloadOutlined />} onClick={handleDownload}>
                    {t("institutTraducteur.download")}
                </Menu.Item>
                <Menu.Item key="upload" icon={<UploadOutlined />} onClick={handleUpload}>
                    {t("institutTraducteur.upload")}
                </Menu.Item> */}
                <Menu.Item key="details" icon={<EyeOutlined />} onClick={handleDetails}>
                    {t("institutTraducteur.details")}
                </Menu.Item>
            </Menu>
        )

        return (
            <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
                <Button icon={<MoreOutlined />} size={windowWidth < 768 ? "small" : "middle"} className="action-dropdown-btn" />
            </Dropdown>
        )
    }

    const getResponsiveColumns = () => {
        const baseColumns = [
            // {
            //     title: t("institutTraducteur.institute"),
            //     dataIndex: "institut",
            //     key: "institut",
            //     render: (_, record) =>
            //         record.institut ? (
            //             <Link
            //                 to={`/institut-traducteur/institut/${record.institut.id}/details`}
            //                 className="text-blue-600 hover:text-blue-800 transition-colors duration-200 flex items-center gap-2"
            //             >
            //                 <DatabaseOutlined />
            //                 <span className="font-medium">{record.institut.name}</span>
            //             </Link>
            //         ) : (
            //             "N/A"
            //         ),
            //     sorter: (a, b) => (a.institut?.name && b.institut?.name ? a.institut.name.localeCompare(b.institut.name) : 0),
            // },
            {
                title: t("institutTraducteur.applican"),
                dataIndex: "demandeur",
                key: "demandeur",
                render: (_, record) =>
                    record.demandeur ? (
                        <Link to={`/institut-traducteur/demandeur/${record.demandeur.id}/details`}>
                            <Tag color="blue" className="flex items-center gap-1 w-fit">
                                <UserOutlined />
                                {record.demandeur.name}
                            </Tag>
                        </Link>
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
                    <Tag color="green" className="flex items-center gap-1 w-fit">
                        <CalendarOutlined />
                        {translatePeriode(record.periode)} - {record.year}
                    </Tag>
                ),
                sorter: (a, b) => a.periode.localeCompare(b.periode),
            },
            // {
            //     title: t("institutTraducteur.code"),
            //     dataIndex: "code",
            //     key: "code",
            //     render: (_, record) => (
            //         <Tag color="purple" className="font-mono">
            //             <FileTextOutlined className="mr-1" />
            //             {record.code}
            //         </Tag>
            //     ),
            //     sorter: (a, b) => a.code.localeCompare(b.code),
            // },
            {
                title: t("institutTraducteur.request_date"),
                dataIndex: "dateDemande",
                key: "dateDemande",
                render: (date) => <span className="text-gray-600">{new Date(date).toLocaleDateString()}</span>,
                sorter: (a, b) => new Date(a.dateDemande) - new Date(b.dateDemande),
                responsive: ["md"],
            },
            {
                title: t("institutTraducteur.documents"),
                dataIndex: "documentPartages",
                key: "documentPartages",
                render: (docs, record) => (
                    <Link to={`/institut-traducteur/dossier-a-traiter/${record.id}/documents`}>
                        <Tag color={docs.length > 0 ? "orange" : "default"} className="flex items-center gap-1 w-fit">
                            <FileTextOutlined />
                            {docs.length} document(s)
                        </Tag>
                    </Link>
                ),
                responsive: ["md"],
            },
            {
                title: t("institutTraducteur.actions"),
                key: "actions",
                width: 120,
                render: (_, record) => (
                    <Space size="small">
                        {getActionMenu(record)}
                        <Popover
                            content={
                                <div style={{ maxWidth: "400px" }}>
                                    <Space direction="vertical" className="w-full">
                                        <div className="border-b pb-3">
                                            <Title level={5} className="mb-2">
                                                <UserOutlined className="mr-2" />
                                                {t("institutTraducteur.requester")}
                                            </Title>
                                            <p className="font-medium">{record.demandeur.name}</p>
                                            <p className="text-gray-600">
                                                {record.demandeur.type} - {record.demandeur.paysResidence}
                                            </p>
                                            <p className="text-sm">
                                                <strong>{t("institutTraducteur.email")}:</strong> {record.demandeur.email}
                                            </p>
                                            <p className="text-sm">
                                                <strong>{t("institutTraducteur.phone")}:</strong> {record.demandeur.phone}
                                            </p>
                                        </div>
                                        {record.documentPartages.length > 0 && (
                                            <div>
                                                <Title level={5} className="mb-2">
                                                    <FileTextOutlined className="mr-2" />
                                                    {t("institutTraducteur.documents")}
                                                </Title>
                                                {record.documentPartages.map((doc, index) => (
                                                    <div key={index} className="bg-gray-50 p-3 rounded mb-2">
                                                        <p className="font-medium">
                                                            {doc.intitule} - {doc.typeDocument}
                                                        </p>
                                                        <p className="text-sm text-gray-600">
                                                            {t("institutTraducteur.dna_code")}: {doc.codeAdn}
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
                            title={
                                <span>
                                    <InfoCircleOutlined className="mr-2" />
                                    {t("institutTraducteur.request_details")}
                                </span>
                            }
                            trigger="click"
                            placement="left"
                        >
                            <Button
                                icon={<InfoCircleOutlined />}
                                size={windowWidth < 768 ? "small" : "middle"}
                                className="info-btn"
                            />
                        </Popover>
                    </Space>
                ),
            },
        ]
        return baseColumns
    }

    const columns = getResponsiveColumns()

    return (
        <div className="min-h-screen bg-gray-50">
            <InstitutTraducteurBreadcrumb title={t("institutTraducteur.dossierATraiter")} SubTitle={institut?.name} />

            <div className="container max-w-7xl mx-auto px-4 py-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <Title level={2} className="mb-0 text-gray-800">
                                <FileText className="inline mr-3 text-blue-600" size={28} />
                                {t("institutTraducteur.assigned_requests_list")}
                            </Title>
                        </div>

                        
                    </div>

                    <div className="p-6">
                        <Row gutter={[16, 16]} align="middle">
                            <Col xs={24} md={8}>
                                <Input
                                    placeholder={t("institutTraducteur.search_placeholder")}
                                    prefix={<SearchOutlined className="text-gray-400" />}
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                    size="large"
                                    allowClear
                                    className="rounded-lg"
                                />
                            </Col>
                            <Col xs={24} sm={12} md={4}>
                                <Select
                                    placeholder={t("institutTraducteur.select_periode")}
                                    style={{ width: "100%" }}
                                    size="large"
                                    allowClear
                                    onChange={handlePeriodeFilter}
                                    value={filterPeriode}
                                    className="rounded-lg"
                                >
                                    {uniquePeriodes.map((periode) => (
                                        <Select.Option key={periode} value={periode}>
                                            {translatePeriode(periode)}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Col>
                            <Col xs={24} sm={12} md={4}>
                                <Select
                                    placeholder={t("institutTraducteur.select_year")}
                                    style={{ width: "100%" }}
                                    size="large"
                                    allowClear
                                    onChange={handleYearFilter}
                                    value={filterYear}
                                    className="rounded-lg"
                                >
                                    {uniqueYears.map((year) => (
                                        <Select.Option key={year} value={year}>
                                            {year}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Col>
                            <Col xs={24} sm={12} md={4}>
                                <Button onClick={resetFilters} size="large" className="w-full rounded-lg" type="default">
                                    {t("common.reset_filters")}
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </div>

                <Card className="shadow-sm border border-gray-200 rounded-xl">
                    <Table
                        columns={columns}
                        dataSource={filteredData}
                        rowKey="id"
                        loading={loading}
                        pagination={{
                            defaultPageSize: 10,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            showTotal: (total, range) =>
                                `${t("institutTraducteur.showing")} ${range[0]}-${range[1]} ${t("institutTraducteur.of")} ${total} ${t("institutTraducteur.requests")}`,
                            pageSizeOptions: ["10", "20", "50", "100"],
                        }}
                        scroll={{ x: "max-content" }}
                        className="custom-table"
                        rowClassName="hover:bg-gray-50 transition-colors duration-200"
                    />
                </Card>
            </div>

            <style jsx>{`
                .custom-table .ant-table-thead > tr > th {
                    background: #fafafa;
                    font-weight: 600;
                    color: #262626;
                    border-bottom: 2px solid #f0f0f0;
                }
                
                .action-dropdown-btn:hover {
                    background: #f0f0f0;
                    border-color: #d9d9d9;
                }
                
                .info-btn:hover {
                    background: #e6f7ff;
                    border-color: #91d5ff;
                }
                
                .ant-tag {
                    border-radius: 6px;
                    font-weight: 500;
                }
                
                .ant-card {
                    border-radius: 12px;
                }
                
                .ant-input, .ant-select-selector {
                    border-radius: 8px;
                }
            `}</style>
        </div>
    )
}

export default InstitutTraducteurDossierATraiter
