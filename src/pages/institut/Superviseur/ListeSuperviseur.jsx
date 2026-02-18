
"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { message, Form, Input, Button, Card, Table, Spin, Space, Modal, Select, Tag, Tooltip, Switch } from "antd"
import {
    SearchOutlined,
    PlusOutlined,
    EyeOutlined,
    EyeInvisibleOutlined,
    CopyOutlined,
    EditOutlined,
    UserOutlined,
    StopOutlined,
} from "@ant-design/icons"
import { Building, Mail, Phone, User } from "lucide-react"
import {
    createInstitutSuperviseur,
    listeSuperviseurInstitut,
    updateSuperviseurRole,
    updateSuperviseurStatus,
} from "@/services/institutSuperviseurService"
import { useAuthContext } from "@/context"
import InstitutBreadcrumb from "@/components/InstitutBreadcrumb"

const { Option } = Select

const InstitutListeSuperviseur = () => {
    const { institut } = useAuthContext()
    const { t } = useTranslation()
    const [listeSuperviseurs, setListeSuperviseurs] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchText, setSearchText] = useState("")
    const [form] = Form.useForm()
    const [editForm] = Form.useForm()
    const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0)
    const isSmallScreen = windowWidth < 768

    // State for Add New Supervisor Modal
    const [isAddModalVisible, setIsAddModalVisible] = useState(false)
    const [visiblePasswords, setVisiblePasswords] = useState(new Set())

    // State for Edit Supervisor Modal
    const [isEditModalVisible, setIsEditModalVisible] = useState(false)
    const [editingSupervisor, setEditingSupervisor] = useState(null)
    const [updateLoading, setUpdateLoading] = useState(false)

    // State for Status Updates
    const [statusUpdateLoading, setStatusUpdateLoading] = useState(new Set())

    useEffect(() => {
        const fetchSuperviseurs = async (id) => {
            try {
                const resultats = await listeSuperviseurInstitut(id)
                console.log(resultats)
                setListeSuperviseurs(resultats)
            } catch (err) {
                message.error(t("institutSuperviseur.error_fetching_superviseur"))
            } finally {
                setLoading(false)
            }
        }

        if (institut?.id) {
            fetchSuperviseurs(institut.id)
        }
    }, [institut?.id, t])

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth)
        if (typeof window !== "undefined") {
            window.addEventListener("resize", handleResize)
            return () => window.removeEventListener("resize", handleResize)
        }
    }, [])

    const getFilteredData = () => {
        return listeSuperviseurs.length > 0
            ? listeSuperviseurs.filter((item) => {
                const matchesSearch =
                    item.name?.toLowerCase().includes(searchText.toLowerCase()) ||
                    item.email?.toLowerCase().includes(searchText.toLowerCase()) ||
                    // item.adresse?.toLowerCase().includes(searchText.toLowerCase()) ||
                    item.phone?.toLowerCase().includes(searchText.toLowerCase()) ||
                    item.role?.toLowerCase().includes(searchText.toLowerCase())
                return matchesSearch
            })
            : []
    }

    const togglePasswordVisibility = (id) => {
        const newVisiblePasswords = new Set(visiblePasswords)
        if (newVisiblePasswords.has(id)) {
            newVisiblePasswords.delete(id)
        } else {
            newVisiblePasswords.add(id)
        }
        setVisiblePasswords(newVisiblePasswords)
    }

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
        message.success(t("common.copied_to_clipboard"))
    }

    const showAddSupervisorModal = () => {
        setIsAddModalVisible(true)
    }

    const handleAddSupervisorOk = async () => {
        setLoading(true)
        try {
            const values = await form.validateFields()
            const newId = Math.max(...listeSuperviseurs.map((s) => s.id), 0) + 1
            const newSupervisor = {
                ...values,
                id: newId,
                isActive: true, // Par défaut, le compte est actif
            }
            console.log("New Supervisor Data:", newSupervisor)
            const resultat = await createInstitutSuperviseur(institut.id, newSupervisor)
            console.log(resultat)
            setListeSuperviseurs([...listeSuperviseurs, newSupervisor])
            message.success(t("institutSuperviseur.supervisor_added_success"))
            setIsAddModalVisible(false)
            form.resetFields()
        } catch (info) {
            console.log("Validate Failed:", info)
        } finally {
            setLoading(false)
        }
    }

    const handleAddSupervisorCancel = () => {
        setIsAddModalVisible(false)
        form.resetFields()
    }

    // Fonction pour ouvrir le modal d'édition
    const showEditSupervisorModal = (supervisor) => {
        setEditingSupervisor(supervisor)
        editForm.setFieldsValue({
            role: supervisor.role,
        })
        setIsEditModalVisible(true)
    }

    // Fonction pour gérer la mise à jour du rôle
    const handleEditSupervisorOk = async () => {
        setUpdateLoading(true)
        try {
            const values = await editForm.validateFields()
            const newRole = values.role
            console.log("Updating supervisor:", editingSupervisor.id, "with role:", newRole)

            // Appel à votre API
            await updateSuperviseurRole(institut.id, editingSupervisor.id, newRole)

            // Mise à jour de l'état local
            setListeSuperviseurs((prevList) =>
                prevList.map((supervisor) =>
                    supervisor.id === editingSupervisor.id ? { ...supervisor, role: newRole } : supervisor,
                ),
            )

            message.success(t("institutSuperviseur.supervisor_updated_success"))
            setIsEditModalVisible(false)
            setEditingSupervisor(null)
            editForm.resetFields()
        } catch (error) {
            console.error("Error updating supervisor:", error)
            message.error(t("institutSuperviseur.error_updating_supervisor"))
        } finally {
            setUpdateLoading(false)
        }
    }

    const handleEditSupervisorCancel = () => {
        setIsEditModalVisible(false)
        setEditingSupervisor(null)
        editForm.resetFields()
    }

    // Nouvelle fonction pour gérer l'activation/désactivation du compte
    const handleStatusChange = async (supervisorId, newStatus) => {
        // Ajouter l'ID au set de loading
        setStatusUpdateLoading((prev) => new Set([...prev, supervisorId]))

        try {
            console.log("Updating supervisor status:", supervisorId, "to:", newStatus)

            // Appel à votre API
            await updateSuperviseurStatus(institut.id, supervisorId, newStatus)
            console.log(institut.id, supervisorId, newStatus)

            // Mise à jour de l'état local
            setListeSuperviseurs((prevList) =>
                prevList.map((supervisor) =>
                    supervisor.id === supervisorId ? { ...supervisor, isActive: newStatus } : supervisor,
                ),
            )

            const statusText = newStatus
                ? t("institutSuperviseur.account_activated")
                : t("institutSuperviseur.account_deactivated")
            message.success(statusText)
        } catch (error) {
            console.error("Error updating supervisor status:", error)
            message.error(t("institutSuperviseur.error_updating_status"))
        } finally {
            // Retirer l'ID du set de loading
            setStatusUpdateLoading((prev) => {
                const newSet = new Set(prev)
                newSet.delete(supervisorId)
                return newSet
            })
        }
    }

    // Fonction pour confirmer le changement de statut
    const confirmStatusChange = (supervisor, newStatus) => {
        const actionText = newStatus
            ? t("institutSuperviseur.activate_account")
            : t("institutSuperviseur.deactivate_account")
        const warningText = newStatus
            ? t("institutSuperviseur.activate_warning")
            : t("institutSuperviseur.deactivate_warning")
        console.log(newStatus, warningText, supervisor)
        Modal.confirm({
            title: `${actionText} - ${supervisor.name}`,
            content: warningText,
            okText: t("common.yes_confirm"),
            okType: newStatus ? "primary" : "danger",
            cancelText: t("common.cancel"),
            onOk() {
                handleStatusChange(supervisor.id, newStatus)
            },
        })
    }

    const handleDeleteSupervisor = (id) => {
        Modal.confirm({
            title: t("institutSuperviseur.confirm_delete_title"),
            content: t("institutSuperviseur.confirm_delete_content"),
            okText: t("common.yes_delete"),
            okType: "danger",
            cancelText: t("common.cancel"),
            onOk() {
                setListeSuperviseurs(listeSuperviseurs.filter((s) => s.id !== id))
                message.success(t("institutSuperviseur.supervisor_deleted_success"))
            },
        })
    }

    const getRoleColor = (role) => {
        return role === "ROLE_INSTITUT_WRITE" ? "green" : "blue"
    }

    const getRoleText = (role) => {
        return role === "ROLE_INSTITUT_WRITE" ? t("institutSuperviseur.role_write") : t("institutSuperviseur.role_read")
    }

    const getStatusColor = (isActive) => {
        return isActive ? "success" : "error"
    }

    const getStatusText = (isActive) => {
        return isActive ? t("institutSuperviseur.status_active") : t("institutSuperviseur.status_inactive")
    }

    const getResponsiveColumns = () => {
        const baseColumns = [
            {
                title: t("institutSuperviseur.name"),
                dataIndex: "name",
                key: "name",
                render: (text, record) => (
                    <div className="font-semibold text-[#254c6b] flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span style={{ opacity: record.isActive ? 1 : 0.5 }}>{text}</span>
                        {/* {!record.isActive && (
                            <Tag color="red" size="small">
                                {t("institutSuperviseur.inactive")}
                            </Tag>
                        )} */}
                    </div>
                ),
                sorter: (a, b) => a.name.localeCompare(b.name),
            },
            {
                title: t("institutSuperviseur.email"),
                dataIndex: "email",
                key: "email",
                render: (text, record) => (
                    <div className="flex items-center gap-2" style={{ opacity: record.isActive ? 1 : 0.5 }}>
                        <Mail className="w-4 h-4 text-gray-500" />
                        <span>{text}</span>
                    </div>
                ),
                sorter: (a, b) => a.email.localeCompare(b.email),
                responsive: ["md"],
            },
            {
                title: t("institutSuperviseur.phone"),
                dataIndex: "phone",
                key: "phone",
                render: (text, record) => (
                    <div className="flex items-center gap-2" style={{ opacity: record.isActive ? 1 : 0.5 }}>
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span>{text}</span>
                    </div>
                ),
                sorter: (a, b) => a.phone.localeCompare(b.phone),
                responsive: ["lg"],
            },
            // {
            //     title: t("institutSuperviseur.address"),
            //     dataIndex: "adresse",
            //     key: "adresse",
            //     render: (text, record) => (
            //         <div className="flex items-center gap-2" style={{ opacity: record.isActive ? 1 : 0.5 }}>
            //             <Building className="w-4 h-4 text-gray-500" />
            //             {text}
            //         </div>
            //     ),
            //     sorter: (a, b) => a.adresse.localeCompare(b.adresse),
            //     responsive: ["lg"],
            // },
            {
                title: t("institutSuperviseur.role"),
                dataIndex: "role",
                key: "role",
                sorter: (a, b) => a.role.localeCompare(b.role),
                responsive: ["md"],
                render: (_, record) => (
                    <Space size="small" wrap>
                        <Tooltip title={t("institutSuperviseur.edit_role")}>
                            <Button
                                size={isSmallScreen ? "small" : "middle"}
                                onClick={() => showEditSupervisorModal(record)}
                                loading={updateLoading && editingSupervisor?.id === record.id}
                                disabled={!record.isActive}
                                style={{ opacity: record.isActive ? 1 : 0.5 }}
                            >
                                <Tag color={getRoleColor(record.role)}>{getRoleText(record.role)}</Tag>
                            </Button>
                        </Tooltip>
                    </Space>
                ),
            },
            {
                title: t("institutSuperviseur.status"),
                dataIndex: "isActive",
                key: "status",
                render: (isActive, record) => (
                    <Space direction="vertical" size="small">
                        <Tag color={getStatusColor(isActive)}>{getStatusText(isActive)}</Tag>
                        <Switch
                            checked={isActive}
                            loading={statusUpdateLoading.has(record.id)}
                            onChange={(checked) => confirmStatusChange(record, checked)}
                            checkedChildren={<UserOutlined />}
                            unCheckedChildren={<StopOutlined />}
                            size="small"
                        />
                    </Space>
                ),
                sorter: (a, b) => (a.isActive === b.isActive ? 0 : a.isActive ? -1 : 1),
                responsive: ["md"],
            },
            {
                title: t("institutSuperviseur.password"),
                dataIndex: "password",
                key: "password",
                render: (password, record) => (
                    <div className="flex items-center gap-2" style={{ opacity: record.isActive ? 1 : 0.5 }}>
                        <span className="font-mono">{visiblePasswords.has(record.id) ? password : "••••••••"}</span>
                        <Tooltip
                            title={
                                visiblePasswords.has(record.id)
                                    ? t("institutSuperviseur.hide_password")
                                    : t("institutSuperviseur.show_password")
                            }
                        >
                            <Button
                                type="text"
                                size="small"
                                icon={visiblePasswords.has(record.id) ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                                onClick={() => togglePasswordVisibility(record.id)}
                                disabled={!record.isActive}
                            />
                        </Tooltip>
                        {visiblePasswords.has(record.id) && (
                            <Tooltip title={t("institutSuperviseur.copy_password")}>
                                <Button
                                    type="text"
                                    size="small"
                                    icon={<CopyOutlined />}
                                    onClick={() => copyToClipboard(password)}
                                    disabled={!record.isActive}
                                />
                            </Tooltip>
                        )}
                    </div>
                ),
                responsive: ["md"],
            },
            // {
            //     title: t("institutSuperviseur.actions"),
            //     key: "actions",
            //     render: (_, record) => (
            //         <Space size="small" wrap>
            //             {/* Actions supplémentaires peuvent être ajoutées ici */}
            //         </Space>
            //     ),
            // },
        ]

        return baseColumns
    }

    const columns = getResponsiveColumns()

    const tableContainerStyle = {
        overflowX: "auto",
        width: "100%",
        maxWidth: "100%",
    }

    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <Spin fullscreen tip={t("common.loading")} />
            </div>
        )
    }

    return (
        <div style={{ background: "#f0f2f5", minHeight: "100vh" }}>
            <InstitutBreadcrumb title={t("institutMenu.manage_admins")} SubTitle={institut?.name || "Institut"} />
            <section className="py-6">
                <div className="container max-w-7xl mx-auto px-4">
                    <div className="bg-white rounded-xl shadow-xl overflow-hidden">
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
                                            placeholder={t("institutSuperviseur.search_supervisors")}
                                            prefix={<SearchOutlined />}
                                            value={searchText}
                                            onChange={(e) => setSearchText(e.target.value)}
                                            style={{ width: "100%", maxWidth: 350 }}
                                        />
                                        <Button type="primary" icon={<PlusOutlined />} onClick={showAddSupervisorModal}>
                                            {t("institutMenu.addManageAdmin")}
                                        </Button>
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
                                                    `${t("institutSuperviseur.total")} ${total} ${t("institutSuperviseur.supervisors")}`,
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

            {/* Add New Supervisor Modal */}
            <Modal
                title={t("institutMenu.addManageAdmin")}
                open={isAddModalVisible}
                onOk={handleAddSupervisorOk}
                onCancel={handleAddSupervisorCancel}
                width={600}
                footer={[
                    <Button key="back" onClick={handleAddSupervisorCancel}>
                        {t("common.cancel")}
                    </Button>,
                    <Button
                        key="submit"
                        disabled={loading}
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={handleAddSupervisorOk}
                    >
                        {t("common.add")}
                    </Button>,
                ]}
            >
                <Form form={form} layout="vertical" name="add_supervisor_form">
                    <Form.Item
                        name="name"
                        label={t("institutSuperviseur.name")}
                        rules={[{ required: true, message: t("institutSuperviseur.name_required") }]}
                    >
                        <Input placeholder={t("institutSuperviseur.name_placeholder")} />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label={t("institutSuperviseur.email")}
                        rules={[
                            { required: true, message: t("institutSuperviseur.email_required") },
                            { type: "email", message: t("institutSuperviseur.email_invalid") },
                        ]}
                    >
                        <Input placeholder={t("institutSuperviseur.email_placeholder")} />
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        label={t("institutSuperviseur.phone")}
                        rules={[{ required: true, message: t("institutSuperviseur.phone_required") }]}
                    >
                        <Input placeholder={t("institutSuperviseur.phone_placeholder")} />
                    </Form.Item>

                    {/* <Form.Item
                        name="adresse"
                        label={t("institutSuperviseur.address")}
                        rules={[{ required: true, message: t("institutSuperviseur.address_required") }]}
                    >
                        <Input placeholder={t("institutSuperviseur.address_placeholder")} />
                    </Form.Item> */}

                    <Form.Item
                        name="role"
                        label={t("institutSuperviseur.role")}
                        rules={[{ required: true, message: t("institutSuperviseur.role_required") }]}
                        initialValue="ROLE_INSTITUT_READ"
                    >
                        <Select placeholder={t("institutSuperviseur.role_placeholder")}>
                            <Option value="ROLE_INSTITUT_READ">
                                <Tag color="blue">{t("institutSuperviseur.role_read_only")}</Tag>
                                <span style={{ marginLeft: 8 }}>{t("institutSuperviseur.role_read_description")}</span>
                            </Option>
                            <Option value="ROLE_INSTITUT_WRITE">
                                <Tag color="green">{t("institutSuperviseur.role_write_full")}</Tag>
                                <span style={{ marginLeft: 8 }}>{t("institutSuperviseur.role_write_description")}</span>
                            </Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>

            {/* Edit Supervisor Role Modal */}
            <Modal
                title={t("institutSuperviseur.edit_supervisor_role")}
                open={isEditModalVisible}
                onOk={handleEditSupervisorOk}
                onCancel={handleEditSupervisorCancel}
                width={500}
                footer={[
                    <Button key="back" onClick={handleEditSupervisorCancel}>
                        {t("common.cancel")}
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        loading={updateLoading}
                        icon={<EditOutlined />}
                        onClick={handleEditSupervisorOk}
                    >
                        {t("common.update")}
                    </Button>,
                ]}
            >
                {editingSupervisor && (
                    <div style={{ marginBottom: 16 }}>
                        <p>
                            <strong>{t("institutSuperviseur.supervisor_name")}:</strong> {editingSupervisor.name}
                        </p>
                        <p>
                            <strong>{t("institutSuperviseur.current_role")}:</strong>
                            <Tag color={getRoleColor(editingSupervisor.role)} style={{ marginLeft: 8 }}>
                                {getRoleText(editingSupervisor.role)}
                            </Tag>
                        </p>
                    </div>
                )}

                <Form form={editForm} layout="vertical" name="edit_supervisor_form">
                    <Form.Item
                        name="role"
                        label={t("institutSuperviseur.new_role")}
                        rules={[{ required: true, message: t("institutSuperviseur.role_required") }]}
                    >
                        <Select placeholder={t("institutSuperviseur.role_placeholder")}>
                            <Option value="ROLE_INSTITUT_READ">
                                <Tag color="blue">{t("institutSuperviseur.role_read_only")}</Tag>
                                <span style={{ marginLeft: 8 }}>{t("institutSuperviseur.role_read_description")}</span>
                            </Option>
                            <Option value="ROLE_INSTITUT_WRITE">
                                <Tag color="green">{t("institutSuperviseur.role_write_full")}</Tag>
                                <span style={{ marginLeft: 8 }}>{t("institutSuperviseur.role_write_description")}</span>
                            </Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default InstitutListeSuperviseur
