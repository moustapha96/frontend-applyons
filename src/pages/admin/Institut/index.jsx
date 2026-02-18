
"use client"

import { useState, useEffect } from "react"
import { Table, Input, Button, Modal, message } from "antd"
import {
  SearchOutlined,
  LeftOutlined,
  RightOutlined,
  FileOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  WalletOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons"
import { cn } from "@/lib/utils"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { getInstatutPartageDocumnent } from "@/services/institutService"
import { setCompteEnable } from "@/services/userService"
import { AdminBreadcrumb } from "@/components"

const { confirm } = Modal


const avatar1 = "/placeholder.svg?height=36&width=36"

const InstitutListe = () => {
  const { t } = useTranslation()
  const [instituts, setInstituts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)

  useEffect(() => {
    fetchInstituts()
  }, [])

  const fetchInstituts = async () => {
    try {
      const data = await getInstatutPartageDocumnent()
      setInstituts(data)
    } catch (err) {
      setError(t("admin.error_loading_instituts"))
      message.error(t("admin.error_loading_instituts"))
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = (clientId, currentStatus) => {
    confirm({
      title: t("common.confirm_status_change_title"),
      icon: <ExclamationCircleOutlined />,
      content: t("common.confirm_status_change_content"),
      okText: t("common.yes"),
      okType: "danger",
      cancelText: t("common.no"),
      async onOk() {
        const newStatus = currentStatus ? "inactif" : "actif"
        try {
          const res = await setCompteEnable(clientId, newStatus)
          message.success(res)
          fetchInstituts()
        } catch (err) {
          message.error(t("admin.status_change_failed"))
        }
      },
      onCancel() {
        message.error(t("admin.status_change_cancelled"))
      },
    })
  }

  const filteredInstituts = instituts.filter((institut) => institut.name.toLowerCase().includes(filter.toLowerCase()))

  const columns = [
    {
      title: "#",
      dataIndex: "compte",
      key: "avatar",
      render: (compte) => (
        <img
          className="inline-block size-9 rounded-full"
          src={compte && compte.avatar ? `data:image/jpeg;base64,${compte.avatar}` : avatar1}
          alt="Avatar"
        />
      ),
    },
    {
      title: t("admin.name"),
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: t("admin.type"),
      dataIndex: "type",
      key: "type",
    },
    // {
    //   title: t("admin.residence_country"),
    //   dataIndex: "pays_residence",
    //   key: "pays_residence",
    // },
    {
      title: t("admin.number_of_requests"),
      dataIndex: "demandes",
      key: "demandes",
      render: (demandes, record) => (
        <Link
          to={`/admin/institut/${record.id}/demandes`}
          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-primary-700 bg-primary-100 "
        >
          <FileOutlined className="mr-1.5 h-4 w-4" />
          {demandes && demandes.length} {t("admin.requests")}
        </Link>
      ),
    },

    {
      title: t("admin.account"),
      dataIndex: ["compte", "enabled"],
      key: "account_status",
      render: (enabled, record) => (
        <Button
          onClick={() => handleStatusChange(record.compte.id, enabled)}
          className={cn(
            "inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded",
            enabled ? "text-green-700 bg-green-300 hover:bg-green-500" : "text-red-700 bg-red-100 hover:bg-red-200",
          )}
        >
          {enabled ? (
            <>
              <CheckCircleOutlined className="mr-1.5 h-4 w-4" />
              {t("admin.active")}
            </>
          ) : (
            <>
              <CloseCircleOutlined className="mr-1.5 h-4 w-4" />
              {t("admin.inactive")}
            </>
          )}
        </Button>
      ),
    },

    {
      title: t("admin.subscribers"),
      dataIndex: "id",
      key: "subscribers",
      render: (id) => (
        <Link
          to={`/admin/institut/${id}/abonnements`}
          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <WalletOutlined className="mr-1.5 h-4 w-4" />
          {t("admin.subscribers")}
        </Link>
      ),
    },
    {
      title: t("admin.actions"),
      key: "actions",
      render: (text, record) => (
        <Link to={`/admin/institut/${record.id}/details`} passHref>
          <Button type="primary">{t("admin.details")}</Button>
        </Link>
      ),
    },
  ]

  // if (loading) return <div className="flex justify-center items-center h-screen">{t("admin.loading_instituts")}</div>
  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {t("admin.error")}: {error}
      </div>
    )

  return (
    <>
      <AdminBreadcrumb title={t("admin.institut_list")} />
      <section>
        <div className="container">
          <div className="my-6 space-y-6">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                <h4 className="text-xl font-semibold text-gray-800 uppercase">{t("admin.institut_list")}</h4>
              </div>
              <div className="p-6">
                <div className="flex mb-4">
                  <div className="relative flex-1">
                    <Input
                      prefix={<SearchOutlined className="text-gray-400" />}
                      placeholder={t("admin.search_placeholder")}
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <Table
                    columns={columns}
                    dataSource={filteredInstituts.reverse()}
                    rowKey="id"
                    pagination={{
                      current: currentPage,
                      pageSize: itemsPerPage,
                      total: filteredInstituts.length,
                      onChange: (page) => setCurrentPage(page),
                      showSizeChanger: false,
                      itemRender: (page, type, originalElement) => {
                        if (type === "prev") {
                          return <Button icon={<LeftOutlined />} disabled={currentPage === 1} />
                        }
                        if (type === "next") {
                          return (
                            <Button
                              icon={<RightOutlined />}
                              disabled={currentPage === Math.ceil(filteredInstituts.length / itemsPerPage)}
                            />
                          )
                        }
                        return originalElement
                      },
                    }}
                    loading={loading}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default InstitutListe
