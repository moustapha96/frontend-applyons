// "use client";

// import { useState, useEffect } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import {
//     Card,
//     Spin,
//     Typography,
//     Space,
//     Tag,
//     Descriptions,
//     Button,
//     message,
//     Modal,
//     Table,
//     Input,
//     Select,
//     Divider,
//     Avatar,
//     Row,
//     Col,
//     Drawer,
//     List,
//     Badge,
//     Tooltip,
//     Tabs,
//     Popover,
// } from "antd";
// import {
//     ArrowLeftOutlined,
//     UserOutlined,
//     EyeOutlined,
//     InfoCircleOutlined,
//     FilterOutlined,
//     FileTextOutlined,
//     DownOutlined,
//     UpOutlined,
//     SearchOutlined,
// } from "@ant-design/icons";
// import { getFileDocumentPartager } from "../../../services/partageService";
// import { CopyableFieldSimple } from "@/utils/CopyableField";
// import InstitutBreadcrumb from "@/components/InstitutBreadcrumb";
// import {
//     getDemandeurSimple,
//     getDemandeurSimpleInstitut,
// } from "@/services/demandeurService";
// import { useAuthContext } from "@/context";

// const { Title, Text, Paragraph } = Typography;
// const { Option } = Select;
// const { Search } = Input;

// const DemandeurProfileDetail = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const { institut } = useAuthContext();

//     const [loading, setLoading] = useState(true);
//     const [demandeur, setDemandeur] = useState(null);
//     const [error, setError] = useState(null);
//     const [pdfVisible, setPdfVisible] = useState(false);
//     const [pdfLoading, setPdfLoading] = useState(false);
//     const [pdfData, setPdfData] = useState(null);
//     const [pdfError, setPdfError] = useState(null);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [yearFilter, setYearFilter] = useState("");
//     const [instituteFilter, setInstituteFilter] = useState("");
//     const [typeFilter, setTypeFilter] = useState("");
//     const [documentModalVisible, setDocumentModalVisible] = useState(false);
//     const [selectedDocument, setSelectedDocument] = useState(null);
//     const [filterDrawerVisible, setFilterDrawerVisible] = useState(false);
//     const [expandedRowKeys, setExpandedRowKeys] = useState([]);
//     const [filterPeriode, setFilterPeriode] = useState(null);
//     const [uniquePeriodes, setUniquePeriodes] = useState([]);
//     const [filterYear, setFilterYear] = useState(null);

//     const { t } = useTranslation();
//     const [windowWidth, setWindowWidth] = useState(
//         typeof window !== "undefined" ? window.innerWidth : 0
//     );

//     useEffect(() => {
//         const handleResize = () => setWindowWidth(window.innerWidth);
//         window.addEventListener("resize", handleResize);
//         return () => window.removeEventListener("resize", handleResize);
//     }, []);

//     useEffect(() => {
//         fetchDemandeur(id);
//     }, [id]);

//     const fetchDemandeur = async (id) => {
//         try {
//             // const response = await getDemandeurSimpleInstitut(institut.id, id);
//             const response = await getDemandeurSimple(id);
//             setDemandeur(response);
//             const resul = response.demandePartages.filter(
//                 (item) => item.institut.id == institut.id
//             );
//             //console.log(resul)
//         } catch (err) {
//             setError(err.message);
//             message.error(t("demandeurProfile.error_fetching_details"));
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Get unique institutes and years for filtering
//     const getUniqueInstitutes = () => {
//         if (!demandeur || !demandeur.demandePartages) return [];
//         const institutes = [
//             ...new Set(
//                 demandeur.demandePartages.map((demande) => demande.institut.name)
//             ),
//         ];
//         return institutes;
//     };

//     const translatePeriode = (periode) => {
//         switch (periode) {
//             case "Printemps":
//                 return t("demandePartage.periode_1");
//             case "Été":
//                 return t("demandePartage.periode_2");
//             case "Automne":
//                 return t("demandePartage.periode_3");
//             case "Hiver":
//                 return t("demandePartage.periode_4");
//             case "Autre":
//                 return t("demandePartage.periode_5");
//             default:
//                 return periode;
//         }
//     };

//     const getUniqueYears = () => {
//         if (!demandeur || !demandeur.demandePartages) return [];
//         const years = [
//             ...new Set(
//                 demandeur.demandePartages.map((demande) => demande.year).filter(Boolean)
//             ),
//         ];
//         return years;
//     };

//     const getUniquePeriodes = () => {
//         if (!demandeur || !demandeur.demandePartages) return [];
//         const periodes = [
//             ...new Set(
//                 demandeur.demandePartages
//                     .map((demande) => demande.periode)
//                     .filter(Boolean)
//             ),
//         ];
//         return periodes;
//     };

//     useEffect(() => {
//         if (demandeur && demandeur.demandePartages) {
//             setUniquePeriodes(getUniquePeriodes());
//         }
//     }, [demandeur]);

//     const getResponsiveColumns = () => {
//         const baseColumns = [
//             {
//                 title: t("demandeurPartage.code"),
//                 dataIndex: "code",
//                 key: "code",
//                 render: (_, record) => (
//                     <Tag color="blue">
//                         <CopyableFieldSimple value={record.code} />
//                     </Tag>
//                 ),
//                 sorter: (a, b) => a.code.localeCompare(b.code),
//             },
//             {
//                 title: t("demandePartage.periode"),
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
//                 title: t("demandeurPartage.request_date"),
//                 dataIndex: "dateDemande",
//                 key: "dateDemande",
//                 render: (date) => new Date(date).toLocaleDateString(),
//                 sorter: (a, b) => new Date(a.dateDemande) - new Date(b.dateDemande),
//                 responsive: ["md"],
//             },
//             // {
//             //     title: t("demandeurPartage.institute"),
//             //     dataIndex: "institut",
//             //     key: "institut",
//             //     render: (_, record) =>
//             //         record.institut ? (
//             //             <Link
//             //                 to={`/demandeur/institut/${record.institut.id}/details`}
//             //                 className="text-primary hover:text-primary-light transition-colors duration-200 flex items-center gap-1"
//             //             >
//             //                 {record.institut.name}
//             //             </Link>
//             //         ) : (
//             //             "N/A"
//             //         ),
//             //     sorter: (a, b) => a.institut?.name.localeCompare(b.institut?.name),
//             // },
//             {
//                 title: t("demandeurPartage.documents"),
//                 dataIndex: "documentPartages",
//                 key: "documentPartages",
//                 render: (_, record) => (
//                     <>
//                         {record.documentPartages.length > 0 ? (
//                             <>
//                                 <Link to={`/institut/demande/${record.id}/documents`}>
//                                     <Tag color="blue">
//                                         {record.documentPartages.length}{" "}
//                                         {windowWidth >= 768
//                                             ? t("demandeurPartage.document_count")
//                                             : ""}
//                                     </Tag>
//                                 </Link>
//                             </>
//                         ) : (
//                             <Tag color="red"> {t("common.no_documents")} </Tag>
//                         )}
//                     </>
//                 ),
//                 responsive: ["md"],
//             },
//             {
//                 title: t("demandeurPartage.actions"),
//                 key: "actions",
//                 render: (_, record) => (
//                     <Space size="small" wrap>
//                         <Link to={`/institut/partages/${record.id}/details`}>
//                             <Button
//                                 className="ant-btn-primary"
//                                 style={{ marginTop: windowWidth < 576 ? "10px" : "0" }}
//                                 icon={<EyeOutlined />}
//                                 title={t("demandeurPartage.view_request_details")}
//                                 size={windowWidth < 768 ? "small" : "middle"}
//                             >
//                                 {windowWidth >= 576 ? t("demandeurPartage.details") : ""}
//                             </Button>
//                         </Link>

//                         <Popover
//                             content={
//                                 <div style={{ maxWidth: "400px" }}>
//                                     <Space direction="vertical">
//                                         <div>
//                                             <strong>{t("demandeurPartage.institute")}:</strong>
//                                             <p>{record.institut.name}</p>
//                                             <p>
//                                                 {record.institut.type} - {record.institut.paysResidence}
//                                             </p>
//                                             <p>
//                                                 {t("demandeurPartage.email")}: {record.institut.email}
//                                             </p>
//                                             <p>
//                                                 {t("demandeurPartage.phone")}: {record.institut.phone}
//                                             </p>
//                                         </div>
//                                         {record.documentPartages.length > 0 && (
//                                             <div>
//                                                 <strong>{t("demandeurPartage.documents")}:</strong>
//                                                 {record.documentPartages.map((doc, index) => (
//                                                     <div key={index} style={{ marginTop: "8px" }}>
//                                                         <p>
//                                                             {doc.intitule} - {doc.typeDocument}
//                                                         </p>
//                                                         <p>
//                                                             {t("demandeurPartage.dna_code")}: {doc.codeAdn}
//                                                         </p>
//                                                         <Tag
//                                                             color={
//                                                                 doc.statut === "ACCEPTED"
//                                                                     ? "success"
//                                                                     : "processing"
//                                                             }
//                                                         >
//                                                             {t(
//                                                                 `demandeurPartage.status.${doc.statut.toLowerCase()}`
//                                                             )}
//                                                         </Tag>
//                                                     </div>
//                                                 ))}
//                                             </div>
//                                         )}
//                                     </Space>
//                                 </div>
//                             }
//                             title={t("demandeurPartage.request_details")}
//                             trigger="click"
//                             placement="right"
//                         >
//                             <Button
//                                 className="ant-btn-primary"
//                                 icon={<InfoCircleOutlined />}
//                                 size={windowWidth < 768 ? "small" : "middle"}
//                             />
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

//     const handleYearFilter = (year) => {
//         setFilterYear(year);
//     };

//     const getUniqueDocumentTypes = () => {
//         if (!demandeur || !demandeur.demandePartages) return [];
//         const types = new Set();
//         demandeur.demandePartages.forEach((demande) => {
//             demande.documentPartages.forEach((doc) => {
//                 if (doc.typeDocument) types.add(doc.typeDocument);
//             });
//         });
//         return [...types];
//     };

//     const handlePeriodeFilter = (periode) => {
//         setFilterPeriode(periode);
//     };

//     // Filter demandes based on search term and filters
//     const getFilteredDemandes = () => {
//         if (!demandeur || !demandeur.demandePartages) return [];

//         return demandeur.demandePartages.filter((demande) => {
//             const matchesSearch =
//                 searchTerm === "" ||
//                 demande.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 demande.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 (demande.periode &&
//                     demande.periode.toLowerCase().includes(searchTerm.toLowerCase())) ||
//                 demande.institut.name.toLowerCase().includes(searchTerm.toLowerCase());

//             const matchesYear = filterYear === null || demande.year === filterYear;
//             const matchesInstitute =
//                 instituteFilter === "" || demande.institut.name === instituteFilter;
//             const matchesPeriode =
//                 filterPeriode === null || demande.periode === filterPeriode;

//             // For type filter, we need to check if any document in documentPartages matches the type
//             const matchesType =
//                 typeFilter === "" ||
//                 demande.documentPartages.some(
//                     (doc) => doc.typeDocument && doc.typeDocument === typeFilter
//                 );

//             return (
//                 matchesSearch &&
//                 matchesYear &&
//                 matchesInstitute &&
//                 matchesType &&
//                 matchesPeriode
//             );
//         });
//     };

//     const handleViewDocument = async (docId) => {
//         try {
//             setPdfError(null);
//             setPdfLoading(true);
//             setPdfVisible(true);
//             const base64Data = await getFileDocumentPartager(docId);
//             //console.log(base64Data)
//             setPdfData(base64Data);
//         } catch (error) {
//             setPdfError(error.message);
//             message.error(t("demandeurProfile.error_loading_document"));
//         } finally {
//             setPdfLoading(false);
//         }
//     };

//     const handleShowDocumentDetails = (document) => {
//         setSelectedDocument(document);
//         setDocumentModalVisible(true);
//     };

//     const resetFilters = () => {
//         setSearchTerm("");
//         setYearFilter("");
//         setInstituteFilter("");
//         setTypeFilter("");
//         setFilterPeriode(null);
//         setFilterYear(null);
//         setFilterDrawerVisible(false);
//     };

//     if (loading) {
//         return (
//             <div
//                 style={{
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     height: "100vh",
//                 }}
//             >
//                 <Spin fullscreen size="large" tip={t("common.loading")} />
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div style={{ textAlign: "center", marginTop: "50px" }}>
//                 <Text type="danger">{error}</Text>
//             </div>
//         );
//     }

//     // Determine if we should use column layout based on screen size
//     const isSmallScreen = windowWidth < 768;
//     const isMobileScreen = windowWidth < 576;

//     // Configure descriptions layout based on screen size
//     const descriptionsLayout = isSmallScreen ? "vertical" : "horizontal";

//     // Adjust column spans for responsive layout
//     const getColumnSpan = (defaultSpan) => (isSmallScreen ? 3 : defaultSpan);

//     const uniqueYears = getUniqueYears();
//     const uniqueInstitutes = getUniqueInstitutes();
//     const uniqueDocumentTypes = getUniqueDocumentTypes();

//     return (
//         <div style={{ background: "#f0f2f5", minHeight: "100vh" }}>
//             <InstitutBreadcrumb
//                 title={t("demandeurPartage.detailsDemandeur")}
//                 SubTitle={demandeur?.name}
//             />

//             <section className="py-4 md:py-6">
//                 <div className="container mx-auto px-3 md:px-4">
//                     <div className="bg-white rounded-xl shadow-xl overflow-hidden">
//                         <div
//                             style={{
//                                 maxWidth: "1200px",
//                                 margin: "0 auto",
//                                 padding: isMobileScreen ? "12px" : "24px",
//                             }}
//                         >
//                             <Space
//                                 direction="vertical"
//                                 size="large"
//                                 style={{ width: "100%" }}
//                             >
//                                 <Card
//                                     title={
//                                         <Space>
//                                             <UserOutlined />
//                                             <span>
//                                                 {t("institutPartageDetails.requester_information")}
//                                             </span>
//                                         </Space>
//                                     }
//                                 >
//                                     <Descriptions
//                                         bordered
//                                         column={isSmallScreen ? 1 : 3}
//                                         layout={descriptionsLayout}
//                                         size={isSmallScreen ? "small" : "default"}
//                                     >
//                                         <Descriptions.Item
//                                             label={t("institutPartageDetails.name")}
//                                             span={getColumnSpan(2)}
//                                         >
//                                             {demandeur.name}
//                                         </Descriptions.Item>
//                                         <Descriptions.Item
//                                             label={t("institutPartageDetails.gender")}
//                                         >
//                                             {demandeur.sexe}
//                                         </Descriptions.Item>
//                                         <Descriptions.Item
//                                             label={t("institutPartageDetails.email")}
//                                             span={getColumnSpan(2)}
//                                         >
//                                             {demandeur.email}
//                                         </Descriptions.Item>
//                                         <Descriptions.Item
//                                             label={t("institutPartageDetails.phone")}
//                                         >
//                                             {demandeur.phone}
//                                         </Descriptions.Item>
//                                         <Descriptions.Item
//                                             label={t("institutPartageDetails.profession")}
//                                             span={getColumnSpan(2)}
//                                         >
//                                             {demandeur.profession}
//                                         </Descriptions.Item>
//                                         <Descriptions.Item label={t("institutPartageDetails.code")}>
//                                             {demandeur.codeUser}
//                                         </Descriptions.Item>
//                                         <Descriptions.Item
//                                             label={t("institutPartageDetails.birth_date")}
//                                         >
//                                             {new Date(demandeur.dateNaissance).toLocaleDateString()}
//                                         </Descriptions.Item>
//                                         <Descriptions.Item
//                                             label={t("institutPartageDetails.birth_place")}
//                                         >
//                                             {demandeur.lieuNaissance}
//                                         </Descriptions.Item>
//                                         <Descriptions.Item
//                                             label={t("institutPartageDetails.country_of_residence")}
//                                         >
//                                             {demandeur.paysResidence}
//                                         </Descriptions.Item>
//                                     </Descriptions>
//                                 </Card>

//                                 <Divider orientation="left">
//                                     {t("demandeurPartage.my_requests")}
//                                 </Divider>

//                                 <Card>
//                                     <Tabs defaultActiveKey="1">
//                                         <div
//                                             style={{
//                                                 marginBottom: 16,
//                                                 display: "flex",
//                                                 justifyContent: "space-between",
//                                                 flexDirection: windowWidth < 576 ? "column" : "row",
//                                                 gap: windowWidth < 576 ? "10px" : "0",
//                                             }}
//                                         >
//                                             <div
//                                                 style={{
//                                                     display: "flex",
//                                                     gap: "10px",
//                                                     flexWrap: "wrap",
//                                                     marginBottom: "10px",
//                                                 }}
//                                             >
//                                                 <Input
//                                                     placeholder={t("demandeurPartage.search_placeholder")}
//                                                     prefix={<SearchOutlined />}
//                                                     value={searchTerm}
//                                                     onChange={(e) => setSearchTerm(e.target.value)}
//                                                     style={{ width: windowWidth < 576 ? "100%" : 300 }}
//                                                 />
//                                                 <Space wrap>
//                                                     <Select
//                                                         placeholder={t("demandePartage.select_periode")}
//                                                         style={{ width: 150 }}
//                                                         allowClear
//                                                         onChange={handlePeriodeFilter}
//                                                         value={filterPeriode}
//                                                     >
//                                                         {uniquePeriodes.map((periode) => (
//                                                             <Select.Option key={periode} value={periode}>
//                                                                 {translatePeriode(periode)}
//                                                             </Select.Option>
//                                                         ))}
//                                                     </Select>
//                                                     <Select
//                                                         placeholder={t("demandePartage.select_year")}
//                                                         style={{ width: 120 }}
//                                                         allowClear
//                                                         onChange={handleYearFilter}
//                                                         value={filterYear}
//                                                     >
//                                                         {uniqueYears.map((year) => (
//                                                             <Select.Option key={year} value={year}>
//                                                                 {year}
//                                                             </Select.Option>
//                                                         ))}
//                                                     </Select>
//                                                     <Select
//                                                         placeholder={t("demandePartage.select_institute")}
//                                                         style={{ width: 150 }}
//                                                         allowClear
//                                                         onChange={(value) => setInstituteFilter(value)}
//                                                         value={instituteFilter}
//                                                     >
//                                                         {uniqueInstitutes.map((institute) => (
//                                                             <Select.Option key={institute} value={institute}>
//                                                                 {institute}
//                                                             </Select.Option>
//                                                         ))}
//                                                     </Select>
//                                                     <Select
//                                                         placeholder={t("demandePartage.select_type")}
//                                                         style={{ width: 150 }}
//                                                         allowClear
//                                                         onChange={(value) => setTypeFilter(value)}
//                                                         value={typeFilter}
//                                                     >
//                                                         {uniqueDocumentTypes.map((type) => (
//                                                             <Select.Option key={type} value={type}>
//                                                                 {type}
//                                                             </Select.Option>
//                                                         ))}
//                                                     </Select>
//                                                     <Button
//                                                         onClick={resetFilters}
//                                                         className="ant-btn-primary"
//                                                         type="default"
//                                                     >
//                                                         {t("common.reset_filters")}
//                                                     </Button>
//                                                 </Space>
//                                             </div>
//                                         </div>

//                                         <div style={tableContainerStyle}>
//                                             <Table
//                                                 columns={columns}
//                                                 dataSource={getFilteredDemandes()}
//                                                 rowKey="id"
//                                                 loading={loading}
//                                                 pagination={{
//                                                     defaultPageSize: 5,
//                                                     showSizeChanger: true,
//                                                     showTotal: (total) =>
//                                                         `${t("demandeurPartage.total")} ${total} ${t("demandeurPartage.requests")}`,
//                                                 }}
//                                                 scroll={{ x: "max-content" }}
//                                                 className="responsive-table"
//                                             />
//                                         </div>
//                                     </Tabs>
//                                 </Card>
//                             </Space>
//                         </div>

//                         {/* Modal pour afficher le PDF - Responsive */}
//                         <Modal
//                             title={t("demandeurProfile.pdf_document")}
//                             open={pdfVisible}
//                             onCancel={() => {
//                                 setPdfVisible(false);
//                                 setPdfData(null);
//                             }}
//                             width={isMobileScreen ? "95%" : windowWidth < 992 ? "90%" : 1000}
//                             footer={null}
//                             centered
//                         >
//                             {pdfLoading ? (
//                                 <div style={{ textAlign: "center", padding: "20px" }}>
//                                     {/* <Spin tip={t("demandeurProfile.loading_document")} /> */}
//                                     <Spin />
//                                 </div>
//                             ) : pdfError ? (
//                                 <div style={{ textAlign: "center", padding: "20px" }}>
//                                     <Text type="danger">{pdfError}</Text>
//                                 </div>
//                             ) : pdfData ? (
//                                 <object
//                                     data={`data:application/pdf;base64,${pdfData}`}
//                                     type="application/pdf"
//                                     width="100%"
//                                     height={
//                                         isMobileScreen
//                                             ? "300px"
//                                             : windowWidth < 992
//                                                 ? "400px"
//                                                 : "500px"
//                                     }
//                                 >
//                                     <iframe
//                                         src={`data:application/pdf;base64,${pdfData}`}
//                                         width="100%"
//                                         height={
//                                             isMobileScreen
//                                                 ? "300px"
//                                                 : windowWidth < 992
//                                                     ? "400px"
//                                                     : "500px"
//                                         }
//                                         title={t("demandeurProfile.pdf_viewer")}
//                                     />
//                                 </object>
//                             ) : (
//                                 <div style={{ textAlign: "center", padding: "20px" }}>
//                                     <Text type="warning">
//                                         {t("demandeurProfile.no_document_to_display")}
//                                     </Text>
//                                 </div>
//                             )}
//                         </Modal>

//                         {/* Modal pour afficher les détails du document - Responsive */}
//                         <Modal
//                             title={t("demandeurProfile.document_details")}
//                             open={documentModalVisible}
//                             onCancel={() => {
//                                 setDocumentModalVisible(false);
//                                 setSelectedDocument(null);
//                             }}
//                             width={isMobileScreen ? "95%" : "70%"}
//                             footer={[
//                                 <Button
//                                     key="view"
//                                     type="primary"
//                                     icon={<EyeOutlined />}
//                                     onClick={() => {
//                                         handleViewDocument(selectedDocument.id);
//                                         setDocumentModalVisible(false);
//                                     }}
//                                     className="bg-blueLogo"
//                                 >
//                                     {t("demandeurProfile.view_document")}
//                                 </Button>,
//                                 <Button
//                                     key="close"
//                                     onClick={() => {
//                                         setDocumentModalVisible(false);
//                                         setSelectedDocument(null);
//                                     }}
//                                 >
//                                     {t("common.close")}
//                                 </Button>,
//                             ]}
//                             centered
//                         >
//                             {selectedDocument && (
//                                 <div className="max-h-[70vh] overflow-y-auto">
//                                     <Descriptions
//                                         bordered
//                                         column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
//                                         layout="vertical"
//                                         size={isMobileScreen ? "small" : "default"}
//                                     >
//                                         <Descriptions.Item label={t("demandeurProfile.title")}>
//                                             {selectedDocument.intitule}
//                                         </Descriptions.Item>
//                                         <Descriptions.Item label={t("demandeurProfile.type")}>
//                                             {selectedDocument.typeDocument}
//                                         </Descriptions.Item>
//                                         <Descriptions.Item label={t("demandeurProfile.dna_code")}>
//                                             <CopyableFieldSimple value={selectedDocument.codeAdn} />
//                                         </Descriptions.Item>
//                                         <Descriptions.Item label={t("demandeurProfile.status")}>
//                                             <Tag
//                                                 color={
//                                                     selectedDocument.statut === "Accepted" ||
//                                                         selectedDocument.statut === "ACCEPTED"
//                                                         ? "green"
//                                                         : "blue"
//                                                 }
//                                             >
//                                                 {selectedDocument.statut}
//                                             </Tag>
//                                         </Descriptions.Item>
//                                         <Descriptions.Item
//                                             label={t("demandeurProfile.date_obtained")}
//                                         >
//                                             {new Date(
//                                                 selectedDocument.dateObtention
//                                             ).toLocaleDateString()}
//                                         </Descriptions.Item>
//                                         <Descriptions.Item
//                                             label={t("demandeurProfile.year_obtained")}
//                                         >
//                                             {selectedDocument.anneeObtention}
//                                         </Descriptions.Item>
//                                     </Descriptions>
//                                 </div>
//                             )}
//                         </Modal>
//                     </div>
//                 </div>
//             </section>
//         </div>
//     );
// };

// // Simple Statistic component
// const Statistic = ({ title, value }) => {
//     return (
//         <div>
//             <div className="text-gray-500 text-sm">{title}</div>
//             <div className="text-xl font-semibold mt-1">{value}</div>
//         </div>
//     );
// };

// export default DemandeurProfileDetail;

"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import {
    Card,
    Spin,
    Typography,
    Space,
    Tag,
    Descriptions,
    Button,
    message,
    Modal,
    Table,
    Input,
    Select,
    Divider,
    Row,
    Col,
    Tabs,
    Popover,
} from "antd"
import { UserOutlined, EyeOutlined, InfoCircleOutlined, SearchOutlined } from "@ant-design/icons"
import { getFileDocumentPartager } from "../../../services/partageService"
import { CopyableFieldSimple } from "@/utils/CopyableField"
import InstitutBreadcrumb from "@/components/InstitutBreadcrumb"
import { getDemandeurSimple } from "@/services/demandeurService"
import { useAuthContext } from "@/context"

const { Title, Text, Paragraph } = Typography
const { Option } = Select
const { Search } = Input

const DemandeurProfileDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { institut } = useAuthContext()

    const [loading, setLoading] = useState(true)
    const [demandeur, setDemandeur] = useState(null)
    const [error, setError] = useState(null)
    const [pdfVisible, setPdfVisible] = useState(false)
    const [pdfLoading, setPdfLoading] = useState(false)
    const [pdfData, setPdfData] = useState(null)
    const [pdfError, setPdfError] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [yearFilter, setYearFilter] = useState("")
    const [instituteFilter, setInstituteFilter] = useState("")
    const [typeFilter, setTypeFilter] = useState("")
    const [documentModalVisible, setDocumentModalVisible] = useState(false)
    const [selectedDocument, setSelectedDocument] = useState(null)
    const [filterDrawerVisible, setFilterDrawerVisible] = useState(false)
    const [expandedRowKeys, setExpandedRowKeys] = useState([])
    const [filterPeriode, setFilterPeriode] = useState(null)
    const [uniquePeriodes, setUniquePeriodes] = useState([])
    const [filterYear, setFilterYear] = useState(null)

    const { t } = useTranslation()
    const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0)

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth)
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    useEffect(() => {
        fetchDemandeur(id)
    }, [id])

    const fetchDemandeur = async (id) => {
        try {
            // const response = await getDemandeurSimpleInstitut(institut.id, id);
            const response = await getDemandeurSimple(id)
            setDemandeur(response)
            const resul = response.demandePartages.filter((item) => item.institut.id == institut.id)
            //console.log(resul)
        } catch (err) {
            setError(err.message)
            message.error(t("demandeurProfile.error_fetching_details"))
        } finally {
            setLoading(false)
        }
    }

    // Get unique institutes and years for filtering
    const getUniqueInstitutes = () => {
        if (!demandeur || !demandeur.demandePartages) return []
        const institutes = [...new Set(demandeur.demandePartages.map((demande) => demande.institut.name))]
        return institutes
    }

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

    const getUniqueYears = () => {
        if (!demandeur || !demandeur.demandePartages) return []
        const years = [...new Set(demandeur.demandePartages.map((demande) => demande.year).filter(Boolean))]
        return years
    }

    const getUniquePeriodes = () => {
        if (!demandeur || !demandeur.demandePartages) return []
        const periodes = [...new Set(demandeur.demandePartages.map((demande) => demande.periode).filter(Boolean))]
        return periodes
    }

    useEffect(() => {
        if (demandeur && demandeur.demandePartages) {
            setUniquePeriodes(getUniquePeriodes())
        }
    }, [demandeur])

    const getResponsiveColumns = () => {
        const baseColumns = [
            {
                title: t("demandeurPartage.code"),
                dataIndex: "code",
                key: "code",
                render: (_, record) => (
                    <Tag color="blue">
                        <CopyableFieldSimple value={record.code} />
                    </Tag>
                ),
                sorter: (a, b) => a.code.localeCompare(b.code),
            },
            {
                title: t("demandePartage.periode"),
                dataIndex: "periode",
                key: "periode",
                render: (_, record) => (
                    <Tag color="blue">
                        {translatePeriode(record.periode)} - {record.year}
                    </Tag>
                ),
                sorter: (a, b) => a.periode.localeCompare(b.periode),
            },
            {
                title: t("demandeurPartage.request_date"),
                dataIndex: "dateDemande",
                key: "dateDemande",
                render: (date) => new Date(date).toLocaleDateString(),
                sorter: (a, b) => new Date(a.dateDemande) - new Date(b.dateDemande),
                responsive: ["md"],
            },
            // {
            //     title: t("demandeurPartage.institute"),
            //     dataIndex: "institut",
            //     key: "institut",
            //     render: (_, record) =>
            //         record.institut ? (
            //             <Link
            //                 to={`/demandeur/institut/${record.institut.id}/details`}
            //                 className="text-primary hover:text-primary-light transition-colors duration-200 flex items-center gap-1"
            //             >
            //                 {record.institut.name}
            //             </Link>
            //         ) : (
            //             "N/A"
            //         ),
            //     sorter: (a, b) => a.institut?.name.localeCompare(b.institut?.name),
            // },
            {
                title: t("demandeurPartage.documents"),
                dataIndex: "documentPartages",
                key: "documentPartages",
                render: (_, record) => (
                    <>
                        {record.documentPartages.length > 0 ? (
                            <>
                                <Link to={`/institut/demande/${record.id}/documents`}>
                                    <Tag color="blue">
                                        {record.documentPartages.length} {windowWidth >= 768 ? t("demandeurPartage.document_count") : ""}
                                    </Tag>
                                </Link>
                            </>
                        ) : (
                            <Tag color="red"> {t("common.no_documents")} </Tag>
                        )}
                    </>
                ),
                responsive: ["md"],
            },
            {
                title: t("demandeurPartage.actions"),
                key: "actions",
                render: (_, record) => (
                    <Space size="small" wrap>
                        <Link to={`/institut/partages/${record.id}/details`}>
                            <Button
                                className="ant-btn-primary"
                                style={{ marginTop: windowWidth < 576 ? "10px" : "0" }}
                                icon={<EyeOutlined />}
                                title={t("demandeurPartage.view_request_details")}
                                size={windowWidth < 768 ? "small" : "middle"}
                            >
                                {windowWidth >= 576 ? t("demandeurPartage.details") : ""}
                            </Button>
                        </Link>

                        <Popover
                            content={
                                <div style={{ maxWidth: "400px" }}>
                                    <Space direction="vertical">
                                        <div>
                                            <strong>{t("demandeurPartage.institute")}:</strong>
                                            <p>{record.institut.name}</p>
                                            <p>
                                                {record.institut.type} - {record.institut.paysResidence}
                                            </p>
                                            <p>
                                                {t("demandeurPartage.email")}: {record.institut.email}
                                            </p>
                                            <p>
                                                {t("demandeurPartage.phone")}: {record.institut.phone}
                                            </p>
                                        </div>
                                        {record.documentPartages.length > 0 && (
                                            <div>
                                                <strong>{t("demandeurPartage.documents")}:</strong>
                                                {record.documentPartages.map((doc, index) => (
                                                    <div key={index} style={{ marginTop: "8px" }}>
                                                        <p>
                                                            {doc.intitule} - {doc.typeDocument}
                                                        </p>
                                                        <p>
                                                            {t("demandeurPartage.dna_code")}: {doc.codeAdn}
                                                        </p>
                                                        <Tag color={doc.statut === "ACCEPTED" ? "success" : "processing"}>
                                                            {t(`demandeurPartage.status.${doc.statut.toLowerCase()}`)}
                                                        </Tag>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </Space>
                                </div>
                            }
                            title={t("demandeurPartage.request_details")}
                            trigger="click"
                            placement="right"
                        >
                            <Button
                                className="ant-btn-primary"
                                icon={<InfoCircleOutlined />}
                                size={windowWidth < 768 ? "small" : "middle"}
                            />
                        </Popover>
                    </Space>
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

    const handleYearFilter = (year) => {
        setFilterYear(year)
    }

    const getUniqueDocumentTypes = () => {
        if (!demandeur || !demandeur.demandePartages) return []
        const types = new Set()
        demandeur.demandePartages.forEach((demande) => {
            demande.documentPartages.forEach((doc) => {
                if (doc.typeDocument) types.add(doc.typeDocument)
            })
        })
        return [...types]
    }

    const handlePeriodeFilter = (periode) => {
        setFilterPeriode(periode)
    }

    // Filter demandes based on search term and filters
    const getFilteredDemandes = () => {
        if (!demandeur || !demandeur.demandePartages) return []

        return demandeur.demandePartages.filter((demande) => {
            const matchesSearch =
                searchTerm === "" ||
                demande.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                demande.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (demande.periode && demande.periode.toLowerCase().includes(searchTerm.toLowerCase())) ||
                demande.institut.name.toLowerCase().includes(searchTerm.toLowerCase())

            const matchesYear = filterYear === null || demande.year === filterYear
            const matchesInstitute = instituteFilter === "" || demande.institut.name === instituteFilter
            const matchesPeriode = filterPeriode === null || demande.periode === filterPeriode

            // For type filter, we need to check if any document in documentPartages matches the type
            const matchesType =
                typeFilter === "" || demande.documentPartages.some((doc) => doc.typeDocument && doc.typeDocument === typeFilter)

            return matchesSearch && matchesYear && matchesInstitute && matchesType && matchesPeriode
        })
    }

    const handleViewDocument = async (docId) => {
        try {
            setPdfError(null)
            setPdfLoading(true)
            setPdfVisible(true)
            const base64Data = await getFileDocumentPartager(docId)
            //console.log(base64Data)
            setPdfData(base64Data)
        } catch (error) {
            setPdfError(error.message)
            message.error(t("demandeurProfile.error_loading_document"))
        } finally {
            setPdfLoading(false)
        }
    }

    const handleShowDocumentDetails = (document) => {
        setSelectedDocument(document)
        setDocumentModalVisible(true)
    }

    const resetFilters = () => {
        setSearchTerm("")
        setYearFilter("")
        setInstituteFilter("")
        setTypeFilter("")
        setFilterPeriode(null)
        setFilterYear(null)
        setFilterDrawerVisible(false)
    }

    const getStatistics = () => {
        if (!demandeur || !demandeur.demandePartages)
            return { totalRequests: 0, totalDocuments: 0, acceptedDocuments: 0, pendingDocuments: 0 }

        const totalRequests = demandeur.demandePartages.length
        const totalDocuments = demandeur.demandePartages.reduce((acc, demande) => acc + demande.documentPartages.length, 0)
        const acceptedDocuments = demandeur.demandePartages.reduce(
            (acc, demande) =>
                acc + demande.documentPartages.filter((doc) => doc.statut === "ACCEPTED" || doc.statut === "Accepted").length,
            0,
        )
        const pendingDocuments = totalDocuments - acceptedDocuments

        return { totalRequests, totalDocuments, acceptedDocuments, pendingDocuments }
    }

    if (loading) {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <Spin fullscreen size="large" tip={t("common.loading")} />
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
    const isMobileScreen = windowWidth < 576

    // Configure descriptions layout based on screen size
    const descriptionsLayout = isSmallScreen ? "vertical" : "horizontal"

    // Adjust column spans for responsive layout
    const getColumnSpan = (defaultSpan) => (isSmallScreen ? 3 : defaultSpan)

    const uniqueYears = getUniqueYears()
    const uniqueInstitutes = getUniqueInstitutes()
    const uniqueDocumentTypes = getUniqueDocumentTypes()

    return (
        <div
            style={{
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
                minHeight: "100vh",
            }}
        >
            <InstitutBreadcrumb title={t("demandeurPartage.detailsDemandeur")} SubTitle={demandeur?.name} />

            <section className="py-4 md:py-6">
                <div className="container mx-auto px-3 md:px-4">
                    <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                        <div
                            style={{
                                maxWidth: "1200px",
                                margin: "0 auto",
                                padding: isMobileScreen ? "12px" : "24px",
                            }}
                        >
                            <Space direction="vertical" size="large" style={{ width: "100%" }}>
                                <Card
                                    title={
                                        <Space>
                                            <UserOutlined style={{ color: "#254c6b" }} />
                                            <span style={{ color: "#254c6b", fontWeight: "bold" }}>
                                                {t("institutPartageDetails.apllication_information")}
                                            </span>
                                        </Space>
                                    }
                                    style={{
                                        borderRadius: "12px",
                                        boxShadow: "0 4px 12px rgba(37, 76, 107, 0.1)",
                                        border: `1px solid #254c6b20`,
                                    }}
                                    headStyle={{
                                        background: "linear-gradient(135deg, #254c6b10 0%, #3eb6e920 100%)",
                                        borderRadius: "12px 12px 0 0",
                                    }}
                                >
                                    {/* ... existing Descriptions code ... */}
                                    <Descriptions
                                        bordered
                                        column={isSmallScreen ? 1 : 3}
                                        layout={descriptionsLayout}
                                        size={isSmallScreen ? "small" : "default"}
                                    >
                                        <Descriptions.Item label={t("institutPartageDetails.name")} span={getColumnSpan(2)}>
                                            {demandeur.name}
                                        </Descriptions.Item>
                                        <Descriptions.Item label={t("institutPartageDetails.gender")}>{demandeur.sexe}</Descriptions.Item>
                                        <Descriptions.Item label={t("institutPartageDetails.email")} span={getColumnSpan(2)}>
                                            {demandeur.email}
                                        </Descriptions.Item>
                                        <Descriptions.Item label={t("institutPartageDetails.phone")}>{demandeur.phone}</Descriptions.Item>
                                        <Descriptions.Item label={t("institutPartageDetails.profession")} span={getColumnSpan(2)}>
                                            {demandeur.profession}
                                        </Descriptions.Item>
                                        <Descriptions.Item label={t("institutPartageDetails.code")}>{demandeur.codeUser}</Descriptions.Item>
                                        <Descriptions.Item label={t("institutPartageDetails.birth_date")}>
                                            {new Date(demandeur.dateNaissance).toLocaleDateString()}
                                        </Descriptions.Item>
                                        <Descriptions.Item label={t("institutPartageDetails.birth_place")}>
                                            {demandeur.lieuNaissance}
                                        </Descriptions.Item>
                                        <Descriptions.Item label={t("institutPartageDetails.country_of_residence")}>
                                            {demandeur.paysResidence}
                                        </Descriptions.Item>
                                    </Descriptions>
                                </Card>

                                <Divider
                                    orientation="left"
                                    style={{
                                        borderColor: "#254c6b",
                                        fontSize: "18px",
                                        fontWeight: "bold",
                                        color: "#254c6b",
                                    }}
                                >
                                    {t("demandeurPartage.applications")}
                                </Divider>

                                <Card
                                    style={{
                                        borderRadius: "12px",
                                        boxShadow: "0 4px 12px rgba(37, 76, 107, 0.1)",
                                        border: `1px solid #254c6b20`,
                                    }}
                                >
                                    <Tabs defaultActiveKey="1">
                                        <div
                                            style={{
                                                marginBottom: 16,
                                                display: "flex",
                                                justifyContent: "space-between",
                                                flexDirection: windowWidth < 576 ? "column" : "row",
                                                gap: windowWidth < 576 ? "10px" : "0",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: "flex",
                                                    gap: "10px",
                                                    flexWrap: "wrap",
                                                    marginBottom: "10px",
                                                }}
                                            >
                                                <Input
                                                    placeholder={t("demandeurPartage.search_placeholder")}
                                                    prefix={<SearchOutlined style={{ color: "#254c6b" }} />}
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                    style={{
                                                        width: windowWidth < 576 ? "100%" : 300,
                                                        borderColor: "#254c6b40",
                                                        borderRadius: "8px",
                                                    }}
                                                />
                                                <Space wrap>
                                                    {/* ... existing Select components with updated styling ... */}
                                                    <Select
                                                        placeholder={t("demandePartage.select_periode")}
                                                        style={{ width: 150 }}
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
                                                        placeholder={t("demandePartage.select_year")}
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
                                                    <Select
                                                        placeholder={t("demandePartage.select_institute")}
                                                        style={{ width: 150 }}
                                                        allowClear
                                                        onChange={(value) => setInstituteFilter(value)}
                                                        value={instituteFilter}
                                                    >
                                                        {uniqueInstitutes.map((institute) => (
                                                            <Select.Option key={institute} value={institute}>
                                                                {institute}
                                                            </Select.Option>
                                                        ))}
                                                    </Select>
                                                    <Select
                                                        placeholder={t("demandePartage.select_type")}
                                                        style={{ width: 150 }}
                                                        allowClear
                                                        onChange={(value) => setTypeFilter(value)}
                                                        value={typeFilter}
                                                    >
                                                        {uniqueDocumentTypes.map((type) => (
                                                            <Select.Option key={type} value={type}>
                                                                {type}
                                                            </Select.Option>
                                                        ))}
                                                    </Select>
                                                    <Button
                                                        onClick={resetFilters}
                                                        style={{
                                                            backgroundColor: "#254c6b",
                                                            borderColor: "#254c6b",
                                                            color: "white",
                                                            borderRadius: "8px",
                                                        }}
                                                        type="primary"
                                                    >
                                                        {t("common.reset_filters")}
                                                    </Button>
                                                </Space>
                                            </div>
                                        </div>

                                        <div style={tableContainerStyle}>
                                            <Table
                                                columns={columns}
                                                dataSource={getFilteredDemandes()}
                                                rowKey="id"
                                                loading={loading}
                                                pagination={{
                                                    defaultPageSize: 5,
                                                    showSizeChanger: true,
                                                    showTotal: (total) =>
                                                        `${t("demandeurPartage.total")} ${total} ${t("demandeurPartage.requests")}`,
                                                }}
                                                scroll={{ x: "max-content" }}
                                                className="responsive-table"
                                                rowClassName={(record, index) => (index % 2 === 0 ? "table-row-light" : "table-row-dark")}
                                            />
                                        </div>
                                    </Tabs>
                                </Card>
                            </Space>
                        </div>

                        {/* ... existing Modal components ... */}
                        <Modal
                            title={t("demandeurProfile.pdf_document")}
                            open={pdfVisible}
                            onCancel={() => {
                                setPdfVisible(false)
                                setPdfData(null)
                            }}
                            width={isMobileScreen ? "95%" : windowWidth < 992 ? "90%" : 1000}
                            footer={null}
                            centered
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
                                            height={isMobileScreen ? "300px" : windowWidth < 992 ? "400px" : "500px"}
                                >
                                    <iframe
                                        src={`data:application/pdf;base64,${pdfData}`}
                                        width="100%"
                                                height={isMobileScreen ? "300px" : windowWidth < 992 ? "400px" : "500px"}
                                        title={t("demandeurProfile.pdf_viewer")}
                                    />
                                </object>
                            ) : (
                                <div style={{ textAlign: "center", padding: "20px" }}>
                                                <Text type="warning">{t("demandeurProfile.no_document_to_display")}</Text>
                                </div>
                            )}
                        </Modal>

                        <Modal
                            title={t("demandeurProfile.document_details")}
                            open={documentModalVisible}
                            onCancel={() => {
                                setDocumentModalVisible(false)
                                setSelectedDocument(null)
                            }}
                            width={isMobileScreen ? "95%" : "70%"}
                            footer={[
                                <Button
                                    key="view"
                                    type="primary"
                                    icon={<EyeOutlined />}
                                    onClick={() => {
                                        handleViewDocument(selectedDocument.id)
                                        setDocumentModalVisible(false)
                                    }}
                                    style={{
                                        backgroundColor: "#254c6b",
                                        borderColor: "#254c6b",
                                    }}
                                >
                                    {t("demandeurProfile.view_document")}
                                </Button>,
                                <Button
                                    key="close"
                                    onClick={() => {
                                        setDocumentModalVisible(false)
                                        setSelectedDocument(null)
                                    }}
                                >
                                    {t("common.close")}
                                </Button>,
                            ]}
                            centered
                        >
                            {selectedDocument && (
                                <div className="max-h-[70vh] overflow-y-auto">
                                    <Descriptions
                                        bordered
                                        column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
                                        layout="vertical"
                                        size={isMobileScreen ? "small" : "default"}
                                    >
                                        <Descriptions.Item label={t("demandeurProfile.title")}>
                                            {selectedDocument.intitule}
                                        </Descriptions.Item>
                                        <Descriptions.Item label={t("demandeurProfile.type")}>
                                            {selectedDocument.typeDocument}
                                        </Descriptions.Item>
                                        <Descriptions.Item label={t("demandeurProfile.dna_code")}>
                                            <CopyableFieldSimple value={selectedDocument.codeAdn} />
                                        </Descriptions.Item>
                                        <Descriptions.Item label={t("demandeurProfile.status")}>
                                            <Tag
                                                color={
                                                    selectedDocument.statut === "Accepted" || selectedDocument.statut === "ACCEPTED"
                                                        ? "green"
                                                        : "blue"
                                                }
                                            >
                                                {selectedDocument.statut}
                                            </Tag>
                                        </Descriptions.Item>
                                        <Descriptions.Item label={t("demandeurProfile.date_obtained")}>
                                            {new Date(selectedDocument.dateObtention).toLocaleDateString()}
                                        </Descriptions.Item>
                                        <Descriptions.Item label={t("demandeurProfile.year_obtained")}>
                                            {selectedDocument.anneeObtention}
                                        </Descriptions.Item>
                                    </Descriptions>
                                </div>
                            )}
                        </Modal>
                    </div>
                </div>
            </section>

            <style jsx>{`
                .table-row-light {
                    background-color: #fafafa;
                }
                .table-row-dark {
                    background-color: #ffffff;
                }
                .responsive-table .ant-table-thead > tr > th {
                    background-color: #254c6b;
                    color: white;
                    font-weight: bold;
                }
                .responsive-table .ant-table-tbody > tr:hover > td {
                    background-color: #3eb6e920 !important;
                }
            `}</style>
        </div>
    )
}

// Simple Statistic component
const Statistic = ({ title, value }) => {
    return (
        <div>
            <div className="text-gray-500 text-sm">{title}</div>
            <div className="text-xl font-semibold mt-1">{value}</div>
        </div>
    )
}

export default DemandeurProfileDetail
