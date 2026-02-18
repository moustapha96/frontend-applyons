

// import React, { useState, useEffect } from "react";
// import { AdminBreadcrumb } from "@/components";
// import { getAllContact } from "../../../services/contactService";
// import { Search } from "lucide-react";
// import { useTranslation } from 'react-i18next';

// const ContactListe = () => {
//     const { t } = useTranslation();
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [contacts, setContacts] = useState([]);
//     const [filter, setFilter] = useState("");
//     const [currentPage, setCurrentPage] = useState(1);
//     const [contactsPerPage] = useState(5);

//     const [tooltipContent, setTooltipContent] = useState("");
//     const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
//     const [showTooltip, setShowTooltip] = useState(false);

//     useEffect(() => {
//         fetchContacts();
//     }, []);

//     const fetchContacts = async () => {
//         setLoading(true);
//         try {
//             const response = await getAllContact();
//             setContacts(response);
//             //console.log(response);
//         } catch (err) {
//             console.error(err);
//             setError(t("admin.error_loading_contacts"));
//         } finally {
//             setLoading(false);
//         }
//     };

//     const filteredContacts = contacts.filter(contact =>
//         contact.name.toLowerCase().includes(filter.toLowerCase()) ||
//         contact.email.toLowerCase().includes(filter.toLowerCase())
//     );

//     const indexOfLastContact = currentPage * contactsPerPage;
//     const indexOfFirstContact = indexOfLastContact - contactsPerPage;
//     const currentContacts = filteredContacts.slice(indexOfFirstContact, indexOfLastContact);

//     const paginate = (pageNumber) => setCurrentPage(pageNumber);

//     const handleMouseEnter = (e, content) => {
//         setTooltipContent(content);
//         setTooltipPosition({ x: e.clientX, y: e.clientY });
//         setShowTooltip(true);
//     };

//     const handleMouseLeave = () => {
//         setShowTooltip(false);
//     };

//     return (
//         <>

//             <AdminBreadcrumb title={t("admin.contact_list")} />
//             <section>
//                 <div className="container">
//                     <div className="my-6 space-y-6">
//                         <div className="grid grid-cols-1">
//                             {loading ? (
//                                 <div className="flex justify-center items-center h-64">
//                                     <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
//                                 </div>
//                             ) : error ? (
//                                 <div className="text-red-500 text-center">{error}</div>
//                             ) : (
//                                 <>
//                                     <div className="my-6 space-y-6">
//                                         <div className="bg-white shadow-md rounded-lg overflow-hidden">
//                                             <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
//                                                 <h4 className="text-xl font-semibold text-gray-800 uppercase">{t("admin.contact_list")}</h4>
//                                             </div>
//                                             <div className="p-6">
//                                                 <div className="flex mb-4">
//                                                     <div className="relative flex-1">
//                                                         <input
//                                                             type="text"
//                                                             placeholder={t("admin.search_placeholder")}
//                                                             value={filter}
//                                                             onChange={(e) => setFilter(e.target.value)}
//                                                             className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                                         />
//                                                         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                                                     </div>
//                                                 </div>
//                                                 <div className="overflow-x-auto">
//                                                     <table className="min-w-full divide-y divide-gray-200">
//                                                         <thead className="bg-gray-50">
//                                                             <tr>
//                                                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
//                                                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("admin.name")}</th>
//                                                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("admin.email")}</th>
//                                                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("admin.subject")}</th>
//                                                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("admin.message")}</th>
//                                                             </tr>
//                                                         </thead>
//                                                         <tbody className="bg-white divide-y divide-gray-200">
//                                                             {currentContacts.map((contact) => (
//                                                                 <tr key={contact.id} className="hover:bg-gray-50">
//                                                                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{contact.id}</td>
//                                                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.name}</td>
//                                                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.email}</td>
//                                                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.subject}</td>
//                                                                     <td
//                                                                         className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-[200px] truncate"
//                                                                         onMouseEnter={(e) => handleMouseEnter(e, contact.object)}
//                                                                         onMouseLeave={handleMouseLeave}
//                                                                     >
//                                                                         {contact.object}
//                                                                     </td>
//                                                                 </tr>
//                                                             ))}
//                                                         </tbody>
//                                                     </table>
//                                                 </div>
//                                                 <div className="mt-4 flex justify-center">
//                                                     {Array.from({ length: Math.ceil(filteredContacts.length / contactsPerPage) }, (_, i) => (
//                                                         <button
//                                                             key={i}
//                                                             onClick={() => paginate(i + 1)}
//                                                             className={`mx-1 px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blueLogo text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
//                                                         >
//                                                             {i + 1}
//                                                         </button>
//                                                     ))}
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     {showTooltip && (
//                                         <div
//                                             className="fixed bg-black text-white p-2 rounded-md shadow-lg z-50 max-w-xs max-h-40 overflow-y-auto"
//                                             style={{
//                                                 left: `${tooltipPosition.x + 10}px`,
//                                                 top: `${tooltipPosition.y + 10}px`,
//                                             }}
//                                         >
//                                             {tooltipContent}
//                                         </div>
//                                     )}
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </>
//     );
// };

// export default ContactListe;


import React, { useState, useEffect } from "react"
import { AdminBreadcrumb } from "@/components"
import { getAllContact } from "../../../services/contactService"
import { Search } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { ContactModal } from "./ContactModal"

const ContactListe = () => {
    const { t } = useTranslation()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [contacts, setContacts] = useState([])
    const [filter, setFilter] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [contactsPerPage] = useState(5)
    const [selectedContact, setSelectedContact] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        fetchContacts()
    }, [])

    const fetchContacts = async () => {
        setLoading(true)
        try {
            const response = await getAllContact()
            setContacts(response)
            // //console.log(response)
        } catch (err) {
            console.error(err)
            setError(t("admin.error_loading_contacts"))
        } finally {
            setLoading(false)
        }
    }

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase()) ||
        contact.email.toLowerCase().includes(filter.toLowerCase())
    )

    const indexOfLastContact = currentPage * contactsPerPage
    const indexOfFirstContact = indexOfLastContact - contactsPerPage
    const currentContacts = filteredContacts.slice(indexOfFirstContact, indexOfLastContact)

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    const handleContactClick = (contact) => {
        setSelectedContact(contact)
        setIsModalOpen(true)
    }

    return (
        <>
            <AdminBreadcrumb title={t("admin.contact_list")} />
            <section>
                <div className="container">
                    <div className="my-6 space-y-6">
                        <div className="grid grid-cols-1">
                            {loading ? (
                                <div className="flex justify-center items-center h-64">
                                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
                                </div>
                            ) : error ? (
                                <div className="text-red-500 text-center">{error}</div>
                            ) : (
                                <>
                                    <div className="my-6 space-y-6">
                                        <div className="bg-white shadow-md rounded-lg overflow-hidden">
                                            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                                                <h4 className="text-xl font-semibold text-gray-800 uppercase">{t("admin.contact_list")}</h4>
                                            </div>
                                            <div className="p-6">
                                                <div className="flex mb-4">
                                                    <div className="relative flex-1">
                                                        <input
                                                            type="text"
                                                            placeholder={t("admin.search_placeholder")}
                                                            value={filter}
                                                            onChange={(e) => setFilter(e.target.value)}
                                                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                        />
                                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                                    </div>
                                                </div>
                                                <div className="overflow-x-auto">
                                                    <table className="min-w-full divide-y divide-gray-200">
                                                        <thead className="bg-gray-50">
                                                            <tr>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("admin.name")}</th>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("admin.email")}</th>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("admin.subject")}</th>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("admin.message")}</th>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("admin.actions")}</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="bg-white divide-y divide-gray-200">
                                                            {currentContacts.map((contact) => (
                                                                <tr key={contact.id} className="hover:bg-gray-50">
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{contact.id}</td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.name}</td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.email}</td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.subject}</td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-[200px] truncate">
                                                                        {contact.object}
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                        <button
                                                                            onClick={() => handleContactClick(contact)}
                                                                            className="ant-btn-primary"
                                                                        >
                                                                            {t("admin.details")}
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className="mt-4 flex justify-center">
                                                    {Array.from({ length: Math.ceil(filteredContacts.length / contactsPerPage) }, (_, i) => (
                                                        <button
                                                            key={i}
                                                            onClick={() => paginate(i + 1)}
                                                            className={`mx-1 px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blueLogo text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                                                        >
                                                            {i + 1}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                                        {selectedContact && (
                                            <div>
                                                <h2 className="text-2xl font-bold mb-4">{selectedContact.name}</h2>
                                                <p className="mb-2"><strong>{t("admin.email")}:</strong> {selectedContact.email}</p>
                                                <p className="mb-2"><strong>{t("admin.subject")}:</strong> {selectedContact.subject}</p>
                                                <p className="mb-2"><strong>{t("admin.message")}:</strong></p>
                                                <p className="bg-gray-100 p-4 rounded">{selectedContact.object}</p>
                                            </div>
                                        )}
                                    </ContactModal>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ContactListe



