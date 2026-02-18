import { toSentenceCase } from "@/helpers";
import { cn } from "@/utils";
import { useEffect, useRef, useState } from "react";
import { LuAtSign, LuChevronDown, LuDownloadCloud, LuLogIn, LuMenu, LuX } from "react-icons/lu";
import { Link, useLocation } from "react-router-dom";

import logoAuthenticPage from "@/assets/logo_authentic_page.png";
import logoAuthenticPageDark from "@/assets/logo_authentic_page_dark.png";
import AutenticPageLogo from "@/assets/logo/logo_256.png";

const TopNavBar2 = ({ menuItems, position, hasDownloadButton }) => {
    const navbarRef = useRef(null);
    const { hash, pathname } = useLocation();
    const [language, setLanguage] = useState(localStorage.getItem('language') || 'fr'); // Récupérer la langue depuis localStorage
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        document.addEventListener("scroll", (e) => {
            e.preventDefault();
            activeSection();
            if (navbarRef.current) {
                if (window.scrollY >= 80) navbarRef.current.classList.add("nav-sticky");
                else navbarRef.current.classList.remove("nav-sticky");
            }
        });

        const timeout = setTimeout(() => {
            if (hash) {
                const element = document.querySelector(hash);
                if (element) element.scrollIntoView({ behavior: "instant" });
            }
        }, 0);

        return () => {
            clearTimeout(timeout);
            window.removeEventListener("scroll", activeSection);
        };
    }, []);

    const [activation, setActivation] = useState(menuItems[0]);

    const activeSection = () => {
        const scrollY = window.scrollY;

        for (let i = menuItems.length - 1; i >= 0; i--) {
            const section = menuItems[i];
            const el = document.getElementById(section);
            if (el && el.offsetTop <= scrollY + 100) {
                setActivation(section);
                return;
            }
        }
    };

    return (
        <>
            <header
                ref={navbarRef}
                id="navbar"
                className={cn(
                    position,
                    "inset-x-0 top-0 z-[60] w-full  border-b border-transparent bg-white transition-all duration-300 dark:bg-default-50 lg:bg-transparent [&.nav-sticky]:bg-white/90 [&.nav-sticky]:shadow-md [&.nav-sticky]:backdrop-blur-3xl dark:[&.nav-sticky]:bg-default-50/80"
                )}
            >
                <div className="flex h-full items-center py-4">
                    <div className="container">
                        <nav className="flex flex-wrap items-center justify-between gap-4 lg:flex-nowrap">
                            <div className="flex w-full items-center justify-between lg:w-auto">
                                <Link to="/">
                                    <img
                                        src={AutenticPageLogo}
                                        alt="ApplyOns"
                                        className="flex h-20 dark:hidden"
                                    />
                                    <img
                                        src={logoAuthenticPageDark}
                                        alt="ApplyOns"
                                        className="hidden h-10 dark:flex"
                                    />
                                </Link>

                                <div className="flex items-center gap-2">
                                    {hasDownloadButton && (
                                        <div className="inline-flex shrink gap-2 lg:hidden">
                                            <Link
                                                to="/auth/sign-in"
                                                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-1.5 text-base text-white transition-all hover:bg-primary-700"
                                            >
                                                <LuLogIn className="h-4 w-4 fill-white/40" />
                                                <span className="hidden sm:block">Connexion</span>
                                            </Link>
                                        </div>
                                    )}

                                    <button
                                        className="hs-collapse-toggle inline-block lg:hidden"
                                        data-hs-overlay="#mobile-menu"
                                    >
                                        <LuMenu className="h-7 w-7 text-default-600 hover:text-default-900" />
                                    </button>
                                </div>
                            </div>

                            <ul className="menu relative mx-auto hidden grow items-center justify-center lg:flex">
                                {menuItems.map((item, idx) => {
                                    return (
                                        <li
                                            key={idx}
                                            className={cn(
                                                "menu-item mx-2 text-default-800 transition-all duration-300 hover:text-primary [&.active]:text-rougeLogo",
                                                activation === item && "active"
                                            )}
                                        >
                                            <a
                                                className="inline-flex items-center rounded-full px-2 py-0.5 text-sm font-medium capitalize lg:text-base"
                                                href={`/#${item}`}
                                            >
                                                {toSentenceCase(item)}
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>

                            <div className="ms-auto hidden shrink gap-2 lg:inline-flex">
                                <Link
                                    to="/auth/sign-in"
                                    className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-1.5 text-base text-white transition-all hover:bg-rougeLogo"
                                >
                                    <LuLogIn className="h-4 w-4 fill-white/40" />
                                    <span className="hidden sm:block">Connexion</span>
                                </Link>
                            </div>

                        </nav>
                    </div>
                </div>
            </header>

            {/* mobile menu */}
            <div
                id="mobile-menu"
                className="hs-overlay fixed bottom-0 left-0 top-0 z-[61] hidden h-screen w-full max-w-[270px] -translate-x-full transform border-r border-default-200 bg-white transition-all [--body-scroll:true] [--overlay-backdrop:false] hs-overlay-open:translate-x-0 dark:bg-default-50"
                tabIndex={-1}
            >
                <div className="flex h-[74px]  items-center justify-between border-b border-dashed border-default-200 px-4 transition-all duration-300">
                    <Link to="/">
                        <img src={AutenticPageLogo} alt="Apply Ons" className="flex h-20 dark:hidden " />
                        <img src={AutenticPageLogo} alt="Apply Ons" className="hidden h-20 dark:flex" />
                    </Link>
                    <div data-hs-overlay="#mobile-menu" className="hs-collapse-toggle">
                        <LuX size={24} />
                    </div>

                </div>


                <div className="h-[calc(100%-4rem)] overflow-y-auto">
                    <nav className="hs-accordion-group flex h-full w-full flex-col flex-wrap p-4">
                        <ul className="space-y-1">
                            {menuItems.map((item, idx) => {
                                return (
                                    <li
                                        key={idx}
                                        className={cn(
                                            "rounded text-sm font-medium capitalize text-default-900 transition-all duration-300 hover:bg-default-100 hover:text-primary [&.active]:bg-default-100 [&.active]:text-primary",
                                            activation == `${item}` && "active"
                                        )}
                                    >
                                        <a className="block w-full px-4 py-2.5" href={`#${item}`}>
                                            {toSentenceCase(item)}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </div>


            </div>
        </>
    );
};

export default TopNavBar2;
