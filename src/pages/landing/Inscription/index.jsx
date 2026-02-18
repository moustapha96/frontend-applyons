

'use client'

import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { PageMetaData, TopNavBar, TextFormInput, ThirdPartyAuth, PasswordFormInput } from '@/components'
import ResponsiveAuthLayout from '../../../layouts/ResponsiveAuthLayout'
import { AppContext } from '../../../AppContext'
import { toast } from "sonner";
import { LoaderCircle, LoaderCircleIcon } from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const applicantSchema = yup.object({
    name: yup.string().required("Please enter your name"),
    email: yup.string().email("Please enter a valid email").required("Email is required"),
    phone: yup.string().required("Phone number is required"),
    adresse: yup.string().required("Address is required"),
    profession: yup.string().nullable(),
    lieu_naissance: yup.string().required("Place of birth is required"),
    pays_residence: yup.string().required("Country is required"),
    date_naissance: yup.date().required("Date of birth is required").max(new Date(), "Date cannot be in the future"),
    sexe: yup.string().oneOf(['Male', 'Female'], "Please select a valid gender").required("Gender is required"),
    password: yup.string().required("Password is required").min(8, "Password must contain at least 8 characters"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords do not match")
        .required("Password confirmation is required"),
})
const institutSchema = yup.object({
    name: yup.string().required("Please enter the institute name"),
    type: yup.string().required("Please select the institute type"),
    email: yup.string().email("Please enter a valid email").required("Email is required"),
    phone: yup.string().required("Phone number is required"),
    adresse: yup.string().required("Address is required"),
    pays_residence: yup.string().required("Country is required"),
    siteWeb: yup.string().url("Please enter a valid URL").nullable(),
    password: yup.string().required("Password is required").min(8, "Password must contain at least 8 characters"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords do not match")
        .required("Password confirmation is required"),
})

export default function InscriptionPage() {
    const { t } = useTranslation();
    const [submitStatus, setSubmitStatus] = useState('idle')
    const [errorMessage, setErrorMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [activeTab, setActiveTab] = useState();

    const [searchParams] = useSearchParams();
    const type = searchParams.get("type");
    const navigate = useNavigate()
    const { urlApi } = useContext(AppContext);

    useEffect(() => {
        setActiveTab(type === "demandeur" ? "demandeur" : "institut");
    }, [type]);

    const { register, reset, handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(activeTab === 'demandeur' ? applicantSchema : institutSchema)
    })

    const onSubmit = async (data) => {
        setLoading(true)
        setSubmitStatus('idle')
        setErrorMessage('')

        console.log(JSON.stringify(data))

        try {
            const endpoint = activeTab === 'demandeur' ? 'create-demandeur' : 'create-institut'
            const response = await fetch(`${urlApi}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })

            if (response.ok) {
                toast.success(t('inscriptionPage.successMessage'))
                reset()
                setSubmitStatus('success')
                navigate('/')
            } else {
                const errorText = await response.text()
                throw new Error(errorText || t('inscriptionPage.errorMessage'))
            }
        } catch (error) {
            console.log(error)
            console.log(error.message)

            setSubmitStatus('error')
            setErrorMessage(error instanceof Error ? error.message : t('inscriptionPage.errorMessage'))
            toast.error(t('inscriptionPage.errorMessage'))
        } finally {
            setLoading(false)
        }
    }

    const onSubmitInstitut = async (data) => {
        setLoading(true)
        setSubmitStatus('idle')
        setErrorMessage('')

        console.log(JSON.stringify(data))
        try {
            const response = await fetch(urlApi + "create-institut", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            //console.log(data)

            if (response.ok) {
                reset()
                toast.success(t('inscriptionPage.successMessage'))
                setSubmitStatus('success')
                navigate('/')
            } else {
                toast.error(response.statusText || t('inscriptionPage.errorMessage'))
                throw new Error(response.statusText || t('inscriptionPage.errorMessage'))
            }

            setLoading(false)
        } catch (error) {
            //console.log(error)
            setSubmitStatus('error')
            setErrorMessage(error.message)
            setLoading(false)
        }
    }

    return (
        <>
            <PageMetaData title={t('inscriptionPage.title')} />

            <TopNavBar
                menuItems={[
                    t('nav.home'),
                    t('nav.about'),
                    t('nav.solutions'),
                    t('nav.features'),
                    t('nav.pricing'),
                    t('nav.contact'),
                    t('nav.faq'),
                ]}
                position="fixed"
                hasDownloadButton
            />

            <ResponsiveAuthLayout title={t('inscriptionPage.createAccount')}>
                {submitStatus === 'success' && (
                    <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                        <p className="font-bold">{t('inscriptionPage.success')}</p>
                        <p>{t('inscriptionPage.successMessage')}</p>
                    </div>
                )}

                {submitStatus === 'error' && (
                    <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                        <p className="font-bold">{t('inscriptionPage.error')}</p>
                        <p>{errorMessage}</p>
                    </div>
                )}

                <div className="mb-6">
                    <div className="flex border-b border-gray-200 justify-between w-full">
                        <button
                            className={`py-2 px-4 font-medium ${activeTab === 'demandeur' ? 'text-blueLogo border-b-2 border-blueLogo' : 'text-gray-500 hover:text-gray-700'}`}
                            onClick={() => setActiveTab('demandeur')}
                        >
                            {t('inscriptionPage.createApplicantAccount')}
                        </button>

                        <button
                            className={`py-2 px-4 font-medium ${activeTab === 'institut' ? 'text-blueLogo border-b-2 border-blueLogo' : 'text-gray-500 hover:text-gray-700'}`}
                            onClick={() => setActiveTab('institut')}
                        >
                            {t('inscriptionPage.createInstituteAccount')}
                        </button>
                    </div>
                </div>

                {activeTab === 'demandeur' && (
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-2xl font-semibold mb-4">{t('inscriptionPage.createApplicantAccount')}</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    {t('inscriptionPage.fullName')} <span className="text-xs text-red-500">*</span>
                                </label>
                                <TextFormInput
                                    containerClassName="mb-4"
                                    name="name"
                                    labelClassName="block text-base/normal text-zinc-200 font-semibold"
                                    className="mt-1 block w-full border border-gray-300  rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    fullWidth
                                    placeholder={t('inscriptionPage.fullName')}
                                    control={control}
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    {t('inscriptionPage.email')} <span className="text-xs text-red-500">*</span>
                                </label>
                                <TextFormInput
                                    containerClassName="mb-4"
                                    name="email"
                                    labelClassName="block text-base/normal text-zinc-200 font-semibold"
                                    className="mt-1 block w-full border border-gray-300  rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    fullWidth
                                    placeholder={t('inscriptionPage.email')}
                                    control={control}
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                    {t('inscriptionPage.phone')} <span className="text-xs text-red-500">*</span>
                                </label>
                                <TextFormInput
                                    containerClassName="mb-4"
                                    name="phone"
                                    labelClassName="block text-base/normal text-zinc-200 font-semibold"
                                    className="mt-1 block w-full border border-gray-300  rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    fullWidth
                                    placeholder={t('inscriptionPage.phone')}
                                    control={control}
                                />
                            </div>

                            <div>
                                <label htmlFor="adresse" className="block text-sm font-medium text-gray-700">
                                    {t('inscriptionPage.address')} <span className="text-xs text-red-500">*</span>
                                </label>
                                <TextFormInput
                                    containerClassName="mb-4"
                                    name="adresse"
                                    labelClassName="block text-base/normal text-zinc-200 font-semibold"
                                    className="mt-1 block w-full border border-gray-300  rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    fullWidth
                                    placeholder={t('inscriptionPage.address')}
                                    control={control}
                                />
                            </div>

                            <div>
                                <label htmlFor="profession" className="block text-sm font-medium text-gray-700">
                                    {t('inscriptionPage.profession')}
                                </label>
                                <TextFormInput
                                    containerClassName="mb-4"
                                    name="profession"
                                    labelClassName="block text-base/normal text-zinc-200 font-semibold"
                                    className="mt-1 block w-full border border-gray-300  rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    fullWidth
                                    placeholder={t('inscriptionPage.profession')}
                                    control={control}
                                />
                            </div>

                            <div>
                                <label htmlFor="lieu_naissance" className="block text-sm font-medium text-gray-700">
                                    {t('inscriptionPage.birthPlace')} <span className="text-xs text-red-500">*</span>
                                </label>
                                <TextFormInput
                                    containerClassName="mb-4"
                                    name="lieu_naissance"
                                    labelClassName="block text-base/normal text-zinc-200 font-semibold"
                                    className="mt-1 block w-full border border-gray-300  rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    fullWidth
                                    placeholder={t('inscriptionPage.birthPlace')}
                                    control={control}
                                />
                            </div>

                            <div>
                                <label htmlFor="pays_residence" className="block text-sm font-medium text-gray-700">
                                    {t('inscriptionPage.country')} <span className="text-xs text-red-500">*</span>
                                </label>
                                <TextFormInput
                                    containerClassName="mb-4"
                                    name="pays_residence"
                                    labelClassName="block text-base/normal text-zinc-200 font-semibold"
                                    className="mt-1 block w-full border border-gray-300  rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    fullWidth
                                    placeholder={t('inscriptionPage.country')}
                                    control={control}
                                />
                            </div>

                            <div>
                                <label htmlFor="date_naissance" className="block text-sm font-medium text-gray-700">
                                    {t('inscriptionPage.birthDate')} <span className="text-xs text-red-500">*</span>
                                </label>
                                <TextFormInput
                                    type="date"
                                    containerClassName="mb-4"
                                    name="date_naissance"
                                    labelClassName="block text-base/normal text-zinc-200 font-semibold"
                                    className="mt-1 block w-full border border-gray-300  rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    fullWidth
                                    placeholder={t('inscriptionPage.birthDate')}
                                    control={control}
                                />
                            </div>

                            <div>
                                <label htmlFor="sexe" className="block text-sm font-medium text-gray-700">
                                    {t('inscriptionPage.gender')} <span className="text-xs text-red-500">*</span>
                                </label>
                                <select
                                    id="sexe"
                                    {...register('sexe')}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option value="">{t('inscriptionPage.selectGender')}</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                                {errors.sexe && <p className="mt-2 text-sm text-red-600">{errors.sexe.message}</p>}
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    {t('inscriptionPage.password')} <span className="text-xs text-red-500">*</span>
                                </label>
                                <PasswordFormInput
                                    containerClassName="mb-4"
                                    name="password"
                                    labelClassName="block text-base/normal text-zinc-200 font-semibold"
                                    placeholder={t('inscriptionPage.password')}
                                    fullWidth
                                    className="mt-1 block w-full border border-gray-300  rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    control={control}
                                />
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                    {t('inscriptionPage.confirmPassword')} <span className="text-xs text-red-500">*</span>
                                </label>
                                <PasswordFormInput
                                    containerClassName="mb-4"
                                    name="confirmPassword"
                                    placeholder={t('inscriptionPage.confirmPassword')}
                                    fullWidth
                                    className="mt-1 block w-full border border-gray-300  rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    control={control}
                                />
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blueLogo focus:outline-none ${loading ? "cursor-not-allowed opacity-50" : "hover:bg-rougeLogo"}`}
                                >
                                    {loading ? (
                                        <>
                                            {t('inscriptionPage.loading')} <LoaderCircle className="ml-2 h-4 w-4 animate-spin" />
                                        </>
                                    ) : (
                                        t('inscriptionPage.register')
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {activeTab === 'institut' && (
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-2xl font-semibold mb-4">{t('inscriptionPage.createInstituteAccount')}</h2>
                        <form onSubmit={handleSubmit(onSubmitInstitut)} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    {t('inscriptionPage.instituteName')} <span className="text-xs text-red-500">*</span>
                                </label>
                                <TextFormInput
                                    containerClassName="mb-4"
                                    name="name"
                                    labelClassName="block text-base/normal text-zinc-200 font-semibold"
                                    className="mt-1 block w-full border border-gray-300  rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    fullWidth
                                    placeholder={t('inscriptionPage.instituteName')}
                                    control={control}
                                />
                            </div>

                            <div>
                                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                                    {t('inscriptionPage.instituteType')} <span className="text-xs text-red-500">*</span>
                                </label>
                                <select
                                    id="type"
                                    {...register('type')}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option value="">{t('inscriptionPage.selectInstituteType')}</option>
                                    <option value="School">School</option>
                                    <option value="Bank">Bank</option>
                                    <option value="Embassy">Embassy</option>
                                    <option value="University">University</option>
                                </select>
                                {errors.type && <p className="mt-2 text-sm text-red-600">{errors.type.message}</p>}
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    {t('inscriptionPage.email')} <span className="text-xs text-red-500">*</span>
                                </label>
                                <TextFormInput
                                    containerClassName="mb-4"
                                    name="email"
                                    labelClassName="block text-base/normal text-zinc-200 font-semibold"
                                    className="mt-1 block w-full border border-gray-300  rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    fullWidth
                                    placeholder={t('inscriptionPage.email')}
                                    control={control}
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                    {t('inscriptionPage.phone')} <span className="text-xs text-red-500">*</span>
                                </label>
                                <TextFormInput
                                    containerClassName="mb-4"
                                    name="phone"
                                    labelClassName="block text-base/normal text-zinc-200 font-semibold"
                                    className="mt-1 block w-full border border-gray-300  rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    fullWidth
                                    placeholder={t('inscriptionPage.phone')}
                                    control={control}
                                />
                            </div>

                            <div>
                                <label htmlFor="adresse" className="block text-sm font-medium text-gray-700">
                                    {t('inscriptionPage.address')} <span className="text-xs text-red-500">*</span>
                                </label>
                                <TextFormInput
                                    containerClassName="mb-4"
                                    name="adresse"
                                    labelClassName="block text-base/normal text-zinc-200 font-semibold"
                                    className="mt-1 block w-full border border-gray-300  rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    fullWidth
                                    placeholder={t('inscriptionPage.address')}
                                    control={control}
                                />
                            </div>

                            <div>
                                <label htmlFor="pays_residence" className="block text-sm font-medium text-gray-700">
                                    {t('inscriptionPage.country')} <span className="text-xs text-red-500">*</span>
                                </label>
                                <TextFormInput
                                    containerClassName="mb-4"
                                    name="pays_residence"
                                    labelClassName="block text-base/normal text-zinc-200 font-semibold"
                                    className="mt-1 block w-full border border-gray-300  rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    fullWidth
                                    placeholder={t('inscriptionPage.country')}
                                    control={control}
                                />
                            </div>

                            <div>
                                <label htmlFor="siteWeb" className="block text-sm font-medium text-gray-700">
                                    {t('inscriptionPage.website')} <span className="text-xs text-gray-500">(optional)</span>
                                </label>
                                <TextFormInput
                                    containerClassName="mb-4"
                                    name="siteWeb"
                                    labelClassName="block text-base/normal text-zinc-200 font-semibold"
                                    className="mt-1 block w-full border border-gray-300  rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    fullWidth
                                    placeholder={t('inscriptionPage.website')}
                                    control={control}
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    {t('inscriptionPage.password')} <span className="text-xs text-red-500">*</span>
                                </label>
                                <PasswordFormInput
                                    containerClassName="mb-4"
                                    name="password"
                                    labelClassName="block text-base/normal text-zinc-200 font-semibold"
                                    placeholder={t('inscriptionPage.password')}
                                    fullWidth
                                    className="mt-1 block w-full border border-gray-300  rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    control={control}
                                />
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                    {t('inscriptionPage.confirmPassword')} <span className="text-xs text-red-500">*</span>
                                </label>
                                <PasswordFormInput
                                    containerClassName="mb-4"
                                    name="confirmPassword"
                                    placeholder={t('inscriptionPage.confirmPassword')}
                                    fullWidth
                                    className="mt-1 block w-full border border-gray-300  rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    control={control}
                                />
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blueLogo focus:outline-none ${loading ? "cursor-not-allowed opacity-50" : "hover:bg-rougeLogo"}`}
                                >
                                    {loading ? (
                                        <>
                                            {t('inscriptionPage.loading')} <LoaderCircle className="ml-2 h-4 w-4 animate-spin" />
                                        </>
                                    ) : (
                                        t('inscriptionPage.register')
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

            </ResponsiveAuthLayout>
        </>
    )
}

