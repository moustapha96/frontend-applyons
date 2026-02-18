

// import { useState } from "react";
// import { useTranslation } from "react-i18next";
// import { LuChevronDown } from "react-icons/lu";

// import frFlag from "@/assets/lang/fr.png";
// import enFlag from "@/assets/lang/en.png";
// import esFlag from "@/assets/lang/es.png";
// import deFlag from "@/assets/lang/de.png";
// import itFlag from "@/assets/lang/it.png";
// import chFlag from "@/assets/lang/ch.png";

// const LanguageSelector = () => {
//     const { t, i18n } = useTranslation();
//     const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

//     const flags = {
//         en: enFlag,
//         fr: frFlag,
//         es: esFlag,
//         de: deFlag,
//         it: itFlag,
//         ch: chFlag
//     };

//     const changeLanguage = (lng) => {
//         i18n.changeLanguage(lng);
//         setShowLanguageDropdown(false);
//     };

//     return (
//         <div className="relative">
//             <button
//                 onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
//                 className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//                 <img
//                     src={flags[i18n.language] || flags['en']}
//                     alt={`Drapeau ${i18n.language}`}
//                     className="w-6 h-6 rounded-sm shadow-sm"
//                 />
//                 <span className="text-sm font-medium text-gray-700">
//                     {i18n.language.toUpperCase()}
//                 </span>
//                 <LuChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${showLanguageDropdown ? 'rotate-180' : ''}`} />
//             </button>
//             {showLanguageDropdown && (
//                 <div className="absolute right-0 mt-2 py-2 w-40 bg-white rounded-lg shadow-lg border border-gray-100 z-20">
//                     {Object.keys(flags).map((lang) => (
//                         <button
//                             key={lang}
//                             onClick={() => changeLanguage(lang)}
//                             className={`flex items-center px-4 py-2 text-sm w-full transition-colors duration-150 ${i18n.language === lang
//                                 ? 'bg-blue-50 text-blue-600'
//                                 : 'text-gray-700 hover:bg-gray-50'
//                                 }`}
//                         >
//                             <img
//                                 src={flags[lang]}
//                                 alt={lang}
//                                 className="w-5 h-5 mr-3 rounded-sm"
//                             />
//                             <span className="font-medium">{lang.toUpperCase()}</span>
//                         </button>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default LanguageSelector;

"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Globe, ChevronDown } from "lucide-react"

import frFlag from "@/assets/lang/fr.png";
import enFlag from "@/assets/lang/en.png";
import esFlag from "@/assets/lang/es.png";
import deFlag from "@/assets/lang/de.png";
import itFlag from "@/assets/lang/it.png";
import chFlag from "@/assets/lang/ch.png";

// Import flag images
const flagImages = {
    en: enFlag,
    fr: frFlag,
    es: esFlag,
    de: deFlag,
    it: itFlag,
    ch: chFlag,
}

const LanguageSelector = () => {
    const { t, i18n } = useTranslation()
    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)

    // Language names in their native form
    const languageNames = {
        en: "English",
        fr: "Français",
        es: "Español",
        de: "Deutsch",
        it: "Italiano",
        ch: "中文",
    }

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng)
        setShowLanguageDropdown(false)
    }

    return (
        <div className="relative">
            <button
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="flex items-center space-x-2 px-3 py-2 rounded-md border border-gray-200 bg-white hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
                aria-expanded={showLanguageDropdown}
                aria-haspopup="listbox"
            >
                <Globe className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium">
                    {/* <span className="uppercase">{i18n.language}</span> */}
                    {languageNames[i18n.language] || languageNames["en"]}
                </span>
                <ChevronDown
                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${showLanguageDropdown ? "rotate-180" : ""
                        }`}
                />
            </button>

            {showLanguageDropdown && (
                <div
                    className="absolute right-0 mt-1 py-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-20"
                    role="listbox"
                >
                    {Object.keys(languageNames).map((lang) => (
                        <button
                            key={lang}
                            onClick={() => changeLanguage(lang)}
                            className={`flex items-center px-4 py-2 text-sm w-full text-left transition-colors duration-150 ${i18n.language === lang ? "bg-gray-100 text-gray-900" : "text-gray-700 hover:bg-gray-50"
                                }`}
                            role="option"
                            aria-selected={i18n.language === lang}
                        >
                            {/* <img
                                src={flagImages[lang] || "/placeholder.svg"}
                                alt={`${languageNames[lang]} flag`}
                                className="w-5 h-5 mr-3 rounded-sm object-cover"
                            /> */}
                            <span className="uppercase font-medium mr-2">{lang}</span>
                            <span>{languageNames[lang]}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default LanguageSelector
