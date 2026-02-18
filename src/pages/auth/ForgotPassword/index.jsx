
"use client"

import { Link, useNavigate } from "react-router-dom"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { PageMetaData, TextFormInput } from "@/components"
import { LoaderCircle } from "lucide-react"
import { toast } from "sonner"
import { useContext, useState } from "react"
import { useTranslation } from "react-i18next"

import { AppContext } from "../../../AppContext"

const ForgotPassword = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { urlApi } = useContext(AppContext)

  const resetFormSchema = yup.object({
    email: yup.string().required("Please enter your email"),
  })

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(resetFormSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const response = await fetch(urlApi + "password-reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      //console.log(response)
      const res = await response.json()
      if (res) {
        setLoading(false)
        toast.success(res.message)
        reset()
        navigate("/auth/sign-in")
        return
      }

      if (!response.ok) {
        setLoading(false)
        toast.error(res.message)
        throw new Error(`Erreur ${response.status}: ${response.statusText}`)
      }
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  return (
    <>
      <PageMetaData title={t("auth.forgotPassword.title")} />

      <div
        style={{
          minHeight: "70vh",
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          padding: "48px 24px",
        }}
      >

        <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t("auth.forgotPassword.title")}</h2>
        <p className="text-gray-600 mb-6">{t("auth.forgotPassword.description")}</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <TextFormInput
            label={t("auth.forgotPassword.emailLabel")}
            name="email"
            labelClassName="block text-sm font-medium text-gray-700 mb-1"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder={t("auth.forgotPassword.emailPlaceholder")}
            fullWidth
            control={control}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blueLogo text-white py-2 px-4 rounded-md hover:bg-blueLogo/80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                {t("auth.forgotPassword.loading")}
                <LoaderCircle className="ml-2 h-4 w-4 animate-spin" />
              </span>
            ) : (
              t("auth.forgotPassword.forgotPasswordButton")
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {t("auth.forgotPassword.alreadyHaveAccount")}
            <Link to="/auth/sign-in" className="ml-1 text-blueLogo hover:text-blueLogo/80 font-medium">
              {t("auth.forgotPassword.signIn")}
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword
