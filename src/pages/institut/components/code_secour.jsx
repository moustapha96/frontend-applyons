import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDemandesByInstitut } from "../../../services/demandeService";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { useAuthContext } from "../../../context/useAuthContext";
import { toast } from "sonner";
import { confirmerDemande } from "../../../services/documentService";
import InstitutBreadcrumb from "../../../components/InstitutBreadcrumb";
import { useTranslation } from "react-i18next";

const schema = yup.object({
    // nomComplet: yup.string().required("Le nom complet est requis"),
    demande: yup.string().required("La demande est requise"),
    mention: yup.string().required("La mention est requise"),
    // dateNaissance: yup.date().required("La date de naissance est requise"),
    typeDocument: yup.string().required("Le type de document est requis"),
    anneObtention: yup.number().required("L'année d'obtention est requise").min(1900).max(new Date().getFullYear()),
    // date_obtention: yup.date().required("La date d'obtention est requise"),
    document: yup.mixed().required("Le document est requis")
        .test("fileSize", "Le fichier doit être inférieur à 10MB", (value) => value && value[0]?.size < 10000000)
        .test("fileType", "Seuls les fichiers PDF sont acceptés", (value) => value && value[0]?.type === "application/pdf"),
    resultat_demande: yup.string().oneOf(['Accepted', 'Declined', 'Pending'], "Le résultat doit être Accepté ou Rejeté").required("Le résultat de la demande est requis"),
}).required();


export default function InstitutAuthentifierDemande() {
    const { id } = useParams();
    const { t } = useTranslation();

    const { institut } = useAuthContext();
    const [demandes, setDemandes] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            nomComplet: '',
            demande: '',
            mention: '',
            dateNaissance: '',
            typeDocument: '',
            anneObtention: new Date().getFullYear(),
            document: null,
            resultat_demande: '',
        }
    });

    useEffect(() => {
        const fetchDemande = async () => {
            setLoading(true);
            try {
                const data = await getDemandesByInstitut(institut.id);
                // //console.log(data)
                const filtered = data.filter((demande) => demande.resultat == "Pending" && demande.id == id);
                // //console.log("filtered")
                // //console.log(filtered)
                setDemandes(filtered);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchDemande();
    }, [institut.id, id]);

    const onSubmit = async (data) => {
        // //console.log(data);

        try {
            const formData = new FormData();
            // Ajout des champs de texte
            //console.log(institut.id)
            formData.append('institut_id', institut.id);
            formData.append('demande_id', data.demande);
            formData.append('type_document', data.typeDocument);
            formData.append('annee_obtention', data.anneObtention);
            formData.append('resultat_demande', data.resultat_demande);

            formData.append('mention', data.mention);

            formData.append('document', data.document[0]);
            // //console.log(formData)

            const result = await confirmerDemande(formData);
            toast.success("Demande enregistrée avec succès", {
                position: "top-right",
                duration: 2000,
            });
            navigate('/institut/demandes');
        } catch (error) {
            // //console.log(error)
            toast.error(error.response.data.error || "Une erreur est survenue lors de la création de la demande", {
                position: "top-right",
                duration: 2000,
            });
        }
    };

    // if (loading) return <div className="flex justify-center items-center h-screen">Chargement des détails du document...</div>;
    if (error) return <div className="flex justify-center items-center h-screen text-red-600">Erreur: {error}</div>;

    return (

        <div className="bg-gray-100 min-h-screen">
            <InstitutBreadcrumb title={t('authentifier_un_document')} SubTitle={institut?.name} />

            <section>
                <div className="container">
                    <div className="my-6 space-y-6">
                        <div className="max-w-3xl mx-auto px-4 py-8 bg-white shadow-md rounded-md">
                            <h4 className="text-2xl font-semibold text-gray-800 uppercase mb-6">Nouvelle Authentification</h4>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div>
                                    <label htmlFor="demande" className="block text-sm font-medium text-gray-700">Sélectionner le demandeur</label>
                                    {loading && <p className="mt-2 text-sm text-gray-500">Chargement des types de demande...</p>}
                                    {!loading && demandes.length === 0 && <p className="mt-2 text-sm text-gray-500">Aucun demandeur disponible.</p>}
                                    {!loading && demandes && <>

                                        <Controller
                                            name="demande"
                                            control={control}
                                            render={({ field }) => (
                                                <select
                                                    {...field}
                                                    id="demande"
                                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm transition"
                                                >
                                                    {id && demandes[0] ? <>
                                                        <option value={demandes[0].id} > {demandes[0].intitule} - {demandes[0].demandeur.name} </option>

                                                    </> : <>
                                                        <option value="">Sélectionnez le demandeur</option>
                                                        {demandes.map((demande, index) => (
                                                            <option key={index} value={demande.id}>
                                                                {demande.intitule} - {demande.demandeur.name}
                                                            </option>
                                                        ))}
                                                    </>}

                                                </select>
                                            )}
                                        />
                                        {errors.demande && <p className="mt-2 text-sm text-red-500">{errors.demande.message}</p>}
                                    </>}
                                </div>





                                <div>
                                    <label htmlFor="mention" className="block text-sm font-medium text-gray-700">Mention</label>
                                    <Controller
                                        name="mention"
                                        control={control}
                                        render={({ field }) => (
                                            <select
                                                {...field}
                                                id="mention"
                                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm transition"
                                            >
                                                <option value="">Sélectionnez la mention </option>
                                                <option value="Passable">Passable</option>
                                                <option value="Assez Bien">Assez Bien</option>
                                                <option value="Bien">Bien</option>
                                                <option value="Tres Bien">Tres Bien</option>
                                                <option value="Excellent">Excellent</option>
                                            </select>
                                        )}
                                    />
                                    {errors.mention && <p className="mt-2 text-sm text-red-500">{errors.mention.message}</p>}
                                </div>


                                <div>
                                    <label htmlFor="typeDocument" className="block text-sm font-medium text-gray-700">Type de Document</label>
                                    <Controller
                                        name="typeDocument"
                                        control={control}
                                        render={({ field }) => (
                                            <select
                                                {...field}
                                                id="typeDocument"
                                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm transition"
                                            >
                                                <option value="">Sélectionnez le type </option>
                                                <option value="Relevé">Relevé</option>
                                                <option value="Attestation">Attestation</option>
                                                <option value="Diplome">Diplome</option>
                                            </select>
                                        )}
                                    />
                                    {errors.typeDocument && <p className="mt-2 text-sm text-red-500">{errors.typeDocument.message}</p>}
                                </div>



                                <div>
                                    <label htmlFor="anneObtention" className="block text-sm font-medium text-gray-700">Année d'Obtention</label>
                                    <Controller
                                        name="anneObtention"
                                        control={control}
                                        render={({ field }) => (
                                            <select
                                                {...field}
                                                id="anneObtention"
                                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm transition"
                                            >
                                                {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                                                    <option key={year} value={year.toString()}>
                                                        {year}
                                                    </option>
                                                ))}
                                            </select>
                                        )}
                                    />
                                    {errors.anneObtention && <p className="mt-2 text-sm text-red-500">{errors.anneObtention.message}</p>}
                                </div>

                                <div>
                                    <label htmlFor="resultat_demande" className="block text-sm font-medium text-gray-700">Résultat de la Demande</label>
                                    <Controller
                                        name="resultat_demande"
                                        control={control}
                                        render={({ field }) => (
                                            <select
                                                {...field}
                                                id="resultat_demande"
                                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm transition"
                                            >
                                                <option value="">Sélectionnez le résultat</option>
                                                <option value="Accepted">Accepté</option>
                                                <option value="Declined">Rejeté</option>
                                                <option value="Pending">Pending</option>
                                            </select>
                                        )}
                                    />
                                    {errors.resultat_demande && <p className="mt-2 text-sm text-red-500">{errors.resultat_demande.message}</p>}
                                </div>

                                <div>
                                    <label htmlFor="document" className="block text-sm font-medium text-gray-700">Document PDF</label>
                                    <Controller
                                        name="document"
                                        control={control}
                                        render={({ field: { onChange, onBlur, name, ref } }) => (
                                            <input
                                                type="file"
                                                onChange={(e) => onChange(e.target.files)}
                                                onBlur={onBlur}
                                                name={name}
                                                ref={ref}
                                                accept=".pdf"
                                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm transition"
                                            />
                                        )}
                                    />
                                    {errors.document && <p className="mt-2 text-sm text-red-500">{errors.document.message}</p>}
                                </div>

                                <div className="flex justify-end space-x-4">
                                    <button
                                        type="button"
                                        onClick={() => navigate('/institut/demandes')}
                                        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        type="submit"
                                        className={`px-4 py-2 bg-blueLogo text-white rounded-md hover:bg-rougeLogo focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "Envoi en cours..." : "Envoyer la demande"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    );
}