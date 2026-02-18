"use client"

import { useTranslation } from 'react-i18next';
import { PageMetaData, TopNavBar } from "@/components";
import { useEffect } from 'react';

const SimplifyProcessPage = () => {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    return (
        <>
            <PageMetaData title={t('simplifyProcess.pageTitle')} />

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
                        {t('simplifyProcess.title')}
                    </h1>
                    <div className="w-16 h-1 bg-[#24377A] mx-auto my-6 rounded"></div>


                    <p className="text-lg text-gray-800 leading-relaxed mb-10 text-justify">
                        {t('simplifyProcess.introduction')}
                    </p>

                    <h2 className="text-2xl font-semibold text-[#24377A] mt-10 mb-4">
                        {t('simplifyProcess.benefitsTitle')}
                    </h2>

                    {[1, 2, 3, 4, 5, 6, 7].map((benefit) => (
                        <div key={benefit} className="mb-6">
                            <h3 className="text-xl font-semibold text-[#24377A] mb-2">
                                {t(`simplifyProcess.benefit${benefit}.title`)}
                            </h3>
                            <p className="text-lg text-gray-700 leading-relaxed text-justify">
                                {t(`simplifyProcess.benefit${benefit}.content`)}
                            </p>
                        </div>
                    ))}

                    <p className="text-lg text-gray-700 mt-10 leading-relaxed text-justify font-semibold">
                        {t('simplifyProcess.conclusion')}
                    </p>

                    {/* <div className="mt-10">
                        <h2 className="text-2xl font-semibold text-[#24377A] mb-4">
                            {t('simplifyProcess.videoDemo')}
                        </h2>
                        <div className="aspect-w-1/2 h-96">
                            <iframe
                                src={`${video_demi_2}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full"
                            ></iframe>
                        </div>
                    </div> */}
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

export default SimplifyProcessPage;

