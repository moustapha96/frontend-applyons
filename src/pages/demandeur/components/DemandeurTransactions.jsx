

'use client'

import { useState, useEffect } from "react"
import { Calendar, DollarSign, CreditCard, CheckCircle, XCircle, Clock, Search, ChevronLeft, ChevronRight, AlertCircle, Loader } from "lucide-react"
import { useAuthContext } from "@/context"
import { getPaymentsByDemandeur } from "../../../services/paymentService"
import { useTranslation } from "react-i18next"

export default function DemandeurTransactions() {
    const { t } = useTranslation();

    const { demandeur } = useAuthContext()
    const [transactions, setTransactions] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [filter, setFilter] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const data = await getPaymentsByDemandeur(demandeur.id)
                setTransactions(data)
                // //console.log(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchTransactions()
    }, [demandeur])


    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="flex flex-col items-center">
                    <Loader className="h-8 w-8 text-blueLogo animate-spin mb-2" />
                    <p className="text-gray-600">{t("loading")}</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="flex flex-col items-center">
                    <AlertCircle className="h-8 w-8 text-red-500 mb-2" />
                    <p className="text-gray-600">{error}</p>
                </div>
            </div>
        )
    }


    const filteredTransactions = transactions.filter(transaction =>
        transaction.demande.intitule.toLowerCase().includes(filter.toLowerCase())
    )

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem)
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    const getStatusIcon = (etat) => {
        switch (etat.toLowerCase()) {
            case "succeeded":
                return <>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="ml-2">{t("demandeur.status_succeeded")}</span>
                </>
            case 'pending':
                return <>
                    <Clock className="h-5 w-5 text-yellow-500" />
                    <span className="ml-2">{t("demandeur.status_pending")}</span>
                </>
            case 'failed':
                return <>
                    <XCircle className="h-5 w-5 text-red-500" />
                    <span className="ml-2">{t("demandeur.status_failed")}</span>
                </>
            default:
                return null
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                    <h4 className="text-xl font-semibold text-gray-800">{t("demandeur.transactions_list")}</h4>
                </div>

                <div className="p-6">
                    <div className="flex mb-4">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder={t("demandeur.search_placeholder")}
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("demandeur.transaction_id")}</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("demandeur.amount")}</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("demandeur.date")}</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("demandeur.demand")}</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("demandeur.payment_type")}</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("demandeur.status")}</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {currentItems.map((transaction) => (
                                    <tr key={transaction.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{transaction.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div className="flex items-center">
                                                <DollarSign className="h-5 w-5 mr-2 text-green-500" />
                                                ${transaction.amount.toFixed(2)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div className="flex items-center">
                                                <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                                                {new Date(transaction.updatedAt).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div className="flex items-center">
                                                <CreditCard className="h-5 w-5 mr-2 text-purple-500" />
                                                {transaction.demande.intitule}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.typePaiement}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div className="flex items-center">
                                                {getStatusIcon(transaction.status)}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                        <div className="text-sm text-gray-700">
                            {t("demandeur.showing_entries", { first: indexOfFirstItem + 1, last: Math.min(indexOfLastItem, filteredTransactions.length), total: filteredTransactions.length })}
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </button>
                            {Array.from({ length: Math.ceil(filteredTransactions.length / itemsPerPage) }).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => paginate(index + 1)}
                                    className={`px-3 py-1 rounded-md ${currentPage === index + 1 ? 'bg-blueLogo text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === Math.ceil(filteredTransactions.length / itemsPerPage)}
                                className={`px-3 py-1 rounded-md ${currentPage === Math.ceil(filteredTransactions.length / itemsPerPage) ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                            >
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
