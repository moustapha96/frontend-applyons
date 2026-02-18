// import { LuUpload, LuSearch, LuChevronLeft, LuChevronRight } from "react-icons/lu";
// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { getAllDemandeurs } from "../../../../services/demandeurService";
// import { cn } from "@/utils";

// const DemandeurListe = () => {
//     const [demandeurs, setDemandeurs] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [filter, setFilter] = useState("");
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage] = useState(5);

//     useEffect(() => {
//         const fetchDemandeurs = async () => {
//             try {
//                 const data = await getAllDemandeurs();
//                 setDemandeurs(data);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchDemandeurs();
//     }, []);

//     if (loading) return <div className="flex justify-center items-center h-screen">Chargement des demandeurs...</div>;
//     if (error) return <div className="flex justify-center items-center h-screen text-red-500">Erreur: {error}</div>;

//     const filteredDemandeurs = demandeurs.filter(demandeur =>
//         demandeur.name.toLowerCase().includes(filter.toLowerCase()) ||
//         demandeur.email.toLowerCase().includes(filter.toLowerCase())
//     );

//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentItems = filteredDemandeurs.slice(indexOfFirstItem, indexOfLastItem);

//     const paginate = (pageNumber) => setCurrentPage(pageNumber);

//     return (
//         <>

//             <div className="bg-white shadow-md rounded-lg overflow-hidden">
//                 <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
//                     <h4 className="text-xl font-semibold text-gray-800 uppercase">Liste des Demandeurs</h4>
//                 </div>
//                 <div className="p-6">
//                     <div className="flex mb-4">
//                         <div className="relative flex-1">
//                             <input
//                                 type="text"
//                                 placeholder="Rechercher par nom ou email..."
//                                 value={filter}
//                                 onChange={(e) => setFilter(e.target.value)}
//                                 className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//                             />
//                             <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                         </div>
//                     </div>

//                     <div className="overflow-x-auto">
//                         <table className="min-w-full divide-y divide-gray-200">
//                             <thead className="bg-gray-50">
//                                 <tr>
//                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
//                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
//                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
//                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Téléphone</th>
//                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pays de Résidence</th>
//                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profession</th>
//                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="bg-white divide-y divide-gray-200">
//                                 {currentItems.map((demandeur) => (
//                                     <tr key={demandeur.id} className="hover:bg-gray-50">
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{demandeur.id}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{demandeur.name}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{demandeur.email}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{demandeur.phone}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{demandeur.paysResidence}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{demandeur.profession}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                                             <Link to={`/admin/demandeur/${demandeur.id}/details`} className="text-blueLogo hover:text-indigo-900">
//                                                 Détails
//                                             </Link>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>

//                     <div className="flex items-center justify-between mt-4">
//                         <div className="text-sm text-gray-700">
//                             Affichage de {indexOfFirstItem + 1} à {Math.min(indexOfLastItem, filteredDemandeurs.length)} sur {filteredDemandeurs.length} entrées
//                         </div>
//                         <div className="flex items-center space-x-2">
//                             <button
//                                 onClick={() => paginate(currentPage - 1)}
//                                 disabled={currentPage === 1}
//                                 className={cn(
//                                     "px-3 py-1 rounded-md",
//                                     currentPage === 1 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-50"
//                                 )}
//                             >
//                                 <LuChevronLeft className="h-5 w-5" />
//                             </button>
//                             {Array.from({ length: Math.ceil(filteredDemandeurs.length / itemsPerPage) }).map((_, index) => (
//                                 <button
//                                     key={index}
//                                     onClick={() => paginate(index + 1)}
//                                     className={cn(
//                                         "px-3 py-1 rounded-md",
//                                         currentPage === index + 1 ? "bg-indigo-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
//                                     )}
//                                 >
//                                     {index + 1}
//                                 </button>
//                             ))}
//                             <button
//                                 onClick={() => paginate(currentPage + 1)}
//                                 disabled={currentPage === Math.ceil(filteredDemandeurs.length / itemsPerPage)}
//                                 className={cn(
//                                     "px-3 py-1 rounded-md",
//                                     currentPage === Math.ceil(filteredDemandeurs.length / itemsPerPage) ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-50"
//                                 )}
//                             >
//                                 <LuChevronRight className="h-5 w-5" />
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//         </>
//     );
// };

// export default DemandeurListe;

// import { LuUpload, LuSearch, LuChevronLeft, LuChevronRight } from "react-icons/lu";
// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { getAllDemandeurs } from "../../../../services/demandeurService";
// import { cn } from "@/utils";
// import { useTranslation } from "react-i18next";
// import { Button } from "antd";

// const DemandeurListe = () => {
//     const { t } = useTranslation();
//     const [demandeurs, setDemandeurs] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [filter, setFilter] = useState("");
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage] = useState(5);

//     useEffect(() => {
//         const fetchDemandeurs = async () => {
//             try {
//                 const data = await getAllDemandeurs();
//                 setDemandeurs(data);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchDemandeurs();
//     }, []);

//     if (loading) return <div className="flex justify-center items-center h-screen">{t("adminDemandeur.loading_demandeurs")}</div>;
//     if (error) return <div className="flex justify-center items-center h-screen text-red-500">{t("error")}: {error}</div>;

//     const filteredDemandeurs = demandeurs.filter(demandeur =>
//         demandeur.name.toLowerCase().includes(filter.toLowerCase()) ||
//         demandeur.email.toLowerCase().includes(filter.toLowerCase())
//     );

//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentItems = filteredDemandeurs.slice(indexOfFirstItem, indexOfLastItem);

//     const paginate = (pageNumber) => setCurrentPage(pageNumber);

//     return (
//         <>
//             <div className="bg-white shadow-md rounded-lg overflow-hidden">
//                 <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
//                     <h4 className="text-xl font-semibold text-gray-800 uppercase">{t("adminDemandeur.demandeur_list")}</h4>
//                 </div>
//                 <div className="p-6">
//                     <div className="flex mb-4">
//                         <div className="relative flex-1">
//                             <input
//                                 type="text"
//                                 placeholder={t("adminDemandeur.search_placeholder")}
//                                 value={filter}
//                                 onChange={(e) => setFilter(e.target.value)}
//                                 className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//                             />
//                             <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                         </div>
//                     </div>

//                     <div className="overflow-x-auto">
//                         <table className="min-w-full divide-y divide-gray-200">
//                             <thead className="bg-gray-50">
//                                 <tr>
//                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
//                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("adminDemandeur.name")}</th>
//                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("adminDemandeur.email")}</th>
//                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("adminDemandeur.phone")}</th>
//                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("adminDemandeur.country_of_residence")}</th>
//                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("adminDemandeur.profession")}</th>
//                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("adminDemandeur.actions")}</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="bg-white divide-y divide-gray-200">
//                                 {currentItems.map((demandeur) => (
//                                     <tr key={demandeur.id} className="hover:bg-gray-50">
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{demandeur.id}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{demandeur.name}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{demandeur.email}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{demandeur.phone}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{demandeur.paysResidence}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{demandeur.profession}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">

//                                             <Link to={`/admin/demandeur/${demandeur.id}/details`} className="ant-btn-primary">
//                                                 {t("institutPartage.details")}
//                                             </Link>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>

//                     <div className="flex items-center justify-between mt-4">
//                         <div className="text-sm text-gray-700">
//                             {t("showing")} {indexOfFirstItem + 1} {t("to")} {Math.min(indexOfLastItem, filteredDemandeurs.length)} {t("of")} {filteredDemandeurs.length} {t("entries")}
//                         </div>
//                         <div className="flex items-center space-x-2">
//                             <button
//                                 onClick={() => paginate(currentPage - 1)}
//                                 disabled={currentPage === 1}
//                                 className={cn(
//                                     "px-3 py-1 rounded-md",
//                                     currentPage === 1 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-50"
//                                 )}
//                             >
//                                 <LuChevronLeft className="h-5 w-5" />
//                             </button>
//                             {Array.from({ length: Math.ceil(filteredDemandeurs.length / itemsPerPage) }).map((_, index) => (
//                                 <button
//                                     key={index}
//                                     onClick={() => paginate(index + 1)}
//                                     className={cn(
//                                         "px-3 py-1 rounded-md",
//                                         currentPage === index + 1 ? "bg-blueLogo text-white" : "bg-white text-gray-700 hover:bg-gray-50"
//                                     )}
//                                 >
//                                     {index + 1}
//                                 </button>
//                             ))}
//                             <button
//                                 onClick={() => paginate(currentPage + 1)}
//                                 disabled={currentPage === Math.ceil(filteredDemandeurs.length / itemsPerPage)}
//                                 className={cn(
//                                     "px-3 py-1 rounded-md",
//                                     currentPage === Math.ceil(filteredDemandeurs.length / itemsPerPage) ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-50"
//                                 )}
//                             >
//                                 <LuChevronRight className="h-5 w-5" />
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default DemandeurListe;

"use client"

import { useState, useEffect } from "react"
import { Table, Input, Button } from "antd"
import { SearchOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons"

import { useTranslation } from "react-i18next" // Supposons que la configuration i18n est externe
import { getAllDemandeurs } from "@/services/demandeurService"
import { Link } from "react-router-dom"

const DemandeurListe = () => {
    const { t } = useTranslation()
    const [demandeurs, setDemandeurs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [filter, setFilter] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(5)

    useEffect(() => {
        const fetchDemandeurs = async () => {
            try {
                const data = await getAllDemandeurs()
                setDemandeurs(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchDemandeurs()
    }, [])

    // if (loading)
    //     return <div className="flex justify-center items-center h-screen">{t("adminDemandeur.loading_demandeurs")}</div>

    if (error)
        return (
            <div className="flex justify-center items-center h-screen text-red-500">
                {t("error")}: {error}
            </div>
        )

    const filteredDemandeurs = demandeurs.filter(
        (demandeur) =>
            demandeur.name.toLowerCase().includes(filter.toLowerCase()) ||
            demandeur.email.toLowerCase().includes(filter.toLowerCase()),
    )

    const columns = [
        {
            title: t("adminDemandeur.name"),
            dataIndex: "name",
            key: "name",
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: t("adminDemandeur.email"),
            dataIndex: "email",
            key: "email",
        },
        {
            title: t("adminDemandeur.phone"),
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: t("adminDemandeur.country_of_residence"),
            dataIndex: "paysResidence",
            key: "paysResidence",
        },
        {
            title: t("adminDemandeur.profession"),
            dataIndex: "profession",
            key: "profession",
        },
        {
            title: t("adminDemandeur.actions"),
            key: "actions",
            render: (text, record) => (
                <Link to={`/admin/demandeur/${record.id}/details`} passHref>
                    <Button type="primary">{t("institutPartage.details")}</Button>
                </Link>
            ),
        },
    ]

    return (
        <>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                    <h4 className="text-xl font-semibold text-gray-800 uppercase">{t("adminDemandeur.demandeur_list")}</h4>
                </div>


                <div className="p-6">
                    <div className="flex mb-4">
                        <div className="relative flex-1">
                            <Input
                                prefix={<SearchOutlined className="text-gray-400" />}
                                placeholder={t("adminDemandeur.search_placeholder")}
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <Table
                            columns={columns}
                            dataSource={filteredDemandeurs.reverse()}
                            rowKey="id"
                            pagination={{
                                current: currentPage,
                                pageSize: itemsPerPage,
                                total: filteredDemandeurs.length,
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
                                                disabled={currentPage === Math.ceil(filteredDemandeurs.length / itemsPerPage)}
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
        </>
    )
}

export default DemandeurListe
