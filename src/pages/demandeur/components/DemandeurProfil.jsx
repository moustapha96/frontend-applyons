
// import { useState, useEffect, useCallback } from "react";
// import { User, Mail, Phone, MapPin, Calendar, Briefcase, Edit2, Save, X, Camera, Loader, Key } from "lucide-react";
// import DemandeurBreadcrumb from "../../../components/DemandeurBreadcrumb";
// import { useAuthContext } from "../../../context/useAuthContext";
// import { updateDemandeur } from "../../../services/demandeurService";

// import avatar from "@/assets/avatar.png";
// import { toast } from "sonner";
// import { uploadProfileImage } from "../../../services/userService";
// import { useTranslation } from "react-i18next";
// import { CopyableField } from "@/utils/CopyableField";

// const DemandeurProfil = () => {
//     const { t } = useTranslation();
//     const { saveDemandeur, demandeur, session, saveProfilImage, profileImage } = useAuthContext();
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [editing, setEditing] = useState(false);
//     const [editedDemandeur, setEditedDemandeur] = useState(null);
//     const [isUploading, setIsUploading] = useState(false);
//     // //console.log(demandeur)

//     useEffect(() => {
//         if (demandeur) {
//             setEditedDemandeur({ ...demandeur });
//         }
//     }, [demandeur]);

//     const handleEdit = () => {
//         setEditing(true);
//     };

//     const handleSave = async () => {
//         try {
//             setLoading(true); // Set loading state
//             const result = await updateDemandeur(demandeur.id, editedDemandeur);
//             //console.log(result);
//             saveDemandeur(result); // Update global context with new demandeur data
//             setEditedDemandeur(result); // Update local state
//             setEditing(false);
//             setError(null); // Clear previous errors
//         } catch (err) {
//             console.error(err); // Log error for debugging
//             setError(err.response?.data?.message || t("demandeur.saveError"));
//         } finally {
//             setLoading(false); // Reset loading state
//         }
//     };

//     const handleCancel = () => {
//         setEditedDemandeur({ ...demandeur });
//         setEditing(false);
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setEditedDemandeur(prev => ({ ...prev, [name]: value }));
//     };

//     const handleImageUpload = useCallback(async (event) => {
//         const file = event.target.files?.[0];
//         if (!file) return;

//         const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
//         if (!allowedTypes.includes(file.type)) {
//             toast.error(t("demandeur.fileTypeError"));
//             return;
//         }

//         const maxSize = 5 * 1024 * 1024; // 5MB
//         if (file.size > maxSize) {
//             toast.error(t("demandeur.fileSizeError"));
//             return;
//         }

//         setIsUploading(true);
//         try {
//             const formData = new FormData();
//             formData.append('image', file);

//             const response = await uploadProfileImage(session.id, formData);

//             if (response && response.imageUrl) {
//                 saveProfilImage(response.imageUrl);
//                 toast.success(t("demandeur.imageUploadSuccess"));
//             } else {
//                 throw new Error(response.error || t("demandeur.imageUploadError"));
//             }
//         } catch (error) {
//             console.error('Erreur lors du téléchargement de l\'image:', error);
//             toast.error(t("demandeur.imageUploadError"));
//         } finally {
//             setIsUploading(false);
//         }
//     }, [session, saveProfilImage, t]);

//     return (
//         <div className="bg-gray-100 min-h-screen">
//             <DemandeurBreadcrumb title={t("demandeur.profileTitle")} SubTitle={demandeur.name + " ID : " + demandeur.codeUser} />
//             <section className="container mx-auto px-4 py-8">
//                 <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
//                     <div className="p-6 sm:p-10">
//                         <div className="flex items-center justify-center mb-6">
//                             <div className="relative">
//                                 <img
//                                     src={profileImage ? `data:image/jpeg;base64,${profileImage}` : avatar}
//                                     alt="Apply Ons"
//                                     width={100}
//                                     height={100}
//                                     className="rounded-full object-cover"
//                                 />
//                                 <label htmlFor="profile-image-upload" className="absolute bottom-0 right-0 bg-white rounded-full p-1 cursor-pointer">
//                                     <Camera size={20} />
//                                 </label>
//                                 <input
//                                     id="profile-image-upload"
//                                     type="file"
//                                     accept="image/jpeg,image/png,image/gif"
//                                     onChange={handleImageUpload}
//                                     className="hidden"
//                                 />
//                                 {isUploading && (
//                                     <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
//                                         <Loader className="animate-spin text-white" size={24} />
//                                     </div>
//                                 )}
//                             </div>
//                         </div>

//                         <div className="flex justify-between items-center mb-6">
//                             <h1 className="text-3xl font-bold text-gray-800">{demandeur.name}</h1>
//                             {!editing ? (
//                                 <button onClick={handleEdit} className="flex items-center text-blue-500 hover:text-blueLogo">
//                                     <Edit2 className="w-5 h-5 mr-2" />
//                                     {loading ? t("demandeur.loading") : t("demandeur.editButton")}
//                                 </button>
//                             ) : (
//                                 <div>
//                                     <button onClick={handleSave} className="flex items-center text-green-500 hover:text-green-600 mr-4 mb-2 ">
//                                         <Save className="w-5 h-5 mr-2" />
//                                         {t("demandeur.saveButton")}
//                                     </button>
//                                     <button onClick={handleCancel} className="flex items-center text-red-500 hover:text-red-600 ">
//                                         <X className="w-5 h-5 mr-2" />
//                                         {t("demandeur.cancelButton")}
//                                     </button>
//                                 </div>
//                             )}
//                         </div>
//                         <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
//                             <CopyableField icon={<Key className="w-5 h-5" />} label={t("demandeur.codeUser")} value={demandeur.codeUser} />

//                             <InfoCard icon={<MapPin className="w-6 h-6" />} title={t("demandeur.lieuNaissance")} value={demandeur.lieuNaissance} name="lieuNaissance" editing={editing} onChange={handleChange} editedValue={editedDemandeur?.lieuNaissance} disabled={false} />
//                             <InfoCard icon={<Briefcase className="w-6 h-6" />} title={t("demandeur.profession")} value={demandeur.profession} name="profession" editing={editing} onChange={handleChange} editedValue={editedDemandeur?.profession} disabled={false} />
//                             <InfoCard icon={<MapPin className="w-6 h-6" />} title={t("demandeur.adresse")} value={demandeur.adresse} name="adresse" editing={editing} onChange={handleChange} editedValue={editedDemandeur?.adresse} disabled={false} />
//                             <InfoCard icon={<Phone className="w-6 h-6" />} title={t("demandeur.telephone")} value={demandeur.phone} name="phone" editing={editing} onChange={handleChange} editedValue={editedDemandeur?.phone} disabled={false} />
//                             <InfoCard icon={<Mail className="w-6 h-6" />} title={t("demandeur.email")} value={demandeur.email} name="email" editing={editing} onChange={handleChange} editedValue={editedDemandeur?.email} disabled={true} />
//                             <InfoCard icon={<MapPin className="w-6 h-6" />} title={t("demandeur.paysResidence")} value={demandeur.paysResidence} name="paysResidence" editing={editing} onChange={handleChange} editedValue={editedDemandeur?.paysResidence} disabled={false} />
//                             <InfoCard icon={<User className="w-6 h-6" />} title={t("demandeur.sexe")} value={demandeur.sexe} name="sexe" editing={editing} onChange={handleChange} editedValue={editedDemandeur?.sexe} disabled={true} />
//                             <InfoCard icon={<User className="w-6 h-6" />} title={t("demandeur.codeUser")} value={demandeur.codeUser} name="codeUser" editing={editing} onChange={handleChange} editedValue={editedDemandeur?.codeUser} disabled={true} />
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </div>
//     );
// };

// const InfoCard = ({ icon, title, value, name, editing, onChange, editedValue, disabled }) => {
//     const displayValue = (val) => {
//         if (typeof val === 'object' && val !== null) {
//             // Format date if it's a Date object or string
//             if (val instanceof Date) {
//                 return val.toLocaleDateString();
//             }
//             if (val.date) {
//                 return new Date(val.date).toLocaleDateString(); // Assuming val.date is a valid date string
//             }
//             return JSON.stringify(val);
//         }
//         return val || "N/A"; // Default fallback
//     };

//     return (
//         <div className="bg-gray-50 rounded-lg p-6 flex flex-col space-y-2">
//             <div className="flex items-center space-x-2">
//                 <div className="text-blue-500">{icon}</div>
//                 <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
//             </div>
//             <div className="w-full">
//                 {editing ? (
//                     <input
//                         disabled={disabled}
//                         type="text"
//                         name={name}
//                         value={(editedValue !== undefined ? editedValue : displayValue(value))}
//                         onChange={onChange}
//                         className={`w-full p-2 border rounded-md ${disabled ? 'bg-gray-200' : ''}`}
//                     />
//                 ) : (
//                     <p className="text-gray-600">{displayValue(value)}</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default DemandeurProfil;

"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { User, Mail, Phone, MapPin, Briefcase, Edit2, Save, X, Camera, Loader, Key } from "lucide-react"
import DemandeurBreadcrumb from "../../../components/DemandeurBreadcrumb"
import { useAuthContext } from "../../../context/useAuthContext"
import { updateDemandeur } from "../../../services/demandeurService"

import avatar from "@/assets/avatar.png"
import { toast } from "sonner"
import { uploadProfileImage } from "../../../services/userService"
import { useTranslation } from "react-i18next"
import { CopyableField } from "@/utils/CopyableField"

const DemandeurProfil = () => {
    const { t } = useTranslation()
    const { saveSession, setDemandeur, role, saveDemandeur, demandeur, session, saveProfilImage, profileImage, token } =
        useAuthContext()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [editing, setEditing] = useState(false)
    const [editedDemandeur, setEditedDemandeur] = useState(null)
    const [isUploading, setIsUploading] = useState(false)
    const [refreshKey, setRefreshKey] = useState(0)
    const fileInputRef = useRef(null)

    useEffect(() => {
        if (demandeur) {
            setEditedDemandeur({ ...demandeur })
        }
    }, [demandeur, refreshKey])

    const handleEdit = () => {
        setEditing(true)
    }

    const handleSave = async () => {
        try {
            setLoading(true)
            const result = await updateDemandeur(demandeur.id, editedDemandeur)

            // Mise à jour du contexte avec les nouvelles données
            if (result) {
                saveDemandeur(result)
                //console.log(result)
                setDemandeur((prev) => ({
                    ...prev,
                    lieuNaissance: result.lieuNaissance,
                    profession: result.profession,
                    adresse: result.adresse,
                    telephone: result.phone,
                    paysResidence: result.paysResidence,
                    sexe: result.sexe,
                    codeUser: result.codeUser,
                    name: result.name,
                    email: result.email
                }))

            }

            setEditing(false)
            setError(null)
            setRefreshKey((prev) => prev + 1)
            toast.success(t("demandeur.saveSuccess") || "Profil mis à jour avec succès")
        } catch (err) {
            console.error(err)
            setError(err.response?.data?.message || t("demandeur.saveError"))
            toast.error(err.response?.data?.message || t("demandeur.saveError"))
        } finally {
            setLoading(false)
        }
    }

    const handleCancel = () => {
        setEditedDemandeur({ ...demandeur })
        setEditing(false)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setEditedDemandeur((prev) => ({
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
                toast.error(t("demandeur.fileTypeError"))
                return
            }

            const maxSize = 5 * 1024 * 1024 // 5MB
            if (file.size > maxSize) {
                toast.error(t("demandeur.fileSizeError"))
                return
            }

            setIsUploading(true)
            try {
                const formData = new FormData()
                formData.append("image", file)

                const response = await uploadProfileImage(session.id, formData)

                if (response && response.imageUrl) {
                    saveProfilImage(response.imageUrl)
                    toast.success(t("demandeur.imageUploadSuccess"))
                } else {
                    throw new Error(response.error || t("demandeur.imageUploadError"))
                }
            } catch (error) {
                console.error("Erreur lors du téléchargement de l'image:", error)
                toast.error(t("demandeur.imageUploadError"))
            } finally {
                setIsUploading(false)
            }
        },
        [session, saveProfilImage, t],
    )

    if (!demandeur || !editedDemandeur) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader className="animate-spin text-blue-500" size={40} />
                <span className="ml-2 text-lg">{t("demandeur.loading")}</span>
            </div>
        )
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <DemandeurBreadcrumb
                title={t("demandeur.profileTitle")}
            // SubTitle={demandeur.name + " ID : " + demandeur.codeUser}
            />

            <section className="container mx-auto px-4 py-8">
                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded shadow-md">
                        <p className="font-medium">{t("demandeur.error")}</p>
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
                                        alt={demandeur.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <button
                                    onClick={triggerFileInput}
                                    className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors duration-200"
                                >
                                    <Camera size={18} className="text-blue-500" />
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
                            </div>
                        </div>
                    </div>

                    <div className="pt-20 px-8 pb-8">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b pb-4 gap-4">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">{demandeur.name}</h1>
                                <div className="mt-2">
                                    <CopyableField
                                        icon={<Key className="w-5 h-5" />}
                                        label={t("demandeur.codeUser")}
                                        value={demandeur.codeUser}
                                    />
                                </div>
                            </div>
                            {!editing ? (
                                <button
                                    onClick={handleEdit}
                                    className="flex items-center gap-2 bg-blueLogo hover:bg-rougeLogo text-white px-4 py-2 rounded-md transition-colors duration-200"
                                    disabled={loading}
                                >
                                    <Edit2 size={18} />
                                    {t("demandeur.editButton")}
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
                                                {t("demandeur.loading")}
                                            </>
                                        ) : (
                                            <>
                                                <Save size={18} />
                                                {t("demandeur.saveButton")}
                                            </>
                                        )}
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md transition-colors duration-200"
                                        disabled={loading}
                                    >
                                        <X size={18} />
                                        {t("demandeur.cancelButton")}
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            <InfoCard
                                icon={<MapPin className="w-6 h-6" />}
                                title={t("demandeur.lieuNaissance")}
                                value={demandeur.lieuNaissance}
                                name="lieuNaissance"
                                editing={editing}
                                onChange={handleInputChange}
                                editedValue={editedDemandeur?.lieuNaissance}
                                disabled={false}
                            />
                            <InfoCard
                                icon={<Briefcase className="w-6 h-6" />}
                                title={t("demandeur.profession")}
                                value={demandeur.profession}
                                name="profession"
                                editing={editing}
                                onChange={handleInputChange}
                                editedValue={editedDemandeur?.profession}
                                disabled={false}
                            />
                            <InfoCard
                                icon={<MapPin className="w-6 h-6" />}
                                title={t("demandeur.adresse")}
                                value={demandeur.adresse}
                                name="adresse"
                                editing={editing}
                                onChange={handleInputChange}
                                editedValue={editedDemandeur?.adresse}
                                disabled={false}
                            />
                            <InfoCard
                                icon={<Phone className="w-6 h-6" />}
                                title={t("demandeur.telephone")}
                                value={demandeur.phone}
                                name="phone"
                                editing={editing}
                                onChange={handleInputChange}
                                editedValue={editedDemandeur?.phone}
                                disabled={false}
                            />
                            <InfoCard
                                icon={<Mail className="w-6 h-6" />}
                                title={t("demandeur.email")}
                                value={demandeur.email}
                                name="email"
                                editing={editing}
                                onChange={handleInputChange}
                                editedValue={editedDemandeur?.email}
                                disabled={true}
                            />
                            <InfoCard
                                icon={<MapPin className="w-6 h-6" />}
                                title={t("demandeur.paysResidence")}
                                value={demandeur.paysResidence}
                                name="paysResidence"
                                editing={editing}
                                onChange={handleInputChange}
                                editedValue={editedDemandeur?.paysResidence}
                                disabled={false}
                            />
                            <InfoCard
                                icon={<User className="w-6 h-6" />}
                                title={t("demandeur.sexe")}
                                value={demandeur.sexe}
                                name="sexe"
                                editing={editing}
                                onChange={handleInputChange}
                                editedValue={editedDemandeur?.sexe}
                                disabled={true}
                            />

                            <InfoCard
                                icon={<User className="w-6 h-6" />}
                                title={t("demandeur.codeUser")}
                                value={demandeur.codeUser}
                                name="codeUser"
                                editing={editing}
                                onChange={handleInputChange}
                                editedValue={editedDemandeur?.codeUser}
                                disabled={true}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

const InfoCard = ({ icon, title, value, name, editing, onChange, editedValue, disabled }) => {
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
        return val || "Non renseigné"
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
                        placeholder={`Entrez ${title.toLowerCase()}`}
                    />
                ) : (
                    <p className={`text-gray-700 py-2 px-1 ${!value ? "text-gray-400 italic" : ""}`}>{displayValue(value)}</p>
                )}
            </div>
        </div>
    )
}

export default DemandeurProfil

