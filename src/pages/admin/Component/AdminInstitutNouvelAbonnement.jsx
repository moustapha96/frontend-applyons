// // AdminInstitutNouvelAbonnement



// import { Link, useNavigate, useParams } from "react-router-dom";
// import { useState, useEffect, useContext } from "react";

// import AdminBreadcrumb from "../../../components/AdminBreadcrumb";

// import { useAuthContext } from "@/context";
// import { useForm, Controller } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import { toast } from "sonner";

// import { loadStripe } from "@stripe/stripe-js";
// import { LuListMinus } from "react-icons/lu";
// import { createAbonnementByAdmin } from "../../../services/abonnementService";
// import { getInstitut } from "../../../services/institutService";
// import { Loader2 } from "lucide-react";
// import { useTranslation } from "react-i18next";
// import { AppContext } from "@/AppContext";


// const schema = yup.object({
//     nomComplet: yup.string().required("the full name is required"),
//     dateDebut: yup.date().required("the date of start is required"),
//     dateFin: yup.date().required("the date of end is required"),
//     price: yup.number().required("Price is required"),
// });


// const AdminInstitutNouvelAbonnement = () => {
//     const { id } = useParams();
//     const { prixInstitut, prixUnivercity } = useContext(AppContext)

//     const { t } = useTranslation();
//     const navigate = useNavigate();
//     const [institut, setInstitut] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [isFormValid, setIsFormValid] = useState(false);
//     const [paymentAmount, setPaymentAmount] = useState(institut?.type == "Université" ? prixUnivercity : prixInstitut);

//     useEffect(() => {
//         const fetchInstitut = async () => {
//             try {
//                 const data = await getInstitut(id);
//                 if (data) {
//                     setInstitut(data);
//                     // //console.log("Institut chargé:", data);
//                 } else {
//                     setError("Institut non trouvé");
//                     toast.error("Institut non trouvé");
//                 }
//             } catch (err) {
//                 console.error("Erreur lors du chargement de l'institut:", err);
//                 setError(err.message || "Erreur lors du chargement de l'institut");
//                 toast.error("Erreur lors du chargement de l'institut");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (id) {
//             fetchInstitut();
//         }
//     }, [id]);


//     const { control, handleSubmit, reset, formState: { errors, isSubmitting }, watch, getValues } = useForm({
//         resolver: yupResolver(schema),
//         defaultValues: {
//             nomComplet: institut?.name || '',
//             dateDebut: new Date().toISOString().split("T")[0],
//             dateFin: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0],
//             price: institut?.type == "Université" ? prixUnivercity : prixInstitut
//         }
//     });

//     useEffect(() => {
//         if (institut) {
//             reset({
//                 nomComplet: institut.name,
//                 dateDebut: new Date().toISOString().split("T")[0],
//                 dateFin: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0],
//                 price: institut.type == "Université" ? prixUnivercity : prixInstitut
//             });
//         }
//     }, [institut, reset]);


//     const onSubmit = async (data) => {
//         setIsFormValid(true)
//         setLoading(true);
//         //console.log(data)
//         try {
//             const submitData = {
//                 dateDebut: getValues('dateDebut'),
//                 dateFin: getValues('dateFin'),
//                 institut_id: institut?.id,
//                 montant: paymentAmount,
//                 paymentMethod: "ApplyOns",
//                 statut: 'actif',
//                 typePaiement: 'ApplyOns',
//                 paymentInfo: "payment-with-applyons-for" + institut?.name,
//                 clientSecret: "applyons-" + institut?.id,
//                 currency: 'USD',
//                 price: getValues('price')
//             }
//             //console.log("submitData", submitData)
//             try {
//                 const resultatPaiement = await createAbonnementByAdmin(submitData);
//                 toast.success("Abonnement effectif");
//                 navigate(`/admin/institut/${id}/abonnements`);
//             } catch (error) {
//                 console.error("Error creating abonnement:", error);
//                 toast.error("Une erreur est survenue lors de la confirmation du paiement.");
//             }
//             setLoading(false);
//         } catch (error) {
//             console.error("Error creating abonnement:", error);
//             toast.error("Une erreur est survenue lors de la confirmation du paiement.");
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="bg-gray-100 min-h-screen">
//             <AdminBreadcrumb title={t('admin.institutAbonnement.subscriptions')} SubTitle={institut?.name} />

//             <section>
//                 <div className="container">
//                     <div className="my-6 space-y-6">
//                         <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//                             <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
//                                 <h4 className="text-xl font-semibold text-gray-800 uppercase">{t('admin.institutAbonnement.newSubscription')}</h4>
//                                 <Link
//                                     to={`/admin/institut/${id}/abonnements`}
//                                     className="inline-flex items-center gap-x-1.5 rounded-full bg-blueLogo px-3 py-1.5 text-xs font-medium
//                                      text-white transition-all duration-300 hover:bg-rougeLogo hover:text-white"
//                                 >
//                                     <LuListMinus className="ms-1.5 size-4" /> {t('admin.institutAbonnement.list')}
//                                 </Link>
//                             </div>

//                             <div className="max-w-3xl mx-auto px-4 py-8 bg-white shadow-md rounded-md">

//                                 {!institut && <>
//                                     <div className="flex justify-center items-center h-64">
//                                         <Loader2 className="animate-spin" />
//                                     </div>
//                                 </>}
//                                 {institut && <>
//                                     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">


//                                         <div>
//                                             <label htmlFor="NomComplet" className="block text-sm font-medium text-gray-700">{t('admin.fullName')}</label>
//                                             <Controller
//                                                 name="nomComplet"
//                                                 control={control}
//                                                 render={({ field }) => (
//                                                     <input
//                                                         {...field}
//                                                         type="text"
//                                                         id="nomComplet"
//                                                         className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                                                     />
//                                                 )}
//                                             />
//                                             {errors.nomComplet && <p className="mt-2 text-sm text-red-500">{errors.nomComplet.message}</p>}
//                                         </div>

//                                         <div className="" >
//                                             <label htmlFor="price" className="block text-sm font-medium text-gray-700">{t('admin.price')}</label>
//                                             <Controller

//                                                 name="price"
//                                                 control={control}
//                                                 render={({ field }) => (
//                                                     <input
//                                                         {...field}
//                                                         type="number"
//                                                         id="price"
//                                                         className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                                                     />
//                                                 )}
//                                             />
//                                             {errors.nomComplet && <p className="mt-2 text-sm text-red-500">{errors.nomComplet.message}</p>}
//                                         </div>


//                                         <div className="w-full flex gap-6">
//                                             <div className="flex-1">
//                                                 <label htmlFor="dateDebut" className="block text-sm font-medium text-gray-700">
//                                                     {t('institutAbonnement.startDate')}
//                                                 </label>
//                                                 <Controller
//                                                     name="dateDebut"
//                                                     control={control}
//                                                     render={({ field }) => (
//                                                         <input
//                                                             {...field}
//                                                             type="date"
//                                                             id="dateDebut"
//                                                             className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
//                                                         />
//                                                     )}
//                                                 />
//                                                 {errors.dateDebut && <p className="mt-2 text-sm text-red-500">{errors.dateDebut.message}</p>}
//                                             </div>
//                                             <div className="flex-1">
//                                                 <label htmlFor="dateFin" className="block text-sm font-medium text-gray-700">
//                                                     {t('institutAbonnement.endDate')}
//                                                 </label>
//                                                 <Controller
//                                                     name="dateFin"
//                                                     control={control}
//                                                     render={({ field }) => (
//                                                         <input
//                                                             {...field}
//                                                             type="date"
//                                                             id="dateFin"
//                                                             className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
//                                                         />
//                                                     )}
//                                                 />
//                                                 {errors.dateFin && <p className="mt-2 text-sm text-red-500">{errors.dateFin.message}</p>}
//                                             </div>
//                                         </div>


//                                         <div className="flex justify-end space-x-4">
//                                             <button
//                                                 type="button"
//                                                 onClick={() => navigate(`/admin/institut/${id}/abonnements`)}
//                                                 className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                                             >
//                                                 {t('admin.cancel')}

//                                             </button>
//                                             <button
//                                                 type="submit"
//                                                 disabled={isSubmitting}
//                                                 className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blueLogo hover:bg-rouge focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                                             >
//                                                 {loading ? <> <Loader2 className="animate-spin"></Loader2>  </> : t('admin.save')}
//                                             </button>
//                                         </div>
//                                     </form>
//                                 </>}
//                             </div>
//                         </div>

//                     </div>
//                 </div>
//             </section>
//         </div>
//     );
// }

// export default AdminInstitutNouvelAbonnement;

import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import AdminBreadcrumb from "../../../components/AdminBreadcrumb";
import { useAuthContext } from "@/context";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from "sonner";
import { loadStripe } from "@stripe/stripe-js";
import { LuListMinus } from "react-icons/lu";
import { createAbonnementByAdmin } from "../../../services/abonnementService";
import { getInstitut } from "../../../services/institutService";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AppContext } from "@/AppContext";

const schema = yup.object({
    nomComplet: yup.string().required("the full name is required"),
    dateDebut: yup.date().required("the date of start is required"),
    dateFin: yup.date().required("the date of end is required"),
    price: yup.number().required("Price is required"),
});

const AdminInstitutNouvelAbonnement = () => {
    const { id } = useParams();
    const { prixInstitut, prixUnivercity } = useContext(AppContext);

    const { t } = useTranslation();
    const navigate = useNavigate();
    const [institut, setInstitut] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFormValid, setIsFormValid] = useState(false);
    const [paymentAmount, setPaymentAmount] = useState(institut?.type == "Université" ? prixUnivercity : prixInstitut);

    useEffect(() => {
        const fetchInstitut = async () => {
            try {
                const data = await getInstitut(id);
                if (data) {
                    setInstitut(data);
                } else {
                    setError("Institut non trouvé");
                    toast.error("Institut non trouvé");
                }
            } catch (err) {
                console.error("Erreur lors du chargement de l'institut:", err);
                setError(err.message || "Erreur lors du chargement de l'institut");
                toast.error("Erreur lors du chargement de l'institut");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchInstitut();
        }
    }, [id]);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
        watch,
        getValues
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            nomComplet: institut?.name || '',
            dateDebut: new Date().toISOString().split("T")[0],
            dateFin: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0],
            price: institut?.type == "Université" ? prixUnivercity : prixInstitut
        }
    });

    useEffect(() => {
        if (institut) {
            reset({
                nomComplet: institut.name,
                dateDebut: new Date().toISOString().split("T")[0],
                dateFin: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0],
                price: institut.type == "Université" ? prixUnivercity : prixInstitut
            });
        }
    }, [institut, reset]);

    const onSubmit = async (data) => {
        setIsFormValid(true);
        setLoading(true);
        try {
            const submitData = {
                dateDebut: getValues('dateDebut'),
                dateFin: getValues('dateFin'),
                institut_id: institut?.id,
                montant: paymentAmount,
                paymentMethod: "ApplyOns",
                statut: 'actif',
                typePaiement: 'ApplyOns',
                paymentInfo: "payment-with-applyons-for" + institut?.name,
                clientSecret: "applyons-" + institut?.id,
                currency: 'USD',
                price: getValues('price')
            };

            try {
                const resultatPaiement = await createAbonnementByAdmin(submitData);
                toast.success("Abonnement effectif");
                navigate(`/admin/institut/${id}/abonnements`);
            } catch (error) {
                console.error("Error creating abonnement:", error);
                toast.error("Une erreur est survenue lors de la confirmation du paiement.");
            }
            setLoading(false);
        } catch (error) {
            console.error("Error creating abonnement:", error);
            toast.error("Une erreur est survenue lors de la confirmation du paiement.");
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <AdminBreadcrumb title={t('admin.institutAbonnement.subscriptions')} SubTitle={institut?.name} />

            <section className="px-4">
                <div className="container mx-auto">
                    <div className="my-6 space-y-6">
                        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <div className="flex flex-col md:flex-row items-center justify-between border-b border-gray-200 px-6 py-4 gap-4">
                                <h4 className="text-lg md:text-xl font-semibold text-gray-800 uppercase text-center md:text-left">
                                    {t('admin.institutAbonnement.newSubscription')}
                                </h4>
                                <Link
                                    to={`/admin/institut/${id}/abonnements`}
                                    className="inline-flex items-center gap-x-1.5 rounded-full bg-blueLogo px-3 py-1.5 text-xs font-medium text-white transition-all duration-300 hover:bg-rougeLogo"
                                >
                                    <LuListMinus className="size-4" />
                                    {t('admin.institutAbonnement.list')}
                                </Link>
                            </div>

                            <div className="max-w-screen-lg mx-auto px-4 py-8 bg-white">
                                {!institut ? (
                                    <div className="flex justify-center items-center h-64">
                                        <Loader2 className="animate-spin" />
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                        {/* Nom complet */}
                                        <div>
                                            <label htmlFor="nomComplet" className="block text-sm md:text-base font-medium text-gray-700">
                                                {t('admin.fullName')}
                                            </label>
                                            <Controller
                                                name="nomComplet"
                                                control={control}
                                                render={({ field }) => (
                                                    <input
                                                        {...field}
                                                        type="text"
                                                        id="nomComplet"
                                                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    />
                                                )}
                                            />
                                            {errors.nomComplet && (
                                                <p className="mt-2 text-sm text-red-500">{errors.nomComplet.message}</p>
                                            )}
                                        </div>

                                        {/* Prix */}
                                        <div>
                                            <label htmlFor="price" className="block text-sm md:text-base font-medium text-gray-700">
                                                {t('admin.price')}
                                            </label>
                                            <Controller
                                                name="price"
                                                control={control}
                                                render={({ field }) => (
                                                    <input
                                                        {...field}
                                                        type="number"
                                                        id="price"
                                                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    />
                                                )}
                                            />
                                            {errors.price && (
                                                <p className="mt-2 text-sm text-red-500">{errors.price.message}</p>
                                            )}
                                        </div>

                                        {/* Dates */}
                                        <div className="w-full flex flex-col md:flex-row gap-6">
                                            <div className="flex-1">
                                                <label htmlFor="dateDebut" className="block text-sm md:text-base font-medium text-gray-700">
                                                    {t('institutAbonnement.startDate')}
                                                </label>
                                                <Controller
                                                    name="dateDebut"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <input
                                                            {...field}
                                                            type="date"
                                                            id="dateDebut"
                                                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                        />
                                                    )}
                                                />
                                                {errors.dateDebut && (
                                                    <p className="mt-2 text-sm text-red-500">{errors.dateDebut.message}</p>
                                                )}
                                            </div>

                                            <div className="flex-1">
                                                <label htmlFor="dateFin" className="block text-sm md:text-base font-medium text-gray-700">
                                                    {t('institutAbonnement.endDate')}
                                                </label>
                                                <Controller
                                                    name="dateFin"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <input
                                                            {...field}
                                                            type="date"
                                                            id="dateFin"
                                                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                        />
                                                    )}
                                                />
                                                {errors.dateFin && (
                                                    <p className="mt-2 text-sm text-red-500">{errors.dateFin.message}</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Boutons */}
                                        <div className="flex flex-col sm:flex-row justify-end sm:space-x-4 space-y-2 sm:space-y-0">
                                            <button
                                                type="button"
                                                onClick={() => navigate(`/admin/institut/${id}/abonnements`)}
                                                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                            >
                                                {t('admin.cancel')}
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blueLogo hover:bg-rouge focus:outline-none"
                                            >
                                                {loading ? <Loader2 className="animate-spin" /> : t('admin.save')}
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AdminInstitutNouvelAbonnement;
