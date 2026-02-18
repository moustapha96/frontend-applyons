import { LuMoveRight } from "react-icons/lu";
import { useLayoutContext } from "@/context";
import hosting3 from "@/assets/images/landing/hosting/3.png"; // Image illustrating fast migration
import hosting5 from "@/assets/images/landing/hosting/5.png"; // Image illustrating authentication security
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Authentifier = () => {
    const { themeMode } = useLayoutContext();
    const { t } = useTranslation();

    return (
        <>
            <section

                id={`${t('nav.solutions')}`}
                className="py-10 lg:py-20 bg-gray-100">
                <div className="container">
                    <div className="grid md:grid-cols-2 gap-6 items-center">
                        <div className="flex justify-center">
                            <img src={hosting5} alt="Secure authentication with AuthenticPage" className="rounded-lg shadow-lg animate-fadeIn" />
                        </div>

                        <div className="text-pretty">
                            <span className="text-sm uppercase text-primary font-semibold tracking-widest">
                                {t('Fonctionnality.premier.subTitle')}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-[#24377A]">
                                {t('Fonctionnality.premier.title')}
                            </h2>
                            <div className="w-16 h-1 bg-[#24377A] mx-auto my-4 rounded"></div>

                            <p className="text-base text-default-600 mb-5 leading-relaxed">
                                {t('Fonctionnality.premier.description1')}
                            </p>
                            <p className="text-base text-default-600 mb-5 leading-relaxed">
                                {t('Fonctionnality.premier.description2')}
                            </p>
                            <Link
                                to="/trust-and-safety"
                                className="inline-flex gap-2 text-xl items-center relative text-primary group font-medium"
                            >
                                <span className="absolute h-px w-7/12 group-hover:w-full transition-all duration-500 rounded bg-primary/80 -bottom-0" />
                                {t('Fonctionnality.premier.learn')}
                                <LuMoveRight className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-10 lg:py-20 bg-white">
                <div className="container">
                    <div className="grid md:grid-cols-2 gap-6 items-center">
                        {/* Text - Fast and Simplified Process */}
                        <div className="text-pretty">
                            <span className="text-sm uppercase text-primary font-semibold tracking-widest">
                                {t('Fonctionnality.deuxieme.subTitle')}
                            </span><br />
                            <h2 className="text-3xl md:text-4xl font-bold text-[#24377A]">
                                {t('Fonctionnality.deuxieme.title')}
                            </h2>
                            <div className="w-16 h-1 bg-[#24377A] mx-auto my-4 rounded"></div>

                            <p className="text-base text-default-600 mb-5 leading-relaxed">
                                {t('Fonctionnality.deuxieme.description1')}
                            </p>
                            <p className="text-base text-default-600 mb-5 leading-relaxed">
                                {t('Fonctionnality.deuxieme.description2')}
                            </p>
                            <p className="text-base text-default-600 mb-5 leading-relaxed">
                                {t('Fonctionnality.deuxieme.description3')}
                            </p>
                            <Link
                                to="/simplify-process"
                                className="inline-flex gap-2 text-xl items-center relative text-primary group font-medium"
                            >
                                <span className="absolute h-px w-7/12 group-hover:w-full transition-all duration-500 rounded bg-primary/80 -bottom-0" />
                                {t('Fonctionnality.deuxieme.learn')}
                                <LuMoveRight className="h-5 w-5" />
                            </Link>
                        </div>

                        {/* Image - Fast Migration */}
                        <div className="flex justify-center">
                            <img src={hosting3} alt="Fast and secure authentication process" className="rounded-lg shadow-lg animate-fadeIn h-96" />
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
        </>
    );
};

export default Authentifier;
