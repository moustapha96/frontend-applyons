// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { getDemandesByInstitut } from "../../../services/demandeService";
// import { useForm, Controller } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from 'yup';
// import { useAuthContext } from "../../../context/useAuthContext";
// import { toast } from "sonner";
// import { addMassDocumentInstitut, confirmerDemande } from "../../../services/documentService";
// import InstitutBreadcrumb from "../../../components/InstitutBreadcrumb";
// import { Loader, X } from "lucide-react";
// import { useTranslation } from "react-i18next";

// const schema = yup.object({
//     demande: yup.string().required("La demande est requise"),
//     mention: yup.string().required("La mention est requise"),
//     typeDocument: yup.string().required("Le type de document est requis"),
//     anneeObtention: yup.number().required("L'année d'obtention est requise").min(1900).max(new Date().getFullYear()),
//     document: yup.mixed().required("Le document est requis")
//         .test("fileSize", "Le fichier doit être inférieur à 10MB", (value) => value && value[0]?.size < 10000000)
//         .test("fileType", "Seuls les fichiers PDF sont acceptés", (value) => value && value[0]?.type === "application/pdf"),
//     resultatDemande: yup.string().oneOf(['Accepted', 'Declined', 'Pending'], "Le résultat doit être Accepté ou Rejeté").required("Le résultat de la demande est requis"),
// }).required();

// export default function InstitutAuthentifier() {
//     const { t } = useTranslation();
//     const { id } = useParams();
//     const { institut } = useAuthContext();
//     const [demandes, setDemandes] = useState([]);
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [selectedFileName, setSelectedFileName] = useState('');
//     const [activeTab, setActiveTab] = useState("new");
//     const [selectedFiles, setSelectedFiles] = useState([]);
//     const [massFormError, setMassFormError] = useState('');

//     const [massLoading, setMassLoading] = useState(false);

//     const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm({
//         resolver: yupResolver(schema),
//         defaultValues: {
//             demande: id || '',
//             mention: '',
//             typeDocument: '',
//             anneeObtention: new Date().getFullYear(),
//             document: null,
//             resultatDemande: 'Accepted',
//         }
//     });

//     useEffect(() => {
//         const fetchDemande = async () => {
//             try {
//                 const data = await getDemandesByInstitut(institut.id);
//                 if (id) {
//                     const filtered = data.filter((demande) => demande.resultat === "Pending" && demande.id == id);
//                     setDemandes(filtered);
//                 } else {
//                     const filtered = data.filter((demande) => demande.resultat === "Pending");
//                     setDemandes(filtered);
//                 }
//             } catch (error) {
//                 setError(error.message);
//             } finally {
//                 setLoading(false);
//             }
//         }
//         fetchDemande();
//     }, [institut.id]);

//     const onSubmit = async (data) => {
//         try {
//             const formData = new FormData();
//             formData.append('institut_id', institut.id);
//             formData.append('demande_id', data.demande);
//             formData.append('type_document', data.typeDocument);
//             formData.append('annee_obtention', data.anneeObtention);
//             formData.append('resultat_demande', data.resultatDemande);
//             formData.append('mention', data.mention);
//             formData.append('document', data.document[0]);

//             const result = await confirmerDemande(formData);
//             toast.success("Demande enregistrée avec succès", {
//                 position: "top-right",
//                 duration: 2000,
//             });
//             navigate('/institut/demandes');
//         } catch (error) {
//             toast.error(error.response.data.error || "Une erreur est survenue lors de la création de la demande", {
//                 position: "top-right",
//                 duration: 2000,
//             });
//         }
//     };


//     const handleRemoveFile = (onChange) => {
//         setSelectedFileName('');
//         onChange(null);
//     };

//     const handleFileChange = (e, onChange) => {
//         const file = e.target.files[0];
//         if (file) {
//             setSelectedFileName(file.name);
//             onChange(e.target.files);
//         }
//     };

//     const handleMassFileChange = (e) => {
//         const files = Array.from(e.target.files);
//         const invalidFiles = files.filter(file => !file.type.includes('pdf'));

//         if (invalidFiles.length > 0) {
//             setMassFormError(t("institutAuthentifier.fileTypeError"));
//             return;
//         }

//         setMassFormError('');
//         setSelectedFiles(prev => [...prev, ...files]);
//     };

//     const handleRemoveMassFile = (fileName) => {
//         setSelectedFiles(prev => prev.filter(file => file.name !== fileName));
//     };

//     const handleMassSubmit = async (e) => {
//         e.preventDefault();
//         if (selectedFiles.length === 0) {
//             setMassFormError(t("institutAuthentifier.noFilesSelected"));
//             return;
//         }

//         setMassLoading(true);
//         try {
//             const formData = new FormData();

//             //console.log('Selected files:', selectedFiles);

//             selectedFiles.forEach(file => {
//                 formData.append('files[]', file);
//             });
//             formData.append('institut_id', institut.id);
//             //console.log('Files to submit:', selectedFiles);
//             const resultats = await addMassDocumentInstitut(formData);
//             //console.log('Resultats:', resultats);
//             setSelectedFiles([]);
//             setMassFormError('');
//             toast.success("Fichiers enregistrés avec succès", {
//                 position: "top-right",
//                 duration: 2000,
//             });
//         } catch (error) {
//             toast.error(error.response.data.error || "Une erreur est survenue lors de l'envoi des fichiers", {
//                 position: "top-right",
//                 duration: 2000,
//             });
//             setMassFormError(error.message);
//         } finally {
//             setMassLoading(false);
//         }
//     };



//     if (loading) return <div className="flex justify-center items-center h-screen">{t("institutAuthentifier.loadingMessage")}</div>;
//     if (error) return <div className="flex justify-center items-center h-screen text-red-600">{t("institutAuthentifier.errorMessage")}{error}</div>;

//     const renderNewAuthenticationForm = () => (
//         <form onSubmit={handleSubmit(onSubmit)} className=" space-y-6 max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-sm">
//             <div>
//                 <label htmlFor="demande" className="block text-sm font-medium text-gray-700">{t("institutAuthentifier.selectDemandeur")} <span className="text-red-500">*</span></label>
//                 <Controller
//                     name="demande"
//                     control={control}
//                     render={({ field }) => (
//                         <select
//                             {...field}
//                             id="demande"
//                             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm transition"
//                         >
//                             {id && demandes.length == 1 ? (
//                                 <option selected value={demandes[0].id}>
//                                     {demandes[0].intitule} - {demandes[0].demandeur.name}
//                                 </option>
//                             ) : <>
//                                 <option value="">{t("institutAuthentifier.selectDemandeur")}</option>
//                                 {demandes.map((demande, index) => (
//                                     <option key={index} value={demande.id}>
//                                         {demande.intitule} - {demande.demandeur.name}
//                                     </option>
//                                 ))}
//                             </>}
//                         </select>
//                     )}
//                 />
//                 {errors.demande && <p className="mt-2 text-sm text-red-500">{errors.demande.message}</p>}
//             </div>

//             <div>
//                 <label htmlFor="mention" className="block text-sm font-medium text-gray-700">{t("institutAuthentifier.selectMention")} <span className="text-red-500">*</span></label>
//                 <Controller
//                     name="mention"
//                     control={control}
//                     render={({ field }) => (
//                         <textarea
//                             {...field}
//                             id="mention"
//                             rows={3}
//                             className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                         />
//                     )}
//                 />
//                 {errors.mention && <p className="mt-2 text-sm text-red-500">{errors.mention.message}</p>}
//             </div>

//             <div>
//                 <label htmlFor="typeDocument" className="block text-sm font-medium text-gray-700">{t("institutAuthentifier.selectTypeDocument")} <span className="text-red-500">*</span></label>
//                 <Controller
//                     name="typeDocument"
//                     control={control}
//                     render={({ field }) => (
//                         <select
//                             {...field}
//                             id="typeDocument"
//                             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm transition"
//                         >
//                             <option value="">{t("institutAuthentifier.selectTypeDocument")}</option>
//                             <option value="Relevé">Relevé</option>
//                             <option value="Attestation">Attestation</option>
//                             <option value="Diplome">Diplome</option>
//                         </select>
//                     )}
//                 />
//                 {errors.typeDocument && <p className="mt-2 text-sm text-red-500">{errors.typeDocument.message}</p>}
//             </div>

//             <div>
//                 <label htmlFor="anneeObtention" className="block text-sm font-medium text-gray-700">{t("institutAuthentifier.selectAnneeObtention")} <span className="text-red-500">*</span></label>
//                 <Controller
//                     name="anneeObtention"
//                     control={control}
//                     render={({ field }) => (
//                         <select
//                             {...field}
//                             id="anneeObtention"
//                             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm transition"
//                         >
//                             {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i).map((year) => (
//                                 <option key={year} value={year.toString()}>
//                                     {year}
//                                 </option>
//                             ))}
//                         </select>
//                     )}
//                 />
//                 {errors.anneeObtention && <p className="mt-2 text-sm text-red-500">{errors.anneeObtention.message}</p>}
//             </div>

//             <div>
//                 <label htmlFor="resultatDemande" className="block text-sm font-medium text-gray-700">{t("institutAuthentifier.selectResultatDemande")} <span className="text-red-500">*</span></label>
//                 <Controller
//                     name="resultatDemande"
//                     control={control}
//                     render={({ field }) => (
//                         <select
//                             {...field}
//                             id="resultatDemande"
//                             disabled={true}
//                             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm transition"
//                         >
//                             <option value="">{t("institutAuthentifier.selectResultatDemande")}</option>
//                             <option selected value="Accepted">Accepté</option>
//                             <option value="Declined">Rejeté</option>
//                             <option value="Pending">En attente</option>
//                         </select>
//                     )}
//                 />
//                 {errors.resultatDemande && <p className="mt-2 text-sm text-red-500">{errors.resultatDemande.message}</p>}
//             </div>

//             <div>
//                 <label htmlFor="document" className="block text-sm font-medium text-gray-700">{t("institutAuthentifier.selectDocument")} <span className="text-red-500">*</span></label>
//                 <Controller
//                     name="document"
//                     control={control}
//                     render={({ field: { onChange, onBlur, name, ref } }) => (
//                         <div className="mt-1 flex items-center">
//                             {selectedFileName ? (
//                                 <div className="flex items-center justify-between w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm">
//                                     <span className="text-sm text-gray-500">{selectedFileName}</span>
//                                     <button
//                                         type="button"
//                                         onClick={() => handleRemoveFile(onChange)}
//                                         className="ml-2 text-sm text-red-500 hover:text-red-700 focus:outline-none"
//                                     >
//                                         <X size={16} />
//                                     </button>
//                                 </div>
//                             ) : (
//                                 <label className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 cursor-pointer">
//                                     <span>{t("institutAuthentifier.uploadDocument")}</span>
//                                     <input
//                                         type="file"
//                                         onChange={(e) => handleFileChange(e, onChange)}
//                                         onBlur={onBlur}
//                                         name={name}
//                                         ref={ref}
//                                         accept=".pdf"
//                                         className="sr-only"
//                                     />
//                                 </label>
//                             )}
//                         </div>
//                     )}
//                 />
//                 {errors.document && <p className="mt-2 text-sm text-red-500">{errors.document.message}</p>}
//             </div>

//             <div className="flex justify-end space-x-4">
//                 <button
//                     type="button"
//                     onClick={() => navigate('/institut/demandes')}
//                     className="px-4 py-2 bg-gray-500 text-white rounded-md shadow-sm text-sm font-medium transition hover:bg-gray-600"
//                 >
//                     {t("institutAuthentifier.cancelAuthentication")}
//                 </button>
//                 <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="px-4 py-2 bg-blueLogo text-white rounded-md shadow-sm text-sm font-medium transition hover:bg-blue-600"
//                 >
//                     {isSubmitting ? t('submitting') : t("institutAuthentifier.save")}
//                 </button>
//             </div>
//         </form>
//     );

//     const renderMassAuthenticationForm = () => (

//         <form onSubmit={handleMassSubmit} className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-sm">
//             <h2 className="text-2xl font-semibold text-gray-800 mb-6">{t("institutAuthentifier.authentification_masse")}</h2>

//             <div className="mt-2 p-3 bg-blue-50 rounded-md border border-blue-200">
//                 <h4 className="text-sm font-medium text-blue-800 mb-2">{t("fileUpload.requiredFormat")}</h4>
//                 <p className="text-xs text-blue-700">
//                     {t("fileUpload.formatInstructions")}{" "}
//                     <span className="font-mono bg-blue-100 px-1 rounded">email_typedocument_mention_annee.pdf</span>
//                 </p>
//                 <div className="mt-2">
//                     <p className="text-xs text-blue-700">
//                         {t("fileUpload.example")}{" "}
//                         <span className="font-mono bg-blue-100 px-1 rounded">etudiant@exemple.com_diplome_bien_2022.pdf</span>
//                     </p>
//                 </div>
//             </div>

//             <div className="space-y-6">
//                 <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                         {t("institutAuthentifier.selectDocument")} <span className="text-red-500">*</span>
//                     </label>

//                     <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-blueLogo transition-colors">
//                         <div className="space-y-1 text-center">
//                             <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
//                                 <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
//                             </svg>
//                             <div className="flex text-sm text-gray-600 justify-center">
//                                 <label htmlFor="mass-file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blueLogo hover:text-blueLogoDark focus-within:outline-none">
//                                     <span>{t("institutAuthentifier.uploadDocument")}</span>
//                                     <input
//                                         id="mass-file-upload"
//                                         name="mass-file-upload"
//                                         type="file"
//                                         className="sr-only"
//                                         multiple
//                                         accept=".pdf"
//                                         onChange={handleMassFileChange}
//                                     />
//                                 </label>
//                             </div>
//                             <p className="text-xs text-gray-500">{t("institutAuthentifier.fileTypeError")}</p>
//                         </div>
//                     </div>
//                     {massFormError && (
//                         <p className="mt-2 text-sm text-red-600">{massFormError}</p>
//                     )}
//                 </div>

//                 {selectedFiles.length > 0 && (
//                     <div className="mt-6">
//                         <h3 className="text-lg font-medium text-gray-900 mb-3">
//                             {t("institutAuthentifier.uploadedFiles")} ({selectedFiles.length})
//                         </h3>
//                         <ul className="divide-y divide-gray-200 border border-gray-200 rounded-md">
//                             {selectedFiles.map((file, index) => (
//                                 <li key={index} className="py-3 px-4 flex justify-between items-center hover:bg-gray-50">
//                                     <div className="flex items-center">
//                                         <svg className="h-5 w-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
//                                         </svg>
//                                         <span className="text-sm text-gray-900">{file.name}</span>
//                                     </div>
//                                     <button
//                                         type="button"
//                                         onClick={() => handleRemoveMassFile(file.name)}
//                                         className="text-sm text-red-600 hover:text-red-800 flex items-center"
//                                     >
//                                         <span className="mr-1">{t("institutAuthentifier.removeFile")}</span>
//                                         <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                                         </svg>
//                                     </button>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 )}

//                 <div className="mt-6 flex justify-end space-x-3">
//                     <button
//                         type="button"
//                         onClick={() => setSelectedFiles([])}
//                         className="py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blueLogo"
//                     >
//                         {t("institutAuthentifier.cancel")}
//                     </button>
//                     <button
//                         type="submit"
//                         disabled={selectedFiles.length === 0}
//                         className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${selectedFiles.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blueLogo hover:bg-blueLogoDark'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blueLogo`}
//                     >
//                         {massLoading ? <> <Loader span className="mr-2 animate-spin" ></Loader> </> : t("institutAuthentifier.submit")}
//                     </button>
//                 </div>
//             </div>
//         </form>
//     );

//     return (
//         <div className="container mx-auto px-4 py-8">
//             <InstitutBreadcrumb title={t("institutAuthentifier.documentTitle")} SubTitle={institut?.name} />

//             <section>
//                 <div className="container ">

//                     <div className="my-6 space-y-6">

//                         <div className="flex border-b border-gray-200 justify-between w-full">
//                             <button
//                                 className={`py-2 px-4 font-medium ${activeTab === "new" ? 'text-blueLogo border-b-2 border-blueLogo' : 'text-gray-500 hover:text-gray-700'}`}
//                                 onClick={() => setActiveTab("new")}
//                             >
//                                 {t("institutAuthentifier.nouvelle_authentification")}
//                             </button>
//                             <button
//                                 className={`py-2 px-4 font-medium ${activeTab === "mass" ? 'text-blueLogo border-b-2 border-blueLogo' : 'text-gray-500 hover:text-gray-700'}`}
//                                 onClick={() => setActiveTab("mass")}
//                             >
//                                 {t("institutAuthentifier.authentification_masse")}
//                             </button>
//                         </div>

//                         <div className="mt-6">
//                             {activeTab === "new" ? (
//                                 renderNewAuthenticationForm()
//                             ) : (
//                                 renderMassAuthenticationForm()
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </div>

//     );
// }

"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDemandesByInstitut } from "../../../services/demandeService"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useAuthContext } from "../../../context/useAuthContext"
import { toast } from "sonner"
import { addMassDocumentInstitut, confirmerDemande } from "../../../services/documentService"
import InstitutBreadcrumb from "../../../components/InstitutBreadcrumb"
import {
  Loader,
  X,
  FileText,
  Upload,
  CheckCircle,
  XCircle,
  FileUp,
  FilePlus2,
  Files,
  ArrowLeft,
  Save,
} from "lucide-react"
import { useTranslation } from "react-i18next"

const schema = yup
  .object({
    demande: yup.string().required("La demande est requise"),
    mention: yup.string().required("La mention est requise"),
    typeDocument: yup.string().required("Le type de document est requis"),
    anneeObtention: yup.number().required("L'année d'obtention est requise").min(1900).max(new Date().getFullYear()),
    document: yup
      .mixed()
      .required("Le document est requis")
      .test("fileSize", "Le fichier doit être inférieur à 10MB", (value) => value && value[0]?.size < 10000000)
      .test(
        "fileType",
        "Seuls les fichiers PDF sont acceptés",
        (value) => value && value[0]?.type === "application/pdf",
      ),
    resultatDemande: yup
      .string()
      .oneOf(["Accepted", "Declined", "Pending"], "Le résultat doit être Accepté ou Rejeté")
      .required("Le résultat de la demande est requis"),
  })
  .required()

export default function InstitutAuthentifier() {
  const { t } = useTranslation()
  const { id } = useParams()
  const { institut } = useAuthContext()
  const [demandes, setDemandes] = useState([])
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedFileName, setSelectedFileName] = useState("")
  const [activeTab, setActiveTab] = useState("new")
  const [selectedFiles, setSelectedFiles] = useState([])
  const [massFormError, setMassFormError] = useState("")
  const [massLoading, setMassLoading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      demande: id || "",
      mention: "",
      typeDocument: "",
      anneeObtention: new Date().getFullYear(),
      document: null,
      resultatDemande: "Accepted",
    },
  })

  useEffect(() => {
    const fetchDemande = async () => {
      try {
        const data = await getDemandesByInstitut(institut.id)
        if (id) {
          const filtered = data.filter((demande) => demande.resultat === "Pending" && demande.id == id)
          setDemandes(filtered)
        } else {
          const filtered = data.filter((demande) => demande.resultat === "Pending")
          setDemandes(filtered)
        }
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchDemande()
  }, [institut.id, id])

  const onSubmit = async (data) => {
    try {
      const formData = new FormData()
      formData.append("institut_id", institut.id)
      formData.append("demande_id", data.demande)
      formData.append("type_document", data.typeDocument)
      formData.append("annee_obtention", data.anneeObtention)
      formData.append("resultat_demande", data.resultatDemande)
      formData.append("mention", data.mention)
      formData.append("document", data.document[0])

      const result = await confirmerDemande(formData)
      toast.success("Demande enregistrée avec succès", {
        position: "top-right",
        duration: 2000,
      })
      navigate("/institut/demandes")
    } catch (error) {
      toast.error(error.response?.data?.error || "Une erreur est survenue lors de la création de la demande", {
        position: "top-right",
        duration: 2000,
      })
    }
  }

  const handleRemoveFile = (onChange) => {
    setSelectedFileName("")
    onChange(null)
  }

  const handleFileChange = (e, onChange) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFileName(file.name)
      onChange(e.target.files)
    }
  }

  const handleMassFileChange = (e) => {
    const files = Array.from(e.target.files)
    const invalidFiles = files.filter((file) => !file.type.includes("pdf"))

    if (invalidFiles.length > 0) {
      setMassFormError(t("institutAuthentifier.fileTypeError"))
      return
    }

    setMassFormError("")
    setSelectedFiles((prev) => [...prev, ...files])
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files)
    const invalidFiles = files.filter((file) => !file.type.includes("pdf"))

    if (invalidFiles.length > 0) {
      setMassFormError(t("institutAuthentifier.fileTypeError"))
      return
    }

    setMassFormError("")
    setSelectedFiles((prev) => [...prev, ...files])
  }

  const handleRemoveMassFile = (fileName) => {
    setSelectedFiles((prev) => prev.filter((file) => file.name !== fileName))
  }

  const handleMassSubmit = async (e) => {
    e.preventDefault()
    if (selectedFiles.length === 0) {
      setMassFormError(t("institutAuthentifier.noFilesSelected"))
      return
    }

    setMassLoading(true)
    try {
      const formData = new FormData()

      selectedFiles.forEach((file) => {
        formData.append("files[]", file)
      })
      formData.append("institut_id", institut.id)

      const resultats = await addMassDocumentInstitut(formData)
      //console.log("Resultats:", resultats)
      setSelectedFiles([])
      setMassFormError("")
      toast.success("Fichiers enregistrés avec succès", {
        position: "top-right",
        duration: 2000,
      })
    } catch (error) {
      //console.log(error)
      toast.error(error.response?.data?.error || "Une erreur est survenue lors de l'envoi des fichiers", {
        position: "top-right",
        duration: 2000,
      })
      setMassFormError(error.message)
    } finally {
      setMassLoading(false)
    }
  }

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center">
          <Loader className="h-8 w-8 text-blueLogo animate-spin mb-2" />
          <p className="text-gray-600">{t("institutAuthentifier.loadingMessage")}</p>
        </div>
      </div>
    )

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
          <p className="font-medium">
            {t("institutAuthentifier.errorMessage")} {error}
          </p>
        </div>
      </div>
    )

  const renderNewAuthenticationForm = () => (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <FileText className="mr-2 h-6 w-6 text-blueLogo" />
          {t("institutAuthentifier.nouvelle_authentification")}
        </h2>
        <p className="text-gray-600 mt-1"> {t("institutAuthentifier.description")} </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label htmlFor="demande" className="block text-sm font-medium text-gray-700 mb-1">
            {t("institutAuthentifier.selectDemandeur")} <span className="text-red-500">*</span>
          </label>
          <Controller
            name="demande"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                id="demande"
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blueLogo focus:border-blueLogo transition-all duration-200"
              >
                {id && demandes.length == 1 ? (
                  <option selected value={demandes[0].id}>
                    {demandes[0].intitule} - {demandes[0].demandeur.name}
                  </option>
                ) : (
                  <>
                    <option value="">{t("institutAuthentifier.selectDemandeur")}</option>
                    {demandes.map((demande, index) => (
                      <option key={index} value={demande.id}>
                        {demande.intitule} - {demande.demandeur.name}
                      </option>
                    ))}
                  </>
                )}
              </select>
            )}
          />
          {errors.demande && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <XCircle className="h-4 w-4 mr-1" />
              {errors.demande.message}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="mention" className="block text-sm font-medium text-gray-700 mb-1">
            {t("institutAuthentifier.selectMention")} <span className="text-red-500">*</span>
          </label>
          <Controller
            name="mention"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                id="mention"
                rows={3}
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blueLogo focus:border-blueLogo transition-all duration-200"
                placeholder={t("institutAuthentifier.placeholderMention")}
              />
            )}
          />
          {errors.mention && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <XCircle className="h-4 w-4 mr-1" />
              {errors.mention.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="typeDocument" className="block text-sm font-medium text-gray-700 mb-1">
            {t("institutAuthentifier.selectTypeDocument")} <span className="text-red-500">*</span>
          </label>
          <Controller
            name="typeDocument"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                id="typeDocument"
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blueLogo focus:border-blueLogo transition-all duration-200"
              >
                <option value="">{t("institutAuthentifier.selectTypeDocument")}</option>
                <option value="Relevé">Relevé</option>
                <option value="Attestation">Attestation</option>
                <option value="Diplome">Diplôme</option>
              </select>
            )}
          />
          {errors.typeDocument && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <XCircle className="h-4 w-4 mr-1" />
              {errors.typeDocument.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="anneeObtention" className="block text-sm font-medium text-gray-700 mb-1">
            {t("institutAuthentifier.selectAnneeObtention")} <span className="text-red-500">*</span>
          </label>
          <Controller
            name="anneeObtention"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                id="anneeObtention"
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blueLogo focus:border-blueLogo transition-all duration-200"
              >
                {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                  <option key={year} value={year.toString()}>
                    {year}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.anneeObtention && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <XCircle className="h-4 w-4 mr-1" />
              {errors.anneeObtention.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="resultatDemande" className="block text-sm font-medium text-gray-700 mb-1">
            {t("institutAuthentifier.selectResultatDemande")} <span className="text-red-500">*</span>
          </label>
          <Controller
            name="resultatDemande"
            control={control}
            render={({ field }) => (
              <div className="relative">
                <select
                  {...field}
                  id="resultatDemande"
                  disabled={true}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blueLogo focus:border-blueLogo transition-all duration-200 bg-gray-50"
                >
                  <option value="">{t("institutAuthentifier.selectResultatDemande")}</option>
                  <option selected value="Accepted">
                    Accepté
                  </option>
                  <option value="Declined">Rejeté</option>
                  <option value="Pending">En attente</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-8 pointer-events-none">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
              </div>
            )}
          />
          {errors.resultatDemande && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <XCircle className="h-4 w-4 mr-1" />
              {errors.resultatDemande.message}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="document" className="block text-sm font-medium text-gray-700 mb-1">
            {t("institutAuthentifier.selectDocument")} <span className="text-red-500">*</span>
          </label>
          <Controller
            name="document"
            control={control}
            render={({ field: { onChange, onBlur, name, ref } }) => (
              <div className="mt-1">
                {selectedFileName ? (
                  <div className="flex items-center justify-between w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-blue-50">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-blueLogo mr-2" />
                      <span className="text-sm text-gray-700">{selectedFileName}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(onChange)}
                      className="ml-2 p-1 rounded-full text-red-500 hover:text-red-700 hover:bg-red-50 focus:outline-none transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ) : (
                  <label className="flex items-center justify-center px-4 py-4 border-2 border-dashed border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:border-blueLogo focus:outline-none focus:ring-2 focus:ring-blueLogo focus:border-blueLogo cursor-pointer transition-all duration-200">
                    <div className="flex flex-col items-center">
                      <Upload className="h-8 w-8 text-blueLogo mb-2" />
                      <span className="text-center">{t("institutAuthentifier.uploadDocument")}</span>
                      <span className="text-xs text-gray-500 mt-1"> {t("institutAuthentifier.pdfOnly")} </span>
                    </div>
                    <input
                      type="file"
                      onChange={(e) => handleFileChange(e, onChange)}
                      onBlur={onBlur}
                      name={name}
                      ref={ref}
                      accept=".pdf"
                      className="sr-only"
                    />
                  </label>
                )}
              </div>
            )}
          />
          {errors.document && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <XCircle className="h-4 w-4 mr-1" />
              {errors.document.message}
            </p>
          )}
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200 mt-8">
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate("/institut/demandes")}
            className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-all duration-200 flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t("institutAuthentifier.cancelAuthentication")}
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-5 py-2.5 bg-blueLogo text-white rounded-lg hover:bg-rougeLogo focus:ring-2 focus:ring-offset-2 focus:ring-blueLogo transition-all duration-200 flex items-center ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
          >
            {isSubmitting ? (
              <>
                <Loader className="h-4 w-4 mr-2 animate-spin" />
                {t("submitting")}
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                {t("institutAuthentifier.save")}
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  )

  const renderMassAuthenticationForm = () => (
    <form
      onSubmit={handleMassSubmit}
      className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <Files className="mr-2 h-6 w-6 text-blueLogo" />
          {t("institutAuthentifier.authentification_masse")}
        </h2>
        <p className="text-gray-600 mt-1"> {t("institutAuthentifier.authentification_masse_text")} </p>
      </div>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="text-sm font-medium text-blue-800 mb-2 flex items-center">
          <FileUp className="h-4 w-4 mr-1 text-blue-700" />
          {t("fileUpload.requiredFormat")}
        </h4>
        <p className="text-sm text-blue-700">
          {t("fileUpload.formatInstructions")}{" "}
          <span className="font-mono bg-blue-100 px-2 py-0.5 rounded text-blue-800">
            email_typedocument_mention_annee.pdf
          </span>
        </p>
        <div className="mt-3 bg-blue-100 p-3 rounded-md">
          <p className="text-sm text-blue-800">
            {t("fileUpload.example")}{" "}
            <span className="font-mono font-medium">etudiant@exemple.com_diplome_bien_2022.pdf</span>
          </p>
        </div>
      </div>

      <div className="space-y-6 mt-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("institutAuthentifier.selectDocument")} <span className="text-red-500">*</span>
          </label>

          <div
            className={`mt-1 flex flex-col justify-center px-6 pt-5 pb-6 border-2 ${isDragging ? "border-blueLogo bg-blue-50" : "border-gray-300"} border-dashed rounded-lg hover:border-blueLogo transition-colors cursor-pointer`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="space-y-3 text-center">
              <FilePlus2 className="mx-auto h-12 w-12 text-blueLogo" />
              <div className="flex flex-col text-sm text-gray-600">
                <label
                  htmlFor="mass-file-upload"
                  className="relative cursor-pointer rounded-md font-medium text-blueLogo hover:text-blue-700 focus-within:outline-none"
                >
                  <span>{t("institutAuthentifier.uploadDocument")}</span>
                  <input
                    id="mass-file-upload"
                    name="mass-file-upload"
                    type="file"
                    className="sr-only"
                    multiple
                    accept=".pdf"
                    onChange={handleMassFileChange}
                  />
                </label>
                <p className="text-gray-500 mt-1"> {t("institutAuthentifier.dragAndDrop")}</p>
              </div>
              <p className="text-xs text-gray-500">{t("institutAuthentifier.pdfOnly")}</p>
            </div>
          </div>
          {massFormError && (
            <p className="mt-2 text-sm text-red-600 flex items-center">
              <XCircle className="h-4 w-4 mr-1" />
              {massFormError}
            </p>
          )}
        </div>

        {selectedFiles.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-blueLogo" />
              {t("institutAuthentifier.uploadedFiles")}
              <span className="ml-2 bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                {selectedFiles.length}
              </span>
            </h3>
            <ul className="divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden">
              {selectedFiles.map((file, index) => (
                <li
                  key={index}
                  className="py-3 px-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-blueLogo mr-3" />
                    <span className="text-sm text-gray-900">{file.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveMassFile(file.name)}
                    className="text-sm text-red-600 hover:text-red-800 flex items-center p-1 rounded-full hover:bg-red-50 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="pt-4 border-t border-gray-200 mt-8">
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setSelectedFiles([])}
              className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-all duration-200 flex items-center"
            >
              <X className="h-4 w-4 mr-2" />
              {t("institutAuthentifier.cancel")}
            </button>
            <button
              type="submit"
              disabled={selectedFiles.length === 0 || massLoading}
              className={`px-5 py-2.5 rounded-lg focus:ring-2 focus:ring-offset-2 focus:ring-blueLogo transition-all duration-200 flex items-center ${selectedFiles.length === 0 || massLoading
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-blueLogo text-white hover:bg-rougeLogo"
                }`}
            >
              {massLoading ? (
                <>
                  <Loader className="h-4 w-4 mr-2 animate-spin" />
                  {t("submitting")}
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  {t("institutAuthentifier.submit")}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  )

  return (
    <div className="bg-gray-50 min-h-screen">
      <InstitutBreadcrumb title={t("institutAuthentifier.documentTitle")} SubTitle={institut?.name} />

      <section className="py-8">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="bg-white shadow-md rounded-xl overflow-hidden mb-6">
            <div className="flex border-b border-gray-200">
              <button
                className={`flex items-center py-4 px-6 font-medium transition-colors duration-200 ${activeTab === "new"
                  ? "text-blueLogo border-b-2 border-blueLogo bg-blue-50/50"
                  : "text-gray-600 hover:text-blueLogo hover:bg-blue-50/30"
                  }`}
                onClick={() => setActiveTab("new")}
              >
                <FileText className="h-5 w-5 mr-2" />
                {t("institutAuthentifier.nouvelle_authentification")}
              </button>
              <button
                className={`flex items-center py-4 px-6 font-medium transition-colors duration-200 ${activeTab === "mass"
                  ? "text-blueLogo border-b-2 border-blueLogo bg-blue-50/50"
                  : "text-gray-600 hover:text-blueLogo hover:bg-blue-50/30"
                  }`}
                onClick={() => setActiveTab("mass")}
              >
                <Files className="h-5 w-5 mr-2" />
                {t("institutAuthentifier.authentification_masse")}
              </button>
            </div>
          </div>

          <div className="mt-6">
            {activeTab === "new" ? renderNewAuthenticationForm() : renderMassAuthenticationForm()}
          </div>
        </div>
      </section>
    </div>
  )
}

