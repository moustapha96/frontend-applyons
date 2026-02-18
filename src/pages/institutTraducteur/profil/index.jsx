

"use client"
import { useAuthContext } from "../../../context/useAuthContext"
import { useState, useEffect, useCallback, useRef } from "react"
import InstitutBreadcrumb from "../../../components/InstitutBreadcrumb"
import { updateInstitut } from "../../../services/institutService"
import { toast } from "sonner"
import { uploadProfileImage } from "../../../services/userService"
import { Mail, Phone, MapPin, Briefcase, Edit2, Save, X, Camera, Loader, Globe, Building } from "lucide-react"
import avatar from "@/assets/avatar.png"
import { useTranslation } from "react-i18next"
import InstitutTraducteurBreadcrumb from "@/components/InstitutTraducteurBreadcrumb"

const InstitutTraducteurProfil = () => {
    const { role, setInstitut, institut, session, saveProfilImage, profileImage } =
        useAuthContext()
    const { t } = useTranslation()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [editing, setEditing] = useState(false)
    const [editedInstitut, setEditedInstitut] = useState(null)
    const [isUploading, setIsUploading] = useState(false)
    const [refreshKey, setRefreshKey] = useState(0)
    const fileInputRef = useRef(null)

    useEffect(() => {
        if (institut) {
            setEditedInstitut({ ...institut })
        }
    }, [institut, refreshKey])

    const handleEdit = () => {
        setEditing(true)
    }

    const handleSave = async () => {
        try {
            setLoading(true)
            const result = await updateInstitut(institut.id, editedInstitut)
            if (result && result.institut) {
                setInstitut((prev) => ({
                    ...prev,
                    adresse: result.institut.adresse,
                    email: result.institut.email,
                    phone: result.institut.phone,
                    siteWeb: result.institut.siteWeb,
                    type: result.institut.type,
                    paysResidence: result.institut.paysResidence,
                    name: result.institut.name,
                    intitule: result.institut.intitule
                }))
            }
            setEditing(false)
            setError(null)
            setRefreshKey((prev) => prev + 1)
            toast.success(t("institut.profil.profileUpdated"))
        } catch (err) {
            console.error(err)
            setError(err.response?.data?.message || t("saveError"))
            toast.error(err.response?.data?.message || t("saveError"))
        } finally {
            setLoading(false)
        }
    }

    const handleCancel = () => {
        setEditedInstitut({ ...institut })
        setEditing(false)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setEditedInstitut((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const triggerFileInput = () => {
        fileInputRef.current?.click()
    }

    const handleImageUpload = useCallback(
        async (event) => {
            const file = event.target.files?.[0]
            if (!file) return
            const allowedTypes = ["image/jpeg", "image/png", "image/gif"]
            if (!allowedTypes.includes(file.type)) {
                toast.error(t("unsupportedFileType"))
                return
            }
            const maxSize = 5 * 1024 * 1024 // 5MB
            if (file.size > maxSize) {
                toast.error(t("imageTooLarge"))
                return
            }
            setIsUploading(true)
            try {
                const formData = new FormData()
                formData.append("image", file)
                const response = await uploadProfileImage(session.id, formData)
                if (response && response.imageUrl) {
                    saveProfilImage(response.imageUrl)
                    toast.success(t("institut.profil.profileImageUpdated"))
                } else {
                    throw new Error(response.error || t("imageUploadError"))
                }
            } catch (error) {
                console.error("Erreur lors du téléchargement de l'image:", error)
                toast.error(t("imageUploadError"))
            } finally {
                setIsUploading(false)
            }
        },
        [session, saveProfilImage],
    )

    if (!institut || !editedInstitut) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader className="animate-spin text-blue-500" size={40} />
                <span className="ml-2 text-lg">{t("loading")}</span>
            </div>
        )
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* <InstitutBreadcrumb title={t("profile")} SubTitle={`t('institut.profil.welcome') ${institut?.intitule}`} /> */}
            <InstitutTraducteurBreadcrumb
                title={t("profile")}
                SubTitle={`${t('common.welcome')} ${institut?.name}`}
            />

            <section className="container mx-auto px-4 py-8">
                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded shadow-md">
                        <p className="font-medium">{t("institut.profil.error")}</p>
                        <p>{error}</p>
                    </div>
                )}
                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8 transition-all duration-300 hover:shadow-lg">

                    <div className="bg-gradient-to-r from-blue-500 to-blueLogo h-32 relative">
                        <div className="absolute -bottom-16 left-10">
                            <div className="relative">
                                <div className="h-32 w-32 rounded-full border-4 border-white bg-white overflow-hidden shadow-md">
                                    <img
                                        src={profileImage ? `data:image/jpeg;base64,${profileImage}` : avatar}
                                        alt={institut.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                {role == 'ROLE_TRADUCTEUR' && <>

                                    <button
                                        onClick={triggerFileInput}
                                        className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors duration-200"
                                    >
                                        <Camera size={18} className="text-blueLogo" />
                                    </button>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/jpeg,image/png,image/gif"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                    {isUploading && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                                            <Loader className="animate-spin text-white" size={24} />
                                        </div>
                                    )}
                                </>}
                            </div>
                        </div>

                        <div className="absolute inset-y-0 left-1/3 flex items-center justify-center w-1/3">
                            <span className="text-2xl font-bold text-white">{institut?.name}</span>
                        </div>

                    </div>
                    <div className="pt-20 px-8 pb-8">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b pb-4 gap-4">
                            <h1 className="text-3xl font-bold text-gray-800">{institut.name}</h1>
                            {role == 'ROLE_TRADUCTEUR' && <>

                                {!editing ? (
                                    <button
                                        onClick={handleEdit}
                                        className="flex items-center gap-2 bg-blueLogo hover:bg-rougeLogo text-white px-4 py-2 rounded-md transition-colors duration-200"
                                        disabled={loading}
                                    >
                                        <Edit2 size={18} />
                                        {t("institut.profil.edit")}
                                    </button>
                                ) : (
                                    <div className="flex gap-3">
                                        <button
                                            onClick={handleSave}
                                            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>
                                                    <Loader size={18} className="animate-spin" />
                                                    {t("institut.profil.saving")}
                                                </>
                                            ) : (
                                                <>
                                                    <Save size={18} />
                                                    {t("institut.profil.save")}
                                                </>
                                            )}
                                        </button>
                                        <button
                                            onClick={handleCancel}
                                            className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md transition-colors duration-200"
                                            disabled={loading}
                                        >
                                            <X size={18} />
                                            {t("institut.profil.cancel")}
                                        </button>
                                    </div>
                                )}
                            </>}

                        </div>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            <InfoCard
                                icon={<Building className="w-6 h-6" />}
                                title={t("institut.profil.name")}
                                value={institut.name}
                                name="name"
                                editing={editing}
                                onChange={handleInputChange}
                                editedValue={editedInstitut?.name}
                                disabled={false}
                            />

                            {/* {t("inscriptionPage.traducteur")} */}
                            <InfoCard
                                icon={<MapPin className="w-6 h-6" />}
                                title={t("institut.profil.type")}
                                // value={institut.type}
                                value={institut.type == "Ecole" ?
                                    t('inscriptionPage.school') : institut.type == "Banque" ?
                                        t('inscriptionPage.bank') : institut.type == "Ambassade" ?
                                            t('inscriptionPage.embassy') : institut.type == "Université" ?
                                                t('inscriptionPage.university') : institut.type == "Collège" ?
                                                    t('inscriptionPage.college') : institut.type == "Traducteur" ?
                                                        t('inscriptionPage.traducteur') : t('inscriptionPage.highSchool')}
                                name="type"
                                editing={false}
                                onChange={handleInputChange}
                                editedValue={editedInstitut?.type}
                                disabled={false}
                            />
                            <InfoCard
                                icon={<MapPin className="w-6 h-6" />}
                                title={t("institut.profil.address")}
                                value={institut.adresse}
                                name="adresse"
                                editing={editing}
                                onChange={handleInputChange}
                                editedValue={editedInstitut?.adresse}
                                disabled={false}
                            />
                            <InfoCard
                                icon={<Phone className="w-6 h-6" />}
                                title={t("institut.profil.phone")}
                                value={institut.phone}
                                name="phone"
                                editing={editing}
                                onChange={handleInputChange}
                                editedValue={editedInstitut?.phone}
                                disabled={false}
                            />
                            <InfoCard
                                icon={<Mail className="w-6 h-6" />}
                                title={t("institut.profil.email")}
                                value={institut.email}
                                name="email"
                                editing={false}
                                onChange={handleInputChange}
                                editedValue={editedInstitut?.email}
                                disabled={true}
                            />
                            <InfoCard
                                icon={<MapPin className="w-6 h-6" />}
                                title={t("institut.profil.country")}
                                value={institut.paysResidence}
                                name="paysResidence"
                                editing={editing}
                                onChange={handleInputChange}
                                editedValue={editedInstitut?.paysResidence}
                                disabled={false}
                            />
                            <InfoCard
                                icon={<Globe className="w-6 h-6" />}
                                title={t("institut.profil.website")}
                                value={institut.siteWeb}
                                name="siteWeb"
                                editing={editing}
                                onChange={handleInputChange}
                                editedValue={editedInstitut?.siteWeb}
                                disabled={false}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

const InfoCard = ({ icon, title, value, name, editing, onChange, editedValue, disabled }) => {
    const { t } = useTranslation()
    const displayValue = (val) => {
        if (typeof val === "object" && val !== null) {
            if (val instanceof Date) {
                return val.toLocaleDateString()
            }
            if (val.date) {
                return new Date(val.date).toLocaleDateString()
            }
            return JSON.stringify(val)
        }
        return val || t("institut.profil.notSpecified")
    }

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-6 transition-all duration-300 hover:shadow-md">
            <div className="flex items-center space-x-3 mb-3">
                <div className="text-blue-500 bg-blue-50 p-2 rounded-full">{icon}</div>
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            </div>
            <div className="w-full">
                {editing ? (
                    <input
                        disabled={disabled}
                        type="text"
                        name={name}
                        value={(editedValue !== undefined ? editedValue : displayValue(value)) || ""}
                        onChange={onChange}
                        className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition-all duration-200 ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
                        placeholder={`${t("institut.profil.enter")} ${title.toLowerCase()}`}
                    />
                ) : (
                    <p className={`text-gray-700 py-2 px-1 ${!value ? "text-gray-400 italic" : ""}`}>{displayValue(value)}</p>
                )}
            </div>
        </div>
    )
}

export default InstitutTraducteurProfil
