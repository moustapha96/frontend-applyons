import hosting41 from "@/assets/images/landing/hosting/41.png";
import { Link } from "react-router-dom";
import { CheckCircle, Search } from 'lucide-react';
import { useTranslation } from "react-i18next";

// Composant de bouton réutilisable
const Button = ({ to, children, icon: Icon, bgColor, hoverColor }) => (
  <Link
    to={to}
    className={`flex items-center justify-center px-6 py-3 text-sm md:text-base text-white ${bgColor} ${hoverColor} transition-transform transform hover:scale-105 duration-200 rounded-lg shadow-lg`}
    aria-label={children}
  >
    {Icon && <Icon className="mr-2 h-5 w-5" />}
    {children}
  </Link>
);
export default function Hero() {
  const { t } = useTranslation()
  return (

    <section

      id="home"
      className="py-20 md:py-20 lg:py-44 flex items-center justify-center bg-default-100 dark:bg-default-50 relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${hosting41})` }}
    >
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6">
            <span className="inline-block px-3 py-2 text-xs md:text-sm border border-default-200 text-default-950 rounded-full animate-fade-in">
              {t('offerPeaceOfMind')}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#24377A] animate-fade-in-up">

              {t("authenticateDocuments")}
            </h1> <br />
            <p className="text-base md:text-lg text-default-600 animate-fade-in-up">
              {t('simplifyValidation')}
            </p> <br />

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                to="/registration?type=demandeur"
                type={"demandeur"}
                icon={CheckCircle}
                // bgColor="bg-primary"
                hoverColor="hover:bg-primary-dark"
              >
                {t('requestAuthentication')}
              </Button>
              <Button
                to="/registration?type=institut"
                type={"institut"}
                icon={Search}
                // bgColor="bg-red-600"
                hoverColor="hover:bg-red-700"
              >
                {t('checkDocumentAuthenticity')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <style >{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

        section {
          font-family: 'Roboto', sans-serif;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.6s ease-out forwards; }
        .animate-fade-in-up { animation: fadeInUp 0.7s ease-out forwards; animation-delay: 0.2s; }

        /* Responsive Styles */
        @media (max-width: 768px) {
          h1 {
            font-size: 2rem; /* reduced size on mobile */
          }
        }
      `}</style>
    </section>

  );
}