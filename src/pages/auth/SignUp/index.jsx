
"use client"

import {
  PageMetaData,
  PasswordFormInput,
  TextFormInput,
} from "@/components"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import * as yup from "yup"
import { useTranslation } from "react-i18next"

const SignUp = () => {
  const { t } = useTranslation()

  const registerFormSchema = yup.object({
    name: yup.string().required(t("auth.signUp.errors.name")),
    email: yup.string().email(t("auth.signUp.errors.invalidEmail")).required(t("auth.signUp.errors.email")),
    phone: yup.string().required(t("auth.signUp.errors.phone")),
    profession: yup.string().required(t("auth.signUp.errors.profession")),
    birthPlace: yup.string().required(t("auth.signUp.errors.birthPlace")),
    country: yup.string().required(t("auth.signUp.errors.country")),
    birthDate: yup.date().required(t("auth.signUp.errors.birthDate")),
    gender: yup.string().required(t("auth.signUp.errors.gender")),
    address: yup.string().required(t("auth.signUp.errors.address")),
    password: yup.string().min(6, t("auth.signUp.errors.passwordLength")).required(t("auth.signUp.errors.password")),
    confirmPassword: yup.string()
      .oneOf([yup.ref("password"), null], t("auth.signUp.errors.passwordMatch"))
      .required(t("auth.signUp.errors.confirmPassword")),
  })

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(registerFormSchema),
  })

  const onSubmit = (data) => {
    //console.log("Form Data:", data)
  }

  return (
    <>
      <PageMetaData title={t("auth.signUp.title")} />
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t("auth.signUp.title")}</h2>

      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <TextFormInput
            label={t("auth.signUp.name")}
            name="name"
            placeholder={t("auth.signUp.placeholders.name")}
            control={control}
            fullWidth
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            labelClassName="block text-sm font-medium text-gray-700 mb-1"
          />
          <TextFormInput
            label={t("auth.signUp.email")}
            name="email"
            placeholder={t("auth.signUp.placeholders.email")}
            control={control}
            fullWidth
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            labelClassName="block text-sm font-medium text-gray-700 mb-1"
          />
          <TextFormInput
            label={t("auth.signUp.phone")}
            name="phone"
            placeholder={t("auth.signUp.placeholders.phone")}
            control={control}
            fullWidth
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            labelClassName="block text-sm font-medium text-gray-700 mb-1"
          />
          <TextFormInput
            label={t("auth.signUp.profession")}
            name="profession"
            placeholder={t("auth.signUp.placeholders.profession")}
            control={control}
            fullWidth
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            labelClassName="block text-sm font-medium text-gray-700 mb-1"
          />
          <TextFormInput
            label={t("auth.signUp.birthPlace")}
            name="birthPlace"
            placeholder={t("auth.signUp.placeholders.birthPlace")}
            control={control}
            fullWidth
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            labelClassName="block text-sm font-medium text-gray-700 mb-1"
          />
          <TextFormInput
            label={t("auth.signUp.country")}
            name="country"
            placeholder={t("auth.signUp.placeholders.country")}
            control={control}
            fullWidth
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            labelClassName="block text-sm font-medium text-gray-700 mb-1"
          />
          <TextFormInput
            label={t("auth.signUp.birthDate")}
            name="birthDate"
            placeholder={t("auth.signUp.placeholders.birthDate")}
            type="date"
            control={control}
            fullWidth
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            labelClassName="block text-sm font-medium text-gray-700 mb-1"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("auth.signUp.gender")}
            </label>
            <select {...control.register("gender")} className="w-full px-3 py-2 border border-gray-300 rounded-md">
              <option value="">{t("auth.signUp.selectGender")}</option>
              <option value="male">{t("auth.signUp.male")}</option>
              <option value="female">{t("auth.signUp.female")}</option>
              <option value="other">{t("auth.signUp.other")}</option>
            </select>
          </div>
          <TextFormInput
            label={t("auth.signUp.address")}
            name="address"
            placeholder={t("auth.signUp.placeholders.address")}
            control={control}
            fullWidth
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            labelClassName="block text-sm font-medium text-gray-700 mb-1"
          />
          <PasswordFormInput
            label={t("auth.signUp.password")}
            name="password"
            placeholder={t("auth.signUp.placeholders.password")}
            control={control}
            fullWidth
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            labelClassName="block text-sm font-medium text-gray-700 mb-1"
          />
          <PasswordFormInput
            label={t("auth.signUp.confirmPassword")}
            name="confirmPassword"
            placeholder={t("auth.signUp.placeholders.confirmPassword")}
            control={control}
            fullWidth
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            labelClassName="block text-sm font-medium text-gray-700 mb-1"
          />
          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blueLogo text-white py-2 px-4 rounded-md hover:bg-blueLogo/80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              {t("auth.signUp.submit")}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          {t("auth.signUp.alreadyAccount")}
          <Link to="/auth/sign-in" className="ml-1 text-blue-600 hover:text-blue-800 font-medium">
            {t("auth.signUp.login")}
          </Link>
        </p>
      </div>
    </>
  )
}

export default SignUp
