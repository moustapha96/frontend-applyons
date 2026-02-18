// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { getDemandesByInstitut } from "../../../services/demandeService";
// import { useForm, Controller } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from 'yup';
// import { useAuthContext } from "../../../context/useAuthContext";
// import { toast } from "sonner";
// import { confirmerDemande } from "../../../services/documentService";
// import InstitutBreadcrumb from "../../../components/InstitutBreadcrumb";
// import { useTranslation } from "react-i18next";

// const schema = yup.object({
//     // nomComplet: yup.string().required("Le nom complet est requis"),
//     demande: yup.string().required("La demande est requise"),
//     mention: yup.string().required("La mention est requise"),
//     // dateNaissance: yup.date().required("La date de naissance est requise"),
//     typeDocument: yup.string().required("Le type de document est requis"),
//     anneObtention: yup.number().required("L'année d'obtention est requise").min(1900).max(new Date().getFullYear()),
//     // date_obtention: yup.date().required("La date d'obtention est requise"),
//     document: yup.mixed().required("Le document est requis")
//         .test("fileSize", "Le fichier doit être inférieur à 10MB", (value) => value && value[0]?.size < 10000000)
//         .test("fileType", "Seuls les fichiers PDF sont acceptés", (value) => value && value[0]?.type === "application/pdf"),
//     resultat_demande: yup.string().oneOf(['Accepted', 'Declined', 'Pending'], "Le résultat doit être Accepté ou Rejeté").required("Le résultat de la demande est requis"),
// }).required();


// export default function InstitutAuthentifierDemande() {
//     const { id } = useParams();
//     const { t } = useTranslation();
//     // //console.log(id);
//     // //console.log("id du demandeur ");

//     const { institut } = useAuthContext();
//     const [demandes, setDemandes] = useState([]);
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm({
//         resolver: yupResolver(schema),
//         defaultValues: {
//             nomComplet: '',
//             demande: '',
//             mention: '',
//             dateNaissance: '',
//             typeDocument: '',
//             anneObtention: new Date().getFullYear(),
//             document: null,
//             resultat_demande: '',
//         }
//     });

//     useEffect(() => {
//         const fetchDemande = async () => {
//             setLoading(true);
//             try {
//                 const data = await getDemandesByInstitut(institut.id);
//                 // //console.log(data)
//                 const filtered = data.filter((demande) => demande.resultat == "Pending" && demande.id == id);
//                 // //console.log("filtered")
//                 // //console.log(filtered)
//                 setDemandes(filtered);
//             } catch (error) {
//                 setError(error.message);
//             } finally {
//                 setLoading(false);
//             }
//         }
//         fetchDemande();
//     }, [institut.id, id]);

//     const onSubmit = async (data) => {
//         // //console.log(data);

//         try {
//             const formData = new FormData();

//             // Ajout des champs de texte
//             //console.log(institut.id)
//             formData.append('institut_id', institut.id);
//             formData.append('demande_id', data.demande);
//             formData.append('type_document', data.typeDocument);
//             // formData.append('date_obtention', data.date_obtention);
//             formData.append('annee_obtention', data.anneObtention);
//             formData.append('resultat_demande', data.resultat_demande);

//             formData.append('mention', data.mention);
//             // formData.append('nomComplet', data.nomComplet);
//             // formData.append('dateNaissance', data.dateNaissance);
//             formData.append('document', data.document[0]);
//             // //console.log(formData)

//             const result = await confirmerDemande(formData);
//             toast.success("Demande enregistrée avec succès", {
//                 position: "top-right",
//                 duration: 2000,
//             });
//             navigate('/institut/demandes');
//         } catch (error) {
//             // //console.log(error)
//             toast.error(error.response.data.error || "Une erreur est survenue lors de la création de la demande", {
//                 position: "top-right",
//                 duration: 2000,
//             });
//         }
//     };

//     // if (loading) return <div className="flex justify-center items-center h-screen">Chargement des détails du document...</div>;
//     if (error) return <div className="flex justify-center items-center h-screen text-red-600">Erreur: {error}</div>;

//     return (

//         <div className="bg-gray-100 min-h-screen">
//             <InstitutBreadcrumb title={t('authentifier_un_document')} SubTitle={institut?.name} />

//             <section>
//                 <div className="container">
//                     <div className="my-6 space-y-6">
//                         <div className="max-w-3xl mx-auto px-4 py-8 bg-white shadow-md rounded-md">
//                             <h4 className="text-2xl font-semibold text-gray-800 uppercase mb-6">Nouvelle Authentification</h4>
//                             <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//                                 <div>
//                                     <label htmlFor="demande" className="block text-sm font-medium text-gray-700">Sélectionner le demandeur</label>
//                                     {loading && <p className="mt-2 text-sm text-gray-500">Chargement des types de demande...</p>}
//                                     {!loading && demandes.length === 0 && <p className="mt-2 text-sm text-gray-500">Aucun demandeur disponible.</p>}
//                                     {!loading && demandes && <>

//                                         <Controller
//                                             name="demande"
//                                             control={control}
//                                             render={({ field }) => (
//                                                 <select
//                                                     {...field}
//                                                     id="demande"
//                                                     className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm transition"
//                                                 >
//                                                     {id && demandes[0] ? <>
//                                                         <option value={demandes[0].id} > {demandes[0].intitule} - {demandes[0].demandeur.name} </option>

//                                                     </> : <>
//                                                         <option value="">Sélectionnez le demandeur</option>
//                                                         {demandes.map((demande, index) => (
//                                                             <option key={index} value={demande.id}>
//                                                                 {demande.intitule} - {demande.demandeur.name}
//                                                             </option>
//                                                         ))}
//                                                     </>}

//                                                 </select>
//                                             )}
//                                         />
//                                         {errors.demande && <p className="mt-2 text-sm text-red-500">{errors.demande.message}</p>}
//                                     </>}
//                                 </div>

//                                 {/* <div>
//                                     <label htmlFor="nomComplet" className="block text-sm font-medium text-gray-700">Nom Complet</label>
//                                     <Controller
//                                         name="nomComplet"
//                                         control={control}
//                                         render={({ field }) => (
//                                             <input
//                                                 {...field}
//                                                 id="nomComplet"

//                                                 className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm transition"
//                                             />
//                                         )}
//                                     />
//                                     {errors.nomComplet && <p className="mt-2 text-sm text-red-500">{errors.nomComplet.message}</p>}
//                                 </div> */}



//                                 <div>
//                                     <label htmlFor="mention" className="block text-sm font-medium text-gray-700">Mention</label>
//                                     <Controller
//                                         name="mention"
//                                         control={control}
//                                         render={({ field }) => (
//                                             <select
//                                                 {...field}
//                                                 id="mention"
//                                                 className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm transition"
//                                             >
//                                                 <option value="">Sélectionnez la mention </option>
//                                                 <option value="Passable">Passable</option>
//                                                 <option value="Assez Bien">Assez Bien</option>
//                                                 <option value="Bien">Bien</option>
//                                                 <option value="Tres Bien">Tres Bien</option>
//                                                 <option value="Excellent">Excellent</option>
//                                             </select>
//                                         )}
//                                     />
//                                     {errors.mention && <p className="mt-2 text-sm text-red-500">{errors.mention.message}</p>}
//                                 </div>

//                                 {/* <div>
//                                     <label htmlFor="dateNaissance" className="block text-sm font-medium text-gray-700">Date de Naissance</label>
//                                     <Controller
//                                         name="dateNaissance"
//                                         control={control}
//                                         render={({ field }) => (
//                                             <input
//                                                 {...field}
//                                                 id="dateNaissance"
//                                                 type="date"
//                                                 className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm transition"
//                                             />
//                                         )}
//                                     />
//                                     {errors.dateNaissance && <p className="mt-2 text-sm text-red-500">{errors.dateNaissance.message}</p>}
//                                 </div> */}

//                                 <div>
//                                     <label htmlFor="typeDocument" className="block text-sm font-medium text-gray-700">Type de Document</label>
//                                     <Controller
//                                         name="typeDocument"
//                                         control={control}
//                                         render={({ field }) => (
//                                             <select
//                                                 {...field}
//                                                 id="typeDocument"
//                                                 className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm transition"
//                                             >
//                                                 <option value="">Sélectionnez le type </option>
//                                                 <option value="Relevé">Relevé</option>
//                                                 <option value="Attestation">Attestation</option>
//                                                 <option value="Diplome">Diplome</option>
//                                             </select>
//                                         )}
//                                     />
//                                     {errors.typeDocument && <p className="mt-2 text-sm text-red-500">{errors.typeDocument.message}</p>}
//                                 </div>



//                                 <div>
//                                     <label htmlFor="anneObtention" className="block text-sm font-medium text-gray-700">Année d'Obtention</label>
//                                     <Controller
//                                         name="anneObtention"
//                                         control={control}
//                                         render={({ field }) => (
//                                             <select
//                                                 {...field}
//                                                 id="anneObtention"
//                                                 className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm transition"
//                                             >
//                                                 {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i).map((year) => (
//                                                     <option key={year} value={year.toString()}>
//                                                         {year}
//                                                     </option>
//                                                 ))}
//                                             </select>
//                                         )}
//                                     />
//                                     {errors.anneObtention && <p className="mt-2 text-sm text-red-500">{errors.anneObtention.message}</p>}
//                                 </div>
//                                 {/* <div>
//                                     <label htmlFor="date_obtention" className="block text-sm font-medium text-gray-700">Date Obtention</label>
//                                     <Controller
//                                         name="date_obtention"
//                                         control={control}
//                                         render={({ field }) => (
//                                             <select
//                                                 {...field}
//                                                 id="date_obtention"
//                                                 className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm transition"
//                                             >
//                                                 {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i).map((year) => (
//                                                     <option key={year} value={year.toString()}>
//                                                         {year}
//                                                     </option>
//                                                 ))}
//                                             </select>
//                                         )}
//                                     />
//                                     {errors.date_obtention && <p className="mt-2 text-sm text-red-500">{errors.date_obtention.message}</p>}
//                                 </div> */}


//                                 <div>
//                                     <label htmlFor="resultat_demande" className="block text-sm font-medium text-gray-700">Résultat de la Demande</label>
//                                     <Controller
//                                         name="resultat_demande"
//                                         control={control}
//                                         render={({ field }) => (
//                                             <select
//                                                 {...field}
//                                                 id="resultat_demande"
//                                                 className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm transition"
//                                             >
//                                                 <option value="">Sélectionnez le résultat</option>
//                                                 <option value="Accepted">Accepté</option>
//                                                 <option value="Declined">Rejeté</option>
//                                                 <option value="Pending">Pending</option>
//                                             </select>
//                                         )}
//                                     />
//                                     {errors.resultat_demande && <p className="mt-2 text-sm text-red-500">{errors.resultat_demande.message}</p>}
//                                 </div>

//                                 <div>
//                                     <label htmlFor="document" className="block text-sm font-medium text-gray-700">Document PDF</label>
//                                     <Controller
//                                         name="document"
//                                         control={control}
//                                         render={({ field: { onChange, onBlur, name, ref } }) => (
//                                             <input
//                                                 type="file"
//                                                 onChange={(e) => onChange(e.target.files)}
//                                                 onBlur={onBlur}
//                                                 name={name}
//                                                 ref={ref}
//                                                 accept=".pdf"
//                                                 className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm transition"
//                                             />
//                                         )}
//                                     />
//                                     {errors.document && <p className="mt-2 text-sm text-red-500">{errors.document.message}</p>}
//                                 </div>

//                                 <div className="flex justify-end space-x-4">
//                                     <button
//                                         type="button"
//                                         onClick={() => navigate('/institut/demandes')}
//                                         className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition"
//                                     >
//                                         Annuler
//                                     </button>
//                                     <button
//                                         type="submit"
//                                         className={`px-4 py-2 bg-blueLogo text-white rounded-md hover:bg-rougeLogo focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
//                                         disabled={isSubmitting}
//                                     >
//                                         {isSubmitting ? "Envoi en cours..." : "Envoyer la demande"}
//                                     </button>
//                                 </div>
//                             </form>
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
import { confirmerDemande } from "../../../services/documentService"
import InstitutBreadcrumb from "../../../components/InstitutBreadcrumb"
import { useTranslation } from "react-i18next"
import { FileCheck, CheckCircle, XCircle, Clock, Upload, ArrowLeft, Loader2 } from "lucide-react"

const schema = yup
  .object({
    demande: yup.string().required("La demande est requise"),
    mention: yup.string().required("La mention est requise"),
    typeDocument: yup.string().required("Le type de document est requis"),
    anneObtention: yup.number().required("L'année d'obtention est requise").min(1900).max(new Date().getFullYear()),
    document: yup
      .mixed()
      .required("Le document est requis")
      .test("fileSize", "Le fichier doit être inférieur à 10MB", (value) => value && value[0]?.size < 10000000)
      .test(
        "fileType",
        "Seuls les fichiers PDF sont acceptés",
        (value) => value && value[0]?.type === "application/pdf",
      ),
    resultat_demande: yup
      .string()
      .oneOf(["Accepted", "Declined", "Pending"], "Le résultat doit être Accepté ou Rejeté")
      .required("Le résultat de la demande est requis"),
  })
  .required()

export default function InstitutAuthentifierDemande() {
  const { id } = useParams()
  const { t } = useTranslation()
  const { institut } = useAuthContext()
  const [demandes, setDemandes] = useState([])
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      demande: "",
      mention: "",
      typeDocument: "",
      anneObtention: new Date().getFullYear(),
      document: null,
      resultat_demande: "",
    },
  })

  useEffect(() => {
    const fetchDemande = async () => {
      setLoading(true)
      try {
        const data = await getDemandesByInstitut(institut.id)
        const filtered = data.filter((demande) => demande.resultat == "Pending" && demande.id == id)
        setDemandes(filtered)
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
      formData.append("annee_obtention", data.anneObtention)
      formData.append("resultat_demande", data.resultat_demande)
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

  const handleFileChange = (files) => {
    if (files && files[0]) {
      setSelectedFile(files[0].name)
    } else {
      setSelectedFile(null)
    }
  }

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
          <p className="font-medium">Erreur: {error}</p>
        </div>
      </div>
    )

  return (
    <div className="bg-gray-50 min-h-screen">
      <InstitutBreadcrumb title={t("authentifier_un_document")} SubTitle={institut?.name} />

      <section className="py-8">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-blueLogo to-blueLogo/90 p-6">
              <div className="flex items-center space-x-3">
                <FileCheck className="h-8 w-8 text-white" />
                <h2 className="text-2xl font-bold text-white">Nouvelle Authentification</h2>
              </div>
            </div>

            <div className="p-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <label htmlFor="demande" className="block text-sm font-medium text-gray-700 mb-1">
                      Sélectionner le demandeur
                    </label>
                    {loading && (
                      <div className="flex items-center space-x-2 text-blueLogo">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <p className="text-sm">Chargement des types de demande...</p>
                      </div>
                    )}
                    {!loading && demandes.length === 0 && (
                      <p className="text-sm text-gray-500 bg-gray-50 p-3 rounded-md border border-gray-200">
                        Aucun demandeur disponible.
                      </p>
                    )}
                    {!loading && demandes && (
                      <div className="relative">
                        <Controller
                          name="demande"
                          control={control}
                          render={({ field }) => (
                            <select
                              {...field}
                              id="demande"
                              className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blueLogo focus:border-blueLogo transition-all duration-200"
                            >
                              {id && demandes[0] ? (
                                <option value={demandes[0].id}>
                                  {demandes[0].intitule} - {demandes[0].demandeur.name}
                                </option>
                              ) : (
                                <>
                                  <option value="">Sélectionnez le demandeur</option>
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
                    )}
                  </div>

                  <div>
                    <label htmlFor="mention" className="block text-sm font-medium text-gray-700 mb-1">
                      Mention
                    </label>
                    <Controller
                      name="mention"
                      control={control}
                      render={({ field }) => (
                        <select
                          {...field}
                          id="mention"
                          className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blueLogo focus:border-blueLogo transition-all duration-200"
                        >
                          <option value="">Sélectionnez la mention</option>
                          <option value="Passable">Passable</option>
                          <option value="Assez Bien">Assez Bien</option>
                          <option value="Bien">Bien</option>
                          <option value="Tres Bien">Très Bien</option>
                          <option value="Excellent">Excellent</option>
                        </select>
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
                      Type de Document
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
                          <option value="">Sélectionnez le type</option>
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
                    <label htmlFor="anneObtention" className="block text-sm font-medium text-gray-700 mb-1">
                      Année d'Obtention
                    </label>
                    <Controller
                      name="anneObtention"
                      control={control}
                      render={({ field }) => (
                        <select
                          {...field}
                          id="anneObtention"
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
                    {errors.anneObtention && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <XCircle className="h-4 w-4 mr-1" />
                        {errors.anneObtention.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="resultat_demande" className="block text-sm font-medium text-gray-700 mb-1">
                      Résultat de la Demande
                    </label>
                    <Controller
                      name="resultat_demande"
                      control={control}
                      render={({ field }) => (
                        <div className="relative">
                          <select
                            {...field}
                            id="resultat_demande"
                            className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blueLogo focus:border-blueLogo transition-all duration-200"
                          >
                            <option value="">Sélectionnez le résultat</option>
                            <option value="Accepted">Accepté</option>
                            <option value="Declined">Rejeté</option>
                            <option value="Pending">En attente</option>
                          </select>
                          {field.value && (
                            <span className="absolute right-10 top-1/2 transform -translate-y-1/2">
                              {field.value === "Accepted" && <CheckCircle className="h-5 w-5 text-green-500" />}
                              {field.value === "Declined" && <XCircle className="h-5 w-5 text-red-500" />}
                              {field.value === "Pending" && <Clock className="h-5 w-5 text-yellow-500" />}
                            </span>
                          )}
                        </div>
                      )}
                    />
                    {errors.resultat_demande && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <XCircle className="h-4 w-4 mr-1" />
                        {errors.resultat_demande.message}
                      </p>
                    )}
                  </div>

                  <div className="col-span-2">
                    <label htmlFor="document" className="block text-sm font-medium text-gray-700 mb-1">
                      Document PDF
                    </label>
                    <Controller
                      name="document"
                      control={control}
                      render={({ field: { onChange, onBlur, name, ref } }) => (
                        <div className="relative">
                          <div
                            className={`flex items-center justify-center w-full border-2 border-dashed rounded-lg p-6 transition-all ${errors.document
                                ? "border-red-300 bg-red-50"
                                : "border-gray-300 hover:border-blueLogo hover:bg-blue-50"
                              }`}
                          >
                            <input
                              type="file"
                              onChange={(e) => {
                                onChange(e.target.files)
                                handleFileChange(e.target.files)
                              }}
                              onBlur={onBlur}
                              name={name}
                              ref={ref}
                              accept=".pdf"
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div className="text-center">
                              <Upload className="mx-auto h-10 w-10 text-blueLogo mb-2" />
                              {selectedFile ? (
                                <p className="text-sm font-medium text-gray-900">{selectedFile}</p>
                              ) : (
                                <>
                                  <p className="text-sm font-medium text-gray-900">
                                    Cliquez pour sélectionner un fichier PDF
                                  </p>
                                  <p className="text-xs text-gray-500 mt-1">PDF uniquement, max 10MB</p>
                                </>
                              )}
                            </div>
                          </div>
                          {errors.document && (
                            <p className="mt-1 text-sm text-red-600 flex items-center">
                              <XCircle className="h-4 w-4 mr-1" />
                              {errors.document.message}
                            </p>
                          )}
                        </div>
                      )}
                    />
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
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className={`px-5 py-2.5 bg-blueLogo text-white rounded-lg hover:bg-rougeLogo focus:ring-2 focus:ring-offset-2 focus:ring-blueLogo transition-all duration-200 flex items-center ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Envoyer la demande
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

