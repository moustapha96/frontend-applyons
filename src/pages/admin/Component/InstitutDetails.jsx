
"use client"

import { useState, useEffect } from "react"
import { Card, Table, Tag, Descriptions, Typography, Space, Spin, Alert, Button, Badge, Input, Form, Popover } from "antd"
import {
    MailOutlined,
    PhoneOutlined,
    GlobalOutlined,
    EnvironmentOutlined,
    FileTextOutlined,
    EyeOutlined,
    SearchOutlined,
    InfoCircleOutlined,
} from "@ant-design/icons"
import { BankOutlined } from "@ant-design/icons"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getDemandePartageInstitut, getDocumentPartageInstitut } from "@/services/partageService"
import { useTranslation } from "react-i18next"
import { CopyableFieldSimple } from "@/utils/CopyableField"
import { AdminBreadcrumb } from "@/components"
import { message, Select } from "antd"
import { } from "@ant-design/icons"



const { Title, Text } = Typography

const InstitutDetails = () => {
    const { id } = useParams()
    const [institut, setInstitut] = useState(null)
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

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth)
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                // Données de démonstration
                const demoData = await getDocumentPartageInstitut(id);
                //console.log(demoData)
                setInstitut(demoData)
            } catch (err) {
                setError("Erreur lors du chargement des données")
                // message.error(t("institutPartage.error_fetching_institut"))
            } finally {
                setLoading(false)
            }
        }
        const fetchDemandes = async () => {
            try {
                const data = await getDemandePartageInstitut(id)
                setDemandes(data)
                extractUniqueFilters(data)
                //console.log(data)
            } catch (err) {
                message.error(t("institutPartage.error_fetching_requests"))
            } finally {
                setLoading(false)
            }
        }

        fetchDemandes()
        fetchData()
    }, [id])



    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px" }}>
                <Spin fullscreen size="large" />
            </div>
        )
    }

    if (error) {
        return <Alert message="Erreur" description={error} type="error" showIcon />
    }

    if (!institut) {
        return <Alert message="Institut non trouvé" type="warning" showIcon />
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

    const getFilteredData = () => {
        return demandes.filter((item) => {
            const matchesSearch =
                item.code.toLowerCase().includes(searchText.toLowerCase()) ||
                item.demandeur.name.toLowerCase().includes(searchText.toLowerCase())

            const matchesPeriode = filterPeriode ? item.periode === filterPeriode : true
            const matchesYear = filterYear ? item.year === filterYear : true

            return matchesSearch && matchesPeriode && matchesYear
        })
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
                title: t("institutPartage.requester"),
                dataIndex: "demandeur",
                key: "demandeur",
                render: (_, record) => (record.demandeur ?
                    <>
                        <Link to={`/admin/demandeur/${record.demandeur.id}/details`}>
                            <Tag color="blue">{record.demandeur.name}</Tag>
                        </Link>
                    </>
                    :
                    <span>N/A</span>),
                sorter: (a, b) => a.demandeur?.name.localeCompare(b.demandeur?.name),
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
                title: t("institutPartage.code"),
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
                title: t("institutPartage.request_date"),
                dataIndex: "dateDemande",
                key: "dateDemande",
                render: (date) => new Date(date).toLocaleDateString(),
                sorter: (a, b) => new Date(a.dateDemande) - new Date(b.dateDemande),
                responsive: ["md"],
            },

            {
                title: t("institutPartage.documents"),
                dataIndex: "documentPartages",
                key: "documentPartages",
                render: (docs, record) => (
                    <Link to={`/admin/partages/${record.id}/details#documents`}>
                        <Tag color="blue">{docs.length} document(s)</Tag>
                    </Link>
                ),
                responsive: ["md"],
            },
            {
                title: t("institutPartage.actions"),
                key: "actions",
                render: (_, record) => (
                    <Space size="small" wrap>
                        <Link
                            to={`/admin/partages/${record.id}/details`}

                        >
                            <Button
                                className="ant-btn-primary"
                                icon={<EyeOutlined />}
                                title="Voir les détails de la demande"
                                size={windowWidth < 768 ? "small" : "middle"}
                            >
                                {windowWidth >= 576 ? t("institutPartage.details") : ""}
                            </Button>
                        </Link>

                        <Popover
                            content={
                                <div style={{ maxWidth: "400px" }}>
                                    <Space direction="vertical">
                                        <div>
                                            <strong>{t("institutPartage.requester")}:</strong>
                                            <p>{record.demandeur.name}</p>
                                            <p>
                                                {record.demandeur.type} - {record.demandeur.paysResidence}
                                            </p>
                                            <p>
                                                {t("institutPartage.email")}: {record.demandeur.email}
                                            </p>
                                            <p>
                                                {t("institutPartage.phone")}: {record.demandeur.phone}
                                            </p>
                                        </div>
                                        {record.documentPartages.length > 0 && (
                                            <div>
                                                <strong>{t("institutPartage.documents")}:</strong>
                                                {record.documentPartages.map((doc, index) => (
                                                    <div key={index} style={{ marginTop: "8px" }}>
                                                        <p>
                                                            {doc.intitule} - {doc.typeDocument}
                                                        </p>
                                                        <p>
                                                            {" "}
                                                            {t("institutPartage.dna_code")} : {doc.codeAdn}
                                                        </p>
                                                        <Tag color={doc.statut === "ACCEPTED" ? "success" : "processing"}>
                                                            {t(`institutPartage.status.${doc.statut.toLowerCase()}`)}
                                                        </Tag>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </Space>
                                </div>
                            }
                            title={t("institutPartage.request_details")}
                            trigger="click"
                            placement="right"
                        >
                            <Button icon={<InfoCircleOutlined />} className="ant-btn-primary" size={windowWidth < 768 ? "small" : "middle"} />
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

    return (
        <div style={{ padding: "24px" }}>
            <AdminBreadcrumb title={t("admin.institut_details")} SubTitle={institut.name} />

            <Space direction="vertical" size="large" style={{ width: "100%" }}>
                {/* Détails de l'institut */}
                <Card
                    title={
                        <Space>
                            <BankOutlined />
                            <span>{t("demandeurPartageDetails.institute_information")}</span>
                        </Space>
                    }
                >
                    <Descriptions bordered>
                        <Descriptions.Item label={t("demandeurPartageDetails.name")} span={3}>
                            {institut.name}
                        </Descriptions.Item>
                        <Descriptions.Item label={t("demandeurPartageDetails.type")} span={2}>
                            {institut.type}
                        </Descriptions.Item>
                        <Descriptions.Item label={t("demandeurPartageDetails.country")}>{institut.paysResidence}</Descriptions.Item>
                        <Descriptions.Item label={t("demandeurPartageDetails.email")} span={2}>
                            <Space>
                                <MailOutlined />
                                {institut.email}
                            </Space>
                        </Descriptions.Item>
                        <Descriptions.Item label={t("demandeurPartageDetails.phone")}>
                            <Space>
                                <PhoneOutlined />
                                {institut.phone}
                            </Space>
                        </Descriptions.Item>
                        <Descriptions.Item label={t("demandeurPartageDetails.address")} span={3}>
                            <Space>
                                <EnvironmentOutlined />
                                {institut.adresse}
                            </Space>
                        </Descriptions.Item>
                        <Descriptions.Item label={t("admin.website")} span={3}>
                            <Space>
                                <GlobalOutlined />
                                <a href={institut.siteWeb} target="_blank" rel="noopener noreferrer">
                                    {institut.siteWeb}
                                </a>
                            </Space>
                        </Descriptions.Item>
                        <Descriptions.Item label="Code utilisateur" span={3}>
                            <Tag color="green">{institut.codeUser}</Tag>
                        </Descriptions.Item>
                    </Descriptions>
                </Card>

                {/* Tableau des demandes */}
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
                            placeholder={t("institutPartage.search_placeholder")}
                            prefix={<SearchOutlined />}
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            style={{ width: "100%", maxWidth: 300 }}
                        />
                        <Space wrap>
                            <Select
                                placeholder={t("demandePartage.select_periode")}
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
                    <div style={tableContainerStyle}>
                        <Table
                            columns={columns}
                            dataSource={getFilteredData()}
                            rowKey="id"
                            loading={loading}
                            pagination={{
                                defaultPageSize: 5,
                                showSizeChanger: true,
                                showTotal: (total) =>
                                    `${t("institutPartage.total")} ${total} ${t("institutPartage.requests")}`,
                            }}
                            scroll={{ x: "max-content" }}
                            className="responsive-table"
                        />
                    </div>
                </Card>
            </Space>
        </div>
    )
}

export default InstitutDetails
