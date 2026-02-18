
// // // export default RecentDemandes;
// // import { LuUpload } from "react-icons/lu";
// // import { Link } from "react-router-dom";
// // import { cn } from "@/utils";
// // import { useTranslation } from "react-i18next";

// // const RecentDemandes = ({ demandes }) => {
// //   const { t } = useTranslation();
// //   // //console.log(demandes);

// //   return (
// //     <div className="overflow-hidden rounded-md border border-default-200 bg-white dark:bg-default-50">
// //       <div className="flex items-center justify-between border-b border-default-200 px-4 py-3">
// //         <h4 className="uppercase">{t("demandeur.recentOrders")}</h4>
// //       </div>
// //       <div className="overflow-auto">
// //         <div className="inline-block min-w-full align-middle">
// //           <div className="overflow-hidden">
// //             <div className="overflow-x-auto">
// //               <table className="min-w-full divide-y divide-gray-200">
// //                 <thead className="bg-gray-50">
// //                   <tr>
// //                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("demandeur.id")}</th>
// //                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("demandeur.intitule")}</th>
// //                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("demandeur.institut")}</th>
// //                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("demandeur.institutDemandeur")}</th>
// //                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("demandeur.dateDemande")}</th>
// //                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("demandeur.resultat")}</th>
// //                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("demandeur.actions")}</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody className="bg-white divide-y divide-gray-200">
// //                   {demandes && demandes.map((demande) => (
// //                     <tr key={demande.id} className="hover:bg-gray-50 transition-colors duration-200">
// //                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{demande.id}</td>
// //                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{demande.intitule}</td>
// //                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
// //                         {demande.institut ? (
// //                           <Link
// //                             to={`/demandeur/institut/${demande.institut.id}/details`}
// //                             className="text-primary hover:text-primary-700 transition-colors duration-200"
// //                           >
// //                             {demande.institut.name}
// //                           </Link>
// //                         ) : (
// //                           demande.nameInstitut
// //                         )}
// //                       </td>
// //                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
// //                         {demande.institutDemandeur ? (
// //                           <Link
// //                             to={`/demandeur/institut/${demande.institutDemandeur.id}/details`}
// //                             className="text-primary hover:text-primary-700 transition-colors duration-200"
// //                           >
// //                             {demande.institutDemandeur.name}
// //                           </Link>
// //                         ) : (
// //                           <p className="text-gray-500">{t("demandeur.Inconnue")}</p>
// //                         )}
// //                       </td>
// //                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
// //                         {new Date(demande.dateDemande).toLocaleDateString()}
// //                       </td>
// //                       <td className="px-6 py-4 whitespace-nowrap">
// //                         <span
// //                           className={cn(
// //                             "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
// //                             demande.resultat === "Accepted" ? "bg-green-100 text-green-800" :
// //                               demande.resultat === "Declined" ? "bg-red-100 text-red-800" :
// //                                 demande.resultat === "Pending" || demande.resultat === "En cours" || demande.resultat === "En attente" ? "bg-yellow-100 text-yellow-800" :
// //                                   "bg-gray-100 text-gray-800"
// //                           )}
// //                         >
// //                           {demande.resultat}
// //                         </span>
// //                       </td>
// //                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
// //                         <Link
// //                           to={`/demandeur/demande/${demande.id}/details`}
// //                           className="text-primary hover:text-primary-700 transition-colors duration-200"
// //                         >
// //                           {t("demandeur.details")}
// //                         </Link>
// //                       </td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default RecentDemandes;


// "use client"

// import { useState, useEffect } from "react"
// import { useTranslation } from "react-i18next"
// import { message, Tabs, Form, Input, Select, Button, Card, Table, Spin, Tag, Space, Popover } from "antd"
// import { PlusOutlined, SearchOutlined, EyeOutlined, InfoCircleOutlined } from "@ant-design/icons"
// import { Link } from "react-router-dom"
// import { CopyableFieldSimple } from "@/utils/CopyableField"

// const { TabPane } = Tabs
// const { TextArea } = Input

// const RecentDemandes = ({ demandes }) => {
//   const { t } = useTranslation()
//   const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0)


//   useEffect(() => {
//     const handleResize = () => setWindowWidth(window.innerWidth)
//     window.addEventListener("resize", handleResize)
//     return () => window.removeEventListener("resize", handleResize)
//   }, [])



//   const translatePeriode = (periode) => {
//     switch (periode) {
//       case "Printemps":
//         return t("demandePartage.periode_1")
//       case "Été":
//         return t("demandePartage.periode_2")
//       case "Automne":
//         return t("demandePartage.periode_3")
//       case "Hiver":
//         return t("demandePartage.periode_4")
//       case "Autre":
//         return t("demandePartage.periode_5")
//       default:
//         return periode
//     }
//   }

//   const getResponsiveColumns = () => {
//     const baseColumns = [
//       {
//         title: t("demandeurPartage.institute"),
//         dataIndex: "institut",
//         key: "institut",
//         render: (_, record) =>
//           record.institut ? (
//             <Link
//               to={`/demandeur/institut/${record.institut.id}/details`}
//               className="text-primary hover:text-primary-light transition-colors duration-200 flex items-center gap-1"
//             >
//               {record.institut.name}
//             </Link>
//           ) : (
//             "N/A"
//           ),
//         sorter: (a, b) => a.institut?.name.localeCompare(b.institut?.name),
//       },
//       {
//         title: t("demandeurPartage.code"),
//         dataIndex: "code",
//         key: "code",
//         render: (_, record) => (
//           <Tag color="blue">
//             <CopyableFieldSimple value={record.code} />
//           </Tag>
//         ),
//         sorter: (a, b) => a.code.localeCompare(b.code),
//       },

//       {
//         title: t("demandePartage.periode"),
//         dataIndex: "periode",
//         key: "periode",
//         render: (_, record) => (
//           <Tag color="blue">
//             {translatePeriode(record.periode)} - {record.year}
//           </Tag>
//         ),
//         sorter: (a, b) => a.periode - b.periode,
//       },
//       {
//         title: t("demandeurPartage.request_date"),
//         dataIndex: "dateDemande",
//         key: "dateDemande",
//         render: (date) => new Date(date).toLocaleDateString(),
//         sorter: (a, b) => new Date(a.dateDemande) - new Date(b.dateDemande),
//         responsive: ["md"],
//       },

//       {
//         title: t("demandeurPartage.documents"),
//         dataIndex: "documentPartages",
//         key: "documentPartages",
//         render: (_, record) => (
//           <>
//             {record.documentPartages.length > 0 ? (
//               <>
//                 <Link to={`/demandeur/partages/${record.id}/details#documents`}>
//                   <Tag color="blue">
//                     {record.documentPartages.length} {windowWidth >= 768 ? t("demandeurPartage.document_count") : ""}
//                   </Tag>
//                 </Link>
//               </>
//             ) : (
//               <Tag color="red"> {t("common.no_documents")} </Tag>
//             )}
//           </>
//         ),
//         responsive: ["md"],
//       },
//       {
//         title: t("demandeurPartage.actions"),
//         key: "actions",
//         render: (_, record) => (
//           <Space size="small" wrap>
//             <Link
//               to={`/demandeur/partages/${record.id}/details`}
//               className="text-primary hover:text-primary-light transition-colors duration-200 flex items-center gap-1"
//             >
//               <Button
//                 className="bg-blueLogo text-white hover:bg-rougeLogo"
//                 style={{ marginTop: windowWidth < 576 ? "10px" : "0" }}
//                 icon={<EyeOutlined />}
//                 title={t("demandeurPartage.view_request_details")}
//                 size={windowWidth < 768 ? "small" : "middle"}
//               >
//                 {windowWidth >= 576 ? t("demandeurPartage.details") : ""}
//               </Button>

//             </Link>

//           </Space>
//         ),
//       },
//     ]

//     return baseColumns
//   }

//   const columns = getResponsiveColumns()

//   const tableContainerStyle = {
//     overflowX: "auto",
//     width: "100%",
//     maxWidth: "100%",
//   }

//   return (
//     <div style={{ background: "#f0f2f5", minHeight: "100vh" }}>

//       <section className="py-6">
//         <div className="container max-w-6xl mx-auto px-4">
//           <div className="bg-white rounded-xl shadow-xl overflow-hidden">
//             <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px" }}>
//               <Card>
//                 <Tabs defaultActiveKey="1">

//                   <div
//                     style={{
//                       marginBottom: 16,
//                       display: "flex",
//                       justifyContent: "space-between",
//                       flexDirection: windowWidth < 576 ? "column" : "row",
//                       gap: windowWidth < 576 ? "10px" : "0",
//                     }}
//                   >

//                   </div>

//                   <div style={tableContainerStyle}>
//                     <Table
//                       columns={columns}
//                       dataSource={demandes}
//                       rowKey="id"

//                       pagination={{
//                         defaultPageSize: 5,
//                         showSizeChanger: true,
//                         showTotal: (total) =>
//                           `${t("demandeurPartage.total")} ${total} ${t("demandeurPartage.requests")}`,
//                       }}
//                       scroll={{ x: "max-content" }}
//                       className="responsive-table"
//                     />
//                   </div>
//                 </Tabs>
//               </Card>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }

// export default RecentDemandes

"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { message, Tabs, Form, Input, Select, Button, Card, Table, Spin, Tag, Space, Popover } from "antd";
import { PlusOutlined, SearchOutlined, EyeOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { CopyableFieldSimple } from "@/utils/CopyableField";

const { TabPane } = Tabs;
const { TextArea } = Input;

const RecentDemandes = ({ demandes }) => {
  const { t } = useTranslation();
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const translatePeriode = (periode) => {
    switch (periode) {
      case "Printemps":
        return t("demandePartage.periode_1");
      case "Été":
        return t("demandePartage.periode_2");
      case "Automne":
        return t("demandePartage.periode_3");
      case "Hiver":
        return t("demandePartage.periode_4");
      case "Autre":
        return t("demandePartage.periode_5");
      default:
        return periode;
    }
  };

  const getResponsiveColumns = () => {
    const baseColumns = [
      {
        title: t("demandeurPartage.institute"),
        dataIndex: "institut",
        key: "institut",
        render: (_, record) => (
          record.institut ? (
            <Link to={`/demandeur/institut/${record.institut.id}/details`} className="text-primary hover:text-primary-light transition-colors duration-200 flex items-center gap-1">
              {record.institut.name}
            </Link>
          ) : "N/A"
        ),
        sorter: (a, b) => a.institut?.name.localeCompare(b.institut?.name),
      },
      {
        title: t("demandeurPartage.code"),
        dataIndex: "code",
        key: "code",
        render: (_, record) => <Tag color="blue"><CopyableFieldSimple value={record.code} /></Tag>,
        sorter: (a, b) => a.code.localeCompare(b.code),
      },
      {
        title: t("demandePartage.periode"),
        dataIndex: "periode",
        key: "periode",
        render: (_, record) => <Tag color="blue">{translatePeriode(record.periode)} - {record.year}</Tag>,
        sorter: (a, b) => a.periode.localeCompare(b.periode),
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
          record.documentPartages.length > 0 ? (
            <Link to={`/demandeur/partages/${record.id}/details#documents`}>
              <Tag color="blue">
                {record.documentPartages.length} {windowWidth >= 768 ? t("demandeurPartage.document_count") : ""}
              </Tag>
            </Link>
          ) : <Tag color="red">{t("common.no_documents")}</Tag>
        ),
        responsive: ["md"],
      },
      {
        title: t("demandeurPartage.actions"),
        key: "actions",
        render: (_, record) => (
          <Space size="small" wrap>
            <Link to={`/demandeur/partages/${record.id}/details`} className="text-primary hover:text-primary-light transition-colors duration-200 flex items-center gap-1">
              <Button
                className="bg-blueLogo text-white hover:bg-rougeLogo"
                style={{ marginTop: windowWidth < 576 ? "10px" : "0" }}
                icon={<EyeOutlined />}
                title={t("demandeurPartage.view_request_details")}
                size={windowWidth < 768 ? "small" : "middle"}
              >
                {windowWidth >= 576 ? t("demandeurPartage.details") : ""}
              </Button>
            </Link>
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
    <div style={{ background: "#f0f2f5", minHeight: "100vh" }}>
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="max-w-6xl mx-auto p-6">
              <Card>

                {/* <Tabs defaultActiveKey="1">
                  <div style={tableContainerStyle}>
                    <Table
                      columns={columns}
                      dataSource={demandes}
                      rowKey="id"
                      pagination={{
                        defaultPageSize: 5,
                        showSizeChanger: true,
                        showTotal: (total) => `${t("demandeurPartage.total")} ${total} ${t("demandeurPartage.requests")}`,
                      }}
                      scroll={{ x: "max-content" }}
                      className="responsive-table"
                    />
                  </div>
                </Tabs> */}
                <Tabs
                  defaultActiveKey="1"
                  items={[
                    {
                      key: "1",
                      label: t("demandeurPartage.recent_requests"),
                      children: (
                        <div style={tableContainerStyle}>
                          <Table
                            columns={columns}
                            dataSource={demandes}
                            rowKey="id"
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
                      ),
                    },
                  ]}
                />

              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RecentDemandes;
