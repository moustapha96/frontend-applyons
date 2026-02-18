import { Link } from "react-router-dom";
import { LuMoveRight } from "react-icons/lu";
import { FaCheckCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { getPriceDemandeur, getPriceInstitut } from "@/services/paymentService";

const Pricing = () => {
  const { t } = useTranslation();
  const [prixDemandeur, setPrixDemandeur] = useState(0);
  const [prixInstitut, setPrixInstitut] = useState(0);

  useEffect(() => {
    const fetchPrix = async () => {
      const respoD = await getPriceDemandeur();
      //console.log(respoD);
      const respI = await getPriceInstitut();
      //console.log(respI);
      setPrixDemandeur(respoD);
      setPrixInstitut(respI);
    }
    // fetchPrix();
  }, []);

  return (
    <section
      id={`${t('Tarification')}`}
      className="py-20 md:py-20 lg:py-44 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto ">
        {/* Section header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#24377A]">
            {t('PricingContent.title')}
          </h2>
          <div className="w-16 h-1 bg-[#24377A] mx-auto my-4 rounded"></div>

          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            {t('PricingContent.subTitle')}
          </p>

        </div>

        {/* Pricing cards */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Student fees */}
          <div className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg transition-transform transform hover:-translate-y-[5px] hover:shadow-xl duration-300 relative overflow-hidden">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center mb-4">
              <FaCheckCircle className="text-[#012C4E] mr-2" />
              {t('PricingContent.Student.title')}
            </h3>
            <p className="text-xl text-[#012C4E] font-bold mt-4">$ {49} <span className="text-lg font-normal">per request</span></p>
            <p className="text-base text-gray-600 dark:text-gray-300 mt-4">
              {t('PricingContent.Student.content')}
            </p>
            <div className="flex justify-between items-center mt-6">
              <Link to="/registration?type=demandeur" className="bg-[#012C4E] hover:bg-[#011A34] text-white font-medium inline-flex items-center px-4 py-2 rounded transition duration-200">
                {t('PricingContent.Student.button')} <LuMoveRight className="ml-1" />
              </Link>
              <span className="text-lg text-gray-900 dark:text-gray-300">Per request</span>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg transition-transform transform hover:-translate-y-[5px] hover:shadow-xl duration-300 relative overflow-hidden">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center mb-4">
              <FaCheckCircle className="text-[#012C4E] mr-2" />
              {t('PricingContent.Enterprise.title')}
            </h3>
            <p className="text-xl text-[#012C4E] font-bold mt-4">$99 <span className="text-lg font-normal">per month</span></p>
            <p className="text-base text-gray-600 dark:text-gray-300 mt-4">
              {t('PricingContent.Enterprise.content')}
            </p>
            <div className="flex justify-between items-center mt-6">
              <Link to="/registration?type=institut" className="bg-[#012C4E] hover:bg-[#011A34] text-white font-medium inline-flex items-center px-4 py-2 rounded transition duration-200">
                {t('PricingContent.Enterprise.button')}  <LuMoveRight className="ml-1" />
              </Link>
              <span className="text-lg text-gray-900 dark:text-gray-300">Unlimited users</span>
            </div>
          </div>

          {/* Universities and Embassies Subscription (takes up two columns) */}
          <div className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg transition-transform transform hover:-translate-y-[5px] hover:shadow-xl duration-300 relative overflow-hidden lg:col-span-2">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center mb-4">
              <FaCheckCircle className="text-[#012C4E] mr-2" />
              {t('PricingContent.Universities.title')}
            </h3>
            <p className="text-xl text-[#012C4E] font-bold mt-4">{t('PricingContent.Universities.contact')}</p>
            <p className="text-base text-gray-600 dark:text-gray-300 mt-4">
              {t('PricingContent.Universities.content')}
            </p>
            <p className="text-sm text-red-600 mt-2 italic"> {t('PricingContent.Universities.Note')} </p>
            <div className="flex justify-between items-center mt-6">
              <Link to="mailto:applyons@gmail.com" className="bg-[#012C4E] hover:bg-[#011A34] text-white font-medium inline-flex items-center px-4 py-2 rounded transition duration-200">
                {t('PricingContent.Universities.contact_sale')} <LuMoveRight className="ml-1" />
              </Link>
              <span className="text-lg text-gray-900 dark:text-gray-300">All users</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
