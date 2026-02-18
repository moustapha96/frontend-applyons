

// import React from 'react';
// import { Controller } from 'react-hook-form';
// import { useTranslation } from "react-i18next";

// const VerificationForm = ({ control, errors, onSubmit, reset, activeSubscription }) => {
//     const { t } = useTranslation();

//     return (
//         <form onSubmit={onSubmit} className="space-y-6">
//             <div>
//                 <label htmlFor="nomComplet" className="block text-sm font-medium text-gray-700">{t("institutVerification.full_name")}</label>
//                 <Controller
//                     name="nomComplet"
//                     control={control}
//                     render={({ field }) => (
//                         <input
//                             {...field}
//                             type="text"
//                             id="nomComplet"
//                             className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                         />
//                     )}
//                 />
//                 {errors.nomComplet && <p className="mt-2 text-sm text-red-500">{errors.nomComplet.message}</p>}
//             </div>

//             <div>
//                 <label htmlFor="codeAdn" className="block text-sm font-medium text-gray-700">{t("institutVerification.adn_code")}</label>
//                 <Controller
//                     name="codeAdn"
//                     control={control}
//                     render={({ field }) => (
//                         <input
//                             {...field}
//                             type="text"
//                             id="codeAdn"
//                             className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                         />
//                     )}
//                 />
//                 {errors.codeAdn && <p className="mt-2 text-sm text-red-500">{errors.codeAdn.message}</p>}
//             </div>
//             {!activeSubscription && (
//                 <div className="w-full flex gap-6">
//                     <div className="flex-1">
//                         <label htmlFor="dateDebut" className="block text-sm font-medium text-gray-700">
//                             {t("institutVerification.start_date")}
//                         </label>
//                         <Controller
//                             name="dateDebut"
//                             control={control}
//                             render={({ field }) => (
//                                 <input
//                                     {...field}
//                                     type="date"
//                                     id="dateDebut"
//                                     className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
//                                 />
//                             )}
//                         />
//                         {errors.dateDebut && <p className="mt-2 text-sm text-red-500">{errors.dateDebut.message}</p>}
//                     </div>
//                     <div className="flex-1">
//                         <label htmlFor="dateFin" className="block text-sm font-medium text-gray-700">
//                             {t("institutVerification.end_date")}
//                         </label>
//                         <Controller
//                             name="dateFin"
//                             control={control}
//                             render={({ field }) => (
//                                 <input
//                                     {...field}
//                                     type="date"
//                                     id="dateFin"
//                                     className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
//                                 />
//                             )}
//                         />
//                         {errors.dateFin && <p className="mt-2 text-sm text-red-500">{errors.dateFin.message}</p>}
//                     </div>
//                 </div>
//             )}
//             <div className="flex justify-end space-x-4">
//                 <button
//                     type="button"
//                     onClick={() => reset()}
//                     className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                 >
//                     {t("institutVerification.cancel")}
//                 </button>
//                 <button
//                     type="submit"
//                     className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blueLogo focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                 >
//                     {activeSubscription ? t("institutVerification.validate") : t("institutVerification.pay_and_verify")}
//                 </button>
//             </div>
//         </form>
//     );
// };

// export default VerificationForm;

import React from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from "react-i18next";

const VerificationForm = ({ control, errors, onSubmit, reset, activeSubscription, loading }) => {
    const { t } = useTranslation();

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div>
                <label htmlFor="nomComplet" className="block text-sm font-medium text-gray-700">{t("institutVerification.full_name")}</label>
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
                {errors.nomComplet && <p className="mt-2 text-sm text-red-500">{errors.nomComplet.message}</p>}
            </div>

            <div>
                <label htmlFor="codeAdn" className="block text-sm font-medium text-gray-700">{t("institutVerification.adn_code")}</label>
                <Controller
                    name="codeAdn"
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            type="text"
                            id="codeAdn"
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    )}
                />
                {errors.codeAdn && <p className="mt-2 text-sm text-red-500">{errors.codeAdn.message}</p>}
            </div>
            {!activeSubscription && (
                <div className="w-full flex gap-6">
                    <div className="flex-1">
                        <label htmlFor="dateDebut" className="block text-sm font-medium text-gray-700">
                            {t("institutVerification.start_date")}
                        </label>
                        <Controller
                            name="dateDebut"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="date"
                                    id="dateDebut"
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                />
                            )}
                        />
                        {errors.dateDebut && <p className="mt-2 text-sm text-red-500">{errors.dateDebut.message}</p>}
                    </div>
                    <div className="flex-1">
                        <label htmlFor="dateFin" className="block text-sm font-medium text-gray-700">
                            {t("institutVerification.end_date")}
                        </label>
                        <Controller
                            name="dateFin"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="date"
                                    id="dateFin"
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                />
                            )}
                        />
                        {errors.dateFin && <p className="mt-2 text-sm text-red-500">{errors.dateFin.message}</p>}
                    </div>
                </div>
            )}
            <div className="flex justify-end space-x-4">
                <button
                    type="button"
                    onClick={() => reset()}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {t("institutVerification.cancel")}
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blueLogo focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {loading ? t("loading") : activeSubscription ? t("institutVerification.validate") : t("institutVerification.pay_and_verify")}
                </button>
            </div>
        </form>
    );
};

export default VerificationForm;

