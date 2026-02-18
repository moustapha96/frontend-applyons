

"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { toast } from "sonner"
import { Loader2, X } from 'lucide-react'
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { ajouterDocumentDemandeur } from "@/services/documentService"
import { useAuthContext } from "@/context"

const schema = yup.object({
  intitule: yup.string().required("demandeur.errors.intituleRequired"),
  codeUser: yup.string().required("Le code du demandeur est requis"),
  mention: yup.string().required("La mention est requise"),
  typeDocument: yup.string().required("Le type de document est requis"),
  document: yup
    .mixed()
    .required("Le document est requis")
    .test("fileSize", "Le fichier doit être inférieur à 10MB", (value) =>
      value && value[0]?.size < 10000000
    )
    .test(
      "fileType",
      "Seuls les fichiers PDF sont acceptés",
      (value) => value && value[0]?.type === "application/pdf"
    ),
})



export default function AddDocumentForm({ institutId, onSuccess }) {
  const { institut } = useAuthContext()
  //console.log(institut)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [selectedFileName, setSelectedFileName] = useState('');
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      intitule: "",
      codeUser: "",
      mention: "",
      typeDocument: "",
      document: null,
    },
  })

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true)
      //console.log(data)
      const formData = new FormData()
      formData.append("institut_id", institut.id)
      formData.append("codeUser", data.codeUser)
      formData.append("intitule", data.intitule)
      formData.append("type_document", data.typeDocument)
      formData.append("annee_obtention", new Date().getFullYear().toString())
      formData.append("resultat_demande", "Accepted")
      formData.append("mention", data.mention)
      formData.append("document", data.document[0])

      const response = await ajouterDocumentDemandeur(formData)
      //console.log(response)
      reset()
      setSelectedFileName(null)
      toast.success("Document ajouté avec succès")
      reset()
      onSuccess?.()
      navigate("/institut/demandes")
    } catch (error) {
      toast.error("Une erreur est survenue lors de l'ajout du document")
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRemoveFile = (onChange) => {
    setSelectedFileName('');
    onChange(null);
  };

  const handleFileChange = (e, onChange) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFileName(file.name);
      onChange(e.target.files);
    }
  };


  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {t("institutDashboardDemandeur.add_document")}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        <div>
          <label htmlFor="codeUser" className="block text-sm font-medium text-gray-700">
            {t("institutDashboardDemandeur.user_code")} <span className="text-red-500">*</span>
          </label>
          <input
            {...register("codeUser")}
            type="text"
            id="codeUser"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blueLogo focus:border-blueLogo sm:text-sm transition"
            placeholder={t("institutDashboardDemandeur.enter_adn_code")}
          />
          {errors.codeUser && (
            <p className="mt-2 text-sm text-red-500">{errors.codeUser.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="intitule" className="block text-sm font-medium text-gray-700">{t('institutDashboardDemandeur.intituleLabel')} <span className="text-red-500">*</span></label>
          <Controller
            name="intitule"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                id="intitule"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            )}
          />
          {errors.intitule && <p className="mt-2 text-sm text-red-500">{t(errors.intitule.message)}</p>}
        </div>

        <div>
          <label htmlFor="mention" className="block text-sm font-medium text-gray-700">{t("institutAuthentifier.selectMention")} <span className="text-red-500">*</span></label>

          <Controller
            name="mention"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                id="mention"
                rows={3}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blueLogo focus:border-blueLogo sm:text-sm"
              />
            )}
          />
          {errors.mention && <p className="mt-2 text-sm text-red-500">{errors.mention.message}</p>}
        </div>


        <div>
          <label htmlFor="typeDocument" className="block text-sm font-medium text-gray-700">{t("institutDashboardDemandeur.selectTypeDocument")} <span className="text-red-500">*</span></label>
          <Controller
            name="typeDocument"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                id="typeDocument"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blueLogo focus:border-blueLogo sm:text-sm transition"
              >
                <option value="">{t("institutDashboardDemandeur.selectTypeDocument")}</option>
                <option value="Relevé">Relevé</option>
                <option value="Attestation">Attestation</option>
                <option value="Diplôme">Diplôme</option>
                <option value="Certificat">Certificat</option>
              </select>
            )}
          />
          {errors.typeDocument && <p className="mt-2 text-sm text-red-500">{errors.typeDocument.message}</p>}
        </div>


        <div>
          <label htmlFor="anneeObtention" className="block text-sm font-medium text-gray-700">{t("institutDashboardDemandeur.selectAnneeObtention")} <span className="text-red-500">*</span></label>
          <Controller
            name="anneeObtention"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                id="anneeObtention"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blueLogo focus:border-blueLogo sm:text-sm transition"
              >
                {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                  <option key={year} value={year.toString()}>
                    {year}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.anneeObtention && <p className="mt-2 text-sm text-red-500">{errors.anneeObtention.message}</p>}
        </div>

        <div>
          <label htmlFor="document" className="block text-sm font-medium text-gray-700"> {t("institutDashboardDemandeur.document")} <span className="text-red-500">*</span></label>
          <Controller
            name="document"
            control={control}
            render={({ field: { onChange, onBlur, name, ref } }) => (
              <div className="mt-1 flex items-center">
                {selectedFileName ? (
                  <div className="flex items-center justify-between w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm">
                    <span className="text-sm text-gray-500">{selectedFileName}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(onChange)}
                      className="ml-2 text-sm text-red-500 hover:text-red-700 focus:outline-none"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <label className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 cursor-pointer">
                    <span>{t("institutAuthentifier.uploadDocument")}</span>
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
          {errors.document && <p className="mt-2 text-sm text-red-500">{errors.document.message}</p>}
        </div>

        <div className="flex justify-end space-x-4">

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blueLogo text-white rounded-md shadow-sm text-sm font-medium transition hover:bg-rougeLogo"
          >

            {isSubmitting && <Loader2 className="inline-block mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting ? t("institutDashboardDemandeur.submitting") : t("institutDashboardDemandeur.add_document")}
          </button>
        </div>

      </form>
    </div>
  )
}
