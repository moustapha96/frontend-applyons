"use client";

import { useState, useEffect, useContext } from "react";
import { useAuthContext } from "../../../context/useAuthContext";
import { useTranslation } from "react-i18next";
import { message, Input, Button, Card, Table, Spin, Tag, Space, Popover, Select } from "antd";
import { SearchOutlined, EyeOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { FileText, Loader2 } from "lucide-react";
import { CopyableFieldSimple } from "@/utils/CopyableField";
import * as yup from "yup";
import InstitutTraducteurBreadcrumb from "@/components/InstitutTraducteurBreadcrumb";
import { getDossierAtraiter } from "@/services/institutTraducteurService";


const InstitutTraducteurDocumentDetails = () => {
    const { institut } = useAuthContext();
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);
    const [demandes, setDemandes] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [filterPeriode, setFilterPeriode] = useState(null);
    const [filterYear, setFilterYear] = useState(null);
    const [uniquePeriodes, setUniquePeriodes] = useState([]);
    const [uniqueYears, setUniqueYears] = useState([]);
    const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    useEffect(() => {
        fetchDossierAtraiter();
        scrollTo(0, 0);
    }, [institut]);


    const fetchDossierAtraiter = async () => {
        try {
            setLoading(true);
            const data = await getDossierAtraiter(institut.id);
            console.log("Dossier à traiter data:", data);
            setDemandes(data);
            extractUniqueFilters(data);
        } catch (err) {
            console.error(t("institutTraducteur.error_fetching_requests"), err);
            message.error(t("institutTraducteur.error_fetching_requests"));
        } finally {
            setLoading(false);
        }
    };

    const extractUniqueFilters = (data) => {
        const periodes = [...new Set(data.map((item) => item.periode))].sort();
        const years = [...new Set(data.map((item) => item.year))].sort((a, b) => b - a);
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
    };

    const getFilteredData = () => {
        return demandes.filter((item) => {
            const matchesSearch =
                item.code.toLowerCase().includes(searchText.toLowerCase()) ||
                item.demandeur.name.toLowerCase().includes(searchText.toLowerCase());
            const matchesPeriode = filterPeriode ? item.periode === filterPeriode : true;
            const matchesYear = filterYear ? item.year === filterYear : true;
            return matchesSearch && matchesPeriode && matchesYear;
        });
    };

    const translatePeriode = (periode) => {
        switch (periode) {
            case "Printemps":
                return t("institutTraducteur.periode_1");
            case "Été":
                return t("institutTraducteur.periode_2");
            case "Automne":
                return t("institutTraducteur.periode_3");
            case "Hiver":
                return t("institutTraducteur.periode_4");
            case "Autre":
                return t("institutTraducteur.periode_5");
            default:
                return periode;
        }
    };


    const getResponsiveColumns = () => {
        const baseColumns = [
            {
                title: t("institutTraducteur.institute"),
                dataIndex: "institut",
                key: "institut",
                render: (_, record) =>
                    record.institut ? (
                        <Link
                            to={`/institut-traducteur/institut/${record.institut.id}/details`}
                            className="text-primary hover:text-primary-light transition-colors duration-200 flex items-center gap-1"
                        >
                            {record.institut.name}
                        </Link>
                    ) : (
                        "N/A"
                    ),
                sorter: (a, b) => (a.institut?.name && b.institut?.name ? a.institut.name.localeCompare(b.institut.name) : 0),
            },
            {
                title: t("institutTraducteur.requester"),
                dataIndex: "demandeur",
                key: "demandeur",
                render: (_, record) =>
                    record.demandeur ? (
                        <Link to={`/institut-traducteur/demandeur/${record.demandeur.id}/details`}>
                            <Tag color="blue">{record.demandeur.name}</Tag>
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
                    <Tag color="blue">
                        {translatePeriode(record.periode)} - {record.year}
                    </Tag>
                ),
                sorter: (a, b) => a.periode.localeCompare(b.periode),
            },
            {
                title: t("institutTraducteur.code"),
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
                        <Tag color="blue">{docs.length} document(s)</Tag>
                    </Link>
                ),
                responsive: ["md"],
            },
            {
                title: t("institutTraducteur.actions"),
                key: "actions",
                render: (_, record) => (
                    <Space size="small" wrap>
                        <Link to={`/institut-traducteur/dossier-a-traiter/${record.id}/details`}>
                            <Button icon={<EyeOutlined />} className="ant-btn-primary" type="default" size={windowWidth < 768 ? "small" : "middle"}>
                                {windowWidth >= 576 ? t("institutTraducteur.details") : ""}
                            </Button>
                        </Link>
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
                            <Button icon={<InfoCircleOutlined />} className="ant-btn-primary" size={windowWidth < 768 ? "small" : "middle"} />
                        </Popover>
                    </Space>
                ),
            },
        ];
        return baseColumns;
    };

    const columns = getResponsiveColumns();
    const tableContainerStyle = {
        overflowX: "auto",
        width: "100%",
        maxWidth: "100%",
    };

    return (
        <>
            <div style={{ background: "#f0f2f5", minHeight: "100vh" }}>
                <InstitutTraducteurBreadcrumb title={t("institutTraducteur.dossierATraiter")} SubTitle={institut?.name} />
                <section className="py-6">
                    <div className="container max-w-6xl mx-auto px-4">
                        <div className="bg-white rounded-xl shadow-xl overflow-hidden">

                            <div className="flex border-b border-gray-200">
                                <button className="flex items-center py-4 px-6 font-medium transition-colors duration-200 text-blueLogo">
                                    <FileText className="w-5 h-5 mr-2" />
                                    {t("institutTraducteur.assigned_requests_list")}
                                </button>
                            </div>
                            <div className="p-6">
                                <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px" }}>
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
                                                placeholder={t("institutTraducteur.search_placeholder")}
                                                prefix={<SearchOutlined />}
                                                value={searchText}
                                                onChange={(e) => setSearchText(e.target.value)}
                                                style={{ width: "100%", maxWidth: 300 }}
                                            />
                                            <Space wrap>
                                                <Select
                                                    placeholder={t("institutTraducteur.select_periode")}
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
                                                    placeholder={t("institutTraducteur.select_year")}
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
                                                <Button onClick={resetFilters} className="ant-btn-primary" type="default">
                                                    {t("common.reset_filters")}
                                                </Button>
                                            </Space>
                                        </div>
                                        <div style={tableContainerStyle}>
                                            <Table
                                                columns={columns}
                                                dataSource={getFilteredData()}
                                                rowKey="id"
                                                loading={loading}
                                                pagination={{
                                                    defaultPageSize: 5,
                                                    showSizeChanger: true,
                                                    showTotal: (total) => `${t("institutTraducteur.total")} ${total} ${t("institutTraducteur.requests")}`,
                                                }}
                                                scroll={{ x: "max-content" }}
                                                className="responsive-table"
                                            />
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </>
    );
};

export default InstitutTraducteurDocumentDetails;
