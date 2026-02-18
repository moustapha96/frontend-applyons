
"use client"

import { PageMetaData, PasswordFormInput } from "@/components"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { LoaderCircle } from "lucide-react"
import { AppContext } from "../../../AppContext"
import { useContext, useState } from "react"
import { toast } from "sonner"
import { useTranslation } from "react-i18next"

const ResetPassword = () => {
  const navigate = useNavigate()
  const { urlApi } = useContext(AppContext)
  const { t } = useTranslation()

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const token = queryParams.get("token")
  const [loading, setLoading] = useState(false)

  const resetFormSchema = yup.object({
    newPassword: yup.string().required(t("auth.resetPassword.newPasswordRequired")),
    confirmPassword: yup.string().oneOf([yup.ref("newPassword")], t("auth.resetPassword.passwordsMustMatch")),
  })

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(resetFormSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const datas = {
        password: data.newPassword,
        confirmPassword: data.confirmPassword,
        token: token,
      }

      const response = await fetch(urlApi + "password-reset/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datas),
      })

      const res = await response.json()
      if (res) {
        toast.success(res.message)
        reset()
        navigate("/auth/sign-in")
        setLoading(false)
        return
      }

      if (!response.ok) {
        toast.error(res.message)
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      setLoading(false)
    } catch (error) {
      toast.error(error.message)
      setLoading(false)
    }
  }

  return (
    <>
      <PageMetaData title={t("auth.resetPassword.title")} />

      <div
        style={{
          minHeight: "70vh",
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          padding: "48px 24px",
        }}
      >
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t("auth.resetPassword.title")}</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <PasswordFormInput
            label={t("auth.resetPassword.newPasswordLabel")}
            name="newPassword"
            labelClassName="block text-sm font-medium text-gray-700 mb-1"
            fullWidth
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            control={control}
          />

          <PasswordFormInput
            label={t("auth.resetPassword.confirmPasswordLabel")}
            name="confirmPassword"
            labelClassName="block text-sm font-medium text-gray-700 mb-1"
            fullWidth
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blueLogo"
            control={control}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blueLogo text-white py-2 px-4 rounded-md hover:bg-blueLogo/80 focus:outline-none focus:ring-2 focus:ring-blueLogo focus:ring-offset-2 transition-colors"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                {t("auth.resetPassword.loading")}
                <LoaderCircle className="ml-2 h-4 w-4 animate-spin" />
              </span>
            ) : (
              t("auth.resetPassword.saveButton")
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {t("auth.resetPassword.alreadyHaveAccount")}
            <Link to="/auth/sign-in" className="ml-1 text-blue-600 hover:text-blue-800 font-medium">
              {t("auth.resetPassword.signIn")}
            </Link>
          </p>
        </div>
      </div>

    </>
  )
}

export default ResetPassword
