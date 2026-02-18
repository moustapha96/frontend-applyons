"use client"

import { Controller } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { RefreshCw, Shield, Loader } from "lucide-react"

const VerificationForm = ({ control, errors, onSubmit, reset, activeSubscription, loading }) => {
  const { t } = useTranslation()

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="nomComplet" className="block text-sm font-medium text-gray-700">
            {t("institutVerification.full_name")}
          </label>
          <Controller
            name="nomComplet"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                id="nomComplet"
                className={`w-full px-4 py-3 rounded-lg border ${errors.nomComplet ? "border-red-300 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                  } focus:border-transparent focus:outline-none focus:ring-2`}
                placeholder={t("institutVerification.enter_full_name")}
              />
            )}
          />
          {errors.nomComplet && <p className="text-red-500 text-sm mt-1">{errors.nomComplet.message}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="codeAdn" className="block text-sm font-medium text-gray-700">
            {t("institutVerification.adn_code")}
          </label>
          <Controller
            name="codeAdn"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                id="codeAdn"
                className={`w-full px-4 py-3 rounded-lg border ${errors.codeAdn ? "border-red-300 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                  } focus:border-transparent focus:outline-none focus:ring-2`}
                placeholder={t("institutVerification.enter_adn_code")}
              />
            )}
          />
          {errors.codeAdn && <p className="text-red-500 text-sm mt-1">{errors.codeAdn.message}</p>}
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => reset()}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors flex items-center"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          {t("institutVerification.reset")}
        </button>
        <button
          type="submit"
          disabled={loading || !activeSubscription}
          className={`px-6 py-2 rounded-lg font-medium flex items-center ${activeSubscription
            ? "bg-blue-600 hover:bg-blue-700 text-white"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
            } transition-colors`}
        >
          {loading ? (
            <>
              <Loader className="h-4 w-4 mr-2 animate-spin" />
              {t("institutVerification.verifying")}
            </>
          ) : (
            <>
              <Shield className="h-4 w-4 mr-2" />
              {t("institutVerification.verify")}
            </>
          )}
        </button>
      </div>
    </form>
  )
}

export default VerificationForm

