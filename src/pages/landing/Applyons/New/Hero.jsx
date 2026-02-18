import React from 'react';
import { Button, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

const { Title, Paragraph } = Typography;

const REGISTRATION_DEMANDEUR_URL = 'https://admin.applyons.com/registration?type=demandeur';

const Hero = () => {
    const { t } = useTranslation();
    return (
        <section
            className="relative py-10 sm:py-16 md:py-20 lg:py-24 w-full overflow-hidden bg-gradient-to-b from-[#afd4ed] to-white"
            aria-label="Hero"
        >
            <div className="relative w-full">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center justify-center min-h-[280px] sm:min-h-[320px] py-12 sm:py-16 md:py-20 lg:py-24">
                        <div className="w-full max-w-3xl text-center md:text-left md:max-w-2xl lg:max-w-3xl">
                            <Title
                                level={1}
                                className="!text-2xl sm:!text-4xl md:!text-5xl !font-bold !text-[#0d2b45] !mb-4 sm:!mb-6 !leading-tight"
                            >
                                {t('applyons.hero.title')}
                            </Title>
                            <Paragraph
                                className="!text-base sm:!text-lg !text-[#1e5b8d] !mb-6 sm:!mb-8 !max-w-2xl md:!mx-0 mx-auto !leading-relaxed"
                            >
                                {t('applyons.hero.subtitle')}
                            </Paragraph>
                            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-3 sm:gap-4">
                                <Button
                                    type="primary"
                                    size="large"
                                    href={REGISTRATION_DEMANDEUR_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="!bg-[#1e5b8d] hover:!bg-[#164670] !border-none !rounded-md !min-h-[48px] sm:!min-h-[52px] !px-6 sm:!px-8 !py-3 !text-base sm:!text-lg !font-semibold w-full sm:w-auto inline-flex items-center justify-center whitespace-nowrap"
                                >
                                    {t('applyons.hero.cta')}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <svg
                    className="absolute bottom-0 left-0 w-full h-12 sm:h-16 md:h-20 pointer-events-none"
                    viewBox="0 0 1200 100"
                    preserveAspectRatio="none"
                    aria-hidden
                >
                    <path
                        d="M0,0 C300,100 900,100 1200,0 L1200,100 L0,100 Z"
                        className="fill-white"
                    />
                </svg>
            </div>
        </section>
    );
};

export default Hero;