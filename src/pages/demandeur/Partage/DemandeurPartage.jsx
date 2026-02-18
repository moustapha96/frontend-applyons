
"use client"

import { useState, useEffect } from "react"
import { useAuthContext } from "../../../context/useAuthContext"
import { useTranslation } from "react-i18next"
import { createDemandePartage, getDemandePartageDemandeur } from "../../../services/partageService"
import { message, Tabs, Form, Input, Select, Button, Card, Table, Spin, Tag, Space, Popover } from "antd"
import { PlusOutlined, SearchOutlined, EyeOutlined, InfoCircleOutlined } from "@ant-design/icons"
import DemandeurBreadcrumb from "../../../components/DemandeurBreadcrumb"
import { getInstitutsSimple } from "@/services/institutService"
import { Link, useNavigate } from "react-router-dom"
import { CopyableFieldSimple } from "@/utils/CopyableField"

const { TabPane } = Tabs
const { TextArea } = Input

const DemandeurPartage = () => {
  const { demandeur } = useAuthContext()
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const [demandes, setDemandes] = useState([])
  const [instituts, setInstituts] = useState([])
  const [searchText, setSearchText] = useState("")
  const [form] = Form.useForm()
  const { t } = useTranslation()
  const [error, setError] = useState(null) // Declare the error variable
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0)
  const [years, setYears] = useState([])
  const [filterPeriode, setFilterPeriode] = useState(null)
  const [filterYear, setFilterYear] = useState(null)
  const [uniquePeriodes, setUniquePeriodes] = useState([])
  const [uniqueYears, setUniqueYears] = useState([])

  useEffect(() => {
    const currentYear = new Date().getFullYear()
    const years = Array.from({ length: 10 }, (_, i) => currentYear + i)
    setYears(years)
    //console.log(years)
  }, [])

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    fetchDemandes()
    fetchInstituts()
  }, [demandeur.id])

  const fetchInstituts = async () => {
    try {
      const data = await getInstitutsSimple()
      //console.log(data)
      setInstituts(data)
    } catch (error) {
      message.error(t("demandeurPartage.error_fetching_institutes"))
    }
  }

  const fetchDemandes = async () => {
    try {
      const data = await getDemandePartageDemandeur(demandeur.id)
      console.log(data)
      setDemandes(data)
      extractUniqueFilters(data)
      //console.log(data)
    } catch (err) {
      console.log(err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
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
        item.institut.name.toLowerCase().includes(searchText.toLowerCase())

      const matchesPeriode = filterPeriode ? item.periode === filterPeriode : true
      const matchesYear = filterYear ? item.year === filterYear : true

      return matchesSearch && matchesPeriode && matchesYear
    })
  }

  const handleSubmit = async (values) => {
    try {
      setLoading(true)
      await createDemandePartage({
        ...values,
        demandeur_id: demandeur.id,
      })
      message.success(t("demandeurPartage.request_created_success"))
      form.resetFields()
      fetchDemandes()
    } catch (error) {
      message.error(t("demandeurPartage.error_creating_request"))
    } finally {
      setLoading(false)
    }
  }

  // if (loading) {
  //   return (
  //     <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
  //       <Spin size="large" tip={t("common.loading")} />
  //     </div>
  //   )
  // }

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

  const getResponsiveColumns = () => {
    const baseColumns = [
      {
        title: t("demandeurPartage.institute"),
        dataIndex: "institut",
        key: "institut",
        render: (_, record) =>
          record.institut ? (
            <Link
              to={`/demandeur/institut/${record.institut.id}/details`}
              className="text-primary hover:text-primary-light transition-colors duration-200 flex items-center gap-1"
            >
              {record.institut.name}
            </Link>
          ) : (
            "N/A"
          ),
        sorter: (a, b) => a.institut?.name.localeCompare(b.institut?.name),
      },
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
        responsive: ["md"],
      },

      {
        title: t("demandeurPartage.documents"),
        dataIndex: "documentPartages",
        key: "documentPartages",
        render: (_, record) => (
          <>
            {record.documentPartages.length > 0 ? (
              <>
                <Link to={`/demandeur/demandes/${record.id}/documents`}>
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
          <Space size="small" wrap>
            <Link
              to={`/demandeur/partages/${record.id}/details`}
            // className="text-primary hover:text-primary-light transition-colors duration-200 flex items-center gap-1"
            >
              <Button
                className="ant-btn-primary "
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
              <Button className="ant-btn-primary" icon={<InfoCircleOutlined />} size={windowWidth < 768 ? "small" : "middle"} />
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


  if (loading && instituts.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-blueLogo"></div>
        <p className="ml-4 text-sm sm:text-lg">{t("application.loading")}</p>
      </div>
    )
  }

  return (
    <div style={{ background: "#f0f2f5", minHeight: "100vh" }}>
      <DemandeurBreadcrumb title={t("demandeurMenu.applicationTool")} SubTitle={demandeur?.name} />

      <section className="py-6">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px" }}>
              <Card>
                {/* <Tabs defaultActiveKey="1"> */}

                <div
                  style={{
                    marginBottom: 16,
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: windowWidth < 576 ? "column" : "row",
                    gap: windowWidth < 576 ? "10px" : "0",
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
                      {uniquePeriodes && uniquePeriodes.length != 0 && <>
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
                      </>}
                      {uniqueYears && uniqueYears.length != 0 && <>
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
                      </>}
                      <Button onClick={resetFilters} type="default" className="ant-btn-primary" >
                        {t("common.reset_filters")}
                      </Button>
                    </Space>
                  </div>
                  <Button
                    className="ant-btn-primary"
                    style={{ marginTop: windowWidth < 576 ? "10px" : "0" }}
                    icon={<PlusOutlined />}
                    onClick={() => {
                      navigate('/demandeur/nouvelle-demande-partage')
                    }}
                  >
                    {t("demandeurPartage.new_request")}
                  </Button>
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
                        `${t("demandeurPartage.total")} ${total} ${t("demandeurPartage.requests")}`,
                    }}
                    scroll={{ x: "max-content" }}
                    className="responsive-table"
                  />
                </div>

                {/* </Tabs> */}
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DemandeurPartage
