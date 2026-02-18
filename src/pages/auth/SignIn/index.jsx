

"use client"
import { useTranslation } from "react-i18next"
import { PageMetaData, PasswordFormInput, TextFormInput } from "@/components"
import useLogin from "./useLogin"
import { Link } from "react-router-dom"
import { LoaderCircle } from "lucide-react"

const SignIn = () => {
  const { t } = useTranslation()
  const { loading, login, control, rememberMe, setRememberMe } = useLogin(t)

  return (
    <>
      <PageMetaData title={t("auth.signIn.title")} />

      <div
        style={{
          minHeight: "70vh",
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          padding: "48px 24px",
        }}
      >
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t("auth.signIn.connexion")}</h2>

        <form className="space-y-4" onSubmit={login}>
          <TextFormInput

            label={t('auth.signIn.email')}
            name="email"
            labelClassName="block text-sm font-medium text-gray-700 mb-1"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            fullWidth
            control={control}
          />

          <PasswordFormInput
            label={t("auth.signIn.passwordLabel")}
            name="password"
            labelClassName="block text-sm font-medium text-gray-700 mb-1"
            fullWidth
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            control={control}
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-blueLogo border-gray-300 rounded focus:ring-blue-500"
                id="checkbox-signin"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label className="ml-2 text-sm text-blueLogo" htmlFor="checkbox-signin">
                {t("auth.signIn.rememberMe")}
              </label>
            </div>
            <Link to="/auth/forgot-pass" className="text-sm text-blueLogo hover:text-blue-800">
              {t("auth.signIn.forgotPassword")}
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blueLogo text-white py-2 px-4 rounded-md hover:bg-blueLogo/80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                {t("auth.signIn.loading")}
                <LoaderCircle className="ml-2 h-4 w-4 animate-spin" />
              </span>
            ) : (
              t("auth.signIn.signInButton")
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {t("auth.signIn.noAccount")}
            <Link to={`/registration?type=demandeur`} className="ml-1 text-blue-600 hover:text-blue-800 font-medium">
              {t("auth.signIn.signUpButton")}
            </Link>
          </p>
        </div>
      </div>

    </>
  )
}

export default SignIn
