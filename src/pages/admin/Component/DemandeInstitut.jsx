"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { AdminBreadcrumb } from "@/components"
import { getInstitutPartageDocument } from "../../../services/institutService"
import {
    Table,
    Input,
    Button,
    Card,
    Typography,
    Tag,
    Space,
    Spin,
    Alert,
    Pagination,
    Descriptions,
    Popover,
} from "antd"
import { SearchOutlined, EyeOutlined, BankOutlined, InfoCircleOutlined } from "@ant-design/icons"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { CopyableFieldSimple } from "@/utils/CopyableField"

const { Title, Text } = Typography

const AdminDemandeInstitut = () => {
    const { t } = useTranslation()
    const { id } = useParams()
    const [institut, setInstitut] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [demandes, setDemandes] = useState([])
    const [filteredDemandes, setFilteredDemandes] = useState([])
    const [searchText, setSearchText] = useState("")
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 5,
        total: 0,
    })

    const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0)
    const isMobile = windowWidth < 768

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    useEffect(() => {
        const fetchDemande = async () => {
            try {
                const data = await getInstitutPartageDocument(id)
                //console.log(data)
                setInstitut(data)
                setDemandes(data.demandes || [])
                setFilteredDemandes(data.demandes || [])
                setPagination((prev) => ({ ...prev, total: (data.demandes || []).length }))
            } catch (err) {
                setError(t("admin.error_loading_demandes"))
            } finally {
                setLoading(false)
            }
        }
        fetchDemande()
    }, [id, t])

    useEffect(() => {
        const filtered = demandes.filter(
            (demande) =>
                demande.description?.toLowerCase().includes(searchText.toLowerCase()) ||
                demande.demandeur?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
                demande.code?.toLowerCase().includes(searchText.toLowerCase()),
        )
        setFilteredDemandes(filtered)
        setPagination((prev) => ({
            ...prev,
            current: 1,
            total: filtered.length,
        }))
    }, [searchText, demandes])

    const handleSearch = (e) => {
        setSearchText(e.target.value)
    }

    const handlePageChange = (page, pageSize) => {
        setPagination((prev) => ({ ...prev, current: page }))
    }

    const formatDate = (dateString) => {
        if (!dateString) return "N/A"
        const date = new Date(dateString)
        return date.toLocaleDateString()
    }

    const columns = [
        {
            title: t("institutPartage.requester"),
            dataIndex: "demandeur",
            key: "demandeur",
            render: (_, record) =>
                record.demandeur ? (
                    <>
                        <Link to={`/admin/demandeur/${record.demandeur.id}/details`}>
                            <Tag color="blue">{record.demandeur.name}</Tag>
                        </Link>
                    </>
                ) : (
                    <span>N/A</span>
                ),
            sorter: (a, b) => a.demandeur?.name.localeCompare(b.demandeur?.name),
            width: 150,
        },
        {
            title: t("institutPartage.code"),
            dataIndex: "code",
            key: "code",
            render: (code) => (
                <Tag color="blue">
                    <CopyableFieldSimple value={code} />
                </Tag>
            ),
            sorter: (a, b) => a.code.localeCompare(b.code),
            width: 180,
        },
        {
            title: t("institutPartage.request_date"),
            dataIndex: "dateDemande",
            key: "dateDemande",
            render: (date) => formatDate(date),
            sorter: (a, b) => new Date(a.dateDemande) - new Date(b.dateDemande),
            width: 120,
        },

        {
            title: t("institutPartage.documents"),
            dataIndex: "documents",
            key: "documents",
            render: (docs, record) => (
                <Link to={`/admin/partages/${record.id}/details`}>
                    <Tag color="blue">{docs?.length || 0} document(s)</Tag>
                </Link>
            ),
            width: 120,
        },
        {
            title: t("institutPartage.actions"),
            key: "actions",
            fixed: isMobile ? false : "right",
            width: 150,
            render: (_, record) => (
                <Space size="small" wrap>
                    <Link
                        to={`/admin/partages/${record.id}/details`}

                    >
                        <Button
                            className="ant-btn-primary"
                            icon={<EyeOutlined />}
                            title="Voir les détails de la demande"
                            size={isMobile ? "small" : "middle"}
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
                                            {record.demandeur.profession} - {record.demandeur.paysResidence}
                                        </p>
                                        <p>
                                            {t("institutPartage.email")}: {record.demandeur.email}
                                        </p>
                                        <p>
                                            {t("institutPartage.phone")}: {record.demandeur.phone}
                                        </p>
                                    </div>
                                    {record.documents && record.documents.length > 0 && (
                                        <div>
                                            <strong>{t("institutPartage.documents")}:</strong>
                                            {record.documents.map((doc, index) => (
                                                <div key={index} style={{ marginTop: "8px" }}>
                                                    <p>
                                                        {doc.intitule} - {doc.typeDocument}
                                                    </p>
                                                    <p>
                                                        {t("institutPartage.dna_code")}: {doc.codeAdn}
                                                    </p>
                                                    <Tag
                                                        color={doc.statut === "ACCEPTED" || doc.statut === "Accepted" ? "success" : "processing"}
                                                    >
                                                        {doc.statut}
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
                        placement="left"
                    >
                        <Button icon={<InfoCircleOutlined />} className="ant-btn-primary" size={isMobile ? "small" : "middle"} />
                    </Popover>
                </Space>
            ),
        },
    ]

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" tip={t("admin.loading_institut_details")} />
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Alert message={t("admin.error")} description={error} type="error" showIcon />
            </div>
        )
    }

    return (
        <>
            <AdminBreadcrumb title={t("admin.demande_institut")} SubTitle={institut?.type + "  " + institut?.name} />
            <div className="container mx-auto my-6 px-4">
                {/* Information de l'institut */}
                <Card
                    title={
                        <Space>
                            <BankOutlined />
                            <span>{t("demandeurPartageDetails.institute_information")}</span>
                        </Space>
                    }
                    className="mb-6"
                >
                    {isMobile ? (
                        <Space direction="vertical" className="w-full">
                            <div>
                                <Text strong>{t("demandeurPartageDetails.name")}:</Text>
                                <div>{institut.name}</div>
                            </div>
                            <div>
                                <Text strong>{t("demandeurPartageDetails.type")}:</Text>
                                <div>{institut.type}</div>
                            </div>
                            <div>
                                <Text strong>{t("demandeurPartageDetails.country")}:</Text>
                                <div>{institut.pays_residence}</div>
                            </div>
                            <div>
                                <Text strong>{t("demandeurPartageDetails.email")}:</Text>
                                <div>{institut.email}</div>
                            </div>
                            <div>
                                <Text strong>{t("demandeurPartageDetails.phone")}:</Text>
                                <div>{institut.phone}</div>
                            </div>
                            <div>
                                <Text strong>{t("demandeurPartageDetails.address")}:</Text>
                                <div>{institut.adresse}</div>
                            </div>
                        </Space>
                    ) : (
                        <Descriptions bordered>
                            <Descriptions.Item label={t("demandeurPartageDetails.name")} span={3}>
                                {institut.name}
                            </Descriptions.Item>
                            <Descriptions.Item label={t("demandeurPartageDetails.type")} span={2}>
                                {institut.type}
                            </Descriptions.Item>
                            <Descriptions.Item label={t("demandeurPartageDetails.country")}>
                                {institut.pays_residence}
                            </Descriptions.Item>
                            <Descriptions.Item label={t("demandeurPartageDetails.email")} span={2}>
                                {institut.email}
                            </Descriptions.Item>
                            <Descriptions.Item label={t("demandeurPartageDetails.phone")}>{institut.phone}</Descriptions.Item>
                            <Descriptions.Item label={t("demandeurPartageDetails.address")} span={3}>
                                {institut.adresse}
                            </Descriptions.Item>
                        </Descriptions>
                    )}
                </Card>

                <Card title={<Title level={4}>{t("admin.demandes_list")}</Title>} className="overflow-x-auto">
                    <div className="mb-6">
                        <Input
                            placeholder={t("admin.search_placeholder")}
                            prefix={<SearchOutlined />}
                            value={searchText}
                            onChange={handleSearch}
                            allowClear
                        />
                    </div>

                    <div className="overflow-x-auto">
                        <Table
                            columns={columns}
                            dataSource={filteredDemandes}
                            loading={loading}
                            pagination={{ pageSize: 5 }}
                            rowKey="id"

                            scroll={{ x: 1000 }}
                            size={isMobile ? "small" : "middle"}
                            locale={{
                                emptyText: t("admin.no_results_found"),
                            }}
                        />
                    </div>

                    {/* {filteredDemandes.length > 0 && (
                        <div className="mt-4 flex justify-end">
                            <Pagination
                                current={pagination.current}
                                pageSize={pagination.pageSize}
                                total={pagination.total}
                                onChange={handlePageChange}
                                showSizeChanger={false}
                                showTotal={(total, range) =>
                                    `${t("showing")} ${range[0]} ${t("to")} ${range[1]} ${t("of")} ${total} ${t("entries")}`
                                }
                                size={isMobile ? "small" : "default"}
                            />
                        </div>
                    )} */}
                </Card>
            </div>
        </>
    )
}

export default AdminDemandeInstitut
