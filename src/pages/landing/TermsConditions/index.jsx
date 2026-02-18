

import { useTranslation } from 'react-i18next';
import { PageMetaData, TopNavBar } from "@/components";
import { useEffect, useState } from 'react';

const TermsConditionsPage = () => {
    const { t } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <PageMetaData title={t('termsConditions.pageTitle')} />

            <TopNavBar
                menuItems={[
                    t('nav.home'),
                    t('nav.about'),
                    t('nav.solutions'),
                    t('nav.features'),
                    t('nav.pricing'),
                    t('nav.contact'),
                    t('nav.faq'),
                ]}
                position="fixed"
                hasDownloadButton
            />

            <div className="container mx-auto px-6 py-20 md:py-28 lg:px-16">
                <section>
                    <h1 className="text-4xl md:text-5xl font-bold text-center text-[#24377A] mb-4 animate-fade-in-up">
                        {t('termsConditions.title')}
                    </h1>
                    <div className="w-16 h-1 bg-[#24377A] mx-auto my-6 rounded"></div>

                    <p className="text-lg text-gray-800 leading-relaxed mb-10 text-justify">
                        {t('termsConditions.introduction')}
                    </p>

                    {[1, 2, 3, 4, 5, 6, 7, 8].map((section) => (
                        <div key={section}>
                            <h2 className="text-2xl font-semibold text-[#24377A] mt-10 mb-4">
                                {t(`termsConditions.section${section}.title`)}
                            </h2>
                            {t(`termsConditions.section${section}.content`, { returnObjects: true }).map((paragraph, index) => (
                                <p key={index} className="text-lg text-gray-700 leading-relaxed mb-6 text-justify">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    ))}

                    <p className="text-lg text-gray-700 mt-10 leading-relaxed text-justify">
                        {t('termsConditions.contact')}
                    </p>
                </section>
            </div>

            <style jsx>{`
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
            `}</style>
        </>
    );
};

export default TermsConditionsPage;

