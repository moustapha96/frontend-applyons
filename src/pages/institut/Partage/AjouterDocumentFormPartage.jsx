// "use client"

// import { useState, useEffect } from "react"
// import { useForm, Controller } from "react-hook-form"
// import { yupResolver } from "@hookform/resolvers/yup"
// import * as yup from "yup"
// import { toast } from "sonner"
// import { Loader2, PlusIcon, X } from "lucide-react"
// import { useNavigate } from "react-router-dom"
// import { useTranslation } from "react-i18next"
// import { useAuthContext } from "@/context"
// import { addDocumentPartage } from "@/services/partageService"
// import { Button } from "antd"

// const createSchema = (t) =>
//   yup.object({
//     intitule: yup.string().required(t("documentForm.errors.intituleRequired")),
//     codeDemande: yup.string().required(t("documentForm.errors.codeRequired")),
//     mention: yup.string().required(t("documentForm.errors.mentionRequired")),
//     typeDocument: yup.string().required(t("documentForm.errors.typeRequired")),
//     anneeObtention: yup.string().required(t("documentForm.errors.yearRequired")),
//     document: yup
//       .mixed()
//       .required(t("documentForm.errors.documentRequired"))
//       .test("fileSize", t("documentForm.errors.fileSize"), (value) => value && value[0]?.size < 10000000)
//       .test("fileType", t("documentForm.errors.fileType"), (value) => value && value[0]?.type === "application/pdf"),
//   })

// export default function AjouterDocumentFormPartage({ onSuccess }) {
//   const { institut } = useAuthContext()
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const navigate = useNavigate()
//   const { t } = useTranslation()
//   const [selectedFileName, setSelectedFileName] = useState("")

//   const schema = createSchema(t)

//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//     reset,
//   } = useForm({
//     resolver: yupResolver(schema),
//     defaultValues: {
//       intitule: "",
//       codeDemande: "",
//       mention: "",
//       typeDocument: "",
//       anneeObtention: "",
//       document: null,
//     },
//   })

//   const onSubmit = async (data) => {
//     try {
//       setIsSubmitting(true)

//       const formData = new FormData()
//       formData.append("institutId", institut.id)
//       formData.append("codeDemande", data.codeDemande)
//       formData.append("intitule", data.intitule)
//       formData.append("typeDocument", data.typeDocument)
//       formData.append("anneeObtention", data.anneeObtention)
//       formData.append("mention", data.mention)
//       formData.append("document", data.document[0])

//       await addDocumentPartage(formData)
//       toast.success(t("documentForm.success"))
//       reset()
//       setSelectedFileName("")
//       onSuccess?.()
//       navigate("/institut/partages/ajouter")
//     } catch (error) {
//       toast.error(t("documentForm.error"))
//       console.error(error)
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   const handleRemoveFile = (onChange) => {
//     setSelectedFileName("")
//     onChange(null)
//   }

//   const handleFileChange = (e, onChange) => {
//     const file = e.target.files[0]
//     if (file) {
//       setSelectedFileName(file.name)
//       onChange(e.target.files)
//     }
//   }

//   return (
//     <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 w-full max-w-3xl mx-auto">
//       <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
//         {t("documentForm.title")}
//       </h2>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
//         {/* Code Demande + Intitulé */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           {/* Code */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               {t("documentForm.document_code")} <span className="text-red-500">*</span>
//             </label>
//             <input
//               {...register("codeDemande")}
//               type="text"
//               className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 text-sm"
//               placeholder={t("documentForm.enter_document_code")}
//             />
//             {errors.codeDemande && (
//               <p className="mt-1 text-xs text-red-500">{t(errors.codeDemande.message)}</p>
//             )}
//           </div>

//           {/* Intitulé */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               {t("documentForm.title_label")} <span className="text-red-500">*</span>
//             </label>
//             <Controller
//               name="intitule"
//               control={control}
//               render={({ field }) => (
//                 <input
//                   {...field}
//                   type="text"
//                   className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 text-sm"
//                 />
//               )}
//             />
//             {errors.intitule && (
//               <p className="mt-1 text-xs text-red-500">{t(errors.intitule.message)}</p>
//             )}
//           </div>
//         </div>

//         {/* Mention */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             {t("documentForm.mention")} <span className="text-red-500">*</span>
//           </label>
//           <Controller
//             name="mention"
//             control={control}
//             render={({ field }) => (
//               <textarea
//                 {...field}
//                 rows={3}
//                 className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 text-sm"
//               />
//             )}
//           />
//           {errors.mention && (
//             <p className="mt-1 text-xs text-red-500">{t(errors.mention.message)}</p>
//           )}
//         </div>

//         {/* Type document + Année */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               {t("documentForm.document_type")} <span className="text-red-500">*</span>
//             </label>
//             <Controller
//               name="typeDocument"
//               control={control}
//               render={({ field }) => (
//                 <select
//                   {...field}
//                   className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 text-sm"
//                 >
//                   <option value="">{t("documentForm.select_document_type")}</option>
//                   <option value="Relevé">{t("documentForm.document_types.transcript")}</option>
//                   <option value="Attestation">{t("documentForm.document_types.certificate")}</option>
//                   <option value="Diplôme">{t("documentForm.document_types.diploma")}</option>
//                   <option value="Certificat">{t("documentForm.document_types.certification")}</option>
//                 </select>
//               )}
//             />
//             {errors.typeDocument && (
//               <p className="mt-1 text-xs text-red-500">{t(errors.typeDocument.message)}</p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               {t("documentForm.year_obtained")} <span className="text-red-500">*</span>
//             </label>
//             <Controller
//               name="anneeObtention"
//               control={control}
//               render={({ field }) => (
//                 <select
//                   {...field}
//                   className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 text-sm"
//                 >
//                   <option value="">{t("demandePartage.select_year")}</option>
//                   {Array.from({ length: 20 }, (_, i) => {
//                     const year = new Date().getFullYear() - i
//                     return (
//                       <option key={year} value={year.toString()}>
//                         {year}
//                       </option>
//                     )
//                   })}
//                 </select>
//               )}
//             />
//             {errors.anneeObtention && (
//               <p className="mt-1 text-xs text-red-500">{t(errors.anneeObtention.message)}</p>
//             )}
//           </div>
//         </div>

//         {/* Document Upload */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             {t("documentForm.document")} <span className="text-red-500">*</span>
//           </label>
//           <Controller
//             name="document"
//             control={control}
//             render={({ field: { onChange, onBlur, name, ref } }) => (
//               <div className="mt-1 flex items-center">
//                 {selectedFileName ? (
//                   <div className="flex justify-between items-center w-full px-3 py-2 border rounded-md shadow-sm text-sm bg-gray-50">
//                     <span className="truncate max-w-[calc(100%-30px)] text-gray-600">
//                       {selectedFileName}
//                     </span>
//                     <button
//                       type="button"
//                       onClick={() => handleRemoveFile(onChange)}
//                       className="text-red-500 hover:text-red-700"
//                     >
//                       <X size={16} />
//                     </button>
//                   </div>
//                 ) : (
//                   <label className="w-full px-3 py-2 border rounded-md shadow-sm bg-white hover:bg-gray-50 cursor-pointer text-sm text-gray-700 text-center">
//                     {t("documentForm.upload_document")}
//                     <input
//                       type="file"
//                       onChange={(e) => handleFileChange(e, onChange)}
//                       onBlur={onBlur}
//                       name={name}
//                       ref={ref}
//                       accept=".pdf"
//                       className="sr-only"
//                     />
//                   </label>
//                 )}
//               </div>
//             )}
//           />
//           {errors.document && (
//             <p className="mt-1 text-xs text-red-500">{t(errors.document.message)}</p>
//           )}
//         </div>

//         {/* Submit button */}
//         <div className="flex justify-end pt-2">
//           <Button
//             htmlType="submit"
//             type="primary"
//             loading={isSubmitting}
//             icon={!isSubmitting && <PlusIcon className="mr-1 h-4 w-4" />}
//           >
//             {isSubmitting ? t("documentForm.submitting") : t("documentForm.submit")}
//           </Button>
//         </div>
//       </form>
//     </div>
//   )
// }

"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import {
  Loader2,
  PlusIcon,
  X,
  FileText,
  Upload,
  Calendar,
  Tag,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuthContext } from "@/context";
import { addDocumentPartage } from "@/services/partageService";
import { Button } from "antd";

const createSchema = (t) =>
  yup.object({
    intitule: yup.string().required(t("documentForm.errors.intituleRequired")),
    codeDemande: yup.string().required(t("documentForm.errors.codeRequired")),
    mention: yup.string().required(t("documentForm.errors.mentionRequired")),
    typeDocument: yup.string().required(t("documentForm.errors.typeRequired")),
    anneeObtention: yup
      .string()
      .required(t("documentForm.errors.yearRequired")),
    document: yup
      .mixed()
      .required(t("documentForm.errors.documentRequired"))
      .test(
        "fileSize",
        t("documentForm.errors.fileSize"),
        (value) => value && value[0]?.size < 10000000
      )
      .test(
        "fileType",
        t("documentForm.errors.fileType"),
        (value) => value && value[0]?.type === "application/pdf"
      ),
  });


export default function AjouterDocumentFormPartage({ onSuccess }) {
  const { institut } = useAuthContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedFileName, setSelectedFileName] = useState("");

  const schema = createSchema(t);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      intitule: "",
      codeDemande: "",
      mention: "",
      typeDocument: "",
      anneeObtention: "",
      document: null,
    },
  });


  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true)

      const formData = new FormData()
      formData.append("institutId", institut.id)
      formData.append("codeDemande", data.codeDemande)
      formData.append("intitule", data.intitule)
      formData.append("typeDocument", data.typeDocument)
      formData.append("anneeObtention", data.anneeObtention)
      formData.append("mention", data.mention)
      formData.append("document", data.document[0])

      console.log("institutId", institut.id)
      console.log("codeDemande", data.codeDemande)
      console.log("intitule", data.intitule)
      console.log("typeDocument", data.typeDocument)
      console.log("anneeObtention", data.anneeObtention)
      console.log("mention", data.mention)

      await addDocumentPartage(formData)
      toast.success(t("documentForm.success"))
      reset()
      setSelectedFileName("")
      onSuccess?.()
      navigate("/institut/partages/ajouter")
    } catch (error) {
      toast.error(t("documentForm.error"))
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRemoveFile = (onChange) => {
    setSelectedFileName("");
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
            style={{ backgroundColor: "#254c6b" }}
          >
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: "#254c6b" }}>
            {t("documentForm.title")}
          </h1>
          <p className="text-gray-600">
            Ajoutez un nouveau document de partage à votre institut
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Code Demande + Intitulé */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Code */}
                <div className="space-y-2">
                  <label
                    className="flex items-center text-sm font-semibold"
                    style={{ color: "#254c6b" }}
                  >
                    <Tag className="w-4 h-4 mr-2" />
                    {t("documentForm.document_code")}{" "}
                    <span style={{ color: "#e41021" }} className="ml-1">
                      *
                    </span>
                  </label>
                  <input
                    {...register("codeDemande")}
                    type="text"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 text-sm"
                    style={{
                      focusRingColor: "#3eb6e9",
                      ":focus": { borderColor: "#3eb6e9" },
                    }}
                    placeholder={t("documentForm.enter_document_code")}
                  />
                  {errors.codeDemande && (
                    <p className="text-xs" style={{ color: "#e41021" }}>
                      {t(errors.codeDemande.message)}
                    </p>
                  )}
                </div>

                {/* Intitulé */}
                <div className="space-y-2">
                  <label
                    className="flex items-center text-sm font-semibold"
                    style={{ color: "#254c6b" }}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    {t("documentForm.title_label")}{" "}
                    <span style={{ color: "#e41021" }} className="ml-1">
                      *
                    </span>
                  </label>
                  <Controller
                    name="intitule"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 text-sm"
                        style={{
                          focusRingColor: "#3eb6e9",
                          ":focus": { borderColor: "#3eb6e9" },
                        }}
                        placeholder="Entrez l'intitulé du document"
                      />
                    )}
                  />
                  {errors.intitule && (
                    <p className="text-xs" style={{ color: "#e41021" }}>
                      {t(errors.intitule.message)}
                    </p>
                  )}
                </div>
              </div>

              {/* Mention */}
              <div className="space-y-2">
                <label
                  className="flex items-center text-sm font-semibold"
                  style={{ color: "#254c6b" }}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  {t("documentForm.mention")}{" "}
                  <span style={{ color: "#e41021" }} className="ml-1">
                    *
                  </span>
                </label>
                <Controller
                  name="mention"
                  control={control}
                  render={({ field }) => (
                    <textarea
                      {...field}
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 text-sm resize-none"
                      style={{
                        focusRingColor: "#3eb6e9",
                        ":focus": { borderColor: "#3eb6e9" },
                      }}
                      placeholder="Décrivez la mention du document..."
                    />
                  )}
                />
                {errors.mention && (
                  <p className="text-xs" style={{ color: "#e41021" }}>
                    {t(errors.mention.message)}
                  </p>
                )}
              </div>

              {/* Type document + Année */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    className="flex items-center text-sm font-semibold"
                    style={{ color: "#254c6b" }}
                  >
                    <Tag className="w-4 h-4 mr-2" />
                    {t("documentForm.document_type")}{" "}
                    <span style={{ color: "#e41021" }} className="ml-1">
                      *
                    </span>
                  </label>
                  <Controller
                    name="typeDocument"
                    control={control}
                    render={({ field }) => (
                      <select
                        {...field}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 text-sm bg-white"
                        style={{
                          focusRingColor: "#3eb6e9",
                          ":focus": { borderColor: "#3eb6e9" },
                        }}
                      >
                        <option value="">
                          {t("documentForm.select_document_type")}
                        </option>
                        <option value="Relevé">
                          {t("documentForm.document_types.transcript")}
                        </option>
                        <option value="Attestation">
                          {t("documentForm.document_types.certificate")}
                        </option>
                        <option value="Diplôme">
                          {t("documentForm.document_types.diploma")}
                        </option>
                        <option value="Certificat">
                          {t("documentForm.document_types.certification")}
                        </option>
                      </select>
                    )}
                  />
                  {errors.typeDocument && (
                    <p className="text-xs" style={{ color: "#e41021" }}>
                      {t(errors.typeDocument.message)}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    className="flex items-center text-sm font-semibold"
                    style={{ color: "#254c6b" }}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    {t("documentForm.year_obtained")}{" "}
                    <span style={{ color: "#e41021" }} className="ml-1">
                      *
                    </span>
                  </label>
                  <Controller
                    name="anneeObtention"
                    control={control}
                    render={({ field }) => (
                      <select
                        {...field}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 text-sm bg-white"
                        style={{
                          focusRingColor: "#3eb6e9",
                          ":focus": { borderColor: "#3eb6e9" },
                        }}
                      >
                        <option value="">
                          {t("demandePartage.select_year")}
                        </option>
                        {Array.from({ length: 20 }, (_, i) => {
                          const year = new Date().getFullYear() - i;
                          return (
                            <option key={year} value={year.toString()}>
                              {year}
                            </option>
                          );
                        })}
                      </select>
                    )}
                  />
                  {errors.anneeObtention && (
                    <p className="text-xs" style={{ color: "#e41021" }}>
                      {t(errors.anneeObtention.message)}
                    </p>
                  )}
                </div>
              </div>

              {/* Document Upload */}
              <div className="space-y-2">
                <label
                  className="flex items-center text-sm font-semibold"
                  style={{ color: "#254c6b" }}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {t("documentForm.document")}{" "}
                  <span style={{ color: "#e41021" }} className="ml-1">
                    *
                  </span>
                </label>
                <Controller
                  name="document"
                  control={control}
                  render={({ field: { onChange, onBlur, name, ref } }) => (
                    <div className="mt-1">
                      {selectedFileName ? (
                        <div className="flex justify-between items-center w-full px-4 py-3 border-2 rounded-xl shadow-sm text-sm bg-green-50 border-green-200">
                          <div className="flex items-center">
                            <FileText className="w-5 h-5 mr-3 text-green-600" />
                            <span className="truncate max-w-[calc(100%-80px)] text-green-800 font-medium">
                              {selectedFileName}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveFile(onChange)}
                            className="p-1 rounded-full hover:bg-red-100 transition-colors duration-200"
                            style={{ color: "#e41021" }}
                          >
                            <X size={18} />
                          </button>
                        </div>
                      ) : (
                          <label className="w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50 cursor-pointer text-sm text-gray-600 text-center transition-all duration-200 flex flex-col items-center justify-center space-y-2">
                            <Upload className="w-8 h-8 text-gray-400" />
                            <span className="font-medium">
                              {t("documentForm.upload_document")}
                            </span>
                            <span className="text-xs text-gray-500">
                              PDF uniquement, max 10MB
                            </span>
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
                  <p className="text-xs" style={{ color: "#e41021" }}>
                    {t(errors.document.message)}
                  </p>
                )}
              </div>

              {/* Submit button */}
              <div className="flex justify-end pt-6 border-t border-gray-100">
                <Button
                  htmlType="submit"
                  type="primary"
                  loading={isSubmitting}
                  size="large"
                  className="px-8 py-3 h-auto rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"

                  icon={!isSubmitting ? <PlusIcon className="mr-2 h-5 w-5" />
                    : <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      {t("documentForm.submitting")}
                    </span>
                  ) : (
                    t("documentForm.submit")
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
