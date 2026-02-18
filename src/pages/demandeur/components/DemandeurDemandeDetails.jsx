import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getDemande } from "../../../services/demandeService"
import { Calendar, Award, CheckCircle, Building, Mail, Phone, MapPin, User, Briefcase, Globe, FileText } from "lucide-react"
import { getFileDocument } from "../../../services/documentService"
import { CopyableField } from "../../../utils/CopyableField"
import { useTranslation } from "react-i18next";

export default function DemandeurDemandeDetails() {
    const { id } = useParams()
    const { t } = useTranslation();
    const [demande, setDemande] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [fichier, setFichier] = useState(null);


    useEffect(() => {
        const fetchDemande = async () => {
            try {
                const data = await getDemande(id)
                setDemande(data)
                if (data.document) {
                    const response = await getFileDocument(data.document.id);
                    setFichier(response);
                }
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchDemande()
    }, [id])

    // //console.log(demande)

    if (loading) return <LoadingSkeleton />
    if (error) return <ErrorDisplay error={error} />

    return (
        <div className="bg-gray-100 min-h-screen pb-10">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900"> {t('request_details_title')}</h1>
                </div>
            </header>
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="grid gap-6 md:grid-cols-2">
                        <DemandeInfoCard demande={demande} t={t} />
                        {demande.institut && <InstitutInfoCard institut={demande.institut} t={t} />}
                        {demande.institutDemandeur && <InstitutDemandeurInfoCard institut={demande.institutDemandeur} t={t} />}
                        {!demande.institut && <NoInstitutInfoCard demande={demande} t={t} />}
                        {/* <DemandeurInfoCard demandeur={demande.demandeur} /> */}
                        {demande.document && <DocumentInfoCard document={demande.document} t={t} />}
                        {/* <DocumentInfoCard document={demande.document} /> */}

                    </div>
                </div>
                {fichier && demande.document && (

                    <div>
                        <div className="mt-8 prevent-select">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('Document_Preview')}</h2>
                            <div className="bg-gray-200 rounded-lg p-4">
                                <iframe
                                    src={`data:application/pdf;base64,${fichier}`}
                                    title="Document"
                                    width="100%"
                                    height="600px"
                                />
                            </div>
                        </div>
                    </div>
                )}

            </main>
        </div>
    )
}

function DemandeInfoCard({ demande, t }) {
    return (
        <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4"> {t('request_info_title')}</h3>
                <div className="space-y-4">
                    <InfoItem icon={<Calendar className="w-5 h-5" />} label={t('request_date')} value={new Date(demande.dateDemande).toLocaleDateString()} />
                    <InfoItem icon={<FileText className="w-5 h-5" />} label={t('request_title')} value={demande.intitule} />
                    <InfoItem icon={<Award className="w-5 h-5" />} label={t('request_year')} value={demande.anneeObtention} />
                    <InfoItem
                        icon={<CheckCircle className="w-5 h-5" />}
                        label={t('request_status')}
                        value={
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${demande.resultat === "Accepted" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                                }`}>
                                {demande.resultat}
                            </span>
                        }
                    />
                </div>
            </div>
        </div>
    )
}

// function InstitutDemandeurInfoCard({ institut, t }) {
//     return (
//         <div className="bg-white shadow rounded-lg overflow-hidden">
//             <div className="px-4 py-5 sm:p-6">
//                 <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Institut du Demandeur</h3>
//                 <div className="space-y-4">
//                     <InfoItem icon={<Building className="w-5 h-5" />} label="Nom" value={institut.name} />
//                     <InfoItem icon={<Mail className="w-5 h-5" />} label="Email" value={institut.email} />
//                     <InfoItem icon={<Phone className="w-5 h-5" />} label="Téléphone" value={institut.phone} />
//                     <InfoItem icon={<MapPin className="w-5 h-5" />} label="Adresse" value={institut.adresse} />
//                     <InfoItem icon={<Globe className="w-5 h-5" />} label="Pays" value={institut.paysResidence} />
//                 </div>
//             </div>
//         </div>
//     )
// }
function InstitutDemandeurInfoCard({ institut, t }) {
    return (
        <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">{t('Institut du Demandeur')}</h3>
                <div className="space-y-4">
                    <InfoItem
                        icon={<Building className="w-5 h-5" />}
                        label={t('Nom')}
                        value={institut?.name || t('Non disponible')}
                    />
                    <InfoItem
                        icon={<Mail className="w-5 h-5" />}
                        label={t('Email')}
                        value={institut?.email || t('Non disponible')}
                    />
                    <InfoItem
                        icon={<Phone className="w-5 h-5" />}
                        label={t('Téléphone')}
                        value={institut?.phone || t('Non disponible')}
                    />
                    <InfoItem
                        icon={<MapPin className="w-5 h-5" />}
                        label={t('Adresse')}
                        value={institut?.adresse || t('Non disponible')}
                    />
                    <InfoItem
                        icon={<Globe className="w-5 h-5" />}
                        label={t('Pays')}
                        value={institut?.paysResidence || t('Non disponible')}
                    />
                </div>
            </div>
        </div>
    );
}
function InstitutInfoCard({ institut, t }) {
    return (
        <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">{t('institution_info_title')}</h3>
                <div className="space-y-4">
                    <InfoItem icon={<Building className="w-5 h-5" />} label={t('institution_name')} value={institut.name} />
                    <InfoItem icon={<Mail className="w-5 h-5" />} label="Email" value={institut.email} />
                    <InfoItem icon={<Phone className="w-5 h-5" />} label={t('institution_phone')} value={institut.phone} />
                    <InfoItem icon={<MapPin className="w-5 h-5" />} label={t('institution_address')} value={institut.adresse} />
                    <InfoItem icon={<Globe className="w-5 h-5" />} label={t('institution_country')} value={institut.paysResidence} />
                    <InfoItem icon={<Building className="w-5 h-5" />} label={t('institution_type')} value={institut.type} />
                </div>
            </div>
        </div>
    )
}

function NoInstitutInfoCard({ demande, t }) {
    return (
        <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">{t('institution_associated')}</h3>
                <div className="space-y-4">
                    <InfoItem icon={<Building className="w-5 h-5" />} label={t('institution_name')} value={demande.nameInstitut} />
                    <InfoItem icon={<Mail className="w-5 h-5" />} label="Email" value={demande.emailInstitut} />
                    <InfoItem icon={<Phone className="w-5 h-5" />} label={t('institution_phone')} value={demande.phoneInstitut} />
                    <InfoItem icon={<MapPin className="w-5 h-5" />} label={t('institution_address')} value={demande.adresseInstitut} />
                    <InfoItem icon={<Globe className="w-5 h-5" />} label={t('institution_country')} value={demande.paysInstitut} />
                </div>
            </div>
        </div>
    )
}
function DemandeurInfoCard({ demandeur, t }) {
    return (
        <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Informations du Demandeur</h3>
                <div className="space-y-4">
                    <InfoItem icon={<User className="w-5 h-5" />} label="Nom" value={demandeur.name} />
                    <InfoItem icon={<Mail className="w-5 h-5" />} label="Email" value={demandeur.email} />
                    <InfoItem icon={<Phone className="w-5 h-5" />} label="Téléphone" value={demandeur.phone} />
                    <InfoItem icon={<MapPin className="w-5 h-5" />} label="Adresse" value={demandeur.adresse} />
                    <InfoItem icon={<Calendar className="w-5 h-5" />} label="Date de Naissance" value={new Date(demandeur.dateNaissance).toLocaleDateString()} />
                    <InfoItem icon={<MapPin className="w-5 h-5" />} label="Lieu de Naissance" value={demandeur.lieuNaissance} />
                    <InfoItem icon={<Briefcase className="w-5 h-5" />} label="Profession" value={demandeur.profession} />
                </div>
            </div>
        </div>
    )
}

function DocumentInfoCard({ document, t }) {
    return (
        <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                    {t('associated_document_title')}
                </h3>
                <div className="space-y-4">
                    <CopyableField
                        icon={<FileText className="w-5 h-5" />}
                        label={t('adn_code')}
                        value={document.codeAdn}
                    />
                    <InfoItem
                        icon={<FileText className="w-5 h-5" />}
                        label={t('document_type')}
                        value={document.typeDocument}
                    />
                    <InfoItem
                        icon={<Award className="w-5 h-5" />}
                        label={t('obtaining_year')}
                        value={document.anneeObtention}
                    />
                    <InfoItem
                        icon={<CheckCircle className="w-5 h-5" />}
                        label={t('document_status')}
                        value={document.statut}
                    />
                    <InfoItem
                        icon={<FileText className="w-5 h-5" />}
                        label={t('document_title')}
                        value={document.intitule}
                    />
                </div>
            </div>
        </div>
    );
}


function InfoItem({ icon, label, value }) {
    return (
        <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 text-gray-400">{icon}</div>
            <div>
                <p className="text-sm font-medium text-gray-500">{label}</p>
                <p className="mt-1 text-sm text-gray-900">{value || "N/A"}</p>
            </div>
        </div>
    )
}

function LoadingSkeleton() {
    return (
        <div className="bg-gray-100 min-h-screen pb-10">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <div className="h-9 w-64 bg-gray-200 rounded animate-pulse"></div>
                </div>
            </header>
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="grid gap-6 md:grid-cols-2">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="bg-white shadow rounded-lg overflow-hidden">
                                <div className="px-4 py-5 sm:p-6">
                                    <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4"></div>
                                    {[...Array(5)].map((_, j) => (
                                        <div key={j} className="flex items-center space-x-3 mt-4">
                                            <div className="h-5 w-5 bg-gray-200 rounded-full animate-pulse"></div>
                                            <div className="space-y-2">
                                                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                                                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}

function ErrorDisplay({ error }) {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white shadow rounded-lg overflow-hidden w-full max-w-md">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium leading-6 text-red-600 mb-4">Erreur</h3>
                    <p className="text-center">{error}</p>
                </div>
            </div>
        </div>
    )
}