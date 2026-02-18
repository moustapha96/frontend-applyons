
"use client";

import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
    Avatar,
    Row,
    Col,
    Drawer,
    List,
    Badge,
    Tooltip,
    Tabs,
    Popover,
    Form,
} from "antd";
import {
    ArrowLeftOutlined,
    UserOutlined,
    EyeOutlined,
    InfoCircleOutlined,
    FilterOutlined,
    FileTextOutlined,
    DownOutlined,
    UpOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import {
    getDemandePartageDemandeur,
    getDocumentPartageDemandeur,
    getFileDocumentPartager,
} from "../../../services/partageService";
import { CopyableFieldSimple } from "@/utils/CopyableField";
import { AdminBreadcrumb } from "@/components";
import { PlusOutlined } from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { Search } = Input;

const AdminPartageDemandeurDetail = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [demandeur, setDemandeur] = useState(null);
    const [error, setError] = useState(null);
    const [demandes, setDemandes] = useState([]);
    const [instituts, setInstituts] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [form] = Form.useForm();
    const [years, setYears] = useState([]);
    const [filterPeriode, setFilterPeriode] = useState(null);
    const [filterYear, setFilterYear] = useState(null);
    const [uniquePeriodes, setUniquePeriodes] = useState([]);
    const [uniqueYears, setUniqueYears] = useState([]);
    const [windowWidth, setWindowWidth] = useState(
        typeof window !== "undefined" ? window.innerWidth : 0
    );

    const { t } = useTranslation();

    const isSmallScreen = windowWidth < 768;
    const isMobileScreen = windowWidth < 576;
    const descriptionsLayout = isSmallScreen ? "vertical" : "horizontal";
    const getColumnSpan = (defaultSpan) => (isSmallScreen ? 3 : defaultSpan);

    useEffect(() => {
        const currentYear = new Date().getFullYear();
        const years = Array.from({ length: 10 }, (_, i) => currentYear + i);
        setYears(years);
    }, []);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (id) {
            fetchDemandeur(id);
            fetchDemandes(id);
        }
    }, [id]);

    const fetchDemandeur = async (demandeurId) => {
        try {
            const response = await getDocumentPartageDemandeur(demandeurId);
            setDemandeur(response);
        } catch (err) {
            setError(err.message);
            message.error(t("demandeurProfile.error_fetching_details"));
        } finally {
            setLoading(false);
        }
    };

    const fetchDemandes = async (demandeurId) => {
        try {
            const data = await getDemandePartageDemandeur(demandeurId);
            setDemandes(data || []);
            extractUniqueFilters(data || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const extractUniqueFilters = (data) => {
        if (!Array.isArray(data)) return;

        const periodes = [...new Set(data.map((item) => item.periode).filter(Boolean))].sort();
        const years = [...new Set(data.map((item) => item.year).filter(Boolean))].sort((a, b) => b - a);

        setUniquePeriodes(periodes);
        setUniqueYears(years);
    };

    const handlePeriodeFilter = (periode) => {
        setFilterPeriode(periode);
    };

    const handleYearFilter = (year) => {
        setFilterYear(year);
    };

    const resetFilters = () => {
        setFilterPeriode(null);
        setFilterYear(null);
        setSearchText("");
    };

    const getFilteredData = () => {
        if (!Array.isArray(demandes)) return [];

        return demandes.filter((item) => {
            if (!item) return false;

            const matchesSearch = !searchText ||
                (item.code && item.code.toLowerCase().includes(searchText.toLowerCase())) ||
                (item.institut?.name && item.institut.name.toLowerCase().includes(searchText.toLowerCase()));

            const matchesPeriode = !filterPeriode || item.periode === filterPeriode;
            const matchesYear = !filterYear || item.year === filterYear;

            return matchesSearch && matchesPeriode && matchesYear;
        });
    };

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
                <Spin size="large" tip={t("common.loading")} />
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ textAlign: "center", marginTop: "50px" }}>
                <Text type="danger">{error}</Text>
            </div>
        );
    }

    const translatePeriode = (periode) => {
        if (!periode) return "";

        const translations = {
            "Printemps": t("demandePartage.periode_1"),
            "Été": t("demandePartage.periode_2"),
            "Automne": t("demandePartage.periode_3"),
            "Hiver": t("demandePartage.periode_4"),
            "Autre": t("demandePartage.periode_5")
        };

        return translations[periode] || periode;
    };

    const getResponsiveColumns = () => {
        const baseColumns = [
            {
                title: t("demandeurPartage.institute"),
                dataIndex: "institut",
                key: "institut",
                render: (_, record) => {
                    if (!record?.institut) return "N/A";

                    return (
                        <Link
                            to={`/admin/institut/${record.institut.id}/details`}
                            className="text-primary hover:text-primary-light transition-colors duration-200 flex items-center gap-1"
                        >
                            {record.institut.name}
                        </Link>
                    );
                },
                sorter: (a, b) => {
                    const nameA = a.institut?.name || "";
                    const nameB = b.institut?.name || "";
                    return nameA.localeCompare(nameB);
                },
            },
            {
                title: t("demandeurPartage.code"),
                dataIndex: "code",
                key: "code",
                render: (_, record) => (
                    <Tag color="blue">
                        <CopyableFieldSimple value={record.code || ""} />
                    </Tag>
                ),
                sorter: (a, b) => (a.code || "").localeCompare(b.code || ""),
            },
            {
                title: t("demandePartage.periode"),
                dataIndex: "periode",
                key: "periode",
                render: (_, record) => (
                    <Tag color="blue">
                        {translatePeriode(record.periode)} {record.year ? `- ${record.year}` : ""}
                    </Tag>
                ),
                sorter: (a, b) => (a.periode || "").localeCompare(b.periode || ""),
            },
            {
                title: t("demandeurPartage.request_date"),
                dataIndex: "dateDemande",
                key: "dateDemande",
                render: (date) => date ? new Date(date).toLocaleDateString() : "N/A",
                sorter: (a, b) => {
                    const dateA = a.dateDemande ? new Date(a.dateDemande) : new Date(0);
                    const dateB = b.dateDemande ? new Date(b.dateDemande) : new Date(0);
                    return dateA - dateB;
                },
                responsive: ["md"],
            },
            {
                title: t("demandeurPartage.documents"),
                dataIndex: "documentPartages",
                key: "documentPartages",
                render: (_, record) => {
                    const docCount = record.documentPartages?.length || 0;

                    if (docCount > 0) {
                        return (
                            <Link to={`/admin/partages/${record.id}/details#documents`}>
                                <Tag color="blue">
                                    {docCount} {windowWidth >= 768 ? t("demandeurPartage.document_count") : ""}
                                </Tag>
                            </Link>
                        );
                    }

                    return <Tag color="red">{t("common.no_documents")}</Tag>;
                },
                responsive: ["md"],
            },
            {
                title: t("demandeurPartage.actions"),
                key: "actions",
                render: (_, record) => (
                    <Space size="small" wrap>
                        <Link to={`/admin/partages/${record.id}/details`}>
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
                                        {record.institut && (
                                            <div>
                                                <strong>{t("demandeurPartage.institute")}:</strong>
                                                <p>{record.institut.name}</p>
                                                <p>{record.institut.type} - {record.institut.paysResidence}</p>
                                                <p>{t("demandeurPartage.email")}: {record.institut.email}</p>
                                                <p>{t("demandeurPartage.phone")}: {record.institut.phone}</p>
                                            </div>
                                        )}
                                        {record.documentPartages?.length > 0 && (
                                            <div>
                                                <strong>{t("demandeurPartage.documents")}:</strong>
                                                {record.documentPartages.map((doc, index) => (
                                                    <div key={`doc-${record.id}-${index}`} style={{ marginTop: "8px" }}>
                                                        <p>{doc.intitule} - {doc.typeDocument}</p>
                                                        <p>{t("demandeurPartage.dna_code")}: {doc.codeAdn}</p>
                                                        <Tag
                                                            color={doc.statut === "ACCEPTED" ? "success" : "processing"}
                                                        >
                                                            {t(`demandeurPartage.status.${(doc.statut || "").toLowerCase()}`)}
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
                                className="bg-blueLogo text-white hover:bg-rougeLogo"
                                icon={<InfoCircleOutlined />}
                                size={windowWidth < 768 ? "small" : "middle"}
                            />
                        </Popover>
                    </Space>
                ),
            },
        ];

        return baseColumns;
    };

    const columns = getResponsiveColumns();
    const filteredData = getFilteredData();

    return (
        <div style={{ background: "#f0f2f5", minHeight: "100vh" }}>
            <AdminBreadcrumb
                title={t("demandeurPartage.detailsDemandeur")}
                SubTitle={demandeur?.name || ""}
            />
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
                                            <UserOutlined />
                                            <span>{t("institutPartageDetails.requester_information")}</span>
                                        </Space>
                                    }
                                >
                                    {demandeur && (
                                        <Descriptions
                                            bordered
                                            column={isSmallScreen ? 1 : 3}
                                            layout={descriptionsLayout}
                                            size={isSmallScreen ? "small" : "default"}
                                        >
                                            <Descriptions.Item
                                                label={t("institutPartageDetails.name")}
                                                span={getColumnSpan(2)}
                                            >
                                                {demandeur.name || "N/A"}
                                            </Descriptions.Item>
                                            <Descriptions.Item
                                                label={t("institutPartageDetails.email")}
                                                span={getColumnSpan(2)}
                                            >
                                                {demandeur.email || "N/A"}
                                            </Descriptions.Item>
                                            <Descriptions.Item label={t("institutPartageDetails.phone")}>
                                                {demandeur.phone || "N/A"}
                                            </Descriptions.Item>
                                            <Descriptions.Item label={t("institutPartageDetails.address")}>
                                                {demandeur.adresse || "N/A"}
                                            </Descriptions.Item>
                                            <Descriptions.Item
                                                label={t("institutPartageDetails.country_of_residence")}
                                            >
                                                {demandeur.paysResidence || "N/A"}
                                            </Descriptions.Item>
                                            <Descriptions.Item label={t("institutPartageDetails.code")}>
                                                {demandeur.codeUser || "N/A"}
                                            </Descriptions.Item>
                                        </Descriptions>
                                    )}
                                </Card>

                                <Divider orientation="left">{t("demandeurPartage.my_requests")}</Divider>

                                <Card>
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
                                                prefix={<SearchOutlined />}
                                                value={searchText}
                                                onChange={(e) => setSearchText(e.target.value)}
                                                style={{ width: windowWidth < 576 ? "100%" : 300 }}
                                            />
                                            <Space wrap>
                                                <Select
                                                    placeholder={t("demandePartage.select_periode")}
                                                    style={{ width: 150 }}
                                                    allowClear
                                                    onChange={handlePeriodeFilter}
                                                    value={filterPeriode}
                                                >
                                                    {uniquePeriodes.map((periode, index) => (
                                                        <Select.Option
                                                            key={`periode-${periode}-${index}`}
                                                            value={periode}
                                                        >
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
                                                    {uniqueYears.map((year, index) => (
                                                        <Select.Option
                                                            key={`year-${year}-${index}`}
                                                            value={year}
                                                        >
                                                            {year}
                                                        </Select.Option>
                                                    ))}
                                                </Select>
                                                <Button
                                                    onClick={resetFilters}
                                                    className="ant-btn-primary"
                                                    type="default"
                                                >
                                                    {t("common.reset_filters")}
                                                </Button>
                                            </Space>
                                        </div>
                                    </div>

                                    <div style={{ overflowX: "auto", width: "100%", maxWidth: "100%" }}>
                                        <Table
                                            columns={columns}
                                            dataSource={filteredData}
                                            rowKey={(record) => `demande-${record.id || Math.random()}`}
                                            loading={loading}
                                            pagination={{
                                                defaultPageSize: 5,
                                                showSizeChanger: true,
                                                showTotal: (total) =>
                                                    `${t("demandeurPartage.total")} ${total} ${t("demandeurPartage.requests")}`,
                                            }}
                                            scroll={{ x: "max-content" }}
                                            className="responsive-table"
                                        />
                                    </div>
                                </Card>
                            </Space>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AdminPartageDemandeurDetail;
