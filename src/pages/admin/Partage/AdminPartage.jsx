"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { getDemandePartageAdmin } from "../../../services/partageService"
import { message, Tabs, Input, Select, Button, Card, Table, Spin, Tag, Space, Popover } from "antd"
import { PlusOutlined, SearchOutlined, EyeOutlined, InfoCircleOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import { CopyableFieldSimple } from "@/utils/CopyableField"
import { AdminBreadcrumb } from "@/components"

const { TabPane } = Tabs
const { TextArea } = Input

const AdminPartage = () => {
    const [loading, setLoading] = useState(true)
    const [demandes, setDemandes] = useState([])
    const [searchText, setSearchText] = useState("")
    const { t } = useTranslation()
    const [error, setError] = useState(null)

    const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0)
    const [filterPeriode, setFilterPeriode] = useState(null)
    const [filterYear, setFilterYear] = useState(null)
    const [uniquePeriodes, setUniquePeriodes] = useState([])
    const [uniqueYears, setUniqueYears] = useState([])

    useEffect(() => {
        fetchDemandes()
    }, [])

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    useEffect(() => {
        if (demandes.length > 0) {
            extractUniqueFilters(demandes)
        }
    }, [demandes])

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

    const getFilteredData = () => {
        return demandes.filter((item) => {
            const matchesSearch =
                item.code.toLowerCase().includes(searchText.toLowerCase()) ||
                (item.institut?.name && item.institut.name.toLowerCase().includes(searchText.toLowerCase()))

            const matchesPeriode = filterPeriode ? item.periode === filterPeriode : true
            const matchesYear = filterYear ? item.year === filterYear : true

            return matchesSearch && matchesPeriode && matchesYear
        })
    }


    const fetchDemandes = async () => {
        try {
            const data = await getDemandePartageAdmin()
            setDemandes(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
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

    // if (loading) {
    //     return (
    //         <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
    //             <Spin size="large" tip={t("common.loading")} />
    //         </div>
    //     )
    // }

    const columns = [
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
            sorter: (a, b) => a.periode - b.periode,
        },
        {
            title: t("demandeurPartage.request_date"),
            dataIndex: "dateDemande",
            key: "dateDemande",
            render: (date) => new Date(date).toLocaleDateString(),
            sorter: (a, b) => new Date(a.dateDemande) - new Date(b.dateDemande),
        },
        {
            title: t("demandeurPartage.requester"),
            dataIndex: "demandeur",
            key: "demandeur",
            render: (_, record) =>
                record.demandeur ? (
                    <Link
                        to={`/admin/demandeur/${record.demandeur.id}/details`}
                        className="text-primary hover:text-primary-light transition-colors duration-200 flex items-center gap-1"
                    >
                        {record.demandeur.name}
                    </Link>
                ) : (
                    "N/A"
                ),
            sorter: (a, b) => (a.demandeur?.name && b.demandeur?.name ? a.demandeur.name.localeCompare(b.demandeur.name) : 0),
        },
        {
            title: t("demandeurPartage.institute"),
            dataIndex: "institut",
            key: "institut",
            render: (_, record) =>
                record.institut ? (
                    <Link
                        to={`/admin/institut/${record.institut.id}/details`}
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
            title: t("demandeurPartage.documents"),
            dataIndex: "documentPartages",
            key: "documentPartages",
            render: (_, record) => (
                <>
                    {record.documentPartages.length > 0 ? (
                        <>
                            <Link to={`/admin/partages/${record.id}/details#documents`}>
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
                <Space>
                    <Link
                        to={`/admin/partages/${record.id}/details`}
                        className="ant-btn-primary"
                    >
                        <Button
                            className="ant-btn-primary"
                            icon={<EyeOutlined />}
                            title={t("demandeurPartage.view_request_details")}
                        >
                            {t("demandeurPartage.details")}
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
                        <Button icon={<InfoCircleOutlined />} className="ant-btn-primary" />
                    </Popover>
                </Space>
            ),
        },
    ]

    return (
        <div style={{ background: "#f0f2f5", minHeight: "100vh" }}>

            <AdminBreadcrumb title={t("demandeurPartage.document_sharing")} />
            <section>
                <div className="container">
                    <div className="my-6 space-y-6">
                        <div className="grid grid-cols-1">
                            <div className="container max-w-6xl mx-auto px-4">
                                <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                                    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px" }}>
                                        <Card>
                                            <div
                                                style={{
                                                    marginBottom: 16,
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    flexDirection: windowWidth < 768 ? "column" : "row",
                                                    gap: "10px",
                                                }}
                                            >
                                                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "10px" }}>
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
                                                        <Button onClick={resetFilters} type="default">
                                                            {t("common.reset_filters")}
                                                        </Button>
                                                    </Space>
                                                </div>

                                            </div>

                                            <Table
                                                columns={columns}
                                                dataSource={getFilteredData()}
                                                rowKey="id"
                                                loading={loading}
                                                pagination={{
                                                    defaultPageSize: 5,
                                                    showSizeChanger: true,
                                                    showTotal: (total) => `${t("demandeurPartage.total")} ${total} ${t("demandeurPartage.requests")}`,
                                                }}
                                                scroll={{ x: "max-content" }}
                                                responsive={true}
                                            />
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default AdminPartage
