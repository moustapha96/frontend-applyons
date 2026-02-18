
"use client"

import { useState, useEffect } from "react"
import { useAuthContext } from "../../../context/useAuthContext"
import { useTranslation } from "react-i18next"
import { getDemandePartageDetail, getDocumentsDemandePartage, getFileDocumentPartager } from "../../../services/partageService"
import { message, Form, Input, Button, Card, Table, Spin, Tag, Space, Popover, Select, Modal } from "antd"
import { SearchOutlined, InfoCircleOutlined, FilePdfOutlined, DownloadOutlined, EyeOutlined, CalendarOutlined } from "@ant-design/icons"
import { useParams } from "react-router-dom"
import InstitutBreadcrumb from "@/components/InstitutBreadcrumb"
import { FileText, Calendar, Building } from "lucide-react"
import { CopyableFieldSimple } from "@/utils/CopyableField"

import { Descriptions } from "antd"

const InstitutCreateSuperviseur = () => {
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
    const isSmallScreen = windowWidth < 768;
    const descriptionsLayout = isSmallScreen ? "vertical" : "horizontal"
    // Determine if we should use column layout based on screen size




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
                        <div style={{ fontWeight: "600", color: "#254c6b" }}>{text}</div>
                        {/* <div style={{ fontSize: "12px", color: "#666" }}>
                            <Tag color="blue" size="small">
                                {record.typeDocument}
                            </Tag>
                        </div> */}
                    </div>
                ),
                sorter: (a, b) => a.intitule.localeCompare(b.intitule),
            },


            {
                title: t("institutPartageDetails.type"),
                dataIndex: "intitule",
                key: "intitule",
                render: (text, record) => (
                    <div>
                        {/* <div style={{ fontWeight: "600", color: "#254c6b" }}>{text}</div> */}
                        <div style={{ fontSize: "12px", color: "#666" }}>
                            <Tag color="blue" size="small">
                                {record.typeDocument}
                            </Tag>
                        </div>
                    </div>
                ),
                sorter: (a, b) => a.intitule.localeCompare(b.intitule),
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
                    <>
                        <Tag color="blue">
                            <Calendar className="w-3 h-3 inline mr-1" />
                            {record.anneeObtention}
                        </Tag>
                    </>
                ),
                sorter: (a, b) => a.anneeObtention - b.anneeObtention,
                responsive: ["lg"],
            },


            {
                title: t("institutPartage.actions"),
                key: "actions",
                render: (_, record) => (
                    <Space size="small" wrap>


                        <Button
                            className="ant-btn-primary"
                            icon={<EyeOutlined />}
                            onClick={() => handleViewDocument(record.id)}
                            size={isSmallScreen ? "small" : "middle"}
                        >
                            {!isSmallScreen && t("institutPartageDetails.view_document")}
                        </Button>


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
        <div style={{ background: "#f0f2f5", minHeight: "100vh" }}>
            <InstitutBreadcrumb title={t("institutMenu.documentTool")} SubTitle={institut?.name} />

            <section className="py-6">
                <div className="container max-w-7xl mx-auto px-4">
                    <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                        {demande && <>
                            <Card>
                                <Descriptions
                                    title={t("institutPartageDetails.request_information")}
                                    bordered
                                    column={isSmallScreen ? 1 : 3}
                                    layout={descriptionsLayout}
                                    size={isSmallScreen ? "small" : "default"}
                                >
                                    <Descriptions.Item label={t("institutPartageDetails.code")} span={3}>
                                        <Tag color="blue">
                                            <CopyableFieldSimple value={demande?.code} />
                                        </Tag>
                                    </Descriptions.Item>

                                    <Descriptions.Item label={t("demandePartage.year")} span={3}>
                                        <CalendarOutlined /> {demande.year}
                                    </Descriptions.Item>

                                    <Descriptions.Item label={t("demandePartage.periode")} span={3}>
                                        {demande.periode && <>
                                            {demande.periode === "Printemps" && <span>  {t("demandePartage.periode_1")} </span>}
                                            {demande.periode === "Été" && <span>  {t("demandePartage.periode_2")} </span>}
                                            {demande.periode === "Automne" && <span>  {t("demandePartage.periode_3")} </span>}
                                            {demande.periode === "Hiver" && <span>  {t("demandePartage.periode_4")} </span>}
                                            {demande.periode === "Autre" && <span>  {t("demandePartage.periode_5")} </span>}
                                        </>}
                                    </Descriptions.Item>


                                    <Descriptions.Item label={t("institutPartageDetails.request_date")} span={3}>
                                        <CalendarOutlined /> {new Date(demande.dateDemande).toLocaleDateString()}
                                    </Descriptions.Item>

                                    <Descriptions.Item label={t("institutPartageDetails.description")} span={3}>
                                        {demande.description}
                                    </Descriptions.Item>
                                </Descriptions>
                            </Card>
                        </>}

                        <div className="p-6">
                            <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "24px" }}>
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
                                            <Select
                                                placeholder={t("institutPartage.select_status", "Statut")}
                                                style={{ width: 120 }}
                                                allowClear
                                                onChange={handleStatutFilter}
                                                value={filterStatut}
                                            >
                                                {uniqueStatuts.map((statut) => (
                                                    <Select.Option key={statut} value={statut}>
                                                        {translateStatut(statut)}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                            <Button onClick={resetFilters} className="ant-btn-primary" type="default">
                                                {t("common.reset_filters", "Réinitialiser")}
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
                                                defaultPageSize: 10,
                                                showSizeChanger: true,
                                                showTotal: (total) =>
                                                    `${t("institutPartage.total", "Total")} ${total} ${t("institutPartage.documents", "document(s)")}`,
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

                        <Spin>
                            <span>{t("institutPartageDetails.loading_document")}</span>
                        </Spin>
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
                            title={t("institutPartageDetails.pdf_viewer")}
                        />
                    </object>
                ) : (
                    <div style={{ textAlign: "center", padding: "20px" }}>
                        <Text type="warning">{t("institutPartageDetails.no_document_to_display")}</Text>
                    </div>
                )}
            </Modal>
        </div>
    )


}


export default InstitutCreateSuperviseur

