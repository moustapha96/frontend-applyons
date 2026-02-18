// "use client"

// import { useState, useEffect } from "react"
// import { useTranslation } from "react-i18next"
// import {
//     Table,
//     Button,
//     Modal,
//     Form,
//     Input,
//     Select,
//     Tabs,
//     Card,
//     Space,
//     Typography,
//     Tag,
//     message,
//     Popconfirm,
//     Spin,
// } from "antd"
// import {
//     PlusOutlined,
//     EditOutlined,
//     DeleteOutlined,
//     BuildOutlined,
//     BookOutlined,
//     SearchOutlined,
// } from "@ant-design/icons"
// import InstitutBreadcrumb from "@/components/InstitutBreadcrumb"
// import { adminDepartement, adminFilieres, createDepartement, createFiliere, departementsInstitut, filieresInstitut, updateDepartementInstitut, updateFiliere } from "@/services/deprtamentFiliereService"
// import { useAuthContext } from "@/context"
// import { AdminBreadcrumb } from "@/components"

// const { Title } = Typography
// const { TextArea } = Input

// const AdminGestionProgramme = () => {
//     const { t } = useTranslation()
//     const [departments, setDepartments] = useState([])
//     const [programs, setPrograms] = useState([])
//     const [loading, setLoading] = useState(true)
//     const [modalVisible, setModalVisible] = useState(false)
//     const [editMode, setEditMode] = useState(false)
//     const [currentItem, setCurrentItem] = useState(null)
//     const [activeTab, setActiveTab] = useState("departments")
//     const [searchText, setSearchText] = useState("")
//     const [form] = Form.useForm()

//     useEffect(() => {
//         loadData()
//     }, [])

//     const loadData = async () => {
//         try {
//             setLoading(true)
//             const [deptData, progData] = await Promise.all([adminDepartement(), adminFilieres()])
//             setDepartments(deptData)
//             setPrograms(progData)
//             console.log(deptData, progData)
//         } catch (error) {
//             console.error("Error loading data:", error)
//             message.error(t("gestionprogramme.departements.error_fetch"))
//         } finally {
//             setLoading(false)
//         }
//     }

//     const handleSubmit = async (values) => {
//         setLoading(true)
//         try {
//             if (activeTab === "departments") {
//                 const body = {
//                     nom: values.nom,
//                     code: values.code,
//                     description: values.description,
//                     institutId: institut.id,
//                     departementId: values.id
//                 }

//                 if (editMode && currentItem) {
//                     await updateDepartementInstitut(institut.id, currentItem.id, body)
//                     message.success(t("gestionprogramme.departements.update_success"))
//                 } else {
//                     await createDepartement(institut.id, body)
//                     message.success(t("gestionprogramme.departements.create_success"))
//                 }
//             } else {
//                 const body = {
//                     nom: values.nom,
//                     code: values.code,
//                     description: values.description,
//                     departementId: values.departementId,
//                     institutId: institut.id
//                 }

//                 if (editMode && currentItem) {
//                     body.filiereId = currentItem.id
//                     await updateFiliere(institut.id, body)
//                     message.success(t("gestionprogramme.filieres.update_success"))
//                 } else {
//                     await createFiliere(institut.id, body)
//                     message.success(t("gestionprogramme.filieres.create_success"))
//                 }
//             }

//             setModalVisible(false)
//             form.resetFields()
//             setEditMode(false)
//             setCurrentItem(null)
//             loadData()
//         } catch (error) {
//             console.error("Error submitting form:", error)
//             const errorKey =
//                 activeTab === "departments"
//                     ? editMode
//                         ? "gestionprogramme.departements.error_update"
//                         : "gestionprogramme.departements.error_create"
//                     : editMode
//                         ? "gestionprogramme.filieres.error_update"
//                         : "gestionprogramme.filieres.error_create"
//             message.error(t(errorKey))
//         } finally {
//             setLoading(false)
//         }
//     }

//     const handleEdit = (item) => {
//         setCurrentItem(item)
//         setEditMode(true)
//         form.setFieldsValue({
//             nom: item.nom || item.name || "",
//             code: item.code || "",
//             description: item.description || "",
//             departementId: item.departementId,
//         })
//         setModalVisible(true)
//     }

//     const handleAdd = () => {
//         setEditMode(false)
//         setCurrentItem(null)
//         form.resetFields()
//         setModalVisible(true)
//     }

//     const getFilteredDepartments = () => {
//         return departments.filter(
//             (item) =>
//                 item.nom.toLowerCase().includes(searchText.toLowerCase()) ||
//                 item.code.toLowerCase().includes(searchText.toLowerCase()),
//         )
//     }

//     const getFilteredPrograms = () => {
//         return programs.filter(
//             (item) =>
//                 item.nom.toLowerCase().includes(searchText.toLowerCase()) ||
//                 item.code.toLowerCase().includes(searchText.toLowerCase()) ||
//                 (item.departement && item.departement.toLowerCase().includes(searchText.toLowerCase())),
//         )
//     }

//     const departmentColumns = [
//         {
//             title: t("gestionprogramme.departements.institut"),
//             dataIndex: "nom",
//             key: "nom-institut",
//             render: (_, record) => (
//                 <Space direction="vertical" size={0}>
//                     <Tag color="blue">{record.departement.nom}</Tag>
//                 </Space>
//             ),
//             sorter: (a, b) => a.departement.nom.localeCompare(b.departement.nom),
//         },
//         {
//             title: t("gestionprogramme.departements.name"),
//             dataIndex: "nom",
//             key: "nom",
//             render: (text, record) => (
//                 <Space direction="vertical" size={0}>
//                     <span style={{ fontWeight: 600 }}>{text}</span>
//                     <Tag color="blue">{record.code}</Tag>
//                 </Space>
//             ),
//             sorter: (a, b) => a.nom.localeCompare(b.nom),
//         },
//         {
//             title: t("gestionprogramme.departements.description"),
//             dataIndex: "description",
//             key: "description",
//             ellipsis: true,
//         },
//         {
//             title: t("gestionprogramme.filieres.title"),
//             key: "programsCount",
//             render: (record) => <Tag color="green">{record.filieres || 0}</Tag>,
//         },
//         {
//             title: t("gestionprogramme.departements.actions"),
//             key: "actions",
//             render: (record) => (
//                 <Space>
//                     <Button type="text" icon={<EditOutlined />} onClick={() => handleEdit(record)} title={t("common.edit")} />
//                     <Popconfirm
//                         title={t("common.confirm_delete")}
//                         onConfirm={() => {
//                             // TODO: Implémenter la suppression
//                             message.info("Suppression à implémenter")
//                         }}
//                         okText={t("common.yes")}
//                         cancelText={t("common.no")}
//                     >
//                         <Button type="text" danger icon={<DeleteOutlined />} title={t("common.delete")} />
//                     </Popconfirm>
//                 </Space>
//             ),
//         },
//     ]

//     const programColumns = [
//         {
//             title: t("gestionprogramme.filieres.name"),
//             dataIndex: "nom",
//             key: "nom",
//             render: (text, record) => (
//                 <Space direction="vertical" size={0}>
//                     <span style={{ fontWeight: 600 }}>{text}</span>
//                     <Tag color="blue">{record.code}</Tag>
//                 </Space>
//             ),
//             sorter: (a, b) => a.nom.localeCompare(b.nom),
//         },
//         {
//             title: t("gestionprogramme.filieres.description"),
//             dataIndex: "description",
//             key: "description",
//             ellipsis: true,
//         },
//         {
//             title: t("gestionprogramme.filieres.departement"),
//             dataIndex: "departement",
//             key: "departement",
//             render: (text) => text && <Tag color="orange">{text}</Tag>,
//             sorter: (a, b) => (a.departement || "").localeCompare(b.departement || ""),
//         },
//         {
//             title: t("gestionprogramme.filieres.actions"),
//             key: "actions",
//             render: (record) => (
//                 <Space>
//                     <Button type="text" icon={<EditOutlined />} onClick={() => handleEdit(record)} title={t("common.edit")} />
//                     <Popconfirm
//                         title={t("common.confirm_delete")}
//                         onConfirm={() => {
//                             // TODO: Implémenter la suppression
//                             message.info("Suppression à implémenter")
//                         }}
//                         okText={t("common.yes")}
//                         cancelText={t("common.no")}
//                     >
//                         <Button type="text" danger icon={<DeleteOutlined />} title={t("common.delete")} />
//                     </Popconfirm>
//                 </Space>
//             ),
//         },
//     ]

//     if (loading) {
//         return (
//             <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//                 <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
//                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blueLogo mb-4"></div>
//                     <p className="text-lg font-semibold text-gray-800">{t("common.loading")}</p>
//                 </div>
//             </div>
//         )
//     }

//     return (
//         <div style={{ background: "#f0f2f5", minHeight: "100vh" }}>
//             <AdminBreadcrumb title={t("gestionprogramme.title")} SubTitle={"Departement & Filière"} />

//             <section className="py-6">
//                 <div className="container max-w-6xl mx-auto px-4">
//                     <div className="bg-white rounded-xl shadow-xl overflow-hidden">
//                         <div className="p-6">
//                             <Card>
//                                 <Tabs
//                                     activeKey={activeTab}
//                                     onChange={setActiveTab}
//                                     tabBarExtraContent={
//                                         <Space>
//                                             <Input
//                                                 placeholder={
//                                                     activeTab === "departments"
//                                                         ? t("gestionprogramme.departements.search_placeholder")
//                                                         : t("gestionprogramme.filieres.search_placeholder")
//                                                 }
//                                                 prefix={<SearchOutlined />}
//                                                 value={searchText}
//                                                 onChange={(e) => setSearchText(e.target.value)}
//                                                 style={{ width: 250 }}
//                                             />
//                                             <Button className="ant-btn-primary" icon={<PlusOutlined />} onClick={handleAdd}>
//                                                 {activeTab === "departments" ? t("gestionprogramme.departements.add") : t("gestionprogramme.filieres.add")}
//                                             </Button>
//                                         </Space>
//                                     }
//                                 >
//                                     <Tabs.TabPane
//                                         tab={
//                                             <span className="ant-text-primary" >
//                                                 <BuildOutlined />
//                                                 {t("gestionprogramme.tabs.departements")}
//                                             </span>
//                                         }
//                                         key="departments"
//                                     >
//                                         <Table
//                                             columns={departmentColumns}
//                                             dataSource={getFilteredDepartments()}
//                                             rowKey="id"
//                                             pagination={{
//                                                 defaultPageSize: 10,
//                                                 showSizeChanger: true,
//                                                 showTotal: (total) => `${t("gestionprogramme.departements.total")} ${total} ${t("gestionprogramme.departements.items")}`,
//                                             }}
//                                             locale={{ emptyText: t("gestionprogramme.form.loading") }}
//                                         />
//                                     </Tabs.TabPane>

//                                     <Tabs.TabPane
//                                         tab={
//                                             <span className="ant-text-primary" >
//                                                 <BookOutlined />
//                                                 {t("gestionprogramme.tabs.filieres")}
//                                             </span>
//                                         }
//                                         key="programs"
//                                     >
//                                         <Table
//                                             columns={programColumns}
//                                             dataSource={getFilteredPrograms()}
//                                             rowKey="id"
//                                             pagination={{
//                                                 defaultPageSize: 10,
//                                                 showSizeChanger: true,
//                                                 showTotal: (total) => `${t("gestionprogramme.filieres.total")} ${total} ${t("gestionprogramme.filieres.items")}`,
//                                             }}
//                                             locale={{ emptyText: t("gestionprogramme.form.loading") }}
//                                         />
//                                     </Tabs.TabPane>
//                                 </Tabs>
//                             </Card>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             <Modal
//                 title={
//                     editMode
//                         ? activeTab === "departments"
//                             ? t("gestionprogramme.departements.edit")
//                             : t("gestionprogramme.filieres.edit")
//                         : activeTab === "departments"
//                             ? t("gestionprogramme.departements.add")
//                             : t("gestionprogramme.filieres.add")
//                 }
//                 open={modalVisible}
//                 onCancel={() => {
//                     setModalVisible(false)
//                     form.resetFields()
//                     setEditMode(false)
//                     setCurrentItem(null)
//                 }}
//                 footer={null}
//                 width={600}
//             >
//                 <Form form={form} layout="vertical" onFinish={handleSubmit} style={{ marginTop: "24px" }}>
//                     <Form.Item
//                         name="nom"
//                         label={activeTab === "departments" ? t("gestionprogramme.departements.name") : t("gestionprogramme.filieres.name")}
//                         rules={[{ required: true, message: t("gestionprogramme.form.name_required") }]}
//                     >
//                         <Input placeholder={`${t("gestionprogramme.form.name_required")}`} />
//                     </Form.Item>

//                     <Form.Item
//                         name="code"
//                         label={activeTab === "departments" ? t("gestionprogramme.departements.code") : t("gestionprogramme.filieres.code")}
//                         rules={[{ required: true, message: t("gestionprogramme.form.code_required") }]}
//                     >
//                         <Input placeholder={`${t("gestionprogramme.form.code_required")}`} />
//                     </Form.Item>

//                     <Form.Item
//                         name="description"
//                         label={activeTab === "departments" ? t("gestionprogramme.departements.description") : t("gestionprogramme.filieres.description")}
//                     >
//                         <TextArea rows={3} placeholder={`${t("gestionprogramme.form.description_required")}`} />
//                     </Form.Item>

//                     {activeTab === "programs" && (
//                         <Form.Item
//                             name="departementId"
//                             label={t("gestionprogramme.filieres.departement")}
//                             rules={[{ required: true, message: t("gestionprogramme.form.departement_required") }]}
//                         >
//                             <Select placeholder={t("gestionprogramme.filieres.select_departement")}>
//                                 {departments.map((dept) => (
//                                     <Select.Option key={dept.id} value={dept.id}>
//                                         {dept.nom}
//                                     </Select.Option>
//                                 ))}
//                             </Select>
//                         </Form.Item>
//                     )}

//                     <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
//                         <Space>
//                             <Button
//                                 onClick={() => {
//                                     setModalVisible(false)
//                                     form.resetFields()
//                                 }}
//                             >
//                                 {t("gestionprogramme.form.cancel")}
//                             </Button>
//                             <Button type="primary" htmlType="submit">
//                                 {t("gestionprogramme.form.save")}
//                             </Button>
//                         </Space>
//                     </Form.Item>
//                 </Form>
//             </Modal>
//         </div>
//     )
// }

// export default AdminGestionProgramme



"use client"

import { useState, useEffect } from "react"
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
    Popconfirm,
} from "antd"
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    BuildOutlined,
    BookOutlined,
    SearchOutlined,
} from "@ant-design/icons"
import { AdminBreadcrumb } from "@/components"
import {
    adminDepartement,
    adminFilieres,
    createDepartement,
    createFiliere,
    updateDepartementInstitut,
    updateFiliere,
} from "@/services/deprtamentFiliereService"
import { useAuthContext } from "@/context"

const { Title } = Typography
const { TextArea } = Input


const AdminGestionProgramme = () => {
    const { t } = useTranslation()
    const [departments, setDepartments] = useState([])
    const [programs, setPrograms] = useState([])
    const [loading, setLoading] = useState(true)
    const [modalVisible, setModalVisible] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [currentItem, setCurrentItem] = useState(null)
    const [activeTab, setActiveTab] = useState("departments")
    const [searchText, setSearchText] = useState("")
    const [form] = Form.useForm()

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        try {
            setLoading(true)
            const [deptData, progData] = await Promise.all([adminDepartement(), adminFilieres()])
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



    const getFilteredDepartments = () => {
        return departments.filter(
            (item) =>
                item.nom.toLowerCase().includes(searchText.toLowerCase()) ||
                item.code.toLowerCase().includes(searchText.toLowerCase()) ||
                item.institut.name.toLowerCase().includes(searchText.toLowerCase()),
        )
    }

    const getFilteredPrograms = () => {
        return programs.filter(
            (item) =>
                item.nom.toLowerCase().includes(searchText.toLowerCase()) ||
                item.code.toLowerCase().includes(searchText.toLowerCase()) ||
                (item.departement?.nom && item.departement.nom.toLowerCase().includes(searchText.toLowerCase())),
        )
    }

    const departmentColumns = [
        {
            title: t("gestionprogramme.departements.institut"),
            dataIndex: "institut",
            key: "institut",
            render: (institut) => <Tag color="blue">{institut.name}</Tag>,
            sorter: (a, b) => a.institut.name.localeCompare(b.institut.name),
        },
        {
            title: t("gestionprogramme.departements.name"),
            dataIndex: "nom",
            key: "nom",
            render: (text, record) => (
                <Space direction="vertical" size={0}>
                    <span style={{ fontWeight: 600 }}>{text}</span>
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
        },
        {
            title: t("gestionprogramme.filieres.title"),
            key: "programsCount",
            render: (record) => <Tag color="green">{record.filieres || 0}</Tag>,
        },
        {
            title: t("gestionprogramme.departements.actions"),
            key: "actions",
            render: (record) => (
                <Space>
                    <Popconfirm
                        title={t("common.confirm_delete")}
                        onConfirm={() => {
                            // TODO: Implémenter la suppression
                            message.info("Suppression à implémenter")
                        }}
                        okText={t("common.yes")}
                        cancelText={t("common.no")}
                    >
                        <Button type="text" danger icon={<DeleteOutlined />} title={t("common.delete")} />
                    </Popconfirm>
                </Space>
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
                    <span style={{ fontWeight: 600 }}>{text}</span>
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
        },
        {
            title: t("gestionprogramme.filieres.departement"),
            dataIndex: "departement",
            key: "departement",
            render: (departement) => departement && <Tag color="orange">{departement.nom}</Tag>,
            sorter: (a, b) => (a.departement?.nom || "").localeCompare(b.departement?.nom || ""),
        },
        {
            title: t("gestionprogramme.filieres.actions"),
            key: "actions",
            render: (record) => (
                <Space>
                    <Popconfirm
                        title={t("common.confirm_delete")}
                        onConfirm={() => {
                            // TODO: Implémenter la suppression
                            message.info("Suppression à implémenter")
                        }}
                        okText={t("common.yes")}
                        cancelText={t("common.no")}
                    >
                        <Button type="text" danger icon={<DeleteOutlined />} title={t("common.delete")} />
                    </Popconfirm>
                </Space>
            ),
        },
    ]

    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blueLogo mb-4"></div>
                    <p className="text-lg font-semibold text-gray-800">{t("common.loading")}</p>
                </div>
            </div>
        )
    }

    return (
        <div style={{ background: "#f0f2f5", minHeight: "100vh" }}>
            <AdminBreadcrumb title={t("gestionprogramme.title")} SubTitle={t("gestionprogramme.subtitle")} />

            <section className="py-6">
                <div className="container max-w-6xl mx-auto px-4">
                    <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                        <div className="p-6">
                            <Card>
                                <Tabs
                                    activeKey={activeTab}
                                    onChange={setActiveTab}
                                    tabBarExtraContent={
                                        <Space>
                                            <Input
                                                placeholder={
                                                    activeTab === "departments"
                                                        ? t("gestionprogramme.departements.search_placeholder")
                                                        : t("gestionprogramme.filieres.search_placeholder")
                                                }
                                                prefix={<SearchOutlined />}
                                                value={searchText}
                                                onChange={(e) => setSearchText(e.target.value)}
                                                style={{ width: 250 }}
                                            />

                                        </Space>
                                    }
                                >
                                    <Tabs.TabPane
                                        tab={
                                            <span className="ant-text-primary">
                                                <BuildOutlined />
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
                                                showTotal: (total) =>
                                                    `${t("gestionprogramme.departements.total")} ${total} ${t("gestionprogramme.departements.items")}`,
                                            }}
                                            locale={{ emptyText: t("gestionprogramme.form.loading") }}
                                        />
                                    </Tabs.TabPane>

                                    <Tabs.TabPane
                                        tab={
                                            <span className="ant-text-primary">
                                                <BookOutlined />
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
                                                showTotal: (total) =>
                                                    `${t("gestionprogramme.filieres.total")} ${total} ${t("gestionprogramme.filieres.items")}`,
                                            }}
                                            locale={{ emptyText: t("gestionprogramme.form.loading") }}
                                        />
                                    </Tabs.TabPane>
                                </Tabs>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default AdminGestionProgramme
