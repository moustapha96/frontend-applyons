
"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { useTranslation } from "react-i18next"
import {
    Table,
    Button,
    Modal,
    Form,
    Input,
    Select,
    Tabs,
    Card,
    Space,
    Typography,
    Tag,
    message,
    Row,
    Col,
    Statistic,
    Dropdown,
} from "antd"
import {
    PlusOutlined,
    DeleteOutlined,
    BuildOutlined,
    BookOutlined,
    SearchOutlined,
    DownloadOutlined,
    UploadOutlined,
    EyeOutlined,
    MoreOutlined,
} from "@ant-design/icons"
import InstitutBreadcrumb from "@/components/InstitutBreadcrumb"
import {
    createDepartement,
    createFiliere,
    departementsInstitut,
    filieresInstitut,
    updateDepartementInstitut,
    updateFiliere,
} from "@/services/deprtamentFiliereService"
import { useAuthContext } from "@/context"

const { Title } = Typography
const { TextArea } = Input

const GestionProgramme = () => {
    const { t } = useTranslation()
    const { institut } = useAuthContext()
    const [departments, setDepartments] = useState([])
    const [programs, setPrograms] = useState([])
    const [loading, setLoading] = useState(true)
    const [modalVisible, setModalVisible] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [currentItem, setCurrentItem] = useState(null)
    const [activeTab, setActiveTab] = useState("departments")
    const [searchText, setSearchText] = useState("")
    const [form] = Form.useForm()

    const statistics = useMemo(() => {
        const totalDepartments = departments.length
        const totalPrograms = programs.length
        const activeDepartments = departments.filter((dept) => dept.filieres > 0).length

        return {
            totalDepartments,
            totalPrograms,
            activeDepartments,
            averagePrograms: totalDepartments > 0 ? Math.round((totalPrograms / totalDepartments) * 10) / 10 : 0,
        }
    }, [departments, programs])

    const getActionMenu = useCallback(
        (record) => ({
            items: [
                {
                    key: "details",
                    label: t("common.edit"),
                    icon: <EyeOutlined />,
                    onClick: () => handleEdit(record),
                },
               
                {
                    type: "divider",
                },
                {
                    key: "delete",
                    label: t("common.delete"),
                    icon: <DeleteOutlined />,
                    danger: true,
                    onClick: () => message.info("Suppression à implémenter"),
                },
            ],
        }),
        [t],
    )

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        try {
            setLoading(true)
            const [deptData, progData] = await Promise.all([departementsInstitut(institut.id), filieresInstitut(institut.id)])
            setDepartments(deptData)
            setPrograms(progData)
            console.log(deptData, progData)
        } catch (error) {
            console.error("Error loading data:", error)
            message.error(t("gestionprogramme.departements.error_fetch"))
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (values) => {
        setLoading(true)
        try {
            if (activeTab === "departments") {
                const body = {
                    nom: values.nom,
                    code: values.code,
                    description: values.description,
                    institutId: institut.id,
                    departementId: values.id,
                }

                if (editMode && currentItem) {
                    await updateDepartementInstitut(institut.id, currentItem.id, body)
                    message.success(t("gestionprogramme.departements.update_success"))
                } else {
                    await createDepartement(institut.id, body)
                    message.success(t("gestionprogramme.departements.create_success"))
                }
            } else {
                const body = {
                    nom: values.nom,
                    code: values.code,
                    description: values.description,
                    departementId: values.departementId,
                    institutId: institut.id,
                }

                if (editMode && currentItem) {
                    body.filiereId = currentItem.id
                    await updateFiliere(institut.id, body)
                    message.success(t("gestionprogramme.filieres.update_success"))
                } else {
                    await createFiliere(institut.id, body)
                    message.success(t("gestionprogramme.filieres.create_success"))
                }
            }

            setModalVisible(false)
            form.resetFields()
            setEditMode(false)
            setCurrentItem(null)
            loadData()
        } catch (error) {
            console.error("Error submitting form:", error)
            const errorKey =
                activeTab === "departments"
                    ? editMode
                        ? "gestionprogramme.departements.error_update"
                        : "gestionprogramme.departements.error_create"
                    : editMode
                        ? "gestionprogramme.filieres.error_update"
                        : "gestionprogramme.filieres.error_create"
            message.error(t(errorKey))
        } finally {
            setLoading(false)
        }
    }

    const handleEdit = (item) => {
        setCurrentItem(item)
        setEditMode(true)
        form.setFieldsValue({
            nom: item.nom || item.name || "",
            code: item.code || "",
            description: item.description || "",
            departementId: item.departementId,
        })
        setModalVisible(true)
    }

    const handleAdd = () => {
        setEditMode(false)
        setCurrentItem(null)
        form.resetFields()
        setModalVisible(true)
    }

    const getFilteredDepartments = () => {
        return departments.filter(
            (item) =>
                item.nom.toLowerCase().includes(searchText.toLowerCase()) ||
                item.code.toLowerCase().includes(searchText.toLowerCase()),
        )
    }

    const getFilteredPrograms = () => {
        return programs.filter(
            (item) =>
                item.nom.toLowerCase().includes(searchText.toLowerCase()) ||
                item.code.toLowerCase().includes(searchText.toLowerCase()) ||
                (item.departement && item.departement.toLowerCase().includes(searchText.toLowerCase())),
        )
    }

    const departmentColumns = [
        {
            title: t("gestionprogramme.departements.name"),
            dataIndex: "nom",
            key: "nom",
            render: (text, record) => (
                <Space direction="vertical" size={0}>
                    <span style={{ fontWeight: 600, color: "#1890ff" }}>{text}</span>
                    <Tag color="blue">{record.code}</Tag>
                </Space>
            ),
            sorter: (a, b) => a.nom.localeCompare(b.nom),
        },
        {
            title: t("gestionprogramme.departements.description"),
            dataIndex: "description",
            key: "description",
            ellipsis: true,
            render: (text) => <span style={{ color: "#666" }}>{text}</span>,
        },
        {
            title: t("gestionprogramme.filieres.title"),
            key: "programsCount",
            render: (record) => (
                <Tag color="green" style={{ fontWeight: "bold" }}>
                    {record.filieres || 0}
                </Tag>
            ),
        },
        {
            title: t("gestionprogramme.departements.actions"),
            key: "actions",
            width: 120,
            render: (record) => (
                <Dropdown menu={getActionMenu(record)} trigger={["click"]} placement="bottomRight">
                    <Button
                        type="text"
                        icon={<MoreOutlined />}
                        style={{
                            border: "1px solid #d9d9d9",
                            borderRadius: "6px",
                            background: "#254c6b",
                            color: "white",
                        }}
                    />
                </Dropdown>
            ),
        },
    ]

    const programColumns = [
        {
            title: t("gestionprogramme.filieres.name"),
            dataIndex: "nom",
            key: "nom",
            render: (text, record) => (
                <Space direction="vertical" size={0}>
                    <span style={{ fontWeight: 600, color: "#1890ff" }}>{text}</span>
                    <Tag color="blue">{record.code}</Tag>
                </Space>
            ),
            sorter: (a, b) => a.nom.localeCompare(b.nom),
        },
        {
            title: t("gestionprogramme.filieres.description"),
            dataIndex: "description",
            key: "description",
            ellipsis: true,
            render: (text) => <span style={{ color: "#666" }}>{text}</span>,
        },
        {
            title: t("gestionprogramme.filieres.departement"),
            dataIndex: "departement",
            key: "departement",
            render: (text) =>
                text && (
                    <Tag color="orange" style={{ fontWeight: "bold" }}>
                        {text}
                    </Tag>
                ),
            sorter: (a, b) => (a.departement || "").localeCompare(b.departement || ""),
        },
        {
            title: t("gestionprogramme.filieres.actions"),
            key: "actions",
            width: 120,
            render: (record) => (
                <Dropdown menu={getActionMenu(record)} trigger={["click"]} placement="bottomRight">
                    <Button
                        type="text"
                        icon={<MoreOutlined />}
                        style={{
                            border: "1px solid #d9d9d9",
                            borderRadius: "6px",
                            background: "#254c6b",
                            color: "white",
                        }}
                    />
                </Dropdown>
            ),
        },
    ]

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 blueLogo"></div>
            </div>
        )
    }



    return (
        <div
            style={{
                // background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                minHeight: "100vh",
            }}
        >
            <InstitutBreadcrumb title={t("gestionprogramme.title")} SubTitle={institut?.name} />

            <section className="py-6">
                <div className="container max-w-7xl mx-auto px-4">
                    <Row gutter={[16, 16]} className="mb-6">
                        <Col xs={24} sm={12} md={12}>
                            <Card
                                className="text-center shadow-lg"
                                style={{ borderRadius: "12px", background: "rgba(255,255,255,0.95)" }}
                            >
                                <Statistic
                                    title={t('gestionprogramme.total_departements')}
                                    value={statistics.totalDepartments}
                                    valueStyle={{ color: "#254c6b", fontSize: "28px", fontWeight: "bold" }}
                                    prefix={<BuildOutlined />}
                                />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={12}>
                            <Card
                                className="text-center shadow-lg"
                                style={{ borderRadius: "12px", background: "rgba(255,255,255,0.95)" }}
                            >
                                <Statistic
                                    title={t('gestionprogramme.total_filieres')}
                                    value={statistics.totalPrograms}
                                    valueStyle={{ color: "#52c41a", fontSize: "28px", fontWeight: "bold" }}
                                    prefix={<BookOutlined />}
                                />
                            </Card>
                        </Col>
                        {/* <Col xs={24} sm={12} md={6}>
                            <Card
                                className="text-center shadow-lg"
                                style={{ borderRadius: "12px", background: "rgba(255,255,255,0.95)" }}
                            >
                                <Statistic
                                    title="Départements Actifs"
                                    value={statistics.activeDepartments}
                                    valueStyle={{ color: "#fa8c16", fontSize: "28px", fontWeight: "bold" }}
                                    prefix={<BuildOutlined />}
                                />
                            </Card>
                        </Col> */}
                        
                    </Row>

                    <div
                        className="bg-white rounded-xl shadow-2xl overflow-hidden"
                        style={{ background: "rgba(255,255,255,0.98)" }}
                    >
                        <div className="p-6">
                            <Card style={{ border: "none", boxShadow: "none" }}>
                                <Tabs
                                    activeKey={activeTab}
                                    onChange={setActiveTab}
                                    size="large"
                                    tabBarStyle={{
                                        marginBottom: "24px",
                                        borderBottom: "2px solid #f0f0f0",
                                    }}
                                    tabBarExtraContent={
                                        <Space size="middle">
                                            <Input
                                                placeholder={
                                                    activeTab === "departments"
                                                        ? t("gestionprogramme.departements.search_placeholder")
                                                        : t("gestionprogramme.filieres.search_placeholder")
                                                }
                                                prefix={<SearchOutlined style={{ color: "#254c6b" }} />}
                                                value={searchText}
                                                onChange={(e) => setSearchText(e.target.value)}
                                                style={{
                                                    width: 280,
                                                    borderRadius: "8px",
                                                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                                                }}
                                            />
                                            <Button
                                                type="primary"
                                                icon={<PlusOutlined />}
                                                onClick={handleAdd}
                                                size="large"
                                                style={{
                                                    background: "bleuLogo",
                                                    border: "none",
                                                    borderRadius: "8px",
                                                    boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                {activeTab === "departments"
                                                    ? t("gestionprogramme.departements.add")
                                                    : t("gestionprogramme.filieres.add")}
                                            </Button>
                                        </Space>
                                    }
                                >
                                    <Tabs.TabPane
                                        tab={
                                            <span
                                                style={{
                                                    fontSize: "16px",
                                                    fontWeight: "600",
                                                    color: activeTab === "departments" ? "#007BFF" : "#254c6b", // Couleur bleue si actif
                                                }}
                                            >
                                                <BuildOutlined style={{ marginRight: "8px" }} />
                                                {t("gestionprogramme.tabs.departements")}
                                            </span>
                                        }
                                        key="departments"
                                    >
                                        <Table
                                            columns={departmentColumns}
                                            dataSource={getFilteredDepartments()}
                                            rowKey="id"
                                            pagination={{
                                                defaultPageSize: 10,
                                                showSizeChanger: true,
                                                showQuickJumper: true,
                                                showTotal: (total) =>
                                                    `${t("gestionprogramme.departements.total")} ${total} ${t("gestionprogramme.departements.items")}`,
                                                style: { marginTop: "16px" },
                                            }}
                                            locale={{ emptyText: t("gestionprogramme.form.loading") }}
                                            style={{
                                                background: "white",
                                                borderRadius: "8px",
                                                overflow: "hidden",
                                            }}
                                            rowClassName={(record, index) => (index % 2 === 0 ? "table-row-light" : "table-row-dark")}
                                        />
                                    </Tabs.TabPane>

                                    <Tabs.TabPane
                                        tab={
                                            <span
                                                style={{
                                                    fontSize: "16px",
                                                    fontWeight: "600",
                                                    color: activeTab === "programs" ? "#007BFF" : "#254c6b", // Couleur bleue si actif
                                                }}
                                            >
                                                <BookOutlined style={{ marginRight: "8px" }} />
                                                {t("gestionprogramme.tabs.filieres")}
                                            </span>
                                        }
                                        key="programs"
                                    >
                                        <Table
                                            columns={programColumns}
                                            dataSource={getFilteredPrograms()}
                                            rowKey="id"
                                            pagination={{
                                                defaultPageSize: 10,
                                                showSizeChanger: true,
                                                showQuickJumper: true,
                                                showTotal: (total) =>
                                                    `${t("gestionprogramme.filieres.total")} ${total} ${t("gestionprogramme.filieres.items")}`,
                                                style: { marginTop: "16px" },
                                            }}
                                            locale={{ emptyText: t("gestionprogramme.form.loading") }}
                                            style={{
                                                background: "white",
                                                borderRadius: "8px",
                                                overflow: "hidden",
                                            }}
                                            rowClassName={(record, index) => (index % 2 === 0 ? "table-row-light" : "table-row-dark")}
                                        />
                                    </Tabs.TabPane>
                                </Tabs>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            <Modal
                title={
                    <span style={{ fontSize: "18px", fontWeight: "bold", color: "#254c6b" }}>
                        {editMode
                            ? activeTab === "departments"
                                ? t("gestionprogramme.departements.edit")
                                : t("gestionprogramme.filieres.edit")
                            : activeTab === "departments"
                                ? t("gestionprogramme.departements.add")
                                : t("gestionprogramme.filieres.add")}
                    </span>
                }
                open={modalVisible}
                onCancel={() => {
                    setModalVisible(false)
                    form.resetFields()
                    setEditMode(false)
                    setCurrentItem(null)
                }}
                footer={null}
                width={650}
                style={{ top: 20 }}
                bodyStyle={{
                    padding: "24px",
                    background: "linear-gradient(135deg, #f6f9fc 0%, #ffffff 100%)",
                }}
            >
                <Form form={form} layout="vertical" onFinish={handleSubmit} style={{ marginTop: "16px" }}>
                    <Form.Item
                        name="nom"
                        label={
                            activeTab === "departments"
                                ? t("gestionprogramme.departements.name")
                                : t("gestionprogramme.filieres.name")
                        }
                        rules={[{ required: true, message: t("gestionprogramme.form.name_required") }]}
                    >
                        <Input placeholder={`${t("gestionprogramme.form.name_required")}`} />
                    </Form.Item>

                    <Form.Item
                        name="code"
                        label={
                            activeTab === "departments"
                                ? t("gestionprogramme.departements.code")
                                : t("gestionprogramme.filieres.code")
                        }
                        rules={[{ required: true, message: t("gestionprogramme.form.code_required") }]}
                    >
                        <Input placeholder={`${t("gestionprogramme.form.code_required")}`} />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label={
                            activeTab === "departments"
                                ? t("gestionprogramme.departements.description")
                                : t("gestionprogramme.filieres.description")
                        }
                    >
                        <TextArea rows={3} placeholder={`${t("gestionprogramme.form.description_required")}`} />
                    </Form.Item>

                    {activeTab === "programs" && (
                        <Form.Item
                            name="departementId"
                            label={t("gestionprogramme.filieres.departement")}
                            rules={[{ required: true, message: t("gestionprogramme.form.departement_required") }]}
                        >
                            <Select placeholder={t("gestionprogramme.filieres.select_departement")}>
                                {departments.map((dept) => (
                                    <Select.Option key={dept.id} value={dept.id}>
                                        {dept.nom}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    )}

                    <Form.Item style={{ marginBottom: 0, textAlign: "right", marginTop: "24px" }}>
                        <Space size="middle">
                            <Button
                                size="large"
                                onClick={() => {
                                    setModalVisible(false)
                                    form.resetFields()
                                }}
                                style={{
                                    borderRadius: "8px",
                                    fontWeight: "500",
                                }}
                            >
                                {t("gestionprogramme.form.cancel")}
                            </Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                size="large"
                                style={{
                                    // background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                    border: "none",
                                    borderRadius: "8px",
                                    fontWeight: "bold",
                                    boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                                }}
                            >
                                {t("gestionprogramme.form.save")}
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>

            <style jsx>{`
                .table-row-light {
                    background-color: #fafafa;
                }
                .table-row-dark {
                    background-color: #ffffff;
                }
                .table-row-light:hover,
                .table-row-dark:hover {
                    background-color: #e6f7ff !important;
                }
            `}</style>
        </div>
    )
}

export default GestionProgramme
