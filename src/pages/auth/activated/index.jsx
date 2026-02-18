
"use client"

import { PageMetaData } from "@/components"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../../AppContext"
import { CheckCircle, Loader, XCircle } from "lucide-react"
import { useTranslation } from "react-i18next"

const ActivatedAccount = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const { urlApi } = useContext(AppContext)
    const { t } = useTranslation()

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const token = queryParams.get("token")
    const [resultat, setResultat] = useState("")
    const [success, setSuccess] = useState(null)

    useEffect(() => {
        setTimeout(() => {
            onSubmit(token)
        }, 2000)
    }, [token])

    const onSubmit = async (token) => {
        try {
            setLoading(true)
            const response = await fetch(`${urlApi}activated-account/${token}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })

            setLoading(false)

            if (!response.ok) {
                console.error(response)
                setResultat(t("auth.activatedAccount.activationError"))
                // setResultat(response.statusText || t("auth.activatedAccount.activationError"))
                setSuccess(false)
                return
            }

            setResultat(t("auth.activatedAccount.activationSuccess"))
            setSuccess(true)
            setTimeout(() => {
                navigate("/auth/sign-in")
            }, 2000)
        } catch (error) {
            setResultat(t("auth.activatedAccount.activationError"))
            setSuccess(false)
            setLoading(false)
            console.error(error)
        }
    }

    return (
        <>
            <PageMetaData title={t("auth.activatedAccount.title")} />

            <div
                style={{
                    minHeight: "70vh",
                    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
                    padding: "48px 24px",
                }}
            >

                <div className="text-center py-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t("auth.activatedAccount.title")}</h2>

                    <div className="flex flex-col items-center justify-center space-y-4">
                        {loading && (
                            <div className="flex flex-col items-center">
                                <Loader className="text-blue-600 animate-spin h-16 w-16 mb-4" />
                                <p className="text-gray-600">{t("auth.activatedAccount.verifying")}</p>
                            </div>
                        )}

                        {!loading && success === true && (
                            <div className="flex flex-col items-center">
                                <CheckCircle className="text-green-500 h-16 w-16 mb-4" />
                                <p className="text-gray-700 font-medium">{resultat}</p>
                                <p className="text-gray-500 text-sm mt-2">{t("auth.activatedAccount.redirecting")}</p>
                            </div>
                        )}

                        {!loading && success === false && (
                            <div className="flex flex-col items-center">
                                <XCircle className="text-red-500 h-16 w-16 mb-4" />
                                <p className="text-gray-700 font-medium">{resultat}</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        {t("auth.activatedAccount.alreadyHaveAccount")}
                        <Link to="/auth/sign-in" className="ml-1 text-blue-600 hover:text-blue-800 font-medium">
                            {t("auth.activatedAccount.signIn")}
                        </Link>
                    </p>
                </div>

            </div>
        </>
    )
}

export default ActivatedAccount
