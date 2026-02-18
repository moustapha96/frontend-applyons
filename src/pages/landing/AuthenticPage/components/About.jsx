import React from "react";
import { FaCheckCircle } from "react-icons/fa"; // Icône pour les valeurs
import aboutImage from "@/assets/images/landing/hosting/about-us1.jpg"; // Image illustrative (ajoute ton propre chemin d'image)
import { useTranslation } from "react-i18next";

const AboutUs = () => {
    const { t } = useTranslation();
    return (
        <section
            id="about"
            className="py-20 bg-default-100 dark:bg-default-50">
            <div className="container mx-auto">
                {/* Section titre avec un style plus grand et centré */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#24377A] animate-fade-in-up">
                        {t("aboutUs.title")}
                    </h2>
                    <div className="w-16 h-1 bg-[#24377A] mx-auto my-4 rounded animate-underline"></div>


                    <p className="text-base text-default-600 mt-4 leading-relaxed text-justify">
                        {t('about.subtitle')}
                    </p>
                </div>

                {/* Grid avec texte et image */}
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Texte à gauche */}
                    <div>
                        <div className="mb-10">
                            <h3 className="text-2xl font-semibold text-default-950 mb-4">
                                {t("about.mission.title")}
                            </h3>
                            <p className="text-base text-default-600 leading-relaxed text-justify">
                                {t("about.mission.description")}
                            </p>
                        </div>

                        <div className="mb-10">
                            <h3 className="text-2xl font-semibold text-default-950 mb-4">
                                {t("about.vision.title")}
                            </h3>
                            <p className="text-base text-default-600 leading-relaxed text-justify">
                                {t("about.vision.description")}
                            </p>
                        </div>
                    </div>

                    {/* Image à droite */}
                    <div className="flex justify-center">
                        <img src={aboutImage} alt="Illustration about us" className="rounded-lg shadow-lg" />
                    </div>
                </div>

                {/* Section Valeurs sous forme de cartes */}
                <div className="grid lg:grid-cols-3 gap-8 mt-16">
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <FaCheckCircle className="text-[#24377A] text-3xl mb-4 mx-auto" />
                        <h4 className="text-xl font-semibold text-default-950 mb-2">{t("about.values.trust.title")}</h4>
                        <p className="text-base text-default-600 text-left">
                            {t("about.values.trust.description")}
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <FaCheckCircle className="text-[#24377A] text-3xl mb-4 mx-auto" />
                        <h4 className="text-xl font-semibold text-default-950 mb-2">{t("about.values.innovation.title")}</h4>
                        <p className="text-base text-default-600 text-left">
                            {t("about.values.innovation.description")}
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <FaCheckCircle className="text-[#24377A] text-3xl mb-4 mx-auto" />
                        <h4 className="text-xl font-semibold text-default-950 mb-2">{t("about.values.accessibility.title")}</h4>
                        <p className="text-base text-default-600 text-left">
                            {t("about.values.accessibility.description")}
                        </p>
                    </div>
                </div>
            </div>

            {/* Animation CSS */}
            <style >{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fade-in-up {
                    animation: fadeInUp 0.7s ease-in-out;
                }

                .animate-underline {
                    animation: fadeInUp 1s ease-in-out 0.5s;
                    animation-fill-mode: both;
                }
            `}</style>
        </section>
    );
};

export default AboutUs;
